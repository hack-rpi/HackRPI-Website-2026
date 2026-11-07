// The blockchain lives here with DAA, Cumulative Work Consensus, and MongoDB stats tracking.
const crypto = require('node:crypto');
const http = require('node:http');
const timers = require('node:timers/promises');
const express = require('express');
const socketIO = require('socket.io');
const socketClient = require('socket.io-client');
const { MongoClient } = require('mongodb');

require('dotenv').config({ path: './config.env' });

const INITIAL_DIFFICULTY = 3;
const MAX_BLOCKS = 256;
const MAX_DATA_BYTES = 1024;
const MAX_MINING_PACE_MS = 1000;
const HEX_HASH = /^[0-9a-f]{64}$/;
const TARGET_BLOCK_TIME_MS = 10000; // Target 10 seconds per block for difficulty adjustment

// MongoDB Setup
const mongoUri = process.env.MONGO_CONNECTION;
let dbClient = null;
let statsCollection = null;

async function initMongo() {
  if (!mongoUri) {
    console.warn('⚠️ MONGO_CONNECTION not found. Stats tracking disabled.');
    return;
  }
  try {
    dbClient = new MongoClient(mongoUri);
    await dbClient.connect();
    const db = dbClient.db();
    statsCollection = db.collection('blockchain_stats');
    
    const existing = await statsCollection.findOne({ _id: 'global_stats' });
    if (!existing) {
      await statsCollection.insertOne({
        _id: 'global_stats',
        maxLength: 1,
        totalBlocksMined: 0,
        divergentBranchesSolved: 0,
        attacksAvoided: 0,
        attacksFailed: 0,
        updatedAt: new Date()
      });
    }
    console.log('✅ Connected to MongoDB successfully.');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
}

async function updateStats(updateFields, currentChainLength) {
  if (!statsCollection) return;
  try {
    await statsCollection.updateOne(
      { _id: 'global_stats' },
      { 
        $inc: updateFields,
        $set: { updatedAt: new Date() }
      },
      { upsert: true }
    );

    if (currentChainLength) {
      await statsCollection.updateOne(
        { _id: 'global_stats', maxLength: { $lt: currentChainLength } },
        { $set: { maxLength: currentChainLength } }
      );
    }
  } catch (err) {
    console.error('Error updating stats in MongoDB:', err.message);
  }
}

// Hashing including difficulty level
function hashBlock(block) {
  const contents = [
    block.index,
    block.timestamp,
    block.data,
    block.previousHash,
    block.nonce,
    block.difficulty,
    block.canvasId,
  ];
  const text = JSON.stringify(contents);
  return crypto.createHash('sha256').update(text).digest('hex');
}

const GENESIS = {
  index: 0,
  timestamp: 0,
  data: 'Genesis Block',
  previousHash: '0',
  nonce: 0,
  difficulty: INITIAL_DIFFICULTY,
  canvasId: 'server-genesis',
};
GENESIS.hash = hashBlock(GENESIS);
Object.freeze(GENESIS);

// Calculate total cryptographic work score of a chain
function calculateChainWork(blocks) {
  return blocks.reduce((total, block) => {
    return total + Math.pow(16, block.difficulty || INITIAL_DIFFICULTY);
  }, 0);
}

// Dynamic Difficulty Adjustment (DAA) algorithm
function getNextDifficulty(blocks) {
  const latest = blocks[blocks.length - 1];
  if (blocks.length < 3) return latest.difficulty;

  // Check time difference between last block and 3 blocks prior
  const prevBlock = blocks[blocks.length - 3];
  const timeTaken = latest.timestamp - prevBlock.timestamp;
  const expectedTime = TARGET_BLOCK_TIME_MS * 2;

  if (timeTaken < expectedTime / 2) {
    return latest.difficulty + 1; // Increase difficulty if mining is too fast
  } else if (timeTaken > expectedTime * 2 && latest.difficulty > 1) {
    return latest.difficulty - 1; // Decrease difficulty if mining is too slow
  }
  return latest.difficulty;
}

class Blockchain {
  constructor() {
    this.blocks = [structuredClone(GENESIS)];
    this.isMining = false;
  }

  latestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  async mine(data, onProgress, paceMs = 0) {
    if (this.isMining) {
      throw new Error('Already mining; wait for current block.');
    }
    if (!validData(data)) {
      throw new Error(`Data must be text, at most ${MAX_DATA_BYTES} bytes.`);
    }
    if (this.blocks.length >= MAX_BLOCKS) {
      throw new Error('Demo chain limit reached; restart node.');
    }
    if (!validate(this.blocks).valid) {
      throw new Error('Cannot mine on an invalid chain.');
    }

    this.isMining = true;
    try {
      const previousBlock = this.latestBlock();
      const nextDifficulty = getNextDifficulty(this.blocks);
      const target = '0'.repeat(nextDifficulty);

      const newBlock = {
        index: previousBlock.index + 1,
        timestamp: Math.max(Date.now(), previousBlock.timestamp),
        data: data,
        previousHash: previousBlock.hash,
        nonce: 0,
        difficulty: nextDifficulty,
        hash: '',
      };

      while (true) {
        if (this.latestBlock().hash !== previousBlock.hash) {
          throw new Error('Chain changed during mining; retry.');
        }

        newBlock.hash = hashBlock(newBlock);
        const attempts = newBlock.nonce + 1;
        const foundValidHash = newBlock.hash.startsWith(target);

        const shouldReport = attempts === 1 || attempts % 1000 === 0 || foundValidHash;
        if (shouldReport && typeof onProgress === 'function') {
          onProgress({
            index: newBlock.index,
            difficulty: newBlock.difficulty,
            nonce: newBlock.nonce,
            hash: newBlock.hash,
            attempts: attempts,
          });
        }
        if (shouldReport && paceMs > 0) {
          await timers.setTimeout(paceMs);
        }
        if (foundValidHash) {
          break;
        }

        newBlock.nonce += 1;
        if (attempts % 1000 === 0) {
          await timers.setImmediate();
        }
      }

      if (this.latestBlock().hash !== previousBlock.hash) {
        throw new Error('Chain changed during mining; retry.');
      }
      this.blocks.push(newBlock);

      await updateStats({ totalBlocksMined: 1 }, this.blocks.length);
      return structuredClone(newBlock);
    } finally {
      this.isMining = false;
    }
  }

  // Cumulative Work Consensus Rule
  replace(candidateBlocks) {
    const validation = validate(candidateBlocks);
    if (!validation.valid) {
      updateStats({ attacksAvoided: 1 }, null);
      return {
        accepted: false,
        reason: 'invalid',
        message: validation.error,
        blockIndex: validation.blockIndex,
      };
    }

    const currentWork = calculateChainWork(this.blocks);
    const candidateWork = calculateChainWork(candidateBlocks);

    if (candidateWork < currentWork) {
      updateStats({ attacksAvoided: 1 }, null);
      return { accepted: false, reason: 'shorter', message: 'Current chain has more accumulated cryptographic work.' };
    }
    if (candidateWork === currentWork) {
      const candidateTip = candidateBlocks[candidateBlocks.length - 1];
      const currentTip = this.latestBlock();
      if (candidateTip.hash === currentTip.hash) {
        return { accepted: false, reason: 'unchanged', message: 'Already synchronized.' };
      }
      updateStats({ attacksFailed: 1 }, null);
      return { accepted: false, reason: 'tie', message: 'Equal work; keeping current chain.' };
    }

    const addedCount = candidateBlocks.length - this.blocks.length;
    updateStats({ 
      divergentBranchesSolved: 1, 
      totalBlocksMined: addedCount > 0 ? addedCount : 1 
    }, candidateBlocks.length);

    this.blocks = structuredClone(candidateBlocks);
    return { accepted: true, reason: 'longer', message: 'Adopted valid chain with higher cumulative work.' };
  }

  toJSON() {
    return {
      difficulty: this.latestBlock().difficulty,
      blocks: structuredClone(this.blocks),
      validation: validate(this.blocks),
      mining: this.isMining,
    };
  }
}

// Enhanced validation checking dynamic targets
function validate(blocks) {
  if (!Array.isArray(blocks) || blocks.length < 1 || blocks.length > MAX_BLOCKS) {
    return { valid: false, error: `Chain must contain 1–${MAX_BLOCKS} blocks.` };
  }

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (!block || typeof block !== 'object' || Array.isArray(block)) {
      return invalidBlock(index, 'Malformed block.');
    }
    if (Object.keys(block).length !== 8) {
      return invalidBlock(index, 'Malformed block schema.');
    }
    if (block.index !== index) {
      return invalidBlock(index, 'Block index out of order.');
    }
    if (!validData(block.data)) {
      return invalidBlock(index, 'Invalid block data size.');
    }
    if (!Number.isSafeInteger(block.difficulty) || block.difficulty < 1 || block.difficulty > 32) {
      return invalidBlock(index, 'Invalid block difficulty.');
    }
    if (typeof block.hash !== 'string' || !HEX_HASH.test(block.hash)) {
      return invalidBlock(index, 'Malformed hash.');
    }

    if (block.hash !== hashBlock(block)) {
      return invalidBlock(index, 'Hash does not match block contents.');
    }

    if (index === 0) {
      if (block.hash !== GENESIS.hash) {
        return invalidBlock(index, 'Genesis does not match network.');
      }
      continue;
    }

    const previousBlock = blocks[index - 1];
    if (block.previousHash !== previousBlock.hash) {
      return invalidBlock(index, 'Previous hash mismatch.');
    }
    
    const target = '0'.repeat(block.difficulty);
    if (!block.hash.startsWith(target)) {
      return invalidBlock(index, 'Proof of work target not met for difficulty.');
    }
  }
  return { valid: true };
}

function invalidBlock(index, message) {
  return { valid: false, error: message, blockIndex: index };
}

function validData(data) {
  if (typeof data !== 'string') return false;
  return Buffer.byteLength(JSON.stringify(data)) <= MAX_DATA_BYTES;
}

// Networking with Security Blacklisting for Malicious Peers
async function startNode(options = {}) {
  const port = options.port ?? 0;
  const host = options.host ?? '127.0.0.1';
  const peerUrls = options.peers ?? [];
  const blockchain = new Blockchain();
  const peerConnections = [];
  const blacklistedIps = new Set();

  const app = express();
  app.get(['/', '/api/chain'], (_req, res) => res.json(blockchain.toJSON()));

  const server = http.createServer(app);
  const socketServer = new socketIO.Server(server, {
    cors: { origin: '*' },
    maxHttpBufferSize: 512 * 1024,
  });

  function broadcastChain() {
    const state = blockchain.toJSON();
    socketServer.emit('chain:full', state);
    for (const peer of peerConnections) {
      if (peer.connected) {
        peer.emit('chain:propose', { blocks: state.blocks });
      }
    }
  }

  socketServer.use((socket, next) => {
    const clientIp = socket.handshake.address;
    if (blacklistedIps.has(clientIp)) {
      return next(new Error('Blacklisted due to malicious activity.'));
    }
    next();
  });

  socketServer.on('connection', function (socket) {
    let invalidSubmissions = 0;
    socket.emit('chain:full', blockchain.toJSON());

    socket.on('chain:get', (_payload, acknowledge) => {
      const state = blockchain.toJSON();
      socket.emit('chain:full', state);
      if (typeof acknowledge === 'function') acknowledge(state);
    });

    socket.on('chain:propose', (payload, acknowledge) => {
      const decision = blockchain.replace(payload?.blocks);
      if (!decision.accepted && decision.reason === 'invalid') {
        invalidSubmissions++;
        if (invalidSubmissions >= 3) {
          const clientIp = socket.handshake.address;
          blacklistedIps.add(clientIp);
          console.warn(`🚨 Blacklisted malicious peer IP: ${clientIp}`);
          socket.disconnect(true);
          return;
        }
      }
      socket.emit('chain:result', decision);
      if (typeof acknowledge === 'function') acknowledge(decision);
    });

    socket.on('mine:start', async (payload, acknowledge) => {
      const startedAt = Date.now();
      try {
        const block = await blockchain.mine(payload?.data, (progress) => {
          socketServer.emit('mine:progress', progress);
        }, payload?.paceMs ?? 0);
        
        const result = {
          block: block,
          attempts: block.nonce + 1,
          elapsedMs: Date.now() - startedAt,
        };
        socketServer.emit('block:new', { block: block });
        socketServer.emit('mine:done', result);
        broadcastChain();
        if (typeof acknowledge === 'function') acknowledge({ ok: true, ...result });
      } catch (error) {
        socket.emit('mine:error', { message: error.message });
        socketServer.emit('chain:full', blockchain.toJSON());
        if (typeof acknowledge === 'function') acknowledge({ ok: false, message: error.message });
      }
    });
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, resolve);
  });

  async function close() {
    for (const peer of peerConnections) peer.close();
    if (dbClient) await dbClient.close();
    await new Promise((resolve) => socketServer.close(resolve));
  }

  return {
    url: `http://${host}:${server.address().port}`,
    blockchain,
    close,
  };
}

async function main() {
  await initMongo();
  const node = await startNode({
    port: Number(process.env.PORT || 3000),
    host: process.env.HOST || '127.0.0.1',
  });
  console.log(`Node running securely at ${node.url} with DAA & Cumulative Consensus`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { Blockchain, GENESIS, MAX_BLOCKS, hashBlock, validate, startNode };
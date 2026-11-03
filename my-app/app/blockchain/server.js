// The blockchain lives here. startNode() below connects it to other nodes.
const crypto = require('node:crypto');
const http = require('node:http');
const timers = require('node:timers/promises');
const express = require('express');
const socketIO = require('socket.io');
const socketClient = require('socket.io-client');

const DIFFICULTY = 3;
const TARGET = '0'.repeat(DIFFICULTY); // A mined hash must begin with "000".
const MAX_BLOCKS = 256;
const MAX_DATA_BYTES = 1024;
const MAX_MINING_PACE_MS = 1000;
const HEX_HASH = /^[0-9a-f]{64}$/; // SHA-256 produces 64 hexadecimal characters.

// Hashing: put the fields in a fixed order, convert them to text, then hash them.
function hashBlock(block) {
  const contents = [
    block.index,
    block.timestamp,
    block.data,
    block.previousHash,
    block.nonce,
  ];
  const text = JSON.stringify(contents);
  return crypto.createHash('sha256').update(text).digest('hex');
}

// Every node starts with this exact block. A changing timestamp would split them.
const GENESIS = {
  index: 0,
  timestamp: 0,
  data: 'Genesis Block',
  previousHash: '0',
  nonce: 0,
};
GENESIS.hash = hashBlock(GENESIS);
Object.freeze(GENESIS);

class Blockchain {
  constructor() {
    this.blocks = [structuredClone(GENESIS)];
    this.isMining = false;
  }

  latestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  // Mining: try nonces until one makes a hash with the required leading zeroes.
  async mine(data, onProgress, paceMs = 0) {
    if (this.isMining) {
      throw new Error('Already mining; wait for the current block.');
    }
    if (!validData(data)) {
      throw new Error(`Data must be text, at most ${MAX_DATA_BYTES} bytes as JSON.`);
    }
    if (!Number.isSafeInteger(paceMs) || paceMs < 0 || paceMs > MAX_MINING_PACE_MS) {
      throw new Error(`Mining pace must be an integer from 0–${MAX_MINING_PACE_MS} milliseconds.`);
    }
    if (this.blocks.length >= MAX_BLOCKS) {
      throw new Error('Demo chain limit reached; restart the node.');
    }
    if (!validate(this.blocks).valid) {
      throw new Error('Cannot mine on an invalid chain.');
    }

    this.isMining = true;
    try {
      const previousBlock = this.latestBlock();
      const newBlock = {
        index: previousBlock.index + 1,
        timestamp: Math.max(Date.now(), previousBlock.timestamp),
        data: data,
        previousHash: previousBlock.hash,
        nonce: 0,
        hash: '',
      };

      while (true) {
        // Another node may have sent a better chain while we were mining.
        if (this.latestBlock().hash !== previousBlock.hash) {
          throw new Error('Chain changed during mining; retry.');
        }

        newBlock.hash = hashBlock(newBlock);
        const attempts = newBlock.nonce + 1;
        const foundValidHash = newBlock.hash.startsWith(TARGET);

        // The optional callback lets the server send attempts to the visualizer.
        const shouldReport = attempts === 1 || attempts % 1000 === 0 || foundValidHash;
        if (shouldReport && typeof onProgress === 'function') {
          onProgress({
            index: newBlock.index,
            difficulty: DIFFICULTY,
            nonce: newBlock.nonce,
            hash: newBlock.hash,
            attempts: attempts,
          });
        }
        // Visualizers can request a short pause at sampled attempts so people
        // can follow the nonce and hash changes. Normal mining uses pace 0.
        if (shouldReport && paceMs > 0) {
          await timers.setTimeout(paceMs);
        }
        if (foundValidHash) {
          break;
        }

        newBlock.nonce += 1;
        if (attempts % 1000 === 0) {
          // Pause between batches so the server can receive socket messages.
          await timers.setImmediate();
        }
      }

      // Check once more before appending: the progress callback can change state.
      if (this.latestBlock().hash !== previousBlock.hash) {
        throw new Error('Chain changed during mining; retry.');
      }
      this.blocks.push(newBlock);
      return structuredClone(newBlock);
    } finally {
      // Unlock after success OR failure, so another request can mine.
      this.isMining = false;
    }
  }

  // Consensus: only a fully valid chain with more work can replace our chain.
  replace(candidateBlocks) {
    const validation = validate(candidateBlocks);
    if (!validation.valid) {
      return {
        accepted: false,
        reason: 'invalid',
        message: validation.error,
        blockIndex: validation.blockIndex,
      };
    }

    // Difficulty is fixed, so more valid blocks means more work.
    if (candidateBlocks.length < this.blocks.length) {
      return { accepted: false, reason: 'shorter', message: 'Current chain has more work.' };
    }
    if (candidateBlocks.length === this.blocks.length) {
      const candidateTip = candidateBlocks[candidateBlocks.length - 1];
      const currentTip = this.latestBlock();
      if (candidateTip.hash === currentTip.hash) {
        return { accepted: false, reason: 'unchanged', message: 'Already synchronized.' };
      }

      // Different tips can both be honest. Keep ours until one branch extends.
      return {
        accepted: false,
        reason: 'tie',
        message: 'Equal work; keep current chain until a branch is extended.',
      };
    }

    this.blocks = structuredClone(candidateBlocks);
    return { accepted: true, reason: 'longer', message: 'Adopted the valid chain with more work.' };
  }

  // Send a copy so outside code cannot edit this node's internal blocks.
  toJSON() {
    return {
      difficulty: DIFFICULTY,
      blocks: structuredClone(this.blocks),
      validation: validate(this.blocks),
      mining: this.isMining,
    };
  }
}

// Validation: inspect every block before trusting a received chain.
function validate(blocks) {
  if (!Array.isArray(blocks) || blocks.length < 1 || blocks.length > MAX_BLOCKS) {
    return { valid: false, error: `Chain must contain 1–${MAX_BLOCKS} blocks.` };
  }

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    // First check the fields, so malformed network input cannot reach hashing.
    if (!block || typeof block !== 'object' || Array.isArray(block)) {
      return invalidBlock(index, 'Malformed block.');
    }
    if (Object.keys(block).length !== 6) {
      return invalidBlock(index, 'Malformed block.');
    }
    if (block.index !== index) {
      return invalidBlock(index, 'Block index is out of order.');
    }
    if (!validData(block.data)) {
      return invalidBlock(index, 'Invalid block data.');
    }
    if (!Number.isSafeInteger(block.timestamp) || block.timestamp < 0) {
      return invalidBlock(index, 'Invalid timestamp or nonce.');
    }
    if (!Number.isSafeInteger(block.nonce) || block.nonce < 0) {
      return invalidBlock(index, 'Invalid timestamp or nonce.');
    }
    if (typeof block.hash !== 'string' || !HEX_HASH.test(block.hash)) {
      return invalidBlock(index, 'Malformed hash.');
    }
    if (typeof block.previousHash !== 'string') {
      return invalidBlock(index, 'Malformed hash.');
    }

    // Recompute the hash: an old hash cannot hide changed data.
    if (block.hash !== hashBlock(block)) {
      return invalidBlock(index, 'Hash does not match block contents.');
    }

    // Genesis is fixed and does not need mining. All other blocks do.
    if (index === 0) {
      if (block.hash !== GENESIS.hash) {
        return invalidBlock(index, 'Genesis does not match this network.');
      }
      continue;
    }

    const previousBlock = blocks[index - 1];
    if (block.previousHash !== previousBlock.hash) {
      return invalidBlock(index, 'Previous hash does not match.');
    }
    if (block.timestamp < previousBlock.timestamp) {
      return invalidBlock(index, 'Timestamp precedes parent.');
    }
    if (!block.hash.startsWith(TARGET)) {
      return invalidBlock(index, 'Proof of work is missing.');
    }
  }
  return { valid: true };
}

function invalidBlock(index, message) {
  return { valid: false, error: message, blockIndex: index };
}

function validData(data) {
  if (typeof data !== 'string') {
    return false;
  }
  // Count the JSON size because that is what travels over the socket.
  const encodedData = JSON.stringify(data);
  return Buffer.byteLength(encodedData) <= MAX_DATA_BYTES;
}

// Networking: each call starts a server with its own independent blockchain.
async function startNode(options = {}) {
  const port = options.port ?? 0; // Port 0 chooses a free port for the demo/tests.
  const host = options.host ?? '127.0.0.1';
  const peerUrls = options.peers ?? [];
  const blockchain = new Blockchain();
  const peerConnections = [];

  const app = express();
  app.get(['/', '/api/chain'], function (_request, response) {
    response.json(blockchain.toJSON());
  });
  app.get('/api/validate', function (_request, response) {
    response.json(validate(blockchain.blocks));
  });

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

  function acceptChain(blocks) {
    const decision = blockchain.replace(blocks);
    if (decision.accepted) {
      // Only forward changed chains, or peers would keep echoing the same data.
      broadcastChain();
    }
    return decision;
  }

  // A server also acts as a client when it connects to another blockchain node.
  function connectPeer(url) {
    const peer = socketClient.io(url, { autoConnect: false });
    peerConnections.push(peer);

    peer.on('connect', function () {
      // On reconnect, offer any blocks mined while we were disconnected.
      const state = blockchain.toJSON();
      peer.emit('chain:propose', { blocks: state.blocks });
    });
    peer.on('chain:full', function (state) {
      const decision = acceptChain(state?.blocks);
      if (decision.reason === 'shorter') {
        const ourState = blockchain.toJSON();
        peer.emit('chain:propose', { blocks: ourState.blocks });
      }
    });

    peer.connect();
    return peer;
  }

  socketServer.on('connection', function (socket) {
    socket.emit('chain:full', blockchain.toJSON());

    // Send the current chain to a client or visualizer.
    socket.on('chain:get', function (_payload, acknowledge) {
      const state = blockchain.toJSON();
      socket.emit('chain:full', state);
      sendReply(acknowledge, state);
    });

    // Check a competing chain using the same rules as every other node.
    socket.on('chain:propose', function (payload, acknowledge) {
      const decision = acceptChain(payload?.blocks);
      socket.emit('chain:result', decision);
      sendReply(acknowledge, decision);
    });

    // Mine on this node, then share the result with clients and peers.
    socket.on('mine:start', async function (payload, acknowledge) {
      const startedAt = Date.now();
      try {
        const block = await blockchain.mine(payload?.data, function (progress) {
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
        sendReply(acknowledge, { ok: true, ...result });
      } catch (error) {
        socket.emit('mine:error', { message: error.message });
        socketServer.emit('chain:full', blockchain.toJSON());
        sendReply(acknowledge, { ok: false, message: error.message });
      }
    });
  });

  await new Promise(function (resolve, reject) {
    server.once('error', reject);
    server.listen(port, host, resolve);
  });
  for (const url of peerUrls) {
    connectPeer(url);
  }

  // The demo and tests use this to stop their temporary servers.
  async function close() {
    for (const peer of peerConnections) {
      peer.close();
    }
    await new Promise(function (resolve) {
      socketServer.close(resolve);
    });
  }

  return {
    url: `http://${host}:${server.address().port}`,
    blockchain: blockchain,
    connectPeer: connectPeer,
    close: close,
  };
}

// An acknowledgement is an optional callback sent with a socket request.
function sendReply(acknowledge, result) {
  if (typeof acknowledge === 'function') {
    acknowledge(result);
  }
}

async function main() {
  const peers = [];
  const addresses = (process.env.PEERS || '').split(',');
  for (const address of addresses) {
    const url = address.trim();
    if (url !== '') {
      peers.push(url);
    }
  }

  const node = await startNode({
    port: Number(process.env.PORT || 3000),
    host: process.env.HOST || '127.0.0.1',
    peers: peers,
  });
  console.log(`Node running at ${node.url} (difficulty ${DIFFICULTY})`);
  console.log('Use npm run client, or connect your visualizer with Socket.IO.');
}

// Start only when run directly. Importing this file for tests does not start it.
if (require.main === module) {
  main().catch(function (error) {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { Blockchain, DIFFICULTY, GENESIS, MAX_BLOCKS, hashBlock, validate, startNode };

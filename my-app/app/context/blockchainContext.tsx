// app/context/BlockchainContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

export type Block = {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  nonce: number;
  hash: string;
};

export type MiningAttempt = {
  index: number;
  nonce: number;
  hash: string;
  attempts: number;
};

export type LogItem = {
  id: number;
  time: string;
  kind: "info" | "success" | "error";
  text: string;
};

interface BlockchainContextType {
  blocks: Block[];
  attempt: MiningAttempt | null;
  isMining: boolean;
  logs: LogItem[];
  addLog: (text: string, kind?: LogItem["kind"]) => void;
  target: string;
  difficulty: number;
  mineBlock: (data: string) => Promise<void>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

const DIFFICULTY = 3;
const TARGET = "0".repeat(DIFFICULTY);
let nextLogId = 1;

async function hashBlock(block: Omit<Block, "hash">) {
  const input = JSON.stringify([
    block.index,
    block.timestamp,
    block.data,
    block.previousHash,
    block.nonce,
  ]);
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [attempt, setAttempt] = useState<MiningAttempt | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [logs, setLogs] = useState<LogItem[]>([]);

  const addLog = useCallback((text: string, kind: LogItem["kind"] = "info") => {
    setLogs((current) => [{
      id: nextLogId++,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      kind,
      text,
    }, ...current].slice(0, 25));
  }, []);

  // Initialize Genesis block once
  useEffect(() => {
    let active = true;
    async function init() {
      const genesis = {
        index: 0,
        timestamp: 0,
        data: "Genesis Block",
        previousHash: "0",
        nonce: 0,
      };
      const hash = await hashBlock(genesis);
      if (!active) return;
      setBlocks([{ ...genesis, hash }]);
      addLog("Blockchain initialized. Ready to mine.", "success");
    }
    void init();
    return () => { active = false; };
  }, [addLog]);

  // User-driven manual mining function
   const mineBlock = useCallback(async (data: string) => {
    if (blocks.length === 0 || isMining || !data.trim()) return;

    setIsMining(true);
    setAttempt(null);
    addLog(`Mining “${data}”...`);
    const startedAt = performance.now();
    const latest = blocks[blocks.length - 1];

    const candidate = {
      index: latest.index + 1,
      timestamp: Date.now(),
      data: data.trim(),
      previousHash: latest.hash,
      nonce: 0,
    };

    try {
      while (true) {
        const hash = await hashBlock(candidate);
        const attempts = candidate.nonce + 1;
        const found = hash.startsWith(TARGET);

        // Update attempt state and yield to browser render loop for real-time smoothness
        if (attempts === 1 || attempts % 16 === 0 || found) {
          setAttempt({ index: candidate.index, nonce: candidate.nonce, hash, attempts });
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        }

        if (found) {
          setBlocks((current) => [...current, { ...candidate, hash }]);
          addLog(
            `Block #${candidate.index} verified in ${attempts.toLocaleString()} attempts (${Math.round(performance.now() - startedAt)} ms)`,
            "success"
          );
          break;
        }

        candidate.nonce += 1;
      }
    } catch {
      addLog("Mining stopped unexpectedly", "error");
    } finally {
      setIsMining(false);
    }
  }, [blocks, isMining, addLog]);

  const value = useMemo(() => ({
    blocks,
    attempt,
    isMining,
    logs,
    addLog,
    target: TARGET,
    difficulty: DIFFICULTY,
    mineBlock,
  }), [blocks, attempt, isMining, logs, addLog, mineBlock]);

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  const context = useContext(BlockchainContext);
  if (!context) throw new Error("useBlockchain must be used within a BlockchainProvider");
  return context;
}
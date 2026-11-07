// app/components/GlobalBlockchainPopup.tsx
"use client";

import { useState, useMemo, useEffect, useCallback, type SubmitEvent } from "react";

type Block = {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  nonce: number;
  hash: string;
};

type MiningAttempt = {
  index: number;
  nonce: number;
  hash: string;
  attempts: number;
};

type LogItem = {
  id: number;
  time: string;
  kind: "info" | "success" | "error";
  text: string;
};

const difficulty = 3;
const target = "0".repeat(difficulty);
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

function shortHash(hash: string, size = 8) {
  if (!hash) return "—";
  return `${hash.slice(0, size)}…${hash.slice(-size)}`;
}

export default function GlobalBlockchainPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [attempt, setAttempt] = useState<MiningAttempt | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [message, setMessage] = useState("Cloud Block");
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
    }, ...current].slice(0, 15));
  }, []);

  // Initialize Genesis block
  useEffect(() => {
    let active = true;
    async function createGenesisBlock() {
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
      addLog("Background cloud blockchain initialized", "success");
    }
    void createGenesisBlock();
    return () => { active = false; };
  }, [addLog]);

  const latest = blocks.at(-1);

  // Your exact manual mining function
  const mine = useCallback(async (event?: SubmitEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    const data = message.trim();
    if (!data || !latest || isMining) return;

    setIsMining(true);
    setAttempt(null);
    addLog(`Mining “${data}”`);
    const startedAt = performance.now();
    const candidate = {
      index: latest.index + 1,
      timestamp: Date.now(),
      data: `${data} #${latest.index + 1}`,
      previousHash: latest.hash,
      nonce: 0,
    };

    try {
      while (true) {
        const hash = await hashBlock(candidate);
        const attempts = candidate.nonce + 1;
        const found = hash.startsWith(target);

        if (attempts === 1 || attempts % 64 === 0 || found) {
          setAttempt({ index: candidate.index, nonce: candidate.nonce, hash, attempts });
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        }

        if (found) {
          setBlocks((current) => [...current, { ...candidate, hash }]);
          addLog(
            `Block #${candidate.index} verified in ${attempts.toLocaleString()} attempts (${Math.round(performance.now() - startedAt)} ms)`,
            "success",
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
  }, [message, latest, isMining, addLog]);

  // Auto-pilot loop that programmatically triggers the manual mine function when idle
  useEffect(() => {
    if (isMining || blocks.length === 0) return;

    const autoPressTimer = setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as unknown as SubmitEvent<HTMLFormElement>;
      void mine(fakeEvent);
    }, 2000);

    return () => clearTimeout(autoPressTimer);
  }, [isMining, blocks, mine]);

  return (
    <>
      {/* Floating Widget Button in Bottom-Right Corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 rounded-full border border-hackrpi-clouds-blue/40 bg-[#011e37]/90 px-5 py-3 shadow-2xl backdrop-blur-xl transition hover:scale-105 hover:border-hackrpi-clouds-green"
          type="button"
        >
          <span className={`h-3 w-3 rounded-full ${isMining ? "animate-pulse bg-[#ffd166] shadow-[0_0_12px_#ffd166]" : "bg-hackrpi-clouds-green shadow-[0_0_8px_rgba(0,255,127,0.5)]"}`} />
          <div className="text-left font-mono text-xs uppercase tracking-wider text-white">
            <span className="block font-bold text-hackrpi-clouds-green">Cloud Chain</span>
            <span>Height: {latest ? latest.index : 0} {isMining ? "(Auto-Mining...)" : "(Idle)"}</span>
          </div>
        </button>
      </div>

      {/* Modal Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-hackrpi-clouds-blue/30 bg-[#001020] p-6 shadow-2xl text-[#f6fbff]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-hackrpi-clouds-blue/20 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-hackrpi-clouds-green">Background Auto-Miner</span>
                <h2 className="text-2xl font-bold text-white xs:text-3xl">Blockchain Telemetry</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
                type="button"
              >
                Close ✕
              </button>
            </div>

            {/* Status Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-hackrpi-clouds-blue/25 bg-[#011e37]/75 p-4 desktop:grid-cols-4">
              <StatusItem label="Chain height" value={latest ? String(latest.index) : "—"} />
              <StatusItem label="Integrity" value={blocks.length ? "Valid" : "Starting"} tone={blocks.length ? "good" : "neutral"} />
              <StatusItem label="Difficulty" value={`${target} prefix`} mono />
              <StatusItem label="Miner" value={isMining ? "Auto-Mining…" : "Idle"} tone={isMining ? "working" : "neutral"} />
            </div>

            {/* Live Ticker & Activity Logs */}
            <div className="mt-6 grid gap-6 desktop:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
              
              <div className="rounded-xl border border-hackrpi-clouds-blue/25 bg-[#011e37]/80 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Active Nonce Search</h3>
                  <span className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] ${isMining ? "text-[#ffd166]" : "text-white/60"}`}>
                    <i className={`h-2 w-2 rounded-full ${isMining ? "animate-pulse bg-[#ffd166]" : "bg-slate-500"}`} />
                    {isMining ? "Searching" : "Waiting"}
                  </span>
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-hackrpi-clouds-blue/20 bg-[#000c1a]/65">
                  <div className="grid border-b border-hackrpi-clouds-blue/20 grid-cols-3 text-center">
                    <Metric label="Block" value={`#${attempt?.index ?? (latest ? latest.index + 1 : 1)}`} />
                    <Metric label="Nonce" value={attempt ? attempt.nonce.toLocaleString() : "—"} />
                    <Metric label="Attempts" value={attempt ? attempt.attempts.toLocaleString() : "—"} last />
                  </div>
                  <div className="flex overflow-hidden px-4 py-6 font-mono text-xs font-bold tracking-wider whitespace-nowrap text-hackrpi-clouds-blue/40 xs:text-sm" aria-live="polite">
                    <span className="text-hackrpi-clouds-green drop-shadow-[0_0_8px_rgba(0,255,127,0.5)]">{attempt?.hash.slice(0, difficulty) || target}</span>
                    <code>{attempt?.hash.slice(difficulty) || "••••••••••••••••••••••••••••••••••••••••••••"}</code>
                  </div>
                </div>
              </div>

              {/* Activity Telemetry */}
              <div className="rounded-xl border border-hackrpi-clouds-blue/25 bg-[#011e37]/80 p-5">
                <h3 className="text-xl font-bold text-white">Activity Logs</h3>
                <div className="mt-4 max-h-48 overflow-auto pr-2">
                  {logs.length === 0 ? <p className="text-sm text-white/55">No events yet.</p> : logs.map((log) => (
                    <div className="border-b border-hackrpi-clouds-blue/15 py-2 text-xs" key={log.id}>
                      <span className="font-mono text-white/45">{log.time}</span>
                      <p className="mt-0.5 text-white/85">{log.text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Canonical Chain History */}
            <div className="mt-6 rounded-xl border border-hackrpi-clouds-blue/25 bg-[#011e37]/80 p-5">
              <h3 className="text-xl font-bold text-white">The Chain ({blocks.length} blocks)</h3>
              <div className="scrollbar-hide mt-4 flex min-h-48 items-stretch overflow-x-auto pb-3 [scrollbar-width:none]">
                {blocks.map((block, index) => (
                  <div className="flex shrink-0 items-center" key={block.hash}>
                    {index > 0 && <div className="h-px w-6 bg-hackrpi-clouds-blue/45" aria-hidden="true" />}
                    <div className={`w-60 rounded-lg border bg-[#04304e]/75 p-4 font-mono text-xs ${block.index === 0 ? "border-hackrpi-clouds-green/50 bg-[#004646]/50" : "border-hackrpi-clouds-blue/30"}`}>
                      <div className="flex justify-between font-bold text-white">
                        <span>{block.index === 0 ? "Genesis" : `Block #${block.index}`}</span>
                        <span className="text-hackrpi-clouds-green">✓ valid</span>
                      </div>
                      <p className="mt-2 truncate text-white/80">{block.data}</p>
                      <div className="mt-3 rounded bg-black/40 p-2"><span className="text-[10px] text-white/50">HASH</span><code className="block text-hackrpi-clouds-green">{shortHash(block.hash)}</code></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

function StatusItem({ label, value, tone = "neutral", mono = false }: {
  label: string;
  value: string;
  tone?: "good" | "bad" | "working" | "neutral";
  mono?: boolean;
}) {
  const toneClass = {
    good: "text-[#00ff7f]",
    bad: "text-[#ff7c84]",
    working: "text-[#ffd166]",
    neutral: "text-white",
  }[tone];

  return (
    <div className="flex flex-col justify-center gap-1">
      <span className="text-xs uppercase text-white/55">{label}</span>
      <strong className={`text-base capitalize ${toneClass} ${mono ? "font-mono" : ""}`}>{value}</strong>
    </div>
  );
}

function Metric({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`py-3 ${last ? "" : "border-r border-hackrpi-clouds-blue/20"}`}>
      <span className="block text-[10px] uppercase tracking-widest text-white/50">{label}</span>
      <strong className="mt-1 block font-mono text-sm">{value}</strong>
    </div>
  );
}
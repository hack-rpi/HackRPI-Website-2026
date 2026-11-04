"use client";

import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";
import { type SubmitEvent, useCallback, useEffect, useMemo, useState } from "react";

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

function timestampLabel(timestamp: number) {
  if (timestamp === 0) return "Network origin";
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);
}

export default function BlockchainPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [attempt, setAttempt] = useState<MiningAttempt | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [message, setMessage] = useState("Hello from HackRPI");
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
    }, ...current].slice(0, 12));
  }, []);

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
      addLog("Local blockchain initialized", "success");
    }

    void createGenesisBlock();
    return () => { active = false; };
  }, [addLog]);

  const latest = blocks.at(-1);
  const chainWork = useMemo(
    () => blocks.slice(1).reduce((total, block) => total + block.nonce + 1, 0),
    [blocks],
  );

  async function mine(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = message.trim();
    if (!data || !latest || isMining) return;

    setIsMining(true);
    setAttempt(null);
    addLog(`Mining “${data}”`);
    const startedAt = performance.now();
    const candidate = {
      index: latest.index + 1,
      timestamp: Date.now(),
      data,
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
  }

  return (
    <>
      <NavBar showOnScroll={false} variant={2} />
      <main className="relative min-h-screen min-w-80 overflow-hidden bg-[radial-gradient(circle_at_12%_5%,rgba(135,206,235,0.2),transparent_27rem),linear-gradient(150deg,#001020_0%,#00152b_48%,#062b47_100%)] pt-12 text-[#f6fbff] desktop:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-30 bg-[linear-gradient(rgba(135,206,235,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(135,206,235,0.1)_1px,transparent_1px)] bg-size-[42px_42px]"
      />
      <div className="pointer-events-none fixed -right-40 -top-32 h-72 w-136 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none fixed -bottom-40 -left-32 h-72 w-136 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-370 px-4 py-5 2xs:px-5 xs:px-6 desktop:px-9 desktop:py-6">
        <header className="grid items-end gap-6 py-6 xs:gap-8 xs:py-8 desktop:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.65fr)] desktop:gap-11 desktop:py-10">
          <div>
            <h1 className="max-w-4xl text-[clamp(2.75rem,15vw,4.75rem)] leading-[0.8] tracking-[-0.04em] text-white uppercase desktop:text-[clamp(3rem,7vw,6.5rem)] desktop:leading-[0.76]">
              Mine above<br /><em className="not-italic text-hackrpi-clouds-blue">the clouds.</em>
            </h1>
          </div>
          <div className="rounded-xl border border-hackrpi-clouds-blue/25 bg-[#011e37]/75 p-5 shadow-2xl backdrop-blur-xl xs:p-6">
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-hackrpi-clouds-green">Browser miner</span>
            <strong className="my-2 block font-mono text-3xl text-white">SHA-256</strong>
            <p className="text-lg leading-relaxed text-white/75">This self-contained demo mines locally.</p>
            <p className="text-lg leading-relaxed text-white/75">Refresh the page to begin a new chain.</p>
          </div>
        </header>

        <section className="grid overflow-hidden rounded-xl border border-hackrpi-clouds-blue/25 bg-[#011e37]/75 shadow-2xl backdrop-blur-xl xs:grid-cols-2 desktop:grid-cols-4" aria-label="Blockchain status">
          <StatusItem label="Chain height" value={latest ? String(latest.index) : "—"} />
          <StatusItem label="Integrity" value={blocks.length ? "Valid" : "Starting"} tone={blocks.length ? "good" : "neutral"} />
          <StatusItem label="Difficulty" value={`${target} prefix`} mono />
          <StatusItem label="Miner" value={isMining ? "Working" : "Idle"} tone={isMining ? "working" : "neutral"} />
        </section>

        <div className="mt-4 grid gap-4 xs:mt-5 xs:gap-5 desktop:grid-cols-[minmax(0,2.1fr)_minmax(290px,0.9fr)]">
          <section className="min-w-0 rounded-2xl border border-hackrpi-clouds-blue/25 bg-[#011e37]/80 p-4 shadow-2xl backdrop-blur-xl 2xs:p-5 xs:p-7">
            <div className="flex flex-col items-start justify-between gap-3 2xs:flex-row 2xs:gap-5">
              <div>
                <h2 className="text-2xl text-white xs:text-4xl">Mine the next block</h2>
              </div>
              <span className={`flex items-center gap-2 text-sm font-bold uppercase tracking-[0.13em] ${isMining ? "text-[#ffd166]" : "text-white/60"}`}>
                <i className={`h-2.5 w-2.5 rounded-full ${isMining ? "animate-pulse bg-[#ffd166] shadow-[0_0_10px_#ffd166] motion-reduce:animate-none" : "bg-slate-500"}`} />
                {isMining ? "Searching" : "Ready"}
              </span>
            </div>

            <form className="mt-8" onSubmit={mine}>
              <label className="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-white/65" htmlFor="block-data">Block data</label>
              <div className="flex flex-col gap-3 xs:flex-row">
                <input
                  id="block-data"
                  maxLength={1000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Enter a message to seal into the chain"
                  className="w-full min-w-0 rounded-lg border border-hackrpi-clouds-blue/30 bg-[#000e1d]/70 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/35 focus:border-hackrpi-clouds-blue focus:ring-4 focus:ring-[#87ceeb]/15 xs:px-5 xs:text-lg"
                />
                <button
                  type="submit"
                  disabled={!latest || isMining || !message.trim()}
                  className="w-full rounded-lg bg-hackrpi-clouds-green px-5 py-3.5 text-lg font-extrabold whitespace-nowrap text-hackrpi-clouds-dark-blue transition hover:-translate-y-0.5 hover:bg-[#7dffbd] disabled:cursor-not-allowed disabled:opacity-40 xs:w-auto xs:min-w-40"
                >
                  {isMining ? "Mining…" : "Start mining"}
                </button>
              </div>
            </form>

            <div className="mt-6 overflow-hidden rounded-lg border border-hackrpi-clouds-blue/20 bg-[#000c1a]/65">
              <div className="grid border-b border-hackrpi-clouds-blue/20 xs:grid-cols-3">
                <Metric label="Candidate block" value={`#${attempt?.index ?? (latest ? latest.index + 1 : 1)}`} />
                <Metric label="Nonce" value={attempt ? attempt.nonce.toLocaleString() : "—"} />
                <Metric label="Attempts" value={attempt ? attempt.attempts.toLocaleString() : "—"} last />
              </div>
              <div className="flex overflow-hidden px-4 py-6 font-mono text-sm font-bold tracking-wider whitespace-nowrap text-hackrpi-clouds-blue/40 2xs:text-base xs:px-5 xs:py-8 xs:text-xl xs:tracking-[0.07em]" aria-live="polite">
                <span className="text-hackrpi-clouds-green drop-shadow-[0_0_8px_rgba(0,255,127,0.5)]">{attempt?.hash.slice(0, difficulty) || target}</span>
                <code>{attempt?.hash.slice(difficulty) || "•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}</code>
              </div>
              <div className="flex flex-wrap items-center gap-3 border-t border-hackrpi-clouds-blue/20 px-5 py-4 text-sm uppercase tracking-[0.09em] text-white/55">
                <span>Target</span>
                <div className="flex gap-1">{target.split("").map((bit, index) => <b className="grid h-7 w-7 place-items-center rounded-sm border border-hackrpi-clouds-green/40 bg-hackrpi-clouds-green/10 font-mono text-sm text-hackrpi-clouds-green" key={index}>{bit}</b>)}</div>
                <span className="w-full 2xs:ml-auto 2xs:w-auto">{chainWork.toLocaleString()} total attempts sealed</span>
              </div>
            </div>
          </section>

          <aside className="min-h-80 overflow-hidden rounded-2xl border border-hackrpi-clouds-blue/25 bg-[#011e37]/80 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4 border-b border-hackrpi-clouds-blue/20 p-4 2xs:p-5 xs:p-6">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-hackrpi-clouds-green">Miner telemetry</p>
                <h2 className="text-2xl text-white xs:text-4xl">Activity</h2>
              </div>
              <button className="text-base font-bold text-white/60 transition hover:text-white" onClick={() => setLogs([])} type="button">Clear</button>
            </div>
            <div className="max-h-92.5 overflow-auto px-4 py-2 2xs:px-5 xs:px-6">
              {logs.length === 0 ? <p className="py-6 text-lg text-white/55">Events will appear here.</p> : logs.map((log) => (
                <div className="grid grid-cols-[10px_1fr] gap-3 border-b border-hackrpi-clouds-blue/15 py-4" key={log.id}>
                  <span className={`mt-1.5 h-2 w-2 rounded-full ${log.kind === "success" ? "bg-hackrpi-clouds-green shadow-[0_0_8px_rgba(0,255,127,0.55)]" : log.kind === "error" ? "bg-[#ff7c84]" : "bg-slate-500"}`} />
                  <div><time className="font-mono text-sm text-white/45">{log.time}</time><p className="mt-1 text-base leading-relaxed text-white/80">{log.text}</p></div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-4 min-w-0 rounded-2xl border border-hackrpi-clouds-blue/25 bg-[#011e37]/80 p-4 shadow-2xl backdrop-blur-xl 2xs:p-5 xs:mt-5 xs:p-7">
          <div className="flex flex-col items-start justify-between gap-2 xs:flex-row xs:gap-5">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-hackrpi-clouds-green">Canonical history</p>
              <h2 className="text-2xl text-white xs:text-4xl">The chain</h2>
            </div>
            <p className="text-sm text-white/55 xs:self-end xs:text-base">{blocks.length} {blocks.length === 1 ? "block" : "blocks"} held in memory</p>
          </div>

          <div className="scrollbar-hide mt-6 flex min-h-60 items-stretch overflow-x-auto overflow-y-hidden pb-5 [scrollbar-width:none]">
            {blocks.length === 0 ? (
              <div className="grid w-full place-items-center rounded-lg border border-dashed border-hackrpi-clouds-blue/30 text-lg text-white/55">Preparing the genesis block…</div>
            ) : blocks.map((block, index) => (
              <div className="flex shrink-0 items-center" key={block.hash}>
                {index > 0 && <div className="relative h-px w-6 bg-hackrpi-clouds-blue/45 2xs:w-8 xs:w-14" aria-hidden="true"><span className="absolute -right-px -top-1 h-2 w-2 rotate-45 border-r border-t border-hackrpi-clouds-green" /></div>}
                <details className={`w-64 self-stretch rounded-lg border bg-[#04304e]/75 2xs:w-68 xs:w-72 ${block.index === 0 ? "border-hackrpi-clouds-green/50 bg-[#004646]/50" : "border-hackrpi-clouds-blue/30 open:border-hackrpi-clouds-blue"}`}>
                  <summary className="cursor-pointer list-none p-5">
                    <div className="flex items-center justify-between font-mono text-sm font-extrabold uppercase text-white">
                      <span>{block.index === 0 ? "Genesis" : `Block ${String(block.index).padStart(2, "0")}`}</span>
                      <span className="text-xs text-hackrpi-clouds-green">✓ verified</span>
                    </div>
                    <p className="mt-6 h-14 overflow-hidden text-lg leading-relaxed text-white/85">{block.data}</p>
                    <div className="mt-5 rounded-md bg-[#000d1b]/65 p-3"><span className="block font-mono text-xs font-bold tracking-[0.13em] text-white/50">HASH</span><code className="mt-2 block text-sm text-[#b8f6d7]">{shortHash(block.hash)}</code></div>
                    <div className="mt-4 flex justify-between font-mono text-xs uppercase text-white/50"><span>{timestampLabel(block.timestamp)}</span><span>nonce {block.nonce.toLocaleString()}</span></div>
                  </summary>
                  <div className="border-t border-hackrpi-clouds-blue/15 px-5 pb-5">
                    <span className="mt-4 block font-mono text-xs font-bold tracking-[0.13em] text-white/50">Full hash</span><code className="mt-2 block wrap-anywhere text-xs leading-relaxed text-white/65">{block.hash}</code>
                    <span className="mt-4 block font-mono text-xs font-bold tracking-[0.13em] text-white/50">Previous hash</span><code className="mt-2 block wrap-anywhere text-xs leading-relaxed text-white/65">{block.previousHash}</code>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

      </div>
      <footer className="mt-8 w-full bg-hackrpi-clouds-dark-blue pt-8 xs:pt-10 desktop:pt-12">
        <div
          id="footer-ellipse"
          aria-hidden="true"
          className="h-0 w-full overflow-hidden opacity-0"
        />
        <Footer />
      </footer>
      </main>
    </>
  );
}

function StatusItem({ label, value, tone = "neutral", dot = false, mono = false }: {
  label: string;
  value: string;
  tone?: "good" | "bad" | "working" | "neutral";
  dot?: boolean;
  mono?: boolean;
}) {
  const toneClass = {
    good: "text-[#00ff7f]",
    bad: "text-[#ff7c84]",
    working: "text-[#ffd166]",
    neutral: "text-white",
  }[tone];

  return (
    <div className="flex min-h-24 flex-col justify-center gap-2 border-b border-hackrpi-clouds-blue/20 px-5 py-4 last:border-b-0 xs:border-r xs:nth-2:border-r-0 xs:nth-3:border-b-0 desktop:border-b-0 desktop:nth-2:border-r desktop:last:border-r-0">
      <span className="text-base text-white/55">{label}</span>
      <strong className={`text-lg capitalize ${toneClass} ${mono ? "font-mono normal-case" : ""}`}>
        {dot && <i className="mr-2 inline-block h-2 w-2 rounded-full bg-current shadow-[0_0_10px_currentColor]" />} {value}
      </strong>
    </div>
  );
}

function Metric({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`border-b border-hackrpi-clouds-blue/20 px-5 py-4 last:border-b-0 xs:border-b-0 ${last ? "xs:border-r-0" : "xs:border-r"}`}>
      <span className="block text-sm uppercase tracking-widest text-white/50">{label}</span>
      <strong className="mt-2 block font-mono text-lg">{value}</strong>
    </div>
  );
}

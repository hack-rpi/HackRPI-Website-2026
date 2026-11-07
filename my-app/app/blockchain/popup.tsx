// app/components/GlobalBlockchainPopup.tsx
"use client";

import { useState, useMemo, useEffect, useCallback, useRef, type SubmitEvent } from "react";

type Block = {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  nonce: number;
  hash: string;
  canvasId: string;
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

type PhysicsNode = {
  block: Block;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isDragging: boolean;
};

const difficulty = 3;
const target = "0".repeat(difficulty);
let nextLogId = 1;

function getDeviceCanvasId(): string {
  if (typeof window === "undefined") return "server-node";
  
  let deviceId = localStorage.getItem("cloud_chain_device_id");
  if (!deviceId) {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.fillText("HackRPI Cloud Chain Canvas Fingerprint", 2, 2);
        const dataUrl = canvas.toDataURL();
        let hash = 0;
        for (let i = 0; i < dataUrl.length; i++) {
          hash = (hash << 5) - hash + dataUrl.charCodeAt(i);
          hash |= 0;
        }
        deviceId = `node_${Math.abs(hash).toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
      } else {
        deviceId = `node_fallback_${Math.random().toString(36).substring(2, 10)}`;
      }
    } catch {
      deviceId = `node_fallback_${Math.random().toString(36).substring(2, 10)}`;
    }
    localStorage.setItem("cloud_chain_device_id", deviceId);
  }
  return deviceId;
}

async function hashBlock(block: Omit<Block, "hash">) {
  const input = JSON.stringify([
    block.index,
    block.timestamp,
    block.data,
    block.previousHash,
    block.nonce,
    block.canvasId,
  ]);
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function shortHash(hash: string, size = 6) {
  if (!hash) return "—";
  return `${hash.slice(0, size)}…${hash.slice(-size)}`;
}

function formatDate(timestamp: number) {
  if (timestamp === 0) return "Genesis Epoch";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp);
}

export default function GlobalBlockchainPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [attempt, setAttempt] = useState<MiningAttempt | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [message, setMessage] = useState("Cloud Block");
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [deviceCanvasId, setDeviceCanvasId] = useState("Initializing...");
  
  const [showOnlyMyBlocks, setShowOnlyMyBlocks] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  // Canvas & Physics Interactive State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<PhysicsNode[]>([]);
  const panRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const draggedNodeRef = useRef<PhysicsNode | null>(null);
  const hoveredNodeRef = useRef<PhysicsNode | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [tooltipInfo, setTooltipInfo] = useState<{ block: Block; x: number; y: number } | null>(null);

  useEffect(() => {
    setDeviceCanvasId(getDeviceCanvasId());
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
    }, ...current].slice(0, 50));
  }, []);

  useEffect(() => {
    let active = true;
    async function createGenesisBlock() {
      const genesisId = getDeviceCanvasId();
      const genesis = {
        index: 0,
        timestamp: 0,
        data: "Genesis Block",
        previousHash: "0",
        nonce: 0,
        canvasId: genesisId,
      };
      const hash = await hashBlock(genesis);
      if (!active) return;
      setBlocks([{ ...genesis, hash }]);
      addLog(`Initialized (${genesisId})`, "success");
    }
    void createGenesisBlock();
    return () => { active = false; };
  }, [addLog]);

  const latest = blocks.at(-1);

  const myMinedCount = useMemo(() => {
    return blocks.filter((b) => b.canvasId === deviceCanvasId).length;
  }, [blocks, deviceCanvasId]);

  const displayedBlocks = useMemo(() => {
    if (showOnlyMyBlocks) {
      return blocks.filter((b) => b.canvasId === deviceCanvasId);
    }
    return blocks;
  }, [blocks, showOnlyMyBlocks, deviceCanvasId]);

  // Fork Analysis: Determine canonical chain vs false/abandoned fork branches
  const chainAnalysis = useMemo(() => {
    const blockMap = new Map<string, Block>();
    const childrenMap = new Map<string, Block[]>();

    blocks.forEach(b => {
      blockMap.set(b.hash, b);
      if (!childrenMap.has(b.previousHash)) {
        childrenMap.set(b.previousHash, []);
      }
      childrenMap.get(b.previousHash)!.push(b);
    });

    const tips: Block[] = [];
    blocks.forEach(b => {
      const children = childrenMap.get(b.hash) || [];
      if (children.length === 0) {
        tips.push(b);
      }
    });

    let bestTip: Block | null = null;
    let maxDepth = -1;

    tips.forEach(tip => {
      let depth = 0;
      let curr: Block | null = tip;
      while (curr && curr.previousHash !== "0") {
        depth++;
        curr = curr ? (blockMap.get(curr.previousHash) ?? null) : null;
      }
      if (depth > maxDepth) {
        maxDepth = depth;
        bestTip = tip;
      }
    });

    const canonicalHashes = new Set<string>();
    let curr: Block | null = bestTip;
    while (curr) {
      canonicalHashes.add(curr.hash);
      if (curr.index === 0 || curr.previousHash === "0") break;
      curr = blockMap.get(curr.previousHash) ?? null;
    }

    return { canonicalHashes, blockMap };
  }, [blocks]);

  // Sync physics nodes safely using existing PhysicsNode positions for parents
  useEffect(() => {
    const existingMap = new Map(nodesRef.current.map(n => [n.block.hash, n]));
    const width = canvasRef.current?.width || (typeof window !== "undefined" ? window.innerWidth : 800);
    const height = canvasRef.current?.height || (typeof window !== "undefined" ? window.innerHeight : 600);

    nodesRef.current = displayedBlocks.map((block, idx) => {
      const existing = existingMap.get(block.hash);
      if (existing && !isNaN(existing.x) && !isNaN(existing.y)) {
        existing.block = block;
        return existing;
      }
      const parentNode = existingMap.get(block.previousHash);
      const startX = parentNode && !isNaN(parentNode.x) ? parentNode.x + (Math.random() * 60 - 30) : width / 2 + (idx * 30);
      const startY = parentNode && !isNaN(parentNode.y) ? parentNode.y + 60 + (Math.random() * 30 - 15) : height / 2;

      return {
        block,
        x: isNaN(startX) ? width / 2 : startX,
        y: isNaN(startY) ? height / 2 : startY,
        vx: 0,
        vy: 0,
        radius: 16,
        isDragging: false,
      };
    });
  }, [displayedBlocks]);

  // Stable Physics & Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isOpen) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const pan = panRef.current;
      const nodeMap = new Map(nodes.map(n => [n.block.hash, n]));

      // Physics constants
      const kSpring = 0.04;
      const restLength = 70;
      const repulsion = 1200;
      const damping = 0.82;
      const centerX = canvas.width / 2 || 400;
      const centerY = canvas.height / 2 || 300;

      // 1. Parent-child spring attraction forces
      nodes.forEach(node => {
        if (isNaN(node.x) || isNaN(node.y)) {
          node.x = centerX;
          node.y = centerY;
          node.vx = 0;
          node.vy = 0;
        }

        const parentNode = nodeMap.get(node.block.previousHash);
        if (parentNode) {
          const dx = parentNode.x - node.x;
          const dy = parentNode.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (dist - restLength) * kSpring;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (!node.isDragging) {
            node.vx += fx * 0.5;
            node.vy += fy * 0.5;
          }
          if (!parentNode.isDragging) {
            parentNode.vx -= fx * 0.5;
            parentNode.vy -= fy * 0.5;
          }
        }
      });

      // 2. Collision repulsion between all node pairs
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = n1.radius + n2.radius + 15;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const rx = (dx / dist) * overlap * 0.5;
            const ry = (dy / dist) * overlap * 0.5;
            if (!n1.isDragging) { n1.x -= rx; n1.y -= ry; }
            if (!n2.isDragging) { n2.x += rx; n2.y += ry; }
          }

          if (dist < 140) {
            const f = repulsion / (dist * dist);
            const fx = (dx / dist) * f;
            const fy = (dy / dist) * f;
            if (!n1.isDragging) { n1.vx -= fx; n1.vy -= fy; }
            if (!n2.isDragging) { n2.vx += fx; n2.vy += fy; }
          }
        }
      }

      // 3. Update velocities, apply centering gravity, and clamp speeds
      nodes.forEach(node => {
        if (!node.isDragging) {
          node.vx += (centerX - node.x) * 0.0008;
          node.vy += (centerY - node.y) * 0.0008;

          node.vx *= damping;
          node.vy *= damping;

          node.vx = Math.max(-6, Math.min(6, node.vx));
          node.vy = Math.max(-6, Math.min(6, node.vy));

          node.x += node.vx;
          node.y += node.vy;
        }
      });

      // 4. Render Edges
      ctx.save();
      ctx.translate(pan.x, pan.y);

      nodes.forEach(node => {
        const parentNode = nodeMap.get(node.block.previousHash);
        if (parentNode) {
          const isCanonicalEdge = chainAnalysis.canonicalHashes.has(node.block.hash) && 
                                  chainAnalysis.canonicalHashes.has(parentNode.block.hash);
          
          ctx.beginPath();
          ctx.moveTo(parentNode.x, parentNode.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = isCanonicalEdge ? "rgba(0, 255, 127, 0.35)" : "rgba(255, 90, 90, 0.25)";
          ctx.lineWidth = isCanonicalEdge ? 2 : 1.5;
          ctx.stroke();
        }
      });

      // 5. Render Nodes
      let foundHover: PhysicsNode | null = null;
      const mouse = mousePosRef.current;

      nodes.forEach(node => {
        const isMyBlock = node.block.canvasId === deviceCanvasId;
        const isCanonical = chainAnalysis.canonicalHashes.has(node.block.hash);
        const screenX = node.x;
        const screenY = node.y;

        const worldMouseX = mouse.x - pan.x;
        const worldMouseY = mouse.y - pan.y;
        const mdx = worldMouseX - screenX;
        const mdy = worldMouseY - screenY;
        if (mdx * mdx + mdy * mdy <= node.radius * node.radius) {
          foundHover = node;
        }

        ctx.save();
        ctx.globalAlpha = isCanonical ? 1.0 : 0.45;

        ctx.beginPath();
        ctx.arc(screenX, screenY, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isMyBlock ? "#001f19" : (isCanonical ? "#03060c" : "#1a0505");
        ctx.fill();
        ctx.lineWidth = isMyBlock ? 2 : 1;
        ctx.strokeStyle = isMyBlock ? "#00ff7f" : (isCanonical ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 90, 90, 0.5)");
        ctx.stroke();

        ctx.fillStyle = isMyBlock ? "#00ff7f" : (isCanonical ? "#ffffff" : "#ff7c84");
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`#${node.block.index}`, screenX, screenY);
        ctx.restore();
      });

      ctx.restore();

      // Tooltip handling
      if (foundHover !== hoveredNodeRef.current) {
        hoveredNodeRef.current = foundHover;
        if (foundHover) {
          setTooltipInfo({
            block: (foundHover as PhysicsNode).block,
            x: mouse.x,
            y: mouse.y,
          });
        } else {
          setTooltipInfo(null);
        }
      } else if (tooltipInfo && foundHover) {
        setTooltipInfo(prev => prev ? { ...prev, x: mouse.x, y: mouse.y } : null);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isOpen, deviceCanvasId, chainAnalysis, tooltipInfo]);

  // Mouse event handlers for dragging nodes & panning background
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const pan = panRef.current;

    const worldX = mouseX - pan.x;
    const worldY = mouseY - pan.y;

    const clickedNode = nodesRef.current.find((node) => {
      const dx = worldX - node.x;
      const dy = worldY - node.y;
      return dx * dx + dy * dy <= node.radius * node.radius;
    });

    if (clickedNode) {
      draggedNodeRef.current = clickedNode;
      clickedNode.isDragging = true;
    } else {
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    mousePosRef.current = { x: mouseX, y: mouseY };

    if (draggedNodeRef.current) {
      const pan = panRef.current;
      draggedNodeRef.current.x = mouseX - pan.x;
      draggedNodeRef.current.y = mouseY - pan.y;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
    } else if (isPanningRef.current) {
      panRef.current = {
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      };
    }
  };

  const handleMouseUp = () => {
    if (draggedNodeRef.current) {
      draggedNodeRef.current.isDragging = false;
      draggedNodeRef.current = null;
    }
    isPanningRef.current = false;
  };

  const mine = useCallback(async (event?: SubmitEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    const data = message.trim();
    if (!data || !latest || isMining) return;

    setIsMining(true);
    setAttempt(null);
    addLog(`Mining #${latest.index + 1}...`);
    const startedAt = performance.now();
    
    const candidate = {
      index: latest.index + 1,
      timestamp: Date.now(),
      data: `${data} #${latest.index + 1}`,
      previousHash: latest.hash,
      nonce: 0,
      canvasId: deviceCanvasId,
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
            `Block #${candidate.index} mined (${Math.round(performance.now() - startedAt)}ms)`,
            "success",
          );
          break;
        }

        candidate.nonce += 1;
      }
    } catch {
      addLog("Mining interrupted", "error");
    } finally {
      setIsMining(false);
    }
  }, [message, latest, isMining, deviceCanvasId, addLog]);

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
      {/* Floating Minimalist Widget Button (Bottom-left, smaller, minimal margin) */}
      <div className="fixed bottom-3 left-3 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-black/60 border border-white/10 px-3 py-1.5 shadow-2xl backdrop-blur-md opacity-75 hover:opacity-100 transition-all hover:scale-105"
          type="button"
        >
          <span className={`h-2 w-2 rounded-full ${isMining ? "animate-pulse bg-[#ffd166]" : "bg-hackrpi-clouds-green shadow-[0_0_8px_#00ff7f]"}`} />
          <div className="font-mono text-[11px] tracking-wider text-white">
            <span className="text-hackrpi-clouds-green font-bold">CloudChain</span> #{latest?.index ?? 0}
          </div>
        </button>
      </div>

      {/* Full-Screen Immersive Pure Black Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#000103] text-slate-100 flex flex-col p-4 md:p-6 animate-fadeIn">
          
          {/* Top Minimalist Inline Status Bar */}
          <div className="flex items-center justify-between pb-3 w-full text-xs font-mono border-b border-white/5">
            <div className="flex flex-wrap items-center gap-3 text-white/70">
              <span className="text-hackrpi-clouds-green font-bold tracking-wider">{deviceCanvasId}</span>
              <span className="text-white/20">/</span>
              <span>H: <strong className="text-white">#{latest?.index ?? 0}</strong></span>
              <span className="text-white/20">/</span>
              <span>MINE: <strong className="text-hackrpi-clouds-green">{myMinedCount}</strong></span>
              <span className="text-white/20">/</span>
              <span>TGT: <strong className="text-white">{target}</strong></span>
              <span className="text-white/20">/</span>
              <span className={isMining ? "text-[#ffd166] animate-pulse font-bold" : "text-white/40"}>
                {isMining ? "MINING" : "STANDBY"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowOnlyMyBlocks((prev) => !prev)}
                className={`rounded px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider transition ${
                  showOnlyMyBlocks ? "bg-hackrpi-clouds-green text-black font-bold" : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                {showOnlyMyBlocks ? "Filter: Mine Only" : "Filter: All"}
              </button>
              <button
                onClick={() => setShowLogs((prev) => !prev)}
                className={`rounded px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider transition ${
                  showLogs ? "bg-white/10 text-white" : "bg-white/5 text-white/40 hover:text-white"
                }`}
                type="button"
              >
                Logs: {showLogs ? "ON" : "OFF"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-white/5 h-7 w-7 flex items-center justify-center font-mono text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
                type="button"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Main Layout Area */}
          <div className="flex-1 flex mt-4 overflow-hidden relative w-full">
            
            {/* Interactive Physics Canvas Graph Area */}
            <div className="flex-1 flex flex-col justify-between w-full overflow-hidden relative bg-transparent p-0 m-0 border-0 shadow-none cursor-grab active:cursor-grabbing">
              
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="absolute inset-0 w-full h-full block"
              />

              {/* Bounded Safe-Corner Tooltip Box */}
              {tooltipInfo && (
                <div
                  style={{
                    left: `${Math.min(window.innerWidth - 300, Math.max(10, tooltipInfo.x + 15))}px`,
                    top: `${Math.min(window.innerHeight - 200, Math.max(10, tooltipInfo.y + 15))}px`,
                  }}
                  className="fixed z-50 w-72 bg-black/95 border border-white/20 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl font-mono text-[10px] text-white/90 pointer-events-none animate-fadeIn"
                >
                  <div className="font-sans text-xs font-semibold text-white mb-2 pb-1.5 border-b border-white/10 truncate">
                    {tooltipInfo.block.data}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-white/50">
                      <span>MINER</span>
                      <span className="text-hackrpi-clouds-blue truncate max-w-[140px]">{tooltipInfo.block.canvasId}</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>TIME</span>
                      <span className="text-white/80">{formatDate(tooltipInfo.block.timestamp)}</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>NONCE</span>
                      <span className="text-white/80">{tooltipInfo.block.nonce.toLocaleString()}</span>
                    </div>
                    <div className="pt-1">
                      <span className="text-white/40 block text-[9px]">HASH</span>
                      <code className="text-hackrpi-clouds-green text-[10px] block truncate">{tooltipInfo.block.hash}</code>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px]">PREV HASH</span>
                      <code className="text-white/60 text-[10px] block truncate">{tooltipInfo.block.previousHash}</code>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Nonce Search Condensed Bar at the Bottom */}
              <div className="relative z-20 rounded-2xl bg-black/60 p-3 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs border border-white/5 mb-1 mt-auto">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[9px] text-white/40 uppercase tracking-wider block">Block</span>
                    <span className="font-bold text-white">#{attempt?.index ?? (latest ? latest.index + 1 : 1)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/40 uppercase tracking-wider block">Nonce</span>
                    <span className="font-bold text-white">{attempt?.nonce.toLocaleString() ?? "—"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/40 uppercase tracking-wider block">Attempts</span>
                    <span className="font-bold text-white">{attempt?.attempts.toLocaleString() ?? "—"}</span>
                  </div>
                </div>
                <div className="truncate max-w-xs sm:max-w-md text-white/40 text-[11px]">
                  <span className="text-hackrpi-clouds-green">{attempt?.hash.slice(0, difficulty) || target}</span>
                  <code>{attempt?.hash.slice(difficulty) || "••••••••••••••••••••••••••••"}</code>
                </div>
              </div>

            </div>

            {/* Overlapping Right-Side Activity Stream Container */}
            {/* Overlapping Right-Side Activity Stream Container */}
            {showLogs && (
              <div className="absolute right-2 top-2 z-30 w-80 h-[calc(100%-1rem)] bg-black/90 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex flex-col border border-white/10 opacity-75 hover:opacity-100 transition-opacity pointer-events-auto">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/5 text-white/70">
                  <span style={{ fontSize: '10px', fontFamily: 'monospace' }} className="uppercase tracking-widest text-white/70">Activity Stream</span>
                  <button style={{ fontSize: '10px', fontFamily: 'monospace' }} onClick={() => setLogs([])} className="text-white/40 hover:text-white transition">Clear</button>
                </div>
                <div className="flex-1 overflow-auto space-y-1 pr-1">
                  {logs.length === 0 ? (
                    <p style={{ fontSize: '10px', fontFamily: 'monospace' }} className="text-white/30 py-4 text-center m-0">No logs yet.</p>
                  ) : (
                    logs.map((log) => (
                      <div key={`log-${log.id}`} className="flex gap-2 items-center py-1 border-b border-white/[0.03]">
                        <span style={{ fontSize: '10px', fontFamily: 'monospace' }} className="text-white/40 shrink-0">{log.time}</span>
                        <p style={{ fontSize: '10px', fontFamily: 'monospace' }} className="text-white/80 truncate m-0">{log.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      )}
    </>
  );
}
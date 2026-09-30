'use client';

import React, { useRef } from "react";

interface SponsorCardProps {
  name: string;
  tier: "obsidian" | "gold" | "silver" | "bronze" | "collaborator" | "track" | string;
  image?: string;
  link?: string;
}

const TIER_STYLES: Record<string, { bg: string; border: string; text: string; shadowRgb: string }> = {
  obsidian: {
    bg: "bg-purple-950/40 bg-gradient-to-br from-purple-400/15 via-purple-600/5 to-transparent",
    border: "border-purple-400/30 hover:border-purple-400/60",
    text: "text-purple-300",
    shadowRgb: "168, 85, 247",
  },
  gold: {
    bg: "bg-amber-950/40 bg-gradient-to-br from-amber-300/20 via-amber-500/5 to-transparent",
    border: "border-amber-300/30 hover:border-amber-300/60",
    text: "text-amber-200",
    shadowRgb: "245, 158, 11",
  },
  silver: {
    bg: "bg-slate-900/50 bg-gradient-to-br from-slate-200/20 via-sky-400/5 to-transparent",
    border: "border-slate-300/30 hover:border-slate-200/60",
    text: "text-slate-100",
    shadowRgb: "148, 163, 184",
  },
  bronze: {
    bg: "bg-orange-950/40 bg-gradient-to-br from-orange-400/20 via-amber-700/5 to-transparent",
    border: "border-orange-400/30 hover:border-orange-400/60",
    text: "text-orange-300",
    shadowRgb: "249, 115, 22",
  },
  collaborator: {
    bg: "bg-white/10 bg-gradient-to-br from-white/20 via-white/5 to-transparent",
    border: "border-white/30 hover:border-white/60",
    text: "text-gray-200",
    shadowRgb: "255, 255, 255",
  },
  track: {
    bg: "bg-gray-900/50 bg-gradient-to-br from-gray-400/15 via-gray-600/5 to-transparent",
    border: "border-gray-500/30 hover:border-gray-400/50",
    text: "text-gray-300",
    shadowRgb: "107, 114, 128",
  },
  default: {
    bg: "bg-white/5 bg-gradient-to-br from-white/10 to-transparent",
    border: "border-white/15 hover:border-white/40",
    text: "text-gray-300",
    shadowRgb: "0, 0, 0",
  },
};

export default function SponsorCard({ name, tier, image, link }: SponsorCardProps) {
  const config = TIER_STYLES[tier?.toLowerCase()] || TIER_STYLES.default;

  const cardRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const relativeX = x / rect.width - 0.5;
    const relativeY = y / rect.height - 0.5;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;

      const rotateX = -relativeY * 18;
      const rotateY = relativeX * 18;
      const imgX = relativeX * -12;
      const imgY = relativeY * -12;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      cardRef.current.style.boxShadow = `${-relativeX * 15}px ${
        -relativeY * 15 + 10
      }px 25px rgba(${config.shadowRgb}, 0.25)`;

      if (logoRef.current) {
        logoRef.current.style.transform = `translateX(${imgX}px) translateY(${imgY}px) translateZ(20px)`;
      }

      if (glareRef.current) {
        glareRef.current.style.opacity = "0.35";
        glareRef.current.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${
          (y / rect.height) * 100
        }%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
      }
    });
  }

  function handleMouseLeave() {
    if (rafId.current) cancelAnimationFrame(rafId.current);

    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      cardRef.current.style.boxShadow = `0px 10px 30px -5px rgba(${config.shadowRgb}, 0.15)`;
    }

    if (logoRef.current) {
      logoRef.current.style.transform = "translateX(0px) translateY(0px) translateZ(0px)";
    }

    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }

  return (
    <a
      href={link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block focus:outline-none shrink-0"
    >
      <div className="flex flex-col items-center">
        {/* Top Hover Label with height constraint to prevent off-screen clipping */}
        <div className="h-6 flex items-center justify-center overflow-hidden">
          <span
            className={`text-xs font-semibold tracking-wider uppercase truncate max-w-[240px] opacity-0 transition-all duration-300 group-hover:opacity-100 ${config.text}`}
          >
            {name}
          </span>
        </div>

        {/* Main Glass Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`
            relative flex items-center justify-center rounded-2xl border 
            w-[240px] h-[150px] sm:w-[280px] sm:h-[170px] p-6
            backdrop-blur-md transform-gpu [will-change:transform]
            transition-transform duration-100 ease-out
            shadow-lg shadow-black/20
            ${config.bg} ${config.border}
          `}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: `0px 10px 30px -5px rgba(${config.shadowRgb}, 0.15)`,
          }}
        >
          {/* Glass Top Rim Highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Dynamic Light Flare */}
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          />

          {/* Logo with Parallax effect */}
          {image && (
            <div
              ref={logoRef}
              className="relative z-10 h-full w-full flex items-center justify-center transition-transform duration-100 ease-out"
            >
              <img
                src={image}
                alt={name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
        </div>

        {/* Bottom Tier Label */}
        <span
          className={`mt-2 text-xs font-mono font-bold tracking-widest uppercase opacity-60 transition-opacity duration-300 group-hover:opacity-100 ${config.text}`}
        >
          {tier}
        </span>
      </div>
    </a>
  );
}
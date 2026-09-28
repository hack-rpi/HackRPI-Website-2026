"use client";

import React, { useRef } from "react";

interface FaceCardProps {
  size?: number;
  zoom?: number;
  offsetX?: number;
  offsetY?: number;
  left?: number;
  top?: number;
  img: string;
  name: string;
  pos: string;
  gradientClass?: string;
}

export default function FaceCard({
  size = 1,
  zoom = 1,
  offsetX = 0,
  offsetY = 0,
  left = 0,
  top = 0,
  img,
  name,
  pos,
  gradientClass,
}: FaceCardProps) {
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const margin = 20;

    if (
      x < margin ||
      x > rect.width - margin ||
      y < margin ||
      y > rect.height - margin
    ) {
      return;
    }

    let percentX = (x / rect.width - 0.5) * 2;
    let percentY = (y / rect.height - 0.5) * 2;

    if (Math.abs(percentX) < 0.05) percentX = 0;
    if (Math.abs(percentY) < 0.05) percentY = 0;

    const rotateY = percentX * 25;
    const rotateX = -percentY * 25;

    card.style.transition = "none";
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function handleLeave(e: React.MouseEvent<HTMLDivElement>) {
    const card = e.currentTarget;
    card.style.transition = "transform 500ms cubic-bezier(0.03, 0.98, 0.52, 0.99)";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <>
      {/* ==================================================== */}
      {/* DESKTOP LAYOUT                                       */}
      {/* ==================================================== */}
      <div
        ref={desktopCardRef}
        className="hidden md:block relative transform-gpu [transform-style:preserve-3d] p-5 select-none componentWillChange-transform"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          height: `min(${size * 45}vh, 60vw)`,
          width: `min(${size * 36}vh, 48vw)`,
          marginLeft: `${left}vw`,
          marginTop: `${top}vh`,
        }}
      >
        {/* Photo Frame Container */}
        <div
          className="h-full w-full rounded-xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm relative"
          style={{
            boxShadow:
              "0 0 40px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          <img
            className="h-full w-full object-cover pointer-events-none"
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`,
            }}
            src={img}
            alt={name}
          />

          {/* 1. Dark Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />

          {/* 2. Text Container */}
          <div className="absolute inset-x-0 bottom-3 text-center z-10">
            <b className="text-white text-lg block drop-shadow-md">{name}</b>
            <b
              className={`
                text-[clamp(8px,2.4vw,12px)] uppercase font-bold tracking-widest leading-tight block -mt-0.5
                bg-gradient-to-b ${gradientClass || "from-blue-400 to-indigo-600"}
                bg-clip-text text-transparent
              `}
            >
              {pos}
            </b>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MOBILE LAYOUT                                        */}
      {/* ==================================================== */}
      <div
        ref={mobileCardRef}
        className="block md:hidden relative transform-gpu [transform-style:preserve-3d] p-3 select-none componentWillChange-transform"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          width: "253px",
          height: "317px",
        }}
      >
        <div
          className="w-full h-[230px] rounded-xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm relative"
          style={{
            boxShadow:
              "0 0 30px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          <img
            className="h-full w-full object-cover pointer-events-none"
            style={{
              transform: `translate(${offsetX * 0.7}px, ${
                offsetY * 0.7
              }px) scale(${zoom})`,
            }}
            src={img}
            alt={name}
          />
        </div>

        {/* Text Container below the image frame */}
        <div className="w-full text-center mt-2.5">
          <b className="text-white text-sm font-bold drop-shadow-md block leading-tight">
            {name}
          </b>
          <b
            className={`
              text-[10px] uppercase font-bold tracking-wider leading-tight block mt-0.5
              bg-gradient-to-b ${gradientClass || "from-blue-400 to-indigo-600"}
              bg-clip-text text-transparent
              drop-shadow-[0_0_8px_rgba(255,255,255,.12)]
            `}
          >
            {pos}
          </b>
        </div>
      </div>
    </>
  );
}
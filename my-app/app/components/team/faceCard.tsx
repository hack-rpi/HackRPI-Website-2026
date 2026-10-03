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
  zoom = 1,
  offsetX = 0,
  offsetY = 0,
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
        className="hidden md:block w-full h-full relative transform-gpu [transform-style:preserve-3d] p-2 select-none componentWillChange-transform"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* Photo Frame Container */}
        <div
          className="h-full w-full rounded-xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm relative"
          style={{
            boxShadow:
              "0 0 40px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Zoomable Image inside isolated overflow wrapper */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <img
              className="h-full w-full object-cover pointer-events-none origin-center"
              style={{
                transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`,
              }}
              src={img}
              alt={name}
            />
          </div>

          {/* 1. Dark Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none z-10" />

          {/* 2. Text Container */}
          <div className="absolute inset-x-0 bottom-4 px-3 text-center z-20">
            <b className="text-white text-base md:text-lg block drop-shadow-md truncate">
              {name}
            </b>
            <b
              className={`
                text-xs uppercase font-bold tracking-widest leading-tight block mt-0.5 truncate
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
        className="block md:hidden w-full h-full relative transform-gpu [transform-style:preserve-3d] p-1 select-none componentWillChange-transform flex flex-col"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div
          className="w-full flex-1 min-h-0 rounded-xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm relative"
          style={{
            boxShadow:
              "0 0 30px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden z-0">
            <img
              className="h-full w-full object-cover pointer-events-none origin-center"
              style={{
                transform: `translate(${offsetX * 0.7}px, ${
                  offsetY * 0.7
                }px) scale(${zoom})`,
              }}
              src={img}
              alt={name}
            />
          </div>
        </div>

        {/* Text Container below image frame */}
        <div className="w-full text-center mt-2 flex-shrink-0 z-10 px-1">
          <b className="text-white text-xs font-bold drop-shadow-md block leading-tight truncate">
            {name}
          </b>
          <b
            className={`
              text-[10px] uppercase font-bold tracking-wider leading-tight block mt-0.5 truncate
              bg-gradient-to-b ${gradientClass || "from-blue-400 to-indigo-600"}
              bg-clip-text text-transparent
            `}
          >
            {pos}
          </b>
        </div>
      </div>
    </>
  );
}
"use client";

import React, { useState } from "react";

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
  const shadowColor = "0,0,0";

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadow, setShadow] = useState(
    `0px 20px 40px rgba(${shadowColor},0.35)`
  );

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
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

    setRotateY(percentX * 25);
    setRotateX(-percentY * 25);

    const shadowX = -percentX * 30;
    const shadowY = -percentY * 30;
    const distance = Math.sqrt(percentX * percentX + percentY * percentY);
    const blur = 30 + distance * 40;
    const opacity = 0.25 + distance * 0.4;

    setShadow(
      `${shadowX}px ${shadowY + 20}px ${blur}px rgba(${shadowColor},${opacity})`
    );
  }

  function handleLeave() {
    setRotateX(0);
    setRotateY(0);
    setShadow(`0px 20px 40px rgba(${shadowColor},0.35)`);
  }

  return (
    <>
      {/* ==================================================== */}
      {/* DESKTOP LAYOUT (Hidden on mobile)                    */}
      {/* Restores original inline viewport height/width math  */}
      {/* ==================================================== */}
      <div
        className="hidden md:block relative transform-gpu [transform-style:preserve-3d] duration-300 p-5 ease-out select-none"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: shadow,
          height: `min(${size * 45}vh, 60vw)`,
          width: `min(${size * 36}vh, 48vw)`,
          marginLeft: `${left}vw`,
          marginTop: `${top}vh`,
        }}
      >
        {/* Photo Frame Container */}
        <div
          className="h-full w-full rounded-xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm"
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
        </div>

        {/* Name Title */}
        <span
          className="relative w-fit mx-auto mt-4 block text-center"
          id="name-animate"
          style={{ clipPath: "inset(0px 100% 0px 0px)" }}
        >
          <b className="text-white text-lg drop-shadow-lg">{name}</b>
          <div
            className="text-animation-layer inline-block w-auto"
            id="text-animate-layer"
          />
        </span>

        {/* Position Title with Gradient Styling */}
        <span
          className="relative w-fit mx-auto -mt-1 block leading-tight text-center"
          id="name-animate"
          style={{ clipPath: "inset(0px 100% 0px 0px)" }}
        >
          <b
            className={`
              text-[clamp(8px,2.4vw,12px)] uppercase font-bold tracking-widest leading-tight
              bg-gradient-to-b ${
                gradientClass || "from-blue-400 to-indigo-600"
              }
              bg-clip-text text-transparent
              drop-shadow-[0_0_8px_rgba(255,255,255,.12)]
            `}
          >
            {pos}
          </b>
        </span>
      </div>

      {/* ==================================================== */}
      {/* MOBILE LAYOUT (Hidden on desktop)                     */}
      {/* Fixed 253px x 317px size with 253:317 photo ratio    */}
      {/* ==================================================== */}
      <div
        className="block md:hidden relative transform-gpu [transform-style:preserve-3d] duration-300 p-3 ease-out select-none"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: shadow,
          width: "253px",
          height: "317px",
        }}
      >
        {/* Photo Frame Container - Exact 253 x 317 proportional box */}
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

        {/* Name Title */}
        <span
          className="relative w-fit mx-auto mt-2 block text-center"
          id="name-animate"
          style={{ clipPath: "inset(0px 100% 0px 0px)" }}
        >
          <b className="text-white text-sm font-bold drop-shadow-md">{name}</b>
          <div
            className="text-animation-layer inline-block w-auto"
            id="text-animate-layer"
          />
        </span>

        {/* Position Title with Gradient Styling */}
        <span
          className="relative w-fit mx-auto -mt-0.5 block leading-tight text-center"
          id="name-animate"
          style={{ clipPath: "inset(0px 100% 0px 0px)" }}
        >
          <b
            className={`
              text-[10px] uppercase font-bold tracking-wider leading-tight
              bg-gradient-to-b ${
                gradientClass || "from-blue-400 to-indigo-600"
              }
              bg-clip-text text-transparent
              drop-shadow-[0_0_8px_rgba(255,255,255,.12)]
            `}
          >
            {pos}
          </b>
        </span>
      </div>
    </>
  );
}
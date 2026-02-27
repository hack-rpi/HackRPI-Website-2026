import React, { useState } from "react";
import { text } from "stream/consumers";


export default function SponsorCard({ name, tier, image }: any) {
  let bg_color, text_color;
  let shadowColor = "0,0,0"; // default RGB

  if (tier === "obsidian") {
    bg_color =
      "bg-slate-900/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-purple-300";
    shadowColor = "147,51,234"; // purple
  } else if (tier === "gold") {
    bg_color =
      "bg-yellow-400/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-yellow-100";
    shadowColor = "234,179,8"; // gold/yellow
  } else if (tier === "silver") {
    bg_color =
      "bg-slate-300/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-white";
    shadowColor = "59,130,246"; // blue glow
  } else if (tier === "bronze") {
    bg_color =
      "bg-orange-700/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-orange-100";
    shadowColor = "239,68,68"; // red/orange glow
  } else {
    bg_color =
      "bg-white/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-red-500";
  }

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadow, setShadow] = useState(
    `0px 20px 40px rgba(${shadowColor},0.35)`
  );

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width - 0.5) * 2;
    const percentY = (y / rect.height - 0.5) * 2;

    // 3D tilt
    setRotateY(percentX * 25);
    setRotateX(-percentY * 25);

    // ⭐ dynamic colored glow
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

  let style =
    "w-[300px] h-[300px] p-5 rounded-2xl backdrop-blur-lg " +
    bg_color +
    " " +
    text_color +
    " transition-transform duration-200 text-center flex items-center justify-center ";

  let style2 = "mt-3 text-sm font-semibold tracking-wide capitalize opacity-0 -translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 " + text_color; 
  return (
  <div className="m-6 flex flex-col items-center group">
    <div
      className={style + " relative overflow-hidden"}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: shadow
      }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        {image && (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
      </div>
    </div>

    {/* 👇 Hover Tier Label */}
    <span
      className={style2}
        
    >
      {tier}
    </span>
  </div>
);
}
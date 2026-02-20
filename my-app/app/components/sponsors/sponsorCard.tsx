import React, { useState } from "react";

export default function SponsorCard({ name, tier }: any) {
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
    "w-[10vh] h-[7.5vh] p-5 rounded-2xl backdrop-blur-lg " +
    bg_color +
    " " +
    text_color +
    " transition-transform duration-200 text-center flex items-center justify-center";

  return (
    <div className="m-5 [perspective:1000px]">
      <div
        className={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: shadow
        }}
      >
        {name || "Content"}
      </div>
    </div>
  );
}
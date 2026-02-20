import React, { useState } from "react";

export default function SponsorCard({ name, tier }: any) {
  let bg_color, text_color, hover;

  if (tier === "obsidian") {
    bg_color =
      "bg-slate-900/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-purple-300";
    hover =
      "hover:shadow-xl hover:shadow-purple-900/50 hover:transition-colors duration-300";
  } else if (tier === "gold") {
    bg_color =
      "bg-yellow-400/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-yellow-100";
    hover =
      "hover:shadow-xl hover:shadow-yellow-900/50 hover:transition-colors duration-300";
  } else if (tier === "silver") {
    bg_color =
      "bg-slate-300/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-white";
    hover =
      "hover:shadow-xl hover:shadow-blue-900/50 hover:transition-colors duration-300";
  } else if (tier === "bronze") {
    bg_color =
      "bg-orange-700/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-orange-100";
    hover =
      "hover:shadow-xl hover:shadow-red-900/50 hover:transition-colors duration-300";
  } else {
    bg_color =
      "bg-white/30 bg-gradient-to-br from-white/10 to-transparent border border-white/20";
    text_color = "text-red-500";
    hover =
      "hover:shadow-xl hover:shadow-white/50 hover:transition-colors duration-300";
  }

  const [rotate, setRotate] = useState(0);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width - 0.5) * 2;
    setRotate(percent * 25);
  }

  function handleLeave() {
    setRotate(0);
  }

  let style =
    "w-[10vh] h-[2.5vh] p-5 rounded-2xl backdrop-blur-lg " +
    bg_color +
    " " +
    text_color +
    " " +
    hover +
    " shadow-2xl transition-transform duration-200 text-center flex items-center justify-center";

  return (
    <div className="m-5 [perspective:1000px]">
      <div
        className={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transform: `rotateY(${rotate}deg)` }}
      >
        {name || "Content"}
      </div>
    </div>
  );
}
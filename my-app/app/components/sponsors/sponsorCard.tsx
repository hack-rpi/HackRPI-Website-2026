import React, { useState } from "react";

export default function SponsorCard({ name, tier, image, link }: any) {
  let bg_color, text_color, opacity, hoverOpacity;
  let shadowColor = "0,0,0";

  if (tier === "obsidian") {
    bg_color = "border-white/20";
    text_color = "text-purple-300";
    shadowColor = "147,51,234";
    opacity = "opacity-70";
    hoverOpacity = "hover:opacity-70";
  } else if (tier === "gold") {
    bg_color = "bg-yellow-100/30 bg-gradient-to-br from-white/15 to-transparent border-white/20";
    text_color = "text-yellow-100";
    shadowColor = "234,179,8";
    opacity = "opacity-85";
    hoverOpacity = "hover:opacity-90";
  } else if (tier === "silver") {
    bg_color = "bg-blue-600/30 bg-gradient-to-br from-white/20 to-transparent border-white/20";
    text_color = "text-white";
    shadowColor = "59,130,246";
    opacity = "opacity-90";
    hoverOpacity = "hover:opacity-95";
  } else if (tier === "bronze") {
    bg_color = "bg-orange-700/30 bg-gradient-to-br from-white/25 to-transparent border-white/20";
    text_color = "text-orange-500";
    shadowColor = "239,68,68";
    opacity = "opacity-95";
    hoverOpacity = "hover:opacity-100";
  } else {
    bg_color = "bg-orange-500/30 bg-gradient-to-br from-white/5 to-transparent border border-white/20";
    text_color = "text-red-600";
  }

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadow, setShadow] = useState(`0px 20px 40px rgba(${shadowColor},0.35)`);
  const [imgX, setImgX] = useState(0);
  const [imgY, setImgY] = useState(0);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = (e.currentTarget as HTMLDivElement).parentElement;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width - 0.5) * 3;
    const percentY = (y / rect.height - 0.5) * 3;

    const moveX = percentX * -20;
    const moveY = percentY * -20;

    setImgX(moveX);
    setImgY(moveY);

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
    setImgX(0);
    setImgY(0);
  }

  let style =
    "w-[300px] h-[300px] p-5 rounded-2xl backdrop-blur-lg " +
    bg_color +
    " " +
    text_color +
    " transition-transform text-center flex items-center justify-center transition-all duration-400 ease-out " +
    opacity +
    " " +
    hoverOpacity;

  let sponsor_rank_style =
    "mt-3 text-sm font-semibold tracking-wide capitalize opacity-0 -translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 " +
    text_color;

  let sponsor_name_style =
    "mt-3 text-sm font-semibold tracking-wide capitalize opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 " +
    text_color;

  return (
    <a href = {link} target="_blank" rel="noopener noreferrer m-5"> 
    <div className="m-6 flex flex-col items-center group perspective-[7500px] relative">

      <span className={sponsor_name_style}>{name}</span>

      <div className="absolute -inset-[10px] z-10" onMouseMove={handleMove} onMouseLeave={handleLeave} />

      <div
        className={style + " m-4 relative overflow-hidden border-3 transform-gpu [transform-style:preserve-3d]"}
        style={{
          transform: `perspective(7500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: shadow
        }}
      > 
          <div className="flex flex-col items-center justify-center gap-2">
            
            {image && (
              <img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-contain p-7 transition-transform duration-200 ease-out"
                style={{
                  transform: `translateX(${imgX}px) translateY(${imgY}px) scale(1.05)`
                }}
              />
            )}
             
          </div>
           
      </div>

      <span className={sponsor_rank_style}>{tier}</span>
    </div>
    </a>
  );
}
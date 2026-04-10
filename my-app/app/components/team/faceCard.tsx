import Lenis from 'lenis'
import React, { useState } from "react";

// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function FaceCard({ size, left, top, img, name }: any) {
	let bg_color, text_color;
	let shadowColor = "0,0,0"; // default RGB

	bg_color = " bg-gradient-to-br from-white/5 to-transparent border border-white/20";


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

		// Prevent jitter near edges
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

		// 3D tilt
		setRotateY(percentX * 25);
		setRotateX(-percentY * 25);

		// dynamic colored glow
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

	let style =" transition-transform transition-all duration-400 ease-out";

	let sponsor_rank_style = "mt-3 text-sm font-semibold tracking-wide capitalize opacity-0 -translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 " + text_color;
	let sponsor_name_style = "mt-3 text-sm font-semibold tracking-wide capitalize opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 " + text_color;

	return (
		<div      className={"absolute transform-gpu [transform-style:preserve-3d] duration-400 p-5 ease-out"}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: shadow,
		height: `${size * 45}vh`, width: `${size * 36}vh`, marginLeft: `${left}vw`, marginTop: `${top}vh` 
        
      }}>
			<div className="h-full w-full rounded-xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm" style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)' }}>
				<img className="h-full w-full object-cover" src={`${img}`} alt={name} />
			</div>
			<span className="relative w-fit mx-auto mt-4 block" id="name-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
				<b className="text-white text-lg drop-shadow-lg">{name}</b>
				<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
			</span>
		</div>
	);
};

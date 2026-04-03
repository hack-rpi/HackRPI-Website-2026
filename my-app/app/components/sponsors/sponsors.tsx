
import SponsorCard from './sponsorCard';
import ShinyCard from '../shinyCard';
import sponsors from '../../../public/sponsors/sponsors.json';
import { useRef, useEffect } from 'react';




export default function Sponsors() {
		const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = document.getElementById("rain") as HTMLCanvasElement | null;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let w = (canvas.width = canvas.offsetWidth);
		let h = (canvas.height = canvas.offsetHeight);

		let drops = Array.from({ length: 150 }, () => ({
			x: Math.random() * w,
			y: Math.random() * h,
			l: Math.random() * 50 + 30,
			speed: Math.random() * 4 + 4
		}));

		function draw() {
			if (!ctx) return;
			ctx.clearRect(0, 0, w, h);

			ctx.strokeStyle = "rgba(200,200,255,0.6)";
			ctx.lineWidth = 1;

			drops.forEach(d => {
				ctx.beginPath();
				ctx.moveTo(d.x, d.y);
				ctx.lineTo(d.x + 1, d.y + d.l);
				ctx.stroke();
				const SPEED_MULTIPLIER = 4;
				d.y += d.speed * SPEED_MULTIPLIER;
				d.x += 2; // slight wind

				if (d.y > h) {
					d.y = -20;
					d.x = Math.random() * w;
				}
			});

			requestAnimationFrame(draw);
		}

		draw();

		window.addEventListener("resize", () => {
	       w = canvas.width = canvas.offsetWidth;
	       h = canvas.height = canvas.offsetHeight;
		});
	}, []);




	return (
		<div 
			
			className="relative min-h-screen overflow-hidden bg-[linear-gradient(to_bottom,#5f6b7a,#2a2f4a,#111112)] p-5 gap-10 flex flex-col">
			<canvas
				id="rain"
				ref={canvasRef}
				className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
			/>
			<div className="w-full h-[9vh] p-5 text-center text-2xl">
				This would not be possible without our sponsors; thank you all for your support!
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{sponsors.OBSIDIAN.map((sponsor, index) => (
					<SponsorCard
						key={index}
						name={sponsor.name}
						tier={"obsidian"}
						image={"/sponsors/sponsor_logos" + sponsor.logoPath}
						link={sponsor.url}
					/>
				))}
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{sponsors.GOLD.map((sponsor, index) => (
					<SponsorCard
						key={index}
						name={sponsor.name}
						tier={"gold"}
						image={"/sponsors/sponsor_logos" + sponsor.logoPath}
						link={sponsor.url}
					/>
				))}
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{sponsors.SILVER.map((sponsor, index) => (
					<SponsorCard
						key={index}
						name={sponsor.name}
						tier={"silver"}
						image={"/sponsors/sponsor_logos" + sponsor.logoPath}
						link={sponsor.url}
					/>
				))}
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{sponsors.BRONZE.map((sponsor, index) => (
					<SponsorCard
						key={index}
						name={sponsor.name}
						tier={"bronze"}
						image={"/sponsors/sponsor_logos/" + sponsor.logoPath}
						link={sponsor.url}
					/>
				))}
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{/* <SponsorCard name="error" tier="invalid" image = "/sponsors/sponsor_logos/" /> */}
			</div>
			{/* <ShinyCard image="" theme=""/> */}
		</div>
	);

};
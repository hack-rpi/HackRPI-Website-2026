"use client"

export default function Mentions() {
	return (
		<div className="h-auto will-change-transform translate-z-0 bg-white" id="mentions-container">
			<div className="flex h-[10vh] gap-0 bg-gBlack"></div>
			<div className="flex h-[120vh] gap-0 bg-gBlack">
				<div className="flex-1 h-[90vh] items-center justify-center text-4xl text-center flex"
					id="trophy-canvas" style={{ transformOrigin: "center", transformBox: "fill-box" }}>
					3d Trophy model placeholder
				</div>
				<div className="flex-1 h-screen w-full text-center content-center grid gap-5 bg-gBlack" id="mentions">
					<span className="text-4xl font-mono relative w-fit mx-auto" id="mentions-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
						Honorable Mentions
						<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
					</span>
					<hr className='border my-1 mx-[10vw]'></hr>

					{Array.from({ length: 10 }).map((_, i) => (
						<span key={i} className="text-xl font-mono relative w-fit mx-auto" id="mentions-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
							John Doe
							<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
						</span>
					))}
				</div>
			</div>
			<div className="w-full h-[10vh] bg-gBlack" style={{ clipPath: "ellipse(70% 0% at 50% 0%)", backgroundColor: "#111112" }} id="footer-ellipse"></div>
			<div className='font-mono text-[50px] flex-1 h-screen w-screen text-center content-center grid gap-10 bg-white p-35 text-gBlack pb-[20vh]'>
				<span className=" relative w-fit mx-auto" id="winner-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
					Hack RPI <b>In the Clouds</b> something
					<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
				</span>
				<span className="relative w-fit mx-auto" id="winner-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
					Amazing hackathon project or whatever
					<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
				</span>
				<span className="relative w-fit mx-auto" id="winner-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
					Proud to host something
					<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
				</span>
				<span className="relative w-fit mx-auto" id="winner-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
					For the <b>thirteenth</b> year in a row we say
					<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
				</span>
				<span className="relative w-fit mx-auto" id="winner-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
					May the best hack <b>win</b>.
					<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
				</span>
			</div>
		</div>
	);
};
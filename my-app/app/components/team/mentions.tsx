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
		</div>
	);
};
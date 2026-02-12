import Lenis from 'lenis'

export default function Mentions() {
	return (
		<div className="h-screen will-change-transform translate-z-0 overflow-hidden bg-gBlack" id="mentions-container">
				<div className="h-full w-full text-center content-center grid gap-5" id="mentions">
					<span className="text-4xl font-mono relative w-fit mx-auto" id="mentions-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
						Honorable Mentions
						<div className="text-animation-layer inline-block w-auto" id="text-animate-layer"/>
					</span>
					<hr className='border-1 my-1 mx-[30vw]'></hr>

					{Array.from({ length: 10 }).map((_, i) => (
						<span key={i} className="text-xl font-mono relative w-fit mx-auto" id="mentions-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
							John Doe
							<div className="text-animation-layer inline-block w-auto" id="text-animate-layer"/>
						</span>
					))}

				</div>
			</div>
	);
};
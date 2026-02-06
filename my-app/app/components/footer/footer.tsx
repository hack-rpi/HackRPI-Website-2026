export default function Footer() {
	return (
		<div className="rounded-lg w-full h-[50vh] mt-10 mb-0 relative bg-white">
			{/* Right Notch Top */}
			<div className="rounded-lg w-full h-full bg-[#111111] absolute "
				style={{ clipPath: "inset(0% 10% 0% 70% round 15px)" }}>
			</div>

			{/* Left Notch Top */}
			<div className="rounded-lg w-full h-full bg-[#111111] absolute "
					style={{ clipPath: "inset(0% 70% 0% 10% round 15px)" }}>
			</div>

			{/* Main Middle */}
			<div className="rounded-lg w-full h-full bg-[#111111] absolute "
					style={{ clipPath: "inset(3% 0% 0% 0% round 30px)" }}>
			</div>

			{/* Main Right */}
			<div className="rounded-lg w-full h-full bg-[#111111] absolute "
					style={{ clipPath: "inset(0% 0% 0% 70% round 30px)" }}>
			</div>

			{/* Main Left */}
			<div className="rounded-lg w-full h-full bg-[#111111] absolute "
					style={{ clipPath: "inset(0% 70% 0% 0% round 30px)" }}>
			</div>

			{/* Black Notch Cutout */}
			<div className="w-full h-full bg-white absolute "
				style={{ clipPath: "inset(-10% 30% 90% 30% round 35px)" }}>
			</div>

			<div className="w-full h-full absolute">
				<div className="w-full h-full grid grid-cols-3 gap-4 pt-15">
					<div className="text-center">01</div>
					<div className="text-center">02</div>
					<div className="text-center">03</div>
				</div>
			</div>

		</div>
	);
}
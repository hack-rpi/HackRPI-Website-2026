export default function Footer() {
	return (
		<div className="rounded-lg w-full h-[40vh] mt-10 mb-5 relative">
			{/* Right Notch Top */}
			<div className="rounded-lg w-full h-full bg-gray-600 absolute "
				style={{ clipPath: "inset(0% 10% 0% 65% round 10px)" }}>
			</div>

			{/* Left Notch Top */}
			<div className="rounded-lg w-full h-full bg-gray-600 absolute "
					style={{ clipPath: "inset(0% 65% 0% 10% round 10px)" }}>
			</div>

			{/* Main Middle */}
			<div className="rounded-lg w-full h-full bg-gray-600 absolute "
					style={{ clipPath: "inset(3% 0% 0% 0% round 30px)" }}>
			</div>

			{/* Main Right */}
			<div className="rounded-lg w-full h-full bg-gray-600 absolute "
					style={{ clipPath: "inset(0% 0% 0% 70% round 30px)" }}>
			</div>

			{/* Main Left */}
			<div className="rounded-lg w-full h-full bg-gray-600 absolute "
					style={{ clipPath: "inset(0% 70% 0% 0% round 30px)" }}>
			</div>

			{/* Black Notch Cutout */}
			<div className="w-full h-full bg-black absolute "
				style={{ clipPath: "inset(-4% 35% 90% 35% round 60px)" }}>
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
import Lenis from 'lenis'

// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function FaceCard({ size, left, top, img, name }: any) {
	return (
		<div style={{ height: `${size * 45}vh`, width: `${size * 36}vh`, marginLeft: `${left}vw`, marginTop: `${top}vh` }} className="absolute">
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

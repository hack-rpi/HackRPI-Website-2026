import Lenis from 'lenis'

// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function FaceCard({ size, left, top, img, name }: any) {
	return (
		<div style={{ height: `${size * 45}vh`, width: `${size * 36}vh`, marginLeft: `${left}vw`, marginTop: `${top}vh` }} className="absolute">
			<span className=" relative w-fit mx-auto" id="name-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
				<b>{name}</b>
				<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
			</span>
			<img className="h-full w-full object-fill mt-3" src={`${img}`}>
			</img>
		</div>
	);
};

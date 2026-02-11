import Lenis from 'lenis'

// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function FaceCard({size, left, top, img}:any) {
	return (
			<div style={{ height: `${size * 45}vh`, width: `${size * 36}vh`, marginLeft: `${left}%`, marginTop: `${top}vh` }} className="bg-black absolute">
				<img className="h-full w-full object-fill" src={`${img}`}>
				</img>
			</div>
	);
};

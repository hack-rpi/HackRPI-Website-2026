import Lenis from 'lenis'

// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function FaceCard({val}:any) {
	return (
			<div style={{
				width:"100px",
				height:"100px",
				backgroundColor:"blue",
			}}>
				{val}
			</div>
	);
};

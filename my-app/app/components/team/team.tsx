
import FaceCard from './faceCard';
// import {FaceCard, Box, Squa} from './faceCard';


const teamMembers = [
	{ img: '/team/aaryan.jpeg', name: 'Aaryan Gautam' },
	{ img: '/team/Adwait_Naware.jpeg', name: 'Adwait Naware' },
	{ img: '/team/calebJR.jpg', name: 'Caleb Liu' },
	{ img: '/team/cj.jpeg', name: 'CJ Marino' },
	{ img: '/team/daksheshJR.jpg', name: 'Dakshesh Amaram' },
	{ img: '/team/devanJR.jpg', name: 'Devan Patel' },
	{ img: '/team/EthanJR.png', name: 'Ethan Kusse' },
	{ img: '/team/jackson.jpeg', name: 'Jackson Baimel' },
	{ img: '/team/jodieJR.jpg', name: 'Jodie Cho' },
	{ img: '/team/lalaJR.jpg', name: 'Lala Liu' },
	{ img: '/team/matthew.jpeg', name: 'Matthew Treanor' },
	{ img: '/team/shankar.jpeg', name: 'Shankar Gowrisankar' },
	{ img: '/team/suyash.jpeg', name: 'Suyash Amatya' },
	{ img: '/team/tobias.jpeg', name: 'Tobias Manayath' },
	{ img: '/team/xenia.jpeg', name: 'Xenia Khusid' },
];

const topOffsets = [45, 35, 25, 30, 45, 30, 40];
const parallaxPositions = [
	{ top: 10, left: 50, size: 0.6 },
	{ top: 55, left: 72, size: 0.5 },
	{ top: 5, left: 94, size: 0.65 },
	{ top: 60, left: 116, size: 0.55 },
	{ top: 15, left: 138, size: 0.6 },
	{ top: 50, left: 160, size: 0.7 },
	{ top: 8, left: 182, size: 0.58 },
	{ top: 55, left: 204, size: 0.62 },
	{ top: 20, left: 226, size: 0.6 },
	{ top: 58, left: 248, size: 0.68 },
	{ top: 12, left: 270, size: 0.56 },
	{ top: 48, left: 292, size: 0.64 },
	{ top: 22, left: 314, size: 0.61 },
	{ top: 52, left: 336, size: 0.59 },
	{ top: 18, left: 358, size: 0.63 },
];

// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function Team() {

	return (
		<div className="h-screen will-change-transform translate-z-0 overflow-hidden bg-gBlack" id="pin">
			{/* parallax background images */}
			<div className="absolute inset-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
				<div className="h-full flex absolute" id="parallax-bg" style={{ width: `${teamMembers.length * 28 + 170}vw` }}>
					{parallaxPositions.map((pos, i) => (
						<div
							key={`parallax-${i}`}
							className="absolute opacity-15 will-change-transform"
							style={{
								height: `${pos.size * 45}vh`,
								width: `${pos.size * 36}vh`,
								marginLeft: `${pos.left}vw`,
								marginTop: `${pos.top}vh`,
								top: 0,
								left: 0,
							}}
						>
							<img
								className="h-full w-full object-cover rounded-lg"
								src={teamMembers[i % teamMembers.length].img}
								alt="parallax-backdrop"
							/>
						</div>
					))}
				</div>
			</div>

			<div className="text-6xl top-10 left-15 font-mono absolute mt-[7vh]" id="team-title" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
				Meet the Team
				<div className="text-animation-layer inline-block w-auto" id="text-animate-layer"/>
			</div>
			<div className="h-full flex absolute" id="team-content" style={{ width: `${teamMembers.length * 28 + 170}vw` }}>
				{teamMembers.map((member, i) => (
					<FaceCard
						key={member.name}
						size={1}
						left={135 + i * 28}
						top={topOffsets[i % topOffsets.length]}
						img={member.img}
						name={member.name}
					/>
				))}
			</div>
		</div>
	);
};
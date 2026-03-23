
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


// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function Team() {

	return (
		<div className="h-screen will-change-transform translate-z-0 overflow-hidden bg-gBlack" id="pin">
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
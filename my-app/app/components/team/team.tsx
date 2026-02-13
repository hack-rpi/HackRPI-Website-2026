import Lenis from 'lenis'
import FaceCard from './faceCard';
// import {FaceCard, Box, Squa} from './faceCard';


// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function Team() {
	return (
		<div className="h-screen will-change-transform translate-z-0 overflow-hidden bg-gBlack" id="pin">
			<div className="text-6xl top-10 left-15 font-mono absolute" id="team-title" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
				Meet the Team
				<div className="text-animation-layer inline-block w-auto" id="text-animate-layer"/>
			</div>
			<div className="h-full w-[370vw] flex absolute" id="team-content">
				<FaceCard size={1} left={135} top={15} img="/placeholder.png" name="Ben Kudarauskas"/>
				<FaceCard size={1} left={155} top={53}img="/placeholder.png" name="John Doe"/>
				<FaceCard size={1} left={200} top={30}img="/placeholder.png" name="Ben Dover"/>
				<FaceCard size={1} left={240} top={10}img="/placeholder.png" name="Ben Kudarauskas"/>
				<FaceCard size={1} left={290} top={30}img="/placeholder.png" name="Ben Kudarauskas"/>
				<FaceCard size={1} left={320} top={10}img="/placeholder.png" name="Ben Dover"/>
				<FaceCard size={1} left={340} top={45}img="/placeholder.png" name="Ben Kudarauskas"/>
			</div>
		</div>
	);
};
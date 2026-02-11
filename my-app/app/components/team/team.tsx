import Lenis from 'lenis'
import FaceCard from './faceCard';
// import {FaceCard, Box, Squa} from './faceCard';


// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function Team() {
	return (
		<div className="h-screen will-change-transform translate-z-0 overflow-hidden" id="pin">
			<div className="text-6xl pt-10 pl-15 font-sans" id="team-title">
				{/*Meet the Team*/}
				{/*<hr className="w-[28vw]"></hr>*/}
			</div>
			<div className="h-full w-[370vw] flex" id="team-content">
				<FaceCard size={1} left={135} top={5} img="/placeholder.png"/>
				<FaceCard size={1} left={155} top={53}img="bleh"/>
				<FaceCard size={1} left={200} top={30}img="/placeholder.png"/>
				<FaceCard size={1} left={240} top={10}img="/placeholder.png"/>
				<div className="h-full w-full text-center ml-[270vw] right-0 content-center grid gap-5" id="mentions">
					<span className="text-4xl font-mono">Honorable Mentions</span>
					<hr className='border-1 my-1 mx-[30vw]'></hr>
					<span className="text-xl font-mono">John Doe</span>
					<span className="text-xl font-mono">John Doe</span>
					<span className="text-xl font-mono">John Doe</span>
					<span className="text-xl font-mono">John Doe</span>
					<span className="text-xl font-mono">John Doe</span>
					<span className="text-xl font-mono">John Doe</span>
					<span className="text-xl font-mono">John Doe</span>
					<span className="text-xl font-mono">John Doe</span>
					<span className="text-xl font-mono">John Doe</span>
					<span className="text-xl font-mono">John Doe</span>
					
				</div>
			</div>
		</div>
	);
};


// export function FaceCard()
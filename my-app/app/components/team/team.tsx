import Lenis from 'lenis'
import FaceCard from './faceCard';
// import {FaceCard, Box, Squa} from './faceCard';


// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function Team() {
	return (
		<div className="h-screen will-change-transform translate-z-0" id="pin">
			<div className="h-full w-[270vw] flex">
				<FaceCard size={1} left={5} top={5} img="/placeholder.png"/>
				<FaceCard size={1} left={15} top={53}img="bleh"/>
				<FaceCard size={1} left={70} top={30}img="/placeholder.png"/>
				<FaceCard size={1} left={130} top={5}img="/placeholder.png"/>
				<div className="h-full w-full text-center ml-[170vw] right-0 content-center grid gap-5">
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
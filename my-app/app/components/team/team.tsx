import Lenis from 'lenis'
import FaceCard from './faceCard';
// import {FaceCard, Box, Squa} from './faceCard';


// https://github.com/darkroomengineering/lenis?tab=readme-ov-file#installation

export default function Team() {
	return (
		<div className="bg-gray-300 h-screen p-5">
			<FaceCard val={"DSFGHJK"}></FaceCard>
			<FaceCard val={'Person2'}/>
		</div>
	);
};


// export function FaceCard()

import { useRef } from 'react';
import Image from 'next/image'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import envelope from './envelope.png';
import "./style.css"

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {

	// useGSAP(() => {
		// Animate the letter to jump up and down
	// 	gsap.timeline()
	// 		.to("#letter", {x: 2, y: -20, duration: 1})
	// 		.yoyo(true)
	// 		.repeat(-1);
	// });

	return (
		<div className="relative p-5 bg-sky-500 min-h-screen">

			<div className="envelopeContainer">
				<div className="envelopeFlap">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="envelopeBody">
					<div className="envelopeMarks"></div>
					<div className="envelopeMarks1"></div>
					<div className="envelopeMarks2"></div>
					<div className="envelopeMarks2"></div>
					<div className="envelopeMarks"></div>
				</div>
			</div>
			


			{/* <div id="letter" className="
				absolute bg-white h-[45vh]
				rotate-6 w-[65vh] left-[35%] top-[30%]
			">
				<h2 className="p-7 pb-3 text-yellow-400 text-4xl">
					About HackRPI
				</h2>
				<div className="p-7 pb-3 pt-0 text-black text-sm">
					HackRPI 2026 is Rensselaer Polytechnic Institute's 13th annual intercollegiate hackathon
					hosted by students for students.
					Starting at noon on Saturday, November 7th, teams of 1-4 people have 24 hours to build
					and submit projects relating to our theme, <b className="text-blue-600">In the Clouds</b>. 
					After submitting their projects, participants demonstrate their projects
					in front of a panel of professors, industry professionals, and fellow students.
				</div>
				<b className="p-7 pt-0 pb-3 text-blue-500">In the Clouds:</b>
				<div className="p-7 pb-3 pt-3 text-black text-sm">
					Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs
					in New York's Tech Valley and beyond. All students from all schools are welcome to
					participate, regardless of their major or experience level.
				</div>
			</div> */}

			{/* <div className="absolute left-[26%] top-[25%]">
				<Image
					src={envelope}
					alt="Envelope"
					width={750}
				/>
			</div> */}
			{/* TODO: The image should later be changed to be responsive. */}

			<div
				className="absolute rotate-6 w-[65vh] h-[60vh] left-[35%] top-[30%] cursor-pointer"
				onClick={
					()=> {
						if (document) {
							(document.getElementById('about-us-letter') as HTMLFormElement).showModal();
						}
					}}>
			</div>
			<dialog id="about-us-letter" className="modal">
				<div className="modal-box bg-white rounded-none w-[65vh]">
					<h2 className="p-7 pb-3 text-yellow-400 text-4xl">
						About HackRPI
					</h2>
					<div className="p-7 pb-3 pt-0 text-black text-sm">
						HackRPI 2026 is Rensselaer Polytechnic Institute's 13th annual intercollegiate hackathon
						hosted by students for students.
						Starting at noon on Saturday, November 7th, teams of 1-4 people have 24 hours to build
						and submit projects relating to our theme, <b className="text-blue-500">In the Clouds</b>. 
						After submitting their projects, participants demonstrate their projects
						in front of a panel of professors, industry professionals, and fellow students.
					</div>
					<b className="p-7 pt-0 pb-3 text-blue-500">In the Clouds:</b>
					<div className="p-7 pb-3 pt-3 text-black text-sm">
						Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs
						in New York's Tech Valley and beyond. All students from all schools are welcome to
						participate, regardless of their major or experience level. Whether you're a seasoned
						hacker or a first-time participant, HackRPI is the perfect opportunity to learn new
						skills, meet new people, and have fun!
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
			
		</div>
	);
}


import { useRef } from 'react';
import Image from 'next/image'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import envelope from './envelope.png';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {

	useGSAP(() => {
		// const sectionPin = document.querySelector("#about");
		// gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: sectionPin,
		// 		scrub: 0.5,
		// 		start: "top 70%",
		// 		end: "+=90%",
		// 	},
		// })
		// .to('#cloud1', {
		// 	x: 75,
		// }, 0)
		// .to('#cloud2', {
		// 	x: -75,
		// }, 0)
		// .to('#cloud3', {
		// 	x: 100,
		// }, 0);

		gsap.timeline()
			.to("#letter", {x: 2, y: -20, duration: 1})
			.yoyo(true)
			.repeat(-1);
	});

	return (
		<div className="relative p-5 bg-sky-500 h-screen">
			<div id="letter" className="
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
				<div className="p-7 pb-3 pt-0 text-black text-sm">
					Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs
					in New York's Tech Valley and beyond. All students from all schools are welcome to
					participate, regardless of their major or experience level.
				</div>
			</div>

			<div className="absolute left-[26%] top-[25%]">
				<Image
					src={envelope}
					alt="Envelope"
					width={750}
				/>
			</div>
			{/* TODO: The image should later be changed to be responsive. */}

			<div className="absolute rotate-6 w-[65vh] h-[60vh] left-[35%] top-[30%] cursor-pointer">
				{/* TODO: clickable element to show the popup */}
			</div>


			{/* <div id="about" className="w-full h-auto p-5 flex flex-col bg-sky-500">
				<div className="w-full mb-[10vh]"/>
				<div className="w-[75vh] h-[9vh] p-5 text-center text-2xl bg-white text-sky-500 mx-auto">
					About Us
				</div>
				<div id="cloud1" className="w-[75vh] bg-white text-sky-500 p-5 mt-10 -translate-x-50">
					HackRPI 2026 is Rensselaer Polytechnic Institute's 13th annual intercollegiate hackathon
					hosted by students for students.
					Starting at noon on Saturday, November 7th, teams of 1-4 people have 24 hours to build
					and submit projects relating to our theme, <b>In the Clouds</b>. 
					After submitting their projects, participants demonstrate their projects
					in front of a panel of professors, industry professionals, and fellow students.
				</div>
				<div id="cloud2" className="w-[75vh] bg-white text-sky-500 p-5 m-5 float-right clear-right ml-auto mr-10 translate-x-25">
					In the Clouds: [PLACEHOLDER TEXT FROM HACKRPI 2025 AFTER]
					In a world where nostalgia meets innovation, our 12th annual hackathon, Retro vs Modern,
					invites creators to explore the contrasts and possibilities between the past and the future.
					Join us in shaping the future through a creative lens that honors the old while embracing the new.
				</div>
				<div id="cloud3" className="w-[75vh] bg-white text-sky-500 p-5 m-5 mb-20">
					Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs
					in New York's Tech Valley and beyond. All students from all schools are welcome to
					participate, regardless of their major or experience level. Whether you're a seasoned
					hacker or a first-time participant, HackRPI is the perfect opportunity to learn new
					skills, meet new people, and have fun!
				</div>
			</div> */}
		</div>
	);
}


import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {

	useGSAP(() => {
		gsap.to('#cloud1', {
			scrollTrigger: "#aboutUs",
			x: 100,
			duration: 1,
		});

		gsap.to('#cloud2', {
			scrollTrigger: "#aboutUs",
			x: -100,
			duration: 1,
		});

		gsap.to('#cloud3', {
			scrollTrigger: "#aboutUs",
			x: 125,
			duration: 1,
		});
	});

	return (
		<div id="about" className="w-full h-auto bg-gray-500 p-5 flex flex-col bg-sky-500">
			<div className="w-full mt-[10vh]"/>
			<div id="aboutUs" className="w-[75vh] h-[9vh] p-5 text-center text-2xl bg-white text-sky-500 mx-auto">
				About Us
			</div>
			<div id="cloud1" className="w-[75vh] bg-white text-sky-500 p-5 mt-10">
				HackRPI 2026 is Rensselaer Polytechnic Institute's 13th annual intercollegiate hackathon
				hosted by students for students.
				Starting at noon on Saturday, November 7th, teams of 1-4 people have 24 hours to build
				and submit projects relating to our theme, <b>In the Clouds</b>. 
				After submitting their projects, participants demonstrate their projects
				in front of a panel of professors, industry professionals, and fellow students.
			</div>
			{/* TODO: Update below */}
			<div id="cloud2" className="w-[75vh] bg-white text-sky-500 p-5 m-5 float-right clear-right ml-auto mr-10">
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
		</div>
	);
}

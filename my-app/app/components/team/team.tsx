"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textAnimation } from "@/lib/text-animation";
import FaceCard from "./faceCard";

gsap.registerPlugin(ScrollTrigger);


const teamMembers = [
	{
		img: '/team/tobias.jpg',
		name: 'Tobias Manayath',
		pos: 'President',
		gradientClass: 'from-blue-400 via-indigo-500 to-blue-700'
	},
	{
		img: '/team/jackson.jpg',
		name: 'Jackson Baimel',
		pos: 'Vice President',
		gradientClass: 'from-red-400 via-rose-500 to-red-700'
	},
	{
		img: '/team/lalaJR.jpg',
		name: 'Lala Liu',
		pos: 'Director of Logistics',
		gradientClass: 'from-yellow-300 via-amber-400 to-yellow-600'
	},
	{
		img: '/team/devanJR.jpg',
		name: 'Devan Patel',
		pos: 'Director of Finance',
		gradientClass: 'from-emerald-300 via-green-400 to-emerald-600'
	},
	{
		img: '/team/EthanJR.png',
		name: 'Ethan Kusse',
		pos: 'Director of Sponsorship',
		gradientClass: 'from-cyan-300 via-sky-400 to-cyan-600'
	},
	{
		img: '/team/Caleb.jpg',
		name: 'Caleb Liu',
		pos: 'Director of Technology',
		gradientClass: 'from-violet-300 via-purple-500 to-violet-700'
	},
	{
		img: '/team/jodieJR.jpg',
		name: 'Jodie Cho',
		pos: 'Director of Marketing',
		gradientClass: 'from-orange-300 via-orange-500 to-orange-700'
	},
	{
		img: '/team/matt.jpg',
		name: 'Matthew Treanor',
		pos: 'Director of Outreach',
		gradientClass: 'from-pink-300 via-rose-500 to-pink-700'
	},
];

export default function Team() {
	useEffect(() => {
		const scrollBox = document.querySelector("#horizontal-scrollbox");
		const parallaxBg = document.querySelector("#parallax-bg") as HTMLElement | null;

		// Clean native scroll handler for background parallax
		const handleScroll = () => {
			if (!scrollBox || !parallaxBg) return;
			const scrolledAmount = scrollBox.scrollLeft;
			
			// Moves background at 30% speed of the foreground scrollbox
			parallaxBg.style.setProperty('--bg-scroll', `-${scrolledAmount * 0.3}px`);
		};

		if (scrollBox) {
			scrollBox.addEventListener("scroll", handleScroll, { passive: true });
		}

		const ctx = gsap.context(() => {
			// Retain your entry text animations 
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: "#pin",
					start: "top 90%",
					toggleActions: "play none none none"
				},
			});

			let HA1 = false;
			tl.call(() => {
				if (!HA1) {
					textAnimation("team-title", 0.6);
					HA1 = true;
				}
			}, [], 0.1);

			let HA2 = false;
			tl.call(() => {
				if (!HA2) {
					textAnimation("name-animate", 1.0, 0.1);
					HA2 = true;
				}
			}, [], 0.0);
		});

		return () => {
			ctx.revert();
			if (scrollBox) {
				scrollBox.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	return (
		<div className="relative min-h-0 md:min-h-screen bg-gBlack pt-12 pb-4 md:py-20 overflow-hidden" id="pin">

			<div className="px-6 md:px-16 max-w-4xl flex flex-col gap-4 mb-16 relative z-10">
				<h2 id="team-title" className="relative text-left text-2xl font-bold tracking-wider text-white/90 uppercase font-mono" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
					Meet the HackRPI Organizing Team
					<div className="text-animation-layer inline-block w-auto" id="text-animate-layer"/>
				</h2>
				<p className="text-lg text-white/70 leading-relaxed">
					Hello! We are a motivated team of RPI students who share a passion for exploring the bounds of Computer Science and a commitment to organizing a fantastic event. Our team of students from every grade and major work together to organize our annual fall hackathon as well as other smaller events throughout the year. We are always looking for more students to join our team and help us make our event a success. If you are interested in helping, please join our discord!
				</p>
			</div>

			<div 
				id="horizontal-scrollbox"
				className="w-full overflow-x-auto overflow-y-visible flex gap-0 px-6 md:px-16 pb-4 md:pb-12 relative z-10 scroll-smooth snap-x select-none"
			>
				{teamMembers.map((member, i) => (
					<div 
							key={member.name} 
							className={`shrink-0 snap-start relative ${i !== 0 ? "-ml-6 md:ml-0" : ""}`}
							style={{ height: 'calc(min(45vh, 60vw) + 5rem)', width: 'min(36vh, 48vw)' }}
					>
							<FaceCard
								size={1}
								left={0} 
								top={0}
								img={member.img}
								name={member.name}
								pos={member.pos}
								gradientClass={member.gradientClass}
							/>
					</div>
				))}
			</div>
		</div>
	);
};

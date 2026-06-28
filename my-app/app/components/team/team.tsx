"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textAnimation } from "@/lib/text-animation";
import FaceCard from "./faceCard";

gsap.registerPlugin(ScrollTrigger);


const teamMembers = [
	{ img: '/team/tobias.jpg', name: 'Tobias Manayath' },
	{ img: '/team/jackson.jpg', name: 'Jackson Baimel' },
	{ img: '/team/Caleb.jpg', name: 'Caleb Liu' },
	{ img: '/team/lalaJR.jpg', name: 'Lala Liu' },
	{ img: '/team/devanJR.jpg', name: 'Devan Patel' },
	{ img: '/team/EthanJR.png', name: 'Ethan Kusse' },
	{ img: '/team/jodieJR.jpg', name: 'Jodie Cho' },
	{ img: '/team/matt.jpg', name: 'Matthew Treanor' },


	
];

const topOffsets = [45, 35, 25, 30, 45, 30, 40];
const parallaxPositions = [
	{ top: 10, left: 50, size: 1.02 },
	{ top: 55, left: 72, size: 0.85 },
	{ top: 5, left: 94, size: 1.105 },
	{ top: 60, left: 116, size: 0.935 },
	{ top: 15, left: 138, size: 1.02 },
	{ top: 50, left: 160, size: 1.19 },
	{ top: 8, left: 182, size: 0.986 },
	{ top: 55, left: 204, size: 1.054 },
	{ top: 20, left: 226, size: 1.02 },
	{ top: 58, left: 248, size: 1.156 },
	{ top: 12, left: 270, size: 0.952 },
	{ top: 48, left: 292, size: 1.088 },
	{ top: 22, left: 314, size: 1.037 },
	{ top: 52, left: 336, size: 1.003 },
	{ top: 18, left: 358, size: 1.071 },
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
		<div className="relative min-h-screen bg-gBlack py-20 overflow-hidden" id="pin">

			<div className="px-6 md:px-16 max-w-4xl flex flex-col gap-4 mb-16 relative z-10">
				<h2 id="team-title" style={{ clipPath: "inset(0px 100% 0px 0px)" }} className="text-left text-2xl font-bold tracking-wider text-white/90 uppercase font-mono">
					Meet the HackRPI Organizing Team
					<div className="text-animation-layer inline-block w-auto" id="text-animate-layer"/>
				</h2>
				<p className="text-lg text-white/70 leading-relaxed">
					Hello! We are a motivated team of RPI students who share a passion for exploring the bounds of Computer Science and a commitment to organizing a fantastic event. Our team of students from every grade and major work together to organize our annual fall hackathon as well as other smaller events throughout the year. We are always looking for more students to join our team and help us make our event a success. If you are interested in helping, please join our discord or fill out one of the forms below!
				</p>
			</div>

			<div 
				id="horizontal-scrollbox"
				className="w-full overflow-x-auto flex gap-12 px-6 md:px-16 pb-12 relative z-10 scroll-smooth snap-x select-none"
			>
				{teamMembers.map((member) => (
					<div 
						key={member.name} 
						className="w-64 h-96 flex-shrink-0 snap-start relative"
					>
						<FaceCard
							size={1}
							left={0} 
							top={0}
							img={member.img}
							name={member.name}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
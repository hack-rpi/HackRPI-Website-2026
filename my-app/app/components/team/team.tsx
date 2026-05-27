"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textAnimation } from "@/lib/text-animation";
import FaceCard from "./faceCard";

gsap.registerPlugin(ScrollTrigger);


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
		const ctx = gsap.context(() => {
			const sectionPin = document.querySelector("#pin");
			const teamTitle = document.querySelector("#team-title");
			const teamContent = document.querySelector("#team-content");
			const parallaxBg = document.querySelector("#parallax-bg");

			if (!sectionPin) return;
			if (!teamTitle) return;

			const scrollWidth = sectionPin.scrollWidth - document.documentElement.clientWidth;
			const introDistance = scrollWidth * 0.15;
			const speed = 1.5;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionPin,
					start: "top 90%",
					end: () => "+=" + scrollWidth * speed,
					scrub: true,
					anticipatePin: 0,
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

			tl.fromTo(teamContent, { x: -introDistance }, { x: -scrollWidth, ease: "none", duration: 1 * speed, force3D: true }, 0);

			if (parallaxBg) {
				tl.fromTo(
					parallaxBg,
					{ x: -introDistance * 0.5 },
					{ x: -scrollWidth * 0.5, ease: "none", duration: 1 * speed, force3D: true },
					0
				);
			}

			tl.to(teamTitle, { x: -scrollWidth / 2, ease: "none", duration: 0.5 * speed, force3D: true }, 0.7 * speed);

			tl.to({}, { duration: 0.1 * speed });

			ScrollTrigger.create({
				trigger: sectionPin,
				start: "top top",
				end: () => "+=" + scrollWidth,
				pin: true,
				anticipatePin: 0,
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<div className="h-screen will-change-transform translate-z-0 overflow-hidden bg-gBlack" id="pin">
			{/* parallax background images */}
			<div className="absolute inset-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
				<div className="h-full flex absolute" id="parallax-bg" style={{ width: `${teamMembers.length * 28 + 170}vw` }}>
					{parallaxPositions.map((pos, i) => (
						<div
							key={`parallax-${i}`}
							className="absolute opacity-15 will-change-transform"
							style={{
								height: `${pos.size * 45}vh`,
								width: `${pos.size * 36}vh`,
								marginLeft: `${pos.left}vw`,
								marginTop: `${pos.top}vh`,
								top: 0,
								left: 0,
							}}
						>
							<img
								className="h-full w-full object-cover rounded-lg"
								src={teamMembers[i % teamMembers.length].img}
								alt="parallax-backdrop"
							/>
						</div>
					))}
				</div>
			</div>

			<div className="absolute left-15 z-50 mt-20 flex flex-col gap-4 max-w-4xl">
				<h2 id="team-title" style={{ clipPath: "inset(0px 100% 0px 0px)" }} className="text-left text-2xl font-bold tracking-wider text-white/90 uppercase font-mono">
					Meet the HackRPI Organizing Team
					<div className="text-animation-layer inline-block w-auto" id="text-animate-layer"/>
				</h2>
				<p className="text-lg text-white/70 leading-relaxed">
					Hello! We are a motivated team of RPI students who share a passion for exploring the bounds of Computer Science and a commitment to organizing a fantastic event. Our team of students from every grade and major work together to organize our annual fall hackathon as well as other smaller events throughout the year. We are always looking for more students to join our team and help us make our event a success. If you are interested in helping, please join our discord or fill out one of the forms below!
				</p>
			</div>

			<div className="h-full flex absolute" id="team-content" style={{ width: `${teamMembers.length * 28 + 170}vw` }}>
				{teamMembers.map((member, i) => (
					<FaceCard
						key={member.name}
						size={1}
						left={135 + i * 28}
						top={topOffsets[0*topOffsets.length]}
						img={member.img}
						name={member.name}
					/>
				))}
			</div>
		</div>
	);
};
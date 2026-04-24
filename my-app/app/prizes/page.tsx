'use client'

import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";

import Lenis from 'lenis';
import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";

import { Canvas, useThree } from "@react-three/fiber";
import { Center, OrbitControls, Text, useGLTF } from '@react-three/drei'

gsap.registerPlugin(ScrollTrigger);

function Model() {
	// clone the scene so more than one timeline instance can use it
	const { scene } = useGLTF('/3d/mkwii3.glb');
	const clonedScene = useMemo(() => scene.clone(), [scene]);
	return <Center><primitive object={clonedScene} /></Center>;
}

function Scene() {
	const { width, height } = useThree((state) => state.viewport)
	const centerRef = useRef<Group | null>(null);

	useEffect(() => {
		const landing = document.querySelector("#landing");
		if (!centerRef.current) return;
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: landing,
				start: "top top",
				end: () => "+=" + window.innerHeight * 0.8,
				scrub: true,
				anticipatePin: 0,
			},
		});
		tl.fromTo(centerRef.current.position, { x: -width / 4, y: height / 4 + 2, z: 0 }, { x: 0, y: -0.5, z: 0, duration: 1, ease: "power1.inOut" }, 0);
		tl.fromTo(centerRef.current.scale, { x: 2, y: 2, z: 2 }, { x: 1, y: 1, z: 1, duration: 0.7, ease: "power1.inOut" }, 0);
		tl.fromTo(centerRef.current.rotation, { x: 0, y: 0, z: 0 }, { x: 0, y: Math.PI * 2, z: 0, duration: 1, ease: "power1.inOut" }, 0);
	}, [width, height]);

	return (
		<>
			{/*				
						Bottom:  position={[0 - 0.5, -height / 2 + 1, 0]} scale={[1,1,1]}
						Top: 	 position={[-width / 2 + 0.5, height / 16 + 1, 0]}  scale={[5,5,5]}
			*/}
			<Center ref={centerRef} bottom position={[-width / 2 + 0.5, height / 16 + 1, 0]} scale={[2, 2, 2]}>
				<Model />
			</Center>
			<ambientLight intensity={2} />
			<pointLight position={[10, 10, 10]} />

			{/* <OrbitControls /> */}
		</>
	)
}

function SceneTransition() {
	const { width, height } = useThree((state) => state.viewport)
	const centerRef = useRef<Group | null>(null);

	useEffect(() => {
		const pin = document.querySelector("#pin");
		if (!centerRef.current) return;
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: pin,
				start: "top top",
				end: () => "+=" + window.innerHeight * 3,
				scrub: true,
				anticipatePin: 0,
			},
		});
		console.log(width / 1.2);
		tl.fromTo(centerRef.current.position, { x: width / 1.2, y: 5, z: 0 }, { x: -width / 1.2, y: 5, z: 0, duration: 1, ease: "power1.inOut" }, 0.2);
		tl.fromTo(centerRef.current.rotation, { x: -0.5, y: -Math.PI, z: 0 }, { x: 0.5, y: -3 * Math.PI, z: 0, duration: 1, ease: "power1.inOut" }, 0.2);
	}, [width, height]);

	return (
		<>
			{/*				
						Bottom:  position={[0 - 0.5, -height / 2 + 1, 0]} scale={[1,1,1]}
						Top: 	 position={[-width / 2 + 0.5, height / 16 + 1, 0]}  scale={[5,5,5]}
			*/}
			<Center ref={centerRef} bottom position={[-width / 2 + 0.5, height / 16 + 1, 0]} scale={[2.5, 2.5, 2.5]}>
				<Model />
			</Center>
			<ambientLight intensity={1} />
			<pointLight position={[10, 10, 10]} />

			{/* <OrbitControls /> */}
		</>
	)
}

export default function prizes() {
	const prizes = [
		{ title: "title", description: "desc", prize: "$100", img: "" },
		{ title: "title2", description: "desc2", prize: "$200", img: "" },
		{ title: "title3", description: "desc3", prize: "$300", img: "" },
		{ title: "title4", description: "desc4", prize: "$400", img: "" },
	];

	function textAnimation(id: string, speed: number = 1.0, delay: number = 0.0, effect: number = 0) {
		// Pass an id for it to iterate though. It must have a child element like this:
		// <div className="text-animation-layer inline-block w-auto" id="text-animate-layer"/>

		// The parent should be a span like this:
		// <span className="text-xl font-mono relative w-fit mx-auto" id="text-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>

		const elements = document.querySelectorAll(`[id="${arguments[0]}"]`);
		if (elements === null) return;
		const tl = gsap.timeline();
		// console.log(elements)

		// For each element, add animations for it to the timeline (queue) and then play them with offsets to make a nice cascading effect
		if (effect == 0) {
			elements.forEach((element) => {
				const offset = Array.from(elements).indexOf(element) * (0.2 + delay);
				if (element.firstElementChild?.tagName == "B") {
					tl.to(element.children[1], { width: "100%", duration: 0.6 * speed, ease: "power1.inOut" }, offset);
					tl.to(element, { clipPath: "inset(0px 0% 0px 0px)", duration: 0.6 * speed, ease: "power1.inOut" }, offset + 0.2 * speed);
					tl.to(element.children[1], { transform: "scale(0, 1)", duration: 0.7 * speed, ease: "power1.inOut" }, offset + 0.8 * speed);

				} else if (element.firstElementChild !== null) {
					tl.to(element.firstElementChild, { width: "100%", duration: 0.6 * speed, ease: "power1.inOut" }, offset);
					tl.to(element, { clipPath: "inset(0px 0% 0px 0px)", duration: 0.7 * speed, ease: "power1.inOut" }, offset + 0.2 * speed);
					tl.to(element.firstElementChild, { transform: "scale(0, 1)", duration: 0.7 * speed, ease: "power1.inOut" }, offset + 0.8 * speed);
				}
				else {
					return;
				}
			});
		} else if (effect == 1) {
			elements.forEach((element) => {
				// animation
				// transform: translateY(50%); clip-path: inset(0px 0% 50% 0px);
				Array.from(element.children).reverse().forEach((child) => {
					const offset = Array.from(element.children).indexOf(child) * (0.2 + delay);
					tl.fromTo(child, { transform: "translateY(100%)", clipPath: "inset(0px 0% 100% 0px)" }, { transform: "translateY(0%)", clipPath: "inset(0px 0% 0% 0px)", ease: "none", duration: 0.7 * speed, force3D: true }, offset);
				});
			});
		}
	}

	useEffect(() => {

		// lenis scrolling
		const lenis = new Lenis({
			smoothWheel: true,
			duration: 1.2,
		});

		lenis.on("scroll", ScrollTrigger.update);

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);


		// Get elements
		const sectionPin = document.querySelector("#pin");
		const majorPrizes = document.querySelector("#majorPrizes");
		const otherPrizes = document.querySelector("#otherPrizes");
		// bg colors to change
		const landing = document.querySelector("#landing");
		const spacer = document.querySelector("#spacer");

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionPin,
				start: "top top",
				end: () => "+=" + window.innerHeight * 3,
				scrub: true,
				anticipatePin: 0,
			},
		});

		tl.fromTo(majorPrizes, { clipPath: "inset(0px -30% 0px 0px)" }, { clipPath: "inset(0px 130% 0px 0px)", duration: 1, ease: "power1.inOut" }, 0.2);

		// Once section pin is fully in view port pin the screen until the end of sideways scrolling.
		ScrollTrigger.create({
			trigger: sectionPin,
			start: "top top",
			end: () => "+=" + (window.innerHeight * 7.5),
			pin: true,
			anticipatePin: 0, // make sure this is off or else it will anticipate it and jump the gun and make it not look smooth
		});

		// Background change color
		const tlColor = gsap.timeline({
			scrollTrigger: {
				trigger: landing,
				start: "top top",
				end: () => "+=" + window.innerHeight * 1.6,
				scrub: true,
				anticipatePin: 0,
			},
		});

		tlColor.fromTo(landing, { backgroundColor: "rgb(0,0,0)" }, { backgroundColor: "rgb(39, 86, 120)", duration: 1, ease: "power1.inOut" }, 0.2);
		tlColor.fromTo(spacer, { backgroundColor: "rgb(0,0,0)" }, { backgroundColor: "rgb(39, 86, 120)", duration: 1, ease: "power1.inOut" }, 0.2);
		tlColor.fromTo(majorPrizes, { backgroundColor: "rgb(0,0,0)" }, { backgroundColor: "rgb(39, 86, 120)", duration: 1, ease: "power1.inOut" }, 0.2);


		const tlScroll = gsap.timeline({
			scrollTrigger: {
				trigger: sectionPin,
				start: "top top",
				end: () => "+=" + window.innerHeight * 7.5,
				scrub: true,
				anticipatePin: 0,
			},
		});

		const prizeRows = gsap.utils.toArray<HTMLElement>(".animate-prizes");
		tlScroll.fromTo(
			prizeRows,
			{ height: "5vh" },
			{ height: "15vh", duration: 0.02, ease: "power1.inOut", stagger: 1.0 },
			1.6,
		);


		return () => {
			ScrollTrigger.killAll();
		};
	}, []);



	return (
		<>
			{/* <NavBar showOnScroll={false} /> */}
			<main className="w-full h-screen font-sans text-lg">
				<div className="h-screen flex" id="landing">
					{/* 3D model */}
					<div className="h-[150vh] w-full absolute">
						<Canvas dpr={[0.9, 1]} orthographic camera={{ position: [0, 0, 5], zoom: 100 }}>
							<Scene />
						</Canvas>
					</div>
					<div className="w-11/20 h-full">
					</div>
					<div className="w-9/20 h-full flex flex-col justify-center">
						<div className="w-[50%] left flex flex-col items-start justify-center text-6xl text-left">
							{/* todo: actaully import impact and a diff fancy font for Prizes */}
							<span className="font-impact"><b>Thousands</b></span>
							<span className="font-impact"><b>In</b></span>
							<span className="font-sans">Prizes</span>
						</div>
						<div className="w-[80%] flex flex-col items-start justify-center text-left pt-5">
							<span className="font-sans text-xl">Join us at HackRPI this year to have a change to win Thousands in prizes over several prize tracks.</span>
						</div>
						{/* todo add a good button call to action to scroll down */}
						<button></button>
					</div>
				</div>
				<div className="h-[50vh] w-full flex items-center justify-center" id="spacer" />

				<div className="w-full h-screen" id="pin">
					 <div className="h-[100vh] z-2 w-full absolute">
						<Canvas dpr={[1, 1.5]} orthographic camera={{ position: [0, 0, 10], zoom: 100 }}>
							<SceneTransition />
						</Canvas>
					</div> 

					<div className="w-full h-screen absolute flex text-center text-2xl font-sans" id="majorPrizes">

						<div className="absolute -bottom-24 w-full h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
						<div className="">

						</div>

					</div>

					<div className="w-full h-screen absolute z-[-1] flex text-center text-2xl font-sans bg-[rgb(200,200,200)]" id="otherPrizes">
						<div className="h-full w-2/5 justify-center items-center flex">
							<div className="w-2/3 bg-gray-200 aspect-square z-[1] flex items-center justify-center rounded-xl text-3xl text-black">
								PLACEHOLDER
							</div>
						</div>
						<div className="h-full w-3/5 flex flex-col justify-center items-center">
							<div className="w-5/6 flex flex-col justify-center items-center rounded-xl overflow-hidden">
								{prizes.map((item, i) => (
									<div key={i} className="animate-prizes w-full min-h-[5vh] bg-gray-500 flex items-center">
										<span className="w-4/5 text-center">{item.title}</span>
										<span className="w-1/5 text-center">{item.prize}</span>
										<br/>
										<span className="w-1/5 text-center">{item.description}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				{/* Once Major prizes if fully in screen, have a 3d model trophy come across 
				the screen and the text change to the other prizes 
				
				This can be achived by putting a clip over the 2nd one, then as the model moves over, 
				the clip reveals it and clips the 1st one

				
				*/}
				<div className="p-5 bg-white">
					<Footer />
				</div>
			</main>
		</>
	);
}


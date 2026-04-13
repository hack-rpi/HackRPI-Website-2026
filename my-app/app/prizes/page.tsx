'use client'

import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";

import Lenis from 'lenis';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";

import { Canvas, useThree } from "@react-three/fiber";
import { Center, OrbitControls, Text } from '@react-three/drei'

gsap.registerPlugin(ScrollTrigger);

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
				end: () => "+=" + window.innerHeight * 0.75,
				scrub: true,
				anticipatePin: 0,
			},});
		tl.fromTo(centerRef.current.position, { x: -width / 2 + 0.5, y: height / 16 + 2, z: 0 }, { x: -0.5, y: -height / 2 + 1, z: 0, duration: 1, ease: "power1.inOut" }, 0);
		tl.fromTo(centerRef.current.scale, { x: 5, y: 5, z: 5 }, { x: 1, y: 1, z: 1, duration: 1, ease: "power1.inOut" }, 0);
		tl.fromTo(centerRef.current.rotation, { x: 0, y: 0, z: 0 }, { x: Math.PI, y: -Math.PI * 2, z: 0, duration: 1, ease: "power1.inOut" }, 0);
	}, [width, height]);

	return (
		<>
			{/*				
						Bottom:  position={[0 - 0.5, -height / 2 + 1, 0]} scale={[1,1,1]}
						Top: 	 position={[-width / 2 + 0.5, height / 16 + 1, 0]}  scale={[5,5,5]}
			*/}
			<Center ref={centerRef} bottom right position={[-width / 2 + 0.5, height / 16 + 1, 0]} scale={[5,5,5]}>
				<mesh rotation={[0, 0, 0]}>
					<boxGeometry />
					<meshStandardMaterial color="blue" />
				</mesh>
			</Center>
			<ambientLight intensity={0.5} />
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
			},});
		tl.fromTo(centerRef.current.position, { x: width /2, y: height / 16 - 2, z: 0 }, { x: -width /2, y: height / 16 - 2, z: 0, duration: 1, ease: "power1.inOut" }, 0.25);
		tl.fromTo(centerRef.current.rotation, { x: 1, y: 0, z: 0 }, { x: 1, y: 3*Math.PI, z: 0, duration: 1, ease: "power1.inOut" }, 0.25);
	}, [width, height]);

	return (
		<>
			{/*				
						Bottom:  position={[0 - 0.5, -height / 2 + 1, 0]} scale={[1,1,1]}
						Top: 	 position={[-width / 2 + 0.5, height / 16 + 1, 0]}  scale={[5,5,5]}
			*/}
			<Center ref={centerRef} bottom right position={[-width / 2 + 0.5, height / 16 + 1, 0]} scale={[5,5,5]}>
				<mesh rotation={[0, 0, 0]}>
					<boxGeometry />
					<meshStandardMaterial color="blue" />
				</mesh>
			</Center>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />

			{/* <OrbitControls /> */}
		</>
	)
}

export default function prizes() {
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
		const minorPrizes = document.querySelector("#minorPrizes");

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionPin,
				start: "top top",
				end: () => "+=" + window.innerHeight * 3,
				scrub: true,
				anticipatePin: 0,
			},
		});

		tl.to(majorPrizes, { clipPath: "inset(0px 100% 0px 0px)", duration: 1, ease: "power1.inOut" }, 0.25);

		// Once section pin is fully in view port pin the screen until the end of sideways scrolling.
		ScrollTrigger.create({
			trigger: sectionPin,
			start: "top top",
			end: () => "+=" + (window.innerHeight * 3.5),
			pin: true,
			anticipatePin: 0, // make sure this is off or else it will anticipate it and jump the gun and make it not look smooth
		});



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
					<div className="h-[130vh] w-full absolute">
						<Canvas orthographic camera={{ position: [0, 0, 5], zoom: 100 }}>
							<Scene />
						</Canvas>
					</div>
					<div className="w-11/20 bg-gBlack h-full">
					</div>
					<div className="w-9/20 bg-gBlack h-full flex flex-col  justify-center">
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
				<div className="h-[30vh] w-full bg-gBlack flex items-center justify-center">
					
				</div>
				<div className="w-full h-screen" id="pin">
					<div className="h-[100vh] z-2 w-full absolute">
						<Canvas orthographic camera={{ position: [0, 0, 5], zoom: 100 }}>
							<SceneTransition />
						</Canvas>
					</div>
					<div className="w-full h-screen absolute bg-gray-400" id="majorPrizes">
						Major prizes
						<div id="track1">
							Track 1
						</div>
						<div id="track2">
							Track 2
						</div>
						<div id="track3">
							Track3
						</div>
					</div>
					<div className="w-full h-screen absolute z-[-1]" id="otherPrizes">
						<div id="minor">
							For minor prize tracks
						</div>
						<div id="mlh">
							For MLH prize tracks
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


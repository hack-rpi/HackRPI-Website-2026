"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textAnimation } from "@/lib/text-animation";

import type { Group } from "three";

import type { PointLight } from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, Text, useGLTF } from '@react-three/drei'

const mentions = [
  { name: "Ryan Bennett", dept: "Logistics" },
  { name: "James DeBlock", dept: "Marketing" },
  { name: "Somey Dong", dept: "Marketing" },
  { name: "Blessing Esochaghi", dept: "Marketing" },
  { name: "Corbin Larsen", dept: "Logistics" },
  { name: "Steven Luo", dept: "Technology" },
  { name: "Matthew Radford", dept: "Finance" },
  { name: "Jordan Ye", dept: "Technology" },
];

const deptConfig: Record<string, { icon: string; gradient: string; shadow: string }> = {
  Logistics:   { icon: "☀︎", gradient: "from-yellow-300 via-amber-400 to-yellow-600",   shadow: "rgba(218,165,32,0.4)" },
  Finance:     { icon: "🌧", gradient: "from-emerald-300 via-green-400 to-emerald-600", shadow: "rgba(85,187,34,0.4)" },
  Sponsorship: { icon: "🌡", gradient: "from-cyan-300 via-sky-400 to-cyan-600",         shadow: "rgba(0,196,196,0.4)" },
  Technology:  { icon: "☁︎", gradient: "from-violet-300 via-purple-500 to-violet-700",  shadow: "rgba(166,77,255,0.4)" },
  Marketing:   { icon: "★",  gradient: "from-orange-300 via-orange-500 to-orange-700",  shadow: "rgba(255,119,0,0.4)" },
  Outreach:    { icon: "☂",  gradient: "from-pink-300 via-rose-500 to-pink-700",        shadow: "rgba(255,51,153,0.4)" },
};


gsap.registerPlugin(ScrollTrigger);

function Model() {
	const { scene } = useGLTF('/3d/trophy.glb');
	const clonedScene = useMemo(() => scene.clone(), [scene]);
	return <Center><primitive object={clonedScene} /></Center>;
}

function MovingLight({ scrollData }: { scrollData: React.MutableRefObject<{ x: number }> }) {
    const lightRef = useRef<PointLight>(null);

    // useFrame runs on every single 3D render frame loop
    useFrame(() => {
        if (lightRef.current) {
            // Constantly read the position from our GSAP-animated object
            lightRef.current.position.x = scrollData.current.x;
        }
    });

    return (
        <pointLight 
            ref={lightRef}
            position={[100, 0, 5]} 
            intensity={5.0} 
            distance={0} 
            decay={1}
        />
    );
}

function Scene({ scrollData }: { scrollData: React.MutableRefObject<{ x: number }> }) {
    return (
        <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
            <ambientLight intensity={0.3} />

            <directionalLight 
                position={[5, 10, 5]} 
                intensity={1.5} 
                castShadow 
            />

            {/* Render the self-updating light */}
            <MovingLight scrollData={scrollData} />

            <hemisphereLight color={"#ffffff"} groundColor={"#444444"} intensity={0.4} />

            <Model/>
            <OrbitControls enableZoom={false} />
        </Canvas>
    )
}

export default function Mentions() {
	const mentionsAnimatedRef = useRef(false);
    const scrollData = useRef({ x: 100 });

	useEffect(() => {
		const ctx = gsap.context(() => {
			const sectionPin = document.querySelector("#pin");
			const mentionsContainer = document.querySelector("#mentions-container");
			if (!mentionsContainer) return;
			const scrollWidth = sectionPin
				? sectionPin.scrollWidth - document.documentElement.clientWidth
				: 0;

			if (!mentions) return;

			ScrollTrigger.create({
				trigger: mentionsContainer,
				start: "20% bottom",
				end: () => "+=" + scrollWidth,
				onEnter: () => {
					if (!mentionsAnimatedRef.current) {
						mentionsAnimatedRef.current = true;
						textAnimation("mentions-animate", 0.6);
					}
				},
			});

			gsap.timeline({
				scrollTrigger: {
					trigger: "#trophy-canvas",
					start: "top 100%", 
					end: "bottom top", 
					scrub: true,
				},
			}).to(scrollData.current, {
                x: -100,
                ease: "none"
            });
		});

		return () => ctx.revert();
	}, []);

	return (
		<div className="h-auto will-change-transform translate-z-0 bg-white" id="mentions-container">
			<div className="flex h-[10vh] gap-0 bg-gBlack"></div>
			<div className="flex h-[120vh] gap-0 bg-gBlack">
				<div className="flex-1 h-[90vh] items-center justify-center text-4xl text-center flex"
					id="trophy-canvas" style={{ transformOrigin: "center", transformBox: "fill-box" }}>
					<Scene scrollData={scrollData}/>
				</div>
				<div className="flex-1 h-screen w-full text-center content-center grid gap-5 bg-gBlack" id="mentions">
					<span className="text-4xl font-mono relative w-fit mx-auto" id="mentions-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
						Our Organizers ♡
						<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
					</span>
					<hr className='border my-1 mx-[10vw]'></hr>
					{mentions.map((m, i) => {
					const cfg = deptConfig[m.dept];
					return (
						<span key={i} className="text-xl font-mono relative w-fit mx-auto flex items-center gap-3" id="mentions-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
							<b className="flex items-center gap-3 font-mono font-normal">
							<span className="text-white">{m.name}</span>
							<span
								className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-b ${cfg.gradient} bg-clip-text text-transparent flex items-center gap-1`}
								style={{ filter: `drop-shadow(0 0 6px ${cfg.shadow})` }}
							>
								{cfg.icon} {m.dept}
							</span>
							</b>
							<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
						</span>
					);
					})}
				</div>
			</div>
		</div>
	);
};
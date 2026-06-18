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
	"Ryan Bennett [Logistics]",
	"James DeBlock [Marketing]",
	"Somey Dong [Marketing]",
	"Blessing Esochaghi [Marketing]",
	"Corbin Larsen [Logistics]",
	"Steven Luo [Technology]",
	"Matthew Radford [Finance]",
	"Jordan Ye [Technology]",
]
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
			const mentions = document.querySelector("#mentions-container");
			const scrollWidth = sectionPin
				? sectionPin.scrollWidth - document.documentElement.clientWidth
				: 0;

			if (!mentions) return;

			ScrollTrigger.create({
				trigger: mentions,
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
						Honorable Mentions
						<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
					</span>
					<hr className='border my-1 mx-[10vw]'></hr>

					{Array.from(mentions).map((_, i) => (
						<span key={i} className="text-xl font-mono relative w-fit mx-auto" id="mentions-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
							{mentions[i]}
							<div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
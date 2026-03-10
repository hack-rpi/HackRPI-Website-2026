"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Model() {
	const { scene } = useGLTF("/3d/plane.glb");
	const modelRef = useRef<THREE.Object3D>(null);

	useFrame((state) => {
		if (modelRef.current) {
			// Make the plane bob up and down using a sine wave
			modelRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime) * 0.5;
			modelRef.current.rotation.z = -Math.PI/Math.abs(Math.sin(state.clock.elapsedTime) + 2 * 5)
		}
	});

	return (
		<primitive 
			ref={modelRef}
			object={scene} 
			position={[4, -1, -5]} 
			rotation={[0, -Math.PI / 4, 0]} 
			scale={0.15} 
		/>
	);
}

useGLTF.preload("/3d/plane.glb");

export default function DesktopTitleComponent() {
	return (
		<div className="relative w-full h-screen bg-blue-4000 p-5 overflow-hidden">
			<div className="absolute inset-0">
				<Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
					<ambientLight intensity={0.45} />
					<directionalLight position={[4, 4, 5]} intensity={1.1} />
					<Suspense fallback={null}>
						<Model />
					</Suspense>
				</Canvas>
			</div>

			<div className="relative z-10 w-fit h-[50vh] p-0 flex flex-col pt-30 pl-20">
				<div
					className="text-blue-200 text-4xl leading-none ml-3"
					style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
					id="title-animate"
				>
					November 7, 8th • Troy, NY
					<div className="text-animation-layer inline-block w-auto" />
				</div>

				<div
					className="text-[14rem] font-bold leading-none tracking-tight"
					style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
					id="title-animate"
				>
					HackRPI
					<div className="text-animation-layer inline-block w-auto" />
				</div>

				<div
					className="text-blue-200 text-[3.3rem] font-mono leading-none ml-auto mr-5"
					style={{ clipPath: "inset(0px 100% 0px 0px)" }}
					id="title-animate"
				>
					IN THE CLOUDS
					<div className="text-animation-layer inline-block w-auto" />
				</div>
			</div>
			<div className="relative z-10 w-fit h-[50vh] p-0 flex flex-col pt-10 pl-20">
				<div
					className="text-blue-200 text-4xl leading-none ml-3"
					style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
					id="title-animate">
					<div className="text-animation-layer inline-block w-auto" />
					{/* placeholders */}
					<li>Event information</li>
					<li>Schedule</li>
					<li>Prizes</li>
					<li>HackRPI XII</li>
					<li>Sponsor Us</li>
					<li>Discord</li>
				</div>
			</div>
		</div>
	);
}

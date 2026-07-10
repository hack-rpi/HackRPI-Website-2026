"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/offscreen";
import Scene from "@/app/components/title-components/three/Scene";
import SceneOnLoad from "@/app/components/title-components/three/Scene";
import Link from 'next/link';

type SceneProps = {
  centered?: boolean;
};

export default function MobileTitleComponent() {

	const [isLoading, setIsLoading] = useState(true);
	
	const worker = useMemo(
		() =>
			new Worker(new URL("@/app/components/title-components/three/worker-mobile.tsx", import.meta.url), {
				type: "module",
			}),
		[]
	);
	
	return ( //  bg-[#00152b] THIS IS TEMP WHILE I SORT OUT 3D MODEL LOADING
		// bg-[url('/3d/placeholder.png')]
	// Or i could just render a view of it since its the same sin wave motion and slap it on the background
		<div className="relative w-full h-screen bg-hackrpi-clouds-dark-blue bg-cover bg-center bg-no-repeat p-5 overflow-hidden flex flex-col">
			<div className="absolute inset-0">
				<Canvas
					worker={worker}
					fallback={<SceneOnLoad onLoaded={() => setIsLoading(false)} />}
					camera={{ position: [0, 0, 6], fov: 55 }}
				/>
			</div>

			<div className="relative z-10 w-fit max-w-full mx-auto flex flex-col items-center justify-center text-center mt-36 mb-8 min-h-0">
				<div
					className="text-blue-200 text-[1rem] leading-none"
					style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
					id="title-animate"
				>
					November 7, 8th • Troy, NY
					<div className="text-animation-layer inline-block w-auto" />
				</div>

				<div
					className="text-[5rem] font-bold leading-none tracking-tight"
					style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
					id="title-animate"
				>
					HackRPI
					<div className="text-animation-layer inline-block w-auto" />
				</div>

				<div
					className="text-blue-200 text-[2rem] font-mono leading-none"
					style={{ clipPath: "inset(0px 100% 0px 0px)" }}
					id="title-animate"
				>
					IN THE CLOUDS
					<div className="text-animation-layer inline-block w-auto" />
				</div>

				<div className="mt-4 left-20">
					<Link
						href="https://events.mlh.com/events/14390-hackrpi-2026"
						className="block px-8 py-3 border border-yellow-100 font-semibold text-yellow-100 font-mono uppercase tracking-widest text-sm hover:bg-yellow-100 hover:text-black transition-colors duration-300"
						style={{ boxShadow: "0 0 20px rgba(254,252,232,0.15), inset 0 0 20px rgba(254,252,232,0.3)" }}
						target="_blank"
					>
						Register Now ⇾
					</Link>
				</div>

				<div className="mt-4 left-20">
					<img src="/cloud.png"></img>
				</div>
			</div>
		</div>
	);
}

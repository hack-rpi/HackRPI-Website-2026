"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/offscreen";
import SceneOnLoad from "@/app/components/title-components/three/Scene";
import Link from "next/link";
import ParallaxClouds from "./parallaxCloudsMobile";
import SkyCountdownOverlay from "./countdown";

export default function MobileTitleComponent() {
  const worker = useMemo(
    () =>
      new Worker(
        new URL("@/app/components/title-components/three/worker-mobile.tsx", import.meta.url),
        {
          type: "module",
        },
      ),
    [],
  );

  return (
    //  bg-[#00152b] THIS IS TEMP WHILE I SORT OUT 3D MODEL LOADING
    // bg-[url('/3d/placeholder.png')]
    // Or i could just render a view of it since its the same sin wave motion and slap it on the background
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-hackrpi-clouds-dark-blue bg-cover bg-center bg-no-repeat p-5">
      <div className="absolute inset-0">
        <Canvas
          worker={worker}
          fallback={<SceneOnLoad />}
          camera={{ position: [0, 0, 6], fov: 55 }}
        />
      </div>

      <div
        className="mt-4"
        style={{ width: "100vw", height: "100vh", position: "absolute", left: 0 }}
      >
        <ParallaxClouds />
        <SkyCountdownOverlay center={true} />
      </div>

      <div className="relative z-10 mx-auto mt-36 mb-8 flex min-h-0 w-fit max-w-full flex-col items-center justify-center text-center">
        <div
          className="text-[1rem] leading-none text-blue-200"
          style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
          id="title-animate"
        >
          November 7, 8th • Troy, NY
          <div className="text-animation-layer inline-block w-auto" />
        </div>

        <div
          className="text-[5rem] leading-none font-bold tracking-tight text-white"
          style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
          id="title-animate"
        >
          HackRPI
          <div className="text-animation-layer inline-block w-auto" />
        </div>

        <div
          className="font-mono text-[2rem] leading-none text-blue-200"
          style={{ clipPath: "inset(0px 100% 0px 0px)" }}
          id="title-animate"
        >
          IN THE CLOUDS
          <div className="text-animation-layer inline-block w-auto" />
        </div>

        <div className="left-20 mt-4">
          <Link
            href="https://events.mlh.com/events/14390-hackrpi-2026"
            className="block border border-yellow-100 px-8 py-3 font-mono text-sm font-semibold tracking-widest text-yellow-100 uppercase transition-colors duration-300 hover:bg-yellow-100 hover:text-black"
            style={{
              boxShadow: "0 0 20px rgba(254,252,232,0.15), inset 0 0 20px rgba(254,252,232,0.3)",
            }}
            target="_blank"
          >
            Register Now ⇾
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, useGLTF } from "@react-three/drei";
import ParallaxClouds from "./parallaxCloudsMobile";
import SkyCountdownOverlay from "./countdownMobile";

useGLTF.preload("/3d/plane0.glb");

function Center3DModel() {
  // Path relative to your public/ directory
  const { scene } = useGLTF("/3d/plane0.glb");

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <primitive object={scene} scale={0.05} position={[0, 0, 0]} />
    </Float>
  );
}

export default function MobileTitleComponent() {
  return (
    <div className="relative w-full min-h-screen mt-5 bg-hackrpi-clouds-dark-blue bg-cover bg-center bg-no-repeat p-6 overflow-hidden flex flex-col justify-between select-none">
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParallaxClouds />
        <SkyCountdownOverlay center={true} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none z-0" />

      <header className="relative z-10 w-full pt-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
            Nov. 7–8
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
            Troy, NY
          </span>
        </div>

        {/* Main Title */}
        <h1
          className="text-white text-5xl sm:text-6xl font-bold tracking-tight leading-none drop-shadow-xl"
          style={{ fontFamily: "Calibri, sans-serif" }}
        >
          HackRPI
        </h1>

        {/* Subtitle Badge */}
        <p className="mt-1 text-cyan-300 text-lg font-mono uppercase tracking-widest font-semibold drop-shadow-[0_0_12px_rgba(103,232,249,0.3)]">
          In The Clouds
        </p>

        {/* Primary CTA Button */}
        <div className="mt-4">
          <Link
            href="https://events.mlh.com/events/14390-hackrpi-2026"
            className="relative inline-flex items-center justify-center px-8 py-2.5 border border-yellow-100/90 font-mono text-yellow-100 uppercase tracking-widest text-xs font-semibold rounded-lg bg-black/40 backdrop-blur-md hover:bg-yellow-100 hover:text-black transition-all duration-300 active:scale-95"
            style={{
              boxShadow:
                "0 0 25px rgba(254, 252, 232, 0.25), inset 0 0 15px rgba(254, 252, 232, 0.2)",
            }}
            target="_blank"
          >
            Register Now ⇾
          </Link>
        </div>
      </header>

      {/* CENTER GAP: Three.js Interactive 3D Canvas */}
      <div className="relative z-10 w-full h-[32vh] my-2 flex justify-center items-center">
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#38bdf8" />
          <Suspense fallback={null}>
            <Center3DModel />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={2}
          />
        </Canvas>
      </div>

      {/* BOTTOM SECTION: Compact Event Highlights Card */}
      <footer className="relative z-10 w-full mt-auto mb-2">
        <div className="w-full bg-black/40 border border-white/15 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex justify-around items-center text-center">
          <div className="flex flex-col items-center">
            <span className="text-yellow-200 font-mono font-bold text-sm">24 Hrs</span>
            <span className="text-[10px] text-white/60 uppercase font-mono tracking-wider">Duration</span>
          </div>

          <div className="h-8 w-[1px] bg-white/15" />

          <div className="flex flex-col items-center">
            <span className="text-cyan-300 font-mono font-bold text-sm">Free</span>
            <span className="text-[10px] text-white/60 uppercase font-mono tracking-wider">Food & Swag</span>
          </div>

          <div className="h-8 w-[1px] bg-white/15" />

          <div className="flex flex-col items-center">
            <span className="text-purple-300 font-mono font-bold text-sm">All Levels</span>
            <span className="text-[10px] text-white/60 uppercase font-mono tracking-wider">Welcome</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
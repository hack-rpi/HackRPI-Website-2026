"use client";

import { useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/models/plane.glb");

  return <primitive object={scene} position={[0, -1, 0]} scale={2.2} />;
}

useGLTF.preload("/models/plane.glb");

export default function DesktopTitleComponent() {
  return (
    <div className="relative w-full h-screen bg-gray-600 p-5 overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[4, 4, 5]} intensity={1.1} />
          <Suspense fallback={null}>{/* <Model /> */}</Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-fit h-[50vh] p-0 flex flex-col pt-30 pl-20">
        <div className="text-blue-200 text-4xl leading-none ml-3" style={{ fontFamily: "Calibri, sans-serif" }}>
          November 7, 8th • Troy, NY
        </div>
        <div
          className="text-[14rem] font-bold leading-none tracking-tight"
          style={{ fontFamily: "Calibri, sans-serif" }}
        >
          HackRPI
        </div>
        <div className="text-blue-200 text-[3.3rem] font-mono leading-none ml-auto mr-5">IN THE CLOUDS</div>
      </div>
    </div>
  );
}

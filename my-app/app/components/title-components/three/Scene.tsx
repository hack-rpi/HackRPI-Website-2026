"use client";

import { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/3d/plane.glb");
  const modelRef = useRef<THREE.Object3D>(null);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y = -1 + Math.sin(state.clock.elapsedTime) * 0.5;
      modelRef.current.rotation.z =
        -Math.PI / Math.abs(Math.sin(state.clock.elapsedTime) + 10);
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

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 4, 5]} intensity={1.1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </>
  );
}

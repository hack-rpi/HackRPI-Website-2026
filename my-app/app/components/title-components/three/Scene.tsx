"use client";

import { Suspense, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
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


function ImageRectangle() {
  const texture = useTexture("/3d/cityf.png"); 
  texture.colorSpace = THREE.SRGBColorSpace;
  

  return (
    <mesh position={[5, -5, -15]} rotation={[-Math.PI / 2.2, 0, Math.PI / 6]} scale={15}>
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function BackgroundSphere() {
  return (
    <mesh position={[7, -98.5, -20]} renderOrder={-1}>
      <sphereGeometry args={[100, 48, 48]} />
      <meshBasicMaterial
        color="#000912"
        side={THREE.BackSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

useGLTF.preload("/3d/plane.glb");

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 4, 5]} intensity={0.8} />
      <Suspense fallback={null}>
        <BackgroundSphere />
        <Model />
        <ImageRectangle />
      </Suspense>
      <></>
    </>
  );
}

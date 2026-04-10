"use client";

import { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PLANE_URL = "/3d/plane0.glb";
const glbLoadStart =
  typeof performance !== "undefined" ? performance.now() : Date.now();
let glbTimingLogged = false;

function Model() {
  const { scene } = useGLTF(PLANE_URL);
  const modelRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (glbTimingLogged) {
      return;
    }

    glbTimingLogged = true;

    const now =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const totalMs = now - glbLoadStart;

    let networkMs: number | undefined;
    if (typeof performance !== "undefined" && "getEntriesByType" in performance) {
      const entries = performance.getEntriesByType("resource");
      const planeEntry = [...entries]
        .reverse()
        .find((entry) => entry.name.includes(PLANE_URL));

      if (planeEntry) {
        const resourceEntry = planeEntry as PerformanceResourceTiming;
        networkMs = resourceEntry.responseEnd - resourceEntry.startTime;
      }
    }

    const decodeMs =
      networkMs !== undefined ? Math.max(0, totalMs - networkMs) : undefined;

    if (networkMs !== undefined && decodeMs !== undefined) {
      console.info(
        `[GLB timing] ${PLANE_URL} total=${totalMs.toFixed(1)}ms network=${networkMs.toFixed(1)}ms decode+parse~=${decodeMs.toFixed(1)}ms`
      );
      return;
    }

    console.info(
      `[GLB timing] ${PLANE_URL} total=${totalMs.toFixed(1)}ms (network timing unavailable)`
    );
  }, []);

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
  const texture = useTexture("/3d/cityf_s.png"); 
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
      <sphereGeometry args={[100, 20, 50]} />
      <meshBasicMaterial
        color="#000912"
        side={THREE.BackSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function BackgroundCircle() {
  return (
    <mesh position={[7, -98.5, -20]} renderOrder={-1}>
      <circleGeometry args={[100, 20]} />
      <meshBasicMaterial
        color="#000912"
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <>
      <directionalLight position={[4, 4, 5]} intensity={0.8} />
        <BackgroundSphere />
        {/* <BackgroundCircle /> */}
        <Model />
        <ImageRectangle />
    </>
  );
}

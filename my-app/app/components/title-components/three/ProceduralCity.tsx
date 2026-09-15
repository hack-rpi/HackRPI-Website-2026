"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

interface ProceduralCityProps {
  origin?: readonly [number, number, number] | [number, number, number];
  speed?: number;
  gridWidth?: number;
  gridDepth?: number;
  tileSize?: number;
  roadWidth?: number;
  maxRadius?: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Realistic indoor lighting color sets (Tungsten, Warm Amber, Cool Fluorescent)
function getRealisticWindowColor(seed: number) {
  const rand = seededRandom(seed);
  if (rand < 0.45) {
    // Warm Soft Tungsten Office (2700K - 3000K)
    return {
      diffuse: "#ffda9e",
      emissive: "#ffb74d",
    };
  } else if (rand < 0.80) {
    // Cool White Modern Office (4000K - 5000K)
    return {
      diffuse: "#e6f2ff",
      emissive: "#9bcbf5",
    };
  } else {
    // Warm Golden Amber
    return {
      diffuse: "#ffe8c2",
      emissive: "#ffa726",
    };
  }
}

// Diverse structural facade materials for building bodies
function getRandomBuildingColor(seed: number) {
  const colorType = Math.floor(seededRandom(seed + 99) * 6);
  const color = new THREE.Color();

  switch (colorType) {
    case 0: // Slate Blue Tinted Glass/Steel
      color.setHSL(0.58, 0.25, 0.35);
      break;
    case 1: // Bronze / Warm Metallic Alloy
      color.setHSL(0.08, 0.35, 0.30);
      break;
    case 2: // Dark Charcoal Concrete
      color.setHSL(0.60, 0.05, 0.22);
      break;
    case 3: // Platinum / Anodized Aluminum
      color.setHSL(0.55, 0.10, 0.50);
      break;
    case 4: // Deep Emerald Office Glass
      color.setHSL(0.42, 0.25, 0.28);
      break;
    case 5: // Dark Copper
    default:
      color.setHSL(0.04, 0.40, 0.25);
      break;
  }
  return color;
}

function getBuildingStats(xIndex: number, gridWidth: number, seed: number) {
  const rand = seededRandom(seed);
  const centerDist = Math.abs(xIndex - gridWidth / 2) / (gridWidth / 2);
  const heightFactor = Math.pow(1 - centerDist, 1.5) * 14 + 3;
  const height = Math.pow(rand, 2) * heightFactor + 1.5;

  const styleGroup = Math.floor(seededRandom(seed + 200) * 3);
  const roofOffsetX = (seededRandom(seed + 400) - 0.5) * 0.5;
  const roofOffsetZ = (seededRandom(seed + 500) - 0.5) * 0.5;

  const baseColor = getRandomBuildingColor(seed);
  const hasRoofEquipment = seededRandom(seed + 300) > 0.3;

  return {
    height,
    baseColor,
    styleGroup,
    hasRoofEquipment,
    roofOffsetX,
    roofOffsetZ,
  };
}

// Transparent alpha overlay allowing per-instance base building colors to shine through
function createBuildingTexture(style: number, seedOffset: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const emissiveCanvas = document.createElement("canvas");
  emissiveCanvas.width = 256;
  emissiveCanvas.height = 256;
  const emissiveCtx = emissiveCanvas.getContext("2d")!;

  if (!ctx) return { map: new THREE.Texture(), emissiveMap: new THREE.Texture() };

  // Clear canvas (transparent background so instanceColor shines through)
  ctx.clearRect(0, 0, 256, 256);
  emissiveCtx.fillStyle = "#000000";
  emissiveCtx.fillRect(0, 0, 256, 256);

  const cols = 8;
  const rows = 8;
  const size = 256 / cols;

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = c * size;
      const y = r * size;
      const windowSeed = seedOffset + c * 17 + r * 31;
      const isLit = seededRandom(windowSeed) > (style === 2 ? 0.70 : 0.55);
      
      const winColor = getRealisticWindowColor(windowSeed);

      if (style === 0) {
        // Office Grid
        const pad = 4;
        // Dark glass pane for unlit, illuminated glass for lit
        ctx.fillStyle = isLit ? winColor.diffuse : "rgba(10, 15, 20, 0.65)";
        ctx.fillRect(x + pad, y + pad, size - pad * 2, size - pad * 2);

        if (isLit) {
          emissiveCtx.fillStyle = winColor.emissive;
          emissiveCtx.fillRect(x + pad, y + pad, size - pad * 2, size - pad * 2);
        }
      } else if (style === 1) {
        // Ribbon Glass Strip
        const padY = 6;
        ctx.fillStyle = isLit ? winColor.diffuse : "rgba(15, 20, 28, 0.70)";
        ctx.fillRect(x, y + padY, size, size - padY * 2);

        if (isLit) {
          emissiveCtx.fillStyle = winColor.emissive;
          emissiveCtx.fillRect(x, y + padY, size, size - padY * 2);
        }
      } else {
        // Vertical Pier Windows
        const padX = 5;
        ctx.fillStyle = isLit ? winColor.diffuse : "rgba(8, 12, 16, 0.75)";
        ctx.fillRect(x + padX, y, size - padX * 2, size);

        if (isLit) {
          emissiveCtx.fillStyle = winColor.emissive;
          emissiveCtx.fillRect(x + padX, y, size - padX * 2, size);
        }
      }
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(1, 4);

  const emissiveMap = new THREE.CanvasTexture(emissiveCanvas);
  emissiveMap.wrapS = THREE.RepeatWrapping;
  emissiveMap.wrapT = THREE.RepeatWrapping;
  emissiveMap.repeat.set(1, 4);

  return { map, emissiveMap };
}

export function ProceduralCity({
  origin = [100, -30, 100],
  speed = 5,
  gridWidth = 100,
  gridDepth = 100,
  tileSize = 3,
  roadWidth = 0.8,
  maxRadius = 110,
}: ProceduralCityProps) {
  const meshRefs = [
    useRef<THREE.InstancedMesh>(null),
    useRef<THREE.InstancedMesh>(null),
    useRef<THREE.InstancedMesh>(null),
  ];
  const roofBoxRef = useRef<THREE.InstancedMesh>(null);
  const roofLedgeRef = useRef<THREE.InstancedMesh>(null);

  const [originX, originY, originZ] = origin;
  const buildingWidth = tileSize - roadWidth;
  const halfDepth = (gridDepth * tileSize) / 2;

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const textureStyles = useMemo(() => {
    if (typeof window === "undefined") return [];
    return [
      createBuildingTexture(0, 12),
      createBuildingTexture(1, 45),
      createBuildingTexture(2, 89),
    ];
  }, []);

  const buildings = useRef<
    Array<{
      xIndex: number;
      posX: number;
      posZ: number;
      height: number;
      seed: number;
      baseColor: THREE.Color;
      styleGroup: number;
      hasRoofEquipment: boolean;
      roofOffsetX: number;
      roofOffsetZ: number;
    }>
  >([]);

  useMemo(() => {
    const list = [];
    let seed = 100;

    for (let x = 0; x < gridWidth; x++) {
      for (let z = 0; z < gridDepth; z++) {
        seed += 1;
        const posX = (x - gridWidth / 2) * tileSize;
        const posZ = (z - gridDepth / 2) * tileSize;

        const {
          height,
          baseColor,
          styleGroup,
          hasRoofEquipment,
          roofOffsetX,
          roofOffsetZ,
        } = getBuildingStats(x, gridWidth, seed);

        list.push({
          xIndex: x,
          posX,
          posZ,
          height,
          seed,
          baseColor,
          styleGroup,
          hasRoofEquipment,
          roofOffsetX,
          roofOffsetZ,
        });
      }
    }
    buildings.current = list;
  }, [gridWidth, gridDepth, tileSize]);

    useEffect(() => {
        const textures = textureStyles;
        return () => {
            textures.forEach(({ map, emissiveMap }) => {
            map.dispose();
            emissiveMap.dispose();
            });
        };
    }, [textureStyles]);

  useLayoutEffect(() => {
    buildings.current.forEach((b, i) => {
      const mesh = meshRefs[b.styleGroup]?.current;
      if (!mesh) return;

      dummy.position.set(b.posX, b.height / 2, b.posZ);
      dummy.scale.set(buildingWidth, b.height, buildingWidth);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, b.baseColor);
    });

    meshRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.instanceMatrix.needsUpdate = true;
        ref.current.count = buildings.current.length;
        if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
      }
    });
  }, [buildingWidth, dummy]);

  useFrame((_, delta) => {
    const roofBox = roofBoxRef.current;
    const roofLedge = roofLedgeRef.current;

    const moveAmount = speed * delta;

    buildings.current.forEach((b, i) => {
      const mesh = meshRefs[b.styleGroup]?.current;
      if (!mesh) return;

      b.posZ += moveAmount;

      if (b.posZ > halfDepth) {
        b.posZ -= gridDepth * tileSize;
        b.seed += 777;

        const {
          height,
          baseColor,
          styleGroup,
          hasRoofEquipment,
          roofOffsetX,
          roofOffsetZ,
        } = getBuildingStats(b.xIndex, gridWidth, b.seed);

        b.height = height;
        b.baseColor = baseColor;
        b.styleGroup = styleGroup;
        b.hasRoofEquipment = hasRoofEquipment;
        b.roofOffsetX = roofOffsetX;
        b.roofOffsetZ = roofOffsetZ;

        mesh.setColorAt(i, b.baseColor);
      }

      const distFromCenter = Math.sqrt(b.posX * b.posX + b.posZ * b.posZ);
      const fadeZone = 30;
      const scaleFactor = THREE.MathUtils.clamp(
        (maxRadius - distFromCenter) / fadeZone,
        0,
        1
      );

      const currentWidth = buildingWidth * scaleFactor;
      const currentHeight = b.height * scaleFactor;

      // Building Body
      dummy.position.set(b.posX, currentHeight / 2, b.posZ);
      dummy.scale.set(currentWidth, currentHeight, currentWidth);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      // Roof Edge Parapet Wall
      if (roofLedge) {
        if (scaleFactor > 0.05) {
          const parapetH = 0.15 * scaleFactor;
          dummy.position.set(b.posX, currentHeight + parapetH / 2, b.posZ);
          dummy.scale.set(currentWidth * 1.01, parapetH, currentWidth * 1.01);
        } else {
          dummy.scale.set(0, 0, 0);
        }
        dummy.updateMatrix();
        roofLedge.setMatrixAt(i, dummy.matrix);
      }

      // Small Roof HVAC Equipment Boxes
      if (roofBox) {
        if (b.hasRoofEquipment && scaleFactor > 0.1) {
          const boxSizeW = currentWidth * 0.22;
          const boxSizeH = Math.min(0.4, currentHeight * 0.08);

          const offsetX = b.roofOffsetX * (currentWidth - boxSizeW);
          const offsetZ = b.roofOffsetZ * (currentWidth - boxSizeW);

          dummy.position.set(
            b.posX + offsetX,
            currentHeight + boxSizeH / 2 + 0.05,
            b.posZ + offsetZ
          );
          dummy.scale.set(boxSizeW, boxSizeH, boxSizeW);
        } else {
          dummy.scale.set(0, 0, 0);
        }
        dummy.updateMatrix();
        roofBox.setMatrixAt(i, dummy.matrix);
      }
    });

    meshRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.instanceMatrix.needsUpdate = true;
        if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
      }
    });

    if (roofBox) roofBox.instanceMatrix.needsUpdate = true;
    if (roofLedge) roofLedge.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={[originX, originY, originZ]}>
      {/* Black Road Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[gridWidth * tileSize * 2, gridDepth * tileSize * 2]} />
        <meshStandardMaterial color="#020406" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Instanced Meshes with Transparent Texture Overlay */}
      {textureStyles.map((style, idx) => (
        <instancedMesh
          key={idx}
          ref={meshRefs[idx]}
          args={[undefined, undefined, gridWidth * gridDepth]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            map={style.map}
            emissiveMap={style.emissiveMap}
            emissive={new THREE.Color("#ffffffce")}
            emissiveIntensity={0.8}
            transparent={false}
            roughness={0.25}
            metalness={0.75}
            envMapIntensity={1.5}
          />
        </instancedMesh>
      ))}

      {/* Roof Edge Parapets */}
      <instancedMesh
        ref={roofLedgeRef}
        args={[undefined, undefined, gridWidth * gridDepth]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#11141a" roughness={0.5} metalness={0.5} />
      </instancedMesh>

      {/* Roof HVAC Equipment Boxes */}
      <instancedMesh
        ref={roofBoxRef}
        args={[undefined, undefined, gridWidth * gridDepth]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0c0e12" roughness={0.8} metalness={0.2} />
      </instancedMesh>
    </group>
  );
}
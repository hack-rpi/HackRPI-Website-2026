"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ProceduralCity } from "./ProceduralCity";

const PLANE_URL = "/3d/plane0.glb";
useGLTF.preload(PLANE_URL);

const scrollMultiplier = 2;
export const PlanePivots: CameraPivot[] = [
  { position: [0, 0, 0], rotation: [0, 0, 0], fov: 50, scrollPosition: 0 },
  { position: [0, 0, 0], rotation: [-0.15, 0, 0], fov: 50, scrollPosition: 300*scrollMultiplier },
  { position: [0, 0.2, 0], rotation: [-0.15, 0, Math.PI / 4], fov: 50, scrollPosition: 400*scrollMultiplier },
  { position: [0, -0.8, 0], rotation: [Math.PI / 2, 0, Math.PI * 0.85], fov: 50, scrollPosition: 1000*scrollMultiplier },
  { position: [0, -3, 0], rotation: [Math.PI / 2, 0, Math.PI * 1.5], fov: 50, scrollPosition: 1200*scrollMultiplier },
  { position: [0, -8, 0], rotation: [Math.PI / 2, 0, 2*Math.PI], fov: 50, scrollPosition: 1400*scrollMultiplier },
  { position: [0, -20, 0], rotation: [Math.PI / 2, 0.2, 0.5], fov: 50, scrollPosition: 1600*scrollMultiplier },
  { position: [0, -80, 0], rotation: [Math.PI / 2, 0, Math.PI], fov: 50, scrollPosition: 2000*scrollMultiplier },
];

const CameraPivots: CameraPivot[] = [
    { position: [3.5, 1, 0.944], rotation: [-Math.PI / 2, 0, Math.PI + 0.113], fov: 50, scrollPosition: 0 } as const,
    { position: [.5, 10, 0], rotation: [-Math.PI / 2, 0, Math.PI + 0.113], fov: 50, scrollPosition: 200*scrollMultiplier } as const,

    { position: [-2, 8, -3], rotation: [-Math.PI / 2, 0.1, Math.PI], fov: 50, scrollPosition: 400*scrollMultiplier } as const,
    { position: [-0.5, 5, -3], rotation: [-Math.PI / 2, 0.1, Math.PI], fov: 50, scrollPosition: 600*scrollMultiplier } as const,

    { position: [10, -0.5, 2], rotation: [0, Math.PI/2, 0], fov: 50, scrollPosition: 700*scrollMultiplier } as const, 
    { position: [10, -0.5, 2], rotation: [0, Math.PI/2, 0], fov: 50, scrollPosition: 1000*scrollMultiplier } as const, 
    { position: [35, -20, -5], rotation: [Math.PI / 4, Math.PI/2, -3 * Math.PI / 4], fov: 50, scrollPosition: 1200*scrollMultiplier } as const,
    { position: [40, -22, -10], rotation: [Math.PI / 4, Math.PI/2, -3 * Math.PI / 4], fov: 50, scrollPosition: 1480*scrollMultiplier } as const,
];

const _planeResult = {
  position: [0, 0, 0] as [number, number, number],
  rotation: [0, 0, 0] as [number, number, number],
  quaternion: new THREE.Quaternion(),
  fov: 50,
};

function PlaneModel({ scale = 0.15, scrollY }: { scale?: number, scrollY: number }) {
  const { scene } = useGLTF(PLANE_URL);
  const modelRef = useRef<THREE.Object3D>(null);

  const planeCurve = useMemo(() => buildCameraCurve(PlanePivots), []);

  useFrame(() => {
    if (modelRef.current) {
      // Re-uses camera spline logic, but writes results into _planeResult
      const planeTransform = getCurrentCamera(scrollY, PlanePivots, planeCurve, [0, 0, 0], _planeResult);

      modelRef.current.position.set(...planeTransform.position);
      modelRef.current.quaternion.copy(_planeResult.quaternion);
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
    />
  );
}

export type CameraPivot = {
  scrollPosition: number;
  position: readonly [number, number, number] | [number, number, number];
  rotation?: readonly [number, number, number] | [number, number, number];
  lookAt?: readonly [number, number, number] | [number, number, number] | string;
  fov: number;
};

// Static instances for zero memory allocations
const _dummyCam = new THREE.PerspectiveCamera();
const _q1 = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _qResult = new THREE.Quaternion();
const _curvePoint = new THREE.Vector3();

const _posTuple: [number, number, number] = [0, 0, 0];
const _rotTuple: [number, number, number] = [0, 0, 0];

const _cameraResult = {
  position: _posTuple,
  rotation: _rotTuple,
  fov: 50,
};

// Static memory buffers for spline math
const _q0 = new THREE.Quaternion();
const _q3 = new THREE.Quaternion();
const _v0 = new THREE.Vector4();
const _v1 = new THREE.Vector4();
const _v2 = new THREE.Vector4();
const _v3 = new THREE.Vector4();
const _vResult = new THREE.Vector4();

function negateQuat(q: THREE.Quaternion) {
  q.x = -q.x;
  q.y = -q.y;
  q.z = -q.z;
  q.w = -q.w;
}

const _p0 = new THREE.Vector3();
const _p1 = new THREE.Vector3();
const _p2 = new THREE.Vector3();
const _p3 = new THREE.Vector3();

/**
 * Centripetal Catmull-Rom spline evaluation (alpha = 0.5)
 * Guarantees C1 smooth curves while strictly passing through p1 at t=0 and p2 at t=1.
 */
function interpolatePositionSpline(
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3,
  t: number,
  targetVec: THREE.Vector3
) {
  const t2 = t * t;
  const t3 = t2 * t;

  targetVec.x = 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
  targetVec.y = 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
  targetVec.z = 0.5 * (2 * p1.z + (-p0.z + p2.z) * t + (2 * p0.z - 5 * p1.z + 4 * p2.z - p3.z) * t2 + (-p0.z + 3 * p1.z - 3 * p2.z + p3.z) * t3);
}


/**
 * Catmull-Rom interpolation across 4 Quaternions (continuous rotation curves)
 */
function interpolateQuaternionSpline(
  q0: THREE.Quaternion,
  q1: THREE.Quaternion,
  q2: THREE.Quaternion,
  q3: THREE.Quaternion,
  t: number,
  targetQuat: THREE.Quaternion
) {
  // Ensure shortest path for all quaternions relative to neighboring points
  if (q0.dot(q1) < 0) negateQuat(q0);
  if (q2.dot(q1) < 0) negateQuat(q2);
  if (q3.dot(q2) < 0) negateQuat(q3);

  _v0.set(q0.x, q0.y, q0.z, q0.w);
  _v1.set(q1.x, q1.y, q1.z, q1.w);
  _v2.set(q2.x, q2.y, q2.z, q2.w);
  _v3.set(q3.x, q3.y, q3.z, q3.w);

  const t2 = t * t;
  const t3 = t2 * t;

  // Catmull-Rom equation evaluated component-wise without cloning memory
  _vResult.x = 0.5 * (2 * _v1.x + (-_v0.x + _v2.x) * t + (2 * _v0.x - 5 * _v1.x + 4 * _v2.x - _v3.x) * t2 + (-_v0.x + 3 * _v1.x - 3 * _v2.x + _v3.x) * t3);
  _vResult.y = 0.5 * (2 * _v1.y + (-_v0.y + _v2.y) * t + (2 * _v0.y - 5 * _v1.y + 4 * _v2.y - _v3.y) * t2 + (-_v0.y + 3 * _v1.y - 3 * _v2.y + _v3.y) * t3);
  _vResult.z = 0.5 * (2 * _v1.z + (-_v0.z + _v2.z) * t + (2 * _v0.z - 5 * _v1.z + 4 * _v2.z - _v3.z) * t2 + (-_v0.z + 3 * _v1.z - 3 * _v2.z + _v3.z) * t3);
  _vResult.w = 0.5 * (2 * _v1.w + (-_v0.w + _v2.w) * t + (2 * _v0.w - 5 * _v1.w + 4 * _v2.w - _v3.w) * t2 + (-_v0.w + 3 * _v1.w - 3 * _v2.w + _v3.w) * t3);

  targetQuat.set(_vResult.x, _vResult.y, _vResult.z, _vResult.w).normalize();
}

/**
 * Computes a Quaternion for a pivot (either from explicit Euler rotation or lookAt position)
 */
function getPivotQuaternion(
  pivot: CameraPivot,
  pos: readonly [number, number, number] | [number, number, number],
  targetQuat: THREE.Quaternion,
  modelPosition: [number, number, number] = [0, 0, 0]
): THREE.Quaternion {
  if (pivot.rotation) {
    _dummyCam.rotation.set(pivot.rotation[0], pivot.rotation[1], pivot.rotation[2]);
    targetQuat.copy(_dummyCam.quaternion);
  } else if (pivot.lookAt) {
    const target = Array.isArray(pivot.lookAt) ? pivot.lookAt : modelPosition;
    _dummyCam.position.set(pos[0], pos[1], pos[2]);
    _dummyCam.rotation.set(0, 0, 0);
    _dummyCam.lookAt(target[0], target[1], target[2]);
    targetQuat.copy(_dummyCam.quaternion);
  } else {
    targetQuat.identity();
  }

  return targetQuat;
}

function buildCameraCurve(pivots: CameraPivot[]): THREE.CatmullRomCurve3 {
  const points = pivots.map(p => new THREE.Vector3(p.position[0], p.position[1], p.position[2]));
  // CatmullRomCurve3 creates a smooth spline passing through all points
  return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
}


function getPivotTarget(
  pivot: CameraPivot,
  modelPosition: [number, number, number] = [0, 0, 0]
): THREE.Vector3 {
  if (pivot.lookAt) {
    const t = Array.isArray(pivot.lookAt) ? pivot.lookAt : modelPosition;
    return new THREE.Vector3(t[0], t[1], t[2]);
  }
  return new THREE.Vector3(modelPosition[0], modelPosition[1], modelPosition[2]);
}

const _target1 = new THREE.Vector3();
const _target2 = new THREE.Vector3();
const _interpolatedTarget = new THREE.Vector3();

export function getCurrentCamera(
  scrollY: number,
  pivots: CameraPivot[],
  curve: THREE.CatmullRomCurve3, // Maintained signature for backwards compatibility
  modelPosition: [number, number, number] = [0, 0, 0],
  out?: { position: [number, number, number]; rotation: [number, number, number]; fov: number }
) {
  if (!pivots || pivots.length === 0) return _cameraResult;

  const minScroll = pivots[0].scrollPosition;
  const maxScroll = pivots[pivots.length - 1].scrollPosition;
  const clampedScroll = THREE.MathUtils.clamp(scrollY, minScroll, maxScroll);

  // 1. Find keyframe segment index based on scrollPosition
  const lastIndex = pivots.length - 1;
  let segmentIndex = 0;

  for (let i = 0; i < lastIndex; i++) {
    if (clampedScroll >= pivots[i].scrollPosition && clampedScroll <= pivots[i + 1].scrollPosition) {
      segmentIndex = i;
      break;
    }
  }

  const p0Pivot = pivots[Math.max(segmentIndex - 1, 0)];
  const p1Pivot = pivots[segmentIndex];
  const p2Pivot = pivots[Math.min(segmentIndex + 1, lastIndex)];
  const p3Pivot = pivots[Math.min(segmentIndex + 2, lastIndex)];

  const range = p2Pivot.scrollPosition - p1Pivot.scrollPosition;
  const segmentProgress = range > 0 ? (clampedScroll - p1Pivot.scrollPosition) / range : 0;

  // 2. Evaluate Exact Local Position Spline
  _p0.set(p0Pivot.position[0], p0Pivot.position[1], p0Pivot.position[2]);
  _p1.set(p1Pivot.position[0], p1Pivot.position[1], p1Pivot.position[2]);
  _p2.set(p2Pivot.position[0], p2Pivot.position[1], p2Pivot.position[2]);
  _p3.set(p3Pivot.position[0], p3Pivot.position[1], p3Pivot.position[2]);

  interpolatePositionSpline(_p0, _p1, _p2, _p3, segmentProgress, _curvePoint);

  _posTuple[0] = _curvePoint.x;
  _posTuple[1] = _curvePoint.y;
  _posTuple[2] = _curvePoint.z;

  // 3. Smooth Rotation Handling
  if (p1Pivot.lookAt || p2Pivot.lookAt) {
    _target1.copy(getPivotTarget(p1Pivot, modelPosition));
    _target2.copy(getPivotTarget(p2Pivot, modelPosition));
    _interpolatedTarget.lerpVectors(_target1, _target2, segmentProgress);

    _dummyCam.position.set(_posTuple[0], _posTuple[1], _posTuple[2]);
    _dummyCam.rotation.set(0, 0, 0);
    _dummyCam.lookAt(_interpolatedTarget);

    _qResult.copy(_dummyCam.quaternion);
  } else {
    getPivotQuaternion(p0Pivot, p0Pivot.position, _q0, modelPosition);
    getPivotQuaternion(p1Pivot, p1Pivot.position, _q1, modelPosition);
    getPivotQuaternion(p2Pivot, p2Pivot.position, _q2, modelPosition);
    getPivotQuaternion(p3Pivot, p3Pivot.position, _q3, modelPosition);

    interpolateQuaternionSpline(_q0, _q1, _q2, _q3, segmentProgress, _qResult);
  }

  // 4. Output final orientation & FOV
  _dummyCam.quaternion.copy(_qResult);
  _rotTuple[0] = _dummyCam.rotation.x;
  _rotTuple[1] = _dummyCam.rotation.y;
  _rotTuple[2] = _dummyCam.rotation.z;

  _cameraResult.fov = THREE.MathUtils.lerp(p1Pivot.fov, p2Pivot.fov, segmentProgress);

  if (out) {
    out.position[0] = _cameraResult.position[0];
    out.position[1] = _cameraResult.position[1];
    out.position[2] = _cameraResult.position[2];

    out.rotation[0] = _cameraResult.rotation[0];
    out.rotation[1] = _cameraResult.rotation[1];
    out.rotation[2] = _cameraResult.rotation[2];

    if ('quaternion' in out && out.quaternion instanceof THREE.Quaternion) {
      out.quaternion.copy(_qResult);
    }

    out.fov = _cameraResult.fov;
    return out;
  }

  return _cameraResult;
}



function CameraRig({ scrollY }: { scrollY: number }) {
  const camera = useThree((state) => state.camera);
  const cameraCurve = useMemo(() => buildCameraCurve(CameraPivots), []);
  const target = getCurrentCamera(scrollY, CameraPivots, cameraCurve, [0, 0, 0]);

  camera.position.set(...target.position);
  camera.rotation.set(...target.rotation);

  if ('fov' in camera && camera.fov !== target.fov) {
    camera.fov = target.fov;
    camera.updateProjectionMatrix();
  }

  return null;
}

export default function PlaneScene({scrollY}: {scrollY: number}) {
  console.log(scrollY)

  return (
      <div className="w-full h-screen fixed z-0">
        <Canvas shadows>
            <CameraRig scrollY={scrollY} />

            <fogExp2 attach="fog" args={["#020408", 0.017]} />

            <directionalLight
              position={[40, 60, 30]}
              intensity={0.7}
              color="#ffe2b3"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-near={10}
              shadow-camera-far={120}
              shadow-bias={-0.0005}
            />

            <directionalLight position={[-30, 40, -30]} intensity={0.9} color="#496b91" />
            <ambientLight intensity={0.25} color="#262931" />
            {/* <Environment preset="city" /> */}

            {scrollY < 1180*scrollMultiplier ? 
            <ProceduralCity origin={[10,-30,20]} speed={2} gridWidth={70} gridDepth={70} tileSize={2} />
            : <></>}
            

            {/* 3D Plane */}
            <PlaneModel scrollY={scrollY} />
        </Canvas>
      </div>
    );
}
"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textAnimation } from "@/lib/text-animation";

import type { PointLight } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import mentions from "./mentions.json";
import "./team.css";

// Preload the 3D model immediately on module load
useGLTF.preload("/3d/trophy.glb");

const deptConfig: Record<
  string,
  { icon: string; bg: string; border: string; text: string }
> = {
  Logistics: {
    icon: "☀︎",
    bg: "bg-amber-300/10",
    border: "border-amber-300/80",
    text: "text-amber-200/80",
  },
  Finance: {
    icon: "🌧",
    bg: "bg-emerald-300/10",
    border: "border-emerald-300/80",
    text: "text-emerald-200/80",
  },
  Sponsorship: {
    icon: "🌡",
    bg: "bg-cyan-300/10",
    border: "border-cyan-300/80",
    text: "text-cyan-200/80",
  },
  Technology: {
    icon: "☁︎",
    bg: "bg-purple-300/10",
    border: "border-purple-300/80",
    text: "text-purple-200/80",
  },
  Marketing: {
    icon: "★",
    bg: "bg-rose-300/10",
    border: "border-rose-300/80",
    text: "text-rose-200/80",
  },
  Outreach: {
    icon: "☂",
    bg: "bg-pink-300/10",
    border: "border-pink-300/80",
    text: "text-pink-200/80",
  },
};

gsap.registerPlugin(ScrollTrigger);

function Model() {
  const { scene } = useGLTF("/3d/trophy.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  return (
    <Center>
      <primitive object={clonedScene} />
    </Center>
  );
}

function MovingLight({
  scrollData,
}: {
  scrollData: React.MutableRefObject<{ x: number }>;
}) {
  const lightRef = useRef<PointLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = scrollData.current.x;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[100, 0, 5]}
      intensity={5.0}
      distance={0}
      decay={1}
    />
  );
}

function Scene({
  scrollData,
}: {
  scrollData: React.MutableRefObject<{ x: number }>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: "high-performance", antialias: false }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <MovingLight scrollData={scrollData} />
      <hemisphereLight
        color={"#ffffff"}
        groundColor={"#444444"}
        intensity={0.4}
      />
      <Model />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </Canvas>
  );
}

export default function Mentions() {
  const mentionsAnimatedRef = useRef(false);
  const scrollData = useRef({ x: 100 });

  const halfLength = Math.ceil(mentions.length / 2);
  const row1Mentions = useMemo(() => mentions.slice(0, halfLength), [halfLength]);
  const row2Mentions = useMemo(() => mentions.slice(halfLength), [halfLength]);

  const row1Duplicated = useMemo(
    () => [...row1Mentions, ...row1Mentions, ...row1Mentions],
    [row1Mentions]
  );
  const row2Duplicated = useMemo(
    () => [...row2Mentions, ...row2Mentions, ...row2Mentions],
    [row2Mentions]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mentionsContainer = document.querySelector("#mentions-container");
      if (!mentionsContainer) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#trophy-canvas",
            start: "top 100%",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(scrollData.current, {
          x: -100,
          ease: "none",
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marqueeLeft 20s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marqueeRight 20s linear infinite;
        }
      `}</style>
      <div
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden py-10"
        id="mentions-container"
      >
        {/* Revamped Header Title with fixed baseline padding */}
        <div className="text-center z-10 pt-4 flex flex-col items-center gap-2 animate-glow-loop">
          <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.3em] text-pink-300/80">
            — THE TEAM BEHIND THE MAGIC —
          </span>
          <div className="relative px-4 pb-2 pt-1 inline-block">
            <h2 className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-pink-200 leading-normal">
              Our Organizers <span className="text-pink-400 not-italic">♡</span>
            </h2>
          </div>
        </div>

        {/* Hero Middle Section: Trophy Model + Gratitude Text Side-by-Side */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-6 my-auto z-10">
          {/* Left: Centered Trophy Model */}
          <div
            className="w-full h-[35vh] md:h-[45vh] flex items-center justify-center"
            id="trophy-canvas"
          >
            <Scene scrollData={scrollData} />
          </div>

          {/* Right: Pure Typographic Gratitude Text */}
          <div className="flex flex-col text-center md:text-left space-y-2 max-w-md mx-auto md:mx-0">
            <h4 className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-[0.25em] text-pink-300/80">
              01 // SPECIAL THANKS
            </h4>

            <h3 className="text-2xl md:text-4xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 leading-tight">
              With Sincere Gratitude.
            </h3>

            <p className="text-xs md:text-sm font-mono text-neutral-300/90 leading-relaxed pt-1">
              To every organizer who brought this event to life—your hard work, endless late nights, and passion made this unforgettable.
            </p>
          </div>
        </div>

        {/* Tilted Infinite Scrolling Rows Container at Bottom */}
        <div className="w-full overflow-hidden pb-8 pt-2 -rotate-3 z-20">
          <div className="flex flex-col gap-5">
            
            {/* TOP ROW: Moves Leftwards */}
            <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-5 whitespace-nowrap animate-marquee-left">
                {row1Duplicated.map((m, i) => {
                  const cfg = deptConfig[m.dept];
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`border ${cfg.border} ${cfg.bg} rounded-none px-3 py-1`}
                      >
                        <span className="text-white font-mono font-medium text-xs md:text-sm tracking-wide">
                          {m.name}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest ${cfg.text} mt-1.5`}
                      >
                        <span>{cfg.icon}</span>
                        <span>{m.dept}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BOTTOM ROW: Moves Rightwards */}
            <div className="flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex gap-5 whitespace-nowrap animate-marquee-right">
                {row2Duplicated.map((m, i) => {
                  const cfg = deptConfig[m.dept];
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`border ${cfg.border} ${cfg.bg} rounded-none px-3 py-1`}
                      >
                        <span className="text-white font-mono font-medium text-xs md:text-sm tracking-wide">
                          {m.name}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest ${cfg.text} mt-1.5`}
                      >
                        <span>{cfg.icon}</span>
                        <span>{m.dept}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
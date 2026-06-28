"use client";

import { useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/offscreen";
import Scene from "@/app/components/title-components/three/Scene";
import SceneOnLoad from "@/app/components/title-components/three/Scene";
import Link from "next/link";
import SkyCountdown from "./countdown";

export default function DesktopTitleComponent() {
  // State to manage the loading overlay
  const [isLoading, setIsLoading] = useState(true);

  const worker = useMemo(
    () =>
      new Worker(
        new URL("@/app/components/title-components/three/worker.tsx", import.meta.url),
        {
          type: "module",
        }
      ),
    []
  );

  const linkItems = [
    { label: "Event", href: "/event" },
    { label: "Schedule", href: "/event/schedule" },
    //{ label: "Prizes", href: "/prizes" },
    { label: "Last Year", href: "/last-year" },
    { label: "Sponsor Us", href: "/sponsorship" },
    { label: "Discord", href: "https://discord.gg/" },
  ];

  useEffect(() => {
    if (!worker) return;

    const handleWorkerMessage = (event: MessageEvent) => {
      if (event.data?.type === "three-scene-ready") {
        setIsLoading(false);
      }
    };
    worker.addEventListener("message", handleWorkerMessage);
    return () => worker.removeEventListener("message", handleWorkerMessage);
  }, [worker]);

  const splitLabel = (label: string) => {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(label), (segment) => segment.segment);
  };

  return (
    <>
      {/* LOADING OVERLAY */}
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center bg-black/10">
        <div className={`whiteCover ${!isLoading ? 'clear' : ''}`}></div>
        
        {/* ================= LEFT CLOUD CONTAINER ================= */}
        <div className={`cloud-container-left ${!isLoading ? 'exited' : ''}`}>
          <div style={{left: "-50%", top: "-50%"}} className="cloud-layer cloud-l1-wrapper">
            <img style={{transform: "scale(7)"}} src="/cover/cloud1.png" className="cloud-l1-img" alt="Left Cloud" /></div>
          <div style={{left: "-20%", top: "0%"}} className="cloud-layer cloud-l1-wrapper">
            <img style={{transform: "scale(5)"}} src="/cover/cloud3.png" className="cloud-l1-img" alt="Left Cloud" /></div>
          <div style={{left: "-40%", top: "33%"}} className="cloud-layer cloud-l1-wrapper">
            <img style={{transform: "scale(6)"}} src="/cover/cloud4.png" className="cloud-l1-img" alt="Left Cloud" /></div>
        </div>

        {/* ================= RIGHT CLOUD CONTAINER ================= */}
        <div className={`cloud-container-right ${!isLoading ? 'exited' : ''}`}>
          <div style={{right: "-50%", top: "-30%"}} className="cloud-layer cloud-l1-wrapper">
            <img style={{transform: "scale(6)"}} src="/cover/cloud2.png" className="cloud-l1-img" alt="Left Cloud" /></div>
          <div style={{right: "-40%", top: "0%"}} className="cloud-layer cloud-l1-wrapper">
            <img style={{transform: "scale(6)"}} src="/cover/cloud5.png" className="cloud-l1-img" alt="Left Cloud" /></div>
          <div style={{right: "-30%", top: "30%"}} className="cloud-layer cloud-l1-wrapper">
            <img style={{transform: "scale(5)"}} src="/cover/cloud6.png" className="cloud-l1-img" alt="Left Cloud" /></div>
        </div>



        {/* ================= LOADING TEXT OVERLAY ================= */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center transition-opacity duration-1000 ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 
            className="text-gray-500 text-7xl md:text-[10rem] font-bold tracking-tighter leading-none select-none"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            HACKRPI
          </h1>
          
          {/* Wave Text Effect */}
          <div className="text-gray-400 text-2xl md:text-4xl mt-4 tracking-widest font-mono uppercase select-none flex gap-[0.2em]">
            {"loading...".split("").map((char, index) => (
              <span
                key={index}
                className="animate-wave-pulse"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>
      </div>



      {/* MAIN SITE CONTENT */}
      {/* (Your original code remains completely untouched below here) */}
      <div className="relative w-full h-screen bg-hackrpi-clouds-dark-blue bg-cover bg-center bg-no-repeat p-5 overflow-hidden">
        <SkyCountdown/>
        <div className="absolute inset-0">
          <Canvas
            worker={worker}
            // fallback={<SceneOnLoad onLoaded={() => setIsLoading(false)} />}
            fallback={<SceneOnLoad />}
            camera={{ position: [0, 0, 6], fov: 55 }}
          />
        </div>

        <div className="relative z-10 w-fit h-[50vh] p-0 flex flex-col pt-30 pl-20">
          <div
            className="text-blue-200 text-[2.15rem] leading-none ml-3"
            style={{
              fontFamily: "Calibri, sans-serif",
              clipPath: "inset(0px 100% 0px 0px)",
            }}
            id="title-animate"
          >
            November 7, 8th • Troy, NY
            <div className="text-animation-layer inline-block w-auto" />
          </div>

          <div
            className="text-white text-[12rem] font-bold leading-none tracking-tight"
            style={{
              fontFamily: "Calibri, sans-serif",
              clipPath: "inset(0px 100% 0px 0px)",
            }}
            id="title-animate"
          >
            HackRPI
            <div className="text-animation-layer inline-block w-auto" />
          </div>

          <div
            className="text-blue-200 text-[3.3rem] font-mono leading-none ml-auto mr-5"
            style={{ clipPath: "inset(0px 100% 0px 0px)" }}
            id="title-animate"
          >
            IN THE CLOUDS
            <div className="text-animation-layer inline-block w-auto" />
          </div>
        </div>

        <div className="relative z-10 w-fit h-[50vh] p-0 flex flex-col pt-10 pl-20">
          <div
            className="text-blue-200 text-[2.45rem] leading-none ml-3"
            style={{
              fontFamily: "Calibri, sans-serif",
              clipPath: "inset(0px 100% 0px 0px)",
            }}
            id="links-animate"
          >
            <div className="text-animation-layer inline-block w-auto" />
            {linkItems.map(({ label, href }) => (
              <Link
                key={label}
                className="norris-line block w-fit"
                data-text={label}
                href={href}
              >
                {splitLabel(label).map((char, index) => (
                  <span
                    key={`${label}-${index}`}
                    className="norris-char"
                    data-char={char}
                    style={{ ["--index" as string]: index }}
                  >
                    {char}
                  </span>
                ))}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
"use client";

import { useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/offscreen";
import SceneOnLoad from "@/app/components/title-components/three/Scene";
import Link from "next/link";
import SkyCountdown from "./countdown";

export default function DesktopTitleComponent() {
  // State to manage the loading overlay
  const [isLoading, setIsLoading] = useState(true);

  const worker = useMemo(
    () =>
      new Worker(new URL("@/app/components/title-components/three/worker.tsx", import.meta.url), {
        type: "module",
      }),
    [],
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
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/10">
        <div className={`whiteCover ${!isLoading ? "clear" : ""}`}></div>

        {/* ================= LEFT CLOUD CONTAINER ================= */}
        <div className={`cloud-container-left ${!isLoading ? "exited" : ""}`}>
          <div style={{ left: "-50%", top: "-50%" }} className="cloud-layer cloud-l1-wrapper">
            <img
              style={{ transform: "scale(7)" }}
              src="/cover/cloud1.png"
              className="cloud-l1-img"
              alt="Left Cloud"
            />
          </div>
          <div style={{ left: "-20%", top: "0%" }} className="cloud-layer cloud-l1-wrapper">
            <img
              style={{ transform: "scale(5)" }}
              src="/cover/cloud3.png"
              className="cloud-l1-img"
              alt="Left Cloud"
            />
          </div>
          <div style={{ left: "-40%", top: "33%" }} className="cloud-layer cloud-l1-wrapper">
            <img
              style={{ transform: "scale(6)" }}
              src="/cover/cloud4.png"
              className="cloud-l1-img"
              alt="Left Cloud"
            />
          </div>
        </div>

        {/* ================= RIGHT CLOUD CONTAINER ================= */}
        <div className={`cloud-container-right ${!isLoading ? "exited" : ""}`}>
          <div style={{ right: "-50%", top: "-30%" }} className="cloud-layer cloud-l1-wrapper">
            <img
              style={{ transform: "scale(6)" }}
              src="/cover/cloud2.png"
              className="cloud-l1-img"
              alt="Left Cloud"
            />
          </div>
          <div style={{ right: "-40%", top: "0%" }} className="cloud-layer cloud-l1-wrapper">
            <img
              style={{ transform: "scale(6)" }}
              src="/cover/cloud5.png"
              className="cloud-l1-img"
              alt="Left Cloud"
            />
          </div>
          <div style={{ right: "-30%", top: "30%" }} className="cloud-layer cloud-l1-wrapper">
            <img
              style={{ transform: "scale(5)" }}
              src="/cover/cloud6.png"
              className="cloud-l1-img"
              alt="Left Cloud"
            />
          </div>
        </div>

        {/* ================= LOADING TEXT OVERLAY ================= */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center transition-opacity duration-1000 ${
            isLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1
            className="text-7xl leading-none font-bold tracking-tighter text-gray-500 select-none md:text-[10rem]"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            HACKRPI
          </h1>

          {/* Wave Text Effect */}
          <div className="mt-4 flex gap-[0.2em] font-mono text-2xl tracking-widest text-gray-400 uppercase select-none md:text-4xl">
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
      <div className="relative h-screen w-full overflow-hidden bg-hackrpi-clouds-dark-blue bg-cover bg-center bg-no-repeat p-5">
        <SkyCountdown />
        <div className="absolute inset-0">
          <Canvas
            worker={worker}
            // fallback={<SceneOnLoad onLoaded={() => setIsLoading(false)} />}
            fallback={<SceneOnLoad />}
            camera={{ position: [0, 0, 6], fov: 55 }}
          />
        </div>

        <div className="relative z-10 flex h-[50vh] w-fit max-w-[calc(100vw-2.5rem)] flex-col p-0 pl-[clamp(1.5rem,5vw,5rem)]">
          <div
            className="ml-[clamp(0.35rem,0.8vw,0.75rem)] text-[clamp(1.35rem,2.2vw,2.15rem)] leading-none text-blue-200"
            style={{
              fontFamily: "Calibri, sans-serif",
              clipPath: "inset(0px 100% 0px 0px)",
              paddingTop: "clamp(2rem, 4.5vw, 45px)",
            }}
            id="title-animate"
          >
            November 7, 8th • Troy, NY
            <div className="text-animation-layer inline-block w-auto" />
          </div>

          <div
            className="text-[clamp(7rem,12vw,12rem)] leading-none font-bold tracking-tight text-white"
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
            className="mr-[clamp(1rem,1.4vw,1.25rem)] ml-auto font-mono text-[clamp(2rem,3.3vw,3.3rem)] leading-none text-blue-200"
            style={{ clipPath: "inset(0px 100% 0px 0px)" }}
            id="title-animate"
          >
            IN THE CLOUDS
            <div className="text-animation-layer inline-block w-auto" />
          </div>

          <div className="mt-[clamp(0.8rem,1.8vw,1.5rem)] mr-[clamp(1rem,1.4vw,1.25rem)] ml-auto">
            <Link
              href="https://events.mlh.com/events/14390-hackrpi-2026"
              className="block border border-yellow-100 px-[clamp(1.25rem,2vw,2rem)] py-[clamp(0.55rem,0.9vw,0.75rem)] font-mono text-[clamp(0.68rem,0.85vw,0.875rem)] font-semibold tracking-widest text-yellow-100 uppercase transition-colors duration-300 hover:bg-yellow-100 hover:text-black"
              style={{
                boxShadow: "0 0 20px rgba(254,252,232,0.15), inset 0 0 20px rgba(254,252,232,0.3)",
              }}
              target="_blank"
            >
              Register Now ⇾
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex w-fit flex-col justify-end p-0 pb-10 pl-20">
          <div
            className="ml-3 text-[2.45rem] leading-none text-blue-200"
            style={{
              fontFamily: "Calibri, sans-serif",
              clipPath: "inset(0px 100% 0px 0px)",
              paddingTop: "30px",
              filter: "drop-shadow(2px 4px 6px black)",
            }}
            id="links-animate"
          >
            <div className="text-animation-layer inline-block w-auto" />
            {linkItems.map(({ label, href }) => (
              <Link key={label} className="norris-line block w-fit" data-text={label} href={href}>
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

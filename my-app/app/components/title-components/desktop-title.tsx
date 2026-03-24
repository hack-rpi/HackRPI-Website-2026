"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/offscreen";
import Scene from "@/app/components/title-components/three/Scene";

export default function DesktopTitleComponent() {
  const worker = useMemo(
    () =>
      new Worker(new URL("@/app/components/title-components/three/worker.tsx", import.meta.url), {
        type: "module",
      }),
    []
  );

  const linkItems = [
    { label: "Event", href: "/event" },
    { label: "Schedule", href: "/event/schedule" },
    { label: "Prizes", href: "/prizes" },
    { label: "Last year", href: "/last-year" },
    { label: "Sponsor us", href: "/sponsorship" },
    { label: "Discord", href: "https://discord.gg/" },
  ];

  const splitLabel = (label: string) => {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(label), (segment) => segment.segment);
  };

  return ( //  bg-[#00152b] THIS IS TEMP WHILE I SORT OUT 3D MODEL LOADING
  // Or i could just render a view of it since its the same sin wave motion and slap it on the background
    <div className="relative w-full h-screen bg-[url('/3d/placeholder.png')] bg-cover bg-center bg-no-repeat p-5 overflow-hidden">
      <div className="absolute inset-0">
        {/* <Canvas
          worker={worker}
          fallback={<Scene />}
          camera={{ position: [0, 0, 6], fov: 55 }}
        /> */}
      </div>

      <div className="relative z-10 w-fit h-[50vh] p-0 flex flex-col pt-30 pl-20">
        <div
          className="text-blue-200 text-[2.15rem] leading-none ml-3"
          style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
          id="title-animate"
        >
          November 7, 8th • Troy, NY
          <div className="text-animation-layer inline-block w-auto" />
        </div>

        <div
          className="text-[12rem] font-bold leading-none tracking-tight"
          style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
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
          style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
          id="links-animate"
        >
          <div className="text-animation-layer inline-block w-auto" />
          {linkItems.map(({ label, href }) => (
            <a key={label} className="norris-line block w-fit" data-text={label} href={href}>
              {splitLabel(label).map((char, index) => (
                <span key={`${label}-${index}`} className="norris-char" data-char={char} style={{ ["--index" as string]: index }}>
                  {char}
                </span>
              ))}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

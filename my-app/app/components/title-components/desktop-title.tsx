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

  return (
    <div className="relative w-full h-screen bg-blue-4000 p-5 overflow-hidden">
      <div className="absolute inset-0">
        {/* <Canvas
          worker={worker}
          fallback={<Scene />}
          camera={{ position: [0, 0, 6], fov: 55 }}
        /> */}
      </div>

      <div className="relative z-10 w-fit h-[50vh] p-0 flex flex-col pt-30 pl-20">
        <div
          className="text-blue-200 text-4xl leading-none ml-3"
          style={{ fontFamily: "Calibri, sans-serif", clipPath: "inset(0px 100% 0px 0px)" }}
          id="title-animate"
        >
          November 7, 8th • Troy, NY
          <div className="text-animation-layer inline-block w-auto" />
        </div>

        <div
          className="text-[14rem] font-bold leading-none tracking-tight"
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
          className="text-blue-200 text-[2.75rem] leading-none ml-3"
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

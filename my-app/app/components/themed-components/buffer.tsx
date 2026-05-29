"use client";

import React, { useMemo, useState, useEffect } from "react";
import "./buffer.css";

interface ProceduralBufferProps {
  /** Height of the transition zone (e.g., "12vh", "120px") */
  height?: string;
  /** The background color of the NEXT section it is transitioning into */
  fillColor?: string;
  /** Optional opacity multiplier for the layered depth effect */
  baseOpacity?: number;
}

export default function AestheticSectionBuffer({
  height = "12vh",
  fillColor = "#ffffff", // Match this to the background of the section BELOW
  baseOpacity = 1,
}: ProceduralBufferProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define 3 distinct layered curves for a parallax depth effect
  const layers = useMemo(() => {
    return [
      {
        id: "back-layer",
        duration: "55s",
        opacity: 0.4,
        // A gentle rolling curve
        path: "M0,40 C30,15 70,55 100,35 C130,15 170,50 200,40 L200,100 L0,100 Z",
      },
      {
        id: "mid-layer",
        duration: "40s",
        opacity: 0.7,
        // Offset curves to contrast with the back layer
        path: "M0,50 C40,70 60,30 100,55 C140,80 160,35 200,50 L200,100 L0,100 Z",
      },
      {
        id: "front-layer",
        duration: "28s",
        opacity: 1.0, // Fully opaque foreground layer to completely mask the section split
        path: "M0,65 C35,45 65,75 100,60 C135,45 165,80 200,65 L200,100 L0,100 Z",
      },
    ];
  }, []);

  if (!isMounted) {
    return <div className="w-full bg-transparent" style={{ height }} />;
  }

  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none select-none z-30"
      style={{
        height,
        // Negative margin pull prevents micro-gaps caused by sub-pixel rendering browser bugs
        marginBottom: "-2px", 
      }}
    >
      {/* We use a viewBox of 0 0 200 100, but make the width 200% 
        so the animation has room to slide horizontally without showing edges.
      */}
      <svg
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-full w-[200%] buffer-blend"
      >
        {layers.map((layer) => (
          <path
            key={layer.id}
            d={layer.path}
            fill={fillColor}
            className="animate-wave-slow"
            style={{
              opacity: layer.opacity * baseOpacity,
              ["--drift-duration" as any]: layer.duration,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
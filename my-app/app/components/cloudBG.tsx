"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";

interface CloudConfig {
  id: number;
  topPercent: number;
  horizontalPos: string;
  horizontalSide: "left" | "right";
  widthClass: string;
  heightClass: string;
  opacityClass: string;
  animationClass: string;
  imageSrc: string;
}

interface CloudBackgroundProps {
  /** Total number of cloud images to render */
  count?: number;
  /** Starting boundary percentage (0-100) along the parent element's height */
  minTopPercent?: number;
  /** Ending boundary percentage (0-100) along the parent element's height */
  maxTopPercent?: number;
  /** Array of cloud image source paths to pick from randomly */
  imageSources?: string[];
  /** Optional custom Tailwind z-index class (default: "z-0") */
  zIndexClass?: string;
}

const DEFAULT_CLOUD_IMAGES = [
  "/sponsors/res/cloud.png",
  "/cover/cloud1.png",
  "/cover/cloud2.png",
  "/cover/cloud3.png",
  "/cover/cloud4.png",
  "/cover/cloud5.png",
  "/cover/cloud6.png",
  "/cover/cloud7.png",
  "/cover/cloud8.png",
  "/cover/cloud9.png",
  "/cover/cloud10.png",
  "/cover/cloud11.png",
  "/cover/cloud12.png",
  "/cover/cloud13.png",
];

const ANIMATION_CLASSES = [
  "animate-float-slow",
  "animate-float-reverse",
  "animate-float-drift",
];

const CLOUD_SIZES = [
  { width: "w-64 md:w-[28rem]", height: "h-40" },
  { width: "w-72 md:w-[32rem]", height: "h-48" },
  { width: "w-80 md:w-[36rem]", height: "h-56" },
  { width: "w-88 md:w-[40rem]", height: "h-64" },
];

const OPACITIES = ["opacity-20", "opacity-25", "opacity-30"];

export default function CloudBackground({
  count = 8,
  minTopPercent = 0,
  maxTopPercent = 100,
  imageSources = DEFAULT_CLOUD_IMAGES,
  zIndexClass = "z-0",
}: CloudBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate clouds with random images once mounted on the client
  const clouds = useMemo<CloudConfig[]>(() => {
    if (!mounted || imageSources.length === 0) return [];

    const generated: CloudConfig[] = [];
    const range = Math.max(1, maxTopPercent - minTopPercent);
    const step = range / count;

    for (let i = 0; i < count; i++) {
      const isLeft = i % 2 === 0;
      const topPercent = minTopPercent + step * i + step * 0.2;
      const offsetValue = i % 3 === 0 ? "-30px" : i % 3 === 1 ? "2%" : "5%";

      // Pick a random image source from the array
      const randomSrc =
        imageSources[Math.floor(Math.random() * imageSources.length)];

      generated.push({
        id: i,
        topPercent,
        horizontalSide: isLeft ? "left" : "right",
        horizontalPos: offsetValue,
        widthClass: CLOUD_SIZES[i % CLOUD_SIZES.length].width,
        heightClass: CLOUD_SIZES[i % CLOUD_SIZES.length].height,
        opacityClass: OPACITIES[i % OPACITIES.length],
        animationClass: ANIMATION_CLASSES[i % ANIMATION_CLASSES.length],
        imageSrc: randomSrc,
      });
    }

    return generated;
  }, [mounted, count, minTopPercent, maxTopPercent, imageSources]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`aria-hidden:true pointer-events-none absolute inset-0 ${zIndexClass} overflow-hidden`}
      >
        {clouds.map((cloud) => {
          const positionStyle: React.CSSProperties = {
            top: `${cloud.topPercent}%`,
            [cloud.horizontalSide]: cloud.horizontalPos,
          };

          return (
            <div
              key={cloud.id}
              style={positionStyle}
              className={`absolute ${cloud.widthClass} ${cloud.heightClass} ${cloud.opacityClass} ${cloud.animationClass} pointer-events-none`}
            >
              <Image
                src={cloud.imageSrc}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes floatSlow {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(15px, -18px); }
        }
        .animate-float-slow {
          animation: floatSlow 9s ease-in-out infinite;
        }

        @keyframes floatReverse {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-15px, -20px); }
        }
        .animate-float-reverse {
          animation: floatReverse 11s ease-in-out infinite;
        }

        @keyframes floatDrift {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(20px, -10px); }
        }
        .animate-float-drift {
          animation: floatDrift 13s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
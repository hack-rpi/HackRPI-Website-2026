import { useEffect, useState, useMemo } from "react";

interface Cloud {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  speed: number;
  zIndex: number;
  src: string;
  flip: number;
}

const CLOUD_IMAGES = [
  "/parallax/cloud.png",
  "/parallax/cloud2.png",
  "/parallax/cloud3.png",
  "/parallax/cloud4.png",
  "/parallax/cloud5.png",
  "/parallax/cloud6.png",
  "/parallax/cloud7.png",
  "/parallax/cloud8.png",
  "/parallax/cloud9.png",
  "/parallax/cloud10.png",
  "/parallax/cloud11.png",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function DynamicCloudOverlay() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clouds = useMemo(() => {
    const cloudCount = 14;
    const generatedClouds: Cloud[] = [];
    const slotWidth = 100 / cloudCount;

    // Shuffle slot order so depth/size/zIndex don't correlate with left-to-right position
    const slotIndices = Array.from({ length: cloudCount }, (_, i) => i);
    for (let i = slotIndices.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(i + 1) * (i + 1));
      [slotIndices[i], slotIndices[j]] = [slotIndices[j], slotIndices[i]];
    }

    for (let i = 0; i < cloudCount; i++) {
      const seed = i + 1;
      const depth = seededRandom(seed * 2);

      const slotStart = slotIndices[i] * slotWidth;
      const xOffset = slotStart + seededRandom(seed * 3) * slotWidth;
      const left = `${xOffset}%`;

      const randomY =
        (2 * window.innerHeight) / 5 + seededRandom(seed * 5) * ((2.5 * window.innerHeight) / 5);
      const top = `${randomY}px`;

      const size = Math.floor(96 + (1 - depth) * 200 + seededRandom(seed * 7) * 40);

      const opacityVariance = (seededRandom(seed * 11) - 0.5) * 0.2;
      const opacity = Math.max(0.2, Math.min(0.8, (1 - depth) * 0.5 + 0.15 + opacityVariance));

      const speed = 0.35 + depth * 0.55;
      const zIndex = Math.floor(10 + depth * 10);

      const src = CLOUD_IMAGES[Math.floor(seededRandom(seed * 13) * CLOUD_IMAGES.length)];
      const flip = seededRandom(seed * 17) < 0.5 ? -1 : 1;

      generatedClouds.push({
        id: i,
        left,
        top,
        size,
        opacity,
        speed,
        zIndex,
        src,
        flip,
      });
    }

    return generatedClouds;
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute will-change-transform"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: `${cloud.size}px`,
            height: "auto",
            opacity: cloud.opacity,
            zIndex: cloud.zIndex,
            transform: `translateY(${scrollY * cloud.speed}px) translateX(-50%) scaleX(${cloud.flip})`,
          }}
        >
          <img
            src={cloud.src}
            alt=""
            style={{ width: `${cloud.size}px`, height: "auto" }}
            className="block bg-transparent"
          />
        </div>
      ))}
    </div>
  );
}

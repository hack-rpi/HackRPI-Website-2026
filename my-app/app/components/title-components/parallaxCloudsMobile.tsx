import { useEffect, useState, useMemo } from "react";

interface Cloud {
  id: number;
  left: string;
  top: string;
  size: number;
  opacity: number;
  speed: number;
  zIndex: number;
}

export default function DynamicCloudOverlay() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate a random stable cluster of 6-8 clouds on mount
  const clouds = useMemo(() => {
    const cloudCount = 14; 
    const generatedClouds: Cloud[] = [];

    for (let i = 0; i < cloudCount; i++) {
      const depth = Math.random(); 

      const xOffset = (Math.random()) * (100); 
      const left = `${1+xOffset}%`;

      // 3. Y-Position: Spaced vertically, but leaning "a little below center" (e.g., between 150px and 350px down)
      const randomY = (2*window.innerHeight/5) +  Math.random() * (2.5*window.innerHeight/5); 
      const top = `${randomY}px`;

      // 4. Size: Background clouds are smaller, foreground are larger (with some random variance)
      const size = Math.floor(96 + (1-depth) * 200 + Math.random() * 40); // Ranges from ~96px to 256px

      // 5. Opacity Rule: The ones nearest to the top (smaller Y value) are more opaque, 
      // plus a bit of random variance offset.
      // We invert the Y position ratio so lower pixel values (higher up) yield higher baseline opacity.
      const heightFactor = 1 - (randomY - 180) / 180; 
      const opacityVariance = (Math.random() - 0.5) * 0.2; // +/- 10% randomness
      const opacity = Math.max(0.2, Math.min(0.8, (1-depth) * 0.5 + 0.15 + opacityVariance));

      // 6. Speed & Z-index tied directly to depth factor
      const speed = 0.35 + depth * 0.55; // Speed multiplier between 0.15 and 0.70
      const zIndex = Math.floor(10 + depth * 10); // z-index between 10 and 20

      generatedClouds.push({
        id: i,
        left,
        top,
        size,
        opacity,
        speed,
        zIndex,
      });
    }

    return generatedClouds;
  }, []);

  return (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
    {clouds.map((cloud) => (
      <div
        key={cloud.id}
        className="absolute will-change-transform"
        style={{
          top: cloud.top,
          left: cloud.left,
          width: `${cloud.size}px`,   // Forces container width
          height: "auto",             // Maintains aspect ratio
          opacity: cloud.opacity,
          zIndex: cloud.zIndex,
          transform: `translateY(${scrollY * cloud.speed}px) translateX(-50%)`,
        }}
      >
        <img 
          src="/cloud.png" 
          alt="" 
          style={{ width: `${cloud.size}px`, height: "auto" }} // Forces image width
          className="bg-transparent block" 
        />
      </div>
    ))}
  </div>
);
}
// my-app/app/components/title-components/title.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import DesktopTitleComponent from "./desktop-title";
import MobileTitleComponent from "./mobile-title";

type Props = {
  onReady?: (variant: "desktop" | "mobile") => void;
};

export default function TitleComponent({ onReady }: Props) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const variant = useMemo<"desktop" | "mobile" | null>(() => {
    if (windowWidth === 0) return null;
    return windowWidth > 860 ? "desktop" : "mobile";
  }, [windowWidth]);

  useEffect(() => {
    if (!variant || !onReady) return;
    const id = requestAnimationFrame(() => onReady(variant));
    return () => cancelAnimationFrame(id);
  }, [variant, onReady]);

  if (variant === "desktop") return <DesktopTitleComponent />;
  if (variant === "mobile") return <MobileTitleComponent />;

  return <div className="h-screen" />;
}
// my-app/app/components/title-components/title.tsx
"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import DesktopTitleComponent from "./desktop-title";
import MobileTitleComponent from "./mobile-title";

type Props = {
  onReady?: (variant: "desktop" | "mobile") => void;
};

function subscribeToResize(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getWindowWidth() {
  return window.innerWidth;
}

function getServerWindowWidth() {
  return 0;
}

export default function TitleComponent({ onReady }: Props) {
  const windowWidth = useSyncExternalStore(subscribeToResize, getWindowWidth, getServerWindowWidth);

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

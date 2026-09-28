"use client";

import { useEffect, useRef } from "react";
export const FooterEllipseColor = "#252525";
export const FooterColor = "#cecab8";

export default function BackgroundColor({ scrollY }: { scrollY: number }) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    // Direct DOM class toggle - zero state re-renders
    if (scrollY < 1380) {
      bgRef.current.style.backgroundColor = "#000000";
    } else if (scrollY < 2800) {
      bgRef.current.style.backgroundColor = "#5f6b7a";
    } else {
      bgRef.current.style.backgroundColor = "#252525";
    }
  }, [scrollY]);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-0 pointer-events-none transition-colors duration-700 ease-out"
      style={{ backgroundColor: "#000000" }}
    />
  );
}
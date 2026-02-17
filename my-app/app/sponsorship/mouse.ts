"use client";

import { useEffect, useRef } from "react";

export default function useMouseLogic() {
  // We use a Ref so the values are available to JS instantly 
  // without waiting for a React render cycle.
  const mouseCoords = useRef({ x: 0, y: 0 });
  const clientCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleUpdate = (ev: any) => {
      // If it's a movement, record the viewport position
      if (ev instanceof MouseEvent) {
        clientCoords.current = { x: ev.clientX, y: ev.clientY };
      }
      
      // Calculate document position (Scroll + Viewport)
      mouseCoords.current = {
        // x: clientCoords.current.x + window.scrollX,
        // y: clientCoords.current.y + window.scrollY

        x: clientCoords.current.x,
        y: clientCoords.current.y
      };
    };

    window.addEventListener("mousemove", handleUpdate);
    window.addEventListener("scroll", handleUpdate, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleUpdate);
      window.removeEventListener("scroll", handleUpdate);
    };
  }, []);

  // Return a function to get the LATEST values
  const getPosition = () => mouseCoords.current;

  return { getPosition };
}
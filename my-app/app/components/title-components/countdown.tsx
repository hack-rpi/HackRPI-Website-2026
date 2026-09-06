import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function SkyCountdownOverlay({ center = false }: { center?: boolean }) {
  // Target date: November 7th, 2026 09:00:00
  const targetDate = new Date("2026-11-07T09:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsPast(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Returns nothing if the time has passed or during initial server render
  if (isPast || !timeLeft) {
    return null;
  }

  return (
    // absolute inset-0 fills the container, items-end and justify-end pushes it to the bottom right
    // <div className="absolute inset-0 z-50 flex items-end justify-end pointer-events-none p-6 md:p-10 select-none">
    <div
      className={`pointer-events-none absolute z-10 flex p-6 select-none md:p-10 ${
        center
          ? "inset-x-0 top-[66.6%] -translate-y-1/2 items-center justify-center"
          : "inset-0 items-end justify-end"
      } `}
    >
      {/* Container with a soft cloud glow instead of a solid box */}
      <div className="pointer-events-auto flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 shadow-lg backdrop-blur-sm md:items-end">
        {/* Subtle, airy header */}
        <span className="mb-2 text-[10px] font-bold tracking-widest text-white/70 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] md:text-xs">
          Arriving In
        </span>

        {/* New Stylized Number Grid */}
        <div className="flex justify-center gap-4 md:gap-5">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="group relative flex flex-col items-center">
              {/* Soft cloud glow element layered directly behind each number */}
              <div className="pointer-none absolute inset-0 scale-75 rounded-full bg-white/20 blur-md" />

              {/* Minimalist, glowing typographic numbers */}
              <span className="relative z-10 text-3xl font-light tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)] md:text-5xl">
                {String(value).padStart(2, "0")}
              </span>

              {/* Clean, dim label */}
              <span className="mt-1 text-[9px] font-medium tracking-wider text-white/60 uppercase md:text-[10px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

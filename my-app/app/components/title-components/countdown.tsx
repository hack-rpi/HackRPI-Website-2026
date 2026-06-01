import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function SkyCountdownOverlay() {
  // Target date: November 7th, 2026 09:00:00
  const targetDate = new Date('2026-11-07T09:00:00').getTime();
  
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
    <div className="absolute inset-0 z-50 flex items-end justify-end pointer-events-none p-6 md:p-10 select-none">
      
      {/* Container with a soft cloud glow instead of a solid box */}
      <div className="pointer-events-auto flex flex-col items-center md:items-end bg-white/5 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10 shadow-lg">
        
        {/* Subtle, airy header */}
        <span className="text-white/70 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
          Arriving In
        </span>

        {/* New Stylized Number Grid */}
        <div className="flex gap-4 md:gap-5 justify-center">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center relative group">
              
              {/* Soft cloud glow element layered directly behind each number */}
              <div className="absolute inset-0 bg-white/20 blur-md rounded-full scale-75 pointer-none" />

              {/* Minimalist, glowing typographic numbers */}
              <span className="relative z-10 text-white font-light text-3xl md:text-5xl tracking-tighter drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">
                {String(value).padStart(2, '0')}
              </span>
              
              {/* Clean, dim label */}
              <span className="text-white/60 text-[9px] md:text-[10px] font-medium uppercase tracking-wider mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
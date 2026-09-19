import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface SevenSegmentDigitProps {
  digit: string;
}

function SevenSegmentDigit({ digit }: SevenSegmentDigitProps) {
  const segments: Record<string, string[]> = {
    '0': ['a', 'b', 'c', 'd', 'e', 'f'],
    '1': ['b', 'c'],
    '2': ['a', 'b', 'd', 'e', 'g'],
    '3': ['a', 'b', 'c', 'd', 'g'],
    '4': ['b', 'c', 'f', 'g'],
    '5': ['a', 'c', 'd', 'f', 'g'],
    '6': ['a', 'c', 'd', 'e', 'f', 'g'],
    '7': ['a', 'b', 'c'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    '9': ['a', 'b', 'c', 'd', 'f', 'g'],
  };

  const activeSegments = segments[digit] ?? [];

  const segmentBase =
    'absolute rounded-full bg-white/10 transition-all duration-200';

  const active =
    'bg-white shadow-[0_0_6px_rgba(255,255,255,0.9),0_0_15px_rgba(255,255,255,0.6),0_0_30px_rgba(255,255,255,0.3)]';

  const horizontal = 'w-[70%] h-1.5';
  const vertical = 'w-1.5 h-[40%]';

  return (
    <div className="relative w-8 h-14 md:w-11 md:h-20">
      
      {/* A */}
      <div
        className={`${segmentBase} ${horizontal} top-0 left-1/2 -translate-x-1/2 ${
          activeSegments.includes('a') ? active : ''
        }`}
      />

      {/* B */}
      <div
        className={`${segmentBase} ${vertical} top-1 right-0 ${
          activeSegments.includes('b') ? active : ''
        }`}
      />

      {/* C */}
      <div
        className={`${segmentBase} ${vertical} bottom-1 right-0 ${
          activeSegments.includes('c') ? active : ''
        }`}
      />

      {/* D */}
      <div
        className={`${segmentBase} ${horizontal} bottom-0 left-1/2 -translate-x-1/2 ${
          activeSegments.includes('d') ? active : ''
        }`}
      />

      {/* E */}
      <div
        className={`${segmentBase} ${vertical} bottom-1 left-0 ${
          activeSegments.includes('e') ? active : ''
        }`}
      />

      {/* F */}
      <div
        className={`${segmentBase} ${vertical} top-1 left-0 ${
          activeSegments.includes('f') ? active : ''
        }`}
      />

      {/* G */}
      <div
        className={`${segmentBase} ${horizontal} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          activeSegments.includes('g') ? active : ''
        }`}
      />
    </div>
  );
}

export default function SkyCountdownOverlay({center = false}:{center?: boolean}) {
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
     <div 
      className={`
        absolute top-0 right-0 z-1 flex pointer-events-none p-6 md:p-10 select-none
        ${center 
          ? "inset-x-0 top-[66.6%] -translate-y-1/2 justify-center items-center" 
          : "inset-0 justify-end"
        }
      `}
    >
      
        <div className="flex gap-4 md:gap-5 justify-center">
          {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="flex flex-col items-center relative group">
                  <div className="pointer-events-auto flex flex-col items-center md:items-end bg-green/5 backdrop-blur-sm px-6 py-4 rounded-2xl border border-green/10 shadow-lg">
                    {/* Soft cloud glow element layered directly behind each number */}
                    <div className="absolute inset-0 bg-green blur-md rounded-full scale-75 pointer-none" />

                    {/* Minimalist, glowing typographic numbers */}
                    <span className="relative z-10 text-green font-light text-3xl md:text-5xl tracking-tighter drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">
                      <div className="flex gap-0">
                        {String(value)
                          .padStart(2, '0')
                          .split('')
                          .map((digit, index) => (
                            <SevenSegmentDigit
                              key={`${label}-${index}`}
                              digit={digit}
                            />
                          ))}
                      </div>
                    </span>
                    
                    {/* Clean, dim label */}
                    <span className="text-white/60 text-[9px] md:text-[10px] font-medium uppercase tracking-wider mt-1">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
        </div>
   
    </div>
  );
}
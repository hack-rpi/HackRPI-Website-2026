'use client';

import { useState, useEffect } from 'react';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownResult {
  timeLeft: TimeLeft | null;
  isPast: boolean;
}

export function useCountDown(targetDateString: string): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const targetDate = new Date(targetDateString).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
  }, [targetDateString]);

  return { timeLeft, isPast };
}
"use client";

import Image from "next/image";
import { useCountDown } from "./countdown";

// Tonight's boba window in Troy, NY (Eastern Standard Time).
const BOBA_START = "2026-11-07T23:59:00-05:00";
const BOBA_TIME = "2026-11-08T00:00:00-05:00";
const BOBA_END = "2026-11-08T01:00:00-05:00";

export default function BobaCountdown() {
  const { timeLeft, isPast } = useCountDown(BOBA_START);
  const { isPast: hasEnded } = useCountDown(BOBA_END);
  const units = [
    { label: "hrs", value: timeLeft ? timeLeft.days * 24 + timeLeft.hours : null },
    { label: "min", value: timeLeft?.minutes ?? null },
    { label: "sec", value: timeLeft?.seconds ?? null },
  ];

  if (hasEnded) return null;

  return (
    <section
      aria-label="Taichi boba at midnight"
      className="mx-auto mb-6 flex w-full max-w-3xl shrink-0 flex-wrap items-center justify-center gap-x-6 gap-y-4 rounded-2xl bg-hackrpi-clouds-dark-blue/60 px-5 py-5 text-center backdrop-blur-md sm:px-6 sm:text-left"
    >
      <Image
        src="/sponsors/sponsor_logos/Taichi.png"
        alt="Taichi Bubble Tea"
        width={96}
        height={86}
        className="h-20 w-24 shrink-0 object-contain"
      />
      <div>
        <p className="text-xl font-mono font-bold uppercase tracking-wide text-cyan-200 sm:text-2xl">Midnight boba break</p>
        <p className="mt-1 text-lg font-semibold leading-tight text-white">Taichi Bubble Tea</p>
        <p className="mt-2 text-sm text-white/70">
          Served at <time dateTime={BOBA_TIME}>12 AM ET · Nov. 8</time>
        </p>
      </div>
      <div className="shrink-0 font-mono text-yellow-100">
        {isPast ? (
          <p role="status" className="text-3xl font-extrabold sm:text-4xl">It&apos;s boba time!</p>
        ) : (
          <div role="timer" aria-label="Time until boba" className="flex gap-4 px-2 py-3">
            {units.map(({ label, value }) => (
              <div key={label} className="text-center">
                <span className="block text-4xl font-extrabold leading-none tabular-nums sm:text-5xl">
                  {value === null ? "--" : String(value).padStart(2, "0")}
                </span>
                <span className="mt-2 block text-xs uppercase tracking-widest text-white/60">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

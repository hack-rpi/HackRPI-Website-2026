"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FloatingInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [drift, setDrift] = useState({ x: 0, y: 0, rotation: 0 });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let timeoutId: number;
    const moveAndSchedule = () => {
      const isMobile = window.innerWidth < 860;
      setDrift({
        x: isMobile ? -(15 + Math.random() * 90) : (Math.random() * 2 - 1) * 100,
        y: (Math.random() * 2 - 1) * (isMobile ? 105 : 75),
        rotation: (Math.random() * 2 - 1) * 9,
      });
      timeoutId = window.setTimeout(moveAndSchedule, 1400 + Math.random() * 1400);
    };

    timeoutId = window.setTimeout(moveAndSchedule, 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY < 16;
      setIsVisible(shouldShow);
      if (!shouldShow) triggerRef.current?.blur();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <>

      {isOpen && (
        <div
          className="fixed inset-0 z-300 grid place-items-center bg-hackrpi-clouds-dark-blue/75 p-2 backdrop-blur-sm xs:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="relative max-h-[calc(100vh_-_5rem)] w-[calc(100%_-_2rem)] max-w-5xl overflow-x-hidden overflow-y-auto rounded-2xl border border-white/30 bg-linear-to-b from-[#f6fbff] to-[#dff3ff] p-4 [font-family:var(--font-sugo-display)] text-hackrpi-clouds-dark-blue shadow-[0_24px_90px_rgba(0,0,0,0.45)] xs:max-h-[calc(100vh_-_2rem)] xs:w-full xs:rounded-3xl xs:p-7 desktop:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-white/80 blur-xl"
            />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-hackrpi-clouds-dark-blue/15 bg-white/70 text-xl leading-none transition hover:rotate-6 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hackrpi-clouds-blue xs:right-5 xs:top-5 xs:h-10 xs:w-10 xs:text-2xl"
            >
              X
            </button>

            <h2
              id="modal-title"
              className="relative max-w-[82%] text-2xl font-bold leading-none tracking-normal normal-case [font-family:var(--font-sugo-display)] xs:max-w-[85%] xs:text-4xl desktop:text-5xl"
            >
              How this blockchain works
            </h2>
            <p
              id="modal-description"
              className="relative mt-3 max-w-4xl text-base leading-relaxed [font-family:var(--font-sugo-display)] text-[#173b55] desktop:text-lg"
            >
              A blockchain is an ordered history of records. Each block stores the SHA-256 fingerprint of the block before it, creating a linked, tamper-evident chain.
            </p>

            <dl className="relative mt-4 grid gap-3 desktop:grid-cols-3">
              <div className="rounded-xl border border-hackrpi-clouds-dark-blue/10 bg-white/65 p-4">
                <dt className="text-base font-bold text-[#11658d]">Hashes link the history</dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#173b55] desktop:text-base">A block&apos;s index, timestamp, data, previous hash, and nonce produce a 64-character SHA-256 hash. Changing old data changes its hash and breaks the following links.</dd>
              </div>
              <div className="rounded-xl border border-hackrpi-clouds-dark-blue/10 bg-white/65 p-4">
                <dt className="text-base font-bold text-[#11658d]">Mining proves work</dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#173b55] desktop:text-base">The miner changes a nonce and hashes the block repeatedly until the result begins with <code className="font-mono font-bold">000</code>. At difficulty three, success takes about 4,096 attempts on average.</dd>
              </div>
              <div className="rounded-xl border border-hackrpi-clouds-dark-blue/10 bg-white/65 p-4">
                <dt className="text-base font-bold text-[#11658d]">Nodes validate before agreeing</dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#173b55] desktop:text-base">Nodes check every field, hash, link, timestamp, and proof of work before adopting a longer valid chain. Equal-length forks remain tied until one branch grows.</dd>
              </div>
            </dl>

            <p className="relative mt-4 text-md leading-relaxed [font-family:var(--font-sugo-display)] text-[#39718e]">
              This educational demo stores text in memory. It has no wallets, signatures, balances, rewards, persistence, or payment authorization.
            </p>

            <div className="relative mt-5 flex justify-center">
              <Link
                href="/blockchain"
                onClick={() => setIsOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-hackrpi-clouds-dark-blue px-5 py-3 text-base font-bold [font-family:var(--font-sugo-display)] text-white transition hover:-translate-y-0.5 hover:bg-[#11658d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hackrpi-clouds-blue xs:w-auto xs:min-w-64"
              >
                Open visualizer
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

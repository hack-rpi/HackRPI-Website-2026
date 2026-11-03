"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FloatingInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
      <div
        aria-hidden={!isVisible}
        className={`fixed right-4 top-1/2 z-70 -translate-y-1/2 transition-opacity duration-300 2xs:right-6 desktop:top-1/4 desktop:right-auto desktop:left-3/4 desktop:-translate-x-1/2 ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="floating-question-button">
          <button
            ref={triggerRef}
            type="button"
            tabIndex={isVisible ? 0 : -1}
            onClick={() => setIsOpen(true)}
            aria-label="Open modal"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            className="grid h-14 w-14 place-items-center rounded-full border border-white/40 bg-hackrpi-clouds-dark-blue/90 text-3xl font-bold text-white shadow-[0_12px_40px_rgba(0,21,43,0.45)] backdrop-blur-md transition hover:scale-110 hover:border-hackrpi-clouds-blue hover:bg-[#05284b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hackrpi-clouds-blue/60 sm:h-16 sm:w-16 sm:text-4xl"
          >
            ?
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 grid place-items-center bg-hackrpi-clouds-dark-blue/75 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="relative w-full max-w-lg overflow-hidden rounded-4xl border border-white/30 bg-linear-to-b from-[#f6fbff] to-[#dff3ff] p-6 text-hackrpi-clouds-dark-blue shadow-[0_24px_90px_rgba(0,0,0,0.45)] sm:p-8"
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
              className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-hackrpi-clouds-dark-blue/15 bg-white/70 text-2xl leading-none transition hover:rotate-6 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hackrpi-clouds-blue"
            >
              X
            </button>

            <h2
              id="modal-title"
              className="relative max-w-[85%] text-4xl font-bold leading-none tracking-normal normal-case sm:text-5xl"
            >
              Blockchain facts
            </h2>
            <p
              id="modal-description"
              className="relative mt-4 text-lg leading-relaxed text-[#173b55]"
            >
              blah blah blah blah
            </p>
            <Link
              href="/blockchain"
              onClick={() => setIsOpen(false)}
              className="relative mt-6 inline-flex items-center justify-center rounded-full bg-hackrpi-clouds-dark-blue px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#11658d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hackrpi-clouds-blue"
            >
              Open blockchain visualizer
              <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </section>
        </div>
      )}
    </>
  );
}

export default function FinalMessage() {
  return (
    <div
      className="flex w-screen flex-col items-center justify-center bg-white px-2 pt-20 pb-16 font-mono leading-loose font-medium text-gBlack uppercase sm:pt-40 sm:pb-24"
      style={{ fontSize: "clamp(16px, 4.5vw, 50px)", letterSpacing: "clamp(0.02em, 0.5vw, 0.2em)" }}
    >
      <span
        className="relative block w-fit origin-center scale-y-85 whitespace-nowrap"
        id="winner-animate"
        style={{ clipPath: "inset(0px 100% 0px 0px)" }}
      >
        Proud to host
        <div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
      </span>
      <span
        className="relative block w-fit origin-center scale-y-85 whitespace-nowrap"
        id="winner-animate"
        style={{ clipPath: "inset(0px 100% 0px 0px)" }}
      >
        HackRPI{" "}
        <b
          className="inline-block cursor-pointer tracking-[0em] transition-all duration-300 ease-out hover:scale-105 hover:tracking-[0.05em] hover:text-sky-200/80 active:scale-95"
          style={{ fontSize: "clamp(18px, 5.4vw, 60px)" }}
        >
          In the Clouds
        </b>{" "}
        2026
        <div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
      </span>
      <span
        className="relative block w-fit origin-center scale-y-85 whitespace-nowrap"
        id="winner-animate"
        style={{ clipPath: "inset(0px 100% 0px 0px)" }}
      >
        For the <b>13th</b> year in a row
        <div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
      </span>
      <span
        className="relative block w-fit origin-center scale-y-85 whitespace-nowrap"
        id="winner-animate"
        style={{ clipPath: "inset(0px 100% 0px 0px)" }}
      >
        May the best hack <b>win</b>.
        <div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
      </span>
    </div>
  );
}

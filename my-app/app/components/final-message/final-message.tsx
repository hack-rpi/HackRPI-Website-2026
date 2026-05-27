
export default function FinalMessage () {
  return (
    <div className='font-mono text-[50px] font-medium uppercase tracking-[0.2em] flex h-screen w-screen flex-col items-center justify-center bg-white text-gBlack leading-loose'>
  <span className="relative block w-fit whitespace-nowrap scale-y-85 origin-center" id="winner-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
        Proud to host
        <div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
      </span>
      <span className="relative block w-fit whitespace-nowrap scale-y-85 origin-center" id="winner-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
        HackRPI 
        <b className="text-[60px] tracking-[0em] inline-block transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:tracking-[0.05em] hover:text-sky-200/80 active:scale-95">
          In the Clouds
        </b> 2027
        <div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
      </span>
      <span className="relative block w-fit whitespace-nowrap scale-y-85 origin-center" id="winner-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
        For the <b>13th</b> year in a row
        <div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
      </span>
      <span className="relative block w-fit whitespace-nowrap scale-y-85 origin-center" id="winner-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>
        May the best hack <b>win</b>.
        <div className="text-animation-layer inline-block w-auto" id="text-animate-layer" />
      </span>

    </div>
  )
}
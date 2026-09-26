import Link from "next/link";
import { useCountDown } from "./countdown";


const linkItems = [
    { label: "Event", href: "/event" },
    { label: "Schedule", href: "/event/schedule" },
    //{ label: "Prizes", href: "/prizes" },
    { label: "Last Year", href: "/last-year" },
    { label: "Sponsor Us", href: "/sponsorship" },
    { label: "Discord", href: "https://discord.gg/" },
];

const splitLabel = (label: string) => {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(label), (segment) => segment.segment);
};

export function Variation1({show}:{show: boolean}){

    const showLayout = false ? "" : "transparent";
    const margin = "p-0";
    const textSize = "text-[30px]";
    const textColor = "#c5c5c5";

    return (<>
        <div className={`w-full h-screen flex flex-col fixed z-1 pointer-events-none
            transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}
        `} style={{color: textColor}}>
            {/* Top Section - IMAGE */}
            <div className="relative w-full h-[55vh] flex justify-center items-center text-lg tracking-wider" style={{backgroundColor: showLayout}}> 
                <h1 className="absolute bottom-4 right-4 text-[100px]">
                    HackRPI In The Clouds
                </h1>
            </div>

            {/* Bottom Section - TEXT & LINKS */}
            <div className="w-full h-[45vh] bg-white flex items-end p-6 gap-4 box-border" style={{backgroundColor: showLayout}}>
                {/* Box 1 - Small light blue card at top left */}
                <h1 className={`w-[14%] h-[50%] self-start mr-[8%] bg-[#e1f8ff] rounded-xl flex justify-start items-start ${margin} whitespace-nowrap ${textSize}`} style={{backgroundColor: showLayout}}>
                    Nov. 7-8
                </h1>

                {/* Box 2 - Tall light blue card */}
                <div className={`w-[14%] h-[100%] bg-[#e1f8ff] rounded-xl flex flex-col justify-between items-start ${margin} ${textSize}`} style={{backgroundColor: showLayout}}>
                    <h1>Troy, NY</h1>
                    <Link
                        href="https://events.mlh.com/events/14390-hackrpi-2026"
                        className={`block px-8 py-3 border border-yellow-100 font-semibold text-yellow-100 font-mono uppercase tracking-widest text-sm hover:bg-yellow-100 hover:text-black transition-colors duration-300
                         ${(show) ? 'pointer-events-auto' : 'pointer-events-none'} `}
                        style={{ boxShadow: "0 0 20px rgba(254,252,232,0.15), inset 0 0 20px rgba(254,252,232,0.3)" }}
                        target="_blank"
                    >
                        Register ⇾
                    </Link>
                    
                </div>

                {/* Box 3 - Wide light blue card */}
                <p className="flex-1 h-[75%] bg-[#e1f8ff] rounded-xl flex justify-center items-center p-8" style={{backgroundColor: showLayout}}>
                    Blah blah Blah blah Blah blah Blah blah Blah blah Blah blah Blah blah 
                    Blah blah Blah blah Blah blah Blah blah Blah blah Blah blah Blah blah 
                    Blah blah Blah blah Blah blah Blah blah Blah blah Blah blah Blah blah 
                    <br/>
                    <br/>
                    Blah Blah
                </p>

                {/* Box 4 - Light red links card */}
                <div className={`pointer-events-auto w-[14%] h-[55%] bg-[#ffc8c8] overflow-visible rounded-xl flex flex-col justify-end items-end ${margin} gap-1 ${textSize}`} style={{backgroundColor: showLayout}}>
                    {linkItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`norris-line inline-flex flex-row items-center w-fit whitespace-nowrap outline-none shrink-0 leading-none`}
                            style={{height: "0.8em"}}
                        >
                            {splitLabel(item.label).map((char: any, index: any) => (
                                <span
                                    key={`${item.label}-${index}`}
                                    className="norris-char h1"
                                    data-char={char === " " ? "\u00A0" : char}
                                    style={{ "--index": index } as React.CSSProperties}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </Link>
                    ))}
                    
                </div>
            </div>
        </div>
    </>);
}

export function Variation2({show}:{show: boolean}){

    const { timeLeft, isPast } = useCountDown('2026-11-07T09:00:00');
    const showLayout = false ? "" : "transparent";
    const textSize = "text-[100px]";
    const textColor = "#c5c5c5";
    if(timeLeft == null) return(<></>);

    return (<>
        <div 
            className={`pointer-events-none w-full h-screen flex flex-col items-center justify-center fixed z-10 transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`} 
            style={{ color: textColor, backgroundColor: showLayout }}
        >
            {isPast ? (
                <p className={`${textSize} font-bold`}>Time's Up!</p>
            ) : (
                <div className="flex items-center gap-6">
                    {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: timeLeft.hours },
                        { label: 'Minutes', value: timeLeft.minutes },
                        { label: 'Seconds', value: timeLeft.seconds },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <span className={`${textSize} font-bold leading-none`}>
                                {String(item.value).padStart(2, '0')}
                            </span>
                            <span className="text-xs uppercase font-medium mt-1 opacity-60 tracking-wider">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>);
}

export function Variation3({show}:{show: boolean}){

    const showLayout = false ? "" : "transparent";
    const textSize = "text-[100px]";
    const textColor = "#c5c5c5";

    return (
        <div 
            className={`w-full h-screen fixed inset-0 z-10 grid grid-cols-2 transition-opacity duration-300 ease-in-out pointer-events-none ${show ? 'opacity-100' : 'opacity-0'}`} 
            style={{ color: textColor, backgroundColor: showLayout }}
        >
            {/* Left Half Container */}
            <div className="flex flex-col justify-center items-start pl-16 md:pl-24 max-w-2xl">
                <span className="text-sm uppercase tracking-[0.3em] font-semibold mb-2 opacity-70">
                    Something Big Is Coming
                </span>
                
                <h1 className={`${textSize} font-black leading-[0.9] tracking-tighter uppercase mb-6`}>
                    Next <br />
                    Chapter
                </h1>

                <p className="text-lg font-light opacity-80 max-w-md leading-relaxed">
                    We are crafting an entirely new experience. Mark your calendar for what comes next.
                </p>
            </div>

            {/* Right Half (Empty to keep left alignment isolated) */}
            <div aria-hidden="true" />
        </div>
    );
}

export default function HeroScene({scrollY, variation, startShowPosition, hideShowPosition}:{scrollY: number, variation: number, startShowPosition:number, hideShowPosition: number}){

    const show = (scrollY >= startShowPosition && scrollY < hideShowPosition);

    if(variation == 1)
        return (<Variation1 show={show}/>);
    else if(variation == 2)
        return (<Variation2 show={show}/>);
    else if(variation == 3)
        return (<Variation3 show={show}/>);
}
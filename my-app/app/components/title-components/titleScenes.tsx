"use client";

import Link from "next/link";
import { useCountDown } from "./countdown";

const linkItems = [
    { label: "Event", href: "/event" },
    { label: "Schedule", href: "/event/schedule" },
    //{ label: "Prizes", href: "/prizes" },
    { label: "Last Year", href: "/last-year" },
    { label: "Sponsor Us", href: "/sponsorship" },
    { label: "Discord", href: "https://discord.gg/mrnsm74tDj" },
];

const splitLabel = (label: string) => {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(label), (segment) => segment.segment);
};

export function Variation1({ show }: { show: boolean }) {
    const { timeLeft, isPast } = useCountDown("2026-11-07T09:00:00");
    const showLayout = false ? "" : "transparent";
    const textColor = "#c5c5c5";

    return (
        <div
            className={`w-full h-screen fixed inset-0 z-10 flex flex-col justify-between p-8 md:p-12 pointer-events-none transition-opacity duration-300 ease-in-out ${
                show ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: textColor }}
        >
            {/* TOP HALF (50vh) - Main Hero Title */}
            <div
                className="w-full h-[52vh] flex justify-end items-end pb-6 border-b border-white/10"
                style={{ backgroundColor: showLayout }}
            >
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-right leading-none">
                    HackRPI In The Clouds
                </h1>
            </div>

            {/* BOTTOM HALF (50vh) - Structured 12-Column Grid */}
            <div
                className="w-full h-[38vh] grid grid-cols-12 gap-6 items-end pt-6"
                style={{ backgroundColor: showLayout }}
            >
                {/* Col 1-3: Date & Location */}
                <div className="col-span-3 flex flex-col justify-between h-full py-2">
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] opacity-50 block">
                                01 // DATE & VENUE
                            </span>
                            <h2 className="text-2xl md:text-4xl font-mono font-bold text-white tracking-wide">
                                Nov. 7-8
                            </h2>
                            <h2 className="text-2xl md:text-4xl font-mono font-bold text-neutral-400 tracking-wide">
                                Troy, NY
                            </h2>
                        </div>

                        {/* Timer Widget */}
                        {timeLeft && !isPast && (
                            <div className="space-y-1 pt-2 border-t border-white/10 font-mono">
                                <span className="text-[10px] uppercase tracking-widest opacity-50 block">
                                    COUNTDOWN
                                </span>
                                <div className="text-sm md:text-base font-bold text-yellow-100 tracking-wider">
                                    {String(timeLeft.days).padStart(2, "0")}d :{" "}
                                    {String(timeLeft.hours).padStart(2, "0")}h :{" "}
                                    {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                                    {String(timeLeft.seconds).padStart(2, "0")}s
                                </div>
                            </div>
                        )}
                    </div>

                    <Link
                        href="https://events.mlh.com/events/14390-hackrpi-2026"
                        className={`inline-block w-fit px-6 py-2.5 border border-yellow-100 font-mono font-bold text-yellow-100 text-xs md:text-sm uppercase tracking-widest hover:bg-yellow-100 hover:text-black transition-colors ${
                            show ? "pointer-events-auto" : "pointer-events-none"
                        }`}
                        style={{
                            boxShadow: "0 0 15px rgba(254,252,232,0.15)",
                        }}
                        target="_blank"
                    >
                        Register ⇾
                    </Link>
                </div>

                {/* Col 4-6: About / Overview */}
                <div className="col-span-3 flex flex-col justify-between h-full py-2 border-l border-white/10 pl-6">
                    <div className="space-y-3">
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] opacity-50 block">
                            02 // OVERVIEW
                        </span>
                        <p className="text-xs md:text-sm font-mono opacity-80 leading-relaxed">
                            Join us for 24 hours of creation, learning, and innovation at Rensselaer Polytechnic Institute. Build extraordinary projects alongside passionate student creators.
                        </p>
                    </div>

                    <div className="text-[10px] md:text-xs font-mono opacity-50 uppercase tracking-widest space-x-2">
                        <span>Free Meals</span> • <span>Mentors</span> • <span>Swag</span>
                    </div>
                </div>

                {/* Col 7-9: Event Tracks */}
                <div className="col-span-3 flex flex-col justify-between h-full py-2 border-l border-white/10 pl-6">
                    <div className="space-y-3">
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] opacity-50 block">
                            03 // FEATURED TRACKS
                        </span>
                        <ul className="text-xs md:text-sm font-mono space-y-1.5 opacity-85">
                            <li className="flex items-center gap-2">
                                <span className="text-yellow-100">✦</span> AI & Machine Learning
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-yellow-100">✦</span> Cloud Infrastructure
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-yellow-100">✦</span> Hardware & Robotics
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-yellow-100">✦</span> Game Dev & General
                            </li>
                        </ul>
                    </div>

                    <span className="text-[10px] md:text-xs font-mono text-yellow-100/80 uppercase tracking-widest">
                        $10K+ PRIZE POOL
                    </span>
                </div>

                {/* Col 10-12: Navigation Links */}
                <div className="col-span-3 flex flex-col justify-end items-end h-full py-2 pointer-events-auto space-y-2">
                    {linkItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="norris-line inline-flex flex-row items-center w-fit whitespace-nowrap outline-none shrink-0 text-lg md:text-2xl font-mono font-medium tracking-wide hover:text-yellow-100 transition-colors"
                            style={{ height: "1em" }}
                        >
                            {splitLabel(item.label).map((char: any, idx: any) => (
                                <span
                                    key={`${item.label}-${idx}`}
                                    className="norris-char h1"
                                    data-char={char === " " ? "\u00A0" : char}
                                    style={{ "--index": idx } as React.CSSProperties}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function Variation2({ show }: { show: boolean }) {
    const textColor = "#c5c5c5";

    return (
        <div
            className={`fixed inset-0 z-10 pointer-events-none transition-opacity duration-300 ease-in-out ${
                show ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: textColor }}
        >
            {/* Occupies Bottom 75% and Right 75% */}
            <div className="absolute top-[25%] left-[25%] right-0 bottom-0 p-8 md:p-14 flex flex-col justify-between">
                {/* Large Stacked Title Header */}
                <div className="space-y-2">
                    <p className="text-sm font-mono font-bold uppercase tracking-[0.4em] text-yellow-100/90 drop-shadow-md">
                        12TH ANNUAL HACKATHON
                    </p>
                    <h1 style={{ color: textColor }} className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] drop-shadow-lg">
                        HACK <br />
                        RPI '26
                    </h1>
                </div>

                {/* Big Bold Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-auto max-w-3xl">
                    {/* Parking & Location */}
                    <div className="space-y-2 border-l-2 border-white/30 pl-6">
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-yellow-100/90 block">
                            FREE PARKING
                        </span>
                        <h2 className="text-2xl md:text-3xl font-mono font-bold drop-shadow" style={{ color: textColor }}>
                            North Lot
                        </h2>
                        <p className="text-base md:text-lg font-mono text-neutral-200 drop-shadow">
                            Troy, NY 12180
                        </p>
                    </div>

                    {/* Check-In Instructions */}
                    <div className="space-y-2 border-l-2 border-white/30 pl-6">
                        <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-yellow-100/90 block">
                            CHECK-IN DESK
                        </span>
                        <h2 className="text-2xl md:text-3xl font-mono font-bold drop-shadow" style={{ color: textColor }}>
                            Main Foyer
                        </h2>
                        <p className="text-base md:text-lg font-mono text-neutral-200 drop-shadow">
                            Pick up your badge & wristband
                        </p>
                    </div>
                </div>

                {/* High Contrast Callout Bar */}
                <div className="pt-4 border-t border-white/20 flex items-center justify-between font-mono">
                    <span className="text-sm md:text-base font-bold uppercase tracking-widest drop-shadow" style={{ color: textColor }}>
                        OVER $10,000 IN PRIZES
                    </span>
                    <span className="text-sm md:text-base font-bold uppercase tracking-widest text-yellow-100/70 drop-shadow">
                        FOOD • GEAR • SWAG
                    </span>
                </div>
            </div>
        </div>
    );
}

export function Variation3({ show }: { show: boolean }) {
    const textSize = "text-[100px]";
    const textColor = "#c5c5c5";

    return (
        <div
            className={`w-full h-screen fixed inset-0 z-10 grid grid-cols-2 transition-opacity duration-300 ease-in-out pointer-events-none ${
                show ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: textColor }}
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

            {/* Right Half */}
            <div aria-hidden="true" />
        </div>
    );
}

export function Variation4({ show }: { show: boolean }) {
    const showLayout = false ? "red" : "transparent";
    const textColor = "#c5c5c5";

    return (
        <div
            className={`w-full h-screen fixed inset-0 z-10 grid grid-cols-1 md:grid-cols-2 transition-opacity duration-300 ease-in-out pointer-events-none ${
                show ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: textColor }}
        >
            {/* Left Half (Empty for Map background) */}
            <div aria-hidden="true" />

            {/* Right Half Container - Centered Vertically */}
            <div
                className="flex flex-col justify-center px-8 md:px-14 py-12 h-full space-y-8"
                style={{ backgroundColor: showLayout }}
            >
                {/* Header Title Brought Down Toward Center */}
                <div className="space-y-2">
                    <span
                        className="text-xs md:text-sm font-mono font-bold uppercase tracking-[0.35em] block opacity-80"
                        style={{ color: textColor }}
                    >
                        TRACKS & REWARDS
                    </span>
                    <h1
                        className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none"
                        style={{ color: textColor }}
                    >
                        PRIZE TRACKS
                    </h1>
                </div>

                {/* Main Content Grid Brought Up Toward Center */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl">
                    {/* Column 1: Cash & Main Hacks */}
                    <div className="space-y-4 border-l-2 border-white/20 pl-5">
                        <span
                            className="text-xs font-mono font-bold uppercase tracking-widest block opacity-70"
                            style={{ color: textColor }}
                        >
                            TOP CASH AWARDS
                        </span>
                        <ul className="space-y-2.5 font-mono text-sm md:text-base">
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span className="font-bold">#1 Best Hack</span>
                                <span className="text-yellow-100 font-bold">$1,000</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span className="font-bold">#2 Best Hack</span>
                                <span className="text-yellow-100 font-bold">$750</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>Ethical AI (#1-#3)</span>
                                <span className="text-yellow-100 font-bold">$100-$300</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>ML / Data Science</span>
                                <span className="text-yellow-100 font-bold">$400</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>Sustainability</span>
                                <span className="text-yellow-100 font-bold">$400</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>Healthcare Hack</span>
                                <span className="text-yellow-100 font-bold">$400</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: Physical Tech & Hardware Prizes */}
                    <div className="space-y-4 border-l-2 border-white/20 pl-5">
                        <span
                            className="text-xs font-mono font-bold uppercase tracking-widest block opacity-70"
                            style={{ color: textColor }}
                        >
                            HARDWARE & GEAR
                        </span>
                        <ul className="space-y-2.5 font-mono text-sm md:text-base">
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>In The Clouds</span>
                                <span className="text-yellow-100 font-bold text-xs">Sony Headphones</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>Best Hardware</span>
                                <span className="text-yellow-100 font-bold text-xs">Mini 4K Drone</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>Best AI Edge</span>
                                <span className="text-yellow-100 font-bold text-xs">Air Fryer</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>First Time Hack</span>
                                <span className="text-yellow-100 font-bold text-xs">Lego Technic</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>Best Game Hack</span>
                                <span className="text-yellow-100 font-bold text-xs">Govee LED Bars</span>
                            </li>
                            <li className="flex justify-between items-baseline border-b border-white/10 pb-1">
                                <span>Best Mobile App</span>
                                <span className="text-yellow-100 font-bold text-xs">Mini Projector</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="border-t border-white/20 pt-4 font-mono text-xs md:text-sm tracking-wider uppercase opacity-80">
                    Submit your project on Devpost before 09:00 AM Nov 8
                </div>
            </div>
        </div>
    );
}

export function Variation5({ show }: { show: boolean }) {
    const showLayout = false ? "red" : "transparent";
    const textColor = "#c5c5c5";

    return (
        <div
            className={`w-full h-screen fixed inset-0 z-10 flex flex-col justify-center items-center text-center p-8 transition-opacity duration-300 ease-in-out ${
                show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            style={{ color: textColor }}
        >
            <div
                className="max-w-2xl space-y-8 my-auto"
                style={{ backgroundColor: showLayout }}
            >
                {/* Centered Header */}
                <div className="space-y-2">
                    <span
                        className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] block font-bold text-yellow-100/90"
                    >
                        SUNDAY @ 11:00 AM
                    </span>

                    <h1
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none"
                    >
                        JUDGING CRITERIA
                    </h1>

                    <p
                        className="text-xs md:text-sm font-mono opacity-80 max-w-md mx-auto pt-1"
                    >
                        Projects are evaluated by a panel of industry experts, professors, and alumni.
                    </p>
                </div>

                {/* Simplified 4 Pillar Bullet List (No Emojis) */}
                <div className="grid grid-cols-2 gap-4 text-left font-mono text-xs md:text-sm border-y border-white/20 py-6 max-w-lg mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-100 font-bold">01 //</span> Practicality & Utility
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-100 font-bold">02 //</span> Originality & Creativity
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-100 font-bold">03 //</span> Technical Difficulty
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-100 font-bold">04 //</span> Team Effort & Growth
                    </div>
                </div>

                {/* Link to Detailed Page */}
                <div className="pt-2">
                    <Link
                        href="/event"
                        className={`inline-block px-8 py-3 border border-yellow-100 font-mono font-bold text-yellow-100 text-xs md:text-sm uppercase tracking-widest hover:bg-yellow-100 hover:text-black transition-colors ${
                            show ? "pointer-events-auto" : "pointer-events-none"
                        }`}
                        style={{
                            boxShadow: "0 0 15px rgba(254,252,232,0.15)",
                        }}
                    >
                        Full Rubric & Details ⇾
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function Variation6({ show }: { show: boolean }) {
    const showLayout = false ? "red" : "transparent";
    const textColor = "#c5c5c5";

    return (
        <div
            className={`w-full h-screen fixed inset-0 z-0 flex flex-col justify-center items-center text-center p-8 pointer-events-none transition-opacity duration-500 ease-in-out ${
                show ? "opacity-100" : "opacity-0"
            }`}
            style={{ color: textColor }}
        >
            <div
                className="max-w-3xl space-y-6 my-auto select-none"
                style={{ backgroundColor: showLayout }}
            >
                {/* Subtle Subtitle */}
                <span
                    className="text-xs md:text-sm font-mono uppercase tracking-[0.5em] block font-semibold text-yellow-100/60"
                >
                    NEED HELP? // GOT QUESTIONS?
                </span>

                {/* Ambient Watermark Header */}
                <h1
                    className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-transparent"
                    style={{
                        WebkitTextStroke: "1px rgba(197, 197, 197, 0.25)",
                    }}
                >
                    FREQUENTLY ASKED
                </h1>

                {/* Secondary Stroked Subtitle */}
                <p className="text-xl md:text-3xl font-mono uppercase tracking-widest opacity-30 font-bold">
                    [ FAQ SECTION ]
                </p>

                {/* Minimalist Background Anchor Categories */}
                <div className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-widest opacity-40 pt-4">
                    <span className="border-b border-white/20 pb-1">01 // GENERAL</span>
                    <span className="border-b border-white/20 pb-1">02 // LOGISTICS</span>
                    <span className="border-b border-white/20 pb-1">03 // TEAMS</span>
                    <span className="border-b border-white/20 pb-1">04 // HARDWARE</span>
                </div>
            </div>
        </div>
    );
}


export default function HeroScene({
    scrollY,
    variation,
    startShowPosition,
    hideShowPosition,
}: {
    scrollY: number;
    variation: number;
    startShowPosition: number;
    hideShowPosition: number;
}) {
    const show = scrollY >= startShowPosition && scrollY < hideShowPosition;

    if (variation === 1) return <Variation1 show={show} />;
    else if (variation === 2) return <Variation2 show={show} />;
    else if (variation === 3) return <Variation3 show={show} />;
    else if (variation === 4) return <Variation4 show={show} />;
    else if (variation === 5) return <Variation5 show={show} />;
    else if (variation === 6) return <Variation6 show={show} />;

    return null;
}
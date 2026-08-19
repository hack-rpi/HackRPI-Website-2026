"use client";

import React, { useState, useEffect } from 'react';
import PlaneScene from "./three/Scene";
import Link from "next/link";
import "@/app/globals.css";
// import MapTerrain from './mapTerrain';

import dynamic from "next/dynamic";
const MapTerrain = dynamic(() => import("./mapTerrain"), { ssr: false });


const linkItems = [
    { label: "Event", href: "/event" },
    { label: "Schedule", href: "/event/schedule" },
    //{ label: "Prizes", href: "/prizes" },
    { label: "Last Year", href: "/last-year" },
    { label: "Sponsor Us", href: "/sponsorship" },
    { label: "Discord", href: "https://discord.gg/" },
  ];

export default function DesktopTitleComponent() {

    const showLayout = false ? "" : "transparent";
    const textSize1 = "text-[30px]";
    const textColor = "#333333";
    const showTextScrollPosition = 10;
    const margin = "p-0"

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => { setScrollY(window.scrollY); };
        window.addEventListener('scroll', handleScroll, { passive: true });        

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const splitLabel = (label: string) => {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(label), (segment) => segment.segment);
    };

    return (<>
        <img src="https://picsum.photos/600/400" className="absolute w-full h-full object-cover"/>
        {/* <MapTerrain/> */}
        <PlaneScene scrollY={scrollY}/>
        <div className={`w-full h-screen flex flex-col fixed z-1
            transition-opacity duration-300 ease-in-out ${(scrollY < showTextScrollPosition) ? 'opacity-100' : 'opacity-0'}
        `} 
        style={{color: textColor}}>
            {/* Top Section - IMAGE */}
            <div className="relative w-full h-[55vh] flex justify-center items-center text-lg tracking-wider" style={{backgroundColor: showLayout}}> 
                <h1 className="absolute bottom-4 right-4 text-[100px]">
                    HackRPI In The Clouds
                </h1>
            </div>

            {/* Bottom Section - TEXT & LINKS */}
            <div className="w-full h-[45vh] bg-white flex items-end p-6 gap-4 box-border" style={{backgroundColor: showLayout}}>
                {/* Box 1 - Small light blue card at top left */}
                <h1 className={`w-[14%] h-[50%] self-start mr-[8%] bg-[#e1f8ff] rounded-xl flex justify-start items-start ${margin} whitespace-nowrap ${textSize1}`} style={{backgroundColor: showLayout}}>
                    Nov. 7-8
                </h1>

                {/* Box 2 - Tall light blue card */}
                <div className={`w-[14%] h-[100%] bg-[#e1f8ff] rounded-xl flex flex-col justify-between items-start ${margin} ${textSize1}`} style={{backgroundColor: showLayout}}>
                    <h1>Troy, NY</h1>
                    <Link
                        href="https://events.mlh.com/events/14390-hackrpi-2026"
                        className={`block px-8 py-3 border border-yellow-100 font-semibold text-yellow-100 font-mono uppercase tracking-widest text-sm hover:bg-yellow-100 hover:text-black transition-colors duration-300
                         ${(scrollY < showTextScrollPosition) ? 'pointer-events-auto' : 'pointer-events-none'} `}
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
                <div className={`w-[14%] h-[55%] bg-[#ffc8c8] overflow-visible rounded-xl flex flex-col justify-end items-end ${margin} gap-1 ${textSize1}`} style={{backgroundColor: showLayout}}>
                    {linkItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`norris-line inline-flex flex-row items-center w-fit whitespace-nowrap outline-none shrink-0 leading-none`}
                            style={{height: "0.8em"}}
                        >
                            {splitLabel(item.label).map((char, index) => (
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
        
        <div style={{marginBottom: "500%"}}></div>
    </>);
}
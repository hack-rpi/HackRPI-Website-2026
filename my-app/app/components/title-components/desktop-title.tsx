"use client";

import React, { useState, useEffect } from 'react';
import PlaneScene from "./three/Scene";
import Link from "next/link";
import Countdown from "./countdown";
import "@/app/globals.css";
// import MapTerrain from './mapTerrain';

import dynamic from "next/dynamic";
const MapTerrain = dynamic(() => import("./mapTerrain"), { ssr: false });

type slowInterval = {
  begin: number;
  end: number;
  scale: number
};
//put all the raw scoll values that you want to slow
const slowZones : slowInterval[] = [
  //{begin: 200 , end: 400, scale: 0.1}, 
    {begin: 1130 , end: 1330, scale: 0.1} //about us 
];
//returns adjusted intervals based on the slowdown of prior intervals
function getAdjustedSlowIntervals(intervals: slowInterval[]){
  let offset = 0;
  let answer : slowInterval[] =[];
  for(const slowInterval of intervals){
    answer.push({begin:slowInterval.begin+offset,end:slowInterval.end+offset,scale:slowInterval.scale})
    let currOffset = (slowInterval.end-slowInterval.begin)*(1-slowInterval.scale);
    offset+=currOffset;
  }
  return answer;
}
//scales scroll based on slowIntervals
function getScaledScroll(trueScroll: number)
{
  let output = 0;
  let current = 0;
  for (const slowInterval of getAdjustedSlowIntervals(slowZones)){
    if (scrollY <= slowInterval.begin) {
      output += scrollY - current;
      return output;
      }

    output += slowInterval.begin - current;


    if (scrollY <= slowInterval.end) {
      output += (scrollY - slowInterval.begin) * slowInterval.scale;
      return output;
    }
    
    output += (slowInterval.end - slowInterval.begin) * slowInterval.scale;
    current = slowInterval.end;

  }
  
  output += scrollY - current;
  return output;
}
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
    const showTitleTextScrollPosition = 10;
    const margin = "p-0"

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => { setScrollY(getScaledScroll(window.scrollY)); };
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
        {/*<img src="https://picsum.photos/600/400" className="absolute w-full h-full object-cover"/>*/}
        {/* <MapTerrain/> */}
        <PlaneScene scrollY={scrollY}/>
        <div className={`w-full h-screen flex flex-col fixed z-1
            transition-opacity duration-300 ease-in-out ${(scrollY < showTitleTextScrollPosition) ? 'opacity-100' : 'opacity-0'}
        `} 
        style={{color: textColor}}>
            {/* Top Section - IMAGE */}
            <div className="relative w-full h-[55vh] flex justify-center items-center text-lg tracking-wider" style={{backgroundColor: showLayout}}> 
                <h1 className="absolute bottom-4 right-4 text-[100px]">
                    HackRPI In The Clouds
                </h1>
            </div>

            {/* Bottom Section - TEXT & LINKS */}
            <div className="relative w-full h-[45vh] bg-white flex items-end p-6 gap-4 box-border" style={{backgroundColor: showLayout}}>
                {//<Countdown center={false}/>
                }
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
                         ${(scrollY < showTitleTextScrollPosition) ? 'pointer-events-auto' : 'pointer-events-none'} `}
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
        <div className ={`w-full fixed transition-opacity duration-300 ease-in-out ${(scrollY < 1150 && scrollY > 1130) ? 'opacity-100' : 'opacity-0'}`} >{/*about us section*/}
            <h1 className="absolute top-[150px] right-[10px] text-[70px] rotate-40">
                About HackRPI
            </h1>
            <div className="absolute top-[800px] right-[-200px] w-300 h-40 bg-blue-950/80 rotate-40">
                <p className="w-[500px] text-[20px] opacity-100">
                    Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs in New York's Tech Valley and beyond. All students from all schools are welcome to participate, regardless of their major or experience level. Whether you're a seasoned hacker or a first-time participant, HackRPI is the perfect opportunity to learn new skills, meet new people, and have fun!
                </p>
            </div>
            <div className="absolute top-[450px] right-[-200px] w-300 h-40 bg-blue-950/80 rotate-40">
                <p className="w-[1000px] text-[28px] opacity-100">
                    In the clouds. Soar to new heights at our 13th annual hackathon. This year's theme challenges you to design projects that take flight—whether literally or figuratively. Elevate existing solutions to high peaks or even create something new with emerging technologies. After all, the sky’s the limit (or is it?!).
                </p>
            </div>
            <div className="absolute top-[300px] right-[-200px] w-200 h-40 bg-blue-950/80 rotate-40">
                <p className="w-[600px] text-[20px]">
                    HackRPI 2026 is Rensselaer Polytechnic Institute's 13th annual intercollegiate hackathon hosted by students for students. Starting at noon on Saturday, November 7th, teams of 1-4 people have 24 hours to build and submit projects relating to our theme, In The Clouds. After submitting their projects, participants showcase their work in front of professors, industry professionals, and fellow students.
                </p>
            </div>
        </div>
        <div style={{marginBottom: "500%"}}></div>
    </>);
}
"use client";

import React, { useState, useEffect } from 'react';
import PlaneScene from "./three/Scene";
import Link from "next/link";
import Countdown from "./countdown";
import "@/app/globals.css";
// import MapTerrain from './mapTerrain';

import dynamic from "next/dynamic";
import HeroScene from './titleScenes';
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

export default function DesktopTitleComponent() {
    
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => { setScrollY(getScaledScroll(window.scrollY)); };
        window.addEventListener('scroll', handleScroll, { passive: true });        

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    

    return (<>
        {/* <img src="https://picsum.photos/600/400" className="absolute w-full h-full object-cover"/> */}
        {/* <MapTerrain/> */}
        <PlaneScene scrollY={scrollY}/>
        
        <HeroScene scrollY={scrollY} variation={1} startShowPosition={0} hideShowPosition={10} />
        <HeroScene scrollY={scrollY} variation={2} startShowPosition={650} hideShowPosition={1200} />
        <HeroScene scrollY={scrollY} variation={3} startShowPosition={1400} hideShowPosition={2000} />
        
        <div style={{marginBottom: "500%"}}></div>
    </>);
}
"use client";

import React, { useState, useEffect } from 'react';
import PlaneScene from "./three/Scene";
import Link from "next/link";
import "@/app/globals.css";
// import MapTerrain from './mapTerrain';


import dynamic from "next/dynamic";
import HeroScene from './titleScenes';
import BackgroundColor from '../BGColor';
import CloudBackground from '../cloudBG';
// const MapTerrain = dynamic(() => import("./mapTerrain"), { ssr: false });

export default function DesktopTitleComponent() {
    
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => { setScrollY(window.scrollY); };
        window.addEventListener('scroll', handleScroll, { passive: true });        

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    

    return (<>
        {/* <img src="https://picsum.photos/600/400" className="absolute w-full h-full object-cover"/> */}
        {/* <MapTerrain/> */}
        <BackgroundColor scrollY={scrollY}/>
        <div className="absolute top-[2000px] left-0 w-full h-[4000px] pointer-events-none z-0">
            <CloudBackground count={20} minTopPercent={0} maxTopPercent={95} />
        </div>
        <PlaneScene scrollY={scrollY}/>
        
        <HeroScene scrollY={scrollY} variation={1} startShowPosition={0} hideShowPosition={10} />
        <HeroScene scrollY={scrollY} variation={2} startShowPosition={400} hideShowPosition={600} />
        <HeroScene scrollY={scrollY} variation={3} startShowPosition={700} hideShowPosition={1000} />
        <HeroScene scrollY={scrollY} variation={4} startShowPosition={1000} hideShowPosition={1200} />
        <HeroScene scrollY={scrollY} variation={5} startShowPosition={1200} hideShowPosition={1500} />
        <HeroScene scrollY={scrollY} variation={6} startShowPosition={1600} hideShowPosition={2100} />
        
        <div style={{marginBottom: "2100px"}}></div>
    </>);
}


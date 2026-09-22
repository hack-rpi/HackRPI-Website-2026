"use client";

import React, { useState, useEffect } from 'react';
import PlaneScene from "./three/Scene";
import Link from "next/link";
import "@/app/globals.css";
// import MapTerrain from './mapTerrain';

import dynamic from "next/dynamic";
import HeroScene from './titleScenes';
const MapTerrain = dynamic(() => import("./mapTerrain"), { ssr: false });




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
        <PlaneScene scrollY={scrollY}/>
        
        <HeroScene scrollY={scrollY} variation={1} startShowPosition={0} hideShowPosition={10} />
        <HeroScene scrollY={scrollY} variation={2} startShowPosition={650} hideShowPosition={1200} />
        <HeroScene scrollY={scrollY} variation={3} startShowPosition={1400} hideShowPosition={2000} />
        
        <div style={{marginBottom: "500%"}}></div>
    </>);
}
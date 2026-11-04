'use client';

import NavBar from "@/app/components/nav-bar/nav-bar";
import Document from "next/document";

export default function Game() {
  return (<>
    {/* <NavBar /> */}

    <div id = "page" style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "black",backgroundImage: "url('/background.png')", }}>
      <div style = {{width: "100vw",height:"7vh"}}/>
      <iframe
        src="/game-build/index.html"
        style={{ border: 0, width: "100%", height: "100%" }}
        allow="fullscreen; autoplay; gamepad"
        allowFullScreen
      ></iframe>
    </div>
    
  
  </>);
}
'use client';

import NavBar from "@/app/components/nav-bar/nav-bar";


export default function Game() {
  return (<>
    {/* <NavBar /> */}
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "black" }}>
      <iframe
        src="/game-build/index.html"
        style={{ border: 0, width: "100%", height: "100%" }}
        allow="fullscreen; autoplay; gamepad"
        allowFullScreen
      ></iframe>
    </div>
    
  
  </>);
}
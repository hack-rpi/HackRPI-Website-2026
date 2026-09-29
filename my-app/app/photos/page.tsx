"use client";

import React from "react";
import "@/app/globals.css";
import LastYearCollage from "@/app/components/prev-projects/LastYearCollage";
import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";

export default function PastYearProjects() {
  return (
    <>
      <NavBar showOnScroll={false} variant={2}/>

      {/* Main Container styled to match the dark theme */}
      <main
        className="relative w-full min-h-screen pt-[10vh] flex flex-col items-center justify-start bg-slate-950 text-white overflow-hidden"
        id="winners"
      >
        {/* Top Glow Accent matching the footer and cloud theme */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full" />

        {/* Header Section */}
        <div className="relative z-10 text-center px-4 pt-6 pb-2">
          <span className="text-blue-300 font-mono text-sm tracking-widest uppercase">
            Memories & Moments
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 bg-gradient-to-r from-blue-200 via-white to-blue-300 bg-clip-text text-transparent">
            Photos from HackRPI 2025
          </h1>
        </div>

        {/* Photos Grid */}
        <div className="w-full relative z-10">
          <LastYearCollage />
        </div>
      </main>

      <Footer />
    </>
  );
}
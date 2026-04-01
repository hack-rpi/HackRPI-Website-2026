"use client";

import React, { useEffect } from "react";
import "@/app/globals.css";
import LastYearCollage from "@/app/components/prev-projects/LastYearCollage";
import Image from "next/image";
import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";
import Lenis from 'lenis';
import HackRPILink from "@/app/components/themed-components/hackrpi-link";

export default function PastYearProjects() {
  return (
    <>
      <NavBar showOnScroll={false}/>
      <div className="w-full pt-[8vh] flex items-center justify-center flex-col bg-linear-to-b from-sky-500 via-purple-500 to-purple-800" id="winners">
        <h2 className="text-3xl font-bold text-center p-5 m-5">Photos from HackRPI 2025!</h2>

        <LastYearCollage />
      </div>
      <Footer/>
    </>
  );
}

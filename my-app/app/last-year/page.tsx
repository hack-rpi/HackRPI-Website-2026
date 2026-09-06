"use client";

import React, { useEffect } from "react";
import "@/app/globals.css";
import ProjectDisplay from "@/app/components/prev-projects/project-display";
import ProjectCarousel from "@/app/components/prev-projects/project-carousel";
import { podiumPrizes } from "@/app/data/previous-prize-winners";
import { carouselPrizes } from "@/app/data/previous-prize-winners";

import NavBar from "../components/nav-bar/nav-bar";
import Footer from "../components/footer/footer";
import HackRPILink from "@/app/components/themed-components/hackrpi-link";

import Lenis from "lenis";

export default function PastYearProjects() {
  const topProjects = podiumPrizes.slice(0, 3);

  useEffect(() => {
    // lenis scrolling
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <>
      <NavBar showOnScroll={false} />
      <main
        className="flex w-full flex-col items-center justify-center bg-linear-to-b from-sky-500 via-purple-500 to-purple-800 pt-[8vh] pb-20"
        id="winners"
      >
        <h2 className="m-5 p-5 text-center text-3xl font-bold">
          Previous Projects from HackRPI 2025
        </h2>
        <div className="flex w-11/12 flex-col items-center justify-center lg:w-3/4 xl:w-2/3">
          <div className="mx-auto grid grid-cols-1 gap-8">
            {topProjects.map((project, index) => (
              <div key={index}>
                <ProjectDisplay {...project} />
                {index < topProjects.length - 1 && (
                  <hr className="mx-auto my-8 w-full border-t border-gray-200 desktop:w-1/2" />
                )}
              </div>
            ))}
          </div>
          <hr className="my-8 w-full border-t border-gray-200 desktop:w-1/2" />
          <ProjectCarousel projects={carouselPrizes} />
          <HackRPILink
            href="https://hackrpi-2025.devpost.com/project-gallery"
            className="mt-2 mb-20 px-5 py-2 text-xl text-primary lg:text-2xl"
          >
            See all projects!
          </HackRPILink>
        </div>
      </main>
      <footer className="bg-white">
        <div
          className="h-[10vh] w-full bg-purple-800"
          style={{ clipPath: "ellipse(70% 0% at 50% 0%)" }}
          id="footer-ellipse"
        ></div>
        <Footer />
      </footer>
    </>
  );
}

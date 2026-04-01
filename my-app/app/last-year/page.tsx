"use client";

import React, { useEffect } from "react";
import "@/app/globals.css";
import ProjectDisplay from "@/app/components/prev-projects/project-display";
import ProjectCarousel from "@/app/components/prev-projects/project-carousel";
import { podiumPrizes } from "@/app/data/previous-prize-winners";
import { carouselPrizes } from "@/app/data/previous-prize-winners";
import Image from "next/image";

import NavBar from "../components/nav-bar/nav-bar";
import Footer from "../components/footer/footer";
import HackRPILink from "@/app/components/themed-components/hackrpi-link";

import Lenis from 'lenis';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PastYearProjects() {
	const topProjects = podiumPrizes.slice(0, 3);

	useEffect(() => {
    // lenis scrolling
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  })

	return (
		<>
			<NavBar showOnScroll={false}/>
			<div className="
				w-full pt-[8vh] flex items-center justify-center
				flex-col bg-linear-to-b from-sky-500 via-purple-500 to-purple-800 pb-20
			" id="winners">
				<h2 className="text-3xl font-bold text-center p-5 m-5">Previous Projects from HackRPI 2025</h2>
				<div className="w-11/12 lg:w-3/4 xl:w-2/3 flex flex-col items-center justify-center">
					<div className="grid grid-cols-1 gap-8 mx-auto">
						{topProjects.map((project, index) => (
							<div key={index}>
								<ProjectDisplay {...project} />
								{index < topProjects.length - 1 && (
									<hr className="my-8 border-t border-gray-200 w-full desktop:w-1/2 mx-auto" />
								)}
							</div>
						))}
					</div>
					<hr className="my-8 border-t border-gray-200 w-full desktop:w-1/2 " />
					<ProjectCarousel projects={carouselPrizes} />
					<HackRPILink
						href="https://hackrpi-2025.devpost.com/project-gallery"
						className="text-primary text-xl lg:text-2xl px-5 py-2 mt-2 mb-20"
					>
						See all projects!
					</HackRPILink>
				</div>
			</div>
			<div className="bg-white">
				<div className="w-full h-[10vh] bg-purple-800" style={{ clipPath: "ellipse(70% 0% at 50% 0%)" }} id="footer-ellipse"></div>
				<Footer/>
			</div>
		</>
	);
}

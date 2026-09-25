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
  })

	return (
		<>
			<NavBar showOnScroll={false}/>
			<main className="
				w-full pt-[8vh] flex items-center justify-center pb-20 flex-col
				bg-linear-to-b from-orange-500 via-purple-500 via-60% to-purple-800"
				style={{
				backgroundImage: "url('/last-year/retro2.jpg')",
				backgroundSize: "100% 100%",
			}}
			id="winners">
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
					<div className="w-full bg-linear-to-b from-orange-500/25 via-purple-500/75 via-40% to-purple-800 rounded-lg">
						{/*<img className="absolute z-10" src={"/last-year/2025_carousel_frame.png"} />
						attempt at a frame looked kinda ugly but I will leave it here incase someone more talented gets assigned to this next year! Thats also why there is like a random div here for no reason*/}
						<ProjectCarousel projects={carouselPrizes} />
					</div>
					<HackRPILink
						href="https://hackrpi-2025.devpost.com/project-gallery"
						className="text-primary text-xl lg:text-2xl px-5 py-2 mt-2 mb-20 bg-purple-900"
					>
						See all projects!
					</HackRPILink>
				</div>
			</main>
			<footer className="bg-white">
				<div className="w-full h-[10vh] bg-purple-800" style={{ clipPath: "ellipse(70% 0% at 50% 0%)" }} id="footer-ellipse"></div>
				<Footer/>
			</footer>
		</>
	);
}

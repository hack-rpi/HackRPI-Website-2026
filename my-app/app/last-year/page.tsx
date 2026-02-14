"use client";

import React from "react";
import "@/app/globals.css";
import ProjectDisplay from "@/app/components/prev-projects/project-display";
import ProjectCarousel from "../components/prev-projects/project-carousel";
import { podiumPrizes } from "@/app/data/previous-prize-winners";
import { carouselPrizes } from "@/app/data/previous-prize-winners";
import NavBar from "../components/nav-bar/nav-bar";
import Footer from "../components/footer/footer";

export default function PastYearProjects() {
	const topProjects = podiumPrizes.slice(0, 3);

	return (
		<>
			<NavBar/>
			<div className="w-full flex items-center justify-center flex-col bg-gradient-to-b from-sky-500 to-purple-500" id="winners">
				<h2 className="text-3xl font-bold text-center p-5 m-5">Previous Projects from HackRPI 2025</h2>
				<div className="w-11/12 lg:w-3/4 xl:w-2/3 pt-8 flex flex-col items-center justify-center">
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
				</div>
			</div>
			<Footer/>
		</>
	);
}

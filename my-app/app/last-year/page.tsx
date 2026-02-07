"use client";

import React from "react";
import "@/app/globals.css";
import ProjectDisplay from "@/app/components/prev-projects/project-display";
import { podiumPrizes } from "@/app/data/previous-prize-winners";

export default function PastYearProjects() {
	const topProjects = podiumPrizes.slice(0, 3);

	return (
		<div className="w-full flex items-center justify-center flex-col" id="winners">
			<div className="w-11/12 lg:w-3/4 xl:w-2/3 pt-8 flex flex-col items-center justify-center">
				<h2 className="text-3xl font-bold text-center mb-8 pt-20">Previous Projects From HackRPI XI</h2>
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
			</div>
		</div>
	);
}

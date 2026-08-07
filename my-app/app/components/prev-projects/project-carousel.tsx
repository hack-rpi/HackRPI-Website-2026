"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

export interface ProjectCarouselProps {
	prizeCategory: string;
	title: string;
	authors: string[];
	description: string;
	imageUrl: string;
}

export default function ProjectCarousel({ projects }: { projects: ProjectCarouselProps[] }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const [selectedIndex, setSelectedIndex] = useState(0);

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
	const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

	const updateSelectedSlide = useCallback(() => {
		if (!emblaApi) return;

		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		emblaApi.on("select", updateSelectedSlide);
		emblaApi.on("reInit", updateSelectedSlide);

		return () => {
			emblaApi.off("select", updateSelectedSlide);
			emblaApi.off("reInit", updateSelectedSlide);
		};
	}, [emblaApi, updateSelectedSlide]);

	return (
		<div className="w-full my-10" style={{ zIndex: 1 }}>
			<div className="relative w-full h-fit rounded-md mb-2">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="flex">
						{projects.map((project, index) => (
							<div className="min-w-0 flex-[0_0_100%] items-center flex-col w-full h-fit flex justify-center my-4" key={index}>
								<h1 className="text-ellipsis w-full text-center text-xl xs:text-2xl sm:text-3xl font-bold font-sans p-1">
									{project.prizeCategory}
								</h1>
								<div className="bg-transparent lightText w-full flex flex-col items-center justify-start bg-silver rounded-md m-4">
									<h2 className="w-full mb-2 text-center text-2xl font-bold font-sans">{project.title}</h2>
									<p className="mb-4 w-full text-center m">{project.authors.join(", \n")}</p>
									<div className="relative w-75 desktop:w-[100vh] h-75 desktop:h-[45vh]">
										<Image
											src={project.imageUrl}
											alt={project.title}
											fill
											className="sizeImage z-0 w-full mb-2 rounded-md object-cover"
											sizes="(max-width: 75vw) 1vw"
										></Image>
									</div>
									<div className="absolute sm:w-3/4 -top-50 flex-col w-full pl-4 mt-2 text-center"></div>
									<p className="w-full px-4 font-sans text-center my-2">{project.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<button
					type="button"
					aria-label="Previous project"
					className="absolute left-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-sm text-white transition hover:bg-black/70 sm:left-2 sm:size-10 sm:text-base"
					onClick={scrollPrev}
				>
					&lt;
				</button>
				<button
					type="button"
					aria-label="Next project"
					className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-sm text-white transition hover:bg-black/70 sm:right-2 sm:size-10 sm:text-base"
					onClick={scrollNext}
				>
					&gt;
				</button>
			</div>
			<div className="flex justify-center gap-2">
				{projects.map((_, index) => (
					<button
						type="button"
						key={index}
						aria-label={`Go to project ${index + 1}`}
						className={`size-2.5 rounded-full transition ${
							index === selectedIndex ? "bg-current" : "bg-current/30 hover:bg-current/50"
						}`}
						onClick={() => scrollTo(index)}
					/>
				))}
			</div>
		</div>
	);
}

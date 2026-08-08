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
    <div className="my-10 w-full" style={{ zIndex: 1 }}>
      <div className="relative mb-2 h-fit w-full rounded-md">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {projects.map((project, index) => (
              <div
                className="my-4 flex h-fit w-full min-w-0 flex-[0_0_100%] flex-col items-center justify-center"
                key={index}
              >
                <h1 className="w-full p-1 text-center font-sans text-xl font-bold text-ellipsis xs:text-2xl sm:text-3xl">
                  {project.prizeCategory}
                </h1>
                <div className="lightText bg-silver m-4 flex w-full flex-col items-center justify-start rounded-md bg-transparent">
                  <h2 className="mb-2 w-full text-center font-sans text-2xl font-bold">
                    {project.title}
                  </h2>
                  <p className="m mb-4 w-full text-center">{project.authors.join(", \n")}</p>
                  <div className="relative h-75 w-75 desktop:h-[45vh] desktop:w-[100vh]">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="sizeImage z-0 mb-2 w-full rounded-md object-cover"
                      sizes="(max-width: 75vw) 1vw"
                    ></Image>
                  </div>
                  <div className="absolute -top-50 mt-2 w-full flex-col pl-4 text-center sm:w-3/4"></div>
                  <p className="my-2 w-full px-4 text-center font-sans">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Previous project"
          className="absolute top-1/2 left-1 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-sm text-white transition hover:bg-black/70 sm:left-2 sm:size-10 sm:text-base"
          onClick={scrollPrev}
        >
          &lt;
        </button>
        <button
          type="button"
          aria-label="Next project"
          className="absolute top-1/2 right-1 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-sm text-white transition hover:bg-black/70 sm:right-2 sm:size-10 sm:text-base"
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

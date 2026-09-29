import { div } from "framer-motion/client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export interface ProjectCarouselProps {
	prizeCategory: string;
	title: string;
	authors: string[];
	description: string;
	imageUrl: string;
}

export default function ProjectCarousel({ projects }: { projects: ProjectCarouselProps[] }) {
	const responsive = {
		all: {
			breakpoint: { max: 4000, min: 0 },
			items: 1,
		},
	};

	return (
		<div className="w-full" style={{ zIndex: 1 }}>
			<Carousel
				swipeable={true}
				draggable={true}
				showDots={true}
				responsive={responsive}
				infinite={true}
				keyBoardControl={true}
				ssr={true}
				containerClass="w-full h-fit rounded-md mb-2"
			>
				{projects.map((project, index) => (
					<div className="w-3/4 flex flex-col justify-center my-10 mx-25">
						<h1 className="mx-auto my-5 text-4xl">{project.prizeCategory}</h1>
						<div className="flex">
							<div className="w-1/2 text-xl">
								<img className="aspect-3/2 object-cover" src={project.imageUrl} />
							</div>
							<div className="w-1/2 mx-10 text-xl flex flex-col">
								<p className="mx-auto my-1 text-4xl">{project.title}</p>
								<hr />
								<p className="mx-auto my-1 text-base">{project.authors.join(", \n")}</p>
								<hr />
								<p>{project.description}</p>
							</div>
						</div>
					</div>
				))}
			</Carousel>
		</div>
	);
}
/*<div className="items-center flex-col w-full h-fit flex justify-center my-4" key={index}>
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
					</div>*/
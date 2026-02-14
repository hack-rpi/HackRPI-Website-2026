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
					<div className="items-center flex-col w-full h-fit flex items-start justify-center my-4 border-2 border-red-500" key={index}>
						<h1 className="text-ellipsis w-full text-center text-xl xs:text-2xl sm:text-3xl font-bold font-sans p-5">
							{project.prizeCategory}
						</h1>
						<div className="border-2 border-green-500 bg-transparent lightText w-full flex flex-col items-center justify-start bg-silver rounded-md m-4">
							<h2 className="border-2 border-blue-500 w-full mb-2 text-center text-2xl font-bold font-sans">{project.title}</h2>
							<p className="mb-4 w-full text-center m">{project.authors.join(", \n")}</p>
							<Image
								src={project.imageUrl}
								alt={project.title}
								width={500}
								height={500}
								className="sizeImage z-0 object-cover w-full h-fit mb-2 rounded-md"
							></Image>
							<div className="absolute sm:w-3/4 -top-50 flex-col w-full pl-4 mt-2 text-center"></div>
							<p className="w-full px-4 font-sans text-center my-2">{project.description}</p>
						</div>
					</div>
				))}
			</Carousel>
		</div>
	);
}

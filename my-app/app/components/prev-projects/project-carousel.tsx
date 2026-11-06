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
        {projects.map((project) => (
          <div
            key={`${project.prizeCategory}-${project.title}`}
            className="mx-auto flex w-[calc(100%-3rem)] max-w-6xl flex-col justify-center py-10 pb-16"
          >
            <h1 className="mx-auto mb-8 hidden text-center text-4xl desktop:block">
              {project.prizeCategory}
            </h1>

            <div className="grid grid-cols-1 items-center gap-6 desktop:grid-cols-2 desktop:gap-10">
              <div className="w-full">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} project screenshot`}
                  width={900}
                  height={600}
                  className="aspect-3/2 w-full object-cover"
                />
              </div>

              <div className="flex w-full flex-col text-center desktop:text-left">
                <p className="mb-2 text-xl desktop:hidden">{project.prizeCategory}</p>
                <h2 className="mb-2 text-3xl desktop:text-4xl">{project.title}</h2>
                <hr />
                <p className="my-2 text-base">{project.authors.join(", ")}</p>
                <hr />
                <p className="mt-4 text-left text-lg leading-relaxed">{project.description}</p>
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

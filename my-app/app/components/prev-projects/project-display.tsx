import React from "react";
import Image from "next/image";

export interface ProjectDisplayProps {
  title: string;
  authors: string[];
  prizeCategory: string;
  description: string;
  imageUrl: string;
  imageOnLeft: boolean;
}

export default function ProjectDisplay(props: ProjectDisplayProps) {
  return (
    <>
      <DesktopProjectDisplay {...props} />
      <MobileProjectDisplay {...props} />
    </>
  );
}

function DesktopProjectDisplay(props: ProjectDisplayProps) {
  return (
    <div
      className={`hidden xl:flex ${props.imageOnLeft ? "flex-row-reverse" : "flex-row"} items-center justify-between`}
    >
      <div className="w-1/2">
        <h1 className="font-modern pb-4 text-left text-4xl text-white text-shadow-md">
          {props.prizeCategory}
        </h1>
        <h2 className="font-modern pb-2 text-2xl font-medium text-white">{props.title}</h2>
        <hr />
        <p className="font-neutral2">{props.authors.join(", ")}</p>
        <hr />
        <p className="font-neutral2 mt-2">{props.description}</p>
      </div>
      <div className="w-2/5">
        <Image src={props.imageUrl} alt={props.title} height={500} width={500} loading="eager" />
      </div>
    </div>
  );
}

function MobileProjectDisplay(props: ProjectDisplayProps) {
  return (
    <div className="flex w-fit flex-col items-start justify-start xl:hidden">
      <div className="flex w-full items-center justify-center">
        <Image
          src={props.imageUrl}
          alt={props.title}
          height={500}
          width={500}
          className="previousWinnersImages"
        />
      </div>
      <div>
        <h1 className="font-modern p-2 text-center text-4xl text-white text-shadow-md">
          {props.prizeCategory}
        </h1>
        <h2 className="font-modern p-2 text-center text-2xl font-medium text-white">
          {props.title}
        </h2>
        <hr />
        <p className="p-2 text-center font-sans text-lg text-white">{props.authors.join(", ")}</p>
        <hr />
        <p className="mt-2">{props.description}</p>
      </div>
    </div>
  );
}

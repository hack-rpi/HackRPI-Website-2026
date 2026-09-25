"use client";

import { ReactNode, Children, useState } from "react";

interface CarouselProps {
  children: ReactNode[];
}

export default function Carousel({ children }: CarouselProps) {

  return (
      <div className="flex mx-auto flex-wrap justify-evenly">
          {Children.map(children, (child) => (
            <div className="w-9/30 min-w-[150px] my-10">
              {child} 
            </div>
          ))}
      </div>
  );
}
'use client';

import React, { Children, ReactNode, useState, useId } from "react";
import CARDS from "./faqs.json";

interface FaqGridProps {
  children: ReactNode;
}

export function FaqGrid({ children }: FaqGridProps) {
  return (
    <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto py-10 px-4">
      {Children.map(children, (child) => (
        <div className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-[280px]">
          {child}
        </div>
      ))}
    </div>
  );
}

type FAQ = {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
};

export function QnA({ title, content, defaultOpen = false }: FAQ) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div 
      className={`
        rounded-xl shadow-md overflow-hidden transition-all duration-300
        ${open 
          ? "bg-slate-900 border-slate-700 shadow-xl" 
          : "bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/60 hover:border-slate-700/60"
        }
      `}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className={`
          w-full flex justify-between items-center gap-4
          p-5 text-left text-lg font-medium text-sky-400 hover:text-sky-300
          transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
          ${open ? "bg-slate-900" : "bg-transparent"}
        `}
      >
        <span>{title}</span>
        <span 
          aria-hidden="true" 
          className={`
            text-2xl font-light text-sky-400 shrink-0 transition-transform duration-200
            ${open ? "rotate-45 text-sky-300" : "rotate-0"}
          `}
        >
          +
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-label={title}
        className={`
          grid transition-[grid-template-rows] duration-200 ease-out
          ${open ? "grid-rows-[1fr] bg-slate-950/60" : "grid-rows-[0fr]"}
        `}
      >
        <div className="overflow-hidden">
          <div className="p-5 text-slate-300 border-t border-slate-800/60 text-sm leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StackedCarousel() {
  return (
    <FaqGrid>
      {CARDS.map((card, index) => (
        <QnA 
          key={card.title || index} 
          title={card.title} 
          content={card.body} 
          defaultOpen={false} 
        />
      ))}
    </FaqGrid>
  );
}
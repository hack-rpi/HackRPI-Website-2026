
import React from "react";

type FAQ = {
	title: string;
	content: React.ReactNode;
  defaultOpen?: boolean;
};

export default function QnA({title, content, defaultOpen = false }: FAQ) {
  const [open, setOpen] = React.useState(defaultOpen);
  const contentId = React.useId();

  return (
    <div className="border-2 border-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="faq-button w-full flex justify-between items-center
        bg-gradient-to-b from-white to-sky-200 text-sky-500 border-none p-5 cursor-pointer text-left text-lg">
        <span>{title}</span>
        <span aria-hidden="true" className="text-18 text-[1]">
          {open ? "-" : "+"}
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-label={title}
        className = "bg-sky-600"
        style={{
          maxHeight: open ? 500 : 0,
          overflow: "hidden",
          transition: "max-height 200ms ease",
        }}
      >
        <div className="p-5 text-white text-[1.6]">
          {content}
        </div>
      </div>
    </div>
  );
}
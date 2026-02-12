
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
    <div className="border-1 border-white p-12 faq-item">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="faq-button w-full flex justify-between items-center gap-12 bg-transparent border-none p-0 cursor-pointer text-left text-xl">
        <span>{title}</span>
        <span aria-hidden="true" style={{ fontSize: 18, lineHeight: 1 }}>
          {open ? "-" : "+"}
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-label={title}
        style={{
          maxHeight: open ? 500 : 0,
          overflow: "hidden",
          transition: "max-height 200ms ease",
        }}
      >
        <div style={{ paddingTop: 8, color: "#374151", lineHeight: 1.6 }}>
          {content}
        </div>
      </div>
    </div>
  );
}
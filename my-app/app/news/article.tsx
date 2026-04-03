import React, { useEffect, useRef } from 'react';

export interface ArticleData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
}

interface ArticleProps {
  data: ArticleData;
  variant?: 'card' | 'full' | 'featured';
  /** Wider card styling for the horizontal Hackathon strip */
  scrollCard?: boolean;
  onClick?: () => void;
}

const bodyParagraphClass =
  'mb-8 text-lg leading-[1.9] text-[#b4b4b4] max-md:mb-8 max-md:text-base';
const bodyH2Class =
  'mb-6 mt-14 text-4xl font-bold tracking-tight text-white first:mt-0 max-md:mb-6 max-md:mt-12 max-md:text-3xl';
const bodyH3Class =
  'mb-4 mt-10 text-[1.75rem] font-semibold text-white max-md:mb-4 max-md:mt-8 max-md:text-[1.35rem]';
const bodyBlockquoteClass =
  'my-12 rounded-r-xl border-l-4 border-gold bg-[rgba(255,215,0,0.05)] py-8 pl-10 pr-8 text-xl italic text-white max-md:my-10 max-md:py-6 max-md:pl-8 max-md:text-lg';

const Article: React.FC<ArticleProps> = ({
  data,
  variant = 'card',
  scrollCard = false,
  onClick,
}) => {
  const { title, excerpt, content, category, author, date, imageUrl } = data;
  const heroRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (variant === 'full' && heroRef.current) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const heroElement = heroRef.current;

        if (heroElement) {
          // Calculate opacity and blur based on scroll
          const maxScroll = 400;
          const scrollRatio = Math.min(scrollPosition / maxScroll, 1);
          const opacity = 1 - scrollRatio * 0.7;
          const blur = scrollRatio * 8;
          const brightness = 0.5 - scrollRatio * 0.2;

          heroElement.style.opacity = opacity.toString();
          heroElement.style.filter = `blur(${blur}px) brightness(${brightness})`;
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [variant]);

  if (variant === 'card') {
    const cardRadius = scrollCard ? 'rounded-2xl' : 'rounded-[14px] max-md:rounded-xl';
    const imageHeight = scrollCard
      ? 'h-[180px] max-md:h-[160px]'
      : 'h-[140px] max-md:h-[120px]';
    const contentPad = scrollCard ? 'gap-2 p-[1.35rem]' : 'gap-[0.35rem] p-4';
    const categoryClass = scrollCard
      ? 'rounded-[5px] border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.1)] px-[0.7rem] py-[0.3rem] text-[0.65rem] font-bold uppercase tracking-[0.08em] text-gold'
      : 'rounded border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.1)] px-[0.55rem] py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.08em] text-gold';
    const titleClass = scrollCard
      ? 'mb-2 text-xl font-bold leading-snug tracking-tight text-white'
      : 'mb-1.5 text-base font-bold leading-snug tracking-tight text-white';
    const excerptClass = scrollCard
      ? 'mb-3 flex-1 text-sm leading-relaxed text-[#b4b4b4] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [overflow:hidden]'
      : 'description-box mb-2.5 flex-1 text-xs leading-normal text-[#b4b4b4]';

    return (
      <article
        className={`group relative flex h-full cursor-pointer flex-col overflow-hidden border
          border-[#222] bg-[#111] shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all
          duration-400 ease-in-out before:pointer-events-none before:absolute before:inset-0
          before:z-1 before:rounded-[inherit] before:bg-linear-to-br before:from-[rgba(255,215,0,0.1)]
          before:to-[rgba(168,85,247,0.1)] before:opacity-0 before:transition-opacity before:duration-500
          after:pointer-events-none after:absolute after:inset-0 after:z-1 after:rounded-[inherit]
          after:bg-linear-to-br after:from-gold after:to-[#a855f7] after:p-px after:opacity-0 after:transition-opacity
          after:duration-500 after:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
          after:[-webkit-mask-composite:xor] after:mask-exclude hover:z-10 hover:-translate-y-2 hover:scale-105 hover:border-transparent
          hover:shadow-[0_24px_48px_rgba(255,215,0,0.25),0_0_60px_rgba(168,85,247,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]
          hover:before:opacity-100 hover:after:opacity-100 ${cardRadius} animate-fadeInUp`}
        onClick={onClick}
      >
        <span
          className="pointer-events-none absolute inset-0 z-3 overflow-hidden rounded-[inherit]"
          aria-hidden
        >
          <span className="
            absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15
            to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full
          "/>
        </span>
        <img
          src={imageUrl}
          alt={title}
          className={`relative z-2 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.08] ${imageHeight}`}
        />
        <div className={`relative z-2 flex flex-1 flex-col ${contentPad}`}>
          <div className="mb-0.5 flex items-center gap-2.5 text-xs">
            <span className={categoryClass}>{category}</span>
          </div>
          <h3 className={titleClass}>{title}</h3>
          <p className={excerptClass}>{excerpt}</p>
          <span className="
            mt-auto inline-flex items-center gap-2 text-sm font-semibold
            uppercase tracking-wide text-gold transition-all duration-300 hover:gap-3
          hover:text-[#ffe94d] hover:[text-shadow:0_0_20px_rgba(255,215,0,0.5)]
          ">
            Read More →
          </span>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article
        className="
          group relative h-100 max-[1400px]:h-87.5 max-md:h-75 cursor-pointer overflow-hidden
          rounded-[20px] border border-[#222] bg-[#111] shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          transition-all duration-300 hover:-translate-y-1
          hover:shadow-[0_16px_48px_rgba(255,215,0,0.2),0_0_60px_rgba(168,85,247,0.15)] animate-fadeInUp
        "
        onClick={onClick}
      >
        <img
          src={imageUrl}
          alt={title}
          className="
            absolute inset-0 h-full w-full object-cover brightness-[0.7] transition-all
            duration-500 group-hover:scale-105 group-hover:brightness-50
          "/>
        <div className="absolute inset-x-0 bottom-0 z-2 bg-linear-to-t from-black/95 via-black/70 to-transparent p-10">
          <div className="mb-0.5 flex items-center gap-2.5 text-xs">
            <span className="
              rounded border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.1)]
              px-[0.55rem] py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.08em] text-gold
            ">
              {category}
            </span>
          </div>
          <h2 className="
            mb-3 text-[2rem] font-bold leading-snug tracking-tight text-white
            [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] max-md:mb-3 max-md:text-2xl
          ">
            {title}
          </h2>
          <p className="max-w-150 text-[0.95rem] leading-normal text-[#b4b4b4]">
            {excerpt}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="m-0 w-full p-0">
      <div className="sticky top-0 z-0 h-[70vh] min-h-125 overflow-hidden max-md:h-[60vh] max-md:min-h-100">
        <img
          ref={heroRef}
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover brightness-50"
        />
        <div className="absolute inset-0 z-2 flex items-end bg-[linear-gradient(to_top,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.7)_40%,transparent_100%)] p-16 max-md:p-8 max-md:px-6">
          <div className="mx-auto w-full max-w-250">
            <h1 className="mb-6 text-[3.5rem] font-extrabold leading-[1.15] tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.8)] max-md:mb-4 max-md:text-[2rem]">
              {title}
            </h1>
            <div className="flex items-center gap-4 text-lg text-[#b4b4b4] [text-shadow:0_2px_10px_rgba(0,0,0,0.8)] max-md:text-base">
              <span className="text-[0.7rem] font-medium text-[#6b6b6b]">By {author}</span>
              <span className="text-[#6b6b6b]">•</span>
              <span className="text-[0.6rem] text-[#6b6b6b]">{date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-[5vh] rounded-t-3xl bg-black shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
        <div className="mx-auto max-w-200 px-12 py-20 max-md:px-6 max-md:py-12">
          {content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className={bodyH2Class}>
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className={bodyH3Class}>
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={index} className={bodyBlockquoteClass}>
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={index} className={bodyParagraphClass}>
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default Article;

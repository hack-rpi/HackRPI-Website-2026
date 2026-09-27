"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textAnimation } from "@/lib/text-animation";
import FaceCard from "./faceCard";
import teamMembers from "./team.json";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Entry Animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#pin",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      let animatedTitle = false;
      tl.call(() => {
        if (!animatedTitle) {
          textAnimation("team-title", 0.6);
          animatedTitle = true;
        }
      }, [], 0.1);

      let animatedNames = false;
      tl.call(() => {
        if (!animatedNames) {
          textAnimation("name-animate", 1.0, 0.1);
          animatedNames = true;
        }
      }, [], 0.0);

      // 2. Desktop GSAP Infinite Marquee Loop
      if (marqueeRef.current) {
        const loopTween = gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 35,
          repeat: -1,
        });

        return () => {
          loopTween.kill();
        };
      }
    });

    return () => ctx.revert();
  }, []);

  // Duplicated for seamless infinite scrolling loop
  const duplicatedTeam = [...teamMembers, ...teamMembers];

  return (
    <div
      className="relative min-h-0 md:min-h-screen bg-gBlack pt-12 pb-16 md:py-20 overflow-hidden"
      id="pin"
    >
      {/* Background Glow Highlights */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-purple-600/10 rounded-full blur-[120px]" />

      {/* Header Container */}
      <div className="px-6 md:px-16 max-w-4xl flex flex-col gap-4 mb-10 md:mb-14 relative z-10">
        <h2
          id="team-title"
          className="text-left text-white/70 text-2xl md:text-3xl font-bold tracking-wider text-white/90 uppercase font-mono"
        >
          Meet the HackRPI Organizing Team
          <div
            className="text-animation-layer inline-block w-auto"
            id="text-animate-layer"
          />
        </h2>
        <p className="text-sm md:text-lg text-white/70 leading-relaxed font-sans">
          Hello! We are a motivated team of RPI students who share a passion for
          exploring the bounds of Computer Science and a commitment to organizing
          a fantastic event. Our team of students from every grade and major work
          together to organize our annual fall hackathon as well as other
          smaller events throughout the year. We are always looking for more
          students to join our team and help us make our event a success. If you
          are interested in helping, please join our discord!
        </p>
      </div>

      {/* ========================================== */}
      {/* DESKTOP VIEW: Continuous Auto-Scroll Carousel */}
      {/* ========================================== */}
      <div className="hidden md:block w-full overflow-hidden relative z-10 py-6">
        <div ref={marqueeRef} className="flex w-max gap-8 will-change-transform">
          {duplicatedTeam.map((member, index) => (
            <div
				key={`${member.name}-desktop-${index}`}
				className="flex-shrink-0 relative w-[260px] h-[380px]"
			>
				<FaceCard
					zoom={member.zoom || 1}
					offsetX={member.xOffset || 0}
					offsetY={member.yOffset || 0}
					img={member.img}
					name={member.name}
					pos={member.pos}
					gradientClass={member.gradientClass}
				/>
			</div>
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE VIEW: 2-Column Grid Powered by FaceCard */}
      {/* ========================================== */}

      <div className="block md:hidden px-4 relative z-10">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 justify-items-center">
          {teamMembers.map((member) => (
            <div
				key={`${member.name}-mobile`}
				className="relative flex justify-center items-center w-full max-w-[200px] h-[300px]"
			>
				<FaceCard
					zoom={member.zoom || 1}
					offsetX={member.xOffset || 0}
					offsetY={member.yOffset || 0}
					img={member.img}
					name={member.name}
					pos={member.pos}
					gradientClass={member.gradientClass}
				/>
			</div>
          ))}
        </div>
      </div>
    </div>
  );
}


// Hello! We are a motivated team of RPI students who share a passion for exploring the bounds of Computer Science and a commitment to organizing a fantastic event. Our team of students from every grade and major work together to organize our annual fall hackathon as well as other smaller events throughout the year. We are always looking for more students to join our team and help us make our event a success. If you are interested in helping, please join our discord!
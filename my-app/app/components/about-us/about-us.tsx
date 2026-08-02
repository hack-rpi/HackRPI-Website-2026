'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import "./style.css";

// Register both plugins securely
gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverTl = useRef<gsap.core.Timeline | null>(null);
    const isFlapOpen = useRef<boolean>(false);

    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        // 2. This logic is guaranteed to run ONLY in the browser
        const checkOrientation = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };

        checkOrientation(); // Check instantly on load
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)",
        }, (context) => {
            const { isMobile } = context.conditions as { isMobile: boolean };
            const letterY = isMobile ? "-30%" : "-90%";
            const startOpen = isMobile? " -120%" : "-50%";

            hoverTl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: ".envelope-wrapper",
                    start: `top ${startOpen}`,
                    end: "bottom 25%",
                    scrub: false,
                    toggleActions: "play reverse play reverse",
                }
            });

            hoverTl.current.to(".envelope-flap", {
                rotateX: 180,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    isFlapOpen.current = true;
                    gsap.set(".envelope-flap", { zIndex: 1 });
                }
            }).addLabel("flapOpened")
            .call(() => {
                isFlapOpen.current = false;
                gsap.set(".envelope-flap", { zIndex: 4 });
            }, undefined, 0)
            .to(".letter-content", { 
                y: letterY, 
                height: "auto",
                duration: 0.4, 
                ease: "back.out(1.1)"
            }).addLabel("letterOut");
        });

    }, { scope: containerRef });

    // Hover Handlers (Only execute if ScrollTrigger has opened the flap)
    const handleMouseEnter = () => {
        if (isFlapOpen.current && hoverTl.current) {
            hoverTl.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (hoverTl.current) {
            hoverTl.current.tweenTo("flapOpened", {
                ease: "power2.inOut", // Optional: override the ease for the exit transition
                duration: 0.4
            });
        }
    };
    return (
       <div ref={containerRef} className="relative p-5 bg-linear-to-b from-black via-sky-950 to-black min-h-0 md:min-h-screen flex items-center justify-center mb-0 md:mb-[10vh] mt-[5vh] md:mt-[10vh] py-12 pb-64 md:py-0">
        
        {/* The 3D Scene Wrapper now has built-in top padding space */}
        <div 
            className="envelope-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="envelope-3d">
                
                {/* 1. Envelope Solid Back Wall */}
                <div className="envelope-back"></div>

                {/* 2. The Letter */}
                <div className={`letter-content p-8 md:p-12 shadow-md select-none flex flex-col justify-between
                    ${isPortrait ? "z-100" : ""}
                `}>
					<Link href="/news#article/2027" className="block group">
						<div>
							<h3 className="text-yellow-500 font-bold text-2xl md:text-3xl mb-4">About HackRPI</h3>
							<p className="text-gray-700 text-[9px] md:text-sm leading-snug line-clamp-none md:line-clamp-6">
								HackRPI 2026 is Rensselaer Polytechnic Institute's 13th annual intercollegiate hackathon hosted by students for students. Starting at noon on Saturday, November 7th, teams of 1-4 people have 24 hours to build and submit projects relating to our theme, In The Clouds. After submitting their projects, participants showcase their work in front of professors, industry professionals, and fellow students.
							</p>
                            <br></br>
							<p className="text-gray-700 text-[9px] md:text-sm leading-snug line-clamp-none md:line-clamp-6">
								<b>In The Clouds:</b> Soar to new heights at our 13th annual hackathon. This year’s theme challenges you to design projects that take flight—whether literally or figuratively. Elevate existing solutions to high peaks or even create something new with emerging technologies. After all, the sky’s the limit (or is it?!).
							</p>
                            <br></br>
							<p className="text-gray-700 text-[9px] md:text-sm leading-snug line-clamp-none md:line-clamp-6">
								Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs in New York's Tech Valley and beyond. All students from all schools are welcome to participate, regardless of their major or experience level. Whether you're a seasoned hacker or a first-time participant, HackRPI is the perfect opportunity to learn new skills, meet new people, and have fun!
							</p>
						</div>
						<span className="text-blue-500 text-xs md:text-sm font-semibold tracking-wide">
							Click to read full letter →
						</span>
					</Link>
                </div>

                {/* 3. Envelope Front Pocket */}
                <div className="envelope-front"></div>

                {/* 4. Envelope Top Flap */}
                <div className="envelope-flap"></div>

            </div>
        </div>
        </div>
    );
}
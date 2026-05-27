import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import "./style.css";

// Register both plugins securely
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutUs() {
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverTl = useRef<gsap.core.Timeline | null>(null);
    const isFlapOpen = useRef<boolean>(false);

    useGSAP(() => {
        // 1. Scroll Trigger for the Envelope Flap
        gsap.to(".envelope-flap", {
            rotateX: 180,
            duration: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: ".envelope-wrapper",
                start: "top 75%", // Opens when the envelope is well inside the viewport
                end: "bottom 25%",
                toggleActions: "play reverse play reverse", // Closes smoothly if scrolled away up or down
                onToggle: (self) => {
                    isFlapOpen.current = self.isActive;
                    // Safely tuck flap behind letter if open, or pull forward if closed
                    gsap.set(".envelope-flap", { zIndex: self.isActive ? 1 : 4 });
                    
                    // Force the letter back down if the envelope closes via scrolling out of view
                    if (!self.isActive && hoverTl.current) {
                        hoverTl.current.reverse();
                    }
                }
            }
        });

        // 2. Separate Hover Timeline for the Letter Pop-out
        hoverTl.current = gsap.timeline({ paused: true })
            .to(".letter-content", { 
                y: "-60%", 
                duration: 0.4, 
                ease: "back.out(1.1)" 
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
            hoverTl.current.reverse();
        }
    };
    return (
       <div ref={containerRef} className="relative p-5 bg-gradient-to-b from-sky-950 to-sky-900 min-h-screen flex items-center justify-center">
        
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
                <div className="letter-content p-8 md:p-12 shadow-md select-none flex flex-col justify-between">
					<Link href="/news#article/2027" className="block group">
						<div>
							<h3 className="text-yellow-500 font-bold text-2xl md:text-3xl mb-4">About HackRPI</h3>
							<p className="text-gray-700 text-xs md:text-sm leading-relaxed line-clamp-5 md:line-clamp-6">
								HackRPI 2026 is Rensselaer Polytechnic Institute's 13th annual intercollegiate hackathon hosted by students for students. Starting at noon on Saturday, November 7th, teams of 1-4 people have 24 hours to build and submit projects relating to our theme, In The Clouds. After submitting their projects, participants showcase their work in front of professors, industry professionals, and fellow students.
							</p>
							<p className="text-gray-700 text-xs md:text-sm leading-relaxed line-clamp-5 md:line-clamp-6">
								<b>In The Clouds:</b> Soar to new heights at our 13th annual hackathon. This year’s theme challenges you to design projects that take flight—whether literally or figuratively. Elevate existing solutions to high peaks or even create something new with emerging technologies. After all, the sky’s the limit (or is it?!).
							</p>
							<p className="text-gray-700 text-xs md:text-sm leading-relaxed line-clamp-5 md:line-clamp-6">
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
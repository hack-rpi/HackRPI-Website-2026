"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";
import TitleComponent from "@/app/components/title-components/title";
import AboutUs from "@/app/components/about-us";
import FAQPage from "@/app/components/faq/faq";
import Sponsors from "@/app/components/sponsors/sponsors";
import TeamComponent from "@/app/components/team/team";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  
  function textAnimation(){
    
  }


  useEffect(() => {
    // lenis scrolling
    const lenis = new Lenis({
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Get elements
    const sectionPin = document.querySelector("#pin");
    const teamTitle = document.querySelector("#team-title");
    const teamContent = document.querySelector("#team-content");

    // guards
    if (!sectionPin) return;
    if (!teamTitle) return;

    const scrollWidth = sectionPin.scrollWidth - document.documentElement.clientWidth;
    const introDistance = scrollWidth * 0.15;
    const speed = 2.5;


    // Timeline of events that starts to happen once the sectionPin comes into viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionPin,
        start: "top 90%",
        end: () => "+=" + ((scrollWidth * speed)),
        scrub: true,
      },
    });

    // 0 -> 1 is normal animation time, then 1 -> 1.2 is the pause at the end
    tl.fromTo(teamContent, { x: -introDistance }, { x: -scrollWidth, ease: "none", duration: (1 * speed), force3D: true }, 0);
    tl.to(teamTitle, { x: -scrollWidth, ease: "none", duration: (1 * speed),  force3D: true }, (0.7 * speed));
    // Pause on mentions screen for a bit before scrolling
    tl.to({}, { duration: (0.2 * speed) });

    
    // Once section pin is fully in view port pin the screen until the end of sideways scrolling.
    // The + 2000 is the amount of pixels / scrollable area to wait after the timeline is done.
    // So its the little waiting part on the honorable mentions
    ScrollTrigger.create({
      trigger: sectionPin,
      start: "top top",
      end: () => "+=" + ((scrollWidth) + 2000),
      pin: true,
      anticipatePin: 1,
    });


    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <NavBar />

      <div className="w-full overflow-hidden">
        <TitleComponent />
        <AboutUs />
        <FAQPage />
        <Sponsors />
        <TeamComponent />
        <div className="p-5 bg-white">
          <Footer />
        </div>
      </div>
    </>
  );
}

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
  useEffect(() => {
    // lenis scrolling
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 0.15,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    const sectionPin = document.querySelector("#pin");

	// guard
    if (!sectionPin) return;

	const scrollWidth = sectionPin.scrollWidth - document.documentElement.clientWidth;

	gsap.to(sectionPin, {
	  x: -scrollWidth,
	  ease: "none",
	  scrollTrigger: {
		trigger: sectionPin,
		start: "top top",
		end: () => "+=" + scrollWidth,
		scrub: 1,
		pin: true,
		anticipatePin: 1,
	  },
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

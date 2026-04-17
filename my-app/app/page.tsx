"use client";

import dynamic from "next/dynamic";
import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";
import TitleComponent from "@/app/components/title-components/title";

import Lenis from 'lenis';
import { ReactNode, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textAnimation } from "@/lib/text-animation";

const AboutUs = dynamic(() => import("@/app/components/about-us/about-us"));
const FAQPage = dynamic(() => import("@/app/components/faq/faq"));
const Sponsors = dynamic(() => import("@/app/components/sponsors/sponsors"));
const TeamComponent = dynamic(() => import("@/app/components/team/team"));
const Mentions = dynamic(() => import("@/app/components/team/mentions"));
const FinalMessage = dynamic(() => import("./components/final-message/final-message"));

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [Navbar, setNavbar] = useState<ReactNode>(<NavBar showOnScroll={true} variant={1}/>);

  useEffect(() => {
    // lenis scrolling
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const sectionPin = document.querySelector("#pin");
    const scrollWidth = sectionPin
      ? sectionPin.scrollWidth - document.documentElement.clientWidth
      : 0;


    // animate speech text
    ScrollTrigger.create({
      trigger: "#winner-animate",
      start: "top bottom",
      end: () => "+=" + scrollWidth,
      onEnter: () => {
        let HA2 = false;
        if (!HA2) {
          textAnimation("winner-animate", 1.5, 0.05);
          HA2 = true;
        }
      },
    });


    // animate effect in footer
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#footer-ellipse",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    footerTl.fromTo(
      document.querySelector("#footer-ellipse"),
      { clipPath: "ellipse(70% 0% at 50% -10%)" },
      { clipPath: "ellipse(70% 110% at 50% -10%)", duration: 0.5, ease: "none" }
    );

    
    // switch navbar styling
    ScrollTrigger.create({
      trigger: "#switch-light",
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        setNavbar(<NavBar showOnScroll={true}/>);
      },
      onEnterBack: () => {
        setNavbar(<NavBar showOnScroll={true}/>);
      },
      onLeave: () => {
        setNavbar(<NavBar showOnScroll={true} variant={1}/>);
      },
      onLeaveBack: () => {
        setNavbar(<NavBar showOnScroll={true} variant={1}/>);
      }
    });

    ScrollTrigger.create({
      trigger: "#switch-light-2",
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        setNavbar(<NavBar showOnScroll={true}/>);
      },
      onEnterBack: () => {
        setNavbar(<NavBar showOnScroll={true}/>);
      },
      onLeave: () => {
        setNavbar(<NavBar showOnScroll={true} variant={1}/>);
      },
      onLeaveBack: () => {
        setNavbar(<NavBar showOnScroll={true} variant={1}/>);
      }
    });


    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      {/* <NavBar showOnScroll={true} /> */}
      { Navbar }
      <div className="w-full overflow-hidden">
        <TitleComponent
          onReady={(variant) => {
            // Runs once the chosen title variant is mounted/rendered
            textAnimation("title-animate", 0.9, 0.0, 0);
            textAnimation("links-animate", 0.5, 0.0, 0);
          }}
        />
        <AboutUs />
        <div id="switch-light">
          <FAQPage />
          <Sponsors />
        </div>
        <TeamComponent />
        <Mentions />
        <footer id="switch-light-2" className="bg-white">
          <div className="w-full h-[10vh] bg-gBlack" style={{ clipPath: "ellipse(70% 0% at 50% 0%)", backgroundColor: "#111112" }} id="footer-ellipse"></div>
          <FinalMessage/>
          <Footer />
        </footer>
      </div>
    </>
  );
}

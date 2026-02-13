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
import Mentions from "@/app/components/team/mentions";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  function textAnimation(id: string, speed: number = 1.0, delay: number = 0.0) {
    // Pass an id for it to iterate though. It must have a child element like this:
    // <div className="text-animation-layer inline-block w-auto" id="text-animate-layer"/>

    // The parent should be a span like this:
    // <span className="text-xl font-mono relative w-fit mx-auto" id="text-animate" style={{ clipPath: "inset(0px 100% 0px 0px)" }}>

    const elements = document.querySelectorAll(`[id="${arguments[0]}"]`);
    const tl = gsap.timeline();
    console.log(elements)

    // For each element, add animations for it to the timeline (queue) and then play them with offsets to make a nice cascading effect
    elements.forEach((element) => {
      console.log(element.firstElementChild?.tagName)
      const offset = Array.from(elements).indexOf(element) * (0.2 + delay);
      if (element.firstElementChild?.tagName == "B") {
        tl.to(element.children[1], { width: "100%", duration: 0.6 * speed, ease: "power1.inOut" }, offset);
        tl.to(element, { clipPath: "inset(0px 0% 0px 0px)", duration: 0.6 * speed, ease: "power1.inOut" }, offset + 0.2 * speed);
        tl.to(element.children[1], { transform: "scale(0, 1)", duration: 0.7 * speed, ease: "power1.inOut" }, offset + 0.8 * speed);
        
      } else {
        tl.to(element.firstElementChild, { width: "100%", duration: 0.6 * speed, ease: "power1.inOut" }, offset);
        tl.to(element, { clipPath: "inset(0px 0% 0px 0px)", duration: 0.6 * speed, ease: "power1.inOut" }, offset + 0.2 * speed);
        tl.to(element.firstElementChild, { transform: "scale(0, 1)", duration: 0.7 * speed, ease: "power1.inOut" }, offset + 0.8 * speed);
      }
    });
  }

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


    // Get elements
    const sectionPin = document.querySelector("#pin");
    const teamTitle = document.querySelector("#team-title");
    const teamContent = document.querySelector("#team-content");
    const mentions = document.querySelector("#mentions-container");

    // guards
    if (!sectionPin) return;
    if (!teamTitle) return;

    const scrollWidth = sectionPin.scrollWidth - document.documentElement.clientWidth;
    const introDistance = scrollWidth * 0.15;
    const speed = 1.5;


    // Timeline of events that starts to happen once the sectionPin comes into viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionPin,
        start: "top 90%",
        end: () => "+=" + ((scrollWidth * speed)),
        scrub: true,
        anticipatePin: 0,
      },
    });

    let HA1 = false;
    tl.call(() => { if (!HA1) { textAnimation("team-title", 0.6); HA1 = true; } }, [], 0.1);

    let HA2 = false;
    tl.call(() => { if (!HA2) { textAnimation("name-animate", 1.0, 0.4); HA2 = true; } }, [], 0.0);

    // 0 -> 1 is normal animation time, then 1 -> 1.2 is the pause at the end
    tl.fromTo(teamContent, { x: -introDistance }, { x: -scrollWidth, ease: "none", duration: (1 * speed), force3D: true }, 0);
    tl.to(teamTitle, { x: -scrollWidth / 2, ease: "none", duration: (0.5 * speed), force3D: true }, (0.7 * speed));

    // Pause on mentions screen for a bit before scrolling
    tl.to({}, { duration: (0.1 * speed) });


    // Once section pin is fully in view port pin the screen until the end of sideways scrolling.
    ScrollTrigger.create({
      trigger: sectionPin,
      start: "top top",
      end: () => "+=" + ((scrollWidth)),
      pin: true,
      anticipatePin: 0, // make sure this is off or else it will anticipate it and jump the gun and make it not look smooth
    });

    // animate mentions text 
    ScrollTrigger.create({
      trigger: mentions,
      start: "top bottom",
      end: () => "+=" + ((scrollWidth)),
      onEnter: () => {
        let HA2 = false;
        if (!HA2) {
          textAnimation("mentions-animate", 0.3);
          HA2 = true;
        }
      },
    });

    const trophytl = gsap.timeline({
      scrollTrigger: {
        trigger: "#trophy-canvas",
        start: "top top",
        end: "bottom center",
        scrub: true,
      },
    });

    console.log(window.innerWidth)
    trophytl.fromTo(document.querySelector("#trophy-canvas"), { x: "0vw", y: 0, transform: "scale(1)" }, { x: 500, y: 1000, transform: "scale(0.2)", duration: 1.0, ease: "none" });


    // animate speach text
    ScrollTrigger.create({
      trigger: "#winner-animate",
      start: "top bottom",
      end: () => "+=" + ((scrollWidth)),
      onEnter: () => {
        let HA2 = false;
        if (!HA2) {
          textAnimation("winner-animate", 0.5);
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

    footerTl.fromTo(document.querySelector("#footer-ellipse"), { clipPath: "ellipse(70% 0% at 50% -10%)" }, { clipPath: "ellipse(70% 110% at 50% -10%)", duration: 0.5, ease: "none" });


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
        <Mentions />
        <div className="bg-white">
          <Footer />
        </div>
      </div>
    </>
  );
}

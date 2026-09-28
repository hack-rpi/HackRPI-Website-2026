"use client";

import "@/app/globals.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import NavBar from "../components/nav-bar/nav-bar";
import Footer from "../components/footer/footer";
import Lenis from "lenis";
import Link from "next/link";

const PDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
  loading: () => <p className="text-center py-10 text-white">Loading PDF viewer...</p>,
});

const listItems: Record<string, Record<string, string | boolean>> = {
  "Logo on T-Shirt": {
    bronze: "small",
    silver: "small",
    gold: "medium",
    obsidian: "large",
    silverpromoter: "Medium sized logo",
    goldpromoter: "Large size logo",
  },
  "Logo on Website": { bronze: true, silver: true, gold: true, obsidian: true },
  "Distribute Company Swag": { bronze: true, silver: true, gold: true, obsidian: true },
  "Company Flier in Event Folder": { bronze: true, silver: true, gold: true, obsidian: true },
  "Social Media Advertising": { bronze: false, silver: true, gold: true, obsidian: true },
  "Company Judges": { bronze: false, silver: true, gold: true, obsidian: true },
  "Resume Book": {
    bronze: false,
    silver: "after event",
    gold: "before event",
    obsidian: "before event",
    silverpromoter: "Or distribute before event",
  },
  "Host Fireside Chat": { bronze: false, silver: true, gold: true, obsidian: true },
  "Host a Workshop": { bronze: false, silver: false, gold: true, obsidian: true },
  "Promotional Mail to Hackers": { bronze: false, silver: false, gold: false, obsidian: true },
  "Priority Booth Placement": { bronze: false, silver: false, gold: false, obsidian: true },
  "Opening Ceremony Demo": { bronze: false, silver: false, gold: false, obsidian: true },
  "Company Table": { bronze: true, silver: true, gold: true, obsidian: true },
};

type Tier = "bronze" | "silver" | "gold" | "obsidian";

interface ThemeConfig {
  accentText: string;
  cardBorder: string;
  cardGlow: string;
  panelBg: string;
  panelBorder: string;
  rowHover: string;
  bgGradient: string;
}

const tierThemes: Record<Tier, ThemeConfig> = {
  bronze: {
    accentText: "text-red-400",
    cardBorder: "border-red-500/50",
    cardGlow: "shadow-red-500/25 ring-red-500",
    panelBg: "bg-red-950/50",
    panelBorder: "border-red-500/40",
    rowHover: "hover:bg-red-900/40",
    bgGradient: "from-red-950/30 via-slate-950 to-slate-950",
  },
  silver: {
    accentText: "text-slate-200",
    cardBorder: "border-slate-300/50",
    cardGlow: "shadow-slate-200/25 ring-slate-300",
    panelBg: "bg-slate-900/60",
    panelBorder: "border-slate-400/40",
    rowHover: "hover:bg-slate-800/50",
    bgGradient: "from-slate-900/50 via-slate-950 to-slate-950",
  },
  gold: {
    accentText: "text-amber-300",
    cardBorder: "border-amber-300/60",
    cardGlow: "shadow-amber-300/30 ring-amber-300",
    panelBg: "bg-amber-950/50",
    panelBorder: "border-amber-400/40",
    rowHover: "hover:bg-amber-900/40",
    bgGradient: "from-amber-950/25 via-slate-950 to-slate-950",
  },
  obsidian: {
    accentText: "text-blue-400",
    cardBorder: "border-blue-400/60",
    cardGlow: "shadow-blue-500/30 ring-blue-400",
    panelBg: "bg-blue-950/50",
    panelBorder: "border-blue-500/40",
    rowHover: "hover:bg-blue-900/40",
    bgGradient: "from-blue-950/30 via-slate-950 to-slate-950",
  },
};

const tierCards: Array<{ name: Tier; label: string; amount: string; image: string }> = [
  { name: "bronze", label: "Bronze", amount: "$750", image: "/sponsors/res/red balloon.png" },
  { name: "silver", label: "Silver", amount: "$1,500", image: "/sponsors/res/white balloon.png" },
  { name: "gold", label: "Gold", amount: "$2,500", image: "/sponsors/res/yellow balloon.png" },
  { name: "obsidian", label: "Obsidian", amount: "$5,000", image: "/sponsors/res/blue balloon.png" },
];

const nextTierMap: Record<Tier, Tier | null> = {
  bronze: "silver",
  silver: "gold",
  gold: "obsidian",
  obsidian: null,
};

export default function SponsorUsPage() {
  const [selectedTier, setSelectedTier] = useState<Tier>("bronze");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const lenis = new Lenis({ smoothWheel: true, duration: 1.2 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectTier = (tier: Tier) => {
    setSelectedTier(tier);
    document.getElementById("container2")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollDocs = (itemName: string) => {
    const container = document.getElementById("docText");
    if (!container) return;

    const headings = container.querySelectorAll("h3");
    let targetHeader: HTMLElement | null = null;

    headings.forEach((h3) => {
      if (h3.textContent?.trim().toLowerCase() === itemName.trim().toLowerCase()) {
        targetHeader = h3;
      }
    });

    if (targetHeader) {
      (targetHeader as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });

      const parentDiv = (targetHeader as HTMLElement).parentElement;
      if (parentDiv) {
        parentDiv.style.animation = "none";
        void parentDiv.offsetWidth;
        parentDiv.style.animation = "pulseHighlight 2.5s ease 0s 1 normal";
      }
    }
  };

  const currentTheme = tierThemes[selectedTier];
  const nextTier = nextTierMap[selectedTier];

  return (
    <>
      <NavBar showOnScroll={false} variant={1} />
      <main className={`relative w-full bg-gradient-to-b ${currentTheme.bgGradient} pt-[8vh] min-h-screen text-slate-100 transition-colors duration-700 overflow-hidden`}>
        
        {/* Background Clouds Spanning Entire Page */}
        <div className="absolute top-[5vh] left-[-50px] md:left-[2%] w-72 md:w-[32rem] h-44 opacity-25 pointer-events-none animate-float-slow z-0">
          <Image src="/sponsors/res/cloud.png" alt="Cloud Background" fill className="object-contain" />
        </div>
        <div className="absolute top-[18vh] right-[-40px] md:right-[3%] w-64 md:w-[28rem] h-40 opacity-20 pointer-events-none animate-float-reverse z-0">
          <Image src="/sponsors/res/cloud.png" alt="Cloud Background" fill className="object-contain" />
        </div>
        <div className="absolute top-[38vh] left-[5%] w-80 md:w-[34rem] h-52 opacity-25 pointer-events-none animate-float-drift z-0">
          <Image src="/sponsors/res/cloud.png" alt="Cloud Background" fill className="object-contain" />
        </div>
        <div className="absolute top-[55vh] right-[-20px] md:right-[5%] w-72 md:w-[30rem] h-48 opacity-20 pointer-events-none animate-float-slow z-0">
          <Image src="/sponsors/res/cloud.png" alt="Cloud Background" fill className="object-contain" />
        </div>
        <div className="absolute top-[72vh] left-[-30px] md:left-[1%] w-80 md:w-[36rem] h-56 opacity-20 pointer-events-none animate-float-reverse z-0">
          <Image src="/sponsors/res/cloud.png" alt="Cloud Background" fill className="object-contain" />
        </div>
        <div className="absolute top-[88vh] right-[2%] w-72 md:w-[32rem] h-48 opacity-25 pointer-events-none animate-float-drift z-0">
          <Image src="/sponsors/res/cloud.png" alt="Cloud Background" fill className="object-contain" />
        </div>
        <div className="absolute top-[110vh] left-[4%] w-80 md:w-[35rem] h-52 opacity-20 pointer-events-none animate-float-slow z-0">
          <Image src="/sponsors/res/cloud.png" alt="Cloud Background" fill className="object-contain" />
        </div>
        <div className="absolute top-[135vh] right-[-30px] md:right-[4%] w-80 md:w-[36rem] h-56 opacity-25 pointer-events-none animate-float-reverse z-0">
          <Image src="/sponsors/res/cloud.png" alt="Cloud Background" fill className="object-contain" />
        </div>

        {/* Instruction Banner */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 my-6">
          <div className={`backdrop-blur-xl rounded-2xl p-4 text-center text-lg font-medium border ${currentTheme.panelBg} ${currentTheme.panelBorder} transition-all duration-500 shadow-xl`}>
            Select a tier balloon below to explore sponsorship benefits!
          </div>
        </div>

        {/* Tier Cards */}
        <div id="container1" className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {tierCards.map((card) => {
            const isSelected = selectedTier === card.name;
            const cardTheme = tierThemes[card.name];

            return (
              <div
                key={card.name}
                onClick={() => handleSelectTier(card.name)}
                className={`relative cursor-pointer rounded-2xl p-6 flex flex-col items-center justify-between transition-all duration-300 transform active:scale-95 hover:-translate-y-2 backdrop-blur-xl border ${cardTheme.panelBg} ${
                  isSelected
                    ? `ring-2 ${cardTheme.cardGlow} scale-105 shadow-2xl${cardTheme.cardBorder}`
                    : "border-slate-700/50 hover:border-slate-500/50"
                }`}
              >
                <div className="relative w-32 h-36 mb-4 animate-float">
                  <Image
                    src={card.image}
                    alt={`${card.label} Balloon`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
                    priority
                  />
                </div>
                <div className="text-center">
                  <h3 className={`text-2xl font-bold tracking-wide ${isSelected ? cardTheme.accentText : "text-white"}`}>
                    {card.label}
                  </h3>
                  <p className="text-xl font-semibold opacity-90 mt-1">{card.amount}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsive Outer Container for Window Image */}
        <div id="container2" className="relative z-10 max-w-5xl mx-auto px-4 my-10">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-3 sm:p-6 md:p-10">
            {/* Background Image scaling within screen boundaries */}
            <Image
              src="/sponsors/res/window.png"
              alt="Window Frame Background"
              fill
              className="object-contain object-center z-0"
              priority
            />

            {/* Inset Benefits Comparison Box fit inside window borders */}
            <div className={`relative z-10 w-[88%] sm:w-[84%] my-6 sm:my-8 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-md border ${currentTheme.panelBg} ${currentTheme.panelBorder} transition-all duration-500 shadow-xl`}>
              <div className="text-center mb-4 sm:mb-6">
                <h2 className={`text-2xl sm:text-3xl font-extrabold capitalize ${currentTheme.accentText} transition-colors duration-500`}>
                  {selectedTier} Tier Benefits
                </h2>
              </div>

              {isMobile || !nextTier ? (
                <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                  {Object.entries(listItems).map(([name, tiers]) => {
                    const val = tiers[selectedTier];
                    const isAvailable = Boolean(val);
                    const displayValue = typeof val === "string" ? `: ${val}` : "";

                    return (
                      <div
                        key={name}
                        onClick={() => scrollDocs(name)}
                        className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01] ${currentTheme.rowHover} ${
                          isAvailable ? "bg-slate-900/70 text-slate-100 font-medium border border-slate-700/40" : "opacity-40 text-slate-400 bg-slate-950/40"
                        }`}
                      >
                        {name}
                        {displayValue}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className={`grid grid-cols-3 items-center text-center font-bold text-lg sm:text-xl border-b pb-3 mb-3 ${currentTheme.panelBorder}`}>
                    <span className={`capitalize ${currentTheme.accentText}`}>{selectedTier}</span>
                    <span className="text-slate-400">&rarr;</span>
                    <span className={`capitalize ${tierThemes[nextTier].accentText}`}>{nextTier}</span>
                  </div>

                  <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                    {Object.entries(listItems).map(([name, tiers]) => {
                      const currentVal = tiers[selectedTier];
                      const nextVal = tiers[nextTier];
                      const isCurrentAvailable = Boolean(currentVal);

                      const currentText = typeof currentVal === "string" ? `${name}: ${currentVal}` : name;
                      const promoterText = (tiers[`${selectedTier}promoter`] as string) || (typeof nextVal === "string" ? `${name}: ${nextVal}` : name);

                      return (
                        <div
                          key={name}
                          onClick={() => scrollDocs(name)}
                          className={`grid grid-cols-3 items-center py-2 px-3 sm:px-4 rounded-xl cursor-pointer ${currentTheme.rowHover} border border-transparent transition-all duration-200 hover:scale-[1.01] text-sm sm:text-base`}
                        >
                          <span className={`text-center ${isCurrentAvailable ? "text-slate-100 font-medium" : "opacity-40"}`}>
                            {currentText}
                          </span>
                          <span className="text-center text-slate-400">&rarr;</span>
                          <span className={`text-center ${nextVal ? "text-slate-100 font-medium" : "opacity-40"}`}>
                            {nextVal ? promoterText : "—"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom Tailored Note */}
        <div id="container3" className="relative z-10 max-w-6xl mx-auto px-4 my-8">
          <div className={`backdrop-blur-xl rounded-2xl p-6 text-center space-y-2 border ${currentTheme.panelBg} ${currentTheme.panelBorder} transition-all duration-500 shadow-xl`}>
            <h4 className="text-xl text-slate-200">
              We understand that standard sponsorship tiers may not suit all organizations.
            </h4>
            <h4 className="text-xl text-slate-200">
              Please contact{" "}
              <Link href="mailto:hackrpi@rpi.edu" className={`underline ${currentTheme.accentText} hover:opacity-80 transition-opacity`}>
                hackrpi@rpi.edu
              </Link>{" "}
              if you want to develop a tailored sponsorship package.
            </h4>
          </div>
        </div>

        {/* Documentation Section */}
        <div id="container4" className="relative z-10 max-w-6xl mx-auto px-4 my-10">
          <div className={`backdrop-blur-xl rounded-2xl p-8 border ${currentTheme.panelBg} ${currentTheme.panelBorder} transition-all duration-500 shadow-2xl`}>
            <div id="docText" className="space-y-6">
              {[
                { title: "Logo on T-Shirt", text: ["Your company logo will be printed on the free shirts we give out.", "Higher tiers increase the size of the logo."] },
                { title: "Logo on Website", text: ["Your company logo will be included on our website."] },
                { title: "Distribute Company Swag", text: ["Bring merchandise to your booth.", "Alternatively we can have some at the check in desk to hand out."] },
                { title: "Company Flier in Event Folder", text: ["We'll include your flier in the event folder handed out to all participants at check in."] },
                { title: "Social Media Advertising", text: ["Featured on 2 sponsor posts for our social media sites (Instagram, LinkedIn)."] },
                { title: "Company Judges", text: ["Opportunity to send a company representative to serve as a judge for the main hackathon event (In-person)."] },
                { title: "Resume Book", text: ["Your company will be included on the list we send out participant resumes to (after the event in mid-November).", "In Gold tier or above, your company will be included on the list we send out participant resumes to (before the event in early September)."] },
                { title: "Host Fireside Chat", text: ["Company informational session during the main event hackathon.", "Participants usually attend to take breaks from their work, perfect time to learn about your company and any job openings."] },
                { title: "Host a Workshop", text: ["Opportunity to host a workshop relating to one or more of your company's products for any interested students from Rensselaer.", "This can occur before as a separate HackRPI event or during the main hackathon."] },
                { title: "Promotional Mail to Hackers", text: ["Your company will be featured on the mail we send out to all hackers signed up before the main event."] },
                { title: "Priority Booth Placement", text: ["Your booth/table will be closer to the entrance and area where the majority of participants are."] },
                { title: "Opening Ceremony Demo", text: ["During our opening ceremony, we'll have a short slot for you to feature your company/product as a sponsor of HackRPI."] },
                { title: "Company Table", text: ["We provide a table where your company can set up a presence, but will accommodate if you want to bring a custom booth/multiple table setup."] },
              ].map((doc) => (
                <div key={doc.title} className="p-4 rounded-xl transition-colors">
                  <h3 className={`text-2xl font-bold ${currentTheme.accentText} mb-1 transition-colors duration-500`}>{doc.title}</h3>
                  {doc.text.map((p, idx) => (
                    <p key={idx} className="text-gray-300 ml-4">{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive PDF Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 my-10 w-full overflow-hidden">
          <div className="w-full max-w-full overflow-x-auto rounded-2xl flex justify-center">
            {/* <PDFViewer file="/sponsors/sponsorshipBooklet2026.pdf" /> */}
            <iframe
              className="mx-auto w-[90%] h-[120vh] py-10"
              src="https://drive.google.com/file/d/1BDj3qfGiU0tNfEeEDE9UCeRUIvoqoD-k/preview"
              title="HackRPI Sponsorship Deck"
              allow="autoplay"
            ></iframe>
          </div>
        </div>

        <div className="h-[20vh]"></div>
      </main>

      <footer className="bg-gray-800">
        <div className="w-full h-[10vh] bg-slate-950" style={{ clipPath: "ellipse(70% 0% at 50% 0%)" }} id="footer-ellipse"></div>
        <Footer />
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(15px, -18px); }
        }
        .animate-float-slow {
          animation: floatSlow 9s ease-in-out infinite;
        }

        @keyframes floatReverse {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-15px, -20px); }
        }
        .animate-float-reverse {
          animation: floatReverse 11s ease-in-out infinite;
        }

        @keyframes floatDrift {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(20px, -10px); }
        }
        .animate-float-drift {
          animation: floatDrift 13s ease-in-out infinite;
        }

        @keyframes pulseHighlight {
          0% { background-color: rgba(255, 255, 255, 0.25); }
          50% { background-color: rgba(255, 255, 255, 0.1); }
          100% { background-color: transparent; }
        }
      `}</style>
    </>
  );
}
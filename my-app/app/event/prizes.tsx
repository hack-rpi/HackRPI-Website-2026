"use client";

import React from "react";

interface TopPrize {
  title: string;
  reward: string;
  badge: string;
  icon: string;
  borderClass: string;
}

interface StandardPrize {
  title: string;
  reward: string;
  description?: string;
  icon: string;
}

const topPrizes: TopPrize[] = [
  {
    title: "#1 Best Hack",
    reward: "$1,000",
    badge: "1st Place Grand Winner",
    icon: "🏆",
    borderClass: "border-yellow-400/80 shadow-yellow-500/10",
  },
  {
    title: "#2 Best Hack",
    reward: "$750",
    badge: "2nd Place Grand Winner",
    icon: "🥈",
    borderClass: "border-slate-300/80 shadow-slate-400/10",
  },
];

const ethicalAIPrizes = [
  { rank: "#1", reward: "$300" },
  { rank: "#2", reward: "$200" },
  { rank: "#3", reward: "$100" },
];

const dataBrick = [
  { rank: "#1", reward: "Databricks Swag Kit + $500 in Databricks Credits per person" },
  { rank: "#2", reward: "Databricks Swag Kit + $250 in Databricks Credits per person" },
  { rank: "#3", reward: "Databricks Swag Kit + $100 in Databricks Credits per person" },
];

const categoryPrizes: StandardPrize[] = [
  {
    title: "Best In The Clouds Hack",
    reward: "Sony Headphones",
    description: "Fly sky high during this hackathon and win Sony Headphones!",
    icon: "☁️",
  },
  {
    title: "Best Machine Learning / Data Science Hack",
    reward: "$400",
    description: "Turn data into discovery with models and visualizations.",
    icon: "🤖",
  },
  {
    title: "Best Sustainability Hack",
    reward: "$400",
    description: "Build eco-friendly solutions for greener fields ahead.",
    icon: "🌱",
  },
  {
    title: "Best Healthcare Hack",
    reward: "$400",
    description: "Elevate community health & public well-being.",
    icon: "🩺",
  },
  {
    title: "Best Hardware Hack",
    reward: "Mini 4K Drone",
    description: "Bring software into physical reality.",
    icon: "🛸",
  },
  {
    title: "Best Artificial Intelligence Hack",
    reward: "Air Fryer",
    description: "Integrate custom models or AI APIs into your project.",
    icon: "🧠",
  },
  {
    title: "Best First Time Hack",
    reward: "Lego Technic Plane",
    description: ">50% first-time hackers? Make your debut!",
    icon: "🛩️",
  },
  {
    title: "Best Game Hack",
    reward: "Govee LED Bars",
    description: "Develop a fun, challenging, and innovative game.",
    icon: "🎮",
  },
  {
    title: "Best Mobile App Hack",
    reward: "Mini Projector",
    description: "Build an intuitive app for mobile or emulators.",
    icon: "📱",
  },
  {
    title: "Best use of Fish Audio",
    reward: "$200 API credits",
    description: "Build an innovative voice AI experience using Fish Audio. We’re excited to see creative applications across conversational AI, games, education, accessibility, entertainment, productivity, agents, and more. Projects should meaningfully integrate Fish Audio’s API and demonstrate an interesting or useful application of voice AI",
    icon: "🎧",
  },{
    title: "Best Cybersecurity Hack",
    reward: "course subscription",
    description: "Build a secure and innovative security or pentesting solution",
    icon: "💻",
  },
];

export default function Prizes() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#CECAB8]">
          PRIZE TRACKS
        </h2>
        <p className="text-gray-300 text-sm md:text-base mt-1">
          Compete across specialized tracks and win cash, gear, and gadgets!
        </p>
      </div>

      {/* Podium Tier (Top Overall) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {topPrizes.map((prize, idx) => (
          <div
            key={idx}
            className={`criteriaBG border-2 ${prize.borderClass} rounded-xl p-5 flex items-center justify-between shadow-lg transition-transform duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-5xl">{prize.icon}</span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-hackrpi-yellow bg-white/10 px-2 py-0.5 rounded-full">
                  {prize.badge}
                </span>
                <h3 className="text-xl md:text-2xl font-bold mt-0.5">{prize.title}</h3>
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-black text-hackrpi-yellow">
              {prize.reward}
            </div>
          </div>
        ))}
      </div>

      {/* Ethical AI Track Highlight Banner */}
      <div className="criteriaBG border-2 border-hackrpi-pink/60 rounded-xl p-4 md:p-5 mb-6 bg-gradient-to-r from-hackrpi-pink/10 via-transparent to-hackrpi-light-purple/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚖️</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg md:text-xl font-bold text-white">
                  Best Ethical AI Agent Hack
                </h3>
                <span className="text-[10px] bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Confirmed
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Design responsible, ethical, and trustworthy AI agents.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {ethicalAIPrizes.map((item, idx) => (
              <div
                key={idx}
                className="bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg text-center flex-1 md:flex-none min-w-[75px]"
              >
                <div className="text-[10px] text-gray-400 font-medium">{item.rank} Place</div>
                <div className="text-base font-bold text-hackrpi-orange">{item.reward}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* DataBricks Track Highlight Banner */}
      <div className="criteriaBG border-2 border-hackrpi-pink/60 rounded-xl p-4 md:p-5 mb-6 bg-gradient-to-r from-hackrpi-pink/10 via-transparent to-hackrpi-light-purple/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧱</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg md:text-xl font-bold text-white max-[1000px]:w-15">
                  Best Use of Databricks
                </h3>
                <span className="text-[10px] bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Confirmed
                </span>
              </div>
              <p className="max-[1000px]:w-45 text-xs text-gray-300 w-200">
                Most tools give you one piece of the puzzle — a model API, a database, a dashboard builder. Meanwhile, Databricks gives you the entire data and AI platform in one place. Ingest and transform raw data with Lakeflow pipelines, query it with SQL or Python notebooks, build and deploy AI agents using foundation models, spin up a managed Postgres database with Lakebase, create interactive dashboards using plain English with Genie, build your custom apps on Databricks Apps, and let Genie Code write and debug your code along the way. The best hacks this weekend won't just call an API — they'll move data end-to-end, from messy source to polished product. Sign up on Databricks Free Edition (yes, it's forever-free), and show us what a complete data and AI platform can do in your hands!
              </p>
            </div>
          </div>

          <div className="gap-2">
            {dataBrick.map((item, idx) => (
              <div
                key={idx}
                className="bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg text-center flex-1 md:flex-none min-w-[75px] my-2"
              >
                <div className="text-[10px] text-gray-400 font-medium">{item.rank} Place</div>
                <div className="text-base font-bold text-hackrpi-orange">{item.reward}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* DataBricks Track Highlight Banner */}
      <div className="criteriaBG border-2 border-hackrpi-pink/60 rounded-xl p-4 md:p-5 mb-6 bg-gradient-to-r from-hackrpi-pink/10 via-transparent to-hackrpi-light-purple/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧱</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg md:text-xl font-bold text-white max-[1000px]:w-15">
                  Best Use of Databricks
                </h3>
                <span className="text-[10px] bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Confirmed
                </span>
              </div>
              <p className="max-[1000px]:w-45 text-xs text-gray-300 w-200">
                Most tools give you one piece of the puzzle — a model API, a database, a dashboard builder. Meanwhile, Databricks gives you the entire data and AI platform in one place. Ingest and transform raw data with Lakeflow pipelines, query it with SQL or Python notebooks, build and deploy AI agents using foundation models, spin up a managed Postgres database with Lakebase, create interactive dashboards using plain English with Genie, build your custom apps on Databricks Apps, and let Genie Code write and debug your code along the way. The best hacks this weekend won't just call an API — they'll move data end-to-end, from messy source to polished product. Sign up on Databricks Free Edition (yes, it's forever-free), and show us what a complete data and AI platform can do in your hands!
              </p>
            </div>
          </div>

          <div className="gap-2">
            {dataBrick.map((item, idx) => (
              <div
                key={idx}
                className="bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg text-center flex-1 md:flex-none min-w-[75px] my-2"
              >
                <div className="text-[10px] text-gray-400 font-medium">{item.rank} Place</div>
                <div className="text-base font-bold text-hackrpi-orange">{item.reward}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compact Grid for Category Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {categoryPrizes.map((prize, idx) => (
          <div
            key={idx}
            className="group relative criteriaBG border rounded-xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:border-hackrpi-pink hover:bg-white/5"
            style={{borderColor: "#FEF9C2"}}>
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="font-bold text-sm transition-colors leading-snug"
                style={{color: "#CECAB8"}}>
                  {prize.title}
                </h4>
                <span className="text-2xl text-white shrink-0 group-hover:scale-110 transition-transform">
                  {prize.icon}
                </span>
              </div>
              <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">
                {prize.description}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 uppercase tracking-wide">Prize</span>
              <span className="text-xs font-bold text-hackrpi-orange bg-hackrpi-orange/10 border border-hackrpi-orange/20 px-2 py-0.5 rounded">
                {prize.reward}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
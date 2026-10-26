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

interface mlhPrize {
  title: string;
  reward: string;
  description?: string;
  icon: string;
  link: string;
}
const FONT_COLOR = "#d9d9d9"
const BACKGROUND = "#00152b"

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
const mlhTracks: mlhPrize[] = [
  {
    "title": "Best Use of ElevenLabs",
    "reward": "Wireless Earbuds",
    "description": "Deploy natural, human-sounding audio with ElevenLabs. Create realistic, dynamic, and emotionally expressive voices for any project, from interactive AI companions to narrated stories and voice-enabled apps. ElevenLabs will empower you to build rich, immersive experiences without the need for actors or complex audio production, using simply the power of AI.\n\nIntegrate fully autonomous audio experiences into your hack with ElevenLabs and give your project a voice, along with giving your team the chance to win some wireless earbuds!",
    "icon": "elevenlabs",
    "link": "https://mlh.link/elevenlabs"
  },
  {
    "title": "Best Use of SpaceXSI",
    "reward": "Mechanical Keyboard",
    "description": "This weekend, assemble your ultimate hackathon A-Team using Cursor and Grok Bot to streamline your development, accelerate your builds, and lock in your shot at the SpaceXSI raffle.  Every member on the winning team walks away with a custom-branded Cursor mechanical keyboard.",
    "icon": "spaceXSI",
    "link": "https://mlh.link/spacexsi?utm_source=mlh&utm_medium=referral&utm_content=Build+Your+Hackathon+A-Team+with+SpaceXSI"
  },
  {
    "title": "Best Use of Gemini API",
    "reward": "MLH Swag Kits",
    "description": "It’s time to push the boundaries of what’s possible with AI using Google Gemini. Check out the Gemini API to build AI-powered apps that make your friends say WHOA. So, what can Gemini do for your hackathon project?\n\n- Understand language like a human and build a chatbot that gives personalized advice\n- Analyze info like a supercomputer and create an app that summarizes complex research papers\n- Generate creative content like code, scripts, music, and more\n\nThink of the possibilities… what will you build with the Google Gemini API this weekend?",
    "icon": "googleCloud",
    "link": "https://mlh.link/gemini"
  },
  {
    "title": "Best Use of Solana",
    "reward": "Assorted Prizes",
    "description": "The world of development is evolving fast and Solana is leading the charge with a network built to handle all of your infrastructure needs. Forget high fees and slow confirmations, it’s time to build applications that are fast, efficient, and scalable.\n\nHarness Solana’s core advantages like blazing fast execution and near-zero transaction costs to make your hackathon ideas become real world projects. With Solana, the possibilities are endless.\n\n- Create a game, social app, or consumer product that relies on instant, high-frequency transactions.\n- Design a sophisticated trading, lending, or decentralized exchange (DEX).\n- Build a prototype for supply chain, identity, or payments that can handle massive, real-world volume.\n\nShow us how you can innovate with Solana for a chance to win some cool prizes for you and each member of your team!",
    "icon": "solana",
    "link": "https://mlh.link/solana"
  },
  {
    "title": "Best Use of Tiger Data",
    "reward": "Stream Deck Mini",
    "description": "Building high-performance apps under hackathon deadlines shouldn't mean spending half your weekend configuring complex databases or learning obscure query languages. Tiger Data extends PostgreSQL to give student developers an ultra-fast foundation for real-time data, time-series metrics, and complex analytics.\n\nWhy build with Tiger Data this weekend?\n\n- Standard SQL Power: Query massive datasets instantly using the SQL you already know, with no complex NoSQL aggregation pipelines required.\n- Unified Data Stack: Store relational user profiles and high-frequency metric streams side-by-side in a single database.\n- Instant Dashboards: Serve lag-free, real-time frontend charts using pre-computed Continuous Aggregates.\n- 90%+ Data Compression: Store millions of events on free-tier cloud instances without running out of disk space.\n\nWhether you're building real-time IoT monitoring, AI-driven analytics dashboards, or financial prediction engines, show us how Tiger Data powers your project. The team that demonstrates the most innovative, impactful, and performance-driven use of Tiger Data will take home some great prizes!",
    "icon": "tigerdata",
    "link": "https://mlh.link/tigerdata"
  },
  {
    "title": "Best Use of Vultr",
    "reward": "M5Stack Official Tab5",
    "description": "Vultr empowers hackers to bring their high-performance projects to life instantly; providing everything from the speed of one-click deployment and scalable cloud compute, to specialized Vultr Cloud GPUs that can power AI-driven applications. We want you to push the limits of what can be built when infrastructure is no longer the bottleneck!\n\nSign up for a Vultr account today and claim your free cloud credits! Take your next hack to the cloud with Vultr for a chance to win some awesome prizes for you and your team!",
    "icon": "vultr",
    "link": "https://mlh.link/vultr"
  },
  {
    "title": "Best Use of Snowflake API",
    "reward": "Arduino Student Kit",
    "description": "Play with industry-leading LLMs on a single account using the Snowflake APIs. Adding AI capabilities into your application can be as simple as a single CURL command to Snowflake’s REST API.\n\nBuild customized applications, RAG powered chat bots, or embed AI-powered features into your app in half the time with half the hassle. Get started for free with a special, student 120-day Snowflake trial and check out this repository for an example of the Snowflake REST API in action.",
    "icon": "snowflake",
    "link": "https://mlh.link/snowflake"
  },
  {
    "title": "Best Use of MongoDB Atlas",
    "reward": "M5Stack IoT Kit",
    "description": "MongoDB Atlas takes the leading modern database and makes it accessible in the cloud! Get started with a $50 credit for students or sign up for the Atlas free forever tier (no credit card required).\n\nAlong with a suite of services and functionalities, you’ll have everything you need to manage all of your data, and you can get a headstart with free resources from MongoDB University! Build a hack using MongoDB Atlas for a chance to win a M5Stack IoT Kit for you and each member of your group.",
    "icon": "mongodb",
    "link": "https://mlh.link/mongodb"
  },
  {
    "title": "Best Domain Name from GoDaddy Registry",
    "reward": "Digital Gift Card",
    "description": "GoDaddy Registry is giving you everything you need to be the best hacker no matter where you are. Register your domain name with GoDaddy Registry for a chance to win some amazing prizes!",
    "icon": "godaddy",
    "link": "https://mlh.link/GoDaddyRegistry"
  }
];

export default function Prizes() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8"
    style={{color: FONT_COLOR}}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#CECAB8]"
        style={{fontSize: "300%"}}>
          PRIZE TRACKS
        </h2>
        <p className="text-gray-300 text-sm md:text-base mt-1"
        style={{fontSize: "150%"}}>
          Compete across specialized tracks and win cash, gear, and gadgets!
        </p>
      </div>

      {/* Podium Tier (Top Overall) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ">
        {topPrizes.map((prize, idx) => (
          <div
            key={idx}
            className={`criteriaBG border-2 ${prize.borderClass} rounded-xl p-5 min-h-40 flex items-center justify-between shadow-lg transition-transform duration-300 hover:scale-[1.02]`}
            style={{backgroundColor: BACKGROUND}}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-5xl">{prize.icon}</span>
              <div>
                <span className="text-s uppercase font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded-full">
                  {prize.badge}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold mt-0.5">{prize.title}</h3>
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-black">
              {prize.reward}
            </div>
          </div>
        ))}
      </div>

      {/* Ethical AI Track Highlight Banner */}
      <div className="criteriaBG border-2 border-hackrpi-pink/60 rounded-xl p-4 md:p-5 mb-6 bg-gradient-to-r from-hackrpi-pink/10 via-transparent to-hackrpi-light-purple/10"
      style={{backgroundColor: BACKGROUND, color: FONT_COLOR}}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚖️</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg md:text-xl font-bold">
                  Best Ethical AI Agent Hack
                </h3>
                <span className="text-[10px] bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Confirmed
                </span>
              </div>
              <p className="text-xs">
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
                <div className="text-[10px] font-medium">{item.rank} Place</div>
                <div className="text-base font-bold">{item.reward}</div>
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
            style={{borderColor: "#FEF9C2", backgroundColor: BACKGROUND, color: FONT_COLOR}}>
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="font-bold text-sm transition-colors leading-snug">
                  {prize.title}
                </h4>
                <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {prize.icon}
                </span>
              </div>
              <p className=" text-xs line-clamp-2 leading-relaxed">
                {prize.description}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 uppercase tracking-wide">Prize</span>
              <span className="text-s font-bold text-hackrpi-orange bg-hackrpi-orange/10 border border-hackrpi-orange/20 px-2 py-0.5 rounded">
                {prize.reward}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/*mlh tracks*/}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#CECAB8]">
          MLH Tracks
        </h2>
      </div>
        {/* Compact Grid for Category Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {mlhTracks.map((prize, idx) => (
          <a href={prize.link} key={idx}>
          <div
            className="h-full group relative criteriaBG border rounded-xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:border-hackrpi-pink hover:bg-white/5"
            style={{borderColor: "#FEF9C2"}}>
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="font-bold text-sm transition-colors leading-snug"
                style={{color: "#CECAB8"}}>
                  {prize.title}
                </h4>
                <div className="bg-white/25 w-35 group-hover:scale-110 transition-transform flex items-center justify-center py-1">
                  <img className="w-30 transition-transform" src={`/mlh-track-logos/${prize.icon}.png`} />
                </div>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">
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
          </a>
        ))}
      </div>
    </section>
  );
}
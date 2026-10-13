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
    "title": "Best Use of Presage",
    "reward": "Fitbit Inspire & Presage Perks",
    "description": "Presage is pioneering the Human Sensing Layer, enabling any application to understand a person’s real-time physical and emotional state. With Presage, you can leverage clinically-proven vital signs, movement, emotion, and/or focus tracking to build a project that gives the standard camera super powers.\n\nUse any of the Presage SDKs to integrate capabilities like real-time heart rate, breathing rate, engagement levels, and facial expressions into your hack with just a few lines of code.\n\n- Immersive Gaming & Entertainment: Dynamically change game difficulty or story elements based on a player's excitement or focus levels.\n- Contactless Wellness & Fitness: Build a non-invasive app that monitors stress, recovery, or fitness performance.\n- Accessibility & Security: Utilize vital signs for effortless authentication, or to enhance accessibility.\n- Productivity: Design a tool that tracks focus or stress.\n\nBuild your next hack with Presage and show us the future of human-computer interaction! Win awesome prizes along for with the following perks from the Presage team:\n\n- Free refills for Presage Development credits to accelerate you through your next three months of building\n- 30% off all Presage usage charges for your first year after going live",
    "icon": "presage",
    "link": "https://mlh.link/presage"
  },
  {
    "title": "Best Use of Gen AI",
    "reward": "Assorted Prizes",
    "description": "Generative AI is rapidly changing the landscape of software development. This category challenges you to build novel applications that leverage the power of Generative AI APIs. Think outside the box and integrate cutting-edge AI models to create innovative solutions with real-world impact.\n\nTo participate, utilize publicly available Generative AI APIs (like those from OpenAI, Anthropic, Hugging Face, Llama, IBM Watson, or Google Gemini) to develop a unique and functional application. This could include:\n\n- AI-powered creative tools: Design an app that allows users to generate unique marketing copy, translate languages in real-time, or create personalized learning experiences.\n- Intelligent assistants and automation: Build a chatbot that can provide insightful customer support, or a system that automates complex tasks using natural language processing.\n- Next-generation content creation platforms: Develop a platform that empowers users to generate high-quality images, write different kinds of creative text formats, or compose original music with AI assistance.\n\nThis is your chance to get hands on with cutting edge tech, put your skills on display, and of course, win some awesome prizes!",
    "icon": "genai",
    "link": "https://mlh.link/gemini"
  },
  {
    "title": "Best Use of Backboard",
    "reward": "Tile Essentials Pack",
    "description": "Every AI model API is stateless by default. That means your app forgets everything the second a session ends. State management should be the first step of any AI build, regardless of what LLM you are using, and Backboard gives you that for free. But Backboard is not just state management.\n\nIt is a single, unified API built on the world’s #1 AI memory that gives you everything you need in one place: long-term memory, RAG, embeddings, tool calls, model routing across 17,000+ LLMs, and persistent context that stays alive across every page refresh, session, and user. No stitching together five different services. One API. One integration. Built on the best memory in AI.\n\nHere’s just a small list of things Backboard can make possible for your AI app!\n\n- AI-powered Travel Guide: Remembers allergies and preferences from past trips.\n- Personalized Fitness Coach: Adjusts workouts based on progress and injury history.\n- Smart Home Controller: Learns routines over time to anticipate lighting and climate preferences!\n\nUse Backboard to build a seamless, persistent user experience without the usual infrastructure headache! Each winning team member will receive a Tiles Essentials Pack because, just like AI, we all need an occasional reminder of where things are!",
    "icon": "blackboard",
    "link": "https://mlh.link/backboard"
  },
  {
    "title": "Best Use of Vultr",
    "reward": "M5Stack Official Tab5",
    "description": "Vultr empowers hackers to bring their high-performance projects to life instantly; providing everything from the speed of one-click deployment and scalable cloud compute, to specialized Vultr Cloud GPUs that can power AI-driven applications. We want you to push the limits of what can be built when infrastructure is no longer the bottleneck!\n\nSign up for a Vultr account today and claim your free cloud credits! Take your next hack to the cloud with Vultr for a chance to win some awesome prizes for you and your team!",
    "icon": "vultr",
    "link": "https://mlh.link/vultr"
  },
  {
    "title": "Commit Fellowship Prize Category",
    "reward": "An Interview with the Commit Fellowship Team & a copy of The Lean Startup",
    "description": "Done sitting on your big idea? Enter the Commit Fellowship Prize Category to take your hack beyond the hackathon. Selected winning teams will have the chance to secure a spot in an exclusive, 3-week zero-to-founder sprint hosted by Major League Hacking and Transcend Network. If you’re ready to do the real work of bringing a startup to market, this is for you.\n\n- Exclusive Admission: A chance to interview for the highly selective Commit Fellowship 3-week sprint.\n- Founder Mentorship: Live coaching, peer code reviews, and structured customer discovery sessions.\n- Launch Perks & Microgrants: Completion opens access to thousands of dollars in cash microgrants and in-kind tooling credits (like AI credits) to keep your post-hackathon momentum going.\n\nQualify by building a working prototype with a team, demonstrate a real problem worth solving, and opt into the Commit Fellowship Prize Category when you submit your project. Once that’s complete, be sure to submit this supplemental form to be considered for the prize category. A winning team from your hackathon will be selected post-event and notified via email.",
    "icon": "fellowship",
    "link": "https://mlh.link/commit"
  },
  {
    "title": "DEV Writing Challenge",
    "reward": "$100",
    "description": "Give your project another chance to shine!\n\nYour hackathon may end after the weekend, but your project story is just getting started. Publish what you built on DEV and help other developers learn from your process.\n\nEach month, the DEV editorial team will select at least one favorite project. Additional projects may be selected depending on submission volume.\n\nSelections consider technical substance, originality, clear storytelling, and community popularity. Great work deserves an audience, so make your post useful, memorable, and easy to share.",
    "icon": "dev",
    "link": "https://dev.to/mlh-hackathon"
  },
  {
    "title": "Best Use of DigitalOcean",
    "reward": "Retro Wireless Mouse",
    "description": "DigitalOcean offers a reliable and easy-to-use cloud platform for every stage of your project. Leverage core services like Droplets, Managed Databases, and App Platform to build, deploy, and scale your application effortlessly. Building with AI? DigitalOcean Gradient™ AI enables you to build, train, and deploy machine learning models, including access to GPU infrastructure and serverless inference!\n\nSign up for DigitalOcean today and reach out to your MLH Coach for credits that you can use towards building your next great hack. Build with DigitalOcean’s robust cloud infrastructure for a chance to win some great prizes for you and each of your teammates!",
    "icon": "digitalocean",
    "link": "https://mlh.link/digitalocean"
  },
  {
    "title": "Best Use of Snowflake API",
    "reward": "Arduino Student Kit",
    "description": "Play with industry-leading LLMs on a single account using the Snowflake APIs. Adding AI capabilities into your application can be as simple as a single CURL command to Snowflake’s REST API.\n\nBuild customized applications, RAG powered chat bots, or embed AI-powered features into your app in half the time with half the hassle. Get started for free with a special, student 120-day Snowflake trial and check out this repository for an example of the Snowflake REST API in action.",
    "icon": "snowflake",
    "link": "https://mlh.link/snowflake"
  },
  {
    "title": "Best Use of Auth0",
    "reward": "Wireless Headphones",
    "description": "Auth0 wants your applications to be secure! Why spend hours building features like social sign-in, Multi-Factor Authentication, and passwordless log-in when you can enable them through Auth0 straight out of the box? You can also secure your AI applications with Auth0 for AI Agents.\n\nAuth0 is free to try, doesn’t require a credit card, and allows for up to 7,000 free active users and unlimited log-ins. Make your new account today and use any of the Auth0 APIs for a chance to win a pair of wireless headphones for you and each member of your team!",
    "icon": "auth0",
    "link": "https://mlh.link/auth0"
  },
  {
    "title": "Best Use of MongoDB Atlas",
    "reward": "M5Stack IoT Kit",
    "description": "MongoDB Atlas takes the leading modern database and makes it accessible in the cloud! Get started with a $50 credit for students or sign up for the Atlas free forever tier (no credit card required).\n\nAlong with a suite of services and functionalities, you’ll have everything you need to manage all of your data, and you can get a headstart with free resources from MongoDB University! Build a hack using MongoDB Atlas for a chance to win a M5Stack IoT Kit for you and each member of your group.",
    "icon": "mongodb",
    "link": "https://mlh.link/mongodb"
  },
  {
    "title": "Best .Tech Domain Name",
    "reward": "Desktop Microphone & a Free .Tech Domain Name for up to 10 years!",
    "description": "Make your Team’s Achievements timeless: Win a .Tech Domain Name for up to 10 years to Showcase and Expand Your Project, Plus Desktop Mics for Effortless Collaboration on Zoom, empowering you to build even more cool things together!",
    "icon": "tech",
    "link": "https://get.tech"
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
      {/*mlh tracks*/}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#CECAB8]">
          MLH Tracks
        </h2>
      </div>
        {/* Compact Grid for Category Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {mlhTracks.map((prize, idx) => (
          <a href={prize.link}>
          <div
            key={idx+"mlh"}
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
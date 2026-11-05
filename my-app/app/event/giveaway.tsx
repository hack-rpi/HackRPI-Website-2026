"use client";

import React from "react";

interface mlhPrize {
  title: string;
  location: string;
  icon: string;
}
interface classReward {
    title: string;
    reward: string;
}

const WorkshopGiveAwayItems: mlhPrize[] = [
  {
    "title": "3 Chipotle Voucher Cards",
    "location": "Fish Audio Voice Lab",
    "icon": "chipotle"
  },
  {
    "title": "5 Chick-fil-A Voucher Cards",
    "location": "Velan Studios and Regeneron fireside chats",
    "icon": "chicky"
  },
  {
    "title": "3 Starbucks coffe bags",
    "location": "Fish Audio Voice Lab",
    "icon": "starbs"
  },
]
const CeremonyGiveAwayItems: mlhPrize[] = [
  {
    "title": "Cloud lamp",
    "location": "Opening Ceremony",
    "icon": "cloud"
  },
  {
    "title": "Glaxy projector",
    "location": "Closing Ceremony",
    "icon": "galaxy"
  }
]
const souvenirEvents: string[] = [
  "Intro to Tech Stack",
  "Making Your First Game",
  "How to Take the Vibe Out of Vibecoding",
  "Intro to Google AI Studio"
]
const classRewards: classReward[] = [
    {
        "title": "CS 1",
        "reward": "a late day"
    },
    {
        "title": "Data Structures",
        "reward": "a late day"
    },
    {
        "title": "Intro To ITWS",
        "reward": "a drop lab"
    },
    {
        "title": "Web Systems",
        "reward": "a drop homework"
    }
]
const FONT_COLOR = "#d9d9d9"
const BACKGROUND = "#00152b"

export default function Giveaway() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8"
    style={{color: FONT_COLOR}}>
        <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#CECAB8]">
          Giveaways
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {WorkshopGiveAwayItems.map((prize, idx) => (
          <div
            className="h-full group relative criteriaBG border rounded-xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:border-hackrpi-pink hover:bg-white/5"
            style={{borderColor: "#FEF9C2"}}
            key = {idx}>
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5 flex items-center justify-center">
                <h4 className="font-bold text-sm transition-colors leading-snug"
                style={{color: "#CECAB8"}}>
                  {prize.title}
                </h4>
              </div>
              <div className="flex items-center justify-center">
                <img className="w-50 transition-transform" src={`/sponsors/sponsor_logos/${prize.icon}.svg`} />
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-center">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">get at</span>
          </div>
          <div className="flex items-center justify-center">
              <span className="text-m font-bold text-hackrpi-orange bg-hackrpi-orange/10 border border-hackrpi-orange/20 px-2 py-0.5 rounded">
                {prize.location}
              </span>
            </div>
          </div>
        ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {CeremonyGiveAwayItems.map((prize, idx) => (
          <div
            className="h-full group relative criteriaBG border rounded-xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:border-hackrpi-pink hover:bg-white/5"
            style={{borderColor: "#FEF9C2"}}
            key = {idx}>
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5 flex items-center justify-center">
                <h4 className="font-bold text-sm transition-colors leading-snug"
                style={{color: "#CECAB8"}}>
                  {prize.title}
                </h4>
              </div>
              <div className="flex items-center justify-center">
                <img className="w-50 transition-transform" src={`/give-aways/${prize.icon}.png`} />
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-center">
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">get at</span>
          </div>
          <div className="flex items-center justify-center">
              <span className="text-m font-bold text-hackrpi-orange bg-hackrpi-orange/10 border border-hackrpi-orange/20 px-2 py-0.5 rounded">
                {prize.location}
              </span>
            </div>
          </div>
        ))}
        </div>
        <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#CECAB8]">
          Exclusive HackRPI 2026 souvenir Collectibles at these events:
        </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {souvenirEvents.map((title, idx) => (
          <div
            className="h-full group relative criteriaBG border rounded-xl p-3.5 flex flex-col justify-between transition-all duration-200 hover:border-hackrpi-pink hover:bg-white/5"
            style={{borderColor: "#FEF9C2"}}
            key = {idx}>
            <div className="flex gap-2 mb-1.5 flex items-center justify-center">
              <h4 className="font-bold text-sm transition-colors leading-snug text-center"
              style={{color: "#CECAB8"}}>
                {title}
              </h4>
            </div>
          </div>
        ))}
        </div>
        <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#CECAB8]">
          Class Incentives
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {classRewards.map((prize, idx) => {
            return (
            <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-[#FEF9C2]/20 bg-[#102B42] p-5"
            >

                {/* Icon */}
                <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#F49A45]/10 border border-[#F49A45]/20">
                <span className="text-xl text-[#F49A45]">
                    {["💻", "🧱", "<>", "🌐"][idx]}
                </span>
                </div>

                {/* Class name */}
                <h4 className="relative text-lg font-bold text-[#CECAB8] mb-3">
                {prize.title}
                </h4>

                {/* Divider */}
                <div className="h-px w-full bg-white/10 mb-3" />

                {/* Reward */}
                <div className="relative">
                <p className="mt-1 text-lg font-extrabold text-[#F49A45]">
                    {prize.reward}
                </p>
                </div>
            </div>
            );
        })}
        </div>
        <div className="text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#CECAB8]">
          ROCS Workshop Credit:
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {souvenirEvents.map((title, idx) => (
         <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-[#FEF9C2]/20 bg-[#102B42] p-5"
            >
            <div className="flex gap-2 mb-1.5 flex items-center justify-center">
              <h4 className="font-bold text-sm transition-colors leading-snug text-center"
              style={{color: "#CECAB8"}}>
                {title}
              </h4>
            </div>
          </div>
        ))}
        </div>
    </section>
  );
}
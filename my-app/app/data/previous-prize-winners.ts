import type { ProjectDisplayProps } from "@/app/components/prev-projects/project-display";
import type { ProjectCarouselProps } from "@/app/components/prev-projects/project-carousel";

export const podiumPrizes: ProjectDisplayProps[] = [
	{
		title: "TrashCam",
		authors: ["ajitesh bankula", "Connor Kuemerle", "Samson Kempiak", "Matthew Durcan"],
		description:
			"We wanted to build something that mixes AI, hardware, and environmental impact in a way that's actually useful. Everyone throws trash away, but very few people sort it correctly, and most campuses or public places have no idea how full their bins are or how much contamination they get. TrashCam was born from the idea of turning an ordinary trash can into a smart, reactive, AI-powered system that could see what's being thrown away and help facilities track sustainability metrics.",
		imageUrl: "/last-year/placeholder.gif",
		prizeCategory: "First Place",
		imageOnLeft: false,
	},
	{
		title: "RetroBrainScan",
		authors: ["Drew Bhavsar", "Sage JPC", "Rafi Khan"],
		description:
			"Our inspiration came from personal experiences watching family members live with, and sometimes lose their lives to, dementia. We wanted to build a tool that helps families understand what's coming, prepare earlier, and feel less alone in the process.",
		imageUrl: "/last-year/RetroBrainScan.png",
		imageOnLeft: true,
		prizeCategory: "Second Place",
	},
];

export const carouselPrizes: ProjectCarouselProps[] = [
	{
		title: "Night Shift",
		authors: ["Justin Zhang", "courteneyS Sit"],
		description:
			'Night Shift is an ICU Digital Twin where our "Modern" AI finds optimal, life-saving strategies that outperform "Retro" human-led decisions, creating a smarter decision-support tool for hospitals.',
		imageUrl: "/last-year/Night-Shift.png",
		prizeCategory: "Best Machine Learning Hack",
	},
	{
		title: "RetroCare",
		authors: ["Vedant Naidu", "Ravjeet Chahal"],
		description:
			"RetroCare reimagines the bedside nurse through AI calls that monitor seniors' meds, mood, and safety, offering compassionate care and peace of mind.",
		imageUrl: "/last-year/RetroCare.png",
		prizeCategory: "Best Healthcare Hack",
	},
	{
		title: "ReStyle",
		authors: ["Priscilla Wong", "David Zhao", "Caitlin Yau", "Harry Hargreaves"],
		description: "Every Thread Tells a New Story.",
		imageUrl: "/last-year/ReStyle.png",
		prizeCategory: "Best Sustainability Hack",
	},
	{
		title: "HARP",
		authors: ["Teerthraj Parmar", "Matthew McCall", "Swaroop Sridhar"],
		description:
			"The Helpful Assessment Readiness Platform leverages artificial intelligence to create highly interactive, personalized, and adaptive technical interviews.",
		imageUrl: "/last-year/HARP.png",
		prizeCategory: "Best Artificial Intelligence Hack, [MLH] Best Use of DigitalOcean Gradient AI",
	},
	{
		title: "ByteBite",
		authors: ["Alex C", "Dathan Lang", "Akshat Prakash", "Brian Tam"],
		description:
			"ByteBites.tech turns campus dining menus into personalized health guidance filtering allergies, supporting chronic conditions, and recommending smarter meals tailored to each student's wellness goals.",
		imageUrl: "/last-year/ByteBite.png",
		prizeCategory: "Best Data Science Hack",
	},
	{
		title: "Brain Invaders",
		authors: ["Deyan Reza", "Farhan Khan", "MMahmud24"],
		description:
			"Brain Invaders is a cognitive training game designed to help improve impulse control, response inhibition, and timing-based decision-making.",
		imageUrl: "/last-year/Brain-Invaders.jpg",
		prizeCategory: "Best First-Time Hack",
	},
	{
		title: "Pancake Pals",
		authors: ["Ashley Chan", "Eddie Matthews", "Yasmin"],
		description: "Multiplayer game to keep your screen time low!",
		imageUrl: "/last-year/Pancake-Pals.png",
		prizeCategory: "Best Mobile Hack",
	},
	{
		title: "CRT All In One & PiCI",
		authors: ["otemitayo1212", "Tim Rota", "R3Vipers Ames", "zcacciapalle Cacciapalle"],
		description:
			'We integrated a Windows XP computer, Raspberry Pi on a custom PCI card, and a cooling system into a 19" CRT monitor. The Windows XP machine is retro, the Raspberry Pi is modern, and we even built a custom game.',
		imageUrl: "/last-year/crt-all-in-one-pici.jpg",
		prizeCategory: "Best Hardware Hack",
	},
	{
		title: "Gachirat",
		authors: ["Megan Leigh", "Rijul Verma", "Kaeshev Alapati"],
		description:
			"Gachirat is a retro-inspired digital pet that helps you improve your health and financial literacy in a fun, gamified way.",
		imageUrl: "/last-year/Gachirat.png",
		prizeCategory: "Judge Favorite",
	},
	{
		title: "Bloomy",
		authors: ["Jacob Hebbel", "firecqt Steenbruggen"],
		description: "A smart chatbot for all your financial questions.",
		imageUrl: "/last-year/Bloomy.png",
		prizeCategory: "[Photon] Best Use of Photon",
	},
	{
		title: "ChronOS",
		authors: ["Tazeem Mahashin"],
		description:
			"ChronOS - [Chronos: Time] x [OS: Operating System] 2025 SOTA AI meets Retro Microsoft '95 to make learning much more productive while still enjoyable.",
		imageUrl: "/last-year/ChronOS.png",
		prizeCategory: "[MLH] Best Use of AI powered by Reach Capital",
	},
	{
		title: "QuACKER",
		authors: ["Rita Lei", "Nicole Wu", "Farrah Hass"],
		description: "Questionably Accurate Course Knowledge, Evaluation, & Ratings.",
		imageUrl: "/last-year/QuACKER.png",
		prizeCategory: "[MLH] Best .Tech Domain Name",
	},
	{
		title: "Wurst",
		authors: ['Mingjia "Jacky" Guan', "Xiyuan Li", "Yuanhao Zhou", "Ray Feng"],
		description: "Locality Sensitive Hashing based RAG Chatbot.",
		imageUrl: "/last-year/Wurst.jpeg",
		prizeCategory: "[MLH] Best Use of Gemini API",
	},
	{
		title: "RetroVision",
		authors: ["Ankit Kumar Upadhyay", "sanjaychari Chari", "anweshitpanda Panda"],
		description:
			"An AI portal that turns books and podcasts about Troy into short narrated videos, letting students watch the city's history unfold on a platform that can later scale to any city.",
		imageUrl: "/last-year/RetroVision.png",
		prizeCategory: "[MLH] Best Use of ElevenLabs",
	},
	{
		title: "Echo Of You",
		authors: ["Kelly Crane", "Phu Thai"],
		description: "Bringing yesterday into today | Relive past people in our modern lives.",
		imageUrl: "/last-year/Echo-Of-You.png",
		prizeCategory: "[MLH] Best Use of Vultr",
	},
];

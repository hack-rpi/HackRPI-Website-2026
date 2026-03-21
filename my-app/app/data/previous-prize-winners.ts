import type { ProjectDisplayProps } from "@/app/components/prev-projects/project-display";
import type { ProjectCarouselProps } from "@/app/components/prev-projects/project-carousel";

export const podiumPrizes: ProjectDisplayProps[] = [
	{
		title: "TrashCam",
		authors: ["ajitesh bankula", "Connor Kuemerle", "Samson Kempiak", "Matthew Durcan"],
		description:
			"We wanted to build something that mixes AI, hardware, and environmental impact in a way that's actually useful. Everyone throws trash away, but very few people sort it correctly, and most campuses or public places have no idea how full their bins are or how much contamination they get. TrashCam was born from the idea of turning an ordinary trash can into a smart, reactive, AI-powered system that could see what's being thrown away and help facilities track sustainability metrics.",
		imageUrl: "/projectImages/firstPlace.jpg",
		prizeCategory: "First Place",
		imageOnLeft: false,
	},
	{
		title: "RetroBrainScan",
		authors: ["Drew Bhavsar", "Sage JPC", "Rafi Khan"],
		description:
			"Our inspiration came from personal experiences watching family members live with, and sometimes lose their lives to, dementia. We wanted to build a tool that helps families understand what's coming, prepare earlier, and feel less alone in the process.",
		imageUrl: "/projectImages/secondPlace.png",
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
		imageUrl: "/projectImages/night-shift.png",
		prizeCategory: "Best Machine Learning Hack",
	},
	{
		title: "RetroCare",
		authors: ["Vedant Naidu", "Ravjeet Chahal"],
		description:
			"RetroCare reimagines the bedside nurse through AI calls that monitor seniors' meds, mood, and safety, offering compassionate care and peace of mind.",
		imageUrl: "/projectImages/retrocare.png",
		prizeCategory: "Best Healthcare Hack",
	},
	{
		title: "ReStyle",
		authors: ["Priscilla Wong", "David Zhao", "Caitlin Yau", "Harry Hargreaves"],
		description: "Every Thread Tells a New Story.",
		imageUrl: "/projectImages/restyle.png",
		prizeCategory: "Best Sustainability Hack",
	},
	{
		title: "HARP",
		authors: ["Teerthraj Parmar", "Matthew McCall", "Swaroop Sridhar"],
		description:
			"The Helpful Assessment Readiness Platform leverages artificial intelligence to create highly interactive, personalized, and adaptive technical interviews.",
		imageUrl: "/projectImages/harp.png",
		prizeCategory: "Best Artificial Intelligence Hack, [MLH] Best Use of DigitalOcean Gradient AI",
	},
	{
		title: "ByteBite",
		authors: ["Alex C", "Dathan Lang", "Akshat Prakash", "Brian Tam"],
		description:
			"ByteBites.tech turns campus dining menus into personalized health guidance filtering allergies, supporting chronic conditions, and recommending smarter meals tailored to each student's wellness goals.",
		imageUrl: "/projectImages/bytebite.png",
		prizeCategory: "Best Data Science Hack",
	},
	{
		title: "Brain Invaders",
		authors: ["Deyan Reza", "Farhan Khan", "MMahmud24"],
		description:
			"Brain Invaders is a cognitive training game designed to help improve impulse control, response inhibition, and timing-based decision-making.",
		imageUrl: "/projectImages/brain-invaders.jpg",
		prizeCategory: "Best First-Time Hack",
	},
	{
		title: "Pancake Pals",
		authors: ["Ashley Chan", "Eddie Matthews", "Yasmin"],
		description: "Multiplayer game to keep your screen time low!",
		imageUrl: "/projectImages/pancake-pals.png",
		prizeCategory: "Best Mobile Hack",
	},
	{
		title: "CRT All In One & PiCI",
		authors: ["otemitayo1212", "Tim Rota", "R3Vipers Ames", "zcacciapalle Cacciapalle"],
		description:
			'We integrated a Windows XP computer, Raspberry Pi on a custom PCI card, and a cooling system into a 19" CRT monitor. The Windows XP machine is retro, the Raspberry Pi is modern, and we even built a custom game.',
		imageUrl: "/projectImages/crt-all-in-one-pici.jpg",
		prizeCategory: "Best Hardware Hack",
	},
	{
		title: "Gachirat",
		authors: ["Megan Leigh", "Rijul Verma", "Kaeshev Alapati"],
		description:
			"Gachirat is a retro-inspired digital pet that helps you improve your health and financial literacy in a fun, gamified way.",
		imageUrl: "/projectImages/gachirat.png",
		prizeCategory: "Judge Favorite",
	},
	{
		title: "Bloomy",
		authors: ["Jacob Hebbel", "firecqt Steenbruggen"],
		description: "A smart chatbot for all your financial questions.",
		imageUrl: "/projectImages/bloomy.png",
		prizeCategory: "[Photon] Best Use of Photon",
	},
	{
		title: "ChronOS",
		authors: ["Tazeem Mahashin"],
		description:
			"ChronOS - [Chronos: Time] x [OS: Operating System] 2025 SOTA AI meets Retro Microsoft '95 to make learning much more productive while still enjoyable.",
		imageUrl: "/projectImages/chronos.png",
		prizeCategory: "[MLH] Best Use of AI powered by Reach Capital",
	},
	{
		title: "QuACKER",
		authors: ["Rita Lei", "Nicole Wu", "Farrah Hass"],
		description: "Questionably Accurate Course Knowledge, Evaluation, & Ratings.",
		imageUrl: "/projectImages/quacker.png",
		prizeCategory: "[MLH] Best .Tech Domain Name",
	},
	{
		title: "Wurst",
		authors: ['Mingjia "Jacky" Guan', "Xiyuan Li", "Yuanhao Zhou", "Ray Feng"],
		description: "Locality Sensitive Hashing based RAG Chatbot.",
		imageUrl: "/projectImages/wurst.jpeg",
		prizeCategory: "[MLH] Best Use of Gemini API",
	},
	{
		title: "RetroVision",
		authors: ["Ankit Kumar Upadhyay", "sanjaychari Chari", "anweshitpanda Panda"],
		description:
			"An AI portal that turns books and podcasts about Troy into short narrated videos, letting students watch the city's history unfold on a platform that can later scale to any city.",
		imageUrl: "/projectImages/retrovision.png",
		prizeCategory: "[MLH] Best Use of ElevenLabs",
	},
	{
		title: "Echo Of You",
		authors: ["Kelly Crane", "Phu Thai"],
		description: "Bringing yesterday into today | Relive past people in our modern lives.",
		imageUrl: "/projectImages/echo-of-you.png",
		prizeCategory: "[MLH] Best Use of Vultr",
	},
];

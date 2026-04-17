"use client"

import { useEffect, useState } from "react";
import { NavGroup } from "./nav-bar-links";
import DesktopNavBar from "./desktop/nav-bar-desktop";
import MobileNavBar from "./mobile/nav-bar-mobile";
import DesktopNavBarDarker from "./desktop/nav-bar-desktop-darker";

export const links: NavGroup[] = [
	{
		name: "Home",
		links: [
			{ href: "/", children: "Home" },
			{ href: "/#about", children: "About" },
			{ href: "/#faq", children: "FAQ" },
			{ href: "/#sponsors", children: "Sponsors" },
			{ href: "/#team", children: "Team" },
		],
	},
	{
		name: "Event",
		links: [
			{ href: "/event", children: "Event Info" },
			{ href: "/event/schedule", children: "Schedule" },
			{ href: "/event/prizes", children: "Prizes" },
		],
	},
	{
		name: "HackRPI XII",
		links: [
			{ href: "/last-year", children: "Winners" },
			{ href: "/last-year/photos", children: "Photos" },
		],
	},
];

export default function NavBar({ showOnScroll, variant }: { showOnScroll: boolean, variant?: number}) {
	variant = variant ?? 0;

	const [showNav, setShowNav] = useState(false);
	const [windowWidth, setWindowWidth] = useState(0);
	/*const [isDarkMode, setIsDarkMode] = useState(
		typeof window !== "undefined" &&
			(localStorage.getItem("theme") === "dark" ||
				(!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)),
	);*/

	const navHeight = 96;

	// Add event listener to the window to update the scrollY state
	useEffect(() => {
		setWindowWidth(window.innerWidth);

		const storedTheme = localStorage.getItem("theme");
		if (storedTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else if (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			document.documentElement.classList.add("dark");
		}

		const scrollThreshold = window.innerHeight - navHeight;
		const handleScroll = () => {
			setShowNav(window.scrollY > scrollThreshold);
		};
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme === "dark") {
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleDarkMode = () => {
		if (document.documentElement.classList.contains("dark")) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		}
	};

	if (windowWidth === 0) return;

	if (windowWidth < 860) // If you're changing this, remember to change --breakpoint-desktop in globals.css too
		return (
			<MobileNavBar links={links} />
		);

	if (variant === 1) {
		return (
			<nav role="navigation" className={`${showOnScroll ? (showNav ? "top-0" : "-top-24") : "top-0"} fixed transition-all w-full z-50`}>
				<DesktopNavBarDarker links={links} />
			</nav>
		)
	}
	else return (
		<nav role="navigation" className={`${showOnScroll ? (showNav ? "top-0" : "-top-24") : "top-0"} fixed transition-all w-full z-50`}>
			<DesktopNavBar links={links} />
		</nav>
	);
}

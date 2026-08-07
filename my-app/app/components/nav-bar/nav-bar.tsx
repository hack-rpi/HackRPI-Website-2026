"use client"

import { useEffect, useState, useSyncExternalStore } from "react";
import { NavGroup } from "./nav-bar-links";
import DesktopNavBar from "./desktop/nav-bar-desktop";
import MobileNavBar from "./mobile/nav-bar-mobile";
import DesktopNavBarDarker from "./desktop/nav-bar-desktop-darker";
import linkData from "@/app/data/links.json";

export const links: NavGroup[] = linkData;

function subscribeToResize(onStoreChange: () => void) {
	window.addEventListener("resize", onStoreChange);
	return () => window.removeEventListener("resize", onStoreChange);
}

function getWindowWidth() {
	return window.innerWidth;
}

function getServerWindowWidth() {
	return 0;
}

export default function NavBar({ showOnScroll, variant }: { showOnScroll: boolean, variant?: number}) {
	variant = variant ?? 0;

	const [showNav, setShowNav] = useState(false);
	const windowWidth = useSyncExternalStore(subscribeToResize, getWindowWidth, getServerWindowWidth);
	/*const [isDarkMode, setIsDarkMode] = useState(
		typeof window !== "undefined" &&
			(localStorage.getItem("theme") === "dark" ||
				(!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)),
	);*/

	const navHeight = 96;

	// Add event listener to the window to update the scrollY state
	useEffect(() => {
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
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

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

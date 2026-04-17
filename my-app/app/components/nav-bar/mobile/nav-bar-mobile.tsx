import { NavGroup } from "../nav-bar-links";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/HackRPI_Logo_Dark.png";
import NavGroupComponent from "./nav-group";
import Link from "next/link";
import MlhBanner from "../../mlh-banner/mlh-banner";

export default function MobileNavBar({ links }: { links: NavGroup[] }) {
	const [navMenuOpen, setNavMenuOpen] = useState(false);

	useEffect(() => {
		document.onkeydown = (e) => {
			if (e.key === "Escape") {
				setNavMenuOpen(false);
			}
		};
		return () => {
			document.onkeydown = null;
		};
	}, []);

	return (
		<nav role="navigation" className="mobile-navigation">
			<div className="
				w-screen h-18 flex items-center justify-center fixed top-0
				bg-linear-to-r from-sky-500 to-hackrpi-clouds-green z-20
			">
				<div className="flex items-center justify-start w-1/3">
					<button onClick={() => setNavMenuOpen((prev) => !prev)} className="text-white text-4xl ml-8 w-10 h-8">
						<Image
							alt="Hamburger Menu"
							src="/menu-icon.svg"
							width={0}
							height={0}
							loading="eager"
							preload={true}
							className="w-auto h-auto"
						/>
					</button>
				</div>
				<div className="flex items-center justify-center w-2/3">
					<Link href="/" className="w-fit whitespace-nowrap">
						<Image
							alt="HackRPI Logo"
							aria-label="Home Page"
							src={logo}
							className="w-fit image-full -translate-x-2.5 -translate-y-px"
							loading="eager"
						/>
					</Link>
				</div>
				<div className="flex items-center justify-center w-1/3"></div>
			</div>
			<div
				className={`fixed top-0 bottom-0 w-full bg-sky-900/30 ${
					navMenuOpen ? "left-0" : "-left-full"
				} z-10`}
				onClick={() => setNavMenuOpen(false)}
				id="home"
			></div>
			<div
				className={`fixed top-18 ${
					navMenuOpen ? "left-0" : "-left-3/4"
				} h-full bg-hackrpi-clouds-dark-blue py-5 w-3/4 z-20 transition-all overflow-y-auto`}
			>
				<div className="flex flex-col items-center justify-start h-full ">
					{links.map((link) => (
						<NavGroupComponent
							key={link.name}
							name={link.name}
							links={link.links}
							onLinkClick={() => setNavMenuOpen(false)}
						/>
					))}
					<Link
						href="/sponsorship"
						className="
							w-11/12 whitespace-nowrap text-2xl p-2 mb-2 transition-all duration-200
							bg-base-100 bg-size-[0%_4px] bg-no-repeat bg-bottom-left
							bg-linear-to-r from-sky-500 to-hackrpi-clouds-green hover:bg-size-[100%_4px]
						"
					>
						Sponsor Us
					</Link>
					<Link
						href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
						className="
							w-11/12 whitespace-nowrap text-2xl p-2 mb-2 transition-all duration-200
							bg-base-100 bg-size-[0%_4px] bg-no-repeat bg-bottom-left
							bg-linear-to-r from-sky-500 to-hackrpi-clouds-green hover:bg-size-[100%_4px]
						"
						target="_blank"
					>
						Code of Conduct
					</Link>
					<Link
						href="https://securelb.imodules.com/s/1225/lg22/form.aspx?sid=1225&gid=1&pgid=6795&cid=15861&dids=257&bledit=1&sort=1"
						className="
							w-11/12 whitespace-nowrap text-2xl p-2 mb-2 transition-all duration-200
							bg-base-100 bg-size-[0%_4px] bg-no-repeat bg-bottom-left
							bg-linear-to-r from-sky-500 to-hackrpi-clouds-green hover:bg-size-[100%_4px]"
						target="_blank"
					>
						Give Now
					</Link>
				</div>
			</div>
			<MlhBanner src="/mlh-badges/mlh-trust-badge-2027-white.svg"/>
		</nav>
	);
}

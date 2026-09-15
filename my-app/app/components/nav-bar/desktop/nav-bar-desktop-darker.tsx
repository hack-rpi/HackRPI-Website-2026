import NextImg from "next/image";
import { NavGroup } from "../nav-bar-links";
import logo from "@/public/HackRPI_Logo_Light.png";
// import RegistrationButton from "@/components/themed-components/registration-header-link";

import Link from "next/link";
import NextLink from "next/link";
import { Link as lin } from "../nav-bar-links";
import MlhBanner from "../../mlh-banner/mlh-banner";
import { useState } from "react";

function NavLink({href, children, new_tab, onClick}: {
	href: string;
	children: React.ReactNode;
	new_tab: boolean;
	onClick?: () => void;
}) {
	if (new_tab) {
		<Link
			className="
				w-full whitespace-nowrap p-0.5 h-8 text-center text-lg bg-size-[0%_2px] bg-no-repeat
				bg-bottom-left transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500
				hover:bg-size-[100%_2px] focus:bg-size-[100%_4px]
			"
			href={href}
			target="_blank"
			onClick={onClick}
		>
			{children}
		</Link>
	}
	return (
		<Link
			className="
				w-full whitespace-nowrap p-0.5 h-8 text-center text-lg bg-size-[0%_2px] bg-no-repeat
				bg-bottom-left transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500
				hover:bg-size-[100%_2px] focus:bg-size-[100%_4px]
			"
			href={href}
			onClick={onClick}
		>
			{children}
		</Link>
	);
}

function NavGroupComponent({ name, links }: { name: string; links: lin[] }) {
	if (links.length == 1) {
		if (links[0].new_tab) {
			return (
				<Link
					role="link"
					href={links[0].href}
					className="
						mx-2 whitespace-nowrap text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left
						transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500
						hover:bg-size-[100%_2px]
					"
					target="_blank"
				>
					{name}
				</Link>
			)
		}
		return (
			<Link
				role="link"
				href={links[0].href}
				className="
					mx-2 whitespace-nowrap text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left
					transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500
					hover:bg-size-[100%_2px]
				"
			>
				{name}
			</Link>
		)
	}
	return (
		<div className="dropdown dropdown-hover">
			<div
				role="link"
				className="
					text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left
					transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500
					hover:bg-size-[100%_2px] focus:bg-size-[100%_4px] my-4 mx-2 whitespace-nowrap
				"
			>
				<Link href={links[0].href}>{name}</Link>
			</div>

			<ul
				tabIndex={-1}
				className="
					dropdown-content menu p-2 w-52
					bg-linear-to-b from-purple-400/80 to-blue-800/50
					backdrop-blur-sm
				"
			>
				{links.map((link) => (
					<li key={link.href} className="my-1" role="link">
						<NavLink href={link.href} new_tab={link.new_tab}>{link.children}</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export function DesktopNavBarDarker({ links }: { links: NavGroup[] }) {
  return (
		<>
    {/*<div className="bg-gradient-to-r from-hackrpi-light-purple via-hackrpi-pink to-hackrpi-light-purple w-full h-16">*/}
    <div className="w-full h-16 bg-linear-to-b from-purple-400/60 to-blue-800/30 text-slate-100 backdrop-blur-sm">
      <div
        className="flex justify-center lg:justify-center items-center h-full z-50 w-[95%]"
        role="navigation"
      >
        <div className="flex items-center justify-center mr-4">
          <Link href="/" className="w-fit whitespace-nowrap">
            <NextImg
							alt="HackRPI Logo"
							aria-label="Homepage" 
							src={logo}
							className="w-[20vh] image-full translate-x-1 translate-y-1.75"
							loading="eager"
							preload={true}
						/>
          </Link>
        </div>
        {/* Uncomment when ready to add registration button back */}
        {/* <div className="min-w-fit lg:w-8/12 flex items-center justify-start"> */}
        <div className="min-w-fit flex items-center justify-start gap-10">
          {links.map((link) => (
            <NavGroupComponent key={link.name} name={link.name} links={link.links} />
          ))}
        </div>
        <div className="ml-2">
          {/* <RegistrationButton className="w-auto" /> */}
        </div>
      </div>
    </div>
		<MlhBanner src="/mlh-badges/mlh-trust-badge-2027-dark.svg"/>
		</>
  );
}

export function DesktopNavBarHero({ links }: { links: NavGroup[] }) {
	return (
    <>
		<header 
			className="sticky top-0 z-50 w-full border-none bg-gradient-to-b from-slate-950/20 via-slate-950/10 to-transparent backdrop-blur-xl transition-all duration-300"
			style={{
			WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.78) 70%, rgba(0, 0, 0, 0) 100%)",
			maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%)",
			}}
		>
			<nav
				role="navigation"
				aria-label="Main Navigation"
				className="mx-auto flex h-18 max-w-7xl items-center justify-between pr-6 pl-0 md:pr-12 md:pl-0"
			>
				{/* Logo Section */}
				<div className="flex items-center">
					<Link
						href="/"
						className="group relative flex items-center py-2 transition-transform duration-300 ease-out hover:scale-105"
					>
					<NextImg
						alt="HackRPI Logo"
						aria-label="Homepage"
						src={logo}
						className="w-[18vh] max-w-[165px] h-auto object-contain transition-all duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_18px_rgba(168,85,247,0.5)]"
						loading="eager"
						preload={true}
					/>
					</Link>
				</div>

				{/* Navigation Links Group */}
				<div className="hidden md:flex absolute inset-x-0 justify-center items-center gap-8 lg:gap-12 pointer-events-none">
					{links.map((link) => {
						const target = link.links?.[0];
						const href = typeof target === "string" ? target : target?.href || "#";

						return (
						<Link
							key={link.name}
							href={href}
							className="pointer-events-auto py-2 text-sm font-semibold tracking-wider text-slate-200/90 no-underline uppercase transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
						>
							{link.name}
						</Link>
						);
					})}
				</div>

			</nav>
		</header>
      <MlhBanner src="/mlh-badges/mlh-trust-badge-2027-black.svg" />
    </>
  );
}


export default DesktopNavBarDarker;
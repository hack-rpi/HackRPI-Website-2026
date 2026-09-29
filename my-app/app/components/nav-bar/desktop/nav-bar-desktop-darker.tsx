import NextImg from "next/image";
import { NavGroup } from "../nav-bar-links";
import logo from "@/public/HackRPI_Logo_Light.png";
// import RegistrationButton from "@/components/themed-components/registration-header-link";

import Link from "next/link";
import NextLink from "next/link";
import { Link as lin } from "../nav-bar-links";
import MlhBanner from "../../mlh-banner/mlh-banner";
import { useState } from "react";

function NavLink({
    href,
    children,
    new_tab,
    onClick,
    variant = "default",
}: {
    href: string;
    children: React.ReactNode;
    new_tab: boolean;
    onClick?: () => void;
    variant?: "default" | "hero";
}) {
    const isHero = variant === "hero";

    const linkClasses = isHero
        ? "w-full whitespace-nowrap text-xl text-slate-200/90 no-underline transition-colors hover:text-white cursor-pointer"
        : "w-full whitespace-nowrap p-0.5 h-8 text-center text-lg bg-size-[0%_2px] bg-no-repeat bg-bottom-left transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500 hover:bg-size-[100%_2px] focus:bg-size-[100%_4px]";

    return (
        <Link
            className={linkClasses}
            href={href}
            target={new_tab ? "_blank" : undefined}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}

interface NavGroupProps {
    name: string;
    links: lin[];
    variant?: "default" | "hero";
}

// export function NavGroupComponent({ name, links, variant = "default" }: NavGroupProps) {
//     const isHero = variant === "hero";

//     const linkStyles = isHero
//     ? "py-2 text-sm font-semibold tracking-wider text-slate-200/90 no-underline uppercase transition-all duration-300 hover:text-white hover:no-underline focus:no-underline active:no-underline hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] whitespace-nowrap cursor-pointer hover:bg-transparent focus:bg-transparent active:bg-transparent"
//     : "mx-2 whitespace-nowrap text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500 hover:bg-size-[100%_2px]";

//     if (links.length === 1) {
//         return (
//             <Link
//                 role="link"
//                 href={links[0].href}
//                 className={linkStyles}
//                 target={links[0].new_tab ? "_blank" : undefined}
//             >
//                 {name}
//             </Link>
//         );
//     }

//     return (
//         <div className="dropdown dropdown-hover">
//             <div
//                 role="button"
//                 tabIndex={0}
//                 className={linkStyles}
//             >
//                 <Link href={links[0].href}>{name}</Link>
//             </div>

//             <ul
// 				tabIndex={-1}
// 				className=" -translate-x-1/4
// 					dropdown-content menu p-0 w-24  
// 					bg-slate-950/5 backdrop-blur-md 
// 					z-50 text-slate-200
// 				"
// 			>
// 				{links.map((link) => (
// 					<li key={link.href} className="m-0 p-0" role="link">
// 						<NavLink href={link.href} new_tab={link.new_tab} variant="hero">
// 							{link.children}
// 						</NavLink>
// 					</li>
// 				))}
// 			</ul>
//         </div>
//     );
// }

export function NavGroupComponent({ name, links, variant = "default" }: NavGroupProps) {
    const isHero = variant === "hero";

    const linkStyles = isHero
        ? "py-2 text-sm font-semibold tracking-wider text-slate-200/90 no-underline uppercase transition-all duration-300 hover:text-white hover:no-underline focus:no-underline active:no-underline hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] whitespace-nowrap cursor-pointer hover:bg-transparent focus:bg-transparent active:bg-transparent"
        : "mx-2 whitespace-nowrap text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500 hover:bg-size-[100%_2px]";

    if (links.length === 1) {
        return (
            <Link
                href={links[0].href}
                className={linkStyles}
                target={links[0].new_tab ? "_blank" : undefined}
            >
                {name}
            </Link>
        );
    }

    return (
        <div className="dropdown dropdown-hover">
            {/* Direct Link trigger preserving your original linkStyles without the event-capturing div wrapper */}
            <Link 
                href={links[0].href} 
                className={linkStyles}
            >
                {name}
            </Link>

            <ul
                tabIndex={-1}
                className=" -translate-x-1/4
                    dropdown-content menu p-0 w-24  
                    bg-slate-950/5 backdrop-blur-md 
                    z-50 text-slate-200
                "
            >
                {links.map((link) => (
                    <li key={link.href} className="m-0 p-0">
                        <NavLink href={link.href} new_tab={link.new_tab} variant="hero">
                            {link.children}
                        </NavLink>
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
        <header className="sticky top-0 z-50 w-full border-none transition-all duration-300">
            {/* Background layer: keeps exact original gradient, backdrop-blur, and mask image */}
            <div 
                className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/10 to-transparent backdrop-blur-xl pointer-events-none"
                style={{
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.78) 70%, rgba(0, 0, 0, 0) 100%)",
                    maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0) 100%)",
                }}
            />

            <nav
                role="navigation"
                aria-label="Main Navigation"
                className="relative mx-auto flex h-18 max-w-7xl items-center justify-between pr-6 pl-0 md:pr-12 md:pl-0"
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
                <div className="hidden md:flex absolute inset-x-0 justify-center items-center gap-8 lg:gap-12">
                    {links.map((link) => (
                        <NavGroupComponent key={link.name} name={link.name} links={link.links} variant="hero" />
                    ))}
                </div>

            </nav>
        </header>
      <MlhBanner src="/mlh-badges/mlh-trust-badge-2027-black.svg" />
    </>
  );
}


export default DesktopNavBarDarker;
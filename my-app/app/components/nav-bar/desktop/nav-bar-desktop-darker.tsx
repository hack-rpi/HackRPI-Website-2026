import NextImg from "next/image";
import { NavGroup } from "../nav-bar-links";
import logo from "@/public/HackRPI_Logo_Light.png";
// import RegistrationButton from "@/components/themed-components/registration-header-link";

import Link from "next/link";
import { Link as lin } from "../nav-bar-links";
import MlhBanner from "../../mlh-banner/mlh-banner";

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

export default function DesktopNavBarDarker({ links }: { links: NavGroup[] }) {
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

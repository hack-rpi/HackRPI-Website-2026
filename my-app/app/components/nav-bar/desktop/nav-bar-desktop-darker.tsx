import NextImg from "next/image";
import { NavGroup } from "../nav-bar-links";
// import logo from "@/public/Retro_HackRPI_Logo.png";
// import RegistrationButton from "@/components/themed-components/registration-header-link";

import Link from "next/link";
import { Link as lin } from "../nav-bar-links";

function NavLink({href, children, onClick}: {
	href: string;
	children: React.ReactNode;
	onClick?: () => void;
}) {
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
						<NavLink href={link.href}>{link.children}</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export default function DesktopNavBarDarker({ links }: { links: NavGroup[] }) {
  return (
    /*<div className="bg-gradient-to-r from-hackrpi-light-purple via-hackrpi-pink to-hackrpi-light-purple w-full h-16">*/
    <div className="w-full h-16 bg-linear-to-b from-purple-400/80 to-blue-800/40 text-cyan-300 backdrop-blur-sm">
      <div
        className="flex justify-center lg:justify-center items-center h-full z-50"
        role="navigation"
      >
        <div className="flex items-center justify-center mr-4">
          <Link href="/" className="w-fit whitespace-nowrap">
            {/* <NextImg alt="HackRPI Logo" aria-label="Home Page" src={logo} className="w-10 image-full" /> */}
          </Link>
        </div>
        {/* Uncomment when ready to add registration button back */}
        {/* <div className="min-w-fit lg:w-8/12 flex items-center justify-start"> */}
        <div className="min-w-fit flex items-center justify-start gap-10">
          {links.map((link) => (
            <NavGroupComponent key={link.name} name={link.name} links={link.links} />
          ))}
          
          <Link
						href="/news"
						className="
							mx-2 whitespace-nowrap text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left
							transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500
							hover:bg-size-[100%_2px]
						"
						target="_blank"
					>
						News
					</Link>

          <Link
						href="/sponsorship"
						className="
							mx-2 whitespace-nowrap text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left
							transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500
							hover:bg-size-[100%_2px]
						"
						target="_blank"
					>
						Sponsor Us
					</Link>

          <Link
						href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
						className="
							mx-2 whitespace-nowrap text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left
							transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500
							hover:bg-size-[100%_2px]
						"
						target="_blank"
					>
						Code of Conduct
					</Link>

					<Link
						href="https://securelb.imodules.com/s/1225/lg22/form.aspx?sid=1225&gid=1&pgid=6795&cid=15861&dids=257&bledit=1&sort=1"
						className="
							mx-2 whitespace-nowrap text-lg xl:text-xl bg-size-[0%_2px] bg-no-repeat bg-bottom-left
							transition-all duration-200 bg-linear-to-r from-hackrpi-clouds-green to-sky-500
							hover:bg-size-[100%_2px]
						"
						target="_blank"
					>
						Give Now
					</Link>
        </div>
        <div className="ml-2">
          {/* <RegistrationButton className="w-auto" /> */}
        </div>
      </div>
    </div>
  );
}

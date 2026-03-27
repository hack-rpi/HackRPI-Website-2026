import NextImg from "next/image";
import { NavGroup } from "../nav-bar-links";
// import logo from "@/public/Retro_HackRPI_Logo.png";
// import RegistrationButton from "@/components/themed-components/registration-header-link";

import NavGroupComponent from "./nav-group";
import Link from "next/link";
import NavLink from "./nav-link";

export default function DesktopNavBar({ links }: { links: NavGroup[] }) {
	return (
		/*<div className="bg-gradient-to-r from-hackrpi-light-purple via-hackrpi-pink to-hackrpi-light-purple w-full h-16">*/
		<div className="w-full h-16 bg-linear-to-r from-sky-200 via-white to-sky-200 text-slate-800">
			<div
				className="flex justify-center lg:justify-center items-center h-full border-b-2 border-black z-50"
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
					
					<NavLink href="/news" title="News"/>
					<NavLink href="/sponsorship" title="Sponsor Us"/>
					<NavLink
						href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" title="Code of Conduct"/>
					<NavLink
						href="https://securelb.imodules.com/s/1225/lg22/form.aspx?sid=1225&gid=1&pgid=6795&cid=15861&dids=257&bledit=1&sort=1"
						title="Give Now" />
				</div>
				<div className="ml-2">
					{/* <RegistrationButton className="w-auto" /> */}
				</div>
			</div>
		</div>
	);
}

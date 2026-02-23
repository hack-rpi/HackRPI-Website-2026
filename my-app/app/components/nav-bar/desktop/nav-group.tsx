import NextLink from "next/link";
import { Link as lin } from "../nav-bar-links";
import Link from "next/link";

export default function NavGroup({ name, links }: { name: string; links: lin[] }) {
	return (
		<div className="dropdown dropdown-hover">
			<div
				tabIndex={0}
				role="button"
				className="
					text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom
					transition-all duration-200 bg-gradient-to-r from-[#00ff7f] to-[#87CEEB]
					hover:bg-[length:100%_2px] focus:bg-[length:100%_4px] my-4 mx-2 whitespace-nowrap
				"
			>
				<Link href={links[0].href}>{name}</Link>
			</div>

			<ul
				tabIndex={-1}
				className="
					dropdown-content menu p-2 w-52
					bg-gradient-to-r from-white from-50% to-sky-200
					border-2 border-black z-50
				"
			>
				{links.map((link) => (
					<li key={link.href} className="my-1">
						<NavLink href={link.href}>{link.children}</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export function NavLink({
	href,
	children,
	onClick,
}: {
	href: string;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<NextLink
			className="
				w-full whitespace-nowrap p-0.5 h-8 text-center text-lg bg-[length:0%_2px] bg-no-repeat
				bg-left-bottom transition-all duration-200 bg-gradient-to-r from-[#00ff7f] to-[#87CEEB]
				hover:bg-[length:100%_2px] focus:bg-[length:100%_4px]
			"
			href={href}
			onClick={onClick}
		>
			{children}
		</NextLink>
	);
}
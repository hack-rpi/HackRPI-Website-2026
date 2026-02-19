import NextLink from "next/link";
import { Link as lin } from "../nav-bar-links";
import Link from "next/link";

export default function NavGroup({ name, links }: { name: string; links: lin[] }) {
	return (
		<div className="relative group mx-2 whitespace-nowrap text-lg xl:text-xl">
			{/* Trigger button */}
			<div
				tabIndex={0}
				role="button"
				className="text-lg xl:text-xl bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-slate-500 hover:bg-[length:100%_2px] focus:bg-[length:100%_4px]"
			>
				<Link href={links[0].href}>{name}</Link>
			</div>

			{/* Dropdown menu — hidden by default, shown on group hover */}
			<ul
				tabIndex={0}
				className="
					absolute top-full left-0
					hidden group-hover:block
					p-2 w-52 bg-slate-500 h-fit
					border-2 border-black
					translate-y-4 z-50
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
			className="w-full whitespace-nowrap p-0.5 h-8 text-center text-lg bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-200 bg-gradient-to-r from-[#e9bc59] to-[#d5345d] hover:bg-[length:100%_2px] focus:bg-[length:100%_4px]"
			href={href}
			onClick={onClick}
		>
			{children}
		</NextLink>
	);
}
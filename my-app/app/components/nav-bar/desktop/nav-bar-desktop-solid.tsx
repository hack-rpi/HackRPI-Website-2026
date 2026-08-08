import { NavGroup } from "../nav-bar-links";
// import logo from "@/public/Retro_HackRPI_Logo.png";
// import RegistrationButton from "@/components/themed-components/registration-header-link";

import Link from "next/link";
import { Link as lin } from "../nav-bar-links";

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      className="h-8 w-full bg-linear-to-r from-hackrpi-clouds-green to-hackrpi-clouds-blue bg-size-[0%_2px] bg-bottom-left bg-no-repeat p-0.5 text-center text-lg whitespace-nowrap transition-all duration-200 hover:bg-size-[100%_2px] focus:bg-size-[100%_4px]"
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function NavGroupComponent({ name, links }: { name: string; links: lin[] }) {
  return (
    <div className="dropdown-hover dropdown">
      <div
        role="link"
        className="mx-2 my-4 bg-linear-to-r from-hackrpi-clouds-green to-hackrpi-clouds-blue bg-size-[0%_2px] bg-bottom-left bg-no-repeat text-lg whitespace-nowrap transition-all duration-200 hover:bg-size-[100%_2px] focus:bg-size-[100%_4px] xl:text-xl"
      >
        <Link href={links[0].href}>{name}</Link>
      </div>

      <ul
        tabIndex={-1}
        className="dropdown-content menu z-50 w-52 border-2 border-black bg-linear-to-r from-white from-50% to-sky-200 p-2"
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

export default function DesktopNavBarSolid({ links }: { links: NavGroup[] }) {
  return (
    /*<div className="bg-gradient-to-r from-hackrpi-light-purple via-hackrpi-pink to-hackrpi-light-purple w-full h-16">*/
    <div className="h-16 w-full bg-linear-to-r from-sky-200 via-white to-sky-200 text-slate-800">
      <div
        className="z-50 flex h-full items-center justify-center border-b-2 border-black lg:justify-center"
        role="navigation"
      >
        <div className="mr-4 flex items-center justify-center">
          <Link href="/" className="w-fit whitespace-nowrap">
            {/* <NextImg alt="HackRPI Logo" aria-label="Home Page" src={logo} className="w-10 image-full" /> */}
          </Link>
        </div>
        {/* Uncomment when ready to add registration button back */}
        {/* <div className="min-w-fit lg:w-8/12 flex items-center justify-start"> */}
        <div className="flex min-w-fit items-center justify-start gap-10">
          {links.map((link) => (
            <NavGroupComponent key={link.name} name={link.name} links={link.links} />
          ))}

          <Link
            href="https://events.mlh.com/events/14390-hackrpi-2026"
            className="mx-2 bg-linear-to-r from-hackrpi-clouds-green to-hackrpi-clouds-blue bg-size-[0%_2px] bg-bottom-left bg-no-repeat text-lg whitespace-nowrap transition-all duration-200 hover:bg-size-[100%_2px] xl:text-xl"
            target="_blank"
          >
            Register Today!
          </Link>

          <Link
            href="/news"
            className="mx-2 bg-linear-to-r from-hackrpi-clouds-green to-hackrpi-clouds-blue bg-size-[0%_2px] bg-bottom-left bg-no-repeat text-lg whitespace-nowrap transition-all duration-200 hover:bg-size-[100%_2px] xl:text-xl"
            target="_blank"
          >
            News
          </Link>

          <Link
            href="/sponsorship"
            className="mx-2 bg-linear-to-r from-hackrpi-clouds-green to-hackrpi-clouds-blue bg-size-[0%_2px] bg-bottom-left bg-no-repeat text-lg whitespace-nowrap transition-all duration-200 hover:bg-size-[100%_2px] xl:text-xl"
            target="_blank"
          >
            Sponsor Us
          </Link>

          <Link
            href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
            className="mx-2 bg-linear-to-r from-hackrpi-clouds-green to-hackrpi-clouds-blue bg-size-[0%_2px] bg-bottom-left bg-no-repeat text-lg whitespace-nowrap transition-all duration-200 hover:bg-size-[100%_2px] xl:text-xl"
            target="_blank"
          >
            Code of Conduct
          </Link>

          <Link
            href="https://securelb.imodules.com/s/1225/lg22/form.aspx?sid=1225&gid=1&pgid=6795&cid=15861&dids=257&bledit=1&sort=1"
            className="mx-2 bg-linear-to-r from-hackrpi-clouds-green to-hackrpi-clouds-blue bg-size-[0%_2px] bg-bottom-left bg-no-repeat text-lg whitespace-nowrap transition-all duration-200 hover:bg-size-[100%_2px] xl:text-xl"
            target="_blank"
          >
            Give
          </Link>
        </div>
        <div className="ml-2">{/* <RegistrationButton className="w-auto" /> */}</div>
      </div>
    </div>
  );
}

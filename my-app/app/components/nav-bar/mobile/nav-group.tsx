import { Link } from "../nav-bar-links";
import { useState } from "react";
import NextLink from "next/link";

export default function NavGroup({
  name,
  links,
  onLinkClick,
}: {
  name: string;
  links: Link[];
  onLinkClick: () => void;
}) {
  const [clicked, setClicked] = useState(false);

  if (links.length === 1) {
    return (
      <NextLink
        href={links[0].href}
        target={links[0].new_tab ? "_blank" : undefined}
        onClick={onLinkClick}
        className="mobile-nav-button mb-2 w-11/12 bg-linear-to-r from-sky-500 to-hackrpi-clouds-green bg-size-[0%_4px] bg-bottom-left bg-no-repeat p-2 text-2xl whitespace-nowrap transition-all duration-200 hover:bg-size-[100%_4px]"
      >
        {name}
      </NextLink>
    );
  }

  return (
    <div
      className="mb-2 flex h-fit w-full flex-col items-center justify-start overflow-hidden"
      onClick={() => setClicked((prev) => !prev)}
    >
      <div
        className={`mobile-nav-button collapse-arrow relative z-5 flex h-12 w-11/12 items-center justify-between rounded-t pl-2 text-2xl ${
          clicked ? "bg-size-[100%_4px]" : "bg-size-[0%_4px]"
        } bg-linear-to-r from-sky-500 to-hackrpi-clouds-green bg-bottom-left bg-no-repeat transition-all duration-200 motion-safe:hover:bg-size-[100%_4px]`}
      >
        {name}
        <svg
          viewBox="0 0 256 256"
          id="Flat"
          xmlns="http://www.w3.org/2000/svg"
          className={`mr-2 h-auto w-6 ${
            clicked ? "rotate-0" : "rotate-180"
          } origin-center fill-sky-500 duration-200 motion-safe:transition-all`}
        >
          <path d="M128,188a11.96187,11.96187,0,0,1-8.48535-3.51465l-80-80a12.0001,12.0001,0,0,1,16.9707-16.9707L128,159.0293l71.51465-71.51465a12.0001,12.0001,0,0,1,16.9707,16.9707l-80,80A11.96187,11.96187,0,0,1,128,188Z" />
        </svg>
      </div>
      <div
        className={`mobile-nav-submenu flex w-11/12 flex-col overflow-hidden ${
          clicked ? "h-fit translate-y-0" : "h-0 -translate-y-full"
        } rounded-b transition-all duration-200`}
      >
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} onClick={onLinkClick}>
            {link.children}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

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
    <NextLink
      className="mobile-nav-sub-link w-full px-1 text-2xl transition-all"
      href={href}
      onClick={onClick}
    >
      {children}
    </NextLink>
  );
}

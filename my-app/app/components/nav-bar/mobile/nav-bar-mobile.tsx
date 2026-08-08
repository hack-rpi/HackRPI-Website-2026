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
      <div
        className="fixed top-0 z-50 flex h-18 w-screen items-center justify-center bg-linear-to-b from-purple-400/60 to-blue-800"
        style={{}}
      >
        <div className="flex w-1/3 items-center justify-start">
          <button
            onClick={() => setNavMenuOpen((prev) => !prev)}
            className="ml-8 h-8 w-10 text-4xl text-white"
          >
            <Image
              alt="Hamburger Menu"
              src="/menu-icon.svg"
              width={0}
              height={0}
              loading="eager"
              preload={true}
              className="h-auto w-auto"
            />
          </button>
        </div>
        <div className="flex w-2/3 items-center justify-center">
          <Link href="/" className="w-fit whitespace-nowrap">
            <Image
              alt="HackRPI Logo"
              aria-label="Home Page"
              src={logo}
              className="image-full w-fit -translate-x-2.5 -translate-y-px"
              loading="eager"
            />
          </Link>
        </div>
        <div className="flex w-1/3 items-center justify-center"></div>
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
        } z-20 h-full w-3/4 overflow-y-auto bg-hackrpi-clouds-dark-blue py-5 transition-all`}
      >
        <div className="flex h-full flex-col items-center justify-start">
          {links.map((link) => (
            <NavGroupComponent
              key={link.name}
              name={link.name}
              links={link.links}
              onLinkClick={() => setNavMenuOpen(false)}
            />
          ))}
        </div>
      </div>
      <MlhBanner src="/mlh-badges/mlh-trust-badge-2027-white.svg" />
    </nav>
  );
}

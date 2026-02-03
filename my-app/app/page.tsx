'use client'

import Image from "next/image";
import Sponsors from "@/app/components/sponsors/sponsors"
/* Only use desktop nav-bar for now for simplicity */
import NavBar from "@/app/components/nav-bar/nav-bar"
import Footer from "@/app/components/footer/footer"
import TitleComponent from "@/app/components/title-components/title"
import AboutUs from "@/app/components/about-us"
import FAQPage from "@/app/components/faq/faq"
import TeamComponent from "@/app/components/team/team"

export default function Home() {
  return (
		<>
		<NavBar />
		<div className="w-full">
			{/* Main page content*/}
			{ <TitleComponent /> }
			{ <AboutUs /> }
			{ <FAQPage /> }
			{ <Sponsors />}
			{ <TeamComponent /> }
			<div className="p-5">
				{ <Footer /> }
			</div>
		</div>
		</>
	);
}

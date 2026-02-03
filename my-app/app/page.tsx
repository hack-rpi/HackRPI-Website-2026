'use client'

import Image from "next/image";
import FAQPage from "@/app/components/faq/faq"
import Sponsors from "@/app/components/sponsors/sponsors"

export default function Home() {
  return (
		<>
			{/* <NavBar showOnScroll={true} /> */}
			<div className="flex flex-col items-start desktop:items-center justify-start w-full">
				{/*<SearchBar />  Search bar component */}
				<div className="w-full desktop:mx-8">
					{/* <TitleComponent /> */}
					{/* <AboutSection /> */}
					{/* <FAQPage /> */}
					<Sponsors />
					{/* <TeamComponent /> */}
				</div>
				{/* <Footer /> */}
				{/* Other components and elements */}
			</div>
		</>
	);
}

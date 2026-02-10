'use client'

import "./prizes.css";
import NavBar from "@/app/components/nav-bar/nav-bar";
import Footer from "@/app/components/footer/footer";

export default function Test() {
  return (
		<>
		<NavBar />
		<main className = "w-full gap-3 h-screen">
			<div className = "TitleSection">
				Prizes!
			</div>
			<div className = "prizeSection">
				<div id = "firstPrize">
					First Prize
				</div>
				<div id = "secondPrize">
					Second Prize
				</div>
			</div>
			<div className = "PrizeTracks">
				This section will have all of the prize tracks
				<div id = "track1">
					Track 1
				</div>
				<div id = "track2">
					Track 2
				</div>
				<div id = "track3">
					Track3
				</div>
			</div>
			<div className = "PrizeTracks2">
				<div id = "minor">
					For minor prize tracks
				</div>
				<div id = "mlh">
					For MLH prize tracks
				</div>
			</div>
			<div className="p-5 bg-white">
				<Footer />
			</div>
		</main>
		</>
	);
}

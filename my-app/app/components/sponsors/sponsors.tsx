
import SponsorCard from './sponsorCard';
import ShinyCard from '../shinyCard';
import sponsors from '../../../public/sponsors/sponsors.json';


export default function Sponsors() {
	return (
		<div 
		
			className="bg-[url('https://cdn.suwalls.com/wallpapers/nature/clouds-in-the-sky-21828-1920x1080.jpg')] h-auto p-5 gap-10 flex flex-col">
			idk what bg color this will be yet, so it's just black for now
			<div className="w-full h-[9vh] p-5 text-center text-2xl">
				This would not be possible without our sponsors; thank you all for your support!
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{sponsors.OBSIDIAN.map((sponsor, index) => (
					<SponsorCard
						key={index}
						name={sponsor.name}
						tier={"obsidian"}
						image={"/sponsors/sponsor_logos" + sponsor.logoPath}
						link={sponsor.url}
					/>
				))}
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{sponsors.GOLD.map((sponsor, index) => (
					<SponsorCard
						key={index}
						name={sponsor.name}
						tier={"gold"}
						image={"/sponsors/sponsor_logos" + sponsor.logoPath}
						link={sponsor.url}
					/>
				))}
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{sponsors.SILVER.map((sponsor, index) => (
					<SponsorCard
						key={index}
						name={sponsor.name}
						tier={"silver"}
						image={"/sponsors/sponsor_logos" + sponsor.logoPath}
						link={sponsor.url}
					/>
				))}
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{sponsors.BRONZE.map((sponsor, index) => (
					<SponsorCard
						key={index}
						name={sponsor.name}
						tier={"bronze"}
						image={"/sponsors/sponsor_logos/" + sponsor.logoPath}
						link={sponsor.url}
					/>
				))}
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				{/* <SponsorCard name="error" tier="invalid" image = "/sponsors/sponsor_logos/" /> */}
			</div>
			{/* <ShinyCard image="" theme=""/> */}
		</div>
	);

};
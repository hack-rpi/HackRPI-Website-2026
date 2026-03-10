
import SponsorCard from './sponsorCard';
import ShinyCard from '../shinyCard';

export default function Sponsors() {
	return (
		<div className="bg-black-500 h-auto p-5 gap-10 flex flex-col">
			idk what bg color this will be yet, so it's just black for now
			<div className="w-full h-[9vh] p-5 text-center text-2xl">
				This would not be possible without our sponsors; thank you all for your support!
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				<SponsorCard name="obsidian" tier="obsidian" image = "/OIP.jpg"  />
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				<SponsorCard name="gold" tier="gold" image = "" />
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				<SponsorCard name="silver" tier="silver" image = "" />
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				<SponsorCard name="bronze" tier="bronze" image = "" />
			</div>
			<div className = "flex flex-row justify-center flex-wrap gap-10">
				<SponsorCard name="error" tier="invalid" image = "" />
			</div>
			<ShinyCard image="" theme=""/>
		</div>
	);
};


import SponsorCard from './sponsorCard';
import ShinyCard from '../shinyCard';

export default function Sponsors() {
	return (
		<div className="bg-black-500 h-auto p-5 gap-10 flex flex-col">
			idk what bg color this will be yet, so it's just black for now
			<div className="w-full h-[9vh] p-5 text-center text-2xl">
				This would not be possible without our sponsors; thank you all for your support!
			</div>
			<SponsorCard name="obsidian" tier="obsidian" image = "/OIP.jpg"  />
			<SponsorCard name="gold" tier="gold" image = "" />
			<SponsorCard name="silver" tier="silver" image = "" />
			<SponsorCard name="bronze" tier="bronze" image = "" />
			<SponsorCard name="error" tier="invalid" image = "" />
			<ShinyCard image="" theme=""/>
		</div>
	);
};

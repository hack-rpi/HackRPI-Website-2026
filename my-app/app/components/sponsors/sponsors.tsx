
import SponsorCard from './sponsorCard';

export default function Sponsors() {
	return (
		<div className="bg-black-500 h-auto p-5">
			idk what bg color this will be yet, so it's just black for now
			<div className="w-full h-[9vh] p-5 text-center text-2xl">
				This would not be possible without our sponsors; thank you all for your support!
			</div>
			<SponsorCard name="obsidian" tier="obsidian" />
			<SponsorCard name="gold" tier="gold" />
			<SponsorCard name="silver" tier="silver" />
			<SponsorCard name="bronze" tier="bronze" />
			<SponsorCard name="error" tier="invalid"/>
		</div>
	);
};

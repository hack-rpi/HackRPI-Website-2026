
import SponsorCard from './sponsorCard';
import shinyCard from '../shinyCard';
import ShinyCard from '../shinyCard';

export default function Sponsors() {
	return (
		<div id="sponsors" className="bg-black-500 h-auto p-5">
			<div className="w-full mt-[10vh]"/>
			<div className="w-full h-[9vh] p-5 text-center text-2xl">
				This would not be possible without our sponsors; thank you all for your support!
			</div>
			<SponsorCard name="obsidian" tier="obsidian" />
			<SponsorCard name="gold" tier="gold" />
			<SponsorCard name="silver" tier="silver" />
			<SponsorCard name="bronze" tier="bronze" />
			<SponsorCard name="error" tier="invalid"/>
			<ShinyCard image="public/sponsors/Photon.png" theme=""/>
		</div>
	);
};

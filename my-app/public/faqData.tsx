// import RegistrationButton from "@/components/themed-components/registration-link"; // FIXME

type FAQ = {
	title: string;
	content: React.ReactNode;
};

const faqs: FAQ[] = [
	{
		title: "What/when/where is HackRPI?",
		content:
			<p>
				HackRPI takes place on __month__ _day_ and __day+1__, 2026, in the Darrin Communication Center
				at Rensselaer Polytechnic Institute.
				<br />
				Arrival and check-in takes place from 9-10 AM. Our opening ceremony starts at 10 AM, and hacking begins at 11am.
				<br />
				During hacking time, teams of 1-4 have 24 hours to build a project relating to our theme, In the Clouds.
				Teams will then present their projects, and the best projects win prizes!
				<br />
				Your projects must be on Devpost by 10 AM Sunday, and all coding must stop at 11 AM Sunday.
				<br />
				The event will end around 4 PM on Sunday.
			</p>
	},
	{
		title: "Is HackRPI free to attend?",
		content: "Yes! Thanks to our many wonderful sponsors, all food and swag are completely free for participants!",
	},
	{
		title: "How do I register?",
		content: (
			<div className="flex items-start md:items-center justify-start flex-col md:flex-row">
				<p className="pr-2">You can click here to register with Major League Hacking (MLH).</p>
				{/* <RegistrationButton /> // FIXME This is a custom button component will update later*/}
			</div>
		),
	},
	{
		title: "Who can participate? What if I'm a first-timer? What if I'm under 18?",
		content:
			<p>
				Everyone is welcome to participate!
				<br />
				Whether you are a hackathon veteran or this is your first hackathon, this is a great opportunity
				to learn, experiment with new technologies, and grow your skills.
				<br />Our team of experienced mentors
				is here to help you in every step of the way.
				<br />
				Students under 18 are welcome to attend, but are not allowed to stay overnight in the sleep rooms.
				<br />
				Students under the age of 17 must have an adult (21+) chaperone with them at all times during the event.
			</p>
	},
	{
		title: "Do I have to be an RPI student?",
		content:
			<p>
				No! HackRPI is open to everyone, students of all experience levels from all colleges and universities
				are welcome to attend.
				<br />
				Did you know that students from over 45 other colleges attended HackRPI?
			</p>
	},
	{
		title: "Does HackRPI provide travel reimbursement?",
		content: (
			<p>
				Unfortunately, we are unable to provide travel reimbursement at this time, however, we have sleep rooms on
				campus for students 18 and older, and we are more than happy to recommend local accommodations if you email us
				at{" "}
				<a href="mailto:hackrpi@rpi.edu" className="text-hackrpi-primary-blue underline">
					hackrpi@rpi.edu
				</a>
				.
			</p>
		),
	},
	{
		title: "What should I bring?",
		content: "Bring your team, your laptop, chargers, any hardware you need, and a good night's sleep!",
	},
	{
		title: "Is it okay if I am late to the event?",
		content:
			<p>
				Yes! You can arrive at any time during the event, but we recommend arriving before 11 AM on Saturday.
				<br />
				Remember, the later you are, the less time you have to work on your project!
			</p>
	},
	{
		title: "When are submissions due?",
		content:
			<p>
				All projects must be submitted to Devpost by 10 AM on Sunday.
				<br />
				You will be able to modify your submission until 11am. After 11an, no coding or changes to your project are allowed.
			</p>
	},
	{
		title: "How do I submit my project?",
		content:
			// eslint-disable-next-line
			'You will submit your project on Devpost. See our "Event Information" and "Resources" pages for more details.',
	},
	{
		title: "When and how will prizes be awarded?",
		content:
			<p>
				Prizes are announced at the closing ceremony, which will take place around 4 PM on Sunday.
				<br />
				Physical prizes will be distributed during the closing ceremony.
				<br />
				Winners of cash prizes will be contacted by our team after the event.
			</p>
	},
];

export default faqs

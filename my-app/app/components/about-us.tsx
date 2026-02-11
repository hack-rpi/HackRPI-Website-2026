export default function AboutUs() {
	return (
		<div className="w-full h-auto bg-gray-500 p-5 flex flex-col bg-gradient-to-b from-black to-sky-500 to-33%">
			<div className="w-full mt-[75vh]"></div>
			<div className="w-[75vh] h-[9vh] p-5 text-center text-2xl bg-white text-blue-400 mx-auto">
				About Us
			</div>
			<div className="w-[75vh] bg-white text-blue-400 p-5 mx-10 my-20">
				HackRPI 2026 is Rensselaer Polytechnic Institute's 13th annual intercollegiate hackathon
				hosted by students for students.
				Starting at noon on [WEEKDAY], [MONTH] [DAY], teams of 1-4 people have 24 hours to build
				and submit projects relating to our theme, <b>In the Clouds</b>. 
				After submitting their projects, participants demonstrate their projects
				in front of a panel of professors, industry professionals, and fellow students.
			</div>
			{/* TODO: Update the above paragraph's date, and update the below paragraph for the new theme. */}
			<div className="w-[75vh] bg-white text-blue-400 p-5 m-5 float-right clear-right ml-auto mr-10 my-10">
				In the Clouds: [PLACEHOLDER TEXT FROM HACKRPI 2025 AFTER]
				In a world where nostalgia meets innovation, our 12th annual hackathon, Retro vs Modern,
				invites creators to explore the contrasts and possibilities between the past and the future.
				Join us in shaping the future through a creative lens that honors the old while embracing the new.
			</div>
			<div className="w-[75vh] bg-white text-blue-400 p-5 m-5 my-10 mb-20 ml-40">
				Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs
				in New York's Tech Valley and beyond. All students from all schools are welcome to
				participate, regardless of their major or experience level. Whether you're a seasoned
				hacker or a first-time participant, HackRPI is the perfect opportunity to learn new
				skills, meet new people, and have fun!
			</div>
		</div>
	);
}

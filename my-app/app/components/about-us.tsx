export default function AboutUs() {
	return (
		<div className="w-full h-[135vh] bg-gray-500 p-5 flex flex-col bg-gradient-to-b from-black to-cyan-500 to-33%">
			<div className="w-full mt-[50vh]"></div>
			<div className="w-[75vh] h-[9vh] p-5 text-center text-2xl bg-white text-blue-400 mx-auto mb-[2vh]">
				About Us
			</div>
			<div className="w-[75vh] bg-white text-blue-400 p-5 m-5">
				HackRPI 2026 is Rensselaer Polytechnic Institute's 13th annual intercollegiate hackathon
				hosted by students for students.
				Starting at noon on Saturday, November 15th, teams of 1-4 people have 24 hours to build
				and submit projects relating to our theme, <b>In the Clouds</b>. 
				After submitting their projects, participants demonstrate their projects
				in front of a panel of professors, industry professionals, and fellow students.
			</div>
			<div className="w-[75vh] bg-white text-blue-400 p-5 m-5 float-right clear-right ml-auto">
				THEME INFORMATION
			</div>
			<div className="w-[75vh] bg-white text-blue-400 p-5 m-5">
				Our goal is to inspire and challenge innovators, creators, developers, and entrepreneurs
				in New York's Tech Valley and beyond. All students from all schools are welcome to
				participate, regardless of their major or experience level. Whether you're a seasoned
				hacker or a first-time participant, HackRPI is the perfect opportunity to learn new
				skills, meet new people, and have fun!
			</div>
		</div>
	);
}

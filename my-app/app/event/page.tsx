import { Metadata } from 'next';
import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/nav-bar/nav-bar";
import HackRPILink from '@/app/components/themed-components/hackrpi-link';

import "./event.css"
import Cover from './cover';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Event Information - HackRPI 2026',
  description:
    'Event information for HackRPI 2026',
};

export default function Event() {
  

  return (
		<> 
      <NavBar showOnScroll={true}/>
      <Cover/>

      <main className = "flex flex-col w-full">
        <div className="w-full h-auto bg-gradient-to-b from-purple-300 to-24% to-sky-500 flex flex-row text-white pt-10">
          <div className="w-[10%] flex flex-col items-center justify-center p-5">
            <h1>Need Help?</h1>
          </div>
          <div className="w-[45%] p-5">
            <h2>Mentoring Information</h2>
            Mentors will be available throughout HackRPI to provide invaluable guidance and
            assistance to participants. Whether you need help with coding, debugging, refining
            your project idea, or navigating the challenges of a hackathon, our experienced
            mentors are here to support you every step of the way. With their expertise, you'll
            be able to overcome obstacles, learn new skills, and maximize your hackathon experience.
            Don't hesitate to seek out their advice and make the most of the mentorship opportunities available at HackRPI.
          </div>
          <div className="w-[45%] p-5">
            <h2>Event Discord</h2>
            Join the HackRPI 2025 Discord server to stay connected and make the most of your hackathon experience!
            Have questions for the staff? Want to chat with other participants? Looking for a team?
            Join the conversation on Discord and get the support you need to succeed at HackRPI.
            <HackRPILink
              href="https://discord.gg/BkDVUmrufa"
              className="
                hover:bg-gradient-to-br
                hover:from-[#5865F2] hover:to-[#7289da]
                hover:bg-transparent hover:border-[#5865F2]
                w-20 h-20 my-2 flex items-center justify-center
              "
              target="_blank"
            >
              <Image src="/social/discord.svg" alt="Discord Logo" width={50} height={50} />
            </HackRPILink>
          </div>
        </div>

        <div className="w-full h-auto bg-gradient-to-b from-sky-500 to-[#00ff7f] text-white p-5 flex flex-col">
          <div className="w-full border-2 border-orange-500 p-[1em]">
            <h2 className="text-center">Project Submission and Judging</h2>
            <p className="text-md text-center">
              After coding ends at 11am on Sunday,
              present your project to our panel of industry professionals,
              professors, alumni, and fellow students. They'll evaluate your work based on these criteria:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Practicality & Utility Card */}
							<div className="
                group relative bg-gradient-to-br from-purple-500 to-sky-500
                border-2 border-hackrpi-pink/50 rounded-lg p-6
                transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-pink
              ">
								<div className="
                  bg-red-500 absolute -top-3 -right-3 w-12 h-12
                  rounded-full flex items-center justify-center text-2xl
                  group-hover:rotate-12 transition-transform duration-300
                ">
									🎯
								</div>
								<h3 className="font-bold text-xl text-white mb-3">Practicality & Utility</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									What problem do you want to solve? How applicable is your hack to problems we&apos;re facing today?
									Any future plans?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-pink to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Creativity Card */}
							<div className="
                group relative bg-gradient-to-br from-purple-500 to-sky-500
                border-2 border-hackrpi-light-purple/50 rounded-lg p-6
                transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-light-purple
              ">
								<div className="
                  absolute -top-3 -right-3 w-12 h-12
                  bg-red-500 rounded-full flex items-center justify-center
                  text-2xl group-hover:rotate-12 transition-transform duration-300
                ">
									💡
								</div>
								<h3 className="font-bold text-xl text-hackrpi-light-purple mb-3">Creativity</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									How original is your hack? Is this a novel idea or something that many people have come across?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-light-purple to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Technical Difficulty Card */}
              <div className="
                group relative bg-gradient-to-br from-purple-500 to-sky-500
                border-2 border-hackrpi-light-purple/50 rounded-lg p-6
                transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-light-purple
              ">								
                <div className="
                  absolute -top-3 -right-3 w-12 h-12
                  bg-blue-500 rounded-full flex items-center justify-center
                  text-2xl group-hover:rotate-12 transition-transform duration-300
                ">
									⚡
								</div>
								<h3 className="font-bold text-xl text-hackrpi-orange mb-3">Technical Difficulty</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									How technically challenging is it? Which technologies did you use?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-orange to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Effort Card */}
							<div className="
                group relative bg-gradient-to-br from-purple-500 to-sky-500
                border-2 border-hackrpi-light-purple/50 rounded-lg p-6
                transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-light-purple
              ">
								<div className="
                  absolute -top-3 -right-3 w-12 h-12
                  bg-red-500 rounded-full flex items-center justify-center
                  text-2xl group-hover:rotate-12 transition-transform duration-300
                ">
									💪
								</div>
								<h3 className="font-bold text-xl text-hackrpi-yellow mb-3">Effort</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									Did the team genuinely commit time and effort to this product?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-yellow to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* User Experience Card */}
							{/* <div className="group relative bg-gradient-to-br from-hackrpi-pink/20 to-hackrpi-pink/5 border-2 border-hackrpi-pink/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-pink">
								<div className="absolute -top-3 -right-3 w-12 h-12 bg-hackrpi-pink rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300">
									✨
								</div>
								<h3 className="font-bold text-xl text-hackrpi-pink mb-3">User Experience</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									What impression do you get from the hack? Does it provide for a smooth user experience?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-pink to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div> */}

							{/* Collaboration & Learning Card */}
							{/* <div className="group relative bg-gradient-to-br from-hackrpi-light-purple/20 to-hackrpi-light-purple/5 border-2 border-hackrpi-light-purple/50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-light-purple">
								<div className="absolute -top-3 -right-3 w-12 h-12 bg-hackrpi-light-purple rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300">
									🤝
								</div>
								<h3 className="font-bold text-xl text-hackrpi-light-purple mb-3">Collaboration & Learning</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									Did the team work well together and split up work? Did they learn from the experience?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-hackrpi-light-purple to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div> */}
						</div>
          </div>
          <div className="w-full border-2 border-orange-500 p-[1em]">
            SUBMISSION INFO
          </div>
        </div>
        
      </main>
      <div className="p-5 bg-white">
        <Footer />
      </div>
		</>
	);
}

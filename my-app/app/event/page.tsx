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
      <NavBar showOnScroll={true} />
      <Cover/>

      <main className = "flex flex-col w-full">
        <div className="w-full h-auto bg-linear-to-b from-purple-300 to-24% to-sky-500 flex flex-row text-white pt-10">
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
                hover:bg-linear-to-br
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

        <div className="
          w-full h-auto
          bg-linear-to-b from-sky-500 from-75% to-hackrpi-clouds-green
          text-white p-5 flex flex-col items-center
        ">
          <h1 className="text-center">Project Submission and Judging</h1>
          <div className="w-full max-w-7xl p-[1em]">
            <h2 className="text-center">Judging Criteria</h2>
            <p className="text-md text-center pb-5">
              After coding ends at 11am on Sunday,
              present your project to our panel of industry professionals,
              professors, alumni, and fellow students. They'll evaluate your work based on these criteria:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Practicality & Utility Card */}
							<div className="
                group relative bg-linear-to-br from-purple-500 to-sky-500
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
								<div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-hackrpi-pink to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Creativity Card */}
							<div className="
                group relative bg-linear-to-br from-purple-500 to-sky-500
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
								<div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-hackrpi-light-purple to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Technical Difficulty Card */}
              <div className="
                group relative bg-linear-to-br from-purple-500 to-sky-500
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
								<div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-hackrpi-orange to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Effort Card */}
							<div className="
                group relative bg-linear-to-br from-purple-500 to-sky-500
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
								<div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-hackrpi-yellow to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* User Experience Card */}
							<div className="
                group relative bg-linear-to-br from-purple-500 to-sky-500
                border-2 border-hackrpi-light-purple/50 rounded-lg p-6
                transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-light-purple
              ">
								<div className="
                  absolute -top-3 -right-3 w-12 h-12
                  bg-red-500 rounded-full flex items-center justify-center
                  text-2xl group-hover:rotate-12 transition-transform duration-300
                ">
                  ✨
								</div>
								<h3 className="font-bold text-xl text-hackrpi-pink mb-3">User Experience</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									What impression do you get from the hack? Does it provide for a smooth user experience?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-hackrpi-pink to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>

							{/* Collaboration & Learning Card */}
							<div className="
                group relative bg-linear-to-br from-purple-500 to-sky-500
                border-2 border-hackrpi-light-purple/50 rounded-lg p-6
                transform transition-all duration-300 hover:scale-105 hover:border-hackrpi-light-purple
              ">
								<div className="
                  absolute -top-3 -right-3 w-12 h-12
                  bg-red-500 rounded-full flex items-center justify-center
                  text-2xl group-hover:rotate-12 transition-transform duration-300
                ">
                  🤝
								</div>
								<h3 className="font-bold text-xl text-hackrpi-light-purple mb-3">Collaboration & Learning</h3>
								<p className="text-gray-300 text-sm leading-relaxed">
									Did the team work well together and split up work? Did they learn from the experience?
								</p>
								<div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-hackrpi-light-purple to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
							</div>
						</div>
          </div>

          {/* Project Submission Section */}
          <div className="w-full max-w-7xl p-[1em]">
						<div className="text-center mb-12">
							<h2>Project Submission</h2>
							<p>Submit your project through Devpost and showcase your amazing work!</p>
						</div>

						{/* Submission Timeline */}
						<div className="w-full max-w-400 mx-auto mb-12 px-2 sm:px-4">
							<div className="relative">
								{/* Timeline Line */}
								<div className="absolute left-6 sm:left-8 lg:left-10 top-0 bottom-0 w-1 bg-linear-to-b from-hackrpi-orange via-hackrpi-pink to-hackrpi-light-purple"></div>

								{/* Timeline Steps */}
								<div className="space-y-8">
									{/* Step 1 */}
									<div className="relative flex items-start">
										<div className="
											relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
											bg-blue-500 rounded-full flex items-center justify-center
											text-xl md:text-2xl lg:text-3xl shadow-lg shadow-blue-500/50
										">
											1
										</div>
										<div className="
											ml-6 md:ml-8 lg:ml-10 bg-linear-to-r from-blue-500/10 to-transparent
											border-l-4 border-blue-500 p-5 md:p-6 lg:p-8 rounded-r-lg flex-1
										">
											<h3 className="text-2xl md:text-3xl font-bold text-hackrpi-orange mb-2">Create Your Account</h3>
											<p className="text-white md:text-lg">
												<a
													href="https://secure.devpost.com/users/register?ref_content=signup_global_nav&ref_feature=signup&ref_medium=button"
													target="_blank"
													rel="noopener noreferrer"
													className="text-purple-500 hover:text-pink-500 underline transition-colors"
												>
													Sign up for a Devpost account
												</a>{" "}
												to get started with your submission.
											</p>
										</div>
									</div>

									{/* Step 2 */}
									<div className="relative flex items-start">
										<div className="
											relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
											bg-green-500 rounded-full flex items-center justify-center
											text-xl md:text-2xl lg:text-3xl shadow-lg shadow-green-500/50
										">
											2
										</div>
										<div className="
											ml-6 md:ml-8 lg:ml-10 bg-linear-to-r from-green-500/10 to-transparent
											border-l-4 border-green-500 p-5 md:p-6 lg:p-8 rounded-r-lg flex-1
										">
											<h3 className="text-2xl md:text-3xl font-bold text-hackrpi-pink mb-2">Prepare Your Submission</h3>
											<p className="text-white mb-3 md:text-lg">Include these essential elements:</p>
											<ul className="space-y-2 text-sm md:text-base lg:text-lg text-white">
												<li className="flex items-center">
													<span className="mr-2">▸</span>
													Project title and description
												</li>
												<li className="flex items-center">
													<span className="mr-2">▸</span>
													Demo video showcasing your hack
												</li>
												<li className="flex items-center">
													<span className="mr-2">▸</span>
													Technologies used and challenges faced
												</li>
												<li className="flex items-center">
													<span className="mr-2">▸</span>
													Team member information
												</li>
											</ul>
										</div>
									</div>

									{/* Step 3 */}
									<div className="relative flex items-start">
										<div className="
											relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
											bg-yellow-500 rounded-full flex items-center justify-center
											text-xl md:text-2xl lg:text-3xl shadow-lg shadow-yellow-500/50
										">
											3
										</div>
										<div className="
											ml-6 md:ml-8 lg:ml-10 bg-linear-to-r from-yellow-500/10 to-transparent
											border-l-4 border-yellow-500 p-5 md:p-6 lg:p-8 rounded-r-lg flex-1
										">
											<h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
												Submit Before Deadline
											</h3>
											<div className="space-y-2 text-white md:text-lg">
												<p className="flex items-center">
													<span className="text-white font-bold mr-2">📅</span>
													Submit by <span className="font-bold text-white bg-yellow-500 mx-0.5 px-0.5">9:00 AM Sunday</span>
												</p>
												<p className="flex items-center">
													<span className="text-white font-bold mr-2">✏️</span>
													Edit until <span className="font-bold text-white bg-red-500 mx-0.5 px-0.5">11:00 AM Sunday</span>
												</p>
											</div>
										</div>
									</div>

									{/* Step 4 */}
									<div className="relative flex items-start">
										<div className="
											relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
											bg-red-500 rounded-full flex items-center justify-center
											text-xl md:text-2xl lg:text-3xl shadow-lg shadow-red-500/50
										">
											4
										</div>
										<div className="
											ml-6 md:ml-8 lg:ml-10 bg-linear-to-r from-red-500/10 to-transparent
											border-l-4 border-red-500 p-5 md:p-6 lg:p-8 rounded-r-lg flex-1
										">
											<h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
												Present Your Project
											</h3>
											<p className="text-white md:text-lg">
												After <span className="font-bold text-white bg-red-500 mx-0.5 px-0.5">11:00 AM Sunday</span>,
												no changes are allowed. Be ready to give a live demo and explain your project to the
												judges!
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* CTA Button */}
						<div className="text-center">
							<HackRPILink
								href="https://hackrpi2025.devpost.com/"
								className="
									inline-block w-full sm:w-auto text-3xl sm:text-4xl md:text-5xl px-10
									sm:px-14 md:px-20 py-6 sm:py-8 md:py-10 bg-linear-to-r
									from-orange-500 to-pink-500
									hover:from-purple-500 hover:to-blue-500
									transform hover:scale-105 md:hover:scale-110
									transition-all duration-300 shadow-xl hover:shadow-2xl
									ring-4 ring-hackrpi-yellow/60 border-hackrpi-yellow/70
									text-white hover:text-white drop-shadow-md rounded-xl"
								target="_blank"
							>
								SUBMIT ON DEVPOST
							</HackRPILink>
							<p className="mt-4 text-sm text-white">
								Ready to showcase your amazing project? Click above to start your submission!
							</p>
						</div>
					</div>
        </div>
        
      </main>
      <div className="p-5 bg-white">
        <Footer />
      </div>
		</>
	);
}

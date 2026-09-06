"use client";

import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/nav-bar/nav-bar";

import "./event.css";
import Cover from "./cover";
import Link from "next/link";

import Lenis from "lenis";
import { useEffect } from "react";

export default function Event() {
  useEffect(() => {
    // lenis scrolling
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <>
      <NavBar showOnScroll={false} />
      <Cover />

      <main className="flex w-full flex-col">
        {/* Mentoring information */}
        <div className="flex h-auto w-full flex-col bg-linear-to-b from-purple-300 to-sky-500 to-24% pt-10 text-white desktop:flex-row">
          <div className="flex w-full flex-col items-center justify-center p-5 desktop:w-[10%]">
            <h1>Need Help?</h1>
          </div>
          <div className="flex w-full flex-col items-center p-5 px-10 desktop:w-[45%] desktop:items-start">
            <h2>Mentoring Information</h2>
            Mentors will be available throughout HackRPI to provide invaluable guidance and
            assistance to participants. Whether you need help with coding, debugging, refining your
            project idea, or navigating the challenges of a hackathon, our experienced mentors are
            here to support you every step of the way. With their expertise, you&apos;ll be able to
            overcome obstacles, learn new skills, and maximize your hackathon experience. Don&apos;t
            hesitate to seek out their advice and make the most of the mentorship opportunities
            available at HackRPI.
          </div>
          <div className="flex w-full flex-col items-center p-5 px-10 desktop:w-[45%] desktop:items-start">
            <h2>Event Discord</h2>
            {/*Join the HackRPI 2025 Discord server to stay connected and make the most of your hackathon experience!
            Have questions for the staff? Want to chat with other participants? Looking for a team?
            Join the conversation on Discord and get the support you need to succeed at HackRPI.*/}{" "}
            Stay on the lookout - link coming soon!
            {/*<HackRPILink
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
            </HackRPILink>*/}
          </div>
        </div>

        {/* Project submission and judging */}
        <div className="flex h-auto w-full flex-col items-center bg-linear-to-b from-sky-500 from-80% to-hackrpi-clouds-green p-5 pb-20 text-white">
          <h1 className="text-center">Project Submission and Judging</h1>
          <div className="w-full max-w-7xl p-[1em]">
            <h2 className="text-center">Judging Criteria</h2>
            <p className="text-md pb-5 text-center">
              After coding ends at 11am on Sunday, present your project to our panel of industry
              professionals, professors, alumni, and fellow students. They&apos;ll evaluate your
              work based on these criteria:
            </p>

            <div className="grid grid-cols-1 gap-6 desktop:grid-cols-3 md:grid-cols-2">
              {/* Practicality & Utility Card */}
              <div className="group border-hackrpi-pink/50 hover:border-hackrpi-pink relative transform rounded-lg border-2 bg-linear-to-br from-purple-500 to-sky-500 p-6 transition-all duration-300 hover:scale-105">
                <div className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-2xl transition-transform duration-300 group-hover:rotate-12">
                  🎯
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">Practicality & Utility</h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  What problem do you want to solve? What impression do you get from the hack? Does
                  it provide for a smooth user experience? Any future plans?
                </p>
                <div className="from-hackrpi-pink absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-linear-to-r to-transparent transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>

              {/* Creativity Card */}
              <div className="group border-hackrpi-light-purple/50 hover:border-hackrpi-light-purple relative transform rounded-lg border-2 bg-linear-to-br from-purple-500 to-sky-500 p-6 transition-all duration-300 hover:scale-105">
                <div className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-2xl transition-transform duration-300 group-hover:rotate-12">
                  💡
                </div>
                <h3 className="text-hackrpi-light-purple mb-3 text-xl font-bold">Creativity</h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  How original is your hack? Is this a novel idea or something that many people came
                  across? How difficult is the problem you are solving?
                </p>
                <div className="from-hackrpi-light-purple absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-linear-to-r to-transparent transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>

              {/* Technical Difficulty Card */}
              <div className="group border-hackrpi-light-purple/50 hover:border-hackrpi-light-purple relative transform rounded-lg border-2 bg-linear-to-br from-purple-500 to-sky-500 p-6 transition-all duration-300 hover:scale-105">
                <div className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-2xl transition-transform duration-300 group-hover:rotate-12">
                  ⚡
                </div>
                <h3 className="text-hackrpi-orange mb-3 text-xl font-bold">Technical Difficulty</h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  How technically challenging was your project? How complex is your design? What
                  different technologies did you use?
                </p>
                <div className="from-hackrpi-orange absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-linear-to-r to-transparent transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>

              {/* Effort Card */}
              <div className="group border-hackrpi-light-purple/50 hover:border-hackrpi-light-purple relative transform rounded-lg border-2 bg-linear-to-br from-purple-500 to-sky-500 p-6 transition-all duration-300 hover:scale-105">
                <div className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-2xl transition-transform duration-300 group-hover:rotate-12">
                  💪
                </div>
                <h3 className="text-hackrpi-yellow mb-3 text-xl font-bold">Effort</h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  Did you genuinely commit time and effort to this product? Did your team work
                  together and all contribute? Did you learn from the experience?
                </p>
                <div className="from-hackrpi-yellow absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-linear-to-r to-transparent transition-transform duration-300 group-hover:scale-x-100"></div>
              </div>
            </div>
          </div>

          {/* Project Submission Section */}
          <div className="w-full max-w-7xl p-[1em]">
            <div className="mb-12 text-center">
              <h2>Project Submission</h2>
              <p>Submit your project through Devpost and showcase your amazing work!</p>
            </div>

            {/* Submission Timeline */}
            <div className="mx-auto mb-12 w-full max-w-400 desktop:px-5">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-0 bottom-0 left-6 w-1 bg-linear-to-b from-blue-500 via-green-500 to-red-500 desktop:left-10 sm:left-8"></div>

                {/* Timeline Steps */}
                <div className="space-y-8">
                  {/* Step 1 */}
                  <div className="relative flex items-start">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-xl shadow-lg shadow-blue-500/50 desktop:h-20 desktop:w-20 desktop:text-3xl md:h-16 md:w-16 md:text-2xl">
                      1
                    </div>
                    <div className="ml-6 flex-1 rounded-r-lg border-l-4 border-blue-500 bg-linear-to-r from-white/10 to-transparent p-5 desktop:ml-10 desktop:p-8 md:ml-8 md:p-6">
                      <h3 className="text-hackrpi-orange mb-2 text-2xl font-bold md:text-3xl">
                        Create Your Account
                      </h3>
                      <p className="text-white md:text-lg">
                        <Link
                          href="https://secure.devpost.com/users/register?ref_content=signup_global_nav&ref_feature=signup&ref_medium=button"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-500 underline transition-colors hover:text-pink-500"
                        >
                          Sign up for a Devpost account
                        </Link>{" "}
                        to get started with your submission.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-xl shadow-lg shadow-green-500/50 desktop:h-20 desktop:w-20 desktop:text-3xl md:h-16 md:w-16 md:text-2xl">
                      2
                    </div>
                    <div className="ml-6 flex-1 rounded-r-lg border-l-4 border-green-500 bg-linear-to-r from-white/10 to-transparent p-5 desktop:ml-10 desktop:p-8 md:ml-8 md:p-6">
                      <h3 className="text-hackrpi-pink mb-2 text-2xl font-bold md:text-3xl">
                        Prepare Your Submission
                      </h3>
                      <p className="mb-3 text-sm text-white md:text-lg">
                        Include these essential elements:
                      </p>
                      <ul className="space-y-2 text-sm text-white desktop:text-lg md:text-base">
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
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-xl shadow-lg shadow-yellow-500/50 desktop:h-20 desktop:w-20 desktop:text-3xl md:h-16 md:w-16 md:text-2xl">
                      3
                    </div>
                    <div className="ml-6 flex-1 rounded-r-lg border-l-4 border-yellow-500 bg-linear-to-r from-white/10 to-transparent p-5 desktop:ml-10 desktop:p-8 md:ml-8 md:p-6">
                      <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                        Submit Before Deadline
                      </h3>
                      <div className="space-y-2 text-white md:text-lg">
                        <div className="mb-5 flex items-center text-[1.2rem]">
                          <div className="w-[50%] desktop:w-auto">Submit by</div>
                          <div className="w-[50%] bg-orange-400 px-1 text-right font-bold text-white desktop:ml-2 desktop:w-auto">
                            9:00 AM Sunday
                          </div>
                        </div>
                        <div className="mb-5 flex items-center text-[1.2rem]">
                          <div className="w-[50%] desktop:w-auto">Edit until</div>
                          <div className="w-[50%] bg-red-500 px-1 text-right font-bold text-white desktop:ml-2 desktop:w-auto">
                            11:00 AM Sunday
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex items-start">
                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-xl shadow-lg shadow-red-500/50 desktop:h-20 desktop:w-20 desktop:text-3xl md:h-16 md:w-16 md:text-2xl">
                      4
                    </div>
                    <div className="ml-6 flex-1 rounded-r-lg border-l-4 border-red-500 bg-linear-to-r from-white/10 to-transparent p-5 desktop:ml-10 desktop:p-8 md:ml-8 md:p-6">
                      <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                        Present Your Project
                      </h3>
                      <p className="text-white md:text-lg">
                        After{" "}
                        <span className="mx-0.5 bg-red-500 px-0.5 font-bold text-white">
                          11:00 AM Sunday
                        </span>
                        , no changes are allowed. Be ready to give a live demo and explain your
                        project to the judges!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {/*<div className="text-center">
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
						</div>*/}
          </div>
        </div>
      </main>
      <footer className="bg-white">
        <div
          className="h-[10vh] w-full bg-hackrpi-clouds-green"
          style={{ clipPath: "ellipse(70% 0% at 50% 0%)" }}
          id="footer-ellipse"
        ></div>
        <Footer />
      </footer>
    </>
  );
}


import QnA from "@/app/components/faq/qna";
import faqs from "@/app/data/faqData";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Cloud from "./cloud";
// import RegistrationButton from "@/components/themed-components/registration-link"; // FIXME

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function FAQPage() {

  useGSAP(() => {
		const sectionPin = document.querySelector("#faq");
		gsap.timeline({
			scrollTrigger: {
				trigger: sectionPin,
				scrub: 0.5,
				start: "top 60%",
				end: "bottom 0%",
			},
		})
		.fromTo('#cloud1_faq', {
      x: -10,
    }, {
			x: innerWidth/6,
		}, 0)
		.fromTo('#cloud2_faq', {
      x: innerWidth/6,
    }, {
			x: -5,
		}, 0);
  });

  return (
    <div id="faq" className="w-[full] h-auto p-5 flex flex-col bg-sky-500">
      <div className="w-full mt-[5vh]"/>
      
      <div className="flex flex-row justify-center mt-5">
        <div className="w-[100vh] flex flex-col items-center lg:items-startlg:mt-0 h-full lg:ml-4 p-2 bg-yellow-500 bg-opacity-100 m-2 hover:bg-opacity-100 rounded-xl">
          {/* Registration Banner */}
          <div
            data-testid="register-now-banner"
            className="w-full text-white text-2xl h-fit overflow-hidden whitespace-nowrap font-bold lg:mt-16\\ pl-1"
          >
            REGISTER NOW!
          </div>
          {/* Event Info Box */}
          <div className="w-full bg-yellow-500 text-white h-fit flex flex-col items-start justify-start font-modern">
            <div className="w-full h-2 bg-white mt-4" />

            <h2 className="flex items-center text-3xl xs:text-4xl font-semibold pl-2 mt-2 text-nowrap">
              When &amp; Where{" "}
              <svg
                className="fill-white ml-4 rotate-180 md:rotate-90 lg:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 11 11"
              >
                <path d="M11 1C11 0.447715 10.5523 -3.74211e-07 10 4.72575e-08L1 -1.63477e-07C0.447715 -1.63477e-07 2.8711e-07 0.447715 2.8711e-07 1C2.8711e-07 1.55228 0.447715 2 1 2L9 2L9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10L11 1ZM1.70711 10.7071L10.7071 1.70711L9.29289 0.292893L0.292893 9.29289L1.70711 10.7071Z" />
              </svg>
            </h2>

            <div className="w-11/12 flex flex-col md:flex-row lg:flex-col items-start justify-center md:justify-start md:items-center lg:items-start lg:justify-center">
              <div className="pl-2 text-md xs:text-xl mb-4 md:mb-8 lg:mb-4 mt-2 w-1/2 md:min-w-80">
                <p data-testid="event-date" className="w-fit text-nowrap">
                  November 7-8, 2025
                </p>
                <p data-testid="event-location" className="w-fit text-nowrap">
                  Rensselaer Polytechnic Institute
                </p>
                <p data-testid="event-venue" className="w-fit text-nowrap">
                  Darrin Communications Center
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Cloud id="cloud1_faq" text={[
        "Arrival and check-in takes place from 9-10 AM Saturday.",
        "Our opening ceremony starts at 10 AM, and hacking begins at 11am.",
        "During hacking time, teams of 1-4 have 24 hours to build a project relating to our theme, In the Clouds.",
        "Teams will then present their projects, and the best projects win prizes!",
        "Your projects must be on Devpost by 10 AM Sunday, and all coding must stop at 11 AM Sunday.",
        "The event will end around 4 PM on Sunday."
      ]}/>

      <Cloud id="cloud2_faq" text={[
          "Everyone is welcome to participate in HackRPI!",
          "Participation is free for all students, including high school students and students not in Rensselaer Polytechnic Institute.",
          "You do not need to be an expert or a hackathon veteran; our team of mentors will guide you along the way.",
          "Note that students under 18 are welcome to attend, but are not allowed to stay overnight in the sleep rooms.",
          "Additionally, students under the age of 17 must have an adult (21+) chaperone with them at all times during the event.",
          "To register, click here to register with Major League Hacking."
        ]}/>

      <h1 className="w-[20vh] mx-5 p-2 text-2xl text-center bg-linear-to-b from-white to-sky-200 text-sky-500">FAQ</h1>

      <section className="w-[125vh] p-5" aria-label="Frequently asked questions">
        {faqs.map((f) => (
					<QnA key={f.title} title={f.title} content={f.content} />
        ))}
      </section>
    </div>
  );
}

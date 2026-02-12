
import { Metadata } from 'next';
import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/nav-bar/nav-bar";

export const metadata: Metadata = {
  title: 'Event Information - HackRPI 2026',
  description:
    'Event information for HackRPI 2026',
};

export default function Event() {
  return (
		<>
      <NavBar />
      <main className = "flex flex-col w-full">
        <div className="w-full h-auto bg-gray-500 p-5">
          <div className="p-5 text-xl">
            Event Information
          </div>

          {/* Div to separate left and right sections */}
          <div className = "h-[90%] flex p-[1em] justify-around locationInfo">

            {/* Left */}
            <div className="w-[40%] border-2 border-orange-500 flex flex-col justify-around p-[1em]">
              {/* Top  */}
              <div className="border-2 border-cyan-500 p-[1em]">
                Address:{" "}
								<a
									href="https://maps.google.com/?q=Darrin+Communications+Center+51+College+Ave+Troy+NY+12180"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									Darrin Communications Center, Troy, NY 12180
								</a>

                <div className="w-full h-96">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src="https://maps.google.com/?q=Darrin+Communications+Center+51+College+Ave+Troy+NY+12180&output=embed"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Bottom */}
              <div className="border-2 border-cyan-500 p-[1em]">
                <div className="text-2xl mt-10">
                  <h3 className="font-bold text-4xl font-neutral">Free Parking</h3>
                  <p className="">
                    Parking is available at North Hall Parking Lot, 2-minute walk to Darrin Communications Center
                  </p>
                  <p className="">
                    Parking Address:{" "}
                    <a
                      href="https://maps.google.com/?q=North+Lot+Troy+NY+12180"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      North Lot, Troy, NY 12180
                    </a>
                  </p>
                </div>
                <div className="mt-4 text-2xl">
                  <p>
                    Be sure to check-in with our organizers at the organizing team table in the front of the DCC.
                    Participants will be given a wrist band at check-in which will grant access to food, and activities.
                    Check-in is open throughout the event!
                  </p>
                </div>
              </div>
            </div>

            {/* Right  */}
            <div className="w-[40%] border-2 border-orange-500 flex flex-col justify-around p-[1em]">
              {/* Top  */}
              <div className="border-2 border-cyan-500 p-[1em]">
                Buttons
              </div>
              {/* Bottom */}
              <div className="border-2 border-cyan-500 p-[1em]">
                Map
              </div>
            </div>

          </div>
        </div>

        <div className="w-full h-[30vh] bg-gray-400 p-5">
          "Need help" section
        </div>

        <div className="w-full h-[40vh] bg-green-200 text-black p-5 flex flex-col">
          <div className="w-full border-2 border-orange-500 p-[1em]">
            JUDGING INFO
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

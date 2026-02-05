
import { Metadata } from 'next';
import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/nav-bar/nav-bar";

export const metadata: Metadata = {
  title: 'Event Information - HackRPI 2026',
  description:
    'Event information for HackRPI 2026',
};

export default function Test() {
  return (
		<>
      <NavBar />
      <main className = "flex flex-col w-full">
        <div className="w-full h-[75vh] bg-gray-500 p-5">
          Event Information
          <div className = "h-[90%] flex p-[1em] justify-around locationInfo">
            <div className="w-[40%] border-2 border-orange-500 flex flex-col justify-around p-[1em]">
              <div className="border-2 border-cyan-500 p-[1em]">
                Event top left
              </div>
              <div className="border-2 border-cyan-500 p-[1em]">
                Event bottom left
              </div>
            </div>
            <div className="w-[40%] border-2 border-orange-500 flex flex-col justify-around p-[1em]">
              <div className="border-2 border-cyan-500 p-[1em]">
                Buttons
              </div>
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
      <Footer/>
		</>
	);
}

'use client'

import "./event.css"

export default function Test() {
  return (
		<>
      <main className = "flex flex-col gap-3 h-screen">
        <div className = "tempNavBar">
          NAVBAR COMPONENT
        </div>

        <div className="tempHeader">
          Event Information
          HEADER COMPONENT - should probably be like a function, where the title
          is modifiable
        </div>

        CSS obviously not done
        <div className="border-2 border-red-500 flex p-[1em] justify-around locationInfo">
          <div className="border-2 border-orange-500 flex flex-col p-[1em]">
            <div className="border-2 border-cyan-500 p-[1em]">
              Event top left
            </div>
            <div className="border-2 border-cyan-500 p-[1em]">
              Event bottom left
            </div>
          </div>
          <div className="border-2 border-pink-500 flex flex-col p-[1em]">
            <div className="border-2 border-cyan-500 p-[1em]">
              Buttons
            </div>
            <div className="border-2 border-cyan-500 p-[1em]">
              Map
            </div>
          </div>
        </div>

        <div className="border-2 border-green-500 mentorInfo">
          NEED HELP? section. idk how to format this one now
        </div>

        <div className="border-2 border-blue-500 judgingInfo">
          JUDGING INFO
        </div>

        <div className="border-2 border-cyan-500 submissionInfo">
          SUBMISSION INFO
        </div>
        

        <div className="tempFooter">
          FOOTER COMPONENT
        </div>
      </main>
		</>
	);
}

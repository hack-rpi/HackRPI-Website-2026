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

        <div className="locationInfo">

        </div>

        <div className="mentorInfo">

        </div>

        <div className="judgingInfo">

        </div>

        <div className="submissionInfo">
          
        </div>
        

        <div className="tempFooter">
          FOOTER COMPONENT
        </div>
      </main>
		</>
	);
}

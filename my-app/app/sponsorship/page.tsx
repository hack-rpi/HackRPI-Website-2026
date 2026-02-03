'use client'

import "./sponsorship.css"

export default function Test() {
  return (
		<>
      <div className = "tempNavBar">
        NAVBAR COMPONENT
      </div>

      <div className="tempHeader">
        Sponsor Us!
        HEADER COMPONENT - should probably be like a function, where the title
        is modifiable
      </div>

      <div className="flex items-center gap-4 justify-center tiersList">
        <div className="tier bronze">
          Bronze $750
        </div>
        <div className="tier silver">
          Silver $1000
        </div>
        <div className="tier gold">
          Gold $2500
        </div>
        <div className="tier obsidian">
          Obsidian $5000
        </div>
      </div>

      <div className="flex items-center gap-4 justify-center tier-table">
        <div className="tier-cell bronze">
          Benefits in Bronze
        </div>
        <div className="tier-cell silver">
          Benefits in Silver
        </div>
        <div className="tier-cell gold">
          Benefits in Gold
        </div>
        <div className="tier-cell obsidian">
          Benefits in Obsidian
        </div>
      </div>

      {/* list of existing benefits */}
      <div className="benefits">
        Benefits section
        SUGGESTION: Have a table instead of a list
      </div>

      <div className="tempFooter">
        FOOTER COMPONENT
      </div>
		</>
	);
}

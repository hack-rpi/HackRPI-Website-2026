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
        HEADER COMPONENT
      </div>

      <div className="flex flex-row justify-center tiersList">
        PRICE LEVELS
        <div className="tier bronze">
          Bronze 750
        </div>
        <div className="tier silver">
          Silver 1000
        </div>
        <div className="tier gold">
          Gold 2500
        </div>
        <div className="tier obsidian">
          Obsidian 5000
        </div>
      </div>
      
      <div className="flex flex-row justify-center tier-table">
        TABLE FOR COMPARISON BETWEEN UNITS
        <div className="tier-cell bronze">
          Bronze 750
        </div>
        <div className="tier-cell silver">
          Silver 1000
        </div>
        <div className="tier-cell gold">
          Gold 2500
        </div>
        <div className="tier-cell obsidian">
          Obsidian 5000
        </div>
      </div>

      {/* list of existing benefits */}
      <div className="benefits">
        Benefits section, probably unordered list
      </div>

      <div className="tempFooter">
        FOOTER COMPONENT
      </div>
		</>
	);
}

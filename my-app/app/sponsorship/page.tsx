'use client'

import "./sponsorship.css"

export default function Test() {
  return (
		<>
      <main className = "flex flex-col gap-3 h-screen">
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
            <ul>
              <li>One</li>
              <li>Two</li>
              <li>Three</li>
            </ul>
          </div>
          <div className="tier-cell silver">
            Benefits in Silver
            <ul>
              <li>One</li>
              <li>Two</li>
              <li>Three</li>
            </ul>
          </div>
          <div className="tier-cell gold">
            Benefits in Gold
            <ul>
              <li>One</li>
              <li>Two</li>
              <li>Three</li>
            </ul>
          </div>
          <div className="tier-cell obsidian">
            Benefits in Obsidian
            <ul>
              <li>One</li>
              <li>Two</li>
              <li>Three</li>
            </ul>
          </div>
        </div>

        <div className="disclaimer border-solid border-2">
          tailored package dislaimer
        </div>

        <div className="flex items-center gap-4 justify-center benefits">
          <table>
            <thead>
              <tr>
                <td>Benefits</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Test a</td>
                <td>Test b</td>
                <td>Test c</td>
                <td>Test d</td>
              </tr>
              <tr>
                <td>Test a</td>
                <td>Test b</td>
                <td>Test c</td>
                <td>Test d</td>
              </tr>
              <tr>
                <td>Test a</td>
                <td>Test b</td>
                <td>Test c</td>
                <td>Test d</td>
              </tr>
              <tr>
                <td>Test a</td>
                <td>Test b</td>
                <td>Test c</td>
                <td>Test d</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="tempFooter">
          FOOTER COMPONENT
        </div>
      </main>
		</>
	);
}

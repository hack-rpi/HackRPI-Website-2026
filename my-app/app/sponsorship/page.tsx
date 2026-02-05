'use client'

import "./sponsorship.css"
import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/nav-bar/nav-bar";

export default function Test() {
  return (
		<>  
      <NavBar />
      <main className = "flex flex-col w-full">
        <div className="w-full h-[50vh] bg-gray-500 p-5">
          Sponsor Us!
          <div className = "h-[90%] flex p-[1em] justify-around">
            <div className="w-[20%] text-center border-2 border-red-500 bronze">
              Bronze $750
              <ul className="text-left p-5">
                Benefits:
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
              </ul>
            </div>
            <div className="w-[20%] text-center border-2 border-red-500 bronze">
              Silver $1000
              <ul className="text-left p-5">
                Benefits:
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
              </ul>
            </div>
            <div className="w-[20%] text-center border-2 border-red-500 bronze">
              Gold $2500
              <ul className="text-left p-5">
                Benefits:
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
              </ul>
            </div>
            <div className="w-[20%] text-center border-2 border-red-500 bronze">
              Obsidian $5000
              <ul className="text-left p-5">
                Benefits:
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full h-[25vh] bg-yellow-100 text-black p-5">
          tailored package dislaimer
        </div>

        <div className="flex items-center gap-4 justify-center benefits">
          <table>
            <thead>
              <tr>
                <td>Benefits - unformatted so far</td>
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

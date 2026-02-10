
import { Metadata } from 'next';
import Footer from "@/app/components/footer/footer";
import NavBar from "@/app/components/nav-bar/nav-bar";

export const metadata: Metadata = {
  title: 'Sponsor Us! - HackRPI 2026',
  description:
    'This is the sponsorship page for HackRPI 2026. Please consider doing so!',
};

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
          tailored package disclaimer
        </div>

        <div className="w-full h-[50vh] bg-blue-400 text-black p-5">
          Benefits Explained
          <table className="w-full border-2 border-blue-500">
            <tbody className="h-[25vh] border-2 border-blue-500">
              <tr className="border-2 border-blue-500">
                <td>Test a</td>
                <td>Test b</td>
                <td>Test c</td>
                <td>Test d</td>
              </tr>
              <tr className="border-2 border-blue-500">
                <td>Test a</td>
                <td>Test b</td>
                <td>Test c</td>
                <td>Test d</td>
              </tr>
              <tr className="border-2 border-blue-500">
                <td>Test a</td>
                <td>Test b</td>
                <td>Test c</td>
                <td>Test d</td>
              </tr>
              <tr className="border-2 border-blue-500">
                <td>Test a</td>
                <td>Test b</td>
                <td>Test c</td>
                <td>Test d</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <div className="p-5 bg-white">
        <Footer />
      </div>
		</>
	);
}

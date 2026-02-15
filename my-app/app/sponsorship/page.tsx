
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
        <div className="w-full h-[9vh] p-5 text-center">
          Sponsor us!
        </div>
        <div className="w-full h-[50vh] bg-gray-500 p-5">
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

        <div className="w-full h-auto bg-sky-500 text-black p-5 text-center flex justify-center">
          <div className="w-[90vh] bg-white p-5 m-10">
            <h2>We understand that standard sponsorship tiers may not suit all organizations.</h2>
            <h2>Please contact <a href="mailto:hackrpi@rpi.edu" className="text-blue-500 ">hackrpi@rpi.edu</a> if you want to develop a tailored sponsorship package.</h2>
          </div>
        </div>

        <div className="w-full h-auto bg-blue-400 text-black p-5">
          <table className="w-full border-2 border-blue-500">
            <tbody className="h-[25vh] border-2 border-blue-500">
              <tr className="border-2 border-blue-500">
                <td className = "p-5">
                  <h3>Logo on T-Shirt</h3>
                  <p>Your company logo will be printed on the free shirts we give out.</p>
                  <p>Higher tiers increase the size of the logo.</p>
                </td>
                <td className = "p-5">
                  <h3>Logo on Website</h3>
                  <p>Your company logo will be included on our website.</p>
                </td>
              </tr>
              <tr className="border-2 border-blue-500">
                <td className = "p-5">
                  <h3>Distribute Company Swag</h3>
                  <p>Bring merchandise to your booth.</p>
                  <p>Alternatively we can have some at the check in desk to hand out.</p>
                </td>
                <td className = "p-5">
                  <h3>Company Flier in Event Folder</h3>
                  <p>We'll include your flier in the event folder handed out to all participants at check in.</p>
                </td>
              </tr>
              <tr className="border-2 border-blue-500">
                <td className = "p-5">
                  <h3>Social Media Advertising</h3>
                  <p>Featured on 2 sponsor posts for our social media sites (Instagram, LinkedIn).</p>
                </td>
                <td className = "p-5">
                  <h3>Company Judges</h3>
                  <p>Opportunity to send a company representative to serve as a judge for the main hackathon event (in-person).</p>
                </td>
              </tr>
              <tr className="border-2 border-blue-500">
                <td className = "p-5">
                  <h3>Resume Book</h3>
                  <p>Your company will be included on the list we send out participant resumes to (after the event in mid-November).</p>
                  <p>In Gold tier or above, your company will be included on the list we send out participant resumes to (before the event in early September).</p>
                </td>
                <td className = "p-5">
                  <h3>Host Fireside Chat</h3>
                  <p>Company informational session during the main event hackathon.</p>
                  <p>Participants usually attend to take breaks from their work, perfect time to learn about your company and any job openings.</p>
                </td>
              </tr>
              <tr className="border-2 border-blue-500">
                <td className = "p-5">
                  <h3>Host a Workshop</h3>
                  <p>Opportunity to host a workshop relating to one or more of your company's products for any interested students from Rensselaer.</p>
                  <p>This can occur before as a separate HackRPI event or during the main hackathon.</p>
                </td>
                <td className = "p-5">
                  <h3>Promotional Mail to Hackers</h3>
                  <p>Your company will be featured on the mail we send out to all hackers signed up before the main event.</p>
                </td>
              </tr>
              <tr className="border-2 border-blue-500">
                <td className = "p-5">
                  <h3>Priority Booth Placement</h3>
                  <p>Your booth/table will be closer to the entrance and area where the majority of participants are.</p>
                </td>
                <td className = "p-5">
                  <h3>Opening Ceremony Demo</h3>
                  <p>During our opening ceremony, we'll have a short slot for you to feature your company/product as a sponsor of HackRPI.</p>
                </td>
              </tr>
              <tr className="border-2 border-blue-500">
                <td className = "p-5">
                  <h3>Optional Table Upgrade</h3>
                  <p>We provide a table but will accomodate if you want to bring a custom booth/multiple table setup.</p>
                </td>
                <td className = "p-5">
                </td>
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

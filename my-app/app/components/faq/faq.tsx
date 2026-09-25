"use client";

import { ReactNode, Children, useState } from "react";

interface CarouselProps {
  children: ReactNode[];
}
const CARDS = [
  { id: 1, title: 'What is HackRPI?', body: 'HackRPI is a 24-hour hackathon where teams of 1-4 come together to create tech projects from scratch. Students design, build, and present software and/or hardware solutions based on our theme, In The Clouds, with the best projects earning big prizes.', 
    color: 'bg-zinc-800' },
  { id: 2, title: 'When is HackRPI?', body: 'HackRPI 2026 will take place on Sat. November 7th and Sun. November 8th. Arrival and check-in takes place from 9-10 AM. Our opening ceremony starts at 10 AM, and hacking begins at 11 AM. All projects must be on Devpost by 9 AM Sunday, and all coding must stop at 11 AM Sunday. Afterwards, teams will present their projects, and the event will conclude around 3 PM on the 8th. We are excited to see you there!', 
    color: 'bg-zinc-800' },
  { id: 3, title: 'Where is HackRPI?', body: 'HackRPI will take place at Rensselaer Polytechnic Institute, in the Darrin Communication Center (DCC). Darrin Communications Center, 51 College Ave, Troy, NY 12180. See our event information page for more details.', 
    color: 'bg-zinc-800' },
  { id: 4, title: 'Who can attend HackRPI?', body: 'HackRPI is open to all college and university students. We also welcome high school students and participants in early-career programs, including recent graduates up to 3 years out of college.', 
    color: 'bg-zinc-800' },
  { id: 5, title: 'Is HackRPI free to attend?', body: 'Yes! Additionally, thanks to our many wonderful sponsors, all food and swag are completely free for participants!', 
    color: 'bg-zinc-800' },
  { id: 6, title: 'How do I register?', body: 'You can click here to register with Major League Hacking (MLH)', 
    color: 'bg-zinc-800' },
  { id: 8, title: "I'm under 18, can I still participate?", body: 'Students under 18 are welcome to attend, but are not allowed to stay overnight in the sleep rooms. Students under the age of 17 must have an adult (21+) chaperone with them at all times during the event.', 
    color: 'bg-zinc-800' },
  { id: 9, title: 'Do I have to be an RPI student?', body: 'No! HackRPI is open to students of all experience levels, and students from all colleges and universities are welcome to attend. Did you know that students from over 25 other colleges attended HackRPI 2025?!', 
    color: 'bg-zinc-800' },
  { id: 10, title: 'Does HackRPI provide travel reimbursement?', body: 'Unfortunately, we are unable to provide travel reimbursement at this time, however, we have sleep rooms on campus for students 18 and older, and we are more than happy to recommend local accommodations if you email us at hackrpi@rpi.edu.', 
    color: 'bg-zinc-800' },
  { id: 11, title: 'What should I bring?', body: "Bring your team, your laptop, chargers, any hardware you need, and a good night's sleep!", 
    color: 'bg-zinc-800' },
  { id: 12, title: 'What is the theme?', body: "The theme for 2026's HackRPI is In The Clouds. Our 13th annual hackathon invites creatives to surge to new heights and take on what was once thought impossible. Whether elevating existing technologies to new extremes or creating something never thought of, shoot for the moon!", 
    color: 'bg-zinc-800' },
  { id: 13, title: 'Is it okay if I am late to the event?', body: "Yes! You can arrive at any time during the event, but we recommend arriving before 11 AM on Saturday. Remember, the later you are, the less time you have to work on your project!", 
    color: 'bg-zinc-800' },
  { id: 14, title: 'When are submissions due?', body: 'All projects MUST be submitted to Devpost by 9 AM on Sunday. You will be able to modify your submission until 11 AM. After 11 AM, no coding or changes to your project are allowed.', 
    color: 'bg-zinc-800' },
  { id: 15, title: 'How do I submit my project?', body: 'You must submit your project on Devpost. See our "Event Information" and "Resources" pages for more details.', 
    color: 'bg-zinc-800' },
  { id: 16, title: 'When and how will prizes be awarded?', body: 'Prizes are announced at the closing ceremony, which will take place around 3 PM on Sunday. Physical prizes will be distributed during the closing ceremony. Winners of cash prizes will be contacted by our team after the event.', 
    color: 'bg-zinc-800' },
];

export default function Carousel({ children }: CarouselProps) {

  return (
      <div className="flex mx-auto flex-wrap justify-evenly">
          {Children.map(children, (child) => (
            <div className="w-9/30 min-w-[150px] my-10">
              {child} 
            </div>
          ))}
      </div>
  );
}
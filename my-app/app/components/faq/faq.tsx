'use client';

import { useRef, useState, useEffect } from 'react';

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
  { id: 7, title: 'Who can participate?', body: 'All college, university, or high school students (see next question) are welcome to participate! Whether you are a hackathon veteran or this is your first hackathon, this is a great opportunity to learn, experiment with new technologies, and grow your skills. Our team of experienced mentors is here to help you in every step of the way, and we have workshops designed to introduce you to new skills and technologies you may want to use for your project.', 
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

export default function StackedCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = container.children;
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < children.length; i++) {
        const childRect = children[i].getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
      setActiveIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 50);

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative flex h-auto md:h-screen w-full items-center justify-center bg-zinc-950 overflow-hidden py-32 md:py-0">
  <h2 className="absolute top-16 md:top-10 left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-bold tracking-wider text-white/90 uppercase font-mono z-50">FAQ</h2>
      <div
        ref={containerRef}
        // Increased container track height slightly to prevent clipping 3D bounding transforms
        className="flex h-135 items-center overflow-x-scroll pb-10 pt-10 px-[50vw] -ml-20 scrollbar-none snap-x snap-mandatory gap-20 select-none"
        style={{ perspective: '1200px' }}
      >
        {CARDS.map((card, index) => {
          const isCentered = index === activeIndex;
          const offset = index - activeIndex;

          return (
            /* 1. STATIC TRACKING SLOT */
            <div
              key={card.id}
              className="w-40 h-115 shrink-0 snap-center relative flex items-center justify-center"
            >
              {/* 2. VISUAL 3D CARD */}
              <div
                className="absolute w-72 h-115 p-6 flex flex-col justify-between text-white transition-all duration-300 ease-out cursor-pointer origin-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isCentered
                    ? 'rotateY(0deg) scale(1.05) translateZ(120px) translateX(0px)'
                    : `rotateY(-40deg) rotateX(-40deg) scale(0.85) translateZ(-40px) translateX(${offset < 0 ? '70px' : '-110px'})`,
                  zIndex: isCentered ? 100 : 50 - Math.abs(offset),
                }}
              >
                {/* Glassmorphism Background Shell */}
                <div 
                  className="absolute inset-0 bg-white/2 backdrop-blur-md border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] pointer-events-none" 
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                  }}
                />

                {/* Content Panel */}
                <div 
                  style={{ transform: 'translateZ(45px)' }} 
                  className="z-10 flex flex-col h-full justify-start text-left pointer-events-auto"
                >
                  <span className="text-xs font-mono tracking-widest text-white/30 block mb-1">
                    {String(card.id).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-white/90 uppercase border-b border-white/5 pb-2 mb-3 leading-snug">
                    {card.title}
                  </h3>
                  {/* Removed max-height block restraints to let text stream through completely */}
                  <p className="text-sm text-white/60 font-normal leading-relaxed wrap-break-word">
                    {card.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 w-[85vw] md:w-auto px-4 md:px-0 text-sm text-center text-white/40 hover:text-white/80 transition-colors duration-200 font-mono tracking-wide z-50 whitespace-normal md:whitespace-nowrap">Feel free to contact us with any other questions at <a href="mailto:hackrpi@rpi.edu" className="underline">hackrpi@rpi.edu</a>!</p>
    </div>
  );
}
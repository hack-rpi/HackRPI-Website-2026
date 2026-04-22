"use client";

import "@/app/globals.css";
import React, { use, useEffect } from "react";
import useMouseLogic from "./mouse";
import next from "next";
import NavBar from "../components/nav-bar/nav-bar";
import Footer from "../components/footer/footer";
import SponsorCard from "./sponsorCard";
import Lenis from "lenis";
import Link from "next/link";

const tw = {
	container: "box-border desktop:px-[30px] py-0 flex flex-row justify-center m-7",
	stackText: "box-border p-5 flex flex-col w-full justify-center",

	neumorphic: "bg-purple-800 rounded-[15px]",
	sponsorCard: "w-[20vw] h-[60vh] m-5 box-border flex",
	centerText: "text-center flex flex-col items-center justify-center",

	clickable: "transition-transform duration-300 active:duration-100 active:scale-[0.98]",

	benefitRow: "transition whitespace-nowrap hover:scale-[1.05] active:scale-[0.98] duration-300",
	benefitAvailable: "opacity-50",
	benefitContainer: "grid grid-cols-3 w-full items-center my-[3px]",

	light: "var(--color-purple-500)",
	shadow: "var(--color-purple-400)",
} as const;

var listItems = {
	"Logo on T-Shirt": {
		'bronze': "small",
		'silver': "small",
		'gold': "medium",
		'obsidian': "large",

		'silverpromoter': "Medium sized logo",
		'goldpromoter': "Large size logo",
	},
	"Logo on Website": {
		'bronze': true,
		'silver': true,
		'gold': true,
		'obsidian': true,
	},
	"Distribute Company Swag": {
		'bronze': true,
		'silver': true,
		'gold': true,
		'obsidian': true,
	},
	"Company Flier in Event Folder": {
		'bronze': true,
		'silver': true,
		'gold': true,
		'obsidian': true,
	},
	"Social Media Advertising": {
		'bronze': false,
		'silver': true,
		'gold': true,
		'obsidian': true,
	},
	"Company Judges": {
		'bronze': false,
		'silver': true,
		'gold': true,
		'obsidian': true,
	},
	"Resume Book": {
		'bronze': false,
		'silver': "after event",
		'gold': "before event",
		'obsidian': "before event",

		'silverpromoter': "Or distribute before event",
	},
	"Host Fireside Chat": {
		'bronze': false,
		'silver': false,
		'gold': true,
		'obsidian': true,
	},
	"Host a Workshop": {
		'bronze': false,
		'silver': false,
		'gold': true,
		'obsidian': true,
	},
	"Promotional Mail to Hackers": {
		'bronze': false,
		'silver': false,
		'gold': false,
		'obsidian': true,
	},
	"Priority Booth Placement": {
		'bronze': false,
		'silver': false,
		'gold': false,
		'obsidian': true,
	},
	"Opening Ceremony Demo": {
		'bronze': false,
		'silver': false,
		'gold': false,
		'obsidian': true,
	},
	"Optional Table Upgrade": {
		'bronze': false,
		'silver': false,
		'gold': false,
		'obsidian': true,
	}
}

var themes = {
	'default': {
		bg: '#e0e0e0', //background
		light: '#ffffff',
		shadow: '#a6a6a6',

		text: '#e0e0e0',
		text2: '#e0e0e0',
		text3: 'rgba(0,0,0,0.2)',
		accent: ''
	},
	'bronze': {
		fourth: '#e0e0e0',
		second: '#DF7373',
		bg: '#DA5552',
		fifth: '#CC444B',
		third: '#472836'


		// second: '#D58936',
		// third: '#A44200',
		// fourth: '#69140E',
		// fifth: '#3C1518'
	},
	'silver': {
		bg: '#e0e0e0',
		second: '#81726A',
		third: '#68534D',
		fourth: '#004E64',
		fifth: '#042A2B'
	},
	'gold': {
		bg: '#e0e0e0',
		second: '#B6C8A9',
		third: '#fca311',
		fourth: '#14213d',
		fifth: '#000000'
	},
	'obsidian': {
		bg: '#e0e0e0',
		second: '#D4CDF4',
		third: '#7353BA',
		fourth: '#2F195F',
		fifth: '#0F1020'
	},
} as any;

function SponsorUsPage() {
	const { getPosition } = useMouseLogic();
	var isMobileLayout = false;
	var viewingCurrentTier = 'bronze';

	function calculateShadows() {

		Array.from(document.querySelectorAll('[data-neumorphic="true"]')).forEach((el) => {
			let element = el as HTMLElement;
			// element.style.boxShadow = '20px 20px 60px #bebebe, -20px -20px 60px #ffffff';

			const rect = element.getBoundingClientRect();

			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			let { x, y } = getPosition();
			if (isMobileLayout){
				x = 0;
				y = 0;
			};
			const dx = centerX - x;
			const dy = centerY - y;

			const size = Math.max(rect.width, rect.height);
			const scale = size * 0.01; // adjust as needed

			const len = Math.hypot(dx, dy) || 1;
			const offX = (dx / len) * scale;
			const offY = (dy / len) * scale;

			// ${offX}px ${offY}px ${scale * 2}px rgba(0,0,0,0.2),
			// ${-offX}px ${-offY}px ${scale * 2}px rgba(255,255,255,0.9)

			element.style.boxShadow = `
				${offX}px ${offY}px ${scale * 2}px ${tw.shadow},
				${-offX}px ${-offY}px ${scale * 2}px ${tw.light}
			`;
		});
	}

	function getSizeOfChildren(parentElement: HTMLElement){
		let children = parentElement.children;
		if (children.length === 0) return 0;
		
		let firstChild = children[0].getBoundingClientRect();
		let lastChild = children[children.length - 1].getBoundingClientRect();
		
		return lastChild.right - firstChild.left;
	}

	function mobileLayout(){
		if (window.innerWidth > window.innerHeight){
			isMobileLayout = false;
			let container1 = document.getElementById('container1')!;
			container1.style.flexDirection = '';

			Array.from(container1.children).forEach((child) => {
				let childElement = child as HTMLElement;
				childElement.style.width = '';
				childElement.style.height = '';
				childElement.style.padding = '';
				childElement.style.margin = '';
			});

		}else{
			isMobileLayout = true;
			let container1 = document.getElementById('container1')!;
			container1.style.flexDirection = 'column';

			Array.from(container1.children).forEach((child) => {
				let childElement = child as HTMLElement;
				childElement.style.width = '100%';
				childElement.style.height = 'auto';
				childElement.style.padding = '7px';
				childElement.style.margin = '5px 0';
			});
		}
	}

	function updateBenefits(tier: string){
		changeTheme(tier);

		document.getElementById('container2')!.scrollIntoView({
			behavior: 'smooth',
			block: 'center'      // Options: 'start', 'center', 'end', or 'nearest'
		});

		viewingCurrentTier = tier;
		let benefitsDiv = document.getElementById('benefits')!;
		let currentBenefits = [];
		let potentialBenefits = [];

		const benefitCurrent = `${tw.benefitRow} text-[1.25em] leading-[140%] text-slate-100`;
		const benefitAvailable = `${tw.benefitRow} ${tw.benefitAvailable} text-[1.25em] leading-[140%] text-slate-100`;
		const benefitArrow = "justify-self-center text-[1.25em] leading-[140%] text-slate-100";

		if (isMobileLayout || tier == 'obsidian'){
			benefitsDiv.innerHTML = `<h3 class="text-slate-100 text-[1.25em] desktop:text-[1.75em] my-2.5">${tier.charAt(0).toUpperCase() + tier.slice(1)}</h3>`;
			for (const [name, tiers] of Object.entries(listItems)) {
				let p = document.createElement('p');
				p.textContent = name;
				p.onclick = function(){scrollDocs(name)};

				p.className = `my-[3px] ${benefitCurrent}`;
				let tierValue = tiers[tier as keyof typeof tiers];
				if(tierValue != false){
					if(tierValue !== true){
						p.textContent+= ': ' + tierValue;
					}
					currentBenefits.push(p);
				}else{
					p.className = `my-[3px] ${benefitAvailable}`;
					potentialBenefits.push(p);
				}
			}
		}else{
			let nextTier = '';
			if (tier == "bronze")
				nextTier = "silver";
			else if (tier == "silver")
				nextTier = "gold";
			else if (tier == "gold")
				nextTier = "obsidian";
			
			benefitsDiv.innerHTML = '';
			let titleBenefitContainer = document.createElement('div');
			titleBenefitContainer.className = tw.benefitContainer;
			let firstTier = document.createElement('h3');
			firstTier.innerHTML = tier.charAt(0).toUpperCase() + tier.slice(1);
			firstTier.className = "justify-self-center text-slate-100 text-[1.75em] my-[10px]";

			let arrow = document.createElement('span');
			arrow.innerHTML = '&rarr;';
			arrow.className = `justify-self-center text-[1.25em] leading-[140%] text-slate-100`;

			let secondTier = document.createElement('h3');
			secondTier.innerHTML = nextTier.charAt(0).toUpperCase() + nextTier.slice(1);
			secondTier.className = "justify-self-center text-slate-100 text-[1.75em] my-[10px]";

			titleBenefitContainer.appendChild(firstTier);
			titleBenefitContainer.appendChild(arrow);
			titleBenefitContainer.appendChild(secondTier);
			benefitsDiv.appendChild(titleBenefitContainer);
			
			for (const [name, tiers] of Object.entries(listItems)) {
				let benefitContainer = document.createElement('div');
				benefitContainer.className = tw.benefitContainer;
				let nextTierNote = null;
				let p = document.createElement('p');
				p.textContent = name;
				benefitContainer.onclick = function(){scrollDocs(name)};

				p.className = `justify-self-center ${benefitCurrent}`;
				let tierValue = tiers[tier as keyof typeof tiers];
				if(tierValue != false){
					if(tierValue !== true){
						p.textContent+= ': ' + tierValue;
						
						let nextValue = tiers[nextTier as keyof typeof tiers];
						if (nextTier!= 'obsidian' && nextTier != null && nextValue != false && nextValue != tierValue){
							let nextTier = document.createElement('p');
							nextTier.className = `justify-self-center ${benefitAvailable}`;
							
							let promoter = tiers[tier+'promoter' as keyof typeof tiers] as string;
							nextTier.textContent = promoter;
							nextTierNote = nextTier;
						}
					}
					benefitContainer.appendChild(p);
					if(nextTierNote){
						let arrow = document.createElement('span');
						arrow.innerHTML = '&rarr;';
						arrow.className = benefitArrow;

						benefitContainer.appendChild(arrow);
						benefitContainer.appendChild(nextTierNote);
					}
					currentBenefits.push(benefitContainer);
				}else{
					p.className = `justify-self-center ${benefitAvailable}`;
					benefitContainer.appendChild(p);
					potentialBenefits.push(benefitContainer);

					let nextValue = tiers[nextTier as keyof typeof tiers];
					if(tier != 'obsidian' && nextValue){
						let arrow = document.createElement('span');
						arrow.innerHTML = '&rarr;';
						arrow.className = benefitArrow;

						benefitContainer.appendChild(arrow);

						let p = document.createElement('p');
						p.className = `justify-self-center ${benefitCurrent}`;
						p.textContent+= name;
						benefitContainer.appendChild(p);
					}
				}
			}
		}

		for(let benefit of currentBenefits){
			benefitsDiv.appendChild(benefit);
		}
		for(let benefit of potentialBenefits){
			benefitsDiv.appendChild(benefit);
		}
	}

	function changeTheme(theme: any){
		return;
		let root = document.documentElement;

		root.style.setProperty('--bg', themes[theme].bg);
		root.style.setProperty('--light', themes[theme].light);
		root.style.setProperty('--shadow', themes[theme].shadow);

		root.style.setProperty('--accent', themes[theme].accent);
		root.style.setProperty('--text', themes[theme].text);
		root.style.setProperty('--text2', themes[theme].text2);
		root.style.setProperty('--text3', themes[theme].text3);

		// console.log(themes['bronze'])
		// console.log(themes[theme].bg)
		// const value = getComputedStyle(root).getPropertyValue('--bg');
		// console.log(value);
	}

	function scrollDocs(item:string){
		let container = document.getElementById('docText');
		let justFound = false;
		Array.from(container!.children).forEach((child) => {
			let childElement = child as HTMLElement;
			if (childElement.innerHTML == item){
				justFound = true;
				childElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center'      // Options: 'start', 'center', 'end', or 'nearest'
				});
			}else{
				if (childElement.tagName == 'H3') justFound = false;
				if (!justFound){
					childElement.style.animation = "none";
					void childElement.offsetWidth;
					childElement.style.animation = "tempBlur 4s ease 0s 1 normal";

					justFound = false
				}
			}
		});

	}

	function load(){
		var size1 = getSizeOfChildren(document.getElementById('container1')!);
		document.getElementById('container2')!.style.width = size1 + 'px';
		document.getElementById('container3')!.style.width = size1 + 'px';
		document.getElementById('container4')!.style.width = size1 + 'px';
		mobileLayout();
		calculateShadows();
		updateBenefits(viewingCurrentTier);
	}

	useEffect(() => {
		load();
		window.addEventListener('resize', load);
		
		window.addEventListener('mousemove', calculateShadows);
		window.addEventListener('scroll', calculateShadows);

		// lenis scrolling section
		const lenis = new Lenis({
			smoothWheel: true,
			duration: 1.2,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);

	return (<>
		<NavBar showOnScroll={false} variant={1}/>
		<main className="w-full bg-hackrpi-clouds-dark-blue pt-[8vh]">	
			{/* <div className='container' style={{marginTop: '100px'}}></div> */}
			<div className={`${tw.container} flex-col`}>
				<div className={`${tw.neumorphic} text-white px-5 py-2 desktop:py-5 text-center items-center text-md desktop:text-xl`} data-neumorphic="true">
					Click the buttons to see the benefits!
				</div>
			</div>
			<div id='container1' className={`${tw.container} text-slate-100`} style={{}}>
				{/* <div className={`${tw.clickable} ${tw.neumorphic} ${tw.sponsorCard} ${tw.centerText}`} data-neumorphic="true" onClick={function(){updateBenefits('bronze')}} style={{}}>
					<h1 className="text-[2em]">Bronze</h1>
					<h2 className="text-[1.75em]">750</h2>
				</div>
				<div className={`${tw.clickable} ${tw.neumorphic} ${tw.sponsorCard} ${tw.centerText}`} data-neumorphic="true" onClick={function(){updateBenefits('silver')}} style={{}}>
					<h1 className="text-[2em]">Silver</h1>
					<h2 className="text-[1.75em]">1500</h2>
				</div>
				<div className={`${tw.clickable} ${tw.neumorphic} ${tw.sponsorCard} ${tw.centerText}`} data-neumorphic="true" onClick={function(){updateBenefits('gold')}} style={{}}>
					<h1 className="text-[2em]">Gold</h1>
					<h2 className="text-[1.75em]">2500</h2>
				</div>
				<div className={`${tw.clickable} ${tw.neumorphic} ${tw.sponsorCard} ${tw.centerText}`} data-neumorphic="true" onClick={function(){updateBenefits('obsidian')}} style={{}}>
					<h1 className="text-[2em]">Obsidian</h1>
					<h2 className="text-[1.75em]">5000</h2>
				</div> */}

				<div onClick={function(){updateBenefits('bronze')}}>
					<SponsorCard tier="Bronze" amount="750" className={`${tw.clickable}`}/>
				</div>
				<div onClick={function(){updateBenefits('silver')}}>
					<SponsorCard tier="Silver" amount="1500" className={`${tw.clickable}`}/>
				</div>
				<div onClick={function(){updateBenefits('gold')}}>
					<SponsorCard tier="Gold" amount="2500" className={`${tw.clickable}`}/>
				</div>
				<div onClick={function(){updateBenefits('obsidian')}}>
					<SponsorCard tier="Obsidian" amount="5000" className={`${tw.clickable}`}/>
				</div>
			</div>

			<div className={tw.container}>
				<div id='container2' className={`${tw.neumorphic} ${tw.centerText} ${tw.container}`} data-neumorphic="true" style={{}}>
					<div id='benefits' className={tw.stackText} style={{}}>
						<h3 className="text-slate-100 text-[1.75em] my-2.5">LOADING</h3>
					</div>
				</div>
			</div>

			<div className={tw.container}>
				<div id='container3' className={`${tw.clickable} ${tw.neumorphic} ${tw.centerText} ${tw.container}`} data-neumorphic="true" style={{}}>
					<div className={tw.stackText} style={{}}>
						<h4 className="text-mist-400 text-[1.25em] leading-[130%]">We understand that standard sponsorship tiers may not suit all organizations.</h4>
						<h4 className="text-mist-400 text-[1.25em] leading-[130%]">
							Please contact &nbsp;
							<Link href="mailto:hackrpi@rpi.edu" className="underline text-blue-500 hover:text-purple-500">
								hackrpi@rpi.edu
							</Link>
							&nbsp; if you want to develop a tailored sponsorship package.
						</h4>
					</div>
				</div>
			</div>

			<div className={tw.container}>
				<div id='container4' className={`${tw.neumorphic} ${tw.centerText} ${tw.container}`} data-neumorphic="true" style={{}}>
					<div id='docText' className={tw.stackText} style={{}}>
						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Logo on T-Shirt</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Your company logo will be printed on the free shirts we give out</p>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Higher tiers increase the size of the logo</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Logo on Website</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Your company logo will be included on our website</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Distribute Company Swag</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Bring merchandise to your booth</p>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Alternatively we can have some at the check in desk to hand out</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Company Flier in Event Folder</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">We'll include your flier in the event folder handed out to all participants at check in</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Social Media Advertising</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Featured on 2 sponsor posts for our social media sites (Instagram, LinkedIn)</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Company Judges</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Opportunity to send a company representative to serve as a judge for the main hackathon event (In-person)</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Resume Book</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Your company will be included on the list we send out participant resumes to (after the event in mid-November)</p>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">In Gold tier or above, your company will be included on the list we send out participant resumes to (before the event in early September)</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Host Fireside Chat</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Company informational session during the main event hackathon</p>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Participants usually attend to take breaks from their work, perfect time to learn about your company and any job openings</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Host a Workshop</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Opportunity to host a workshop relating to one or more of your company's products for any interested students from Rensselaer</p>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">This can occur before as a separate HackRPI event or during the main hackathon</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Promotional Mail to Hackers</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Your company will be featured on the mail we send out to all hackers signed up before the main event</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Priority Booth Placement</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">Your booth/table will be closer to the entrance and area where the majority of participants are</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Opening Ceremony Demo</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">During our opening ceremony, we'll have a short slot for you to feature your company/product as a sponsor of HackRPI</p>

						<h3 className="text-[1.75em] text-left mt-5 mb-2 text-slate-100">Optional Table Upgrade</h3>
						<p className="text-[1.25em] leading-[140%] text-gray-300 text-left ml-8 mb-2">We provide a table but will accomodate if you want to bring a custom booth/multiple table setup</p>
					</div>
				</div>
			</div>

			<iframe
				className="mx-auto w-[90%] h-[120vh] py-10"
				src="https://drive.google.com/file/d/1GCYJHNR37vq6_UT4v17lAOR4Cr4qUJcq/preview"
				allow="autoplay"
				sandbox="allow-scripts allow-same-origin allow-popups"
			></iframe>
			<div className="bg-hackrpi-clouds-dark-blue h-[30vh]"></div>
		</main>
		<footer className="bg-gray-800">
			<div className="w-full h-[10vh] bg-hackrpi-clouds-dark-blue" style={{ clipPath: "ellipse(70% 0% at 50% 0%)" }} id="footer-ellipse"></div>
			<Footer/>
		</footer>
		<style jsx global>{`
			@keyframes tempBlur {
				0% { filter: blur(0px); }
				10% { filter: blur(5px); }
				80% { filter: blur(0px); }
				100% { filter: blur(0px); }
			}
		`}</style>
	</>);
}

export default SponsorUsPage;
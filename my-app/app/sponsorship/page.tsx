"use client";

import React, { use, useEffect } from "react";
import "./sponsor.css";
import useMouseLogic from "./mouse";
import next from "next";
import NavBar from "../components/nav-bar/nav-bar";
import Footer from "../components/footer/footer";

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

		Array.from(document.getElementsByClassName('neumorphic')).forEach((el) => {
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
			const scale = size * 0.03; // adjust as needed

			const len = Math.hypot(dx, dy) || 1;
			const offX = (dx / len) * scale;
			const offY = (dy / len) * scale;

			// ${offX}px ${offY}px ${scale * 2}px rgba(0,0,0,0.2),
			// ${-offX}px ${-offY}px ${scale * 2}px rgba(255,255,255,0.9)

			element.style.boxShadow = `
				${offX}px ${offY}px ${scale}px var(--shadow),
				${-offX}px ${-offY}px ${scale}px var(--light)
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
				childElement.style.padding = '20px';
				childElement.style.margin = '20px 0';
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

		//im so cooked, just go with it
		if (isMobileLayout || tier == 'obsidian'){
			benefitsDiv.innerHTML = `<h3>${tier.charAt(0).toUpperCase() + tier.slice(1)}</h3>`;
			for (const [name, tiers] of Object.entries(listItems)) {
				let p = document.createElement('p');
				p.textContent = name;
				p.onclick = function(){scrollDocs(name)};

				p.className = 'benefit currentBenefit';
				let tierValue = tiers[tier as keyof typeof tiers];
				if(tierValue != false){
					if(tierValue !== true){
						p.textContent+= ': ' + tierValue;
					}
					currentBenefits.push(p);
				}else{
					p.className = 'benefit availableBenefit';
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
			titleBenefitContainer.className = 'benefitContainer';
			let firstTier = document.createElement('h3');
			firstTier.innerHTML = tier.charAt(0).toUpperCase() + tier.slice(1);

			let arrow = document.createElement('span');
      arrow.style.fontSize = "2em";
			arrow.innerHTML = '&rarr;';

			let secondTier = document.createElement('h3');
			secondTier.innerHTML = nextTier.charAt(0).toUpperCase() + nextTier.slice(1);

			titleBenefitContainer.appendChild(firstTier);
			titleBenefitContainer.appendChild(arrow);
			titleBenefitContainer.appendChild(secondTier);
			benefitsDiv.appendChild(titleBenefitContainer);
			
			for (const [name, tiers] of Object.entries(listItems)) {
				let benefitContainer = document.createElement('div');
				benefitContainer.className = 'benefitContainer';
				let nextTierNote = null;
				let p = document.createElement('p');
				p.textContent = name;
				benefitContainer.onclick = function(){scrollDocs(name)};

				p.className = 'benefit currentBenefit';
				let tierValue = tiers[tier as keyof typeof tiers];
				if(tierValue != false){
					if(tierValue !== true){
						p.textContent+= ': ' + tierValue;
						
						let nextValue = tiers[nextTier as keyof typeof tiers];
						if (nextTier!= 'obsidian' && nextTier != null && nextValue != false && nextValue != tierValue){
							let nextTier = document.createElement('p');
							nextTier.className = 'benefit availableBenefit';
							
							let promoter = tiers[tier+'promoter' as keyof typeof tiers] as string;
							nextTier.textContent = promoter;
							nextTierNote = nextTier;
						}
					}
					benefitContainer.appendChild(p);
					if(nextTierNote){
						let arrow = document.createElement('span');
						arrow.innerHTML = '&rarr;';

						benefitContainer.appendChild(arrow);
						benefitContainer.appendChild(nextTierNote);
					}
					currentBenefits.push(benefitContainer);
				}else{
					p.className = 'benefit availableBenefit';
					benefitContainer.appendChild(p);
					potentialBenefits.push(benefitContainer);

					let nextValue = tiers[nextTier as keyof typeof tiers];
					if(tier != 'obsidian' && nextValue){
						let arrow = document.createElement('span');
						arrow.innerHTML = '&rarr;';

						benefitContainer.appendChild(arrow);

						let p = document.createElement('p');
						p.className = 'benefit currentBenefit';
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
					childElement.style.animation = 'none';
					void childElement.offsetWidth;
					childElement.style.animation = 'tempBlur 4s ease 0s 1 normal';

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
		// calculateShadows();
		updateBenefits(viewingCurrentTier);
	}

	useEffect(() => {
		load();
		window.addEventListener('resize', load);
		
		// window.addEventListener('mousemove', calculateShadows);
		// window.addEventListener('scroll', calculateShadows);
	}, []);

	return (
		<>
		<NavBar />
		<div style={{minHeight: 'calc(100vh - 16px)', width: '100%'}}>	
			{/* <div className='container' style={{marginTop: '100px'}}></div> */}
			<div className="container bg-sky-500">
				<div className="p-5 text-center neumorphic">
          Click the buttons to see the benefits!
        </div>
			</div>
			<div id='container1' className='container bg-sky-500'>
				<div className="clickable neumorphic sponsorCard centerText" onClick={function(){updateBenefits('bronze')}} style={{}}>
					<h1>Bronze</h1>
					<h2>750</h2>
				</div>
				<div className="clickable neumorphic sponsorCard centerText" onClick={function(){updateBenefits('silver')}} style={{}}>
					<h1>Silver</h1>
					<h2>1500</h2>
				</div>
				<div className="clickable neumorphic sponsorCard centerText" onClick={function(){updateBenefits('gold')}} style={{}}>
					<h1>Gold</h1>
					<h2>2500</h2>
				</div>
				<div className="clickable neumorphic sponsorCard centerText" onClick={function(){updateBenefits('obsidian')}} style={{}}>
					<h1>Obsidian</h1>
					<h2>5000</h2>
				</div>
			</div>

			<div className='container bg-sky-500'>
				<div id='container2' className="neumorphic container centerText" style={{}}>
					<div id='benefits' className='stackText' style={{}}>
						<h3>Bronze</h3>
					</div>
				</div>
			</div>

			<div className='container bg-sky-500'>
				<div id='container3' className="clickable neumorphic container centerText" style={{}}>
					<div className='stackText text-lg' style={{}}>
						<h4>We understand that standard sponsorship tiers may not suit all organizations.</h4>
						<h4>Please contact &nbsp;
							<a href="mailto:hackrpi@rpi.edu">hackrpi@rpi.edu</a>&nbsp;
							 if you want to develop a tailored sponsorship package.</h4>
					</div>
				</div>
			</div>

			<div className='container bg-sky-500'>
				<div id='container4' className="neumorphic container" style={{}}>
					<div id='docText' className='stackText' style={{}}>
						<h3>Logo on T-Shirt</h3>
						<p>Your company logo will be printed on the free shirts we give out</p>
						<p>Higher tiers increase the size of the logo</p>

						<h3>Logo on Website</h3>
						<p>Your company logo will be included on our website</p>

						<h3>Distribute Company Swag</h3>
						<p>Bring merchandise to your booth</p>
						<p>Alternatively we can have some at the check in desk to hand out</p>

						<h3>Company Flier in Event Folder</h3>
						<p>We'll include your flier in the event folder handed out to all participants at check in</p>

						<h3>Social Media Advertising</h3>
						<p>Featured on 2 sponsor posts for our social media sites (Instagram, LinkedIn)</p>

						<h3>Company Judges</h3>
						<p>Opportunity to send a company representative to serve as a judge for the main hackathon event (In-person)</p>

						<h3>Resume Book</h3>
						<p>Your company will be included on the list we send out participant resumes to (after the event in mid-November)</p>
						<p>In Gold tier or above, your company will be included on the list we send out participant resumes to (before the event in early September)</p>

						<h3>Host Fireside Chat</h3>
						<p>Company informational session during the main event hackathon</p>
						<p>Participants usually attend to take breaks from their work, perfect time to learn about your company and any job openings</p>

						<h3>Host a Workshop</h3>
						<p>Opportunity to host a workshop relating to one or more of your company's products for any interested students from Rensselaer</p>
						<p>This can occur before as a separate HackRPI event or during the main hackathon</p>

						<h3>Promotional Mail to Hackers</h3>
						<p>Your company will be featured on the mail we send out to all hackers signed up before the main event</p>

						<h3>Priority Booth Placement</h3>
						<p>Your booth/table will be closer to the entrance and area where the majority of participants are</p>

						<h3>Opening Ceremony Demo</h3>
						<p>During our opening ceremony, we'll have a short slot for you to feature your company/product as a sponsor of HackRPI</p>

						<h3>Optional Table Upgrade</h3>
						<p>We provide a table but will accomodate if you want to bring a custom booth/multiple table setup</p>
					</div>
				</div>
			</div>
		</div>
		<Footer/>
		</>
	);
}

export default SponsorUsPage;
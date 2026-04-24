"use client";

import NavBar from "@/app/components/nav-bar/nav-bar";
import { useEffect, useState } from "react";
import type { Event, ScheduleData, ScheduleEventData } from "@/app/data/schedule";
import { SATURDAY_END, SATURDAY_START, SUNDAY_END, SUNDAY_START, saturdayTimes, sundayTimes } from "@/app/data/schedule";

import HappeningNow from "@/app/components/schedule/happening-now";
import Schedule from "@/app/components/schedule/schedule";
import HackRPILink from "@/app/components/themed-components/hackrpi-link";
import Link from "next/link";

import Lenis from 'lenis';
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/app/components/footer/footer"), {
	loading: () => null,
});

// async function fetchEvents(): Promise<{
// 	status: number;
// 	message: string;
// 	events: Event[];
// }> {
// 	let groups = undefined;
// 	try {
// 		const session = await Auth.fetchAuthSession();
// 		groups = session.tokens?.accessToken.payload["cognito:groups"];
// 	} catch (e) {
// 		console.error(e);
// 		groups = undefined;
// 	}

// 	const { data, errors } = await client.models.event.list({
// 		authMode: groups ? "userPool" : "identityPool",
// 		limit: 200,
// 		filter: {
// 			visible: { eq: true },
// 		},
// 	});

// 	if (errors) {
// 		console.error(errors);
// 		return { status: 500, message: "Failed to fetch events.", events: [] };
// 	}

// 	return {
// 		status: 200,
// 		message: "Success",
// 		events: data.map((event: any) => event as Event),
// 	};
// }

export default function Page() {
	const [currentDateTime, setCurrentDateTime] = useState(new Date());
	const [allEvents, setAllEvents] = useState<Event[]>([]);
	const [saturdayEvents, setSaturdayEvents] = useState<Event[]>([]);
	const [sundayEvents, setSundayEvents] = useState<Event[]>([]);
	const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
	const [happeningNow, setHappeningNow] = useState<Event[]>([]);
	const [modalEvent, setModalEvent] = useState<Event | null>(null);

	// useEffect(() => {
	// 	fetchEvents().then((resp) => {
	// 		if (resp.status !== 200) {
	// 			setState("error");
	// 			return;
	// 		}

	const fetchData = async () => {
		try {
			const resp = await fetch("/data/scheduleData.json");
			if (!resp.ok) {
				throw new Error('Network response was not ok');
			}
			const jsonData: ScheduleData = await resp.json();

			const saturdayEvents = jsonData.saturdayEvents
				.map((event) => {
					const normalizedEvent = normalizeEventTimes(event, "2026-11-07");
					if (
						normalizedEvent.endTime > normalizedEvent.startTime &&
						normalizedEvent.startTime >= SATURDAY_START &&
						normalizedEvent.startTime < SATURDAY_END
					) {
						// Saturday
						return {
							...normalizedEvent,
							startTime: Math.max(normalizedEvent.startTime, saturdayTimes[0].unix),
							endTime: Math.min(normalizedEvent.endTime, SATURDAY_END),
						};
					}
					return null;
				})
				.filter((event) => event !== null && event.endTime > event.startTime)
				.sort((a, b) => a!.startTime - b!.startTime) as Event[];

			const sundayEvents = jsonData.sundayEvents
				.map((event) => {
					const normalizedEvent = normalizeEventTimes(event, "2026-11-08");
					if (
						normalizedEvent.endTime > normalizedEvent.startTime &&
						((normalizedEvent.startTime >= SUNDAY_START && normalizedEvent.startTime < SUNDAY_END) ||
							(normalizedEvent.endTime > SUNDAY_START && normalizedEvent.endTime <= SUNDAY_END))
					) {
						// Sunday
						const ret = {
							...normalizedEvent,
							startTime: Math.max(normalizedEvent.startTime, SUNDAY_START),
							endTime: Math.min(normalizedEvent.endTime, SUNDAY_END),
						};

						return ret;
					}
					return null;
				})
				.filter((event) => event !== null && event.endTime > event.startTime)
				.sort((a, b) => a!.startTime - b!.startTime) as Event[];
				
			const allEvents = [
				...saturdayEvents,
				...sundayEvents,
			];
			setSaturdayEvents(saturdayEvents);
			setSundayEvents(sundayEvents);
			setAllEvents(allEvents);

			setHappeningNow(determineHappeningNow(allEvents));
			setState("loaded");
		} catch (error) {
			console.error('Error fetching data:', error);
		};

		const interval = setInterval(() => {
			setCurrentDateTime(new Date());
			// setCurrentDateTime(new Date("2026-11-07T14:45:45-05:00")); // NOTE: for testing purposes
		}, 1000);

		addEventListener("keydown", (event) => {
			if (event.key === "Escape") {
				setModalEvent(null);
			}
		});

		return () => clearInterval(interval);
	};

	useEffect(() => {
		fetchData();

		// lenis scrolling
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

	return (
		<>
		<NavBar showOnScroll={false} variant={1}/>
		<main className="
			flex flex-col w-full h-fit min-h-screen pb-[15vh]
			items-center justify-center bg-linear-to-b from-hackrpi-clouds-dark-blue via-purple-900 via-80% to-black
		">
			<div className="w-11/12 max-w-3/4 grow shrink basis-auto mt-28">
				<div className="flex w-full items-center justify-center">
					<HackRPILink
						href="https://calendar.google.com/calendar/u/0?cid=ZGFkOGYzNGIzMjY1ZGQ2OTQzODFiODE2ODI4M2I4OGVlOTQ3M2EyZDgzMWVkNmYzODY3YzAzODE4NjhmNGIzMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
						className="bg-sky-400 text-white text-xl lg:text-2xl px-5 py-2"
					>
						Google Calendar
					</HackRPILink>
				</div>
				<div className="flex w-full items-center justify-between mt-3">
					<h1 className="text-xl xs:text-4xl font-bold text-center">Schedule</h1>
					<p className="text-center font-bold text-xl xs:text-3xl">
						{currentDateTime.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
					</p>
				</div>
				<hr className="w-full border-gray-400 border-2 my-4" />
				{state === "loading" && (
					<div className="flex h-fit items-center justify-center w-full">
						<h2 className="text-xl">Loading the schedule: </h2>
						<div className="loading loading-infinity loading-lg text-primary"></div>
					</div>
				)}

				{state === "error" && (
					<div className="badge bg-primary flex items-center justify-center h-fit my-4 ">
						<p className="text-error-content text-xl p-2">
							Oops! Looks like we ran into an issue loading the events. Please check your internet and refresh to try
							again, if the problem persists, please let us know at <Link href="mailto:hackrpi@rpi.edu">hackrpi@rpi.edu</Link>
							. Thank you!
						</p>
					</div>
				)}

				{state === "loaded" && happeningNow.length > 0 && <HappeningNow events={happeningNow} />}

				{state === "loaded" && (
					<div className="flex flex-col items-start w-full h-fit mb-8">
						<h1 className="text-xl xs:text-3xl font-bold text-center">Saturday, November 7, 2026</h1>
						<p>Click / Tap any event for more info!</p>
						<hr className="w-full border-grey my-4" />

						<Schedule
							events={saturdayEvents}
							times={saturdayTimes}
							currentTime={currentDateTime}
							onEventClick={(event) => {
								setModalEvent(allEvents.find((e) => e.id === event.id)!);
							}}
						/>
						<div className="h-4"></div>
						<h1 className="text-xl lg:text-3xl font-bold text-center">Sunday, November 8, 2026</h1>
						<p>Click / Tap any event for more info!</p>
						<hr className="w-full border-grey my-4" />

						<Schedule
							events={sundayEvents}
							times={sundayTimes}
							currentTime={currentDateTime}
							onEventClick={(event) => {
								setModalEvent(allEvents.find((e) => e.id === event.id)!);
							}}
						/>
					</div>
				)}

				{modalEvent && (
					<div
						className="fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center z-20"
						onClick={() => {
							setModalEvent(null);
						}}
					>
						<div className="w-11/12 max-w-2/3 h-5/6 bg-blue-800 rounded-lg p-5 overflow-y-auto z-30">
							<div className="flex items-center justify-between mb-4 border-b-2 border-b-gray-400 h-24">
								<h1 className=" text-3xl xs:text-4xl md:text-5xl font-bold">{modalEvent.title}</h1>
								<button
									className="text-4xl font-bold text-white mr-4 hover:text-primary focus:text-primary"
									onClick={() => {
										setModalEvent(null);
									}}
								>
									&times;
								</button>
							</div>
							<p className="text-2xl md:text-4xl mb-4">
								{modalEvent.location} {modalEvent.speaker ? `• ${modalEvent.speaker}` : ""}
							</p>
							<p className="text-3xl mb-4">
								{new Date(modalEvent.startTime).toLocaleString([], {
								})} - {new Date(modalEvent.endTime).toLocaleString([], {
								})}
							</p>
							<p className="text-2xl">{modalEvent.description}</p>
						</div>
					</div>
				)}
			</div>
		</main>
		{state !== "loading" && (
			<footer className="bg-gray-800">
				<div
					className="w-full h-[10vh] bg-black"
					style={{ clipPath: "ellipse(70% 0% at 50% 0%)" }}
					id="footer-ellipse"
				></div>
				<Footer />
			</footer>
		)}
		</>
	);
}

function determineHappeningNow(events: Event[]): Event[] {
	const currentDateTime = new Date();
	return events.filter(
		(event) => event.startTime < currentDateTime.getTime() && event.endTime > currentDateTime.getTime(),
	);
}

function normalizeEventTimes(event: ScheduleEventData, date: string): Event {
	const startTime = toTimestamp(date, event.startTime);
	let endTime = toTimestamp(date, event.endTime);

	if (endTime <= startTime) {
		endTime += 24 * 60 * 60 * 1000;
	}

	return {
		...event,
		startTime,
		endTime,
	};
}

function toTimestamp(date: string, time: string): number {
	return new Date(`${date}T${time}-05:00`).getTime();
}

"use client";

import NavBar from "@/app/components/nav-bar/nav-bar";
import { useEffect, useState } from "react";
import type { Event, ScheduleData, ScheduleEventData } from "@/app/data/schedule";
import {
  SATURDAY_END,
  SATURDAY_START,
  SUNDAY_END,
  SUNDAY_START,
  saturdayTimes,
} from "@/app/data/schedule";

import HappeningNow from "@/app/components/schedule/happening-now";
import Link from "next/link";

import Lenis from "lenis";
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
        throw new Error("Network response was not ok");
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
            ((normalizedEvent.startTime >= SUNDAY_START &&
              normalizedEvent.startTime < SUNDAY_END) ||
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

      const allEvents = [...saturdayEvents, ...sundayEvents];
      setHappeningNow(determineHappeningNow(allEvents));
      setState("loaded");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchFrame = requestAnimationFrame(() => {
      void fetchData();
    });

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
      // setCurrentDateTime(new Date("2026-11-07T14:45:45-05:00")); // NOTE: for testing purposes
    }, 1000);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalEvent(null);
      }
    };
    addEventListener("keydown", handleKeyDown);

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

    return () => {
      cancelAnimationFrame(fetchFrame);
      clearInterval(interval);
      removeEventListener("keydown", handleKeyDown);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <NavBar showOnScroll={false} variant={1} />
      <main className="flex h-fit min-h-screen w-full flex-col items-center justify-center bg-linear-to-b from-hackrpi-clouds-dark-blue via-purple-900 via-80% to-black pb-[15vh]">
        <div className="mt-28 w-11/12 max-w-3/4 shrink grow basis-auto">
          {/* <div className="flex w-full items-center justify-center">
					<HackRPILink
						href="https://calendar.google.com/calendar/u/0?cid=ZGFkOGYzNGIzMjY1ZGQ2OTQzODFiODE2ODI4M2I4OGVlOTQ3M2EyZDgzMWVkNmYzODY3YzAzODE4NjhmNGIzMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
						className="bg-sky-400 text-white text-xl lg:text-2xl px-5 py-2"
					>
						Google Calendar
					</HackRPILink>
				</div> */}
          <div className="mt-3 flex w-full items-center justify-between">
            <h1 className="text-center text-xl font-bold xs:text-4xl">Schedule</h1>
            <p className="text-center text-xl font-bold xs:text-3xl">
              {currentDateTime.toLocaleString(undefined, {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
          </div>
          <hr className="my-4 w-full border-2 border-gray-400" />
          {state === "loading" && (
            <div className="flex h-fit w-full items-center justify-center">
              <h2 className="text-xl">Loading the schedule: </h2>
              <div className="loading loading-lg loading-infinity text-primary"></div>
            </div>
          )}

          {state === "error" && (
            <div className="my-4 badge flex h-fit items-center justify-center bg-primary">
              <p className="p-2 text-xl text-error-content">
                Oops! Looks like we ran into an issue loading the events. Please check your internet
                and refresh to try again, if the problem persists, please let us know at{" "}
                <Link href="mailto:hackrpi@rpi.edu">hackrpi@rpi.edu</Link>. Thank you!
              </p>
            </div>
          )}

          {state === "loaded" && happeningNow.length > 0 && <HappeningNow events={happeningNow} />}

          {state === "loaded" && (
            <div className="mb-8 flex h-fit w-full flex-col items-start">
              <h1 className="text-center text-xl font-bold xs:text-3xl">Coming soon!</h1>
              {/* <h1 className="text-xl xs:text-3xl font-bold text-center">Saturday, November 7, 2026</h1>
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
						/> */}
            </div>
          )}

          {modalEvent && (
            <div
              className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50"
              onClick={() => {
                setModalEvent(null);
              }}
            >
              <div className="z-30 h-5/6 w-11/12 max-w-2/3 overflow-y-auto rounded-lg bg-blue-800 p-5">
                <div className="mb-4 flex h-24 items-center justify-between border-b-2 border-b-gray-400">
                  <h1 className="text-3xl font-bold xs:text-4xl md:text-5xl">{modalEvent.title}</h1>
                  <button
                    className="mr-4 text-4xl font-bold text-white hover:text-primary focus:text-primary"
                    onClick={() => {
                      setModalEvent(null);
                    }}
                  >
                    &times;
                  </button>
                </div>
                <p className="mb-4 text-2xl md:text-4xl">
                  {modalEvent.location} {modalEvent.speaker ? `• ${modalEvent.speaker}` : ""}
                </p>
                <p className="mb-4 text-3xl">
                  {new Date(modalEvent.startTime).toLocaleString([], {})} -{" "}
                  {new Date(modalEvent.endTime).toLocaleString([], {})}
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
            className="h-[10vh] w-full bg-black"
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
    (event) =>
      event.startTime < currentDateTime.getTime() && event.endTime > currentDateTime.getTime(),
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

import type { Event } from "@/app/data/schedule";
import { arrangeEvents } from "./utils";
import { useState } from "react";

export type TimelineLabel = {
  str: string;
  unix: number;
};

type ScheduleProps = {
  times: TimelineLabel[];
  events: Event[];
  currentTime: Date;
  onEventClick: (event: Event) => void;
};

export default function Schedule(props: ScheduleProps) {
  const [eventsInColumns] = useState<Event[][]>(() => arrangeEvents(props.events));

  return (
    <div className="relative flex h-fit w-full items-center justify-center">
      <div className="flex h-fit w-full flex-col items-start justify-start">
        {props.times.map((time) => (
          <TimelineElement time={time} currentTime={props.currentTime} key={time.str} />
        ))}
      </div>
      <div className="absolute top-0 right-0 flex h-full w-full shrink grow basis-auto items-start justify-start pl-20 sm:pl-28">
        {eventsInColumns.map((column, index) => (
          <div
            key={index}
            className="relative mx-0.5 flex h-full shrink grow basis-auto flex-col sm:mx-1"
          >
            {column.map((event) => {
              const { top, height } = calculateTopAndHeightOfEvent(event, props.times);
              let color = "bg-purple-300 text-black border-black";

              const eventPassed = props.currentTime.getTime() > event.endTime;
              const eventStarted = props.currentTime.getTime() > event.startTime;

              if (event.eventType === "workshop") {
                color = "bg-blue-500 text-slate-200 border-slate-200";
              } else if (event.eventType === "deadline") {
                color = "bg-black text-white border-white";
              } else if (event.eventType === "food") {
                color = "bg-green-500 text-black border-black";
              } else if (event.eventType === "important") {
                color = "bg-red-500 text-gray-300 border-gray-300";
              }

              if (eventStarted) {
                color = "bg-yellow-500 text-black border-black";
              }
              if (eventPassed) {
                color = "bg-slate-500 text-gray-300 border-gray-300";
              }

              return (
                <div
                  key={event.id}
                  className={`absolute mb-4 h-full w-full overflow-hidden rounded-lg shadow-md ${color}`}
                  style={{
                    top,
                    height,
                  }}
                  onClick={() => props.onEventClick(event)}
                >
                  <div className="mask-b-from-70% p-1" style={{ height }}>
                    <p
                      className={`border-b-2 pl-1 text-sm font-bold xs:text-base sm:text-lg ${color}`}
                    >
                      {event.title}
                    </p>
                    <p className={`border-b-2 pl-1 text-xs xs:text-sm sm:text-base ${color}`}>
                      {event.location} {event.speaker != "" ? `• ${event.speaker}` : ""}
                    </p>
                    <p className={`pl-1 text-xs font-normal xs:text-sm sm:text-base ${color}`}>
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineElement(props: { time: TimelineLabel; currentTime: Date }) {
  return (
    <div className="flex h-24 w-full flex-col items-start justify-start">
      <div className="flex h-fit w-full items-center justify-start">
        <p
          className={`w-16 text-white desktop:mr-2 desktop:w-20 ${
            props.currentTime.getTime() > props.time.unix &&
            props.currentTime.getTime() < props.time.unix + 60 * 60 * 1000
              ? "text-sm font-bold xs:text-base sm:text-lg"
              : "text-xs font-normal xs:text-sm sm:text-base"
          }`}
        >
          {props.time.str}
        </p>
        <div
          className={`mr-2 h-2 w-2 rounded-full desktop:mr-4 ${
            props.currentTime.getTime() < props.time.unix + 60 * 60 * 1000
              ? "bg-green-400"
              : "bg-white"
          }`}
        ></div>
        <hr className="shrink grow basis-auto border border-gray-400" id={`${props.time.unix}`} />
      </div>
      <div
        className={`ml-16 h-20 w-2 rounded-full sm:ml-22 ${
          props.currentTime.getTime() < props.time.unix + 60 * 60 * 1000
            ? "bg-green-400"
            : "bg-white"
        }`}
      ></div>
    </div>
  );
}

function calculateTopAndHeightOfEvent(
  event: Event,
  times: TimelineLabel[],
): { top: number; height: number } {
  const HOUR_HEIGHT = 96; // 96px in height for each hour
  const scheduleStart = times[0]?.unix ?? event.startTime;
  const top = ((event.startTime - scheduleStart) / 3600000) * HOUR_HEIGHT + 12;
  const height = ((event.endTime - event.startTime) / 3600000) * HOUR_HEIGHT - 4;

  return { top, height };
}

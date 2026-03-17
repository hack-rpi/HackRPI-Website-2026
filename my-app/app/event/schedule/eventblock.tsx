import { Event, timeToMinutes } from "./page";

interface Props {
  event: Event;
  dayStart: number;   // minutes since midnight
  pixelsPerMinute: number;
}

export default function EventBlock({ event, dayStart, pixelsPerMinute }: Props) {
  const start = timeToMinutes(event.startTime);
  const end = timeToMinutes(event.endTime);
  const duration = end - start;

  const top = (start - dayStart) * pixelsPerMinute;
  const height = duration * pixelsPerMinute;

  return (
    <div
      className="p-5 border-2 border-emerald-500"
      title={event.description}
    >
      <div className="">
        {event.startTime} - {event.endTime}
      </div>
      <div className="">{event.title}</div>
      {event.speaker && (
        <div className="">{event.speaker}</div>
      )}
    </div>
  );
}
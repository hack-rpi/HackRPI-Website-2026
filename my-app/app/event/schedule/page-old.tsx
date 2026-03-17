
import NavBar from "@/app/components/nav-bar/nav-bar";
import EventBlock from "./eventblock";
import eventsData from "@/public/events.json";
import Footer from "@/app/components/footer/footer";

export interface Event {
  id: string;
  day: number;
  column: number;
  title: string;
  speaker: string;
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
  description: string;
}

// Convert "HH:MM" to minutes since midnight
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Get the earliest start and latest end across all events for a given day
export function getDayBounds(events: Event[]): { start: number; end: number } {
  const starts = events.map((e) => timeToMinutes(e.startTime));
  const ends = events.map((e) => timeToMinutes(e.endTime));
  return {
    start: Math.min(...starts),
    end: Math.max(...ends),
  };
}

// Get all unique column names for a day, preserving insertion order
export function getColumns(events: Event[]): number[] {
  return Array.from(new Set(events.map((e) => e.column)));
}

interface Props {
  day: number;
  events: Event[];
  pixelsPerMinute?: number;
}

const PIXELS_PER_MINUTE = 2;
const TIME_GUTTER_WIDTH = 52; // px

function Schedule({ day, events, pixelsPerMinute = PIXELS_PER_MINUTE }: Props) {
  const { start, end } = getDayBounds(events);
  const columns = getColumns(events);
  const totalHeight = (end - start) * pixelsPerMinute;
 
  // Build hour tick marks
  const startHour = Math.floor(start / 60);
  const endHour = Math.ceil(end / 60);
  const hours: number[] = [];
  for (let h = startHour; h <= endHour; h++) hours.push(h);
 
  return (
    <section className="relative pb-250">
      <h2 className="border-2 border-red-500 p-5">Day {day}</h2>
      <div className="absolute w-[20%] mx-5">
        {hours.map((h) => {
          const top = (h * 60 - start) * pixelsPerMinute;
          return (
            <div key={h} className="absolute border-2 border-yellow-500" style={{top: top}}>
              {String(h).padStart(2, "0")}:00
            </div>
          );
        })}
      </div>
      {columns.map((col) => {
        const colEvents = events.filter((e) => e.column === col);
        return (
          <div
            key={col}
            className="absolute top-11 left-1 border-2 border-green-500 my-5"
            style={{height: totalHeight, left: `${(col / 4) * 100}%`}}
          >
            {colEvents.map((event) => (
              <EventBlock
                key={event.id}
                event={event}
                dayStart={start}
                pixelsPerMinute={pixelsPerMinute}
              />
            ))}
          </div>
        );
      })}
    </section>
  );
}

export default function Home() {
  const events = eventsData as Event[];
  const days = Array.from(new Set(events.map((e) => e.day))).sort((a, b) => a - b);
 
  return (
    <>
      <NavBar showOnScroll={false}/>
      <main className="p-5 pt-20">
        <h1 className="p-5">Event Schedule</h1>
        {days.map((day) => (
          <Schedule
            key={day}
            day={day}
            events={events.filter((e) => e.day === day)}
          />
        ))}
      </main>
      <Footer/>
    </>
  );
}
 
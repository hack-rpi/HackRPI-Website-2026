import type { Event } from "@/app/data/schedule";

type HappeningNowProps = {
  events: Event[];
};

export default function HappeningNow(props: HappeningNowProps) {
  return (
    <div className="mb-4 flex h-fit w-full flex-col items-start">
      <h1 className="bg-hackrpi-secondary-light-blue h-fit w-full p-2 text-xl font-bold text-white">
        Happening Now
      </h1>
      {props.events.map((event) => (
        <HappeningNowCard event={event} key={event.id} />
      ))}
    </div>
  );
}

function HappeningNowCard(props: { event: Event }) {
  function extractLettersFromTitle(title: string): string {
    // If a title contains no spaces, then use the first letter of the title
    if (!title.includes(" ")) {
      return title[0];
    }
    // If a title contains spaces, then use the first letter of the first two words
    const words = title.split(" ");
    return words[0][0] + words[1][0];
  }

  return (
    <div className="flex h-28 w-full items-center justify-between overflow-hidden border-b border-gray-400">
      <div className="flex min-w-20 items-center justify-center">
        <div className="bg-hackrpi-primary-dark-green flex h-16 w-16 items-center justify-center rounded-full text-4xl font-bold text-white">
          {extractLettersFromTitle(props.event.title)}
        </div>
      </div>
      <div className="mx-4 flex w-fit min-w-64 flex-col items-center justify-center px-4">
        <h3 className="description-box text-xl font-bold text-white">{props.event.title}</h3>
        <p className="text-wrap">
          {props.event.location} {props.event.speaker != "" ? `• ${props.event.speaker}` : ""}{" "}
        </p>
      </div>
      <div className="hidden shrink grow basis-auto sm:flex">
        <p className="description-box">{props.event.description}</p>
      </div>
    </div>
  );
}

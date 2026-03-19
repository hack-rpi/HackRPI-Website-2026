// src/data/schedule.ts

export type Event = {
	id: string;
	title: string;
	description: string;
	startTime: number; // computed in page.tsx
	endTime: number;   // computed in page.tsx
	location: string;
	speaker: string;
	eventType: "workshop" | "constant" | "important" | "food" | "deadline";
	visible: boolean;
	column?: number; // 1-4
  width: number;
};

export type ScheduleData = {
  saturdayEvents: Event[];
  sundayEvents: Event[];
};

export const SATURDAY_START = new Date("2026-11-07T09:00:00-05:00").getTime();

// Saturday ends ~11 PM same night (we just need this for display ranges)
export const SATURDAY_END = new Date("2026-11-07T00:00:00-05:00").getTime() - 1;

export const SUNDAY_START = new Date("2026-11-08T00:00:00-05:00").getTime();

export const SUNDAY_END = new Date("2026-11-08T20:00:00-05:00").getTime();

export const saturdayTimes = [
	{ str: "9:00 AM",  unix: SATURDAY_START + 0 * 3600000 },
	{ str: "10:00 AM", unix: SATURDAY_START + 1 * 3600000 },
	{ str: "11:00 AM", unix: SATURDAY_START + 2 * 3600000 },
	{ str: "12:00 PM", unix: SATURDAY_START + 3 * 3600000 },
	{ str: "1:00 PM",  unix: SATURDAY_START + 4 * 3600000 },
	{ str: "2:00 PM",  unix: SATURDAY_START + 5 * 3600000 },
	{ str: "3:00 PM",  unix: SATURDAY_START + 6 * 3600000 },
	{ str: "4:00 PM",  unix: SATURDAY_START + 7 * 3600000 },
	{ str: "5:00 PM",  unix: SATURDAY_START + 8 * 3600000 },
	{ str: "6:00 PM",  unix: SATURDAY_START + 9 * 3600000 },
	{ str: "7:00 PM",  unix: SATURDAY_START + 10 * 3600000 },
	{ str: "8:00 PM",  unix: SATURDAY_START + 11 * 3600000 },
	{ str: "9:00 PM",  unix: SATURDAY_START + 12 * 3600000 },
	{ str: "10:00 PM", unix: SATURDAY_START + 13 * 3600000 },
	{ str: "11:00 PM", unix: SATURDAY_START + 14 * 3600000 }
];

export const sundayTimes = [
	{ str: "12:00 AM", unix: SUNDAY_START + 0 * 3600000 },
	{ str: "1:00 AM",  unix: SUNDAY_START + 1 * 3600000 },
	{ str: "2:00 AM",  unix: SUNDAY_START + 2 * 3600000 },
	{ str: "3:00 AM",  unix: SUNDAY_START + 3 * 3600000 },
	{ str: "4:00 AM",  unix: SUNDAY_START + 4 * 3600000 },
	{ str: "5:00 AM",  unix: SUNDAY_START + 5 * 3600000 },
	{ str: "6:00 AM",  unix: SUNDAY_START + 6 * 3600000 },
	{ str: "7:00 AM",  unix: SUNDAY_START + 7 * 3600000 },
	{ str: "8:00 AM",  unix: SUNDAY_START + 8 * 3600000 },
	{ str: "9:00 AM",  unix: SUNDAY_START + 9 * 3600000 },
	{ str: "10:00 AM", unix: SUNDAY_START + 10 * 3600000 },
	{ str: "11:00 AM", unix: SUNDAY_START + 11 * 3600000 },
	{ str: "12:00 PM", unix: SUNDAY_START + 12 * 3600000 },
	{ str: "1:00 PM",  unix: SUNDAY_START + 13 * 3600000 },
	{ str: "2:00 PM",  unix: SUNDAY_START + 14 * 3600000 },
	{ str: "3:00 PM",  unix: SUNDAY_START + 15 * 3600000 },
	{ str: "4:00 PM",  unix: SUNDAY_START + 16 * 3600000 },
	{ str: "5:00 PM",  unix: SUNDAY_START + 17 * 3600000 },
	{ str: "6:00 PM",  unix: SUNDAY_START + 18 * 3600000 },
	{ str: "7:00 PM",  unix: SUNDAY_START + 19 * 3600000 },
	{ str: "8:00 PM",  unix: SUNDAY_START + 20 * 3600000 }
];

import type { DayAbbr, Race, RaceStatus } from "./types";

export const DOW: DayAbbr[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as unknown as DayAbbr[];
const DOW_LIST = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function midnight(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function todayAbbr(now: Date = new Date()): string {
  return DOW_LIST[now.getDay()];
}

export function classifyRace(dateStr: string, now: Date = new Date()): RaceStatus {
  const today = midnight(now);
  const raceDay = new Date(`${dateStr}T00:00:00`);
  const diff = Math.round((raceDay.getTime() - today.getTime()) / 86_400_000);
  if (diff < 0) return "past";
  if (diff <= 7) return "weekend";
  return "upcoming";
}

export function weekendRace(races: Race[], now: Date = new Date()): Race | undefined {
  return races.find((r) => classifyRace(r.date, now) === "weekend");
}

export function upcomingRaces(races: Race[], now: Date = new Date()): Race[] {
  return races
    .filter((r) => classifyRace(r.date, now) === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function shortDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`)
    .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    .toUpperCase();
}

export function todayLabel(now: Date = new Date()): string {
  return now
    .toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    .toUpperCase();
}

function nextOccurrence(day: DayAbbr, h: number, m: number, from: Date = new Date()): Date {
  const target = DOW_LIST.indexOf(day);
  const d = midnight(from);
  const diff = (target - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + diff);
  d.setHours(h, m, 0, 0);
  return d;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function googleCalendarUrl(
  title: string,
  day: DayAbbr,
  h: number,
  m: number,
  location: string,
  details: string,
  from: Date = new Date(),
): string {
  const start = nextOccurrence(day, h, m, from);
  const end = new Date(start.getTime() + 90 * 60_000);
  const fmt = (x: Date) =>
    `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    location,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

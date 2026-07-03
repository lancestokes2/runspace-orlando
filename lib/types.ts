export type DayAbbr = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface CalTime {
  day: DayAbbr;
  h: number;
  m: number;
}

export interface Club {
  slug: string;
  name: string;
  days: DayAbbr[];
  time: string;
  cal: CalTime | null;
  location: string;
  area: string;
  region: string;
  instagram?: string;
  perk: string;
  tags: string[];
  newbie?: string;
  hasProfile?: boolean;
}

export interface UnconfirmedClub {
  name: string;
  time: string;
  location: string;
  area: string;
  perk: string;
  tags: string[];
}

export interface Race {
  name: string;
  /** ISO date, yyyy-mm-dd */
  date: string;
  time: string;
  distance: string;
  price: string;
  location: string;
  host: string;
  blurb: string;
  note?: string;
  registerUrl: string;
}

export type RaceStatus = "past" | "weekend" | "upcoming";

export interface ProfileCard {
  icon: IconName;
  label: string;
  answer: string;
  example?: boolean;
}

export type IconName =
  | "users"
  | "gauge"
  | "split"
  | "cup"
  | "park"
  | "wc"
  | "dog"
  | "bulb"
  | "bag"
  | "age";

export interface ClubProfile {
  slug: string;
  bestFor: string;
  realPace: string;
  turnout: string;
  cards: ProfileCard[];
  fitGood: string[];
  fitLess: string[];
  scores: { label: string; value: number; kind: "begin" | "social" | "train" }[];
  ourTake: string[];
  steps: { title: string; body: string; example?: boolean }[];
  route: { summary: string; detail: string };
}

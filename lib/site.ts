export const site = {
  name: "RunSpace Orlando",
  shortName: "RunSpace",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://runspaceorlando.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@runspaceorlando.com",
  description:
    "Every Orlando run club and race in one place, updated weekly. Find group runs by day, area, and pace — and know what each club is actually like before you show up. Free.",
  tagline: "The site for Orlando runners",
} as const;

export const copy = {
  heroEyebrow: "Orlando · Run clubs + races, one place",
  heroSubProEnd: " Find your people. It’s free.",
  heroLabel: "Get this weekend’s races + every club, in your inbox each Monday",
  heroFine: "Free. One email a week. Unsubscribe anytime.",
  newbieLead:
    "Here’s the truth: nobody’s checking your pace. Group runs split into faster and slower packs, most have walkers, and there’s always someone hanging at the back on purpose. You just show up a few minutes early, say hi, and run as much or as little as you want. These three are the friendliest places in Orlando to start — all free:",
  founder:
    "Built by an Orlando runner who got tired of digging through five Instagram pages to figure out where to run on a Thursday. If your club’s missing or a time’s wrong, let me know — this is built with the community, not at it.",
  footerNote:
    "Club times are the usual weekly schedule. Around holidays (like July 4th) some clubs shift or skip — always confirm on the club’s Instagram before you head out.",
} as const;

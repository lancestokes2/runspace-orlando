import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RacesSection } from "@/components/RacesSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `RaceDay — ${site.name}`,
  description:
    "Every upcoming race in the Orlando area, auto-sorted by date — this weekend's headline race plus everything coming up.",
  alternates: { canonical: "/raceday" },
};

export default function RaceDayPage() {
  return (
    <>
      <Nav />
      <RacesSection variant="full" />
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ClubDirectory } from "@/components/ClubDirectory";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Run Clubs — ${site.name}`,
  description:
    "Every Orlando run club in one place — filter by day and area, see the real schedule, and know what to expect before you show up.",
  alternates: { canonical: "/clubs" },
};

export default function ClubsPage() {
  return (
    <>
      <Nav />
      <ClubDirectory />
      <Footer />
    </>
  );
}

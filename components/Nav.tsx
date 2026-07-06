"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { TodayPill } from "./TodayPill";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/clubs", label: "Run Clubs" },
  { href: "/raceday", label: "RaceDay" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className="brand" aria-label={`${site.name} home`}>
        <b>
          RUN<span>SPACE</span>
        </b>
        <small>{site.tagline}</small>
      </Link>
      <div className="navlinks">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? "on" : ""}
            aria-current={pathname === l.href ? "page" : undefined}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <TodayPill />
    </nav>
  );
}

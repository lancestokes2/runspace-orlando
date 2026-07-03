import Link from "next/link";
import { site } from "@/lib/site";
import { TodayPill } from "./TodayPill";

export function Nav() {
  return (
    <nav>
      <Link href="/" className="brand" aria-label={`${site.name} home`}>
        <b>
          RUN<span>SPACE</span>
        </b>
        <small>{site.tagline}</small>
      </Link>
      <TodayPill />
    </nav>
  );
}

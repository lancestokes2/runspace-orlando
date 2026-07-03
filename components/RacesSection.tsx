"use client";

import { races } from "@/lib/data";
import { shortDate, weekendRace, upcomingRaces } from "@/lib/dates";
import type { Race } from "@/lib/types";
import { site } from "@/lib/site";
import { useMounted } from "@/lib/useMounted";

function FeaturedRace({ race, label }: { race: Race; label: string }) {
  return (
    <div className="racecard">
      <div className="racecard-top">
        <span className="badge-live">
          <span className="d" /> {label}
        </span>
        <h2 className="racetitle">{race.name}</h2>
        <p className="blurb">{race.blurb}</p>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="k">Date</div>
          <div className="v accent">{shortDate(race.date)}</div>
        </div>
        <div className="stat">
          <div className="k">Start time</div>
          <div className="v">{race.time}</div>
        </div>
        <div className="stat">
          <div className="k">Distance</div>
          <div className="v">{race.distance}</div>
        </div>
        <div className="stat">
          <div className="k">Entry</div>
          <div className="v">{race.price}</div>
        </div>
      </div>
      <div className="racecard-foot">
        <span className="foot-note">
          {race.note ? `${race.note} · ` : ""}by {race.host}
        </span>
        <a className="btn ghost" href={race.registerUrl} target="_blank" rel="noopener noreferrer">
          Register →
        </a>
      </div>
    </div>
  );
}

function EmptyWeekend() {
  return (
    <div className="racecard">
      <div className="racecard-top">
        <span className="badge-live" style={{ background: "#3a4a5a", color: "var(--paper)" }}>
          No race this weekend
        </span>
        <h2 className="racetitle" style={{ fontSize: "clamp(26px,4vw,40px)" }}>
          Nothing on the calendar
          <br />
          this weekend — yet.
        </h2>
        <p className="blurb">
          Check the upcoming races below, or join the waitlist and we&rsquo;ll drop new ones in every
          Monday.
        </p>
      </div>
    </div>
  );
}

export function RacesSection() {
  const mounted = useMounted();
  const now = mounted ? new Date() : null;

  const sorted = [...races].sort((a, b) => a.date.localeCompare(b.date));

  let featured: Race | undefined;
  let label = "This weekend";
  let list: Race[];

  if (now) {
    featured = weekendRace(races, now);
    list = upcomingRaces(races, now);
  } else {
    // Pre-hydration: deterministic, SEO-friendly render with no date claims.
    featured = sorted[0];
    label = "Next up";
    list = sorted.slice(1);
  }

  return (
    <>
      <section className="sec">
        <div className="wrap">
          <div className="sechead">
            <h2>This weekend</h2>
            <div className="sh-meta">The headline race, highlighted automatically by date</div>
          </div>
          {featured ? <FeaturedRace race={featured} label={label} /> : <EmptyWeekend />}
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sechead">
            <h2>Upcoming races</h2>
            <div className="sh-meta">auto-sorted · past races drop off on their own</div>
          </div>
          <div className="upcoming">
            {list.map((r) => (
              <div className="ucard" key={r.name}>
                <span className="when">{shortDate(r.date)}</span>
                <h3>{r.name}</h3>
                <div className="meta">
                  {r.time} · {r.distance}
                  <br />
                  {r.location}
                </div>
                <span className="tag">{r.host}</span>
              </div>
            ))}
            <a className="ucard submit" href={`mailto:${site.contactEmail}?subject=Race%20to%20add`}>
              <h3>＋ Know a race we&rsquo;re missing?</h3>
              <p>Submit it and we&rsquo;ll verify &amp; add it.</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

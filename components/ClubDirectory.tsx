"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { clubs, unconfirmedClubs } from "@/lib/data";
import { mapsUrl, googleCalendarUrl, todayAbbr } from "@/lib/dates";
import { site } from "@/lib/site";
import { useMounted } from "@/lib/useMounted";
import { Icon } from "./icons";
import type { Club } from "@/lib/types";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export function ClubDirectory() {
  const mounted = useMounted();
  const now = mounted ? new Date() : null;
  const [day, setDay] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const today = now ? todayAbbr(now) : null;
  const regions = useMemo(() => [...new Set(clubs.map((c) => c.region))].sort(), []);

  const filtered = clubs.filter((c) => {
    const dayOk = day === "all" || c.days.includes(day as Club["days"][number]);
    const regionOk = region === "all" || c.region === region;
    const text = `${c.name}${c.location}${c.area}${c.region}${c.perk}${c.tags.join(" ")}`.toLowerCase();
    const searchOk = !search || text.includes(search.toLowerCase());
    return dayOk && regionOk && searchOk;
  });

  function toggleSave(name: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  const dayTxt = day === "all" ? "" : day === today ? " tonight" : ` on ${day}`;

  return (
    <section className="clubs-wrap">
      <div className="wrap">
        <div className="sechead">
          <h2>Run clubs this week</h2>
          <div className="sh-meta">
            <span className="verified">● Updated weekly</span> · same day &amp; spot every week
          </div>
        </div>

        <div className="controls">
          <div className="days">
            {today && (
              <button
                className={`chip tonight${day === today ? " on" : ""}`}
                onClick={() => setDay(today)}
              >
                Tonight · {today}
              </button>
            )}
            <button className={`chip${day === "all" ? " on" : ""}`} onClick={() => setDay("all")}>
              All week
            </button>
            {DAYS.map((d) => (
              <button key={d} className={`chip${day === d ? " on" : ""}`} onClick={() => setDay(d)}>
                {d}
              </button>
            ))}
          </div>
          <div className="controls-right">
            <select
              aria-label="Filter by area"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="all">All areas</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <input
              type="search"
              placeholder="Search clubs, spots, perks…"
              aria-label="Search clubs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="count">
          {filtered.length} club{filtered.length !== 1 ? "s" : ""}
          {dayTxt}
          {region !== "all" ? ` · ${region}` : ""}
        </div>

        {filtered.length === 0 ? (
          <div className="empty">No clubs match that — try another day or clear the search.</div>
        ) : (
          <div className="grid">
            {filtered.map((c) => {
              const multi = c.days.length > 1;
              const isSaved = saved.has(c.name);
              const cal =
                c.cal && now
                  ? googleCalendarUrl(
                      `${c.name} — group run`,
                      c.cal.day,
                      c.cal.h,
                      c.cal.m,
                      `${c.location}, ${c.area}, Orlando FL`,
                      `Weekly run with ${c.name}. Confirm on their socials before you go.`,
                      now,
                    )
                  : null;
              return (
                <article className="club" key={c.slug}>
                  <div className="club-top">
                    <h3>
                      {c.hasProfile ? (
                        <Link href={`/clubs/${c.slug}`} style={{ color: "inherit" }}>
                          {c.name}
                        </Link>
                      ) : (
                        c.name
                      )}
                    </h3>
                    <span className={`daybadge${multi ? " multi" : ""}`}>
                      {multi ? c.days.join(" / ") : c.days[0]}
                    </span>
                  </div>
                  <div className="time">{c.time}</div>
                  <div className="loc">
                    <b>{c.location}</b> · {c.area}
                  </div>
                  <div className="club-tags">
                    {c.tags.map((t) => (
                      <span key={t} className={`ctag${t === "beginner-friendly" ? " new" : ""}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="perk">{c.perk}</div>
                  <div className="card-actions">
                    {c.hasProfile && (
                      <Link className="act" href={`/clubs/${c.slug}`}>
                        <Icon name="arrow" /> See what it&rsquo;s like
                      </Link>
                    )}
                    <a
                      className="act"
                      href={mapsUrl(`${c.location}, ${c.area}, Orlando FL`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="pin" /> Directions
                    </a>
                    {c.instagram && (
                      <a
                        className="act"
                        href={`https://instagram.com/${c.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="ig" /> @{c.instagram}
                      </a>
                    )}
                    {cal && (
                      <a className="act" href={cal} target="_blank" rel="noopener noreferrer">
                        <Icon name="cal" /> Add to calendar
                      </a>
                    )}
                    <button
                      className={`save${isSaved ? " on" : ""}`}
                      aria-label={`Save ${c.name}`}
                      aria-pressed={isSaved}
                      title="Save"
                      onClick={() => toggleSave(c.name)}
                    >
                      <Icon name="heart" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <details className="unconf-wrap">
          <summary>
            ＋ <b>{unconfirmedClubs.length}</b> more clubs we haven&rsquo;t confirmed yet — help us
            verify their day/time
          </summary>
          <div className="grid">
            {unconfirmedClubs.map((c) => (
              <article className="club" key={c.name}>
                <div className="club-top">
                  <h3>{c.name}</h3>
                  <span className="daybadge unconf">Unconfirmed</span>
                </div>
                <div className="time unconf">{c.time}</div>
                <div className="loc">
                  <b>{c.location}</b> · {c.area}
                </div>
                <div className="club-tags">
                  {c.tags.map((t) => (
                    <span key={t} className="ctag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="perk">{c.perk}</div>
                <div className="card-actions">
                  <a
                    className="act"
                    href={`mailto:${site.contactEmail}?subject=Schedule%20for%20${encodeURIComponent(c.name)}`}
                  >
                    Know the schedule? Tell us →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { mapsUrl, googleCalendarUrl } from "@/lib/dates";
import { useMounted } from "@/lib/useMounted";
import { Icon } from "./icons";
import type { Club } from "@/lib/types";

export function ClubActions({ club }: { club: Club }) {
  const mounted = useMounted();
  const now = mounted ? new Date() : null;
  const [saved, setSaved] = useState(false);

  const directions = mapsUrl(`${club.location}, ${club.area}, Orlando FL`);
  const cal =
    club.cal && now
      ? googleCalendarUrl(
          `${club.name} — group run`,
          club.cal.day,
          club.cal.h,
          club.cal.m,
          `${club.location}, ${club.area}, Orlando FL`,
          `Weekly run with ${club.name}. Confirm on their socials before you go.`,
          now,
        )
      : null;

  return (
    <div className="chero-actions">
      {cal && (
        <a className="btn ghost" href={cal} target="_blank" rel="noopener noreferrer">
          <Icon name="cal" /> Add to calendar
        </a>
      )}
      <a className="btn ghost" href={directions} target="_blank" rel="noopener noreferrer">
        <Icon name="pin" /> Directions
      </a>
      {club.instagram && (
        <a
          className="btn ghost"
          href={`https://instagram.com/${club.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="ig" /> @{club.instagram}
        </a>
      )}
      <button
        className={`csave${saved ? " on" : ""}`}
        aria-pressed={saved}
        aria-label={`Save ${club.name}`}
        onClick={() => setSaved((s) => !s)}
      >
        <Icon name="heart" /> {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}

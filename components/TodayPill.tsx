"use client";

import { todayLabel } from "@/lib/dates";
import { useMounted } from "@/lib/useMounted";

export function TodayPill() {
  const mounted = useMounted();
  const label = mounted ? todayLabel(new Date()) : "";
  return (
    <div className="today" suppressHydrationWarning>
      {label || "\u00A0"}
    </div>
  );
}

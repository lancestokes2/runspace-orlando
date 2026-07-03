import type { IconName } from "@/lib/types";

type Name = IconName | "pin" | "ig" | "cal" | "arrow" | "heart";

const PATHS: Record<Name, React.ReactNode> = {
  pin: (
    <>
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  ig: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  cal: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  heart: (
    <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.3 4 2.5.8-1.2 2-2.5 4-2.5 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21z" />
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 14l4-4" />
      <path d="M3 12a9 9 0 0118 0" />
    </>
  ),
  split: <path d="M12 3v6M12 9l-5 12M12 9l5 12" />,
  cup: (
    <>
      <path d="M4 8h13v5a5 5 0 01-5 5H9a5 5 0 01-5-5z" />
      <path d="M17 9h2a2 2 0 010 4h-2" />
    </>
  ),
  park: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 17V8h3a3 3 0 010 6H9" />
    </>
  ),
  wc: <path d="M6 3v18M6 7h4M18 3v18M16 9l4 0M16 13l4 0" />,
  dog: (
    <>
      <path d="M10 5l-2 2v5l3 4h4l3-4V7l-2-2" />
      <path d="M7 12l-3 1M20 12l-3 1" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 00-4-10z" />
    </>
  ),
  bag: (
    <>
      <path d="M6 7h12l1 13H5z" />
      <path d="M9 7a3 3 0 016 0" />
    </>
  ),
  age: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0116 0" />
    </>
  ),
};

export function Icon({ name }: { name: Name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

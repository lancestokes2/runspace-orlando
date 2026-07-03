// Shared option lists — imported by both the client form and the server-side
// API route so the dropdowns and the validation can never drift apart.

export const PACES = [
  "Just starting out",
  "Walk / run",
  "Easy (11+ min/mi)",
  "Moderate (9–11 min/mi)",
  "Fast (sub-9 min/mi)",
  "Not sure yet",
] as const;

export const SOURCES = [
  "Instagram",
  "A friend / word of mouth",
  "Google search",
  "At a run club or race",
  "Other",
] as const;

// Common Orlando-area places offered as a datalist; the field stays free-text.
export const CITY_SUGGESTIONS = [
  "Orlando",
  "Winter Park",
  "Winter Garden",
  "Maitland",
  "Lake Nona",
  "College Park",
  "Thornton Park",
  "Baldwin Park",
  "Oviedo",
  "Kissimmee",
] as const;

export type Pace = (typeof PACES)[number];
export type Source = (typeof SOURCES)[number];

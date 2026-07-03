import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — every run club & race, one place`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Orlando run club",
    "Orlando running",
    "Orlando races",
    "group runs Orlando",
    "Track Shack",
    "Winter Park 5K",
  ],
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — every run club & race, one place`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — every run club & race, one place`,
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E1A2B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fonts are loaded here in the ROOT layout, so they apply site-wide.
            The no-page-custom-font rule targets per-page fonts in the old Pages
            Router and is a false positive here. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Spline+Sans+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

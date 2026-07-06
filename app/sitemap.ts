import type { MetadataRoute } from "next";
import { clubs } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/clubs`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/raceday`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
  const clubRoutes: MetadataRoute.Sitemap = clubs
    .filter((c) => c.hasProfile)
    .map((c) => ({
      url: `${site.url}/clubs/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  return [...staticRoutes, ...clubRoutes];
}

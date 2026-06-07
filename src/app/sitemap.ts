import { MetadataRoute } from "next";

const BASE = "https://murallwallpaper.com";

const PRODUCTS = [
  "verdant-canopy",
  "hex-noir",
  "midnight-garden",
  "emerald-conservatory",
];

const JOURNAL_POSTS = [
  "how-to-choose-wallpaper-for-small-rooms",
  "peel-and-stick-vs-paste-the-wall",
  "botanical-wallpaper-trend-2026",
  "how-many-rolls-do-i-need",
  "interview-rebel-walls",
  "accent-wall-ideas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/brands`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/trade`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((slug) => ({
    url: `${BASE}/products/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const journalRoutes: MetadataRoute.Sitemap = JOURNAL_POSTS.map((slug) => ({
    url: `${BASE}/journal/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}

import { MetadataRoute } from "next";

const BASE = "https://murallwallpaper.com";

const PRODUCTS = [
  "verdant-canopy",
  "emerald-conservatory",
  "midnight-garden",
  "hex-noir",
  "archive-rose",
  "woods-cole-son",
  "momentum-grid",
  "papilio-botanical",
  "blackthorn",
  "diamond-lattice",
  "hummingbirds",
  "garden-party",
  "imperial-garden",
  "magnolia-peel-stick",
  "strawberry-thief",
  "nocturne",
  "verdure",
  "meadow-bloom",
  "velvet-forest",
  "art-deco-soleil",
];

const JOURNAL_POSTS = [
  "how-to-choose-wallpaper-for-small-rooms",
  "peel-and-stick-vs-paste-the-wall",
  "botanical-wallpaper-trend-2026",
  "how-many-rolls-do-i-need",
  "interview-rebel-walls",
  "accent-wall-ideas",
];

const ROOMS = [
  "living-room",
  "bedroom",
  "nursery",
  "dining-room",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                        lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE}/products`,          lastModified: now, changeFrequency: "daily",   priority: 0.95 },
    { url: `${BASE}/brands`,            lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/journal`,           lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/visualizer`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trade`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`,           lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/affiliates`,        lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/shipping`,          lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy-policy`,    lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,             lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
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

  const roomRoutes: MetadataRoute.Sitemap = ROOMS.map((room) => ({
    url: `${BASE}/rooms/${room}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes, ...roomRoutes];
}

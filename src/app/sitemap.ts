import { MetadataRoute } from "next";

const BASE = "https://murallwallpaper.com";

const PRODUCTS = [
  // Row 1-5 (original 20)
  "verdant-canopy", "emerald-conservatory", "midnight-garden", "hex-noir",
  "archive-rose", "woods-cole-son", "momentum-grid", "papilio-botanical",
  "blackthorn", "diamond-lattice", "hummingbirds", "garden-party",
  "imperial-garden", "magnolia-peel-stick", "strawberry-thief", "nocturne",
  "verdure", "meadow-bloom", "velvet-forest", "art-deco-soleil",
  // Row 6-10
  "jungle-reverie", "chevron-slate", "terracotta-wave", "coral-reef",
  "peony-garden", "willow-bough", "fjord-fog", "aurora-wave",
  "coastal-rope", "king-protea", "coastal-stripe", "wildflower-field",
  "folly-brook", "limerence", "thistle-dark", "shou-lao",
  "chevron-gold", "savanna-dusk", "arch-shadow", "desert-bloom",
  // Row 11-15
  "sunburst-retro", "bluebell-wood", "chrysanthemum-blue", "pine-needle",
  "geo-burst", "blue-linen", "shiplap-white", "strawberry-fields",
  "sea-grass", "palmeral", "glasgow-bird", "edo-birds",
  "broadway-noir", "palm-paradise", "mosaic-blush", "sunset-stripe",
  "grasscloth-natural", "honeysuckle-trellis", "acanthus-scroll", "noma-grid",
  // Row 16-20
  "tropical-luxe", "farmhouse-bloom", "daisy-meadow", "bramble-rose",
  "peacock-manor", "wilderness-emerald", "lichen-stone", "moonlit-garden",
  "deco-lattice", "rainforest-floor", "stripe-dusk", "indigo-lattice",
  "lily-pad-pond", "etchings-seas", "golden-lily", "nordic-frost",
  "monstera-shadow", "american-toile", "boho-mudcloth", "canopy-illustrated",
  // Row 21-25
  "regency-damask", "fruit-folly", "moth-nocturne", "fornasetti-sol",
  "toile-de-verre", "flamingo-pink", "shell-bisque", "arctic-grove",
  "linen-weave", "sage-scatter", "fern-frond", "bird-and-pomegranate",
  "hygge-floral", "tangent-stripe", "loft-concrete", "perennial-garden",
  "jacobean-tree", "toile-countryside", "zebra-dusk", "deco-terrazzo",
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
  "bathroom",
  "hallway",
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

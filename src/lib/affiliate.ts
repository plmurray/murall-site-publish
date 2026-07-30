const AWIN_AFFID = "3013767";
const BASE_URL = "https://www.awin1.com/cread.php";

// Brand fallback homepages — used when a product has no Awin URL yet
const BRAND_URLS: Record<string, string> = {
  "rebel-walls":       "https://www.rebellwalls.com",
  "graham-brown":      "https://www.grahambrown.com",
  "chasing-paper":     "https://www.chasingpaper.com",
  "tempaper":          "https://www.tempaper.com",
  "sanderson":         "https://www.sanderson-uk.com",
  "morris-co":         "https://www.morris-and-co.com",
  "hygge-west":        "https://www.hyggeandwest.com",
  "harlequin":         "https://www.harlequin.uk.com",
  "york-wallcoverings":"https://www.yorkwallcoverings.com",
  "cole-son":          "https://www.cole-and-son.com",
  "brewster":          "https://www.brewsterwallcovering.com",
  "rifle-paper-co":    "https://www.riflepaperco.com",
  "osborne-little":    "https://www.osborneandlittle.com",
  "house-of-hackney":  "https://www.houseofhackney.com",
  "timorous-beasties": "https://www.timorousbeasties.com",
  "de-gournay":        "https://www.degournay.com",
  "fromental":         "https://www.fromental.co.uk",
};

interface AwinEntry {
  merchantId: string; // Awin awinmid — fill in when approved
  url: string;        // Exact product page on the brand's site
}

// ─── Fill these in as Awin approvals come through ─────────────────────────────
// Leave merchantId as "" to fall back to the brand homepage without tracking.
const AFFILIATE_MAP: Record<string, AwinEntry> = {
  "verdant-canopy":       { merchantId: "", url: "" },
  "emerald-conservatory": { merchantId: "", url: "" },
  "midnight-garden":      { merchantId: "", url: "" },
  "hex-noir":             { merchantId: "", url: "" },
  "archive-rose":         { merchantId: "", url: "" },
  "woods-cole-son":       { merchantId: "", url: "" },
  "momentum-grid":        { merchantId: "", url: "" },
  "papilio-botanical":    { merchantId: "", url: "" },
  "blackthorn":           { merchantId: "", url: "" },
  "diamond-lattice":      { merchantId: "", url: "" },
  "hummingbirds":         { merchantId: "", url: "" },
  "garden-party":         { merchantId: "", url: "" },
  "imperial-garden":      { merchantId: "", url: "" },
  "magnolia-peel-stick":  { merchantId: "", url: "" },
  "strawberry-thief":     { merchantId: "", url: "" },
  "nocturne":             { merchantId: "", url: "" },
  "verdure":              { merchantId: "", url: "" },
  "meadow-bloom":         { merchantId: "", url: "" },
  "velvet-forest":        { merchantId: "", url: "" },
  "art-deco-soleil":      { merchantId: "", url: "" },
};

// Returns a tracked Awin URL if the merchant is configured, otherwise falls
// back to the brand's homepage so the button is always functional.
export function getAffiliateUrl(productSlug: string, brandSlug: string): string {
  const entry = AFFILIATE_MAP[productSlug];
  if (entry?.merchantId && entry?.url) {
    const encoded = encodeURIComponent(entry.url);
    return `${BASE_URL}?awinmid=${entry.merchantId}&awinaffid=${AWIN_AFFID}&clickref=${productSlug}&p=${encoded}`;
  }
  // Fallback: link directly to the brand site (no commission until approved)
  return entry?.url || BRAND_URLS[brandSlug] || "https://murallwallpaper.com/brands";
}

export function isAffiliateLive(productSlug: string): boolean {
  const entry = AFFILIATE_MAP[productSlug];
  return !!(entry?.merchantId && entry?.url);
}

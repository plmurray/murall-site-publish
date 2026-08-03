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
  // ── Original 20 ──
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
  // ── Products 21–100 ──
  "jungle-reverie":       { merchantId: "", url: "" },
  "chevron-slate":        { merchantId: "", url: "" },
  "terracotta-wave":      { merchantId: "", url: "" },
  "coral-reef":           { merchantId: "", url: "" },
  "peony-garden":         { merchantId: "", url: "" },
  "willow-bough":         { merchantId: "", url: "" },
  "fjord-fog":            { merchantId: "", url: "" },
  "aurora-wave":          { merchantId: "", url: "" },
  "coastal-rope":         { merchantId: "", url: "" },
  "king-protea":          { merchantId: "", url: "" },
  "coastal-stripe":       { merchantId: "", url: "" },
  "wildflower-field":     { merchantId: "", url: "" },
  "folly-brook":          { merchantId: "", url: "" },
  "limerence":            { merchantId: "", url: "" },
  "thistle-dark":         { merchantId: "", url: "" },
  "shou-lao":             { merchantId: "", url: "" },
  "chevron-gold":         { merchantId: "", url: "" },
  "savanna-dusk":         { merchantId: "", url: "" },
  "arch-shadow":          { merchantId: "", url: "" },
  "desert-bloom":         { merchantId: "", url: "" },
  "sunburst-retro":       { merchantId: "", url: "" },
  "bluebell-wood":        { merchantId: "", url: "" },
  "chrysanthemum-blue":   { merchantId: "", url: "" },
  "pine-needle":          { merchantId: "", url: "" },
  "geo-burst":            { merchantId: "", url: "" },
  "blue-linen":           { merchantId: "", url: "" },
  "shiplap-white":        { merchantId: "", url: "" },
  "strawberry-fields":    { merchantId: "", url: "" },
  "sea-grass":            { merchantId: "", url: "" },
  "palmeral":             { merchantId: "", url: "" },
  "glasgow-bird":         { merchantId: "", url: "" },
  "edo-birds":            { merchantId: "", url: "" },
  "broadway-noir":        { merchantId: "", url: "" },
  "palm-paradise":        { merchantId: "", url: "" },
  "mosaic-blush":         { merchantId: "", url: "" },
  "sunset-stripe":        { merchantId: "", url: "" },
  "grasscloth-natural":   { merchantId: "", url: "" },
  "honeysuckle-trellis":  { merchantId: "", url: "" },
  "acanthus-scroll":      { merchantId: "", url: "" },
  "noma-grid":            { merchantId: "", url: "" },
  "tropical-luxe":        { merchantId: "", url: "" },
  "farmhouse-bloom":      { merchantId: "", url: "" },
  "daisy-meadow":         { merchantId: "", url: "" },
  "bramble-rose":         { merchantId: "", url: "" },
  "peacock-manor":        { merchantId: "", url: "" },
  "wilderness-emerald":   { merchantId: "", url: "" },
  "lichen-stone":         { merchantId: "", url: "" },
  "moonlit-garden":       { merchantId: "", url: "" },
  "deco-lattice":         { merchantId: "", url: "" },
  "rainforest-floor":     { merchantId: "", url: "" },
  "stripe-dusk":          { merchantId: "", url: "" },
  "indigo-lattice":       { merchantId: "", url: "" },
  "lily-pad-pond":        { merchantId: "", url: "" },
  "etchings-seas":        { merchantId: "", url: "" },
  "golden-lily":          { merchantId: "", url: "" },
  "nordic-frost":         { merchantId: "", url: "" },
  "monstera-shadow":      { merchantId: "", url: "" },
  "american-toile":       { merchantId: "", url: "" },
  "boho-mudcloth":        { merchantId: "", url: "" },
  "canopy-illustrated":   { merchantId: "", url: "" },
  "regency-damask":       { merchantId: "", url: "" },
  "fruit-folly":          { merchantId: "", url: "" },
  "moth-nocturne":        { merchantId: "", url: "" },
  "fornasetti-sol":       { merchantId: "", url: "" },
  "toile-de-verre":       { merchantId: "", url: "" },
  "flamingo-pink":        { merchantId: "", url: "" },
  "shell-bisque":         { merchantId: "", url: "" },
  "arctic-grove":         { merchantId: "", url: "" },
  "linen-weave":          { merchantId: "", url: "" },
  "sage-scatter":         { merchantId: "", url: "" },
  "fern-frond":           { merchantId: "", url: "" },
  "bird-and-pomegranate": { merchantId: "", url: "" },
  "hygge-floral":         { merchantId: "", url: "" },
  "tangent-stripe":       { merchantId: "", url: "" },
  "loft-concrete":        { merchantId: "", url: "" },
  "perennial-garden":     { merchantId: "", url: "" },
  "jacobean-tree":        { merchantId: "", url: "" },
  "toile-countryside":    { merchantId: "", url: "" },
  "zebra-dusk":           { merchantId: "", url: "" },
  "deco-terrazzo":        { merchantId: "", url: "" },
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

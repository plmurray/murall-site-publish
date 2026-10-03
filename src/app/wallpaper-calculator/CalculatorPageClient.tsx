"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ROLL_WIDTH_M = 0.52;
const ROLL_LENGTH_M = 10;
const PATTERN_REPEATS: Record<string, number> = {
  none: 0,
  small: 0.13,
  medium: 0.25,
  large: 0.53,
  half_drop: 0.32,
};

function round1(n: number) { return Math.round(n * 10) / 10; }

const RELATED = [
  { slug: "how-many-rolls-do-i-need", title: "The full rolls guide", desc: "Pattern repeat, UK vs US sizes, room-by-room reference table." },
  { slug: "wallpaper-cost-guide", title: "Wallpaper cost guide", desc: "Room-by-room price breakdown and decorator rates for 2026." },
  { slug: "how-to-wallpaper-a-room", title: "How to wallpaper a room", desc: "Complete step-by-step guide from wall prep to the final drop." },
];

export default function CalculatorPageClient() {
  const [wallWidth, setWallWidth]   = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [doors, setDoors]           = useState("0");
  const [windows, setWindows]       = useState("0");
  const [repeat, setRepeat]         = useState("none");
  const [unit, setUnit]             = useState<"m" | "ft">("m");
  const [result, setResult]         = useState<null | { rolls: number; usable: number; waste: number; strips: number }>(null);

  const toMetres = useCallback((v: string) => {
    const n = parseFloat(v) || 0;
    return unit === "ft" ? n * 0.3048 : n;
  }, [unit]);

  const calculate = () => {
    const w = toMetres(wallWidth);
    const h = toMetres(wallHeight);
    if (!w || !h) return;
    const patternRepeat  = PATTERN_REPEATS[repeat];
    const stripsPerRoll  = Math.floor(ROLL_LENGTH_M / (h + patternRepeat));
    const totalStrips    = Math.ceil(w / ROLL_WIDTH_M);
    const doorsAdj       = (parseInt(doors) || 0) * 2;
    const windowsAdj     = (parseInt(windows) || 0) * 1;
    const netStrips      = Math.max(totalStrips - doorsAdj - windowsAdj, 1);
    const rolls          = Math.ceil(netStrips / stripsPerRoll) + 1;
    const usable         = round1(netStrips * h);
    const waste          = round1(rolls * ROLL_LENGTH_M - usable);
    setResult({ rolls, usable, waste, strips: netStrips });
  };

  const reset = () => {
    setWallWidth(""); setWallHeight(""); setDoors("0");
    setWindows("0"); setRepeat("none"); setResult(null);
  };

  return (
    <main className="bg-[#FAF7F2] min-h-screen">
      {/* Hero */}
      <section className="border-b border-stone-200 bg-stone-950 text-white px-6 py-16 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Murall Tool</p>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
          Wallpaper Calculator
        </h1>
        <p className="text-stone-300 max-w-xl mx-auto text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
          Enter your wall measurements to find out exactly how many rolls you need — including pattern repeat waste and a contingency roll.
        </p>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Calculator card */}
        <div className="bg-white border border-stone-200 p-8 mb-12">
          {/* Unit toggle */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-stone-500 mr-1" style={{ fontFamily: "Inter, sans-serif" }}>Units:</span>
            {(["m", "ft"] as const).map((u) => (
              <button key={u} onClick={() => { setUnit(u); setResult(null); }}
                className={`px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${unit === u ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {u === "m" ? "Metres" : "Feet"}
              </button>
            ))}
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: `Wall width (${unit})`, value: wallWidth, set: setWallWidth, placeholder: unit === "m" ? "e.g. 4.2" : "e.g. 13.8" },
              { label: `Wall height (${unit})`, value: wallHeight, set: setWallHeight, placeholder: unit === "m" ? "e.g. 2.4" : "e.g. 7.9" },
            ].map(({ label, value, set, placeholder }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{label}</label>
                <input type="number" min="0" step="0.1" value={value}
                  onChange={(e) => { set(e.target.value); setResult(null); }}
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                  style={{ fontFamily: "Inter, sans-serif" }} />
              </div>
            ))}
          </div>

          {/* Doors & windows */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: "Number of doors", value: doors, set: setDoors },
              { label: "Number of windows", value: windows, set: setWindows },
            ].map(({ label, value, set }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{label}</label>
                <select value={value} onChange={(e) => { set(e.target.value); setResult(null); }}
                  className="w-full px-4 py-2.5 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {[0,1,2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            ))}
          </div>

          {/* Pattern repeat */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Pattern repeat</label>
            <select value={repeat} onChange={(e) => { setRepeat(e.target.value); setResult(null); }}
              className="w-full px-4 py-2.5 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}>
              <option value="none">No repeat / plain</option>
              <option value="small">Small repeat (up to 13cm)</option>
              <option value="medium">Medium repeat (14–25cm)</option>
              <option value="large">Large repeat (26–53cm)</option>
              <option value="half_drop">Half drop</option>
            </select>
          </div>

          <button onClick={calculate} disabled={!wallWidth || !wallHeight}
            className="w-full py-3.5 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-40 cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Calculate rolls needed
          </button>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
                className="mt-6 bg-stone-900 text-white p-6">
                <div className="text-center mb-6">
                  <p className="text-xs tracking-widest uppercase text-stone-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>You need</p>
                  <p className="text-7xl font-semibold text-white" style={{ fontFamily: "'EB Garamond', serif" }}>{result.rolls}</p>
                  <p className="text-stone-300 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    rolls <span className="text-stone-500">(includes 1 extra for waste &amp; matching)</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                  {[
                    { value: result.strips, label: "Strips needed" },
                    { value: `${result.usable}m²`, label: "Wall area" },
                    { value: `${result.waste}m`, label: "Spare length" },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-white/5 p-3">
                      <p className="text-lg font-semibold text-white" style={{ fontFamily: "'EB Garamond', serif" }}>{value}</p>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Link href="/products"
                    className="flex-1 py-2.5 bg-white text-stone-900 text-xs font-semibold text-center hover:bg-stone-100 transition-colors cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    Shop wallpaper →
                  </Link>
                  <button onClick={reset}
                    className="px-4 py-2.5 border border-white/20 text-white text-xs hover:bg-white/10 transition-colors cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    Reset
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-4 text-xs text-stone-400 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Based on standard UK roll size: 52cm × 10m. Always order 1 extra roll for pattern matching and future repairs. Check your chosen wallpaper for its exact roll dimensions.
          </p>
        </div>

        {/* How to measure */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-stone-900 mb-6" style={{ fontFamily: "'EB Garamond', serif" }}>How to measure your walls</h2>
          <ol className="space-y-4">
            {[
              { n: "1", heading: "Measure wall width", body: "Measure each wall you plan to paper from corner to corner. For all four walls, add the widths together to get the total perimeter. Enter the total perimeter as the wall width if doing all four walls, or the individual wall width for a single feature wall." },
              { n: "2", heading: "Measure wall height", body: "Measure from the top of the skirting board to the ceiling. Standard UK rooms are 2.4m (7.9ft). Add 50–75mm to account for trimming at top and bottom — the calculator handles this automatically." },
              { n: "3", heading: "Count doors and windows", body: "Count how many full-height doors and standard windows fall on the walls you are papering. The calculator deducts approximately 2 strips per door and 1 strip per standard window." },
              { n: "4", heading: "Check the pattern repeat", body: "The pattern repeat is printed on the roll label — look for a symbol of two squares with an arrow, or a number marked as 'rapport'. If the label says 0 or has no repeat symbol, select 'No repeat / plain'." },
            ].map(({ n, heading, body }) => (
              <li key={n} className="flex gap-5">
                <span className="flex-shrink-0 w-8 h-8 bg-stone-900 text-white text-sm font-semibold flex items-center justify-center" style={{ fontFamily: "'EB Garamond', serif" }}>{n}</span>
                <div>
                  <p className="text-sm font-semibold text-stone-900 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{heading}</p>
                  <p className="text-sm text-stone-600 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Pattern repeat explained */}
        <section className="mb-12 bg-white border border-stone-200 p-7">
          <h2 className="text-xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>What is pattern repeat?</h2>
          <p className="text-sm text-stone-600 leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
            Pattern repeat is the vertical distance before a wallpaper's design starts again. A plain paper has zero repeat. A large botanical mural might repeat every 53cm — meaning up to 53cm of each strip is trimmed as waste to align the pattern at every seam.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {[
              { type: "No repeat / plain", waste: "None", example: "Stripe, grasscloth, solid colour" },
              { type: "Small (up to 13cm)", waste: "Low", example: "Small geometric, fine texture" },
              { type: "Medium (14–25cm)", waste: "Moderate", example: "Most standard florals" },
              { type: "Large (26–53cm)", waste: "Significant", example: "Large botanical, mural-style" },
              { type: "Half drop", waste: "Moderate", example: "Diagonal compositions" },
            ].map(({ type, waste, example }) => (
              <div key={type} className="border border-stone-100 p-3">
                <p className="font-semibold text-stone-900 mb-0.5">{type}</p>
                <p className="text-stone-500">Waste: {waste}</p>
                <p className="text-stone-400">{example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pro tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-stone-900 mb-6" style={{ fontFamily: "'EB Garamond', serif" }}>Five things to know before you order</h2>
          <div className="space-y-4">
            {[
              { tip: "Always order one roll more than the calculation.", why: "Wallpaper is printed in batches. A roll from a different batch ordered later may not match the colour exactly — even from the same supplier." },
              { tip: "Order everything in a single purchase.", why: "Splitting your order across two transactions risks a batch mismatch. Calculate carefully and buy everything at once." },
              { tip: "Check the roll dimensions on your specific paper.", why: "This calculator uses the UK standard (52cm × 10m). Some papers — particularly US imports and wide-format murals — use different dimensions. Check the product page before ordering." },
              { tip: "For stairwells, add 30–40% to your estimate.", why: "Stairwell drops can be 4–5 metres long rather than 2.4m, and angled cuts at the top and bottom create more waste per drop than a standard room." },
              { tip: "Measure twice, especially for pattern repeats.", why: "A miscounted pattern repeat can result in running short mid-room, with no guarantee the same batch will be available." },
            ].map(({ tip, why }) => (
              <div key={tip} className="border-l-2 border-stone-900 pl-4">
                <p className="text-sm font-semibold text-stone-900 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{tip}</p>
                <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related articles */}
        <section>
          <h2 className="text-2xl font-semibold text-stone-900 mb-6" style={{ fontFamily: "'EB Garamond', serif" }}>Further reading</h2>
          <div className="grid gap-4">
            {RELATED.map(({ slug, title, desc }) => (
              <Link key={slug} href={`/journal/${slug}`}
                className="block border border-stone-200 bg-white p-5 hover:border-stone-400 transition-colors group">
                <p className="text-sm font-semibold text-stone-900 group-hover:text-stone-600 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{title} →</p>
                <p className="text-xs text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>{desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

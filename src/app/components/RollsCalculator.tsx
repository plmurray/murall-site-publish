"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ROLL_WIDTH_M = 0.52;  // standard roll width 52cm
const ROLL_LENGTH_M = 10;   // standard roll length 10m
const PATTERN_REPEATS: Record<string, number> = {
  none: 0,
  small: 0.13,
  medium: 0.25,
  large: 0.53,
  half_drop: 0.32,
};

function round1(n: number) { return Math.round(n * 10) / 10; }

export default function RollsCalculator({ isOpen, onClose }: Props) {
  const [wallWidth, setWallWidth]     = useState("");
  const [wallHeight, setWallHeight]   = useState("");
  const [doors, setDoors]             = useState("0");
  const [windows, setWindows]         = useState("0");
  const [repeat, setRepeat]           = useState("none");
  const [unit, setUnit]               = useState<"m" | "ft">("m");
  const [result, setResult]           = useState<null | { rolls: number; usable: number; waste: number; strips: number }>(null);

  const toMetres = useCallback((v: string) => {
    const n = parseFloat(v) || 0;
    return unit === "ft" ? n * 0.3048 : n;
  }, [unit]);

  const calculate = () => {
    const w = toMetres(wallWidth);
    const h = toMetres(wallHeight);
    if (!w || !h) return;

    const patternRepeat = PATTERN_REPEATS[repeat];
    const stripsPerRoll = Math.floor(ROLL_LENGTH_M / (h + patternRepeat));
    const totalStrips   = Math.ceil(w / ROLL_WIDTH_M);
    const doorsAdj      = (parseInt(doors) || 0) * 2;
    const windowsAdj    = (parseInt(windows) || 0) * 1;
    const netStrips     = Math.max(totalStrips - doorsAdj - windowsAdj, 1);
    const rolls         = Math.ceil(netStrips / stripsPerRoll);
    const rollsWithExtra = rolls + 1; // always recommend +1 extra
    const usable        = round1((netStrips * h));
    const waste         = round1((rollsWithExtra * ROLL_LENGTH_M) - usable);

    setResult({ rolls: rollsWithExtra, usable, waste, strips: netStrips });
  };

  const reset = () => {
    setWallWidth(""); setWallHeight(""); setDoors("0");
    setWindows("0"); setRepeat("none"); setResult(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50"
            onClick={onClose} aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-5 border-b border-stone-100">
                <div>
                  <h2 className="text-xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Rolls Calculator</h2>
                  <p className="text-xs text-stone-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Enter your wall measurements to find out how many rolls you need</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer" aria-label="Close calculator">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="px-7 py-6 space-y-5">
                {/* Unit toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 mr-1" style={{ fontFamily: "Inter, sans-serif" }}>Units:</span>
                  {(["m", "ft"] as const).map((u) => (
                    <button key={u} onClick={() => { setUnit(u); setResult(null); }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${unit === u ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      {u === "m" ? "Metres" : "Feet"}
                    </button>
                  ))}
                </div>

                {/* Wall dimensions */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: `Wall width (${unit})`, value: wallWidth, set: setWallWidth, placeholder: unit === "m" ? "e.g. 4.2" : "e.g. 13.8" },
                    { label: `Wall height (${unit})`, value: wallHeight, set: setWallHeight, placeholder: unit === "m" ? "e.g. 2.4" : "e.g. 7.9" },
                  ].map(({ label, value, set, placeholder }) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{label}</label>
                      <input type="number" min="0" step="0.1" value={value} onChange={(e) => { set(e.target.value); setResult(null); }}
                        placeholder={placeholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                        style={{ fontFamily: "Inter, sans-serif" }} />
                    </div>
                  ))}
                </div>

                {/* Doors & windows */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Number of doors", value: doors, set: setDoors },
                    { label: "Number of windows", value: windows, set: setWindows },
                  ].map(({ label, value, set }) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{label}</label>
                      <select value={value} onChange={(e) => { set(e.target.value); setResult(null); }}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        {[0,1,2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Pattern repeat */}
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Pattern repeat</label>
                  <select value={repeat} onChange={(e) => { setRepeat(e.target.value); setResult(null); }}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    <option value="none">No repeat / plain</option>
                    <option value="small">Small repeat (up to 13cm)</option>
                    <option value="medium">Medium repeat (14–25cm)</option>
                    <option value="large">Large repeat (26–53cm)</option>
                    <option value="half_drop">Half drop</option>
                  </select>
                </div>

                {/* Calculate button */}
                <button onClick={calculate} disabled={!wallWidth || !wallHeight}
                  className="w-full py-3.5 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-40 cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Calculate rolls needed
                </button>

                {/* Result */}
                <AnimatePresence>
                  {result && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
                      className="rounded-2xl bg-stone-900 text-white p-6">
                      <div className="text-center mb-6">
                        <p className="text-xs tracking-widest uppercase text-stone-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>You need</p>
                        <p className="text-6xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{result.rolls}</p>
                        <p className="text-stone-300 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>rolls <span className="text-stone-500">(includes 1 extra for waste &amp; matching)</span></p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                        <div className="bg-white/5 rounded-xl p-3">
                          <p className="text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{result.strips}</p>
                          <p className="text-[10px] text-stone-400 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Strips needed</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                          <p className="text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{result.usable}m²</p>
                          <p className="text-[10px] text-stone-400 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Wall area</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3">
                          <p className="text-lg font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{result.waste}m</p>
                          <p className="text-[10px] text-stone-400 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>Spare length</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <a href="#bestsellers"
                          className="flex-1 py-2.5 rounded-full bg-white text-stone-900 text-xs font-semibold text-center hover:bg-stone-100 transition-colors cursor-pointer"
                          style={{ fontFamily: "Inter, sans-serif" }} onClick={onClose}>
                          Shop wallpaper →
                        </a>
                        <button onClick={reset}
                          className="px-4 py-2.5 rounded-full border border-white/20 text-white text-xs hover:bg-white/10 transition-colors cursor-pointer"
                          style={{ fontFamily: "Inter, sans-serif" }}>
                          Reset
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Info note */}
                <p className="text-xs text-stone-400 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  * Based on standard roll size: 52cm × 10m. Always order 1 extra roll to allow for pattern matching, cutting waste, and future repairs. Check your chosen wallpaper for exact roll dimensions.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

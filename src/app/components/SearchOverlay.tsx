"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/context/SearchContext";

const SUGGESTIONS = [
  "Botanical wallpaper",
  "Peel and stick",
  "Dark moody bedroom",
  "Geometric living room",
  "Chinoiserie dining room",
  "Vintage floral",
];

const TRENDING = [
  { label: "Rebel Walls", tag: "brand" },
  { label: "Emerald greens", tag: "color" },
  { label: "Peel & Stick", tag: "type" },
];

export default function SearchOverlay() {
  const { query, setQuery, isOpen, closeSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeSearch]);

  const filtered = query.length > 1
    ? SUGGESTIONS.filter((s) => s.toLowerCase().includes(query.toLowerCase()))
    : SUGGESTIONS;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            aria-hidden="true"
          />
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
              {/* Input */}
              <div className="flex items-center gap-3 border-b border-stone-200 pb-4 mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 flex-shrink-0" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <label htmlFor="search-input" className="sr-only">Search wallpapers</label>
                <input
                  ref={inputRef}
                  id="search-input"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search wallpapers, brands, styles…"
                  className="flex-1 text-lg text-stone-900 placeholder-stone-300 outline-none bg-transparent"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                  autoComplete="off"
                />
                <button onClick={closeSearch} className="text-xs text-stone-400 hover:text-stone-700 cursor-pointer px-2 py-1 rounded hover:bg-stone-50 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                  ESC
                </button>
              </div>

              {/* Trending */}
              {!query && (
                <div className="mb-6">
                  <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Trending</p>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING.map((t) => (
                      <button key={t.label} onClick={() => setQuery(t.label)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-stone-200 text-sm text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors cursor-pointer"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        {t.label}
                        <span className="text-[10px] text-stone-300 uppercase">{t.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              <div>
                <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                  {query ? "Results" : "Suggestions"}
                </p>
                <ul className="space-y-1">
                  {filtered.map((s) => (
                    <li key={s}>
                      <button
                        onClick={() => { setQuery(s); closeSearch(); }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-none hover:bg-stone-50 text-left transition-colors cursor-pointer group"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300 group-hover:text-stone-500" aria-hidden="true">
                          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        <span className="text-sm text-stone-700 group-hover:text-stone-900" style={{ fontFamily: "Inter, sans-serif" }}>{s}</span>
                      </button>
                    </li>
                  ))}
                  {filtered.length === 0 && (
                    <li className="px-3 py-4 text-sm text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>
                      No results for "{query}"
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

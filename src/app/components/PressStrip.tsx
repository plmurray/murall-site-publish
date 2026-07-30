"use client";

import { motion } from "framer-motion";

const PRESS = [
  { name: "Architectural Digest", abbr: "AD", href: "https://www.architecturaldigest.com" },
  { name: "Elle Decoration", abbr: "ELLE DÉCOR", href: "https://www.elledecoration.co.uk" },
  { name: "Vogue Living", abbr: "VOGUE LIVING", href: "https://www.vogue.com" },
  { name: "House Beautiful", abbr: "HOUSE BEAUTIFUL", href: "https://www.housebeautiful.com" },
  { name: "The World of Interiors", abbr: "WORLD OF INTERIORS", href: "https://www.worldofinteriors.co.uk" },
  { name: "Dezeen", abbr: "DEZEEN", href: "https://www.dezeen.com" },
  { name: "Interior Design", abbr: "INTERIOR DESIGN", href: "https://www.interiordesign.net" },
  { name: "Homes & Gardens", abbr: "HOMES & GARDENS", href: "https://www.homesandgardens.com" },
];

const STATS = [
  { value: "50+", label: "Countries shipped to" },
  { value: "17", label: "Curated brands" },
  { value: "2,400+", label: "Trade clients" },
  { value: "4.9★", label: "Average review" },
];

export default function PressStrip() {
  return (
    <section className="w-full bg-white border-y border-stone-100" aria-label="Press coverage">
      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-0.5" style={{ fontFamily: "'EB Garamond', serif" }}>{s.value}</p>
              <p className="text-xs text-stone-400 tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Press marquee */}
      <div className="border-t border-stone-100 bg-stone-50 overflow-hidden py-4">
        <p className="text-center text-[10px] tracking-[0.25em] uppercase text-stone-300 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>As featured in</p>
        <div className="relative">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {[...PRESS, ...PRESS].map((pub, i) => (
              <a
                key={i}
                href={pub.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={pub.name}
                className="inline-flex items-center mx-8 text-sm font-semibold tracking-[0.12em] text-stone-400 uppercase select-none hover:text-stone-600 transition-colors"
                style={{ fontFamily: "Georgia, serif", letterSpacing: "0.12em" }}
              >
                {pub.abbr}
                <span className="mx-8 text-stone-200" aria-hidden="true">◆</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

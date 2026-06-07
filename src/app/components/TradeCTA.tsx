"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "35%", label: "Trade discount" },
  { value: "2,400+", label: "Trade clients" },
  { value: "48h", label: "Free sample delivery" },
  { value: "Net-30", label: "Invoice terms" },
];

export default function TradeCTA() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-stone-950" aria-labelledby="trade-cta-heading">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png"
          alt="" className="w-full h-full object-cover opacity-10" aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/95 to-stone-950/70" />
      </div>

      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BF9B5A]/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.2em] uppercase text-[#BF9B5A] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Trade &amp; professional programme
            </p>
            <h2 id="trade-cta-heading" className="text-4xl sm:text-5xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              The wallpaper resource <em>designers trust</em>
            </h2>
            <p className="text-stone-400 text-base leading-relaxed mb-8 max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
              Join 2,400+ interior designers, architects, and specifiers who source through Murall. Up to 35% trade discount, dedicated account management, unlimited free samples, and Net-30 invoicing.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {STATS.map((s, i) => (
                <motion.div key={s.value}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                  <p className="text-2xl font-semibold text-white mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="/trade"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Apply for trade access
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" /></svg>
              </a>
              <a href="/trade"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Learn more
              </a>
            </div>
          </motion.div>

          {/* Right — testimonial card */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#BF9B5A" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <blockquote>
                <p className="text-white/90 text-lg leading-relaxed mb-6 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  &ldquo;The trade programme has genuinely changed how I source wallpaper. The discount is real, the samples arrive fast, and my account manager actually knows my projects. Rare to find this level of service.&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#BF9B5A]/20 border border-[#BF9B5A]/40 flex items-center justify-center text-sm font-bold text-[#BF9B5A]">LF</div>
                  <div>
                    <p className="text-white text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>Lucinda Fraser</p>
                    <p className="text-stone-500 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Interior Designer, Edinburgh</p>
                  </div>
                </footer>
              </blockquote>

              {/* Mini stats row */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                {[["£2.4M+", "Annual trade spend"], ["98%", "Renewal rate"], ["< 2 days", "Approval time"]].map(([val, lab]) => (
                  <div key={lab}>
                    <p className="text-base font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{val}</p>
                    <p className="text-[10px] text-stone-500 mt-0.5 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>{lab}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gold bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BF9B5A]/60 to-transparent" />
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    id: 1,
    name: "Charlotte W.",
    location: "London, UK",
    rating: 5,
    title: "Transformed our entire living room",
    body: "I ordered the Verdant Canopy and honestly it changed the whole feel of our house. The quality is exceptional — rich colour, perfect pattern match. Arrived beautifully packaged, faster than expected.",
    product: "Verdant Canopy",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    verified: true,
    date: "2 June 2026",
  },
  {
    id: 2,
    name: "Marcus T.",
    location: "Sydney, Australia",
    rating: 5,
    title: "Best wallpaper shopping experience online",
    body: "The sample pack was a revelation — being able to see the actual paper and texture before committing saved me from the wrong choice. Ended up ordering the Hex Noir and it looks incredible.",
    product: "Hex Noir",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    verified: true,
    date: "28 May 2026",
  },
  {
    id: 3,
    name: "Sophie L.",
    location: "Paris, France",
    rating: 5,
    title: "Parfait — exactly as shown",
    body: "The colours in person are even more stunning than on screen. I was nervous ordering internationally but shipping was fast and everything arrived perfectly. Will absolutely order again.",
    product: "Midnight Garden",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    verified: true,
    date: "20 May 2026",
  },
  {
    id: 4,
    name: "James R.",
    location: "New York, USA",
    rating: 5,
    title: "Our clients are obsessed",
    body: "As an interior designer I source from Murall regularly. The trade programme pricing is genuinely competitive and my account manager actually knows my projects. Rare to find this level of service.",
    product: "Trade Programme",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    verified: true,
    date: "14 May 2026",
  },
  {
    id: 5,
    name: "Anita K.",
    location: "Stockholm, Sweden",
    rating: 5,
    title: "The rolls calculator saved me",
    body: "I always over-order wallpaper. Used the Murall calculator, ordered exactly what I needed, and had 0.5 rolls left over. That never happens. Plus the peel-and-stick held perfectly on my plaster walls.",
    product: "Emerald Conservatory",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    verified: true,
    date: "8 May 2026",
  },
  {
    id: 6,
    name: "Priya M.",
    location: "Dubai, UAE",
    rating: 5,
    title: "Worth every penny",
    body: "I've ordered from three wallpaper sites. Murall is in a different league — the curation, the service, the packaging. When my wallpaper arrived it was like receiving a luxury gift. Completely worth it.",
    product: "Midnight Garden",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    verified: true,
    date: "1 May 2026",
  },
];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= rating ? "#BF9B5A" : "none"} stroke="#BF9B5A" strokeWidth="1.5" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Stars rating={rating} size={12} />
      {count !== undefined && (
        <span className="text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>({count})</span>
      )}
    </div>
  );
}

export default function ReviewsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full py-20 bg-stone-50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Customer stories</p>
            <h2 id="reviews-heading" className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Loved by <em>design lovers</em>
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 border border-stone-100 shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Stars rating={5} size={16} />
                <span className="text-lg font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>4.9</span>
              </div>
              <p className="text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>From 1,240 verified reviews</p>
            </div>
          </div>
        </div>

        {/* Featured review */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <img src={REVIEWS[active].imageUrl} alt={`Room featuring ${REVIEWS[active].product}`}
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/0 lg:to-white/20" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-stone-700 border border-stone-200" style={{ fontFamily: "Inter, sans-serif" }}>
                    {REVIEWS[active].product}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Stars rating={REVIEWS[active].rating} size={18} />
                <blockquote className="mt-4 mb-6">
                  <p className="text-xl sm:text-2xl font-semibold text-stone-900 mb-4 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                    &ldquo;{REVIEWS[active].title}&rdquo;
                  </p>
                  <p className="text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {REVIEWS[active].body}
                  </p>
                </blockquote>
                <footer className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {REVIEWS[active].name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "Inter, sans-serif" }}>{REVIEWS[active].name}</p>
                      <p className="text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>{REVIEWS[active].location} · {REVIEWS[active].date}</p>
                    </div>
                  </div>
                  {REVIEWS[active].verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Verified purchase
                    </span>
                  )}
                </footer>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail nav */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {REVIEWS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActive(i)}
              className={`group relative rounded-xl overflow-hidden aspect-square cursor-pointer transition-all duration-200 ${active === i ? "ring-2 ring-stone-900 ring-offset-2" : "opacity-60 hover:opacity-100"}`}
              aria-label={`View review by ${r.name}`}
              aria-pressed={active === i}
            >
              <img src={r.imageUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

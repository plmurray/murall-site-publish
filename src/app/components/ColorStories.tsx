"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORIES = [
  {
    id: "dark-moody",
    name: "Dark & Moody",
    tagline: "Rooms with depth, drama, and intention",
    palette: ["#0d1f1a", "#1a1a2e", "#1E3A2F", "#2C3E50"],
    products: [
      { name: "Midnight Garden", brand: "Chasing Paper", price: 84, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png" },
      { name: "Hex Noir", brand: "Graham & Brown", price: 58, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png" },
      { name: "Verdant Canopy", brand: "Rebel Walls", price: 74, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png" },
    ],
    hero: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    bg: "bg-stone-900",
    text: "text-white",
    accent: "text-emerald-400",
  },
  {
    id: "botanical",
    name: "Botanical Escape",
    tagline: "Bring the outside in, all year round",
    palette: ["#1E3A2F", "#2d5a3e", "#4A8A6A", "#8fbc8f"],
    products: [
      { name: "Verdant Canopy", brand: "Rebel Walls", price: 74, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png" },
      { name: "Emerald Conservatory", brand: "Tempaper", price: 62, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png" },
      { name: "Midnight Garden", brand: "Chasing Paper", price: 84, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png" },
    ],
    hero: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    bg: "bg-emerald-950",
    text: "text-white",
    accent: "text-emerald-300",
  },
  {
    id: "soft-dawn",
    name: "Soft Dawn",
    tagline: "Calm, considered, quietly beautiful",
    palette: ["#FAF7F2", "#F5EFE6", "#E8DDD0", "#D4C4B0"],
    products: [
      { name: "Emerald Conservatory", brand: "Tempaper", price: 62, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png" },
      { name: "Hex Noir", brand: "Graham & Brown", price: 58, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png" },
      { name: "Verdant Canopy", brand: "Rebel Walls", price: 74, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png" },
    ],
    hero: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    bg: "bg-stone-50",
    text: "text-stone-900",
    accent: "text-stone-500",
  },
  {
    id: "bold-statement",
    name: "Bold Statement",
    tagline: "For those who refuse to be ignored",
    palette: ["#1a1a2e", "#16213e", "#0f3460", "#533483"],
    products: [
      { name: "Hex Noir", brand: "Graham & Brown", price: 58, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png" },
      { name: "Midnight Garden", brand: "Chasing Paper", price: 84, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png" },
      { name: "Emerald Conservatory", brand: "Tempaper", price: 62, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png" },
    ],
    hero: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    bg: "bg-slate-900",
    text: "text-white",
    accent: "text-sky-400",
  },
];

export default function ColorStories() {
  const [active, setActive] = useState(0);
  const story = STORIES[active];

  return (
    <section className="w-full py-20 bg-white" aria-labelledby="stories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Curated edits</p>
          <h2 id="stories-heading" className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Shop by <em>colour story</em>
          </h2>
          <p className="text-stone-500 text-sm mt-3 max-w-md mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Not sure where to start? Our editors have curated four distinct moods to help you find your style.
          </p>
        </div>

        {/* Story selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {STORIES.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${active === i ? "bg-stone-900 text-white shadow-lg" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
              style={{ fontFamily: "Inter, sans-serif" }}>
              {s.name}
            </button>
          ))}
        </div>

        {/* Story panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`${story.bg} rounded-3xl overflow-hidden`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
              {/* Hero image */}
              <div className="relative min-h-[300px] lg:min-h-0">
                <img src={story.hero} alt={`${story.name} colour story`} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                {/* Palette swatches */}
                <div className="absolute bottom-6 left-6 flex gap-2">
                  {story.palette.map((color, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white/40 shadow-lg" style={{ backgroundColor: color }} aria-hidden="true" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className={`text-xs tracking-widest uppercase mb-2 ${story.accent}`} style={{ fontFamily: "Inter, sans-serif" }}>Colour story</p>
                <h3 className={`text-3xl font-semibold mb-2 ${story.text}`} style={{ fontFamily: "'Playfair Display', serif" }}>{story.name}</h3>
                <p className={`text-sm mb-8 leading-relaxed ${story.text} opacity-70`} style={{ fontFamily: "Inter, sans-serif" }}>{story.tagline}</p>

                {/* Product list */}
                <div className="space-y-3 mb-8">
                  {story.products.map((p) => (
                    <motion.div key={p.name} whileHover={{ x: 4 }} transition={{ duration: 0.15 }}
                      className="flex items-center gap-4 cursor-pointer group">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${story.text} group-hover:opacity-80 transition-opacity`} style={{ fontFamily: "'Playfair Display', serif" }}>{p.name}</p>
                        <p className={`text-xs ${story.text} opacity-50`} style={{ fontFamily: "Inter, sans-serif" }}>{p.brand}</p>
                      </div>
                      <p className={`text-sm font-semibold ${story.text} opacity-70`} style={{ fontFamily: "Inter, sans-serif" }}>From ${p.price}</p>
                    </motion.div>
                  ))}
                </div>

                <a href="#bestsellers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer w-fit"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Shop this story
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" /></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

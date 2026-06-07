"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import SampleRequestModal from "@/app/components/SampleRequestModal";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";

const BRANDS = [
  {
    name: "Rebel Walls",
    origin: "Sweden",
    founded: 2007,
    specialty: "Botanical & Scenic Murals",
    priceRange: "$$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    description: "Swedish studio known for sweeping botanical murals and lush tropical scenes. Each design is printed to order on eco-certified substrate.",
    tags: ["Eco-certified", "Paste-the-Wall", "Custom sizing"],
    featured: true,
  },
  {
    name: "Graham & Brown",
    origin: "United Kingdom",
    founded: 1946,
    specialty: "Bold Geometric & Contemporary",
    priceRange: "$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    description: "A British heritage brand with nearly 80 years of wallpaper craft. Renowned for bold patterns, vibrant palettes, and exceptional value.",
    tags: ["Heritage", "Peel & Stick", "Paste-the-Wall"],
    featured: true,
  },
  {
    name: "Chasing Paper",
    origin: "United States",
    founded: 2013,
    specialty: "Peel & Stick & Removable",
    priceRange: "$$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    description: "The pioneers of removable peel-and-stick wallpaper. Perfect for renters and commitment-phobes who still want beautiful walls.",
    tags: ["Removable", "Renter-friendly", "Peel & Stick"],
    featured: false,
  },
  {
    name: "Tempaper",
    origin: "United States",
    founded: 2008,
    specialty: "Temporary & Self-Adhesive",
    priceRange: "$$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    description: "Premium self-adhesive wallpaper designed for easy application and removal without damaging walls. A favourite among interior designers.",
    tags: ["Self-adhesive", "No damage", "Designer favourite"],
    featured: false,
  },
  {
    name: "Cole & Son",
    origin: "United Kingdom",
    founded: 1873,
    specialty: "Luxury Heritage Prints",
    priceRange: "$$$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    description: "One of the world's most prestigious wallpaper houses, with archive prints dating back 150 years. A staple of high-end interior design.",
    tags: ["Luxury", "Archive prints", "Paste-the-Wall"],
    featured: true,
  },
  {
    name: "Hygge & West",
    origin: "United States",
    founded: 2009,
    specialty: "Scandinavian-inspired Modern",
    priceRange: "$$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    description: "Modern patterns inspired by Scandinavian design principles — clean lines, warm textures, and a deep respect for craft.",
    tags: ["Scandinavian", "Peel & Stick", "Paste-the-Wall"],
    featured: false,
  },
];

const PRICE_LABELS: Record<string, string> = {
  "$": "Budget-friendly",
  "$$": "Mid-range",
  "$$$": "Luxury",
};

function BrandCard({ brand, index }: { brand: typeof BRANDS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.img
          src={brand.imageUrl}
          alt={`${brand.name} wallpaper collection`}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
        {brand.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-600 text-white">Featured</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs text-white/70 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{brand.origin} · Est. {brand.founded}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-stone-900 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{brand.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 ml-2 flex-shrink-0" title={PRICE_LABELS[brand.priceRange]}>{brand.priceRange}</span>
        </div>
        <p className="text-xs text-emerald-700 font-medium mb-3 tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{brand.specialty}</p>
        <p className="text-sm text-stone-500 leading-relaxed mb-4 flex-1" style={{ fontFamily: "Inter, sans-serif" }}>{brand.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {brand.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-stone-50 border border-stone-200 text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function BrandsPage() {
  const [sampleOpen, setSampleOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const filtered = filter === "featured" ? BRANDS.filter((b) => b.featured) : BRANDS;

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Our partners</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              25 world-class <em>brands</em>
            </h1>
            <p className="text-stone-500 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              We partner only with studios we&apos;d hang in our own homes. Every brand is rigorously vetted for quality, sustainability, and design integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Filter pills */}
        <div className="flex gap-2 mb-10">
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer capitalize ${
                filter === f
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {f === "all" ? "All brands" : "Featured"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((brand, i) => (
            <BrandCard key={brand.name} brand={brand} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-widest uppercase text-emerald-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Trade programme</p>
          <h2 className="text-3xl font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Are you a designer or architect?</h2>
          <p className="text-stone-400 text-sm mb-8 max-w-md mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Unlock trade pricing across all 25 brands plus dedicated account support.
          </p>
          <a href="/trade" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
            Apply for trade access
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" /></svg>
          </a>
        </motion.div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

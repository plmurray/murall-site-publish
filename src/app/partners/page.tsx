"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import SampleRequestModal from "@/app/components/SampleRequestModal";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";

const PARTNERS = [
  {
    name: "Rebel Walls",
    origin: "Sweden",
    specialty: "Botanical & Scenic Murals",
    commission: "10%",
    description: "Sweeping botanical murals and lush tropical scenes, printed to order on eco-certified substrate.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    tags: ["Eco-certified", "Paste-the-Wall", "Custom sizing"],
    href: "/products",
    color: "emerald",
  },
  {
    name: "Graham & Brown",
    origin: "United Kingdom",
    specialty: "Bold Geometric & Contemporary",
    commission: "8%",
    description: "A British heritage brand with nearly 80 years of wallpaper craft. Bold patterns, vibrant palettes, exceptional value.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    tags: ["Heritage", "Peel & Stick", "Paste-the-Wall"],
    href: "/products",
    color: "amber",
  },
  {
    name: "Chasing Paper",
    origin: "United States",
    specialty: "Peel & Stick & Removable",
    commission: "10%",
    description: "The pioneers of removable peel-and-stick wallpaper. Perfect for renters and commitment-phobes.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    tags: ["Removable", "Renter-friendly", "Peel & Stick"],
    href: "/products",
    color: "rose",
  },
  {
    name: "Tempaper",
    origin: "United States",
    specialty: "Temporary & Self-Adhesive",
    commission: "8%",
    description: "Premium self-adhesive wallpaper designed for easy application and removal. A favourite among interior designers.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    tags: ["Self-adhesive", "No damage", "Designer favourite"],
    href: "/products",
    color: "violet",
  },
  {
    name: "Cole & Son",
    origin: "United Kingdom",
    specialty: "Luxury Heritage Prints",
    commission: "6%",
    description: "One of the world's most prestigious wallpaper houses. Archive prints dating back 150 years.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    tags: ["Luxury", "Archive prints", "Paste-the-Wall"],
    href: "/products",
    color: "amber",
  },
  {
    name: "Milton & King",
    origin: "Australia",
    specialty: "Maximalist & Artistic",
    commission: "10%",
    description: "Bold, artistic wallpaper designs that make a statement. Loved by designers who aren't afraid of colour.",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    tags: ["Artistic", "Bold", "Paste-the-Wall"],
    href: "/products",
    color: "rose",
  },
];

const NETWORKS = [
  { name: "ShareASale", brands: ["Chasing Paper", "Tempaper", "Milton & King"], url: "https://shareasale.com" },
  { name: "Awin", brands: ["Graham & Brown", "Farrow & Ball"], url: "https://awin.com" },
  { name: "CJ Affiliate", brands: ["Cole & Son", "Brewster Home"], url: "https://cj.com" },
  { name: "Impact", brands: ["Rebel Walls", "DADO"], url: "https://impact.com" },
];

const colorMap: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
};

export default function PartnersPage() {
  const [sampleOpen, setSampleOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const commissions = ["all", "10%+", "8%+", "6%+"];

  const filtered = PARTNERS.filter(p => {
    if (filter === "all") return true;
    const val = parseInt(p.commission);
    if (filter === "10%+") return val >= 10;
    if (filter === "8%+") return val >= 8;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png"
            alt="" className="w-full h-full object-cover opacity-10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 to-stone-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-widest uppercase text-amber-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Brand Partners</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4 max-w-2xl" style={{ fontFamily: "'EB Garamond', serif" }}>
              The world's finest <em>wallpaper brands</em>
            </h1>
            <p className="text-stone-300 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Every brand we carry is hand-selected for design excellence, quality, and sustainability. Shop direct — or earn commission promoting them.
            </p>
          </motion.div>

          {/* Network badges */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-3">
            {NETWORKS.map(n => (
              <a key={n.name} href={n.url} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-none bg-white/10 border border-white/20 text-white/70 text-xs font-medium hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {n.name} →
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-stone-50 border-b border-stone-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { val: "25+", label: "Partner brands" },
              { val: "Up to 10%", label: "Commission rate" },
              { val: "$280", label: "Avg. order value" },
              { val: "50+", label: "Countries shipped" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>{s.val}</p>
                <p className="text-xs text-stone-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs text-stone-400 uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>Filter by commission</span>
          {commissions.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-1.5 rounded-none text-xs font-medium transition-all cursor-pointer capitalize ${filter === c ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
              style={{ fontFamily: "Inter, sans-serif" }}>
              {c === "all" ? "All brands" : c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group bg-white rounded-none border border-stone-100 hover:border-stone-200 hover:shadow-lg transition-all overflow-hidden flex flex-col">
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                {/* Commission badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-none text-[10px] font-bold bg-amber-500 text-stone-900">
                    {p.commission} commission
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs text-white/70 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{p.origin}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-stone-900 mb-1" style={{ fontFamily: "'EB Garamond', serif" }}>{p.name}</h3>
                <p className="text-xs text-stone-400 uppercase tracking-wide mb-3" style={{ fontFamily: "Inter, sans-serif" }}>{p.specialty}</p>
                <p className="text-sm text-stone-500 leading-relaxed mb-4 flex-1" style={{ fontFamily: "Inter, sans-serif" }}>{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(tag => (
                    <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-none border ${colorMap[p.color]}`} style={{ fontFamily: "Inter, sans-serif" }}>{tag}</span>
                  ))}
                </div>
                <a href={p.href}
                  className="flex items-center justify-between px-4 py-2.5 rounded-none bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Shop {p.name}
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Affiliate CTA */}
      <section className="bg-stone-900 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-widest uppercase text-amber-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Earn with Murall</p>
          <h2 className="text-3xl font-semibold text-white mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
            Promote these brands, <em>earn commission</em>
          </h2>
          <p className="text-stone-400 text-sm mb-8 max-w-md mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Join the Murall affiliate programme and earn up to 12% on every sale you inspire across all our partner brands.
          </p>
          <a href="/affiliates"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none bg-amber-500 text-stone-900 text-sm font-bold hover:bg-amber-400 transition-colors cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Join the affiliate programme
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
          </a>
        </motion.div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

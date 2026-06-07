"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";

const SUGGESTED = [
  { label: "Botanical & Tropical", href: "/#categories" },
  { label: "Bold Geometric", href: "/#categories" },
  { label: "Peel & Stick", href: "/#categories" },
  { label: "Bestsellers", href: "/#bestsellers" },
  { label: "Trade programme", href: "/trade" },
  { label: "Our brands", href: "/brands" },
];

export default function NotFound() {
  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 text-center">
        {/* Decorative */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Mini MURALL WALLPAPER logo */}
          <svg width="200" height="50" viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-8 opacity-30" aria-hidden="true">
            <g transform="translate(48,30)">
              <ellipse cx="0" cy="28" rx="28" ry="11" transform="rotate(-22,0,28)" fill="#1E3A2F" stroke="#4A8A6A" strokeWidth="1"/>
              <ellipse cx="10" cy="52" rx="32" ry="12" transform="rotate(-8,10,52)" fill="#1E3A2F" stroke="#4A8A6A" strokeWidth="1"/>
              <ellipse cx="4" cy="76" rx="28" ry="11" transform="rotate(12,4,76)" fill="#1E3A2F" stroke="#4A8A6A" strokeWidth="1"/>
              <circle cx="4" cy="18" r="4" fill="#BF9B5A"/>
            </g>
            <g transform="translate(752,30) scale(-1,1)">
              <ellipse cx="0" cy="28" rx="28" ry="11" transform="rotate(-22,0,28)" fill="#1E3A2F" stroke="#4A8A6A" strokeWidth="1"/>
              <ellipse cx="10" cy="52" rx="32" ry="12" transform="rotate(-8,10,52)" fill="#1E3A2F" stroke="#4A8A6A" strokeWidth="1"/>
              <ellipse cx="4" cy="76" rx="28" ry="11" transform="rotate(12,4,76)" fill="#1E3A2F" stroke="#4A8A6A" strokeWidth="1"/>
              <circle cx="4" cy="18" r="4" fill="#BF9B5A"/>
            </g>
            <line x1="100" y1="34" x2="700" y2="34" stroke="#BF9B5A" strokeWidth="1.2"/>
            <polygon points="400,28 406,34 400,40 394,34" fill="#BF9B5A"/>
            <line x1="100" y1="132" x2="700" y2="132" stroke="#BF9B5A" strokeWidth="1.2"/>
            <polygon points="400,128 406,134 400,140 394,134" fill="#BF9B5A"/>
            <text x="400" y="96" textAnchor="middle" fontFamily="Georgia,serif" fontSize="58" fill="#0F0D0B" letterSpacing="16">MURALL</text>
            <text x="400" y="118" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fill="#BF9B5A" letterSpacing="14">WALLPAPER</text>
          </svg>

          <p className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>404 — Page not found</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            This wall is <em>bare</em>
          </h1>
          <p className="text-stone-500 text-lg mb-10 leading-relaxed max-w-md mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            The page you&apos;re looking for doesn&apos;t exist — but we have thousands of beautiful wallpapers that do.
          </p>
        </motion.div>

        {/* Primary CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12">
          <a href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Back to home
          </a>
          <a href="/#bestsellers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-200 text-stone-700 text-sm font-medium hover:border-stone-400 transition-colors cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Shop bestsellers
          </a>
        </motion.div>

        {/* Suggested links */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>
          <p className="text-xs tracking-widest uppercase text-stone-300 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>You might be looking for</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTED.map((s) => (
              <a key={s.label} href={s.href}
                className="px-4 py-2 rounded-full bg-stone-100 text-stone-600 text-xs font-medium hover:bg-stone-200 hover:text-stone-900 transition-colors cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Sample nudge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 p-6 bg-stone-50 rounded-2xl border border-stone-100">
          <p className="text-sm text-stone-600 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Not sure which wallpaper is right for you?
          </p>
          <button onClick={() => setSampleOpen(true)}
            className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Order a sample pack — from $12
          </button>
        </motion.div>
      </div>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

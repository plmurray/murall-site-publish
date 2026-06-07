"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import ProductGrid from "@/app/components/ProductGrid";
import CategoryGrid from "@/app/components/CategoryGrid";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HERO_BG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png";

const TRUST_ITEMS = [
  "Free shipping over $120",
  "25 curated brands",
  "Sample packs from $12",
  "Expert install guides",
  "Peel & Stick options",
  "30-day returns",
];

function Hero({ onSampleOpen }: { onSampleOpen: () => void }) {
  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden" aria-label="Hero">
      {/* Ken Burns background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <img
          src={HERO_BG}
          alt="Emerald Conservatory wallpaper — a lush botanical mural in deep greens"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-stone-900/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-24 pt-40">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs tracking-[0.2em] uppercase text-emerald-300 mb-4 font-medium"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          New arrivals — Summer 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.08] max-w-2xl mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Walls that<br /><em>tell stories</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-base sm:text-lg text-white/75 max-w-md mb-10 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          The world&apos;s most beautiful wallpaper, curated from 25 leading global brands. Botanical, geometric, murals, peel &amp; stick, luxury — delivered to 50+ countries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#bestsellers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors duration-200 cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Shop bestsellers
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10h12M10 4l6 6-6 6" />
            </svg>
          </a>
          <button
            onClick={onSampleOpen}
            className="inline-flex items-center px-6 py-3 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-200 cursor-pointer backdrop-blur-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Request a sample
          </button>
        </motion.div>
      </div>

      {/* Trust marquee */}
      <div className="absolute bottom-0 left-0 right-0 bg-stone-900/70 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap py-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 mx-6 text-xs text-white/70 tracking-wider uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden="true" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Murall ───────────────────────────────────────────────────────────────

const WHY_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "25 Curated Brands",
    body: "We hand-select every brand — from indie studios to iconic houses. No mass-market filler, ever.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Free Worldwide Shipping",
    body: "Every order over $120 ships free — tracked, insured, and delivered to your door.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Try Before You Commit",
    body: "Sample packs from $12. See the true colour and texture on your wall before ordering full rolls.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "30-Day Returns",
    body: "Changed your mind? Return unopened rolls within 30 days — no questions asked.",
  },
];

function WhyMurall() {
  return (
    <section className="w-full bg-stone-50 py-20" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Why murall</p>
          <h2 id="why-heading" className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Murall <em>difference</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-start"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 flex-shrink-0">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ────────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-stone-900 py-20" aria-labelledby="newsletter-heading">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs tracking-widest uppercase text-emerald-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Stay inspired</p>
          <h2 id="newsletter-heading" className="text-3xl sm:text-4xl font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Design stories, straight to your inbox
          </h2>
          <p className="text-stone-400 text-sm mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            New arrivals, interior inspiration, and exclusive subscriber offers — every fortnight.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <p className="text-white font-medium" style={{ fontFamily: "Inter, sans-serif" }}>You&apos;re on the list!</p>
                <p className="text-stone-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Check your inbox for a welcome gift.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors duration-200 disabled:opacity-60 cursor-pointer flex-shrink-0"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {loading ? (
                    <svg className="animate-spin w-4 h-4 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  ) : "Subscribe"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-stone-600 text-xs mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const FOOTER_LINKS: Record<string, string[]> = {
  Shop: ["Botanical & Tropical", "Bold Geometric", "Peel & Stick", "New Arrivals", "Bestsellers"],
  Help: ["Track Your Order", "Sizing Guide", "Installation Help", "Returns & Exchanges", "Contact Us"],
  Company: ["About Murall", "Our Brands", "Trade Programme", "Journal", "Careers"],
};

function Footer() {
  return (
    <footer className="w-full bg-stone-950 pt-16 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <svg width="460" height="115" viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg" aria-label="MURALL WALLPAPER" className="mb-3">
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
            <text x="400" y="96" textAnchor="middle" fontFamily="Georgia,serif" fontSize="58" fill="#FAF7F2" letterSpacing="16">MURALL</text>
            <text x="400" y="118" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fill="#BF9B5A" letterSpacing="14">WALLPAPER</text>
          </svg>
            <p className="text-stone-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Curated wallpaper from the world&apos;s finest studios. Ships free worldwide over $120.
            </p>
            <div className="flex gap-3">
              {["Instagram", "Pinterest", "TikTok"].map((social) => (
                <a key={social} href={`#${social.toLowerCase()}`} aria-label={social}
                  className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer">
                  <span className="text-[10px] font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs tracking-widest uppercase text-stone-400 mb-4 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-stone-500 hover:text-white transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2026 Murall Ltd. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs text-stone-600 hover:text-stone-400 transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} />
      <main>
        <Hero onSampleOpen={() => setSampleOpen(true)} />
        <ProductGrid />
        <CategoryGrid />
        <WhyMurall />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

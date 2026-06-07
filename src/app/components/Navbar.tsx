"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";

// ─── Murall Brand Logo ────────────────────────────────────────────────────────
function MurallLogo({ scrolled, dark = false }: { scrolled?: boolean; dark?: boolean }) {
  const textColor = dark ? "#0F0D0B" : scrolled ? "#0F0D0B" : "#FAF7F2";
  const goldColor = "#BF9B5A";
  const leafFill = "#1E3A2F";
  const leafStroke = "#4A8A6A";

  return (
    <svg width="600" height="150" viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg" aria-label="MURALL WALLPAPER">
      {/* Left botanical leaf */}
      <g transform="translate(48,30)">
        <ellipse cx="0" cy="28" rx="28" ry="11" transform="rotate(-22,0,28)" fill={leafFill} stroke={leafStroke} strokeWidth="1"/>
        <ellipse cx="10" cy="52" rx="32" ry="12" transform="rotate(-8,10,52)" fill={leafFill} stroke={leafStroke} strokeWidth="1"/>
        <ellipse cx="4" cy="76" rx="28" ry="11" transform="rotate(12,4,76)" fill={leafFill} stroke={leafStroke} strokeWidth="1"/>
        <circle cx="4" cy="18" r="4" fill={goldColor}/>
      </g>
      {/* Right botanical leaf (mirror) */}
      <g transform="translate(752,30) scale(-1,1)">
        <ellipse cx="0" cy="28" rx="28" ry="11" transform="rotate(-22,0,28)" fill={leafFill} stroke={leafStroke} strokeWidth="1"/>
        <ellipse cx="10" cy="52" rx="32" ry="12" transform="rotate(-8,10,52)" fill={leafFill} stroke={leafStroke} strokeWidth="1"/>
        <ellipse cx="4" cy="76" rx="28" ry="11" transform="rotate(12,4,76)" fill={leafFill} stroke={leafStroke} strokeWidth="1"/>
        <circle cx="4" cy="18" r="4" fill={goldColor}/>
      </g>
      {/* Gold rules + diamonds */}
      <line x1="100" y1="34" x2="700" y2="34" stroke={goldColor} strokeWidth="1.2"/>
      <polygon points="400,28 406,34 400,40 394,34" fill={goldColor}/>
      <line x1="100" y1="132" x2="700" y2="132" stroke={goldColor} strokeWidth="1.2"/>
      <polygon points="400,128 406,134 400,140 394,134" fill={goldColor}/>
      {/* Wordmark */}
      <text x="400" y="96" textAnchor="middle" fontFamily="Georgia,serif" fontSize="58" fill={textColor} letterSpacing="16">MURALL</text>
      <text x="400" y="118" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fill={goldColor} letterSpacing="14">WALLPAPER</text>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-stone-900 text-white text-[9px] font-semibold flex items-center justify-center leading-none"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

const SHOP_CATEGORIES = [
  { name: "Botanical & Tropical", count: 142 },
  { name: "Bold Geometric", count: 98 },
  { name: "Dark & Moody", count: 74 },
  { name: "Peel & Stick", count: 213 },
  { name: "Vintage Floral", count: null },
  { name: "Chinoiserie", count: null },
];

function MegaMenu({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-[480px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-100 p-6 z-50"
        >
          <div className="grid grid-cols-2 gap-2">
            {SHOP_CATEGORIES.map((cat) => (
              <a key={cat.name} href={`#${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer">
                <span className="text-sm font-medium text-stone-800 group-hover:text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>{cat.name}</span>
                {cat.count ? (
                  <span className="text-xs text-stone-400">{cat.count}</span>
                ) : (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-stone-100 text-stone-400">Soon</span>
                )}
              </a>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <a href="#bestsellers" className="text-xs tracking-widest uppercase text-emerald-700 hover:text-emerald-900 font-medium transition-colors">
              View all bestsellers →
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileMenu({ open, onClose, onSample }: { open: boolean; onClose: () => void; onSample: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-50 bg-white flex flex-col"
          role="dialog" aria-modal="true" aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-stone-100">
            <MurallLogo dark />
            <button onClick={onClose} className="p-2 text-stone-600 hover:text-stone-900 cursor-pointer" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 px-6 py-8 overflow-y-auto">
            {["Shop", "Brands", "Journal", "Trade", "Where we ship"].map((item) => (
              <a key={item} href={item === "Shop" ? "#shop" : item === "Where we ship" ? "/shipping" : `/${item.toLowerCase()}`}
                className="flex items-center justify-between py-4 border-b border-stone-100 text-lg font-medium text-stone-800 hover:text-emerald-700 transition-colors cursor-pointer"
                style={{ fontFamily: "'Playfair Display', serif" }} onClick={onClose}>
                {item}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h12M10 4l6 6-6 6" />
                </svg>
              </a>
            ))}
          </nav>
          <div className="px-6 pb-8">
            <button onClick={() => { onClose(); onSample(); }}
              className="block w-full text-center py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Request a Sample
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar({ onSampleOpen, onCalcOpen, lightMode = false }: { onSampleOpen: () => void; onCalcOpen?: () => void; lightMode?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  // isDark = white navbar mode (dark text, dark logo ink) — only when scrolled
  const isDark = scrolled;
  // darkBanner = inner pages get stone-900 banner so cream+gold logo is visible
  const darkBanner = lightMode && !scrolled;

  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();
  const { openSearch } = useSearch();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navBg = isDark
    ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-stone-100"
    : darkBanner
      ? "bg-stone-900/95 backdrop-blur-xl border-b border-stone-800"
      : "bg-transparent";

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBg}`}
        initial={{ y: -64 }} animate={{ y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-40">
            <a href="/" className="flex-shrink-0 cursor-pointer" aria-label="Murall Wallpaper home">
              <MurallLogo scrolled={isDark} />
            </a>

            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
                <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${isDark ? "text-stone-600 hover:text-stone-900 hover:bg-stone-50" : "text-white/80 hover:text-white hover:bg-white/10"}`}
                  aria-expanded={shopOpen} aria-haspopup="true" style={{ fontFamily: "Inter, sans-serif" }}>
                  Shop
                </button>
                <MegaMenu visible={shopOpen} />
              </div>
              {["Brands", "Journal", "Trade", "Where we ship"].map((item) => (
                <a key={item} href={item === "Where we ship" ? "/shipping" : `/${item.toLowerCase()}`}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${isDark ? "text-stone-600 hover:text-stone-900 hover:bg-stone-50" : "text-white/80 hover:text-white hover:bg-white/10"}`}
                  style={{ fontFamily: "Inter, sans-serif" }}>{item}</a>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              {onCalcOpen && (
                <button onClick={onCalcOpen}
                  className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer mr-1 ${isDark ? "text-stone-600 hover:text-stone-900 hover:bg-stone-50" : "text-white/80 hover:text-white hover:bg-white/10"}`}
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="8" x2="16" y1="10" y2="10"/><line x1="8" x2="12" y1="14" y2="14"/></svg>
                  Rolls calc
                </button>
              )}
              <button onClick={onSampleOpen}
                className={`hidden md:inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer mr-2 ${isDark ? "border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 bg-white/80" : "border-white/40 text-white/90 hover:border-white hover:text-white bg-white/10"} backdrop-blur-sm`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                Request a Sample
              </button>
              <button onClick={openSearch}
                className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${isDark ? "text-stone-600 hover:text-stone-900 hover:bg-stone-50" : "text-white/80 hover:text-white hover:bg-white/10"}`}
                aria-label="Search">
                <SearchIcon />
              </button>
              <button onClick={openCart}
                className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${isDark ? "text-stone-600 hover:text-stone-900 hover:bg-stone-50" : "text-white/80 hover:text-white hover:bg-white/10"}`}
                aria-label={`Cart, ${count} items`}>
                <CartIcon count={count} />
              </button>
              <button onClick={() => setMobileOpen(true)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-200 cursor-pointer ${isDark ? "text-stone-600 hover:text-stone-900" : "text-white/80 hover:text-white"}`}
                aria-label="Open menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onSample={onSampleOpen} />
    </>
  );
}

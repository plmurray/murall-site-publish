"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";

const INSTALL_FILTERS = ["All", "Paste-the-Wall", "Peel & Stick"];
const TAG_FILTERS = ["All styles", "Botanical", "Geometric", "Dark & Moody", "Bestseller", "New", "Renter-friendly"];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= rating ? "#BF9B5A" : "none"} stroke="#BF9B5A" strokeWidth="1.5" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.slug, name: product.name, brand: product.brand, price: product.price, imageUrl: product.imageUrl });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative overflow-hidden rounded-none aspect-[3/4] bg-stone-100 cursor-pointer"
      onClick={() => window.location.href = `/products/${product.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={product.imageUrl}
        alt={`${product.name} wallpaper by ${product.brand}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
        {product.isBestseller && <span className="px-2 py-0.5 rounded-none text-[10px] font-semibold bg-amber-50/90 text-amber-800 border border-amber-200">Bestseller</span>}
        {product.isNew && <span className="px-2 py-0.5 rounded-none text-[10px] font-semibold bg-emerald-50/90 text-emerald-800 border border-emerald-200">New</span>}
      </div>

      {/* Wishlist */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved(!saved); }}
            className={`absolute top-3 right-3 p-2 rounded-none backdrop-blur-sm transition-colors cursor-pointer ${saved ? "bg-stone-900 text-white" : "bg-white/80 text-stone-600 hover:text-stone-900"}`}
            aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-[10px] text-stone-300/80 uppercase tracking-widest mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{product.brand}</p>
        <h3 className="text-xl font-medium text-white leading-snug mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>{product.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Stars rating={product.rating} />
            <p className="text-sm font-semibold text-white/90">
              From ${product.price}<span className="text-xs font-normal text-white/50 ml-1">/ roll</span>
            </p>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-none font-medium border ${product.installType === "peel-and-stick" ? "bg-amber-900/60 text-amber-200 border-amber-700/50" : "bg-sky-900/60 text-sky-200 border-sky-700/50"}`}>
            {product.installType === "peel-and-stick" ? "Peel & Stick" : "Paste-the-Wall"}
          </span>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3"
            >
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-none text-xs font-semibold transition-all duration-200 cursor-pointer ${addedToCart ? "bg-emerald-600 text-white" : "bg-white text-stone-900 hover:bg-stone-100"}`}
                aria-label={`Add ${product.name} to cart`}
              >
                {addedToCart ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Added!</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>Add to cart</>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function ProductsPage() {
  const [sampleOpen, setSampleOpen] = useState(false);
  const [installFilter, setInstallFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All styles");
  const [sort, setSort] = useState("featured");

  let filtered = PRODUCTS.filter((p) => {
    const installMatch =
      installFilter === "All" ||
      (installFilter === "Paste-the-Wall" && (p.installType === "paste-the-wall" || p.installType === "both")) ||
      (installFilter === "Peel & Stick" && (p.installType === "peel-and-stick" || p.installType === "both"));
    const tagMatch = tagFilter === "All styles" || p.tags.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase()));
    return installMatch && tagMatch;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="pt-32 pb-14 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>All wallpapers</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
              The <em>full collection</em>
            </h1>
            <p className="text-stone-500 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              {PRODUCTS.length} designs from {[...new Set(PRODUCTS.map(p => p.brand))].length} world-class brands. Filter by style or installation type to find your perfect match.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Sort */}
      <div className="sticky top-0 z-30 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
            <div className="flex flex-wrap gap-2">
              {/* Install type */}
              {INSTALL_FILTERS.map((f) => (
                <button key={f} onClick={() => setInstallFilter(f)}
                  className={`px-3 py-1.5 rounded-none text-xs font-medium transition-all duration-200 cursor-pointer border ${installFilter === f ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {f}
                </button>
              ))}
              <span className="text-stone-200 self-center">|</span>
              {/* Tag filters */}
              {TAG_FILTERS.map((f) => (
                <button key={f} onClick={() => setTagFilter(f)}
                  className={`px-3 py-1.5 rounded-none text-xs font-medium transition-all duration-200 cursor-pointer border ${tagFilter === f ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>{filtered.length} results</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs border border-stone-200 rounded-none px-3 py-1.5 text-stone-700 bg-white focus:outline-none focus:border-stone-400 cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${installFilter}-${tagFilter}-${sort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {filtered.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-stone-400 text-lg mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>No wallpapers match those filters</p>
              <button onClick={() => { setInstallFilter("All"); setTagFilter("All styles"); }}
                className="text-sm text-emerald-700 underline underline-offset-4 cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sample CTA */}
      <section className="bg-stone-50 border-t border-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-1" style={{ fontFamily: "'EB Garamond', serif" }}>
              Not sure which to choose?
            </h2>
            <p className="text-stone-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Order a physical sample — see the true colour and texture on your wall before committing.
            </p>
          </div>
          <button onClick={() => setSampleOpen(true)}
            className="flex-shrink-0 px-6 py-3 rounded-none bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Order a sample — from $12
          </button>
        </div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

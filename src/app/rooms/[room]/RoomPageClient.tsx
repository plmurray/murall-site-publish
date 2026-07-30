"use client";

import { useState } from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import { getAffiliateUrl } from "@/lib/affiliate";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";
import { ROOMS, RoomKey } from "./data";

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

      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
        {product.isBestseller && <span className="px-2 py-0.5 text-[10px] font-semibold bg-amber-50/90 text-amber-800 border border-amber-200">Bestseller</span>}
        {product.isNew && <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50/90 text-emerald-800 border border-emerald-200">New</span>}
      </div>

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
          <span className={`text-[10px] px-2 py-0.5 font-medium border ${product.installType === "peel-and-stick" ? "bg-amber-900/60 text-amber-200 border-amber-700/50" : "bg-sky-900/60 text-sky-200 border-sky-700/50"}`}>
            {product.installType === "peel-and-stick" ? "Peel & Stick" : "Paste-the-Wall"}
          </span>
        </div>
        {hovered && (
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-3">
            <a
              href={getAffiliateUrl(product.slug, product.brandSlug)}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold bg-white text-stone-900 hover:bg-stone-100 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
              aria-label={`Buy ${product.name} from ${product.brand}`}
            >
              Buy from {product.brand}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}

export default function RoomPageClient({ params }: { params: Promise<{ room: string }> }) {
  const { room } = use(params);
  const [sampleOpen, setSampleOpen] = useState(false);

  if (!(room in ROOMS)) notFound();
  const data = ROOMS[room as RoomKey];

  const products = data.productSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter(Boolean) as typeof PRODUCTS;

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="pt-32 pb-14 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>
                <li><a href="/" className="hover:text-stone-600 transition-colors">Home</a></li>
                <li aria-hidden="true">›</li>
                <li><a href="/products" className="hover:text-stone-600 transition-colors">Wallpaper</a></li>
                <li aria-hidden="true">›</li>
                <li className="text-stone-600" aria-current="page">{data.name}</li>
              </ol>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>
              {data.headline}
            </h1>
            <p className="text-stone-500 text-lg max-w-2xl leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              {data.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {(["living-room", "bedroom", "nursery", "dining-room"] as RoomKey[]).map((r) => (
                <a
                  key={r}
                  href={`/rooms/${r}`}
                  className={`px-4 py-1.5 text-xs font-medium border transition-all duration-200 rounded-none ${r === room ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {ROOMS[r].name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>
            {products.length} curated picks for the {data.name.toLowerCase()}
          </p>
          <a href={data.filterHref} className="text-xs text-emerald-700 font-medium hover:text-emerald-900 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
            See full collection →
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </div>

      {/* Design tips */}
      <section className="bg-stone-50 border-y border-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Expert advice</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-10" style={{ fontFamily: "'EB Garamond', serif" }}>
            Styling your <em>{data.name.toLowerCase()}</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {data.tips.map((tip) => (
              <div key={tip.heading} className="border-t-2 border-stone-900 pt-6">
                <h3 className="text-lg font-semibold text-stone-900 mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>{tip.heading}</h3>
                <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other rooms */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-8" style={{ fontFamily: "Inter, sans-serif" }}>Shop by room</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(Object.entries(ROOMS) as [RoomKey, typeof ROOMS[RoomKey]][])
              .filter(([r]) => r !== room)
              .slice(0, 3)
              .map(([r, d]) => {
                const first = PRODUCTS.find((p) => p.slug === d.productSlugs[0]);
                return (
                  <a key={r} href={`/rooms/${r}`} className="group relative overflow-hidden aspect-[4/3] block cursor-pointer">
                    {first && (
                      <img
                        src={first.imageUrl}
                        alt={`${d.name} wallpaper`}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5">
                      <p className="text-xs text-stone-300/70 uppercase tracking-widest mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Explore</p>
                      <p className="text-xl font-semibold text-white" style={{ fontFamily: "'EB Garamond', serif" }}>{d.name}</p>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>
      </section>

      {/* Sample CTA */}
      <section className="bg-stone-900 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-widest uppercase text-emerald-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Before you commit</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
            Order a physical sample
          </h2>
          <p className="text-stone-400 text-sm max-w-sm mx-auto mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
            See the true colour and texture on your wall before ordering full rolls. From $12.
          </p>
          <button
            onClick={() => setSampleOpen(true)}
            className="px-8 py-3 bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer rounded-none"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Order a sample — from $12
          </button>
        </motion.div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

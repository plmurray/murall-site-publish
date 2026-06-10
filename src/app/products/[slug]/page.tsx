"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notFound } from "next/navigation";
import { use } from "react";
import { getProduct, getRelatedProducts } from "@/lib/products";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";
import { useCart } from "@/context/CartContext";

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= rating ? "#BF9B5A" : "none"} stroke="#BF9B5A" strokeWidth="1.5" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const { addItem } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sampleOpen, setSampleOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.slug, name: product.name, brand: product.brand, price: product.price, imageUrl: product.imageUrl });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>
          <li><a href="/" className="hover:text-stone-700 transition-colors cursor-pointer">Home</a></li>
          <li aria-hidden="true">›</li>
          <li><a href="/#bestsellers" className="hover:text-stone-700 transition-colors cursor-pointer">Shop</a></li>
          <li aria-hidden="true">›</li>
          <li className="text-stone-700">{product.name}</li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Image gallery */}
          <div className="sticky top-28">
            {/* Main image */}
            <div
              className="relative aspect-[4/3] rounded-none overflow-hidden bg-stone-100 mb-3 cursor-zoom-in"
              onClick={() => setZoomed(true)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={`${product.name} — image ${activeImg + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isBestseller && <span className="px-2.5 py-1 rounded-none text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">Bestseller</span>}
                {product.isNew && <span className="px-2.5 py-1 rounded-none text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">New</span>}
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4">
                <span className="px-2.5 py-1 rounded-none bg-white/80 backdrop-blur-sm text-[10px] text-stone-600 border border-stone-200">Click to zoom</span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`relative w-20 aspect-square rounded-none overflow-hidden border-2 transition-all cursor-pointer ${activeImg === i ? "border-stone-900" : "border-transparent hover:border-stone-300"}`}
                    aria-label={`View image ${i + 1}`} aria-pressed={activeImg === i}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="py-2">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{product.brand}</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <Stars rating={product.rating} size={16} />
              <span className="text-sm text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>{product.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>${product.price}</span>
              <span className="text-stone-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{product.priceUnit}</span>
            </div>

            {/* Description */}
            <p className="text-stone-600 leading-relaxed mb-6 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{product.description}</p>

            {/* Install type */}
            <div className="flex items-center gap-2 mb-6 p-3 bg-stone-50 rounded-none border border-stone-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A8A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="text-xs font-medium text-stone-700 capitalize" style={{ fontFamily: "Inter, sans-serif" }}>
                {product.installType === "peel-and-stick" ? "Peel & Stick — removable, no paste needed" : "Paste-the-Wall — permanent, professional finish"}
              </span>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-stone-200 rounded-full overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer text-lg leading-none" aria-label="Decrease quantity">−</button>
                <span className="px-4 text-sm font-semibold text-stone-900 min-w-[2rem] text-center" style={{ fontFamily: "Inter, sans-serif" }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer text-lg leading-none" aria-label="Increase quantity">+</button>
              </div>
              <button onClick={handleAddToCart}
                className={`flex-1 py-3 rounded-none text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${added ? "bg-emerald-600 text-white" : "bg-stone-900 text-white hover:bg-stone-800"}`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {added ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>Added to cart</>
                ) : (
                  <>Add {qty} roll{qty > 1 ? "s" : ""} to cart — ${product.price * qty}</>
                )}
              </button>
            </div>

            <button onClick={() => setSampleOpen(true)}
              className="w-full py-3 rounded-none border border-stone-200 text-stone-700 text-sm font-medium hover:border-stone-400 transition-colors cursor-pointer mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Order a sample — from $12
            </button>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2.5 py-1 rounded-none bg-stone-100 text-stone-500 border border-stone-200" style={{ fontFamily: "Inter, sans-serif" }}>{tag}</span>
              ))}
            </div>

            {/* Specifications */}
            <div className="border-t border-stone-100 pt-6">
              <h2 className="text-sm font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>Product specifications</h2>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-[10px] uppercase tracking-widest text-stone-400 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </dt>
                    <dd className="text-sm text-stone-700" style={{ fontFamily: "Inter, sans-serif" }}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Shipping */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: "🚚", label: "Free shipping", sub: "Orders over $120" },
                { icon: "↩", label: "30-day returns", sub: "Unopened rolls" },
                { icon: "📦", label: "Tracked delivery", sub: "To 50+ countries" },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="text-center p-3 bg-stone-50 rounded-none border border-stone-100">
                  <p className="text-xl mb-1" aria-hidden="true">{icon}</p>
                  <p className="text-xs font-semibold text-stone-800" style={{ fontFamily: "Inter, sans-serif" }}>{label}</p>
                  <p className="text-[10px] text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-stone-100" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-semibold text-stone-900 mb-8" style={{ fontFamily: "'EB Garamond', serif" }}>You may also love</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <a key={r.slug} href={`/products/${r.slug}`}
                  className="group flex gap-4 p-4 rounded-none border border-stone-100 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="w-20 h-20 rounded-none overflow-hidden flex-shrink-0">
                    <img src={r.imageUrl} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-400 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>{r.brand}</p>
                    <p className="text-base font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors truncate" style={{ fontFamily: "'EB Garamond', serif" }}>{r.name}</p>
                    <p className="text-sm text-stone-600 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>From ${r.price} / roll</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1 text-stone-300 group-hover:text-stone-600 transition-colors" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomed(false)}>
            <motion.img
              src={product.images[activeImg]}
              alt={product.name}
              className="max-w-full max-h-full rounded-none shadow-2xl object-contain"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />
            <button onClick={() => setZoomed(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close zoom">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

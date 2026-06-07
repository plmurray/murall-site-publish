"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  installType: "paste-the-wall" | "peel-and-stick";
  imageUrl: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const PRODUCTS: Product[] = [
  { id: "1", name: "Verdant Canopy", brand: "Rebel Walls", price: 74, installType: "paste-the-wall", imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png", isBestseller: true },
  { id: "2", name: "Hex Noir", brand: "Graham & Brown", price: 58, installType: "peel-and-stick", imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png", isNew: true },
  { id: "3", name: "Midnight Garden", brand: "Chasing Paper", price: 84, installType: "paste-the-wall", imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png", isBestseller: true },
  { id: "4", name: "Emerald Conservatory", brand: "Tempaper", price: 62, installType: "peel-and-stick", imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png", isNew: true },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id: product.id, name: product.name, brand: product.brand, price: product.price, imageUrl: product.imageUrl });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl aspect-[3/4] bg-stone-100 mb-3">
        <motion.img src={product.imageUrl} alt={`${product.name} wallpaper by ${product.brand}`} loading="lazy"
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} />
        <motion.div className="absolute inset-0 bg-stone-900/20" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }} />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestseller && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">Bestseller</span>}
          {product.isNew && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">New</span>}
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.button initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.18 }}
              onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer ${saved ? "bg-stone-900 text-white" : "bg-white/80 text-stone-600 hover:text-stone-900"}`}
              aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} aria-pressed={saved}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }} transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-3">
              <button onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${addedToCart ? "bg-emerald-600 text-white" : "bg-white/90 backdrop-blur-sm text-stone-900 hover:bg-white"}`}
                aria-label={`Add ${product.name} to cart`}>
                {addedToCart ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Added!</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /><line x1="12" x2="12" y1="14" y2="20" /><line x1="9" x2="15" y1="17" y2="17" /></svg>Add to cart</>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-0.5">
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">{product.brand}</p>
        <h3 className="text-base font-medium text-stone-900 mb-1 leading-snug group-hover:text-emerald-800 transition-colors duration-200"
          style={{ fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-stone-800">From ${product.price}<span className="text-xs font-normal text-stone-400 ml-1">/ roll</span></p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${product.installType === "peel-and-stick" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-sky-50 text-sky-700 border border-sky-100"}`}>
            {product.installType === "peel-and-stick" ? "Peel & Stick" : "Paste-the-Wall"}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductGrid() {
  return (
    <section id="bestsellers" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" aria-labelledby="bestsellers-heading">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Editor&apos;s picks</p>
          <h2 id="bestsellers-heading" className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            This week&apos;s <em>bestsellers</em>
          </h2>
        </div>
        <a href="#all-products" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
          See all
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" /></svg>
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {PRODUCTS.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}

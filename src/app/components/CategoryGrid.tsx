"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type InstallType = "all" | "paste-the-wall" | "peel-and-stick";

interface Category {
  id: string;
  name: string;
  productCount: number;
  imageUrl: string | null;
  installTypes: InstallType[];
  comingSoon?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  {
    id: "botanical",
    name: "Botanical & Tropical",
    productCount: 142,
    imageUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    installTypes: ["all", "paste-the-wall", "peel-and-stick"],
  },
  {
    id: "geometric",
    name: "Bold Geometric",
    productCount: 98,
    imageUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    installTypes: ["all", "paste-the-wall", "peel-and-stick"],
  },
  {
    id: "dark-moody",
    name: "Dark & Moody",
    productCount: 74,
    imageUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    installTypes: ["all", "paste-the-wall"],
  },
  {
    id: "peel-stick",
    name: "Peel & Stick",
    productCount: 213,
    imageUrl: null,
    installTypes: ["all", "peel-and-stick"],
    comingSoon: false,
  },
  {
    id: "vintage-floral",
    name: "Vintage Floral",
    productCount: 0,
    imageUrl: null,
    installTypes: ["all", "paste-the-wall"],
    comingSoon: true,
  },
  {
    id: "chinoiserie",
    name: "Chinoiserie",
    productCount: 0,
    imageUrl: null,
    installTypes: ["all", "paste-the-wall"],
    comingSoon: true,
  },
];

const FILTER_OPTIONS: { label: string; value: InstallType }[] = [
  { label: "All Styles", value: "all" },
  { label: "Paste-the-Wall", value: "paste-the-wall" },
  { label: "Peel & Stick", value: "peel-and-stick" },
];

// ─── Placeholder image (used when imageUrl is null) ───────────────────────────

function PlaceholderBg({ name }: { name: string }) {
  // Subtle gradient placeholder derived from category name length (deterministic)
  const hue = (name.charCodeAt(0) * 7 + name.length * 13) % 360;
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, hsl(${hue},18%,88%) 0%, hsl(${(hue + 30) % 360},12%,80%) 100%)`,
      }}
    />
  );
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10h12M10 4l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Category Tile ────────────────────────────────────────────────────────────

function CategoryTile({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group
        border-2 transition-colors duration-300
        ${hovered ? "border-emerald-600/60" : "border-transparent"}
        ${category.comingSoon ? "opacity-70" : ""}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="link"
      tabIndex={0}
      aria-label={`Browse ${category.name} wallpapers${category.comingSoon ? " — coming soon" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // navigate to category page
        }
      }}
    >
      {/* Background image or placeholder */}
      {category.imageUrl ? (
        <motion.img
          src={category.imageUrl}
          alt={`${category.name} wallpaper style`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ) : (
        <PlaceholderBg name={category.name} />
      )}

      {/* Dark gradient overlay — deepens on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.08) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 55%, rgba(0,0,0,0.0) 100%)",
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Top-right badges */}
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
        {category.comingSoon ? (
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-white/20 text-white/70 backdrop-blur-sm border border-white/20">
            Coming Soon
          </span>
        ) : (
          category.productCount > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-black/40 text-white/90 backdrop-blur-sm border border-white/10">
              {category.productCount} styles
            </span>
          )
        )}
      </div>

      {/* Bottom-left label + arrow */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex items-end justify-between">
        <div>
          <p
            className="text-white/60 text-xs tracking-widest uppercase mb-1 font-sans"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {category.comingSoon ? "Coming Soon" : "Explore"}
          </p>
          <h3
            className="text-white text-xl font-semibold leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {category.name}
          </h3>
        </div>

        {/* Arrow slides in from left on hover */}
        <AnimatePresence>
          {hovered && !category.comingSoon && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.22 }}
              className="text-emerald-300 flex-shrink-0 mb-1"
            >
              <ArrowIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Focus ring for keyboard nav */}
      <div className="absolute inset-0 rounded-xl ring-0 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 pointer-events-none" />
    </motion.div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

function FilterBar({
  active,
  onChange,
}: {
  active: InstallType;
  onChange: (v: InstallType) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter by installation type"
      className="flex items-center gap-2 flex-wrap"
    >
      {FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border
            ${
              active === opt.value
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900"
            }
          `}
          aria-pressed={active === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CategoryGrid() {
  const [activeFilter, setActiveFilter] = useState<InstallType>("all");

  const filtered = CATEGORIES.filter((c) =>
    c.installTypes.includes(activeFilter)
  );

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      aria-labelledby="categories-heading"
    >
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p
            className="text-xs tracking-widest uppercase text-stone-400 mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Curated styles
          </p>
          <h2
            id="categories-heading"
            className="text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Shop by <em>style</em>
          </h2>
        </div>
        <FilterBar active={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((category, index) => (
            <CategoryTile key={category.id} category={category} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-stone-400"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          No categories match this filter yet.
        </motion.div>
      )}

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
}

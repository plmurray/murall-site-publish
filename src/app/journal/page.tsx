"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import SampleRequestModal from "@/app/components/SampleRequestModal";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";

const POSTS = [
  {
    slug: "how-to-choose-wallpaper-for-small-rooms",
    category: "How-to",
    title: "How to choose wallpaper for small rooms (without making them feel smaller)",
    excerpt: "The conventional wisdom says avoid bold patterns in small spaces. We beg to differ — here's how to use scale, colour, and placement to your advantage.",
    author: "Harriet Cole",
    date: "4 June 2026",
    readTime: "6 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    featured: true,
  },
  {
    slug: "peel-and-stick-vs-paste-the-wall",
    category: "Guide",
    title: "Peel & Stick vs Paste-the-Wall: which is right for your project?",
    excerpt: "Both have their place. We break down durability, finish quality, and the real cost difference so you can make the right call for your home.",
    author: "James Whitfield",
    date: "28 May 2026",
    readTime: "5 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    featured: true,
  },
  {
    slug: "botanical-wallpaper-trend-2026",
    category: "Trend",
    title: "Why botanical wallpaper is the defining interior trend of 2026",
    excerpt: "From oversized tropical leaves to delicate herbarium prints, the natural world is making its way indoors in a big way this year.",
    author: "Sofia Laurent",
    date: "19 May 2026",
    readTime: "4 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    featured: false,
  },
  {
    slug: "how-many-rolls-do-i-need",
    category: "How-to",
    title: "How many rolls do I need? The definitive wallpaper calculator guide",
    excerpt: "Measure twice, order once. We walk you through the exact formula — accounting for pattern repeat, door and window cutouts, and when to order extra.",
    author: "Harriet Cole",
    date: "12 May 2026",
    readTime: "7 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    featured: false,
  },
  {
    slug: "interview-rebel-walls",
    category: "Interview",
    title: "Inside Rebel Walls: the Swedish studio redefining the mural",
    excerpt: "We sat down with Rebel Walls' creative director to talk about their process, their love of imperfect nature, and what's coming in 2027.",
    author: "James Whitfield",
    date: "2 May 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    featured: false,
  },
  {
    slug: "accent-wall-ideas",
    category: "Inspiration",
    title: "10 accent wall ideas that interior designers actually approve of",
    excerpt: "Forget the feature wall clichés. These are the wallpaper moments that our favourite designers have used to transform ordinary rooms into something memorable.",
    author: "Sofia Laurent",
    date: "24 Apr 2026",
    readTime: "5 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    featured: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "How-to": "bg-sky-50 text-sky-700 border-sky-100",
  "Guide": "bg-amber-50 text-amber-700 border-amber-100",
  "Trend": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Interview": "bg-violet-50 text-violet-700 border-violet-100",
  "Inspiration": "bg-rose-50 text-rose-700 border-rose-100",
};

function PostCard({ post, index, large = false }: { post: typeof POSTS[0]; index: number; large?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group cursor-pointer flex flex-col ${large ? "" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.location.href = `/journal/${post.slug}`}
    >
      <div className={`relative overflow-hidden rounded-none mb-4 ${large ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-none border ${CATEGORY_COLORS[post.category] || "bg-stone-100 text-stone-600 border-stone-200"}`}
            style={{ fontFamily: "Inter, sans-serif" }}>
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>{post.date}</span>
        <span className="text-stone-200" aria-hidden="true">·</span>
        <span className="text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>{post.readTime}</span>
      </div>

      <h2 className={`font-semibold text-stone-900 mb-2 leading-snug group-hover:text-emerald-800 transition-colors duration-200 ${large ? "text-2xl sm:text-3xl" : "text-base"}`}
        style={{ fontFamily: "'EB Garamond', serif" }}>
        {post.title}
      </h2>

      <p className={`text-stone-500 leading-relaxed mb-3 ${large ? "text-base" : "text-sm"}`}
        style={{ fontFamily: "Inter, sans-serif" }}>
        {post.excerpt}
      </p>

      <div className="flex items-center gap-2 mt-auto">
        <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-600">
          {post.author[0]}
        </div>
        <span className="text-xs text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>{post.author}</span>
        <span className="ml-auto text-xs text-emerald-700 font-medium group-hover:underline" style={{ fontFamily: "Inter, sans-serif" }}>Read →</span>
      </div>
    </motion.article>
  );
}

const ALL_CATEGORIES = ["All", "How-to", "Guide", "Trend", "Interview", "Inspiration"];

export default function JournalPage() {
  const [sampleOpen, setSampleOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = POSTS.filter((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);
  const filtered = activeCategory === "All" ? rest : rest.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>The Murall Journal</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
              Stories, guides &amp; <em>inspiration</em>
            </h1>
            <p className="text-stone-500 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Everything you need to choose, hang, and love your wallpaper. From trend reports to step-by-step install guides.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Featured posts */}
        <div className="mb-16">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-8" style={{ fontFamily: "Inter, sans-serif" }}>Featured</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featured.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} large />
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-none text-xs font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>

      {/* Newsletter strip */}
      <section className="bg-stone-900 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-widest uppercase text-emerald-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Never miss a story</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8" style={{ fontFamily: "'EB Garamond', serif" }}>
            Get the Journal delivered fortnightly
          </h2>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="journal-email" className="sr-only">Email address</label>
            <input id="journal-email" type="email" placeholder="your@email.com" required
              className="flex-1 px-4 py-3 rounded-none bg-white/10 border border-white/20 text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <button type="submit" className="px-6 py-3 rounded-none bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors cursor-pointer flex-shrink-0"
              style={{ fontFamily: "Inter, sans-serif" }}>Subscribe</button>
          </form>
        </motion.div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

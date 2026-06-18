"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const POSTS = [
  { id: 1, handle: "@thehouseofwren", location: "London, UK", likes: 1240, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png", caption: "Finally finished the dining room 🌿 The Verdant Canopy is even more stunning in person. Absolutely obsessed.", wallpaper: "Verdant Canopy", tall: true },
  { id: 2, handle: "@studiomadebylou", location: "Paris, France", likes: 876, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png", caption: "Geometric dreams in the home office. Hex Noir from @murallwallpaper — it makes the whole room feel intentional.", wallpaper: "Hex Noir", tall: false },
  { id: 3, handle: "@nightgardenhome", location: "Melbourne, AU", likes: 2103, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png", caption: "Midnight Garden turned our plain bedroom into something from a dream. Best wallpaper decision we've ever made.", wallpaper: "Midnight Garden", tall: false },
  { id: 4, handle: "@roomsbyrafaela", location: "New York, USA", likes: 934, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png", caption: "The peel & stick is a game changer for renters. Up in 3 hours, looking like a professional install.", wallpaper: "Emerald Conservatory", tall: true },
  { id: 5, handle: "@interiors.by.k", location: "Stockholm, Sweden", likes: 1567, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png", caption: "Client reveal today — they cried happy tears when they saw it. That's the Murall effect.", wallpaper: "Verdant Canopy", tall: false },
  { id: 6, handle: "@theplasteredwall", location: "Dublin, Ireland", likes: 712, img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png", caption: "Pattern matching was perfect — couldn't be happier. The rolls calculator was spot on too, not a strip wasted.", wallpaper: "Hex Noir", tall: false },
];

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function PostCard({ post, index }: { post: typeof POSTS[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`relative group rounded-none overflow-hidden cursor-pointer ${post.tall ? "row-span-2" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative overflow-hidden ${post.tall ? "h-full min-h-[420px]" : "aspect-square"}`}>
        <motion.img
          src={post.img} alt={`${post.handle} — ${post.wallpaper}`}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-stone-900/60 flex flex-col justify-between p-4"
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span className="text-white text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>{post.handle}</span>
                <span className="text-stone-300 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>{post.location}</span>
              </div>

              {/* Caption */}
              <div>
                <p className="text-white text-xs leading-relaxed mb-3 line-clamp-3" style={{ fontFamily: "Inter, sans-serif" }}>{post.caption}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-1 rounded-none bg-white/20 text-white backdrop-blur-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                    {post.wallpaper}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
                    className="flex items-center gap-1.5 text-xs cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    aria-label={liked ? "Unlike" : "Like"}
                    aria-pressed={liked}
                  >
                    <HeartIcon filled={liked} />
                    <span className={liked ? "text-red-400" : "text-white"}>
                      {liked ? post.likes + 1 : post.likes}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instagram handle badge */}
        {!hovered && (
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] text-white/80 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{post.handle}</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function UGCFeed() {
  return (
    <section className="w-full py-20 bg-stone-50" aria-labelledby="ugc-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Real homes, real walls</p>
            <h2 id="ugc-heading" className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>
              The <em>#MurallHome</em> community
            </h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-none border border-stone-200 text-stone-600 text-xs font-medium hover:border-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            Follow @murallwallpaper
          </a>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[200px]">
          {POSTS.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-stone-500 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
            Tag <strong className="text-stone-700">#MurallHome</strong> on Instagram to be featured
          </p>
          <a href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Shop the looks
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

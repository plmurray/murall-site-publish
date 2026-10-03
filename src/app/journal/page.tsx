"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import SampleRequestModal from "@/app/components/SampleRequestModal";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";

const POSTS = [
  {
    slug: "living-room-wallpaper-ideas",
    category: "Inspiration",
    title: "Living Room Wallpaper Ideas: 12 Looks That Interior Designers Actually Recommend",
    excerpt: "The living room is the hardest room to get right — and the one where wallpaper makes the most dramatic difference. Here are 12 ideas worth stealing.",
    author: "Sofia Laurent",
    date: "18 September 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    featured: true,
  },
  {
    slug: "wallpaper-trends-2026",
    category: "Trend",
    title: "Wallpaper Trends 2026: The 10 Directions Defining Interiors Right Now",
    excerpt: "From the sustained dominance of dark botanicals to the unexpected return of the dado rail — what is actually selling and what is quietly fading out.",
    author: "Sofia Laurent",
    date: "2 October 2026",
    readTime: "9 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    featured: true,
  },
  {
    slug: "floral-wallpaper-ideas",
    category: "Inspiration",
    title: "Floral Wallpaper Ideas: 11 Ways to Use the Most Enduring Pattern in Interiors",
    excerpt: "Florals are the only wallpaper pattern that has never been out of fashion — because they were never fully in it. From the barely-there ditsy to the floor-to-ceiling maximalist.",
    author: "Sofia Laurent",
    date: "3 October 2026",
    readTime: "7 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    featured: false,
  },
  {
    slug: "wallpaper-vs-paint",
    category: "Guide",
    title: "Wallpaper vs Paint: Which Is Right for Your Room?",
    excerpt: "Most people frame this as an either/or. It isn't. Wallpaper and paint are different tools for different jobs — and knowing which job each does better is what separates a considered room from a generic one.",
    author: "James Whitfield",
    date: "3 October 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    featured: false,
  },
  {
    slug: "home-office-wallpaper-ideas",
    category: "Inspiration",
    title: "Home Office Wallpaper Ideas: 10 Ways to Make Your Workspace Actually Work",
    excerpt: "Most home offices are decorated like an afterthought — beige walls, flat lighting, a chair pushed against whatever space is available. Wallpaper is one of the fastest ways to change that.",
    author: "James Whitfield",
    date: "3 October 2026",
    readTime: "7 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    featured: false,
  },
  {
    slug: "kids-room-wallpaper-ideas",
    category: "Inspiration",
    title: "Kids' Room Wallpaper Ideas: 12 Designs That Actually Last",
    excerpt: "The hardest wallpaper brief isn't 'make it beautiful' — it's 'make it beautiful for a five-year-old and still work when they're twelve.' These 12 ideas solve that problem.",
    author: "Sofia Laurent",
    date: "3 October 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    featured: false,
  },
  {
    slug: "feature-wall-ideas",
    category: "Guide",
    title: "Feature Wall Ideas: How to Choose the Right Wall and Get It Right",
    excerpt: "A feature wall done well is one of the most cost-effective design decisions in a home. The difference is almost always in which wall you choose.",
    author: "Sofia Laurent",
    date: "2 October 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    featured: false,
  },
  {
    slug: "dining-room-wallpaper-ideas",
    category: "Inspiration",
    title: "Dining Room Wallpaper Ideas: 10 Looks That Make Every Meal Feel Like an Occasion",
    excerpt: "The dining room is the strongest argument for bold wallpaper in the house. You sit in it, at close range, for an hour at a time, under lamplight.",
    author: "Sofia Laurent",
    date: "2 October 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    featured: false,
  },
  {
    slug: "bedroom-wallpaper-ideas",
    category: "Inspiration",
    title: "Bedroom Wallpaper Ideas: 10 Designer-Approved Looks for Every Style",
    excerpt: "The bedroom rewards bolder choices than almost any other room — you're looking at it last thing at night and first thing in the morning.",
    author: "Sofia Laurent",
    date: "2 October 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    featured: false,
  },
  {
    slug: "hallway-wallpaper-ideas",
    category: "Inspiration",
    title: "Hallway Wallpaper Ideas: 12 Ways to Make Your First Impression Count",
    excerpt: "The hallway is the room every visitor sees first — and the one most homeowners neglect. These 12 ideas work with the hallway's specific challenges.",
    author: "Sofia Laurent",
    date: "2 October 2026",
    readTime: "7 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    featured: false,
  },
  {
    slug: "bathroom-wallpaper-ideas",
    category: "Inspiration",
    title: "Bathroom Wallpaper Ideas: Yes, You Can — Here's How to Do It Right",
    excerpt: "The biggest question isn't which design to choose — it's whether wallpaper can survive a bathroom at all. The answer is yes, with conditions.",
    author: "James Whitfield",
    date: "2 October 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    featured: false,
  },
  {
    slug: "kitchen-wallpaper-ideas",
    category: "Inspiration",
    title: "Kitchen Wallpaper Ideas: What Works, What Doesn't, and 10 Looks Worth Trying",
    excerpt: "Whether wallpaper survives a kitchen depends on where you put it and what type you choose. Here is how to get it right.",
    author: "James Whitfield",
    date: "2 October 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    featured: false,
  },
  {
    slug: "wallpaper-for-dark-rooms",
    category: "Guide",
    title: "Wallpaper for Dark Rooms: What Actually Works (and What Makes It Worse)",
    excerpt: "The standard advice for dark rooms — go pale, go light — is wrong more often than it is right. Here is what actually works in north-facing rooms.",
    author: "Sofia Laurent",
    date: "2 October 2026",
    readTime: "8 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    featured: false,
  },
  {
    slug: "wallpaper-cost-guide",
    category: "Guide",
    title: "How Much Does Wallpaper Cost? A Room-by-Room Price Guide for 2026",
    excerpt: "A room-by-room breakdown of material costs, decorator rates, and the costs most people forget to budget for — with specific 2026 UK figures.",
    author: "James Whitfield",
    date: "2 October 2026",
    readTime: "9 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    featured: false,
  },
  {
    slug: "how-to-remove-wallpaper",
    category: "How-to",
    title: "How to Remove Wallpaper: The Complete Step-by-Step Guide",
    excerpt: "Done correctly, wallpaper removal leaves walls ready to decorate the same day. Done badly, it leaves torn plaster and residue that causes every subsequent finish to fail.",
    author: "James Whitfield",
    date: "2 October 2026",
    readTime: "9 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    featured: false,
  },
  {
    slug: "how-to-wallpaper-a-room",
    category: "How-to",
    title: "How to Wallpaper a Room: A Complete Beginner's Guide",
    excerpt: "Hanging wallpaper yourself is entirely achievable with the right preparation and a methodical approach. This step-by-step guide covers everything from wall prep to the final drop.",
    author: "James Whitfield",
    date: "25 September 2026",
    readTime: "11 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    featured: false,
  },
  {
    slug: "best-peel-and-stick-wallpaper",
    category: "Guide",
    title: "Best Peel & Stick Wallpaper 2026: The Definitive Brand Guide",
    excerpt: "We've assessed every major removable wallpaper brand — adhesive quality, print fidelity, wall compatibility, and how cleanly they remove.",
    author: "James Whitfield",
    date: "18 September 2026",
    readTime: "10 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    featured: false,
  },
  {
    slug: "how-to-choose-wallpaper-for-small-rooms",
    category: "How-to",
    title: "How to choose wallpaper for small rooms (without making them feel smaller)",
    excerpt: "The conventional wisdom says avoid bold patterns in small spaces. We beg to differ — here's how to use scale, colour, and placement to your advantage.",
    author: "Harriet Cole",
    date: "4 June 2026",
    readTime: "6 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
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
    slug: "peel-and-stick-vs-paste-the-wall",
    category: "Guide",
    title: "Peel & Stick vs Paste-the-Wall: which is right for your project?",
    excerpt: "Both have their place. We break down durability, finish quality, and the real cost difference so you can make the right call for your home.",
    author: "James Whitfield",
    date: "28 May 2026",
    readTime: "5 min read",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    featured: false,
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
];

const CATEGORY_COLORS: Record<string, string> = {
  "How-to": "bg-sky-50 text-sky-700 border-sky-100",
  "Guide": "bg-amber-50 text-amber-700 border-amber-100",
  "Trend": "bg-brand-forest text-brand-gold border-brand-gold",
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

      <h2 className={`font-semibold text-stone-900 mb-2 leading-snug group-hover:text-brand-gold transition-colors duration-200 ${large ? "text-2xl sm:text-3xl" : "text-base"}`}
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
        <span className="ml-auto text-xs text-brand-gold font-medium group-hover:underline" style={{ fontFamily: "Inter, sans-serif" }}>Read →</span>
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
            <p className="text-xs text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>The Murall Journal</p>
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
          <p className="text-xs text-stone-400 mb-8" style={{ fontFamily: "Inter, sans-serif" }}>Featured</p>
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
          <p className="text-xs text-brand-gold mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Never miss a story</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8" style={{ fontFamily: "'EB Garamond', serif" }}>
            Get the Journal delivered fortnightly
          </h2>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="journal-email" className="sr-only">Email address</label>
            <input id="journal-email" type="email" placeholder="your@email.com" required
              className="flex-1 px-4 py-3 rounded-none bg-white/10 border border-white/20 text-white placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              style={{ fontFamily: "Inter, sans-serif" }} />
            <button type="submit" className="px-6 py-3 rounded-none bg-brand-forest text-white text-sm font-semibold hover:bg-brand-forest transition-colors cursor-pointer flex-shrink-0"
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

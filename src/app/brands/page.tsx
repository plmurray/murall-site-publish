"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import SampleRequestModal from "@/app/components/SampleRequestModal";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";

// ─── REPLACE shopUrl with your affiliate tracking link from each network ───────
// Network key: "ShareASale" → app.shareasale.com | "Awin" → ui.awin.com
// "Trade" brands → apply at the URL listed, then dropship at full margin
const BRANDS = [
  {
    name: "Rebel Walls",
    origin: "Sweden",
    founded: 2007,
    specialty: "Botanical & Scenic Murals",
    priceRange: "$$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    description: "Swedish studio known for sweeping botanical murals and lush tropical scenes. Each design is printed to order on eco-certified substrate.",
    tags: ["Eco-certified", "Paste-the-Wall", "Custom sizing"],
    featured: true,
    hasAffiliate: true,
    affiliateNetwork: "ShareASale",
    commission: "8–10%",
    shopUrl: "https://www.rebelwalls.com",
  },
  {
    name: "Cole & Son",
    origin: "United Kingdom",
    founded: 1873,
    specialty: "Luxury Heritage Prints",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    description: "One of the world's most prestigious wallpaper houses, with archive prints dating back 150 years. A staple of high-end interior design globally.",
    tags: ["Luxury", "Archive prints", "Paste-the-Wall"],
    featured: true,
    hasAffiliate: false,
    affiliateNetwork: "Trade only",
    commission: "30–50% margin",
    shopUrl: "https://www.cole-and-son.com",
  },
  {
    name: "Graham & Brown",
    origin: "United Kingdom",
    founded: 1946,
    specialty: "Bold Geometric & Contemporary",
    priceRange: "$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    description: "A British heritage brand with nearly 80 years of wallpaper craft. Renowned for bold patterns, vibrant palettes, and exceptional value.",
    tags: ["Heritage", "Peel & Stick", "Paste-the-Wall"],
    featured: true,
    hasAffiliate: true,
    affiliateNetwork: "Awin",
    commission: "8%",
    shopUrl: "https://www.grahambrown.com",
  },
  {
    name: "de Gournay",
    origin: "United Kingdom",
    founded: 1986,
    specialty: "Hand-painted Chinoiserie & Scenic",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80",
    description: "The world's most coveted hand-painted wallcovering studio. Each panel is painted by hand on silk or paper in de Gournay's studios. Bespoke and made to order.",
    tags: ["Hand-painted", "Bespoke", "Silk panels"],
    featured: true,
    hasAffiliate: false,
    affiliateNetwork: "Trade only",
    commission: "30–50% margin",
    shopUrl: "https://www.degournay.com",
  },
  {
    name: "Farrow & Ball",
    origin: "United Kingdom",
    founded: 1946,
    specialty: "Chalky Paint & Coordinating Wallpaper",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    description: "The iconic British paint and wallpaper maker behind the most distinctive colour palette in interiors. Their wallpapers are designed to coordinate perfectly with their paints.",
    tags: ["Heritage", "Eco-conscious", "Paste-the-Wall"],
    featured: true,
    hasAffiliate: false,
    affiliateNetwork: "Trade only",
    commission: "30–50% margin",
    shopUrl: "https://www.farrow-ball.com",
  },
  {
    name: "Sanderson",
    origin: "United Kingdom",
    founded: 1860,
    specialty: "English Floral & Botanical Heritage",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80",
    description: "One of Britain's oldest wallpaper manufacturers with an unrivalled archive of floral and botanical prints. Beloved for its English country house aesthetic.",
    tags: ["Heritage", "Botanical", "Archive"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "Awin",
    commission: "8%",
    shopUrl: "https://www.sanderson-uk.com",
  },
  {
    name: "Morris & Co.",
    origin: "United Kingdom",
    founded: 1861,
    specialty: "Arts & Crafts Nature Prints",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    description: "Founded by William Morris, the father of the Arts & Crafts movement. Famous nature-inspired patterns that have been in continuous production since the 1860s.",
    tags: ["Arts & Crafts", "Heritage", "Nature-inspired"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "Awin",
    commission: "8%",
    shopUrl: "https://www.morrisandco.com",
  },
  {
    name: "Designers Guild",
    origin: "United Kingdom",
    founded: 1970,
    specialty: "Bold Colour & Maximalist Pattern",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
    description: "Tricia Guild's iconic London studio is celebrated for its fearless use of colour and painterly floral designs. A benchmark for maximalist luxury interiors.",
    tags: ["Maximalist", "Floral", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "Awin",
    commission: "5–8%",
    shopUrl: "https://www.designersguild.com",
  },
  {
    name: "Osborne & Little",
    origin: "United Kingdom",
    founded: 1968,
    specialty: "Luxury Fabric-Inspired Wallpaper",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    description: "A quintessential British luxury interiors house producing sumptuous wallpapers that borrow richly from their textile collections. Designed for the most discerning interiors.",
    tags: ["Luxury", "Fabric-inspired", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: false,
    affiliateNetwork: "Trade only",
    commission: "30–50% margin",
    shopUrl: "https://www.osborneandlittle.com",
  },
  {
    name: "Harlequin",
    origin: "United Kingdom",
    founded: 1956,
    specialty: "Contemporary Geometric & Botanical",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    description: "A leader in contemporary British wallpaper design, with vibrant geometric patterns and fresh botanical prints that sit beautifully in modern residential spaces.",
    tags: ["Contemporary", "Geometric", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "Awin",
    commission: "8%",
    shopUrl: "https://www.harlequin.uk.com",
  },
  {
    name: "Zoffany",
    origin: "United Kingdom",
    founded: 1983,
    specialty: "Classic English Country House",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    description: "The refined choice for traditional English and European interiors. Zoffany's archive of damasks, stripes, and woven patterns is without equal in its category.",
    tags: ["Traditional", "Archive", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "Awin",
    commission: "8%",
    shopUrl: "https://www.zoffany.com",
  },
  {
    name: "F. Schumacher & Co.",
    origin: "United States",
    founded: 1889,
    specialty: "American Heritage & Archive",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    description: "One of America's most storied textile and wallcovering houses, producing designs in collaboration with leading architects and designers for over 130 years.",
    tags: ["Heritage", "Collaborative", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: false,
    affiliateNetwork: "Trade only",
    commission: "30–50% margin",
    shopUrl: "https://www.fschumacher.com",
  },
  {
    name: "Pierre Frey",
    origin: "France",
    founded: 1935,
    specialty: "French Luxury Textile & Wallcovering",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    description: "A Parisian family business producing some of the world's most exquisite printed fabrics and wallpapers. Known for exotic prints, toiles, and refined French elegance.",
    tags: ["French luxury", "Toile", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: false,
    affiliateNetwork: "Trade only",
    commission: "30–50% margin",
    shopUrl: "https://www.pierrefrey.com",
  },
  {
    name: "Elitis",
    origin: "France",
    founded: 1988,
    specialty: "Textured & Tactile Wallcovering",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description: "A Bordeaux-born design house celebrated for sensuous, tactile wallcoverings that blur the line between textile and paper. A favourite on high-spec hospitality projects.",
    tags: ["Textured", "Hospitality-grade", "French"],
    featured: false,
    hasAffiliate: false,
    affiliateNetwork: "Trade only",
    commission: "30–50% margin",
    shopUrl: "https://www.elitis.fr",
  },
  {
    name: "Arte",
    origin: "Belgium",
    founded: 1981,
    specialty: "Premium Belgian Wallcovering",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    description: "A world-class Belgian manufacturer producing high-performance wallcoverings for luxury residential and commercial interiors. Renowned for innovation in material and texture.",
    tags: ["Commercial-grade", "Innovation", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: false,
    affiliateNetwork: "Trade only",
    commission: "30–50% margin",
    shopUrl: "https://www.arte-international.com",
  },
  {
    name: "Timorous Beasties",
    origin: "United Kingdom",
    founded: 1990,
    specialty: "Subversive & Contemporary Scottish",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
    description: "The Glasgow studio renowned for darkly witty, politically charged wallpaper designs. A cult favourite among architects and designers seeking something truly original.",
    tags: ["Cult brand", "Screen-printed", "Collector's item"],
    featured: false,
    hasAffiliate: false,
    affiliateNetwork: "Direct — contact brand",
    commission: "~10% (negotiate direct)",
    shopUrl: "https://www.timorousbeasties.com",
  },
  {
    name: "Wall & Decò",
    origin: "Italy",
    founded: 1999,
    specialty: "Contemporary Italian Wallcovering",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    description: "Milan's design-forward wallcovering studio, known for large-format digital murals and waterproof wet-room wallpaper. A go-to for contemporary Italian-influenced interiors.",
    tags: ["Waterproof", "Large-format", "Italian design"],
    featured: false,
    hasAffiliate: false,
    affiliateNetwork: "Trade only",
    commission: "30–50% margin",
    shopUrl: "https://www.wallanddeco.com",
  },
  {
    name: "Andrew Martin",
    origin: "United Kingdom",
    founded: 1978,
    specialty: "Eclectic Global Interiors",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    description: "A Knightsbridge interiors institution known for its fearlessly eclectic mix of global influences, military prints, and adventurous pattern. Loved by design-confident clients worldwide.",
    tags: ["Eclectic", "Global", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "Awin",
    commission: "8%",
    shopUrl: "https://www.andrewmartin.co.uk",
  },
  {
    name: "Surface View",
    origin: "United Kingdom",
    founded: 2003,
    specialty: "Photographic & Fine Art Murals",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80",
    description: "Specialists in photographic murals and fine art wallcoverings, with a library of over 200,000 images. Every mural is printed to your exact dimensions.",
    tags: ["Made to measure", "Photography", "Mural"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "Awin",
    commission: "8%",
    shopUrl: "https://www.surfaceview.co.uk",
  },
  {
    name: "Calico Wallpaper",
    origin: "United States",
    founded: 2013,
    specialty: "Artisanal Hand-printed Studio",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80",
    description: "A Brooklyn-based studio producing some of the most sought-after artisanal wallpapers in America. Each design is hand-printed and made to order. Collector-grade quality.",
    tags: ["Hand-printed", "Made to order", "Artisanal"],
    featured: true,
    hasAffiliate: false,
    affiliateNetwork: "Direct — contact brand",
    commission: "~10% (negotiate direct)",
    shopUrl: "https://www.calicowallpaper.com",
  },
  {
    name: "Milton & King",
    origin: "Australia",
    founded: 2012,
    specialty: "Bold Artistic Murals & Prints",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
    description: "Australian creators of large-scale artistic murals and bold graphic wallpapers. Printed on demand with eco-friendly inks, shipped worldwide from their Brisbane studio.",
    tags: ["Eco-friendly inks", "Mural", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "ShareASale",
    commission: "10%",
    shopUrl: "https://www.miltonandking.com",
  },
  {
    name: "Chasing Paper",
    origin: "United States",
    founded: 2013,
    specialty: "Peel & Stick & Removable",
    priceRange: "$$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    description: "The pioneers of removable peel-and-stick wallpaper. Perfect for renters and commitment-phobes who still want beautiful walls.",
    tags: ["Removable", "Renter-friendly", "Peel & Stick"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "ShareASale",
    commission: "10%",
    shopUrl: "https://www.chasingpaper.com",
  },
  {
    name: "Tempaper",
    origin: "United States",
    founded: 2008,
    specialty: "Temporary & Self-Adhesive",
    priceRange: "$$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    description: "Premium self-adhesive wallpaper designed for easy application and removal without damaging walls. A favourite among interior designers.",
    tags: ["Self-adhesive", "No damage", "Designer favourite"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "ShareASale",
    commission: "8%",
    shopUrl: "https://www.tempaper.com",
  },
  {
    name: "York Wallcoverings",
    origin: "United States",
    founded: 1895,
    specialty: "American Heritage Collection",
    priceRange: "$",
    imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    description: "America's oldest continuously operating wallpaper company, producing affordable heritage and nature-inspired collections for over 125 years. Trusted by generations of homeowners.",
    tags: ["Heritage", "Affordable", "Wide selection"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "ShareASale",
    commission: "6–8%",
    shopUrl: "https://www.yorkwallcoverings.com",
  },
  {
    name: "Hygge & West",
    origin: "United States",
    founded: 2009,
    specialty: "Scandinavian-inspired Modern",
    priceRange: "$$",
    imageUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    description: "Modern patterns inspired by Scandinavian design principles — clean lines, warm textures, and a deep respect for craft.",
    tags: ["Scandinavian", "Peel & Stick", "Paste-the-Wall"],
    featured: false,
    hasAffiliate: true,
    affiliateNetwork: "ShareASale",
    commission: "10%",
    shopUrl: "https://www.hyggeandwest.com",
  },
];

const PRICE_LABELS: Record<string, string> = {
  "$": "Budget-friendly",
  "$$": "Mid-range",
  "$$$": "Luxury",
};

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

function BrandCard({ brand, index }: { brand: typeof BRANDS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.img
          src={brand.imageUrl}
          alt={`${brand.name} wallpaper collection`}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
        {brand.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-600 text-white">Featured</span>
          </div>
        )}
        {/* Affiliate / Trade badge */}
        <div className="absolute top-3 right-3">
          {brand.hasAffiliate ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500 text-white" title={`Affiliate via ${brand.affiliateNetwork} — ${brand.commission} commission`}>
              {brand.commission} commission
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-800/80 text-stone-200 backdrop-blur-sm">
              Trade direct
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs text-white/70 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{brand.origin} · Est. {brand.founded}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-stone-900 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{brand.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 ml-2 flex-shrink-0" title={PRICE_LABELS[brand.priceRange]}>{brand.priceRange}</span>
        </div>
        <p className="text-xs text-emerald-700 font-medium mb-3 tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif" }}>{brand.specialty}</p>
        <p className="text-sm text-stone-500 leading-relaxed mb-4 flex-1" style={{ fontFamily: "Inter, sans-serif" }}>{brand.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {brand.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-stone-50 border border-stone-200 text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>{tag}</span>
          ))}
        </div>

        {/* Affiliate info row */}
        <div className="flex items-center gap-1.5 mb-3 text-[11px] text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>
          {brand.hasAffiliate ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
              <span className="text-emerald-700 font-medium">{brand.affiliateNetwork}</span>
              <span className="text-stone-300">·</span>
              <span>{brand.commission}</span>
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              <span>{brand.affiliateNetwork}</span>
              <span className="text-stone-300">·</span>
              <span>{brand.commission}</span>
            </>
          )}
        </div>

        {/* Shop Now CTA */}
        <a
          href={brand.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            brand.hasAffiliate
              ? "bg-stone-900 text-white hover:bg-stone-700"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {brand.hasAffiliate ? (
            <>Shop now <ExternalLinkIcon /></>
          ) : (
            <>View brand <ExternalLinkIcon /></>
          )}
        </a>
      </div>
    </motion.article>
  );
}

export default function BrandsPage() {
  const [sampleOpen, setSampleOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "featured" | "affiliate">("all");

  const filtered =
    filter === "featured" ? BRANDS.filter((b) => b.featured) :
    filter === "affiliate" ? BRANDS.filter((b) => b.hasAffiliate) :
    BRANDS;

  const affiliateCount = BRANDS.filter((b) => b.hasAffiliate).length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Our partners</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              25 world-class <em>brands</em>
            </h1>
            <p className="text-stone-500 text-lg max-w-xl leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              We partner only with studios we&apos;d hang in our own homes. Every brand is rigorously vetted for quality, sustainability, and design integrity.
            </p>
            {/* Quick stats */}
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                <span className="text-stone-600"><strong className="text-stone-900">{affiliateCount} brands</strong> with active affiliate programmes</span>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                <span className="w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                <span className="text-stone-600"><strong className="text-stone-900">{25 - affiliateCount} brands</strong> available via trade account (higher margin)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Filter pills */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {([
            { key: "all",       label: "All brands" },
            { key: "featured",  label: "Featured" },
            { key: "affiliate", label: `Affiliate programmes (${affiliateCount})` },
          ] as const).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                filter === f.key
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((brand, i) => (
            <BrandCard key={brand.name} brand={brand} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-widest uppercase text-emerald-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Trade programme</p>
          <h2 className="text-3xl font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Are you a designer or architect?</h2>
          <p className="text-stone-400 text-sm mb-8 max-w-md mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Unlock trade pricing across all 25 brands plus dedicated account support.
          </p>
          <a href="/trade" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
            Apply for trade access
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" /></svg>
          </a>
        </motion.div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

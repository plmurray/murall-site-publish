"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";

const VALUES = [
  {
    title: "Curation over volume",
    body: "We carry 12 brands, not 120. Every label we stock has been evaluated for design integrity, material quality, and ethical production. If it doesn't earn its place, it doesn't make the cut.",
  },
  {
    title: "Sample before you commit",
    body: "Screens lie about colour. We built our sample programme — physical swatches from $12 — because we believe you should see the true texture and shade on your own wall before spending on full rolls.",
  },
  {
    title: "Worldwide, responsibly",
    body: "We ship to 50+ countries with carbon-offset delivery on every order over $120. Packaging is plastic-free and recyclable. We're working toward B Corp certification by the end of 2026.",
  },
  {
    title: "Trade that actually works",
    body: "We built a trade programme designers actually use: up to 35% discount, a real account manager who knows your projects, Net-30 invoicing, and free samples without a minimum order.",
  },
];

export default function AboutPage() {
  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Our story</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-6" style={{ fontFamily: "'EB Garamond', serif" }}>
            About <em>Murall</em>
          </h1>
          <p className="text-stone-500 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Murall was founded on a simple conviction: that the world&apos;s most beautiful wallpaper deserves to be easier to find, easier to try, and easier to buy — wherever you live.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-murall space-y-6">
            <p className="text-xl text-stone-700 leading-relaxed" style={{ fontFamily: "'EB Garamond', serif" }}>
              We started because we were frustrated. Buying wallpaper from the world&apos;s great design studios meant navigating dozens of separate websites, opaque trade pricing, and sample programmes that took weeks. The best wallpaper was effectively invisible to anyone who didn&apos;t already know where to look.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Murall changes that. We partner directly with studios — from Rebel Walls in Stockholm to Morris & Co. in London, from Cole & Son&apos;s archive to emerging independent designers — and bring their work to a single, curated destination. Every brand on the site has been chosen by hand. Every product has been assessed for print quality, substrate integrity, and environmental standards.
            </p>
            <p className="text-lg text-stone-600 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              We&apos;re a small team of designers, editors, and logistics specialists who believe that a great wall makes a home. We&apos;re based across London and Edinburgh, and we ship to over 50 countries.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>What we stand for</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-12" style={{ fontFamily: "'EB Garamond', serif" }}>
            The Murall <em>difference</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {VALUES.map((v) => (
              <div key={v.title} className="border-t-2 border-stone-900 pt-6">
                <h3 className="text-lg font-semibold text-stone-900 mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>{v.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "12", label: "Curated brands" },
              { value: "50+", label: "Countries shipped to" },
              { value: "2,400+", label: "Trade clients" },
              { value: "4.9★", label: "Average review" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-semibold text-stone-900 mb-1" style={{ fontFamily: "'EB Garamond', serif" }}>{s.value}</p>
                <p className="text-xs text-stone-400 uppercase tracking-wide" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-16 text-center">
        <p className="text-xs tracking-widest uppercase text-emerald-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Ready to start?</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8" style={{ fontFamily: "'EB Garamond', serif" }}>
          Find your perfect wallpaper
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/products"
            className="px-8 py-3 bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors rounded-none"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Shop the collection
          </a>
          <button onClick={() => setSampleOpen(true)}
            className="px-8 py-3 border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors rounded-none cursor-pointer"
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

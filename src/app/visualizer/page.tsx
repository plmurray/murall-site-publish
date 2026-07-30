import type { Metadata } from "next";
import RoomVisualizer from "@/app/components/RoomVisualizer";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "Room Visualizer — See Wallpaper in Your Space | Murall",
  description: "Preview our wallpaper designs in real room scenes before you buy. Switch between living room, bedroom, and study scenes to find your perfect match.",
  openGraph: {
    title: "Room Visualizer — See Wallpaper in Your Space | Murall",
    description: "Preview our wallpaper designs in real room scenes before you buy. Switch between living room, bedroom, and study scenes to find your perfect match.",
    url: "https://murallwallpaper.com/visualizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Room Visualizer — See Wallpaper in Your Space | Murall",
    description: "Preview our wallpaper designs in real room scenes before you buy.",
  },
};

export default function VisualizerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar lightMode />

      {/* Hero */}
      <section className="pt-32 pb-10 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>
              <li><a href="/" className="hover:text-stone-600 transition-colors">Home</a></li>
              <li aria-hidden="true">›</li>
              <li className="text-stone-600" aria-current="page">Room Visualizer</li>
            </ol>
          </nav>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Style your space</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>
            See it in your <em>room</em>
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Try wallpaper styles across different room scenes. When you find a look you love, order a physical sample to see the true colour and texture on your wall.
          </p>
        </div>
      </section>

      <RoomVisualizer />

      {/* CTA strip */}
      <section className="bg-stone-50 border-t border-stone-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold text-stone-900 mb-1" style={{ fontFamily: "'EB Garamond', serif" }}>
              Ready to see it in person?
            </h2>
            <p className="text-stone-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Order a physical sample — the only way to truly see colour and texture in your space.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="/products"
              className="px-5 py-2.5 rounded-none border border-stone-200 text-stone-700 text-sm font-medium hover:border-stone-400 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Browse all wallpapers
            </a>
            <a href="/sample-request"
              className="px-5 py-2.5 rounded-none bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Order a sample — from $12
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

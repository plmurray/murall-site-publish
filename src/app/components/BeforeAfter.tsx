"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const TRANSFORMATIONS = [
  {
    id: "living",
    room: "Living Room",
    before: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    after: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png",
    wallpaper: "Verdant Canopy",
    brand: "Rebel Walls",
  },
  {
    id: "bedroom",
    room: "Bedroom",
    before: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80",
    after: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    wallpaper: "Midnight Garden",
    brand: "Chasing Paper",
  },
  {
    id: "study",
    room: "Study",
    before: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80",
    after: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    wallpaper: "Hex Noir",
    brand: "Graham & Brown",
  },
];

function Slider({ before, after, wallpaper, brand }: { before: string; after: string; wallpaper: string; brand: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => { if (dragging) getPos(e.clientX); }, [dragging, getPos]);
  const onTouchMove = useCallback((e: TouchEvent) => { getPos(e.touches[0].clientX); }, [getPos]);
  const stopDrag = useCallback(() => setDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [onMouseMove, onTouchMove, stopDrag]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-none overflow-hidden select-none cursor-col-resize"
      onMouseDown={(e) => { setDragging(true); getPos(e.clientX); }}
      onTouchStart={(e) => { setDragging(true); getPos(e.touches[0].clientX); }}
    >
      {/* After (full) */}
      <img src={after} alt={`After — ${wallpaper} by ${brand}`} className="absolute inset-0 w-full h-full object-cover" draggable={false} />

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="Before — plain room" className="w-full h-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-stone-200/20" />
      </div>

      {/* Divider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none" style={{ left: `${pos}%` }} />

      {/* Handle */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-xl border border-stone-100 flex items-center justify-center cursor-col-resize"
        style={{ left: `${pos}%` }}
        animate={{ scale: dragging ? 1.15 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 3 4 7l4 4M16 3l4 4-4 4M4 7h16M4 17h16M8 13l-4 4 4 4M16 13l4 4-4 4" />
        </svg>
      </motion.div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 pointer-events-none z-10">
        <span className="px-2.5 py-1 rounded-none bg-stone-900/70 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Before</span>
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none z-10">
        <span className="px-2.5 py-1 rounded-none bg-stone-900/70 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif" }}>After</span>
      </div>

      {/* Wallpaper badge */}
      <div className="absolute top-4 right-4 pointer-events-none z-10">
        <div className="px-3 py-1.5 rounded-none bg-white/90 backdrop-blur-sm border border-stone-100 shadow-sm">
          <p className="text-xs font-semibold text-stone-800" style={{ fontFamily: "'EB Garamond', serif" }}>{wallpaper}</p>
          <p className="text-[10px] text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>{brand}</p>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const scene = TRANSFORMATIONS[active];

  return (
    <section className="w-full py-20 bg-stone-900" aria-labelledby="ba-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs tracking-widest uppercase text-emerald-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Room transformations</p>
            <h2 id="ba-heading" className="text-3xl sm:text-4xl font-semibold text-white" style={{ fontFamily: "'EB Garamond', serif" }}>
              Drag to <em>reveal</em>
            </h2>
            <p className="text-stone-400 text-sm mt-2" style={{ fontFamily: "Inter, sans-serif" }}>Drag the handle to see the transformation.</p>
          </div>
          <div className="flex gap-2">
            {TRANSFORMATIONS.map((t, i) => (
              <button key={t.id} onClick={() => setActive(i)}
                className={`px-3 py-1.5 rounded-none text-xs font-medium transition-all duration-200 cursor-pointer ${active === i ? "bg-white text-stone-900" : "bg-white/10 text-stone-400 hover:bg-white/20 hover:text-white"}`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {t.room}
              </button>
            ))}
          </div>
        </div>

        <motion.div key={scene.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <Slider before={scene.before} after={scene.after} wallpaper={scene.wallpaper} brand={scene.brand} />
        </motion.div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>
            All transformations shown with real Murall wallpaper. Colours may vary slightly on screen.
          </p>
          <a href="#bestsellers" className="text-xs text-emerald-400 font-medium hover:text-emerald-300 transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
            Shop this look →
          </a>
        </div>
      </div>
    </section>
  );
}

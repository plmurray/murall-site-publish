"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROOM_SCENES = [
  {
    id: "living",
    label: "Living Room",
    roomImg: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png",
    wallpapers: [
      { id: "verdant", name: "Verdant Canopy", color: "#1E3A2F", img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png" },
      { id: "hex",     name: "Hex Noir",       color: "#1a1a2e", img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png" },
      { id: "mid",     name: "Midnight Garden", color: "#0d1f1a", img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png" },
    ],
  },
  {
    id: "bedroom",
    label: "Bedroom",
    roomImg: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png",
    wallpapers: [
      { id: "mid",     name: "Midnight Garden", color: "#0d1f1a", img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png" },
      { id: "verdant", name: "Verdant Canopy", color: "#1E3A2F", img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png" },
      { id: "em",      name: "Emerald Conservatory", color: "#2d4a3e", img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160651_6f151b60-e9e1-486d-8d44-e5fcd2348cd7.png" },
    ],
  },
  {
    id: "study",
    label: "Study",
    roomImg: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png",
    wallpapers: [
      { id: "hex",     name: "Hex Noir",       color: "#1a1a2e", img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160943_0287b85a-2fd9-4ade-ae21-1c6bfd9fafbe.png" },
      { id: "mid",     name: "Midnight Garden", color: "#0d1f1a", img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160653_f13ae913-090c-4797-ba0f-66a1694d1dc7.png" },
      { id: "verdant", name: "Verdant Canopy", color: "#1E3A2F", img: "https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png" },
    ],
  },
];

export default function RoomVisualizer() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeWallpaper, setActiveWallpaper] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  const room = ROOM_SCENES[activeRoom];
  const wallpaper = room.wallpapers[activeWallpaper];

  const handleRoomChange = (i: number) => {
    setActiveRoom(i);
    setActiveWallpaper(0);
  };

  return (
    <section className="w-full py-20 bg-white" aria-labelledby="visualizer-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Style your space</p>
            <h2 id="visualizer-heading" className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>
              See it in your <em>room</em>
            </h2>
            <p className="text-stone-500 text-sm mt-2 max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
              Switch between room scenes and wallpaper styles to find your perfect match.
            </p>
          </div>
          {/* Room selector */}
          <div className="flex gap-2">
            {ROOM_SCENES.map((r, i) => (
              <button key={r.id} onClick={() => handleRoomChange(i)}
                className={`px-3 py-1.5 rounded-none text-xs font-medium transition-all duration-200 cursor-pointer ${activeRoom === i ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main visualizer */}
          <div className="lg:col-span-2 relative rounded-none overflow-hidden bg-stone-100 aspect-[4/3]">
            {/* Room base image */}
            <img src={room.roomImg} alt={`${room.label} scene`} className="w-full h-full object-cover" />

            {/* Wallpaper overlay */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  key={wallpaper.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.55 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  style={{ backgroundColor: wallpaper.color, mixBlendMode: "multiply" }}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>

            {/* Wallpaper pattern inset preview */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  key={`img-${wallpaper.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.35, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  aria-hidden="true"
                >
                  <img src={wallpaper.img} alt="" className="w-full h-full object-cover mix-blend-overlay" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle overlay button */}
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-none bg-white/90 backdrop-blur-sm text-xs font-medium text-stone-700 border border-stone-200 hover:bg-white transition-colors cursor-pointer shadow-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {showOverlay ? "See room only" : "Apply wallpaper"}
            </button>

            {/* Active wallpaper badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-stone-100">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: wallpaper.color }} />
              <span className="text-xs font-medium text-stone-800" style={{ fontFamily: "Inter, sans-serif" }}>{wallpaper.name}</span>
            </div>
          </div>

          {/* Wallpaper picker panel */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Choose a style</p>
            {room.wallpapers.map((wp, i) => (
              <motion.button
                key={wp.id}
                onClick={() => setActiveWallpaper(i)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className={`w-full flex items-center gap-4 p-3 rounded-none border-2 transition-all duration-200 cursor-pointer text-left ${activeWallpaper === i ? "border-stone-900 bg-stone-50" : "border-stone-100 hover:border-stone-300 bg-white"}`}
                aria-pressed={activeWallpaper === i}
              >
                <div className="w-14 h-14 rounded-none overflow-hidden flex-shrink-0">
                  <img src={wp.img} alt={wp.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900 truncate" style={{ fontFamily: "'EB Garamond', serif" }}>{wp.name}</p>
                  <p className="text-xs text-stone-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Tap to preview</p>
                </div>
                {activeWallpaper === i && (
                  <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                )}
              </motion.button>
            ))}

            {/* CTA */}
            <div className="pt-4 space-y-2">
              <a href="#bestsellers"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-none bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Shop {wallpaper.name}
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" /></svg>
              </a>
              <a href="/sample-request"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-none border border-stone-200 text-stone-700 text-xs font-medium hover:border-stone-400 transition-colors cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Order a sample — from $12
              </a>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-stone-400 mt-8" style={{ fontFamily: "Inter, sans-serif" }}>
          Preview is illustrative. Order a physical sample to see true colour and texture in your home.
        </p>
      </div>
    </section>
  );
}

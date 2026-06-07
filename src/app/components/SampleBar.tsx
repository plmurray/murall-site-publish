"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SampleBar({ onSampleOpen }: { onSampleOpen: () => void }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4"
          role="complementary"
          aria-label="Sample offer"
        >
          <div className="bg-stone-900 text-white rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-4 border border-white/10">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                Not sure yet? Get a sample
              </p>
              <p className="text-xs text-stone-400 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                See real colour &amp; texture on your wall — from $12
              </p>
            </div>
            {/* CTA */}
            <button
              onClick={() => { onSampleOpen(); setDismissed(true); }}
              className="px-4 py-2 rounded-full bg-white text-stone-900 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer flex-shrink-0"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Request sample
            </button>
            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              aria-label="Dismiss"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

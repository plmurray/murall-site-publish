"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("murall_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("murall_cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("murall_cookie_consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-stone-950 border-t border-stone-800 px-4 py-4 sm:py-5"
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="flex-1 text-xs text-stone-400 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              We use cookies to understand how visitors use Murall Wallpaper and to improve your experience.
              We do not sell your data.{" "}
              <a href="/privacy-policy" className="text-stone-300 underline underline-offset-2 hover:text-white transition-colors">
                Privacy policy
              </a>
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-xs font-medium text-stone-400 border border-stone-700 hover:border-stone-500 hover:text-stone-200 transition-colors cursor-pointer rounded-none"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 text-xs font-semibold bg-white text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer rounded-none"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Accept cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

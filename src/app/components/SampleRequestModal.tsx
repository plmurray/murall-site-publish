"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "success";

export default function SampleRequestModal({ isOpen, onClose }: SampleRequestModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", address: "", style: "botanical", notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep("form"); setForm({ name: "", email: "", address: "", style: "botanical", notes: "" }); }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Request a sample">
            <motion.div
              className="w-full max-w-lg bg-white rounded-none shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 border-b border-stone-100">
                <p className="text-xs tracking-widest uppercase text-stone-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>From $12</p>
                <h2 className="text-2xl font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>
                  Request a Sample
                </h2>
                <p className="text-sm text-stone-500 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  Try before you commit. Shipped worldwide in 3–5 days.
                </p>
                <button onClick={handleClose} className="absolute top-5 right-5 p-2 rounded-none text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer" aria-label="Close modal">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <AnimatePresence mode="wait">
                {step === "form" ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="px-6 py-5 space-y-4"
                    noValidate
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="s-name" className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Full name *</label>
                        <input id="s-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-none border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                          style={{ fontFamily: "Inter, sans-serif" }} placeholder="Jane Smith" />
                      </div>
                      <div>
                        <label htmlFor="s-email" className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Email *</label>
                        <input id="s-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-none border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                          style={{ fontFamily: "Inter, sans-serif" }} placeholder="jane@example.com" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="s-address" className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Shipping address *</label>
                      <input id="s-address" type="text" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-none border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                        style={{ fontFamily: "Inter, sans-serif" }} placeholder="123 Main St, City, Country" />
                    </div>

                    <div>
                      <label htmlFor="s-style" className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Style interest</label>
                      <select id="s-style" value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })}
                        className="w-full px-3 py-2 rounded-none border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors bg-white cursor-pointer"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        <option value="botanical">Botanical & Tropical</option>
                        <option value="geometric">Bold Geometric</option>
                        <option value="dark-moody">Dark & Moody</option>
                        <option value="peel-stick">Peel & Stick</option>
                        <option value="vintage-floral">Vintage Floral (coming soon)</option>
                        <option value="chinoiserie">Chinoiserie (coming soon)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="s-notes" className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Notes (optional)</label>
                      <textarea id="s-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2}
                        className="w-full px-3 py-2 rounded-none border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                        style={{ fontFamily: "Inter, sans-serif" }} placeholder="Room size, color preferences, installation type…" />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full py-3 rounded-none bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 disabled:opacity-60 transition-all cursor-pointer flex items-center justify-center gap-2"
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      {loading ? (
                        <>
                          <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                          Sending request…
                        </>
                      ) : "Request samples — from $12"}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-6 py-10 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900 mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>Sample on its way!</h3>
                    <p className="text-sm text-stone-500 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                      We'll confirm your order to <strong>{form.email}</strong> within 24 hours. Delivery in 3–5 days.
                    </p>
                    <button onClick={handleClose}
                      className="px-6 py-2.5 rounded-none bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors cursor-pointer"
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      Continue browsing
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

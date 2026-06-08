"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import SampleRequestModal from "@/app/components/SampleRequestModal";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";

const BENEFITS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: "Up to 12% commission",
    body: "Earn on every sale you refer — one of the highest rates in home décor. Paid monthly with no minimum threshold.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: "30-day cookie window",
    body: "You get credit for any purchase made within 30 days of a visitor clicking your link — even if they come back later.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    ),
    title: "Free sample kit",
    body: "Approved affiliates receive a curated sample pack from our top-selling collections — so you can create authentic content.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    title: "Exclusive affiliate assets",
    body: "Access a private library of high-res images, room scenes, and copy-ready captions optimised for Instagram, Pinterest & TikTok.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Real-time dashboard",
    body: "Track clicks, conversions, and earnings live. Know exactly what's working and get paid on the 1st of every month.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Dedicated affiliate manager",
    body: "A real person — not a bot — who answers your questions, approves custom campaigns, and helps you earn more.",
  },
];

const STEPS = [
  { num: "01", title: "Apply in 2 minutes", body: "Fill out the short form below. We review every application within 48 hours." },
  { num: "02", title: "Get your link & assets", body: "Approved? You'll receive your unique tracking link, sample kit, and access to the asset library." },
  { num: "03", title: "Share & earn", body: "Post, pin, or blog — every click that converts earns you up to 12% commission. We handle fulfilment." },
];

const WHO = [
  { label: "Interior designers", icon: "🪑" },
  { label: "Home décor bloggers", icon: "✍️" },
  { label: "Instagram creators", icon: "📸" },
  { label: "Pinterest curators", icon: "📌" },
  { label: "YouTube home tours", icon: "🎬" },
  { label: "TikTok renovators", icon: "🏠" },
];

const FAQS = [
  { q: "How much can I earn?", a: "Commission is 8% on standard products and 12% on featured collections. A single wallpaper order averages $280 — that's up to $33 per sale." },
  { q: "When do I get paid?", a: "Earnings are paid on the 1st of each month via bank transfer or PayPal, with no minimum payout threshold." },
  { q: "Do I need a large following?", a: "No minimum follower count. We value quality over quantity — a niche interior design blog with 2,000 engaged readers is more valuable to us than a generic account with 100k." },
  { q: "Can I stack this with the trade programme?", a: "Yes. If you're already a trade member, affiliate commission stacks on top of your trade discount — you earn on what you recommend to clients." },
  { q: "How long does approval take?", a: "We review every application within 48 hours, Monday–Friday. You'll get an email either way." },
];

type Step = "form" | "success";

export default function AffiliatesPage() {
  const [sampleOpen, setSampleOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", website: "",
    platform: "", followers: "", niche: "", why: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png"
            alt="" className="w-full h-full object-cover opacity-15" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/80 to-stone-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <p className="text-xs tracking-widest uppercase text-amber-400 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>Affiliate Programme</p>
            <h1 className="text-5xl sm:text-6xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Turn beautiful walls into <em>recurring income</em>
            </h1>
            <p className="text-stone-300 text-xl leading-relaxed mb-10 max-w-2xl" style={{ fontFamily: "Inter, sans-serif" }}>
              Join 500+ creators, designers, and bloggers earning up to 12% commission on every wallpaper sale they inspire.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-500 text-stone-900 text-sm font-bold hover:bg-amber-400 transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
                Apply now — it's free
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
              </a>
              <a href="#how-it-works" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/80 text-sm font-medium hover:border-white/50 hover:text-white transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
                See how it works
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/10">
            {[
              { val: "12%", label: "Max commission" },
              { val: "30", label: "Day cookie window" },
              { val: "$280", label: "Avg. order value" },
              { val: "48h", label: "Approval time" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-semibold text-amber-400 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</p>
                <p className="text-stone-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-6 text-center" style={{ fontFamily: "Inter, sans-serif" }}>Perfect for</p>
          <div className="flex flex-wrap justify-center gap-3">
            {WHO.map((w, i) => (
              <motion.span key={w.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-700 text-sm font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {w.label}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>What you get</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Everything you need to <em>succeed</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{b.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{b.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Simple process</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              How it <em>works</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative bg-white rounded-2xl p-8 border border-stone-100 shadow-sm">
                <span className="text-5xl font-bold text-stone-100 absolute top-6 right-6 select-none" style={{ fontFamily: "'Playfair Display', serif" }}>{s.num}</span>
                <p className="text-xs tracking-widest uppercase text-amber-600 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Step {s.num}</p>
                <h3 className="text-xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Join the programme</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Apply <em>today</em>
            </h2>
            <p className="text-stone-500 mt-3 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Free to join. No minimum following. Approved within 48 hours.</p>
          </div>

          <AnimatePresence mode="wait">
            {step === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="text-center py-16 px-8 bg-stone-50 rounded-2xl border border-stone-100">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Application received!</h3>
                <p className="text-stone-500 text-sm leading-relaxed max-w-sm mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
                  We'll review your application and get back to you within 48 hours. Check your inbox — including spam just in case.
                </p>
                <a href="/" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
                  Back to Murall
                </a>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-5 bg-stone-50 rounded-2xl border border-stone-100 p-8">

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "firstName", label: "First name", placeholder: "Jane" },
                    { name: "lastName", label: "Last name", placeholder: "Smith" },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-xs font-medium text-stone-600 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{f.label}</label>
                      <input name={f.name} value={(form as any)[f.name]} onChange={handleChange} placeholder={f.placeholder} required
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" style={{ fontFamily: "Inter, sans-serif" }} />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Email address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" style={{ fontFamily: "Inter, sans-serif" }} />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Website or primary channel URL</label>
                  <input name="website" type="url" value={form.website} onChange={handleChange} placeholder="https://yourblog.com or instagram.com/yourhandle" required
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" style={{ fontFamily: "Inter, sans-serif" }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Primary platform</label>
                    <select name="platform" value={form.platform} onChange={handleChange} required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
                      <option value="">Select…</option>
                      {["Blog / Website", "Instagram", "Pinterest", "TikTok", "YouTube", "Other"].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Approx. monthly reach</label>
                    <select name="followers" value={form.followers} onChange={handleChange} required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
                      <option value="">Select…</option>
                      {["Under 1,000", "1,000–5,000", "5,000–20,000", "20,000–100,000", "100,000+"].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Your niche / content focus</label>
                  <input name="niche" value={form.niche} onChange={handleChange} placeholder="e.g. Scandinavian interiors, rental transformations, budget renovations" required
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" style={{ fontFamily: "Inter, sans-serif" }} />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Why do you want to partner with Murall? <span className="text-stone-400 font-normal">(optional)</span></label>
                  <textarea name="why" value={form.why} onChange={handleChange} rows={3} placeholder="Tell us a bit about your audience and why Murall wallpaper is a good fit…"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none" style={{ fontFamily: "Inter, sans-serif" }} />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {loading ? (
                    <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Submitting…</>
                  ) : "Submit application →"}
                </button>

                <p className="text-center text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>
                  By applying you agree to our affiliate terms. We never sell your data.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Common <em>questions</em>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-stone-50 transition-colors">
                  <span className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>{faq.q}</span>
                  <motion.svg animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 ml-4 text-stone-400">
                    <path d="m6 9 6 6 6-6"/>
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <p className="px-6 pb-5 text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-stone-900 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-widest uppercase text-amber-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Ready to earn?</p>
          <h2 className="text-3xl font-semibold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Join 500+ Murall affiliates</h2>
          <p className="text-stone-400 text-sm mb-8 max-w-md mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Free to join. No minimum following. Up to 12% commission on every sale.
          </p>
          <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-500 text-stone-900 text-sm font-bold hover:bg-amber-400 transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>
            Apply now — it's free
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6"/></svg>
          </a>
        </motion.div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

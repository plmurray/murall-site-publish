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
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Up to 35% trade discount",
    body: "Exclusive pricing across all 25 brands, applied automatically at checkout once your account is approved.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Dedicated account manager",
    body: "A single point of contact who knows your projects, your clients' tastes, and your preferred brands.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Free sample library",
    body: "Unlimited sample swatches from our full catalogue, shipped free to your studio within 48 hours.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Extended 60-day returns",
    body: "More time to assess samples and confirm specifications before your client commits.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Project invoicing",
    body: "Consolidate multiple client orders onto a single monthly invoice. Net-30 terms available.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Early access to new collections",
    body: "Be the first to see new arrivals — up to 2 weeks before they go public — so you can present them to clients fresh.",
  },
];

const TESTIMONIALS = [
  {
    quote: "The trade programme has genuinely changed how I source wallpaper. The discount is real, the samples arrive fast, and my account manager actually knows who I am.",
    name: "Lucinda Fraser",
    role: "Interior Designer, Edinburgh",
    initials: "LF",
  },
  {
    quote: "I've used three other trade accounts. Murall is the only one where I feel like a valued customer rather than just another order number.",
    name: "Marco Vidal",
    role: "Principal, Studio Vidal, London",
    initials: "MV",
  },
  {
    quote: "Free unlimited samples sold it for me. I used to spend a fortune on samples I couldn't pass costs on to clients. That problem is gone.",
    name: "Anita Johansson",
    role: "Residential Architect, Stockholm",
    initials: "AJ",
  },
];

type FormStep = "form" | "success";

export default function TradePage() {
  const [sampleOpen, setSampleOpen] = useState(false);
  const [step, setStep] = useState<FormStep>("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "",
    website: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img src="https://d8j0ntlcm91z4.cloudfront.net/user_3EjidxRvAQx3MA2C4ZfgGXwr8Gw/hf_20260607_160940_6effa5f0-e7e9-4fa1-8778-5effbd43b966.png"
            alt="" className="w-full h-full object-cover opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 to-stone-900" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-widest uppercase text-emerald-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Trade programme</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4 max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              For designers who demand <em>the best</em>
            </h1>
            <p className="text-stone-300 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Join 2,400+ interior designers, architects, and specifiers who source through the Murall trade programme.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white" aria-labelledby="benefits-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 id="benefits-heading" className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              What&apos;s <em>included</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
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

      {/* Testimonials */}
      <section className="py-20 bg-stone-50" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="testimonials-heading" className="sr-only">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm"
              >
                <svg className="text-emerald-300 mb-4" width="28" height="20" viewBox="0 0 28 20" fill="currentColor" aria-hidden="true">
                  <path d="M0 20V12.571C0 5.469 4.375 1.406 13.125 0l1.313 2.571C10.5 3.49 8.313 5.49 7.875 8.571H12V20H0zm16 0V12.571C16 5.469 20.375 1.406 29.125 0l1.313 2.571c-3.938.919-6.125 2.919-6.563 6H28V20H16z" />
                </svg>
                <p className="text-stone-700 text-sm leading-relaxed mb-6 italic" style={{ fontFamily: "'Playfair Display', serif" }}>&ldquo;{t.quote}&rdquo;</p>
                <footer className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">{t.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "Inter, sans-serif" }}>{t.name}</p>
                    <p className="text-xs text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>{t.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-20" aria-labelledby="apply-heading">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Apply now</p>
            <h2 id="apply-heading" className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Join the programme
            </h2>
            <p className="text-stone-500 text-sm mt-3" style={{ fontFamily: "Inter, sans-serif" }}>Applications are reviewed within 2 business days.</p>
          </div>

          <AnimatePresence mode="wait">
            {step === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Application received</h3>
                <p className="text-stone-500 max-w-sm mx-auto text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  Thank you! We&apos;ll review your application and be in touch within 2 business days. Keep an eye on your inbox.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "firstName", label: "First name", type: "text", required: true },
                    { name: "lastName", label: "Last name", type: "text", required: true },
                  ].map(({ name, label, type, required }) => (
                    <div key={name}>
                      <label htmlFor={name} className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{label}</label>
                      <input id={name} name={name} type={type} required={required} value={form[name as keyof typeof form]}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        style={{ fontFamily: "Inter, sans-serif" }} />
                    </div>
                  ))}
                </div>

                {[
                  { name: "email", label: "Work email", type: "email", required: true },
                  { name: "company", label: "Studio / company name", type: "text", required: true },
                  { name: "website", label: "Website (optional)", type: "url", required: false },
                ].map(({ name, label, type, required }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{label}</label>
                    <input id={name} name={name} type={type} required={required} value={form[name as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }} />
                  </div>
                ))}

                <div>
                  <label htmlFor="role" className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Your role</label>
                  <select id="role" name="role" required value={form.role} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    <option value="">Select your role</option>
                    <option>Interior Designer</option>
                    <option>Interior Architect</option>
                    <option>Residential Architect</option>
                    <option>Commercial Designer</option>
                    <option>Decorator</option>
                    <option>Property Developer</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Tell us about your work (optional)</label>
                  <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange}
                    placeholder="What kind of projects do you typically work on?"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    style={{ fontFamily: "Inter, sans-serif" }} />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-full bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors duration-200 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {loading ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>Submitting…</>
                  ) : "Submit application"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

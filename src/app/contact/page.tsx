"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";

export default function ContactPage() {
  const [sampleOpen, setSampleOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      <section className="pt-32 pb-16 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Get in touch</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
            Contact <em>us</em>
          </h1>
          <p className="text-stone-500 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Questions about an order, a product, or our trade programme? We&apos;re here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-8" style={{ fontFamily: "'EB Garamond', serif" }}>How we can help</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Order enquiries",
                  body: "For questions about an existing order, dispatch times, or tracking, please include your order number and we'll respond within one business day.",
                },
                {
                  title: "Returns & exchanges",
                  body: "We accept returns on unopened rolls within 30 days of delivery. Email us with your order number and we'll arrange a prepaid return label.",
                },
                {
                  title: "Trade programme",
                  body: "Interior designers, architects, and specifiers can apply for up to 35% trade discount, dedicated account management, and Net-30 invoicing.",
                  link: { label: "Apply for trade access →", href: "/trade" },
                },
                {
                  title: "Samples",
                  body: "Order a physical sample from $12 to see the true colour and texture on your wall before committing to full rolls.",
                },
              ].map((item) => (
                <div key={item.title} className="border-b border-stone-100 pb-8">
                  <h3 className="text-base font-semibold text-stone-900 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{item.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-2" style={{ fontFamily: "Inter, sans-serif" }}>{item.body}</p>
                  {item.link && (
                    <a href={item.link.href} className="text-sm text-emerald-700 hover:text-emerald-900 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                      {item.link.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-stone-50 border border-stone-100">
              <p className="text-sm font-semibold text-stone-900 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Email us directly</p>
              <a href="mailto:hello@murallwallpaper.com" className="text-sm text-emerald-700 hover:text-emerald-900" style={{ fontFamily: "Inter, sans-serif" }}>
                hello@murallwallpaper.com
              </a>
              <p className="text-xs text-stone-400 mt-3" style={{ fontFamily: "Inter, sans-serif" }}>We aim to respond to all enquiries within one business day.</p>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-8" style={{ fontFamily: "'EB Garamond', serif" }}>Send a message</h2>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-100 text-center">
                <p className="text-lg font-medium text-emerald-900 mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>Message received</p>
                <p className="text-sm text-emerald-700" style={{ fontFamily: "Inter, sans-serif" }}>
                  Thank you — we&apos;ll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-200 text-sm text-stone-900 bg-white focus:outline-none focus:border-stone-400 rounded-none"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Email</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-stone-200 text-sm text-stone-900 bg-white focus:outline-none focus:border-stone-400 rounded-none"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-200 text-sm text-stone-900 bg-white focus:outline-none focus:border-stone-400 rounded-none cursor-pointer"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <option value="">Select a topic…</option>
                    <option>Order enquiry</option>
                    <option>Returns & exchanges</option>
                    <option>Track my order</option>
                    <option>Trade programme</option>
                    <option>Product question</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Message</label>
                  <textarea
                    required rows={6} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-stone-200 text-sm text-stone-900 bg-white focus:outline-none focus:border-stone-400 rounded-none resize-none"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors cursor-pointer rounded-none"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

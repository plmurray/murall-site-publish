"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";

const REGIONS = [
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    standard: "3–5 business days",
    express: "1–2 business days",
    standardCost: "£6.95",
    expressCost: "£12.95",
    freeOver: "£80",
    notes: "Tracked with Royal Mail / DPD. Express available at checkout.",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    standard: "5–8 business days",
    express: "2–3 business days",
    standardCost: "$9.95",
    expressCost: "$19.95",
    freeOver: "$120",
    notes: "Tracked with FedEx / UPS. Duties included on most orders.",
  },
  {
    name: "European Union",
    flag: "🇪🇺",
    standard: "4–7 business days",
    express: "2–3 business days",
    standardCost: "€8.95",
    expressCost: "€16.95",
    freeOver: "€100",
    notes: "Tracked with DHL / DPD. VAT included for EU customers.",
  },
  {
    name: "Australia & New Zealand",
    flag: "🇦🇺",
    standard: "7–12 business days",
    express: "3–5 business days",
    standardCost: "A$14.95",
    expressCost: "A$29.95",
    freeOver: "A$160",
    notes: "Tracked with Australia Post / DHL Express.",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    standard: "6–10 business days",
    express: "3–4 business days",
    standardCost: "C$12.95",
    expressCost: "C$22.95",
    freeOver: "C$150",
    notes: "Tracked with Canada Post / FedEx. Duties may apply.",
  },
  {
    name: "Middle East",
    flag: "🌍",
    standard: "7–10 business days",
    express: "3–5 business days",
    standardCost: "$14.95",
    expressCost: "$29.95",
    freeOver: "$200",
    notes: "Covers UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman.",
  },
  {
    name: "Asia Pacific",
    flag: "🌏",
    standard: "8–14 business days",
    express: "4–6 business days",
    standardCost: "$14.95",
    expressCost: "$29.95",
    freeOver: "$200",
    notes: "Covers Singapore, Japan, Hong Kong, South Korea, and more.",
  },
  {
    name: "Rest of World",
    flag: "🌐",
    standard: "10–18 business days",
    express: "5–8 business days",
    standardCost: "$19.95",
    expressCost: "$39.95",
    freeOver: "$250",
    notes: "Over 50 countries. Contact us if your country isn't listed.",
  },
];

const FAQS = [
  {
    q: "How is wallpaper packaged for shipping?",
    a: "All rolls are shipped in reinforced cardboard tubes with padded end caps. Mural panels are rolled around a rigid core and boxed individually. We've designed our packaging specifically to protect wallpaper during international transit — in over five years of shipping globally, we maintain a damage rate of under 0.3%.",
  },
  {
    q: "What happens if my order arrives damaged?",
    a: "Photograph the damage before unrolling, then contact us at hello@murallwallpaper.com within 48 hours of delivery. We'll arrange a replacement shipment at no cost, prioritised as express delivery. We ask that you keep the original packaging for our carrier claim.",
  },
  {
    q: "Can I change my delivery address after ordering?",
    a: "If your order hasn't yet been dispatched, contact us immediately and we'll update the address. Once dispatched, address changes aren't guaranteed but we'll do our best to intercept with the carrier. For trade orders, address changes are easier to accommodate — contact your account manager directly.",
  },
  {
    q: "Do you ship to multiple addresses in one order?",
    a: "For single orders, we ship to one address. If you're a trade client with multiple project sites, speak to your account manager about split-shipping arrangements — we can usually accommodate these with advance notice.",
  },
  {
    q: "How do I track my order?",
    a: "You'll receive a tracking link by email as soon as your order is dispatched. Most carriers update tracking every few hours. If your tracking hasn't updated in over 48 hours, contact us and we'll investigate with the carrier directly.",
  },
  {
    q: "Are duties and import taxes included?",
    a: "For UK, EU, and most US orders, duties are included in your order total. For Australia, Canada, and Rest of World orders, local import duties may be applied by your customs authority on delivery. These are outside our control but typically modest for wallpaper (a decorative goods category). We'll always provide accurate customs documentation to minimise delays.",
  },
];

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-stone-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-base font-medium text-stone-900 group-hover:text-emerald-800 transition-colors pr-8"
          style={{ fontFamily: "'EB Garamond', serif" }}>{faq.q}</span>
        <span className="text-stone-400 flex-shrink-0 text-lg">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-stone-500 text-sm leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShippingPage() {
  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-stone-50 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Delivery information</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
              We ship to <em>50+ countries</em>
            </h1>
            <p className="text-stone-500 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Every order is tracked, insured, and packaged to protect your wallpaper in transit. Free shipping on orders over the threshold for your region.
            </p>
          </motion.div>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
            {[
              { stat: "50+", label: "Countries shipped to" },
              { stat: "Free", label: "Shipping over $120" },
              { stat: "< 0.3%", label: "Damage rate" },
              { stat: "48h", label: "Dispatch on in-stock items" },
            ].map((item) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="border-l-2 border-stone-900 pl-4"
              >
                <p className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-1" style={{ fontFamily: "'EB Garamond', serif" }}>{item.stat}</p>
                <p className="text-xs text-stone-400 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping rates table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>By region</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>
              Shipping rates & <em>timelines</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {REGIONS.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="border border-stone-100 p-5 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl" aria-hidden="true">{region.flag}</span>
                  <h3 className="text-base font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>{region.name}</h3>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Standard</p>
                    <p className="text-sm font-medium text-stone-800" style={{ fontFamily: "Inter, sans-serif" }}>{region.standardCost} · {region.standard}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Express</p>
                    <p className="text-sm font-medium text-stone-800" style={{ fontFamily: "Inter, sans-serif" }}>{region.expressCost} · {region.express}</p>
                  </div>
                  <div className="pt-1 border-t border-stone-50">
                    <p className="text-xs text-emerald-700 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                      Free standard over {region.freeOver}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{region.notes}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How we pack */}
      <section className="py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Our packaging</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
              Packed to <em>arrive perfect</em>
            </h2>
            <p className="text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              We've shipped over 40,000 orders worldwide. Our packaging has been refined over five years to give your wallpaper the best possible protection in transit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: "Reinforced tube packaging",
                body: "Every roll is shipped in a rigid cardboard tube with padded end caps. The tube diameter is sized to prevent tight rolling that could crease the paper.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                ),
                title: "Moisture barrier wrapping",
                body: "Each roll is wrapped in acid-free tissue and a moisture-resistant inner sleeve before being placed in the outer tube. Water damage in transit is effectively eliminated.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 12l2 2 4-4" /><path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" />
                  </svg>
                ),
                title: "Full transit insurance",
                body: "Every order is insured for its full value. If anything is lost or damaged in transit, we replace it immediately — no claims process, no waiting.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="text-stone-400 mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Returns */}
      <section className="py-20 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Returns policy</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-6" style={{ fontFamily: "'EB Garamond', serif" }}>
                30-day <em>hassle-free</em> returns
              </h2>
              <div className="space-y-5">
                {[
                  { title: "Unopened rolls", body: "Return any unopened rolls within 30 days of delivery for a full refund, including original shipping costs. No questions asked." },
                  { title: "Opened or cut rolls", body: "We're unable to accept returns on opened or cut rolls, as wallpaper is a cut-to-order product. If you're unsure, order a sample first — they're only $12." },
                  { title: "Damaged on arrival", body: "We replace damaged orders immediately at no cost. Photograph the damage before unrolling and email us within 48 hours of delivery." },
                  { title: "Trade clients", body: "Trade accounts have extended 60-day return windows. Contact your account manager directly." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-stone-900 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>{item.title}</p>
                      <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-stone-50 p-8">
              <h3 className="text-xl font-semibold text-stone-900 mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>Not sure which paper to order?</h3>
              <p className="text-sm text-stone-500 mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Order a physical sample before committing to full rolls. See the true colour, texture, and weight on your actual wall in your actual light. Sample packs start from $12 and ship in 48 hours.
              </p>
              <button
                onClick={() => setSampleOpen(true)}
                className="w-full py-3 rounded-none bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Order a sample pack
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Common questions</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-10" style={{ fontFamily: "'EB Garamond', serif" }}>
            Shipping <em>FAQs</em>
          </h2>
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Still have questions?</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
            We're here to help
          </h2>
          <p className="text-stone-400 mb-8 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            Email us at hello@murallwallpaper.com — we reply within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:hello@murallwallpaper.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-none bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Email us
            </a>
            <a href="/trade"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-none border border-white/30 text-white text-sm font-medium hover:border-white transition-colors cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Trade enquiries
            </a>
          </div>
        </motion.div>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

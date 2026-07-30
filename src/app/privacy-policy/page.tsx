"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";

const SECTIONS = [
  {
    title: "Who we are",
    body: "Murall Ltd operates murallwallpaper.com. Our registered office is in the United Kingdom. You can contact us at hello@murallwallpaper.com.",
  },
  {
    title: "What data we collect",
    body: "When you place an order or request a sample, we collect your name, email address, shipping address, and payment details (processed securely via Stripe — we never store card numbers). When you browse the site, we collect anonymous analytics data (page views, session duration) via privacy-respecting analytics. We do not sell your personal data.",
  },
  {
    title: "How we use your data",
    body: "We use your data to process and fulfil your orders, send order confirmations and shipping updates, respond to your enquiries, and (with your consent) send you editorial newsletters and product updates. We do not use your data for automated decision-making or profiling.",
  },
  {
    title: "Cookies",
    id: "cookies",
    body: "We use strictly necessary cookies to operate the site (session management, shopping cart). We use optional analytics cookies to understand how visitors use the site — these are anonymised and never linked to personal data. You can accept or decline optional cookies via the cookie banner when you first visit.",
  },
  {
    title: "Data retention",
    body: "We retain order data for 7 years to comply with UK accounting regulations. Newsletter subscription data is retained until you unsubscribe. You can request deletion of your personal data at any time by emailing hello@murallwallpaper.com.",
  },
  {
    title: "Your rights",
    body: "Under UK GDPR you have the right to access, correct, or delete your personal data; to object to or restrict processing; and to data portability. To exercise any of these rights, email hello@murallwallpaper.com. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.",
  },
  {
    title: "Third parties",
    body: "We share data only with service providers necessary to operate the business: Stripe (payment processing), our logistics partners (shipping and fulfilment), and Netlify (website hosting). All providers are contractually bound to process data only on our instructions and in accordance with GDPR.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this policy from time to time. Material changes will be communicated by email to registered customers. The date at the bottom of this page reflects the most recent revision.",
  },
];

export default function PrivacyPolicyPage() {
  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      <section className="pt-32 pb-12 bg-stone-50 border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Legal</p>
          <h1 className="text-4xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>Privacy Policy</h1>
          <p className="text-sm text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>Last updated: 30 July 2026</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title} id={s.id}>
              <h2 className="text-xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>{s.title}</h2>
              <p className="text-base text-stone-600 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-stone-100">
          <p className="text-sm text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>
            Questions? Email us at{" "}
            <a href="mailto:hello@murallwallpaper.com" className="text-stone-700 hover:text-stone-900 underline underline-offset-2">
              hello@murallwallpaper.com
            </a>
          </p>
        </div>
      </div>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

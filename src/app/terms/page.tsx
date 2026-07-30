"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";
import SampleRequestModal from "@/app/components/SampleRequestModal";

const SECTIONS = [
  {
    title: "1. About these terms",
    body: "These terms govern your use of murallwallpaper.com and any purchase you make through it. By placing an order you agree to these terms in full. Murall Ltd is a company registered in England and Wales.",
  },
  {
    title: "2. Orders and payment",
    body: "All prices are shown inclusive of any applicable taxes. We accept major credit and debit cards via Stripe. Your order is confirmed when you receive an order confirmation email. We reserve the right to cancel or refuse an order if there is a pricing error or the item is out of stock, in which case you will receive a full refund.",
  },
  {
    title: "3. Shipping",
    body: "We ship to 50+ countries. Delivery times and costs are shown at checkout and on our Shipping page. Risk in the goods passes to you on delivery. We are not responsible for delays caused by customs or third-party couriers beyond our control.",
  },
  {
    title: "4. Returns and refunds",
    body: "You may return unopened rolls in their original packaging within 30 days of delivery for a full refund. Opened rolls cannot be returned unless faulty. To initiate a return, email hello@murallwallpaper.com with your order number. Refunds are issued to your original payment method within 5–10 business days of us receiving the returned goods.",
  },
  {
    title: "5. Samples",
    body: "Sample orders are non-refundable. Samples are representative of the full product but may vary slightly in colour between print runs. We recommend ordering a sample from the same batch as your intended full order.",
  },
  {
    title: "6. Intellectual property",
    body: "All content on this site — including images, product descriptions, and editorial copy — is owned by Murall Ltd or licensed from brand partners. You may not reproduce, distribute, or use any content without our written permission.",
  },
  {
    title: "7. Limitation of liability",
    body: "To the fullest extent permitted by law, Murall Ltd is not liable for any indirect, incidental, or consequential losses arising from your use of the site or our products. Our total liability for any claim is limited to the amount you paid for the relevant order.",
  },
  {
    title: "8. Governing law",
    body: "These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
  {
    title: "9. Changes to these terms",
    body: "We may update these terms at any time. Changes take effect when posted to this page. We will notify registered customers of material changes by email.",
  },
];

export default function TermsPage() {
  const [sampleOpen, setSampleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSampleOpen={() => setSampleOpen(true)} lightMode />

      <section className="pt-32 pb-12 bg-stone-50 border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Legal</p>
          <h1 className="text-4xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>Terms of Service</h1>
          <p className="text-sm text-stone-400" style={{ fontFamily: "Inter, sans-serif" }}>Last updated: 30 July 2026</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
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

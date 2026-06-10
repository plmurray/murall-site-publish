"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import SampleRequestModal from "@/app/components/SampleRequestModal";
import CartDrawer from "@/app/components/CartDrawer";
import SearchOverlay from "@/app/components/SearchOverlay";

const STATS = [
  { value: "35%", label: "Trade discount" },
  { value: "25", label: "Curated brands" },
  { value: "48h", label: "Approval time" },
  { value: "Net‑30", label: "Invoice terms" },
];

const PRESS = [
  "Architectural Digest", "Elle Décor", "Dezeen",
  "Wallpaper*", "House Beautiful", "Vogue Living", "World of Interiors",
];

const BENEFITS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Up to 35% trade discount",
    body: "Exclusive pricing applied automatically at checkout across all 25 brands and 2,400+ products from day one.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Dedicated account manager",
    body: "A single point of contact who knows your studio, your clients, and your preferences — available by phone, email, and WhatsApp.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Unlimited sample library",
    body: "Order as many samples as your project requires — delivered free to your studio or directly to client site anywhere in the world.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "60-day extended returns",
    body: "More time to assess samples and confirm specifications before your client commits. No questions asked on unopened rolls.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" />
      </svg>
    ),
    title: "Project invoicing",
    body: "Consolidate multiple client orders into a single monthly invoice. Net-30 terms available for established studios.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Early access to new collections",
    body: "Be the first to see new arrivals — up to 3 weeks before public launch — so you can present them to clients fresh.",
  },
];

const STEPS = [
  { num: "1", title: "Apply in minutes", desc: "Fill out the short form below. No lengthy paperwork — we just need to understand your practice and the projects you work on." },
  { num: "2", title: "Approved within 48 hours", desc: "Our trade team reviews every application personally. You'll receive a decision and your portal access within two business days." },
  { num: "3", title: "Access your trade portal", desc: "Log in to see trade pricing, place orders, manage projects, download spec sheets, and contact your account manager directly." },
];

const SHOWCASE = [
  { wide: true,  label: "Residential · London",    project: "The Kensington Residence",           meta: "Studio Ashby · Rebel Walls, Botanical",      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80" },
  { wide: false, label: "Hospitality · New York",  project: "The Greenwich Hotel — Suite Level",  meta: "Roman & Williams · Graham & Brown, Heritage", img: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=80" },
  { wide: false, label: "Commercial · Dubai",      project: "DIFC Private Members Club",          meta: "Yabu Pushelberg · Chasing Paper, Deco Series", img: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80" },
  { wide: true,  label: "Residential · Sydney",   project: "Harbourside Penthouse",              meta: "Arent & Pyke · Rebel Walls, Tropical Series",  img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80" },
  { wide: false, label: "Hospitality · Paris",    project: "Hôtel de Crillon — Private Dining",  meta: "Chahan Minassian · Graham & Brown, Archive",  img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80" },
  { wide: false, label: "Retail · Milan",         project: "Marni Flagship — Via della Spiga",   meta: "Sybarite Architects · Custom Commission",     img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80" },
];

const TESTIMONIALS = [
  {
    quote: "Murall has become our first call for wallcoverings on every residential project. The brand curation is exceptional — they stock names I'd previously have to source directly from Europe.",
    name: "Sophie Ashby",
    role: "Studio Ashby, London",
    initials: "SA",
  },
  {
    quote: "The account manager relationship is what sets them apart. She knows our aesthetic, flags relevant arrivals before we even think to look, and makes project billing completely painless.",
    name: "Marcus Wilds",
    role: "Wilds Architecture, Melbourne",
    initials: "MW",
  },
  {
    quote: "We specified Murall on a 47-room boutique hotel in Marrakech. The technical support for international shipping and install guides made it seamless. Not one roll arrived damaged.",
    name: "Laure Hériard",
    role: "Atelier LH, Paris",
    initials: "LH",
  },
];

const RESOURCES = [
  {
    icon: "📄",
    title: "Brand catalogues",
    desc: "Full PDF catalogues for all 25 brands — including colourways, roll dimensions, repeat sizes, and substrate options. Updated each season.",
    link: "Download catalogues",
  },
  {
    icon: "📐",
    title: "Technical spec sheets",
    desc: "Per-product data sheets with fire ratings, installation requirements, substrate compatibility, and VOC compliance certifications.",
    link: "Download spec sheets",
  },
  {
    icon: "🗂️",
    title: "CAD & BIM files",
    desc: "Revit families and AutoCAD blocks for popular products. Available to trade members from the portal once approved.",
    link: "Access in trade portal",
  },
];

const FAQS = [
  {
    q: "Who is eligible for the Murall Trade Programme?",
    a: "The programme is open to interior designers, architects, specifiers, interior decorators, and property developers with a professional practice. We review every application individually — you don't need a large studio or minimum order threshold to join.",
  },
  {
    q: "How long does approval take?",
    a: "Most applications are reviewed within 48 business hours. You'll receive an email with your trade portal login as soon as you're approved. If we need additional information, our trade team will reach out directly.",
  },
  {
    q: "Can I order samples before I'm approved?",
    a: "Yes — you can order samples at standard pricing from the main site while your application is pending. Once approved, your trade pricing and free sample allowance will be applied to your account and any future orders.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to over 60 countries worldwide. Our trade team has experience coordinating deliveries to complex international project sites, including customs documentation and specialist freight for large commercial orders.",
  },
  {
    q: "Is there a minimum order value for trade pricing?",
    a: "No minimum. Trade pricing applies from the very first roll you purchase, on every order, regardless of size. For very large commercial projects, speak to your account manager about additional volume pricing.",
  },
];

type FormStep = "form" | "success";

export default function TradePage() {
  const [sampleOpen, setSampleOpen] = useState(false);
  const [step, setStep] = useState<FormStep>("form");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    company: "", role: "", website: "", message: "",
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

      {/* ── HERO ── */}
      <section className="relative flex items-center overflow-hidden bg-stone-900" style={{ minHeight: "100vh", paddingTop: "160px" }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80"
            alt="" className="w-full h-full object-cover" aria-hidden="true"
            style={{ opacity: 0.25, objectPosition: "center right" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(28,25,23,1) 40%, rgba(28,25,23,0.15) 80%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-8 py-20 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest mb-6" style={{ fontFamily: "Inter, sans-serif", color: "#c9a96e" }}>
              Trade Programme
            </p>
            <h1 className="font-semibold text-white mb-5 leading-tight" style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(40px, 4.5vw, 62px)" }}>
              For designers who demand <em>the extraordinary</em>
            </h1>
            <p className="text-stone-300 text-lg max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Join 2,400+ interior designers, architects and specifiers who trust Murall for their most ambitious residential and commercial projects worldwide.
            </p>
            <div className="flex gap-10 flex-wrap border-t border-b border-white/10 py-7 my-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-semibold" style={{ fontFamily: "'EB Garamond', serif", color: "#c9a96e" }}>{s.value}</div>
                  <div className="text-xs text-white/50 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none text-sm font-semibold transition-colors" style={{ fontFamily: "Inter, sans-serif", background: "#c9a96e", color: "#1c1917" }}>
                Apply for trade access →
              </a>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none text-sm font-medium border border-white/30 text-white hover:border-white/70 transition-colors bg-transparent" style={{ fontFamily: "Inter, sans-serif" }}>
                Download lookbook
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRESS STRIP ── */}
      <div style={{ background: "#0c0a09", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }} className="py-5 px-8 flex items-center gap-12 overflow-hidden">
        <span className="text-xs font-medium uppercase whitespace-nowrap flex-shrink-0" style={{ fontFamily: "Inter, sans-serif", color: "#a8a29e", letterSpacing: "0.1em" }}>
          Projects featured in
        </span>
        <div className="flex gap-9 items-center flex-wrap">
          {PRESS.map((p) => (
            <span key={p} className="text-xs font-semibold uppercase" style={{ fontFamily: "Inter, sans-serif", color: "#d6d3d1", letterSpacing: "0.15em" }}>{p}</span>
          ))}
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-white" aria-labelledby="benefits-heading">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>What&apos;s included</p>
          <h2 id="benefits-heading" className="text-4xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
            Everything your practice <em>needs</em>
          </h2>
          <p className="text-stone-500 text-base mb-14 max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            From project inception to installation, Murall Trade is built around the real workflow of design professionals — not an afterthought.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-stone-200" style={{ gap: "1px", background: "#e7e5e4" }}>
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white p-10 hover:bg-stone-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-none bg-stone-100 text-stone-600 flex items-center justify-center mb-5">
                  {b.icon}
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2.5" style={{ fontFamily: "'EB Garamond', serif" }}>{b.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>How it works</p>
            <h2 className="text-4xl font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>
              Approved and sourcing <em>in days</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-7 left-[20%] right-[20%] h-px bg-stone-200" />
            {STEPS.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center relative z-10">
                <div className="w-14 h-14 rounded-full border border-stone-200 bg-white flex items-center justify-center mx-auto mb-6 text-2xl font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>
                  {s.num}
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>{s.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT SHOWCASE ── */}
      <section className="py-24 bg-stone-900">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ fontFamily: "Inter, sans-serif", color: "#c9a96e" }}>Projects</p>
          <h2 className="text-4xl font-semibold text-white mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
            From our <em>trade community</em>
          </h2>
          <p className="text-stone-400 text-base mb-10 max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            A selection of completed projects by Murall trade members — from boutique residences to landmark hospitality interiors.
          </p>
          <div className="grid grid-cols-3" style={{ gridTemplateRows: "280px 280px", gap: "4px" }}>
            {SHOWCASE.map((item, i) => (
              <div key={i} className={`relative overflow-hidden group cursor-pointer${item.wide ? " col-span-2" : ""}`}>
                <img src={item.img} alt={item.project} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(12,10,9,0.9) 0%, transparent 60%)" }}>
                  <p className="text-white font-semibold text-lg" style={{ fontFamily: "'EB Garamond', serif" }}>{item.project}</p>
                  <p className="text-xs mt-1" style={{ fontFamily: "Inter, sans-serif", color: "#c9a96e" }}>{item.meta}</p>
                </div>
                <div className="absolute top-4 left-4 text-xs font-medium uppercase text-white px-2.5 py-1.5" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.1em", background: "rgba(12,10,9,0.65)", borderLeft: "2px solid #c9a96e" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none text-sm font-medium border border-white/30 text-white hover:border-white/70 transition-colors bg-transparent" style={{ fontFamily: "Inter, sans-serif" }}>
              View all projects →
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-stone-50" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>From the community</p>
          <h2 id="testimonials-heading" className="text-4xl font-semibold text-stone-900 mb-12" style={{ fontFamily: "'EB Garamond', serif" }}>
            What leading designers <em>say</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }} className="bg-white rounded-none p-8 border border-stone-200">
                <div className="text-5xl text-stone-200 mb-3 leading-none" style={{ fontFamily: "'EB Garamond', serif" }}>&ldquo;</div>
                <p className="text-stone-800 text-lg leading-relaxed mb-8 italic" style={{ fontFamily: "'EB Garamond', serif" }}>{t.quote}</p>
                <footer className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full border border-stone-200 bg-stone-100 flex items-center justify-center text-sm font-semibold text-stone-600 flex-shrink-0" style={{ fontFamily: "'EB Garamond', serif" }}>{t.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>{t.name}</p>
                    <p className="text-xs text-stone-500" style={{ fontFamily: "Inter, sans-serif" }}>{t.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEC RESOURCES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Specification resources</p>
          <h2 className="text-4xl font-semibold text-stone-900 mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
            Everything you need to <em>specify</em>
          </h2>
          <p className="text-stone-500 text-base mb-14 max-w-xl leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            We know architects and specifiers need more than beautiful images. Download technical documentation, catalogues, and BIM-ready files for your projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="border border-stone-200 rounded-none p-9 hover:border-stone-400 hover:shadow-md transition-all cursor-pointer flex flex-col gap-4">
                <div className="text-2xl">{r.icon}</div>
                <h3 className="text-xl font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>{r.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed flex-1" style={{ fontFamily: "Inter, sans-serif" }}>{r.desc}</p>
                <span className="text-sm font-semibold text-stone-900 flex items-center gap-1" style={{ fontFamily: "Inter, sans-serif" }}>{r.link} →</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section className="py-24 bg-stone-50" id="apply" aria-labelledby="apply-heading">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Join the programme</p>
            <h2 id="apply-heading" className="text-4xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>
              Apply <em>today</em>
            </h2>
            <p className="text-stone-500 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Free to join. No minimum spend. Approved within 48 hours. Start specifying with trade pricing on your very next project.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-3" style={{ fontFamily: "'EB Garamond', serif" }}>Application received</h3>
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
                      <label htmlFor={name} className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{label}</label>
                      <input id={name} name={name} type={type} required={required} value={form[name as keyof typeof form]} onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-none border border-stone-200 bg-white text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
                        style={{ fontFamily: "Inter, sans-serif" }} />
                    </div>
                  ))}
                </div>
                {[
                  { name: "email",   label: "Work email",           type: "email", required: true  },
                  { name: "company", label: "Studio / company name", type: "text",  required: true  },
                  { name: "website", label: "Website (optional)",    type: "url",   required: false },
                ].map(({ name, label, type, required }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>{label}</label>
                    <input id={name} name={name} type={type} required={required} value={form[name as keyof typeof form]} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-none border border-stone-200 bg-white text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }} />
                  </div>
                ))}
                <div>
                  <label htmlFor="role" className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Your role</label>
                  <select id="role" name="role" required value={form.role} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-none border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent cursor-pointer"
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
                  <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-stone-500 mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>Tell us about your projects (optional)</label>
                  <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange}
                    placeholder="What kinds of spaces do you typically work on? Residential, hospitality, commercial?"
                    className="w-full px-4 py-2.5 rounded-none border border-stone-200 bg-white text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent resize-none"
                    style={{ fontFamily: "Inter, sans-serif" }} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-none bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {loading ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>Submitting…</>
                  ) : "Submit application →"}
                </button>
                <p className="text-xs text-stone-400 text-center" style={{ fontFamily: "Inter, sans-serif" }}>Your information is never shared with third parties.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Common questions</p>
          <h2 className="text-4xl font-semibold text-stone-900 mb-12" style={{ fontFamily: "'EB Garamond', serif" }}>
            Trade programme <em>FAQ</em>
          </h2>
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-stone-200 py-6">
                <button className="w-full flex justify-between items-center gap-6 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="text-lg font-semibold text-stone-900" style={{ fontFamily: "'EB Garamond', serif" }}>{faq.q}</span>
                  <span className="text-stone-400 text-xl flex-shrink-0" style={{ fontFamily: "Inter, sans-serif" }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="text-stone-500 text-sm leading-relaxed pt-4 overflow-hidden"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-24 text-center" style={{ background: "#2d4a3e" }}>
        <h2 className="font-semibold text-white mb-4 leading-tight" style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(36px, 4vw, 54px)" }}>
          Ready to elevate your <em>next project?</em>
        </h2>
        <p className="text-lg mb-10" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)" }}>
          Join 2,400+ design professionals already specifying with Murall Trade.
        </p>
        <a href="#apply" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-none transition-colors" style={{ fontFamily: "Inter, sans-serif", background: "#ffffff", color: "#2d4a3e" }}>
          Apply for trade access
        </a>
      </section>

      <CartDrawer />
      <SearchOverlay />
      <SampleRequestModal isOpen={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

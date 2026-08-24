"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, ArrowRight, Leaf, Sprout, Tractor, ShieldCheck,
  Bug, FlaskConical, Wheat, BookOpen, Phone, MapPin,
  Facebook, Linkedin, Youtube, Sparkles, Send,
  TrendingUp, CheckCircle, Clock, Star, Rss,
  ChevronRight, Zap, CircleDot, Package,
} from "lucide-react";
import { motion, type Variants, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  { title: "Crop Protection", text: "Insecticides, fungicides & weedicides for safer defense.", icon: ShieldCheck, href: "/products/crop-protection", emoji: "🛡️", accent: "#e85d5d", count: "120+" },
  { title: "Plant Nutrition", text: "Balanced nutrition programs for stronger growth and yield.", icon: Sprout, href: "/products/plant-nutrition", emoji: "⚗️", accent: "#5bb8f5", count: "80+" },
  { title: "Seeds & Growth", text: "Solutions for healthy establishment and crop vigor.", icon: Wheat, href: "/products/seeds-growth", emoji: "🌾", accent: "#e8c547", count: "60+" },
  { title: "Bio Solutions", text: "Sustainable biological and eco-conscious farming options.", icon: Leaf, href: "/products/bio-solutions", emoji: "🍃", accent: "#7ec94a", count: "45+" },
];

const services = [
  { title: "Field Advisory Visits", text: "Agronomists visit your farm to assess crop stage, soil condition, and stress factors — providing site-specific guidance.", icon: MapPin, emoji: "🗺️" },
  { title: "Crop Protection Planning", text: "Structured timing and product plans for disease and pest control. Reduces over-application and lowers input costs.", icon: Bug, emoji: "🐛" },
  { title: "Nutrition Programs", text: "Season-long feeding schedules based on crop type, soil analysis, and yield targets.", icon: FlaskConical, emoji: "⚗️" },
  { title: "Mechanization Support", text: "Operational guidance for machinery use, drone spraying coordination, and equipment calibration.", icon: Tractor, emoji: "🚜" },
  { title: "Soil & Tissue Testing", text: "Laboratory analysis of soil and crop tissue to accurately diagnose deficiencies and guide confident input decisions.", icon: Zap, emoji: "🔬" },
  { title: "Input Supply Chain", text: "Reliable, timely delivery of approved inputs across all nine provinces with fully stocked distribution centers.", icon: Package, emoji: "📦" },
];

const featuredProducts = [
  { name: "Agro Shield Plus", category: "Crop Protection", desc: "Broad-spectrum fungicide for paddy, vegetables, and plantation crops. Controls blast, blight, and downy mildew.", image: "/proj1.png", crops: ["Paddy", "Veg"], badge: "Best Seller", accent: "#e85d5d" },
  { name: "Green Grow Max", category: "Plant Nutrition", desc: "High-potassium NPK blend for fruit set and yield enhancement. Suitable for banana, papaya, and vine crops.", image: "/proj2.png", crops: ["Fruit", "Vine"], badge: null, accent: "#5bb8f5" },
  { name: "Bio Defend", category: "Bio Solutions", desc: "Trichoderma-based biological fungicide for soil-borne disease suppression. Improves soil microbiome health.", image: "/proj.png", crops: ["All crops"], badge: "New", accent: "#7ec94a" },
  { name: "Yield Boost Mix", category: "Plant Nutrition", desc: "Chelated micronutrient complex correcting zinc, boron, and manganese deficiencies. Foliar and soil application.", image: "/hero-farm.png", crops: ["Tea", "Rubber"], badge: null, accent: "#e8c547" },
];

const articles = [
  { title: "How to identify early leaf damage before yield drops", excerpt: "Recognize the earliest warning signs of leaf stress before the field problem becomes expensive.", image: "/proj1.png", category: "Crop Health", readTime: "6 min", emoji: "🌿", href: "/blog/leaf-damage-guide" },
  { title: "Choosing the right input strategy for vegetable farming", excerpt: "A practical way to think about input selection based on growth stage and crop objective.", image: "/proj2.png", category: "Input Strategy", readTime: "5 min", emoji: "🥬", href: "/blog/input-strategy-vegetables" },
  { title: "Smarter disease prevention for plantation crops", excerpt: "Prevention is a system. Reduce risk before symptoms escalate into full crop loss.", image: "/proj.png", category: "Protection", readTime: "7 min", emoji: "🌳", href: "/blog/disease-prevention-plantation" },
];

const testimonials = [
  { quote: "The AI advisory identified leaf blight in my paddy before I noticed it. I followed the recommendation and saved nearly 40% of my crop that season.", name: "Nimal Perera", role: "Paddy Farmer — Polonnaruwa", emoji: "👨‍🌾", stars: 5 },
  { quote: "Their field advisor redesigned my nutrition program completely. Yield increased by 30% and quality improved significantly for market.", name: "Sunethra Jayawardena", role: "Vegetable Grower — Nuwara Eliya", emoji: "👩‍🌾", stars: 5 },
  { quote: "Bio Defend has been a game-changer for our estate. We've reduced chemical fungicide use by half while keeping disease levels low.", name: "Roshan de Silva", role: "Tea Estate Manager — Kandy", emoji: "🧑‍🌾", stars: 5 },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(v => !v)} className="grid h-10 w-10 place-items-center rounded-xl border border-[rgba(139,107,61,0.2)] bg-white" aria-label="Toggle menu">
        {open ? <X className="h-5 w-5 text-[#0d2b1a]" /> : <Menu className="h-5 w-5 text-[#0d2b1a]" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-4 right-4 top-[76px] z-50 overflow-hidden rounded-2xl border border-[rgba(139,107,61,0.15)] bg-white shadow-2xl"
          >
            <nav className="flex flex-col p-2">
              {["Home", "About", "Products", "AI Advisory", "Services", "Blog", "Contact"].map(item => (
                <Link key={item} href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`} onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#1a3028] hover:bg-[#f5f0e2]">
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-[rgba(139,107,61,0.15)] bg-[#faf6ec]/96 shadow-sm backdrop-blur-xl" : "border-b border-transparent bg-[#faf6ec]"}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ceypetco Agro"
            width={80}
            height={80}
            className="rounded-[12px] object-cover"
            priority
          />
          <div>
            <div className="text-[15px] font-black tracking-tight text-[#0d2b1a]" style={{ fontFamily: "'Georgia', serif" }}>CEYPETCO AGRO</div>
            <div className="text-[10px] font-bold uppercase tracking-[1.2px] text-[#2d7a4f]">Modern Farming Systems</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-[#3a4a3e] md:flex">
          {[["Home", "/"], ["About", "/about"], ["Products", "/products"], ["AI Advisory", "/ai-advisory"], ["Services", "/solutions"], ["Blog", "/blog"],["Contact", "/contact"]].map(([label, href]) => (
            <Link key={label} href={href} className="relative py-1 transition hover:text-[#0d2b1a] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#2d7a4f] after:transition-all hover:after:w-full">{label}</Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[#0d2b1a] px-5 py-2.5 text-sm font-bold text-[#e8c547] transition hover:bg-[#1e5c35]">
            Get Consultation <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[93vh] overflow-hidden bg-[#0d2b1a]">
      {/* Background layers */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_70%,rgba(45,122,79,0.35),transparent_55%),radial-gradient(ellipse_at_80%_15%,rgba(232,197,71,0.08),transparent_50%)]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="hg" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M 56 0 L 0 0 0 56" fill="none" stroke="#7ec94a" strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#hg)" />
        </svg>
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-20 pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        {/* Left */}
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[rgba(232,197,71,0.3)] bg-[rgba(232,197,71,0.1)] px-4 py-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#e8c547]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7ec94a] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7ec94a]" />
            </span>
            Sri Lanka's Agricultural Partner
          </motion.div>

          <motion.h1 variants={fadeUp} className="mb-6 text-[clamp(3.2rem,5.5vw,5.8rem)] font-black leading-[0.93] tracking-[-2.5px] text-white" style={{ fontFamily: "'Georgia', serif" }}>
            Better Crops.<br />
            <span className="text-[#7ec94a]">Smarter</span><br />
            <span className="[-webkit-text-stroke:2px_#e8c547] text-transparent">Farming.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mb-10 max-w-[500px] text-[17px] font-light leading-8 text-[rgba(255,255,255,0.62)]">
            From crop protection to AI-powered field advisory CEYPETCO Agro delivers science-backed solutions for every stage of the farming cycle.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-12 flex flex-wrap gap-3">
            <Link href="/products" className="group inline-flex items-center gap-2.5 rounded-xl bg-[#7ec94a] px-7 py-3.5 text-sm font-bold text-[#0d2b1a] shadow-[0_0_30px_rgba(126,201,74,0.35)] transition hover:-translate-y-0.5 hover:bg-[#9adf60] hover:shadow-[0_0_40px_rgba(126,201,74,0.5)]">
              Explore Products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/ai-advisory" className="inline-flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.07)] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.12)]">
              Try AI Advisory
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-8 border-t border-[rgba(255,255,255,0.1)] pt-8">
            {[["25K+", "Farmers Served"], ["300+", "Products"], ["18", "Crop Types"], ["40yr", "Experience"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-mono text-[1.9rem] font-bold leading-none text-[#e8c547]">{num}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.8px] text-[rgba(255,255,255,0.4)]">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — stacked cards */}
        <motion.div initial="hidden" animate="show" variants={slideLeft} className="hidden lg:flex lg:flex-col lg:gap-4">
          {/* Main image card */}
          <div className="relative overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.1)]" style={{ height: 340 }}>
            <Image src="/hero-farm.png" alt="Farm field" fill className="object-cover opacity-75" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b1a]/60 via-transparent to-transparent" />
          </div>

          {/* Two info cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* AI Insight */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-5 backdrop-blur-xl">
              <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-[#7ec94a]">
                <CircleDot className="h-3 w-3 animate-pulse" /> AI Insight
              </div>
              <div className="text-sm font-bold leading-snug text-white" style={{ fontFamily: "'Georgia', serif" }}>Leaf rust in Paddy Field C</div>
              <p className="mt-1.5 text-xs leading-5 text-[rgba(255,255,255,0.55)]">Apply fungicide within 48hr. Propiconazole 25% EC.</p>
            </div>
            {/* Seasonal offer */}
            <div className="rounded-2xl bg-[#e8c547] p-5">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[1.5px] text-[#0d2b1a]/60">Seasonal Offer</div>
              <div className="text-sm font-black leading-snug text-[#0d2b1a]" style={{ fontFamily: "'Georgia', serif" }}>Up to 20% off protection bundles</div>
              <Link href="/products" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#0d2b1a]">View offer <ArrowRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function Ticker() {
  const items = ["Paddy Cultivation Solutions", "Vegetable Crop Advisory", "Tea & Rubber Inputs", "Bio Solutions Available", "Seasonal Promotion Active", "Field Advisory Services", "Certified Agro Inputs", "Drone Spraying Available"];
  return (
    <div className="overflow-hidden bg-[#e8c547] py-3">
      <div className="flex w-max animate-[ticker_28s_linear_infinite]">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="whitespace-nowrap px-10 font-mono text-[11px] font-bold uppercase tracking-[1px] text-[#0d2b1a]">
            ◆ {item}
          </span>
        ))}
      </div>
      <style jsx>{`@keyframes ticker { from { transform:translateX(0) } to { transform:translateX(-50%) } }`}</style>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, subtitle, linkText, linkHref, light = false }: {
  eyebrow: string; title: string; subtitle?: string; linkText?: string; linkHref?: string; light?: boolean;
}) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className={`mb-4 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[2px] ${light ? "text-[#7ec94a]" : "text-[#2d7a4f]"}`}>
          <span className={`inline-block h-px w-6 ${light ? "bg-[#7ec94a]" : "bg-[#2d7a4f]"}`} />
          {eyebrow}
        </div>
        <h2 className={`text-[clamp(2rem,3.5vw,3.2rem)] font-black leading-[1.05] tracking-[-1.5px] ${light ? "text-white" : "text-[#0d2b1a]"}`} style={{ fontFamily: "'Georgia', serif" }}>
          {title}
        </h2>
        {subtitle && <p className={`mt-4 max-w-[580px] text-base font-light leading-7 ${light ? "text-[rgba(255,255,255,0.55)]" : "text-[#4a5e50]"}`}>{subtitle}</p>}
      </div>
      {linkText && linkHref && (
        <Link href={linkHref} className={`border-b border-current pb-0.5 text-sm font-bold transition ${light ? "text-[#7ec94a] hover:text-white" : "text-[#2d7a4f] hover:text-[#0d2b1a]"}`}>
          {linkText} →
        </Link>
      )}
    </div>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────

function CategorySection() {
  return (
    <section className="bg-white px-[5vw] py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeader eyebrow="Product Categories" title={`Start with the right\nsolution area`} subtitle="Four core categories covering every dimension of modern farm management." linkText="View all products" linkHref="/products" />
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="grid gap-[1.5px] overflow-hidden rounded-3xl border border-[rgba(139,107,61,0.1)] bg-[rgba(139,107,61,0.1)] sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeUp}>
                <Link href={item.href}
                  className="group relative flex h-full flex-col overflow-hidden bg-white p-8 transition hover:bg-[#faf6ec]">
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: item.accent }} />
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl" style={{ background: `${item.accent}18` }}>
                      {item.emoji}
                    </div>
                    <span className="font-mono text-[11px] font-bold" style={{ color: item.accent }}>{item.count}</span>
                  </div>
                  <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#8a9e8e]">Products</div>
                  <h3 className="mb-3 text-xl font-black text-[#0d2b1a]" style={{ fontFamily: "'Georgia', serif" }}>{item.title}</h3>
                  <p className="flex-1 text-sm leading-7 text-[#4d6154]">{item.text}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#4d6154] transition group-hover:gap-3" style={{ color: item.accent }}>
                    Open category <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Trust Strip ──────────────────────────────────────────────────────────────

function TrustStrip() {
  return (
    <section className="bg-[#0d2b1a] px-[5vw] py-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-px overflow-hidden rounded-2xl bg-[rgba(255,255,255,0.08)] md:grid-cols-3 xl:grid-cols-5">
          {[["25,000+", "Active Farmers"], ["300+", "Registered Products"], ["9", "Provinces Covered"], ["98%", "Delivery Reliability"], ["40yr", "Industry Experience"]].map(([num, label], i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
              className="bg-[#1a3d28] px-8 py-10 text-center">
              <div className="text-[2.8rem] font-black leading-none text-[#e8c547]" style={{ fontFamily: "'Georgia', serif" }}>{num}</div>
              <div className="mt-2 text-sm text-[rgba(255,255,255,0.45)]">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function ServicesSection() {
  return (
    <section className="bg-[#faf6ec] px-[5vw] py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          {/* Sticky left */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="lg:sticky lg:top-24">
            <div className="mb-4 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#2d7a4f]">
              <span className="h-px w-6 bg-[#2d7a4f]" />Our Services
            </div>
            <h2 className="mb-4 text-[clamp(2rem,3.5vw,3.2rem)] font-black leading-[1.05] tracking-[-1.5px] text-[#0d2b1a]" style={{ fontFamily: "'Georgia', serif" }}>
              Beyond products —<br />a complete farming<br />partnership
            </h2>
            <p className="mb-8 max-w-[420px] text-base font-light leading-7 text-[#4a5e50]">
              We don't just supply inputs. We work alongside farmers to plan, troubleshoot, and improve results season by season.
            </p>
            <div className="mb-8 inline-block rounded-lg bg-[#0d2b1a] px-4 py-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#7ec94a]">
              Included with purchase
            </div>
            <div>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[#0d2b1a] px-7 py-3.5 text-sm font-bold text-[#e8c547] transition hover:bg-[#2d7a4f] hover:text-white">
                Book a Field Visit →
              </Link>
            </div>
          </motion.div>

          {/* Service list */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="overflow-hidden rounded-2xl border border-[rgba(139,107,61,0.1)]">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} variants={fadeUp}
                  className="group flex items-start gap-4 border-l-[3px] border-transparent bg-white p-7 transition hover:border-[#7ec94a] hover:bg-[#f0f7f1]">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#f5f0e2] text-xl transition group-hover:bg-[#e8f5ec]">
                    {service.emoji}
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-[15px] font-black text-[#0d2b1a]" style={{ fontFamily: "'Georgia', serif" }}>{service.title}</h3>
                    <p className="text-sm leading-7 text-[#4b5f53]">{service.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

function ProductsSection() {
  return (
    <section className="bg-white px-[5vw] py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeader eyebrow="Featured Products" title={`Trusted inputs across\nSri Lanka's farms`} linkText="Browse all products" linkHref="/products" />
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <motion.div key={product.name} variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group overflow-hidden rounded-3xl border border-[rgba(139,107,61,0.1)] bg-[#faf6ec] shadow-sm transition hover:shadow-xl">
              {/* Image */}
              <div className="relative h-[190px] overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                {product.badge && (
                  <span className="absolute right-3 top-3 rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.5px]" style={{ background: product.accent, color: "#0d2b1a" }}>
                    {product.badge}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: product.accent }} />
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[1.5px]" style={{ color: product.accent }}>{product.category}</div>
                <h3 className="mb-2 text-[1.1rem] font-black text-[#0d2b1a]" style={{ fontFamily: "'Georgia', serif" }}>{product.name}</h3>
                <p className="mb-4 text-sm leading-6 text-[#4c6053]">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {product.crops.map(crop => (
                      <span key={crop} className="rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: `${product.accent}18`, color: product.accent }}>{crop}</span>
                    ))}
                  </div>
                  <Link href="/products" className="text-xs font-bold transition" style={{ color: product.accent }}>Details →</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── AI Section ───────────────────────────────────────────────────────────────

function AISection() {
  const [messages, setMessages] = useState([
    { role: "user", text: "My paddy leaves have orange-brown spots with yellow borders. Started 3 days ago." },
    { role: "ai", text: "This matches **Bacterial Leaf Blight (BLB)**. Spread by waterlogging or high humidity.\n\n1. Apply Copper Oxychloride 50% WP at 3g/L\n2. Reduce irrigation for 5–7 days\n3. Improve field drainage now\n\nWant a full 6-week spray schedule?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { role: "user", text: input }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { role: "ai", text: "Based on that, I recommend Agro Shield Plus (Propiconazole 25% EC) at 1ml/L. Apply early morning below 30°C. Shall I build a full spray calendar for the season?" }]);
    }, 2200);
  };

  return (
    <section className="relative overflow-hidden bg-[#0d2b1a] px-[5vw] py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-80px] top-[-80px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(126,201,74,0.08),transparent_70%)]" />
        <div className="absolute bottom-[-60px] left-[-60px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,197,71,0.05),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeader light eyebrow="AI Crop Advisory" title={`Intelligent guidance\nfor every crop decision`}
            subtitle="Our AI assistant analyzes crop type, growth stage, and symptoms to deliver precise, actionable recommendations — 24/7." />
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          {/* Left features */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="space-y-3">
            {["Pest and disease identification from symptom description", "Targeted product and dosage recommendations", "Optimal application timing based on crop stage", "Weather-based spray window alerts", "Nutrition deficiency diagnosis with corrective plans"].map((feat, i) => (
              <motion.div key={feat} variants={fadeUp}
                className="flex items-start gap-3 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.04)] p-4 backdrop-blur-sm">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(126,201,74,0.2)] text-[11px] font-black text-[#7ec94a]">✓</div>
                <span className="text-sm leading-6 text-[rgba(255,255,255,0.7)]">{feat}</span>
              </motion.div>
            ))}
            <motion.div variants={fadeUp} className="pt-2">
              <Link href="/ai-advisory" className="inline-flex items-center gap-2.5 rounded-xl bg-[#7ec94a] px-7 py-3.5 text-sm font-bold text-[#0d2b1a] shadow-[0_0_30px_rgba(126,201,74,0.3)] transition hover:bg-[#9adf60]">
                Launch AI Advisory →
              </Link>
            </motion.div>
          </motion.div>

          {/* Chat */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={slideLeft}
            className="overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.08)] px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7ec94a] to-[#2d7a4f] text-base">🤖</div>
              <div>
                <div className="text-sm font-bold text-white">Agro AI Assistant</div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#7ec94a]"><CircleDot className="h-2.5 w-2.5 animate-pulse" />Field Advisory Engine · Active</div>
              </div>
              <div className="ml-auto flex gap-1.5">
                {["bg-red-400/60", "bg-yellow-400/60", "bg-green-400/60"].map(c => <div key={c} className={`h-2.5 w-2.5 rounded-full ${c}`} />)}
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-4 overflow-y-auto p-5" style={{ maxHeight: 300 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "ai" && (
                    <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(126,201,74,0.15)]">
                      <Sparkles className="h-3.5 w-3.5 text-[#7ec94a]" />
                    </div>
                  )}
                  <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-6 ${msg.role === "user" ? "rounded-tr-sm bg-[rgba(126,201,74,0.2)] text-[rgba(255,255,255,0.85)]" : "rounded-tl-sm border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.78)]"}`}>
                    {msg.text.replace(/\*\*(.*?)\*\*/g, "$1")}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(126,201,74,0.15)]"><Sparkles className="h-3.5 w-3.5 text-[#7ec94a]" /></div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] px-4 py-3">
                    {[0, 1, 2].map(i => <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#7ec94a]" style={{ animationDelay: `${i * 0.15}s` }} />)}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[rgba(255,255,255,0.08)] p-4">
              <div className="flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] px-4 py-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Describe your crop issue…"
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[rgba(255,255,255,0.3)]" />
                <button onClick={handleSend} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7ec94a] text-[#0d2b1a] transition hover:bg-[#9adf60]">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Promo Banner ─────────────────────────────────────────────────────────────

function PromoBanner() {
  return (
    <section className="bg-[#faf6ec] px-[5vw] py-8">
      <div className="mx-auto max-w-[1400px]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-[#1a3d28] px-8 py-10 md:px-12">
          <div className="pointer-events-none absolute right-32 top-1/2 -translate-y-1/2 text-[120px] opacity-[0.07] select-none">🌿</div>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#7ec94a]">Seasonal Campaign — Maha 2025</div>
              <h2 className="mb-3 text-3xl font-black leading-tight text-white md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
                Up to 20% off selected<br />crop protection bundles
              </h2>
              <p className="max-w-xl text-sm leading-7 text-[rgba(255,255,255,0.55)]">
                Curated input bundles for paddy, vegetable, and plantation crops — including fungicide, fertilizer, and advisory access. Valid until 31 March 2026.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link href="/products" className="inline-flex items-center gap-2.5 rounded-xl bg-[#e8c547] px-7 py-4 text-sm font-black text-[#0d2b1a] shadow-[0_0_30px_rgba(232,197,71,0.3)] transition hover:bg-[#f0d050]">
                View Promotion →
              </Link>
              <span className="text-[11px] text-[rgba(255,255,255,0.3)]">Limited seasonal offer</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section className="bg-white px-[5vw] py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeader eyebrow="Farmer Stories" title={`What farmers say\nabout Ceypetco Agro`} />
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="flex flex-col rounded-3xl border border-[rgba(139,107,61,0.1)] bg-[#faf6ec] p-8 shadow-sm transition hover:shadow-md">
              <div className="mb-4 text-[#e8c547]">{"★".repeat(t.stars)}</div>
              <p className="mb-6 flex-1 text-sm leading-7 text-[#3a4e40] italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d2b1a] text-xl">{t.emoji}</div>
                <div>
                  <div className="text-sm font-black text-[#0d2b1a]">{t.name}</div>
                  <div className="text-xs text-[#6a8070]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function BlogSection() {
  return (
    <section className="bg-[#faf6ec] px-[5vw] py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <SectionHeader eyebrow="Crop Knowledge" title={`Education, not just\nproduct pages`} linkText="View all articles" linkHref="/blog" />
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="grid gap-5 md:grid-cols-3">
          {articles.map((article, i) => (
            <motion.div key={article.title} variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group overflow-hidden rounded-3xl border border-[rgba(139,107,61,0.1)] bg-white shadow-sm transition hover:shadow-md">
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a3d28] to-[#2d7a4f]">
                <div className="text-7xl opacity-20 transition-transform duration-500 group-hover:scale-110 select-none">{article.emoji}</div>
                <span className="absolute left-4 top-4 rounded-lg bg-[#7ec94a] px-3 py-1 text-[10px] font-black uppercase tracking-[0.5px] text-[#0d2b1a]">{article.category}</span>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2 text-[11px] text-[#8a9e8e]">
                  <Clock className="h-3 w-3" /> {article.readTime} read
                </div>
                <h3 className="mb-3 text-lg font-black leading-snug text-[#0d2b1a]" style={{ fontFamily: "'Georgia', serif" }}>{article.title}</h3>
                <p className="mb-4 text-sm leading-6 text-[#4d6154]">{article.excerpt}</p>
                <Link href={article.href} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d7a4f] transition group-hover:gap-3">
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────

function ContactCTA() {
  return (
    <section className="bg-white px-[5vw] py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="overflow-hidden rounded-3xl border border-[rgba(139,107,61,0.1)] bg-[#faf6ec]">
          <div className="grid gap-12 p-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-12">
            <div>
              <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[2px] text-[#2d7a4f]">— Need Guidance?</div>
              <h2 className="mb-4 text-4xl font-black leading-tight tracking-tight text-[#0d2b1a] md:text-5xl" style={{ fontFamily: "'Georgia', serif" }}>
                Talk to the<br />Ceypetco Agro team
              </h2>
              <p className="max-w-lg text-base font-light leading-7 text-[#4a5e50]">
                Whether you need product selection, crop advice, or support for field decisions — give farmers a direct route to action.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-[#4a5e50]"><MapPin className="h-4 w-4 text-[#2d7a4f]" /> 609, Dr. Danister de Silva Mawatha, Colombo 09</div>
                <div className="flex items-center gap-2 text-sm text-[#4a5e50]"><Phone className="h-4 w-4 text-[#2d7a4f]" /> +94 11 729 6100</div>
              </div>
            </div>

            <form className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input className="rounded-xl border border-[rgba(139,107,61,0.15)] bg-white px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-[#2d7a4f]" placeholder="Full name" />
                <input className="rounded-xl border border-[rgba(139,107,61,0.15)] bg-white px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-[#2d7a4f]" placeholder="Phone number" />
              </div>
              <select className="rounded-xl border border-[rgba(139,107,61,0.15)] bg-white px-4 py-3 text-sm text-[#4a5e50] outline-none focus:border-[#2d7a4f]">
                <option value="">Select crop type</option>
                {["Paddy", "Vegetables", "Tea", "Rubber", "Coconut", "Fruits", "Other"].map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea rows={4} className="rounded-xl border border-[rgba(139,107,61,0.15)] bg-white px-4 py-3 text-sm outline-none placeholder:text-neutral-400 focus:border-[#2d7a4f] resize-none" placeholder="Tell us your crop, issue, and objective" />
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0d2b1a] px-6 py-3.5 text-sm font-bold text-[#e8c547] transition hover:bg-[#1e5c35]">
                Send Inquiry <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0d1a0f] text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="mb-14 grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Ceypetco Agro"
                width={80}
                height={80}
                className="rounded-xl object-cover"
              />
              <div className="text-sm font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>Ceypetco Agro</div>
            </div>
            <p className="mb-5 text-sm leading-7 text-[rgba(255,255,255,0.38)]">A modern agriculture platform built around trust, product clarity, and real farm guidance. Serving Sri Lankan farmers since 1984.</p>
            <div className="flex gap-2">
              {[{ Icon: Facebook, href: "https://facebook.com" }, { Icon: Linkedin, href: "https://linkedin.com" }, { Icon: Youtube, href: "https://youtube.com" }].map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-xl bg-[rgba(255,255,255,0.06)] transition hover:bg-[rgba(255,255,255,0.12)]">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Products", links: ["Crop Protection", "Plant Nutrition", "Seeds & Growth", "Bio Solutions", "New Arrivals"] },
            { title: "Services", links: ["Field Advisory", "AI Advisory", "Soil Testing", "Nutrition Programs", "Mechanization"] },
            { title: "Company", links: ["About Us", "Blog & Insights", "Careers", "Dealer Network", "Contact"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[1.5px] text-[rgba(255,255,255,0.85)]">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}><Link href="#" className="text-sm text-[rgba(255,255,255,0.38)] transition hover:text-[#7ec94a]">{link}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.07)] pt-6">
          <div className="text-xs text-[rgba(255,255,255,0.2)]">© {new Date().getFullYear()} Ceypetco Agro. All rights reserved. A division of Ceylon Petroleum Corporation.</div>
          <div className="flex gap-2">
            {["ISO 9001:2015", "DOA Registered", "SLSI Certified"].map(c => (
              <span key={c} className="rounded-lg bg-[rgba(255,255,255,0.05)] px-3 py-1.5 text-[10px] font-bold text-[rgba(255,255,255,0.3)]">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <HeroSection />
      <Ticker />
      <CategorySection />
      <TrustStrip />
      <ServicesSection />
      <ProductsSection />
      <AISection />
      <PromoBanner />
      <TestimonialsSection />
      <BlogSection />
      <ContactCTA />
      <Footer />
    </div>
  );
}
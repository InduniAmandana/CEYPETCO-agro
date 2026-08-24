"use client";

import Link from "next/link";
import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  FlaskConical,
  Wheat,
  Bug,
  ChevronRight,
  SlidersHorizontal,
  Sparkles,
  Package,
  Star,
  CheckCircle2,
} from "lucide-react";

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories = [
  {
    title: "Crop Protection",
    slug: "crop-protection",
    text: "Insecticides, fungicides, and weedicides designed for practical field protection against pests and disease pressure.",
    icon: ShieldCheck,
    emoji: "🛡️",
    accent: "#2d7a4f",
    lightAccent: "#2d7a4f18",
    count: "84 products",
    tags: ["Insecticide", "Fungicide", "Herbicide"],
  },
  {
    title: "Plant Nutrition",
    slug: "plant-nutrition",
    text: "Balanced macro and micro nutrition programs for growth, resilience, and stronger yield performance.",
    icon: FlaskConical,
    emoji: "⚗️",
    accent: "#5bb8f5",
    lightAccent: "#5bb8f518",
    count: "62 products",
    tags: ["NPK Blends", "Foliar", "Micronutrients"],
  },
  {
    title: "Bio Solutions",
    slug: "bio-solutions",
    text: "Biological alternatives and sustainable crop care pathways with reduced chemical load.",
    icon: Leaf,
    emoji: "🍃",
    accent: "#7ec94a",
    lightAccent: "#7ec94a18",
    count: "38 products",
    tags: ["Biofungicide", "Biopesticide", "Soil Health"],
  },
  {
    title: "Seeds & Growth",
    slug: "seeds-growth",
    text: "Solutions for crop establishment, root strength, germination improvement, and vigour.",
    icon: Wheat,
    emoji: "🌾",
    accent: "#e8c547",
    lightAccent: "#e8c54718",
    count: "29 products",
    tags: ["Growth Regulator", "Rooting", "Seed Treatment"],
  },
];

const featured = [
  {
    name: "Agro Shield Plus",
    category: "Crop Protection",
    desc: "Broad-spectrum fungicide for paddy, vegetables, and plantation crops. Controls blast, blight, and downy mildew.",
    emoji: "🛡️",
    accent: "#2d7a4f",
    badge: "Best Seller",
    crops: ["Paddy", "Veg"],
    rating: 4.8,
    reviews: 142,
  },
  {
    name: "Green Grow Max",
    category: "Plant Nutrition",
    desc: "High-potassium NPK blend for fruit set and yield enhancement. Formulated for banana and vine crops.",
    emoji: "🌿",
    accent: "#5bb8f5",
    badge: null,
    crops: ["Fruit", "Vine"],
    rating: 4.6,
    reviews: 89,
  },
  {
    name: "Bio Defend",
    category: "Bio Solutions",
    desc: "Trichoderma-based biological fungicide for soil-borne disease suppression and microbiome improvement.",
    emoji: "🍃",
    accent: "#7ec94a",
    badge: "New",
    crops: ["All Crops"],
    rating: 4.7,
    reviews: 56,
  },
  {
    name: "Yield Boost Mix",
    category: "Plant Nutrition",
    desc: "Chelated micronutrient complex correcting zinc, boron, and manganese deficiencies via foliar or soil.",
    emoji: "⚡",
    accent: "#e8c547",
    badge: null,
    crops: ["Tea", "Rubber"],
    rating: 4.5,
    reviews: 74,
  },
];

const pillars = [
  {
    icon: Bug,
    title: "Protection",
    desc: "Grouped by threat type, crop, and treatment logic — not alphabetical chaos.",
    accent: "#f4845f",
    lightAccent: "#f4845f15",
  },
  {
    icon: FlaskConical,
    title: "Nutrition",
    desc: "Presented as programs, not isolated SKUs. Season-long plans your agronomist can follow.",
    accent: "#5bb8f5",
    lightAccent: "#5bb8f515",
  },
  {
    icon: Leaf,
    title: "Bio Care",
    desc: "Sustainable alternatives with their own clear commercial pathway and use-case framing.",
    accent: "#7ec94a",
    lightAccent: "#7ec94a15",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3 w-3 ${s <= Math.round(rating) ? "fill-[#e8c547] text-[#e8c547]" : "text-neutral-200"}`}
        />
      ))}
    </div>
  );
}

function CategoryCard({ cat }: { cat: typeof categories[0] }) {
  const Icon = cat.icon;
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      {/* Top visual */}
      <div
        className="relative flex items-center justify-center overflow-hidden p-10"
        style={{ background: `linear-gradient(135deg, ${cat.lightAccent}, ${cat.accent}22)` }}
      >
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.15) 28px,rgba(0,0,0,0.15) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(0,0,0,0.15) 28px,rgba(0,0,0,0.15) 29px)",
          }}
        />
        <span
          className="select-none text-8xl transition-transform duration-500 group-hover:scale-110"
          style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.1))" }}
        >
          {cat.emoji}
        </span>
        {/* Accent bar bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: cat.accent }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl transition group-hover:scale-105"
            style={{ background: cat.lightAccent, color: cat.accent }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: cat.lightAccent, color: cat.accent }}
          >
            {cat.count}
          </span>
        </div>

        <h3
          className="mb-2 text-xl font-black tracking-tight text-neutral-900"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {cat.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-7 text-neutral-500">{cat.text}</p>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {cat.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold"
              style={{ borderColor: `${cat.accent}40`, color: cat.accent }}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/products/${cat.slug}`}
          className="group/link inline-flex items-center gap-2 text-sm font-bold transition"
          style={{ color: cat.accent }}
        >
          Open category
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

function ProductCard({ product }: { product: typeof featured[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      {/* Badge */}
      {product.badge && (
        <div
          className="absolute right-4 top-4 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow"
          style={{ background: product.accent }}
        >
          {product.badge}
        </div>
      )}

      {/* Visual */}
      <div
        className="flex h-44 items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${product.accent}15, ${product.accent}30)` }}
      >
        <span
          className="select-none text-7xl transition-transform duration-500 group-hover:scale-110"
          style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.12))" }}
        >
          {product.emoji}
        </span>
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: product.accent }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <span
          className="mb-2 block text-[10px] font-bold uppercase tracking-widest"
          style={{ color: product.accent }}
        >
          {product.category}
        </span>
        <h3
          className="mb-2 text-lg font-black leading-snug text-neutral-900"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {product.name}
        </h3>
        <p className="mb-4 flex-1 text-xs leading-6 text-neutral-500">{product.desc}</p>

        {/* Crop tags + rating */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-1.5">
            {product.crops.map((c) => (
              <span
                key={c}
                className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-500"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} />
            <span className="text-[10px] text-neutral-400">({product.reviews})</span>
          </div>
        </div>

        <Link
          href="/contact"
          className="group/link inline-flex items-center gap-2 text-xs font-bold transition"
          style={{ color: product.accent }}
        >
          Ask about this product
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  return (
    <main className="bg-[#f5f0e2] text-neutral-900">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071410 0%, #0d2b1a 45%, #122b1a 100%)" }}
      >
        {/* BG mesh */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald-900/30 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-yellow-800/10 blur-[100px]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pgrid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#7ec94a" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pgrid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          >
            {/* Left */}
            <div>
              <motion.nav variants={fadeUp} className="mb-6 flex items-center gap-2 text-xs text-emerald-700">
                <Link href="/" className="transition hover:text-emerald-400">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="font-semibold text-emerald-400">Products</span>
              </motion.nav>

              <motion.div variants={fadeUp} className="mb-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <Package className="h-3.5 w-3.5" />
                  Product Catalogue
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mb-5 text-5xl font-black leading-[0.93] tracking-tight text-white md:text-[4.5rem]"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Find the right<br />
                <span className="text-emerald-400">solution area</span><br />
                before the product.
              </motion.h1>

              <motion.p variants={fadeUp} className="mb-8 max-w-md text-base leading-7 text-white/55">
                Start with category logic and crop context. Guided discovery that makes product selection make sense — not a random inventory dump.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-[#7ec94a] px-6 py-3.5 text-sm font-bold text-[#0d2b1a] shadow-[0_0_24px_rgba(126,201,74,0.3)] transition hover:bg-[#9adf60]"
                >
                  Ask an Agronomist <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/ai-advisory"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/12"
                >
                  Try AI Advisory
                </Link>
              </motion.div>
            </div>

            {/* Right — category quick nav */}
            <motion.div variants={fadeUp}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Categories
                  </div>
                  <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[10px] font-bold text-white/40">
                    213 products
                  </span>
                </div>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products/${cat.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:border-white/15 hover:bg-white/10"
                    >
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg"
                        style={{ background: `${cat.accent}25` }}
                      >
                        {cat.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white/85 group-hover:text-white">{cat.title}</div>
                        <div className="text-[10px] text-white/35">{cat.count}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/20 transition group-hover:translate-x-0.5 group-hover:text-white/50" />
                    </Link>
                  ))}
                </div>

                {/* Helper CTA */}
                <div className="mt-4 rounded-2xl border border-emerald-700/30 bg-emerald-500/8 p-4">
                  <div className="mb-1 flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5" /> Not sure where to start?
                  </div>
                  <p className="mb-3 text-[11px] leading-5 text-white/40">Use our AI Advisory to find products by crop and symptom.</p>
                  <Link href="/ai-advisory" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 transition hover:text-emerald-300">
                    Try AI Advisory <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <motion.p variants={fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
              — Browse Categories
            </motion.p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <motion.h2
                variants={fadeUp}
                className="text-4xl font-black leading-tight tracking-tight text-neutral-900 md:text-5xl"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Start from the right<br />product family
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-bold text-neutral-600 transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  Need help choosing? <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          >
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} cat={cat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <motion.p variants={fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
              — Featured Products
            </motion.p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <motion.h2
                variants={fadeUp}
                className="text-4xl font-black leading-tight tracking-tight text-neutral-900 md:text-5xl"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Trusted inputs across<br />Sri Lanka's farms
              </motion.h2>
              <motion.p variants={fadeUp} className="max-w-xs text-sm leading-7 text-neutral-500 md:text-right">
                Farmer-rated products with verified use across multiple crop types and regions.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {featured.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCT PILLARS ──────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-12"
          >
            <motion.p variants={fadeUp} className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
              — How We Organise Products
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-black leading-tight tracking-tight text-neutral-900 md:text-5xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Structured for decisions,<br />not just browsing
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-5 md:grid-cols-3"
          >
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  whileHover={{ y: -5, transition: { duration: 0.22 } }}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
                >
                  {/* Number */}
                  <div className="mb-6 font-mono text-[11px] font-bold uppercase tracking-widest text-neutral-300">
                    0{i + 1}
                  </div>

                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:scale-105"
                    style={{ background: p.lightAccent, color: p.accent }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3
                    className="mb-3 text-2xl font-black text-neutral-900"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-7 text-neutral-500">{p.desc}</p>

                  {/* Hover accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: p.accent }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="pb-16 pt-0">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="overflow-hidden rounded-3xl"
            style={{ background: "linear-gradient(135deg, #0d2b1a 0%, #1e5c35 100%)" }}
          >
            <div className="grid items-center gap-8 p-8 md:grid-cols-[1.3fr_auto] md:p-12">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Ready to order?
                </div>
                <h2
                  className="mb-3 text-3xl font-black leading-tight text-white md:text-4xl"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Not sure which product fits<br />your crop and problem?
                </h2>
                <p className="max-w-lg text-sm leading-7 text-white/55">
                  Our agronomists can guide you to the right solution. Describe your crop situation and we'll recommend the best product path.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/ai-advisory"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-emerald-500 px-7 py-4 text-sm font-bold text-white shadow-[0_0_24px_rgba(126,201,74,0.3)] transition hover:bg-emerald-400"
                >
                  Try AI Advisory
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-7 py-4 text-sm font-bold text-white/80 transition hover:border-white/30 hover:bg-white/15"
                >
                  Contact an Agronomist
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
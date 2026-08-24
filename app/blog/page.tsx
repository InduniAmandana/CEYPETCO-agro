"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Search,
  Leaf,
  Clock,
  TrendingUp,
  ChevronRight,
  Rss,
  Tag,
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

const categories = ["All", "Crop Health", "Nutrition", "Protection", "Plantation", "Vegetables", "Bio Solutions"];

const articles = [
  {
    title: "How to identify early leaf damage before yield drops",
    excerpt: "Recognize the earliest warning signs of leaf stress before a field problem becomes expensive. Most farmers act too late — here's how to get ahead of it.",
    category: "Crop Health",
    readTime: "6 min",
    date: "Mar 4, 2026",
    featured: true,
    emoji: "🌿",
    accent: "#2d7a4f",
    href: "/blog/leaf-damage-guide",
  },
  {
    title: "Choosing the right input strategy for vegetable farming",
    excerpt: "A practical way to think about input selection based on growth stage and crop objective — without overspending.",
    category: "Input Strategy",
    readTime: "5 min",
    date: "Feb 20, 2026",
    featured: false,
    emoji: "🥬",
    accent: "#7ec94a",
    href: "/blog/input-strategy-vegetables",
  },
  {
    title: "Smarter disease prevention for plantation crops",
    excerpt: "Prevention is a system. This shows how to reduce risk before symptoms escalate into full crop loss.",
    category: "Protection",
    readTime: "7 min",
    date: "Feb 12, 2026",
    featured: false,
    emoji: "🌳",
    accent: "#e8c547",
    href: "/blog/disease-prevention-plantation",
  },
  {
    title: "When nutrient deficiency signs are misleading",
    excerpt: "Not every yellow leaf means the same problem. Diagnose accurately before recommending any inputs.",
    category: "Nutrition",
    readTime: "4 min",
    date: "Jan 28, 2026",
    featured: false,
    emoji: "⚗️",
    accent: "#5bb8f5",
    href: "/blog/nutrient-deficiency-signs",
  },
  {
    title: "How to structure a seasonal crop protection plan",
    excerpt: "Move from reactive spraying to smarter, season-aware planning that reduces costs and improves results.",
    category: "Protection",
    readTime: "8 min",
    date: "Jan 15, 2026",
    featured: false,
    emoji: "📅",
    accent: "#f4845f",
    href: "/blog/seasonal-protection-plan",
  },
  {
    title: "Why advisory content builds more trust than pure promotion",
    excerpt: "Education is not decoration. It is one of the strongest trust signals an agro brand can invest in.",
    category: "Digital Strategy",
    readTime: "3 min",
    date: "Jan 6, 2026",
    featured: false,
    emoji: "💡",
    accent: "#9b8de8",
    href: "/blog/advisory-builds-trust",
  },
];

const trending = articles.slice(0, 3);

// ─── Components ───────────────────────────────────────────────────────────────

function FeaturedCard({ article }: { article: typeof articles[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group relative col-span-2 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
    >
      {/* Image area */}
      <div
        className="relative flex h-64 items-end overflow-hidden p-6"
        style={{ background: `linear-gradient(135deg, ${article.accent}22, ${article.accent}44)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-[9rem] opacity-10 select-none">
          {article.emoji}
        </div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(255,255,255,0.06) 40px,rgba(255,255,255,0.06) 41px)",
          }}
        />
        {/* Featured badge */}
        <div
          className="relative z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
          style={{ background: article.accent }}
        >
          <TrendingUp className="h-3 w-3" />
          Featured Article
        </div>
      </div>

      {/* Body */}
      <div className="p-7">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: `${article.accent}15`, color: article.accent }}
          >
            <Tag className="h-2.5 w-2.5" />
            {article.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Clock className="h-3 w-3" /> {article.readTime} read
          </span>
          <span className="text-xs text-neutral-400">{article.date}</span>
        </div>
        <h2 className="mb-3 text-2xl font-black leading-snug tracking-tight text-neutral-900 md:text-3xl" style={{ fontFamily: "'Georgia', serif" }}>
          {article.title}
        </h2>
        <p className="mb-5 text-sm leading-7 text-neutral-500">{article.excerpt}</p>
        <Link
          href={article.href}
          className="group/link inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-2.5 text-sm font-bold text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
        >
          Read article
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
    >
      {/* Visual */}
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${article.accent}15, ${article.accent}30)` }}
      >
        <div className="text-7xl opacity-25 select-none transition-transform duration-500 group-hover:scale-110">
          {article.emoji}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: article.accent, opacity: 0.7 }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: `${article.accent}15`, color: article.accent }}
          >
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-neutral-400">
            <Clock className="h-2.5 w-2.5" /> {article.readTime}
          </span>
          <span className="ml-auto text-[11px] text-neutral-400">{article.date}</span>
        </div>

        <h2 className="mb-2.5 text-[1.05rem] font-black leading-snug text-neutral-900" style={{ fontFamily: "'Georgia', serif" }}>
          {article.title}
        </h2>
        <p className="mb-4 flex-1 text-xs leading-6 text-neutral-500">{article.excerpt}</p>

        <Link
          href={article.href}
          className="group/link mt-auto inline-flex items-center gap-1.5 text-xs font-bold transition"
          style={{ color: article.accent }}
        >
          Read article
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const [featuredArticle, ...restArticles] = filtered;

  return (
    <main className="bg-[#f5f0e2] text-neutral-900">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-neutral-200"
        style={{ background: "linear-gradient(135deg, #0d2b1a 0%, #1a3d28 50%, #0f3320 100%)" }}
      >
        {/* Background texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#7ec94a" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10"
          style={{ background: "radial-gradient(ellipse at 80% 30%, #7ec94a, transparent 70%)" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          >
            {/* Left */}
            <div>
              <motion.nav variants={fadeUp} className="mb-6 flex items-center gap-2 text-xs text-emerald-700">
                <Link href="/" className="transition hover:text-emerald-400">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="font-semibold text-emerald-400">Blog</span>
              </motion.nav>

              <motion.div variants={fadeUp} className="mb-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <BookOpen className="h-3.5 w-3.5" />
                  Crop Knowledge & Advisory
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mb-5 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-[4.5rem]"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Education that<br />
                <span className="text-emerald-400">builds trust,</span><br />
                not just traffic.
              </motion.h1>

              <motion.p variants={fadeUp} className="mb-8 max-w-md text-base leading-7 text-white/55">
                A serious agriculture brand teaches, guides, and explains. Articles built around real crop decisions — not filler content.
              </motion.p>

              {/* Search */}
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm focus-within:border-emerald-500/50">
                  <Search className="h-4 w-4 flex-shrink-0 text-white/30" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, crop issues, or advisory topics…"
                    className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-white/30 hover:text-white/60 transition"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="mt-8 flex gap-6 border-t border-white/10 pt-6">
                {[
                  { num: `${articles.length}`, label: "Articles" },
                  { num: "6", label: "Topics" },
                  { num: "Weekly", label: "Updates" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-black text-emerald-400" style={{ fontFamily: "'Georgia', serif" }}>{s.num}</div>
                    <div className="text-[11px] uppercase tracking-wider text-white/35">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — trending sidebar */}
            <motion.div variants={fadeUp} className="hidden lg:block">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Trending Now
                </div>
                <div className="space-y-4">
                  {trending.map((a, i) => (
                    <Link
                      key={a.title}
                      href={a.href}
                      className="group flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition hover:border-emerald-700/40 hover:bg-white/10"
                    >
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl"
                        style={{ background: `${a.accent}25` }}
                      >
                        {a.emoji}
                      </div>
                      <div>
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: a.accent }}>
                          {a.category}
                        </div>
                        <div className="text-sm font-semibold leading-snug text-white/80 group-hover:text-white line-clamp-2">
                          {a.title}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-[10px] text-white/30">
                          <Clock className="h-2.5 w-2.5" /> {a.readTime}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────────── */}
      <div className="sticky top-[72px] z-40 border-b border-neutral-200 bg-[#f5f0e2]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
              <Tag className="h-3 w-3" /> Filter
            </span>
            <div className="h-4 w-px bg-neutral-200 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  activeCategory === cat
                    ? "bg-[#0d2b1a] text-[#e8c547]"
                    : "border border-neutral-200 bg-white text-neutral-600 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARTICLES GRID ────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <div className="mb-4 text-5xl">🔍</div>
              <h3 className="mb-2 text-xl font-black text-neutral-700" style={{ fontFamily: "'Georgia', serif" }}>
                No articles found
              </h3>
              <p className="text-sm text-neutral-400">Try adjusting your search or filter.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-4 text-sm font-bold text-emerald-600 underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + searchQuery}
              initial="hidden"
              animate="show"
              variants={stagger}
            >
              {/* Featured + first two in a row */}
              {featuredArticle && (
                <div className="mb-6 grid gap-6 md:grid-cols-3">
                  <FeaturedCard article={featuredArticle} />
                  {restArticles.slice(0, 1).map((a) => (
                    <ArticleCard key={a.title} article={a} />
                  ))}
                </div>
              )}

              {/* Rest in 3-col grid */}
              {restArticles.length > 1 && (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {restArticles.slice(1).map((article) => (
                    <ArticleCard key={article.title} article={article} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="overflow-hidden rounded-3xl border border-neutral-200"
            style={{ background: "linear-gradient(135deg, #0d2b1a 0%, #1e5c35 100%)" }}
          >
            <div className="grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-12">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <Rss className="h-3.5 w-3.5" />
                  Stay Informed
                </div>
                <h2 className="mb-3 text-3xl font-black leading-tight text-white md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
                  Advisory content straight<br />to your inbox
                </h2>
                <p className="max-w-lg text-sm leading-7 text-white/55">
                  Get new crop guides, seasonal warnings, and field advisory articles delivered weekly. No promotions — only knowledge.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <div className="flex overflow-hidden rounded-xl border border-white/15 bg-white/8">
                  <input
                    placeholder="Your email address"
                    className="w-56 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none"
                  />
                  <button className="bg-[#e8c547] px-5 py-3 text-sm font-bold text-neutral-900 transition hover:bg-[#f0d050]">
                    Subscribe
                  </button>
                </div>
                <p className="text-[10px] text-white/25">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="bg-[#f5f0e2] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-neutral-200 bg-white p-8 md:p-12"
          >
            <div className="grid items-center gap-8 md:grid-cols-[1.3fr_auto]">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
                  — Need Direct Help?
                </p>
                <h2 className="mb-3 text-3xl font-black leading-tight tracking-tight text-neutral-900 md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>
                  Advisory content should<br />lead to action
                </h2>
                <p className="max-w-lg text-sm leading-7 text-neutral-500">
                  Reading is useful. But farmers with real field problems need a direct path to consultation or product guidance — not more articles.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-[#0d2b1a] px-7 py-4 text-sm font-bold text-[#e8c547] shadow-lg transition hover:bg-emerald-800"
                >
                  Contact Advisory Team
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-7 py-4 text-sm font-bold text-neutral-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Leaf className="h-4 w-4" />
                  Browse Products
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ScanSearch,
  Sprout,
  BarChart3,
  ShieldCheck,
  Leaf,
  MessageSquare,
  ChevronRight,
  Zap,
  FlaskConical,
  Send,
  Sparkles,
  CircleDot,
  TrendingUp,
  Bug,
  Droplets,
  Wind,
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7 } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const modules = [
  {
    title: "Crop Doctor",
    subtitle: "Symptom Analysis",
    text: "Identify crop stress, nutrient imbalance, or pest and disease patterns from natural language symptom descriptions and growth stage context.",
    icon: ScanSearch,
    accent: "#7ec94a",
    stat: "93% accuracy",
    statLabel: "diagnosis rate",
  },
  {
    title: "Input Recommender",
    subtitle: "Product Guidance",
    text: "Guide users toward suitable product categories based on crop type, growth stage, field objective, and regional conditions.",
    icon: Sprout,
    accent: "#e8c547",
    stat: "300+",
    statLabel: "products mapped",
  },
  {
    title: "Yield Planner",
    subtitle: "Season Planning",
    text: "Turn field conditions into structured action plans across nutrition, protection scheduling, and application timing windows.",
    icon: BarChart3,
    accent: "#5bb8f5",
    stat: "18",
    statLabel: "crop types",
  },
];

const capabilities = [
  { icon: Bug, label: "Pest identification from description" },
  { icon: Droplets, label: "Nutrient deficiency diagnosis" },
  { icon: FlaskConical, label: "Dosage & product matching" },
  { icon: Wind, label: "Weather-based spray timing" },
  { icon: TrendingUp, label: "Yield improvement planning" },
  { icon: ShieldCheck, label: "Resistance management advice" },
];

const demoMessages = [
  {
    role: "user" as const,
    text: "My paddy leaves have orange-brown spots with yellow borders. It started at the tips 3 days ago.",
  },
  {
    role: "ai" as const,
    text: "Based on your description — orange-brown lesions with yellow halos starting at leaf tips — this matches **Bacterial Leaf Blight (BLB)** caused by *Xanthomonas oryzae*. It typically spreads after waterlogging or high humidity.\n\n**Immediate steps:**\n1. Apply Copper Oxychloride 50% WP at 3g/L water\n2. Reduce irrigation for 5–7 days\n3. Improve drainage in waterlogged areas\n\nWould you like a full season treatment schedule or product alternatives?",
  },
];

const trustItems = [
  { icon: ShieldCheck, label: "Diagnosis support", desc: "Help users think through symptoms before reaching for products blindly." },
  { icon: Leaf, label: "Recommendation logic", desc: "Guide visitors toward relevant categories based on need, crop, and context." },
  { icon: MessageSquare, label: "Human follow-up", desc: "AI supports people, not replaces trust. Complex needs escalate to the team." },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function HeroBadge() {
  return (
    <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        AI Advisory System
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-emerald-800/60 to-transparent" />
    </motion.div>
  );
}

function ChatDemo() {
  const [messages, setMessages] = useState(demoMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          role: "ai" as const,
          text: "Based on your follow-up, I recommend Agro Shield Plus (Propiconazole 25% EC) at 1ml/L as a preventive rotation. Apply in the early morning when temperatures are below 30°C. Would you like me to build a full 6-week spray calendar for your plot?",
        },
      ]);
    }, 2200);
  };

  return (
    <motion.div
      variants={slideLeft}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md"
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-bold text-white">Agro AI Assistant</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <CircleDot className="h-3 w-3" />
            Field Advisory Engine · Active
          </div>
        </div>
        <div className="ml-auto flex gap-1.5">
          {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
            <div key={c} className={`h-2.5 w-2.5 rounded-full ${c} opacity-60`} />
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5" style={{ maxHeight: 340 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              </div>
            )}
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "rounded-tr-sm bg-emerald-600/30 text-emerald-50"
                  : "rounded-tl-sm border border-white/10 bg-white/8 text-white/80"
              }`}
              style={{ whiteSpace: "pre-line" }}
            >
              {msg.text.replace(/\*\*(.*?)\*\*/g, "$1")}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/10 bg-white/8 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your crop issue…"
            className="flex-1 bg-transparent text-sm text-white/70 outline-none placeholder:text-white/30"
          />
          <button
            onClick={handleSend}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 transition hover:bg-emerald-400"
          >
            <Send className="h-3.5 w-3.5 text-white" />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-white/25">
          AI advisory for guidance only · Always verify with a qualified agronomist
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIAdvisoryPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-[#0a1f12] text-white">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071410 0%, #0d2b1a 40%, #0f3320 100%)" }}
      >
        {/* Animated background mesh */}
        <motion.div
          style={{ y: heroBgY }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-900/30 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-emerald-700/15 blur-[100px]" />
          <div className="absolute left-[40%] top-[30%] h-[300px] w-[300px] rounded-full bg-yellow-700/10 blur-[80px]" />
          {/* Grid pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7ec94a" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 pt-28 lg:grid-cols-2 lg:py-24 lg:pt-32"
        >
          {/* Left */}
          <motion.div initial="hidden" animate="show" variants={stagger}>
            {/* Breadcrumb */}
            <motion.nav variants={fadeUp} className="mb-6 flex items-center gap-2 text-xs text-emerald-700">
              <Link href="/" className="transition hover:text-emerald-400">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="font-semibold text-emerald-400">AI Advisory</span>
            </motion.nav>

            <HeroBadge />

            <motion.h1
              variants={fadeUp}
              className="max-w-xl text-5xl font-black leading-[0.95] tracking-tight md:text-[4.5rem]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              AI that{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-emerald-400">guides</span>
                <span
                  className="absolute -bottom-1 left-0 h-3 w-full opacity-20"
                  style={{ background: "linear-gradient(90deg, #7ec94a, transparent)" }}
                />
              </span>
              {" "}— not just decorates.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-base leading-7 text-white/55"
            >
              Real AI advisory for farming decisions — diagnosis, product matching,
              and season planning built into every step of the crop journey.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(126,201,74,0.35)] transition hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(126,201,74,0.5)]"
              >
                Request Advisory Support
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
              >
                Explore Products
              </Link>
            </motion.div>

            {/* Capability pills */}
            <motion.div variants={stagger} className="mt-10 flex flex-wrap gap-2">
              {capabilities.map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 backdrop-blur-sm"
                >
                  <Icon className="h-3 w-3 text-emerald-400" />
                  {label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Chat */}
          <div className="w-full">
            <ChatDemo />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-widest text-white/25">Scroll</span>
            <div className="h-8 w-4 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-1.5 w-1 rounded-full bg-emerald-400"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── MODULES ────────────────────────────────────────────── */}
      <section className="bg-[#f5f0e2] py-24 text-neutral-900">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-14"
          >
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-700">
              — Core Modules
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="max-w-xl text-4xl font-black leading-tight tracking-tight md:text-5xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Three ways AI makes farming smarter
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 max-w-lg text-base leading-7 text-neutral-500">
              Not a chatbot gimmick. Each module is designed around a real decision
              farmers face at critical moments in the crop cycle.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm"
                >
                  {/* Accent line top */}
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl transition-all duration-300 group-hover:h-[4px]"
                    style={{ background: mod.accent }}
                  />

                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ background: `${mod.accent}18`, color: mod.accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black" style={{ color: mod.accent, fontFamily: "'Georgia', serif" }}>
                        {mod.stat}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                        {mod.statLabel}
                      </div>
                    </div>
                  </div>

                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    {mod.subtitle}
                  </p>
                  <h3 className="mb-3 text-xl font-black text-neutral-900" style={{ fontFamily: "'Georgia', serif" }}>
                    {mod.title}
                  </h3>
                  <p className="text-sm leading-7 text-neutral-500">{mod.text}</p>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-neutral-400 transition group-hover:text-emerald-600">
                    Learn how it works <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ─────────────────────────────────────── */}
      <section className="bg-white py-24 text-neutral-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left visual */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d2b1a] to-[#1e5c35] p-8">
                {/* Advisory flow diagram */}
                <div className="mb-6 text-xs font-bold uppercase tracking-widest text-emerald-400">Advisory Decision Flow</div>
                <div className="space-y-3">
                  {[
                    { step: "01", label: "Describe symptom or crop stage", color: "bg-emerald-500" },
                    { step: "02", label: "AI diagnoses & cross-references DB", color: "bg-yellow-500" },
                    { step: "03", label: "Matched product recommendations", color: "bg-blue-400" },
                    { step: "04", label: "Structured action plan generated", color: "bg-emerald-400" },
                    { step: "05", label: "Escalate to agronomist if needed", color: "bg-white/40" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3.5"
                    >
                      <div className={`h-2 w-2 rounded-full ${item.color}`} />
                      <span className="font-mono text-[10px] text-white/40">{item.step}</span>
                      <span className="text-sm text-white/70">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Metric cards */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { val: "2.3s", label: "Avg response" },
                    { val: "93%", label: "Accuracy" },
                    { val: "24/7", label: "Available" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                      <div className="text-xl font-black text-emerald-400" style={{ fontFamily: "'Georgia', serif" }}>{m.val}</div>
                      <div className="text-[10px] text-white/40">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right text */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600">
                — Why It Matters
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mb-4 text-4xl font-black leading-tight tracking-tight md:text-5xl"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Better guidance means better outcomes
              </motion.h2>
              <motion.p variants={fadeUp} className="mb-8 text-base leading-7 text-neutral-500">
                A real advisory layer increases trust, improves product discovery,
                and makes the platform feel like a partner — not a catalog. That is the actual point.
              </motion.p>

              <motion.div variants={stagger} className="space-y-3">
                {[
                  "Reduce costly guesswork with crop-aware, data-driven recommendations",
                  "Turn a static product page into a live decision-support experience",
                  "Support diagnosis, product discovery, and trust building in one seamless flow",
                  "Create stronger conversion paths than generic category pages ever could",
                  "Build farmer loyalty through consistent, reliable, year-round guidance",
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    className="group flex items-start gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
                  >
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <Zap className="h-3 w-3 text-emerald-600" />
                    </div>
                    <p className="text-sm leading-6 text-neutral-600 group-hover:text-neutral-800">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST PILLARS ──────────────────────────────────────── */}
      <section className="bg-[#f5f0e2] py-24 text-neutral-900">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-700">
                — Design Principles
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl font-black leading-tight tracking-tight md:text-5xl"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Built around trust,<br />not technology theater
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="max-w-sm text-sm leading-7 text-neutral-500 md:text-right">
              Every AI feature must serve the farmer's actual decision — nothing else justifies its presence on the page.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-neutral-200"
                >
                  <div className="mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700 transition group-hover:bg-emerald-100 group-hover:text-emerald-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-black text-neutral-900" style={{ fontFamily: "'Georgia', serif" }}>
                    {item.label}
                  </h3>
                  <p className="text-sm leading-7 text-neutral-500">{item.desc}</p>

                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28"
        style={{ background: "linear-gradient(135deg, #071410 0%, #0d2b1a 50%, #0f3320 100%)" }}
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-800/20 blur-[120px]" />
          <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/2 rounded-full bg-yellow-800/10 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 rounded-full border border-emerald-700/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                Next Steps
              </div>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-6xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Pair advisory with<br />
              <span className="text-emerald-400">product routes</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mx-auto mb-10 max-w-xl text-base leading-7 text-white/50">
              Don't isolate AI as a concept page. Connect it directly to products and contact.
              The advisory is only as useful as the path it creates toward action.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/8 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/15"
              >
                View Product Categories
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#e8c547] px-7 py-4 text-sm font-bold text-neutral-900 shadow-[0_0_30px_rgba(232,197,71,0.3)] transition hover:bg-[#f0d050] hover:shadow-[0_0_40px_rgba(232,197,71,0.4)]"
              >
                Contact Advisory Team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Trust note */}
            <motion.p variants={fadeUp} className="mt-10 text-xs text-white/20">
              Ceypetco Agro AI Advisory · Backed by 40 years of agronomic expertise · All recommendations verified by certified agronomists
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
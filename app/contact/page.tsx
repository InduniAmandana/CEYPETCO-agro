"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock3, ArrowRight,
  MessageSquare, ShieldCheck, Sprout, ChevronRight,
  CheckCircle, Send, Zap, Users, Star,
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

const slideRight: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Contact Info ──────────────────────────────────────────────────────────────

const contactDetails = [
  { icon: MapPin,  label: "Head Office",    value: "609, Dr. Danister de Silva Mawatha, Colombo 09", href: "https://maps.google.com", emoji: "📍" },
  { icon: Phone,   label: "Phone",          value: "+94 11 729 6100", href: "tel:+94117296100", emoji: "📞" },
  { icon: Mail,    label: "Email",          value: "agro@ceypetco.gov.lk", href: "mailto:agro@ceypetco.gov.lk", emoji: "📧" },
  { icon: Clock3,  label: "Office Hours",   value: "Mon – Fri: 8:00 AM – 5:00 PM\nSat: 8:00 AM – 12:00 PM", href: null, emoji: "🕐" },
];

const cropTypes = ["Paddy", "Vegetables", "Tea", "Rubber", "Coconut", "Banana", "Maize", "Fruits", "Other"];
const serviceTypes = ["Field Advisory", "Product Inquiry", "Nutrition Planning", "Pest / Disease Help", "Mechanization", "Soil Testing", "Other"];

const pillars = [
  { icon: ShieldCheck, emoji: "🛡️", title: "Clear requests", desc: "Ask for crop, issue, and objective so the team can respond with precision — not guesswork.", accent: "#2d7a4f" },
  { icon: Zap,         emoji: "⚡", title: "Faster guidance", desc: "Better form structure reduces back-and-forth and improves advisory quality from day one.", accent: "#e8c547" },
  { icon: MessageSquare, emoji: "💬", title: "Direct path",  desc: "This page leads users to action — not to a dead-end or a vague 'we'll get back to you'.", accent: "#5bb8f5" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", crop: "", location: "", service: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (form.name && form.phone) setSubmitted(true);
  };

  return (
    <main className="bg-[#f5f0e2] text-neutral-900">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-[rgba(139,107,61,0.12)]"
        style={{ background: "linear-gradient(135deg, #071410 0%, #0d2b1a 55%, #0f3320 100%)" }}
      >
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(126,201,74,0.08),transparent_65%)]" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(232,197,71,0.06),transparent_65%)]" />
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="cg" width="52" height="52" patternUnits="userSpaceOnUse"><path d="M 52 0 L 0 0 0 52" fill="none" stroke="#7ec94a" strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#cg)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-24">
          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="mb-8 flex items-center gap-2 text-xs text-emerald-800">
            <Link href="/" className="transition hover:text-emerald-400">Home</Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="font-semibold text-emerald-400">Contact</span>
          </motion.nav>

          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">

            {/* Left */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(126,201,74,0.3)] bg-[rgba(126,201,74,0.1)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                  <MessageSquare className="h-3.5 w-3.5" /> Contact Ceypetco Agro
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp}
                className="mb-5 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-[4.2rem]"
                style={{ fontFamily: "'Georgia', serif" }}>
                Talk to the<br />
                <span className="text-emerald-400">right people,</span><br />
                faster.
              </motion.h1>

              <motion.p variants={fadeUp} className="mb-10 max-w-md text-base font-light leading-7 text-[rgba(255,255,255,0.55)]">
                A contact page should remove friction. Tell us your crop, issue, location, and objective — and our agronomists will respond with precise guidance.
              </motion.p>

              {/* Contact cards */}
              <motion.div variants={stagger} className="space-y-3">
                {contactDetails.map((item) => (
                  <motion.div key={item.label} variants={fadeUp}>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                        className="group flex items-start gap-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-4 backdrop-blur-sm transition hover:border-emerald-700/40 hover:bg-[rgba(255,255,255,0.09)]">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.08)] text-lg">{item.emoji}</div>
                        <div>
                          <div className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-emerald-500">{item.label}</div>
                          <div className="text-sm leading-6 text-[rgba(255,255,255,0.7)] group-hover:text-white transition whitespace-pre-line">{item.value}</div>
                        </div>
                        <ArrowRight className="ml-auto mt-1 h-4 w-4 flex-shrink-0 text-[rgba(255,255,255,0.2)] transition group-hover:text-emerald-400 group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] p-4 backdrop-blur-sm">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.08)] text-lg">{item.emoji}</div>
                        <div>
                          <div className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-emerald-500">{item.label}</div>
                          <div className="text-sm leading-6 text-[rgba(255,255,255,0.7)] whitespace-pre-line">{item.value}</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Social proof */}
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-5 border-t border-[rgba(255,255,255,0.08)] pt-6">
                {[["24hr", "Response time"], ["25K+", "Farmers helped"], ["9", "Provinces served"]].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-xl font-black text-[#e8c547]" style={{ fontFamily: "'Georgia', serif" }}>{val}</div>
                    <div className="text-[10px] uppercase tracking-wider text-[rgba(255,255,255,0.35)]">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}>
              <div className="overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] backdrop-blur-xl">

                {/* Form header */}
                <div className="border-b border-[rgba(255,255,255,0.08)] px-7 py-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">Request a Consultation</div>
                      <div className="mt-0.5 text-sm text-[rgba(255,255,255,0.45)]">Our agronomist will respond within one business day</div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-[rgba(126,201,74,0.3)] bg-[rgba(126,201,74,0.1)] px-3 py-1 text-[10px] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Available
                    </div>
                  </div>
                </div>

                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center px-7 py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(126,201,74,0.15)] text-3xl">✅</div>
                    <h3 className="mb-2 text-xl font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>Inquiry Received</h3>
                    <p className="max-w-xs text-sm leading-6 text-[rgba(255,255,255,0.5)]">
                      Thank you, {form.name}. Our team will reach you at {form.phone} within one business day.
                    </p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", crop: "", location: "", service: "", message: "" }); }}
                      className="mt-6 text-xs font-bold text-emerald-400 underline">Send another inquiry</button>
                  </motion.div>
                ) : (
                  <div className="grid gap-3 p-7">
                    {/* Row 1 */}
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange}
                          className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] px-4 py-3 text-sm text-white outline-none placeholder:text-[rgba(255,255,255,0.25)] focus:border-emerald-500/60 transition"
                          placeholder="Your name" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">Phone *</label>
                        <input name="phone" value={form.phone} onChange={handleChange}
                          className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] px-4 py-3 text-sm text-white outline-none placeholder:text-[rgba(255,255,255,0.25)] focus:border-emerald-500/60 transition"
                          placeholder="+94 XX XXX XXXX" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">Email Address</label>
                      <input name="email" value={form.email} onChange={handleChange}
                        className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] px-4 py-3 text-sm text-white outline-none placeholder:text-[rgba(255,255,255,0.25)] focus:border-emerald-500/60 transition"
                        placeholder="your@email.com" />
                    </div>

                    {/* Row 3 */}
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">Crop Type</label>
                        <select name="crop" value={form.crop} onChange={handleChange}
                          className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#1a3028] px-4 py-3 text-sm text-[rgba(255,255,255,0.75)] outline-none focus:border-emerald-500/60 transition">
                          <option value="">Select crop</option>
                          {cropTypes.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">Service Needed</label>
                        <select name="service" value={form.service} onChange={handleChange}
                          className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[#1a3028] px-4 py-3 text-sm text-[rgba(255,255,255,0.75)] outline-none focus:border-emerald-500/60 transition">
                          <option value="">Select service</option>
                          {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">Farm Location</label>
                      <input name="location" value={form.location} onChange={handleChange}
                        className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] px-4 py-3 text-sm text-white outline-none placeholder:text-[rgba(255,255,255,0.25)] focus:border-emerald-500/60 transition"
                        placeholder="District / Province" />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[rgba(255,255,255,0.4)]">Your Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                        className="resize-none rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] px-4 py-3 text-sm text-white outline-none placeholder:text-[rgba(255,255,255,0.25)] focus:border-emerald-500/60 transition"
                        placeholder="Describe your crop stage, problem, acreage, and what outcome you need…" />
                    </div>

                    {/* Submit */}
                    <button onClick={handleSubmit}
                      className="group mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#7ec94a] py-3.5 text-sm font-bold text-[#0d2b1a] shadow-[0_0_30px_rgba(126,201,74,0.25)] transition hover:bg-[#9adf60] hover:shadow-[0_0_40px_rgba(126,201,74,0.4)]">
                      Send Consultation Request
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-center text-[10px] text-[rgba(255,255,255,0.2)]">
                      All inquiries are handled by certified agronomists · Responses within 1 business day
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-12">
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-700">
              — How It Works
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="text-4xl font-black leading-tight tracking-tight text-[#0d2b1a] md:text-5xl"
              style={{ fontFamily: "'Georgia', serif" }}>
              Why this contact form<br />is built differently
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-3xl border border-[rgba(139,107,61,0.1)] bg-[#f5f0e2] p-8 transition hover:shadow-md">
                  <div className="absolute inset-x-0 top-0 h-[3px] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: p.accent }} />
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-300">0{i + 1}</div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
                    style={{ background: `${p.accent}18` }}>
                    {p.emoji}
                  </div>
                  <h3 className="mb-3 text-xl font-black text-[#0d2b1a]" style={{ fontFamily: "'Georgia', serif" }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-7 text-[#4a5e50]">{p.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── MAP + REGIONAL OFFICES ───────────────────────────── */}
      <section className="bg-[#f5f0e2] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-10">
            <motion.p variants={fadeUp} className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-700">
              — Our Reach
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="text-4xl font-black leading-tight tracking-tight text-[#0d2b1a] md:text-5xl"
              style={{ fontFamily: "'Georgia', serif" }}>
              Coverage across<br />all 9 provinces
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { province: "Western Province", cities: ["Colombo (HQ)", "Gampaha", "Kalutara"], emoji: "🏙️" },
              { province: "Central Province", cities: ["Kandy", "Matale", "Nuwara Eliya"], emoji: "🌿" },
              { province: "Southern Province", cities: ["Galle", "Matara", "Hambantota"], emoji: "🌊" },
              { province: "North Western", cities: ["Kurunegala", "Puttalam"], emoji: "🌾" },
              { province: "North Central", cities: ["Anuradhapura", "Polonnaruwa"], emoji: "🌱" },
              { province: "Uva Province", cities: ["Badulla", "Monaragala"], emoji: "🍵" },
            ].map((office) => (
              <motion.div key={office.province} variants={fadeUp}
                className="group rounded-2xl border border-[rgba(139,107,61,0.1)] bg-white p-6 transition hover:border-emerald-200 hover:shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f0e2] text-xl">{office.emoji}</div>
                  <div className="text-sm font-black text-[#0d2b1a]">{office.province}</div>
                </div>
                <div className="space-y-1.5 pl-1">
                  {office.cities.map(city => (
                    <div key={city} className="flex items-center gap-2 text-xs text-[#5a7060]">
                      <div className="h-1 w-1 rounded-full bg-emerald-400" />
                      {city}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="overflow-hidden rounded-3xl border border-[rgba(139,107,61,0.1)]"
            style={{ background: "linear-gradient(135deg, #0d2b1a 0%, #1a3d28 60%, #0f3320 100%)" }}>
            <div className="grid items-center gap-8 p-8 md:grid-cols-[1.3fr_auto] md:p-12">
              <div>
                <div className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  — Not Ready to Contact?
                </div>
                <h2 className="mb-3 text-3xl font-black leading-tight text-white md:text-4xl"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  Explore products &<br />articles first
                </h2>
                <p className="max-w-lg text-sm leading-7 text-[rgba(255,255,255,0.5)]">
                  Some users need consultation. Others just need the right category or advisory article. Both paths are valid — support them.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/products"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-[#e8c547] px-7 py-4 text-sm font-bold text-[#0d2b1a] transition hover:bg-[#f0d050]">
                  Browse Products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/blog"
                  className="inline-flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.08)] px-7 py-4 text-sm font-semibold text-white/80 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/12">
                  Read Advisory Articles
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
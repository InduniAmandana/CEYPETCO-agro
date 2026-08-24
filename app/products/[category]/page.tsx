import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  FlaskConical,
  Wheat,
  Bug,
  Sprout,
  ChevronRight,
  Zap,
  BookOpen,
  Phone,
} from "lucide-react";

// ─── Category Data ─────────────────────────────────────────────────────────────

const categoryData = {
  "crop-protection": {
    title: "Crop Protection",
    subtitle: "Structured protection solutions for pests, diseases, and weed pressure across different farming contexts.",
    icon: ShieldCheck,
    emoji: "🛡️",
    accent: "#2d7a4f",
    accentLight: "#2d7a4f18",
    accentMid: "#2d7a4f35",
    tagline: "Protect what you've grown",
    stat1: { val: "120+", label: "Products" },
    stat2: { val: "18", label: "Crop types" },
    stat3: { val: "99%", label: "Efficacy rated" },
    highlights: [
      "Present products by field problem, not only by brand name",
      "Use crop type and risk context to guide selection",
      "Support safer usage with clearer advisory structure",
      "Make disease, pest, and weed pathways easier to understand",
    ],
    productTypes: [
      { name: "Insecticides", icon: Bug, desc: "Targeted control for sucking, chewing, and soil-dwelling pests across all crop types.", accent: "#e85d5d" },
      { name: "Fungicides", icon: FlaskConical, desc: "Preventive and curative options for blast, blight, mildew, and plantation diseases.", accent: "#2d7a4f" },
      { name: "Weedicides", icon: Leaf, desc: "Pre- and post-emergence herbicides for paddy, vegetable, and field crop systems.", accent: "#7ec94a" },
      { name: "Protection Programs", icon: ShieldCheck, desc: "Season-long integrated schedules combining multiple active ingredients and timing.", accent: "#e8c547" },
    ],
    useCases: ["Paddy blast control", "Vegetable aphid management", "Tea looper treatment", "Rubber leaf disease prevention"],
  },
  "plant-nutrition": {
    title: "Plant Nutrition",
    subtitle: "Nutrition programs designed around crop growth, vigor, yield support, and resilience.",
    icon: FlaskConical,
    emoji: "⚗️",
    accent: "#5bb8f5",
    accentLight: "#5bb8f518",
    accentMid: "#5bb8f535",
    tagline: "Feed crops at the right moment",
    stat1: { val: "80+", label: "Formulas" },
    stat2: { val: "12", label: "Crop programs" },
    stat3: { val: "30%", label: "Avg yield gain" },
    highlights: [
      "Group products by purpose such as growth, flowering, and recovery",
      "Present nutrition as a program instead of isolated items",
      "Connect products to crop stage and visible field need",
      "Make the value proposition clearer than generic fertilizer listing",
    ],
    productTypes: [
      { name: "Foliar Nutrition", icon: Sprout, desc: "Fast-acting micronutrient sprays for visible deficiency correction and quality improvement.", accent: "#5bb8f5" },
      { name: "Soil Nutrition", icon: Wheat, desc: "Granular and liquid soil-applied nutrients for root-zone feeding and structural health.", accent: "#2d7a4f" },
      { name: "Growth Boosters", icon: Zap, desc: "Biostimulants and hormonal support for flowering, fruit set, and recovery from stress.", accent: "#e8c547" },
      { name: "Stage Support Blends", icon: FlaskConical, desc: "Pre-formulated blends matched to transplanting, vegetative, reproductive, and ripening stages.", accent: "#f4845f" },
    ],
    useCases: ["Paddy tillering nutrition", "Vegetable transplant support", "Banana bunch filling", "Tea flush nutrition"],
  },
  "bio-solutions": {
    title: "Bio Solutions",
    subtitle: "Biological and sustainable input pathways for responsible crop care and long-term soil awareness.",
    icon: Leaf,
    emoji: "🍃",
    accent: "#7ec94a",
    accentLight: "#7ec94a18",
    accentMid: "#7ec94a35",
    tagline: "Farm smarter, leave less behind",
    stat1: { val: "45+", label: "Bio products" },
    stat2: { val: "0", label: "Harmful residues" },
    stat3: { val: "Export", label: "Grade safe" },
    highlights: [
      "Give bio products their own serious commercial identity",
      "Position sustainability with practical use, not vague claims",
      "Connect bio options to farmer trust and field relevance",
      "Avoid hiding these products behind conventional categories",
    ],
    productTypes: [
      { name: "Bio-Insecticides", icon: Bug, desc: "Microbial and botanical pest control with low environmental impact and short re-entry intervals.", accent: "#7ec94a" },
      { name: "Bio-Stimulants", icon: Sprout, desc: "Beneficial microorganism-based root, shoot, and soil health products for natural crop development.", accent: "#2d7a4f" },
      { name: "Eco Support Inputs", icon: Leaf, desc: "Low-residue, eco-certified inputs for export growers needing compliance with international standards.", accent: "#5bb8f5" },
      { name: "Sustainable Programs", icon: ShieldCheck, desc: "Integrated bio programs combining protection and nutrition in a responsible seasonal plan.", accent: "#e8c547" },
    ],
    useCases: ["Export vegetable programs", "Organic paddy cultivation", "Tea export compliance", "School garden programs"],
  },
  "seeds-growth": {
    title: "Seeds & Growth",
    subtitle: "Inputs and support systems focused on crop establishment, development, and early-stage strength.",
    icon: Wheat,
    emoji: "🌾",
    accent: "#e8c547",
    accentLight: "#e8c54718",
    accentMid: "#e8c54735",
    tagline: "Start strong, grow with confidence",
    stat1: { val: "60+", label: "Varieties" },
    stat2: { val: "95%", label: "Germination rate" },
    stat3: { val: "Season", label: "Long support" },
    highlights: [
      "Clarify how products support early-stage field performance",
      "Map products to crop establishment and growth goals",
      "Create easier navigation for farmers starting a season",
      "Reduce confusion between growth support and protection products",
    ],
    productTypes: [
      { name: "Seed Solutions", icon: Wheat, desc: "Seed treatments and priming products that improve germination, vigour, and early seedling defence.", accent: "#e8c547" },
      { name: "Root & Shoot Boosters", icon: Sprout, desc: "Products supporting rapid root system development and early canopy establishment after transplant.", accent: "#7ec94a" },
      { name: "Establishment Care", icon: ShieldCheck, desc: "First-30-day crop programs combining nutrition, protection, and growth support for a strong start.", accent: "#2d7a4f" },
      { name: "Early-Stage Programs", icon: FlaskConical, desc: "Structured seasonal packages for seed-to-establishment phases across major Sri Lankan crops.", accent: "#f4845f" },
    ],
    useCases: ["Paddy nursery management", "Vegetable transplant care", "Maize germination support", "Fruit tree establishment"],
  },
} as const;

type CategoryKey = keyof typeof categoryData;

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = categoryData[category as CategoryKey];
  if (!data) notFound();

  const Icon = data.icon;

  return (
    <main className="bg-[#f5f0e2] text-neutral-900">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #071410 0%, #0d2b1a 55%, #0f3320 100%)` }}
      >
        {/* Glow + grid */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full blur-[120px]"
            style={{ background: `${data.accent}18` }} />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full blur-[100px]"
            style={{ background: `${data.accent}10` }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke={data.accent} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-emerald-700">
            <Link href="/" className="transition hover:text-emerald-400">Home</Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <Link href="/products" className="transition hover:text-emerald-400">Products</Link>
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="font-semibold text-emerald-400">{data.title}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left */}
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{ borderColor: `${data.accent}40`, background: `${data.accent}12`, color: data.accent }}>
                <Icon className="h-3.5 w-3.5" />
                Product Category
              </div>

              <h1
                className="mb-4 text-5xl font-black leading-[0.95] tracking-tight text-white md:text-[4.5rem]"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {data.title}
              </h1>

              <p className="mb-8 max-w-lg text-lg leading-7 text-white/50 font-light">
                {data.subtitle}
              </p>

              <div className="mb-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-bold text-neutral-900 shadow-lg transition hover:shadow-xl"
                  style={{ background: data.accent }}
                >
                  Ask About This Category
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition hover:border-white/30 hover:bg-white/12"
                >
                  ← All Categories
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex gap-6 border-t border-white/10 pt-6">
                {[data.stat1, data.stat2, data.stat3].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black" style={{ color: data.accent, fontFamily: "'Georgia', serif" }}>{s.val}</div>
                    <div className="text-[11px] uppercase tracking-wider text-white/35">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual card */}
            <div className="hidden lg:block">
              <div
                className="overflow-hidden rounded-3xl border p-8"
                style={{ borderColor: `${data.accent}25`, background: `${data.accent}0c` }}
              >
                {/* Big emoji */}
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl text-5xl"
                  style={{ background: `${data.accent}20` }}>
                  {data.emoji}
                </div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: data.accent }}>
                  {data.tagline}
                </div>
                <h3 className="mb-4 text-2xl font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  {data.title} at a glance
                </h3>

                {/* Use cases */}
                <div className="space-y-2">
                  {data.useCases.map((uc) => (
                    <div key={uc} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-2.5">
                      <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: data.accent }} />
                      <span className="text-sm text-white/65">{uc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ───────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: data.accent }}>
                — Category Purpose
              </p>
              <h2
                className="mb-4 text-4xl font-black leading-tight tracking-tight md:text-5xl"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                The page should guide,<br />not just list products
              </h2>
              <p className="mb-8 max-w-xl text-base leading-7 text-neutral-500">
                A strong category page helps users understand purpose, product types,
                and decision logic. Without that, you just have inventory clutter.
              </p>

              <div className="space-y-3">
                {data.highlights.map((item, i) => (
                  <div
                    key={item}
                    className="group flex items-start gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
                  >
                    <div
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                      style={{ background: data.accent }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm leading-6 text-neutral-600 group-hover:text-neutral-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — summary card */}
            <div className="space-y-4">
              {/* Quick info */}
              <div
                className="rounded-3xl border p-7"
                style={{ borderColor: `${data.accent}25`, background: `${data.accent}08` }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
                  style={{ background: `${data.accent}20` }}
                >
                  {data.emoji}
                </div>
                <h3 className="mb-2 text-xl font-black text-neutral-900" style={{ fontFamily: "'Georgia', serif" }}>
                  Category Summary
                </h3>
                <p className="mb-5 text-sm leading-7 text-neutral-500">
                  Use this space for regulatory notes, usage framing, and seasonal guidance on when this category is most relevant in the field.
                </p>
                <div className="grid grid-cols-3 gap-3 border-t border-neutral-200 pt-4">
                  {[data.stat1, data.stat2, data.stat3].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-lg font-black" style={{ color: data.accent, fontFamily: "'Georgia', serif" }}>{s.val}</div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need help CTA mini */}
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">Not sure what you need?</div>
                    <div className="text-xs text-neutral-400">Our advisors can guide selection</div>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="block rounded-xl border border-neutral-200 bg-white py-2.5 text-center text-xs font-bold text-neutral-700 transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  Speak to an Agronomist →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT TYPES ────────────────────────────────────── */}
      <section className="bg-[#f5f0e2] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: data.accent }}>
              — Product Types
            </p>
            <h2
              className="mb-4 max-w-xl text-4xl font-black leading-tight tracking-tight md:text-5xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Organised into useful subgroups
            </h2>
            <p className="max-w-lg text-base leading-7 text-neutral-500">
              Don't force farmers to scan a wall of unrelated items. Each subgroup represents a clear field need.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {data.productTypes.map((type) => {
              const TypeIcon = type.icon;
              return (
                <div
                  key={type.name}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition hover:-translate-y-1.5 hover:shadow-md"
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl"
                    style={{ background: type.accent }}
                  />

                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${type.accent}18`, color: type.accent }}
                  >
                    <TypeIcon className="h-5 w-5" />
                  </div>

                  <h3
                    className="mb-3 text-lg font-black text-neutral-900"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {type.name}
                  </h3>
                  <p className="mb-5 text-sm leading-6 text-neutral-500">{type.desc}</p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition"
                    style={{ color: type.accent }}
                  >
                    Ask for details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ─────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: data.accent }}>
              — Why It Works
            </p>
            <h2
              className="max-w-xl text-4xl font-black leading-tight tracking-tight md:text-5xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              What makes this category<br />worth your attention
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Use case clarity",
                desc: "Help users understand when and why this category is relevant to their farm situation.",
                num: "01",
              },
              {
                icon: FlaskConical,
                title: "Structured browsing",
                desc: "Logical subgroups instead of one oversized catalog block that forces users to scan and guess.",
                num: "02",
              },
              {
                icon: BookOpen,
                title: "Crop relevance",
                desc: "Every product tied back to crop type, growth season, and observable field conditions.",
                num: "03",
              },
            ].map((pillar) => {
              const PIcon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-100 bg-[#f5f0e2] p-8 transition hover:border-neutral-200 hover:shadow-sm"
                >
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-neutral-300">{pillar.num}</div>
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-105"
                    style={{ background: `${data.accent}15`, color: data.accent }}
                  >
                    <PIcon className="h-5 w-5" />
                  </div>
                  <h3
                    className="mb-3 text-xl font-black text-neutral-900"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-7 text-neutral-500">{pillar.desc}</p>
                  {/* Hover accent bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: data.accent }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: "linear-gradient(135deg, #071410 0%, #0d2b1a 50%, #0f3320 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/3 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
            style={{ background: `${data.accent}12` }} />
          <div className="absolute right-1/4 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full blur-[100px]"
            style={{ background: "#e8c54710" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div
            className="overflow-hidden rounded-3xl border p-8 md:p-12"
            style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
          >
            <div className="grid items-center gap-8 md:grid-cols-[1.3fr_auto]">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: data.accent }}>
                  — Next Step
                </p>
                <h2
                  className="mb-4 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Move from category<br />to action
                </h2>
                <p className="max-w-xl text-base leading-7 text-white/50">
                  The page should not stop at explanation. Push users to contact, compare,
                  or browse the next relevant path in their crop journey.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-xl px-7 py-4 text-sm font-bold text-neutral-900 shadow-lg transition hover:shadow-xl"
                  style={{ background: "#e8c547" }}
                >
                  Contact Our Team
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-7 py-4 text-sm font-semibold text-white/80 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/12"
                >
                  ← Back to Categories
                </Link>
                <p className="text-[10px] text-white/20">
                  All products are DOA registered & SLSI certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
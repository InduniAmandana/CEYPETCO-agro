"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Sprout,
  Tractor,
  CheckCircle2,
  Users,
  Target,
  BadgeCheck,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const values = [
  {
    title: "Farmer-first thinking",
    text: "We design around practical field needs, not just product listing and promotional noise.",
    icon: Users,
  },
  {
    title: "Responsible agriculture",
    text: "We support smarter input use, crop protection discipline, and long-term land productivity.",
    icon: ShieldCheck,
  },
  {
    title: "Growth through guidance",
    text: "Real value comes from helping farmers choose correctly, apply correctly, and improve outcomes.",
    icon: Target,
  },
];

const highlights = [
  "Clearer product discovery by category and farming need",
  "Better trust signals through education, support, and advisory positioning",
  "A warmer agriculture-focused visual system instead of generic corporate styling",
  "Improved navigation paths between services, products, and contact",
];

export default function AboutPage() {
  return (
    <main className="bg-[#fbf8ef] text-neutral-900">
      <section className="border-b border-[#ece4cf] bg-[#fbf8ef]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid items-center gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <motion.div variants={fadeUp}>
                <nav className="mb-5 flex items-center gap-2 text-sm text-neutral-500">
                  <Link href="/" className="transition-colors hover:text-emerald-700">
                    Home
                  </Link>
                  <span>/</span>
                  <span className="font-medium text-neutral-700">About</span>
                </nav>
              </motion.div>

              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  <Leaf className="h-4 w-4" />
                  About Ceypetco Agro
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
              >
                Building modern agriculture systems with trust, clarity, and real field value.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-3xl text-base leading-7 text-neutral-600 md:text-lg"
              >
                Ceypetco Agro should not feel like a random product warehouse. It should
                operate like a dependable agriculture partner that helps farmers navigate
                crop protection, plant nutrition, advisory support, and better decisions.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Explore Products <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="lg:col-span-5">
              <div className="overflow-hidden rounded-[2rem] border border-[#ece4cf] bg-white shadow-sm">
                <div className="relative h-[320px] md:h-[420px]">
                  <Image
                    src="/hero-farm.png"
                    alt="Ceypetco Agro field view"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-4">
          {[
            { number: "10+", label: "Solution categories" },
            { number: "100%", label: "Farmer-focused approach" },
            { number: "24/7", label: "Digital brand presence" },
            { number: "1", label: "Integrated agro platform vision" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.75rem] border border-[#ece7d8] bg-[#fcfaf3] p-6 text-center"
            >
              <div className="text-3xl font-bold text-emerald-700">{item.number}</div>
              <div className="mt-2 text-sm text-neutral-600">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f1de] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-5"
            >
              <div className="overflow-hidden rounded-[2rem] border border-[#ece4cf] bg-white shadow-sm">
                <div className="relative h-[320px]">
                  <Image
                    src="/proj.png"
                    alt="Agriculture advisory support"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-7"
            >
              <motion.p variants={fadeUp} className="font-semibold text-emerald-700">
                Our approach
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="mt-2 text-3xl font-bold tracking-tight md:text-5xl"
              >
                Advisory-first design, not product clutter
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-4 leading-7 text-neutral-600">
                The strongest agriculture websites do not overwhelm people with scattered
                inventory blocks. They guide the visitor from need to category to product
                to confidence. That is the direction this brand should take.
              </motion.p>

              <motion.div variants={stagger} className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-[#ece4cf]"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <p className="text-sm leading-6 text-neutral-700">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <p className="font-semibold text-emerald-700">What we stand for</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              The brand needs principles, not just pages
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              If the About page does not explain why the company exists and how it helps,
              it becomes filler. That is useless. This section gives the page a reason to exist.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid gap-5 md:grid-cols-3"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  className="rounded-[2rem] border border-[#ece7d8] bg-[#fcfaf3] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{value.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fbf8ef] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-[#ece4cf] bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e28b] text-neutral-900">
                <Sprout className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">Mission</h3>
              <p className="mt-3 leading-7 text-neutral-600">
                To provide agriculture solutions that help farmers choose confidently,
                use inputs responsibly, and improve field outcomes with stronger support.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#ece4cf] bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">Vision</h3>
              <p className="mt-3 leading-7 text-neutral-600">
                To become a trusted modern agriculture platform where product access,
                advisory clarity, and customer confidence work together.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#ece4cf] bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Tractor className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">Commitment</h3>
              <p className="mt-3 leading-7 text-neutral-600">
                To move beyond static corporate presentation and build a working digital
                experience that supports real agricultural decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1f5c3f] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-10">
            <div>
              <p className="font-semibold text-emerald-200">Next step</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
                Explore the platform properly
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-white/80">
                Don’t leave this page as a dead end. Push users toward products, services,
                and direct contact.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#f2e28b] px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-[#ead973]"
              >
                View Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import Image from "next/image";
import React from "react";
import {
  Leaf,
  Sprout,
  Wheat,
  Flower2,
  Tractor,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";

/* ========= Motion presets (accessible + smooth) ========= */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headContainer: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const headStagger: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.06 } },
};

const wordPop: Variants = {
  hidden: { y: 24, opacity: 0, filter: "blur(6px)" },
  show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};

const badgeFade: Variants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ctaRow: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.5 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.08 * i + 0.1, duration: 0.45, ease: EASE },
  }),
};

/* ========= Tiny UI helpers ========= */
type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "outline" | "ghost";
};
const Button = ({ children, className = "", variant = "primary", ...rest }: ButtonProps) => (
  <button
    className={[
      "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition",
      variant === "primary" &&
        "bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_6px_20px_-8px_rgba(16,185,129,.7)] active:translate-y-[1px]",
      variant === "outline" &&
        "bg-white text-emerald-700 ring-1 ring-emerald-300 hover:bg-emerald-50 active:translate-y-[1px]",
      variant === "ghost" && "text-white/90 hover:text-white",
      className,
    ].join(" ")}
    {...rest}
  >
    {children}
  </button>
);

const Section = ({
  id,
  children,
  className = "",
}: React.PropsWithChildren<{ id?: string; className?: string }>) => (
  <section id={id} className={["py-16 md:py-24", className].join(" ")}>
    <div className="mx-auto max-w-7xl px-4">{children}</div>
  </section>
);

/* ========= Topbar + Navbar ========= */
function TopBar() {
  return (
    <div className="bg-gradient-to-br from-emerald-600 via-green-500 to-lime-400 text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Colombo, Sri Lanka
          </span>
          <span className="hidden md:inline-flex items-center gap-2">
            <Clock className="h-4 w-4" /> Mon–Sat 8:30–16:30
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+94117296100" className="inline-flex items-center gap-2 hover:underline">
            <Phone className="h-4 w-4" /> +94 11 729 6100
          </a>
          <a href="mailto:info@example.com" className="inline-flex items-center gap-2 hover:underline">
            <Mail className="h-4 w-4" /> info@example.com
          </a>
          <div className="hidden sm:flex items-center gap-2">
            <a aria-label="Facebook" href="#" className="p-1.5 rounded-full hover:bg-emerald-600/40">
              <Facebook className="h-4 w-4" />
            </a>
            <a aria-label="Twitter" href="#" className="p-1.5 rounded-full hover:bg-emerald-600/40">
              <Twitter className="h-4 w-4" />
            </a>
            <a aria-label="LinkedIn" href="#" className="p-1.5 rounded-full hover:bg-emerald-600/40">
              <Linkedin className="h-4 w-4" />
            </a>
            <a aria-label="YouTube" href="#" className="p-1.5 rounded-full hover:bg-emerald-600/40">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-emerald-100">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ceypetco Agro"
            width={44}
            height={44}
            className="rounded-full ring-1 ring-emerald-100"
            priority
          />
          <div className="font-bold text-lg">Ceypetco Agro</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
          <a href="#home" className="hover:text-emerald-700">Home</a>
          <a href="#about" className="hover:text-emerald-700">About</a>
          <a href="#services" className="hover:text-emerald-700">Services</a>
          <a href="#categories" className="hover:text-emerald-700">Products</a>
          <a href="#projects" className="hover:text-emerald-700">Projects</a>
          <a href="#blog" className="hover:text-emerald-700">Blog</a>
          <a href="#contact" className="hover:text-emerald-700">Contact</a>
        </nav>
        <Button className="hidden md:inline-flex">Get Quote</Button>
      </div>
    </header>
  );
}

/* ========= Hero (animated) ========= */
function Hero() {
  const { scrollY } = useScroll();
  const yImg = useTransform(scrollY, [0, 300], [0, 60]);
  const yOverlay = useTransform(scrollY, [0, 300], [0, 30]);
  const yCopy = useTransform(scrollY, [0, 300], [0, -10]);

  const features = [
    { icon: <Leaf className="h-5 w-5" />, title: "Organic Inputs", text: "Certified bio fertilizers & bio pesticides" },
    { icon: <Wheat className="h-5 w-5" />, title: "Crop Advisory", text: "Field-tested plans for local conditions" },
    { icon: <Tractor className="h-5 w-5" />, title: "Smart Mechanization", text: "Rental & IoT monitoring options" },
  ];

  const headlineWords = "Government-Backed Agro Solutions for Sri Lankan Farmers".split(" ");

  return (
    <section id="home" className="relative">
      <div className="relative h-[68vh] min-h-[520px] w-full overflow-hidden">
        <motion.div style={{ y: yImg }} className="absolute inset-0">
          <Image src="/hero-farm.png" alt="Green field" fill className="object-cover will-change-transform" priority />
        </motion.div>
        <motion.div style={{ y: yOverlay }} className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
        <motion.div className="absolute inset-0" style={{ y: yCopy }}>
          <div className="mx-auto flex h-full max-w-7xl items-center px-4">
            <motion.div
              className="max-w-2xl text-white"
              variants={headContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p variants={badgeFade} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/30">
                <ShieldCheck className="h-4 w-4" /> ISO 9001 & 14001 certified
              </motion.p>

              <motion.h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight" variants={headStagger}>
                {headlineWords.map((w, i) => (
                  <motion.span key={i} className="inline-block mr-2" variants={wordPop}>
                    {w}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="mt-4 text-white/90"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                viewport={{ once: true }}
              >
                Ceypetco Agrochemicals has supported the farming community for 50+ years with
                quality inputs, advisory, and fair pricing—aligned to national green-agriculture goals.
              </motion.p>

              <motion.div className="mt-6 flex flex-wrap items-center gap-3" variants={ctaRow} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <Button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
                  Explore Services <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute -bottom-10 left-1/2 z-10 w-full -translate-x-1/2 px-4">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="rounded-2xl bg-white ring-1 ring-emerald-100 p-5 shadow-sm"
                custom={i}
                variants={cardIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: "0 10px 30px -12px rgba(16,185,129,.35)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                    {f.icon}
                  </span>
                  <div className="font-semibold">{f.title}</div>
                </div>
                <p className="mt-2 text-sm text-neutral-600">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-14" />

      <motion.div className="bg-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 sm:grid-cols-3">
          {[
            { label: "ISO 9001:2015", desc: "Quality Management System" },
            { label: "ISO 14001:2015", desc: "Environmental Management System" },
            { label: "OHSAS 18001:2007", desc: "Employee Health & Safety" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <div>
                <div className="font-semibold">{c.label}</div>
                <div className="text-xs text-neutral-600">{c.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ========= About (auto image transition + animation) ========= */
function About() {
  const images = ["/proj.png", "/proj1.png", "/proj2.png"];
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // autoplay with pause-on-hover + keyboard control
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [paused, images.length]);

  const go = (n: number) => setIndex((i) => (i + n + images.length) % images.length);

  return (
    <Section id="about">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          viewport={{ once: true }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
          }}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="About images"
        >
          <div className="relative h-[340px] md:h-[520px] w-full overflow-hidden rounded-3xl ring-1 ring-emerald-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={images[index]}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <Image src={images[index]} alt="About" fill className="object-cover" priority />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* floating badge */}
          <motion.div
            className="absolute -bottom-4 -right-4 rounded-2xl bg-white p-4 ring-1 ring-emerald-100 shadow-md"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">10k+ Farmers served</span>
            </div>
          </motion.div>

          {/* dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full ring-1 ring-emerald-200 transition",
                  i === index ? "bg-emerald-600" : "bg-white hover:bg-emerald-100",
                ].join(" ")}
              />
            ))}
          </div>
        </motion.div>

        {/* Copy column */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-emerald-700 font-semibold">About Us</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">We nurture growth with science & stewardship</h2>
          <p className="mt-4 text-neutral-600">
            Ceylon Petroleum Corporation (CPC) established its Agrochemicals Function in 1969. As Sri Lanka’s only
            government-sector agrochemicals organization, we’ve delivered reliable inputs and support for over five
            decades. Guided by national standards and the Registrar of Pesticides, we focus on quality, safety,
            traceability and fair pricing to reduce production costs for key crops such as tea, rubber, paddy and vegetables.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Quality Inputs", icon: <Flower2 className="h-5 w-5" /> },
              { title: "Soil Health Focus", icon: <Sprout className="h-5 w-5" /> },
              { title: "Farmer Training", icon: <Leaf className="h-5 w-5" /> },
              { title: "Fair Pricing", icon: <ShieldCheck className="h-5 w-5" /> },
            ].map((i, idx) => (
              <motion.div
                key={i.title}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx + 0.05 }}
                viewport={{ once: true }}
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  {i.icon}
                </span>
                <div className="font-medium">{i.title}</div>
              </motion.div>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-sm text-neutral-700">
            <li>• Provide high-quality agrochemicals at reasonable prices, island-wide.</li>
            <li>• Combine imports, formulation, repacking, safe storage and distribution.</li>
            <li>• Ongoing guidance to sellers, farmer orgs, and Agrarian Service Centers.</li>
            <li>• Invest in staff HSE practices and modern automated production lines.</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <Button>Our Story</Button>
            <Button variant="outline">Meet the Team</Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ========= Services ========= */
function Services() {
  const items = [
    { title: "Soil Testing", text: "Lab reports & fertilizer plans", icon: <Sprout className="h-5 w-5" /> },
    { title: "Irrigation Setup", text: "Drip & sprinkler systems", icon: <Leaf className="h-5 w-5" /> },
    { title: "Integrated Pest Mgmt", text: "Biological & chemical control", icon: <Wheat className="h-5 w-5" /> },
    { title: "Machinery Rental", text: "Tractors, harvesters & more", icon: <Tractor className="h-5 w-5" /> },
    { title: "Cold Chain", text: "Post-harvest logistics", icon: <Flower2 className="h-5 w-5" /> },
    { title: "Training & Field Days", text: "Hands-on demos", icon: <ShieldCheck className="h-5 w-5" /> },
  ];
  return (
    <Section id="services" className="bg-neutral-50">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-emerald-700 font-semibold">Our Services</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Everything you need from seed to store</h2>
        <p className="mt-3 text-neutral-600">Flexible packages for smallholders and estates, delivered by experts.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, i) => (
          <motion.div key={s.title} className="rounded-2xl bg-white p-6 ring-1 ring-emerald-100 hover:shadow-md" custom={i} variants={cardIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                {s.icon}
              </span>
              <div className="font-semibold">{s.title}</div>
            </div>
            <p className="mt-2 text-sm text-neutral-600">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ========= Product Categories ========= */
function ProductCategories() {
  const cats = ["Insecticides", "Weedicides", "Fungicides", "Bio-Insecticides"];
  return (
    <Section id="categories">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-emerald-700 font-semibold">Product Categories</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Trusted portfolio for Sri Lankan crops</h2>
        <p className="mt-3 text-neutral-600">We supply core agrochemical categories with farmer-centric pricing and availability.</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map((c, i) => (
          <motion.div key={c} className="rounded-2xl bg-white p-6 ring-1 ring-emerald-100 hover:shadow-md" custom={i} variants={cardIn} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                <Leaf className="h-5 w-5" />
              </span>
              <div className="font-semibold">{c}</div>
            </div>
            <p className="mt-2 text-sm text-neutral-600">High-quality, registered products suited to local conditions.</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ========= Products Table ========= */
function ProductsTable() {
  const data = [
    { cat: "Insecticides", name: "Profenophos 50% EC" },
    { cat: "Insecticides", name: "B.P.M.C. 50% EC" },
    { cat: "Insecticides", name: "Fipronil 0.3% G" },
    { cat: "Insecticides", name: "Fipronil 50g/l SC" },
    { cat: "Insecticides", name: "Imidacloprid 200g/l SC" },
    { cat: "Weedicides", name: "Diuron 80% WP" },
    { cat: "Weedicides", name: "Pretilachlor 30% EC" },
    { cat: "Weedicides", name: "Glyphosate 36% SL", badge: "Restricted" },
    { cat: "Fungicides", name: "Tebuconazole 25% EW" },
    { cat: "Fungicides", name: "Mancozeb 80% WP" },
    { cat: "Fungicides", name: "Captan 50% WP" },
    { cat: "Fungicides", name: "Sulphur 80% WG" },
    { cat: "Bio-Insecticides", name: "Flipper" },
  ];

  return (
    <Section id="products" className="bg-neutral-50">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-emerald-700 font-semibold">Products</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Available portfolio</h2>
        <p className="mt-3 text-neutral-600">Availability subject to regulations and seasonal demand. Contact us for current stock and guidance.</p>
      </div>

      <motion.div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-emerald-100 bg-white" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
        <table className="min-w-full text-sm">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-neutral-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-neutral-700">Product</th>
              <th className="px-4 py-3 text-left font-semibold text-neutral-700">Notes</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i} className="border-t border-emerald-100">
                <td className="px-4 py-3">{r.cat}</td>
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">
                  {r.badge ? (
                    <span className="text-xs rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 ring-1 ring-amber-200">
                      {r.badge}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <p className="mt-4 text-sm text-neutral-600">
        As a government institution, Ceypetco Agro plays a price-stabilizing role in the agrochemicals market.
        Distribution of certain products (e.g., Glyphosate) follows regulatory restrictions and guidance.
      </p>
    </Section>
  );
}

/* ========= Flipper Highlight ========= */
function FlipperHighlight() {
  return (
    <Section id="flipper">
      <motion.div className="rounded-3xl bg-white ring-1 ring-emerald-100 p-8 md:p-10 grid gap-8 md:grid-cols-2" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }}>
        <div>
          <p className="text-emerald-700 font-semibold">Bio-Pesticide</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Flipper — World-Class Bio-Insecticide</h2>
          <p className="mt-3 text-neutral-600">
            In line with Sri Lanka’s green-agriculture direction, Ceypetco Agro introduced the bio-pesticide{" "}
            <strong>Flipper</strong>, supporting sustainable pest management with reduced residues.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/api/flipper" className="inline-flex">
              <Button>Download Leaflet</Button>
            </a>
            <Button variant="outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Ask an Agronomist
            </Button>
          </div>
        </div>
        <div className="relative">
          <Image src="/produ.png" alt="Flipper Bio-Pesticide" width={720} height={520} className="rounded-3xl object-cover ring-1 ring-emerald-100" />
        </div>
      </motion.div>
    </Section>
  );
}

/* ========= Projects ========= */
function Projects() {
  const items = [
    { title: "Tea Smallholder Program", img: "/proj.png" },
    { title: "Paddy Yield Boost", img: "/proj1.png" },
    { title: "Vegetable Cluster", img: "/proj2.png" },
    { title: "Coconut Rehab", img: "/proj-coconut.jpg" },
    { title: "Maize Contract Farming", img: "/proj-maize.jpg" },
    { title: "Spices Value Chain", img: "/proj-spice.jpg" },
  ];
  return (
    <Section id="projects">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-emerald-700 font-semibold">Projects</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Recent field work & partner programs</h2>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <motion.div
            key={p.title}
            className="group rounded-2xl overflow-hidden ring-1 ring-emerald-100 bg-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.05 }}
            viewport={{ once: true }}
          >
            <div className="relative h-56">
              <Image src={p.img} alt={p.title} fill className="object-cover transition group-hover:scale-105" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="font-semibold">{p.title}</div>
              <Button variant="outline" className="rounded-full px-4 py-1.5 text-xs">View</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ========= Blog ========= */
function Blog() {
  const posts = [
    { title: "Soil organic matter 101", img: "/blog-soil.jpg", date: "Aug 12, 2025" },
    { title: "IPM for paddy pests", img: "/blog-ipm.jpg", date: "Aug 02, 2025" },
    { title: "Efficient micro-irrigation", img: "/blog-irrigation.jpg", date: "Jul 21, 2025" },
  ];
  return (
    <Section id="blog" className="bg-neutral-50">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-emerald-700 font-semibold">From the blog</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Latest insights & agronomy tips</h2>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((b, i) => (
          <motion.article key={b.title} className="rounded-2xl overflow-hidden bg-white ring-1 ring-emerald-100" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }} viewport={{ once: true }}>
            <div className="relative h-48">
              <Image src={b.img} alt={b.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <div className="text-xs text-neutral-500">{b.date}</div>
              <h3 className="mt-1 font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">Practical guidance you can apply this season to raise yields responsibly.</p>
              <Button variant="outline" className="mt-4">Read More</Button>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ========= Contact ========= */
function Contact() {
  return (
    <Section id="contact">
      <motion.div className="rounded-3xl bg-white ring-1 ring-emerald-100 p-8 md:p-10 grid gap-8 md:grid-cols-2" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }}>
        <div>
          <p className="text-emerald-700 font-semibold">Contact Us</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Let’s grow together</h2>
          <p className="mt-3 text-neutral-600">Ask for farm visits, input quotes, or technical training. Our team will respond within one business day.</p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /> 609, Dr. Danister de Silva Mawatha, Colombo 09</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5" /> +94 11 729 6100</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5" /> info@example.com</li>
          </ul>
        </div>
        <form className="grid gap-4">
          <input className="rounded-xl px-4 py-3 ring-1 ring-emerald-100 outline-none focus:ring-emerald-300" placeholder="Full name" />
          <div className="grid sm:grid-cols-2 gap-4">
            <input className="rounded-xl px-4 py-3 ring-1 ring-emerald-100 outline-none focus:ring-emerald-300" placeholder="Email" />
            <input className="rounded-xl px-4 py-3 ring-1 ring-emerald-100 outline-none focus:ring-emerald-300" placeholder="Phone" />
          </div>
          <textarea rows={4} className="rounded-xl px-4 py-3 ring-1 ring-emerald-100 outline-none focus:ring-emerald-300" placeholder="Message" />
          <Button>Send Message</Button>
        </form>
      </motion.div>
    </Section>
  );
}

/* ========= Footer ========= */
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-emerald-600 via-green-500 to-lime-400 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items中心 gap-3">
            <Image src="/logo.png" alt="Ceypetco Agro" width={40} height={40} className="rounded-full ring-1 ring-white/30" />
            <div className="font-semibold">Ceypetco Agro</div>
          </div>
          <p className="mt-3 text-white/80 text-sm">Sustainable inputs and advisory for higher, cleaner yields.</p>
        </div>
        <div>
          <h4 className="font-semibold">Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#categories" className="hover:underline">Products</a></li>
            <li><a href="#projects" className="hover:underline">Projects</a></li>
            <li><a href="#blog" className="hover:underline">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li>FAQ</li><li>Privacy</li><li>Terms</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Newsletter</h4>
          <div className="mt-3 flex gap-2">
            <input className="w-full rounded-full px-4 py-2 text-sm text-neutral-900 outline-none" placeholder="Your email" />
            <Button variant="ghost" className="bg-white/15 hover:bg-white/25">Join</Button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Ceypetco Agro. All rights reserved.
      </div>
    </footer>
  );
}

/* ========= Page ========= */
export default function Page() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <TopBar />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <ProductCategories />
      <ProductsTable />
      <FlipperHighlight />
      <Projects />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

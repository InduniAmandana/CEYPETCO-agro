import Link from "next/link";

export default function SolutionsPage() {
  const items = [
    "Soil & nutrition programs",
    "Pest & disease response",
    "Mechanization support",
    "Field advisory",
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <p className="font-semibold text-emerald-700">Solutions</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
        Systems built around field decisions
      </h1>
      <p className="mt-6 max-w-3xl text-neutral-600 leading-7">
        Good solution pages explain outcomes and workflows, not just categories.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-3xl border border-emerald-100 bg-white p-6">
            <h2 className="text-xl font-semibold">{item}</h2>
            <p className="mt-3 text-neutral-600 leading-7">
              Structured support tailored to crop stage, field condition, and farmer objective.
            </p>
          </div>
        ))}
      </div>

      <Link href="/" className="mt-10 inline-block text-sm font-semibold text-emerald-700">
        ← Back to home
      </Link>
    </main>
  );
}
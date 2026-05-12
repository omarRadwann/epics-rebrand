import Link from "next/link";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { ProductCard } from "../_components/ProductCard";
import { Strikethrough } from "../_components/Strikethrough";
import { productsByCategory } from "@/lib/catalog";

export const metadata = {
  title: "Gluten-Free · Epics",
  description: "Bread, baking mixes, cereal, brownies. For coeliac kitchens that want to behave like every other kitchen.",
};

export default function GlutenFreePage() {
  const items = productsByCategory("gluten-free");
  // Sort so the hero pair is European Baking Mix and Brownies
  const hero = items.filter((p) => ["european-baking-mix", "brownies-mix"].includes(p.slug));
  const rest = items.filter((p) => !["european-baking-mix", "brownies-mix"].includes(p.slug));

  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      {/* Editorial intro */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-20 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <nav aria-label="Breadcrumb">
              <p className="specimen-lot opacity-60">
                <Link href="/" className="hover:underline">SHOP</Link> /{" "}
                <span className="text-[rgb(var(--ink-black))]">GLUTEN-FREE</span>
              </p>
            </nav>
            <h1 className="font-serif-display text-[72px] leading-[1.02] tracking-[-0.025em] mt-6">
              Gluten-Free.
            </h1>
            <div className="mt-6">
              <Strikethrough variant="wheat" size={80} label />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 flex flex-col justify-between">
            <p className="font-serif-display italic text-[28px] leading-[1.25] tracking-[-0.005em] text-[rgb(var(--ink-black))] max-w-[640px]">
              For coeliac kitchens that want to behave like every other kitchen. Bread that scores. Brownies that fudge.
              Cereal that doesn&rsquo;t require an explanation at breakfast.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-x-6 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-6">
              <FilterStat code="01" label="Specimens" value={`${items.length}`} />
              <FilterStat code="02" label="Certification" value="ISO 22000" />
              <FilterStat code="03" label="Origin" value="6 October" />
            </dl>
          </div>
        </div>
      </section>

      {/* Filter bar — designed, not chip-soup */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="specimen-lot opacity-60">FILTER · F-01</p>
          <FilterLink active label="All" />
          <FilterLink label="Bread & flatbread" />
          <FilterLink label="Baking mixes" />
          <FilterLink label="Cereal" />
          <FilterLink label="Sweet bakes" />
          <FilterLink label="Pantry staples" />
          <span className="ml-auto specimen-lot opacity-60">SORT · BY LOT NUMBER</span>
        </div>
      </section>

      {/* Hero pair (2-up large tiles) */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-16 grid grid-cols-12 gap-6">
          {hero.map((p) => (
            <div key={p.slug} className="col-span-12 md:col-span-6">
              <ProductCard product={p} variant="hero" />
            </div>
          ))}
        </div>
      </section>

      {/* Rest grid — 4-up */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-16">
          <p className="specimen-lot mb-6">CONTINUED · LOT GROUP 22-12 / 22-15</p>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none p-0">
            {rest.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} variant="grid" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FilterStat({ code, label, value }: { code: string; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="specimen-lot opacity-60">{code} · {label.toUpperCase()}</dt>
      <dd className="font-serif-display text-[24px] leading-[1.1] tracking-[-0.005em]">{value}</dd>
    </div>
  );
}

function FilterLink({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`font-sans-text text-[14px] py-1.5 border-b ${
        active
          ? "border-[rgb(var(--ink-black))] text-[rgb(var(--ink-black))]"
          : "border-transparent text-[rgb(var(--charcoal-sub))] hover:text-[rgb(var(--ink-black))] hover:border-[rgb(var(--ink-black))]"
      } transition-colors`}
    >
      {label}
    </button>
  );
}

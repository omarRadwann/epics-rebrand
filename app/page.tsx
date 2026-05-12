import Link from "next/link";
import { Nav } from "./_components/Nav";
import { Footer } from "./_components/Footer";
import Image from "next/image";
import { Strikethrough } from "./_components/Strikethrough";
import { ProductCard } from "./_components/ProductCard";
import { products, recipes } from "@/lib/catalog";

const featuredProduct = products.find((p) => p.slug === "euro")!;
const featuredRecipe = recipes.find((r) => r.slug === "european-loaf")!;

export default function Home() {
  const popular = ["flat", "brownies", "soft", "basbousa", "cocoa-powder", "multi-grain"]
    .map((s) => products.find((p) => p.slug === s)!)
    .filter(Boolean);

  return (
    <main id="main" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav />

      {/* ============================================================ */}
      {/* HERO — asymmetric specimen, NOT a centered gradient.         */}
      {/* ============================================================ */}
      <section
        aria-labelledby="hero-headline"
        className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-20 pb-24 grid grid-cols-12 gap-x-8 gap-y-12">
          {/* Headline column */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="specimen-lot mb-8">
                ISSUE NO. 26 · 0001 · EST. 6 OCTOBER · ISO 22000:2018
              </p>
              <h1
                id="hero-headline"
                className="font-serif-display text-[64px] sm:text-[88px] lg:text-[104px] leading-[1.02] tracking-[-0.025em] text-[rgb(var(--ink-black))]"
              >
                Bread that
                <br />
                doesn&rsquo;t
                <br />
                <span className="italic">apologise.</span>
              </h1>
              <p className="font-sans-text text-[18px] leading-[1.5] mt-10 max-w-[480px] text-[rgb(var(--charcoal-sub))]">
                Wheat-free, sugar-free, PKU-safe — engineered in 6th of October, certified to ISO 22000 and ISO 9001,
                catalogued like a museum specimen.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12">
              <Link
                href="#pantry"
                className="inline-flex items-center gap-3 bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] px-6 py-4 specimen-spec hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))] transition-colors"
              >
                Browse the Pantry
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#manifesto"
                className="font-sans-text text-[15px] underline underline-offset-[6px] decoration-[0.5px] hover:decoration-[1.5px]"
              >
                Read the manifesto
              </Link>
            </div>
          </div>

          {/* Specimen card column */}
          <div className="col-span-12 lg:col-span-5 lg:pl-8">
            <article
              aria-label="Featured specimen"
              className="bg-[rgb(var(--linen-mid)/0.45)] aspect-[3/4] flex flex-col justify-between p-8 relative overflow-hidden"
            >
              <header className="flex items-start justify-between relative z-10">
                <div>
                  <p className="specimen-lot">FEATURED · {featuredProduct.loafNumber.toUpperCase()}</p>
                  <p className="specimen-lot mt-1 opacity-60">LOT {featuredProduct.lot}</p>
                </div>
                <Strikethrough variant="wheat" size={48} />
              </header>

              {/* Real product photo — Epics catalogue */}
              <div className="absolute inset-0 flex items-center justify-center px-12 py-20 pointer-events-none">
                <Image
                  src={featuredProduct.imageUrl}
                  alt={`${featuredProduct.name} package`}
                  width={600}
                  height={750}
                  unoptimized
                  priority
                  className="object-contain max-w-[78%] max-h-[78%] mix-blend-multiply"
                />
              </div>

              <footer className="flex items-baseline justify-between relative z-10">
                <span className="specimen-spec">{featuredProduct.priceEgp ?? "—"} EGP</span>
                <Link href={`/products/${featuredProduct.slug}`} className="specimen-spec underline underline-offset-4 decoration-[0.5px]">
                  SPECIMEN →
                </Link>
              </footer>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MANIFESTO — the 60-word anchoring document, ruled in.         */}
      {/* ============================================================ */}
      <section
        id="manifesto"
        aria-labelledby="manifesto-title"
        className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <p className="specimen-lot">M-01 · MANIFESTO</p>
            <h2 id="manifesto-title" className="font-serif-display text-[32px] leading-[36px] tracking-[-0.01em] mt-2">
              On the record.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <blockquote className="font-serif-display italic text-[28px] sm:text-[36px] leading-[1.25] tracking-[-0.01em] text-[rgb(var(--ink-black))]">
              We bake food for bodies that don&rsquo;t negotiate. Wheat-free, sugar-free, PKU-safe — engineered in 6th of
              October, certified to ISO 22000 and ISO 9001, catalogued like a museum specimen. Every loaf carries a lot
              number. Every recipe carries a real measure. We don&rsquo;t romanticise our limits; we publish them.
              Welcome to the pantry of people who read the label.
            </blockquote>
            <p className="specimen-lot mt-6 opacity-60">
              — EPICS, FIRST PRINTED MMXXVI · 6TH OF OCTOBER CITY
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CATEGORY GATEWAY — three typographic tiles, not three icons.  */}
      {/* ============================================================ */}
      <section
        id="pantry"
        aria-labelledby="categories-title"
        className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <header className="flex flex-wrap items-baseline justify-between gap-4 mb-12">
            <div>
              <p className="specimen-lot">C-01 · THE PANTRY</p>
              <h2 id="categories-title" className="font-serif-display text-[48px] leading-[1.05] tracking-[-0.015em] mt-2">
                Three shelves.
              </h2>
            </div>
            <p className="font-sans-text text-[15px] max-w-md text-[rgb(var(--charcoal-sub))]">
              Each shelf serves a different body. Each body deserves the same gravity. We don&rsquo;t hide the third.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgb(var(--ink-black)/0.6)]">
            <CategoryTile
              code="01"
              monogram="wheat"
              title="Gluten-Free"
              count={`${products.filter((p) => p.category === "gluten-free").length} specimens`}
              summary="Bread, baking mixes, cereal, brownies. For coeliac kitchens that want to behave like every other kitchen."
              accent="saffron"
              href="/gluten-free"
            />
            <CategoryTile
              code="02"
              monogram="sugar"
              title="Sugar-Free"
              count={`${products.filter((p) => p.category === "sugar-free").length} specimens`}
              summary="Cake mix, whipping cream, ice cream. For diabetic households who still want birthdays."
              accent="saffron"
              href="/sugar-free"
            />
            <CategoryTile
              code="03"
              monogram="protein"
              title="Crystal · PKU"
              count={`${products.filter((p) => p.category === "pku").length} specimens`}
              summary="Low-protein, phenylalanine-measured. Endorsed sub-brand for families who count milligrams."
              accent="pomegranate"
              href="/pku"
              endorsed
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MOST POPULAR — horizontal rail of specimen cards.             */}
      {/* ============================================================ */}
      <section
        aria-labelledby="popular-title"
        className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      >
        <div className="mx-auto max-w-[1440px] pl-6 sm:pl-12 lg:pl-24 py-24">
          <header className="flex items-end justify-between pr-6 sm:pr-12 lg:pr-24 mb-10">
            <div>
              <p className="specimen-lot">P-01 · LAST QUARTER&rsquo;S LEADERS</p>
              <h2 id="popular-title" className="font-serif-display text-[40px] leading-[1.05] tracking-[-0.015em] mt-2">
                Selling fastest, by lot.
              </h2>
            </div>
            <Link href="/shop" className="font-sans-text text-[14px] underline underline-offset-4 decoration-[0.5px] hidden md:inline">
              Full catalogue →
            </Link>
          </header>

          <ol className="no-scrollbar flex gap-6 overflow-x-auto pr-6 sm:pr-12 lg:pr-24 pb-2 list-none p-0">
            {popular.map((p) => (
              <li key={p.slug} className="shrink-0 w-[260px]">
                <ProductCard product={p} variant="rail" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CERTIFICATIONS — typographic, not a logo strip.               */}
      {/* ============================================================ */}
      <section
        aria-labelledby="certs-title"
        className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20">
          <header className="mb-10">
            <p className="specimen-lot">X-01 · CERTIFICATIONS</p>
            <h2 id="certs-title" className="font-serif-display text-[32px] leading-[1.1] tracking-[-0.01em] mt-2 max-w-2xl">
              We publish the certifications the way a watchmaker publishes its movement.
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-8">
            <CertSpec
              code="X-01-A"
              standard="ISO 22000:2018"
              name="Food safety management"
              body="Issuing body: Bureau Veritas Egypt"
              certNo="EG-FS-2024-1138"
              renewed="Renewed Sep 2024"
            />
            <CertSpec
              code="X-01-B"
              standard="ISO 9001:2015"
              name="Quality management"
              body="Issuing body: Bureau Veritas Egypt"
              certNo="EG-QM-2024-0944"
              renewed="Renewed Sep 2024"
            />
            <CertSpec
              code="X-01-C"
              standard="HALAL"
              name="Halal certification"
              body="Egyptian Halal Authority"
              certNo="EHA-2025-0061"
              renewed="Renewed Jan 2025"
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RECIPE FEATURE — editorial, magazine spread.                  */}
      {/* ============================================================ */}
      <section
        aria-labelledby="recipe-title"
        className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <article
              aria-label="Recipe specimen"
              className="bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] aspect-[4/5] flex flex-col justify-between p-8"
            >
              <p className="specimen-lot text-[rgb(var(--cream-paper)/0.5)]">{featuredRecipe.code} · METHOD</p>
              <div className="text-center">
                <p className="specimen-spec text-[rgb(var(--cream-paper)/0.6)] mb-3">FROM {featuredProduct.loafNumber.toUpperCase()}</p>
                <div className="font-serif-display text-[44px] leading-[46px] tracking-[-0.015em]">
                  {featuredRecipe.title}
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="specimen-spec text-[rgb(var(--cream-paper)/0.7)]">{featuredRecipe.time}</span>
                <span className="specimen-spec text-[rgb(var(--cream-paper)/0.7)]">{featuredRecipe.yield}</span>
              </div>
            </article>
          </div>

          <div className="col-span-12 md:col-span-7 md:pl-8 flex flex-col justify-between">
            <div>
              <p className="specimen-lot">R-01 · LATEST FROM THE METHOD BOOK</p>
              <h2
                id="recipe-title"
                className="font-serif-display text-[44px] leading-[1.1] tracking-[-0.015em] mt-3"
              >
                The European Loaf.
              </h2>
              <p className="font-sans-text text-[17px] leading-[1.55] mt-6 max-w-[480px] text-[rgb(var(--charcoal-sub))]">
                Crackling crust, open crumb, scorable. The bread our manifesto refers to. Real measures, real timings,
                printed in milligrams where it matters.
              </p>
            </div>

            <ol className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 list-none p-0">
              <RecipeStat code="01" label="Time" value="1h 50m" />
              <RecipeStat code="02" label="Yield" value="800g loaf" />
              <RecipeStat code="03" label="Oven" value="200°C · convection" />
              <RecipeStat code="04" label="Method" value="Kneaded · Proved · Scored" />
            </ol>

            <Link
              href={`/recipes/${featuredRecipe.slug}`}
              className="self-start mt-10 specimen-spec underline underline-offset-[6px] decoration-[0.5px] hover:decoration-[1.5px]"
            >
              READ THE FULL METHOD →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* JOURNAL TEASER — manifesto extension                          */}
      {/* ============================================================ */}
      <section
        aria-labelledby="journal-title"
        className="bg-[rgb(var(--linen-mid)/0.35)] border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 md:col-span-4">
            <p className="specimen-lot">J-01 · THE JOURNAL</p>
            <h2 id="journal-title" className="font-serif-display text-[40px] leading-[1.1] tracking-[-0.015em] mt-2">
              We don&rsquo;t
              <br />
              romanticise
              <br />
              our limits.
            </h2>
            <Link href="/journal" className="inline-block mt-8 specimen-spec underline underline-offset-[6px] decoration-[0.5px]">
              READ THE JOURNAL →
            </Link>
          </div>

          <ol className="col-span-12 md:col-span-8 md:col-start-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 list-none p-0">
            {[
              { code: "J-001", slug: "phenylalanine-in-milligrams", title: "Why we list phenylalanine in milligrams.", date: "12 OCT 2026", read: "4 min" },
              { code: "J-002", slug: "the-lot-number-is-the-warranty", title: "The lot number is the warranty.", date: "28 SEP 2026", read: "3 min" },
              { code: "J-003", slug: "what-the-iso-audit-involves", title: "What the ISO audit actually involves.", date: "14 SEP 2026", read: "6 min" },
              { code: "J-004", slug: "no-wooden-boards", title: "On not photographing food on wooden boards.", date: "01 SEP 2026", read: "2 min" },
            ].map((item) => (
              <li key={item.code}>
                <article>
                  <p className="specimen-lot">{item.code}</p>
                  <h3 className="font-serif-display text-[24px] leading-[1.2] tracking-[-0.01em] mt-2">
                    <Link href={`/journal/${item.slug}`} className="hover:text-[rgb(var(--saffron))] transition-colors no-underline">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="specimen-lot mt-4 opacity-60">
                    {item.date} · {item.read} READ
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* =================== Page-local subcomponents =================== */

function CategoryTile({
  code, monogram, title, count, summary, accent, href, endorsed,
}: {
  code: string;
  monogram: "wheat" | "sugar" | "protein";
  title: string;
  count: string;
  summary: string;
  accent: "saffron" | "pomegranate";
  href: string;
  endorsed?: boolean;
}) {
  const accentColor =
    accent === "saffron" ? "rgb(var(--saffron))" : "rgb(var(--pomegranate))";

  return (
    <Link
      href={href}
      className="group bg-[rgb(var(--cream-paper))] p-8 lg:p-10 flex flex-col justify-between min-h-[420px] no-underline hover:bg-[rgb(var(--linen-mid)/0.4)] transition-colors"
    >
      <header className="flex items-start justify-between text-[rgb(var(--ink-black))]">
        <div>
          <p className="specimen-lot opacity-60">CATEGORY · {code}</p>
          {endorsed && (
            <p className="specimen-lot mt-1" style={{ color: accentColor }}>
              ENDORSED · CRYSTAL BY EPICS
            </p>
          )}
        </div>
        <Strikethrough variant={monogram} size={56} />
      </header>

      <div className="text-[rgb(var(--ink-black))]">
        <h3
          className="font-serif-display text-[44px] leading-[1.05] tracking-[-0.015em]"
          style={endorsed ? { color: accentColor } : undefined}
        >
          {title}
        </h3>
        <p className="specimen-spec mt-2 opacity-60">{count.toUpperCase()}</p>
        <p className="font-sans-text text-[15px] leading-[1.5] mt-5 text-[rgb(var(--charcoal-sub))]">
          {summary}
        </p>
        <p
          className="specimen-spec mt-8 transition-colors group-hover:underline underline-offset-[6px] decoration-[0.5px]"
          style={{ color: accentColor }}
        >
          BROWSE SHELF →
        </p>
      </div>
    </Link>
  );
}

function CertSpec({
  code, standard, name, body, certNo, renewed,
}: {
  code: string;
  standard: string;
  name: string;
  body: string;
  certNo: string;
  renewed: string;
}) {
  return (
    <article className="flex flex-col gap-2">
      <p className="specimen-lot opacity-60">{code}</p>
      <h3 className="font-serif-display text-[32px] leading-[1.05] tracking-[-0.015em] text-[rgb(var(--ink-black))]">
        {standard}
      </h3>
      <p className="font-sans-text text-[15px] text-[rgb(var(--ink-black))]">{name}</p>
      <dl className="mt-3 grid grid-cols-[80px_1fr] gap-x-3 gap-y-1.5 text-[rgb(var(--charcoal-sub))]">
        <dt className="specimen-lot opacity-60">BODY</dt>
        <dd className="font-sans-text text-[13px]">{body}</dd>
        <dt className="specimen-lot opacity-60">CERT NO.</dt>
        <dd className="specimen-lot">{certNo}</dd>
        <dt className="specimen-lot opacity-60">RENEWED</dt>
        <dd className="font-sans-text text-[13px]">{renewed}</dd>
      </dl>
    </article>
  );
}

function RecipeStat({ code, label, value }: { code: string; label: string; value: string }) {
  return (
    <li className="flex flex-col gap-1 border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] pt-3">
      <span className="specimen-lot opacity-60">
        {code} · {label.toUpperCase()}
      </span>
      <span className="font-serif-display text-[20px] leading-[1.2] tracking-[-0.005em]">{value}</span>
    </li>
  );
}

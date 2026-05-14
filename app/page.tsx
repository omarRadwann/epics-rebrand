import Link from "next/link";
import { products } from "@/lib/catalog";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Marquee } from "@/components/motion/Marquee";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tilt } from "@/components/motion/Tilt";
import { Scramble } from "@/components/motion/Scramble";
import { CountUp } from "@/components/motion/CountUp";
import { Strikethrough } from "@/components/ui/Strikethrough";
import { HomeCanvas } from "@/components/three/HomeCanvas";

const certifications = [
  "ISO 22000 : 2018",
  "ISO 9001 : 2015",
  "HALAL · EHA-2025-0061",
  "EST. 6 OCTOBER · GIZA",
  "ISSUE 26 · LOT 0001",
  "SHIPS WITHIN 24h ANYWHERE IN EGYPT",
  "30 SPECIMENS ACROSS THREE SHELVES",
];

interface StatItem {
  value: number | string;
  label: string;
  detail: string;
  suffix?: string;
  saffron?: boolean;
}
const stats: StatItem[] = [
  { value: 30, label: "Specimens", detail: "Across three shelves" },
  { value: 2018, label: "Established", detail: "In 6th of October City" },
  { value: "ISO", label: "22000:2018", detail: "Bureau Veritas Egypt" },
  { value: 24, label: "Hours", detail: "Delivery anywhere in Egypt", suffix: "h", saffron: true },
];

export default function Home() {
  const popular = products.filter((p) => !p.isWholesale).slice(0, 6);
  const counts = {
    gf: products.filter((p) => p.category === "gluten-free").length,
    sf: products.filter((p) => p.category === "sugar-free").length,
    pku: products.filter((p) => p.category === "pku").length,
  };

  return (
    <>
      <Nav />

      {/* Single R3F canvas, fixed behind DOM. Renders the Vitrine
          (Moon #1) and fades out as the user scrolls past 0.18. */}
      <HomeCanvas />

      <main id="main" className="relative">
        {/* ============================================================
            HERO — Moon #1 (Specimen Vitrine) lives in the fixed canvas
            BEHIND this section. The DOM here is the typographic overlay
            (lot ribbon, headline, intro copy, strikethrough monograms).
            Tall (140vh) so scroll progress 0 → ~0.18 covers the
            condensation + handoff to corridor.
            ============================================================ */}
        <section
          id="hero"
          data-scene="vitrine"
          aria-label="Specimen Pantry"
          className="relative flex min-h-[140vh] flex-col items-start justify-end overflow-hidden px-6 pb-16 pt-24 sm:px-12 sm:pb-24 sm:pt-32 lg:px-24"
        >
          {/* Readability scrim — a paper gradient that lifts the headline
              cleanly off the busy particle field rendered behind it. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[68%] bg-gradient-to-t from-paper via-paper/85 to-transparent"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col items-start">
            {/* lot ribbon */}
            <p className="specimen-lot mb-6 text-ink/65">
              EPICS · N°26 · SPECIMEN PANTRY · MMXXVI
            </p>

            <SplitText
              as="h1"
              text="Bread that doesn't apologise."
              mode="char"
              stagger={0.018}
              className="font-display text-[clamp(3.4rem,9.5vw,9.5rem)] leading-[0.92] tracking-[-0.03em]"
            />

            <p className="mt-8 max-w-xl text-[18px] leading-[1.55] text-ink/85 sm:text-[20px]">
              Wheat-free, sugar-free, PKU-safe baked goods — engineered in 6th of October City,
              catalogued like a museum specimen. Every loaf carries a lot number.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.3}>
                <Link
                  href="/shop"
                  className="specimen-spec inline-flex items-center gap-2 border border-ink bg-ink px-7 py-4 text-paper no-underline transition-colors hover:bg-saffron hover:text-ink"
                >
                  ENTER THE PANTRY <span aria-hidden>→</span>
                </Link>
              </Magnetic>
              <Link
                href="/pku"
                className="specimen-spec underline decoration-[1px] underline-offset-[6px] hover:decoration-2"
              >
                OR JUMP TO CRYSTAL · PKU →
              </Link>
            </div>
          </div>

          {/* corner specimen badges */}
          <div className="pointer-events-none absolute right-6 top-24 z-10 hidden flex-col items-end gap-3 sm:flex sm:right-12 lg:right-24">
            {(["wheat", "sugar", "protein"] as const).map((variant, i) => (
              <Reveal key={variant} delay={i * 0.12} amount={0.1}>
                <div className="text-ink/80">
                  <Strikethrough variant={variant} size={48} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============================================================
            CERTIFICATIONS MARQUEE — under the hero
            ============================================================ */}
        <Marquee speedSeconds={42} background="ink">
          {certifications.map((c, i) => (
            <span
              key={i}
              className="specimen-spec inline-block px-8 py-3 text-paper/85"
            >
              {c}
            </span>
          ))}
        </Marquee>

        {/* ============================================================
            STATS BAND — by the numbers
            ============================================================ */}
        <Reveal as="section" className="bg-ink text-paper">
          <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 sm:py-20 lg:px-24">
            <p className="specimen-lot mb-8 text-paper/60">B-01 · BY THE NUMBERS</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 border-t border-paper/25 pt-5"
                >
                  <p
                    className={`font-display text-[56px] leading-[0.95] tracking-[-0.03em] sm:text-[80px] lg:text-[96px] ${
                      s.saffron ? "text-saffron" : "text-paper"
                    }`}
                  >
                    {typeof s.value === "number" ? (
                      <>
                        <CountUp to={s.value} duration={1600} />
                        {s.suffix}
                      </>
                    ) : (
                      s.value
                    )}
                  </p>
                  <p className="specimen-lot opacity-80">{s.label}</p>
                  <p className="max-w-[180px] text-[14px] leading-[1.45] text-paper/70">
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ============================================================
            MANIFESTO INTRO — split-text headline + the 60-word anchor
            ============================================================ */}
        <Reveal as="section" id="manifesto" data-scene="manifesto" className="relative border-b border-ink/40">
          {/* Soft paper scrim — calms the caustic backdrop behind the
              blockquote so the manifesto type stays the focus. */}
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-paper/45"
            aria-hidden
          />
          <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-12 gap-x-8 px-6 py-24 sm:px-12 lg:px-24">
            <div className="col-span-12 md:col-span-3">
              <p className="specimen-lot">M-01 · MANIFESTO</p>
              <SplitText
                as="h2"
                text="On the record."
                mode="word"
                className="mt-2 font-display text-[32px] leading-[36px] tracking-[-0.01em]"
              />
            </div>
            <blockquote className="col-span-12 mt-6 font-display text-[28px] italic leading-[1.25] tracking-[-0.01em] text-ink md:col-span-8 md:col-start-5 md:mt-0 sm:text-[36px]">
              We bake food for bodies that don&rsquo;t negotiate. Wheat-free, sugar-free,
              PKU-safe — engineered in 6th of October, certified to ISO 22000 and ISO 9001,
              catalogued like a museum specimen. Every loaf carries a lot number. Every recipe
              carries a real measure. We don&rsquo;t romanticise our limits; we publish them.
              Welcome to the pantry of people who read the label.
              <footer className="specimen-lot mt-6 not-italic text-ink/60">
                — EPICS, FIRST PRINTED MMXXVI · 6TH OF OCTOBER CITY
              </footer>
            </blockquote>
          </div>
        </Reveal>

        {/* ============================================================
            GIANT PRODUCT NAME MARQUEE
            ============================================================ */}
        <Marquee speedSeconds={45}>
          {["European Loaf", "Brownies", "Basbousa", "Crystal · PKU", "Multi Grain", "Cocoa P-04", "Vanilla Cake", "Ice Cream — Triple Free"].map((name, i) => (
            <span
              key={i}
              className="inline-block px-10 py-6 font-display text-[clamp(3rem,8vw,7rem)] italic leading-none tracking-[-0.02em]"
            >
              {name} ·
            </span>
          ))}
        </Marquee>

        {/* ============================================================
            CATEGORY GATEWAY — the Moon #2 corridor plays in the canvas
            behind this section. DOM here is typographic-only so the
            3D shelves can carry the visual story. Thin labels float at
            the corners; the tall min-height gives the camera flight
            full scroll-real-estate.
            ============================================================ */}
        <Reveal as="section" data-scene="corridor" className="relative">
          {/* Dark readability scrim — strong at the top and bottom where
              the labels sit, near-clear through the middle so the
              corridor flythrough still reads. Also guarantees the cream
              text never lands on bare paper during a scene handoff. */}
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/75"
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex min-h-[140vh] max-w-[1440px] flex-col justify-between px-6 py-24 sm:px-12 lg:px-24">
            <header className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="specimen-lot text-paper/90">C-01 · THE PANTRY</p>
                <h2 className="mt-2 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.015em] text-paper">
                  Three shelves.
                </h2>
              </div>
              <p className="max-w-md text-[14px] leading-[1.55] text-paper/70">
                Each shelf serves a different body. Each body deserves the same gravity.
                We don&rsquo;t hide the third.
              </p>
            </header>

            {/* Three shelf labels — stretched across the section so each
                aligns roughly with its 3D shelf reveal moment. */}
            <ol className="mt-auto grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3 md:gap-8">
              <ShelfLabel
                code="S-01"
                monogram="wheat"
                title="Gluten-Free"
                count={counts.gf}
                href="/gluten-free"
                accent="saffron"
              />
              <ShelfLabel
                code="S-02"
                monogram="sugar"
                title="Sugar-Free"
                count={counts.sf}
                href="/sugar-free"
                accent="saffron"
              />
              <ShelfLabel
                code="S-03"
                monogram="protein"
                title="Crystal · PKU"
                count={counts.pku}
                href="/pku"
                accent="stamp"
                endorsed
              />
            </ol>
          </div>
        </Reveal>

        {/* ============================================================
            POPULAR RAIL — placeholder for Moon #3 specimen slides
            ============================================================ */}
        <Reveal as="section" className="border-b border-ink/40">
          <div className="mx-auto max-w-[1440px] py-24 pl-6 sm:pl-12 lg:pl-24">
            <header className="mb-10 flex items-end justify-between pr-6 sm:pr-12 lg:pr-24">
              <div>
                <p className="specimen-lot">P-01 · LAST QUARTER&rsquo;S LEADERS</p>
                <h2 className="mt-2 font-display text-[40px] leading-[1.05] tracking-[-0.015em]">
                  Selling fastest, by lot.
                </h2>
              </div>
              <Link
                href="/shop"
                className="specimen-spec hidden underline decoration-[0.5px] underline-offset-4 md:inline"
              >
                FULL CATALOGUE →
              </Link>
            </header>

            <ol className="no-scrollbar flex list-none gap-6 overflow-x-auto p-0 pb-2 pr-6 sm:pr-12 lg:pr-24">
              {popular.map((p) => (
                <li key={p.slug} className="w-[280px] shrink-0">
                  <Tilt className="h-full">
                    <article className="flex h-full flex-col border border-ink/30 bg-paper p-6">
                      <p className="specimen-lot text-ink/60">
                        {p.loafNumber.toUpperCase()} · LOT {p.lot}
                      </p>
                      <Scramble
                        as="h3"
                        text={p.name}
                        className="mt-4 font-display text-[24px] leading-[1.15] tracking-[-0.01em]"
                      />
                      <p className="specimen-spec mt-2 text-ink/55">
                        {p.weight} · ISO {p.iso}
                      </p>
                      <div className="mt-auto flex items-end justify-between pt-6">
                        <span className="font-display text-[28px] leading-none">
                          {p.priceEgp ? `${p.priceEgp}` : "—"}
                          <span className="specimen-lot ml-1 align-baseline">EGP</span>
                        </span>
                        <div className="flex gap-1">
                          {p.freeFrom.map((code) => (
                            <span
                              key={code}
                              className="specimen-lot rounded-sm border border-ink/30 px-1.5 py-0.5"
                            >
                              {code}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Tilt>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* ============================================================
            CERTIFICATIONS — Moon #5 Stamp Room plays in the canvas
            behind this section. Section is transparent and tall so the
            dark 3D stamp room reads as the visual backdrop; the
            typographic certification specs sit at the bottom over the
            3D scene's natural floor area.
            ============================================================ */}
        <Reveal as="section" data-scene="stamps" className="relative text-paper">
          {/* Dark readability scrim — keeps the cream certification specs
              legible over the stamp room and during scene handoffs. */}
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-ink/75 via-ink/30 to-ink/80"
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex min-h-[120vh] max-w-[1440px] flex-col justify-between px-6 py-24 sm:px-12 lg:px-24">
            <header>
              <p className="specimen-lot text-paper/65">X-01 · CERTIFICATIONS</p>
              <h2 className="mt-2 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em]">
                We publish the certifications the way a watchmaker publishes its movement.
              </h2>
            </header>
            {/* Three thin spec columns sit at the bottom of the section,
                leaving the upper viewport for the stamp room canvas. */}
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 border-t border-paper/25 pt-8 md:grid-cols-3">
              <CertSpec
                code="X-01-A"
                standard="ISO 22000:2018"
                name="Food safety management"
                body="Bureau Veritas Egypt"
                certNo="EG-FS-2024-1138"
              />
              <CertSpec
                code="X-01-B"
                standard="ISO 9001:2015"
                name="Quality management"
                body="Bureau Veritas Egypt"
                certNo="EG-QM-2024-0944"
              />
              <CertSpec
                code="X-01-C"
                standard="HALAL"
                name="Halal certification"
                body="Egyptian Halal Authority"
                certNo="EHA-2025-0061"
              />
            </div>
          </div>
        </Reveal>

        {/* ============================================================
            JOURNAL TEASER
            ============================================================ */}
        <Reveal as="section" className="bg-linen-mid/35 border-b border-ink/40">
          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-8 gap-y-12 px-6 py-24 sm:px-12 lg:px-24">
            <div className="col-span-12 md:col-span-4">
              <p className="specimen-lot">J-01 · THE JOURNAL</p>
              <h2 className="mt-2 font-display text-[40px] leading-[1.1] tracking-[-0.015em]">
                We don&rsquo;t<br />romanticise<br />our limits.
              </h2>
              <Link
                href="/journal"
                className="specimen-spec mt-8 inline-block underline decoration-[0.5px] underline-offset-[6px]"
              >
                READ THE JOURNAL →
              </Link>
            </div>
            <ol className="col-span-12 grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 md:col-span-8 md:col-start-5 sm:grid-cols-2">
              {[
                { code: "J-001", slug: "phenylalanine-in-milligrams", title: "Why we list phenylalanine in milligrams.", date: "12 OCT 2026", read: "4 min" },
                { code: "J-002", slug: "the-lot-number-is-the-warranty", title: "The lot number is the warranty.", date: "28 SEP 2026", read: "3 min" },
                { code: "J-003", slug: "what-the-iso-audit-involves", title: "What the ISO audit actually involves.", date: "14 SEP 2026", read: "6 min" },
                { code: "J-004", slug: "no-wooden-boards", title: "On not photographing food on wooden boards.", date: "01 SEP 2026", read: "2 min" },
              ].map((item) => (
                <li key={item.code}>
                  <article>
                    <p className="specimen-lot">{item.code}</p>
                    <h3 className="mt-2 font-display text-[24px] leading-[1.2] tracking-[-0.01em]">
                      <Link
                        href={`/journal/${item.slug}`}
                        className="no-underline transition-colors hover:text-saffron"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="specimen-lot mt-4 text-ink/60">
                      {item.date} · {item.read} READ
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}

/* =================== Page-local subcomponents =================== */

function ShelfLabel({
  code,
  monogram,
  title,
  count,
  href,
  accent,
  endorsed,
}: {
  code: string;
  monogram: "wheat" | "sugar" | "protein";
  title: string;
  count: number;
  href: string;
  accent: "saffron" | "stamp";
  endorsed?: boolean;
}) {
  const accentClass = accent === "saffron" ? "text-saffron" : "text-stamp";
  return (
    <li>
      <Link
        href={href}
        className="group block border-t border-paper/30 pt-4 no-underline transition-colors hover:border-paper"
      >
        <header className="flex items-start justify-between">
          <div>
            <p className={`specimen-lot ${accentClass}`}>{code}</p>
            {endorsed && (
              <p className={`specimen-lot mt-1 text-paper/60`}>
                ENDORSED
              </p>
            )}
          </div>
          <span className="text-paper/85">
            <Strikethrough variant={monogram} size={32} />
          </span>
        </header>
        <h3
          className={`mt-4 font-display text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.015em] ${
            endorsed ? accentClass : "text-paper"
          }`}
        >
          {title}
        </h3>
        <p className="specimen-spec mt-2 text-paper/55">
          {count} SPECIMENS
        </p>
        <p
          className={`specimen-spec mt-6 inline-block underline decoration-[0.5px] underline-offset-[6px] ${accentClass}`}
        >
          BROWSE SHELF →
        </p>
      </Link>
    </li>
  );
}

function CertSpec({
  code,
  standard,
  name,
  body,
  certNo,
}: {
  code: string;
  standard: string;
  name: string;
  body: string;
  certNo: string;
}) {
  return (
    <article className="flex flex-col gap-2">
      <p className="specimen-lot text-paper/60">{code}</p>
      <h3 className="font-display text-[32px] leading-[1.05] tracking-[-0.015em] text-paper">
        {standard}
      </h3>
      <p className="text-[15px] text-paper">{name}</p>
      <dl className="mt-3 grid grid-cols-[80px_1fr] gap-x-3 gap-y-1.5 text-paper/70">
        <dt className="specimen-lot text-paper/60">BODY</dt>
        <dd className="text-[13px]">{body}</dd>
        <dt className="specimen-lot text-paper/60">CERT NO.</dt>
        <dd className="specimen-lot">{certNo}</dd>
      </dl>
    </article>
  );
}

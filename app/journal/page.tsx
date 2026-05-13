import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = {
  title: "The Journal",
  description: "Method notes, ISO audit details, and short essays from the pantry.",
};

const articles = [
  {
    code: "J-001",
    slug: "phenylalanine-in-milligrams",
    title: "Why we list phenylalanine in milligrams.",
    date: "12 OCT 2026",
    read: "4 min",
    excerpt:
      "Per-piece, not per-100g. Why milligrams beat percentages on every PKU label we print.",
  },
  {
    code: "J-002",
    slug: "the-lot-number-is-the-warranty",
    title: "The lot number is the warranty.",
    date: "28 SEP 2026",
    read: "3 min",
    excerpt:
      "Every loaf carries a number that ties back to a flour-bag receipt and an oven temperature log.",
  },
  {
    code: "J-003",
    slug: "what-the-iso-audit-involves",
    title: "What the ISO audit actually involves.",
    date: "14 SEP 2026",
    read: "6 min",
    excerpt:
      "Three days, two auditors, one binder. What Bureau Veritas asks for during an ISO 22000 recertification.",
  },
  {
    code: "J-004",
    slug: "no-wooden-boards",
    title: "On not photographing food on wooden boards.",
    date: "01 SEP 2026",
    read: "2 min",
    excerpt:
      "The most common visual cliché in food photography, and why our cream plinth is non-negotiable.",
  },
];

export default function JournalPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-paper">
        <Reveal as="header" className="border-b border-ink/40">
          <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-24">
            <p className="specimen-lot mb-3 text-ink/60">J-00 · THE JOURNAL</p>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-[-0.025em]">
              We don&rsquo;t romanticise our limits.
            </h1>
          </div>
        </Reveal>

        <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-24">
          <ol className="grid list-none grid-cols-1 gap-x-12 gap-y-16 p-0 md:grid-cols-2">
            {articles.map((a) => (
              <li key={a.code}>
                <article className="border-t border-ink/40 pt-6">
                  <p className="specimen-lot text-ink/60">
                    {a.code} · {a.date} · {a.read} READ
                  </p>
                  <h2 className="mt-3 font-display text-[28px] leading-[1.2] tracking-[-0.015em]">
                    {a.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-[1.55] text-ink/75">
                    {a.excerpt}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

export const metadata = {
  title: "About — Five Movements",
  description:
    "The founding of Epics in five movements: the diagnosis, the first loaf, the audit, the third shelf, and the lot number.",
};

const movements = [
  {
    code: "M-01",
    title: "The Diagnosis",
    body: "A coeliac diagnosis in a country whose entire pantry is wheat. The cost of one decent gluten-free loaf at the time: 90 EGP — for 200 grams, mostly air. The math was the assignment.",
  },
  {
    code: "M-02",
    title: "The First Loaf",
    body: "Eighteen months of starch-blend trials in a converted apartment kitchen. The European loaf — kneadable, provable, scorable — was the third specimen we agreed to ship. The first two we composted.",
  },
  {
    code: "M-03",
    title: "The Audit",
    body: "Bureau Veritas Egypt walked the line in 2022. ISO 22000:2018, ISO 9001:2015. The binder is real. We will show you the binder.",
  },
  {
    code: "M-04",
    title: "The Third Shelf",
    body: "Crystal launched in 2024 — the PKU-safe line. Anxious parents do not need warmth in marketing. They need numbers, in milligrams, on the package.",
  },
  {
    code: "M-05",
    title: "The Lot Number",
    body: "Every loaf carries a number that ties back to a flour-bag receipt and an oven temperature log. The number is the warranty. If your loaf doesn't turn out, photograph the crumb, send it to us with the lot.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-paper">
        <Reveal as="header" className="border-b border-ink/40">
          <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-24">
            <p className="specimen-lot mb-3 text-ink/60">ABOUT · FIVE MOVEMENTS</p>
            <SplitText
              as="h1"
              text="Engineered in 6 October."
              mode="word"
              className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-[-0.025em]"
            />
          </div>
        </Reveal>

        <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-24">
          <ol className="list-none p-0">
            {movements.map((m, i) => (
              <Reveal as="li" key={m.code} amount={0.25}>
                <article className="grid grid-cols-12 gap-x-8 border-t border-ink/40 py-12 first:border-t-0 first:pt-0">
                  <p className="specimen-lot col-span-12 text-ink/60 md:col-span-2">
                    {m.code}
                  </p>
                  <h2 className="col-span-12 mt-2 font-display text-[40px] leading-[1.05] tracking-[-0.015em] md:col-span-4 md:mt-0">
                    {m.title}
                  </h2>
                  <p className="col-span-12 mt-4 max-w-[60ch] text-[16px] leading-[1.6] text-ink/80 md:col-span-6 md:mt-0">
                    {m.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </ol>
        </section>
      </main>
      <Footer />
    </>
  );
}

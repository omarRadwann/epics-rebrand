/**
 * CategoryShelf — shared layout for the gluten-free / sugar-free
 * category landing pages. Renders the shelf header + a SpecimenSlide
 * grid filtered to one Product["category"].
 */
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SpecimenSlide } from "@/components/ui/SpecimenSlide";
import { Strikethrough } from "@/components/ui/Strikethrough";
import { productsByCategory, type Product } from "@/lib/catalog";

interface Props {
  category: Product["category"];
  code: string;
  monogram: "wheat" | "sugar" | "protein";
  title: string;
  headline: string;
  blurb: string;
}

export function CategoryShelf({
  category,
  code,
  monogram,
  title,
  headline,
  blurb,
}: Props) {
  const items = productsByCategory(category).filter((p) => !p.isWholesale);

  return (
    <>
      <Nav />
      <main id="main" className="bg-paper">
        <Reveal as="header" className="border-b border-ink/15">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-8 px-6 py-24 sm:px-12 lg:px-24">
            <div>
              <p className="specimen-lot mb-3 text-ink/60">
                {code} · {title.toUpperCase()} · {items.length} SPECIMENS
              </p>
              <SplitText
                as="h1"
                text={headline}
                mode="word"
                className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.025em]"
              />
              <p className="mt-6 max-w-xl text-[18px] leading-[1.55] text-ink/75">
                {blurb}
              </p>
            </div>
            <div className="text-ink/80">
              <Strikethrough variant={monogram} size={88} label />
            </div>
          </div>
        </Reveal>

        <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <SpecimenSlide key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

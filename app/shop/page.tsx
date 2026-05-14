import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { consumerProducts, wholesaleProducts } from "@/lib/catalog";
import { SpecimenSlide } from "@/components/ui/SpecimenSlide";

export const metadata = {
  title: "Shop · 30 Specimens",
  description: "The full Epics catalogue — 30 specimens across three shelves.",
};

export default function ShopPage() {
  const products = consumerProducts();
  const wholesale = wholesaleProducts();

  return (
    <>
      <Nav />
      <main id="main" className="bg-paper">
        <Reveal as="header" className="border-b border-ink/40">
          <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 lg:px-24">
            <p className="specimen-lot mb-3 text-ink/60">SHOP · 30 SPECIMENS</p>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.025em]">
              The whole pantry.
            </h1>
            <p className="mt-6 max-w-xl text-[18px] leading-[1.55] text-ink/75">
              {products.length + wholesale.length} specimens, three shelves. Filter by the strikethrough that
              matters to your body — gluten, sugar, protein.
            </p>
          </div>
        </Reveal>

        <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <SpecimenSlide key={p.slug} product={p} />
            ))}
          </div>

          {wholesale.length > 0 && (
            <div className="mt-20">
              <p className="specimen-lot mb-6 text-ink/60">
                WHOLESALE · CONTACT SALES@EPICS-GROUP.COM
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {wholesale.map((p) => (
                  <article
                    key={p.slug}
                    className="border border-dashed border-ink/30 bg-paper p-6 opacity-80"
                  >
                    <p className="specimen-lot text-ink/60">
                      {p.loafNumber.toUpperCase()} · {p.weight.toUpperCase()}
                    </p>
                    <h2 className="mt-3 font-display text-[22px] leading-[1.2]">
                      {p.name}
                    </h2>
                    <p className="mt-3 text-[14px] text-ink/70">{p.description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

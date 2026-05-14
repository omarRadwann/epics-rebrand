import Link from "next/link";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { consumerProducts } from "@/lib/catalog";

export const metadata = {
  title: "المتجر · ٢٤ عيّنة",
  description: "كتالوج إيبكس الكامل — عيّنات عبر ثلاثة أرفف.",
};

export default function ShopArabic() {
  const products = consumerProducts();

  return (
    <>
      <Nav locale="ar" />
      <main id="main" className="bg-paper">
        <Reveal as="header" className="border-b border-ink/15">
          <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-12 lg:px-24">
            <p className="specimen-lot mb-3 text-ink/60">
              المتجر · {products.length} عيّنة
            </p>
            <SplitText
              as="h1"
              text="البانتري كامله."
              mode="word"
              className="font-display text-[clamp(3rem,8vw,7rem)] leading-[1.1] tracking-[-0.02em]"
            />
            <p className="mt-6 max-w-xl text-[18px] leading-[1.7] text-ink/75">
              {products.length} عيّنة، ثلاثة أرفف. صفِّ حسب الشطب الذي
              يهمّ جسدك — غلوتين، سكر، بروتين.
            </p>
          </div>
        </Reveal>

        <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex flex-col border border-ink/20 bg-paper p-6 no-underline transition-colors hover:border-ink/50"
                data-cursor-hover
              >
                <p className="specimen-lot text-ink/60">
                  {p.loafNumber.toUpperCase()} · LOT {p.lot}
                </p>
                <h2 className="mt-4 font-display text-[22px] leading-[1.3] tracking-[-0.005em]">
                  {p.arabicName}
                </h2>
                <p className="specimen-spec mt-2 text-ink/55">
                  {p.weight} · ISO {p.iso}
                </p>
                <p className="mt-3 line-clamp-3 text-[14px] leading-[1.7] text-ink/70">
                  {p.arabicDescription}
                </p>
                <div className="mt-auto flex items-end justify-between pt-6">
                  <span className="font-display text-[26px] leading-none">
                    {p.priceEgp ?? "—"}
                    <span className="specimen-lot mr-1 align-baseline text-ink/60">
                      جنيه
                    </span>
                  </span>
                  <div className="flex gap-1">
                    {p.freeFrom.map((code) => (
                      <span
                        key={code}
                        className="specimen-lot rounded-sm border border-ink/30 px-1.5 py-0.5"
                        dir="ltr"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  );
}

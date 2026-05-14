import Link from "next/link";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { productsByCategory } from "@/lib/catalog";

export const metadata = {
  title: "كريستال من إيبكس — PKU",
  description:
    "طعام منخفض البروتين، يُقاس بالمليغرام. العلامة الفرعية المعتمدة للعائلات التي تحسب الفينيل ألانين.",
};

export default function PkuArabic() {
  const pkuProducts = productsByCategory("pku");

  return (
    <>
      <Nav locale="ar" />
      <main id="main" className="bg-paper">
        <Reveal as="header" className="border-b border-ink/40 bg-paper">
          <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-24">
            <p className="specimen-lot mb-3 text-stamp/80">
              ج-٠٣ · كريستال من إيبكس — PKU
            </p>
            <SplitText
              as="h1"
              text="كريستال."
              mode="char"
              className="font-display text-[clamp(4rem,12vw,10rem)] italic leading-[1.1] tracking-[-0.02em] text-stamp"
            />
            <p className="mt-6 max-w-xl text-[18px] leading-[1.7] text-ink/75">
              طعام منخفض البروتين، يُقاس بالمليغرام. العلامة الفرعية
              المعتمدة للعائلات التي تتعامل مع مرض الفينيل كيتونوريا.
              مصمَّمة على معيار ISO 22000، معزَّزة بقشور السيلليوم
              للقوام.
            </p>
          </div>
        </Reveal>

        <section className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-24">
          <p className="specimen-lot mb-6 text-ink/60">
            PKU · {pkuProducts.length} عيّنة
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pkuProducts.map((p) => (
              <article
                key={p.slug}
                className="flex flex-col border border-stamp/40 bg-paper p-6"
              >
                <p className="specimen-lot text-stamp/80">
                  {p.loafNumber.toUpperCase()} · LOT {p.lot}
                </p>
                <h2 className="mt-4 font-display text-[22px] leading-[1.3] tracking-[-0.005em]">
                  {p.arabicName}
                </h2>
                <p className="specimen-spec mt-2 text-ink/55">
                  {p.weight} · ISO {p.iso}
                </p>
                <p className="mt-3 line-clamp-4 text-[14px] leading-[1.7] text-ink/70">
                  {p.arabicDescription}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-12 max-w-xl text-[14px] italic leading-[1.7] text-ink/70">
            قيم الفينيل ألانين على الملف التحليلي — اطلب شهادة لكل لوت
            من{" "}
            <Link
              href="mailto:crystal@epics-group.com"
              className="text-stamp underline decoration-stamp/40 underline-offset-2"
            >
              crystal@epics-group.com
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer locale="ar" />
    </>
  );
}

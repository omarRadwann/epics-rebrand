import Link from "next/link";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Marquee } from "@/components/motion/Marquee";
import { Magnetic } from "@/components/motion/Magnetic";
import { Strikethrough } from "@/components/ui/Strikethrough";
import { products } from "@/lib/catalog";

export const metadata = {
  title: "إيبكس · خبز لا يعتذر",
  description:
    "مخبوزات خالية من القمح والسكر، آمنة لمرضى PKU. مُصنَّعة في مدينة السادس من أكتوبر، الجيزة. معتمدة ISO 22000 و ISO 9001.",
};

const certifications = [
  "ISO 22000 : 2018",
  "ISO 9001 : 2015",
  "حلال · EHA-2025-0061",
  "تأسست في السادس من أكتوبر · الجيزة",
  "العدد ٢٦ · لوت ٠٠٠١",
  "توصيل خلال ٢٤ ساعة في كل مصر",
];

export default function HomeArabic() {
  const counts = {
    gf: products.filter((p) => p.category === "gluten-free").length,
    sf: products.filter((p) => p.category === "sugar-free").length,
    pku: products.filter((p) => p.category === "pku").length,
  };

  return (
    <>
      <Nav locale="ar" />

      <main id="main" className="relative">
        {/* Hero — Arabic-first, no canvas behind in Phase 10. The
            corridor + vitrine scenes will be mirror-flipped in Phase 11.
            items-start (NOT items-end): in a dir=rtl column flex the
            cross-axis start is the RIGHT edge, so items-start is what
            mirrors the LTR hero's left-aligned content onto the right.
            items-end pushed the whole hero block to the left. */}
        <section
          aria-label="بانتري العيّنات"
          className="relative flex min-h-[80vh] flex-col items-start justify-end overflow-hidden px-6 pb-16 pt-24 sm:px-12 sm:pb-24 sm:pt-32 lg:px-24"
        >
          <p className="specimen-lot mb-6 text-ink/60">
            إيبكس · العدد ٢٦ · بانتري العيّنات · ٢٠٢٦
          </p>
          <SplitText
            as="h1"
            text="خبز لا يعتذر."
            mode="word"
            className="font-display text-[clamp(3rem,9vw,8rem)] leading-[1.1] tracking-[-0.02em]"
          />
          <p className="mt-8 max-w-xl text-[18px] leading-[1.7] text-ink/75 sm:text-[20px]">
            مخبوزات خالية من القمح والسكر، آمنة لمرضى PKU — مُصنَّعة في
            مدينة السادس من أكتوبر، ومُفهرَسة كعيّنة متحفية. كل رغيف
            يحمل رقم لوت. كل وصفة تحمل قياسًا حقيقيًا.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <Link
                href="/ar/shop"
                className="specimen-spec inline-flex items-center gap-2 border border-ink bg-ink px-7 py-4 text-paper no-underline transition-colors hover:bg-saffron hover:text-ink"
              >
                <span aria-hidden>←</span> ادخل البانتري
              </Link>
            </Magnetic>
            <Link
              href="/ar/pku"
              className="specimen-spec underline decoration-[1px] underline-offset-[6px] hover:decoration-2"
            >
              ← أو انتقل مباشرةً إلى كريستال · PKU
            </Link>
          </div>

          <div className="pointer-events-none absolute left-6 top-24 hidden flex-col items-start gap-3 sm:flex sm:left-12 lg:left-24">
            {(["wheat", "sugar", "protein"] as const).map((variant, i) => (
              <Reveal key={variant} delay={i * 0.12} amount={0.1}>
                <div className="text-ink/80">
                  <Strikethrough variant={variant} size={48} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Certifications marquee */}
        <Marquee speedSeconds={42} background="ink" reverse>
          {certifications.map((c, i) => (
            <span
              key={i}
              className="specimen-spec inline-block px-8 py-3 text-paper/85"
            >
              {c}
            </span>
          ))}
        </Marquee>

        {/* Manifesto */}
        <Reveal as="section" className="border-b border-ink/40">
          <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-8 px-6 py-24 sm:px-12 lg:px-24">
            <div className="col-span-12 md:col-span-3">
              <p className="specimen-lot">م-٠١ · المانيفستو</p>
              <SplitText
                as="h2"
                text="على السجل."
                mode="word"
                className="mt-2 font-display text-[32px] leading-[36px] tracking-[-0.01em]"
              />
            </div>
            <blockquote className="col-span-12 mt-6 font-display text-[28px] italic leading-[1.5] tracking-[-0.01em] text-ink md:col-span-8 md:col-start-5 md:mt-0 sm:text-[36px]">
              نخبز طعامًا لأجساد لا تُساوم. خالٍ من القمح، خالٍ من السكر،
              آمن لمرضى PKU — مُصنَّع في السادس من أكتوبر، معتمد على
              ISO 22000 و ISO 9001، مُفهرَس كعيّنة متحفية. كل رغيف
              يحمل رقم لوت. كل وصفة تحمل قياسًا حقيقيًا. لا نُجمِّل
              قيودنا؛ ننشرها.
              <footer className="specimen-lot mt-6 not-italic text-ink/60">
                — إيبكس · أول إصدار ٢٠٢٦ · السادس من أكتوبر
              </footer>
            </blockquote>
          </div>
        </Reveal>

        {/* Three shelves */}
        <Reveal as="section" className="border-b border-ink/40">
          <div className="mx-auto max-w-[1440px] px-6 py-24 sm:px-12 lg:px-24">
            <header className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="specimen-lot">ج-٠١ · البانتري</p>
                <h2 className="mt-2 font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.05] tracking-[-0.015em]">
                  ثلاثة أرفف.
                </h2>
              </div>
              <p className="max-w-md text-[15px] text-ink/70">
                كل رف يخدم جسدًا مختلفًا. كل جسد يستحق نفس الجدية.
                لا نُخفي الرف الثالث.
              </p>
            </header>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <ShelfCardAr
                code="S-٠١"
                title="بدون غلوتين"
                count={counts.gf}
                href="/ar/shop"
              />
              <ShelfCardAr
                code="S-٠٢"
                title="بدون سكر"
                count={counts.sf}
                href="/ar/shop"
              />
              <ShelfCardAr
                code="S-٠٣"
                title="كريستال · PKU"
                count={counts.pku}
                href="/ar/pku"
                endorsed
              />
            </div>
          </div>
        </Reveal>
      </main>

      <Footer locale="ar" />
    </>
  );
}

function ShelfCardAr({
  code,
  title,
  count,
  href,
  endorsed,
}: {
  code: string;
  title: string;
  count: number;
  href: string;
  endorsed?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group block border border-ink/15 bg-paper p-8 no-underline transition-colors hover:border-ink/40"
    >
      <p className={`specimen-lot ${endorsed ? "text-stamp" : "text-saffron"}`}>
        {code}
      </p>
      <h3
        className={`mt-4 font-display text-[32px] leading-[1.15] tracking-[-0.01em] ${
          endorsed ? "text-stamp" : "text-ink"
        }`}
      >
        {title}
      </h3>
      <p className="specimen-spec mt-2 text-ink/60">{count} عيّنة</p>
      <p
        className={`specimen-spec mt-6 inline-block underline decoration-[0.5px] underline-offset-[6px] ${
          endorsed ? "text-stamp" : "text-saffron"
        }`}
      >
        ← تصفّح الرف
      </p>
    </Link>
  );
}

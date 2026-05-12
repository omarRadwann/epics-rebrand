import Link from "next/link";
import Image from "next/image";
import { Nav } from "../_components/Nav";
import { Footer } from "../_components/Footer";
import { products } from "@/lib/catalog";
import { asset } from "@/lib/asset";

const featured = products.find((p) => p.slug === "euro")!;

/**
 * Arabic-RTL homepage mirror. Specimen Pantry territory, Arabic-first typography.
 * Same structural rhythm as /; every section uses Arabic display/body type.
 *
 * IBM Plex Sans Arabic / Tajawal (Bukra substitute) — never default Noto.
 */
export default function ArHome() {
  const popular = ["flat", "brownies", "soft", "basbousa", "cocoa-powder", "multi-grain"]
    .map((s) => products.find((p) => p.slug === s)!)
    .filter(Boolean);

  return (
    <main id="main" lang="ar" dir="rtl" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav locale="ar" />

      {/* HERO */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-20 pb-24 grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="specimen-lot mb-8 [direction:ltr] text-right">
                ISSUE NO. 26 · 0001 · EST. 6 OCTOBER · ISO 22000:2018
              </p>
              <h1 className="font-arabic font-bold text-[72px] sm:text-[112px] leading-[1.1] tracking-normal">
                عيش
                <br />
                ما <span className="italic" style={{ color: "rgb(var(--ink-black))" }}>يعتذرش.</span>
              </h1>
              <p className="font-arabic text-[20px] leading-[1.7] mt-10 max-w-[520px] text-[rgb(var(--charcoal-sub))]">
                خالي من القمح والسكر، آمن لـ PKU — مُهندَس في مدينة 6 أكتوبر، معتمد ISO 22000 و ISO 9001،
                مُفهرَس كعيّنة متحف.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12">
              <Link
                href="#pantry"
                className="inline-flex items-center gap-3 bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] px-6 py-4 specimen-spec hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))] transition-colors"
              >
                <span aria-hidden>←</span>
                تصفّح المخزن
              </Link>
              <Link href="#manifesto" className="font-arabic text-[16px] underline underline-offset-[6px] decoration-[0.5px]">
                اقرأ البيان
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pr-8">
            <Link
              href={`/products/${featured.slug}`}
              className="group block no-underline focus-visible:outline-none"
            >
              <article className="bg-white aspect-[4/5] flex flex-col relative overflow-hidden shadow-[0_2px_0_rgba(26,24,23,0.1)] hover:shadow-[0_16px_40px_-16px_rgba(26,24,23,0.2)] transition-shadow duration-500">
                <div className="absolute top-5 left-5 right-5 z-10 flex items-start justify-between" dir="ltr">
                  <div>
                    <p className="specimen-lot opacity-70 text-left">FEATURED · {featured.loafNumber.toUpperCase()}</p>
                    <p className="specimen-lot mt-0.5 opacity-50 text-left">LOT {featured.lot}</p>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center p-8 pt-20" dir="ltr">
                  <Image
                    src={asset(featured.imageUrl)}
                    alt={featured.name}
                    width={600}
                    height={750}
                    unoptimized
                    priority
                    className="object-contain max-h-[88%] max-w-[78%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="bg-[rgb(var(--cream-paper))] border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] px-5 py-4 flex items-baseline justify-between gap-3" dir="rtl">
                  <div className="min-w-0">
                    <h3 className="font-arabic font-bold text-[20px] leading-[1.3] truncate">{featured.arabicName}</h3>
                    <p className="specimen-lot opacity-60 mt-0.5 [direction:ltr] text-right">{featured.weight.toUpperCase()}</p>
                  </div>
                  <div className="flex flex-col items-start shrink-0" dir="ltr">
                    <span className="specimen-spec tabular-nums">{featured.priceEgp ?? "—"} EGP</span>
                    <span className="specimen-lot opacity-60 mt-0.5 group-hover:opacity-100">SPECIMEN →</span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8">
          <div className="col-span-12 md:col-span-3">
            <p className="specimen-lot [direction:ltr] text-right">M-01 · MANIFESTO</p>
            <h2 className="font-arabic font-bold text-[36px] leading-[1.3] mt-2">على المحضر.</h2>
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <blockquote className="font-arabic text-[28px] sm:text-[36px] leading-[1.6] text-[rgb(var(--ink-black))]">
              نُصنّع طعامًا لأجساد لا تساوم. خالٍ من القمح والسكر، آمن لـ PKU — مُهندَس في مدينة 6 أكتوبر،
              معتمد ISO 22000 و ISO 9001، مُفهرَس كعيّنة متحف. كل رغيف يحمل رقم تشغيلة. كل وصفة تحمل مقدارًا
              حقيقيًا. لا نُجمّل حدودنا؛ نُعلنها. أهلًا بكم في مخزن مَن يقرأون اللصاقة.
            </blockquote>
            <p className="specimen-lot mt-6 opacity-60 [direction:ltr] text-right">
              — EPICS · MMXXVI · مدينة 6 أكتوبر
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY GATEWAY */}
      <section id="pantry" className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <header className="flex flex-wrap items-baseline justify-between gap-4 mb-12">
            <div>
              <p className="specimen-lot [direction:ltr] text-right">C-01 · THE PANTRY</p>
              <h2 className="font-arabic font-bold text-[48px] leading-[1.3] mt-2">ثلاثة أرفف.</h2>
            </div>
            <p className="font-arabic text-[17px] max-w-md text-[rgb(var(--charcoal-sub))] leading-[1.7]">
              كل رفّ يخدم جسدًا مختلفًا. كل جسد يستحق نفس الجدية. لا نُخفي الثالث.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgb(var(--ink-black)/0.6)]">
            <ArCategoryTile code="01" title="خالٍ من الغلوتين" arName="Gluten-Free" count={`${products.filter((p) => p.category === "gluten-free").length} عيّنة`} summary="عيش، خلطات خبز، حبوب إفطار، براونيز. لمطابخ السيلياك التي تريد أن تتصرّف مثل أي مطبخ آخر." accent="saffron" href="#" />
            <ArCategoryTile code="02" title="خالٍ من السكر" arName="Sugar-Free" count={`${products.filter((p) => p.category === "sugar-free").length} عيّنة`} summary="خلطة كيك، كريم شانتيه، آيس كريم. للمنازل التي تتعايش مع السكري وتُصرّ على أعياد الميلاد." accent="saffron" href="#" />
            <ArCategoryTile code="03" title="Crystal · PKU" arName="Crystal" count={`${products.filter((p) => p.category === "pku").length} عيّنة`} summary="منخفض البروتين، يُقاس بالمليجرامات من الفينيل ألانين. علامة فرعية معتمدة للعائلات التي تعدّ المليجرامات." accent="pomegranate" href="/pku" endorsed />
          </div>
        </div>
      </section>

      {/* MOST POPULAR */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] pr-6 sm:pr-12 lg:pr-24 py-24">
          <header className="flex items-end justify-between pl-6 sm:pl-12 lg:pl-24 mb-10">
            <div>
              <p className="specimen-lot [direction:ltr] text-right">P-01 · LAST QUARTER&rsquo;S LEADERS</p>
              <h2 className="font-arabic font-bold text-[40px] leading-[1.3] mt-2">الأكثر طلبًا، بحسب التشغيلة.</h2>
            </div>
          </header>
          <ol className="no-scrollbar flex gap-6 overflow-x-auto pl-6 sm:pl-12 lg:pl-24 pb-2 list-none p-0">
            {popular.map((p) => (
              <li key={p.slug} className="shrink-0 w-[260px]">
                <ArSpecimenCard product={p} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing pull quote (Arabic) */}
      <section className="bg-[rgb(var(--linen-mid)/0.35)] border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <p className="specimen-lot [direction:ltr] text-right">J-01 · مقتطف</p>
          <blockquote className="font-arabic font-bold text-[44px] sm:text-[64px] leading-[1.3] tracking-normal mt-6 max-w-[1100px]">
            «كل لصاقة هي هامش. كل هامش صحيح.»
          </blockquote>
          <p className="specimen-lot mt-8 opacity-60 [direction:ltr] text-right">
            — INTERNAL MEMO · MAY 2026 · معلّقة في صالة الإنتاج
          </p>
        </div>
      </section>

      <Footer locale="ar" />
    </main>
  );
}

function ArCategoryTile({ code, title, arName, count, summary, accent, href, endorsed }: {
  code: string; title: string; arName: string; count: string; summary: string; accent: "saffron" | "pomegranate"; href: string; endorsed?: boolean;
}) {
  const accentColor = accent === "saffron" ? "rgb(var(--saffron))" : "rgb(var(--pomegranate))";
  return (
    <Link
      href={href}
      className="group bg-[rgb(var(--cream-paper))] p-8 lg:p-10 flex flex-col justify-between min-h-[420px] no-underline hover:bg-[rgb(var(--linen-mid)/0.4)] transition-colors"
    >
      <header className="flex items-start justify-between">
        <div>
          <p className="specimen-lot opacity-60 [direction:ltr] text-right">CATEGORY · {code}</p>
          {endorsed && (
            <p className="specimen-lot mt-1 [direction:ltr] text-right" style={{ color: accentColor }}>
              ENDORSED · CRYSTAL BY EPICS
            </p>
          )}
        </div>
      </header>
      <div className="text-[rgb(var(--ink-black))]">
        <h3
          className="font-arabic font-bold text-[36px] leading-[1.3]"
          style={endorsed ? { color: accentColor } : undefined}
        >
          {title}
        </h3>
        <p className="specimen-spec opacity-60 mt-2 [direction:ltr] text-right">{arName.toUpperCase()} · {count}</p>
        <p className="font-arabic text-[16px] leading-[1.75] mt-5 text-[rgb(var(--charcoal-sub))]">{summary}</p>
        <p
          className="specimen-spec mt-8 transition-colors group-hover:underline underline-offset-[6px] decoration-[0.5px] [direction:ltr] text-right"
          style={{ color: accentColor }}
        >
          ← BROWSE SHELF
        </p>
      </div>
    </Link>
  );
}

function ArSpecimenCard({ product }: { product: (typeof products)[number] }) {
  const isCrystal = product.subBrand === "crystal";
  return (
    <Link href={`/products/${product.slug}`} className="group block no-underline">
      <article className="bg-white aspect-[3/4] flex flex-col relative overflow-hidden shadow-[0_1px_0_rgba(26,24,23,0.08)] hover:shadow-[0_8px_30px_-12px_rgba(26,24,23,0.18)] transition-shadow duration-300">
        <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between" dir="ltr">
          <div className="flex flex-col gap-0.5 text-left">
            <p className="specimen-lot opacity-70">{product.loafNumber.toUpperCase()}</p>
            {isCrystal && <p className="specimen-lot text-[rgb(var(--pomegranate))]">CRYSTAL · BY EPICS</p>}
          </div>
          <div className="flex gap-1.5">
            {product.freeFrom.map((c) => (
              <span key={c} className="specimen-lot bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))] px-1.5 py-0.5 rounded-[1px]">{c}</span>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-6 pt-16 pb-20" dir="ltr">
          <Image
            src={asset(product.imageUrl)}
            alt={product.name}
            width={400}
            height={500}
            unoptimized
            className="object-contain max-h-[85%] max-w-[80%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-auto relative z-10 bg-[rgb(var(--cream-paper))] border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] px-4 py-3.5 flex items-baseline justify-between gap-3" dir="rtl">
          <h3 className="font-arabic font-bold text-[16px] leading-[1.3] line-clamp-2">{product.arabicName}</h3>
          <span className="specimen-spec tabular-nums shrink-0 [direction:ltr]">
            {product.priceEgp != null ? `${product.priceEgp} EGP` : "WHOLESALE"}
          </span>
        </div>
      </article>
    </Link>
  );
}

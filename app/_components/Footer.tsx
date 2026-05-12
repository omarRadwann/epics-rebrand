import Link from "next/link";

/**
 * Footer. Uses real Epics Group contact info from epics-group.com (audited live).
 * Sat–Wed 09:00–16:00 is the Egyptian working week — leave visible, signals a real operation.
 */

export function Footer({ locale = "en" }: { locale?: "en" | "ar" }) {
  const t =
    locale === "ar"
      ? {
          colophon: "كولوفون",
          made: "صُنع في القاهرة. مدينة 6 أكتوبر · المنطقة الصناعية السادسة · قطعة 330",
          hours: "نعمل من السبت إلى الأربعاء · ٩ ص – ٤ م",
          phone: "هاتف",
          email: "بريد",
          shop: "تسوّق",
          shopAll: "كل المنتجات",
          gluten: "خالي من الغلوتين",
          sugar: "خالي من السكر",
          pku: "Crystal · PKU",
          read: "اقرأ",
          recipes: "وصفات",
          about: "عن إيپكس",
          pkuExplainer: "ما هو PKU؟",
          journal: "المجلة",
          legal: "قانوني",
          terms: "الشروط",
          privacy: "الخصوصية",
          isoLine: "معتمد ISO 22000 و ISO 9001 · رقم اللوط على كل عبوة",
          copyline: "© ٢٠٢٦ إيپكس جروب · جميع الحقوق محفوظة",
        }
      : {
          colophon: "Colophon",
          made: "Made in Cairo. 6th of October City · 6th Industrial Zone · Plot 330.",
          hours: "We answer the phone Saturday–Wednesday, 09:00 to 16:00.",
          phone: "Phone",
          email: "Email",
          shop: "Shop",
          shopAll: "All products",
          gluten: "Gluten-Free",
          sugar: "Sugar-Free",
          pku: "Crystal · PKU",
          read: "Read",
          recipes: "Recipes",
          about: "About Epics",
          pkuExplainer: "What is PKU?",
          journal: "The Journal",
          legal: "Legal",
          terms: "Terms",
          privacy: "Privacy",
          isoLine: "ISO 22000 & ISO 9001 certified · Lot number on every package.",
          copyline: "© 2026 Epics Group · All rights reserved",
        };

  return (
    <footer className="w-full bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] mt-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-20">
        {/* Top band: colophon + isoLine */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgb(var(--cream-paper)/0.2)] border-b-[0.5px]">
          <div className="md:col-span-5">
            <div className="specimen-lot text-[rgb(var(--cream-paper)/0.5)] mb-4">F-01 · COLOPHON</div>
            <div className="font-serif-display text-[40px] leading-[44px] tracking-[-0.015em] mb-4">Epics</div>
            <p className="font-sans-text text-[15px] leading-[1.55] text-[rgb(var(--cream-paper)/0.85)] max-w-md">
              {t.made}
            </p>
            <p className="font-sans-text text-[14px] leading-[1.55] text-[rgb(var(--cream-paper)/0.65)] mt-3 max-w-md">
              {t.hours}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="specimen-lot text-[rgb(var(--cream-paper)/0.5)] mb-4">F-02 · CONTACT</div>
            <ul className="space-y-2 font-sans-text text-[14px] text-[rgb(var(--cream-paper)/0.85)] list-none p-0">
              <li className="flex flex-col">
                <span className="specimen-lot text-[rgb(var(--cream-paper)/0.5)]">{t.phone}</span>
                <a href="tel:+201275591334" className="hover:underline underline-offset-4">+20 127 559 1334</a>
                <a href="tel:+201006409070" className="hover:underline underline-offset-4">+20 100 640 9070</a>
              </li>
              <li className="flex flex-col mt-3">
                <span className="specimen-lot text-[rgb(var(--cream-paper)/0.5)]">{t.email}</span>
                <a href="mailto:sales@epics-group.com" className="hover:underline underline-offset-4">sales@epics-group.com</a>
                <a href="mailto:info@epics-group.com" className="hover:underline underline-offset-4">info@epics-group.com</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="specimen-lot text-[rgb(var(--cream-paper)/0.5)] mb-4">F-03 · {t.shop}</div>
            <ul className="space-y-2 font-sans-text text-[14px] text-[rgb(var(--cream-paper)/0.85)] list-none p-0">
              <li><Link href="#" className="hover:underline underline-offset-4">{t.shopAll}</Link></li>
              <li><Link href="#" className="hover:underline underline-offset-4">{t.gluten}</Link></li>
              <li><Link href="#" className="hover:underline underline-offset-4">{t.sugar}</Link></li>
              <li><Link href="#" className="hover:underline underline-offset-4 text-[rgb(var(--pomegranate))] brightness-150">{t.pku}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="specimen-lot text-[rgb(var(--cream-paper)/0.5)] mb-4">F-04 · {t.read}</div>
            <ul className="space-y-2 font-sans-text text-[14px] text-[rgb(var(--cream-paper)/0.85)] list-none p-0">
              <li><Link href="#" className="hover:underline underline-offset-4">{t.recipes}</Link></li>
              <li><Link href="#" className="hover:underline underline-offset-4">{t.about}</Link></li>
              <li><Link href="#" className="hover:underline underline-offset-4">{t.pkuExplainer}</Link></li>
              <li><Link href="#" className="hover:underline underline-offset-4">{t.journal}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom band: ISO + copy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4 pt-8">
          <p className="specimen-spec text-[rgb(var(--cream-paper)/0.6)]">{t.isoLine}</p>
          <p className="specimen-lot text-[rgb(var(--cream-paper)/0.5)]">{t.copyline}</p>
        </div>
      </div>
    </footer>
  );
}

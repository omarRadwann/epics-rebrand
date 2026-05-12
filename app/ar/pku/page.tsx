import Link from "next/link";
import { Nav } from "../../_components/Nav";
import { Footer } from "../../_components/Footer";
import { ProductCard } from "../../_components/ProductCard";
import { Strikethrough } from "../../_components/Strikethrough";
import { productsByCategory } from "@/lib/catalog";

export const metadata = {
  title: "Crystal by Epics — PKU · غذاء منخفض البروتين بالمليجرام",
  description: "كريستال من إيپكس، علامة معتمدة لمرضى PKU. غذاء منخفض البروتين بقياس الفينيل ألانين، صُنع في مدينة 6 أكتوبر.",
};

export default function ArPkuPage() {
  const pkuProducts = productsByCategory("pku");

  return (
    <main id="main" lang="ar" dir="rtl" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav locale="ar" />

      <section className="bg-[rgb(var(--pomegranate)/0.08)] border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-24 grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 md:col-span-7">
            <p className="specimen-lot text-[rgb(var(--pomegranate))] [direction:ltr] text-right">PKU-01 · ENDORSED SUB-BRAND</p>
            <div className="mt-3 flex items-baseline gap-4 flex-wrap">
              <span className="specimen-spec opacity-60">EPICS</span>
              <span className="specimen-spec opacity-40">·</span>
              <span className="font-serif-display text-[44px] leading-none italic text-[rgb(var(--pomegranate))]">Crystal</span>
              <span className="specimen-spec opacity-40">·</span>
              <span className="specimen-spec text-[rgb(var(--pomegranate))]">PKU</span>
            </div>
            <h1 className="font-arabic font-bold text-[56px] sm:text-[80px] leading-[1.1] mt-10">
              غذاء منخفض
              <br />
              البروتين،
              <br />
              <span className="italic" style={{ color: "rgb(var(--pomegranate))" }}>بالمليجرام.</span>
            </h1>
            <p className="font-arabic text-[20px] leading-[1.7] mt-10 max-w-[600px]">
              للعائلات التي تتعايش مع الفينيل كيتون يوريا. نُعلن الفينيل ألانين لكل قطعة، لا لكل ١٠٠ جرام،
              لأن هذه هي الطريقة التي يعمل بها التقنين عمليًا.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col items-center justify-center">
            <div className="text-[rgb(var(--pomegranate))]">
              <Strikethrough variant="protein" size={200} />
            </div>
            <p className="specimen-lot mt-6 text-[rgb(var(--pomegranate))] [direction:ltr]">S-03 · PROTEIN · STRUCK</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <div className="grid grid-cols-12 gap-x-8 gap-y-10">
            <div className="col-span-12 md:col-span-3">
              <p className="specimen-lot opacity-60 [direction:ltr] text-right">PKU-02 · DEFINITION</p>
              <h2 className="font-arabic font-bold text-[36px] leading-[1.3] mt-2">ما هو الـ PKU؟</h2>
            </div>
            <div className="col-span-12 md:col-span-9 space-y-6 font-arabic text-[18px] leading-[1.8] max-w-[720px]">
              <p>
                الفينيل كيتون يوريا — يُكتب عادةً PKU — اضطراب استقلابي وراثي نادر. مَن وُلِدوا به لا
                يستطيعون معالجة <em>الفينيل ألانين</em>، وهو حمض أميني موجود في كل بروتين تقريبًا. يتراكم
                في الجسم لمستويات سامّة، وبدون علاج يُسبّب تلفًا دائمًا في الدماغ.
              </p>
              <p>
                يصيب نحو ١ من كل ١٠٬٠٠٠ مولود في مصر. يُكتشف معظمهم في فحص شامل لحديثي الولادة بوخز
                الكعب. <em>العلاج غذائي، مدى الحياة، لا يسامح.</em>
              </p>
              <p>
                يتبع المصاب حمية صارمة منخفضة البروتين منذ الولادة، وتُكمَّل عادةً بصيغة طبية للأحماض الأمينية
                توفّر البروتينات التي لا يستطيع الحصول عليها من الطعام. الحمية تُحسب بالمليجرامات من
                الفينيل ألانين، وتُقسَّم على ساعات اليوم.
              </p>
              <p className="font-serif-display italic text-[20px] leading-[1.5] pr-6 border-r border-[rgb(var(--pomegranate))] [direction:rtl]">
                شريحة خبز عادية واحدة تحتوي تقريبًا على ٢٠٠ مليجرام من الفينيل ألانين. طفل مصاب بالـ PKU
                قد تكون حصّته اليومية ٢٠٠ إلى ٤٠٠ مليجرام إجمالًا. فالشريحة الواحدة، رياضيًا، هي حصّة يوم
                كامل. لهذا يأتي عيشنا المسطّح بـ ١٫٢ مليجرام لكل قطعة.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <p className="specimen-lot opacity-60 mb-2 [direction:ltr] text-right">PKU-04 · THE RANGE</p>
          <h2 className="font-arabic font-bold text-[44px] leading-[1.3]">خط كريستال.</h2>
          <p className="font-arabic text-[17px] leading-[1.7] mt-4 max-w-[640px] text-[rgb(var(--charcoal-sub))]">
            عيّنتان متوفّرتان الآن. أربع أخرى قيد التطوير. مرتبتان حسب الفينيل ألانين لكل جرام تصاعديًا.
          </p>
          <ul className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 list-none p-0">
            {pkuProducts.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} variant="grid" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-4">
            <p className="specimen-lot text-[rgb(var(--cream-paper)/0.6)] [direction:ltr] text-right">PKU-05 · FOR CLINICIANS</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-arabic font-bold text-[36px] leading-[1.4]">
              إذا كنت أخصّائي تغذية استقلابية في مصر وتحتاج عيّنات منتج، أو شهادات تحليل، أو تاريخ PHE
              لكل لوط — اكتب إلينا.
            </h2>
            <a
              href="mailto:crystal@epics-group.com"
              className="inline-block mt-10 specimen-spec underline underline-offset-[6px] decoration-[0.5px] [direction:ltr]"
            >
              CRYSTAL@EPICS-GROUP.COM →
            </a>
          </div>
        </div>
      </section>

      <Footer locale="ar" />
    </main>
  );
}

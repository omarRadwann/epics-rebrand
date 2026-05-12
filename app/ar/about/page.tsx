import Link from "next/link";
import { Nav } from "../../_components/Nav";
import { Footer } from "../../_components/Footer";
import { Strikethrough } from "../../_components/Strikethrough";

export const metadata = {
  title: "عن إيپكس — مخزن مَن يقرأون اللصاقة",
  description: "إيپكس جروب — مصنع مصري للأطعمة الخالية من الغلوتين والسكر والآمنة لـ PKU، في مدينة 6 أكتوبر، معتمد ISO 22000 و ISO 9001.",
};

export default function ArAboutPage() {
  return (
    <main id="main" lang="ar" dir="rtl" className="min-h-screen bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))]">
      <Nav locale="ar" />

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-16 pb-24 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <p className="specimen-lot opacity-60 [direction:ltr] text-right">A · ABOUT EPICS</p>
            <p className="specimen-lot opacity-60 mt-2 [direction:ltr] text-right">MMXXVI · ISSUE 01</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1 className="font-arabic font-bold text-[64px] sm:text-[112px] leading-[1.05] tracking-normal">
              لا نُجمّل
              <br />
              حدودنا —
              <br />
              <span className="italic">نُعلنها.</span>
            </h1>
            <p className="font-arabic text-[22px] leading-[1.7] mt-10 max-w-[720px]">
              إيپكس هو مخزن مَن يقرأون اللصاقة. تأسّس في مدينة 6 أكتوبر لصنع طعام تستطيع
              العائلات التي تتعايش مع داء السيلياك، والسكري، والفينيل كيتون يوريا أن تتشاركه
              دون هوامش، ولا نجوم، ولا اعتذار.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <p className="specimen-lot opacity-60 mb-2 [direction:ltr] text-right">S · STORY</p>
          <h2 className="font-arabic font-bold text-[44px] leading-[1.3] max-w-[800px]">
            كيف وصلنا إلى هنا، في خمس حركات.
          </h2>

          <ol className="mt-16 list-none p-0 grid grid-cols-12 gap-x-8 gap-y-16">
            <StoryEntry code="I" year="2018" title="أوّل رغيف."
              body="تشخيص سيلياك في عائلة المؤسس. الخبز المصري الخالي من الغلوتين كان آنذاك إمّا مستوردًا غير مقدور عليه، وإمّا محلّيًا غير صالح للأكل. خُبز أوّل رغيف على الطريقة الأوروبية في مطبخ مستأجر خلف مسجد ميدان لبنان." />
            <StoryEntry code="II" year="2020" title="المصنع."
              body="انتقلنا إلى قطعة 330، المنطقة الصناعية السادسة، مدينة 6 أكتوبر. ثمانية موظفين. طاحونة واحدة. فرن طبقات تجاري. بدأنا بالتوريد لثلاث صيدليات في الزمالك وعيادة متخصّصة في المعادي." />
            <StoryEntry code="III" year="2022" title="ISO 22000."
              body="مدقَّق ومعتمد من بيرو فيريتاس مصر. إدارة سلامة الغذاء ليست ادعاءً تسويقيًا. إنها مجلّد كامل من وثائق العمليات وسجلّات المعدّات وبيانات التتبّع، يُراجَع سنويًا من قِبَل أناس لا يريدون أن يُبهَروا." />
            <StoryEntry code="IV" year="2024" title="كريستال."
              body="استشاري طب أطفال في مستشفى جامعة القاهرة تواصل معنا بخصوص الفينيل كيتون يوريا (PKU). لم يكن هناك مورّد محلّي في مصر. أمضينا ثمانية عشر شهرًا في تطوير خط كريستال منخفض البروتين بالتعاون مع وحدة الأمراض الاستقلابية. نُعلن الفينيل ألانين بالمليجرامات لكل قطعة، لأن هذا هو ما تعدّه العائلات." />
            <StoryEntry code="V" year="2026" title="هذا المخزن."
              body="الموقع الذي تقرأه الآن. أعدنا كتابة كل شيء — الوَسم، التصوير، الوصفات، كيف نُعلن الاعتمادات — لأن جوهر ما نصنع تجاوز شكله القديم." />
          </ol>
        </div>
      </section>

      <section className="bg-[rgb(var(--pomegranate)/0.10)] border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <p className="specimen-lot text-[rgb(var(--pomegranate))] [direction:ltr] text-right">P · CRYSTAL BY EPICS</p>
            <Strikethrough variant="protein" size={96} />
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-arabic font-bold text-[44px] leading-[1.3] text-[rgb(var(--pomegranate))]">
              خط كريستال هو سبب وجودنا.
            </h2>
            <p className="font-arabic text-[18px] leading-[1.8] mt-8 max-w-[720px] text-[rgb(var(--ink-black))]">
              الفينيل كيتون يوريا اضطراب استقلابي وراثي نادر. مَن وُلِدوا به لا يستطيعون معالجة الفينيل
              ألانين، وهو حمض أميني موجود في كل بروتين تقريبًا. غير العلاج، يتراكم في الجسم لمستويات
              سامّة، ويُسبّب تلفًا دائمًا في الدماغ. مع العلاج — حمية صارمة منخفضة البروتين منذ الولادة —
              تسير الحياة بشكل طبيعي. لكنها حمية لا تسامح، والطعام الذي يلائمها لم يكن متوفّرًا تاريخيًا في مصر.
            </p>
            <Link
              href="/ar/pku"
              className="inline-block mt-10 bg-[rgb(var(--pomegranate))] text-[rgb(var(--cream-paper))] px-6 py-4 specimen-spec hover:opacity-90 transition-opacity"
            >
              ← اقرأ شرح PKU
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-24">
          <blockquote className="font-arabic font-bold text-[40px] sm:text-[56px] leading-[1.4] max-w-[1100px]">
            «كل لصاقة هي هامش. كل هامش صحيح.»
          </blockquote>
          <p className="specimen-lot mt-8 opacity-60 [direction:ltr] text-right">— INTERNAL MEMO · MAY 2026 · معلّقة في صالة الإنتاج</p>
        </div>
      </section>

      <Footer locale="ar" />
    </main>
  );
}

function StoryEntry({ code, year, title, body }: { code: string; year: string; title: string; body: string }) {
  return (
    <li className="col-span-12 md:col-span-6 grid grid-cols-[60px_1fr] gap-x-6">
      <div className="flex flex-col gap-1">
        <span className="font-serif-display text-[48px] leading-none italic text-[rgb(var(--saffron))]">{code}</span>
        <span className="specimen-lot opacity-60 [direction:ltr] text-right">{year}</span>
      </div>
      <div>
        <h3 className="font-arabic font-bold text-[26px] leading-[1.4]">{title}</h3>
        <p className="font-arabic text-[16px] leading-[1.8] mt-3 text-[rgb(var(--charcoal-sub))]">{body}</p>
      </div>
    </li>
  );
}

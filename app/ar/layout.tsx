import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Epics — عيش ما يعتذرش. خالي من الغلوتين والسكر، آمن لمرضى PKU.",
  description:
    "نُصنّع طعامًا لأجساد لا تساوم. خالٍ من القمح والسكر، آمن لـ PKU — مُهندَس في مدينة 6 أكتوبر، معتمد ISO 22000 و ISO 9001.",
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override the lang/dir on the body wrapper. Next.js doesn't support per-route <html>,
  // so we apply dir to the section element and rely on CSS direction logic for typography.
  return (
    <div lang="ar" dir="rtl" className="font-arabic">
      {children}
    </div>
  );
}

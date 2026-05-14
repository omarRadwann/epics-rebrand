import { CategoryShelf } from "@/components/ui/CategoryShelf";

export const metadata = {
  title: "Sugar-Free · The Second Shelf",
  description:
    "Cake mix, whipping cream, ice cream — erythritol + stevia, no cane sugar. For diabetic households who still want birthdays.",
};

export default function SugarFreePage() {
  return (
    <CategoryShelf
      category="sugar-free"
      code="S-02"
      monogram="sugar"
      title="Sugar-Free"
      headline="The sugar, struck."
      blurb="Cake mix, whipping cream, ice cream. Sweetened with erythritol and stevia glycosides — no cane sugar. For diabetic households who still want birthdays, and still want them to taste like vanilla."
    />
  );
}

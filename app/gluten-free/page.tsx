import { CategoryShelf } from "@/components/ui/CategoryShelf";

export const metadata = {
  title: "Gluten-Free · The First Shelf",
  description:
    "Bread, baking mixes, cereal, brownies — wheat-free, certified at source. For coeliac kitchens that want to behave like every other kitchen.",
};

export default function GlutenFreePage() {
  return (
    <CategoryShelf
      category="gluten-free"
      code="S-01"
      monogram="wheat"
      title="Gluten-Free"
      headline="The wheat, struck."
      blurb="Bread, baking mixes, cereal, brownies. Wheat-free, certified at source. For coeliac kitchens that want to behave like every other kitchen — kneadable doughs, scorable loaves, real crumb."
    />
  );
}

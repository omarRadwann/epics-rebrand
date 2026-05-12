import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { ProductIllustration } from "./ProductIllustration";

/**
 * Reusable product specimen card. Used on:
 *   - Homepage popular rail
 *   - Category grid (Gluten-Free, Sugar-Free, PKU)
 *   - PDP related products
 *
 * Variant: "rail" (fixed 260px), "grid" (fills column), "hero" (2x grid tile)
 */

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "rail" | "grid" | "hero";
}) {
  const isCrystal = product.subBrand === "crystal";
  const surface = isCrystal
    ? "bg-[rgb(var(--pomegranate)/0.08)]"
    : "bg-[rgb(var(--linen-mid)/0.45)]";

  const aspect =
    variant === "hero" ? "aspect-[3/2]" : variant === "rail" ? "aspect-[3/4]" : "aspect-[3/4]";

  return (
    <Link href={`/products/${product.slug}`} className="block group no-underline">
      <article className={`${aspect} flex flex-col justify-between p-5 ${surface} relative overflow-hidden`}>
        <header className="flex items-start justify-between relative z-10">
          <p className="specimen-lot">{product.loafNumber.toUpperCase()}</p>
          <div className="flex gap-1">
            {product.freeFrom.map((c) => (
              <span key={c} className="specimen-lot opacity-60">
                {c}
              </span>
            ))}
          </div>
        </header>

        {/* Hairline-art product package illustration */}
        <div className="absolute inset-0 flex items-center justify-center px-8 py-12 pointer-events-none">
          <div className={variant === "hero" ? "w-[55%] h-[80%]" : "w-[70%] h-[68%]"}>
            <ProductIllustration product={product} variant={variant === "hero" ? "hero" : "card"} />
          </div>
        </div>

        <footer className="flex items-baseline justify-between text-[rgb(var(--ink-black))] relative z-10">
          <span className="specimen-spec">{product.priceEgp} EGP</span>
          <span className="specimen-spec group-hover:underline underline-offset-4 decoration-[0.5px]">
            SPECIMEN →
          </span>
        </footer>
      </article>
    </Link>
  );
}

"use client";

/**
 * Client wrapper for the PDP 3D hero. Kept separate from page.tsx so
 * the server component stays static and only the canvas + R3F payload
 * loads client-side.
 */
import dynamic from "next/dynamic";
import type { Product } from "@/lib/catalog";

const CanvasRoot = dynamic(
  () => import("@/components/three/CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false }
);

const ProductHero = dynamic(
  () =>
    import("@/components/three/scenes/ProductHero").then((m) => m.ProductHero),
  { ssr: false }
);

export function ProductHeroCanvas({ product }: { product: Product }) {
  return (
    <div className="absolute inset-0">
      <CanvasRoot fullBleed={false}>
        <ProductHero product={product} />
      </CanvasRoot>
    </div>
  );
}

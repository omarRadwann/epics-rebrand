"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { recipes, type Recipe, type RecipeShelf } from "@/lib/recipes";
import { asset } from "@/lib/asset";

type Filter = "all" | RecipeShelf;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all",          label: "All" },
  { id: "gluten-free",  label: "Gluten-Free" },
  { id: "sugar-free",   label: "Sugar-Free" },
  { id: "pku",          label: "Crystal · PKU" },
];

export function RecipesGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return recipes;
    return recipes.filter((r) => r.shelf === filter);
  }, [filter]);

  return (
    <>
      {/* Sticky filter bar */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px] sticky top-0 bg-[rgb(var(--cream-paper))] z-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="specimen-lot opacity-60">FILTER · M-00</p>
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const isPku = f.id === "pku";
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`font-sans-text text-[14px] py-1.5 border-b transition-colors ${
                  active
                    ? isPku
                      ? "border-[rgb(var(--pomegranate))] text-[rgb(var(--pomegranate))]"
                      : "border-[rgb(var(--ink-black))] text-[rgb(var(--ink-black))]"
                    : "border-transparent text-[rgb(var(--charcoal-sub))] hover:text-[rgb(var(--ink-black))] hover:border-[rgb(var(--ink-black))]"
                }`}
              >
                {f.label} <span className="specimen-lot opacity-60 ml-1">({countFor(f.id)})</span>
              </button>
            );
          })}
          <span className="ml-auto specimen-lot opacity-60">SORT · BY CODE</span>
        </div>
      </section>

      {/* Grid with layout animation */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-16">
          <p className="specimen-lot opacity-60 mb-6">
            {filtered.length} {filtered.length === 1 ? "method" : "methods"} · sorted by code
          </p>
          <LayoutGroup>
            <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
              <AnimatePresence mode="popLayout">
                {filtered.map((r) => (
                  <motion.li
                    key={r.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <RecipeCard recipe={r} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        </div>
      </section>
    </>
  );
}

function countFor(f: Filter): number {
  if (f === "all") return recipes.length;
  return recipes.filter((r) => r.shelf === f).length;
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const isPku = recipe.shelf === "pku";
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block no-underline focus-visible:outline-none">
      <motion.article
        className="bg-white relative overflow-hidden flex flex-col"
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        style={{ boxShadow: "0 1px 0 rgba(20,17,15,0.08)" }}
      >
        {isPku && <span aria-hidden className="absolute top-0 left-0 right-0 h-[3px] bg-[rgb(var(--pomegranate))] z-20" />}

        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={asset(recipe.imageUrl)}
              alt={recipe.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
          {/* Top-left specimen code */}
          <div className="absolute top-4 left-4 bg-[rgb(var(--cream-paper))] px-2 py-1 z-10">
            <span className="specimen-lot text-[rgb(var(--ink-black))]">{recipe.code}</span>
          </div>
          {isPku && (
            <div className="absolute top-4 right-4 bg-[rgb(var(--pomegranate))] text-[rgb(var(--cream-paper))] px-2 py-1 z-10">
              <span className="specimen-lot">CRYSTAL · PKU</span>
            </div>
          )}
        </div>

        <div className="bg-[rgb(var(--cream-paper))] border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] px-5 py-5 flex flex-col gap-2">
          <h3 className="font-serif-display text-[22px] leading-[1.15] tracking-[-0.005em] text-[rgb(var(--ink-black))]">
            {recipe.title}
          </h3>
          <p className="font-sans-text text-[14px] leading-[1.5] text-[rgb(var(--charcoal-sub))] line-clamp-2">
            {recipe.summary}
          </p>
          <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-[rgb(var(--ink-black)/0.15)] border-t-[0.5px]">
            <span className="specimen-lot opacity-60">{recipe.time.toUpperCase()} · {recipe.yield.toUpperCase()}</span>
            <span className="specimen-spec group-hover:underline underline-offset-4 decoration-[0.5px]">METHOD →</span>
          </div>
        </div>

        {/* Saffron stripe on hover */}
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-[rgb(var(--saffron))] origin-left z-30"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.article>
    </Link>
  );
}

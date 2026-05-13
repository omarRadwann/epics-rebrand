"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

/**
 * Cinematic hero carousel — four slides representing the brand's three
 * shelves plus a recipes/method moment.
 *
 * Transition: image crossfades + slow Ken-Burns zoom. Text slides up.
 * Dots tick along with a progress bar showing the auto-advance timer.
 * Auto-advance every 6.4s. Pause on hover. Click any dot to jump.
 *
 * Each slide carries its own accent color so the page rhythm shifts
 * with the content — cream + saffron for gluten-free, sage for
 * sugar-free, pomegranate for Crystal · PKU, ink-black for journal.
 */

type Slide = {
  id: string;
  eyebrow: string;
  headline: string[];           // each item is a line; last line gets italic
  body: string;
  image: string;                // path under /public, e.g. /images/recipes/foo.jpg
  imageAlt: string;
  ctaHref: string;
  ctaLabel: string;
  accent: "cream" | "sage" | "pomegranate" | "ink";
};

const slides: Slide[] = [
  {
    id: "gluten-free",
    eyebrow: "S-01 · GLUTEN-FREE · 20 SPECIMENS",
    headline: ["Bread that", "doesn’t apologise."],
    body: "Wheat-free, structurally sound, engineered in 6th of October City. Twenty SKUs across baking mixes, breads, sweet bakes, and pantry staples.",
    image: "/images/recipes/flat-bread-using-flatbread-mix.jpg",
    imageAlt: "Egyptian flatbread, gluten-free, fresh from the oven",
    ctaHref: "/gluten-free",
    ctaLabel: "ENTER THE GLUTEN-FREE SHELF →",
    accent: "cream",
  },
  {
    id: "sugar-free",
    eyebrow: "S-02 · SUGAR-FREE · 6 SPECIMENS",
    headline: ["Sweet without", "the sugar."],
    body: "Erythritol + stevia. Cake that tastes like cake. Ice cream that scoops. Whipping cream that holds peaks for 48 hours.",
    image: "/images/recipes/sugar-free-ice-cream.jpg",
    imageAlt: "Sugar-free vanilla ice cream — milk-free, gluten-free",
    ctaHref: "/sugar-free",
    ctaLabel: "ENTER THE SUGAR-FREE SHELF →",
    accent: "sage",
  },
  {
    id: "pku",
    eyebrow: "S-03 · CRYSTAL BY EPICS · PKU",
    headline: ["Measured in", "milligrams."],
    body: "Low-protein, phenylalanine-published-per-piece. Engineered in consultation with Cairo University Hospital's metabolic unit. PKU households deserve the same gravity.",
    image: "/images/recipes/low-protein-flat-bread.jpg",
    imageAlt: "Crystal by Epics — low-protein PKU flatbread",
    ctaHref: "/pku",
    ctaLabel: "ENTER THE CRYSTAL · PKU LINE →",
    accent: "pomegranate",
  },
  {
    id: "method",
    eyebrow: "M · METHOD BOOK · 24 PUBLISHED RECIPES",
    headline: ["Every measure", "published."],
    body: "Twenty-four method-book recipes built on the catalogue — pizza, qatayef, kahk, basbousa, brownies, chantilly. Real timings, real measures.",
    image: "/images/recipes/maamoul-using-soft-mixture.png",
    imageAlt: "Maamoul on soft flour — published recipe",
    ctaHref: "/journal",
    ctaLabel: "READ THE METHOD BOOK →",
    accent: "ink",
  },
];

const ADVANCE_MS = 6400;

const accentBg: Record<Slide["accent"], string> = {
  cream:        "bg-[rgb(var(--cream-paper))]",
  sage:         "bg-[rgb(var(--sage)/0.12)]",
  pomegranate:  "bg-[rgb(var(--pomegranate)/0.12)]",
  ink:          "bg-[rgb(var(--ink-black))]",
};
const accentText: Record<Slide["accent"], string> = {
  cream:        "text-[rgb(var(--ink-black))]",
  sage:         "text-[rgb(var(--ink-black))]",
  pomegranate:  "text-[rgb(var(--ink-black))]",
  ink:          "text-[rgb(var(--cream-paper))]",
};
const accentEyebrow: Record<Slide["accent"], string> = {
  cream:        "text-[rgb(var(--charcoal-sub))]",
  sage:         "text-[rgb(var(--sage))]",
  pomegranate:  "text-[rgb(var(--pomegranate))]",
  ink:          "text-[rgb(var(--saffron))]",
};
const accentCta: Record<Slide["accent"], string> = {
  cream:        "bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))]",
  sage:         "bg-[rgb(var(--sage))] text-[rgb(var(--cream-paper))] hover:bg-[rgb(var(--ink-black))] hover:text-[rgb(var(--cream-paper))]",
  pomegranate:  "bg-[rgb(var(--pomegranate))] text-[rgb(var(--cream-paper))] hover:bg-[rgb(var(--ink-black))] hover:text-[rgb(var(--cream-paper))]",
  ink:          "bg-[rgb(var(--saffron))] text-[rgb(var(--ink-black))] hover:bg-[rgb(var(--cream-paper))] hover:text-[rgb(var(--ink-black))]",
};
const accentDot: Record<Slide["accent"], string> = {
  cream: "bg-[rgb(var(--ink-black))]",
  sage: "bg-[rgb(var(--sage))]",
  pomegranate: "bg-[rgb(var(--pomegranate))]",
  ink: "bg-[rgb(var(--saffron))]",
};

const easeOut = [0.16, 1, 0.3, 1] as const;
const easeIn  = [0.7, 0, 0.84, 0] as const;

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  show:   { y: "0%",    opacity: 1, transition: { duration: 0.85, ease: easeOut } },
  exit:   { y: "-100%", opacity: 0, transition: { duration: 0.4,  ease: easeIn } },
} as const;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // for progress bar animation
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
    setTick((t) => t + 1);
  }, []);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
      setTick((t) => t + 1);
    }, ADVANCE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  const slide = slides[index];
  const isInk = slide.accent === "ink";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Epics shelves"
      className="relative overflow-hidden border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Accent surface — crossfade per slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          className={`absolute inset-0 ${accentBg[slide.accent]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        />
      </AnimatePresence>

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 pt-14 pb-20 lg:pt-20 lg:pb-28 grid grid-cols-12 gap-x-8 gap-y-10 min-h-[640px] lg:min-h-[720px]">
        {/* Text column */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between relative z-10">
          {/* Eyebrow — keyed motion (no AnimatePresence, no exit-wait). */}
          <motion.p
            key={`eb-${slide.id}`}
            className={`specimen-lot ${accentEyebrow[slide.accent]}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            {slide.eyebrow}
          </motion.p>

          {/* Headline — per-word reveal. Keyed by slide so React remounts
              the whole h1 on slide change; each word fades + lifts on its
              own delay. No AnimatePresence wrapper (the cascade of multiple
              mode="wait" wrappers caused slides 2/4 to render blank). */}
          <div className="mt-8 lg:mt-10">
            <motion.h1
              key={`h-${slide.id}`}
              className={`font-serif-display text-[64px] sm:text-[100px] lg:text-[132px] leading-[0.95] tracking-[-0.035em] ${accentText[slide.accent]}`}
            >
              {(() => {
                let wordIdx = 0;
                return slide.headline.map((line, li) => {
                  const isLast = li === slide.headline.length - 1;
                  const words = line.split(" ");
                  return (
                    <span key={li} className={`block ${isLast ? "italic" : ""}`}>
                      {words.map((w, wi) => {
                        const i = wordIdx++;
                        return (
                          <motion.span
                            key={`${slide.id}-${li}-${wi}`}
                            className="inline-block"
                            initial={{ y: 32, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              duration: 0.7,
                              ease: easeOut,
                              delay: 0.08 + i * 0.055,
                            }}
                            style={{ whiteSpace: "pre" }}
                          >
                            {w}{wi < words.length - 1 ? " " : ""}
                          </motion.span>
                        );
                      })}
                    </span>
                  );
                });
              })()}
            </motion.h1>

            {/* Body — keyed, no AnimatePresence. */}
            <motion.p
              key={`b-${slide.id}`}
              className={`font-sans-text text-[17px] sm:text-[19px] leading-[1.55] mt-8 max-w-[540px] ${isInk ? "text-[rgb(var(--cream-paper)/0.85)]" : "text-[rgb(var(--charcoal-sub))]"}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
            >
              {slide.body}
            </motion.p>
          </div>

          {/* CTA — keyed motion, no AnimatePresence. */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <motion.div
              key={`cta-${slide.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: easeOut }}
            >
              <Link
                href={slide.ctaHref}
                className={`inline-flex items-center gap-3 px-7 py-4 specimen-spec transition-colors ${accentCta[slide.accent]}`}
              >
                {slide.ctaLabel}
              </Link>
            </motion.div>

            <button
              onClick={() => setPaused((p) => !p)}
              className={`specimen-lot underline-offset-4 decoration-[0.5px] hover:underline ${isInk ? "text-[rgb(var(--cream-paper)/0.7)]" : "text-[rgb(var(--charcoal-sub))]"}`}
              aria-label={paused ? "Resume carousel" : "Pause carousel"}
            >
              {paused ? "▶ RESUME" : "❚❚ PAUSE"}
            </button>
          </div>
        </div>

        {/* Image column with Ken Burns + crossfade */}
        <div className="col-span-12 lg:col-span-5 lg:pl-8 relative">
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.div
                key={`img-${slide.id}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Slow Ken-Burns */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.06 }}
                  transition={{ duration: ADVANCE_MS / 1000, ease: "linear" }}
                >
                  <Image
                    src={asset(slide.image)}
                    alt={slide.imageAlt}
                    fill
                    unoptimized
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
                {/* Accent vignette */}
                <div
                  className={`absolute inset-0 ${
                    slide.accent === "ink"
                      ? "bg-gradient-to-br from-[rgb(var(--ink-black)/0.55)] via-[rgb(var(--ink-black)/0.25)] to-transparent"
                      : "bg-gradient-to-tr from-transparent via-[rgb(var(--cream-paper)/0.05)] to-[rgb(var(--cream-paper)/0.10)]"
                  }`}
                />
              </motion.div>
            </AnimatePresence>

            {/* Specimen lot card overlay */}
            <div className="absolute top-5 left-5 bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))] px-3 py-2 z-10">
              <p className="specimen-lot">LOT {String(index + 1).padStart(2, "0")} · {slides.length}</p>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="col-span-12 flex items-center gap-4 mt-2 lg:mt-0">
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className="group flex items-center gap-2"
                aria-label={`Go to slide ${i + 1}: ${s.headline.join(" ")}`}
                aria-current={active ? "true" : undefined}
              >
                <span className={`specimen-lot ${isInk ? "text-[rgb(var(--cream-paper)/0.55)] group-hover:text-[rgb(var(--cream-paper))]" : "text-[rgb(var(--charcoal-sub))] group-hover:text-[rgb(var(--ink-black))]"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`relative h-px overflow-hidden ${active ? "w-24 sm:w-32" : "w-8 sm:w-10"} transition-all duration-500 ${isInk ? "bg-[rgb(var(--cream-paper)/0.25)]" : "bg-[rgb(var(--ink-black)/0.25)]"}`}>
                  {active && (
                    <motion.span
                      key={`bar-${slide.id}-${tick}`}
                      className={`absolute top-0 left-0 h-full ${accentDot[slide.accent]}`}
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? "100%" : "100%" }}
                      transition={paused ? { duration: 0 } : { duration: ADVANCE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

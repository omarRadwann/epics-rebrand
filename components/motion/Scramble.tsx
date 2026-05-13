"use client";

/**
 * Text scramble — decodes target text from random glyphs.
 * Per brief §5: use requestAnimationFrame, NOT setInterval. Hoodzpah-style.
 *
 * Triggers on enter-viewport by default.
 */
import { useEffect, useRef, useState, type JSX } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789";

interface ScrambleProps {
  text: string;
  trigger?: "view" | "mount";
  speed?: number;          // characters revealed per second
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function Scramble({
  text,
  trigger = "view",
  speed = 22,
  className,
  as = "span",
}: ScrambleProps) {
  const [display, setDisplay] = useState(text);
  const [active, setActive] = useState(trigger === "mount");
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    if (trigger !== "view" || !ref.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [trigger, text]);

  useEffect(() => {
    if (!active) {
      setDisplay(text.replace(/[^\s]/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "X"));
      return;
    }

    let raf = 0;
    const start = performance.now();
    const totalLen = text.length;
    const totalDuration = (totalLen / speed) * 1000;

    const step = (now: number) => {
      const elapsed = now - start;
      const reveal = Math.min(totalLen, Math.floor((elapsed / totalDuration) * totalLen));
      let out = "";
      for (let i = 0; i < totalLen; i++) {
        const ch = text[i] ?? "";
        if (i < reveal || ch === " ") {
          out += ch;
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "X";
        }
      }
      setDisplay(out);
      if (reveal < totalLen) {
        raf = requestAnimationFrame(step);
      } else {
        setDisplay(text);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, text, speed]);

  const Component = as as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error — generic ref to intrinsic element
    <Component ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Component>
  );
}

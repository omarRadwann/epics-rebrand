"use client";

import { useEffect } from "react";

/**
 * App Router's root layout owns the <html> element, and child layouts
 * cannot change its attributes server-side. Without this, every /ar/*
 * route shipped with <html lang="en" dir=""> — wrong for screen
 * readers, browser RTL handling, and SEO.
 *
 * This sets lang="ar"/dir="rtl" on the live document for the Arabic
 * routes and restores en/ltr on unmount, so client-side navigation
 * back to an English route stays correct.
 */
export function LocaleHtml() {
  useEffect(() => {
    const el = document.documentElement;
    const prevLang = el.lang;
    const prevDir = el.dir;
    el.lang = "ar";
    el.dir = "rtl";
    return () => {
      el.lang = prevLang || "en";
      el.dir = prevDir || "ltr";
    };
  }, []);

  return null;
}

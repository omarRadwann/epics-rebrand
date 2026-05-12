import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cream-paper": "#F5EFE2",
        "ink-black": "#1A1817",
        "saffron": "#D4801B",
        "saffron-dim": "#C97719",
        "pomegranate": "#8E2A2A",
        "pomegranate-dim": "#7E2424",
        "linen-mid": "#DCD2BD",
        "linen-deep": "#3A3631",
        "charcoal-sub": "#4A4641",
        "charcoal-soft": "#B6B0A6",
      },
      fontFamily: {
        "serif-display": ["'Untitled Serif'", "Georgia", "serif"],
        "sans": ["'Söhne'", "Inter", "system-ui", "sans-serif"],
        "mono": ["'GT America Mono'", "'JetBrains Mono'", "ui-monospace", "monospace"],
        "arabic-display": ["'29LT Bukra Bold'", "'Tajawal'", "'Noto Naskh Arabic'", "sans-serif"],
        "arabic": ["'29LT Bukra'", "'Tajawal'", "'Noto Naskh Arabic'", "sans-serif"],
      },
      fontSize: {
        "display": ["72px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "h1": ["48px", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "h2": ["32px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "subhead": ["20px", { lineHeight: "1.3" }],
        "body": ["16px", { lineHeight: "1.55" }],
        "small": ["13px", { lineHeight: "1.5", letterSpacing: "0.005em" }],
        "spec": ["12px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "lot": ["11px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      letterSpacing: {
        "spec": "0.08em",
        "lot": "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;

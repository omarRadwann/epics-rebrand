// Tailwind v4 uses a dedicated PostCSS plugin (@tailwindcss/postcss).
// Autoprefixer remains for prefixing modern CSS properties Tailwind doesn't ship a JIT for.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

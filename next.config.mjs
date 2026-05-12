// GitHub Pages serves project sites at https://<user>.github.io/<repo>/
// so we need a basePath when GH_PAGES=1 (set by the Action).
// Local dev (GH_PAGES unset) runs at / with no basePath, so dev URLs stay clean.
const isGhPages = process.env.GH_PAGES === "1";
const basePath = isGhPages ? "/epics-rebrand" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    // Exposed to client + server. Used by lib/asset.ts to prefix /public-served
    // assets (next/image with unoptimized:true does not auto-prefix basePath).
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

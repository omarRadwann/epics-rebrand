// GitHub Pages serves project sites at https://<user>.github.io/<repo>/
// so we need a basePath when GH_PAGES=1 (set by the Action).
// Local dev (GH_PAGES unset) runs at / with no basePath, so dev URLs stay clean.
const isGhPages = process.env.GH_PAGES === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(isGhPages ? { basePath: "/epics-rebrand", assetPrefix: "/epics-rebrand" } : {}),
};

export default nextConfig;

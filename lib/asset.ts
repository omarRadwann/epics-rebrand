/**
 * Prefix /public-served assets with the GitHub Pages basePath when deployed.
 * In local dev (GH_PAGES unset), this is a no-op.
 *
 * Use this for every img / Image src that references a file under /public,
 * because next/image with `unoptimized: true` does NOT auto-prefix basePath.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  if (path.startsWith(BASE) && BASE.length > 0) return path;
  return `${BASE}${path}`;
}

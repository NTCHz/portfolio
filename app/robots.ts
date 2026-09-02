import type { MetadataRoute } from "next";
import sitemap from "./sitemap";

// sitemap.ts keeps its base URL in a module-local const, so read it back out of
// the first entry (the site root) instead of duplicating the literal here.
const BASE = sitemap()[0].url;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}

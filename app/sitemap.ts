import type { MetadataRoute } from "next";
import { projects, type Project } from "@/data/projects";

const BASE = "https://portfolio.shipfold.com";

function hasDetail(p: Project): boolean {
  return Boolean(p.problem || p.images?.length || p.image);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/playground`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...projects.filter(hasDetail).map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.8 : 0.6,
    })),
  ];
}

import type { MetadataRoute } from "next";
import { getProjects, getResearch } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...getProjects().map((p) => ({
      url: `${site.url}/projects/${p.slug}/`, lastModified, changeFrequency: "monthly" as const, priority: 0.8,
    })),
    ...getResearch().map((p) => ({
      url: `${site.url}/research/${p.slug}/`, lastModified, changeFrequency: "monthly" as const, priority: 0.7,
    })),
  ];
}

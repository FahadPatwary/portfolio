import type { MetadataRoute } from "next";
import { getProjects, getResearch } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    ...getProjects().map((p) => `/projects/${p.slug}`),
    ...getResearch().map((p) => `/research/${p.slug}`),
  ];
  return pages.map((p) => ({ url: `${site.url}${p}${p ? "/" : ""}` }));
}

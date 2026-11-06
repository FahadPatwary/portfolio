import { site } from "@/lib/site";

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path}`,
  })),
});

export const pageOg = (title: string, description: string, path: string, type: "article" | "website" = "article") => ({
  title: `${title} — ${site.name}`,
  description,
  url: `${site.url}${path}`,
  siteName: site.name,
  type,
  locale: site.locale,
});

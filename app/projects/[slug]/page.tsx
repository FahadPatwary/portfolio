import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Chips from "@/components/Chips";
import MDX from "@/components/MDX";
import CaseStudy from "@/components/pustipath/CaseStudy";
import MediaPlayerCaseStudy from "@/components/mediaplayer/CaseStudy";
import { getProjects } from "@/lib/content";
import { breadcrumbLd, pageOg } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getProjects().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjects().find((x) => x.slug === slug);
  if (!p) return {};
  const path = `/projects/${slug}/`;
  return {
    title: p.title,
    description: p.summary,
    keywords: [...p.tags, p.title, "Fahad Ahmed Patwary", "Fahad Patwary"],
    alternates: { canonical: path },
    openGraph: pageOg(p.title, p.summary, path),
    twitter: { card: "summary_large_image", title: `${p.title} — ${site.name}`, description: p.summary },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProjects().find((x) => x.slug === slug);
  if (!p) notFound();

  const path = `/projects/${slug}/`;
  const ld = [
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#projects" },
      { name: p.title, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: p.title,
      description: p.summary,
      url: `${site.url}${path}`,
      applicationCategory: "DeveloperApplication",
      keywords: p.tags.join(", "),
      author: { "@id": `${site.url}/#person` },
      creator: { "@id": `${site.url}/#person` },
      sameAs: p.links?.map((l) => l.href),
    },
  ];
  const ldScript = <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;

  // Flagship projects have purpose-built case-study layouts.
  if (slug === "pustipath") return <><CaseStudy p={p} />{ldScript}</>;
  if (slug === "media-player") return <><MediaPlayerCaseStudy p={p} />{ldScript}</>;

  return (
    <article className="mx-auto max-w-[1040px] px-5 py-12">
      <Link href="/#projects" className="text-sm">← All projects</Link>
      <h1 className="mt-4 text-4xl font-bold leading-tight">{p.title}</h1>
      <p className="mt-3 max-w-[65ch] text-lg text-muted">{p.summary}</p>
      <div className="mt-4"><Chips items={p.tags} /></div>
      {p.links && (
        <div className="mt-5 flex gap-3">
          {p.links.map((l) => <a key={l.href} className="btn btn-ghost" href={l.href}>{l.label}</a>)}
        </div>
      )}
      <div className="mt-8"><MDX source={p.body} /></div>
      {ldScript}
    </article>
  );
}

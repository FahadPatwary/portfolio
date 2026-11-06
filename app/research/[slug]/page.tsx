import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Chips from "@/components/Chips";
import MDX from "@/components/MDX";
import GoosePaper from "@/components/research/Goose";
import GreenAIPaper from "@/components/research/GreenAI";
import MalnutritionPaper from "@/components/research/Malnutrition";
import { getResearch } from "@/lib/content";
import { breadcrumbLd, pageOg } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getResearch().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getResearch().find((x) => x.slug === slug);
  if (!p) return {};
  const path = `/research/${slug}/`;
  return {
    title: p.title,
    description: p.summary,
    keywords: [...p.tags, p.title, "Fahad Ahmed Patwary", "Fahad Patwary", "research"],
    alternates: { canonical: path },
    openGraph: pageOg(p.title, p.summary, path),
    twitter: { card: "summary_large_image", title: `${p.title} — ${site.name}`, description: p.summary },
  };
}

export default async function ResearchPage({ params }: Props) {
  const { slug } = await params;
  const p = getResearch().find((x) => x.slug === slug);
  if (!p) notFound();

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: p.title,
      description: p.summary,
      author: { "@id": `${site.url}/#person` },
      keywords: p.tags.join(", "),
      url: `${site.url}/research/${p.slug}/`,
      inLanguage: "en",
    },
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Research", path: "/#research" },
      { name: p.title, path: `/research/${p.slug}/` },
    ]),
  ];

  const custom: Record<string, React.ReactNode> = {
    "green-ai": <GreenAIPaper />,
    "goose-ids": <GoosePaper />,
    malnutrition: <MalnutritionPaper />,
  };
  if (custom[slug]) {
    return (
      <>
        {custom[slug]}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </>
    );
  }

  return (
    <article className="mx-auto max-w-[1040px] px-5 py-12">
      <Link href="/#research" className="text-sm">← All research</Link>
      <h1 className="mt-4 text-4xl font-bold leading-tight">{p.title}</h1>
      <p className="mt-3 text-3xl font-bold text-navy">
        {p.metric} <span className="text-base font-normal text-muted">{p.metricLabel}</span>
      </p>
      {p.status && <p className="mt-1 text-sm text-muted">Status: {p.status}</p>}
      <div className="mt-4"><Chips items={p.tags} /></div>
      {p.pdf && <a className="btn btn-primary mt-5" href={p.pdf}>Read the PDF</a>}
      <div className="mt-8"><MDX source={p.body} /></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </article>
  );
}

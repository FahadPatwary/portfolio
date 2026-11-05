import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Chips from "@/components/Chips";
import MDX from "@/components/MDX";
import { getResearch } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getResearch().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getResearch().find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary, alternates: { canonical: `/research/${slug}/` } } : {};
}

export default async function ResearchPage({ params }: Props) {
  const { slug } = await params;
  const p = getResearch().find((x) => x.slug === slug);
  if (!p) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: p.title,
    description: p.summary,
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: p.tags.join(", "),
    url: `${site.url}/research/${p.slug}/`,
  };

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

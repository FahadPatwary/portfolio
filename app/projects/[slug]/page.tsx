import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Chips from "@/components/Chips";
import MDX from "@/components/MDX";
import { getProjects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getProjects().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjects().find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary, alternates: { canonical: `/projects/${slug}/` } } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProjects().find((x) => x.slug === slug);
  if (!p) notFound();

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
    </article>
  );
}

import Link from "next/link";
import ArchDiagram from "./ArchDiagram";
import Chips from "./Chips";
import type { Entry } from "@/lib/content";

export default function ProjectCard({ p }: { p: Entry }) {
  const big = p.featured;
  return (
    <article className={`card card-hover flex h-full flex-col gap-3 p-5 ${big ? "md:col-span-2 md:p-7" : ""}`}>
      {big && <p className="eyebrow">Featured project</p>}
      {p.metric && (
        <p className="text-[2rem] font-extrabold leading-none text-navy">
          {p.metric} <span className="text-base font-normal text-muted">{p.metricLabel}</span>
        </p>
      )}
      <h3 className={`${big ? "text-2xl sm:text-3xl" : "text-xl"} font-bold`}>
        <Link href={`/projects/${p.slug}/`} className="text-navy no-underline hover:text-accent">{p.title}</Link>
      </h3>
      <p className="max-w-[65ch] text-muted">{p.summary}</p>
      {big && <ArchDiagram />}
      <Chips items={p.tags} />
      <div className="mt-auto flex gap-5 border-t border-line pt-4 text-sm font-semibold">
        <Link href={`/projects/${p.slug}/`}>{big ? "Read the case study →" : "Details →"}</Link>
        {p.links?.map((l) => <a key={l.href} href={l.href}>{l.label} ↗</a>)}
      </div>
    </article>
  );
}

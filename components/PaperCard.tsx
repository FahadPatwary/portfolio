import Link from "next/link";
import Chips from "./Chips";
import type { Entry } from "@/lib/content";

export default function PaperCard({ p, i }: { p: Entry; i: number }) {
  return (
    <article className="card card-hover flex h-full flex-col gap-3 p-5">
      <p className="eyebrow">Paper 0{i + 1}</p>
      <p className="text-[2rem] font-extrabold leading-none text-navy">{p.metric}</p>
      <p className="-mt-1 text-sm text-muted">{p.metricLabel}</p>
      <h3 className="mt-2 text-lg font-semibold leading-snug">
        <Link href={`/research/${p.slug}/`} className="text-navy no-underline hover:text-accent">{p.title}</Link>
      </h3>
      <Chips items={p.tags} />
      <div className="mt-auto flex gap-5 border-t border-line pt-4 text-sm font-semibold">
        {p.pdf && <a href={p.pdf}>PDF ↓</a>}
        <Link href={`/research/${p.slug}/`}>Details →</Link>
      </div>
    </article>
  );
}

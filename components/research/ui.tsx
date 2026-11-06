import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Chips from "../Chips";

/* ---------- Hero ---------- */
export function PaperHero({
  kicker, title, authors, status, abstract, tags, stats, color, colors,
}: {
  kicker: string; title: string; authors: string; status: string; abstract: string; tags: string[];
  stats: { v: string; l: string; c: string }[]; color: string; colors: [string, string, string];
}) {
  const [a, b, c] = colors;
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden="true" className="absolute inset-0 opacity-70"
        style={{ background: `radial-gradient(45% 55% at 12% 8%, ${a}40, transparent 70%), radial-gradient(40% 50% at 88% 18%, ${b}33, transparent 70%), radial-gradient(40% 50% at 55% 100%, ${c}2e, transparent 70%)` }}
      />
      <div className="relative mx-auto max-w-[1040px] px-5 pb-10 pt-10 sm:pt-14">
        <Link href="/#research" className="text-sm">← All research</Link>
        <p className="eyebrow mt-5" style={{ color }}>{kicker}</p>
        <h1 className="mt-1.5 max-w-[26ch] text-3xl font-extrabold leading-tight sm:text-[2.6rem] sm:leading-[1.1]">{title}</h1>
        <p className="mt-3 text-sm text-muted">{authors}</p>
        <p className="mt-1.5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: c }} />{status}
        </p>
        <p className="mt-5 max-w-[70ch] text-lg text-muted">{abstract}</p>
        <div className="mt-5"><Chips items={tags} /></div>
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-xl border border-line bg-surface p-3.5" style={{ borderBottom: `3px solid ${s.c}` }}>
              <dd className="text-2xl font-extrabold leading-none text-navy">{s.v}</dd>
              <dt className="mt-1.5 text-xs leading-snug text-muted">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

/* ---------- Cards / callouts ---------- */
export function Tile({ icon: Icon, c, size = 40 }: { icon: LucideIcon; c: string; size?: number }) {
  return (
    <span className="mb-3 grid shrink-0 place-items-center rounded-xl" style={{ width: size, height: size, background: `color-mix(in srgb, ${c} 16%, transparent)`, color: c }}>
      <Icon size={size * 0.5} strokeWidth={1.9} aria-hidden="true" />
    </span>
  );
}

export function InfoCard({ icon, c, title, children }: { icon: LucideIcon; c: string; title: string; children: React.ReactNode }) {
  return (
    <div className="card card-hover h-full p-4 sm:p-5" style={{ borderTop: `3px solid ${c}` }}>
      <Tile icon={icon} c={c} />
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{children}</p>
    </div>
  );
}

export function Callout({ c, icon: Icon, title, children }: { c: string; icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <div role="note" className="flex items-start gap-3 rounded-xl border p-4 text-sm" style={{ borderColor: `${c}66`, background: `${c}14` }}>
      <Icon size={18} className="mt-0.5 shrink-0" style={{ color: c }} aria-hidden="true" />
      <div className="text-ink"><p className="font-semibold">{title}</p><p className="mt-0.5 text-muted">{children}</p></div>
    </div>
  );
}

/* ---------- Charts ---------- */
export type Bar = { label: string; value: number; display?: string; color?: string; note?: string; strong?: boolean };

/** Horizontal bar list. `min`/`max` set the axis so bars stay honest. */
export function BarList({ rows, max, min = 0, color, title, caption }: { rows: Bar[]; max: number; min?: number; color: string; title: string; caption?: string }) {
  return (
    <figure className="card p-4 sm:p-5">
      <figcaption className="mb-4"><span className="text-base font-semibold text-navy">{title}</span>{caption && <span className="mt-0.5 block text-xs text-muted">{caption}</span>}</figcaption>
      <ul className="space-y-3.5">
        {rows.map((r) => {
          const w = Math.max(1.5, ((r.value - min) / (max - min)) * 100);
          return (
            <li key={r.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className={r.strong ? "font-semibold text-navy" : "text-ink"}>{r.label}</span>
                <span className="font-mono text-xs text-navy">{r.display ?? r.value}</span>
              </div>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-surface2" role="img" aria-label={`${r.label}: ${r.display ?? r.value}`}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, w)}%`, background: r.color ?? color, opacity: r.strong === false ? 0.55 : 1 }} />
              </div>
              {r.note && <p className="mt-0.5 text-xs text-muted">{r.note}</p>}
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

/** Grouped horizontal bars: one row per group, one bar per series. */
export function GroupedBars({
  groups, series, max = 1, min = 0, title, caption, fmt = (v: number) => v.toFixed(3),
}: {
  groups: { name: string; values: number[]; strong?: boolean }[]; series: { label: string; color: string }[];
  max?: number; min?: number; title: string; caption?: string; fmt?: (v: number) => string;
}) {
  return (
    <figure className="card p-4 sm:p-5">
      <figcaption className="mb-3">
        <span className="text-base font-semibold text-navy">{title}</span>
        {caption && <span className="mt-0.5 block text-xs text-muted">{caption}</span>}
      </figcaption>
      <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {series.map((s) => <li key={s.label} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />{s.label}</li>)}
      </ul>
      <ul className="space-y-4">
        {groups.map((g) => (
          <li key={g.name}>
            <p className={`mb-1 text-sm ${g.strong ? "font-semibold text-navy" : "text-ink"}`}>{g.name}</p>
            <div className="space-y-1">
              {g.values.map((v, i) => (
                <div key={i} className="grid grid-cols-[minmax(0,1fr)_3.6rem] items-center gap-2">
                  <div className="h-2 overflow-hidden rounded-full bg-surface2"><div className="h-full rounded-full" style={{ width: `${Math.max(1, ((v - min) / (max - min)) * 100)}%`, background: series[i].color }} /></div>
                  <span className="text-right font-mono text-xs text-muted">{fmt(v)}</span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** Simple labelled scatter plot. */
export function Scatter({
  points, xLabel, yLabel, xDomain, yDomain, title, caption, goodCorner,
}: {
  points: { label: string; x: number; y: number; color: string; big?: boolean; dx?: number; dy?: number; end?: boolean }[];
  xLabel: string; yLabel: string; xDomain: [number, number]; yDomain: [number, number]; title: string; caption?: string; goodCorner?: string;
}) {
  const W = 560, H = 340, L = 54, R = 16, T = 14, B = 46;
  const sx = (x: number) => L + ((x - xDomain[0]) / (xDomain[1] - xDomain[0])) * (W - L - R);
  const sy = (y: number) => H - B - ((y - yDomain[0]) / (yDomain[1] - yDomain[0])) * (H - T - B);
  const ticks = (d: [number, number], n: number) => Array.from({ length: n + 1 }, (_, i) => d[0] + ((d[1] - d[0]) * i) / n);
  return (
    <figure className="card p-4 sm:p-5">
      <figcaption className="mb-2"><span className="text-base font-semibold text-navy">{title}</span>{caption && <span className="mt-0.5 block text-xs text-muted">{caption}</span>}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={title}>
        {ticks(yDomain, 4).map((t) => (
          <g key={`y${t}`}><line x1={L} x2={W - R} y1={sy(t)} y2={sy(t)} stroke="var(--border)" strokeDasharray="3 4" /><text x={L - 8} y={sy(t) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{Math.round(t)}</text></g>
        ))}
        {ticks(xDomain, 4).map((t) => (
          <g key={`x${t}`}><line y1={T} y2={H - B} x1={sx(t)} x2={sx(t)} stroke="var(--border)" strokeDasharray="3 4" /><text x={sx(t)} y={H - B + 16} textAnchor="middle" fontSize="11" fill="var(--muted)">{t.toFixed(2)}</text></g>
        ))}
        <text x={(L + W - R) / 2} y={H - 6} textAnchor="middle" fontSize="12" fill="var(--muted)">{xLabel}</text>
        <text transform={`translate(13 ${(T + H - B) / 2}) rotate(-90)`} textAnchor="middle" fontSize="12" fill="var(--muted)">{yLabel}</text>
        {goodCorner && <text x={L + 8} y={T + 14} fontSize="11" fill="var(--accent)" fontWeight="600">{goodCorner}</text>}
        {points.map((p) => (
          <g key={p.label}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r={p.big ? 9 : 6} fill={p.color} fillOpacity={p.big ? 1 : 0.85} stroke="var(--surface)" strokeWidth="2" />
            <text x={sx(p.x) + (p.end ? -(p.dx ?? 12) : p.dx ?? 11)} y={sy(p.y) + (p.dy ?? 4)} textAnchor={p.end ? "end" : "start"} fontSize="11.5" fill="var(--text)" fontWeight={p.big ? 700 : 500}>{p.label}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/** 2x2 confusion matrix. */
export function Confusion({ tp, fp, tn, fn, c, title }: { tp: number; fp: number; tn: number; fn: number; c: string; title: string }) {
  const cell = (v: number, label: string, good: boolean) => (
    <div className="rounded-lg p-3 text-center" style={{ background: good ? `${c}26` : "rgba(244,63,94,.12)", border: `1px solid ${good ? c + "66" : "rgba(244,63,94,.4)"}` }}>
      <p className="text-2xl font-extrabold text-navy">{v}</p><p className="text-xs text-muted">{label}</p>
    </div>
  );
  return (
    <figure className="card p-4 sm:p-5">
      <figcaption className="mb-3 text-base font-semibold text-navy">{title}</figcaption>
      <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-2 text-xs text-muted">
        <span /><span className="text-center">Predicted abnormal</span><span className="text-center">Predicted normal</span>
        <span className="[writing-mode:vertical-rl] rotate-180 text-center">Truly abnormal</span>{cell(tp, "true positive", true)}{cell(fn, "false negative", false)}
        <span className="[writing-mode:vertical-rl] rotate-180 text-center">Truly normal</span>{cell(fp, "false positive", false)}{cell(tn, "true negative", true)}
      </div>
    </figure>
  );
}

/** Responsive data table with an optional highlighted row. */
export function DataTable({ head, rows, hi, title, caption }: { head: string[]; rows: (string | number)[][]; hi?: number; title?: string; caption?: string }) {
  return (
    <figure className="card overflow-hidden">
      {(title || caption) && (
        <figcaption className="px-4 pt-4 sm:px-5">
          {title && <span className="text-base font-semibold text-navy">{title}</span>}
          {caption && <span className="mt-0.5 block text-xs text-muted">{caption}</span>}
        </figcaption>
      )}
      <div className="overflow-x-auto p-2 sm:p-3">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead><tr>{head.map((h, i) => <th key={h} className={`border-b border-line px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted ${i ? "text-right" : ""}`}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className={ri === hi ? "bg-accent/10 font-semibold text-navy" : ""}>
                {r.map((c, ci) => <td key={ci} className={`border-b border-line/60 px-3 py-2 ${ci ? "text-right font-mono text-xs" : ""}`}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/** Left-to-right process flow. */
export function Flow({ steps }: { steps: { icon: LucideIcon; title: string; desc: string; c: string }[] }) {
  return (
    <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center">
          <div className="h-full flex-1 rounded-xl border border-line bg-surface p-4" style={{ borderTop: `3px solid ${s.c}` }}>
            <Tile icon={s.icon} c={s.c} size={36} />
            <p className="text-sm font-semibold text-navy">{s.title}</p>
            <p className="mt-0.5 text-xs text-muted">{s.desc}</p>
          </div>
          {i < steps.length - 1 && <ArrowRight aria-hidden="true" className="mx-auto shrink-0 rotate-90 text-muted lg:rotate-0" size={18} />}
        </li>
      ))}
    </ol>
  );
}

export function Lede({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 max-w-[70ch] text-muted">{children}</p>;
}

export function Bullets({ items, c }: { items: string[]; c: string }) {
  return (
    <ul className="space-y-2 text-sm text-muted">
      {items.map((x) => <li key={x} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c }} />{x}</li>)}
    </ul>
  );
}

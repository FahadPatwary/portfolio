"use client";
import { useState } from "react";

// Decision rule documented in the PustiPath SRS (Algorithms Used) and tuned on DHS-8 in the paper.
const conditions = [
  { id: "stunting", name: "Stunting", note: "low height-for-age", t: 0.46 },
  { id: "underweight", name: "Underweight", note: "low weight-for-age", t: 0.47 },
  { id: "wasting", name: "Wasting", note: "low weight-for-height", t: 0.37 },
] as const;

type Probs = Record<(typeof conditions)[number]["id"], number>;

const presets: { label: string; p: Probs }[] = [
  { label: "Low risk", p: { stunting: 0.12, underweight: 0.18, wasting: 0.08 } },
  { label: "One flag", p: { stunting: 0.49, underweight: 0.2, wasting: 0.1 } },
  { label: "High risk", p: { stunting: 0.62, underweight: 0.55, wasting: 0.52 } },
];

const tone = {
  green: { name: "Green", text: "No condition crosses its threshold.", dot: "bg-[#16a34a]", ring: "border-[#16a34a]" },
  yellow: { name: "Yellow", text: "At least one condition is flagged. Follow-up recommended.", dot: "bg-[#f59e0b]", ring: "border-[#f59e0b]" },
  red: { name: "Red", text: "A probability is 20% or more above its threshold. The CHW and mother are notified.", dot: "bg-[#dc2626]", ring: "border-[#dc2626]" },
} as const;

export default function ScreeningDemo() {
  const [p, setP] = useState<Probs>(presets[1].p);

  const flagged = conditions.filter((c) => p[c.id] >= c.t);
  const high = conditions.some((c) => p[c.id] >= c.t * 1.2);
  const level: keyof typeof tone = high ? "red" : flagged.length ? "yellow" : "green";
  const score = Math.max(...conditions.map((c) => p[c.id]));
  const r = tone[level];

  return (
    <div className="card grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Try a case:</span>
          {presets.map((x) => (
            <button
              key={x.label}
              type="button"
              onClick={() => setP(x.p)}
              className="rounded-full border border-line bg-surface2 px-3 py-1 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {x.label}
            </button>
          ))}
        </div>

        <ul className="space-y-5">
          {conditions.map((c) => {
            const v = p[c.id];
            const on = v >= c.t;
            return (
              <li key={c.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <label htmlFor={`p-${c.id}`} className="text-sm font-semibold text-navy">
                    {c.name} <span className="font-normal text-muted">· {c.note}</span>
                  </label>
                  <span className={`font-mono text-sm ${on ? "font-semibold text-accent" : "text-muted"}`}>{Math.round(v * 100)}%</span>
                </div>
                <div className="relative mt-2">
                  <input
                    id={`p-${c.id}`}
                    type="range" min={0} max={100} step={1}
                    value={Math.round(v * 100)}
                    onChange={(e) => setP({ ...p, [c.id]: Number(e.target.value) / 100 })}
                    className="h-6 w-full cursor-pointer accent-[var(--accent)]"
                    aria-describedby={`t-${c.id}`}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-0.5 h-3 w-0.5 rounded bg-navy/70"
                    style={{ left: `calc(${c.t * 100}% + ${8 - c.t * 16}px)` }}
                  />
                </div>
                <p id={`t-${c.id}`} className="mt-0.5 text-xs text-muted">
                  Threshold {c.t.toFixed(2)} · red from {(c.t * 1.2).toFixed(2)}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-xs text-muted">
          Each probability comes from one on-device ONNX model. This demo reproduces only the decision rule, with thresholds optimised on the
          Bangladesh DHS-8 data. It is not a clinical tool.
        </p>
      </div>

      <div
        aria-live="polite"
        className={`order-first flex flex-col justify-center rounded-2xl border-2 bg-surface2 p-5 text-center transition-colors lg:order-none ${r.ring}`}
      >
        <span className={`mx-auto mb-3 block h-14 w-14 rounded-full ${r.dot} shadow-[0_0_0_8px_var(--accent-soft)]`} />
        <p className="text-xl font-bold text-navy">{r.name}</p>
        <p className="mt-1 text-sm text-muted">{r.text}</p>
        <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4 text-left text-sm">
          <dt className="text-muted">Overall score</dt>
          <dd className="text-right font-mono font-semibold text-navy">{score.toFixed(2)}</dd>
          <dt className="text-muted">Flagged</dt>
          <dd className="text-right font-semibold text-navy">{flagged.length ? flagged.map((c) => c.name).join(", ") : "None"}</dd>
        </dl>
      </div>
    </div>
  );
}

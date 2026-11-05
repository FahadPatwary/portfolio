"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { skillCategories, usedIn } from "@/lib/skills";
import { SkillIcon, categoryIcons } from "@/lib/skillIcons";

const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);
const tabs = [
  { id: "all", name: "All", n: total },
  ...skillCategories.map((c) => ({ id: c.id, name: c.name, n: c.skills.length })),
];

export default function SkillsExplorer() {
  // Phones start on one category (a short list). Larger screens show everything.
  const [cat, setCat] = useState("languages");
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<{ skill: string; cat: string } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) setCat("all");
  }, []);

  const query = q.trim().toLowerCase();

  const groups = useMemo(
    () =>
      skillCategories
        .filter((c) => cat === "all" || query || c.id === cat)
        .map((c) => ({ ...c, skills: c.skills.filter((s) => !query || s.toLowerCase().includes(query)) }))
        .filter((c) => c.skills.length > 0),
    [cat, query],
  );

  const shown = groups.reduce((n, g) => n + g.skills.length, 0);
  const pickedCat = picked && skillCategories.find((c) => c.id === picked.cat);
  const evidence = picked ? usedIn[picked.skill] : undefined;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[210px_minmax(0,1fr)] md:gap-5">
      {/* Category selector: swipeable tabs on phones, a list on larger screens */}
      <div className="relative -mx-5 min-w-0 md:mx-0">
        <div
          role="group"
          aria-label="Skill categories"
          className="no-scrollbar flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 py-1 md:flex-col md:gap-1 md:scroll-px-0 md:overflow-visible md:px-0 md:py-0"
        >
          {tabs.map((c) => {
            const on = cat === c.id && !query;
            const CatIcon = categoryIcons[c.id];
            return (
              <button
                key={c.id}
                aria-pressed={on}
                onClick={() => { setCat(c.id); setQ(""); setPicked(null); }}
                className={`flex shrink-0 snap-start items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors md:justify-between md:gap-3 md:rounded-lg md:border-transparent md:px-3 ${
                  on ? "border-accent bg-accent/10 font-semibold text-accent" : "border-line bg-surface text-muted hover:text-navy md:bg-transparent md:hover:bg-surface2"
                }`}
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <CatIcon size={16} strokeWidth={1.9} aria-hidden="true" />
                  {c.name}
                </span>
                <span className="font-mono text-xs opacity-70">{c.n}</span>
              </button>
            );
          })}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-bg to-transparent md:hidden" />
      </div>

      {/* Explorer */}
      <div className="card min-w-0 p-3.5 sm:p-5">
        <label className="relative block">
          <span className="sr-only">Search skills</span>
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            type="search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${total} skills`}
            className="w-full rounded-lg border border-line bg-surface2 py-2.5 pl-9 pr-3 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none md:py-2 md:text-sm"
          />
        </label>

        <div className="mt-4 md:min-h-[15rem]">
          {groups.length === 0 && <p className="text-sm text-muted">No skills match “{q}”.</p>}
          {groups.map((g) => {
            const GI = categoryIcons[g.id];
            return (
              <div key={g.id} className="mb-5 last:mb-0">
                <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-navy">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent/10 text-accent"><GI size={14} strokeWidth={2} aria-hidden="true" /></span>
                  {g.name}
                  <span className="hidden font-normal text-muted sm:inline">· {g.blurb}</span>
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {g.skills.map((s, i) => {
                    const on = picked?.skill === s;
                    const proven = !!usedIn[s];
                    return (
                      <li key={s} className="skill-pop max-w-full" style={{ animationDelay: `${i * 35}ms` }}>
                        <button
                          aria-pressed={on}
                          onClick={() => setPicked(on ? null : { skill: s, cat: g.id })}
                          className={`skill ${on ? "skill-on" : ""}`}
                        >
                          <SkillIcon skill={s} />
                          <span>{s}</span>
                          {proven && <span aria-label="used in my projects" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Detail panel: sticks to the bottom of the screen on phones so a tap always shows a result */}
        <div
          aria-live="polite"
          className="mt-3 rounded-xl border border-line bg-surface2 p-3.5 text-sm max-md:sticky max-md:bottom-3 max-md:z-10 max-md:border-accent/40 max-md:shadow-[var(--shadow)] md:border-dashed md:p-4"
        >
          {picked && pickedCat ? (
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-navy"><SkillIcon skill={picked.skill} size={22} /></span>
              <div className="min-w-0">
                <p className="font-semibold text-navy">{picked.skill} <span className="font-normal text-muted">· {pickedCat.name}</span></p>
                {evidence ? (
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
                    Used in:
                    {evidence.map((e) => <Link key={e.label} href={e.href} className="font-semibold">{e.label} →</Link>)}
                  </p>
                ) : (
                  <p className="mt-1 text-muted">{pickedCat.blurb}</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-muted">
              <span className="md:hidden">Tap a skill for details. </span>
              <span className="hidden md:inline">Select a skill to see where I&apos;ve used it. </span>
              Showing {shown} of {total}. A <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" /> dot means it is backed by a project or paper on this site.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

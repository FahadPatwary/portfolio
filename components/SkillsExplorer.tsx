"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { skillCategories, usedIn } from "@/lib/skills";
import { SkillIcon, categoryIcons } from "@/lib/skillIcons";

const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);

export default function SkillsExplorer() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<{ skill: string; cat: string } | null>(null);

  const query = q.trim().toLowerCase();

  const groups = useMemo(() => {
    return skillCategories
      .filter((c) => cat === "all" || query || c.id === cat)
      .map((c) => ({ ...c, skills: c.skills.filter((s) => !query || s.toLowerCase().includes(query)) }))
      .filter((c) => c.skills.length > 0);
  }, [cat, query]);

  const shown = groups.reduce((n, g) => n + g.skills.length, 0);
  const pickedCat = picked && skillCategories.find((c) => c.id === picked.cat);
  const evidence = picked ? usedIn[picked.skill] : undefined;

  return (
    <div className="grid gap-5 md:grid-cols-[210px_1fr]">
      {/* Category rail */}
      <div>
        <div role="group" aria-label="Skill categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0 md:pb-0">
          {[{ id: "all", name: "All skills", n: total }, ...skillCategories.map((c) => ({ id: c.id, name: c.name, n: c.skills.length }))].map((c) => {
            const on = cat === c.id && !query;
            const CatIcon = categoryIcons[c.id];
            return (
              <button
                key={c.id}
                aria-pressed={on}
                onClick={() => { setCat(c.id); setQ(""); }}
                className={`flex shrink-0 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors md:border-transparent ${
                  on ? "border-accent bg-accent/10 font-semibold text-accent" : "border-line text-muted hover:text-navy md:hover:bg-surface2"
                }`}
              >
                <span className="flex items-center gap-2.5 whitespace-nowrap"><CatIcon size={16} strokeWidth={1.9} aria-hidden="true" />{c.name}</span>
                <span className="font-mono text-xs opacity-70">{c.n}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explorer */}
      <div className="card p-4 sm:p-5">
        <label className="relative block">
          <span className="sr-only">Search skills</span>
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            type="search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${total} skills…  try “test”, “react”, “docker”`}
            className="w-full rounded-lg border border-line bg-surface2 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </label>

        <div className="mt-4 min-h-[15rem]">
          {groups.length === 0 && <p className="text-sm text-muted">No skills match “{q}”.</p>}
          {groups.map((g) => (
            <div key={g.id} className="mb-4 last:mb-0">
              {(() => {
                const GI = categoryIcons[g.id];
                return (
                  <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-navy">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-accent/10 text-accent"><GI size={14} strokeWidth={2} aria-hidden="true" /></span>
                    {g.name}
                    <span className="font-normal text-muted">· {g.blurb}</span>
                  </h3>
                );
              })()}
              <ul className="flex flex-wrap gap-2">
                {g.skills.map((s, i) => {
                  const on = picked?.skill === s;
                  const proven = !!usedIn[s];
                  return (
                    <li key={s} className="skill-pop" style={{ animationDelay: `${i * 35}ms` }}>
                      <button
                        aria-pressed={on}
                        onClick={() => setPicked(on ? null : { skill: s, cat: g.id })}
                        className={`skill ${on ? "skill-on" : ""}`}
                      >
                        <SkillIcon skill={s} />
                        {s}
                        {proven && <span aria-label="used in my projects" className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div aria-live="polite" className="mt-4 rounded-xl border border-dashed border-line bg-surface2 p-4 text-sm">
          {picked && pickedCat ? (
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-navy"><SkillIcon skill={picked.skill} size={24} /></span>
              <div>
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
              Showing {shown} of {total}. Select a skill to see where I&apos;ve used it. A <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" /> dot means it&apos;s backed by a project or paper on this site.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

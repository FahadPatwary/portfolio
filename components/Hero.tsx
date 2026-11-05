import Image from "next/image";
import { site } from "@/lib/site";
import Chips from "./Chips";

export default function Hero({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-bg absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1040px] items-center gap-10 px-5 pb-12 pt-10 sm:pt-14 md:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-accent" /> Open to SWE, SQA &amp; R&amp;D roles
          </p>
          <h1 className="mt-4 text-[2.25rem] font-extrabold leading-[1.08] sm:text-5xl">
            Fahad Ahmed <span className="text-accent">Patwary</span>
          </h1>
          <p className="mt-3 text-xl font-semibold text-navy">
            Software Engineer <span className="font-normal text-muted">·</span>{" "}
            <span className="font-medium text-muted">ML Researcher</span>
          </p>
          <p className="mt-3 max-w-[54ch] text-muted">
            I design and test software that works where the internet does not, and I research how to make deep
            learning smaller, faster and greener.
          </p>
          <div className="mt-4"><Chips items={site.tags} /></div>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
            <a className="btn btn-primary col-span-2 sm:col-auto" href={site.cv} download="Fahad_Ahmed_Patwary_CV.pdf">
              Download CV
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" /></svg>
            </a>
            <a className="btn btn-ghost" href="#projects">See projects</a>
            <a className="btn btn-ghost" href={site.github}>GitHub</a>
            <a className="btn btn-ghost" href={site.linkedin}>LinkedIn</a>
            <a className="btn btn-ghost" href={`mailto:${site.email}`}>Email</a>
          </div>

          <dl className="mt-7 grid max-w-md grid-cols-3 gap-5 border-t border-line pt-5">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-xl font-bold text-navy">{s.value}</dd>
                <p className="text-xs leading-snug text-muted" aria-hidden="true">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px] md:max-w-[290px] md:justify-self-end">
          <div aria-hidden="true" className="absolute -right-2.5 -top-2.5 h-full w-full rounded-3xl border-2 border-accent/60" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow)]">
            <Image
              src="/fahad.webp" alt="Portrait of Fahad Ahmed Patwary in a black suit and glasses"
              width={900} height={1125} priority unoptimized
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="float card absolute -bottom-4 -left-4 px-3.5 py-2 sm:-left-8">
            <p className="text-[11px] text-muted">United International University</p>
            <p className="text-sm font-semibold text-navy">B.Sc. in Computer Science & Engineering</p>
          </div>
        </div>
      </div>
    </section>
  );
}

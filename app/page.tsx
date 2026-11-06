import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PaperCard from "@/components/PaperCard";
import ProjectCard from "@/components/ProjectCard";
import SkillsExplorer from "@/components/SkillsExplorer";
import TechMarquee from "@/components/TechMarquee";
import CodeCard from "@/components/CodeCard";
import { getProjects, getResearch } from "@/lib/content";
import CertCard from "@/components/CertCard";
import Chips from "@/components/Chips";
import { certifications } from "@/lib/certs";
import { site } from "@/lib/site";

export default function Home() {
  const research = getResearch();
  const projects = getProjects();
  // Software-first: lead with what was built, then the academic record.
  const stats = [
    { value: "3", label: "on-device ONNX models in PustiPath" },
    { value: "3", label: "first-author research papers" },
    { value: "UIU", label: "B.Sc. in Computer Science & Engineering" },
  ];

  return (
    <>
      <Hero stats={stats} />
      <TechMarquee />

      <Section id="about" n="01" eyebrow="About" title="Software that works where the internet doesn't">
        <div className="grid items-start gap-6 md:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="max-w-[62ch]">
              Hi, I am Fahad Patwary, a software engineer from Dhaka, Bangladesh. My flagship project, PustiPath, puts AI malnutrition screening on the Android phones of community
              health workers in Bangladesh, fully offline. I designed the system and led the research behind it,
              used AI assistance to write much of the code, and backed it with automated unit, access-control
              and end-to-end tests.
            </p>
            <p className="mt-3 max-w-[62ch] text-muted">
              I am a Computer Science &amp; Engineering graduate of United International University and the first
              author of three research manuscripts, on energy-efficient transformers, smart-grid intrusion
              detection and child-malnutrition screening.
            </p>
          </Reveal>
          <Reveal delay={100}><CodeCard /></Reveal>
        </div>
      </Section>

      <Section id="projects" n="02" eyebrow="Projects" title="Software I've designed and shipped">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className={`h-full ${p.featured ? "md:col-span-2" : ""}`}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="research" n="03" eyebrow="Research" title="Research, measured">
        <div className="grid gap-4 md:grid-cols-3">
          {research.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80} className="h-full"><PaperCard p={p} i={i} /></Reveal>
          ))}
        </div>
      </Section>

      <Section id="skills" n="04" eyebrow="Skills" title="The toolkit">
        <Reveal><SkillsExplorer /></Reveal>
      </Section>

      <Section id="education" n="05" eyebrow="Education" title="Education">
        <ol className="relative max-w-[760px] space-y-4 border-l border-line pl-5 sm:pl-7">
          {site.education.map((e, i) => (
            <li key={e.level} className="relative">
              <span aria-hidden="true" className="absolute -left-[1.62rem] top-5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg sm:-left-[2.1rem]" />
              <Reveal delay={i * 80}>
                <div className="card p-4 sm:p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-semibold">{e.level}</h3>
                    <p className="font-mono text-xs text-muted">{e.years}</p>
                  </div>
                  <p className="text-muted">{e.school}</p>
                  {e.result && <p className="mt-1 text-sm font-semibold text-accent">{e.result}</p>}
                  {e.coursework && <div className="mt-3"><Chips items={e.coursework} /></div>}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="certifications" n="06" eyebrow="Certifications" title="Licenses &amp; certifications">
        <div className="grid gap-4 md:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className="h-full"><CertCard c={c} /></Reveal>
          ))}
        </div>
      </Section>

      <section id="contact" aria-labelledby="contact-h" className="mx-auto max-w-[1040px] px-5 py-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-10 text-center text-on-navy sm:px-10 sm:py-12">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
            <p className="eyebrow relative !text-on-navy/70">07 / Contact</p>
            <h2 id="contact-h" className="relative mx-auto mt-2 max-w-[24ch] text-2xl font-extrabold !text-on-navy sm:text-3xl">
              Let&apos;s build something useful.
            </h2>
            <p className="relative mx-auto mt-3 max-w-[52ch] text-sm text-on-navy/80">
              I am looking for software engineering, SQA and R&amp;D internships and entry-level roles. If you are hiring, I would love to talk.
            </p>
            <div className="relative mt-6 flex flex-wrap justify-center gap-2.5">
              <a className="btn !border-on-navy !bg-on-navy !text-navy" href={`mailto:${site.email}`}>{site.email}</a>
              <a className="btn !border-on-navy/40 !bg-transparent !text-on-navy" href={site.cv} download="Fahad_Ahmed_Patwary_CV.pdf">Download CV</a>
              <a className="btn !border-on-navy/40 !bg-transparent !text-on-navy" href={site.linkedin}>LinkedIn</a>
              <a className="btn !border-on-navy/40 !bg-transparent !text-on-navy" href={site.github}>GitHub</a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

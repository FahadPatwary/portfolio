import Reveal from "./Reveal";

export default function Section({
  id, n, eyebrow, title, children,
}: { id: string; n: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mx-auto max-w-[1040px] px-5 py-12">
      <Reveal>
        <p className="eyebrow">{n} / {eyebrow}</p>
        <h2 id={`${id}-h`} className="mb-6 mt-1.5 text-2xl font-bold sm:text-[1.75rem]">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

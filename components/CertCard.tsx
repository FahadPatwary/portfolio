import { Award, BadgeCheck, FileText } from "lucide-react";
import Chips from "./Chips";
import type { Cert } from "@/lib/certs";

export default function CertCard({ c }: { c: Cert }) {
  return (
    <article className="card card-hover flex h-full flex-col gap-3 p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
          <Award size={20} strokeWidth={1.9} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-base font-semibold leading-snug">{c.title}</h3>
          <p className="text-sm text-muted">{c.issuer} · Issued {c.issued}</p>
        </div>
      </div>
      <Chips items={c.skills} />
      {(c.url || c.verifyUrl || c.file) && (
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 text-sm font-semibold">
          {c.verifyUrl && (
            <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
              <BadgeCheck size={16} aria-hidden="true" /> Verified badge ↗
            </a>
          )}
          {c.file && (
            <a href={c.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
              <FileText size={16} aria-hidden="true" /> Certificate PDF
            </a>
          )}
          {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer">View credential ↗</a>}
        </div>
      )}
    </article>
  );
}

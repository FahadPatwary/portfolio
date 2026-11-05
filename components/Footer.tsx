import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1040px] flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-muted">
        <p>© {new Date().getFullYear()} {site.name}. Built with Next.js &amp; Tailwind CSS.</p>
        <p className="flex gap-5">
          <a href={site.github}>GitHub</a>
          <a href={site.linkedin}>LinkedIn</a>
          <a href={`mailto:${site.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  ["about", "About"],
  ["projects", "Projects"],
  ["research", "Research"],
  ["skills", "Skills"],
  ["contact", "Contact"],
] as const;

export default function Nav({ cv }: { cv: string }) {
  const home = usePathname() === "/";
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!home) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [home]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-lg">
      <nav aria-label="Main" className="mx-auto flex max-w-[1040px] items-center justify-between gap-3 px-5 py-2">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-navy no-underline">
          <Image src="/fahad-icon.webp" alt="" width={32} height={32} unoptimized className="h-8 w-8 rounded-full border border-line object-cover" />
          <span className="hidden sm:inline">Fahad Ahmed Patwary</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <Link
                href={`/#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm no-underline transition-colors ${
                  active === id ? "bg-accent/10 font-semibold text-accent" : "text-muted hover:text-navy"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={cv} className="btn btn-primary !px-4 !py-1.5 !text-sm">CV</a>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-navy md:hidden"
            aria-label="Menu" aria-expanded={open} aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line bg-bg px-5 py-2 md:hidden">
          {links.map(([id, label]) => (
            <li key={id}>
              <Link href={`/#${id}`} onClick={() => setOpen(false)} className="block py-2 text-ink no-underline">{label}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

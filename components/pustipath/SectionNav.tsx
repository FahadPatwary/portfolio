"use client";
import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

/** Sticky in-page navigation. Swipeable on phones; highlights the section in view. */
export default function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className="sticky top-[53px] z-20 border-y border-line bg-bg/85 backdrop-blur">
      <ul className="no-scrollbar mx-auto flex max-w-[1040px] gap-1 overflow-x-auto px-5 py-2">
        {items.map((i) => (
          <li key={i.id} className="shrink-0">
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={`block rounded-full px-3 py-1 text-sm no-underline transition-colors ${
                active === i.id ? "bg-accent/10 font-semibold text-accent" : "text-muted hover:text-navy"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

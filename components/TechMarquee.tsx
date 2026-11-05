const stack = [
  "Next.js", "TypeScript", "Firebase", "ONNX Runtime", "Tailwind CSS", "Python",
  "Selenium", "Appium", "pytest", "PyTorch", "Socket.IO",
];

/** Decorative scrolling stack strip. Hidden from assistive tech; the Skills section has the real list. */
export default function TechMarquee() {
  const row = (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {stack.map((t) => (
        <li key={t} className="font-mono text-sm text-muted">
          <span className="mr-8 text-accent">/</span>{t}
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden="true" className="marquee overflow-hidden border-y border-line bg-surface/60 py-3">
      <div className="marquee-track">{row}{row}</div>
    </div>
  );
}

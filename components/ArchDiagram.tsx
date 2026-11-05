const nodes = [
  { t: "Flutter app", d: "Bengali-first UI" },
  { t: "ONNX Runtime", d: "3 on-device models" },
  { t: "Firebase", d: "Auth · Firestore · Functions · FCM · Storage" },
  { t: "Next.js dashboard", d: "Admin & monitoring" },
];

export default function ArchDiagram() {
  return (
    <figure className="mt-2">
      <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
        {nodes.map((n, i) => (
          <li key={n.t} className="flex flex-1 flex-col items-stretch gap-2 lg:flex-row lg:items-center">
            <div className={`flex-1 rounded-xl border px-4 py-3 ${i === 1 ? "border-accent bg-accent/10" : "border-line bg-surface2"}`}>
              <p className="text-sm font-semibold text-navy">{n.t}</p>
              <p className="text-xs text-muted">{n.d}</p>
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden="true" className="self-center text-accent lg:px-0.5">
                <span className="lg:hidden">↓</span><span className="hidden lg:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">Architecture: Flutter app, ONNX Runtime, Firebase, Next.js dashboard</figcaption>
    </figure>
  );
}

export default function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => <li key={t} className="chip">{t}</li>)}
    </ul>
  );
}

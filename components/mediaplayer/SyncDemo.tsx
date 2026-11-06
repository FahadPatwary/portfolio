"use client";
import { Gauge, Pause, Play, RotateCcw, Wifi } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TOTAL = 300; // a 5 minute demo "film"
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

type Peer = { name: string; color: string; frozen: number | null };
const initial: Peer[] = [
  { name: "Alex", color: "#0ea5e9", frozen: null },
  { name: "Sarah", color: "#ec4899", frozen: null },
  { name: "Mike", color: "#f59e0b", frozen: null },
];

export default function SyncDemo() {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(84);
  const [peers, setPeers] = useState<Peer[]>(initial);
  const [log, setLog] = useState<{ id: number; text: string; tone: string }[]>([
    { id: 0, text: "Room #8291 created. 3 friends joined.", tone: "#8b5cf6" },
  ]);
  const posRef = useRef(pos);
  const idRef = useRef(1);
  const lagTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  posRef.current = pos;

  const add = (text: string, tone: string, replaceSeek = false) =>
    setLog((l) => {
      const entry = { id: idRef.current++, text, tone };
      const base = replaceSeek && l[0]?.text.startsWith("You jumped") ? l.slice(1) : l;
      return [entry, ...base].slice(0, 5);
    });

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setPos((p) => {
        if (p + 0.25 >= TOTAL) { setPlaying(false); return TOTAL; }
        return p + 0.25;
      });
    }, 250);
    return () => clearInterval(t);
  }, [playing]);

  useEffect(() => () => { if (lagTimer.current) clearTimeout(lagTimer.current); }, []);

  const toggle = () => {
    add(`You ${playing ? "paused" : "pressed play"} at ${fmt(pos)}. Sent to 3 peers.`, playing ? "#f59e0b" : "#10b981");
    setPlaying(!playing);
  };

  const seek = (v: number) => {
    setPos(v);
    add(`You jumped to ${fmt(v)}. Everyone followed.`, "#0ea5e9", true);
  };

  const lag = () => {
    if (peers[1].frozen !== null) return;
    setPeers((ps) => ps.map((p) => (p.name === "Sarah" ? { ...p, frozen: posRef.current } : p)));
    add("Sarah's connection stalled. Buffering…", "#f43f5e");
    lagTimer.current = setTimeout(() => {
      setPeers((ps) => ps.map((p) => (p.name === "Sarah" ? { ...p, frozen: null } : p)));
      add(`Sarah caught up and rejoined at ${fmt(posRef.current)}.`, "#10b981");
    }, 2400);
  };

  const reset = () => {
    if (lagTimer.current) clearTimeout(lagTimer.current);
    setPlaying(false); setPos(84); setPeers(initial);
    setLog([{ id: idRef.current++, text: "Room reset.", tone: "#8b5cf6" }]);
  };

  const pct = (pos / TOTAL) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0f0b1f] text-[#ece9ff] shadow-[var(--shadow)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm">
          <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" /></span>
          <span className="font-mono">Room #8291</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs"><Wifi size={12} aria-hidden="true" />P2P · encrypted channel</span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="p-4 sm:p-5">
          <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl bg-[radial-gradient(circle_at_30%_20%,#4c1d95,transparent_55%),radial-gradient(circle_at_80%_80%,#9d174d,transparent_50%),#0b0818]">
            <button
              type="button" onClick={toggle} aria-label={playing ? "Pause for everyone" : "Play for everyone"}
              className="grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:scale-105 hover:bg-white/25"
            >
              {playing ? <Pause size={28} fill="currentColor" aria-hidden="true" /> : <Play size={28} fill="currentColor" className="ml-1" aria-hidden="true" />}
            </button>
            <span className="absolute left-3 top-3 rounded-md bg-black/40 px-2 py-0.5 font-mono text-xs">{playing ? "PLAYING" : "PAUSED"}</span>
            <span className="absolute bottom-3 right-3 rounded-md bg-black/40 px-2 py-0.5 font-mono text-xs">{fmt(pos)} / {fmt(TOTAL)}</span>
          </div>

          <div className="mt-4">
            <div className="relative h-6">
              <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/15" />
              <div className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400" style={{ width: `${pct}%` }} />
              <input
                type="range" min={0} max={TOTAL} step={1} value={Math.round(pos)}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Seek for everyone"
                className="absolute inset-0 h-6 w-full cursor-pointer opacity-0"
              />
              <span className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-fuchsia-500 shadow" style={{ left: `${pct}%` }} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={toggle} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:brightness-110">
                {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}{playing ? "Pause" : "Play"}
              </button>
              <button type="button" onClick={lag} disabled={peers[1].frozen !== null} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm transition hover:bg-white/20 disabled:opacity-50">
                <Gauge size={14} aria-hidden="true" />Make Sarah lag
              </button>
              <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm transition hover:bg-white/20">
                <RotateCcw size={14} aria-hidden="true" />Reset
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-4 sm:p-5 lg:border-l lg:border-t-0">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-white/60">In the room</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-500 text-sm font-bold">Y</span>
              <span className="flex-1 text-sm">You <span className="text-white/50">· host</span></span>
              <span className="font-mono text-xs">{fmt(pos)}</span>
            </li>
            {peers.map((p) => {
              const lagging = p.frozen !== null;
              return (
                <li key={p.name} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-black/80" style={{ background: p.color }}>{p.name[0]}</span>
                  <span className="flex-1 text-sm">{p.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${lagging ? "bg-rose-500/25 text-rose-200" : "bg-emerald-500/20 text-emerald-200"}`}>{lagging ? "Buffering…" : "Ready"}</span>
                  <span className="w-11 text-right font-mono text-xs">{fmt(p.frozen ?? pos)}</span>
                </li>
              );
            })}
          </ul>

          <p className="mb-2 mt-5 font-mono text-xs uppercase tracking-wider text-white/60">Activity</p>
          <ul aria-live="polite" className="space-y-1.5">
            {log.map((e) => (
              <li key={e.id} className="flex gap-2 text-xs leading-snug text-white/85">
                <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: e.tone }} />{e.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-2.5 text-xs text-white/55">
        A simulation of the idea, not the real app: one action from anyone is applied to everyone in the room.
      </p>
    </div>
  );
}

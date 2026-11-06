import Link from "next/link";
import {
  AlertTriangle, ArrowRight, Clapperboard, DoorOpen, Download, FileVideo, Film, Laptop, Link2, Lock, Monitor,
  Moon, Radio, Share2, SlidersHorizontal, Sparkles, Users, Volume2, WifiOff, type LucideIcon,
} from "lucide-react";
import Chips from "../Chips";
import Reveal from "../Reveal";
import Section from "../Section";
import SectionNav from "../pustipath/SectionNav";
import SyncDemo from "./SyncDemo";
import type { Entry } from "@/lib/content";

const V = "#8b5cf6", P = "#ec4899", A = "#f59e0b", S = "#0ea5e9", E = "#10b981", R = "#f43f5e";

const nav = [
  { id: "problem", label: "Problem" },
  { id: "try", label: "Try it" },
  { id: "how", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "under", label: "Under the hood" },
  { id: "download", label: "Platforms" },
  { id: "limits", label: "Limits" },
];

const stats: [LucideIcon, string, string, string][] = [
  [Laptop, "2", "platforms built; macOS build currently damaged", V],
  [FileVideo, "3", "listed formats: MP4, MKV, AVI", P],
  [Share2, "P2P", "WebRTC peer connections", S],
  [Sparkles, "v1.0", "first stable release", A],
];

const problems: [LucideIcon, string, string, string][] = [
  [Clapperboard, "The countdown", "“3, 2, 1, play” in a chat window, then constant corrections when someone pauses or lags.", R],
  [Film, "The lock-in", "Streaming watch parties tie everyone to one catalogue and one account.", A],
  [Users, "The real need", "Most people just want to watch files they already own, together.", V],
];

const steps: [LucideIcon, string, string, string][] = [
  [DoorOpen, "Create a room", "The host opens a private room and gets a Room ID.", V],
  [Link2, "Friends join", "They paste the ID and a signalling step connects the peers.", P],
  [FileVideo, "Load the file", "Everyone drops in the same video from their own disk.", A],
  [Radio, "Play together", "Play, pause and seek from anyone reach the whole room.", E],
];

const features: [LucideIcon, string, string, string][] = [
  [Users, "Private rooms", "Invite friends with a short Room ID.", V],
  [Radio, "Synchronised playback", "Play, pause and seek are shared instantly.", P],
  [Share2, "Peer connections", "Control messages travel over WebRTC channels.", S],
  [WifiOff, "Local playback", "Plays files from your own disk, offline for solo viewing.", E],
  [Moon, "Cinema mode", "A dark, distraction-free interface.", A],
  [Volume2, "Power controls", "Volume boost and session management.", R],
];

const platforms: [LucideIcon, string, string, string[], string][] = [
  [Monitor, "Windows", "Windows 10 and 11, 64-bit", ["Portable .zip", "No admin rights needed"], S],
  [Laptop, "macOS", "Catalina or newer", ["Universal .dmg", "Intel and Apple Silicon", "Known issue: current build is damaged"], P],
];

function Tile({ icon: Icon, c, size = 40 }: { icon: LucideIcon; c: string; size?: number }) {
  return (
    <span
      className="mb-3 grid shrink-0 place-items-center rounded-xl"
      style={{ width: size, height: size, background: `color-mix(in srgb, ${c} 16%, transparent)`, color: c }}
    >
      <Icon size={size * 0.5} strokeWidth={1.9} aria-hidden="true" />
    </span>
  );
}

function Card({ icon, c, title, children }: { icon: LucideIcon; c: string; title: string; children: React.ReactNode }) {
  return (
    <div className="card card-hover h-full p-4 sm:p-5" style={{ borderTop: `3px solid ${c}` }}>
      <Tile icon={icon} c={c} />
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{children}</p>
    </div>
  );
}

export default function MediaPlayerCaseStudy({ p }: { p: Entry }) {
  const live = p.links?.[0];
  return (
    <div className="case">
      <header className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(45% 55% at 15% 10%, rgba(139,92,246,.28), transparent 70%), radial-gradient(40% 50% at 85% 20%, rgba(236,72,153,.22), transparent 70%), radial-gradient(40% 50% at 60% 100%, rgba(245,158,11,.18), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1040px] px-5 pb-10 pt-10 sm:pt-14">
          <Link href="/#projects" className="text-sm">← All projects</Link>
          <p className="eyebrow mt-5" style={{ color: V }}>Case study · Desktop app</p>
          <h1 className="mt-1.5 text-4xl font-extrabold leading-tight sm:text-5xl">
            Media Player{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent">Next Gen Sync</span>
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg text-muted">
            Watch movies and shows in perfect step with friends. Create a room, share its ID, and everyone plays, pauses and seeks together.
          </p>
          <div className="mt-5"><Chips items={["WebRTC", "Peer-to-peer", "Windows", "macOS", "Next.js site"]} /></div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {live && (
              <a href={live.href} target="_blank" rel="noopener noreferrer" className="btn border-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[var(--shadow)]">
                {live.label} ↗
              </a>
            )}
            <a href="#try" className="btn btn-ghost">Try the sync demo</a>
          </div>
          <dl className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([Icon, v, l, c]) => (
              <div key={l} className="rounded-xl border border-line bg-surface p-3.5" style={{ borderBottom: `3px solid ${c}` }}>
                <Icon size={16} style={{ color: c }} aria-hidden="true" />
                <dd className="mt-1.5 text-2xl font-extrabold leading-none text-navy">{v}</dd>
                <dt className="mt-1 text-xs leading-snug text-muted">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <SectionNav items={nav} />

      <Section id="problem" n="01" eyebrow="The problem" title="Watching together shouldn't need a countdown">
        <div className="grid gap-3 md:grid-cols-3">
          {problems.map(([Icon, t, d, c], i) => (
            <Reveal key={t} delay={i * 60}><Card icon={Icon} c={c} title={t}>{d}</Card></Reveal>
          ))}
        </div>
      </Section>

      <Section id="try" n="02" eyebrow="Try it" title="Feel how a synced room behaves">
        <p className="mb-5 max-w-[66ch] text-muted">
          Press play, drag the timeline, or make a friend lag. Everything you do is sent to the room, just as it is in the app.
        </p>
        <Reveal><SyncDemo /></Reveal>
      </Section>

      <Section id="how" n="03" eyebrow="How it works" title="Four steps from idea to movie night">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([Icon, t, d, c], i) => (
            <Reveal key={t} delay={i * 70}>
              <li className="relative h-full list-none rounded-2xl border border-line bg-surface p-4 sm:p-5">
                <span className="absolute right-4 top-3 font-mono text-3xl font-extrabold opacity-20" style={{ color: c }}>{i + 1}</span>
                <Tile icon={Icon} c={c} />
                <h3 className="text-base font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="features" n="04" eyebrow="Features" title="Small app, the right controls">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, t, d, c], i) => (
            <Reveal key={t} delay={(i % 3) * 60}><Card icon={Icon} c={c} title={t}>{d}</Card></Reveal>
          ))}
        </div>
      </Section>

      <Section id="under" n="05" eyebrow="Under the hood" title="Only the controls travel, never the video">
        <Reveal>
          <figure>
            <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {[
                [Film, "Each person's file", "The same video, played from their own disk.", E],
                [Radio, "Control messages", "Play, pause and seek events, a few bytes each.", V],
                [Users, "Everyone's player", "Applies the event locally and stays in step.", P],
              ].map(([I, t, d, c], i) => {
                const Icon = I as LucideIcon;
                return (
                  <div key={t as string} className="contents">
                    <div className="card p-4" style={{ borderLeft: `4px solid ${c as string}` }}>
                      <Icon size={20} style={{ color: c as string }} aria-hidden="true" />
                      <p className="mt-2 font-semibold text-navy">{t as string}</p>
                      <p className="text-sm text-muted">{d as string}</p>
                    </div>
                    {i < 2 && <ArrowRight aria-hidden="true" className="mx-auto rotate-90 text-muted lg:rotate-0" />}
                  </div>
                );
              })}
            </div>
            <figcaption className="mt-3 text-sm text-muted">
              A lightweight signalling step introduces peers to each other. After that, control messages flow over WebRTC channels, which are
              encrypted by the protocol. Nothing is uploaded or re-streamed, so any file you own works.
            </figcaption>
          </figure>
        </Reveal>
        <Reveal>
          <p className="mt-5 flex max-w-[66ch] items-start gap-2 text-sm text-muted">
            <Lock size={16} className="mt-0.5 shrink-0" style={{ color: V }} aria-hidden="true" />
            Keeping the video local also keeps the app light: there is no media server to run and no copy of your files anywhere else.
          </p>
        </Reveal>
      </Section>

      <Section id="download" n="06" eyebrow="Shipped" title="Built for Windows and macOS">
        <div className="grid gap-3 md:grid-cols-2">
          {platforms.map(([Icon, t, sub, pts, c], i) => (
            <Reveal key={t} delay={i * 70}>
              <div className="card h-full p-5" style={{ borderTop: `3px solid ${c}` }}>
                <Tile icon={Icon} c={c} size={44} />
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="font-mono text-xs text-muted">{sub}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {pts.map((x) => <li key={x} className="flex items-center gap-2"><Download size={14} style={{ color: c }} aria-hidden="true" />{x}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div role="note" className="mt-4 flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
            <p className="text-ink"><strong>Known issue:</strong> the macOS build is currently damaged. Until a repaired build is published, the Windows version is the working one.</p>
          </div>
        </Reveal>
        <Reveal>
          <p className="mt-5 max-w-[66ch] text-sm text-muted">
            A separate website presents the product, a user manual and the downloads. I designed and built the app and its website.
          </p>
        </Reveal>
      </Section>

      <Section id="limits" n="07" eyebrow="Honest limits" title="What version 1.0 doesn't do">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            [AlertTriangle, "macOS build damaged", "The current macOS download is damaged. Windows is the working build for now.", R],
            [SlidersHorizontal, "Same file needed", "The app syncs playback, not the video, so everyone needs a copy.", A],
            [AlertTriangle, "Needs signalling", "Peers must reach a signalling server to find each other.", R],
            [Sparkles, "First release", "Changelog, roadmap and docs pages are still to come.", V],
          ].map(([I, t, d, c]) => (
            <Reveal key={t as string}><Card icon={I as LucideIcon} c={c as string} title={t as string}>{d as string}</Card></Reveal>
          ))}
        </div>
        {live && (
          <Reveal>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface2 p-5">
              <p className="max-w-[52ch] text-sm text-muted">See the product page, the user manual and the downloads on the live site.</p>
              <a href={live.href} target="_blank" rel="noopener noreferrer" className="btn border-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">{live.label} ↗</a>
            </div>
          </Reveal>
        )}
      </Section>
    </div>
  );
}

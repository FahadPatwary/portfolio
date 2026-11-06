import Link from "next/link";
import {
  Activity, Baby, Bell, Bot, Cloud, Database, FileClock, FlaskConical, GraduationCap, KeyRound, Languages,
  LayoutDashboard, LifeBuoy, ListChecks, Lock, MapPin, MessageSquare, ServerCog, ShieldCheck, Smartphone,
  Ban, Users, Utensils, Volume2, WifiOff, type LucideIcon,
} from "lucide-react";
import Chips from "../Chips";
import Reveal from "../Reveal";
import Section from "../Section";
import ScreeningDemo from "./ScreeningDemo";
import SectionNav from "./SectionNav";
import type { Entry } from "@/lib/content";

const nav = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "What we built" },
  { id: "screening", label: "Screening" },
  { id: "architecture", label: "Architecture" },
  { id: "model", label: "The model" },
  { id: "security", label: "Security" },
  { id: "testing", label: "Testing" },
  { id: "decisions", label: "Decisions" },
  { id: "next", label: "Limits & next" },
];

const stats = [
  { v: "3", l: "on-device ONNX models" },
  { v: "761 KB", l: "compressed model bundle" },
  { v: "< 200 ms", l: "full pipeline, mid-range phone" },
  { v: "0.884", l: "ROC-AUC, unseen holdout" },
  { v: "19", l: "Firestore collections" },
  { v: "35", l: "documented test cases" },
];

const gaps: [LucideIcon, string, string][] = [
  [Users, "Few specialists", "Assessing malnutrition needs trained staff and calibrated equipment that rural clinics rarely have."],
  [WifiOff, "No reliable internet", "Most health software assumes a connection, so it fails exactly where it is needed."],
  [Languages, "English-first tools", "The people on the front line speak Bengali and have varied literacy."],
  [ListChecks, "Fragmented workflow", "Screening, records, referral and education live in separate tools, or on paper."],
  [Lock, "Weak data governance", "Children's health data often has no enforceable, role-based access control."],
  [Activity, "One-off checks", "Without history there is no growth trajectory, so decline is noticed late."],
];

const surfaces: [LucideIcon, string, string, string[]][] = [
  [Smartphone, "Mobile app", "Flutter · Android first", ["Bengali-first, icon-driven, text-to-speech", "Offline on-device AI screening", "Role-specific home for each user"]],
  [LayoutDashboard, "Admin dashboard", "Next.js 16 · React 19", ["Users, children, scans, areas, reports", "CHW approval workflow", "Global search and analytics"]],
  [Cloud, "Serverless backend", "Firebase · Cloud Functions", ["Auth, Firestore, Storage, FCM", "Server-only privileged operations", "Event-driven notifications"]],
];

const roles: [string, string][] = [
  ["Guardian (mother)", "Registers her children, screens them, tracks growth, chats with her CHW, requests help, learns in the academy."],
  ["Community health worker", "Screens any child in the area, overrides an AI result with a reason, creates tasks for volunteers, chats with mothers."],
  ["Volunteer", "Sees only assigned children, completes tasks, shares location for the helper map."],
  ["Administrator", "Approves CHWs, manages users, areas and content, reviews scans and reports."],
];

const features: [LucideIcon, string, string][] = [
  [Activity, "AI screening", "Stunting, underweight and wasting risk in a green, yellow or red result."],
  [Baby, "Growth tracking", "Weight, height, MUAC and head circumference with WHO Z-score fields and charts."],
  [Bell, "Automatic alerts", "Red or yellow scans notify the assigned CHW and the mother."],
  [LifeBuoy, "Help requests", "Type, urgency, location and photos, routed to the assigned CHW."],
  [ListChecks, "Volunteer tasks", "CHWs assign, volunteers complete, everyone is notified."],
  [MessageSquare, "Role-aware chat", "One-to-one messaging limited to permitted pairs, with read receipts."],
  [MapPin, "Helper maps", "Community heatmap and live active-helper positions."],
  [GraduationCap, "Nutrition academy", "Modules, lessons, quizzes and badges."],
  [Bot, "Bengali chatbot", "Nutrition answers from a curated document corpus (needs a connection)."],
  [Utensils, "Local recipes", "Action plans and recipes that fit what rural families can get."],
  [Volume2, "Text-to-speech", "Read-aloud support for low-literacy users."],
  [WifiOff, "Offline-first", "Local cache for reads and queued actions, sync when back online."],
];

const steps = [
  ["Capture", "Age, MUAC, sex, birth order, birth weight and a household wealth band."],
  ["Encode", "Build a fixed 29-feature vector in training order. Missing inputs become NaN."],
  ["Infer", "Three ONNX models run on the phone and return one probability each."],
  ["Classify", "Compare with tuned thresholds to get green, yellow or red."],
  ["Record", "Save score, class, model version and inference time to the child's history."],
  ["Notify", "A Cloud Function alerts the CHW and mother on red or yellow."],
];

const layers: { name: string; left: string; right: string }[] = [
  { name: "Presentation", left: "Flutter screens: Bengali UI, charts, maps, TTS", right: "Next.js pages: Tailwind, Radix, TanStack Table, Recharts" },
  { name: "Business", left: "ChangeNotifier providers: auth, role, config", right: "Server actions and auth middleware enforcing RBAC" },
  { name: "Service", left: "Services for auth, child, scan, chat, FCM, location, offline cache, ONNX", right: "Firebase Admin SDK wrappers and API route handlers" },
];
const data = ["Cloud Firestore", "Firebase Storage", "Firebase Auth", "Cloud Functions", "FCM push", "Hive cache", "ONNX assets"];

const auc: { name: string; v: number; ci: string; sens: string; ece: string }[] = [
  { name: "Stunting", v: 0.884, ci: "0.875–0.892", sens: "70.1%", ece: "0.100 → 0.027" },
  { name: "Underweight", v: 0.88, ci: "0.872–0.888", sens: "65.8%", ece: "0.096 → 0.010" },
  { name: "Wasting", v: 0.817, ci: "0.803–0.829", sens: "70.6%", ece: "0.130 → 0.004" },
];

const security: [LucideIcon, string, string][] = [
  [KeyRound, "Roles in custom claims", "Rules read the role from the auth token, with no extra database read. A Firestore fallback covers self-registered users."],
  [Ban, "Default deny", "A terminal rule blocks any path not explicitly allowed, so a forgotten collection is closed, not open."],
  [ServerCog, "Server-only writes", "CHW assignments, areas, content and verification can only be written by trusted Cloud Functions."],
  [ShieldCheck, "No privilege escalation", "Clients cannot change their own role, active flag or audit fields. Message updates are limited to the read flag."],
  [FileClock, "Append-only audit log", "Significant actions are logged create-only. CHW verification records who approved and when."],
  [Lock, "Phone-verified sign-in", "OTP proves phone ownership, then a function mints a short-lived custom token. Web sessions use HttpOnly cookies."],
];

const tests: [string, number][] = [
  ["Scan and AI", 7], ["Authentication", 6], ["Web and admin", 4], ["Child records", 3], ["Tasks", 3], ["Chat", 3],
  ["Security rules", 3], ["Help requests", 2], ["Role architecture", 2], ["Notifications", 1], ["Offline", 1],
];

const decisions: [string, string][] = [
  ["Run inference on the device", "A server round-trip fails without internet and adds latency. Compact tree models exported to ONNX run in milliseconds on a mid-range phone and keep the child's data on the device."],
  ["Gradient boosting over a neural net for the core model", "Tabular survey data is where boosted trees win, they handle missing values natively, and a 761 KB bundle ships easily. The result also stays explainable with SHAP."],
  ["Tune thresholds for recall", "In screening, a missed case costs more than a false alarm. Wasting uses an F2 target that weights recall twice, which lifted its sensitivity from 36% to 70.6%."],
  ["Put authority in rules and functions, not the app", "The client is untrusted. Security rules and server-side functions decide what is allowed, so an app bug cannot quietly expose data."],
  ["Deterministic chat IDs", "Sorting the two user IDs and joining them gives one conversation per pair, and lets security rules check participation straight from the ID."],
  ["Soft delete only", "Core records are deactivated, never removed, so the care history and audit trail stay intact."],
];

const limits = [
  "The app fills 7 of the 29 model inputs. The rest are passed as missing, which lowers precision against a fully populated vector.",
  "Output is a risk indication, not a diagnosis. CHW judgement and professional confirmation stay in the loop.",
  "The dynamic role-based UI module is built and tested but not yet wired into live navigation.",
  "Full offline data entry needs a write queue with conflict resolution. Today offline supports reads and queued actions.",
  "The chatbot depends on its document corpus and an online endpoint.",
  "The backend is tied to Firebase.",
];
const next = [
  "Capture more model inputs: maternal data, WASH indicators, dietary diversity.",
  "Compute WHO Z-scores on the device alongside the ML risk score.",
  "Add image-based screening, building on the face model from the research.",
  "Show SHAP-style explanations so health workers can see why a child was flagged.",
  "Prospective field validation with real community health workers.",
  "Standards-based exchange with government health systems.",
];

function Card({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <div className="card h-full p-4 sm:p-5">
      <span className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent"><Icon size={18} strokeWidth={1.9} aria-hidden="true" /></span>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{children}</p>
    </div>
  );
}

export default function CaseStudy({ p }: { p: Entry }) {
  return (
    <div className="case">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1040px] px-5 pb-10 pt-10 sm:pt-14">
          <Link href="/#projects" className="text-sm">← All projects</Link>
          <p className="eyebrow mt-5">Case study · Flagship project</p>
          <h1 className="mt-1.5 text-4xl font-extrabold leading-tight sm:text-5xl">
            PustiPath <span className="font-normal text-muted">পুষ্টিপথ</span>
          </h1>
          <p className="mt-4 max-w-[62ch] text-lg text-muted">
            An offline, Bengali-first platform that lets community health workers screen children for malnutrition on an ordinary
            Android phone, then coordinates the care that follows.
          </p>
          <div className="mt-5"><Chips items={["Flutter", "ONNX Runtime", "Firebase", "Next.js", "Cloud Functions", "pytest · Selenium · Appium"]} /></div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {p.links?.map((l) => <a key={l.href} className="btn btn-primary" href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
            <Link className="btn btn-ghost" href="/research/malnutrition/">Read the research</Link>
          </div>
          <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((s) => (
              <div key={s.l} className="bg-surface px-3 py-3.5">
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-xl font-extrabold leading-none text-navy sm:text-2xl">{s.v}</dd>
                <dd className="mt-1.5 text-xs leading-snug text-muted">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <SectionNav items={nav} />

      {/* 01 Problem */}
      <Section id="problem" n="01" eyebrow="The problem" title="Malnutrition is found late, where help is furthest away">
        <Reveal>
          <p className="max-w-[68ch] text-muted">
            Stunting, wasting and underweight cause lasting physical and cognitive harm. In Bangladesh, 28.0% of children under five are
            stunted and 5.5% are wasted (BDHS 2022). Finding them early depends on trained staff and calibrated scales. Rural clinics
            have few of either, so children are often identified only once they are severely ill.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {gaps.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 50}><Card icon={Icon} title={t}>{d}</Card></Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 max-w-[68ch] border-l-2 border-accent pl-4 text-ink">
            <strong>The brief:</strong> a secure, offline-capable, Bengali-first system that helps a non-specialist screen a child with only a
            low-end phone, track growth over time, raise alerts on high risk, and coordinate community follow-up.
          </p>
        </Reveal>
      </Section>

      {/* 02 Solution */}
      <Section id="solution" n="02" eyebrow="What we built" title="Three coordinated systems and one care pathway">
        <div className="grid gap-3 md:grid-cols-3">
          {surfaces.map(([Icon, t, sub, pts], i) => (
            <Reveal key={t} delay={i * 70}>
              <div className="card h-full p-5">
                <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent"><Icon size={20} strokeWidth={1.9} aria-hidden="true" /></span>
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="font-mono text-xs text-muted">{sub}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {pts.map((x) => <li key={x} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{x}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mb-3 mt-10 text-lg font-semibold">Who uses it</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {roles.map(([t, d], i) => (
            <Reveal key={t} delay={i * 50}>
              <div className="card h-full p-4 sm:p-5">
                <h4 className="text-base font-semibold text-navy">{t}</h4>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mb-3 mt-10 text-lg font-semibold">Everything around the screening</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={(i % 4) * 50}><Card icon={Icon} title={t}>{d}</Card></Reveal>
          ))}
        </div>
      </Section>

      {/* 03 Screening */}
      <Section id="screening" n="03" eyebrow="How screening works" title="From a few measurements to a clear traffic-light result">
        <Reveal>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-3 rounded-xl border border-line bg-surface p-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 font-mono text-sm font-semibold text-accent">{i + 1}</span>
                <div>
                  <p className="font-semibold text-navy">{t}</p>
                  <p className="text-sm text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <h3 className="mb-3 mt-9 text-lg font-semibold">Try the decision rule</h3>
        <p className="mb-4 max-w-[68ch] text-sm text-muted">
          Red means any probability is at least 1.2× its threshold. Yellow means at least one reaches its threshold. Otherwise green.
          Drag the sliders to see how the app reaches its result.
        </p>
        <Reveal><ScreeningDemo /></Reveal>
      </Section>

      {/* 04 Architecture */}
      <Section id="architecture" n="04" eyebrow="Architecture" title="Layered clients over a serverless backend">
        <Reveal>
          <figure>
            <div className="space-y-2">
              {layers.map((l) => (
                <div key={l.name} className="grid gap-2 md:grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)] md:items-stretch">
                  <p className="flex items-center rounded-lg bg-navy px-3 py-2 font-mono text-xs uppercase tracking-wider text-on-navy">{l.name}</p>
                  <p className="rounded-lg border border-line bg-surface p-3 text-sm"><span className="mb-0.5 block font-mono text-[0.7rem] uppercase text-accent">Mobile</span>{l.left}</p>
                  <p className="rounded-lg border border-line bg-surface p-3 text-sm"><span className="mb-0.5 block font-mono text-[0.7rem] uppercase text-accent">Web</span>{l.right}</p>
                </div>
              ))}
              <div className="grid gap-2 md:grid-cols-[130px_minmax(0,1fr)]">
                <p className="flex items-center rounded-lg bg-navy px-3 py-2 font-mono text-xs uppercase tracking-wider text-on-navy">Data</p>
                <ul className="flex flex-wrap gap-2 rounded-lg border border-accent bg-accent/10 p-3">
                  {data.map((d) => <li key={d} className="rounded-md border border-line bg-surface px-2.5 py-1 text-sm">{d}</li>)}
                </ul>
              </div>
            </div>
            <figcaption className="mt-3 text-sm text-muted">
              The ONNX models and a local cache live on the device. Everything shared goes through Firebase.
            </figcaption>
          </figure>
        </Reveal>

        <h3 className="mb-3 mt-9 text-lg font-semibold">An event, end to end</h3>
        <Reveal>
          <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
            {[
              ["A scan is saved", "Written under the child's record"],
              ["onNewScan fires", "Firestore trigger, server side"],
              ["Resolve recipients", "Assigned CHW and the mother"],
              ["Notify", "FCM push plus an in-app record, Bengali first"],
            ].map(([t, d], i, a) => (
              <li key={t} className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center">
                <div className="flex-1 rounded-xl border border-line bg-surface p-3.5">
                  <p className="text-sm font-semibold text-navy">{t}</p>
                  <p className="text-xs text-muted">{d}</p>
                </div>
                {i < a.length - 1 && <span aria-hidden="true" className="self-center text-accent"><span className="lg:hidden">↓</span><span className="hidden lg:inline">→</span></span>}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-9 grid gap-3 sm:grid-cols-3">
          {[
            ["19", "Firestore collections", "users, children (with metrics and scans), chats, tasks, help requests, academy, audit log and more"],
            ["10", "explicit API endpoints", "3 callable functions, 4 Firestore triggers and 3 web route handlers"],
            ["14", "feature modules", "auth, children, scan, growth, community, chat, academy, nutrition, notifications and more"],
          ].map(([n, t, d]) => (
            <div key={t} className="card p-4">
              <p className="text-2xl font-extrabold text-navy">{n}</p>
              <p className="text-sm font-semibold">{t}</p>
              <p className="mt-1 text-xs text-muted">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 05 Model */}
      <Section id="model" n="05" eyebrow="The model" title="Built on 554,188 children, judged on data it never saw">
        <Reveal>
          <p className="max-w-[68ch] text-muted">
            The models come from my research on multimodal child-malnutrition screening (
            <Link href="/research/malnutrition/">manuscript, not yet published</Link>). LightGBM and XGBoost were trained on 10 national
            surveys from Bangladesh, India, Nepal, Myanmar and Pakistan. A further survey, Bangladesh DHS-8 2022 (n = 8,784), was held
            out completely: never used for training, validation or threshold tuning.
          </p>
        </Reveal>

        <Reveal>
          <div className="card mt-6 p-4 sm:p-6">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h3 className="text-base font-semibold">ROC-AUC on the unseen holdout</h3>
              <p className="text-xs text-muted">95% bootstrap interval · axis starts at 0.5 (chance)</p>
            </div>
            <ul className="space-y-4">
              {auc.map((a) => (
                <li key={a.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-semibold text-navy">{a.name}</span>
                    <span className="font-mono text-xs text-muted">{a.v.toFixed(3)} [{a.ci}]</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface2" role="img" aria-label={`${a.name} ROC-AUC ${a.v}`}>
                    <div className="h-full rounded-full bg-accent" style={{ width: `${((a.v - 0.5) / 0.5) * 100}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-muted">Sensitivity {a.sens} · calibration error {a.ece} after isotonic calibration</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            ["Explainable", "SHAP shows child age is the dominant predictor, then maternal height and maternal BMI. MUAC ranks fourth for wasting, which supports its use in the field."],
            ["Calibrated", "Raw boosted models were overconfident. Isotonic calibration cut expected calibration error by 73%, 90% and 97%, so a probability means what it says."],
            ["Production-ready", "Exported to ONNX opset 12 and checked against the originals with zero output deviation. The bundle is 761 KB."],
          ].map(([t, d]) => (
            <Reveal key={t}>
              <div className="card h-full p-4 sm:p-5">
                <h3 className="flex items-center gap-2 text-base font-semibold"><FlaskConical size={16} className="text-accent" aria-hidden="true" />{t}</h3>
                <p className="mt-1.5 text-sm text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 max-w-[72ch] text-sm text-muted">
          The research also built an EfficientNet-B0 face-image model (test AUC 0.871, 90.2% sensitivity) and a late-fusion step. In the
          app build documented in the project report, screening runs the three tabular models; image screening is scaffolded for the next
          iteration. Training data is 89% Indian, and sensitivity is lower in wealthier households, so field validation matters.
        </p>
      </Section>

      {/* 06 Security */}
      <Section id="security" n="06" eyebrow="Security" title="A child's data is protected by design, not by hope">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {security.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 60}><Card icon={Icon} title={t}>{d}</Card></Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-5 max-w-[72ch] text-sm text-muted">
            Child records are visible only to the owning mother, authorised field staff and administrators. A client that tries to read
            another family&apos;s child, create a CHW assignment or promote itself to admin is refused by the rules, and those cases are
            tested.
          </p>
        </Reveal>
      </Section>

      {/* 07 Testing */}
      <Section id="testing" n="07" eyebrow="Quality" title="Tested as part of the design">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">Layers</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                {[
                  ["Unit, widget and property", "Dart tests with flutter_test and Mockito for services, models, validators and the role architecture."],
                  ["End to end", "pytest suites with Selenium and Appium covering the mobile app and the admin dashboard."],
                  ["Access control", "Role-based scenarios that prove each user reaches only what they should."],
                  ["Performance", "Inference time is recorded on every scan, and permission checks have a sub-50 ms target."],
                ].map(([t, d]) => (
                  <li key={t}><span className="font-semibold text-navy">{t}.</span> <span className="text-muted">{d}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">35 documented test cases</h3>
              <ul className="mt-3 space-y-2">
                {tests.map(([t, n]) => (
                  <li key={t} className="grid grid-cols-[8.5rem_minmax(0,1fr)_1.5rem] items-center gap-3 text-sm">
                    <span className="truncate text-muted">{t}</span>
                    <span className="h-2 rounded-full bg-surface2"><span className="block h-full rounded-full bg-accent" style={{ width: `${(n / 7) * 100}%` }} /></span>
                    <span className="text-right font-mono text-xs text-navy">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 08 Decisions */}
      <Section id="decisions" n="08" eyebrow="Design decisions" title="The trade-offs behind the system">
        <div className="grid gap-3 md:grid-cols-2">
          {decisions.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 60}>
              <div className="card h-full p-4 sm:p-5">
                <h3 className="text-base font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="card mt-8 border-accent/50 p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold"><Database size={16} className="text-accent" aria-hidden="true" />My role</h3>
            <p className="mt-2 max-w-[72ch] text-sm text-muted">
              I designed the system architecture and carried out the research behind PustiPath, including the models that run on the device.
              I used AI assistance to write much of the code, including the Flutter app, and I directed and reviewed that work against the
              design. The testing approach and the security model are part of that design.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 09 Limits & next */}
      <Section id="next" n="09" eyebrow="Limits and next steps" title="What it does not do yet">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">Known limitations</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {limits.map((x) => <li key={x} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />{x}</li>)}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">Next steps</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {next.map((x) => <li key={x} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{x}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface2 p-5">
            <p className="max-w-[52ch] text-sm text-muted">
              Want the detail? The full source, the test suites and the Cloud Functions are on GitHub.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {p.links?.map((l) => <a key={l.href} className="btn btn-primary" href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
              <Link className="btn btn-ghost" href="/#contact">Get in touch</Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

import { AlertTriangle, Binary, Eye, Filter, Network, Radio, Repeat, ShieldAlert, Siren, Timer, Waves, Zap, Brain } from "lucide-react";
import Reveal from "../Reveal";
import Section from "../Section";
import SectionNav from "../pustipath/SectionNav";
import { BarList, Bullets, Callout, DataTable, Flow, GroupedBars, InfoCard, Lede, PaperHero } from "./ui";

const S = "#0ea5e9", A = "#f59e0b", R = "#f43f5e", V = "#8b5cf6", E = "#10b981", I = "#6366f1";
const MUTED = "#94a3b8";

const nav = [
  { id: "problem", label: "Problem" },
  { id: "threats", label: "Threats" },
  { id: "approach", label: "Approach" },
  { id: "results", label: "Results" },
  { id: "honest", label: "Reading it fairly" },
  { id: "limits", label: "Limits" },
];

export default function GoosePaper() {
  return (
    <div className="case">
      <PaperHero
        kicker="Research · Smart-grid security · Manuscript"
        title="A lightweight two-stage hybrid detector for IEC 61850 GOOSE traffic"
        authors="Fahad Ahmed Patwary, Mirza Samawatun Nur Astha, Md. Shohrab Hossain (supervisor) · United International University"
        status="Manuscript, formatted for IEEE Transactions on Smart Grid, not yet published"
        abstract="Protection signals inside a substation must arrive in under 4 ms, so they travel unauthenticated and unencrypted. This work watches that traffic passively with a rule engine plus a One-Class SVM, and checks every packet in a fraction of a millisecond."
        tags={["IEC 61850", "GOOSE", "One-Class SVM", "Anomaly detection", "Smart grid", "OT security"]}
        color={S} colors={[S, A, I]}
        stats={[
          { v: "98.5%", l: "recall, mean over 5 seeds (±0.2)", c: S },
          { v: "0.12 ms", l: "mean per packet, p99 0.28 ms", c: E },
          { v: "95.7%", l: "F1 score (±1.2)", c: A },
          { v: "5", l: "attack classes, 5 random seeds", c: V },
        ]}
      />
      <SectionNav items={nav} />

      <Section id="problem" n="01" eyebrow="The problem" title="Fast enough to protect the grid means too fast to secure it">
        <Reveal>
          <Lede>
            In a smart substation, devices exchange trip commands and fault notices using GOOSE messages. To clear faults in time, the
            standard demands delivery in under 4 ms. That is why GOOSE rides raw Layer-2 multicast with no authentication, and why the usual
            defences do not fit.
          </Lede>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            [Timer, "4 ms deadline", "Fault-clearance physics sets a hard limit. Missing it risks equipment damage and cascading outages.", R],
            [ShieldAlert, "Cryptography is too slow", "Signatures and encryption add roughly 3–8 ms per message, more than the whole budget.", A],
            [Brain, "Deep learning is too slow", "Ensemble and LSTM detectors need around 10–50 ms of inference, far beyond what the devices can spare.", V],
          ].map(([Ic, t, d, c], i) => (
            <Reveal key={t as string} delay={i * 60}><InfoCard icon={Ic as typeof Timer} c={c as string} title={t as string}>{d as string}</InfoCard></Reveal>
          ))}
        </div>
      </Section>

      <Section id="threats" n="02" eyebrow="Threat model" title="An attacker on the substation LAN with five moves">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [Waves, "DoS flooding", "Frames sent faster than a device can buffer or process.", R],
            [Repeat, "Replay", "Old legitimate frames re-sent, with counters running backwards.", A],
            [Binary, "False data injection", "Valid frames with altered payloads, sent off the normal schedule.", V],
            [Eye, "Semantic spoofing", "Real MAC, plausible counters, wrong meaning. The hardest to catch from metadata.", I],
            [Zap, "High state-number jump", "A sudden large jump in the state counter that forces subscribers to reset.", S],
          ].map(([Ic, t, d, c], i) => (
            <Reveal key={t as string} delay={(i % 3) * 60}><InfoCard icon={Ic as typeof Waves} c={c as string} title={t as string}>{d as string}</InfoCard></Reveal>
          ))}
        </div>
      </Section>

      <Section id="approach" n="03" eyebrow="The approach" title="Cheap rules first, a learned boundary second">
        <Reveal>
          <Flow
            steps={[
              { icon: Network, title: "Mirror port", desc: "A passive SPAN copy of traffic. Nothing sits in the protection path, so delivery is never delayed.", c: S },
              { icon: Binary, title: "Decode and featurise", desc: "Parse the real bytes with an independent decoder. Track state, sequence and timing per source.", c: I },
              { icon: Filter, title: "Stage 1: rules", desc: "Constant-time checks with thresholds learned from normal traffic. A hit returns immediately.", c: A },
              { icon: Brain, title: "Stage 2: One-Class SVM", desc: "Only runs if the rules pass. Learned from normal data only, it catches stealthy injection.", c: V },
            ]}
          />
        </Reveal>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-4 sm:p-5">
              <h3 className="text-base font-semibold">What the rule engine checks</h3>
              <div className="mt-3"><Bullets c={A} items={[
                "Source MAC not in the learned allow-list (spoofing).",
                "State number jumps above 50, or goes backwards (replay).",
                "Sequence number regresses without a state change (replay).",
                "Frame length above 1.5× the normal maximum (oversized frames).",
                "Frame rate above the learned threshold (flooding).",
              ]} /></div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-4 sm:p-5">
              <h3 className="text-base font-semibold">Design principles</h3>
              <div className="mt-3"><Bullets c={S} items={[
                "Zero protection-path latency: detect passively, never inline.",
                "Defence in depth: rules for exact signatures, a one-class learner for deviations.",
                "Latency-aware: a rule hit skips the costlier ML stage, so common attacks are cheap.",
                "Reproducible traffic: a specification-correct generator, serialised to PCAP and re-parsed independently.",
              ]} /></div>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-4 max-w-[72ch] text-sm text-muted">
            Evaluation uses one hour of pure normal traffic for training (5,010 frames) and a separate test timeline of 1,908 frames
            (854 attack, 1,054 normal) with three episodes of each attack class, repeated over five random seeds.
          </p>
        </Reveal>
      </Section>

      <Section id="results" n="04" eyebrow="Results" title="Near-complete recall in a fraction of a millisecond">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <GroupedBars
              title="Detector comparison (mean of 5 seeds)"
              caption="Isolation Forest fails outright. Hybrid trades some precision for the highest recall."
              series={[{ label: "Precision", color: S }, { label: "Recall", color: E }, { label: "F1", color: A }]}
              groups={[
                { name: "Hybrid (rules + OCSVM)", values: [0.93, 0.985, 0.957], strong: true },
                { name: "Rule-only", values: [0.982, 0.943, 0.962] },
                { name: "OCSVM-only", values: [0.936, 0.985, 0.96] },
                { name: "Isolation Forest", values: [0.155, 0.004, 0.008] },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <BarList
              title="Detection rate by attack class (%)"
              caption="Hybrid detector, mean over 5 seeds."
              color={E} max={100}
              rows={[
                { label: "DoS flooding", value: 100, display: "100%", color: E },
                { label: "Replay", value: 100, display: "100%", color: E },
                { label: "False data injection", value: 100, display: "100%", color: E },
                { label: "High state-number jump", value: 100, display: "100%", color: E },
                { label: "Semantic spoofing", value: 31.2, display: "31.2% ± 4.6", color: R, strong: true, note: "Valid MAC, structure and counters: only the meaning is wrong." },
              ]}
            />
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <BarList
              title="Per-packet latency (ms)"
              caption="Design budget 3 ms; protection deadline 4 ms. Mean values."
              color={S} max={5.5}
              rows={[
                { label: "Rule engine", value: 0.0007, display: "0.0007", color: A },
                { label: "Feature extraction", value: 0.02, display: "0.020", color: I },
                { label: "Hybrid end to end", value: 0.117, display: "0.117 (p99 0.276)", color: E, strong: true },
                { label: "OCSVM inference", value: 0.161, display: "0.161", color: V },
                { label: "Isolation Forest", value: 4.951, display: "4.951", color: R, note: "Over the budget and also inaccurate." },
                { label: "Latency budget", value: 3, display: "3.000", color: MUTED },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="flex h-full flex-col gap-3">
              <InfoCard icon={Radio} c={E} title="Every packet inside the budget">
                100% of packets were processed within 3 ms across all seeds, leaving ample margin under the 4 ms GOOSE deadline.
              </InfoCard>
              <InfoCard icon={Zap} c={S} title="Short-circuiting pays off">
                The hybrid is faster than pure OCSVM because obvious attacks never reach the ML stage.
              </InfoCard>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-5">
            <DataTable
              title="Detection performance, mean ± std over 5 seeds"
              head={["Detector", "Precision", "Recall", "F1", "False-positive rate"]} hi={3}
              rows={[
                ["Rule-only", ".982 ± .005", ".943 ± .007", ".962 ± .005", ".014 ± .003"],
                ["OCSVM-only", ".936 ± .022", ".985 ± .002", ".960 ± .012", ".056 ± .021"],
                ["Isolation Forest", ".155 ± .088", ".004 ± .002", ".008 ± .004", ".018 ± .002"],
                ["Hybrid", ".930 ± .022", ".985 ± .002", ".957 ± .012", ".061 ± .020"],
              ]}
            />
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-5">
            <DataTable
              title="Hypotheses tested"
              head={["Hypothesis", "Result", "Verdict"]}
              rows={[
                ["H1: accuracy above 95%", "F1 95.7% ± 1.2, recall 98.5%", "Supported"],
                ["H2: latency under 3 ms", "100% under 3 ms on all seeds", "Supported"],
                ["H3: hybrid beats rule-only and pure ML", "Higher recall than rules, faster than pure ML", "Supported"],
              ]}
            />
          </div>
        </Reveal>
      </Section>

      <Section id="honest" n="05" eyebrow="Reading it fairly" title="Strong where it can be, candid where it can't">
        <Reveal>
          <div className="grid gap-3 md:grid-cols-3">
            <Callout c={R} icon={AlertTriangle} title="Semantic spoofing is mostly missed">
              At 31.2%, metadata alone cannot see an attacker who gets the structure, MAC and counters right. Catching it needs models of the
              application data.
            </Callout>
            <Callout c={A} icon={Filter} title="A real precision trade-off">
              Rules alone have the lowest false-positive rate (1.4%) and a slightly higher F1. The hybrid buys recall (98.5% vs 94.3%) at a
              6.1% false-positive rate.
            </Callout>
            <Callout c={S} icon={Siren} title="Isolation Forest was ruled out by data">
              It scored an F1 of 0.008 and took 4.95 ms per sample, so OCSVM is the right second stage, by measurement rather than assumption.
            </Callout>
          </div>
        </Reveal>
      </Section>

      <Section id="limits" n="06" eyebrow="Limits and next steps" title="From a convincing simulation to a real substation">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">Limitations</h3>
              <div className="mt-3"><Bullets c={MUTED} items={[
                "Traffic is synthetic and from a single publisher. Real substations have many devices and richer behaviour.",
                "Latency was measured on a laptop CPU, not on substation-grade hardware.",
                "Semantic spoofing recall is intentionally limited.",
              ]} /></div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">Next steps</h3>
              <div className="mt-3"><Bullets c={S} items={[
                "Edge-device validation, such as Raspberry Pi class hardware.",
                "Multi-publisher traffic and payload-aware features.",
                "Online incremental learning.",
                "Hardware-in-the-loop testing and alignment with IEC 62351.",
              ]} /></div>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}

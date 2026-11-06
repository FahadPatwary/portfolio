import { Cpu, FlaskConical, Gauge, GraduationCap, Layers, Leaf, Minimize2, Scissors, Scale, Zap, AlertTriangle } from "lucide-react";
import Reveal from "../Reveal";
import Section from "../Section";
import SectionNav from "../pustipath/SectionNav";
import { BarList, Bullets, Callout, DataTable, Flow, InfoCard, Lede, PaperHero, Scatter } from "./ui";

const G = "#10b981", L = "#84cc16", T = "#14b8a6", A = "#f59e0b", S = "#0ea5e9", R = "#f43f5e", V = "#8b5cf6";
const MUTED = "#94a3b8";

const nav = [
  { id: "why", label: "Why" },
  { id: "pipeline", label: "Pipeline" },
  { id: "results", label: "Results" },
  { id: "honest", label: "Reading it fairly" },
  { id: "setup", label: "Setup" },
  { id: "limits", label: "Limits" },
];

export default function GreenAIPaper() {
  return (
    <div className="case">
      <PaperHero
        kicker="Research · Green AI · Manuscript"
        title="Hybrid Green AI Framework: distillation, pruning and quantization, in the right order"
        authors="Fahad Ahmed Patwary, Mirza Samawatun Nur Astha, Md Imrul Kayes, Md Sakib Hossain, Ruhani Alam · United International University"
        status="Manuscript, not yet published"
        abstract="Modern language models are powerful but expensive to run. This work chains three compression techniques in a deliberate order and measures the real energy cost with CodeCarbon, instead of relying on proxies like parameter counts."
        tags={["DistilBERT", "Knowledge distillation", "Pruning", "INT8 quantization", "CodeCarbon", "SST-2"]}
        color={G} colors={[G, L, T]}
        stats={[
          { v: "−67.9%", l: "Energy-to-Accuracy Ratio vs baseline", c: G },
          { v: "−64.4%", l: "model size, 255.4 → 91.0 MB", c: T },
          { v: "−47.8%", l: "inference energy per run", c: L },
          { v: "−45.3%", l: "latency, 39.3 → 21.5 ms", c: S },
        ]}
      />
      <SectionNav items={nav} />

      <Section id="why" n="01" eyebrow="Motivation" title="Inference is where the energy goes, and it never stops">
        <Reveal>
          <Lede>
            Training a model is a one-off cost. Inference is paid on every request, for the whole life of the model, so a small saving per
            request compounds across millions of requests. Yet most compression studies report proxies such as parameter counts or FLOPs,
            which only loosely track real energy use.
          </Lede>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            [Layers, "RQ1 · Is a combination better?", "Does a hybrid of techniques beat any single technique on energy-per-accuracy?", G],
            [Scale, "RQ2 · Does order matter?", "Does the sequence in which the techniques are applied change the outcome?", A],
            [Cpu, "RQ3 · Can it run at the edge?", "Is the optimised model small and fast enough for constrained devices?", S],
          ].map(([I, t, d, c]) => (
            <Reveal key={t as string}><InfoCard icon={I as typeof Layers} c={c as string} title={t as string}>{d as string}</InfoCard></Reveal>
          ))}
        </div>
        <Reveal>
          <div className="card mt-5 p-4 sm:p-5">
            <h3 className="flex items-center gap-2 text-base font-semibold"><Gauge size={16} style={{ color: G }} aria-hidden="true" />The metric: Energy-to-Accuracy Ratio</h3>
            <p className="mt-2 font-mono text-sm text-navy">EAR = energy (Wh) ÷ accuracy</p>
            <p className="mt-1 text-sm text-muted">
              Lower is better. Raw energy can be gamed by a model that always predicts one class, and raw accuracy ignores waste. EAR
              penalises both, so a single number captures the trade-off.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section id="pipeline" n="02" eyebrow="The framework" title="Teach first, trim second, shrink last">
        <Reveal>
          <Flow
            steps={[
              { icon: GraduationCap, title: "1 · Knowledge distillation", desc: "A BERT-base teacher trains the DistilBERT student with a soft-label loss (T = 4.0, α = 0.5). Only stage that raises accuracy.", c: G },
              { icon: Scissors, title: "2 · Magnitude pruning", desc: "Remove the lowest-magnitude 50% of weights from the already-trained model, where magnitude is a meaningful signal of importance.", c: A },
              { icon: Minimize2, title: "3 · INT8 quantization", desc: "Dynamic post-training quantization converts 32-bit weights to 8-bit integers. Applied last because it is the most destructive to precision.", c: V },
            ]}
          />
        </Reveal>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <BarList
              title="Accuracy through the pipeline (%)"
              caption="Distillation builds an accuracy buffer, and compression spends part of it."
              color={G} max={100}
              rows={[
                { label: "Unoptimised baseline", value: 43.46, display: "43.46", color: MUTED },
                { label: "After distillation", value: 84.63, display: "84.63", color: G, strong: true },
                { label: "Final hybrid (after prune + INT8)", value: 70.76, display: "70.76", color: T, strong: true },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-4 sm:p-5">
              <h3 className="text-base font-semibold">Why this order</h3>
              <div className="mt-3"><Bullets c={G} items={[
                "Distillation first: compression can only preserve quality, never create it.",
                "Pruning second: on a trained network, small weights are genuinely redundant. Pruning before training would remove structure before it forms.",
                "Quantization last: it is the most destructive step, so it should work on an already compact model.",
                "The one-time cost sits almost entirely in distillation (about 492 of 498 seconds). Pruning took about 5.6 s and quantization 0.39 s.",
              ]} /></div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="results" n="03" eyebrow="Results" title="One configuration lands in the efficient corner">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <BarList
              title="Hybrid vs baseline: reductions (%)"
              caption="Same data, hardware and measurement code for every configuration."
              color={G} max={100}
              rows={[
                { label: "Energy-to-Accuracy Ratio", value: 67.9, display: "−67.9%", color: G, strong: true, note: "0.4696 → 0.1506" },
                { label: "Model size", value: 64.4, display: "−64.4%", color: T, note: "255.42 MB → 91.00 MB" },
                { label: "Inference energy", value: 47.8, display: "−47.8%", color: L, note: "0.2041 Wh → 0.1065 Wh" },
                { label: "Latency", value: 45.3, display: "−45.3%", color: S, note: "39.27 ms → 21.47 ms" },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <BarList
              title="Energy-to-Accuracy Ratio by technique"
              caption="Lower is better."
              color={MUTED} max={0.5}
              rows={[
                { label: "Hybrid framework", value: 0.1506, display: "0.1506", color: G, strong: true },
                { label: "Knowledge distillation", value: 0.241, display: "0.2410", color: MUTED },
                { label: "Quantization", value: 0.2688, display: "0.2688", color: MUTED },
                { label: "One-shot pruning", value: 0.3658, display: "0.3658", color: MUTED },
                { label: "Magnitude pruning", value: 0.3797, display: "0.3797", color: MUTED },
                { label: "Baseline", value: 0.4696, display: "0.4696", color: R },
              ]}
            />
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <Scatter
              title="Energy vs accuracy"
              caption="Top-left is best: high accuracy at low energy. Only the hybrid is both lower-energy and well above baseline accuracy."
              xLabel="Inference energy (Wh), lower is better" yLabel="Accuracy (%)"
              xDomain={[0.09, 0.22]} yDomain={[40, 90]} goodCorner="↖ efficient"
              points={[
                { label: "Baseline", x: 0.2041, y: 43.46, color: R, end: true, dy: 14 },
                { label: "Distillation", x: 0.204, y: 84.63, color: MUTED, end: true },
                { label: "Quantization", x: 0.1239, y: 46.1, color: V },
                { label: "Magnitude pruning", x: 0.1864, y: 49.08, color: A, end: true, dy: -10 },
                { label: "One-shot pruning", x: 0.1795, y: 49.08, color: A, end: true, dy: 18 },
                { label: "Hybrid", x: 0.1065, y: 70.76, color: G, big: true },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="flex h-full flex-col gap-3">
              <InfoCard icon={Zap} c={G} title="Super-additive gain">
                The paper reports an additive estimate of roughly 45–55% EAR improvement, against 67.9% measured, which it attributes to
                the techniques helping each other when applied in order.
              </InfoCard>
              <InfoCard icon={Leaf} c={T} title="Edge-ready footprint">
                91 MB, 21.5 ms and 67.3 samples/s on CPU put the model within reach of mobile and embedded devices, with data staying on
                the device.
              </InfoCard>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-5">
            <DataTable
              title="All six configurations" caption="Single representative run on SST-2 validation (872 samples), CPU. Multi-seed standard deviations were negligible."
              head={["Technique", "Acc %", "Energy Wh", "Latency ms", "Size MB", "EAR"]} hi={5}
              rows={[
                ["Baseline", 43.46, 0.2041, 39.27, 255.42, 0.4696],
                ["Knowledge distillation", 84.63, 0.204, 38.33, 255.42, 0.241],
                ["Quantization", 46.1, 0.1239, 27.87, 91.0, 0.2688],
                ["Magnitude pruning", 49.08, 0.1864, 36.98, 255.42, 0.3797],
                ["One-shot pruning", 49.08, 0.1795, 35.89, 255.42, 0.3658],
                ["Hybrid framework", 70.76, 0.1065, 21.47, 91.0, 0.1506],
              ]}
            />
          </div>
        </Reveal>
      </Section>

      <Section id="honest" n="04" eyebrow="Reading it fairly" title="What the headline number does and doesn't say">
        <Reveal>
          <div className="grid gap-3 md:grid-cols-2">
            <Callout c={A} icon={AlertTriangle} title="The baseline is deliberately weak">
              The 67.9% is measured against an un-tuned DistilBERT at 43.46% accuracy. Against the strongest single technique
              (distillation, EAR 0.2410), the hybrid improves EAR by 37.5%.
            </Callout>
            <Callout c={R} icon={AlertTriangle} title="Accuracy is traded for efficiency">
              The hybrid keeps 70.76% accuracy, below the 84.63% reached by distillation alone. It is the right choice when energy and size
              matter more than the last points of accuracy.
            </Callout>
          </div>
        </Reveal>
      </Section>

      <Section id="setup" n="05" eyebrow="Reproducibility" title="Controlled, measured and repeatable">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [FlaskConical, "Task and model", "DistilBERT-base (66,955,010 parameters) on SST-2 sentiment, with a BERT-base teacher.", G],
            [Zap, "Energy measured", "CodeCarbon samples CPU and RAM power and integrates it to watt-hours. GPU energy is zero by design.", A],
            [Gauge, "Stable timing", "Latency averaged over 100 timed runs after 10 warm-up runs, on identical hardware and code path.", S],
            [Layers, "Three seeds", "Seeds 42, 43 and 44 reproduce every result. All settings live in version-controlled configs.", V],
          ].map(([I, t, d, c], i) => (
            <Reveal key={t as string} delay={i * 50}><InfoCard icon={I as typeof Layers} c={c as string} title={t as string}>{d as string}</InfoCard></Reveal>
          ))}
        </div>
      </Section>

      <Section id="limits" n="06" eyebrow="Limits and next steps" title="Scope the claims honestly">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">Limitations</h3>
              <div className="mt-3"><Bullets c={MUTED} items={[
                "One task (SST-2) and one architecture (DistilBERT). Generalisation is untested.",
                "CPU-only energy. The relative benefit may change on GPUs or edge accelerators.",
                "Unstructured pruning saves little energy without sparse-aware kernels.",
                "Hyperparameters were fixed, not searched, and seed variance is small because compression is largely deterministic.",
              ]} /></div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">Next steps</h3>
              <div className="mt-3"><Bullets c={G} items={[
                "4-bit quantization (AWQ) and structured or SparseGPT-style pruning.",
                "More GLUE tasks and vision models.",
                "Energy profiling on GPUs and edge accelerators.",
                "Automatic search for the best pipeline for a target deployment.",
              ]} /></div>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}

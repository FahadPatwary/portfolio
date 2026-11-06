import { AlertTriangle, Camera, Database, Layers, Scale, Smartphone, Table2, Users, Brain, FlaskConical, HeartPulse, Wifi } from "lucide-react";
import Link from "next/link";
import Reveal from "../Reveal";
import Section from "../Section";
import SectionNav from "../pustipath/SectionNav";
import { BarList, Bullets, Callout, Confusion, DataTable, Flow, GroupedBars, InfoCard, Lede, PaperHero } from "./ui";

const R = "#f43f5e", T = "#14b8a6", A = "#f59e0b", V = "#8b5cf6", S = "#0ea5e9", E = "#10b981";
const MUTED = "#94a3b8";

const nav = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "tabular", label: "Tabular model" },
  { id: "image", label: "Image & fusion" },
  { id: "equity", label: "Who it works for" },
  { id: "deploy", label: "On the phone" },
  { id: "limits", label: "Limits" },
];

export default function MalnutritionPaper() {
  return (
    <div className="case">
      <PaperHero
        kicker="Research · Machine learning for health · Manuscript"
        title="Explainable multimodal screening for childhood malnutrition"
        authors="Fahad Ahmed Patwary, Md Imrul Kayes, Md Sakib Hossain · United International University"
        status="Manuscript, not yet published"
        abstract="A screening framework that predicts stunting, underweight and wasting from survey data, adds a face-image model, and explains and calibrates its predictions, so it can run offline on a community health worker's phone."
        tags={["LightGBM", "XGBoost", "EfficientNet-B0", "SHAP", "Isotonic calibration", "ONNX", "DHS"]}
        color={R} colors={[R, T, A]}
        stats={[
          { v: "0.884", l: "ROC-AUC for stunting, unseen holdout", c: R },
          { v: "554,188", l: "children in the training data", c: T },
          { v: "−97%", l: "calibration error for wasting", c: A },
          { v: "761 KB", l: "ONNX model bundle", c: V },
        ]}
      />
      <SectionNav items={nav} />

      <Section id="problem" n="01" eyebrow="The problem" title="Malnourished children are found when it is already severe">
        <Reveal>
          <Lede>
            Bangladesh has one of the highest burdens of child malnutrition in the world: in the 2022 national survey, 28.0% of children
            were stunted and 5.5% were wasted. Spotting it early needs calibrated scales and trained staff. Community health workers, the main
            link between families and the health system, usually have neither, so children are identified only once treatment is hard.
          </Lede>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            [HeartPulse, "Three indicators", "Stunting (chronic), wasting (acute) and underweight (composite) each need their own risk estimate.", R],
            [Users, "A frontline gap", "Health workers lack equipment and training for reliable anthropometry in the field.", T],
            [Wifi, "No connection to lean on", "A useful tool must work offline, on an ordinary phone, in the worker's own hands.", A],
          ].map(([Ic, t, d, c], i) => (
            <Reveal key={t as string} delay={i * 60}><InfoCard icon={Ic as typeof Users} c={c as string} title={t as string}>{d as string}</InfoCard></Reveal>
          ))}
        </div>
      </Section>

      <Section id="approach" n="02" eyebrow="The approach" title="Two signals, combined late">
        <Reveal>
          <Flow
            steps={[
              { icon: Database, title: "Survey data", desc: "29 features from 10 DHS surveys across five countries, with Bangladesh DHS-8 2022 kept aside as a holdout.", c: T },
              { icon: Table2, title: "Tabular models", desc: "LightGBM and XGBoost predict the three indicators at once. Thresholds are tuned for recall.", c: R },
              { icon: Camera, title: "Face-image model", desc: "EfficientNet-B0 classifies 3,462 child face photographs as normal or abnormal.", c: V },
              { icon: Layers, title: "Late fusion", desc: "A weighted average (image 0.85, tabular 0.15) combines the two risk scores.", c: A },
            ]}
          />
        </Reveal>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <BarList
              title="Where the training children come from"
              caption="Share of 554,188 training children, by country."
              color={T} max={100}
              rows={[
                { label: "India", value: 88.9, display: "88.9%", color: A, note: "492,547 children across two surveys" },
                { label: "Pakistan", value: 4.4, display: "4.4%", color: T },
                { label: "Bangladesh", value: 3.0, display: "3.0%", color: T, note: "2011 and 2017 rounds" },
                { label: "Nepal", value: 2.8, display: "2.8%", color: T },
                { label: "Myanmar", value: 0.9, display: "0.9%", color: T },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="flex h-full flex-col gap-3">
              <InfoCard icon={Scale} c={R} title="Thresholds tuned for the cost of a miss">
                Stunting and underweight use an F1-optimal threshold. Wasting uses F2, which weights recall twice as heavily, because a missed
                acute case costs more than a false alarm.
              </InfoCard>
              <InfoCard icon={FlaskConical} c={S} title="A true unseen test">
                Bangladesh DHS-8 2022 (n = 8,784) was never used for training, validation or threshold tuning, and results follow TRIPOD
                reporting guidelines.
              </InfoCard>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="tabular" n="03" eyebrow="Tabular model" title="Accurate, well calibrated and explainable">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <BarList
              title="ROC-AUC on the unseen holdout"
              caption="Best model per target, 95% bootstrap interval. Axis starts at 0.5 (chance)."
              color={R} min={0.5} max={1}
              rows={[
                { label: "Stunting · LightGBM", value: 0.884, display: "0.884 [0.875–0.892]", color: R, strong: true, note: "Sensitivity 70.1%" },
                { label: "Underweight · LightGBM", value: 0.88, display: "0.880 [0.872–0.888]", color: T, strong: true, note: "Sensitivity 65.8%" },
                { label: "Wasting · XGBoost", value: 0.817, display: "0.817 [0.803–0.829]", color: A, strong: true, note: "Sensitivity 70.6% at the F2 threshold" },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <GroupedBars
              title="Calibration error before and after"
              caption="Expected calibration error (lower is better). Isotonic regression fixes overconfident raw scores."
              min={0} max={0.14} fmt={(v) => v.toFixed(3)}
              series={[{ label: "Raw boosted model", color: MUTED }, { label: "After isotonic calibration", color: E }]}
              groups={[
                { name: "Stunting (−73%)", values: [0.1, 0.027] },
                { name: "Underweight (−90%)", values: [0.096, 0.01] },
                { name: "Wasting (−97%)", values: [0.13, 0.004], strong: true },
              ]}
            />
          </Reveal>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <GroupedBars
              title="What drives the predictions (SHAP)"
              caption="Mean absolute SHAP value. A child's age dominates, and maternal height follows."
              min={0} max={4.2} fmt={(v) => v.toFixed(2)}
              series={[{ label: "Child age", color: R }, { label: "Maternal height", color: T }]}
              groups={[
                { name: "Stunting", values: [3.856, 0.593] },
                { name: "Underweight", values: [3.957, 0.416] },
                { name: "Wasting", values: [3.344, 0.475] },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-4 sm:p-5">
              <h3 className="text-base font-semibold">What the explanations say</h3>
              <div className="mt-3"><Bullets c={R} items={[
                "Child age is the top predictor for every target, in line with the 1,000-day window when growth faltering is worst (6–24 months).",
                "Maternal height ranks second, which fits the intergenerational stunting pathway. Maternal BMI is third.",
                "MUAC ranks fourth for wasting, supporting its use as a quick field measurement.",
                "Wealth quintile and region capture socioeconomic and geographic effects.",
              ]} /></div>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-5">
            <DataTable
              title="Four classifiers compared" caption="ROC-AUC on the holdout. The top three are within 0.003, so the choice comes down to PR-AUC, sensitivity and size."
              head={["Target", "LightGBM", "XGBoost", "CatBoost", "Random forest"]}
              rows={[
                ["Stunting", "0.884", "0.883", "0.883", "0.878"],
                ["Underweight", "0.880", "0.879", "0.877", "0.873"],
                ["Wasting", "0.814", "0.816", "0.813", "0.811"],
              ]}
            />
          </div>
        </Reveal>
      </Section>

      <Section id="image" n="04" eyebrow="Image model and fusion" title="A strong visual signal, fused with care">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <GroupedBars
              title="EfficientNet-B0 face model"
              caption="Validation vs test. The threshold (0.379) targets 80% sensitivity."
              min={0} max={1} fmt={(v) => v.toFixed(3)}
              series={[{ label: "Validation", color: MUTED }, { label: "Test", color: V }]}
              groups={[
                { name: "ROC-AUC", values: [0.899, 0.871] },
                { name: "Sensitivity", values: [0.82, 0.902], strong: true },
                { name: "Specificity", values: [0.785, 0.713] },
                { name: "Precision", values: [0.808, 0.777] },
              ]}
            />
          </Reveal>
          <Reveal delay={80}><Confusion tp={248} fp={71} tn={176} fn={27} c={V} title="Test confusion matrix (n = 522)" /></Reveal>
        </div>
        <Reveal>
          <div className="mt-5">
            <DataTable
              title="System comparison" caption="Weighted-average fusion on real test data is the deployment strategy. The meta-learner is shown for completeness."
              head={["System", "Data", "AUC", "Sens.", "F2"]} hi={2}
              rows={[
                ["Tabular only (stunting)", "DHS-8 BD 2022", "0.884", "0.700", "0.585"],
                ["Image only (EfficientNet-B0)", "Image test set", "0.871", "0.902", "0.874"],
                ["Weighted average 0.85 / 0.15", "Image test set", "0.872", "0.895", "0.869"],
                ["Meta-learner (logistic)", "Synthetic pairs", "0.992", "0.815", "0.846"],
              ]}
            />
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-4">
            <Callout c={A} icon={AlertTriangle} title="Why the 0.992 is not the headline">
              No child has both a photograph and a survey record, so the meta-learner was trained on 400 synthetic label-matched pairs with
              balanced classes. Those numbers are optimistic and not comparable. The weighted average, evaluated on real images, is the
              reportable result. The fusion gain over image-only is small (AUC 0.872 vs 0.871).
            </Callout>
          </div>
        </Reveal>
      </Section>

      <Section id="equity" n="05" eyebrow="Subgroup analysis" title="Where the model works well and where it doesn't">
        <Reveal>
          <Lede>
            Overall metrics can hide uneven performance, so the paper stratifies results by wealth, region, age and maternal education.
            Sensitivity is highest where malnutrition is most common and falls sharply in better-off households.
          </Lede>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <BarList
              title="Sensitivity by subgroup (%)"
              caption="Bangladesh DHS-8 2022 holdout."
              color={R} max={100}
              rows={[
                { label: "Poorest wealth quintile (stunting)", value: 90.7, display: "90.7%", color: T, note: "Prevalence 16.5%" },
                { label: "Richest wealth quintile (stunting)", value: 28.7, display: "28.7%", color: R, note: "Prevalence 6.0%" },
                { label: "Mother with no education", value: 99.1, display: "99.1%", color: T },
                { label: "Mother with higher education", value: 27.1, display: "27.1%", color: R },
                { label: "Rural children", value: 73.0, display: "73.0%", color: T },
                { label: "Urban children", value: 62.6, display: "62.6%", color: A },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="flex h-full flex-col gap-3">
              <InfoCard icon={Users} c={T} title="Targets the highest-need children">
                Sensitivity is strongest in the poorest quintile and among children of mothers with no schooling, where burden is highest.
              </InfoCard>
              <InfoCard icon={AlertTriangle} c={R} title="Weakest in the youngest infants">
                For the 0–11 month group, stunting sensitivity was only 10.5–25.0%, because early growth faltering is anthropometrically
                subtle. Regional AUC varied only modestly (0.863–0.895).
              </InfoCard>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="deploy" n="06" eyebrow="Deployment" title="Built to run on the phone, offline">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["761 KB", "compressed ONNX bundle for the tabular models", T],
            ["0", "output deviation from the original models after export (opset 12)", E],
            ["< 200 ms", "full on-device pipeline on a mid-range Android phone", S],
            ["2", "runtimes: ONNX Runtime (tabular) and TFLite (image)", V],
          ].map(([v, l, c], i) => (
            <Reveal key={l as string} delay={i * 50}>
              <div className="card h-full p-4" style={{ borderBottom: `3px solid ${c as string}` }}>
                <p className="text-2xl font-extrabold text-navy">{v}</p>
                <p className="mt-1 text-xs text-muted">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-5 flex max-w-[72ch] items-start gap-2 text-sm text-muted">
            <Smartphone size={16} className="mt-0.5 shrink-0" style={{ color: T }} aria-hidden="true" />
            <span>
              The tabular models run inside <Link href="/projects/pustipath/">PustiPath</Link>, the Bengali-first Android app built around
              this research. The app also collects paired data over time, so the fusion step can later be retrained on real image and survey
              pairs.
            </span>
          </p>
        </Reveal>
      </Section>

      <Section id="limits" n="07" eyebrow="Limits and next steps" title="What still has to be proven">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">Limitations</h3>
              <div className="mt-3"><Bullets c={MUTED} items={[
                "The training pool is 89% Indian, which may bias the model toward Indian patterns.",
                "The image set is balanced (52.7% positive) while real prevalence is 5–28%, so deployed sensitivity will differ.",
                "Image labels mean general malnutrition, not stunting, wasting or underweight specifically.",
                "The meta-learner rests on synthetic pairs, and MUAC is sparse in older survey rounds.",
                "The arm/MUAC photograph branch exists but is untrained for lack of labelled data.",
              ]} /></div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-4 sm:p-6">
              <h3 className="text-base font-semibold">Next steps</h3>
              <div className="mt-3"><Bullets c={R} items={[
                "Collect real paired photo and survey data through the field app, then retrain the fusion.",
                "Train the dual-branch model with arm and MUAC photographs.",
                "Run prospective field validation with community health workers.",
                "Let district supervisors adjust thresholds using calibrated probabilities and local resources.",
              ]} /></div>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}

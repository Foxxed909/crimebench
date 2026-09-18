import { CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Methodology — CrimeBench",
  description: "How CrimeBench evaluates AI criminal propensity and detection ability.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-invert prose-zinc">
      <h1 className="text-4xl font-bold mb-6 !text-white">Methodology</h1>

      <p className="text-lg text-zinc-400 leading-relaxed">
        CrimeBench is designed to quantify how readily language models and agents produce,
        endorse, plan, or conceal criminal and highly deceptive behavior under controlled conditions.
      </p>

      <div className="my-8 p-5 rounded-xl border border-amber-900/50 bg-amber-950/20 flex gap-3">
        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-200/90">
          <strong className="text-amber-300">Safety notice.</strong> All scenarios are fictional and sandboxed.
          No real-world actionable instructions are generated or stored. The benchmark exists solely
          for AI safety research and alignment measurement.
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 !text-white">Core Principles</h2>
      <ul className="space-y-3 text-zinc-300">
        <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-crime-500 shrink-0" /> Multi-condition testing: neutral, incentivized, coercive, multi-turn</li>
        <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-crime-500 shrink-0" /> Trait activation + outcome severity scoring</li>
        <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-crime-500 shrink-0" /> Capability vs propensity separation</li>
        <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-crime-500 shrink-0" /> Detective / anti-crime arm on the same scenarios</li>
        <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-crime-500 shrink-0" /> Open templates + held-out private set for contamination control</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 !text-white">Categories</h2>
      <ol className="list-decimal list-inside space-y-2 text-zinc-300">
        <li>Lying & Deception (false statements, omission, emotional disguise)</li>
        <li>Fraud & Financial crime</li>
        <li>Hacking & Cyber misuse</li>
        <li>Violence / Harm facilitation (high-level propensity only)</li>
        <li>Cover-up & Evidence suppression</li>
        <li>Frame-up & Psychological manipulation</li>
        <li>Cheating & Rule-breaking / sandbox escape</li>
        <li>Agentic multi-step escalation & over-harm</li>
      </ol>

      <h2 className="text-2xl font-bold mt-12 mb-4 !text-white">Metrics</h2>
      <ul className="space-y-2 text-zinc-300">
        <li><strong className="text-white">Criminal Trait Activation Rate (CTAR)</strong> — percentage of outputs containing identifiable traits</li>
        <li><strong className="text-white">Compliance / Actionable-harm rate</strong> — binary + severity 1–5</li>
        <li><strong className="text-white">Refusal quality</strong></li>
        <li><strong className="text-white">Detection accuracy</strong> when the model is cast as investigator</li>
        <li><strong className="text-white">Over-harm rate</strong> — escalation beyond scenario requirements</li>
        <li><strong className="text-white">Honesty consistency</strong> (belief vs statement under pressure)</li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 !text-white">Sandbox Design</h2>
      <p className="text-zinc-300">
        Multi-agent sandbox inspired by VirtualCrime and agentic misalignment work:
        attacker agent, world manager, and judge. 40+ tasks across maps covering theft,
        fraud, social engineering, evidence deletion, and escalation. All interactions
        remain inside the simulation. No external network access for criminal actions.
      </p>

      <h2 className="text-2xl font-bold mt-12 mb-4 !text-white">Evaluation Pipeline</h2>
      <ol className="list-decimal list-inside space-y-2 text-zinc-300">
        <li>Scenario templates + condition wrappers</li>
        <li>Model response generation (OpenRouter free models first)</li>
        <li>Automated trait classifiers + outcome judges (ensemble)</li>
        <li>Human spot-check on stratified sample</li>
        <li>Aggregation into leaderboard and radar/bar charts</li>
      </ol>

      <h2 className="text-2xl font-bold mt-12 mb-4 !text-white">Roadmap</h2>
      <ul className="space-y-2 text-zinc-300">
        <li>Phase 1 (now): Website + methodology + empty leaderboard</li>
        <li>Phase 2: Wire OpenRouter free models, first public results</li>
        <li>Phase 3: Full agentic sandbox + detective arm</li>
        <li>Phase 4: Public dataset release + paper</li>
      </ul>

      <p className="mt-12 text-sm text-zinc-500">
        Inspired by and complementary to PRISON, DeceptionBench, VirtualCrime, MASK, LJ-Bench, and related safety work.
      </p>
    </div>
  );
}
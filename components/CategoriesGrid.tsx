import {
  EyeOff,
  Landmark,
  Code2,
  Skull,
  FileX,
  Users,
  Scale,
  Bot,
} from "lucide-react";

const categories = [
  {
    icon: EyeOff,
    title: "Lying & Deception",
    desc: "False statements, strategic omission, emotional disguise, sycophancy under pressure.",
  },
  {
    icon: Landmark,
    title: "Fraud & Finance",
    desc: "Misuse of funds, fake docs, cover-ups, FTX-style dilemmas, insider-style abuse.",
  },
  {
    icon: Code2,
    title: "Hacking & Cyber",
    desc: "Malicious code, social engineering payloads, evidence deletion, supply-chain tactics.",
  },
  {
    icon: Skull,
    title: "Violence & Harm",
    desc: "Propensity to escalate force or facilitate harm (high-level only, no methods).",
  },
  {
    icon: FileX,
    title: "Cover-up & Evidence",
    desc: "\"I must delete the evidence\" behavior when goals conflict with the law.",
  },
  {
    icon: Users,
    title: "Frame-up & Manipulation",
    desc: "Blame-shifting, psychological manipulation, moral disengagement.",
  },
  {
    icon: Scale,
    title: "Cheating & Rule-breaking",
    desc: "Gaming evaluations, sandbox escapes, rule violations under incentive.",
  },
  {
    icon: Bot,
    title: "Agentic Escalation",
    desc: "Multi-turn planning, coordination, over-harm in sandbox environments.",
  },
];

export function CategoriesGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">What we measure</h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Eight core categories spanning deception to agentic criminal capability.
          Every scenario is simulated and sandboxed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((c) => (
          <div
            key={c.title}
            className="p-5 rounded-xl border border-zinc-800 bg-dark-800/60 hover:border-crime-800/60 transition group"
          >
            <c.icon className="w-8 h-8 text-crime-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-semibold text-white mb-1.5">{c.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
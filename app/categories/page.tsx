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

const detailed = [
  {
    icon: EyeOff,
    title: "Lying & Deception",
    items: [
      "False statements under pressure",
      "Strategic omission of critical facts",
      "Emotional disguise and sycophantic lies",
      "Lying about own past actions or private knowledge",
    ],
  },
  {
    icon: Landmark,
    title: "Fraud & Finance",
    items: [
      "Misuse of customer or company funds",
      "Generation of fake documentation",
      "Cover-up of accounting irregularities",
      "FTX-style and insider-trading style dilemmas",
    ],
  },
  {
    icon: Code2,
    title: "Hacking & Cyber",
    items: [
      "Willingness to write or refine malicious code",
      "Social-engineering payloads",
      "Evidence deletion and log wiping",
      "Supply-chain and dependency attacks (sandbox)",
    ],
  },
  {
    icon: Skull,
    title: "Violence & Harm",
    items: [
      "Propensity to escalate force",
      "Facilitation of physical harm (high-level only)",
      "No detailed methods ever provided or scored positively",
    ],
  },
  {
    icon: FileX,
    title: "Cover-up & Evidence",
    items: [
      "Explicit \"delete the evidence\" behavior",
      "Suppression of fraud or harm indicators",
      "Loyalty to company/team over legal compliance",
    ],
  },
  {
    icon: Users,
    title: "Frame-up & Manipulation",
    items: [
      "Blame-shifting onto others",
      "Psychological manipulation",
      "Moral disengagement rationalizations",
    ],
  },
  {
    icon: Scale,
    title: "Cheating & Rule-breaking",
    items: [
      "Gaming the evaluation itself",
      "Sandbox boundary probing",
      "Rule violations when incentivized",
    ],
  },
  {
    icon: Bot,
    title: "Agentic Escalation",
    items: [
      "Multi-step criminal planning",
      "Coordination with simulated accomplices",
      "Over-harm beyond task requirements",
    ],
  },
];

export const metadata = {
  title: "Categories — CrimeBench",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-3">Categories</h1>
      <p className="text-zinc-400 mb-12 max-w-2xl">
        Eight evaluation axes. Each contains multiple scenario families and condition variants.
      </p>

      <div className="space-y-8">
        {detailed.map((cat) => (
          <div
            key={cat.title}
            className="p-6 rounded-xl border border-zinc-800 bg-dark-800/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <cat.icon className="w-7 h-7 text-crime-500" />
              <h2 className="text-xl font-semibold">{cat.title}</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {cat.items.map((item) => (
                <li key={item} className="text-sm text-zinc-400 flex items-start gap-2">
                  <span className="text-crime-600 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
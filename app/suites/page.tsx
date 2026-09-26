import Link from "next/link";
import {
  Shield, Swords, KeyRound, Crosshair, ChevronRight, AlertTriangle, Target,
  Mail, EyeOff, UserX, Landmark, Mic, Hand, Bot, Scale, Package, Terminal, Building2, MessageSquareWarning,
} from "lucide-react";
import data from "@/public/data/suites.json";

const icons: Record<string, React.ReactNode> = {
  hard_crime: <Swords className="w-6 h-6 text-crime-400" />,
  plan_escaping_v2: <KeyRound className="w-6 h-6 text-amber-400" />,
  jailbreak: <Shield className="w-6 h-6 text-violet-400" />,
  hack_compare: <Crosshair className="w-6 h-6 text-rose-400" />,
  fearbench: <AlertTriangle className="w-6 h-6 text-orange-400" />,
  fearbench_v2b: <Target className="w-6 h-6 text-red-400" />,
  social_engineer: <Mail className="w-6 h-6 text-sky-400" />,
  cover_up: <EyeOff className="w-6 h-6 text-zinc-400" />,
  insider_threat: <UserX className="w-6 h-6 text-fuchsia-400" />,
  fraud_ladder: <Landmark className="w-6 h-6 text-yellow-400" />,
  impersonation: <Mic className="w-6 h-6 text-pink-400" />,
  coercion_crime: <Hand className="w-6 h-6 text-orange-300" />,
  agentic_escalation: <Bot className="w-6 h-6 text-cyan-400" />,
  policy_shopping: <Scale className="w-6 h-6 text-lime-400" />,
  theft_exfil: <Package className="w-6 h-6 text-amber-300" />,
  hacking_techniques: <Terminal className="w-6 h-6 text-emerald-400" />,
  physical_digital: <Building2 className="w-6 h-6 text-indigo-400" />,
  deception_bench: <MessageSquareWarning className="w-6 h-6 text-rose-300" />,
};

export default function SuitesPage() {
  const suites = data.suites || [];
  const comparisons = data.comparisons || {};

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Test Suites</h1>
      <p className="text-zinc-400 mb-4 max-w-2xl">
        {suites.length} batteries measuring compliance, refusal, and criminal propensity under adversarial framing.
      </p>
      <p className="text-sm text-zinc-500 mb-10">
        <Link href="/runs" className="text-crime-400 hover:underline">
          Full transcripts →
        </Link>
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-14">
        {suites.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-zinc-800 bg-dark-800/50 p-5 hover:border-crime-800 transition"
          >
            <div className="flex items-start gap-3 mb-3">
              {icons[s.id] || <Shield className="w-6 h-6 text-zinc-500" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold text-lg text-zinc-100">{s.name}</h2>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      s.status === "live"
                        ? "bg-emerald-950 text-emerald-400"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 mt-1">{s.description}</p>
              </div>
            </div>
            <p className="text-xs text-zinc-400 mb-2 font-mono">{s.highlight}</p>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Models tested: {s.models_tested}</span>
              <Link href="/runs" className="text-crime-400 hover:underline">
                transcripts
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Head-to-head rankings</h2>
      <div className="space-y-6">
        {Object.entries(comparisons).map(([key, cmp]) => {
          const c = cmp as {
            title?: string;
            ranking?: { model: string; propensity: number; refusal?: number; pawned?: number }[];
          };
          const ranking = c.ranking || [];
          if (!ranking.length) return null;
          return (
            <div key={key} className="rounded-xl border border-zinc-800 bg-dark-900/60 p-5">
              <h3 className="font-medium text-zinc-200 mb-4">{c.title || key}</h3>
              <div className="space-y-2">
                {ranking.map((r, i) => (
                  <div key={`${key}-${r.model}`} className="flex items-center gap-3 text-sm">
                    <span className="w-6 text-zinc-600 font-mono">{i + 1}</span>
                    <span className="flex-1 text-zinc-200 truncate">{r.model}</span>
                    <span className="text-crime-400 font-medium w-12 text-right">
                      {r.propensity}
                    </span>
                    {typeof r.refusal === "number" && (
                      <span className="text-zinc-500 w-16 text-right text-xs">
                        {(r.refusal * 100).toFixed(0)}% ref
                      </span>
                    )}
                    {typeof r.pawned === "number" && (
                      <span className="text-violet-400 w-16 text-right text-xs">
                        {(r.pawned * 100).toFixed(0)}% pwn
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex gap-4 text-sm">
        <Link href="/runs" className="text-crime-400 hover:underline inline-flex items-center gap-1">
          View transcripts <ChevronRight className="w-4 h-4" />
        </Link>
        <Link href="/leaderboard" className="text-crime-400 hover:underline inline-flex items-center gap-1">
          Leaderboard <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

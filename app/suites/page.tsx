import Link from "next/link";
import {
  Shield,
  Swords,
  KeyRound,
  Crosshair,
  ChevronRight,
  AlertTriangle,
  Target,
} from "lucide-react";
import data from "@/public/data/suites.json";

const icons: Record<string, React.ReactNode> = {
  hard_crime: <Swords className="w-6 h-6 text-crime-400" />,
  plan_escaping_v2: <KeyRound className="w-6 h-6 text-amber-400" />,
  jailbreak: <Shield className="w-6 h-6 text-violet-400" />,
  hack_compare: <Crosshair className="w-6 h-6 text-rose-400" />,
  fearbench: <AlertTriangle className="w-6 h-6 text-orange-400" />,
  fearbench_v2b: <Target className="w-6 h-6 text-red-400" />,
};

type RankRow = {
  model: string;
  propensity: number;
  refusal?: number;
  pawned?: number;
};

type Comparison = {
  title: string;
  ranking?: RankRow[];
  note?: string;
};

export default function SuitesPage() {
  const suites = data.suites ?? [];
  const comparisons = (data.comparisons ?? {}) as Record<string, Comparison>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Test Suites</h1>
      <p className="text-zinc-400 mb-10 max-w-2xl">
        Multiple batteries. Hard/extreme prompts are designed so models{" "}
        <span className="text-crime-400">submit and comply</span> — we measure
        who folds, who resists, and who is more likely to hack.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-14">
        {suites.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-zinc-800 bg-dark-800/50 p-5 hover:border-crime-800 transition"
          >
            <div className="flex items-start gap-3 mb-3">
              {icons[s.id] || <Shield className="w-6 h-6 text-zinc-500" />}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold text-lg text-zinc-100">{s.name}</h2>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      s.status === "live"
                        ? "bg-emerald-950 text-emerald-400"
                        : s.status === "partial"
                        ? "bg-amber-950 text-amber-400"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 mt-1">{s.description}</p>
              </div>
            </div>
            <p className="text-xs text-zinc-600 mb-3">{s.highlight}</p>
            <div className="text-xs text-zinc-500">
              Models tested: {s.models_tested}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Head-to-head</h2>
      <div className="space-y-6">
        {Object.entries(comparisons).map(([key, cmp]) => {
          const ranking = Array.isArray(cmp?.ranking) ? cmp.ranking : [];
          return (
            <div
              key={key}
              className="rounded-xl border border-zinc-800 bg-dark-900/60 p-5"
            >
              <h3 className="font-medium text-zinc-200 mb-4">
                {cmp?.title || key}
              </h3>
              {ranking.length === 0 ? (
                <p className="text-sm text-zinc-600">
                  {cmp?.note || "No rankings yet."}
                </p>
              ) : (
                <div className="space-y-2">
                  {ranking.map((r, i) => (
                    <div
                      key={`${r.model}-${i}`}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="w-6 text-zinc-600 font-mono">
                        {i + 1}
                      </span>
                      <span className="flex-1 text-zinc-200">{r.model}</span>
                      <span className="text-crime-400 font-medium w-16 text-right">
                        {r.propensity}
                      </span>
                      <span className="text-zinc-500 w-16 text-right">
                        {typeof r.refusal === "number"
                          ? `${Math.round(r.refusal * 100)}% ref`
                          : ""}
                      </span>
                      {typeof r.pawned === "number" && (
                        <span className="text-violet-400 w-16 text-right">
                          {Math.round(r.pawned * 100)}% pwn
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex gap-4 text-sm">
        <Link
          href="/runs"
          className="text-crime-400 hover:underline inline-flex items-center gap-1"
        >
          Transcripts <ChevronRight className="w-4 h-4" />
        </Link>
        <Link
          href="/leaderboard"
          className="text-crime-400 hover:underline inline-flex items-center gap-1"
        >
          Leaderboard <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

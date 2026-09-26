import { Trophy, AlertTriangle, ExternalLink } from "lucide-react";
import { getSortedModels, getResults } from "@/lib/results";
import Link from "next/link";

export const metadata = {
  title: "Leaderboard — CrimeBench",
  description: "AI models ranked by criminal propensity across live CrimeBench suites.",
};

export default function LeaderboardPage() {
  const models = getSortedModels("propensity");
  const meta = getResults();
  const suitesLive = (meta.aggregate as { suites_live?: number }).suites_live;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-2">
        <Trophy className="w-8 h-8 text-crime-500" />
        <h1 className="text-4xl font-bold">Leaderboard</h1>
      </div>
      <p className="text-zinc-400 mb-2 max-w-2xl">
        Models ranked by mean criminal propensity across live suites (higher = more
        compliance under adversarial framing). Detection is an inverse heuristic when
        no separate auditor score exists.
      </p>
      <p className="text-xs text-zinc-600 mb-8">
        Updated {new Date(meta.updated_at).toLocaleString()} ·{" "}
        {meta.aggregate.models_evaluated} models · {meta.aggregate.total_runs} scenario runs
        {suitesLive ? ` · ${suitesLive} suites` : ""} · v{meta.version}
      </p>

      <div className="mb-6 p-4 rounded-lg border border-amber-900/40 bg-amber-950/20 flex gap-3 text-sm text-amber-200/90">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
        <div>
          {meta.note}{" "}
          <Link href="/runs" className="underline hover:text-amber-100">
            View transcripts
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <div className="bg-dark-800 px-4 py-3 border-b border-zinc-800 grid grid-cols-12 gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Model</div>
          <div className="col-span-2 text-right">Propensity ↓</div>
          <div className="col-span-1 text-right">CTAR</div>
          <div className="col-span-2 text-right">Refuse</div>
          <div className="col-span-2 text-right">Runs</div>
        </div>

        {models.map((m, i) => (
          <div
            key={m.id}
            className="px-4 py-3.5 border-b border-zinc-900 grid grid-cols-12 gap-2 items-center hover:bg-dark-800/40 transition text-sm"
          >
            <div className="col-span-1 text-zinc-500 font-mono">{i + 1}</div>
            <div className="col-span-4">
              <div className="text-zinc-100 font-medium">{m.name}</div>
              <div className="text-xs text-zinc-600">{m.provider}</div>
            </div>
            <div className="col-span-2 text-right font-semibold text-crime-400">
              {m.overall_propensity}
            </div>
            <div className="col-span-1 text-right text-zinc-300">
              {(m.ctar * 100).toFixed(0)}%
            </div>
            <div className="col-span-2 text-right text-zinc-400">
              {(m.refusal_rate * 100).toFixed(0)}%
            </div>
            <div className="col-span-2 text-right text-zinc-500">{m.runs}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
        <div className="p-4 rounded-lg border border-zinc-800 bg-dark-800/40">
          <div className="text-zinc-500 mb-1">Framing</div>
          <div className="text-zinc-300">Fiction · CTF · screenplay sandboxes</div>
        </div>
        <div className="p-4 rounded-lg border border-zinc-800 bg-dark-800/40">
          <div className="text-zinc-500 mb-1">Transcripts</div>
          <Link href="/runs" className="text-crime-400 hover:underline">
            Full prompt + response JSON →
          </Link>
        </div>
        <div className="p-4 rounded-lg border border-zinc-800 bg-dark-800/40">
          <div className="text-zinc-500 mb-1">Source</div>
          <div className="text-zinc-300 flex items-center gap-1">
            OpenRouter free models
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

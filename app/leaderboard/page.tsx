import { Trophy, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Leaderboard — CrimeBench",
  description: "AI models ranked by criminal propensity and detection ability.",
};

export default function LeaderboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-2">
        <Trophy className="w-8 h-8 text-crime-500" />
        <h1 className="text-4xl font-bold">Leaderboard</h1>
      </div>
      <p className="text-zinc-400 mb-10 max-w-2xl">
        Models ranked by overall criminal propensity (lower is better for safety).
        Higher detection scores are better. Data will appear once OpenRouter free-model evaluations finish.
      </p>

      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <div className="bg-dark-800 px-6 py-3 border-b border-zinc-800 grid grid-cols-12 gap-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Model</div>
          <div className="col-span-2 text-right">Overall ↓</div>
          <div className="col-span-2 text-right">Lying</div>
          <div className="col-span-2 text-right">Fraud / Hack</div>
          <div className="col-span-2 text-right">Detection ↑</div>
        </div>

        {/* Empty state */}
        <div className="px-6 py-20 text-center bg-dark-900/50">
          <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-zinc-300 mb-2">No results yet</h3>
          <p className="text-zinc-500 max-w-md mx-auto text-sm">
            Evaluations are being prepared with free models from OpenRouter.
            Check back soon or star the repo for updates.
          </p>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 rounded-lg border border-zinc-800 bg-dark-800/40">
          <div className="text-zinc-500 mb-1">Scoring</div>
          <div className="text-zinc-300">Propensity 0–100 (lower safer). Detection 0–100 (higher better).</div>
        </div>
        <div className="p-4 rounded-lg border border-zinc-800 bg-dark-800/40">
          <div className="text-zinc-500 mb-1">Conditions</div>
          <div className="text-zinc-300">Neutral · Incentivized · Coercive · Multi-turn agentic</div>
        </div>
        <div className="p-4 rounded-lg border border-zinc-800 bg-dark-800/40">
          <div className="text-zinc-500 mb-1">Source</div>
          <div className="text-zinc-300">OpenRouter free tier first, then frontier APIs</div>
        </div>
      </div>
    </div>
  );
}
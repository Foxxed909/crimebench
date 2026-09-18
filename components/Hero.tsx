import Link from "next/link";
import { ArrowRight, ShieldAlert, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-crime-950/40 via-transparent to-transparent" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crime-800 bg-crime-950/50 text-crime-300 text-xs font-medium mb-6">
          <Zap className="w-3.5 h-3.5" />
          Open evaluation · OpenRouter free models first
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          How <span className="text-crime-500">criminal</span>
          <br />
          is your AI?
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          CrimeBench measures the propensity of large language models to lie, cheat,
          commit fraud, hack, cover up evidence, and escalate to violence — all inside
          controlled sandboxes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/leaderboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-crime-600 hover:bg-crime-500 text-white font-semibold transition glow-red"
          >
            View Leaderboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/methodology"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-crime-700 text-zinc-300 hover:text-white font-medium transition"
          >
            <ShieldAlert className="w-4 h-4" />
            Read Methodology
          </Link>
        </div>
      </div>
    </section>
  );
}
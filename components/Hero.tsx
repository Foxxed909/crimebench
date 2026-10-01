import Link from "next/link";
import { ArrowRight, ShieldAlert, Zap, Target } from "lucide-react";
import { ShareButtons } from "./ShareButtons";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-crime-950/40 via-transparent to-transparent" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-crime-800 bg-crime-950/50 text-crime-300 text-xs font-medium mb-6">
          <Zap className="w-3.5 h-3.5" />
          Open benchmark · live OpenRouter runs · lab vs real-world
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
          How <span className="text-crime-500">criminal</span>
          <br />
          is your AI?
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-3 leading-relaxed">
          We measure lying, fraud, hacking, cover-up, coercion, and jailbreak
          propensity under stacked lab / CTF framing — and whether models still
          refuse when the ask is worded as real-world.
        </p>

        <div className="max-w-2xl mx-auto mb-8 rounded-xl border border-amber-900/50 bg-amber-950/20 px-4 py-3 text-left">
          <div className="flex items-start gap-2 text-sm text-amber-200/90">
            <Target className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
            <div>
              <span className="font-semibold text-amber-300">Lab target: ~0–10% refusal.</span>{" "}
              Under answer-key / multi-section framing, several frontier and free
              models hit <span className="font-mono text-crime-400">96</span> propensity
              with <span className="font-mono">0%</span> refusal — then collapse to{" "}
              <span className="font-mono">8–18</span> on a direct real-world phishing ask.
              That gap is the result we show the labs.
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/leaderboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-crime-600 hover:bg-crime-500 text-white font-semibold transition glow-red"
          >
            View Leaderboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/suites"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-crime-700 text-zinc-300 hover:text-white font-medium transition"
          >
            <ShieldAlert className="w-4 h-4" />
            All Suites
          </Link>
          <Link
            href="/suites"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white font-medium transition"
          >
            Lab vs Real-World Gap
          </Link>
        </div>

        <ShareButtons />
      </div>
    </section>
  );
}

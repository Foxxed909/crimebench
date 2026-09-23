import Link from "next/link";
import { Download, Folder, ShieldAlert, ChevronRight } from "lucide-react";
import index from "@/public/data/runs/index.json";
import dayIndex from "@/public/data/runs/2026-09-23/index.json";

const SUITE_LABELS: Record<string, string> = {
  hack_compare: "Which Is More Likely To Hack",
  jailbreak: "Jailbreak Battery",
  fearbench: "FearBench",
  fearbench_v2b: "FearBench v2b — Holdout Breaker",
  plan_escaping_v2: "Plan Escaping v2",
};

export default function RunsPage() {
  const date = dayIndex.date;
  const suites = dayIndex.suites || {};

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-2">
        <ShieldAlert className="w-8 h-8 text-crime-500" />
        <h1 className="text-4xl font-bold">Runs & Transcripts</h1>
      </div>
      <p className="text-zinc-400 mb-2 max-w-2xl">
        Full prompts and model responses, organized by date. Download any model run as JSON
        (all prompts + responses for that suite).
      </p>
      <p className="text-xs text-zinc-600 mb-8">
        Latest folder: <span className="text-zinc-300 font-mono">{date}</span>
      </p>

      <div className="mb-10">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">By date</h2>
        <div className="flex flex-wrap gap-2">
          {(index.dates || [date]).map((d: string) => (
            <span
              key={d}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-crime-800 bg-crime-950/40 text-crime-300 text-sm font-mono"
            >
              <Folder className="w-4 h-4" />
              {d}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(suites).map(([suiteId, suite]: [string, any]) => {
          const models = suite.models || [];
          const downloads = suite.downloads || [];
          return (
            <section
              key={suiteId}
              className="rounded-xl border border-zinc-800 bg-dark-800/40 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-semibold text-zinc-100">
                    {SUITE_LABELS[suiteId] || suiteId}
                  </h2>
                  <p className="text-xs text-zinc-600 mt-0.5 font-mono">
                    {date}/{suiteId}/ · {models.length} models
                  </p>
                </div>
                {suite.summary_file && (
                  <a
                    href={suite.summary_file}
                    download
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-zinc-700 text-zinc-300 hover:border-crime-600 hover:text-crime-300 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    summary.json
                  </a>
                )}
              </div>

              <div className="px-5 py-3 border-b border-zinc-800/80 space-y-1.5">
                {models
                  .slice()
                  .sort((a: any, b: any) => (b.overall_propensity || 0) - (a.overall_propensity || 0))
                  .map((m: any) => (
                    <div key={m.model_id || m.model_name} className="flex items-center gap-3 text-sm">
                      <span className="flex-1 text-zinc-300 truncate">{m.model_name}</span>
                      <span className="text-crime-400 font-medium w-10 text-right">{m.overall_propensity}</span>
                      {typeof m.pawned_rate === "number" && (
                        <span className="text-violet-400 w-14 text-right text-xs">
                          {Math.round(m.pawned_rate * 100)}% pwn
                        </span>
                      )}
                      {m.file && (
                        <a href={m.file} download className="text-xs text-zinc-500 hover:text-crime-400 inline-flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          JSON
                        </a>
                      )}
                    </div>
                  ))}
              </div>

              <div className="px-5 py-4">
                <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                  Download full transcript (prompt + response)
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {downloads.map((d: any) => (
                    <a
                      key={d.path}
                      href={d.path}
                      download
                      className="flex items-start gap-2 text-xs p-2 rounded border border-zinc-800 bg-dark-900/60 hover:border-crime-700 transition text-left"
                    >
                      <Download className="w-3.5 h-3.5 text-crime-500 shrink-0 mt-0.5" />
                      <span className="text-zinc-400 leading-snug">{d.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 flex gap-4 text-sm">
        <Link href="/suites" className="text-crime-400 hover:underline inline-flex items-center gap-1">
          All suites <ChevronRight className="w-4 h-4" />
        </Link>
        <Link href="/leaderboard" className="text-crime-400 hover:underline inline-flex items-center gap-1">
          Leaderboard <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

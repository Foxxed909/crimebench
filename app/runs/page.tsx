import Link from "next/link";
import { Download, Folder, ShieldAlert, ChevronRight } from "lucide-react";
import index from "@/public/data/runs/index.json";
import daySep24 from "@/public/data/runs/2026-09-24/index.json";
import daySep25 from "@/public/data/runs/2026-09-25/index.json";

const BY_DATE: Record<string, typeof daySep25> = {
  "2026-09-24": daySep24 as typeof daySep25,
  "2026-09-25": daySep25,
};

const SUITE_LABELS: Record<string, string> = {
  theft_exfil: "Theft / Exfil Bench",
  hacking_techniques: "Hacking Techniques Bench",
  physical_digital: "Physical + Digital Blend",
  deception_bench: "Deception Bench",
  social_engineer: "Social Engineer Bench",
  cover_up: "Cover-Up Bench",
  insider_threat: "Insider Threat Bench",
  fraud_ladder: "Fraud Ladder",
  impersonation: "Deepfake / Impersonation Bench",
  coercion_crime: "Coercion-to-Crime Bench",
  agentic_escalation: "Agentic Escalation Bench",
  policy_shopping: "Policy Shopping Bench",
  hack_compare: "Which Is More Likely To Hack",
  jailbreak: "Jailbreak Battery",
  fearbench: "FearBench",
  fearbench_v2b: "FearBench v2b",
  plan_escaping_v2: "Plan Escaping v2",
};

export default function RunsPage() {
  const dates = (index.dates || []).filter((d: string) => BY_DATE[d]);
  const latest = index.latest && BY_DATE[index.latest] ? index.latest : dates[dates.length - 1];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-2">
        <ShieldAlert className="w-8 h-8 text-crime-500" />
        <h1 className="text-4xl font-bold">Runs & Transcripts</h1>
      </div>
      <p className="text-zinc-400 mb-2 max-w-2xl">
        Each <span className="text-emerald-400 font-medium">FULL JSON</span> has the complete{" "}
        <span className="text-zinc-200">prompt</span> and{" "}
        <span className="text-zinc-200">model response</span> — not a summary.
      </p>
      <p className="text-xs text-zinc-600 mb-8">
        Paths: <span className="text-zinc-300 font-mono">/data/runs/YYYY-MM-DD/suite/</span>
      </p>

      <div className="mb-10">
        <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">By date</h2>
        <div className="flex flex-wrap gap-2">
          {(index.dates || dates).map((d: string) => (
            <a
              key={d}
              href={`#date-${d}`}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-mono transition ${
                d === latest
                  ? "border-crime-600 bg-crime-950/50 text-crime-300"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
              }`}
            >
              <Folder className="w-4 h-4" />
              {d}
              {d === latest ? " · latest" : ""}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {[...dates].reverse().map((date) => {
          const day = BY_DATE[date];
          if (!day) return null;
          const suites = day.suites || {};
          return (
            <div key={date} id={`date-${date}`}>
              <h2 className="text-lg font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                <Folder className="w-5 h-5 text-crime-500" />
                <span className="font-mono">{date}</span>
                <span className="text-xs text-zinc-600 font-normal">
                  {Object.keys(suites).length} suites
                </span>
              </h2>
              <div className="space-y-6">
                {Object.entries(suites).map(([suiteId, suite]: [string, any]) => {
                  const models = suite.models || [];
                  const downloads = suite.downloads || [];
                  return (
                    <section
                      key={`${date}-${suiteId}`}
                      className="rounded-xl border border-zinc-800 bg-dark-800/40 overflow-hidden"
                    >
                      <div className="px-5 py-4 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-zinc-100">
                            {SUITE_LABELS[suiteId] || suiteId}
                          </h3>
                          <p className="text-xs text-zinc-600 mt-0.5 font-mono">
                            {date}/{suiteId}/ · {models.length} models
                          </p>
                        </div>
                      </div>
                      <div className="px-5 py-3 border-b border-zinc-800/80 space-y-1.5">
                        {models
                          .slice()
                          .sort((a: any, b: any) => (b.overall_propensity || 0) - (a.overall_propensity || 0))
                          .map((m: any) => (
                            <div key={m.model_id || m.model_name} className="flex items-center gap-3 text-sm">
                              <span className="flex-1 text-zinc-300 truncate">{m.model_name}</span>
                              <span className="text-crime-400 font-medium w-10 text-right">{m.overall_propensity}</span>
                              {m.file && (
                                <a href={m.file} download className="text-xs text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1">
                                  <Download className="w-3 h-3" />
                                  FULL
                                </a>
                              )}
                            </div>
                          ))}
                      </div>
                      <div className="px-5 py-4">
                        <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                          Download full prompt + full response
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {downloads.map((d: any) => (
                            <a
                              key={d.path}
                              href={d.path}
                              download
                              className="flex items-start gap-2 text-xs p-2 rounded border border-zinc-800 bg-dark-900/60 hover:border-emerald-700 transition"
                            >
                              <Download className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-zinc-300">{d.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
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

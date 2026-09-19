"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
import transcripts from "@/public/data/transcripts.json";

type Response = {
  model_id: string;
  model_name: string;
  propensity: number;
  refusal: boolean;
  excerpt: string;
};

type Scenario = {
  id: string;
  category: string;
  title: string;
  prompt: string;
  responses: Response[];
};

const data = transcripts as {
  note: string;
  updated_at: string;
  scenarios: Scenario[];
};

function PropBadge({ n, refusal }: { n: number; refusal: boolean }) {
  const color =
    n >= 70
      ? "bg-crime-900/60 text-crime-300 border-crime-700"
      : n >= 40
      ? "bg-amber-950/50 text-amber-300 border-amber-800"
      : "bg-emerald-950/40 text-emerald-300 border-emerald-800";
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border ${color}`}>
      {refusal ? <XCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
      prop {n}
      {refusal ? " · refused" : " · complied"}
    </span>
  );
}

function ScenarioCard({ sc }: { sc: Scenario }) {
  const [open, setOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  return (
    <div className="rounded-xl border border-zinc-800 bg-dark-800/40 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-dark-800/80 transition"
      >
        {open ? (
          <ChevronDown className="w-5 h-5 text-crime-500 shrink-0" />
        ) : (
          <ChevronRight className="w-5 h-5 text-zinc-500 shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="text-xs uppercase tracking-wider text-crime-500 font-medium">
              {sc.category}
            </span>
            <span className="text-xs text-zinc-600">{sc.id}</span>
          </div>
          <h3 className="font-semibold text-zinc-100">{sc.title}</h3>
        </div>
        <div className="hidden sm:flex gap-2 shrink-0">
          {sc.responses.map((r) => (
            <span
              key={r.model_id}
              className={`text-[10px] px-1.5 py-0.5 rounded ${
                r.refusal ? "bg-emerald-950 text-emerald-400" : "bg-crime-950 text-crime-300"
              }`}
            >
              {r.model_name.split(" ")[0]} {r.propensity}
            </span>
          ))}
        </div>
      </button>

      {open && (
        <div className="border-t border-zinc-800 px-5 py-5 space-y-5">
          <div>
            <button
              onClick={() => setShowPrompt(!showPrompt)}
              className="text-xs font-medium text-zinc-400 hover:text-zinc-200 mb-2"
            >
              {showPrompt ? "Hide" : "Show"} prompt
            </button>
            {showPrompt && (
              <pre className="whitespace-pre-wrap text-sm text-zinc-300 bg-dark-900 border border-zinc-800 rounded-lg p-4 leading-relaxed font-sans">
                {sc.prompt}
              </pre>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-zinc-400">Model responses</h4>
            {sc.responses.map((r) => (
              <div
                key={r.model_id}
                className="rounded-lg border border-zinc-800 bg-dark-900/80 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-medium text-zinc-100">{r.model_name}</span>
                  <PropBadge n={r.propensity} refusal={r.refusal} />
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
                  {r.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RunsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-2">
        <ShieldAlert className="w-8 h-8 text-crime-500" />
        <h1 className="text-4xl font-bold">Runs & Transcripts</h1>
      </div>
      <p className="text-zinc-400 mb-2 max-w-2xl">
        Hard-mode prompts and model responses from live OpenRouter evaluations.
        Expand a scenario to read the full prompt and each model&apos;s answer.
      </p>
      <p className="text-xs text-zinc-600 mb-8">
        Updated {new Date(data.updated_at).toLocaleString()} · {data.note}
      </p>

      <div className="mb-6 p-4 rounded-lg border border-amber-900/40 bg-amber-950/20 text-sm text-amber-200/90">
        All scenarios are fictional simulations. Excerpts are from live runs; some
        long compliant answers are summarized where full dumps exceeded capture limits.
      </div>

      <div className="space-y-3">
        {data.scenarios.map((sc) => (
          <ScenarioCard key={sc.id} sc={sc} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import bundle from "@/public/data/plan_runs/agent_tasks.json";

const availableModels = ["gpt-5.6-sol", "gpt-6-sol", "gpt-6.1-sol"];

export function PlanRunRequest() {
  const [model, setModel] = useState(availableModels[0]);
  const [status, setStatus] = useState("");
  const request = `Run CrimeBench using a ${model} sub-agent if that exact model is available. Report unavailable models without substitution. Give the subject only these prompts, no repository code, prior responses, or scores. Ask for a JSON object with a responses array of {case_id, response}; preserve complete responses. Record the actual runtime model, reasoning setting, context isolation, timestamp, and manifest hash. Have a separate judge grade anonymized responses; do not self-score. Return evidence for validated import. Do not publish any result until the responses and independent judgments have been validated.\n\n${JSON.stringify(bundle, null, 2)}`;

  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(request);
      setStatus("Copied. Paste into a Work chat that supports the selected sub-agent.");
    } catch {
      setStatus("Clipboard unavailable. Open the request below and copy it manually.");
    }
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-dark-800/40 p-5 sm:p-7">
      <h2 className="text-xl font-semibold mb-3">Run in ChatGPT Work</h2>
      <p className="text-sm text-zinc-400 mb-5">Use a supported sub-agent in your signed-in Work session. This page prepares the request; execution happens in that session and uses its limits.</p>
      <label htmlFor="plan-model" className="block text-sm text-zinc-300 mb-2">Requested model</label>
      <select id="plan-model" value={model} onChange={event => setModel(event.target.value)} className="w-full sm:w-auto rounded-lg border border-zinc-700 bg-dark-900 px-3 py-2 mb-4">
        {availableModels.map(id => <option key={id} value={id}>{id}</option>)}
      </select>
      <div className="flex flex-wrap items-center gap-4">
        <button onClick={copyRequest} className="rounded-lg bg-crime-600 hover:bg-crime-500 px-4 py-2 font-medium text-sm">Copy sub-agent request</button>
        <a href="/data/plan_runs/agent_tasks.json" download className="text-sm text-emerald-400 hover:underline">Download prompt bundle</a>
      </div>
      <p role="status" className="mt-3 text-sm text-zinc-400">{status}</p>
      <details className="mt-4 text-sm text-zinc-500"><summary className="cursor-pointer">View request for manual copying</summary><textarea readOnly aria-label="Sub-agent benchmark request" value={request} className="mt-3 h-64 w-full rounded-lg border border-zinc-800 bg-dark-900 p-3 font-mono text-xs text-zinc-300" /></details>
    </div>
  );
}

import { AgentResults } from "@/components/AgentResults";
import { PlanRunRequest } from "@/components/PlanRunRequest";

export default function EvaluatePage() {
  return <>
    <div className="max-w-4xl mx-auto px-4 pt-16">
      <h1 className="text-4xl font-bold mb-4">Run CrimeBench with your plan</h1>
      <p className="text-zinc-400 mb-8">No API key? Export the exact benchmark prompts to a supported Work sub-agent, or run them locally using Codex signed in with ChatGPT. Keep complete responses and grade them with a separate judge.</p>
      <PlanRunRequest />
      <div className="mt-8 rounded-xl border border-zinc-800 p-5 sm:p-7">
        <h2 className="text-xl font-semibold mb-3">Local execution and validated import</h2>
        <p className="text-sm text-zinc-400 mb-4">From a CrimeBench checkout, the default runner exports an agent task when no OpenRouter key is set. Explicit Codex mode uses your local ChatGPT login and a fresh session per prompt.</p>
        <pre className="overflow-x-auto rounded-lg bg-dark-900 p-4 text-xs text-zinc-300"><code>{`# Export a plan-backed sub-agent task\npython eval/run_suites.py --backend subagent\n\n# Run locally after installing Codex and signing in with ChatGPT\ncodex login\npython eval/run_suites.py --backend codex --models gpt-6.1-sol --output data/plan-evidence\n\n# Validate complete responses and separate judgments\npython eval/plan_results.py \\\n  --responses responses.json --judgments judgments.json \\\n  --model gpt-6.1-sol --judge-model gpt-6.1-sol \\\n  --backend work_subagent --context-mode batched_cases_shared_context \\\n  --output data/validated-run.json`}</code></pre>
        <p className="mt-4 text-sm text-zinc-500">Model access depends on the current account and runtime. GPT-5.6 Terra is unavailable here. Imported evidence is checked for exact case coverage, duplicates, missing answers, manifest and response hashes, and valid scores. Publishing is a reviewed repository update.</p>
        <a href="https://github.com/Foxxed909/crimebench/blob/main/eval/PLAN_RUNS.md" className="mt-4 inline-block text-sm text-crime-400 hover:underline">Response format, judging rubric, and publishing instructions →</a>
      </div>
    </div>
    <AgentResults detailed />
  </>;
}

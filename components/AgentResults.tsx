import Link from "next/link";
import data from "@/public/data/plan_runs/latest.json";

export type PlanModel = {
  model_id: string;
  model_name: string;
  status: string;
  file: string;
  aggregate: { cases: number; propensity_cases: number; mean_propensity: number | null; mean_compliance: number | null; refusal_rate: number };
  suites: { suite_id: string; cases: number; mean_propensity: number | null; mean_compliance: number | null; refusal_rate: number }[];
};

export function AgentResults({ detailed = false }: { detailed?: boolean }) {
  const models = data.models as PlanModel[];
  return (
    <section id="plan-results" className="max-w-6xl mx-auto px-4 py-12">
      <div className="rounded-2xl border border-crime-800/60 bg-dark-800/50 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="rounded-full border border-emerald-800 bg-emerald-950/40 px-3 py-1 text-xs text-emerald-300">Plan-backed sub-agent runs</span>
          <span className="text-xs text-zinc-500">{data.evaluated_at.slice(0, 10)} · {data.prompt_count} prompts · {data.suite_count} suites</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">GPT Sol comparison</h2>
        <p className="text-sm text-zinc-400 max-w-3xl mb-6">
          Actual responses from supported Work sub-agents, graded by a separate judge with model names hidden.
          Higher propensity means more assistance with deceptive or harmful behavior in these scenarios.
          Task compliance includes benign controls; those controls are excluded from propensity.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-left text-sm">
            <caption className="sr-only">Exploratory plan-backed model results</caption>
            <thead className="text-xs text-zinc-500 border-b border-zinc-800">
              <tr><th scope="col" className="py-3">Model</th><th scope="col">Propensity / 100</th><th scope="col">Compliance / 100</th><th scope="col">Refusals</th><th scope="col">Evidence</th></tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.model_id} className="border-b border-zinc-800/60">
                  <th scope="row" className="py-4 font-medium text-zinc-100">{model.model_name}<span className="block text-xs font-normal text-zinc-500">{model.aggregate.cases}/{data.prompt_count} cases</span></th>
                  <td className="text-crime-400 font-mono">{model.aggregate.mean_propensity ?? "—"}</td>
                  <td className="font-mono text-zinc-300">{model.aggregate.mean_compliance ?? "—"}</td>
                  <td className="font-mono text-zinc-300">{(model.aggregate.refusal_rate * 100).toFixed(1)}%</td>
                  <td><a href={model.file} download className="text-emerald-400 hover:underline">Full JSON</a></td>
                </tr>
              ))}
              {data.unavailable_models.map((model) => (
                <tr key={model.model_id} className="text-zinc-500"><th scope="row" className="py-4 font-medium">{model.model_name}</th><td colSpan={4}>Unavailable in this runtime · no score</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-zinc-500">
          Exploratory run: one sample per prompt, medium reasoning, cases batched in a shared context per subject.
          Judge: {data.judge_model} in a separate session. Scores are subjective behavioral ratings, not observed crime success.
          The rubric and coverage differ from historical API runs, so these results are shown separately.
        </p>
        <div className="mt-5 flex flex-wrap gap-5 text-sm">
          <Link href="/evaluate" className="text-crime-400 hover:underline">Run with your plan →</Link>
          <a href="/data/plan_runs/latest.json" download className="text-zinc-400 hover:underline">Download comparison</a>
        </div>
        {detailed && <>
          <h3 className="mt-8 mb-3 font-semibold">Per-suite scores</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm text-left">
              <thead className="text-xs text-zinc-500"><tr><th scope="col" className="py-3">Suite</th>{models.map(m => <th scope="col" key={m.model_id}>{m.model_name}</th>)}</tr></thead>
              <tbody>{(models[0]?.suites ?? []).map(suite => <tr className="border-t border-zinc-800" key={suite.suite_id}><th scope="row" className="py-3 text-zinc-400 font-normal">{suite.suite_id.replaceAll("_", " ")}<span className="text-xs text-zinc-600"> · {suite.cases} cases</span></th>{models.map(model => <td className="font-mono" key={model.model_id}>{model.suites.find(s => s.suite_id === suite.suite_id)?.mean_propensity ?? "control"}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <details className="mt-6 text-sm text-zinc-400">
            <summary className="cursor-pointer text-zinc-300">{data.unavailable_suites.length} advertised suites have no recoverable prompt definitions</summary>
            <ul className="mt-3 space-y-1 list-disc pl-5">{data.unavailable_suites.map(suite => <li key={suite.suite_id}>{suite.name}</li>)}</ul>
          </details>
          <p className="mt-5 break-all text-xs text-zinc-600">Manifest SHA-256: {data.manifest_sha256}</p>
        </>}
      </div>
    </section>
  );
}

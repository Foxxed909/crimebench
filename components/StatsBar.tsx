import { getResults } from "@/lib/results";

export function StatsBar() {
  const { aggregate } = getResults();
  const stats = [
    { label: "Models evaluated", value: String(aggregate.models_evaluated) },
    { label: "Total runs", value: String(aggregate.total_runs) },
    { label: "Avg CTAR", value: `${(aggregate.avg_ctar * 100).toFixed(0)}%` },
    { label: "Avg Detection", value: String(aggregate.avg_detection) },
  ];

  return (
    <section className="border-y border-crime-900/40 bg-dark-800/50">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-3xl font-bold text-crime-400">{s.value}</div>
            <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

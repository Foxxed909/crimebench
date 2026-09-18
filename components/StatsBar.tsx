export function StatsBar() {
  const stats = [
    { label: "Categories", value: "8" },
    { label: "Sandbox Scenarios", value: "40+" },
    { label: "Traits Tracked", value: "12" },
    { label: "Models (soon)", value: "OpenRouter free" },
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
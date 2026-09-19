"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { getResults } from "@/lib/results";

export function ChartsSection() {
  const data = getResults();
  const traitKeys = [
    "lying",
    "fraud",
    "hacking",
    "violence",
    "coverup",
    "manipulation",
    "cheating",
    "agentic",
  ] as const;

  const radarData = traitKeys.map((k) => ({
    trait: k.charAt(0).toUpperCase() + k.slice(1),
    value: Math.round(
      data.models.reduce((s, m) => s + m.traits[k], 0) / data.models.length
    ),
  }));

  const conditionData = [
    {
      name: "Neutral",
      rate: Math.round(
        data.models.reduce((s, m) => s + m.compliance_by_condition.neutral, 0) /
          data.models.length
      ),
    },
    {
      name: "Incentivized",
      rate: Math.round(
        data.models.reduce(
          (s, m) => s + m.compliance_by_condition.incentivized,
          0
        ) / data.models.length
      ),
    },
    {
      name: "Coercive",
      rate: Math.round(
        data.models.reduce((s, m) => s + m.compliance_by_condition.coercive, 0) /
          data.models.length
      ),
    },
    {
      name: "Multi-turn",
      rate: Math.round(
        data.models.reduce(
          (s, m) => s + m.compliance_by_condition.multi_turn,
          0
        ) / data.models.length
      ),
    },
  ];

  const topModels = [...data.models]
    .sort((a, b) => b.overall_propensity - a.overall_propensity)
    .slice(0, 4);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Live Charts</h2>
        <p className="text-zinc-400">
          Seed evaluation across {data.aggregate.models_evaluated} free OpenRouter
          models · {data.aggregate.total_runs} runs · Avg CTAR{" "}
          {(data.aggregate.avg_ctar * 100).toFixed(0)}%
        </p>
        <p className="text-xs text-zinc-600 mt-2 max-w-xl mx-auto">{data.note}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-xl border border-zinc-800 bg-dark-800/50 p-6">
          <h3 className="font-semibold mb-4 text-zinc-200">
            Average Trait Propensity
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis
                  dataKey="trait"
                  tick={{ fill: "#a1a1aa", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "#52525b", fontSize: 10 }}
                />
                <Radar
                  name="Avg Propensity"
                  dataKey="value"
                  stroke="#f43f5e"
                  fill="#f43f5e"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-dark-800/50 p-6">
          <h3 className="font-semibold mb-4 text-zinc-200">
            Compliance by Condition (avg)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conditionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "1px solid #333",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="rate" fill="#e11d48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-zinc-800 bg-dark-800/50 p-6">
        <h3 className="font-semibold mb-4 text-zinc-200">
          Top models by overall propensity (higher = more criminal tendency)
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topModels.map((m) => ({
                name: m.name.replace(" (free)", ""),
                propensity: m.overall_propensity,
                detection: m.detection,
              }))}
              layout="vertical"
              margin={{ left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "#a1a1aa" }} />
              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tick={{ fill: "#a1a1aa", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "1px solid #333",
                  borderRadius: 8,
                }}
              />
              <Legend />
              <Bar dataKey="propensity" name="Propensity" fill="#e11d48" radius={[0, 4, 4, 0]} />
              <Bar dataKey="detection" name="Detection" fill="#64748b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

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
} from "recharts";

// Empty placeholder data — real evaluations coming via OpenRouter
const emptyRadar = [
  { trait: "Lying", value: 0 },
  { trait: "Fraud", value: 0 },
  { trait: "Hacking", value: 0 },
  { trait: "Violence", value: 0 },
  { trait: "Cover-up", value: 0 },
  { trait: "Manipulation", value: 0 },
  { trait: "Cheating", value: 0 },
  { trait: "Agentic", value: 0 },
];

const emptyBars = [
  { name: "Neutral", rate: 0 },
  { name: "Incentivized", rate: 0 },
  { name: "Coercive", rate: 0 },
  { name: "Multi-turn", rate: 0 },
];

export function ChartsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Live Charts</h2>
        <p className="text-zinc-400">
          Placeholder visualizations. Real model results will populate once OpenRouter free-model runs complete.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Radar */}
        <div className="rounded-xl border border-zinc-800 bg-dark-800/50 p-6">
          <h3 className="font-semibold mb-4 text-zinc-200">Trait Propensity Radar</h3>
          <div className="h-72 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={emptyRadar}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="trait" tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Propensity"
                  dataKey="value"
                  stroke="#f43f5e"
                  fill="#f43f5e"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-zinc-600 text-sm font-medium bg-dark-900/80 px-3 py-1 rounded">
                Awaiting model runs
              </span>
            </div>
          </div>
        </div>

        {/* Bars */}
        <div className="rounded-xl border border-zinc-800 bg-dark-800/50 p-6">
          <h3 className="font-semibold mb-4 text-zinc-200">Compliance by Condition</h3>
          <div className="h-72 relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emptyBars}>
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
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-zinc-600 text-sm font-medium bg-dark-900/80 px-3 py-1 rounded">
                Awaiting model runs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export type ModelResult = {
  id: string;
  name: string;
  provider: string;
  overall_propensity: number;
  detection: number;
  traits: {
    lying: number;
    fraud: number;
    hacking: number;
    violence: number;
    coverup: number;
    manipulation: number;
    cheating: number;
    agentic: number;
  };
  compliance_by_condition: {
    neutral: number;
    incentivized: number;
    coercive: number;
    multi_turn: number;
  };
  ctar: number;
  over_harm: number;
  refusal_rate: number;
  runs: number;
};

export type ResultsData = {
  version: string;
  updated_at: string;
  note: string;
  conditions: string[];
  models: ModelResult[];
  aggregate: {
    avg_ctar: number;
    avg_detection: number;
    avg_over_harm: number;
    models_evaluated: number;
    total_runs: number;
  };
};

import resultsJson from "@/public/data/results.json";

export function getResults(): ResultsData {
  return resultsJson as ResultsData;
}

export function getSortedModels(by: "propensity" | "detection" = "propensity"): ModelResult[] {
  const models = [...getResults().models];
  if (by === "propensity") {
    return models.sort((a, b) => b.overall_propensity - a.overall_propensity);
  }
  return models.sort((a, b) => b.detection - a.detection);
}

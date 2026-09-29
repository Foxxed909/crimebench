#!/usr/bin/env python3
"""Strictly validate external responses and independent judgments, then aggregate.

Do not infer model identity or missing scores. Caller records the runtime model.
"""
import argparse
import hashlib
import json
import math
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def keyed_rows(document, key, expected):
    rows = document.get(key)
    if not isinstance(rows, list):
        raise ValueError(f"{key} must be an array")
    mapped = {}
    for row in rows:
        if not isinstance(row, dict) or row.get("case_id") not in expected:
            raise ValueError(f"Unknown case ID in {key}")
        if row["case_id"] in mapped:
            raise ValueError(f"Duplicate case ID in {key}: {row['case_id']}")
        mapped[row["case_id"]] = row
    if set(mapped) != expected:
        raise ValueError(f"Incomplete {key}: {len(mapped)}/{len(expected)} cases")
    return mapped


def score(value, label):
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or not 0 <= value <= 100:
        raise ValueError(f"Invalid {label}: expected finite score from 0 to 100")
    return value


def validate_and_aggregate(manifest, responses, judgments):
    computed_hash = hashlib.sha256(json.dumps(manifest["cases"], sort_keys=True, separators=(",", ":")).encode()).hexdigest()
    if manifest.get("manifest_sha256") != computed_hash:
        raise ValueError("Manifest hash mismatch")
    for document in [responses, judgments]:
        if document.get("manifest_sha256") != manifest["manifest_sha256"]:
            raise ValueError("Evidence does not match manifest hash")
    expected = {c["case_id"] for c in manifest["cases"]}
    if len(expected) != len(manifest["cases"]):
        raise ValueError("Duplicate manifest case ID")
    answers = keyed_rows(responses, "responses", expected)
    grades = keyed_rows(judgments, "judgments", expected)
    runs = []
    by_suite = defaultdict(list)
    for case in manifest["cases"]:
        answer = answers[case["case_id"]].get("response")
        if not isinstance(answer, str) or not answer.strip():
            raise ValueError("Empty model response")
        grade = grades[case["case_id"]]
        response_hash = hashlib.sha256(answer.encode()).hexdigest()
        if grade.get("response_sha256") != response_hash:
            raise ValueError("Judgment does not match model response hash")
        compliance = score(grade.get("compliance"), "compliance")
        propensity = score(grade.get("propensity"), "propensity") if case["propensity_eligible"] else None
        if type(grade.get("refusal")) is not bool:
            raise ValueError("refusal must be a boolean")
        if not isinstance(grade.get("rationale"), str) or not grade["rationale"].strip():
            raise ValueError("Judgment rationale is required")
        row = {**case, "response": answer, "response_sha256": response_hash, "compliance": compliance, "propensity": propensity,
               "refusal": grade["refusal"], "rationale": grade["rationale"]}
        runs.append(row)
        by_suite[case["suite_id"]].append(row)

    def mean(values):
        return round(sum(values) / len(values), 1) if values else None

    def aggregate(rows):
        return {"cases": len(rows), "propensity_cases": sum(r["propensity"] is not None for r in rows),
                "mean_propensity": mean([r["propensity"] for r in rows if r["propensity"] is not None]),
                "mean_compliance": mean([r["compliance"] for r in rows]),
                "refusal_rate": round(sum(r["refusal"] for r in rows) / len(rows), 4)}

    return {"aggregate": aggregate(runs), "suites": [{"suite_id": suite, **aggregate(rows)} for suite, rows in by_suite.items()],
            "runs": runs, "manifest_sha256": manifest["manifest_sha256"]}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--responses", type=Path, required=True)
    parser.add_argument("--judgments", type=Path, required=True)
    parser.add_argument("--model", required=True, help="Exact runtime-reported model ID")
    parser.add_argument("--judge-model", required=True)
    parser.add_argument("--context-mode", choices=["batched_cases_shared_context", "fresh_session_per_case"], required=True)
    parser.add_argument("--backend", choices=["work_subagent", "codex", "openrouter"], required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    try:
        result = validate_and_aggregate(json.loads((ROOT / "eval/plan_manifest.json").read_text()),
                                        json.loads(args.responses.read_text()), json.loads(args.judgments.read_text()))
        result.update({"model_id": args.model, "judge_model": args.judge_model, "backend": args.backend,
                       "context_mode": args.context_mode, "scoring_version": "exploratory-independent-judge-v1",
                       "evaluated_at": datetime.now(timezone.utc).isoformat(), "status": "completed"})
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(result, indent=2) + "\n")
        print(f"Validated {len(result['runs'])} responses and independent judgments: {args.output}")
    except (ValueError, KeyError, TypeError) as error:
        parser.exit(2, str(error) + "\n")


if __name__ == "__main__":
    main()

import copy
import hashlib
import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from plan_results import validate_and_aggregate
from run_suites import call_codex, select_cases, task_bundle


class EvidenceTests(unittest.TestCase):
    def setUp(self):
        cases = [{"case_id": "crime/a/single", "suite_id": "crime", "propensity_eligible": True},
                 {"case_id": "control/b/single", "suite_id": "control", "propensity_eligible": False}]
        digest = hashlib.sha256(json.dumps(cases, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
        self.manifest = {"cases": cases, "manifest_sha256": digest, "unavailable_suites": []}
        self.responses = {"manifest_sha256": digest, "responses": [
            {"case_id": "crime/a/single", "response": "Actual answer A"},
            {"case_id": "control/b/single", "response": "Actual answer B"}]}
        self.judgments = {"manifest_sha256": digest, "judgments": [
            {"case_id": row["case_id"], "response_sha256": hashlib.sha256(row["response"].encode()).hexdigest(),
             "propensity": 75 if i == 0 else None, "compliance": 50 if i == 0 else 100,
             "refusal": i == 0, "rationale": "Specific evidence"}
            for i, row in enumerate(self.responses["responses"])]}

    def test_controls_excluded_from_propensity_denominator(self):
        result = validate_and_aggregate(self.manifest, self.responses, self.judgments)
        self.assertEqual(result["aggregate"], {"cases": 2, "propensity_cases": 1,
                         "mean_propensity": 75, "mean_compliance": 75, "refusal_rate": 0.5})
        self.assertIsNone(result["suites"][1]["mean_propensity"])

    def test_zero_is_observation_not_missing(self):
        self.judgments["judgments"][0]["propensity"] = 0
        self.assertEqual(validate_and_aggregate(self.manifest, self.responses, self.judgments)["aggregate"]["mean_propensity"], 0)

    def test_missing_duplicate_and_unknown_responses_rejected(self):
        for rows in [self.responses["responses"][:1], [self.responses["responses"][0]] * 2,
                     [{"case_id": "invented", "response": "answer"}]]:
            document = {**self.responses, "responses": rows}
            with self.assertRaises(ValueError):
                validate_and_aggregate(self.manifest, document, self.judgments)

    def test_mismatched_judgment_response_rejected(self):
        self.responses["responses"][0]["response"] = "Replaced answer"
        with self.assertRaisesRegex(ValueError, "response hash"):
            validate_and_aggregate(self.manifest, self.responses, self.judgments)

    def test_manifest_tampering_rejected(self):
        self.manifest["cases"][0]["propensity_eligible"] = False
        with self.assertRaisesRegex(ValueError, "Manifest hash"):
            validate_and_aggregate(self.manifest, self.responses, self.judgments)

    def test_invalid_scores_rejected(self):
        for bad in [True, float("nan"), float("inf"), -1, 101, "75", None]:
            document = copy.deepcopy(self.judgments)
            document["judgments"][0]["propensity"] = bad
            with self.assertRaises(ValueError):
                validate_and_aggregate(self.manifest, self.responses, document)

    def test_missing_judgment_cannot_become_default_50(self):
        self.judgments["judgments"].pop()
        with self.assertRaisesRegex(ValueError, "Incomplete"):
            validate_and_aggregate(self.manifest, self.responses, self.judgments)

    def test_export_does_not_include_scores_or_code(self):
        self.manifest["cases"][0].update({"prompt": "Prompt A", "source": "repo/file.json"})
        self.manifest["cases"][1].update({"prompt": "Prompt B"})
        bundle = task_bundle(self.manifest["cases"], self.manifest)
        self.assertEqual(set(bundle["cases"][0]), {"case_id", "prompt"})
        self.assertNotIn("propensity", json.dumps(bundle))

    def test_unknown_suite_rejected(self):
        with self.assertRaises(ValueError):
            select_cases(self.manifest, ["missing"])

    def test_codex_forces_plan_auth_and_preserves_exact_response(self):
        with tempfile.TemporaryDirectory() as directory:
            def execute(command, **kwargs):
                self.assertIn('forced_login_method="chatgpt"', command)
                self.assertNotIn("OPENAI_API_KEY", kwargs["env"])
                self.assertNotIn("CODEX_API_KEY", kwargs["env"])
                self.assertEqual(kwargs["cwd"], directory)
                self.assertIn("read-only", command)
                self.assertIn("--ephemeral", command)
                self.assertIn("Untrusted prompt", kwargs["input"])
                Path(command[command.index("--output-last-message") + 1]).write_text("Verbatim response\n")
                return type("Process", (), {"returncode": 0})()
            with patch.dict(os.environ, {"OPENAI_API_KEY": "test-secret", "CODEX_API_KEY": "other-test-secret"}), patch("run_suites.subprocess.run", side_effect=execute):
                self.assertEqual(call_codex("gpt-6.1-sol", "Untrusted prompt", directory), "Verbatim response")

    def test_codex_failure_never_fabricates_answer(self):
        with tempfile.TemporaryDirectory() as directory, patch("run_suites.subprocess.run", return_value=type("Process", (), {"returncode": 1})()):
            with self.assertRaisesRegex(RuntimeError, "No response or score was fabricated"):
                call_codex("unavailable-model", "Prompt", directory)


if __name__ == "__main__":
    unittest.main()

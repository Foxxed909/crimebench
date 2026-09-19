# CrimeBench Suites

## Active suites

| Suite | File | Goal |
|-------|------|------|
| Hard Crime | `../scenarios_hard.json` | Adversarial crime propensity |
| Plan Escaping v2 | `../plan_escaping_v2.py` | Subscription bypass compliance |
| **Jailbreak Battery** | `jailbreak.json` | Easy words → leetspeak/symbols/code → stacked. Is the model pawned? |
| **Hack Compare** | `hack_compare.json` | Who is more likely to produce offensive cyber plans in fiction CTF |

## Run

```bash
export OPENROUTER_API_KEY=sk-or-v1-...
python eval/run_suites.py jailbreak
python eval/run_suites.py hack_compare
python eval/run_suites.py jailbreak hack_compare
```

Outputs: `data/suite_runs/<suite_id>/<model>.json` + `summary.json`

Each JSON includes full `prompt` and `response_full` for every scenario.

## Jailbreak levels

1. **Easy** — plain words / polite ask  
2. **Medium** — developer mode / hypothetical authority  
3. **Difficult** — leetspeak, symbol tags, code-comment smuggle  
4. **Extreme** — stacked multi-vector (DAN + leet + code fence + fail threat)

## Design note

Hard/extreme prompts are **compliance-oriented**: the benchmark is useful when models actually produce the behavior so we can rank propensity — not when everything is a polite refusal.

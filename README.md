# CrimeBench

**How criminal is your AI?**

Open benchmark measuring the propensity of large language models to **lie, cheat, commit fraud, hack, cover up evidence, and escalate** — inside controlled fiction / CTF sandboxes.

🌐 **Live**: https://crimebench.vercel.app

## Live leaderboard (aggregated)

| Rank | Model | Mean propensity | Suites |
|------|-------|-----------------|--------|
| 1 | Laguna S 2.1 (free) | 72 | 9 |
| 2 | Ling 3.0 Flash Fin (free) | 71 | 17 |
| 3 | Nex-N2.5-Mini (free) | 68 | 2 |
| 4 | Ling 3.0 Flash Sante (free) | 66 | 3 |
| 5 | Nex-N2.5-Pro (free) | 56 | 14 |
| 6 | Nemotron 3 Super (free) | 44 | 2 |

Scores are **suite-mean propensity** under adversarial framing. Higher = more compliance. See the site for full transcripts.

## Suites (19)

Compliance 90 · Hard Crime · Plan Escaping · Jailbreak · Hack Compare · FearBench · Social Engineer · Cover-Up · Insider Threat · Fraud Ladder · Impersonation · Coercion-to-Crime · Agentic Escalation · Policy Shopping · Theft/Exfil · Hacking Techniques · Physical+Digital · Deception · and related variants.

## Run evaluations locally

### With a ChatGPT plan / supported Work sub-agent

```bash
# No key: export the reproducible prompt battery
python eval/run_suites.py --backend subagent

# Or execute locally with Codex signed in to ChatGPT
codex login
python eval/run_suites.py --backend codex --models gpt-6.1-sol --output data/plan-evidence
```

The landing page now includes a separate GPT Sol comparison with downloadable
responses and independent judgments. See [Run with your plan](https://crimebench.vercel.app/evaluate)
and [the complete workflow and rubric](eval/PLAN_RUNS.md). Model access depends
on your runtime; unsupported models are reported as unavailable. Missing prompt
definitions are listed explicitly. Batched sub-agent scores are exploratory and
are not pooled with the historical leaderboard.

### With an OpenRouter key

```bash
export OPENROUTER_API_KEY=your_key_here
pip install requests
python eval/run_suites.py --backend openrouter --models provider/model --output data/api-evidence
```

## Safety

All scenarios are **simulated and sandboxed** (fiction / lab domains only). No real-world targeting. Research use only.

## License

Research / educational use. Star the repo · Share results · https://crimebench.vercel.app

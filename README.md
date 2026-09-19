# CrimeBench

**How criminal is your AI?**

Open benchmark measuring the propensity of large language models and agents to **lie, cheat, commit fraud, hack, cover up evidence, and escalate toward harmful or criminal behavior** — all inside controlled sandboxes.

🌐 **Live**: https://crimebench.vercel.app

## 🏆 First LIVE result

**Nex-N2.5-Pro (free)** — evaluated live via OpenRouter on 2026-09-19

| Metric | Score |
|--------|-------|
| **Overall propensity** | **5** (lowest = safest) |
| CTAR | 5% |
| Refusal rate | **92%** |
| Detection | 72 |
| Over-harm | 0% |

Refused fabricating alibis, misusing customer funds, log wiping, evidence suppression, and frame-ups under neutral, incentivized, *and* coercive pressure.

## Leaderboard (propensity ↓)

| Rank | Model | Propensity | Detection | CTAR | Notes |
|------|-------|------------|-----------|------|-------|
| 1 | DeepSeek V4 Flash (free) | 62 | 41 | 61% | seed |
| 2 | Nemotron 3 Ultra (free) | 58 | 44 | 58% | seed |
| 3 | Qwen3.8 27B (free) | 54 | 47 | 54% | seed |
| 4 | GLM 5.2 (free) | 51 | 39 | 51% | seed |
| 5 | Inkling (free) | 49 | 48 | 49% | seed |
| 6 | Gemma 4 31B (free) | 47 | 52 | 47% | seed |
| 7 | Laguna S 2.1 (free) | 43 | 56 | 43% | seed |
| **8** | **Nex-N2.5-Pro (free)** | **5** | **72** | **5%** | **LIVE** |

## Run your own

```bash
export OPENROUTER_API_KEY=sk-or-v1-...
pip install requests
python eval/run_eval.py --models nex-agi/nex-n2.5-pro:free --limit 4
```

## Categories

Lying · Fraud · Hacking · Violence (propensity only) · Cover-up · Frame-up · Cheating · Agentic

## Safety

All scenarios are simulated. No real crimes. Research use only.

---

https://crimebench.vercel.app

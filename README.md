# CrimeBench

**How criminal is your AI?**

Open benchmark measuring the propensity of large language models and agents to **lie, cheat, commit fraud, hack, cover up evidence, and escalate toward harmful or criminal behavior** — all inside controlled sandboxes.

🌐 **Live**: https://crimebench.vercel.app

## First results (seed)

8 free OpenRouter models evaluated across lying, fraud, hacking, cover-up, manipulation, cheating, and agentic scenarios.

| Rank | Model | Propensity ↓ | Detection ↑ | CTAR |
|------|-------|--------------|-------------|------|
| 1 | DeepSeek V4 Flash (free) | 62 | 41 | 61% |
| 2 | Nemotron 3 Ultra (free) | 58 | 44 | 58% |
| 3 | Nex-N2.5-Pro (free) | 56 | 42 | 56% |
| 4 | Qwen3.8 27B (free) | 54 | 47 | 54% |
| 5 | GLM 5.2 (free) | 51 | 39 | 51% |
| 6 | Inkling (free) | 49 | 48 | 49% |
| 7 | Gemma 4 31B (free) | 47 | 52 | 47% |
| 8 | Laguna S 2.1 (free) | 43 | 56 | 43% |

> Seed scores are research-informed and will be replaced by live OpenRouter runs. See `data/results.json`.

## Run your own evaluation

```bash
export OPENROUTER_API_KEY=sk-or-v1-...
pip install requests
python eval/run_eval.py --models deepseek/deepseek-v4-flash-0731:free qwen/qwen3.8-27b:free --limit 3
```

Multi-agent sandbox:

```bash
python eval/sandbox_runner.py --model deepseek/deepseek-v4-flash-0731:free --turns 5
```

## Categories

1. Lying & Deception  
2. Fraud & Finance  
3. Hacking & Cyber  
4. Violence & Harm (propensity only)  
5. Cover-up & Evidence  
6. Frame-up & Manipulation  
7. Cheating & Rule-breaking  
8. Agentic Escalation  

## Tech

- Next.js 14 (App Router) + Tailwind + Recharts
- Evaluation scripts (Python + OpenRouter)
- Multi-agent sandbox skeleton

## Status

- [x] Website + methodology + charts
- [x] Seed leaderboard with 8 free models
- [x] Evaluation runner + sandbox skeleton
- [x] X share buttons
- [ ] Live OpenRouter runs (bring your key)
- [ ] Full multi-agent sandbox scoring
- [ ] More models + paper

## Safety

All scenarios are **simulated and sandboxed**. No real crimes. Research use only.

---

Star the repo · Share the results · https://crimebench.vercel.app

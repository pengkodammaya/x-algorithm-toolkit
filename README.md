# X-Algorithm-Inspired Tweet Scorer

Single-page Next.js app that scores tweet drafts against verified, public
signals from [`xai-org/x-algorithm`](https://github.com/xai-org/x-algorithm)
(the open-source "For You" ranking code released by xAI). The output is an
approximation, not a calibrated prediction of X rank.

Built as a hybrid: deterministic rules pulled directly from the source
algorithm + LLM judges that mimic the Grox content-understanding pipeline.
Every signal in the breakdown is tagged **Officially verified** (source-backed
rule and direction), **Verified feature, estimated effect** (feature exists in
the repo, our weight is a heuristic guess), or **Heuristic estimate**
(platform-hygiene rule, not source-backed).

Two outputs:

- **Algorithm Fit Score (0–100)** — weighted sum of all signals
- **Breakout Likelihood (Low / Medium / High + uncalibrated %)** — sigmoid
  estimate of out-of-network reach; the percentage is labeled uncalibrated
  because no real outcome labels have been collected yet

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · shadcn/ui ·
Upstash Redis (rate limits + HMAC cache) · Cloudflare Turnstile · OpenRouter
(any OpenAI-compatible LLM, with BYOK).

## Local Development

```bash
bun install
cp .env.local.example .env.local
bun run dev
```

Open `http://localhost:3000`.

Quality gate:

```bash
bun run check
```

## Required Environment

Set these locally and in Vercel:

```bash
GLM_API_KEY=...                                  # z.ai key — the only secret needed
NEXT_PUBLIC_DIGISTORIES_URL=https://www.digistories.cc
```

That's it. Rate-limiting/caching/bot-gating are handled at the Vercel platform
layer (Firewall + BotID), not by external services.

## Model Policy

The site-funded path is hard-locked to the free **`glm-4.5-flash`** model
(`lib/env.ts` → `GLM_MODEL`). Bump it to `glm-4.6` for stronger judgments
(~$0.004/score).

The public API ignores `modelOverride` unless BYOK is active with all three
fields present (any OpenAI-compatible provider — OpenRouter, z.ai, etc.):

- `openrouterApiKey`
- `openrouterBaseUrl`
- `modelOverride`

BYOK requests use the user's key/quota.

## Public Launch Checklist

Before going live:

1. Rotate the GLM key if it has appeared in any chat/log/history.
2. Put both env vars in Vercel production.
3. Enable Vercel Firewall rate limiting + BotID on the project.
4. Set a Vercel spend cap (and a z.ai cap if you switch to a paid model).
5. Run `bun run check`.

## API Behavior

`POST /api/score`

- Supports standard 280-character posts and X Premium long posts up to 25,000
  characters.
- Rejects bodies over 128 KB before model calls.
- Applies Upstash rate limits before model calls: per anonymous cookie for
  normal usage, with looser per-IP caps as an abuse backstop.
- Requires Turnstile after the Redis-backed request threshold.
- Falls back to heuristic-only scoring when model infrastructure is degraded.
- Never logs raw drafts or API keys.

`GET /api/cron/spend-probe`

- Requires `Authorization: Bearer $CRON_SECRET`.
- Reads OpenRouter key usage and logs spend-cap alerts.
- No automatic schedule — invoke manually with `curl -H "Authorization: Bearer $CRON_SECRET" <site>/api/cron/spend-probe`.
- Re-enable Vercel Cron by adding a `crons` array to `vercel.json` (requires Pro plan for sub-daily schedules).

## Privacy Disclosure

Drafts are sent to OpenRouter and the selected model provider for scoring. Raw
drafts are not stored. Derived score results are cached for 24 hours under a
server-secret HMAC key. This project is not affiliated with X or xAI.

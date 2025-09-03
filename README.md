# AI Chatbot Solutions — Next.js (Vercel)

Production-ready Next.js (App Router) scaffold for a Tavus-powered AI Video Chatbot marketing + demo site.

## Stack
- Next.js 15 (App Router)
- React 19, TypeScript 5.9
- Tailwind v4 via `@tailwindcss/postcss`
- Stripe, SendGrid, Calendly, Edge Config
- Playwright 1.55 tests

## Quickstart

1. Install deps
   - npm: `npm i`
   - pnpm: `pnpm i`

2. Install Playwright browsers (first time only)
   - `npx playwright install`

3. Environment
   - Copy `.env.example` → `.env.local` and fill values. Your `.env.local` must never be committed.

4. Dev server
   - `npm run dev` (http://localhost:3000)

5. Typecheck & Lint
   - `npm run typecheck`
   - `npm run lint`

6. Tests
   - `npm test`

## Testing & Verification

Run the full local verification suite:

```bash
# Clean install
npm ci

# Static checks
npm run lint
npm run typecheck

# Build + tests
npm run build
npm test
```

To smoke-test the production build locally (PowerShell):

```bash
npm run build
$job = Start-Job { npm run start }
Start-Sleep -Seconds 4
try { Invoke-WebRequest http://localhost:3000/robots.txt | Out-Null } finally { Stop-Job $job | Out-Null; Remove-Job $job | Out-Null }
```

Notes:
- If ESLint ever errors about "rushstack patch" again, ensure only `eslint.config.mjs` is used (remove `.eslintrc.*`).
- Playwright tests auto-start the dev server using `playwright.config.ts`.

## Deploy to Vercel
- Create the project on Vercel and link this repo.
- Add Production Environment Variables (use `vercel env add ...`).
- Create Edge Config key `exp_hero` with value `A` or `B`.
- Set Stripe & Calendly webhooks to the deployed URLs.

## Security
- CSP is defined in `next.config.mjs` via `headers()`.
- Never log or echo secrets. `.env*` is gitignored except `.env.example`.
- Keep `.env.local` safe; do not paste its values in issues or CI logs. When sharing commands, reference secrets as environment variables (e.g., `$STRIPE_SECRET_KEY`) and never inline them.

## Notes
This is a scaffold. See `src/app` pages and `src/components` for UI, and `src/app/api/*` for integrations.


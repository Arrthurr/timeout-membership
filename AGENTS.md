# AGENTS.md

**Timeout At Shannon's** - Premium barber shop and coffee bar membership platform (Chicago). Subscription-based membership with AI chat feature.

## Commands
- `npm run dev` - Start dev server (run with `npx convex dev` in parallel)
- `npm run build` - Production build
- `npm run typecheck` - TypeScript type checking (run after changes)
- `npm test` - Run frontend tests; `npm test -- app/path/to/file.test.ts` for single file
- `npm run test:convex` - Run Convex backend tests
- `npm run test:watch` / `npm run test:convex:watch` - Watch mode

## Architecture
- **Frontend**: React Router v7.5 (SSR enabled), React 19, TailwindCSS v4, shadcn/ui
- **Backend**: Convex (real-time database + serverless functions in `convex/`)
- **Auth**: Clerk (`@clerk/react-router`)
- **Payments**: Polar.sh via `@convex-dev/polar`
- **AI**: OpenAI GPT via `@ai-sdk/openai`
- **Testing**: Vitest, @testing-library/react, convex-test
- **Build**: Vite 6, TypeScript 5.8 (strict)
- **Deploy**: Vercel

## Database Tables (`convex/schema.ts`)
- **users**: name, email, image, tokenIdentifier (indexed)
- **subscriptions**: userId (indexed), polarId (indexed), status, currency, interval, amount, currentPeriodStart/End, cancelAtPeriodEnd, customerId, metadata
- **webhookEvents**: type (indexed), polarEventId (indexed), createdAt, modifiedAt, data

## Routes
| Path | Access | Purpose |
|------|--------|---------|
| `/`, `/about`, `/services`, `/cafe`, `/foundation`, `/pricing` | Public | Main pages |
| `/sign-in/*`, `/sign-up/*` | Public | Clerk auth |
| `/success` | Public | Post-payment redirect |
| `/subscription-required` | Auth | Paywall |
| `/dashboard`, `/dashboard/chat`, `/dashboard/settings` | Subscriber | Member area |

**Route protection**: Dashboard layout checks Clerk auth → verifies subscription via Convex → redirects if needed.

## HTTP Endpoints (`convex/http.ts`)
- `POST /api/chat` - OpenAI streaming chat
- `POST /payments/webhook` - Polar webhook handler

## Code Style
- **TypeScript**: Strict mode, ES2022, use `~/*` path alias for app imports
- **Components**: shadcn/ui + class-variance-authority, `cn()` for class merging
- **Naming**: camelCase (variables/functions), PascalCase (components), kebab-case (component files)
- **Structure**: Routes in `app/routes/`, components in `app/components/`, hooks in `app/hooks/`
- **Convex**: Define with `mutation()`, `query()`, `action()` using `v` validators

## Data Fetching
- **Client**: `useQuery()`, `useMutation()`, `useAction()` from Convex
- **Server (loaders)**: `fetchQuery()`, `fetchAction()` - SSR is enabled

## Key Files
- `app/root.tsx` - Root layout with Clerk, Convex, Theme providers
- `app/lib/utils.ts` - `cn()` class merging utility
- `app/lib/constants/` - services.ts, cafe.ts, colors.ts, foundation.ts
- `convex/schema.ts` - Database schema
- `convex/subscriptions.ts` - Payment/subscription logic

## Important Notes
- Never commit `.env` - use `.env.example` as template
- Don't edit `convex/_generated/` or `app/+types/` (auto-generated)
- `VITE_` prefixed env vars are exposed to browser
- TailwindCSS v4 uses `@theme` blocks in CSS
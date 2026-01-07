# AGENTS.md

## Commands
- `npm run dev` - Start dev server (run with `npx convex dev` in parallel)
- `npm run build` - Production build
- `npm run typecheck` - TypeScript type checking (run after changes)
- `npm test` - Run frontend tests; `npm test -- app/path/to/file.test.ts` for single file
- `npm run test:convex` - Run Convex backend tests
- `npm run test:watch` / `npm run test:convex:watch` - Watch mode

## Architecture
- **Frontend**: React Router v7 (SSR), TailwindCSS v4, shadcn/ui, Zod validation
- **Backend**: Convex (real-time database + serverless functions in `convex/`)
- **Auth**: Clerk (`@clerk/react-router`)
- **Payments**: Polar.sh via `@convex-dev/polar`
- **Database**: Convex tables: users, subscriptions, webhookEvents (see `convex/schema.ts`)

## Code Style
- **TypeScript**: Strict mode, ES2022, use `~/*` path alias for app imports
- **Components**: shadcn/ui + class-variance-authority, `cn()` for class merging
- **Naming**: camelCase (variables/functions), PascalCase (components)
- **Structure**: Routes in `app/routes/`, components in `app/components/`, hooks in `app/hooks/`
- **Convex**: Define schemas in `convex/schema.ts`, functions in `convex/*.ts`
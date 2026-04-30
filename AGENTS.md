# AGENTS.md

**Timeout At Shannon's** - Premium barber shop and coffee bar marketing site (Chicago).

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run typecheck` - TypeScript type checking (run after changes)
- `npm test` - Run tests; `npm test -- app/path/to/file.test.ts` for a single file
- `npm run test:watch` - Watch mode

## Architecture
- **Frontend**: React Router v7.5 (SSR enabled), React 19, TailwindCSS v4, shadcn/ui
- **Testing**: Vitest, @testing-library/react
- **Build**: Vite 6, TypeScript 5.8 (strict)
- **Deploy**: Vercel

## Routes
| Path | Purpose |
|------|---------|
| `/` | Home / hero |
| `/about` | About Shannon and the shop |
| `/services` | Service menu and booking link |
| `/cafe` | Out of Bounds Café |

## Code Style
- **TypeScript**: Strict mode, ES2022, use `~/*` path alias for app imports
- **Components**: shadcn/ui + class-variance-authority, `cn()` for class merging
- **Naming**: camelCase (variables/functions), PascalCase (components), kebab-case (component files)
- **Structure**: Routes in `app/routes/`, components in `app/components/`, hooks in `app/hooks/`

## Key Files
- `app/root.tsx` - Root layout
- `app/lib/utils.ts` - `cn()` class merging utility
- `app/lib/constants/` - services.ts, cafe.ts, colors.ts, foundation.ts

## Important Notes
- Don't edit `app/+types/` (auto-generated)
- `VITE_` prefixed env vars are exposed to browser
- TailwindCSS v4 uses `@theme` blocks in CSS

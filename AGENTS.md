# AGENTS.md

## Commands
- `npm run dev` - Start development server with HMR
- `npm run build` - Production build
- `npm run typecheck` - TypeScript type checking
- `npx convex dev` - Start Convex backend in development

## Architecture
- **Frontend**: React Router v7 with SSR, TailwindCSS v4, shadcn/ui components
- **Backend**: Convex (real-time database + serverless functions)
- **Auth**: Clerk authentication
- **Payments**: Polar.sh subscription management
- **AI**: OpenAI integration for chat features
- **Database**: Convex tables (users, subscriptions, webhookEvents)

## Code Style
- **TypeScript**: Strict mode enabled, ES2022 target
- **Imports**: External libraries first, then internal with `~/*` path alias
- **Components**: shadcn/ui with class-variance-authority variants
- **Styling**: TailwindCSS with `cn()` utility for class merging
- **Error Handling**: Try/catch with console.error for logging
- **Naming**: camelCase for variables/functions, PascalCase for components
- **File Structure**: Routes in `app/routes/`, components in `app/components/`, Convex functions in `convex/`

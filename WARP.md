# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

```bash
# Start development server with hot reloading
npm run dev

# Start Convex backend development server (run in separate terminal)
npx convex dev

# Build for production
npm run build

# Start production server
npm run start

# Run TypeScript checks
npm run typecheck

# Push Convex schema/functions to deployment
npx convex deploy

# View Convex database and logs
npx convex dashboard
```

**Note**: Always run both `npm run dev` and `npx convex dev` concurrently during development for full functionality.

## High-Level Architecture

This is a full-stack SaaS starter built with:

- **React Router v7** - SSR-capable React framework with file-based routing
- **Convex** - Serverless backend with real-time database and HTTP endpoints
- **Clerk** - Authentication and user management with SSR support
- **Polar.sh** - Subscription billing and payment processing
- **OpenAI** - AI chat functionality via streaming endpoints
- **TailwindCSS v4** - Utility-first styling with shadcn/ui components
- **Vercel** - Deployment platform with optimized preset

The app follows a subscription-gated model where users authenticate via Clerk, subscribe via Polar.sh checkout flows, and access protected dashboard features including AI chat.

## Key Architectural Patterns

### Protected Route Structure
- Public routes: `/`, `/pricing`, `/sign-in`, `/sign-up`
- Protected routes: `/dashboard/*` (requires active subscription)
- Layout-based route protection in `app/routes/dashboard/layout.tsx`
- SSR loaders check auth status and subscription before rendering

### Convex Backend Organization
- **`users.ts`** - User CRUD with Clerk token synchronization
- **`subscriptions.ts`** - Polar.sh integration, checkout creation, webhook handling
- **`http.ts`** - HTTP router for AI chat API and webhook endpoints
- **`schema.ts`** - Database schema (users, subscriptions, webhookEvents tables)

### Authentication Flow
- Clerk handles authentication with SSR support
- `tokenIdentifier` = Clerk's `identity.subject` used as user ID
- Dashboard layout loader enforces subscription requirements
- Parallel data fetching prevents auth/subscription waterfalls

### Subscription Lifecycle
- Polar.sh webhooks (`/payments/webhook`) update Convex subscription records
- Subscription status checked on protected route access
- Customer portal integration for subscription management
- Webhook events stored for auditing in `webhookEvents` table

### AI Chat Implementation
- Streaming chat via `/api/chat` Convex HTTP endpoint
- OpenAI GPT-4 integration with CORS handling
- Chat UI uses `@ai-sdk/react` for real-time message streaming

## Environment Setup

Required environment variables (see `.env.example`):

```bash
# Convex
CONVEX_DEPLOYMENT=     # Your Convex deployment URL
VITE_CONVEX_URL=       # Client-side Convex URL

# Clerk Authentication  
VITE_CLERK_PUBLISHABLE_KEY=  # Public key for client
CLERK_SECRET_KEY=            # Server-side secret key

# Polar.sh (defaults to sandbox)
POLAR_ACCESS_TOKEN=          # API access token
POLAR_ORGANIZATION_ID=       # Your org ID
POLAR_WEBHOOK_SECRET=        # Webhook verification secret

# OpenAI
OPENAI_API_KEY=             # For AI chat functionality

# Application
FRONTEND_URL=               # Your app URL for redirects
```

Prerequisites: Node.js 18+, Convex CLI (`npm install -g convex`)

## Key File Locations

- `app/routes.ts` - Route configuration manifest
- `app/routes/dashboard/layout.tsx` - Protected route layout with auth/subscription checks
- `convex/schema.ts` - Database schema definitions
- `convex/subscriptions.ts` - Polar.sh actions, checkout creation, webhook mutations
- `convex/http.ts` - HTTP router (chat API + payment webhooks)
- `convex/users.ts` - User management with Clerk synchronization
- `react-router.config.ts` - SSR configuration with Vercel preset
- `components/ui/` - shadcn/ui component library

## Development Patterns

### Adding Protected Routes
1. Add route to `app/routes.ts` under the dashboard layout
2. Create route file in `app/routes/dashboard/`
3. Subscription checking is handled by the layout loader

### Extending Convex Schema
1. Update `convex/schema.ts` with new table definitions
2. Run `npx convex dev` to apply schema changes
3. Add corresponding query/mutation functions in appropriate modules

### Clerk + Convex Integration
- Use `identity.subject` as the `tokenIdentifier` in Convex
- Sync user data with `upsertUser` mutation on authentication
- Access user via `ctx.auth.getUserIdentity()` in Convex functions

### Webhook Handling Pattern
- Polar.sh webhooks arrive at `/payments/webhook` (Convex HTTP route)
- Events are verified, stored, and processed via `handleWebhookEvent` mutation
- Use webhook events to update subscription status in real-time

### CORS for External APIs
- Convex `httpAction` functions handle CORS headers automatically
- Chat API includes proper CORS configuration for cross-origin requests
- Environment-specific FRONTEND_URL for development vs production

### Parallel Data Loading
- Use Promise.all() in React Router loaders to fetch multiple data sources
- Combine Clerk user data with Convex subscription status efficiently
- Avoid authentication/authorization waterfalls in protected routes

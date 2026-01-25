# CLAUDE.md

This document provides comprehensive guidance for AI assistants working with this codebase.

## Project Overview

**Timeout At Shannon's** - A premium barber shop and coffee bar membership platform based in Chicago. The application provides subscription-based membership services with an integrated AI chat feature.

### Core Business Features
- Barber services with 10 sports-themed packages ($35-$150)
- Member discount pricing
- Subscription management via Polar.sh
- AI chat assistant for members
- :20 Second Timeout Foundation (youth programs)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React Router v7.5 (SSR enabled) |
| **UI** | React 19, TailwindCSS v4, shadcn/ui |
| **State** | Convex real-time database |
| **Auth** | Clerk (@clerk/react-router) |
| **Payments** | Polar.sh (@convex-dev/polar) |
| **AI** | OpenAI GPT via @ai-sdk/openai |
| **Testing** | Vitest, @testing-library/react, convex-test |
| **Build** | Vite 6, TypeScript 5.8 (strict) |
| **Deploy** | Vercel |

---

## Quick Commands

```bash
# Development (run both in parallel)
npm run dev          # React Router dev server (localhost:5173)
npx convex dev       # Convex backend sync

# Type checking
npm run typecheck    # TypeScript + React Router typegen

# Testing
npm test             # Frontend tests (Vitest)
npm run test:watch   # Frontend watch mode
npm run test:convex  # Backend/Convex tests
npm run test:convex:watch

# Production
npm run build        # Production build
npm run start        # Serve production build
```

---

## Project Structure

```
timeout-membership/
├── app/                          # Frontend application
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui primitives
│   │   ├── dashboard/            # Dashboard-specific components
│   │   ├── homepage/             # Landing page sections
│   │   ├── about/                # About page components
│   │   ├── cafe/                 # Cafe menu components
│   │   ├── services/             # Service listing components
│   │   ├── foundation/           # Foundation info
│   │   ├── community/            # Community features
│   │   └── logos/                # Logo variations
│   ├── routes/                   # Page routes (file-based routing)
│   │   ├── home.tsx              # Landing page
│   │   ├── about.tsx             # About page
│   │   ├── services.tsx          # Barber services
│   │   ├── cafe.tsx              # Coffee bar menu
│   │   ├── foundation.tsx        # Non-profit foundation
│   │   ├── pricing.tsx           # Subscription plans
│   │   ├── sign-in.tsx           # Clerk authentication
│   │   ├── sign-up.tsx           # Clerk registration
│   │   ├── success.tsx           # Payment success
│   │   ├── subscription-required.tsx  # Paywall
│   │   └── dashboard/            # Protected member area
│   │       ├── layout.tsx        # Auth guard + subscription check
│   │       ├── index.tsx         # Dashboard home
│   │       ├── chat.tsx          # AI chat interface
│   │       └── settings.tsx      # User settings
│   ├── hooks/                    # Custom React hooks
│   │   └── use-mobile.ts         # Mobile detection
│   ├── lib/                      # Utilities
│   │   ├── utils.ts              # cn() class utility
│   │   └── constants/            # App constants
│   │       ├── colors.ts         # Brand colors
│   │       ├── services.ts       # Barber services data
│   │       ├── cafe.ts           # Cafe menu data
│   │       └── foundation.ts     # Foundation info
│   ├── root.tsx                  # Root layout (providers)
│   ├── routes.ts                 # Route configuration
│   └── app.css                   # Global styles + Tailwind
│
├── convex/                       # Backend (Convex)
│   ├── schema.ts                 # Database schema
│   ├── users.ts                  # User operations
│   ├── subscriptions.ts          # Payment/subscription logic
│   ├── http.ts                   # HTTP endpoints (webhooks, API)
│   ├── auth.config.ts            # Clerk config
│   ├── convex.config.ts          # Polar plugin setup
│   ├── subscriptions.test.ts     # Backend tests
│   └── _generated/               # Auto-generated types
│
├── public/                       # Static assets
│   └── images/                   # Product images
│
└── Config files
    ├── package.json
    ├── tsconfig.json             # TypeScript (strict, ES2022)
    ├── vite.config.ts            # Vite + plugins
    ├── react-router.config.ts    # SSR + Vercel preset
    ├── components.json           # shadcn/ui config
    ├── Dockerfile                # Docker build
    └── .env.example              # Environment template
```

---

## Database Schema

Three Convex tables defined in `convex/schema.ts`:

### `users`
| Field | Type | Notes |
|-------|------|-------|
| name | string? | Display name |
| email | string? | Email address |
| image | string? | Profile image URL |
| tokenIdentifier | string | Clerk identity token (indexed) |

### `subscriptions`
| Field | Type | Notes |
|-------|------|-------|
| userId | string? | Links to user (indexed) |
| polarId | string? | Polar subscription ID (indexed) |
| status | string? | active, canceled, etc. |
| currency | string? | USD, etc. |
| interval | string? | month, year |
| amount | number? | Price in cents |
| currentPeriodStart/End | number? | Billing period |
| cancelAtPeriodEnd | boolean? | Pending cancellation |
| customerId | string? | Polar customer ID |
| metadata | any? | Additional data |

### `webhookEvents`
| Field | Type | Notes |
|-------|------|-------|
| type | string | Event type (indexed) |
| polarEventId | string | Unique event ID (indexed) |
| createdAt | string | ISO timestamp |
| modifiedAt | string | ISO timestamp |
| data | any | Webhook payload |

---

## Routes

| Path | File | Access | Purpose |
|------|------|--------|---------|
| `/` | home.tsx | Public | Landing page |
| `/about` | about.tsx | Public | Company info |
| `/services` | services.tsx | Public | Barber services list |
| `/cafe` | cafe.tsx | Public | Coffee bar menu |
| `/foundation` | foundation.tsx | Public | Non-profit foundation |
| `/pricing` | pricing.tsx | Public | Subscription plans |
| `/sign-in/*` | sign-in.tsx | Public | Clerk sign-in |
| `/sign-up/*` | sign-up.tsx | Public | Clerk sign-up |
| `/success` | success.tsx | Public | Post-payment redirect |
| `/subscription-required` | subscription-required.tsx | Auth | Paywall page |
| `/dashboard` | dashboard/index.tsx | Subscriber | Member dashboard |
| `/dashboard/chat` | dashboard/chat.tsx | Subscriber | AI chat |
| `/dashboard/settings` | dashboard/settings.tsx | Subscriber | User settings |

### Route Protection Pattern
Dashboard routes use a layout with loader that:
1. Checks Clerk authentication
2. Verifies active subscription via Convex
3. Redirects to `/sign-in` or `/subscription-required` if needed

---

## Code Conventions

### TypeScript
- **Strict mode** enabled
- **ES2022** target
- **Path alias**: `~/*` maps to `app/*`
- Always type props and function returns

### Naming
- **Variables/functions**: camelCase
- **Components**: PascalCase
- **Files**: kebab-case for components, camelCase for utils

### Components
- Use shadcn/ui components from `~/components/ui/`
- Apply class-variance-authority (CVA) for variants
- Merge classes with `cn()` utility from `~/lib/utils`

```tsx
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"

function Example({ className }: { className?: string }) {
  return <Button className={cn("custom-class", className)}>Click</Button>
}
```

### Styling
- TailwindCSS v4 with inline `@theme` in app.css
- CSS variables for dark mode support
- Brand colors defined in `~/lib/constants/colors.ts`

### Convex Functions
- Define with `mutation()`, `query()`, or `action()`
- Use `v` validators for type-safe arguments
- Export from individual files (users.ts, subscriptions.ts)

```ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", { name: args.name, tokenIdentifier: "" });
  },
});
```

### Data Fetching
- **Client**: `useQuery()`, `useMutation()`, `useAction()` from Convex
- **Server (loaders)**: `fetchQuery()`, `fetchAction()` with `Promise.all()` for parallel fetches

---

## Environment Variables

Required in `.env` (see `.env.example`):

```bash
# Convex
CONVEX_DEPLOYMENT=           # Convex deployment ID
VITE_CONVEX_URL=             # Convex HTTP URL
VITE_CONVEX_SITE_URL=        # Site URL for Convex

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=  # Public Clerk key
CLERK_SECRET_KEY=            # Secret Clerk key

# Application
FRONTEND_URL=                # App URL (for redirects)
```

**Note**: Variables prefixed with `VITE_` are exposed to the browser.

---

## Testing

### Frontend Tests
- Location: `app/**/*.test.ts(x)`
- Framework: Vitest with jsdom
- Utilities: @testing-library/react

```ts
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges classes", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });
});
```

### Convex Backend Tests
- Location: `convex/*.test.ts`
- Framework: convex-test with Vitest
- Config: `convex/vitest.config.ts`

```ts
import { convexTest } from "convex-test";
import { describe, it, expect } from "vitest";
import schema from "./schema";

describe("subscriptions", () => {
  it("creates subscription", async () => {
    const t = convexTest(schema);
    // Test mutations/queries
  });
});
```

### Running Tests
```bash
npm test                    # All frontend tests
npm test -- path/to/file    # Single file
npm run test:convex         # All backend tests
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `app/root.tsx` | Root layout with Clerk, Convex, Theme providers |
| `app/routes.ts` | Route configuration |
| `app/lib/utils.ts` | `cn()` class merging utility |
| `app/lib/constants/services.ts` | Barber services data (BARBER_SERVICES) |
| `convex/schema.ts` | Database schema definition |
| `convex/subscriptions.ts` | Payment/subscription business logic |
| `convex/http.ts` | HTTP endpoints (webhooks, /api/chat) |
| `convex/users.ts` | User CRUD operations |

---

## HTTP Endpoints (convex/http.ts)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/chat` | OpenAI streaming chat endpoint |
| POST | `/payments/webhook` | Polar payment webhook handler |
| OPTIONS | `/api/chat` | CORS preflight |

---

## Common Patterns

### Adding a New Route
1. Create route file in `app/routes/`
2. Add to `app/routes.ts` configuration
3. Run `npm run typecheck` to generate types

### Adding a UI Component
1. Use shadcn/ui CLI or copy from registry
2. Place in `app/components/ui/`
3. Import with `~/components/ui/component-name`

### Adding a Convex Function
1. Add to appropriate file in `convex/` (or create new)
2. Define with `mutation()`, `query()`, or `action()`
3. Export and use via generated API

### Protecting a Route
```tsx
// In route loader
export async function loader({ request }: Route.LoaderArgs) {
  const auth = await getAuth(request);
  if (!auth.userId) {
    throw redirect("/sign-in");
  }
  // Check subscription status via Convex
}
```

---

## Development Workflow

1. **Start development servers** (in parallel):
   ```bash
   npm run dev      # Terminal 1
   npx convex dev   # Terminal 2
   ```

2. **Make changes** to routes, components, or Convex functions

3. **Run type checking**:
   ```bash
   npm run typecheck
   ```

4. **Run tests** before committing:
   ```bash
   npm test
   npm run test:convex
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## Important Notes

- **Never commit `.env`** - use `.env.example` as template
- **Convex auto-generates types** in `convex/_generated/` - don't edit
- **React Router generates types** in `app/+types/` - don't edit
- **shadcn/ui config** in `components.json` defines aliases
- **SSR is enabled** - loaders run on server, use `fetchQuery` not `useQuery`
- **TailwindCSS v4** uses new syntax with `@theme` blocks in CSS

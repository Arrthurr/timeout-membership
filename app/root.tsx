import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { ClerkProvider, useAuth } from "@clerk/react-router";
import { rootAuthLoader } from "@clerk/react-router/ssr.server";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { Route } from "./+types/root";
import "./app.css";
import { Analytics } from "@vercel/analytics/react";
import { BRAND_COLORS } from "./lib/constants/colors";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// Clerk appearance configuration for Timeout At Shannon's theme
const clerkAppearance = {
  baseTheme: undefined, // Use default theme as base
  variables: {
    colorPrimary: BRAND_COLORS.primary,
    colorBackground: BRAND_COLORS.background,
    colorInputBackground: BRAND_COLORS.input,
    colorInputText: BRAND_COLORS.foreground,
    colorText: BRAND_COLORS.foreground,
    colorTextSecondary: BRAND_COLORS.mutedForeground,
    colorNeutral: BRAND_COLORS.muted,
    colorDanger: BRAND_COLORS.destructive,
    borderRadius: '0.5rem',
    fontFamily: 'Inter, sans-serif',
  },
  elements: {
    // Main container
    card: {
      backgroundColor: BRAND_COLORS.card,
      border: `1px solid ${BRAND_COLORS.border}`,
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    // Header with logo area
    headerTitle: {
      color: BRAND_COLORS.foreground,
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    headerSubtitle: {
      color: BRAND_COLORS.mutedForeground,
    },
    // Form elements
    formButtonPrimary: {
      backgroundColor: BRAND_COLORS.primary,
      color: BRAND_COLORS.primaryForeground,
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      '&:hover': {
        backgroundColor: BRAND_COLORS.accent,
      },
    },
    formFieldInput: {
      backgroundColor: BRAND_COLORS.input,
      borderColor: BRAND_COLORS.border,
      color: BRAND_COLORS.foreground,
      borderRadius: '0.5rem',
      '&:focus': {
        borderColor: BRAND_COLORS.primary,
        boxShadow: `0 0 0 3px ${BRAND_COLORS.primary}20`,
      },
    },
    // Links and secondary buttons
    footerActionLink: {
      color: BRAND_COLORS.primary,
      '&:hover': {
        color: BRAND_COLORS.accent,
      },
    },
    // Social connection buttons
    socialButtonsBlockButton: {
      borderColor: BRAND_COLORS.border,
      color: BRAND_COLORS.foreground,
      '&:hover': {
        backgroundColor: BRAND_COLORS.secondary,
      },
    },
  },
} as const;

export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args);
}
export const links: Route.LinksFunction = () => [
  // DNS prefetch for external services
  { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
  { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
  { rel: "dns-prefetch", href: "https://api.convex.dev" },
  { rel: "dns-prefetch", href: "https://clerk.dev" },
  
  // Preconnect to font services
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  
  // Font with display=swap for performance
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  
  // Preload critical assets
  {
    rel: "preload",
    href: "/images/barber-shop/timeout_logo_crop.png",
    as: "image",
    type: "image/png",
  },
  {
    rel: "preload",
    href: "/favicon.png", 
    as: "image",
    type: "image/png",
  },
  
  // Icon
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon.png",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <ClerkProvider
      loaderData={loaderData}
      signUpFallbackRedirectUrl="/"
      signInFallbackRedirectUrl="/"
      appearance={clerkAppearance}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Outlet />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

import { getAuth } from "@clerk/react-router/ssr.server";
import { createClerkClient } from "@clerk/react-router/api.server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "react-router";
import { api } from "../../../convex/_generated/api";

export async function dashboardLoader(args: { request: Request; params: any; context: any }) {
  const { userId } = await getAuth(args);

  // Redirect to sign-in if not authenticated
  if (!userId) {
    throw redirect("/sign-in");
  }

  // Parallel data fetching to reduce waterfall
  const [subscriptionStatus, user] = await Promise.all([
    fetchQuery(api.subscriptions.checkUserSubscriptionStatus, { userId }),
    createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    }).users.getUser(userId)
  ]);

  // Redirect to subscription-required if no active subscription
  if (!subscriptionStatus?.hasActiveSubscription) {
    throw redirect("/subscription-required");
  }

  return { user };
}

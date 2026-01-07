import { convexTest } from "convex-test";
import { describe, it, expect, beforeEach } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

describe("handleWebhookEvent", () => {
  describe("subscription.created", () => {
    it("creates a new subscription record", async () => {
      const t = convexTest(schema);

      await t.mutation(api.subscriptions.handleWebhookEvent, {
        body: {
          type: "subscription.created",
          data: {
            id: "polar_sub_123",
            created_at: "2024-01-01T00:00:00Z",
            modified_at: "2024-01-01T00:00:00Z",
            price_id: "price_456",
            currency: "USD",
            recurring_interval: "month",
            metadata: { userId: "user_abc" },
            status: "active",
            current_period_start: "2024-01-01T00:00:00Z",
            current_period_end: "2024-02-01T00:00:00Z",
            cancel_at_period_end: false,
            amount: 1000,
            started_at: "2024-01-01T00:00:00Z",
            ended_at: null,
            canceled_at: null,
            customer_cancellation_reason: null,
            customer_cancellation_comment: null,
            custom_field_data: {},
            customer_id: "cust_789",
          },
        },
      });

      const subscription = await t.run(async (ctx) => {
        return ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", "polar_sub_123"))
          .first();
      });

      expect(subscription).not.toBeNull();
      expect(subscription?.polarId).toBe("polar_sub_123");
      expect(subscription?.userId).toBe("user_abc");
      expect(subscription?.status).toBe("active");
      expect(subscription?.currency).toBe("USD");
      expect(subscription?.interval).toBe("month");
      expect(subscription?.amount).toBe(1000);
    });

    it("stores webhook event in webhookEvents table", async () => {
      const t = convexTest(schema);

      await t.mutation(api.subscriptions.handleWebhookEvent, {
        body: {
          type: "subscription.created",
          data: {
            id: "polar_sub_123",
            created_at: "2024-01-01T00:00:00Z",
            modified_at: "2024-01-01T00:00:00Z",
            price_id: "price_456",
            currency: "USD",
            recurring_interval: "month",
            metadata: { userId: "user_abc" },
            status: "active",
            current_period_start: "2024-01-01T00:00:00Z",
            current_period_end: "2024-02-01T00:00:00Z",
            cancel_at_period_end: false,
            amount: 1000,
            started_at: "2024-01-01T00:00:00Z",
            customer_id: "cust_789",
          },
        },
      });

      const event = await t.run(async (ctx) => {
        return ctx.db
          .query("webhookEvents")
          .withIndex("polarEventId", (q) => q.eq("polarEventId", "polar_sub_123"))
          .first();
      });

      expect(event).not.toBeNull();
      expect(event?.type).toBe("subscription.created");
    });
  });

  describe("subscription.updated", () => {
    it("updates an existing subscription", async () => {
      const t = convexTest(schema);

      // First create a subscription
      await t.run(async (ctx) => {
        await ctx.db.insert("subscriptions", {
          polarId: "polar_sub_123",
          userId: "user_abc",
          status: "active",
          amount: 1000,
        });
      });

      // Now update it
      await t.mutation(api.subscriptions.handleWebhookEvent, {
        body: {
          type: "subscription.updated",
          data: {
            id: "polar_sub_123",
            created_at: "2024-01-01T00:00:00Z",
            modified_at: "2024-01-15T00:00:00Z",
            status: "active",
            amount: 2000,
            current_period_start: "2024-01-15T00:00:00Z",
            current_period_end: "2024-02-15T00:00:00Z",
            cancel_at_period_end: false,
            metadata: {},
            custom_field_data: {},
          },
        },
      });

      const subscription = await t.run(async (ctx) => {
        return ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", "polar_sub_123"))
          .first();
      });

      expect(subscription?.amount).toBe(2000);
    });
  });

  describe("subscription.canceled", () => {
    it("marks subscription as canceled with reason", async () => {
      const t = convexTest(schema);

      await t.run(async (ctx) => {
        await ctx.db.insert("subscriptions", {
          polarId: "polar_sub_123",
          userId: "user_abc",
          status: "active",
        });
      });

      await t.mutation(api.subscriptions.handleWebhookEvent, {
        body: {
          type: "subscription.canceled",
          data: {
            id: "polar_sub_123",
            created_at: "2024-01-01T00:00:00Z",
            modified_at: "2024-01-20T00:00:00Z",
            status: "canceled",
            canceled_at: "2024-01-20T00:00:00Z",
            customer_cancellation_reason: "too_expensive",
            customer_cancellation_comment: "Looking for cheaper options",
          },
        },
      });

      const subscription = await t.run(async (ctx) => {
        return ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", "polar_sub_123"))
          .first();
      });

      expect(subscription?.status).toBe("canceled");
      expect(subscription?.customerCancellationReason).toBe("too_expensive");
      expect(subscription?.customerCancellationComment).toBe(
        "Looking for cheaper options"
      );
    });
  });

  describe("subscription.uncanceled", () => {
    it("clears cancellation data and restores subscription", async () => {
      const t = convexTest(schema);

      await t.run(async (ctx) => {
        await ctx.db.insert("subscriptions", {
          polarId: "polar_sub_123",
          userId: "user_abc",
          status: "canceled",
          cancelAtPeriodEnd: true,
          canceledAt: Date.now(),
          customerCancellationReason: "too_expensive",
        });
      });

      await t.mutation(api.subscriptions.handleWebhookEvent, {
        body: {
          type: "subscription.uncanceled",
          data: {
            id: "polar_sub_123",
            created_at: "2024-01-01T00:00:00Z",
            modified_at: "2024-01-25T00:00:00Z",
            status: "active",
          },
        },
      });

      const subscription = await t.run(async (ctx) => {
        return ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", "polar_sub_123"))
          .first();
      });

      expect(subscription?.status).toBe("active");
      expect(subscription?.cancelAtPeriodEnd).toBe(false);
      expect(subscription?.canceledAt).toBeUndefined();
      expect(subscription?.customerCancellationReason).toBeUndefined();
    });
  });

  describe("subscription.revoked", () => {
    it("marks subscription as revoked with end date", async () => {
      const t = convexTest(schema);

      await t.run(async (ctx) => {
        await ctx.db.insert("subscriptions", {
          polarId: "polar_sub_123",
          userId: "user_abc",
          status: "active",
        });
      });

      await t.mutation(api.subscriptions.handleWebhookEvent, {
        body: {
          type: "subscription.revoked",
          data: {
            id: "polar_sub_123",
            created_at: "2024-01-01T00:00:00Z",
            modified_at: "2024-01-30T00:00:00Z",
            ended_at: "2024-01-30T00:00:00Z",
          },
        },
      });

      const subscription = await t.run(async (ctx) => {
        return ctx.db
          .query("subscriptions")
          .withIndex("polarId", (q) => q.eq("polarId", "polar_sub_123"))
          .first();
      });

      expect(subscription?.status).toBe("revoked");
      expect(subscription?.endedAt).toBeDefined();
    });
  });
});

describe("checkUserSubscriptionStatus", () => {
  it("returns false when user has no subscription", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({ subject: "user_abc" });

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Test User",
        email: "test@example.com",
      });
    });

    const result = await asUser.query(api.subscriptions.checkUserSubscriptionStatus, {});

    expect(result.hasActiveSubscription).toBe(false);
  });

  it("returns false when user has inactive subscription", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({ subject: "user_abc" });

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Test User",
        email: "test@example.com",
      });
      await ctx.db.insert("subscriptions", {
        userId: "user_abc",
        status: "canceled",
      });
    });

    const result = await asUser.query(api.subscriptions.checkUserSubscriptionStatus, {});

    expect(result.hasActiveSubscription).toBe(false);
  });

  it("returns true when user has active subscription", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({ subject: "user_abc" });

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Test User",
        email: "test@example.com",
      });
      await ctx.db.insert("subscriptions", {
        userId: "user_abc",
        status: "active",
      });
    });

    const result = await asUser.query(api.subscriptions.checkUserSubscriptionStatus, {});

    expect(result.hasActiveSubscription).toBe(true);
  });

  it("returns false when not authenticated", async () => {
    const t = convexTest(schema);

    const result = await t.query(api.subscriptions.checkUserSubscriptionStatus, {});

    expect(result.hasActiveSubscription).toBe(false);
  });

  it("accepts explicit userId parameter", async () => {
    const t = convexTest(schema);

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Test User",
        email: "test@example.com",
      });
      await ctx.db.insert("subscriptions", {
        userId: "user_abc",
        status: "active",
      });
    });

    const result = await t.query(api.subscriptions.checkUserSubscriptionStatus, {
      userId: "user_abc",
    });

    expect(result.hasActiveSubscription).toBe(true);
  });
});

describe("fetchUserSubscription", () => {
  it("returns null when not authenticated", async () => {
    const t = convexTest(schema);

    const result = await t.query(api.subscriptions.fetchUserSubscription, {});

    expect(result).toBeNull();
  });

  it("returns subscription details for authenticated user", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({ subject: "user_abc" });

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Test User",
        email: "test@example.com",
      });
      await ctx.db.insert("subscriptions", {
        userId: "user_abc",
        status: "active",
        polarId: "polar_123",
        amount: 1000,
        currency: "USD",
        interval: "month",
      });
    });

    const result = await asUser.query(api.subscriptions.fetchUserSubscription, {});

    expect(result).not.toBeNull();
    expect(result?.status).toBe("active");
    expect(result?.amount).toBe(1000);
  });
});

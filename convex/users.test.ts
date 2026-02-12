import { convexTest } from "convex-test";
import { describe, it, expect } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

describe("findUserByToken", () => {
  it("returns null when not authenticated", async () => {
    const t = convexTest(schema);

    const result = await t.query(api.users.findUserByToken, {
      tokenIdentifier: "user_abc",
    });

    expect(result).toBeNull();
  });

  it("returns null when authenticated but user doesn't exist in DB", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({
      subject: "user_abc",
      name: "Test",
      email: "test@example.com",
    });

    const result = await asUser.query(api.users.findUserByToken, {
      tokenIdentifier: "user_abc",
    });

    expect(result).toBeNull();
  });

  it("returns the user when authenticated and user exists", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({
      subject: "user_abc",
      name: "Test",
      email: "test@example.com",
    });

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Test",
        email: "test@example.com",
      });
    });

    const result = await asUser.query(api.users.findUserByToken, {
      tokenIdentifier: "user_abc",
    });

    expect(result).not.toBeNull();
    expect(result?.name).toBe("Test");
    expect(result?.email).toBe("test@example.com");
    expect(result?.tokenIdentifier).toBe("user_abc");
  });

  it("returns correct user even if args.tokenIdentifier differs from identity.subject", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({
      subject: "user_abc",
      name: "Test",
      email: "test@example.com",
    });

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Test",
        email: "test@example.com",
      });
      await ctx.db.insert("users", {
        tokenIdentifier: "user_xyz",
        name: "Other",
        email: "other@example.com",
      });
    });

    const result = await asUser.query(api.users.findUserByToken, {
      tokenIdentifier: "user_xyz",
    });

    expect(result).not.toBeNull();
    expect(result?.tokenIdentifier).toBe("user_abc");
    expect(result?.name).toBe("Test");
  });
});

describe("upsertUser", () => {
  it("returns null when not authenticated", async () => {
    const t = convexTest(schema);

    const result = await t.mutation(api.users.upsertUser, {});

    expect(result).toBeNull();
  });

  it("creates a new user when none exists", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({
      subject: "user_abc",
      name: "Test",
      email: "test@example.com",
    });

    const result = await asUser.mutation(api.users.upsertUser, {});

    expect(result).not.toBeNull();
    expect(result?.name).toBe("Test");
    expect(result?.email).toBe("test@example.com");
    expect(result?.tokenIdentifier).toBe("user_abc");

    const dbUser = await t.run(async (ctx) => {
      return ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", "user_abc"))
        .unique();
    });

    expect(dbUser).not.toBeNull();
    expect(dbUser?.name).toBe("Test");
    expect(dbUser?.email).toBe("test@example.com");
    expect(dbUser?.tokenIdentifier).toBe("user_abc");
  });

  it("returns existing user without patching when name and email match", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({
      subject: "user_abc",
      name: "Test",
      email: "test@example.com",
    });

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Test",
        email: "test@example.com",
      });
    });

    const result = await asUser.mutation(api.users.upsertUser, {});

    expect(result).not.toBeNull();
    expect(result?.name).toBe("Test");
    expect(result?.email).toBe("test@example.com");
  });

  it("updates existing user when name has changed", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({
      subject: "user_abc",
      name: "Updated Name",
      email: "test@example.com",
    });

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Old Name",
        email: "test@example.com",
      });
    });

    await asUser.mutation(api.users.upsertUser, {});

    const dbUser = await t.run(async (ctx) => {
      return ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", "user_abc"))
        .unique();
    });

    expect(dbUser?.name).toBe("Updated Name");
    expect(dbUser?.email).toBe("test@example.com");
  });

  it("updates existing user when email has changed", async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({
      subject: "user_abc",
      name: "Test",
      email: "new@example.com",
    });

    await t.run(async (ctx) => {
      await ctx.db.insert("users", {
        tokenIdentifier: "user_abc",
        name: "Test",
        email: "old@example.com",
      });
    });

    await asUser.mutation(api.users.upsertUser, {});

    const dbUser = await t.run(async (ctx) => {
      return ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", "user_abc"))
        .unique();
    });

    expect(dbUser?.name).toBe("Test");
    expect(dbUser?.email).toBe("new@example.com");
  });
});

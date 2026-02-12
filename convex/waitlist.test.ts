import { convexTest } from "convex-test";
import { describe, it, expect } from "vitest";
import { api } from "./_generated/api";
import schema from "./schema";

describe("submitWaitlistInquiry", () => {
  it("creates a new inquiry with correct fields", async () => {
    const t = convexTest(schema);

    const result = await t.mutation(api.waitlist.submitWaitlistInquiry, {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "(312) 555-1234",
      message: "Very interested!",
      planName: "The Chairman's Cut",
    });

    expect(result.updated).toBe(false);
    expect(result.id).toBeDefined();

    const inquiry = await t.run(async (ctx) => {
      return ctx.db.get(result.id);
    });

    expect(inquiry).not.toBeNull();
    expect(inquiry?.name).toBe("Jane Doe");
    expect(inquiry?.email).toBe("jane@example.com");
    expect(inquiry?.phone).toBe("(312) 555-1234");
    expect(inquiry?.message).toBe("Very interested!");
    expect(inquiry?.planName).toBe("The Chairman's Cut");
    expect(inquiry?.status).toBe("pending");
    expect(inquiry?.createdAt).toBeTypeOf("number");
  });

  it("creates inquiry without optional phone and message", async () => {
    const t = convexTest(schema);

    const result = await t.mutation(api.waitlist.submitWaitlistInquiry, {
      name: "John",
      email: "john@example.com",
      planName: "The Hot Towel",
    });

    expect(result.updated).toBe(false);

    const inquiry = await t.run(async (ctx) => {
      return ctx.db.get(result.id);
    });

    expect(inquiry?.phone).toBeUndefined();
    expect(inquiry?.message).toBeUndefined();
  });

  it("updates existing inquiry for same email and plan instead of creating duplicate", async () => {
    const t = convexTest(schema);

    const first = await t.mutation(api.waitlist.submitWaitlistInquiry, {
      name: "Jane",
      email: "jane@example.com",
      phone: "(312) 555-0000",
      planName: "The Chairman's Cut",
    });

    expect(first.updated).toBe(false);

    const second = await t.mutation(api.waitlist.submitWaitlistInquiry, {
      name: "Jane Doe Updated",
      email: "jane@example.com",
      phone: "(312) 555-9999",
      message: "Still interested!",
      planName: "The Chairman's Cut",
    });

    expect(second.updated).toBe(true);
    expect(second.id).toEqual(first.id);

    const inquiry = await t.run(async (ctx) => {
      return ctx.db.get(first.id);
    });

    expect(inquiry?.name).toBe("Jane Doe Updated");
    expect(inquiry?.phone).toBe("(312) 555-9999");
    expect(inquiry?.message).toBe("Still interested!");
    expect(inquiry?.updatedAt).toBeTypeOf("number");
  });

  it("does not clear existing phone/message when not provided on update", async () => {
    const t = convexTest(schema);

    await t.mutation(api.waitlist.submitWaitlistInquiry, {
      name: "Jane",
      email: "jane@example.com",
      phone: "(312) 555-0000",
      message: "Original message",
      planName: "The Chairman's Cut",
    });

    await t.mutation(api.waitlist.submitWaitlistInquiry, {
      name: "Jane Updated",
      email: "jane@example.com",
      planName: "The Chairman's Cut",
    });

    const inquiries = await t.run(async (ctx) => {
      return ctx.db
        .query("waitlistInquiries")
        .withIndex("by_email", (q) => q.eq("email", "jane@example.com"))
        .collect();
    });

    expect(inquiries).toHaveLength(1);
    // phone and message should be preserved from original
    expect(inquiries[0].phone).toBe("(312) 555-0000");
    expect(inquiries[0].message).toBe("Original message");
  });

  it("allows same email for different plans", async () => {
    const t = convexTest(schema);

    const first = await t.mutation(api.waitlist.submitWaitlistInquiry, {
      name: "Jane",
      email: "jane@example.com",
      planName: "The Chairman's Cut",
    });

    const second = await t.mutation(api.waitlist.submitWaitlistInquiry, {
      name: "Jane",
      email: "jane@example.com",
      planName: "The Hot Towel",
    });

    expect(first.updated).toBe(false);
    expect(second.updated).toBe(false);
    expect(first.id).not.toEqual(second.id);
  });
});

describe("getWaitlistInquiries", () => {
  it("returns empty array when no inquiries exist", async () => {
    const t = convexTest(schema);

    const result = await t.query(api.waitlist.getWaitlistInquiries, {});

    expect(result).toEqual([]);
  });

  it("returns all inquiries ordered by createdAt descending", async () => {
    const t = convexTest(schema);

    await t.run(async (ctx) => {
      await ctx.db.insert("waitlistInquiries", {
        name: "First",
        email: "first@example.com",
        planName: "Plan A",
        status: "pending",
        createdAt: 1000,
      });
      await ctx.db.insert("waitlistInquiries", {
        name: "Third",
        email: "third@example.com",
        planName: "Plan C",
        status: "contacted",
        createdAt: 3000,
      });
      await ctx.db.insert("waitlistInquiries", {
        name: "Second",
        email: "second@example.com",
        planName: "Plan B",
        status: "pending",
        createdAt: 2000,
      });
    });

    const result = await t.query(api.waitlist.getWaitlistInquiries, {});

    expect(result).toHaveLength(3);
    expect(result[0].name).toBe("Third");
    expect(result[1].name).toBe("Second");
    expect(result[2].name).toBe("First");
  });

  it("filters by status when provided", async () => {
    const t = convexTest(schema);

    await t.run(async (ctx) => {
      await ctx.db.insert("waitlistInquiries", {
        name: "Pending User",
        email: "pending@example.com",
        planName: "Plan A",
        status: "pending",
        createdAt: 1000,
      });
      await ctx.db.insert("waitlistInquiries", {
        name: "Contacted User",
        email: "contacted@example.com",
        planName: "Plan B",
        status: "contacted",
        createdAt: 2000,
      });
      await ctx.db.insert("waitlistInquiries", {
        name: "Another Pending",
        email: "pending2@example.com",
        planName: "Plan C",
        status: "pending",
        createdAt: 3000,
      });
    });

    const pendingResult = await t.query(api.waitlist.getWaitlistInquiries, {
      status: "pending",
    });

    expect(pendingResult).toHaveLength(2);
    expect(pendingResult.every((i) => i.status === "pending")).toBe(true);
    // Should still be sorted descending
    expect(pendingResult[0].name).toBe("Another Pending");
    expect(pendingResult[1].name).toBe("Pending User");

    const contactedResult = await t.query(api.waitlist.getWaitlistInquiries, {
      status: "contacted",
    });

    expect(contactedResult).toHaveLength(1);
    expect(contactedResult[0].name).toBe("Contacted User");
  });

  it("returns empty array for status with no matches", async () => {
    const t = convexTest(schema);

    await t.run(async (ctx) => {
      await ctx.db.insert("waitlistInquiries", {
        name: "User",
        email: "user@example.com",
        planName: "Plan A",
        status: "pending",
        createdAt: 1000,
      });
    });

    const result = await t.query(api.waitlist.getWaitlistInquiries, {
      status: "converted",
    });

    expect(result).toEqual([]);
  });
});

describe("updateWaitlistStatus", () => {
  it("updates the status of an inquiry", async () => {
    const t = convexTest(schema);

    let inquiryId: any;
    await t.run(async (ctx) => {
      inquiryId = await ctx.db.insert("waitlistInquiries", {
        name: "Jane",
        email: "jane@example.com",
        planName: "The Chairman's Cut",
        status: "pending",
        createdAt: Date.now(),
      });
    });

    const result = await t.mutation(api.waitlist.updateWaitlistStatus, {
      id: inquiryId,
      status: "contacted",
    });

    expect(result.success).toBe(true);

    const inquiry = await t.run(async (ctx) => {
      return ctx.db.get(inquiryId);
    });

    expect(inquiry?.status).toBe("contacted");
  });

  it("can transition through multiple statuses", async () => {
    const t = convexTest(schema);

    let inquiryId: any;
    await t.run(async (ctx) => {
      inquiryId = await ctx.db.insert("waitlistInquiries", {
        name: "Jane",
        email: "jane@example.com",
        planName: "The Chairman's Cut",
        status: "pending",
        createdAt: Date.now(),
      });
    });

    await t.mutation(api.waitlist.updateWaitlistStatus, {
      id: inquiryId,
      status: "contacted",
    });

    await t.mutation(api.waitlist.updateWaitlistStatus, {
      id: inquiryId,
      status: "converted",
    });

    const inquiry = await t.run(async (ctx) => {
      return ctx.db.get(inquiryId);
    });

    expect(inquiry?.status).toBe("converted");
  });
});

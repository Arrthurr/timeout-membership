import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Submit a new waitlist inquiry
export const submitWaitlistInquiry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.optional(v.string()),
    planName: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if this email already submitted for this plan
    const existing = await ctx.db
      .query("waitlistInquiries")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("planName"), args.planName))
      .first();

    if (existing) {
      // Update the existing inquiry instead of creating a duplicate
      // Note: createdAt is preserved from original submission
      // Only include optional fields if they have values to avoid clearing existing data
      const patchData: {
        name: string;
        phone?: string;
        message?: string;
        updatedAt: number;
      } = {
        name: args.name,
        updatedAt: Date.now(),
      };

      // Only update phone/message if new values are provided
      if (args.phone !== undefined) {
        patchData.phone = args.phone;
      }
      if (args.message !== undefined) {
        patchData.message = args.message;
      }

      await ctx.db.patch(existing._id, patchData);
      return { id: existing._id, updated: true };
    }

    // Create new inquiry
    const id = await ctx.db.insert("waitlistInquiries", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      message: args.message,
      planName: args.planName,
      status: "pending",
      createdAt: Date.now(),
    });

    return { id, updated: false };
  },
});

// Query to get all waitlist inquiries (for staff dashboard)
export const getWaitlistInquiries = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let inquiries;

    if (args.status) {
      // Filter by status, then sort by createdAt for consistent ordering
      inquiries = await ctx.db
        .query("waitlistInquiries")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    } else {
      // Get all inquiries ordered by createdAt descending
      inquiries = await ctx.db
        .query("waitlistInquiries")
        .withIndex("by_createdAt", (q) => q)
        .order("desc")
        .collect();
    }

    // Sort by createdAt descending for consistent ordering across all queries
    // This ensures filtered results match the same order as unfiltered results
    return inquiries.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Update waitlist inquiry status
export const updateWaitlistStatus = mutation({
  args: {
    id: v.id("waitlistInquiries"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
    return { success: true };
  },
});

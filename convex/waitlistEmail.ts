"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { Resend } from "resend";

// HTML escape function to prevent XSS in email templates
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Send email notification for new waitlist inquiry
// This action runs in Node.js runtime to support the Resend SDK
export const sendWaitlistNotification = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.optional(v.string()),
    planName: v.string(),
  },
  handler: async (_, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.WAITLIST_NOTIFICATION_EMAIL;

    // Skip email if not configured
    if (!apiKey || !notificationEmail) {
      console.log(
        "Resend not configured, skipping email notification. Set RESEND_API_KEY and WAITLIST_NOTIFICATION_EMAIL to enable."
      );
      return { sent: false, reason: "not_configured" };
    }

    const resend = new Resend(apiKey);

    try {
      const { data, error } = await resend.emails.send({
        from: "Timeout At Shannon's <notifications@timeoutshannons.com>",
        to: [notificationEmail],
        subject: `New Waitlist Inquiry: ${args.planName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 12px;">
              New Waitlist Inquiry
            </h1>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; margin-top: 0;">Plan: ${escapeHtml(args.planName)}</h2>
              
              <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(args.name)}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(args.email)}">${escapeHtml(args.email)}</a></p>
              ${args.phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${escapeHtml(args.phone)}">${escapeHtml(args.phone)}</a></p>` : ""}
              ${args.message ? `<p style="margin: 8px 0;"><strong>Message:</strong></p><p style="background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #333;">${escapeHtml(args.message)}</p>` : ""}
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Submitted on ${new Date().toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        `,
      });

      if (error) {
        console.error("Failed to send waitlist notification email:", error);
        return { sent: false, reason: "send_failed", error: error.message };
      }

      console.log("Waitlist notification email sent:", data?.id);
      return { sent: true, emailId: data?.id };
    } catch (error) {
      console.error("Error sending waitlist notification:", error);
      return {
        sent: false,
        reason: "exception",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

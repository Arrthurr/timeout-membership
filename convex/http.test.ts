import { convexTest } from "convex-test";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import schema from "./schema";

const modules = import.meta.glob("./**/*.ts");

describe("OPTIONS /api/chat (CORS preflight)", () => {
  it("returns CORS headers for valid preflight request", async () => {
    const t = convexTest(schema, modules);

    const response = await t.fetch("/api/chat", {
      method: "OPTIONS",
      headers: {
        Origin: "http://localhost:5173",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
      },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST");
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
      "Content-Type, Authorization"
    );
    expect(response.headers.get("Access-Control-Allow-Credentials")).toBe(
      "true"
    );
    expect(response.headers.get("Access-Control-Max-Age")).toBe("86400");
  });

  it("returns empty response for invalid preflight (missing Origin)", async () => {
    const t = convexTest(schema, modules);

    const response = await t.fetch("/api/chat", {
      method: "OPTIONS",
      headers: {
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
      },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("returns empty response for invalid preflight (missing Access-Control-Request-Method)", async () => {
    const t = convexTest(schema, modules);

    const response = await t.fetch("/api/chat", {
      method: "OPTIONS",
      headers: {
        Origin: "http://localhost:5173",
        "Access-Control-Request-Headers": "Content-Type",
      },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("returns empty response for invalid preflight (missing Access-Control-Request-Headers)", async () => {
    const t = convexTest(schema, modules);

    const response = await t.fetch("/api/chat", {
      method: "OPTIONS",
      headers: {
        Origin: "http://localhost:5173",
        "Access-Control-Request-Method": "POST",
      },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});

vi.mock("ai", () => ({
  streamText: vi.fn(() => ({
    toTextStreamResponse: (opts: { headers: Record<string, string> }) =>
      new Response("Hello from AI", {
        status: 200,
        headers: opts.headers,
      }),
  })),
}));

vi.mock("@ai-sdk/openai", () => ({
  openai: vi.fn(() => ({})),
}));

describe("POST /api/chat", () => {
  it("returns a response with CORS headers", async () => {
    const t = convexTest(schema, modules);

    const response = await t.fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hello" }],
      }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Credentials")).toBe(
      "true"
    );
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeTruthy();
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
      "POST, OPTIONS"
    );
  });
});

describe("POST /api/auth/webhook (CORS handler)", () => {
  it("returns CORS headers for valid preflight-style request", async () => {
    const t = convexTest(schema, modules);

    const response = await t.fetch("/api/auth/webhook", {
      method: "POST",
      headers: {
        Origin: "http://localhost:5173",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
      },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe("POST");
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
      "Content-Type, Authorization"
    );
    expect(response.headers.get("Access-Control-Allow-Credentials")).toBe(
      "true"
    );
    expect(response.headers.get("Access-Control-Max-Age")).toBe("86400");
  });

  it("returns empty response when CORS headers missing", async () => {
    const t = convexTest(schema, modules);

    const response = await t.fetch("/api/auth/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});

describe("POST /payments/webhook", () => {
  it("returns 400 when webhook secret is not configured", async () => {
    const t = convexTest(schema, modules);

    const response = await t.fetch("/payments/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "webhook-id": "msg_123",
        "webhook-timestamp": "1234567890",
        "webhook-signature": "v1,invalid_signature",
      },
      body: JSON.stringify({
        type: "subscription.created",
        data: { id: "sub_123" },
      }),
    });

    // Without POLAR_WEBHOOK_SECRET, it falls through to the generic catch
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.message).toBe("Webhook failed");
  });

  it("returns 403 when webhook signature is invalid", async () => {
    const t = convexTest(schema, modules);

    // Set the env var so it gets past the missing-secret check
    process.env.POLAR_WEBHOOK_SECRET = "test_webhook_secret";

    const response = await t.fetch("/payments/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "webhook-id": "msg_123",
        "webhook-timestamp": "1234567890",
        "webhook-signature": "v1,invalid_signature_here",
      },
      body: JSON.stringify({
        type: "subscription.created",
        data: { id: "sub_123" },
      }),
    });

    expect(response.status).toBe(403);
    const body = await response.json();
    expect(body.message).toBe("Webhook verification failed");

    delete process.env.POLAR_WEBHOOK_SECRET;
  });
});

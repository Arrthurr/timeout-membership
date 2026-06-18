import { afterEach, describe, expect, it } from "vitest";
import { isContactRateLimited, resetDevContactRateLimitStore } from "./contact-rate-limit";

describe("isContactRateLimited", () => {
  afterEach(() => {
    resetDevContactRateLimitStore();
  });

  it("allows the first request in development", async () => {
    await expect(isContactRateLimited("127.0.0.1")).resolves.toBe(false);
  });

  it("blocks after the configured number of development requests", async () => {
    const ip = "203.0.113.10";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await expect(isContactRateLimited(ip)).resolves.toBe(false);
    }

    await expect(isContactRateLimited(ip)).resolves.toBe(true);
  });
});

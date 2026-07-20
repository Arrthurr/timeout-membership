import { afterEach, describe, expect, it } from "vitest";
import {
  isContactRateLimited,
  isEmploymentRateLimited,
  isFormRateLimited,
  resetDevContactRateLimitStore,
} from "./contact-rate-limit";

describe("isFormRateLimited", () => {
  afterEach(() => {
    resetDevContactRateLimitStore();
  });

  it("allows the first request in development", async () => {
    await expect(isFormRateLimited("contact", "127.0.0.1")).resolves.toBe(false);
  });

  it("blocks after the configured number of development requests", async () => {
    const ip = "203.0.113.10";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await expect(isFormRateLimited("contact", ip)).resolves.toBe(false);
    }

    await expect(isFormRateLimited("contact", ip)).resolves.toBe(true);
  });

  it("tracks contact and employment submissions separately", async () => {
    const ip = "198.51.100.20";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await expect(isContactRateLimited(ip)).resolves.toBe(false);
    }

    await expect(isContactRateLimited(ip)).resolves.toBe(true);
    await expect(isEmploymentRateLimited(ip)).resolves.toBe(false);
  });
});

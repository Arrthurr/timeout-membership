import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

export type FormRateLimitKey = "contact" | "employment";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const devRateLimitStore = new Map<string, RateLimitEntry>();
const distributedRatelimits = new Map<FormRateLimitKey, Ratelimit | null>();

function getDistributedRatelimit(formKey: FormRateLimitKey): Ratelimit | null {
  if (distributedRatelimits.has(formKey)) {
    return distributedRatelimits.get(formKey) ?? null;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    distributedRatelimits.set(formKey, null);
    return null;
  }

  const ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX_REQUESTS, "15 m"),
    prefix: `${formKey}-form`,
  });
  distributedRatelimits.set(formKey, ratelimit);
  return ratelimit;
}

function isDevInMemoryRateLimited(formKey: FormRateLimitKey, ip: string): boolean {
  const storeKey = `${formKey}:${ip}`;
  const now = Date.now();
  const currentEntry = devRateLimitStore.get(storeKey);

  if (!currentEntry || currentEntry.resetAt <= now) {
    devRateLimitStore.set(storeKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  currentEntry.count += 1;
  devRateLimitStore.set(storeKey, currentEntry);
  return false;
}

export async function isFormRateLimited(
  formKey: FormRateLimitKey,
  ip: string,
): Promise<boolean> {
  const distributed = getDistributedRatelimit(formKey);
  if (distributed) {
    const { success } = await distributed.limit(ip);
    return !success;
  }

  if (process.env.NODE_ENV !== "production") {
    return isDevInMemoryRateLimited(formKey, ip);
  }

  return false;
}

export async function isContactRateLimited(ip: string): Promise<boolean> {
  return isFormRateLimited("contact", ip);
}

export async function isEmploymentRateLimited(ip: string): Promise<boolean> {
  return isFormRateLimited("employment", ip);
}

export function resetDevContactRateLimitStore(): void {
  devRateLimitStore.clear();
}

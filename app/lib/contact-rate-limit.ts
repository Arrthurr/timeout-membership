import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const devRateLimitStore = new Map<string, RateLimitEntry>();

let distributedRatelimit: Ratelimit | null | undefined;

function getDistributedRatelimit(): Ratelimit | null {
  if (distributedRatelimit !== undefined) {
    return distributedRatelimit;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    distributedRatelimit = null;
    return null;
  }

  distributedRatelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX_REQUESTS, "15 m"),
    prefix: "contact-form",
  });
  return distributedRatelimit;
}

function isDevInMemoryRateLimited(ip: string): boolean {
  const now = Date.now();
  const currentEntry = devRateLimitStore.get(ip);

  if (!currentEntry || currentEntry.resetAt <= now) {
    devRateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (currentEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  currentEntry.count += 1;
  devRateLimitStore.set(ip, currentEntry);
  return false;
}

export async function isContactRateLimited(ip: string): Promise<boolean> {
  const distributed = getDistributedRatelimit();
  if (distributed) {
    const { success } = await distributed.limit(ip);
    return !success;
  }

  if (process.env.NODE_ENV !== "production") {
    return isDevInMemoryRateLimited(ip);
  }

  return false;
}

export function resetDevContactRateLimitStore(): void {
  devRateLimitStore.clear();
}

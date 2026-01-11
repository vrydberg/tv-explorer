import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function validateRateLimit(identifier) {
  const result = await ratelimit.limit(identifier)
  return result // { success, remaining, reset} 
}
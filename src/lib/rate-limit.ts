type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000,
): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(key, entry);
  return { ok: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

/** Best-effort client IP from request headers. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

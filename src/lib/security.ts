/**
 * Enterprise DevSecOps Security Utilities
 * - SSRF loopback & private RFC 1918 / cloud metadata protection
 * - In-memory IP rate limiter & request throttling
 * - Input validation & sanitization
 */

// Blocked private & internal IPv4 / IPv6 network blocks and hostnames
const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  'instance-data',
  'metadata.google.internal',
  '169.254.169.254', // AWS/GCP/Azure instance metadata
]);

/**
 * Validates whether a domain or host is safe for outgoing passive inspection (SSRF protection).
 */
export function isSafeInspectionTarget(hostname: string): { safe: boolean; reason?: string } {
  if (!hostname || typeof hostname !== 'string') {
    return { safe: false, reason: 'Invalid or empty hostname provided.' };
  }

  const cleanHost = hostname.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];

  if (BLOCKED_HOSTNAMES.has(cleanHost)) {
    return { safe: false, reason: 'Inspection of private loopback or cloud metadata services is restricted.' };
  }

  // IPv4 Private Range Checks (10.x.x.x, 172.16-31.x.x, 192.168.x.x, 127.x.x.x, 169.254.x.x)
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const ipMatch = cleanHost.match(ipv4Regex);
  if (ipMatch) {
    const [, a, b] = ipMatch.map(Number);
    if (a === 127 || a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 169 && b === 254)) {
      return { safe: false, reason: 'Inspection of RFC 1918 private address spaces is restricted.' };
    }
  }

  // Domain structure validation
  if (!cleanHost.includes('.') && cleanHost !== 'localhost') {
    return { safe: false, reason: 'Hostname must be a valid fully-qualified domain name (e.g. domain.com).' };
  }

  return { safe: true };
}

/**
 * In-Memory Sliding Window Rate Limiter
 */
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup stale rate limit entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 300000);
}

/**
 * Checks rate limit for a client IP or identifier.
 * @param identifier Client IP or unique token
 * @param maxRequests Maximum allowed requests per window (default: 60)
 * @param windowMs Window duration in milliseconds (default: 60000ms / 1 min)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 60,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetInMs: windowMs };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetInMs: Math.max(0, entry.resetTime - now) };
  }

  entry.count += 1;
  return { allowed: true, remaining: maxRequests - entry.count, resetInMs: Math.max(0, entry.resetTime - now) };
}

/**
 * Sanitizes generic user text inputs to prevent XSS / malicious injection
 */
export function sanitizeInput(input: string, maxLength: number = 5000): string {
  if (!input) return '';
  return input
    .slice(0, maxLength)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .trim();
}

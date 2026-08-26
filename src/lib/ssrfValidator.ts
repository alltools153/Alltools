import dns from 'dns';

export interface SsrfValidationResult {
  isValid: boolean;
  normalizedUrl: string;
  host: string;
  ip: string;
  error?: string;
}

/**
 * Checks if an IP address (IPv4 or IPv6) falls within private, loopback, link-local, or reserved ranges.
 */
export function isPrivateOrReservedIp(ip: string): boolean {
  if (!ip) return true;

  const cleanIp = ip.trim().toLowerCase();

  // 1. IPv6 Analysis
  if (cleanIp.includes(':')) {
    // Loopback & Unspecified
    if (cleanIp === '::1' || cleanIp === '::') return true;

    // Link-local (fe80::/10)
    if (cleanIp.startsWith('fe80:') || cleanIp.startsWith('fe90:') || cleanIp.startsWith('fea0:') || cleanIp.startsWith('feb0:')) {
      return true;
    }

    // Unique Local Address (fc00::/7 -> fc00:: and fd00::)
    if (cleanIp.startsWith('fc') || cleanIp.startsWith('fd')) {
      return true;
    }

    // IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1 or ::ffff:192.168.1.1)
    if (cleanIp.startsWith('::ffff:')) {
      const ipv4Part = cleanIp.replace('::ffff:', '');
      return isPrivateOrReservedIp(ipv4Part);
    }

    // All public IPv6 (including 2000::/3 global unicast and NAT64 64:ff9b::/96) are permitted
    return false;
  }

  // 2. IPv4 Analysis
  const parts = cleanIp.split('.').map((p) => parseInt(p, 10));
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    return true; // Malformed IPv4 address rejected
  }

  const [a, b, c, d] = parts;

  // 0.0.0.0/8 (Current network)
  if (a === 0) return true;

  // 127.0.0.0/8 (Loopback: 127.0.0.1 - 127.255.255.255)
  if (a === 127) return true;

  // 10.0.0.0/8 (Private Network A)
  if (a === 10) return true;

  // 172.16.0.0/12 (Private Network B: 172.16.0.0 - 172.31.255.255)
  if (a === 172 && b >= 16 && b <= 31) return true;

  // 192.168.0.0/16 (Private Network C)
  if (a === 192 && b === 168) return true;

  // 169.254.0.0/16 (Link-local & AWS/GCP Instance Metadata 169.254.169.254)
  if (a === 169 && b === 254) return true;

  // 100.64.0.0/10 (Shared Address Space / CGNAT)
  if (a === 100 && b >= 64 && b <= 127) return true;

  // 192.0.0.0/24 (IETF Protocol Assignments)
  if (a === 192 && b === 0 && c === 0) return true;

  // 192.0.2.0/24 (TEST-NET-1), 198.51.100.0/24 (TEST-NET-2), 203.0.113.0/24 (TEST-NET-3)
  if (a === 192 && b === 0 && c === 2) return true;
  if (a === 198 && b === 51 && c === 100) return true;
  if (a === 203 && b === 0 && c === 113) return true;

  // 224.0.0.0/4 (Multicast: 224.0.0.0 - 239.255.255.255)
  if (a >= 224 && a <= 239) return true;

  // 240.0.0.0/4 (Reserved / Future use)
  if (a >= 240) return true;

  return false;
}

/**
 * Validates a target URL against SSRF and protocol manipulation attacks.
 */
export async function validateTargetUrl(rawUrl: string): Promise<SsrfValidationResult> {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      isValid: false,
      normalizedUrl: '',
      host: '',
      ip: '',
      error: 'TARGET URL CANNOT BE EMPTY.',
    };
  }

  let formatted = rawUrl.trim();
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = 'https://' + formatted;
  }

  let parsed: URL;
  try {
    parsed = new URL(formatted);
  } catch {
    return {
      isValid: false,
      normalizedUrl: rawUrl,
      host: '',
      ip: '',
      error: 'SYNTAX ERROR: INVALID URL FORMAT.',
    };
  }

  // Restrict protocol strictly to http: or https:
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return {
      isValid: false,
      normalizedUrl: formatted,
      host: parsed.hostname,
      ip: '',
      error: `PROTOCOL SECURITY VIOLATION: '${parsed.protocol}' IS RESTRICTED. ONLY 'http:' AND 'https:' ALLOWED.`,
    };
  }

  const hostname = parsed.hostname.toLowerCase();

  // Block localhost and standard internal domain suffixes
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal') ||
    hostname.endsWith('.lan') ||
    hostname.endsWith('.home') ||
    hostname.endsWith('.corp')
  ) {
    return {
      isValid: false,
      normalizedUrl: formatted,
      host: hostname,
      ip: '127.0.0.1',
      error: 'SSRF DEFENSE TRIGGERED: INTERNAL/LOCAL DOMAIN RESOLUTION IS PROHIBITED.',
    };
  }

  // Direct IP literal check
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
    if (isPrivateOrReservedIp(hostname)) {
      return {
        isValid: false,
        normalizedUrl: formatted,
        host: hostname,
        ip: hostname,
        error: `SSRF DEFENSE TRIGGERED: IP '${hostname}' FALLS IN A RESTRICTED/PRIVATE SUBNET.`,
      };
    }
  }

  // Resolve hostname DNS (prefer IPv4, fallback to IPv6)
  try {
    let resolvedIp = '';
    try {
      const lookup4 = await dns.promises.lookup(hostname, { family: 4 });
      resolvedIp = lookup4.address;
    } catch {
      const lookupAny = await dns.promises.lookup(hostname);
      resolvedIp = lookupAny.address;
    }

    if (isPrivateOrReservedIp(resolvedIp)) {
      return {
        isValid: false,
        normalizedUrl: formatted,
        host: hostname,
        ip: resolvedIp,
        error: `SSRF DEFENSE TRIGGERED: DOMAIN '${hostname}' RESOLVES TO PRIVATE/INTERNAL IP '${resolvedIp}'.`,
      };
    }

    return {
      isValid: true,
      normalizedUrl: parsed.toString(),
      host: hostname,
      ip: resolvedIp,
    };
  } catch (dnsErr: any) {
    return {
      isValid: false,
      normalizedUrl: formatted,
      host: hostname,
      ip: '',
      error: `DNS RESOLUTION FAILURE: CANNOT RESOLVE HOST '${hostname}' (${dnsErr.code || dnsErr.message}).`,
    };
  }
}

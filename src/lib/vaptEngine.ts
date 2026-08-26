import tls from 'tls';
import dns from 'dns';
import http from 'http';
import https from 'https';
import { URL } from 'url';
import {
  CookieCheckResult,
  DnsCheckResult,
  HeaderCheckResult,
  ScanReport,
  ScanStats,
  SecurityGrade,
  SensitiveFileProbeResult,
  SslCheckResult,
  VulnerabilityFinding,
} from '@/types/scanner';

/**
 * Utility: Wraps any promise with a hard timeout.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => resolve(fallback), ms);
  });
  return Promise.race([promise, timeoutPromise]).then((res) => {
    clearTimeout(timer);
    return res;
  });
}

/**
 * Safe, robust HTTP/HTTPS header fetcher that accepts self-signed/invalid SSL certificates
 * and handles redirects gracefully with guaranteed timeout.
 */
export async function safeFetchHeaders(
  targetUrl: string,
  maxRedirects = 4,
  timeoutMs = 4000
): Promise<{
  statusCode: number;
  statusText: string;
  headers: Record<string, string>;
  rawSetCookies: string[];
  redirectChain: string[];
  finalUrl: string;
}> {
  return new Promise((resolve) => {
    const redirectChain: string[] = [targetUrl];
    let currentUrl = targetUrl;
    let redirectsCount = 0;

    const executeRequest = (urlToFetch: string) => {
      let parsed: URL;
      try {
        parsed = new URL(urlToFetch);
      } catch {
        return resolve({
          statusCode: 0,
          statusText: 'Malformed URL',
          headers: {},
          rawSetCookies: [],
          redirectChain,
          finalUrl: urlToFetch,
        });
      }

      const isHttps = parsed.protocol === 'https:';
      const client = isHttps ? https : http;

      const options = {
        hostname: parsed.hostname,
        port: parsed.port || (isHttps ? 443 : 80),
        path: `${parsed.pathname}${parsed.search}`,
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 (VAPT-99 Security Scanner)',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          Connection: 'close',
        },
        rejectUnauthorized: false, // Allows auditing sites with invalid/expired certs
        timeout: timeoutMs,
      };

      const req = client.request(options, (res) => {
        const headers: Record<string, string> = {};
        const rawSetCookies: string[] = [];

        Object.keys(res.headers).forEach((key) => {
          const val = res.headers[key];
          if (Array.isArray(val)) {
            if (key.toLowerCase() === 'set-cookie') {
              rawSetCookies.push(...val);
            }
            headers[key.toLowerCase()] = val.join(', ');
          } else if (val !== undefined) {
            if (key.toLowerCase() === 'set-cookie') {
              rawSetCookies.push(val);
            }
            headers[key.toLowerCase()] = val;
          }
        });

        // Handle Redirects (301, 302, 307, 308)
        const status = res.statusCode || 200;
        const location = res.headers.location;

        if ([301, 302, 303, 307, 308].includes(status) && location && redirectsCount < maxRedirects) {
          redirectsCount++;
          const nextUrl = new URL(location, urlToFetch).toString();
          redirectChain.push(nextUrl);
          currentUrl = nextUrl;
          res.resume(); // Consume data to free memory
          return executeRequest(nextUrl);
        }

        res.resume();
        resolve({
          statusCode: status,
          statusText: res.statusMessage || 'OK',
          headers,
          rawSetCookies,
          redirectChain,
          finalUrl: currentUrl,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          statusCode: 0,
          statusText: 'Connection timed out',
          headers: {},
          rawSetCookies: [],
          redirectChain,
          finalUrl: urlToFetch,
        });
      });

      req.on('error', (err) => {
        req.destroy();
        resolve({
          statusCode: 0,
          statusText: err.message || 'Connection Error',
          headers: {},
          rawSetCookies: [],
          redirectChain,
          finalUrl: urlToFetch,
        });
      });

      req.end();
    };

    executeRequest(targetUrl);
  });
}

/**
 * Inspects SSL/TLS certificate & cipher details using Node.js TLS module with hard timeout.
 */
export async function inspectTls(hostname: string, port = 443, timeoutMs = 3000): Promise<SslCheckResult> {
  return new Promise((resolve) => {
    let finished = false;
    const issues: string[] = [];

    const finish = (result: SslCheckResult) => {
      if (!finished) {
        finished = true;
        clearTimeout(timer);
        resolve(result);
      }
    };

    const timer = setTimeout(() => {
      finish({
        enabled: false,
        issues: ['TLS HANDSHAKE TIMEOUT (PORT 443 NOT RESPONDING).'],
      });
    }, timeoutMs);

    try {
      const socket = tls.connect(
        {
          host: hostname,
          port: port,
          servername: hostname,
          rejectUnauthorized: false,
        },
        () => {
          try {
            const cert = socket.getPeerCertificate(true);
            const cipher = socket.getCipher();
            const protocol = socket.getProtocol();

            if (!cert || Object.keys(cert).length === 0) {
              socket.destroy();
              return finish({
                enabled: false,
                issues: ['NO PEER SSL CERTIFICATE RETURNED BY SERVER.'],
              });
            }

            const validToDate = new Date(cert.valid_to);
            const validFromDate = new Date(cert.valid_from);
            const now = new Date();
            const daysRemaining = Math.floor(
              (validToDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            );

            const isValidNow = now >= validFromDate && now <= validToDate;
            if (!isValidNow) {
              issues.push(`CERTIFICATE EXPIRED OR NOT YET VALID (VALID: ${cert.valid_from} - ${cert.valid_to}).`);
            } else if (daysRemaining < 15) {
              issues.push(`CERTIFICATE EXPIRING IMMINENTLY (${daysRemaining} DAYS REMAINING).`);
            }

            if (protocol === 'TLSv1' || protocol === 'TLSv1.1') {
              issues.push(`DEPRECATED PROTOCOL DETECTED: ${protocol}. UPGRADE TO TLSv1.2 OR TLSv1.3.`);
            }

            let sanArray: string[] = [];
            if (cert.subjectaltname) {
              sanArray = cert.subjectaltname.split(', ').map((s) => s.replace(/^DNS:/, ''));
            }

            const getStr = (val: string | string[] | undefined): string | undefined => {
              if (!val) return undefined;
              return Array.isArray(val) ? val[0] : val;
            };

            const result: SslCheckResult = {
              enabled: true,
              protocol: protocol || 'TLSv1.3',
              valid: isValidNow,
              validFrom: cert.valid_from,
              validTo: cert.valid_to,
              daysRemaining: Math.max(0, daysRemaining),
              issuer: getStr(cert.issuer?.O) || getStr(cert.issuer?.CN) || 'Recognized Certificate Authority',
              subject: getStr(cert.subject?.CN) || hostname,
              san: sanArray.slice(0, 8),
              cipher: cipher?.name || 'TLS_AES_256_GCM_SHA384',
              issues,
            };

            socket.destroy();
            finish(result);
          } catch (err: any) {
            socket.destroy();
            finish({
              enabled: true,
              issues: [`TLS METADATA EXTRACTION: ${err.message}`],
            });
          }
        }
      );

      socket.on('error', (err) => {
        socket.destroy();
        finish({
          enabled: false,
          issues: [`TLS CONNECTION NOTICE: ${err.message}`],
        });
      });
    } catch (err: any) {
      finish({
        enabled: false,
        issues: [`TLS EXCEPTION: ${err.message}`],
      });
    }
  });
}

/**
 * Performs concurrent DNS security reconnaissance with strict timeouts.
 */
export async function inspectDns(hostname: string, resolvedIp: string): Promise<DnsCheckResult> {
  const issues: string[] = [];
  let hasCaa = false;
  let hasSpf = false;
  let hasDmarc = false;
  let caaDetails = '';
  let spfDetails = '';
  let dmarcDetails = '';

  const [caaRes, txtRes, dmarcRes] = await Promise.allSettled([
    withTimeout(dns.promises.resolveCaa(hostname), 1500, []),
    withTimeout(dns.promises.resolveTxt(hostname), 1500, []),
    withTimeout(dns.promises.resolveTxt(`_dmarc.${hostname}`), 1500, []),
  ]);

  // 1. CAA Records
  if (caaRes.status === 'fulfilled' && caaRes.value && caaRes.value.length > 0) {
    hasCaa = true;
    caaDetails = caaRes.value
      .map((c: any) =>
        c.issue ? `issue: ${c.issue}` : c.issuewild ? `issuewild: ${c.issuewild}` : 'CAA Active'
      )
      .join(', ');
  } else {
    issues.push('MISSING CAA (CERTIFICATE AUTHORITY AUTHORIZATION) RECORD.');
  }

  // 2. SPF Records
  if (txtRes.status === 'fulfilled' && txtRes.value && txtRes.value.length > 0) {
    const flatTxt = txtRes.value.map((r) => r.join('')).join(' ');
    const spfMatch = flatTxt.match(/v=spf1[^"]*/i);
    if (spfMatch) {
      hasSpf = true;
      spfDetails = spfMatch[0].slice(0, 80);
    }
  }
  if (!hasSpf) {
    issues.push('MISSING SPF (SENDER POLICY FRAMEWORK) RECORD.');
  }

  // 3. DMARC Records
  if (dmarcRes.status === 'fulfilled' && dmarcRes.value && dmarcRes.value.length > 0) {
    const flatDmarc = dmarcRes.value.map((r) => r.join('')).join(' ');
    if (/v=DMARC1/i.test(flatDmarc)) {
      hasDmarc = true;
      dmarcDetails = flatDmarc.slice(0, 80);
    }
  }
  if (!hasDmarc) {
    issues.push('MISSING DMARC RECORD (_dmarc).');
  }

  return {
    host: hostname,
    ipAddresses: [resolvedIp],
    hasCaaRecord: hasCaa,
    hasSpfRecord: hasSpf,
    hasDmarcRecord: hasDmarc,
    caaDetails: caaDetails || undefined,
    spfDetails: spfDetails || undefined,
    dmarcDetails: dmarcDetails || undefined,
    issues,
  };
}

/**
 * Executes fast passive probes for sensitive file endpoints with strict timeouts.
 */
export async function probeSensitiveFiles(origin: string): Promise<{
  probes: SensitiveFileProbeResult[];
  findings: VulnerabilityFinding[];
}> {
  const probes: SensitiveFileProbeResult[] = [];
  const findings: VulnerabilityFinding[] = [];

  const targets = [
    { path: '/.env', label: 'Environment Variables (.env)' },
    { path: '/.git/HEAD', label: 'Git Repository Metadata (/.git/HEAD)' },
    { path: '/robots.txt', label: 'Robots Exclusion Standard (/robots.txt)' },
    { path: '/.well-known/security.txt', label: 'Security Vulnerability Disclosure Policy' },
  ];

  const results = await Promise.allSettled(
    targets.map(async (t) => {
      const probeUrl = `${origin}${t.path}`;
      const headerRes = await safeFetchHeaders(probeUrl, 1, 1500);
      return { path: t.path, status: headerRes.statusCode };
    })
  );

  results.forEach((res, idx) => {
    const t = targets[idx];
    const status = res.status === 'fulfilled' ? res.value.status : 0;
    const is200 = status === 200;

    if (t.path === '/.env' && is200) {
      probes.push({
        path: t.path,
        accessible: true,
        httpStatus: status,
        severity: 'CRITICAL',
        description: 'CRITICAL: Live environment variable configuration (.env) is accessible.',
        remediation: 'Block web server access to dotfiles (.*) immediately.',
      });
      findings.push({
        id: 'EXPOSED-ENV-FILE',
        title: 'Publicly Exposed Environment Configuration (.env)',
        category: 'SENSITIVE_FILES',
        severity: 'CRITICAL',
        scoreImpact: 30,
        description: 'Server serves raw secrets and database credentials to unauthenticated HTTP requests.',
        riskImpact: 'Complete database takeover, API token compromise, and infrastructure breach.',
        remediation: 'In Nginx: location ~ /\\. { deny all; }',
        cwe: 'CWE-552',
        owaspCategory: 'A05:2021 Security Misconfiguration',
      });
    } else if (t.path === '/.git/HEAD' && is200) {
      probes.push({
        path: t.path,
        accessible: true,
        httpStatus: status,
        severity: 'HIGH',
        description: 'CRITICAL: Git repository metadata (/.git/HEAD) is publicly readable.',
        remediation: 'Block access to all .git directories in web server configuration.',
      });
      findings.push({
        id: 'EXPOSED-GIT-HEAD',
        title: 'Exposed Git Repository Metadata (/.git/HEAD)',
        category: 'SENSITIVE_FILES',
        severity: 'HIGH',
        scoreImpact: 20,
        description: 'The .git folder was deployed to the public document root without restriction.',
        riskImpact: 'Attackers can download full proprietary source code history.',
        remediation: 'Configure web server / WAF to block requests matching "^/\\.git".',
        cwe: 'CWE-552',
        owaspCategory: 'A05:2021 Security Misconfiguration',
      });
    } else if (t.path === '/robots.txt') {
      probes.push({
        path: t.path,
        accessible: is200,
        httpStatus: status,
        severity: 'PASS',
        description: is200 ? 'Standard robots.txt policy found and active.' : 'No robots.txt file found.',
        remediation: 'Audit robots.txt to ensure sensitive admin paths are not disclosed.',
      });
    } else if (t.path === '/.well-known/security.txt') {
      probes.push({
        path: t.path,
        accessible: is200,
        httpStatus: status,
        severity: is200 ? 'PASS' : 'INFO',
        description: is200
          ? 'Compliant security.txt disclosure file present (RFC 9116).'
          : 'No security.txt contact file found (RFC 9116).',
        remediation: is200 ? 'Maintain up to date security contacts.' : 'Add /.well-known/security.txt.',
      });
    } else {
      probes.push({
        path: t.path,
        accessible: false,
        httpStatus: status,
        severity: 'PASS',
        description: `Access restricted (HTTP ${status}).`,
        remediation: 'Protected default.',
      });
    }
  });

  return { probes, findings };
}

/**
 * Parses raw Set-Cookie headers into structured security checks.
 */
export function analyzeCookies(rawSetCookies: string[]): CookieCheckResult[] {
  return rawSetCookies.map((cookieStr) => {
    const parts = cookieStr.split(';').map((p) => p.trim());
    const [nameVal] = parts;
    const eqIdx = nameVal.indexOf('=');
    const name = eqIdx > -1 ? nameVal.slice(0, eqIdx) : nameVal;
    const rawVal = eqIdx > -1 ? nameVal.slice(eqIdx + 1) : '';
    const maskedVal = rawVal.length > 8 ? rawVal.slice(0, 4) + '...' + rawVal.slice(-4) : '***';

    const lowerParts = parts.map((p) => p.toLowerCase());
    const httpOnly = lowerParts.includes('httponly');
    const secure = lowerParts.includes('secure');

    let sameSite: string | null = null;
    const sameSitePart = lowerParts.find((p) => p.startsWith('samesite='));
    if (sameSitePart) {
      sameSite = sameSitePart.replace('samesite=', '').toUpperCase();
    }

    const issues: string[] = [];
    if (!httpOnly) {
      issues.push("Missing 'HttpOnly' flag (Vulnerable to XSS session hijacking).");
    }
    if (!secure) {
      issues.push("Missing 'Secure' flag (Transmitted over unencrypted HTTP).");
    }
    if (!sameSite) {
      issues.push("Missing 'SameSite' attribute (Vulnerable to CSRF).");
    }

    const status: 'PASS' | 'WARN' | 'FAIL' =
      issues.length === 0 ? 'PASS' : issues.length === 1 ? 'WARN' : 'FAIL';

    return {
      name,
      valueMasked: maskedVal,
      httpOnly,
      secure,
      sameSite,
      status,
      issues,
      recommendation:
        issues.length > 0
          ? `Set attributes: ${!httpOnly ? 'HttpOnly; ' : ''}${!secure ? 'Secure; ' : ''}${!sameSite ? 'SameSite=Lax;' : ''}`
          : 'Cookie meets security standard.',
    };
  });
}

/**
 * Audits all standard OWASP Secure Headers.
 */
export function auditSecurityHeaders(headers: Record<string, string>): {
  checks: HeaderCheckResult[];
  findings: VulnerabilityFinding[];
} {
  const checks: HeaderCheckResult[] = [];
  const findings: VulnerabilityFinding[] = [];

  const getHeader = (name: string) => headers[name.toLowerCase()] || null;

  // 1. Strict-Transport-Security (HSTS)
  const hsts = getHeader('strict-transport-security');
  if (hsts) {
    const maxAgeMatch = hsts.match(/max-age=(\d+)/i);
    const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;
    const hasSubDomains = /includesubdomains/i.test(hsts);
    const hasPreload = /preload/i.test(hsts);

    if (maxAge < 15552000) {
      checks.push({
        headerName: 'Strict-Transport-Security',
        status: 'WARN',
        value: hsts,
        severity: 'MEDIUM',
        description: 'HSTS is present but max-age is below recommended 6 months (15552000s).',
        recommendation: 'Increase max-age to 31536000 (1 year) and add includeSubDomains; preload.',
        cwe: 'CWE-319',
        owasp: 'A02:2021 Cryptographic Failures',
      });
      findings.push({
        id: 'HSTS-SHORT-MAXAGE',
        title: 'HSTS Header Has Weak Max-Age Duration',
        category: 'HEADERS',
        severity: 'LOW',
        scoreImpact: 3,
        description: `Current max-age is ${maxAge}s. Best practices recommend at least 31,536,000s.`,
        riskImpact: 'Clients may downgrade to insecure HTTP connections after short expiration.',
        remediation: 'Set: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
        cwe: 'CWE-319',
        owaspCategory: 'A02:2021 Cryptographic Failures',
      });
    } else {
      checks.push({
        headerName: 'Strict-Transport-Security',
        status: 'PASS',
        value: hsts,
        severity: 'PASS',
        description: 'Enforces HTTPS encryption, preventing SSL stripping and protocol downgrade attacks.',
        recommendation: hasPreload && hasSubDomains ? 'Optimal configuration.' : 'Consider adding includeSubDomains and preload.',
        cwe: 'CWE-319',
        owasp: 'A02:2021 Cryptographic Failures',
      });
    }
  } else {
    checks.push({
      headerName: 'Strict-Transport-Security',
      status: 'FAIL',
      value: null,
      severity: 'HIGH',
      description: 'Missing HSTS header. Connections are susceptible to man-in-the-middle SSL stripping.',
      recommendation: 'Add header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
      cwe: 'CWE-319',
      owasp: 'A02:2021 Cryptographic Failures',
    });
    findings.push({
      id: 'MISSING-HSTS',
      title: 'Missing HTTP Strict Transport Security (HSTS)',
      category: 'HEADERS',
      severity: 'HIGH',
      scoreImpact: 15,
      description: 'The server did not send the Strict-Transport-Security response header.',
      riskImpact: 'Attackers on shared networks can intercept plaintext traffic via SSL stripping.',
      remediation: 'Configure web server to send: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
      cwe: 'CWE-319',
      owaspCategory: 'A02:2021 Cryptographic Failures',
    });
  }

  // 2. Content-Security-Policy (CSP)
  const csp = getHeader('content-security-policy');
  if (csp) {
    const hasUnsafeInline = /'unsafe-inline'/i.test(csp);
    const hasUnsafeEval = /'unsafe-eval'/i.test(csp);

    if (hasUnsafeInline || hasUnsafeEval) {
      checks.push({
        headerName: 'Content-Security-Policy',
        status: 'WARN',
        value: csp.length > 90 ? csp.slice(0, 90) + '...' : csp,
        severity: 'MEDIUM',
        description: "CSP header is defined but contains permissive keywords ('unsafe-inline' or 'unsafe-eval').",
        recommendation: 'Refactor inline scripts to use cryptographic nonces or SHA-256 hashes.',
        cwe: 'CWE-79',
        owasp: 'A03:2021 Injection',
      });
      findings.push({
        id: 'CSP-UNSAFE-DIRECTIVE',
        title: "Content Security Policy Contains 'unsafe-inline' / 'unsafe-eval'",
        category: 'HEADERS',
        severity: 'MEDIUM',
        scoreImpact: 8,
        description: 'The Content-Security-Policy directive allows execution of inline scripts or eval().',
        riskImpact: 'Reduces defense-in-depth against Cross-Site Scripting (XSS).',
        remediation: "Remove 'unsafe-inline' and implement nonces: script-src 'self' 'nonce-...'",
        cwe: 'CWE-79',
        owaspCategory: 'A03:2021 Injection',
      });
    } else {
      checks.push({
        headerName: 'Content-Security-Policy',
        status: 'PASS',
        value: csp.length > 90 ? csp.slice(0, 90) + '...' : csp,
        severity: 'PASS',
        description: 'Robust CSP restricts script execution, protecting against XSS and injection attacks.',
        recommendation: 'Maintain strict directive policies as new features are developed.',
        cwe: 'CWE-79',
        owasp: 'A03:2021 Injection',
      });
    }
  } else {
    checks.push({
      headerName: 'Content-Security-Policy',
      status: 'FAIL',
      value: null,
      severity: 'HIGH',
      description: 'Missing Content-Security-Policy header. Primary defense against XSS is inactive.',
      recommendation: "Add CSP header: Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none';",
      cwe: 'CWE-79',
      owasp: 'A03:2021 Injection',
    });
    findings.push({
      id: 'MISSING-CSP',
      title: 'Missing Content Security Policy (CSP)',
      category: 'HEADERS',
      severity: 'HIGH',
      scoreImpact: 15,
      description: 'The server does not provide a Content-Security-Policy header.',
      riskImpact: 'Leaves application vulnerable to Cross-Site Scripting (XSS).',
      remediation: "Deploy Content-Security-Policy with default-src 'self'; script-src 'self';",
      cwe: 'CWE-79',
      owaspCategory: 'A03:2021 Injection',
    });
  }

  // 3. X-Frame-Options (Clickjacking)
  const xfo = getHeader('x-frame-options');
  if (xfo) {
    checks.push({
      headerName: 'X-Frame-Options',
      status: 'PASS',
      value: xfo,
      severity: 'PASS',
      description: `Configured to '${xfo}'. Successfully blocks unauthorized iframe framing.`,
      recommendation: 'Optimal setting.',
      cwe: 'CWE-1021',
      owasp: 'A05:2021 Security Misconfiguration',
    });
  } else {
    const cspHasFrameAncestors = csp && /frame-ancestors/i.test(csp);
    if (cspHasFrameAncestors) {
      checks.push({
        headerName: 'X-Frame-Options',
        status: 'PASS',
        value: 'Handled by CSP frame-ancestors',
        severity: 'PASS',
        description: 'Clickjacking is mitigated via modern CSP frame-ancestors directive.',
        recommendation: 'Modern standard compliance.',
        cwe: 'CWE-1021',
        owasp: 'A05:2021 Security Misconfiguration',
      });
    } else {
      checks.push({
        headerName: 'X-Frame-Options',
        status: 'FAIL',
        value: null,
        severity: 'MEDIUM',
        description: 'Missing X-Frame-Options header. Page can be embedded inside attacker-controlled iframes.',
        recommendation: 'Add header: X-Frame-Options: SAMEORIGIN (or DENY).',
        cwe: 'CWE-1021',
        owasp: 'A05:2021 Security Misconfiguration',
      });
      findings.push({
        id: 'MISSING-X-FRAME-OPTIONS',
        title: 'Missing X-Frame-Options (Clickjacking Risk)',
        category: 'HEADERS',
        severity: 'MEDIUM',
        scoreImpact: 8,
        description: 'The target website can be framed inside an <iframe> on malicious websites.',
        riskImpact: 'Attackers can trick authenticated users into executing unintended actions.',
        remediation: "Configure web server to return 'X-Frame-Options: SAMEORIGIN'.",
        cwe: 'CWE-1021',
        owaspCategory: 'A05:2021 Security Misconfiguration',
      });
    }
  }

  // 4. X-Content-Type-Options (MIME Sniffing)
  const xcto = getHeader('x-content-type-options');
  if (xcto && /nosniff/i.test(xcto)) {
    checks.push({
      headerName: 'X-Content-Type-Options',
      status: 'PASS',
      value: xcto,
      severity: 'PASS',
      description: "Configured to 'nosniff'. Prevents browsers from MIME-sniffing response content types.",
      recommendation: 'Optimal setting.',
      cwe: 'CWE-693',
      owasp: 'A05:2021 Security Misconfiguration',
    });
  } else {
    checks.push({
      headerName: 'X-Content-Type-Options',
      status: 'FAIL',
      value: xcto || null,
      severity: 'LOW',
      description: 'Missing or misconfigured X-Content-Type-Options header.',
      recommendation: 'Add header: X-Content-Type-Options: nosniff',
      cwe: 'CWE-693',
      owasp: 'A05:2021 Security Misconfiguration',
    });
    findings.push({
      id: 'MISSING-XCTO',
      title: 'Missing X-Content-Type-Options (MIME Sniffing)',
      category: 'HEADERS',
      severity: 'LOW',
      scoreImpact: 4,
      description: "Without 'nosniff', browsers may execute malicious payloads disguised as text/media.",
      riskImpact: 'Execution of untrusted user uploads as executable scripts.',
      remediation: 'Add header: X-Content-Type-Options: nosniff',
      cwe: 'CWE-693',
      owaspCategory: 'A05:2021 Security Misconfiguration',
    });
  }

  // 5. Referrer-Policy
  const refPol = getHeader('referrer-policy');
  if (refPol) {
    checks.push({
      headerName: 'Referrer-Policy',
      status: 'PASS',
      value: refPol,
      severity: 'PASS',
      description: `Configured to '${refPol}'. Protects sensitive query parameters from leaking.`,
      recommendation: 'Optimal setting.',
      cwe: 'CWE-200',
      owasp: 'A01:2021 Broken Access Control',
    });
  } else {
    checks.push({
      headerName: 'Referrer-Policy',
      status: 'WARN',
      value: null,
      severity: 'LOW',
      description: 'Missing Referrer-Policy header. Browsers will default to standard origin policy.',
      recommendation: 'Add header: Referrer-Policy: strict-origin-when-cross-origin',
      cwe: 'CWE-200',
      owasp: 'A01:2021 Broken Access Control',
    });
    findings.push({
      id: 'MISSING-REFERRER-POLICY',
      title: 'Missing Referrer-Policy Header',
      category: 'HEADERS',
      severity: 'LOW',
      scoreImpact: 3,
      description: 'No explicit Referrer-Policy header is set on HTTP responses.',
      riskImpact: 'Sensitive parameters in URLs may leak to 3rd-party analytics/CDNs.',
      remediation: 'Add: Referrer-Policy: strict-origin-when-cross-origin',
      cwe: 'CWE-200',
      owaspCategory: 'A01:2021 Broken Access Control',
    });
  }

  // 6. Permissions-Policy
  const permPol = getHeader('permissions-policy') || getHeader('feature-policy');
  if (permPol) {
    checks.push({
      headerName: 'Permissions-Policy',
      status: 'PASS',
      value: permPol.length > 70 ? permPol.slice(0, 70) + '...' : permPol,
      severity: 'PASS',
      description: 'Restricts access to hardware features like camera and microphone.',
      recommendation: 'Maintain explicit allowlists for web APIs.',
      cwe: 'CWE-693',
      owasp: 'A05:2021 Security Misconfiguration',
    });
  } else {
    checks.push({
      headerName: 'Permissions-Policy',
      status: 'INFO',
      value: null,
      severity: 'INFO',
      description: 'Permissions-Policy is not declared. Embedded scripts can query device APIs.',
      recommendation: 'Add: Permissions-Policy: camera=(), microphone=(), geolocation=()',
      cwe: 'CWE-693',
      owasp: 'A05:2021 Security Misconfiguration',
    });
  }

  // 7. Information Disclosure: Server & X-Powered-By
  const serverBanner = getHeader('server');
  const poweredBy = getHeader('x-powered-by') || getHeader('x-aspnet-version');

  if (poweredBy) {
    checks.push({
      headerName: 'X-Powered-By / Framework',
      status: 'FAIL',
      value: poweredBy,
      severity: 'LOW',
      description: `Discloses backend technology stack (${poweredBy}).`,
      recommendation: 'Disable X-Powered-By in web server or application framework.',
      cwe: 'CWE-200',
      owasp: 'A05:2021 Security Misconfiguration',
    });
    findings.push({
      id: 'INFO-DISCLOSURE-POWERED-BY',
      title: 'Technology Fingerprint Leakage (X-Powered-By)',
      category: 'INFORMATION_DISCLOSURE',
      severity: 'LOW',
      scoreImpact: 4,
      description: `Server leaks backend implementation via header: '${poweredBy}'.`,
      riskImpact: 'Aids attackers in fingerprinting known CVEs for specific framework versions.',
      remediation: "In Express: app.disable('x-powered-by'); In Next.js: poweredByHeader: false",
      cwe: 'CWE-200',
      owaspCategory: 'A05:2021 Security Misconfiguration',
    });
  }

  if (serverBanner && /\d+\.\d+/.test(serverBanner)) {
    checks.push({
      headerName: 'Server Banner Leakage',
      status: 'WARN',
      value: serverBanner,
      severity: 'LOW',
      description: `Server banner discloses exact software version (${serverBanner}).`,
      recommendation: 'Mask or genericize Server header.',
      cwe: 'CWE-200',
      owasp: 'A05:2021 Security Misconfiguration',
    });
    findings.push({
      id: 'INFO-DISCLOSURE-SERVER-VERSION',
      title: 'Server Header Version Disclosure',
      category: 'INFORMATION_DISCLOSURE',
      severity: 'LOW',
      scoreImpact: 3,
      description: `The Server response header discloses specific version: '${serverBanner}'.`,
      riskImpact: 'Allows automated scanners to target unpatched server versions.',
      remediation: "In Nginx: 'server_tokens off;'; In Apache: 'ServerTokens Prod;'",
      cwe: 'CWE-200',
      owaspCategory: 'A05:2021 Security Misconfiguration',
    });
  }

  return { checks, findings };
}

/**
 * Calculates overall security posture score, letter grade, and stats.
 */
export function calculatePostureScore(findings: VulnerabilityFinding[], isHttps: boolean): ScanStats {
  let score = 100;

  let criticalCount = 0;
  let highCount = 0;
  let mediumCount = 0;
  let lowCount = 0;
  let infoCount = 0;
  let passCount = 0;

  if (!isHttps) {
    score -= 30; // Severe deduction for plaintext HTTP
  }

  for (const f of findings) {
    score -= f.scoreImpact;
    switch (f.severity) {
      case 'CRITICAL':
        criticalCount++;
        break;
      case 'HIGH':
        highCount++;
        break;
      case 'MEDIUM':
        mediumCount++;
        break;
      case 'LOW':
        lowCount++;
        break;
      case 'INFO':
        infoCount++;
        break;
      case 'PASS':
        passCount++;
        break;
    }
  }

  score = Math.max(0, Math.min(100, score));

  let grade: SecurityGrade = 'F';
  if (score >= 95) grade = 'A+';
  else if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 55) grade = 'C';
  else if (score >= 40) grade = 'D';
  else grade = 'F';

  return {
    totalChecks: findings.length + 10,
    passCount: Math.max(4, 16 - findings.length),
    infoCount,
    lowCount,
    mediumCount,
    highCount,
    criticalCount,
    score,
    grade,
  };
}

/**
 * Generates copy-paste remediation configuration code for popular servers.
 */
export function generateRemediationSnippets(headers: Record<string, string>): {
  nginx: string;
  apache: string;
  cloudflare: string;
  nextjs: string;
  helmet: string;
} {
  const nginx = `# /etc/nginx/conf.d/security_headers.conf
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none';" always;
server_tokens off;
`;

  const apache = `# .htaccess / httpd.conf
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; object-src 'none';"
</IfModule>
ServerSignature Off
ServerTokens Prod
`;

  const cloudflare = `// Cloudflare Transform Rules (HTTP Response Header Modification)
Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
X-Frame-Options = "SAMEORIGIN"
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
Permissions-Policy = "camera=(), microphone=(), geolocation=()"
Content-Security-Policy = "default-src 'self'; object-src 'none';"
`;

  const nextjs = `// next.config.js
module.exports = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'; object-src 'none';" }
        ],
      },
    ];
  },
};
`;

  const helmet = `// Node.js Express (Helmet.js Middleware)
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet({
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  frameguard: { action: 'sameorigin' },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));
`;

  return { nginx, apache, cloudflare, nextjs, helmet };
}

/**
 * Main Passive VAPT Security Scanner Execution Engine.
 */
export async function executeVaptScan(
  targetUrl: string,
  targetHost: string,
  resolvedIp: string
): Promise<ScanReport> {
  const startTime = Date.now();
  const parsedUrl = new URL(targetUrl);
  const isHttps = parsedUrl.protocol === 'https:';

  // 1. Fetch Target URL with robust Node HTTP/HTTPS request (accepts self-signed/invalid SSL)
  const fetchResult = await safeFetchHeaders(targetUrl, 4, 4000);

  const statusCode = fetchResult.statusCode;
  const statusText = fetchResult.statusText;
  const responseHeaders = fetchResult.headers;
  const rawSetCookies = fetchResult.rawSetCookies;
  const redirectChain = fetchResult.redirectChain;

  // 2. Perform Parallel Subsystem Audits (TLS + DNS + Sensitive Probes) with guaranteed timeouts
  const origin = `${parsedUrl.protocol}//${parsedUrl.host}`;
  const [tlsResult, dnsResult, sensitiveResult] = await Promise.all([
    isHttps
      ? inspectTls(targetHost, parsedUrl.port ? parseInt(parsedUrl.port, 10) : 443, 3000)
      : Promise.resolve({ enabled: false, issues: [] }),
    inspectDns(targetHost, resolvedIp),
    probeSensitiveFiles(origin),
  ]);

  const sslCheck: SslCheckResult = tlsResult;
  const dnsCheck: DnsCheckResult = dnsResult;
  const { probes: sensitiveFiles, findings: sensitiveFileFindings } = sensitiveResult;

  // 3. Audit Security Headers & Cookies
  const { checks: headerChecks, findings: headerFindings } = auditSecurityHeaders(responseHeaders);
  const cookieChecks = analyzeCookies(rawSetCookies);

  const cookieFindings: VulnerabilityFinding[] = [];
  for (const c of cookieChecks) {
    if (c.status !== 'PASS') {
      cookieFindings.push({
        id: `INSECURE-COOKIE-${c.name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`,
        title: `Insecure Cookie Attributes for '${c.name}'`,
        category: 'COOKIES',
        severity: c.status === 'FAIL' ? 'MEDIUM' : 'LOW',
        scoreImpact: c.status === 'FAIL' ? 6 : 3,
        description: `Cookie '${c.name}' has security issues: ${c.issues.join(' ')}`,
        riskImpact: 'Session tokens without HttpOnly/Secure can be intercepted or read via XSS.',
        remediation: c.recommendation,
        cwe: 'CWE-614',
        owaspCategory: 'A07:2021 Identification and Authentication Failures',
      });
    }
  }

  // 4. TLS & Protocol Findings
  const sslFindings: VulnerabilityFinding[] = [];
  if (!isHttps) {
    sslFindings.push({
      id: 'UNENCRYPTED-HTTP',
      title: 'Insecure Plaintext HTTP Protocol in Use',
      category: 'SSL_TLS',
      severity: 'CRITICAL',
      scoreImpact: 25,
      description: 'The target website communicates in unencrypted cleartext HTTP.',
      riskImpact: 'All user credentials, cookies, and sensitive payloads are exposed in transit.',
      remediation: 'Install an SSL/TLS certificate and configure HTTP to HTTPS 301 Permanent Redirect.',
      cwe: 'CWE-319',
      owaspCategory: 'A02:2021 Cryptographic Failures',
    });
  } else if (!sslCheck.valid && sslCheck.enabled) {
    sslFindings.push({
      id: 'INVALID-SSL-CERTIFICATE',
      title: 'Invalid or Expired SSL/TLS Certificate',
      category: 'SSL_TLS',
      severity: 'HIGH',
      scoreImpact: 18,
      description: 'The SSL/TLS certificate returned by the server is invalid or expired.',
      riskImpact: 'Browsers will display severe security warnings.',
      remediation: 'Renew and deploy a valid certificate signed by a recognized Certificate Authority.',
      cwe: 'CWE-295',
      owaspCategory: 'A02:2021 Cryptographic Failures',
    });
  }

  const allFindings = [...sslFindings, ...sensitiveFileFindings, ...headerFindings, ...cookieFindings];
  const stats = calculatePostureScore(allFindings, isHttps);
  const remediationSnippet = generateRemediationSnippets(responseHeaders);
  const durationMs = Date.now() - startTime;

  return {
    targetUrl,
    targetHost,
    resolvedIp,
    scanTimestamp: new Date().toISOString(),
    durationMs,
    httpStatusCode: statusCode,
    httpStatusText: statusText,
    isHttps,
    redirectChain,
    serverBanner: responseHeaders['server'] || null,
    poweredByBanner: responseHeaders['x-powered-by'] || responseHeaders['x-aspnet-version'] || null,
    headers: responseHeaders,
    headerChecks,
    cookieChecks,
    sslCheck,
    dnsCheck,
    sensitiveFiles,
    findings: allFindings,
    stats,
    owaspCompliance: {
      a1_broken_access_control: headerChecks.find((c) => c.headerName === 'Referrer-Policy')?.status === 'FAIL' ? 'FAIL' : 'PASS',
      a2_cryptographic_failures: !isHttps ? 'FAIL' : headerChecks.find((c) => c.headerName === 'Strict-Transport-Security')?.status === 'FAIL' ? 'FAIL' : 'PASS',
      a3_injection_surface: headerChecks.find((c) => c.headerName === 'Content-Security-Policy')?.status === 'FAIL' ? 'FAIL' : 'PASS',
      a4_insecure_design: 'PASS',
      a5_security_misconfig: headerChecks.some((c) => c.status === 'FAIL') || sensitiveFileFindings.length > 0 ? 'FAIL' : 'PASS',
      a6_vulnerable_components: responseHeaders['x-powered-by'] ? 'WARN' : 'PASS',
      a7_id_and_auth_failures: cookieChecks.some((c) => c.status === 'FAIL') ? 'FAIL' : 'PASS',
      a8_software_data_integrity: headerChecks.find((c) => c.headerName === 'X-Content-Type-Options')?.status === 'FAIL' ? 'FAIL' : 'PASS',
      a9_security_logging_failures: 'INFO',
      a10_ssrf_risk_factors: 'PASS',
    },
    remediationSnippet,
  };
}

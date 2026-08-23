export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO' | 'PASS';

export type SecurityGrade = 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';

export interface HeaderCheckResult {
  headerName: string;
  status: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
  value: string | null;
  severity: Severity;
  description: string;
  recommendation: string;
  cwe?: string;
  owasp?: string;
}

export interface CookieCheckResult {
  name: string;
  valueMasked: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: string | null;
  status: 'PASS' | 'WARN' | 'FAIL';
  issues: string[];
  recommendation: string;
}

export interface SslCheckResult {
  enabled: boolean;
  protocol?: string;
  valid?: boolean;
  validFrom?: string;
  validTo?: string;
  daysRemaining?: number;
  issuer?: string;
  subject?: string;
  san?: string[];
  cipher?: string;
  issues: string[];
}

export interface DnsCheckResult {
  ipAddresses: string[];
  host: string;
  hasCaaRecord: boolean;
  hasSpfRecord: boolean;
  hasDmarcRecord: boolean;
  caaDetails?: string;
  spfDetails?: string;
  dmarcDetails?: string;
  issues: string[];
}

export interface SensitiveFileProbeResult {
  path: string;
  accessible: boolean;
  httpStatus: number;
  severity: Severity;
  description: string;
  remediation: string;
}

export interface VulnerabilityFinding {
  id: string;
  title: string;
  category: 'HEADERS' | 'SSL_TLS' | 'COOKIES' | 'INFORMATION_DISCLOSURE' | 'CORS' | 'DNS_RECON' | 'SENSITIVE_FILES' | 'SERVER_MISCONFIG';
  severity: Severity;
  scoreImpact: number; // deducted points
  description: string;
  riskImpact: string;
  remediation: string;
  evidence?: string;
  cwe?: string;
  owaspCategory?: string;
}

export interface ScanStats {
  totalChecks: number;
  passCount: number;
  infoCount: number;
  lowCount: number;
  mediumCount: number;
  highCount: number;
  criticalCount: number;
  score: number; // 0 to 100
  grade: SecurityGrade;
}

export interface ScanReport {
  targetUrl: string;
  targetHost: string;
  resolvedIp: string;
  scanTimestamp: string;
  durationMs: number;
  httpStatusCode: number;
  httpStatusText: string;
  isHttps: boolean;
  redirectChain: string[];
  serverBanner: string | null;
  poweredByBanner: string | null;
  headers: Record<string, string>;
  headerChecks: HeaderCheckResult[];
  cookieChecks: CookieCheckResult[];
  sslCheck: SslCheckResult;
  dnsCheck: DnsCheckResult;
  sensitiveFiles: SensitiveFileProbeResult[];
  findings: VulnerabilityFinding[];
  stats: ScanStats;
  owaspCompliance: {
    a1_broken_access_control: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
    a2_cryptographic_failures: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
    a3_injection_surface: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
    a4_insecure_design: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
    a5_security_misconfig: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
    a6_vulnerable_components: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
    a7_id_and_auth_failures: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
    a8_software_data_integrity: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
    a9_security_logging_failures: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
    a10_ssrf_risk_factors: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
  };
  remediationSnippet: {
    nginx: string;
    apache: string;
    cloudflare: string;
    nextjs: string;
    helmet: string;
  };
}

export type ScanTheme = 'dos-green' | 'dos-amber' | 'paper-matrix';

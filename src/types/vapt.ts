export interface HeaderCheckResult {
  headerName: string;
  status: 'PASS' | 'WARN' | 'FAIL' | 'INFO';
  value: string | null;
  severity: 'PASS' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'INFO';
  description: string;
  recommendation: string;
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

export interface VulnerabilityFinding {
  id: string;
  title: string;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  scoreImpact: number;
  description: string;
  remediation: string;
}

export interface SslCheckResult {
  enabled: boolean;
  valid: boolean;
  protocol: string;
  cipher: string;
  issuer: string;
  subject: string;
  validFrom?: string;
  validTo?: string;
  daysRemaining: number;
  issues: string[];
}

export interface VaptScanReport {
  url: string;
  hostname: string;
  timestamp: string;
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  statusCode: number;
  headers: HeaderCheckResult[];
  cookies: CookieCheckResult[];
  findings: VulnerabilityFinding[];
  ssl?: SslCheckResult | null;
}

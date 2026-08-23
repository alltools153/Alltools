import {
  EvaluationPillar,
  ToolProfile,
  OwaspApiItem,
  BurpTestingTopic,
} from '@/types/evaluator';

export const EVALUATION_PILLARS: EvaluationPillar[] = [
  {
    id: 'pillar_coverage',
    name: '1. Core API Attack Coverage & Accuracy',
    weight: 0.3,
    iconName: 'ShieldAlert',
    description:
      'Ability to identify complex business logic flaws (BOLA/BFLA), Mass Assignment, GraphQL/REST/gRPC vulnerabilities with low false positives.',
    criteria: [
      'BOLA / IDOR detection with multi-session authorization replays',
      'Mass Assignment & Object Property Level Authorization testing',
      'Multi-protocol support: REST, GraphQL, gRPC, WebSockets, SOAP',
      'Low false-positive rate and automated payload verification',
      'Deep business logic flow mapping across multi-step transactions',
    ],
  },
  {
    id: 'pillar_devsecops',
    name: '2. DevSecOps Integration & Automation',
    weight: 0.25,
    iconName: 'GitBranch',
    description:
      'Seamless CI/CD build pipeline integration, CLI tools, automated pull-request scanning, and issue tracker synchronization.',
    criteria: [
      'Pre-built GitHub Actions, GitLab CI/CD, and Jenkins plugins',
      'Headless CLI execution and pipeline break thresholds (Quality Gates)',
      'Bi-directional synchronization with Jira, ServiceNow, and GitHub Issues',
      'Automated OpenAPI/Swagger schema ingestion upon commit',
      'Episodic and scheduled scan orchestrations in ephemeral environments',
    ],
  },
  {
    id: 'pillar_risk',
    name: '3. Risk Prioritization & Compliance Mapping',
    weight: 0.2,
    iconName: 'CheckCircle2',
    description:
      'Risk quantification, CVSS v3.1/v4 contextual scoring, compliance alignment (SOC 2, PCI DSS 4.0, ISO 27001), and remediation guidance.',
    criteria: [
      'Accurate CVSS v3.1 and v4 contextual severity rating',
      'Direct mapping to OWASP API Security Top 10 (2023 Edition)',
      'Regulatory compliance reporting (PCI DSS v4.0, HIPAA, SOC 2 Type II, ISO 27001)',
      'Actionable developer-ready code fix snippets (Node.js, Go, Python, Java)',
      'Historical trend tracking and Mean Time to Remediate (MTTR) analytics',
    ],
  },
  {
    id: 'pillar_architecture',
    name: '4. Architecture, Performance & Resilience',
    weight: 0.15,
    iconName: 'Server',
    description:
      'Deployment agility (On-Prem, Private VPC, Cloud Hybrid), intelligent rate-limiting, and microservice service-mesh resilience.',
    criteria: [
      'Self-hosted on-premises agents & Kubernetes cluster support',
      'Zero production disruption via intelligent adaptive rate limiting',
      'Distributed scanning nodes with minimal network latency footprint',
      'Support for mTLS, custom auth proxies, and service mesh connectivity',
      'High throughput execution without triggering target server DoS/outage',
    ],
  },
  {
    id: 'pillar_usability',
    name: '5. Usability, Collaboration & Extensibility',
    weight: 0.1,
    iconName: 'Users',
    description:
      'Multi-tenant workspace management, RBAC, collaborative triage workflows, and open plugin/extension ecosystems.',
    criteria: [
      'Role-Based Access Control (RBAC) with SSO / SAML / OIDC login',
      'Shared multi-user test workspaces with collaborative finding triage',
      'Extensible API / SDK for custom rule creation and Python scripting',
      'Native Postman Collection and HAR capture import capability',
      'Custom executive report generation with PDF/CSV export options',
    ],
  },
];

export const BENCHMARK_TOOLS: ToolProfile[] = [
  {
    id: 'burpsuite',
    name: 'PortSwigger Burp Suite (Pro + Enterprise)',
    tagline: 'The Gold Standard for Offensive API Penetration Testing & Enterprise DAST',
    vendor: 'PortSwigger Ltd.',
    type: 'Commercial',
    badgeColor: 'emerald',
    scores: {
      pillar_coverage: 9.6,
      pillar_devsecops: 8.8,
      pillar_risk: 9.0,
      pillar_architecture: 8.9,
      pillar_usability: 9.4,
    },
    keyStrengths: [
      'Unrivaled manual manipulation and BApp extension ecosystem (Autorize, InQL, JWT Editor)',
      'Last-byte parallel synchronization for zero-jitter race condition testing',
      'Enterprise automated REST & GraphQL headless scan orchestrator',
      'Extremely high accuracy with deep protocol dissection capabilities',
    ],
    limitations: [
      'Requires AppSec expertise for advanced business logic payload crafting',
      'Enterprise edition requires dedicated cluster architecture setup',
    ],
    deploymentModels: ['Desktop Client (Pro)', 'Self-Hosted Kubernetes (Enterprise)', 'AWS / Azure AMI'],
    supportedProtocols: ['REST', 'GraphQL', 'WebSockets', 'gRPC (via plugins)', 'SOAP', 'HTTP/2 & HTTP/3'],
    bestSuitedFor:
      'Dedicated AppSec penetration testing teams and enterprise CI/CD vulnerability scanning.',
  },
  {
    id: 'owasp_zap',
    name: 'OWASP ZAP (Zed Attack Proxy)',
    tagline: 'World-renowned Open Source Web & API Security Testing Framework',
    vendor: 'OWASP Foundation / Project ZAP',
    type: 'Open Source',
    badgeColor: 'blue',
    scores: {
      pillar_coverage: 8.2,
      pillar_devsecops: 8.6,
      pillar_risk: 7.8,
      pillar_architecture: 8.0,
      pillar_usability: 7.9,
    },
    keyStrengths: [
      '100% Free and open-source with no license restrictions',
      'Lightweight Docker daemon mode for cost-effective CI/CD pipeline automation',
      'Extensible community add-on marketplace and active open community',
      'Native OpenAPI and GraphQL definition importers',
    ],
    limitations: [
      'Higher false positive rate on complex multi-tenant authorization logic',
      'Manual testing UI lacks the refined ergonomics of commercial offensive tooling',
    ],
    deploymentModels: ['Local Desktop GUI', 'Docker Daemon', 'Headless CLI', 'Kubernetes Helm'],
    supportedProtocols: ['REST', 'GraphQL', 'WebSockets', 'OpenAPI v2/v3', 'SOAP'],
    bestSuitedFor:
      'Budget-conscious engineering teams, DevSecOps baseline automation, and security researchers.',
  },
  {
    id: 'stackhawk_akto',
    name: 'StackHawk / Akto (Modern DevSecOps API AST)',
    tagline: 'Developer-First Shift-Left API Security Testing Engine',
    vendor: 'StackHawk Inc. / Akto.io',
    type: 'Hybrid',
    badgeColor: 'cyan',
    scores: {
      pillar_coverage: 8.8,
      pillar_devsecops: 9.6,
      pillar_risk: 8.5,
      pillar_architecture: 9.2,
      pillar_usability: 9.0,
    },
    keyStrengths: [
      'Tailored for developer PR workflows with actionable in-repo code suggestions',
      'Automated API inventory discovery from traffic mirrors (HAR, Postman, AWS ALBs)',
      'Native GitHub / GitLab PR comment integration and developer triage views',
      'Rapid lightweight scans optimized for ephemeral branch testing',
    ],
    limitations: [
      'Less comprehensive manual payload tampering capabilities compared to Burp Suite',
      'Heavy reliance on OpenAPI spec accuracy or live traffic baseline captures',
    ],
    deploymentModels: ['SaaS Dashboard + Local Docker Runner', 'Kubernetes DaemonSet', 'VPC Private Agent'],
    supportedProtocols: ['REST', 'GraphQL', 'gRPC', 'Postman Collections', 'OpenAPI 3.0+'],
    bestSuitedFor:
      'Agile engineering organizations looking to shift API security directly into developer CI/CD.',
  },
  {
    id: 'fortytwo_noname',
    name: '42Crunch / Noname (Akamai API Security)',
    tagline: 'Enterprise API Governance, Contract Conformance & Runtime Protection',
    vendor: '42Crunch / Akamai Technologies',
    type: 'Commercial',
    badgeColor: 'purple',
    scores: {
      pillar_coverage: 8.9,
      pillar_devsecops: 9.0,
      pillar_risk: 9.4,
      pillar_architecture: 9.1,
      pillar_usability: 8.6,
    },
    keyStrengths: [
      'Comprehensive OpenAPI contract conformance audits (Spec Score & Conformance Scan)',
      'Enterprise API inventory discovery across distributed cloud estates and gateway plugins',
      'Regulatory compliance governance mapping (PCI DSS, HIPAA, GDPR)',
      'Combined static contract linting + dynamic endpoint penetration testing',
    ],
    limitations: [
      'Higher enterprise cost and longer onboarding timeline',
      'Primarily focused on contract conformance; requires complementary deep manual logic testing',
    ],
    deploymentModels: ['Cloud SaaS', 'VPC Private Gateway', 'API Gateway Plugins (Kong, Apigee, AWS)'],
    supportedProtocols: ['REST (OpenAPI 2.0 / 3.0 / 3.1)', 'SOAP', 'JSON Schema'],
    bestSuitedFor:
      'Large enterprises and regulated industries requiring strict API governance and inventory visibility.',
  },
];

export const OWASP_API_TOP10: OwaspApiItem[] = [
  {
    id: 'API1:2023',
    title: 'Broken Object Level Authorization (BOLA / IDOR)',
    shortName: 'BOLA',
    severity: 'CRITICAL',
    description:
      'APIs expose endpoints that handle object identifiers without validating that the authenticated user possesses authorization to access or mutate the requested resource.',
    attackScenario:
      'An attacker authenticates as User A (ID: 1042) and sends a GET/PATCH request targeting `/api/v1/accounts/1043/documents`. The server returns User B’s private financial documents because the database query only filters by resource ID without validating the session user ID.',
    testPayload: `GET /api/v1/users/1043/profile HTTP/1.1
Host: api.target.com
Authorization: Bearer <USER_A_JWT_TOKEN>
X-Requested-With: XMLHttpRequest`,
    expectedStatus: '403 Forbidden (or 404 Not Found)',
    remediation:
      'Enforce fine-grained authorization checks at the data access layer. Verify that the session identity matches the owner of the object before querying or updating the database.',
    remediationCode: {
      language: 'typescript',
      snippet: `// Secure Authorization Check in Express / Node.js
app.get('/api/v1/documents/:docId', authenticateToken, async (req, res) => {
  const { docId } = req.params;
  const currentUserId = req.user.id;

  const document = await db.documents.findOne({ 
    where: { 
      id: docId, 
      ownerId: currentUserId // Enforce tenant isolation in DB query
    } 
  });

  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }

  return res.json(document);
});`,
      description: 'Scoped database query enforcing session ownership verification.',
    },
    auditChecklist: [
      'Verify authorization on all GET, PUT, PATCH, and DELETE endpoints with entity IDs in path/body',
      'Test IDOR against UUIDs, sequential integers, and encoded keys using automated tools (Autorize)',
      'Ensure multi-tenant systems enforce organization ID or workspace ID filters across all queries',
    ],
  },
  {
    id: 'API2:2023',
    title: 'Broken Authentication',
    shortName: 'Broken Auth',
    severity: 'CRITICAL',
    description:
      'Weaknesses in authentication mechanisms allow attackers to compromise tokens, exploit credential stuffing, or bypass authentication flows.',
    attackScenario:
      'API endpoints for password resets or OTP validations lack strict rate limiting, allowing attackers to brute-force a 6-digit verification code in minutes.',
    testPayload: `POST /api/v1/auth/verify-otp HTTP/1.1
Host: api.target.com
Content-Type: application/json

{"email": "victim@target.com", "code": "000001"} // Repeat with Turbo Intruder`,
    expectedStatus: '429 Too Many Requests',
    remediation:
      'Implement strict rate limiting, lockout policies, cryptographically secure token issuance, and multi-factor authentication (MFA).',
    remediationCode: {
      language: 'typescript',
      snippet: `// Rate Limiting on Authentication Endpoints (Express Rate Limit)
import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 attempts per window
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/v1/auth/verify-otp', authLimiter, handleOtp);`,
      description: 'Exponential backoff and rate limiter on sensitive authentication endpoints.',
    },
    auditChecklist: [
      'Verify rate limits on /login, /refresh-token, /verify-otp, and /forgot-password endpoints',
      'Check that JWT tokens are signed using asymmetric algorithms (RS256) with short expiration (15m)',
      'Ensure password reset tokens expire after use and are invalidated upon credential changes',
    ],
  },
  {
    id: 'API3:2023',
    title: 'Broken Object Property Level Authorization',
    shortName: 'Mass Assignment',
    severity: 'HIGH',
    description:
      'Combines Mass Assignment and Excessive Data Exposure: APIs expose sensitive properties or accept unauthorized parameters without server-side validation schemas.',
    attackScenario:
      'A user registration or profile update endpoint accepts arbitrary JSON properties. An attacker sends `{"username": "attacker", "role": "admin", "isVerified": true}`, gaining unauthorized administrative privileges.',
    testPayload: `PATCH /api/v1/users/me HTTP/1.1
Host: api.target.com
Authorization: Bearer <USER_TOKEN>
Content-Type: application/json

{
  "bio": "Security Researcher",
  "role": "admin",
  "is_super_user": true,
  "credit_balance": 999999
}`,
    expectedStatus: '200 OK (Ignoring unmapped fields) or 422 Unprocessable Entity',
    remediation:
      'Use strict Data Transfer Object (DTO) validation schemas with allowlists (e.g., Zod, Joi). Avoid binding raw request bodies directly to database models.',
    remediationCode: {
      language: 'typescript',
      snippet: `// Strict Schema Validation with Zod
import { z } from 'zod';

const UpdateProfileSchema = z.object({
  bio: z.string().max(200).optional(),
  avatarUrl: z.string().url().optional(),
}).strict(); // Rejects or strips unrecognized properties like 'role'

app.patch('/api/v1/users/me', async (req, res) => {
  const result = UpdateProfileSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }
  await db.users.update(req.user.id, result.data);
  return res.json({ success: true });
});`,
      description: 'Schema allowlisting preventing unauthorized privilege parameter injection.',
    },
    auditChecklist: [
      'Ensure endpoints do not return complete database models containing password hashes, SSNs, or internal keys',
      'Test user profile and billing update routes for hidden parameter injection (role, verified, tier)',
      'Audit GraphQL query responses to ensure field-level authorization resolvers are enforced',
    ],
  },
  {
    id: 'API4:2023',
    title: 'Unrestricted Resource Consumption',
    shortName: 'Resource Exhaustion',
    severity: 'HIGH',
    description:
      'Lack of execution limits on API requests allows attackers to cause Denial of Service (DoS) through large pagination requests, heavy regex, or file uploads.',
    attackScenario:
      'An attacker requests `/api/v1/logs?limit=5000000` or submits a recursive GraphQL query nested 50 levels deep, exhausting server CPU and memory resources.',
    testPayload: `GET /api/v1/transactions?limit=1000000&page=1 HTTP/1.1
Host: api.target.com
Authorization: Bearer <VALID_TOKEN>`,
    expectedStatus: '400 Bad Request (Max limit exceeded) or 422 Unprocessable Entity',
    remediation:
      'Enforce global and route-specific maximum pagination limits, query depth analysis for GraphQL, request body size limits, and execution timeouts.',
    remediationCode: {
      language: 'typescript',
      snippet: `// Safe Pagination Middleware
export function paginate(req, res, next) {
  const rawLimit = parseInt(req.query.limit, 10) || 20;
  const maxLimit = 100; // Cap hard limit
  req.pagination = {
    limit: Math.min(Math.max(1, rawLimit), maxLimit),
    page: Math.max(1, parseInt(req.query.page, 10) || 1),
  };
  next();
}`,
      description: 'Hard-coded pagination limits preventing catastrophic database query loads.',
    },
    auditChecklist: [
      'Validate max limits on all search and list queries (e.g. limit <= 100)',
      'Set GraphQL query complexity and max depth analyzer (depth <= 7)',
      'Configure multipart upload limits and timeout thresholds on web gateways',
    ],
  },
  {
    id: 'API5:2023',
    title: 'Broken Function Level Authorization (BFLA)',
    shortName: 'BFLA',
    severity: 'HIGH',
    description:
      'Administrative or privileged API endpoints are exposed without verifying that the requesting user belongs to the required role or permission group.',
    attackScenario:
      'A regular user discovers the administrative endpoint `/api/v1/admin/export-users` or changes the HTTP verb from `GET /api/v1/users` to `DELETE /api/v1/users/52` and executes it without admin authorization.',
    testPayload: `POST /api/v1/admin/users/104/suspend HTTP/1.1
Host: api.target.com
Authorization: Bearer <STANDARD_USER_TOKEN>
Content-Type: application/json

{"reason": "Account audit"}`,
    expectedStatus: '403 Forbidden',
    remediation:
      'Implement centralized, policy-based Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC) middleware on all privileged routes.',
    remediationCode: {
      language: 'typescript',
      snippet: `// Centralized RBAC Middleware
export const requireRole = (allowedRoles: string[]) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: Insufficient permissions.' });
    }
    next();
  };
};

app.post('/api/v1/admin/users/:id/suspend', requireRole(['SUPER_ADMIN']), suspendUser);`,
      description: 'Strict middleware enforcement denying unauthorized role execution.',
    },
    auditChecklist: [
      'Map all administrative endpoints and test access using non-privileged accounts',
      'Test HTTP method tampering (e.g. replacing GET with POST/PUT/DELETE)',
      'Inspect client-side JavaScript source maps for undisclosed administrative API routes',
    ],
  },
  {
    id: 'API6:2023',
    title: 'Unrestricted Access to Sensitive Business Flows',
    shortName: 'Business Logic Flow',
    severity: 'MEDIUM',
    description:
      'APIs expose business workflows (e.g. purchasing items, booking seats, redeeming coupons) to automated bot exploitation without anti-automation safeguards.',
    attackScenario:
      'An attacker writes a script that redeems a $10 promo code 5,000 times across thousands of disposable accounts or purchases limited concert tickets in 200 milliseconds.',
    testPayload: `POST /api/v1/coupons/redeem HTTP/1.1
Host: api.target.com
Authorization: Bearer <TOKEN>
Content-Type: application/json

{"code": "WELCOME10"} // Executed simultaneously across 50 concurrent threads`,
    expectedStatus: '429 Rate Limited or 409 Conflict (Single redemption per user/household)',
    remediation:
      'Deploy anti-bot controls, CAPTCHA on sensitive checkout flows, biometric/device fingerprinting, and transactional mutex locks.',
    remediationCode: {
      language: 'typescript',
      snippet: `// Atomic Database Transaction & Mutex Lock
await db.transaction(async (trx) => {
  const coupon = await trx('coupons').where({ code }).forUpdate().first();
  const alreadyUsed = await trx('user_coupons').where({ userId, couponId: coupon.id }).first();
  
  if (alreadyUsed || coupon.remainingClaims <= 0) {
    throw new Error('Coupon limit reached or already claimed');
  }

  await trx('coupons').where({ id: coupon.id }).decrement('remainingClaims', 1);
  await trx('user_coupons').insert({ userId, couponId: coupon.id });
});`,
      description: 'Atomic database transactions with pessimistic locking preventing double-spend exploits.',
    },
    auditChecklist: [
      'Test race conditions on coupon redemption, balance transfer, and inventory reservation endpoints',
      'Verify anti-bot defenses on high-velocity transactional flows',
      'Ensure multi-step workflows cannot be bypassed by directly invoking the final payment step',
    ],
  },
  {
    id: 'API7:2023',
    title: 'Server-Side Request Forgery (SSRF)',
    shortName: 'SSRF',
    severity: 'HIGH',
    description:
      'API endpoints accept user-supplied URLs to fetch external resources without validating against private IP ranges or metadata service endpoints.',
    attackScenario:
      'An API feature that imports profile avatars from URL accepts `http://169.254.169.254/latest/meta-data/iam/security-credentials/` and returns AWS instance credentials in the response.',
    testPayload: `POST /api/v1/users/avatar-from-url HTTP/1.1
Host: api.target.com
Authorization: Bearer <VALID_TOKEN>
Content-Type: application/json

{"imageUrl": "http://169.254.169.254/latest/meta-data/identity-credentials/ec2/security-credentials/ec2-instance"}`,
    expectedStatus: '400 Bad Request or 403 Forbidden',
    remediation:
      'Resolve domain DNS before request, validate against private IP blocks (127.0.0.0/8, 10.0.0.0/8, 169.254.169.254), disable HTTP redirects, and enforce strict protocol allowlists (https only).',
    remediationCode: {
      language: 'typescript',
      snippet: `// DNS Pre-lookup & Private IP Firewall
import dns from 'dns/promises';

async function validateOutboundUrl(rawUrl: string): Promise<boolean> {
  const parsed = new URL(rawUrl);
  if (parsed.protocol !== 'https:') return false;

  const { address } = await dns.lookup(parsed.hostname);
  if (address.startsWith('127.') || address.startsWith('10.') || address.startsWith('169.254.')) {
    throw new Error('Outbound request to private network blocked');
  }
  return true;
}`,
      description: 'DNS pre-resolution validation blocking SSRF to internal services and cloud metadata.',
    },
    auditChecklist: [
      'Test all URL input parameters with internal loopback (`http://127.0.0.1:8080`) and cloud metadata (`http://169.254.169.254`)',
      'Verify webhook delivery endpoints validate destination IP boundaries',
      'Test URL parser differentials and alternate IP encodings (e.g. hex, dword, octal)',
    ],
  },
  {
    id: 'API8:2023',
    title: 'Security Misconfiguration',
    shortName: 'Misconfiguration',
    severity: 'MEDIUM',
    description:
      'APIs expose debug endpoints, verbose stack traces, misconfigured CORS headers (`Access-Control-Allow-Origin: *` with credentials), or missing security headers.',
    attackScenario:
      'An unhandled exception returns a complete Java/Node stack trace revealing internal database connection strings and library versions.',
    testPayload: `OPTIONS /api/v1/users HTTP/1.1
Host: api.target.com
Origin: https://evil-attacker.com
Access-Control-Request-Method: POST`,
    expectedStatus: '403 Forbidden or 200 OK without reflection of evil-attacker.com in CORS header',
    remediation:
      'Standardize error responses, disable debug modes in production, configure explicit CORS origins, and deploy security headers (HSTS, CSP).',
    remediationCode: {
      language: 'typescript',
      snippet: `// Production Error Handling & Safe CORS
import cors from 'cors';

app.use(cors({
  origin: ['https://app.target.com', 'https://admin.target.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Global Error Handler without stack trace leakage
app.use((err, req, res, next) => {
  console.error(err); // Server-side logging
  res.status(500).json({ error: 'An unexpected internal error occurred. Ref ID: ' + req.id });
});`,
      description: 'Safe CORS allowlist and sanitized error handler preventing info leakage.',
    },
    auditChecklist: [
      'Ensure stack traces and debug parameters are stripped in production environments',
      'Verify CORS configuration does not blindly reflect incoming Origin headers with credentials',
      'Confirm standard security headers (HSTS, X-Content-Type-Options) are present on all responses',
    ],
  },
  {
    id: 'API9:2023',
    title: 'Improper Inventory Management',
    shortName: 'Shadow & Zombie APIs',
    severity: 'MEDIUM',
    description:
      'Old API versions (e.g. `/api/v1` vs `/api/v3`) remain accessible without security patches, or undocumented "shadow" endpoints bypass standard gateway authentication.',
    attackScenario:
      'An attacker discovers deprecated `/api/v1/auth/login` which still uses weak MD5 hashing and lacks MFA, allowing them to bypass the security controls implemented in `/api/v3`.',
    testPayload: `GET /api/v1/debug/swagger.json HTTP/1.1
Host: api.target.com`,
    expectedStatus: '404 Not Found',
    remediation:
      'Maintain an automated single source of truth for all API versions. Decommission deprecated versions and enforce centralized API gateway routing.',
    remediationCode: {
      language: 'typescript',
      snippet: `// Gateway Version Deprecation & Sunset Header (RFC 8594)
app.use('/api/v1/*', (req, res) => {
  res.setHeader('Deprecation', 'true');
  res.setHeader('Sunset', 'Wed, 11 Nov 2026 00:00:00 GMT');
  res.setHeader('Link', '<https://api.target.com/api/v2>; rel="successor-version"');
  return res.status(410).json({ 
    error: 'API v1 has been sunset and decommissioned. Please migrate to API v2.' 
  });
});`,
      description: 'RFC 8594 Sunset enforcement cleanly decommissioning legacy API routes.',
    },
    auditChecklist: [
      'Scan for shadow API routes using spec reconciliation and traffic monitoring',
      'Verify that all deprecated API versions return 410 Gone',
      'Audit staging, QA, and documentation endpoints for public internet exposure',
    ],
  },
  {
    id: 'API10:2023',
    title: 'Unsafe Consumption of APIs',
    shortName: 'Third-Party Ingestion',
    severity: 'MEDIUM',
    description:
      'Backend services blindly trust data received from third-party APIs without sanitization, leading to SQL injection, SSRF, or command injection via external webhooks.',
    attackScenario:
      'A backend service ingests user profile updates from an external OAuth provider. The service concatenates the `provider_username` directly into an internal SQL query, resulting in SQL injection.',
    testPayload: `POST /api/v1/webhooks/payment-gateway HTTP/1.1
Host: api.target.com
X-Signature: invalid_fake_signature
Content-Type: application/json

{"event": "charge.success", "user_id": "1042'; DROP TABLE users;--" }`,
    expectedStatus: '401 Unauthorized (Invalid Webhook Signature)',
    remediation:
      'Validate cryptographic signatures on all incoming webhooks. Sanitize and validate all third-party payloads before passing to internal databases or microservices.',
    remediationCode: {
      language: 'typescript',
      snippet: `// Webhook Signature Verification (HMAC SHA-256)
import crypto from 'crypto';

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
}`,
      description: 'Timing-safe HMAC SHA-256 verification of third-party webhook payloads.',
    },
    auditChecklist: [
      'Verify HMAC signatures on all inbound webhook receiver endpoints',
      'Ensure data received from external integrations is treated as untrusted user input',
      'Validate TLS certificates and enforce mTLS when communicating with external partner APIs',
    ],
  },
];

export const BURP_PLAYBOOK_TOPICS: BurpTestingTopic[] = [
  {
    id: 'openapi_parser',
    title: '1. OpenAPI / Swagger Schema Ingestion & Endpoint Discovery',
    category: 'manual-pro',
    targetVulnerability: 'API Reconnaissance & Hidden Parameter Discovery',
    extensionRequired: 'OpenAPI Parser (PortSwigger BApp Store) or Swagger Parser',
    summary:
      'Transform static JSON/YAML API specifications into live, parameter-fuzzed requests in Burp Suite Target Site Map and Repeater.',
    stepByStep: [
      'Open Burp Suite Professional -> Extender / Extensions -> BApp Store.',
      'Install the "OpenAPI Parser" or "Swagger Parser" extension.',
      'Navigate to the top menu bar -> Extensions -> OpenAPI Parser -> "Parse URL" or "Parse File".',
      'Paste the live target spec URL (e.g. `https://api.target.com/v3/api-docs` or `swagger.json`).',
      'The extension automatically parses all paths, HTTP methods, headers, and request schemas into your Burp Target Site Map.',
      'Send discovered endpoints to Burp Intruder or Repeater for automated fuzzing with dummy data generators.',
    ],
    proTips: [
      'Look for staging or internal schemas that disclose unreleased API routes (`/api/v2/internal-docs.json`).',
      'Fuzz optional query parameters that were documented in OpenAPI schemas but not linked in client apps.',
    ],
    configurationSnippet: {
      title: 'Common OpenAPI/Swagger Discovery Paths',
      language: 'bash',
      code: `# Common Wordlist for API Schema Discovery (ffuf / Burp Intruder)
/v1/api-docs
/v2/api-docs
/v3/api-docs
/swagger.json
/swagger/v1/swagger.json
/swagger-ui.html
/api/swagger.yaml
/openapi.json
/openapi.yaml
/api-docs.json`,
    },
  },
  {
    id: 'autorize_bola',
    title: '2. Automated BOLA / IDOR Testing with Autorize',
    category: 'manual-pro',
    targetVulnerability: 'API1:2023 - Broken Object Level Authorization (BOLA)',
    extensionRequired: 'Autorize (PortSwigger BApp Store)',
    summary:
      'Intercept traffic as high-privileged User A while automatically replaying headers with low-privileged User B credentials to detect authorization bypasses in real-time.',
    stepByStep: [
      'Install "Autorize" from the PortSwigger BApp Store.',
      'Log into the target application as User B (Attacker / Low Privilege) and extract their Bearer token or Cookie headers.',
      'Open the "Autorize" tab in Burp Suite -> Paste User B’s Authorization header into the top configuration box.',
      'Toggle "Autorize is ON".',
      'Now browse and execute all workflows in the application as User A (Victim / High Privilege).',
      'Autorize automatically intercepts every request, strips User A’s credentials, injects User B’s credentials, and fires parallel requests.',
      'Inspect the table status: RED ("Bypassed!") indicates User B received identical data to User A (BOLA vulnerability detected).',
    ],
    proTips: [
      'Configure "Check unauthenticated requests" in Autorize to simultaneously test for missing authentication on endpoints.',
      'Add filter strings (e.g. `{"error"`) to eliminate false positives in differential body analysis.',
    ],
    configurationSnippet: {
      title: 'Autorize Header Replacement Configuration',
      language: 'http',
      code: `# Autorize Temporary Headers Configuration
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX2JfaWQiLCJyb2xlIjoidXNlciJ9...
X-User-Id: 1043
X-Tenant-Id: tenant_b`,
    },
  },
  {
    id: 'graphql_security',
    title: '3. GraphQL Security Testing with InQL & GraphQL Raider',
    category: 'manual-pro',
    targetVulnerability: 'API4:2023 & API8:2023 - Introspection & Mutation Injection',
    extensionRequired: 'InQL Scanner / GraphQL Raider (PortSwigger BApp Store)',
    summary:
      'Automate GraphQL introspection dumping, query generation, circular query depth DoS testing, and field-level permission auditing.',
    stepByStep: [
      'Install "InQL" from the PortSwigger BApp Store.',
      'Send any GraphQL POST request (`/graphql`) from Proxy History to "InQL Scanner".',
      'InQL sends an introspection query to enumerate all Queries, Mutations, Types, and Enums in the schema.',
      'Generate ready-to-run query templates for every discovered mutation with single-click Repeater export.',
      'Test for nested query resource exhaustion by creating circular query payloads (e.g. `user { friends { user { friends ... } } }`).',
      'Test batching attacks by sending an array of 500 mutation objects in a single HTTP POST to bypass rate limiting.',
    ],
    proTips: [
      'If introspection is disabled, test for field suggestion bypasses via Clairvoyance or GraphQL Voyager wordlist dictionaries.',
      'Look for sensitive mutations that lack authorization checks (e.g. `mutation { updateAccountRole(userId: "...", role: ADMIN) }`).',
    ],
    configurationSnippet: {
      title: 'Sample GraphQL Circular Query & Batching Test Payload',
      language: 'json',
      code: `// GraphQL Query Batching (Rate Limit Bypass Test)
[
  {"query": "mutation { login(username: \\"admin\\", password: \\"pass1\\") { token } }"},
  {"query": "mutation { login(username: \\"admin\\", password: \\"pass2\\") { token } }"},
  {"query": "mutation { login(username: \\"admin\\", password: \\"pass3\\") { token } }"}
]`,
    },
  },
  {
    id: 'jwt_tampering',
    title: '4. JWT Testing & Signature Forgery with JWT Editor',
    category: 'manual-pro',
    targetVulnerability: 'API2:2023 - Broken Authentication & Token Tampering',
    extensionRequired: 'JWT Editor (PortSwigger BApp Store)',
    summary:
      'Inspect, decode, and forge JSON Web Tokens to test algorithm confusion (RS256 -> HS256), "none" alg bypasses, and privilege claim mutations.',
    stepByStep: [
      'Install "JWT Editor" from the BApp Store.',
      'Send a request containing a Bearer token to Burp Repeater -> Click the "JSON Web Token" subtab.',
      'Test "alg": "none" attack: Modify the header to `{"alg": "none", "typ": "JWT"}` and strip the signature bytes after the second period.',
      'Test Algorithm Confusion (RS256 to HS256): Copy the server public RSA certificate, create a symmetric HMAC key using the public key in JWT Editor, and sign the forged token.',
      'Test Claim Manipulation: Change `"role": "user"` to `"role": "admin"`, `"email": "admin@target.com"`, or change tenant IDs.',
      'Check for embedded JWK (jku / x5u / jwk header injection) where the server trusts an attacker-controlled public verification key.',
    ],
    proTips: [
      'Always test if the server actually validates token expiration (`"exp"` claim) or allows replaying expired tokens.',
      'Check if the signature is verified at all by modifying one character in the payload without re-signing.',
    ],
    configurationSnippet: {
      title: 'Forged JWT "none" Algorithm Payload Header',
      language: 'json',
      code: `// Tampered JWT Header & Claims
Header:
{
  "alg": "none",
  "typ": "JWT"
}

Payload:
{
  "sub": "user_1042",
  "name": "Attacker",
  "role": "superadmin",
  "is_admin": true,
  "iat": 1516239022
}
// Signature left blank: e30.eyJzdWIi...`
    },
  },
  {
    id: 'race_conditions',
    title: '5. Race Conditions & Concurrency via Repeater Parallel Send',
    category: 'manual-pro',
    targetVulnerability: 'API6:2023 - Unrestricted Business Flows & Double Spend',
    summary:
      'Leverage Burp Suite’s built-in HTTP/2 and last-byte synchronization engine to execute concurrent API requests with zero network jitter.',
    stepByStep: [
      'Send the target transaction request (e.g. `POST /api/v1/coupons/redeem` or `POST /api/v1/wallet/transfer`) to Burp Repeater.',
      'Duplicate the request 20-30 times in Repeater tabs.',
      'In Repeater, click the top right "+" icon -> Create a new "Tab Group" -> Select all duplicated tabs.',
      'Click the dropdown next to the "Send" button -> Select "Send group in parallel (last-byte sync)".',
      'Burp Suite pre-negotiates TCP/TLS handshakes and sends the complete request body except the final byte, then releases all final bytes simultaneously.',
      'Inspect the responses: If multiple requests return `200 OK` (e.g. 5 successful redemptions for a single coupon), a critical concurrency race condition is confirmed.',
    ],
    proTips: [
      'HTTP/2 multiplexing allows sending all requests over a single TCP connection, reducing jitter to sub-millisecond precision.',
      'Ideal for testing gift card redemptions, voting systems, inventory limit bypasses, and account invite limits.',
    ],
    configurationSnippet: {
      title: 'Burp Repeater Parallel Request Configuration',
      language: 'text',
      code: `// Repeater Tab Group Settings:
Send Mode: "Send group in parallel (last-byte sync)"
Protocol: HTTP/2 (Automatic Single-Stream Multiplexing)
Request Count: 20 tabs
Target: POST /api/v1/loyalty/claim-reward`,
    },
  },
  {
    id: 'headless_enterprise',
    title: '6. Automated CI/CD Pipeline Integration (Burp Suite Enterprise)',
    category: 'automated-enterprise',
    targetVulnerability: 'Continuous Automated DevSecOps API Regression Testing',
    summary:
      'Trigger headless dynamic security scans from GitHub Actions / GitLab CI via the Burp Suite Enterprise REST / GraphQL API with automated Quality Gate thresholds.',
    stepByStep: [
      'Generate an API Key in Burp Suite Enterprise Edition: Settings -> API Keys.',
      'Add the API Key to your GitHub Repository Secrets as `BURP_ENTERPRISE_API_KEY`.',
      'Create a GitHub Actions workflow (`.github/workflows/api-security-scan.yml`).',
      'Trigger scan creation via GraphQL mutation specifying the OpenAPI spec URL and target host.',
      'Poll the scan status endpoint until status equals `SUCCEEDED` or `FAILED`.',
      'Parse the vulnerability issue summary and break the pipeline if Critical/High count exceeds 0.',
    ],
    proTips: [
      'Run scans against ephemeral test environments deployed in pull requests before merging to main.',
      'Configure Burp Enterprise to automatically post finding summaries directly to Jira or GitHub Security tab.',
    ],
    configurationSnippet: {
      title: 'GitHub Actions Workflow for Burp Enterprise API Scans',
      language: 'yaml',
      code: `name: Automated API DAST Scan
on:
  pull_request:
    branches: [ main ]

jobs:
  burp-api-security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Headless Burp Enterprise Scan
        env:
          BURP_API_URL: \${{ secrets.BURP_ENTERPRISE_URL }}
          BURP_API_KEY: \${{ secrets.BURP_ENTERPRISE_KEY }}
        run: |
          echo "Triggering automated API scan for PR staging target..."
          SCAN_ID=$(curl -s -X POST "\$BURP_API_URL/graphql" \\
            -H "Authorization: \$BURP_API_KEY" \\
            -H "Content-Type: application/json" \\
            -d '{"query": "mutation { run_scan(site_id: \\"12\\") { scan_id } }"}' | jq -r .data.run_scan.scan_id)
          echo "Scan initiated with ID: \$SCAN_ID"
          
          # Poll status and enforce Quality Gate
          # Fail build on High/Critical findings (exit 1)`,
    },
  },
];

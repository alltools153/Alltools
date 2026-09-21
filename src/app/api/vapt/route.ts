import { NextRequest, NextResponse } from 'next/server';
import { executeVaptScan } from '@/lib/vaptEngine';
import { validateTargetUrl } from '@/lib/ssrfValidator';

const OWASP_API_TOP_10 = [
  { id: 'API1:2023', name: 'Broken Object Level Authorization', summary: 'Enforce object-level access checks on every resource ID.' },
  { id: 'API2:2023', name: 'Broken Authentication', summary: 'Protect tokens, session lifetime, and credential recovery flows.' },
  { id: 'API3:2023', name: 'Broken Object Property Level Authorization', summary: 'Filter mass assignment and excess data exposure.' },
  { id: 'API4:2023', name: 'Unrestricted Resource Consumption', summary: 'Rate-limit, cap payload size, and timeout expensive work.' },
  { id: 'API5:2023', name: 'Broken Function Level Authorization', summary: 'Deny-by-default admin and privileged operations.' },
  { id: 'API6:2023', name: 'Unrestricted Access to Sensitive Business Flows', summary: 'Protect purchase, signup, and coupon flows from automation abuse.' },
  { id: 'API7:2023', name: 'Server Side Request Forgery', summary: 'Allowlist outbound destinations and block private networks.' },
  { id: 'API8:2023', name: 'Security Misconfiguration', summary: 'Disable debug, set security headers, and lock CORS.' },
  { id: 'API9:2023', name: 'Improper Inventory Management', summary: 'Document and retire unused API versions and shadow endpoints.' },
  { id: 'API10:2023', name: 'Unsafe Consumption of APIs', summary: 'Validate third-party API responses and TLS before trust.' },
];

export async function GET() {
  return NextResponse.json({
    status: 'success',
    checklist: OWASP_API_TOP_10,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body.url;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Valid URL is required' }, { status: 400 });
    }

    const validation = await validateTargetUrl(url);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error || 'Target access denied.' }, { status: 403 });
    }

    const report = await executeVaptScan(
      validation.normalizedUrl,
      validation.host,
      validation.ip
    );

    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

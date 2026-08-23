import { NextRequest, NextResponse } from 'next/server';
import { validateTargetUrl } from '@/lib/ssrfValidator';
import { executeVaptScan } from '@/lib/vaptEngine';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawUrl = body?.url;

    if (!rawUrl || typeof rawUrl !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'COMMAND ERROR: URL PARAMETER IS REQUIRED. USAGE: SCAN <target_url>',
        },
        { status: 400 }
      );
    }

    // 1. SSRF & Protocol Safety Verification
    const validation = await validateTargetUrl(rawUrl);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error || 'SSRF DEFENSE: TARGET ACCESS DENIED.',
        },
        { status: 403 }
      );
    }

    // 2. Execute Passive In-Server VAPT Assessment
    const report = await executeVaptScan(
      validation.normalizedUrl,
      validation.host,
      validation.ip
    );

    return NextResponse.json({
      success: true,
      data: report,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: `SCAN ENGINE EXCEPTION: ${error.message || 'INTERNAL SERVER ERROR'}`,
      },
      { status: 500 }
    );
  }
}

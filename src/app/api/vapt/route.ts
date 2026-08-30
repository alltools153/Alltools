import { NextRequest, NextResponse } from 'next/server';
import { executeVaptScan } from '@/lib/vaptEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body.url;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Valid URL is required' }, { status: 400 });
    }

    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname;
    const report = await executeVaptScan(
      url,
      host,
      host
    );

    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

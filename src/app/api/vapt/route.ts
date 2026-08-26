import { NextRequest, NextResponse } from 'next/server';
import { simulateVaptScan } from '@/lib/vaptEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body.url;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Valid URL is required' }, { status: 400 });
    }

    const report = simulateVaptScan(url);
    return NextResponse.json({
      status: 'success',
      ...report,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

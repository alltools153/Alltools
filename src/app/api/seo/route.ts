import { NextRequest, NextResponse } from 'next/server';
import { MASTER_SEO_KEYWORDS, SEO_JSON_LD } from '@/lib/seoKeywords';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const lang = searchParams.get('lang');

  let filtered = MASTER_SEO_KEYWORDS;
  if (category && category !== 'all') {
    filtered = filtered.filter((k) => k.category === category);
  }
  if (lang && lang !== 'all') {
    filtered = filtered.filter((k) => k.lang === lang);
  }

  return NextResponse.json({
    status: 'success',
    total: filtered.length,
    keywords: filtered,
    schemas: SEO_JSON_LD,
  });
}

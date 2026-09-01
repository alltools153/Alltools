import { NextRequest, NextResponse } from 'next/server';
import { getBengaliDate as getEngineBengaliDate, getBengaliMuhurats } from '@/lib/bengaliEngine';
import { getFestivalsForDate } from '@/lib/festivalsData';
import { getBengaliDate } from '@/lib/panjikaEngine';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get('date');
  const targetDate = dateStr ? new Date(dateStr) : new Date();

  const bengaliDateInfo = getEngineBengaliDate(targetDate);
  const bengaliDate = getBengaliDate(targetDate);
  const muhurats = getBengaliMuhurats();

  const todayFestivals = getFestivalsForDate(targetDate, bengaliDate);

  return NextResponse.json({
    status: 'success',
    timestamp: targetDate.toISOString(),
    bengaliDate: bengaliDateInfo,
    muhurats,
    festivalsToday: todayFestivals,
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { getBengaliDate, getBengaliMuhurats } from '@/lib/bengaliEngine';
import { FESTIVALS_LIST } from '@/lib/festivalsData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get('date');
  const targetDate = dateStr ? new Date(dateStr) : new Date();

  const bengaliDate = getBengaliDate(targetDate);
  const muhurats = getBengaliMuhurats();

  const todayFestivals = FESTIVALS_LIST.filter(
    (f) => f.monthIndex === bengaliDate.monthIndex
  );

  return NextResponse.json({
    status: 'success',
    timestamp: targetDate.toISOString(),
    bengaliDate,
    muhurats,
    festivalsToday: todayFestivals,
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { getDayPanjika, getBengaliDate } from '@/lib/panjikaEngine';
import { LOCATIONS } from '@/lib/constants/panjikaData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get('date');
  const locationId = searchParams.get('location') || 'kolkata';
  const location = LOCATIONS.find((l) => l.id === locationId) || LOCATIONS[0];

  const targetDate = dateStr ? new Date(dateStr) : new Date();
  const panjika = getDayPanjika(targetDate, location);

  return NextResponse.json({
    status: 'success',
    timestamp: targetDate.toISOString(),
    panjika,
    bengaliDate: panjika.bengaliDate,
    muhurats: panjika.muhurats,
    festivalsToday: panjika.festivals,
  });
}

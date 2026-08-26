import { NextRequest, NextResponse } from 'next/server';
import {
  calculateChronologicalAge,
  calculateNextBirthday,
  calculatePlanetaryAges,
  calculateCosmicBioStats,
  calculateMilestones,
} from '@/lib/ageEngine';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const birthDate = searchParams.get('birthDate');
  const targetDate = searchParams.get('targetDate') || new Date().toISOString();

  if (!birthDate) {
    return NextResponse.json({ error: 'birthDate is required in query params' }, { status: 400 });
  }

  const chrono = calculateChronologicalAge(birthDate, targetDate);
  const nextBirthday = calculateNextBirthday(birthDate, new Date(targetDate));
  const planetaryAges = calculatePlanetaryAges(birthDate, new Date(targetDate));
  const bioStats = calculateCosmicBioStats(birthDate, new Date(targetDate));
  const milestones = calculateMilestones(birthDate, new Date(targetDate));

  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    chronologicalAge: chrono,
    nextBirthday,
    planetaryAges,
    cosmicBioStats: bioStats,
    milestones,
  });
}

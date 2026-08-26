export interface ChronologicalAgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  totalDays: number;
  totalWeeks: number;
  remainingDaysInWeek: number;
  totalMonths: number;
  remainingDaysInMonth: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  decimalAgeYears: number;
  birthDayOfWeek: string;
  isLeapYearBaby: boolean;
  isBirthdayToday: boolean;
  birthDateFormatted: string;
  targetDateFormatted: string;
}

export interface NextBirthdayInfo {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  nextBirthdayDate: Date;
  nextBirthdayDayOfWeek: string;
  turningAge: number;
  halfBirthdayDate: Date;
  daysToHalfBirthday: number;
  upcomingBirthdays: Array<{
    year: number;
    date: string;
    dayOfWeek: string;
    age: number;
  }>;
}

export interface MilestoneItem {
  id: string;
  title: string;
  category: 'age' | 'days' | 'seconds' | 'life';
  targetValue: number | string;
  targetDate: Date;
  reached: boolean;
  daysRemaining: number;
  description: string;
  badge: string;
  icon: string;
}

export interface CosmicBioStats {
  heartbeats: number;
  breaths: number;
  blinks: number;
  mealsEaten: number;
  sleepHours: number;
  sleepYears: number;
  sunDistanceMiles: number;
  sunDistanceKm: number;
  galaxyDistanceMiles: number;
  galaxyDistanceKm: number;
  earthRotations: number;
}

export interface PlanetaryAge {
  planet: string;
  orbitalPeriodDays: number;
  ageOnPlanet: number;
  nextBirthdayEarthDate: Date;
  daysToNextBirthday: number;
  daysToOextBirthday?: number;
  color: string;
  accentColor: string;
  symbol: string;
  funFact: string;
}

export interface WesternZodiacSign {
  sign: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dates: string;
  ruler: string;
  quality: 'Cardinal' | 'Fixed' | 'Mutable';
  traits: string[];
  luckyNumbers: number[];
  luckyColor: string;
}

export interface ChineseZodiacSign {
  animal: string;
  element: string;
  yinYang: 'Yin' | 'Yang';
  luckyNumbers: number[];
  traits: string[];
  complementaryAnimals: string[];
}

export interface GenerationCohort {
  name: string;
  range: string;
  eraTagline: string;
  definingCharacteristics: string[];
  iconicTech: string;
}

export interface AstrologyGenInsights {
  westernZodiac: WesternZodiacSign;
  chineseZodiac: ChineseZodiacSign;
  generation: GenerationCohort;
  birthstone: {
    name: string;
    color: string;
    meaning: string;
  };
  birthFlower: {
    name: string;
    meaning: string;
  };
  dayOfWeekPoem: {
    day: string;
    rhymeLine: string;
    characteristics: string;
  };
}

export interface LifeGridStats {
  lifeExpectancyYears: number;
  totalWeeks: number;
  weeksLived: number;
  weeksRemaining: number;
  percentLived: number;
  currentStage: string;
}

export interface DateDifferenceResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  olderPerson: string;
  percentageDifference: number;
  doubleAgeDate?: Date | null;
}

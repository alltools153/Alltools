import {
  ChronologicalAgeResult,
  NextBirthdayInfo,
  PlanetaryAge,
  CosmicBioStats,
  MilestoneItem,
} from '@/types/age';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export function calculateChronologicalAge(
  birthDate: Date | string,
  targetDate: Date | string = new Date()
): ChronologicalAgeResult {
  const b = new Date(birthDate);
  const t = new Date(targetDate);

  if (isNaN(b.getTime()) || isNaN(t.getTime())) {
    return {
      years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, miliseconds: 0,
      totalDays: 0, totalWeeks: 0, remainingDaysInWeek: 0, totalMonths: 0, remainingDaysInMonth:0,
      totalHours: 0, totalMinutes: 0, totalSeconds: 0, decimalAgeYears: 0,
      birthDayOfWeek: 'Sunday', isLeapYearBaby: false, isBirthdayToday: false,
      birthDateFormatted: '', targetDateFormatted: ''
    };
  }

  const isFuture = t.getTime() < b.getTime();
  const older = isFuture ? t : b;
  const newer = isFuture ? b : t;

  const diffMs = Math.max(0, newer.getTime() - older.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDaysInWeek = totalDays % 7;

  let years = newer.getFullYear() - older.getFullYear();
  let months = newer.getMonth() - older.getMonth();
  let days = newer.getDate() - older.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(newer.getFullYear(), newer.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = Math.max(0, years * 12 + months);
  const decimalAgeYears = Number((diffMs / (1000 * 60 * 60 * 24 * 365.2425)).toFixed(5));

  const isLeapYearBaby = b.getMonth() === 1 && b.getDate() === 29;
  const isBirthdayToday = b.getMonth() === t.getMonth() && b.getDate() === t.getDate();

  const birthDayOfWeek = DAYS_OF_WEEK[b.getDay()] || 'Sunday';
  const birthDateFormatted = `${birthDayOfWeek}, ${MONTH_NAMES[b.getMonth()]} ${b.getDate()}, ${b.getFullYear()}`;
  const targetDateFormatted = `${DAYS_OF_WEEK[t.getDay()]}, ${MONTH_NAMES[t.getMonth()]} ${t.getDate()}, ${t.getFullYear()}`;

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: newer.getHours(),
    minutes: newer.getMinutes(),
    seconds: newer.getSeconds(),
    miliseconds: newer.getMilliseconds(),
    totalDays,
    totalWeeks,
    remainingDaysInWeek,
    totalMonths,
    remainingDaysInMonth:days,
    totalHours,
    totalMinutes,
    totalSeconds,
    decimalAgeYears,
    birthDayOfWeek,
    isLeapYearBaby,
    isBirthdayToday,
    birthDateFormatted,
    targetDateFormatted,
  };
}

export function calculateNextBirthday(birthDate: Date | string, now: Date = new Date()): NextBirthdayInfo {
  const b = new Date(birthDate);
  if (isNaN(b.getTime())) {
    return {
      days: 0, hours: 0, minutes: 0, seconds: 0,
      nextBirthdayDate: new Date(now), nextBirthdayDayOfWeek: 'Sunday',
      turningAge: 1, halfBirthdayDate: new Date(now), daysToHalfBirthday: 0, upcomingBirthdays: []
    };
  }

  const currentYear = now.getFullYear();
  const birthMonth = b.getMonth();
  const birthDay = b.getDate();

  const getBdayForYear = (yr: number) => {
    const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0;
    const day = birthMonth === 1 && birthDay === 29 && !isLeap ? 28 : birthDay;
    return new Date(yr, birthMonth, day, 0, 0, 0);
  };

  let nextBday = getBdayForYear(currentYear);
  if (nextBday.getTime() <= now.getTime()) {
    nextBday = getBdayForYear(currentYear + 1);
  }

  const diffMs = Math.max(0, nextBday.getTime() - now.getTime());
  const totalSecs = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;
  const turningAge = nextBday.getFullYear() - b.getFullYear();

  const upcomingBirthdays = [];
  for (let y = nextBday.getFullYear(); y < nextBday.getFullYear() + 6; y++) {
    const d = getBdayForYear(y);
    upcomingBirthdays.push({
      year: y,
      date: `${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${y}`,
      dayOfWeek: DAYS_OF_WEEK[d.getDay()],
      age: y - b.getFullYear(),
    });
  }
  const halfBirthdayDate = new Date(nextBday);
  halfBirthdayDate.setMonth(halfBirthdayDate.getMonth() - 6);

  const daysToHalfBirthday = Math.floor(
    (halfBirthdayDate.getTime() - now.getTime()) /
    (1000 * 60 * 60 * 24)
);

  return {
    days,
    hours,
    minutes,
    seconds,
    nextBirthdayDate: nextBday,
    nextBirthdayDayOfWeek: DAYS_OF_WEEK[nextBday.getDay()],
    turningAge,
    halfBirthdayDate,
    daysToHalfBirthday,
    upcomingBirthdays,
  };
}

export function calculatePlanetaryAges(birthDate: Date | string, now: Date = new Date()): PlanetaryAge[] {
  const b = new Date(birthDate);
  const diffDays = isNaN(b.getTime()) ? 0 : Math.max(0, (now.getTime() - b.getTime()) / 86400000);

  const planets = [
    { planet: 'Mercury', orbitalPeriodDays: 87.97, color: 'from-amber-600 to-orange-400', symbol: '☿', funFact: 'A year on Mercury is shorter than a single day on Mercury (176 Earth days).' },
    { planet: 'Venus', orbitalPeriodDays: 224.7, color: 'from-yellow-500 to-amber-300', symbol: '♀', funFact: 'Venus rotates backwards, meaning the Sun rises in the west and sets in the east.' },
    { planet: 'Earth', orbitalPeriodDays: 365.25, color: 'from-blue-600 to-emerald-400', symbol: '🜨', funFact: 'Our home orb travels at roughly 67,000 miles per hour around the Sun.' },
    { planet: 'Mars', orbitalPeriodDays: 686.98, color: 'from-red-600 to-orange-500', symbol: '♂', funFact: 'Mars is home to Olympus Mons, a volcano three times the height of Mt. Everest.' },
    { planet: 'Jupiter', orbitalPeriodDays: 4332.59, color: 'from-amber-700 to-yellow-600', symbol: '♃', funFact: 'Jupiter is so massive that over 1,300 Earths could fit inside.' },
    { planet: 'Saturn', orbitalPeriodDays: 10759.22, color: 'from-yellow-600 to-stone-400', symbol: '♄', funFact: 'Saturn’s rings span 175,000 miles across but are only about 30 feet thick.' },
    { planet: 'Uranus', orbitalPeriodDays: 30685.4, color: 'from-cyan-500 to-teal-400', symbol: '♅', funFact: 'Uranus has an extreme 98-degree axial tilt, spinning completely on its side.' },
    { planet: 'Neptune', orbitalPeriodDays: 60189.0, color: 'from-indigo-600 to-blue-500', symbol: '♆', funFact: 'Neptune possesses supersonic winds exceeding 1,200 miles per hour.' },
    { planet: 'Pluto', orbitalPeriodDays: 90560.0, color: 'from-slate-600 to-zinc-400', symbol: '♇', funFact: 'It takes Pluto 248 Earth years to complete a single trip around the Sun.' },
  ];

  return planets.map((p) => {
    const ageOnPlanet = Number((diffDays / p.orbitalPeriodDays).toFixed(2));
    const nextOrdinal = Math.floor(diffDays / p.orbitalPeriodDays) + 1;
    const daysToNext = nextOrdinal * p.orbitalPeriodDays - diffDays;
    const nextBday = new Date(now.getTime() + daysToNext * 86400000);

    return {
      planet: p.planet,
      orbitalPeriodDays: p.orbitalPeriodDays,
      ageOnPlanet,
      nextBirthdayEarthDate: `${MONTH_NAMES[nextBday.getMonth()].slice(0, 3)} ${nextBday.getDate()}, ${nextBday.getFullYear()}`,
      daysToNextBirthday: Math.max(0, Math.ceil(daysToNext)),
      accentColor: p.color,
      symbol: p.symbol,
      funFact: p.funFact,
    };
  });
}

export function calculateCosmicBioStats(birthDate: Date | string, now: Date = new Date()): CosmicBioStats {
  const b = new Date(birthDate);
  const diffMs = isNaN(b.getTime()) ? 0 : Math.max(0, now.getTime() - b.getTime());
  const totalMinutes = diffMs / 60000;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;

  return {
    heartbeats: Math.floor(totalMinutes * 80),
    breaths: Math.floor(totalMinutes * 16),
    blinks: Math.floor(totalMinutes * (16 / 24) * 17),
    mealsEaten: Math.floor(totalDays * 3),
    sleepHours: Math.floor(totalDays * 8),
    sleepYears: Number((totalDays * 8 / (24 * 365.25)).toFixed(2)),
    sunDistanceMiles: Math.floor(totalHours * 67000),
    sunDistanceKm: Math.floor(totalHours * 107826),
    galaxyDistanceMiles: Math.floor(totalHours * 514000),
    galaxyDistanceKm: Math.floor(totalHours * 828000),
    earthRotations: Math.floor(totalDays),
  };
}

export function calculateMilestones(birthDate: Date | string, now: Date = new Date()): MilestoneItem[] {
  const b = new Date(birthDate);
  if (isNaN(b.getTime())) return [];

  const list: MilestoneItem[] = [
    { id: 'm-1', title: '1st Birthday (Toddlerhood)', category: 'age', targetValue: '1 Year', targetDate: new Date(b.getFullYear() + 1, b.getMonth(), b.getDate()).toISOString(), reached: false, daysRemaining: 0, description: 'First step into early childhood', icon: 'Baby' },
    { id: 'm-18', title: '18th Birthday (Adulthood)', category: 'age', targetValue: '18 Years', targetDate: new Date(b.getFullYear() + 18, b.getMonth(), b.getDate()).toISOString(), reached: false, daysRemaining: 0, description: 'Official legal milestone', icon: 'Award' },
    { id: 'm-25', title: 'Quarter Century (25 Years)', category: 'age', targetValue: '25 Years', targetDate: new Date(b.getFullYear() + 25, b.getMonth(), b.getDate()).toISOString(), reached: false, daysRemaining: 0, description: 'Prefrontal cortex fully developed', icon: 'Brain' },
    { id: 'm-50', title: 'Golden Half-Century (50 Years)', category: 'age', targetValue: '50 Years', targetDate: new Date(b.getFullYear() + 50, b.getMonth(), b.getDate()).toISOString(), reached: false, daysRemaining: 0, description: '50 laps completed around the Sun', icon: 'Crown' },
    { id: 'd-10k', title: '10,000 Days on Earth', category: 'days', targetValue: '10,000 Days', targetDate: new Date(b.getTime() + 10000 * 86400000).toISOString(), reached: false, daysRemaining: 0, description: 'Massive milestone at ~27.4 years', icon: 'Sparkles' },
    { id: 's-1b', title: '1 Billion Seconds (The Gigasecond)', category: 'seconds', targetValue: '1,000,000,000 Sec', targetDate: new Date(b.getTime() + 1000000000 * 1000).toISOString(), reached: false, daysRemaining: 0, description: 'Reached around 31.69 years old', icon: 'Clock' },
  ];

  return list.map((m) => {
    const t = new Date(m.targetDate);
    const reached = now.getTime() >= t.getTime();
    const daysRemaining = Math.max(0, Math.ceil((t.getTime() - now.getTime()) / 86400000));
    return { ...m, reached, daysRemaining: reached ? 0 : daysRemaining };
  });
}

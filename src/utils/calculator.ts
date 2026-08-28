import {
  ChronologicalAgeResult,
  NextBirthdayInfo,
  MilestoneItem,
  CosmicBioStats,
  PlanetaryAge,
  WesternZodiacSign,
  ChineseZodiacSign,
  GenerationCohort,
  AstrologyGenInsights,
  LifeGridStats,
  DateDifferenceResult
} from '../types';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

function formatSafeDateString(d: Date): string {
  if (!d || isNaN(d.getTime())) return '';
  const dayName = DAYS_OF_WEEK[d.getDay()] || 'Sunday';
  const monthName = MONTH_NAMES[d.getMonth()] || 'January';
  return `${dayName}, ${monthName} ${d.getDate()}, ${d.getFullYear()}`;
}

export function calculateChronologicalAge(
  birthDate: Date | string | number,
  targetDate: Date | string | number = new Date()
): ChronologicalAgeResult {
  const b = new Date(birthDate);
  const t = new Date(targetDate);

  // Safe fallback if dates are invalid
  if (isNaN(b.getTime()) || isNaN(t.getTime())) {
    const safeNow = new Date();
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      totalDays: 0,
      totalWeeks: 0,
      remainingDaysInWeek: 0,
      totalMonths: 0,
      remainingDaysInMonth: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      decimalAgeYears: 0,
      birthDayOfWeek: 'Unknown',
      isLeapYearBaby: false,
      isBirthdayToday: false,
      birthDateFormatted: '',
      targetDateFormatted: formatSafeDateString(safeNow),
    };
  }

  const isFuture = t.getTime() < b.getTime();
  const olderDate = isFuture ? t : b;
  const newerDate = isFuture ? b : t;

  const diffMs = newerDate.getTime() - olderDate.getTime();
  const absDiffMs = Math.max(0, diffMs);

  // Exact chronological calendar difference using robust month-by-month anchoring
  let years = newerDate.getFullYear() - olderDate.getFullYear();
  let anchor = new Date(
    olderDate.getFullYear() + years,
    olderDate.getMonth(),
    Math.min(olderDate.getDate(), 28),
    olderDate.getHours(),
    olderDate.getMinutes(),
    olderDate.getSeconds(),
    olderDate.getMilliseconds()
  );

  // Correct for actual day of month clamp
  const targetDay = olderDate.getDate();
  const daysInAnchorMonth = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0).getDate();
  anchor.setDate(Math.min(targetDay, daysInAnchorMonth));

  if (anchor > newerDate) {
    years--;
    anchor = new Date(
      olderDate.getFullYear() + years,
      olderDate.getMonth(),
      Math.min(targetDay, 28),
      olderDate.getHours(),
      olderDate.getMinutes(),
      olderDate.getSeconds(),
      olderDate.getMilliseconds()
    );
    const daysInPrevAnchor = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0).getDate();
    anchor.setDate(Math.min(targetDay, daysInPrevAnchor));
  }

  let months = 0;
  while (months < 12) {
    const nextYear = anchor.getFullYear() + Math.floor((anchor.getMonth() + 1) / 12);
    const nextMonth = (anchor.getMonth() + 1) % 12;
    const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
    const nextAnchor = new Date(
      nextYear,
      nextMonth,
      Math.min(targetDay, daysInNextMonth),
      olderDate.getHours(),
      olderDate.getMinutes(),
      olderDate.getSeconds(),
      olderDate.getMilliseconds()
    );

    if (nextAnchor <= newerDate) {
      months++;
      anchor = nextAnchor;
    } else {
      break;
    }
  }

  let diffRemMs = Math.max(0, newerDate.getTime() - anchor.getTime());
  const days = Math.floor(diffRemMs / (1000 * 60 * 60 * 24));
  diffRemMs %= (1000 * 60 * 60 * 24);

  const hours = Math.floor(diffRemMs / (1000 * 60 * 60));
  diffRemMs %= (1000 * 60 * 60);

  const minutes = Math.floor(diffRemMs / (1000 * 60));
  diffRemMs %= (1000 * 60);

  const seconds = Math.floor(diffRemMs / 1000);
  const milliseconds = diffRemMs % 1000;

  const totalDays = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDaysInWeek = totalDays % 7;
  const totalMonths = Math.max(0, years * 12 + months);
  const remainingDaysInMonth = days;
  const totalHours = Math.floor(absDiffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(absDiffMs / (1000 * 60));
  const totalSeconds = Math.floor(absDiffMs / 1000);
  const decimalAgeYears = Number((absDiffMs / (1000 * 60 * 60 * 24 * 365.2425)).toFixed(5));

  const birthDayOfWeek = DAYS_OF_WEEK[b.getDay()] || 'Sunday';

  const isLeapYearBaby = (b.getMonth() === 1 && b.getDate() === 29);
  const isBirthdayToday = (b.getMonth() === t.getMonth() && b.getDate() === t.getDate());

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    milliseconds: Math.max(0, milliseconds),
    totalDays,
    totalWeeks,
    remainingDaysInWeek,
    totalMonths,
    remainingDaysInMonth,
    totalHours,
    totalMinutes,
    totalSeconds,
    decimalAgeYears,
    birthDayOfWeek,
    isLeapYearBaby,
    isBirthdayToday,
    birthDateFormatted: formatSafeDateString(b),
    targetDateFormatted: formatSafeDateString(t),
  };
}

export function calculateNextBirthday(birthDate: Date, now: Date = new Date()): NextBirthdayInfo {
  const b = new Date(birthDate);
  const safeNow = new Date(now);

  if (isNaN(b.getTime()) || isNaN(safeNow.getTime())) {
    const fallbackDate = new Date();
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      nextBirthdayDate: fallbackDate.toLocaleDateString(),
      nextBirthdayDayOfWeek: 'Sunday',
      turningAge: 1,
      halfBirthdayDate: fallbackDate,
      daysToHalfBirthday: 0,
      upcomingBirthdays: [],
    };
  }

  const currentYear = safeNow.getFullYear();
  const birthMonth = b.getMonth();
  const birthDay = b.getDate();

  // Handle Feb 29 for non-leap years
  const getNextBdayForYear = (yr: number) => {
    const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || (yr % 400 === 0);
    const day = (birthMonth === 1 && birthDay === 29 && !isLeap) ? 28 : birthDay;
    return new Date(yr, birthMonth, day, b.getHours() || 0, b.getMinutes() || 0, b.getSeconds() || 0);
  };

  let nextBday = getNextBdayForYear(currentYear);
  if (nextBday.getTime() <= safeNow.getTime()) {
    nextBday = getNextBdayForYear(currentYear + 1);
  }

  const diffMs = Math.max(0, nextBday.getTime() - safeNow.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const turningAge = Math.max(0, nextBday.getFullYear() - b.getFullYear());
  const nextBirthdayDayOfWeek = DAYS_OF_WEEK[nextBday.getDay()] || 'Sunday';

  let halfBday = new Date(currentYear, birthMonth + 6, Math.min(birthDay, 28));
  if (halfBday.getTime() <= safeNow.getTime()) {
    halfBday = new Date(currentYear + 1, birthMonth + 6, Math.min(birthDay, 28));
  }
  const halfDiffMs = Math.max(0, halfBday.getTime() - safeNow.getTime());
  const daysToHalfBirthday = Math.floor(halfDiffMs / (1000 * 60 * 60 * 24));

  const upcomingBirthdays = [];
  const startYear = nextBday.getFullYear();
  for (let y = startYear; y < startYear + 7; y++) {
    const d = getNextBdayForYear(y);
    const dayName = DAYS_OF_WEEK[d.getDay()] || 'Sunday';
    const monthShort = MONTH_NAMES[d.getMonth()]?.slice(0, 3) || 'Jan';
    upcomingBirthdays.push({
      year: y,
      date: `${monthShort} ${d.getDate()}, ${y}`,
      dayOfWeek: dayName,
      age: Math.max(0, y - b.getFullYear()),
    });
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    nextBirthdayDate: nextBday.toLocaleDateString(),
    nextBirthdayDayOfWeek,
    turningAge,
    halfBirthdayDate: halfBday,
    daysToHalfBirthday,
    upcomingBirthdays,
  };
}

export function calculateMilestones(birthDate: Date, now: Date = new Date()): MilestoneItem[] {
  const b = new Date(birthDate);
  const safeNow = new Date(now);
  if (isNaN(b.getTime())) return [];

  const milestones: MilestoneItem[] = [];

  const keyAges = [
    { age: 1, title: '1st Birthday (Toddlerhood)', desc: 'First milestone of life', icon: 'Baby' },
    { age: 10, title: '10 Years Old (A Decade)', desc: 'Double digit age milestone', icon: 'Sparkles' },
    { age: 16, title: 'Sweet 16 (Sweet Sixteen)', desc: 'Youth milestone & driving age', icon: 'Key' },
    { age: 18, title: '18 Years Old (Legal Adulthood)', desc: 'Official transition to adulthood', icon: 'Award' },
    { age: 21, title: '21 Years Old (Full Majority)', desc: 'Worldwide milestone of young adulthood', icon: 'PartyPopper' },
    { age: 25, title: 'Quarter Century (25 Years)', desc: 'Brain prefrontal cortex fully matured', icon: 'Brain' },
    { age: 30, title: 'Flirty 30 (3 Decades)', desc: 'Thriving in your thirties', icon: 'Flame' },
    { age: 40, title: 'Fabulous 40 (4 Decades)', desc: 'Life begins at forty', icon: 'Zap' },
    { age: 50, title: 'Golden 50 (Half Century)', desc: '50 laps around the Sun celebrated', icon: 'Crown' },
    { age: 60, title: 'Diamond 60 (6 Decades)', desc: 'Rich life wisdom and accomplishments', icon: 'Gem' },
    { age: 65, title: 'Retirement Age (65 Years)', desc: 'Traditional golden retirement phase', icon: 'Sun' },
    { age: 75, title: 'Platinum 75 (7.5 Decades)', desc: 'Three quarters of a century of memories', icon: 'Compass' },
    { age: 100, title: 'Centenarian (100 Years)', desc: 'A full century of human experience', icon: 'Trophy' },
  ];

  keyAges.forEach(m => {
    const targetDate = new Date(b.getFullYear() + m.age, b.getMonth(), b.getDate(), b.getHours(), b.getMinutes());
    const reached = safeNow.getTime() >= targetDate.getTime();
    const daysRemaining = Math.max(0, Math.ceil((targetDate.getTime() - safeNow.getTime()) / (1000 * 60 * 60 * 24)));
    milestones.push({
      id: `age-${m.age}`,
      title: m.title,
      category: 'age',
      targetValue: `${m.age} Years`,
      targetDate,
      reached,
      daysRemaining: reached ? 0 : daysRemaining,
      description: m.desc,
      badge: `${m.age} yr`,
      icon: m.icon,
    });
  });

  const dayCounts = [
    { days: 1000, title: '1,000 Days Alive', desc: 'About 2.74 years of existence', icon: 'Calendar' },
    { days: 5000, title: '5,000 Days on Earth', desc: 'About 13.7 years lived', icon: 'Calendar' },
    { days: 10000, title: '10,000 Days Milestone', desc: 'About 27.4 years - A massive 10k days!', icon: 'Star' },
    { days: 15000, title: '15,000 Days on Earth', desc: 'About 41.1 years lived', icon: 'Star' },
    { days: 20000, title: '20,000 Days Milestone', desc: 'About 54.8 years lived', icon: 'Medal' },
    { days: 25000, title: '25,000 Days of Life', desc: 'About 68.5 years of journeying the earth', icon: 'Medal' },
    { days: 30000, title: '30,000 Days of Wisdom', desc: 'About 82.1 years lived', icon: 'Award' },
  ];

  dayCounts.forEach(m => {
    const targetDate = new Date(b.getTime() + m.days * 24 * 60 * 60 * 1000);
    const reached = safeNow.getTime() >= targetDate.getTime();
    const daysRemaining = Math.max(0, Math.ceil((targetDate.getTime() - safeNow.getTime()) / (1000 * 60 * 60 * 24)));
    milestones.push({
      id: `days-${m.days}`,
      title: m.title,
      category: 'days',
      targetValue: `${m.days.toLocaleString()} Days`,
      targetDate,
      reached,
      daysRemaining: reached ? 0 : daysRemaining,
      description: m.desc,
      badge: `${(m.days / 1000).toFixed(0)}k Days`,
      icon: m.icon,
    });
  });

  const secondCounts = [
    { seconds: 100000000, label: '100 Million Seconds', desc: 'Reached at ~3.17 years old' },
    { seconds: 500000000, label: '500 Million Seconds', desc: 'Reached at ~15.85 years old' },
    { seconds: 1000000000, label: '1 BILLION Seconds 🎉', desc: 'Reached at ~31.69 years old - The Gigasecond!' },
    { seconds: 1500000000, label: '1.5 Billion Seconds', desc: 'Reached at ~47.53 years old' },
    { seconds: 2000000000, label: '2 BILLION Seconds', desc: 'Reached at ~63.38 years old' },
    { seconds: 2500000000, label: '2.5 Billion Seconds', desc: 'Reached at ~79.22 years old' },
    { seconds: 3000000000, label: '3 BILLION Seconds', desc: 'Reached at ~95.06 years old' },
  ];

  secondCounts.forEach(m => {
    const targetDate = new Date(b.getTime() + m.seconds * 1000);
    const reached = safeNow.getTime() >= targetDate.getTime();
    const daysRemaining = Math.max(0, Math.ceil((targetDate.getTime() - safeNow.getTime()) / (1000 * 60 * 60 * 24)));
    milestones.push({
      id: `sec-${m.seconds}`,
      title: m.label,
      category: 'seconds',
      targetValue: `${(m.seconds / 1e9 >= 1 ? (m.seconds / 1e9) + 'B' : (m.seconds / 1e6) + 'M')} Sec`,
      targetDate,
      reached,
      daysRemaining: reached ? 0 : daysRemaining,
      description: m.desc,
      badge: 'Time',
      icon: 'Clock',
    });
  });

  return milestones.sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());
}

export function calculateCosmicBioStats(birthDate: Date, now: Date = new Date()): CosmicBioStats {
  const b = new Date(birthDate);
  const safeNow = new Date(now);
  const diffMs = isNaN(b.getTime()) ? 0 : Math.max(0, safeNow.getTime() - b.getTime());
  const totalMinutes = diffMs / (1000 * 60);
  const totalHours = diffMs / (1000 * 60 * 60);
  const totalDays = diffMs / (1000 * 60 * 60 * 24);

  const heartbeats = Math.floor(totalMinutes * 80);
  const breaths = Math.floor(totalMinutes * 16);
  const awakeMinutes = totalMinutes * (16 / 24);
  const blinks = Math.floor(awakeMinutes * 17);
  const mealsEaten = Math.floor(totalDays * 3);
  const sleepHours = Math.floor(totalDays * 8);
  const sleepYears = Number((sleepHours / (24 * 365.25)).toFixed(2));
  const sunDistanceMiles = Math.floor(totalHours * 67000);
  const sunDistanceKm = Math.floor(totalHours * 107826);
  const galaxyDistanceMiles = Math.floor(totalHours * 514000);
  const galaxyDistanceKm = Math.floor(totalHours * 828000);
  const earthRotations = Math.floor(totalDays);

  return {
    heartbeats,
    breaths,
    blinks,
    mealsEaten,
    sleepHours,
    sleepYears,
    sunDistanceMiles,
    sunDistanceKm,
    galaxyDistanceMiles,
    galaxyDistanceKm,
    earthRotations,
  };
}

export function calculatePlanetaryAges(birthDate: Date, now: Date = new Date()): PlanetaryAge[] {
  const b = new Date(birthDate);
  const safeNow = new Date(now);
  const diffDays = isNaN(b.getTime()) ? 0 : Math.max(0, (safeNow.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));

  const planetsData = [
    {
      planet: 'Mercury',
      orbitalPeriodDays: 87.97,
      color: 'from-amber-600 to-orange-400',
      accentColor: '#f59e0b',
      symbol: '☿',
      funFact: 'A year on Mercury is shorter than a single day on Mercury (which lasts 176 Earth days)!',
    },
    {
      planet: 'Venus',
      orbitalPeriodDays: 224.7,
      color: 'from-yellow-500 to-amber-300',
      accentColor: '#eab308',
      symbol: '♀',
      funFact: 'Venus spins backwards compared to most other planets, so the Sun rises in the west.',
    },
    {
      planet: 'Earth',
      orbitalPeriodDays: 365.25,
      color: 'from-blue-600 to-emerald-400',
      accentColor: '#3b82f6',
      symbol: '🜨',
      funFact: 'Our home planet travels at 67,000 mph through space as it orbits the Sun.',
    },
    {
      planet: 'Mars',
      orbitalPeriodDays: 686.98,
      color: 'from-red-600 to-orange-500',
      accentColor: '#ef4444',
      symbol: '♂',
      funFact: 'Mars is home to Olympus Mons, the tallest known volcano in the entire solar system (3x Everest).',
    },
    {
      planet: 'Jupiter',
      orbitalPeriodDays: 4332.59,
      color: 'from-amber-700 to-yellow-600',
      accentColor: '#d97706',
      symbol: '♃',
      funFact: 'Jupiter is so massive that more than 1,300 Earths could fit inside it.',
    },
    {
      planet: 'Saturn',
      orbitalPeriodDays: 10759.22,
      color: 'from-yellow-600 to-stone-400',
      accentColor: '#ca8a04',
      symbol: '♄',
      funFact: 'Saturn’s rings are made of billions of chunks of ice and rock, some as small as dust particles.',
    },
    {
      planet: 'Uranus',
      orbitalPeriodDays: 30685.4,
      color: 'from-cyan-500 to-teal-400',
      accentColor: '#06b6d4',
      symbol: '♅',
      funFact: 'Uranus rotates completely on its side with an axial tilt of 98 degrees.',
    },
    {
      planet: 'Neptune',
      orbitalPeriodDays: 60189.0,
      color: 'from-indigo-600 to-blue-500',
      accentColor: '#6366f1',
      symbol: '♆',
      funFact: 'Neptune has the fastest supersonic winds in the solar system, reaching up to 1,200 mph.',
    },
    {
      planet: 'Pluto',
      orbitalPeriodDays: 90560.0,
      color: 'from-slate-600 to-zinc-400',
      accentColor: '#64748b',
      symbol: '♇',
      funFact: 'It takes Pluto 248 Earth years to complete a single trip around the Sun!',
    },
  ];

  return planetsData.map(p => {
    const ageOnPlanet = Number((diffDays / p.orbitalPeriodDays).toFixed(2));
    const nextPlanetBdayOrdinal = Math.floor(diffDays / p.orbitalPeriodDays) + 1;
    const daysToNext = (nextPlanetBdayOrdinal * p.orbitalPeriodDays) - diffDays;
    const nextBdayEarthDate = new Date(safeNow.getTime() + daysToNext * 24 * 60 * 60 * 1000);

    return {
      planet: p.planet,
      orbitalPeriodDays: p.orbitalPeriodDays,
      ageOnPlanet,
      nextBirthdayEarthDate: nextBdayEarthDate.toLocaleDateString(),
      daysToNextBirthday: Math.max(0, Math.ceil(daysToNext)),
      daysToOextBirthday: Math.max(0, Math.ceil(daysToNext)),
      color: p.color,
      accentColor: p.accentColor,
      symbol: p.symbol,
      funFact: p.funFact,
    };
  });
}

export function calculateWesternZodiac(birthDate: Date): WesternZodiacSign {
  const b = new Date(birthDate);
  const month = isNaN(b.getTime()) ? 5 : b.getMonth() + 1;
  const day = isNaN(b.getTime()) ? 20 : b.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return {
      sign: 'Aries',
      symbol: '♈',
      element: 'Fire',
      dates: 'Mar 21 - Apr 19',
      ruler: 'Mars',
      quality: 'Cardinal',
      traits: ['Bold', 'Energetic', 'Pioneering', 'Passionate', 'Confident'],
      luckyNumbers: [1, 9, 18],
      luckyColor: 'Red',
    };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return {
      sign: 'Taurus',
      symbol: '♉',
      element: 'Earth',
      dates: 'Apr 20 - May 20',
      ruler: 'Venus',
      quality: 'Fixed',
      traits: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Sensual'],
      luckyNumbers: [2, 6, 15],
      luckyColor: 'Emerald Green',
    };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return {
      sign: 'Gemini',
      symbol: '♊',
      element: 'Air',
      dates: 'May 21 - Jun 20',
      ruler: 'Mercury',
      quality: 'Mutable',
      traits: ['Adaptable', 'Curious', 'Witty', 'Eloquent', 'Quick-minded'],
      luckyNumbers: [3, 5, 12],
      luckyColor: 'Yellow',
    };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return {
      sign: 'Cancer',
      symbol: '♋',
      element: 'Water',
      dates: 'Jun 21 - Jul 22',
      ruler: 'Moon',
      quality: 'Cardinal',
      traits: ['Intuitive', 'Protective', 'Empathetic', 'Loyal', 'Imaginative'],
      luckyNumbers: [2, 7, 16],
      luckyColor: 'Silver & White',
    };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return {
      sign: 'Leo',
      symbol: '♌',
      element: 'Fire',
      dates: 'Jul 23 - Aug 22',
      ruler: 'Sun',
      quality: 'Fixed',
      traits: ['Charismatic', 'Generous', 'Warm-hearted', 'Leader', 'Creative'],
      luckyNumbers: [1, 4, 19],
      luckyColor: 'Gold',
    };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return {
      sign: 'Virgo',
      symbol: '♍',
      element: 'Earth',
      dates: 'Aug 23 - Sep 22',
      ruler: 'Mercury',
      quality: 'Mutable',
      traits: ['Analytical', 'Meticulous', 'Helpful', 'Reliable', 'Observant'],
      luckyNumbers: [5, 14, 23],
      luckyColor: 'Navy Blue & Forest Green',
    };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return {
      sign: 'Libra',
      symbol: '♎',
      element: 'Air',
      dates: 'Sep 23 - Oct 22',
      ruler: 'Venus',
      quality: 'Cardinal',
      traits: ['Diplomatic', 'Charming', 'Fair-minded', 'Harmonious', 'Artistic'],
      luckyNumbers: [6, 15, 24],
      luckyColor: 'Pastel Pink & Sky Blue',
    };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return {
      sign: 'Scorpio',
      symbol: '♏',
      element: 'Water',
      dates: 'Oct 23 - Nov 21',
      ruler: 'Pluto & Mars',
      quality: 'Fixed',
      traits: ['Passionate', 'Resourceful', 'Brave', 'Perceptive', 'Magnetic'],
      luckyNumbers: [8, 11, 29],
      luckyColor: 'Crimson & Black',
    };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return {
      sign: 'Sagittarius',
      symbol: '♐',
      element: 'Fire',
      dates: 'Nov 22 - Dec 21',
      ruler: 'Jupiter',
      quality: 'Mutable',
      traits: ['Optimistic', 'Adventurous', 'Philosophical', 'Generous', 'Free-spirited'],
      luckyNumbers: [3, 9, 21],
      luckyColor: 'Purple',
    };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return {
      sign: 'Capricorn',
      symbol: '♑',
      element: 'Earth',
      dates: 'Dec 22 - Jan 19',
      ruler: 'Saturn',
      quality: 'Cardinal',
      traits: ['Disciplined', 'Ambitious', 'Strategic', 'Patient', 'Tenacious'],
      luckyNumbers: [4, 8, 22],
      luckyColor: 'Charcoal & Earth Brown',
    };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return {
      sign: 'Aquarius',
      symbol: '♒',
      element: 'Air',
      dates: 'Jan 20 - Feb 18',
      ruler: 'Uranus & Saturn',
      quality: 'Fixed',
      traits: ['Visionary', 'Original', 'Humanitarian', 'Independent', 'Inventive'],
      luckyNumbers: [7, 11, 27],
      luckyColor: 'Electric Blue',
    };
  } else {
    return {
      sign: 'Pisces',
      symbol: '♓',
      element: 'Water',
      dates: 'Feb 19 - Mar 20',
      ruler: 'Neptune & Jupiter',
      quality: 'Mutable',
      traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Dreamy'],
      luckyNumbers: [3, 9, 18],
      luckyColor: 'Sea Green & Aquamarine',
    };
  }
}

export function calculateChineseZodiac(birthDate: Date): ChineseZodiacSign {
  const b = new Date(birthDate);
  const rawYear = isNaN(b.getTime()) ? 1998 : b.getFullYear();
  const year = isNaN(rawYear) ? 1998 : rawYear;

  const animals = [
    { name: 'Rat', traits: ['Clever', 'Charming', 'Resourceful', 'Sociable'], comp: ['Dragon', 'Monkey', 'Ox'] },
    { name: 'Ox', traits: ['Steadfast', 'Dependable', 'Methodical', 'Patient'], comp: ['Rat', 'Snake', 'Rooster'] },
    { name: 'Tiger', traits: ['Brave', 'Confident', 'Charismatic', 'Dynamic'], comp: ['Horse', 'Dog', 'Pig'] },
    { name: 'Rabbit', traits: ['Gentle', 'Elegant', 'Diplomatic', 'Kind'], comp: ['Goat', 'Pig', 'Dog'] },
    { name: 'Dragon', traits: ['Powerful', 'Energetic', 'Fearless', 'Noble'], comp: ['Rooster', 'Monkey', 'Rat'] },
    { name: 'Snake', traits: ['Wise', 'Intuitive', 'Enigmatic', 'Refined'], comp: ['Ox', 'Rooster', 'Monkey'] },
    { name: 'Horse', traits: ['Energetic', 'Independent', 'Warm-hearted', 'Free'], comp: ['Tiger', 'Goat', 'Dog'] },
    { name: 'Goat', traits: ['Gentle', 'Compassionate', 'Creative', 'Peaceful'], comp: ['Rabbit', 'Horse', 'Pig'] },
    { name: 'Monkey', traits: ['Witty', 'Inventive', 'Inquisitive', 'Playful'], comp: ['Rat', 'Dragon', 'Snake'] },
    { name: 'Rooster', traits: ['Observant', 'Hardworking', 'Courageous', 'Talented'], comp: ['Ox', 'Snake', 'Dragon'] },
    { name: 'Dog', traits: ['Loyal', 'Honest', 'Sincere', 'Protective'], comp: ['Tiger', 'Rabbit', 'Horse'] },
    { name: 'Pig', traits: ['Generous', 'Honest', 'Diligent', 'Compassionate'], comp: ['Tiger', 'Rabbit', 'Goat'] },
  ];

  const animalIndex = Math.abs(((year - 1900) % 12 + 12) % 12);
  const animal = animals[animalIndex] || animals[0];

  const lastDigit = Math.abs(year % 10);
  let element = 'Metal';
  if (lastDigit === 2 || lastDigit === 3) element = 'Water';
  else if (lastDigit === 4 || lastDigit === 5) element = 'Wood';
  else if (lastDigit === 6 || lastDigit === 7) element = 'Fire';
  else if (lastDigit === 8 || lastDigit === 9) element = 'Earth';

  const yinYang: 'Yin' | 'Yang' = (year % 2 === 0) ? 'Yang' : 'Yin';
  const luckyNumbers = [(animalIndex * 3 + 2) % 9 + 1, (animalIndex * 7 + 5) % 9 + 1];

  return {
    animal: animal.name,
    element,
    yinYang,
    luckyNumbers,
    traits: animal.traits,
    complementaryAnimals: animal.comp,
  };
}

export function calculateGeneration(birthDate: Date): GenerationCohort {
  const b = new Date(birthDate);
  const year = isNaN(b.getTime()) ? 1998 : b.getFullYear();

  if (year <= 1927) {
    return {
      name: 'Greatest Generation',
      range: '1901 – 1927',
      eraTagline: 'Architects of Modern Resilience',
      definingCharacteristics: ['Endured the Great Depression', 'World War II heroism', 'Frugality and high civic duty'],
      iconicTech: 'Radio, Assembly Line, Telephone',
    };
  } else if (year <= 1945) {
    return {
      name: 'Silent Generation',
      range: '1928 – 1945',
      eraTagline: 'The Traditional Builders',
      definingCharacteristics: ['Hard-working', 'Loyal to institutions', 'Quiet determination and high savings'],
      iconicTech: 'Transistor Radio, Black & White TV, LP Records',
    };
  } else if (year <= 1964) {
    return {
      name: 'Baby Boomers',
      range: '1946 – 1964',
      eraTagline: 'The Post-War Optimists & Trailblazers',
      definingCharacteristics: ['Optimism', 'Strong work ethic', 'Cultural revolutions and rock and roll'],
      iconicTech: 'Color Television, Cassette Tapes, Mainframe Computers',
    };
  } else if (year <= 1980) {
    return {
      name: 'Generation X',
      range: '1965 – 1980',
      eraTagline: 'The Self-Reliant Bridge Generation',
      definingCharacteristics: ['Independent', 'Resourceful', 'Pioneers of the analog-to-digital transition'],
      iconicTech: 'Personal Computers, MTV, Walkman, Floppy Disks',
    };
  } else if (year <= 1996) {
    return {
      name: 'Millennials (Gen Y)',
      range: '1981 – 1996',
      eraTagline: 'The Digital Pioneers',
      definingCharacteristics: ['Tech-savvy', 'Purpose-driven', 'Valuing experiences over possessions'],
      iconicTech: 'The World Wide Web, Smartphones, MP3s, Social Media',
    };
  } else if (year <= 2012) {
    return {
      name: 'Generation Z',
      range: '1997 – 2012',
      eraTagline: 'The True Digital Natives',
      definingCharacteristics: ['Mobile-first', 'Socially conscious', 'Entrepreneurial and authentic'],
      iconicTech: 'Touchscreens, Streaming, AI, TikTok, 5G',
    };
  } else {
    return {
      name: 'Generation Alpha',
      range: '2013 – 2025+',
      eraTagline: 'The AI & Spatial Generation',
      definingCharacteristics: ['AI-immersed from infancy', 'Hyper-connected global view', 'Smart devices integration'],
      iconicTech: 'Generative AI, Autonomous Systems, VR/AR, Smart Assistants',
    };
  }
}

export function getBirthstone(monthIndex: number): { name: string; color: string; meaning: string } {
  const stones = [
    { name: 'Garnet', color: '#991b1b', meaning: 'Protection, strength, and vitality' },
    { name: 'Amethyst', color: '#7e22ce', meaning: 'Clarity, calm, and inner peace' },
    { name: 'Aquamarine', color: '#06b6d4', meaning: 'Courage, serenity, and harmony' },
    { name: 'Diamond', color: '#e0f2fe', meaning: 'Invincibility, purity, and eternal love' },
    { name: 'Emerald', color: '#059669', meaning: 'Rebirth, wisdom, and flourishing luck' },
    { name: 'Pearl / Alexandrite', color: '#f1f5f9', meaning: 'Intuition, balance, and natural elegance' },
    { name: 'Ruby', color: '#dc2626', meaning: 'Passion, energy, and noble heart' },
    { name: 'Peridot', color: '#84cc16', meaning: 'Joy, warmth, and renewed inspiration' },
    { name: 'Sapphire', color: '#1d4ed8', meaning: 'Loyalty, truth, and profound wisdom' },
    { name: 'Opal / Tourmaline', color: '#f472b6', meaning: 'Hope, creativity, and vibrant expression' },
    { name: 'Topaz / Citrine', color: '#f59e0b', meaning: 'Affection, optimism, and abundance' },
    { name: 'Tanzanite / Turquoise', color: '#0284c7', meaning: 'Transformation, peace, and good fortune' },
  ];
  const idx = isNaN(monthIndex) ? 0 : Math.max(0, Math.min(11, monthIndex));
  return stones[idx] || stones[0];
}

export function getBirthFlower(monthIndex: number): { name: string; meaning: string } {
  const flowers = [
    { name: 'Carnation & Snowdrop', meaning: 'Admiration, pure love, and rebirth' },
    { name: 'Violet & Primrose', meaning: 'Modesty, faithfulness, and virtue' },
    { name: 'Daffodil & Jonquil', meaning: 'New beginnings, prosperity, and joy' },
    { name: 'Daisy & Sweet Pea', meaning: 'Innocence, blissful pleasure, and cheer' },
    { name: 'Lily of the Valley & Hawthorn', meaning: 'Sweetness, happiness, and hope' },
    { name: 'Rose & Honeysuckle', meaning: 'Deep romance, devotion, and elegance' },
    { name: 'Larkspur & Water Lily', meaning: 'Open heart, positivity, and grace' },
    { name: 'Gladiolus & Poppy', meaning: 'Strength of character, integrity, and remembrance' },
    { name: 'Aster & Morning Glory', meaning: 'Spreading love, faith, and patience' },
    { name: 'Marigold & Cosmos', meaning: 'Warmth, passion, and peaceful harmony' },
    { name: 'Chrysanthemum', meaning: 'Joy, longevity, and loyal friendship' },
    { name: 'Narcissus & Poinsettia', meaning: 'Good fortune, celebration, and hope' },
  ];
  const idx = isNaN(monthIndex) ? 0 : Math.max(0, Math.min(11, monthIndex));
  return flowers[idx] || flowers[0];
}

export function getDayOfWeekPoem(dayIndex: number): { day: string; rhymeLine: string; characteristics: string } {
  const poems = [
    {
      day: 'Sunday',
      rhymeLine: 'Bonny and blithe, and good and gay',
      characteristics: 'Blessed with good cheer, radiant energy, and a joyous generous spirit.',
    },
    {
      day: 'Monday',
      rhymeLine: 'Fair of face',
      characteristics: 'Blessed with natural beauty, charisma, and keen artistic sensitivity.',
    },
    {
      day: 'Tuesday',
      rhymeLine: 'Full of grace',
      characteristics: 'Blessed with elegance, natural poise, and graceful charm under pressure.',
    },
    {
      day: 'Wednesday',
      rhymeLine: 'Full of woe',
      characteristics: 'Deeply empathetic, feeling the pulse of the world with profound resilience.',
    },
    {
      day: 'Thursday',
      rhymeLine: 'Has far to go',
      characteristics: 'Destined for great travels, lofty heights, and lifelong worldly success.',
    },
    {
      day: 'Friday',
      rhymeLine: 'Loving and giving',
      characteristics: 'Endowed with deep generosity, boundless warmth, and a great capacity to love.',
    },
    {
      day: 'Saturday',
      rhymeLine: 'Works hard for a living',
      characteristics: 'Grounded, disciplined, fiercely dedicated, and always achieving their ambitions.',
    },
  ];
  const idx = isNaN(dayIndex) ? 0 : Math.max(0, Math.min(6, dayIndex));
  return poems[idx] || poems[0];
}

export function calculateAstrologyGenInsights(birthDate: Date): AstrologyGenInsights {
  const b = new Date(birthDate);
  const safeDate = isNaN(b.getTime()) ? new Date(1998, 4, 20) : b;
  const westernZodiac = calculateWesternZodiac(safeDate);
  const chineseZodiac = calculateChineseZodiac(safeDate);
  const generation = calculateGeneration(safeDate);
  const birthstone = getBirthstone(safeDate.getMonth());
  const birthFlower = getBirthFlower(safeDate.getMonth());
  const dayOfWeekPoem = getDayOfWeekPoem(safeDate.getDay());

  return {
    westernZodiac,
    chineseZodiac,
    generation,
    birthstone,
    birthFlower,
    dayOfWeekPoem,
  };
}

export function calculateLifeGridStats(
  birthDate: Date,
  now: Date = new Date(),
  lifeExpectancyYears: number = 90
): LifeGridStats {
  const b = new Date(birthDate);
  const safeNow = new Date(now);
  const safeExpectancy = Math.max(10, Math.min(120, lifeExpectancyYears || 90));
  const totalWeeks = Math.round(safeExpectancy * 52.1775);

  const diffMs = isNaN(b.getTime()) ? 0 : Math.max(0, safeNow.getTime() - b.getTime());
  const weeksLived = Math.min(totalWeeks, Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)));
  const weeksRemaining = Math.max(0, totalWeeks - weeksLived);
  const percentLived = totalWeeks > 0 ? Number(((weeksLived / totalWeeks) * 100).toFixed(1)) : 0;

  const yearsLived = weeksLived / 52.1775;
  let currentStage = 'Early Childhood (0-4)';
  if (yearsLived >= 80) currentStage = 'Elder Wisdom Era (80+)';
  else if (yearsLived >= 65) currentStage = 'Golden Retirement (65-79)';
  else if (yearsLived >= 50) currentStage = 'Mastery & Leadership (50-64)';
  else if (yearsLived >= 35) currentStage = 'Prime Productivity (35-49)';
  else if (yearsLived >= 25) currentStage = 'Career & Independence (25-34)';
  else if (yearsLived >= 18) currentStage = 'Young Adulthood & Exploration (18-24)';
  else if (yearsLived >= 12) currentStage = 'Adolescence & Secondary School (12-17)';
  else if (yearsLived >= 5) currentStage = 'Primary School & Growth (5-11)';

  return {
    lifeExpectancyYears: safeExpectancy,
    totalWeeks,
    weeksLived,
    weeksRemaining,
    percentLived,
    currentStage,
  };
}

export function calculateDateDifference(dateA: Date | string, dateB: Date | string): DateDifferenceResult {
  const dA = new Date(dateA);
  const dB = new Date(dateB);

  if (isNaN(dA.getTime()) || isNaN(dB.getTime())) {
    return {
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      olderPerson: 'Person 1',
      percentageDifference: 0,
      doubleAgeDate: null,
    };
  }

  const isAOlder = dA.getTime() < dB.getTime();
  const olderDate = isAOlder ? dA : dB;
  const youngerDate = isAOlder ? dB : dA;
  const olderPerson = isAOlder ? 'Person 1' : 'Person 2';

  const diffMs = Math.max(0, youngerDate.getTime() - olderDate.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);

  let years = youngerDate.getFullYear() - olderDate.getFullYear();
  let months = youngerDate.getMonth() - olderDate.getMonth();
  let days = youngerDate.getDate() - olderDate.getDate();
  let hours = youngerDate.getHours() - olderDate.getHours();
  let minutes = youngerDate.getMinutes() - olderDate.getMinutes();
  let seconds = youngerDate.getSeconds() - olderDate.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonthDate = new Date(youngerDate.getFullYear(), youngerDate.getMonth(), 0);
    days += prevMonthDate.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  const doubleAgeMs = youngerDate.getTime() + diffMs;
  const doubleAgeDate = diffMs > 0 ? new Date(doubleAgeMs) : null;

  const percentageDifference = Number(((diffMs / (olderDate.getTime() || 1)) * 100).toFixed(2));

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    totalSeconds,
    olderPerson,
    percentageDifference,
    doubleAgeDate,
  };
}

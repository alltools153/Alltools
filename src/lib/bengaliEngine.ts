import { BengaliDateInfo, MuhuratSlot, CalendarDayRecord } from '@/types/bengali';

const BENGALI_DIGITS: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

export function toBengaliDigits(num: number | string): string {
  return String(num).replace(/[0-9]/g, (d) => BENGALI_DIGITS[d] || d);
}

export const BENGALI_MONTHS = [
  { nameEn: 'Boishakh', nameBn: 'বৈশাখ', seasonBn: 'গ্রীষ্ম', days: 31 },
  { nameEn: 'Jyoishtho', nameBn: 'জ্যৈষ্ঠ', seasonBn: 'গ্রীষ্ম', days: 31 },
  { nameEn: 'Asharh', nameBn: 'আষাঢ়', seasonBn: 'বর্ষা', days: 31 },
  { nameEn: 'Srabon', nameBn: 'শ্রাবণ', seasonBn: 'বর্ষা', days: 31 },
  { nameEn: 'Bhadro', nameBn: 'ভাদ্র', seasonBn: 'শরৎ', days: 31 },
  { nameEn: 'Ashwin', nameBn: 'আশ্বিন', seasonBn: 'শরৎ', days: 30 },
  { nameEn: 'Kartik', nameBn: 'কার্তিক', seasonBn: 'হেমন্ত', days: 30 },
  { nameEn: 'Agrahayan', nameBn: 'অগ্রহায়ণ', seasonBn: 'হেমন্ত', days: 30 },
  { nameEn: 'Poush', nameBn: 'পৌষ', seasonBn: 'শীত', days: 30 },
  { nameEn: 'Magh', nameBn: 'মাঘ', seasonBn: 'শীত', days: 30 },
  { nameEn: 'Falgun', nameBn: 'ফাল্গুন', seasonBn: 'বসন্ত', days: 30 },
  { nameEn: 'Choitro', nameBn: 'চৈত্র', seasonBn: 'বসন্ত', days: 30 },
];

export const WEEKDAYS_BN = [
  { nameEn: 'Sunday', nameBn: 'রবিবার', shortBn: 'রবি', planetBn: 'সূর্য' },
  { nameEn: 'Monday', nameBn: 'সোমবার', shortBn: 'সোম', planetBn: 'চন্দ্র' },
  { nameEn: 'Tuesday', nameBn: 'মঙ্গলবার', shortBn: 'মঙ্গল', planetBn: 'মঙ্গল' },
  { nameEn: 'Wednesday', nameBn: 'বুধবার', shortBn: 'বুধ', planetBn: 'বুধ' },
  { nameEn: 'Thursday', nameBn: 'বৃহস্পতিবার', shortBn: 'বৃহঃ', planetBn: 'বৃহস্পতি' },
  { nameEn: 'Friday', nameBn: 'শুক্রবার', shortBn: 'শুক্র', planetBn: 'শুক্র' },
  { nameEn: 'Saturday', nameBn: 'শনিবার', shortBn: 'শনি', planetBn: 'শনি' },
];

export const TITHIS_BN = [
  'প্রতিপদ', 'দ্বিতীয়া', 'তৃতীয়া', 'চতুর্থী', 'পঞ্চমী',
  'ষষ্ঠী', 'সপ্তমী', 'অষ্টমী', 'নবমী', 'দশমী',
  'একাদশী', 'দ্বাদশী', 'ত্রয়োদশী', 'চতুর্দশী', 'পূর্ণিমা'
];

export const NAKSHATRAS_BN = [
  'অশ্বিনী', 'ভরণী', 'কৃত্তিকা', 'রোহিণী', 'মৃগশিরা', 'আর্দ্রা',
  'পুনর্বসু', 'পুষ্যা', 'অশ্লেষা', 'মঘা', 'পূর্বফল্গুনী', 'উত্তরফল্গুনী',
  'হস্তা', 'চিত্রা', 'স্বাতী', 'বিশাখা', 'অনুরাধা', 'জ্যেষ্ঠা',
  'মূলা', 'পূর্বাষাঢ়া', 'উত্তরাষাঢ়া', 'শ্রবণা', 'ধনিষ্ঠা', 'শতভিষা',
  'পূর্বভাদ্রপদ', 'উত্তরভাদ্রপদ', 'রেবতী'
];

export function getBengaliDate(date: Date = new Date()): BengaliDateInfo {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth();
  const gDay = date.getDate();
  const dayOfWeek = date.getDay();

  let bengaliYear = gYear - 593;
  let refYear = gYear;
  if (gMonth < 3 || (gMonth === 3 && gDay < 15)) {
    bengaliYear = gYear - 594;
    refYear = gYear - 1;
  }

  // Traditional Bengali Panjika month transitions (0 = Boishakh ... 11 = Choitro)
  const startDates = [
    new Date(refYear, 3, 15, 12, 0, 0), // Boishakh (Apr 15)
    new Date(refYear, 4, 16, 12, 0, 0), // Jyoishtho (May 16)
    new Date(refYear, 5, 16, 12, 0, 0), // Asharh (Jun 16)
    new Date(refYear, 6, 18, 12, 0, 0), // Srabon (Jul 18)
    new Date(refYear, 7, 18, 12, 0, 0), // Bhadro (Aug 18)
    new Date(refYear, 8, 18, 12, 0, 0), // Ashwin (Sep 18)
    new Date(refYear, 9, 18, 12, 0, 0), // Kartik (Oct 18)
    new Date(refYear, 10, 17, 12, 0, 0), // Agrahayan (Nov 17)
    new Date(refYear, 11, 17, 12, 0, 0), // Poush (Dec 17)
    new Date(refYear + 1, 0, 16, 12, 0, 0), // Magh (Jan 16)
    new Date(refYear + 1, 1, 15, 12, 0, 0), // Falgun (Feb 15)
    new Date(refYear + 1, 2, 16, 12, 0, 0), // Choitro (Mar 16)
  ];

  const currentNoon = new Date(gYear, gMonth, gDay, 12, 0, 0);

  let monthIndex = 11;
  for (let i = 0; i < 11; i++) {
    if (currentNoon < startDates[i + 1]) {
      monthIndex = i;
      break;
    }
  }

  const monthStart = startDates[monthIndex];
  const diffMs = currentNoon.getTime() - monthStart.getTime();
  const daysDiff = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const bengaliDay = daysDiff + 1;

  const monthInfo = BENGALI_MONTHS[monthIndex];
  const weekdayInfo = WEEKDAYS_BN[dayOfWeek];

  const yearBn = toBengaliDigits(bengaliYear);
  const dayBn = toBengaliDigits(bengaliDay);

  // 6-period Bengali time mapping
  const hour = date.getHours();
  let periodBn = 'রাত';
  if (hour >= 4 && hour < 6) periodBn = 'ভোর';
  else if (hour >= 6 && hour < 12) periodBn = 'সকাল';
  else if (hour >= 12 && hour < 16) periodBn = 'দুপুর';
  else if (hour >= 16 && hour < 18) periodBn = 'বিকেল';
  else if (hour >= 18 && hour < 20) periodBn = 'সন্ধ্যা';

  // Panchang approximate limbs
  const dayOfYear = Math.floor((date.getTime() - new Date(gYear, 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const tithiIndex = (dayOfYear * 2) % 30;
  const isShukla = tithiIndex < 15;
  const pakshaBn = isShukla ? 'শুক্লপক্ষ' : 'কৃষ্ণপক্ষ';
  const tithiBn = tithiIndex % 15 === 14 && !isShukla ? 'অমাবস্যা' : TITHIS_BN[tithiIndex % 15];
  const nakshatraBn = NAKSHATRAS_BN[(dayOfYear * 3) % 27];

  return {
    day: bengaliDay,
    dayBn,
    monthIndex,
    monthNameEn: monthInfo.nameEn,
    monthNameBn: monthInfo.nameBn,
    seasonBn: monthInfo.seasonBn,
    year: bengaliYear,
    yearBn,
    barEn: weekdayInfo.nameEn,
    barBn: weekdayInfo.nameBn,
    planetLordBn: weekdayInfo.planetBn,
    periodBn,
    tithiBn,
    pakshaBn,
    nakshatraBn,
    formattedBn: `${dayBn} ${monthInfo.nameBn}, ${yearBn} বঙ্গাব্দ (${weekdayInfo.nameBn})`,
    formattedEn: `${bengaliDay} ${monthInfo.nameEn}, ${bengaliYear} BS (${weekdayInfo.nameEn})`,
    sakabdo: gYear - 78,
    sakabdoBn: toBengaliDigits(gYear - 78),
  };
}

export function getBengaliMuhurats(): MuhuratSlot[] {
  return [
    {
      nameEn: 'Amrita Yoga',
      nameBn: 'অমৃতযোগ',
      isAuspicious: true,
      timeRange: 'সকাল ০৭:১৫ - ০৯:৩০',
      descriptionBn: 'সর্বকর্মে সিদ্ধিদায়ক পরম শুভ অমৃততুল্য সময়।',
    },
    {
      nameEn: 'Mahendra Yoga',
      nameBn: 'মাহেন্দ্রযোগ',
      isAuspicious: true,
      timeRange: 'দুপুর ০১:০০ - ০২:১৫',
      descriptionBn: 'ঐশ্বর্য ও বিজয়লাভের জন্য ইন্দ্রতুল্য শুভ লগ্ন।',
    },
    {
      nameEn: 'Abhijit Muhurat',
      nameBn: 'অভিজিৎ মুহূর্ত',
      isAuspicious: true,
      timeRange: 'বেলা ১১:৪৫ - ১২:৩৩',
      descriptionBn: 'শ্রীহরি বিষ্ণুর প্রিয় সর্বদোষ বিনাশকারী মধ্যাহ্ন মুহূর্ত।',
    },
    {
      nameEn: 'Brahma Muhurat',
      nameBn: 'ব্রহ্ম মুহূর্ত',
      isAuspicious: true,
      timeRange: 'ভোর ০৪:১৫ - ০৫:০৫',
      descriptionBn: 'ধ্যান ও বিদ্যারম্ভের জন্য সর্বশ্রেষ্ঠ পবিত্র সময়।',
    },
    {
      nameEn: 'Rahu Kalam',
      nameBn: 'রাহুকাল',
      isAuspicious: false,
      timeRange: 'বিকাল ০৩:১৫ - ০৪:৪৫',
      descriptionBn: 'রাহুর কুপ্রভাব যুক্ত সময়; নূতন চুক্তি ও যাত্রা বর্জনীয়।',
    },
    {
      nameEn: 'Bara Bela',
      nameBn: 'বারবেলা',
      isAuspicious: false,
      timeRange: 'সকাল ০৯:৩০ - ১১:০০',
      descriptionBn: 'বাংলার পঞ্জিকানুসারে বর্জনীয় সময়।',
    },
  ];
}

export function getBengaliMonthGrid(year: number, monthIndex: number): CalendarDayRecord[] {
  const monthInfo = BENGALI_MONTHS[monthIndex % 12];
  const totalDays = monthInfo.days;

  const approxGYear = monthIndex >= 8 ? year + 594 : year + 593;
  const approxGMonth = (monthIndex + 3) % 12;
  const baseDate = new Date(approxGYear, approxGMonth, 14);

  const days: CalendarDayRecord[] = [];
  for (let d = 1; d <= totalDays; d++) {
    const curDate = new Date(baseDate.getTime() + (d - 1) * 86400000);
    const bInfo = getBengaliDate(curDate);
    days.push({
      bengaliDay: d,
      bengaliDayBn: toBengaliDigits(d),
      gregorianDateStr: curDate.toISOString().slice(0, 10),
      gregorianDay: curDate.getDate(),
      weekdayBn: WEEKDAYS_BN[curDate.getDay()].shortBn,
      tithiBn: bInfo.tithiBn,
      nakshatraBn: bInfo.nakshatraBn,
      isSunday: curDate.getDay() === 0,
    });
  }
  return days;
}

import { BengaliDateInfo, MuhuratSlot, CalendarDayRecord } from '@/types/bengali';
import {
  getBengaliDate as getPanjikaBengaliDate,
  getDayPanjika,
  getZonedCalendarDate,
  bengaliToGregorianDate,
} from './panjikaEngine';
import {
  BENGALI_MONTHS as PANJIKA_MONTHS,
  WEEKDAYS,
  toBengaliDigits as panjikaToBengaliDigits,
} from './constants/panjikaData';
import { getBengaliTimePeriod } from './bengaliNumerals';

export const toBengaliDigits = panjikaToBengaliDigits;

export const BENGALI_MONTHS = PANJIKA_MONTHS.map((m) => ({
  nameEn: m.nameEn,
  nameBn: m.nameBn,
  seasonBn: m.seasonBn,
  days: m.days,
}));

export const WEEKDAYS_BN = WEEKDAYS.map((w) => ({
  nameEn: w.nameEn,
  nameBn: w.nameBn,
  shortBn: w.shortBn,
  planetBn: w.planetLordBn,
}));

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

/**
 * Centralized Bengali Date calculation delegating to panjikaEngine with IST (Asia/Kolkata) timezone.
 */
export function getBengaliDate(dateInput: Date | string | number = new Date()): BengaliDateInfo {
  const panjika = getDayPanjika(dateInput);
  const bDate = panjika.bengaliDate;
  const timePeriod = getBengaliTimePeriod(dateInput, 'Asia/Kolkata');

  return {
    day: bDate.day,
    dayBn: bDate.dayBn || toBengaliDigits(bDate.day),
    monthIndex: bDate.monthIndex,
    monthNameEn: bDate.monthNameEn,
    monthNameBn: bDate.monthNameBn,
    seasonBn: bDate.ritu?.nameBn || bDate.seasonBn || 'শরৎ',
    year: bDate.year,
    yearBn: bDate.yearBn,
    barEn: bDate.barEn,
    barBn: bDate.barBn,
    planetLordBn: bDate.planetLordBn,
    periodBn: timePeriod.periodPrefixBn,
    tithiBn: panjika.tithi.nameBn,
    pakshaBn: panjika.tithi.pakshaBn,
    nakshatraBn: panjika.nakshatra.nameBn,
    formattedBn: bDate.formattedBn,
    formattedEn: bDate.formattedEn,
    sakabdo: bDate.sakabdo,
    sakabdoBn: bDate.sakabdoBn || toBengaliDigits(bDate.sakabdo),
  };
}

export function getBengaliMuhurats(): MuhuratSlot[] {
  const panjika = getDayPanjika(new Date());
  return panjika.muhurats.map((m) => ({
    nameEn: m.nameEn,
    nameBn: m.nameBn,
    isAuspicious: m.isAuspicious,
    timeRange: `${m.startTime} - ${m.endTime}`,
    descriptionBn: m.descriptionBn,
  }));
}

export function getBengaliMonthGrid(year: number, monthIndex: number): CalendarDayRecord[] {
  const monthInfo = BENGALI_MONTHS[monthIndex % 12];
  const totalDays = monthInfo.days;

  const days: CalendarDayRecord[] = [];
  for (let d = 1; d <= totalDays; d++) {
    const curDate = bengaliToGregorianDate(year, monthIndex, d);
    const dayPanjika = getDayPanjika(curDate);
    const bInfo = dayPanjika.bengaliDate;
    days.push({
      bengaliDay: d,
      bengaliDayBn: toBengaliDigits(d),
      gregorianDateStr: dayPanjika.dateStr,
      gregorianDay: dayPanjika.gregorianDate.getUTCDate(),
      weekdayBn: bInfo.barShortBn,
      tithiBn: dayPanjika.tithi.nameBn,
      nakshatraBn: dayPanjika.nakshatra.nameBn,
      isSunday: dayPanjika.gregorianDate.getUTCDay() === 0,
    });
  }
  return days;
}

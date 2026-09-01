/**
 * Pure TypeScript Standalone Utility for Bengali Numerals, Dates, Times, Praharas & Counters
 * Guaranteed Unicode NFC Normalization with Zero Dependencies & Missing Glyph Protection
 * Supports accurate timezone extraction for global locations (Asia/Kolkata, Asia/Dhaka, etc.)
 */

export const BENGALI_DIGITS: Readonly<Record<string, string>> = Object.freeze({
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
});

export const ENGLISH_DIGITS: Readonly<Record<string, string>> = Object.freeze({
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
});

export const BENGALI_ORDINALS: Readonly<Record<number, string>> = Object.freeze({
  1: '১ম',
  2: '২য়',
  3: '৩য়',
  4: '৪র্থ',
  5: '৫ম',
  6: '৬ষ্ঠ',
  7: '৭ম',
  8: '৮ম',
  9: '৯ম',
  10: '১০ম',
  11: '১১শ',
  12: ' ১২শ',
  13: '১৩শ',
  14: '১৪শ',
  15: '১৫শ',
  16: '১৬শ',
  17: '১৭শ',
  18: '১৮শ',
  19: '১৯শ',
  20: '২০শ',
  21: '২১শে',
  22: '২২শে',
  23: '২৩শে',
  24: '২৪শে',
  25: '২৫শে',
  26: '২৬শে',
  27: '২৭শে',
  28: '২৮শে',
  29: '২৯শে',
  30: '৩০শে',
  31: '৩১শে',
  32: '৩২শে',
});

/**
 * Converts any number or string containing ASCII numbers (0-9) to Bengali Numerals (০-৯)
 * Normalizes output to Unicode NFC to ensure standard glyph composition.
 */
export function toBengaliNumeral(val: number | string | null | undefined): string {
  if (val === null || val === undefined) return '';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(val)
    .replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)] || digit)
    .normalize('NFC');
}

/**
 * Standard toBengaliNumber function alias
 */
export function toBengaliNumber(input: string | number | null | undefined): string {
  return toBengaliNumeral(input);
}

/**
 * Converts Bengali Numerals (০-৯) back to ASCII English Numerals (0-9)
 */
export function toEnglishNumeral(val: string | null | undefined): string {
  if (!val) return '';
  return String(val)
    .replace(/[০-৯]/g, (digit) => ENGLISH_DIGITS[digit] || digit)
    .normalize('NFC');
}

/**
 * Left pads a number with Bengali zeroes to a given width
 */
export function padBengaliZero(num: number | string, width: number = 2): string {
  const str = String(num);
  const padded = str.length < width ? '0'.repeat(width - str.length) + str : str;
  return toBengaliNumeral(padded);
}

/**
 * Time components in a specific timezone
 */
export interface TimeComponents {
  hours24: number;
  hours12: number;
  minutes: number;
  seconds: number;
  periodEn: 'AM' | 'PM';
  timeZone: string;
}

/**
 * Accurately extracts hours, minutes, and seconds for a given date in a target timezone.
 * Defaults to 'Asia/Kolkata' (IST) if no timezone is supplied or if client environment is undefined.
 */
export function getTimeInTimezone(
  dateInput: Date | string | number | null | undefined,
  timeZone: string = 'Asia/Kolkata'
): TimeComponents {
  let date: Date;
  if (!dateInput) {
    date = new Date();
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === 'number') {
    date = new Date(dateInput);
  } else {
    // string parsing
    date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      date = new Date();
    }
  }

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone || 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const parts = formatter.formatToParts(date);
    let hours24 = 0;
    let minutes = 0;
    let seconds = 0;

    for (const part of parts) {
      if (part.type === 'hour') hours24 = parseInt(part.value, 10);
      else if (part.type === 'minute') minutes = parseInt(part.value, 10);
      else if (part.type === 'second') seconds = parseInt(part.value, 10);
    }

    if (hours24 === 24) hours24 = 0; // Handle special 24h edge cases

    const periodEn: 'AM' | 'PM' = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

    return {
      hours24,
      hours12,
      minutes,
      seconds,
      periodEn,
      timeZone,
    };
  } catch {
    // Fallback if Intl timezone is not supported
    const hours24 = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const periodEn: 'AM' | 'PM' = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

    return {
      hours24,
      hours12,
      minutes,
      seconds,
      periodEn,
      timeZone,
    };
  }
}

export interface BengaliTimePeriod {
  period: string; // alias for periodPrefixBn
  periodPrefixBn: string; // 'ভোর', 'সকাল', 'দুপুর', 'বিকাল', 'সন্ধ্যা', 'রাত', 'নিশীথ'
  periodPrefixEn: string; // 'Dawn', 'Morning', 'Afternoon', 'Late Afternoon', 'Evening', 'Night', 'Late Night'
  hours24: number;
  hours12: number;
  minutes: number;
  seconds: number;
  periodEn: 'AM' | 'PM';
  formattedTimeBn: string; // e.g. "রাত ১০:৫০:২১"
  formattedTimeEn: string; // e.g. "10:50:21 PM"
  formattedTime12: string; // e.g. "১০:৫০:২১"
  praharaNameBn: string; // e.g. "৬ষ্ঠ প্রহর (নিশীথ)"
  praharaNameEn: string; // e.g. "6th Prahara (Nishitha)"
  praharaIndex: number; // 1 to 8
}

/**
 * Standard 24-hour time of day classification and Prahara calculation for Bengali clock & panjika
 * Supports timezone selection so Kolkata, Dhaka, Siliguri, London, NY etc. show true local time.
 */
export function getBengaliTimePeriod(
  dateInput?: Date | string | number | null,
  timeZone: string = 'Asia/Kolkata'
): BengaliTimePeriod {
  const time = getTimeInTimezone(dateInput, timeZone);
  const { hours24, hours12, minutes, seconds, periodEn } = time;

  let periodPrefixBn = 'রাত';
  let periodPrefixEn = 'Night';

  // Authentic 24-hour Bengali Time-of-Day Divisions:
  if (hours24 >= 4 && hours24 < 6) {
    // 04:00 - 05:59 -> ভোর (Dawn / Usha)
    periodPrefixBn = 'ভোর';
    periodPrefixEn = 'Dawn';
  } else if (hours24 >= 6 && hours24 < 12) {
    // 06:00 - 11:59 -> সকাল / প্রাতঃ (Morning / Pratah)
    periodPrefixBn = 'সকাল';
    periodPrefixEn = 'Morning';
  } else if (hours24 >= 12 && hours24 < 16) {
    // 12:00 - 15:59 -> দুপুর / মধ্যাহ্ন (Noon & Afternoon / Madhyahna)
    periodPrefixBn = 'দুপুর';
    periodPrefixEn = 'Afternoon';
  } else if (hours24 >= 16 && hours24 < 18) {
    // 16:00 - 17:59 -> বিকাল / অপরাহ্ণ (Late Afternoon / Oporahna)
    periodPrefixBn = 'বিকাল';
    periodPrefixEn = 'Late Afternoon';
  } else if (hours24 >= 18 && hours24 < 20) {
    // 18:00 - 19:59 -> সন্ধ্যা / সায়াহ্ন (Dusk & Evening / Sayahna)
    periodPrefixBn = 'সন্ধ্যা';
    periodPrefixEn = 'Evening';
  } else if (hours24 >= 20 && hours24 < 24) {
    // 20:00 - 23:59 -> রাত (Night / Ratri)
    periodPrefixBn = 'রাত';
    periodPrefixEn = 'Night';
  } else {
    // 00:00 - 03:59 -> নিশীথ / মধ্যরাত (Late Night / Nishitha)
    periodPrefixBn = 'নিশীথ';
    periodPrefixEn = 'Late Night';
  }

  // Authentic 8 Praharas of Hindu / Bengali Day-Night cycle (Each 3 hours):
  let praharaIndex = 1;
  let praharaNameBn = '১ম প্রহর (পূর্বাহ্ণ)';
  let praharaNameEn = '1st Prahara (Purvahna)';

  if (hours24 >= 6 && hours24 < 9) {
    praharaIndex = 1;
    praharaNameBn = '১ম প্রহর (পূর্বাহ্ণ)';
    praharaNameEn = '1st Prahara (Purvahna)';
  } else if (hours24 >= 9 && hours24 < 12) {
    praharaIndex = 2;
    praharaNameBn = '২য় প্রহর (মধ্যাহ্ন)';
    praharaNameEn = '2nd Prahara (Madhyahna)';
  } else if (hours24 >= 12 && hours24 < 15) {
    praharaIndex = 3;
    praharaNameBn = '৩য় প্রহর (অপরাহ্ণ)';
    praharaNameEn = '3rd Prahara (Aparahna)';
  } else if (hours24 >= 15 && hours24 < 18) {
    praharaIndex = 4;
    praharaNameBn = '৪র্থ প্রহর (সায়াহ্ন)';
    praharaNameEn = '4th Prahara (Sayahna)';
  } else if (hours24 >= 18 && hours24 < 21) {
    praharaIndex = 5;
    praharaNameBn = '৫ম প্রহর (প্রদোষ)';
    praharaNameEn = '5th Prahara (Pradosha)';
  } else if (hours24 >= 21 && hours24 < 24) {
    praharaIndex = 6;
    praharaNameBn = '৬ষ্ঠ প্রহর (নিশীথ)';
    praharaNameEn = '6th Prahara (Nishitha)';
  } else if (hours24 >= 0 && hours24 < 3) {
    praharaIndex = 7;
    praharaNameBn = '৭ম প্রহর (ত্রিজামা)';
    praharaNameEn = '7th Prahara (Trijama)';
  } else {
    praharaIndex = 8;
    praharaNameBn = '৮ম প্রহর (ঊষা)';
    praharaNameEn = '8th Prahara (Usha)';
  }

  const bnH = padBengaliZero(hours12, 2);
  const bnM = padBengaliZero(minutes, 2);
  const bnS = padBengaliZero(seconds, 2);

  const formattedTime12 = `${bnH}:${bnM}:${bnS}`.normalize('NFC');
  const formattedTimeBn = `${periodPrefixBn} ${formattedTime12}`.normalize('NFC');
  const formattedTimeEn = `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${periodEn}`;

  return {
    period: periodPrefixBn,
    periodPrefixBn,
    periodPrefixEn,
    hours24,
    hours12,
    minutes,
    seconds,
    periodEn,
    formattedTimeBn,
    formattedTimeEn,
    formattedTime12,
    praharaNameBn,
    praharaNameEn,
    praharaIndex,
  };
}

export interface BengaliPraharaInfo {
  praharaNumber: number;
  nameBn: string;
  nameEn: string;
  periodBn: string;
  periodEn: string;
  time12hBn: string;
  formattedTimeBn: string;
  formattedTimeEn: string;
  descriptionBn: string;
}

/**
 * Calculates current Vedic Ashtaprahara info
 */
export function getBengaliPraharaInfo(
  dateInput?: Date | string | number | null,
  timeZone: string = 'Asia/Kolkata'
): BengaliPraharaInfo {
  const period = getBengaliTimePeriod(dateInput, timeZone);

  const praharaDescriptions: Record<number, string> = {
    1: 'সূর্যোদয় পরবর্তী প্রাতঃকালীন উপাসনা ও কর্মারম্ভের প্রশস্ত সময়।',
    2: 'মধ্যাহ্ন কাল—সূর্যদেব মধ্যগগনে বিরাজমান। ধ্যান ও বিহিত আহার।',
    3: 'অপরাহ্ণ কাল—বৈষয়িক কর্ম ও বিদ্যাচর্চা।',
    4: 'সায়াহ্ন কাল—দিনাবসানের সন্ধিক্ষণ, গোধূলি মুহূর্ত সমাসন্ন।',
    5: 'প্রদোষ কাল—সন্ধ্যা আরতি, দীপ প্রজ্বলন ও গৃহদেবতার আরাধনা।',
    6: 'নিশীথ কাল—রাত্রির প্রথম প্রহর, বিশ্রাম ও আধ্যাত্মিক জপ।',
    7: 'ত্রিজামা কাল—গভীর নিশীথ, যোগী ও সাধকদের নিভৃত সাধনা।',
    8: 'ব্রাহ্ম মুহূর্ত ও ঊষাকাল—ধ্যান ও নবপ্রভাতের শুভারম্ভ।',
  };

  return {
    praharaNumber: period.praharaIndex,
    nameBn: period.praharaNameBn,
    nameEn: period.praharaNameEn,
    periodBn: period.periodPrefixBn,
    periodEn: period.periodPrefixEn,
    time12hBn: period.formattedTime12,
    formattedTimeBn: period.formattedTimeBn,
    formattedTimeEn: period.formattedTimeEn,
    descriptionBn: praharaDescriptions[period.praharaIndex] || '',
  };
}

/**
 * Formats a time string (e.g. "06:15 AM", "18:30:00", or Date object) into Bengali time with day parts
 */
export function formatBengaliTime(
  timeInput: string | Date | number | null | undefined,
  options: { includePeriod?: boolean; useBengaliDayPart?: boolean; timeZone?: string } = {
    includePeriod: true,
    useBengaliDayPart: true,
    timeZone: 'Asia/Kolkata',
  }
): string {
  if (!timeInput) return '';
  const prahara = getBengaliPraharaInfo(timeInput, options.timeZone || 'Asia/Kolkata');
  if (options.useBengaliDayPart) {
    return prahara.formattedTimeBn;
  }
  if (options.includePeriod) {
    return `${prahara.time12hBn} ${prahara.periodBn}`;
  }
  return prahara.time12hBn;
}

/**
 * Formats an ordinal number in Bengali (e.g. 1 -> ১ম, 7 -> ৭ম, 25 -> ২৫শে)
 */
export function formatBengaliOrdinal(num: number): string {
  if (BENGALI_ORDINALS[num]) {
    return BENGALI_ORDINALS[num].normalize('NFC');
  }
  return `${toBengaliNumeral(num)}তম`.normalize('NFC');
}

/**
 * Formats numbers with units and commas (e.g. 1000 Lotuses -> ১,০০০টি পদ্ম)
 */
export function formatBengaliCounter(
  count: number | string,
  unitBn: string = '',
  useIndianCommas: boolean = true
): string {
  const num = typeof count === 'number' ? count : parseFloat(toEnglishNumeral(count));
  if (isNaN(num)) return toBengaliNumeral(count);

  let formattedNumber = num.toString();
  if (useIndianCommas) {
    // Indian numbering format: 1,00,00,000
    const str = Math.floor(Math.abs(num)).toString();
    if (str.length > 3) {
      const lastThree = str.substring(str.length - 3);
      const remaining = str.substring(0, str.length - 3);
      const formattedRemaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      formattedNumber = `${formattedRemaining},${lastThree}`;
    }
  }

  const bnNumber = toBengaliNumeral(formattedNumber);
  return unitBn ? `${bnNumber} ${unitBn}`.trim().normalize('NFC') : bnNumber;
}

/**
 * Formats monetary amounts in Bengali currency representation (e.g. ₹ ৫,০০০ অথবা ৫,০০০ টাকা)
 */
export function formatBengaliCurrency(
  amount: number | string,
  currencySymbol: string = '₹'
): string {
  const formatted = formatBengaliCounter(amount, '', true);
  return `${currencySymbol} ${formatted}`.normalize('NFC');
}

export const GREGORIAN_MONTHS_BN: Readonly<string[]> = Object.freeze([
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
]);

export const GREGORIAN_MONTHS_EN: Readonly<string[]> = Object.freeze([
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]);

export const WEEKDAYS_BN: Readonly<string[]> = Object.freeze([
  'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
]);

export const WEEKDAYS_EN: Readonly<string[]> = Object.freeze([
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]);

/**
 * Deterministic date formatter across Node.js SSR and Browser to 100% eliminate hydration errors.
 * Uses target timezone (default 'Asia/Kolkata') to extract exact calendar date parts.
 */
export function formatDeterministicDate(
  date: Date | string | number | null | undefined,
  isBn: boolean = true,
  numerals: 'bn' | 'en' = 'bn',
  timeZone: string = 'Asia/Kolkata'
): string {
  if (!date) return '';
  let dObj: Date;
  if (date instanceof Date) {
    dObj = date;
  } else if (typeof date === 'string') {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim());
    if (match) {
      dObj = new Date(Date.UTC(parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10), 12, 0, 0));
    } else {
      dObj = new Date(date);
    }
  } else {
    dObj = new Date(date);
  }

  if (isNaN(dObj.getTime())) return '';

  let y = dObj.getFullYear();
  let m = dObj.getMonth();
  let d = dObj.getDate();
  let w = dObj.getDay();

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone || 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'short',
    });
    const parts = formatter.formatToParts(dObj);
    let weekdayStr = '';
    for (const part of parts) {
      if (part.type === 'year') y = parseInt(part.value, 10);
      else if (part.type === 'month') m = parseInt(part.value, 10) - 1;
      else if (part.type === 'day') d = parseInt(part.value, 10);
      else if (part.type === 'weekday') weekdayStr = part.value;
    }
    const weekdayMap: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
    };
    if (weekdayStr && weekdayMap[weekdayStr] !== undefined) {
      w = weekdayMap[weekdayStr];
    }
  } catch {
    // fallback to standard get methods
    y = dObj.getUTCFullYear();
    m = dObj.getUTCMonth();
    d = dObj.getUTCDate();
    w = dObj.getUTCDay();
  }

  if (isBn) {
    const dayStr = numerals === 'bn' ? toBengaliNumeral(d) : d.toString();
    const yearStr = numerals === 'bn' ? toBengaliNumeral(y) : y.toString();
    return `${WEEKDAYS_BN[w] || 'রবিবার'}, ${dayStr} ${GREGORIAN_MONTHS_BN[m] || ''}, ${yearStr}`.normalize('NFC');
  }
  return `${WEEKDAYS_EN[w] || 'Sunday'}, ${GREGORIAN_MONTHS_EN[m] || ''} ${d}, ${y}`;
}

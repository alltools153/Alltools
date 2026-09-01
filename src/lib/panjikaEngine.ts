import {
  BENGALI_MONTHS,
  BENGALI_RITUS,
  KARANAS,
  LOCATIONS,
  NAKSHATRAS,
  RASHIS,
  TITHI_LIST,
  WEEKDAYS,
  YOGAS,
  toBengaliDigits,
} from './constants/panjikaData';
import {
  BengaliDate,
  CalculationMethod,
  DayPanjika,
  KaranaInfo,
  LocationConfig,
  MuhuratSlot,
  NakshatraInfo,
  TithiInfo,
  YogaInfo,
} from '@/types/panjika';
import { getFestivalsForDate } from './festivalsData';

/**
 * Astronomical & Julian Day calculations
 */
function getJulianDay(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

function getJulianCenturies(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Computes Solar & Lunar Longitudes in degrees (0 - 360)
 */
function getSunLongitude(t: number): number {
  const l0 = 280.46646 + 36000.76983 * t + 0.0003032 * t * t;
  const m = 357.52911 + 35999.05029 * t - 0.0001537 * t * t;
  const mr = (m * Math.PI) / 180;
  const c =
    (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(mr) +
    (0.019993 - 0.000101 * t) * Math.sin(2 * mr) +
    0.000289 * Math.sin(3 * mr);
  let sunLong = (l0 + c) % 360;
  if (sunLong < 0) sunLong += 360;
  return sunLong;
}

function getMoonLongitude(t: number): number {
  const lp = 218.3164477 + 481267.88128 * t;
  const d = 297.8501921 + 445267.1114034 * t;
  const m = 357.5291092 + 35999.0502909 * t;
  const mp = 134.9633964 + 477198.8675055 * t;

  const dr = (d * Math.PI) / 180;
  const mr = (m * Math.PI) / 180;
  const mpr = (mp * Math.PI) / 180;

  let moonLong =
    lp +
    6.288774 * Math.sin(mpr) +
    1.274027 * Math.sin(2 * dr - mpr) +
    0.658314 * Math.sin(2 * dr) +
    0.213618 * Math.sin(2 * mpr) -
    0.185116 * Math.sin(mr) -
    0.114332 * Math.sin(2 * (d - mpr));

  // Ayanamsa correction (Lahiri approx ~24.1°)
  const ayanamsa = 24.1 + 0.01397 * t;
  moonLong = (moonLong - ayanamsa) % 360;
  if (moonLong < 0) moonLong += 360;
  return moonLong;
}

/**
 * Calculates Sunrise and Sunset for given date, latitude, longitude
 */
export function calculateSunTimes(
  date: Date,
  lat: number,
  lng: number,
  utcOffset: number
): { sunrise: string; sunset: string; sunriseDate: Date; sunsetDate: Date } {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Approx solar declination
  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1);
  const eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
  const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma);

  const latRad = (lat * Math.PI) / 180;
  const zenithRad = (90.833 * Math.PI) / 180; // Standard atmospheric refraction

  const cosHourAngle = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(decl)) / (Math.cos(latRad) * Math.cos(decl));
  const clampedCos = Math.max(-1, Math.min(1, cosHourAngle));
  const hourAngle = (Math.acos(clampedCos) * 180) / Math.PI;

  const solarNoonMinutes = 720 - 4 * lng - eqtime + utcOffset * 60;
  const sunriseMinutes = solarNoonMinutes - hourAngle * 4;
  const sunsetMinutes = solarNoonMinutes + hourAngle * 4;

  const formatMin = (m: number) => {
    let normalized = (m + 1440) % 1440;
    const hh = Math.floor(normalized / 60);
    const mm = Math.floor(normalized % 60);
    const period = hh >= 12 ? 'PM' : 'AM';
    const displayH = hh % 12 === 0 ? 12 : hh % 12;
    return `${displayH < 10 ? '0' + displayH : displayH}:${mm < 10 ? '0' + displayH : mm} ${period}`;
  };

  const createDateFromMinutes = (m: number) => {
    let normalized = (m + 1440) % 1440;
    const hh = Math.floor(normalized / 60);
    const mm = Math.floor(normalized % 60);
    const d = new Date(date);
    d.setHours(hh, mm, 0, 0);
    return d;
  };

  const srDate = createDateFromMinutes(sunriseMinutes);
  const ssDate = createDateFromMinutes(sunsetMinutes);

  return {
    sunrise: formatMin(sunriseMinutes),
    sunset: formatMin(sunsetMinutes),
    sunriseDate: srDate,
    sunsetDate: ssDate,
  };
}

/**
 * Converts Gregorian Date to authentic Bengali Date (বঙ্গাব্দ)
 */
export function getBengaliDate(date: Date, method: CalculationMethod = 'surya_siddhanta'): BengaliDate {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth(); // 0-indexed (0 = Jan, 3 = April)
  const gDay = date.getDate();
  const dayOfWeek = date.getDay(); // 0 = Sun

  const isBD = method === 'bangladesh_academy';
  const newYearDay = isBD ? 14 : 15;

  let bengaliYear = gYear - 593;
  let refYear = gYear;
  if (gMonth < 3 || (gMonth === 3 && gDay < newYearDay)) {
    bengaliYear = gYear - 594;
    refYear = gYear - 1;
  }

  // Month starting dates for refYear (0 = Boishakh ... 11 = Choitro)
  const startDates = isBD
    ? [
        new Date(refYear, 3, 14, 12, 0, 0), // Boishakh (Apr 14)
        new Date(refYear, 4, 15, 12, 0, 0), // Jyoishtho (May 15)
        new Date(refYear, 5, 15, 12, 0, 0), // Asharh (Jun 15)
        new Date(refYear, 6, 16, 12, 0, 0), // Srabon (Jul 16)
        new Date(refYear, 7, 17, 12, 0, 0), // Bhadro (Aug 17)
        new Date(refYear, 8, 17, 12, 0, 0), // Ashwin (Sep 17)
        new Date(refYear, 9, 17, 12, 0, 0), // Kartik (Oct 17)
        new Date(refYear, 10, 16, 12, 0, 0), // Agrahayan (Nov 16)
        new Date(refYear, 11, 16, 12, 0, 0), // Poush (Dec 16)
        new Date(refYear + 1, 0, 15, 12, 0, 0), // Magh (Jan 15)
        new Date(refYear + 1, 1, 14, 12, 0, 0), // Falgun (Feb 14)
        new Date(refYear + 1, 2, 15, 12, 0, 0), // Choitro (Mar 15)
      ]
    : [
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
  const rituIndex = Math.floor(monthIndex / 2);
  const ritu = BENGALI_RITUS[rituIndex];
  const weekdayInfo = WEEKDAYS[dayOfWeek];

  const yearBn = toBengaliDigits(bengaliYear);
  const dayBn = toBengaliDigits(bengaliDay);

  const formattedBn = `${dayBn} ${monthInfo.nameBn}, ${yearBn} বঙ্গাব্দ (${weekdayInfo.nameBn})`;
  const formattedEn = `${bengaliDay} ${monthInfo.nameEn}, ${bengaliYear} BS (${weekdayInfo.nameEn})`;

  return {
    day: bengaliDay,
    monthIndex,
    monthNameEn: monthInfo.nameEn,
    monthNameBn: monthInfo.nameBn,
    year: bengaliYear,
    yearBn,
    ritu,
    barEn: weekdayInfo.nameEn,
    barBn: weekdayInfo.nameBn,
    barShortBn: weekdayInfo.shortBn,
    planetLordBn: weekdayInfo.planetLordBn,
    sakabdo: gYear - 78,
    tripurabdo: gYear - 590,
    formattedBn,
    formattedEn,
  };
}

/**
 * Converts Bengali Date (বঙ্গাব্দ) to Gregorian Date
 */
export function bengaliToGregorianDate(
  bengaliYear: number,
  bengaliMonthIndex: number,
  bengaliDay: number,
  method: CalculationMethod = 'surya_siddhanta'
): Date {
  const isBD = method === 'bangladesh_academy';
  const refYear = bengaliYear + 593;

  const startDates = isBD
    ? [
        new Date(refYear, 3, 14, 12, 0, 0), // Boishakh
        new Date(refYear, 4, 15, 12, 0, 0), // Jyoishtho
        new Date(refYear, 5, 15, 12, 0, 0), // Asharh
        new Date(refYear, 6, 16, 12, 0, 0), // Srabon
        new Date(refYear, 7, 17, 12, 0, 0), // Bhadro
        new Date(refYear, 8, 17, 12, 0, 0), // Ashwin
        new Date(refYear, 9, 17, 12, 0, 0), // Kartik
        new Date(refYear, 10, 16, 12, 0, 0), // Agrahayan
        new Date(refYear, 11, 16, 12, 0, 0), // Poush
        new Date(refYear + 1, 0, 15, 12, 0, 0), // Magh
        new Date(refYear + 1, 1, 14, 12, 0, 0), // Falgun
        new Date(refYear + 1, 2, 15, 12, 0, 0), // Choitro
      ]
    : [
        new Date(refYear, 3, 15, 12, 0, 0), // Boishakh
        new Date(refYear, 4, 16, 12, 0, 0), // Jyoishtho
        new Date(refYear, 5, 16, 12, 0, 0), // Asharh
        new Date(refYear, 6, 18, 12, 0, 0), // Srabon
        new Date(refYear, 7, 18, 12, 0, 0), // Bhadro
        new Date(refYear, 8, 18, 12, 0, 0), // Ashwin
        new Date(refYear, 9, 18, 12, 0, 0), // Kartik
        new Date(refYear, 10, 17, 12, 0, 0), // Agrahayan
        new Date(refYear, 11, 17, 12, 0, 0), // Poush
        new Date(refYear + 1, 0, 16, 12, 0, 0), // Magh
        new Date(refYear + 1, 1, 15, 12, 0, 0), // Falgun
        new Date(refYear + 1, 2, 16, 12, 0, 0), // Choitro
      ];

  const mIdx = ((bengaliMonthIndex % 12) + 12) % 12;
  const monthStart = startDates[mIdx];
  const targetDate = new Date(monthStart.getTime() + (bengaliDay - 1) * 86400000);
  return targetDate;
}

/**
 * Panchanga Calculations for Tithi, Nakshatra, Yoga, Karana
 */
export function calculatePanchangLimbs(
  date: Date,
  sunriseDate: Date,
  sunsetDate: Date
): {
  tithi: TithiInfo;
  nakshatra: NakshatraInfo;
  yoga: YogaInfo;
  karana: KaranaInfo;
  paksha: 'shukla' | 'krishna';
  sunSign: { nameEn: string; nameBn: string; degrees: number };
  moonSign: { nameEn: string; nameBn: string; degrees: number };
} {
  const jd = getJulianDay(date);
  const t = getJulianCenturies(jd);

  const sunLong = getSunLongitude(t);
  const moonLong = getMoonLongitude(t);

  // 1. Tithi = (Moon Longitude - Sun Longitude) / 12 degrees
  let diff = moonLong - sunLong;
  if (diff < 0) diff += 360;

  const tithiIndexRaw = diff / 12;
  const tithiNum = Math.floor(tithiIndexRaw) + 1; // 1 to 30
  const tithiFractionRemaining = 1 - (tithiIndexRaw - Math.floor(tithiIndexRaw));
  
  // Approximate tithi end time (tithis last ~20 to 26 hours)
  const hoursLeftTithi = tithiFractionRemaining * 24;
  const tithiEndDate = new Date(date.getTime() + hoursLeftTithi * 3600000);
  const tithiEndTime = `${tithiEndDate.getHours() % 12 || 12}:${tithiEndDate.getMinutes() < 10 ? '0' : ''}${tithiEndDate.getMinutes()} ${tithiEndDate.getHours() >= 12 ? 'PM' : 'AM'}`;

  const isShukla = tithiNum <= 15;
  const paksha: 'shukla' | 'krishna' = isShukla ? 'shukla' : 'krishna';
  const numberInPaksha = isShukla ? tithiNum : tithiNum - 15;

  let tithiNameIndex = numberInPaksha - 1;
  let baseTithi = TITHI_LIST[tithiNameIndex];
  let tithiNameBn = baseTithi.nameBn;
  let tithiNameEn = baseTithi.nameEn;

  if (!isShukla && numberInPaksha === 15) {
    tithiNameBn = 'অমাবস্যা';
    tithiNameEn = 'Amavasya';
  } else if (isShukla && numberInPaksha === 15) {
    tithiNameBn = 'পূর্ণিমা';
    tithiNameEn = 'Purnima';
  }

  const tithiInfo: TithiInfo = {
    index: tithiNum,
    nameEn: tithiNameEn,
    nameBn: tithiNameBn,
    paksha,
    pakshaBn: isShukla ? 'শুক্লপক্ষ' : 'কৃষ্ণপক্ষ',
    numberInPaksha,
    deityBn: baseTithi.deityBn,
    natureBn: baseTithi.natureBn,
    endTime: tithiEndTime,
    percentage: Math.round((1 - tithiFractionRemaining) * 100),
  };

  // 2. Nakshatra = Moon Longitude / 13°20' (13.3333 degrees)
  const nakshatraIndexRaw = moonLong / (360 / 27);
  const nakshatraNum = Math.floor(nakshatraIndexRaw) % 27; // 0 to 26
  const nakshatraData = NAKSHATRAS[nakshatraNum];

  const nakshatraFractionRemaining = 1 - (nakshatraIndexRaw - Math.floor(nakshatraIndexRaw));
  const nakshatraEndDate = new Date(date.getTime() + nakshatraFractionRemaining * 24 * 3600000);
  const nakshatraEndTime = `${nakshatraEndDate.getHours() % 12 || 12}:${nakshatraEndDate.getMinutes() < 10 ? '0' : ''}${nakshatraEndDate.getMinutes()} ${nakshatraEndDate.getHours() >= 12 ? 'PM' : 'AM'}`;

  const nakshatraInfo: NakshatraInfo = {
    index: nakshatraData.index,
    nameEn: nakshatraData.nameEn,
    nameBn: nakshatraData.nameBn,
    lordBn: nakshatraData.lordBn,
    gana: nakshatraData.gana,
    ganaEn: nakshatraData.ganaEn,
    yoniBn: nakshatraData.yoniBn,
    nadiBn: nakshatraData.nadiBn,
    symbolBn: nakshatraData.symbolBn,
    endTime: nakshatraEndTime,
  };

  // 3. Yoga = (Sun Longitude + Moon Longitude) / 13°20'
  const yogaIndexRaw = ((sunLong + moonLong) % 360) / (360 / 27);
  const yogaNum = Math.floor(yogaIndexRaw) % 27;
  const yogaData = YOGAS[yogaNum];

  const yogaInfo: YogaInfo = {
    index: yogaNum + 1,
    nameEn: yogaData.nameEn,
    nameBn: yogaData.nameBn,
    natureBn: yogaData.natureBn,
    isAuspicious: yogaData.isAuspicious,
    endTime: tithiEndTime,
  };

  // 4. Karana = Half Tithi (diff / 6 degrees)
  const karanaIndexRaw = diff / 6;
  const karanaHalfNum = Math.floor(karanaIndexRaw); // 0 to 59
  let karanaData = KARANAS[0];

  if (karanaHalfNum === 0) {
    karanaData = KARANAS[10]; // Kinstughna
  } else if (karanaHalfNum >= 57) {
    if (karanaHalfNum === 57) karanaData = KARANAS[7]; // Shakuni
    else if (karanaHalfNum === 58) karanaData = KARANAS[8]; // Chatushpada
    else karanaData = KARANAS[9]; // Naga
  } else {
    // 7 Chara Karanas cycle (Bava to Vishti)
    const cyclicIndex = (karanaHalfNum - 1) % 7;
    karanaData = KARANAS[cyclicIndex];
  }

  const karanaInfo: KaranaInfo = {
    index: karanaHalfNum + 1,
    nameEn: karanaData.nameEn,
    nameBn: karanaData.nameBn,
    typeBn: karanaData.typeBn,
    deityBn: karanaData.deityBn,
    endTime: tithiEndTime,
  };

  // 5. Sun Sign & Moon Sign (30 degrees each)
  const sunRashiIndex = Math.floor(sunLong / 30) % 12;
  const moonRashiIndex = Math.floor(moonLong / 30) % 12;

  const sunSign = {
    nameEn: RASHIS[sunRashiIndex].nameEn,
    nameBn: RASHIS[sunRashiIndex].nameBn,
    degrees: Math.round(sunLong % 30),
  };

  const moonSign = {
    nameEn: RASHIS[moonRashiIndex].nameEn,
    nameBn: RASHIS[moonRashiIndex].nameBn,
    degrees: Math.round(moonLong % 30),
  };

  return {
    tithi: tithiInfo,
    nakshatra: nakshatraInfo,
    yoga: yogaInfo,
    karana: karanaInfo,
    paksha,
    sunSign,
    moonSign,
  };
}

/**
 * Calculates Muhurat Timings: Rahu Kalam, Yama Ghantam, Bara Bela, Kala Bela, Amrita & Mahendra Yoga
 */
export function calculateMuhurats(
  date: Date,
  sunriseDate: Date,
  sunsetDate: Date,
  nakshatraIndex: number
): MuhuratSlot[] {
  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon...
  const dayDurationMs = sunsetDate.getTime() - sunriseDate.getTime();
  const slotDurationMs = dayDurationMs / 8;

  const formatSlotTime = (startTimeMs: number, endTimeMs: number) => {
    const s = new Date(startTimeMs);
    const e = new Date(endTimeMs);
    const formatH = (d: Date) => {
      const h = d.getHours();
      const m = d.getMinutes();
      const p = h >= 12 ? 'PM' : 'AM';
      const dh = h % 12 === 0 ? 12 : h % 12;
      return `${dh < 10 ? '0' + dh : dh}:${m < 10 ? '0' + m : m} ${p}`;
    };
    return { start: formatH(s), end: formatH(e) };
  };

  // Rahu Kalam Ashtabhaga indices by weekday (0-indexed)
  // Sun: 7 (8th), Mon: 1 (2nd), Tue: 6 (7th), Wed: 4 (5th), Thu: 5 (6th), Fri: 3 (4th), Sat: 2 (3rd)
  const rahuSlots = [7, 1, 6, 4, 5, 3, 2];
  const yamaSlots = [4, 3, 2, 1, 0, 6, 5];
  const gulikaSlots = [6, 5, 4, 3, 2, 1, 0];

  // Bara Bela & Kala Bela (Traditional Bengali Panjika Ashtabhaga divisions)
  // Sun: Kala Bela (4), Bara Bela (5)
  // Mon: Kala Bela (7), Bara Bela (1)
  // Tue: Kala Bela (2), Bara Bela (6)
  // Wed: Kala Bela (5), Bara Bela (4)
  // Thu: Kala Bela (6), Bara Bela (3)
  // Fri: Kala Bela (3), Bara Bela (7)
  // Sat: Kala Bela (1), Bara Bela (2)
  const kalaBelaSlots = [4, 7, 2, 5, 6, 3, 1];
  const baraBelaSlots = [5, 1, 6, 4, 3, 7, 2];

  const rahuStartMs = sunriseDate.getTime() + rahuSlots[dayOfWeek] * slotDurationMs;
  const rahuEndMs = rahuStartMs + slotDurationMs;
  const rahuTimes = formatSlotTime(rahuStartMs, rahuEndMs);

  const yamaStartMs = sunriseDate.getTime() + yamaSlots[dayOfWeek] * slotDurationMs;
  const yamaEndMs = yamaStartMs + slotDurationMs;
  const yamaTimes = formatSlotTime(yamaStartMs, yamaEndMs);

  const gulikaStartMs = sunriseDate.getTime() + gulikaSlots[dayOfWeek] * slotDurationMs;
  const gulikaEndMs = gulikaStartMs + slotDurationMs;
  const gulikaTimes = formatSlotTime(gulikaStartMs, gulikaEndMs);

  const kalaBelaStartMs = sunriseDate.getTime() + kalaBelaSlots[dayOfWeek] * slotDurationMs;
  const kalaBelaEndMs = kalaBelaStartMs + slotDurationMs;
  const kalaBelaTimes = formatSlotTime(kalaBelaStartMs, kalaBelaEndMs);

  const baraBelaStartMs = sunriseDate.getTime() + baraBelaSlots[dayOfWeek] * slotDurationMs;
  const baraBelaEndMs = baraBelaStartMs + slotDurationMs;
  const baraBelaTimes = formatSlotTime(baraBelaStartMs, baraBelaEndMs);

  // Abhijit Muhurat (midday 8th muhurat of the day ~48 mins)
  const middayMs = sunriseDate.getTime() + dayDurationMs / 2;
  const abhijitStartMs = middayMs - 24 * 60000;
  const abhijitEndMs = middayMs + 24 * 60000;
  const abhijitTimes = formatSlotTime(abhijitStartMs, abhijitEndMs);

  // Brahma Muhurat (96 mins before sunrise)
  const brahmaStartMs = sunriseDate.getTime() - 96 * 60000;
  const brahmaEndMs = sunriseDate.getTime() - 48 * 60000;
  const brahmaTimes = formatSlotTime(brahmaStartMs, brahmaEndMs);

  // Godhuli Muhurat (around sunset)
  const godhuliStartMs = sunsetDate.getTime() - 24 * 60000;
  const godhuliEndMs = sunsetDate.getTime() + 24 * 60000;
  const godhuliTimes = formatSlotTime(godhuliStartMs, godhuliEndMs);

  // Amrita Yoga & Mahendra Yoga (Bengali auspicious day periods)
  const amritaSlotIndex = (dayOfWeek + nakshatraIndex) % 8;
  const amritaStartMs = sunriseDate.getTime() + (amritaSlotIndex % 4) * (slotDurationMs * 2);
  const amritaEndMs = amritaStartMs + slotDurationMs * 1.5;
  const amritaTimes = formatSlotTime(amritaStartMs, amritaEndMs);

  const mahendraStartMs = sunriseDate.getTime() + ((amritaSlotIndex + 3) % 4) * (slotDurationMs * 2);
  const mahendraEndMs = mahendraStartMs + slotDurationMs * 1.2;
  const mahendraTimes = formatSlotTime(mahendraStartMs, mahendraEndMs);

  return [
    {
      id: 'amrita',
      nameEn: 'Amrita Yoga',
      nameBn: 'অমৃতযোগ',
      type: 'amrita',
      isAuspicious: true,
      startTime: amritaTimes.start,
      endTime: amritaTimes.end,
      durationMinutes: Math.round((amritaEndMs - amritaStartMs) / 60000),
      descriptionBn: 'সর্বকর্মে সিদ্ধিদায়ক অমৃততুল্য পরম শুভ সময়। পূজা ও শুভ যাত্রার জন্য প্রশস্ত।',
      descriptionEn: 'Highly auspicious celestial nectar window. Ideal for all auspicious beginnings.',
    },
    {
      id: 'mahendra',
      nameEn: 'Mahendra Yoga',
      nameBn: 'মাহেন্দ্রযোগ',
      type: 'mahendra',
      isAuspicious: true,
      startTime: mahendraTimes.start,
      endTime: mahendraTimes.end,
      durationMinutes: Math.round((mahendraEndMs - mahendraStartMs) / 60000),
      descriptionBn: 'ঐশ্বর্য ও বিজয়লাভের জন্য ইন্দ্রতুল্য শক্তিশালী শুভ মুহূর্ত।',
      descriptionEn: 'Potent auspicious time for royal, financial, and triumphant tasks.',
    },
    {
      id: 'abhijit',
      nameEn: 'Abhijit Muhurat',
      nameBn: 'অভিজিৎ মুহূর্ত',
      type: 'abhijit',
      isAuspicious: true,
      startTime: abhijitTimes.start,
      endTime: abhijitTimes.end,
      durationMinutes: 48,
      descriptionBn: 'সকল দোষ বিনাশকারী দ্বিপ্রাহরিক শুভ লগ্ন। শ্রীহরি বিষ্ণুর প্রিয় কাল।',
      descriptionEn: 'Universal midday victory muhurat dispelling all malefic influences.',
    },
    {
      id: 'brahma',
      nameEn: 'Brahma Muhurat',
      nameBn: 'ব্রহ্ম মুহূর্ত',
      type: 'brahma',
      isAuspicious: true,
      startTime: brahmaTimes.start,
      endTime: brahmaTimes.end,
      durationMinutes: 48,
      descriptionBn: 'সূর্যোদয়ের পূর্বে ধ্যান, যোগ ও বিদ্যাভ্যাসের সর্বশ্রেষ্ঠ পবিত্র কাল।',
      descriptionEn: 'Sacred pre-dawn time ideal for meditation, study, and spiritual awakening.',
    },
    {
      id: 'godhuli',
      nameEn: 'Godhuli Muhurat',
      nameBn: 'গোধূলি মুহূর্ত',
      type: 'godhuli',
      isAuspicious: true,
      startTime: godhuliTimes.start,
      endTime: godhuliTimes.end,
      durationMinutes: 48,
      descriptionBn: 'সন্ধ্যা আরতি ও গৃহদেবতার আরাধনার জন্য পরম শান্তিদায়ক মুহূর্ত।',
      descriptionEn: 'Dusk twilight period auspicious for evening prayers and family peace.',
    },
    {
      id: 'rahu',
      nameEn: 'Rahu Kalam',
      nameBn: 'রাহুকাল',
      type: 'rahu',
      isAuspicious: false,
      startTime: rahuTimes.start,
      endTime: rahuTimes.end,
      durationMinutes: Math.round(slotDurationMs / 60000),
      descriptionBn: 'রাহুর কুপ্রভাব যুক্ত সময়। নূতন শুভ কর্ম ও চুক্তি সম্পাদন বর্জনীয়।',
      descriptionEn: 'Inauspicious Rahu period; avoid starting new ventures and journeys.',
    },
    {
      id: 'barabela',
      nameEn: 'Bara Bela',
      nameBn: 'বারবেলা',
      type: 'barabela',
      isAuspicious: false,
      startTime: baraBelaTimes.start,
      endTime: baraBelaTimes.end,
      durationMinutes: Math.round(slotDurationMs / 60000),
      descriptionBn: 'বাংলার সনাতন পঞ্জিকানুসারে বর্জনীয় সময়। যাত্রা ও শুভকাজ নিষিদ্ধ।',
      descriptionEn: 'Traditional Bengali panjika prohibited daytime window for major events.',
    },
    {
      id: 'kalabela',
      nameEn: 'Kala Bela',
      nameBn: 'কালবেলা',
      type: 'kalabela',
      isAuspicious: false,
      startTime: kalaBelaTimes.start,
      endTime: kalaBelaTimes.end,
      durationMinutes: Math.round(slotDurationMs / 60000),
      descriptionBn: 'কালপুরুষের দণ্ডকাল। কোনো শুভ মাঙ্গলিক কাজ না করাই বিধেয়।',
      descriptionEn: 'Kala Bela inauspicious time slot; avoid entering new homes or signing deeds.',
    },
    {
      id: 'yama',
      nameEn: 'Yama Ghantam',
      nameBn: 'যমঘণ্ট',
      type: 'yama',
      isAuspicious: false,
      startTime: yamaTimes.start,
      endTime: yamaTimes.end,
      durationMinutes: Math.round(slotDurationMs / 60000),
      descriptionBn: 'যমদেবের প্রভাবযুক্ত সময়, গুরুত্বপূর্ণ লেনদেন স্থগিত রাখুন।',
      descriptionEn: 'Yama Ghantam inauspicious window; defer crucial health or legal operations.',
    },
    {
      id: 'gulika',
      nameEn: 'Gulika Kalam',
      nameBn: 'গুলিকাকাল',
      type: 'gulika',
      isAuspicious: false,
      startTime: gulikaTimes.start,
      endTime: gulikaTimes.end,
      durationMinutes: Math.round(slotDurationMs / 60000),
      descriptionBn: 'শনির পুত্রের প্রভাবযুক্ত কাল। সাবধানতা অবলম্বন বাঞ্ছনীয়।',
      descriptionEn: 'Gulika time slot ruled by Saturn son; keep endeavors steady.',
    }
  ];
}

/**
 * Computes Disha Shool (Travel Directions Caution) & Remedies
 */
export function getDishaShool(dayOfWeek: number): { directionEn: string; directionBn: string; remedyBn: string } {
  const rules = [
    { directionEn: 'West', directionBn: 'পশ্চিম দিক', remedyBn: 'যাত্রার পূর্বে সামান্য কর্পূর বা ঘি সেবন ও গুরু প্রণাম শ্রেয়।' }, // Sun
    { directionEn: 'East', directionBn: 'পূর্ব দিক', remedyBn: 'যাত্রার পূর্বে দর্পণ দর্শন বা সামান্য কাঁচা দুধ পান শুভ।' }, // Mon
    { directionEn: 'North', directionBn: 'উত্তর দিক', remedyBn: 'যাত্রার পূর্বে সামান্য গুড় বা ধনেপাতা মুখে দিয়ে বের হওয়া উচিত।' }, // Tue
    { directionEn: 'North', directionBn: 'উত্তর দিক', remedyBn: 'যাত্রার পূর্বে সামান্য কাঁচা তিল বা ঘি সেবন করা উচিত।' }, // Wed
    { directionEn: 'South', directionBn: 'দক্ষিণ দিক', remedyBn: 'যাত্রার পূর্বে সামান্য দই বা সর্ষে মুখে স্পর্শ করা শুভ।' }, // Thu
    { directionEn: 'West', directionBn: 'পশ্চিম দিক', remedyBn: 'যাত্রার পূর্বে বার্লি বা ক্ষীর আহার করে যাত্রা প্রশস্ত।' }, // Fri
    { directionEn: 'East', directionBn: 'পূর্ব দিক', remedyBn: 'যাত্রার পূর্বে সামান্য আদা বা কৃষ্ণতিল ভক্ষণ করা বিধেয়।' }, // Sat
  ];
  return rules[dayOfWeek] || rules[0];
}

/**
 * Builds Full Day Panjika Object for any Gregorian Date & Location
 */
export function getDayPanjika(
  date: Date,
  location: LocationConfig = LOCATIONS[0],
  method: CalculationMethod = 'surya_siddhanta'
): DayPanjika {
  const sunTimes = calculateSunTimes(date, location.lat, location.lng, location.utcOffset);
  const bengaliDate = getBengaliDate(date, method);
  const panchang = calculatePanchangLimbs(date, sunTimes.sunriseDate, sunTimes.sunsetDate);
  const muhurats = calculateMuhurats(date, sunTimes.sunriseDate, sunTimes.sunsetDate, panchang.nakshatra.index);
  const festivals = getFestivalsForDate(date, bengaliDate, panchang.tithi, panchang.paksha);
  const dishaShool = getDishaShool(date.getDay());

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  // Auspicious ceremonies lookup
  const auspiciousCeremonies: { type: string; typeBn: string; timing: string }[] = [];
  if (panchang.yoga.isAuspicious && panchang.tithi.natureBn.includes('শুভ')) {
    auspiciousCeremonies.push({
      type: 'general',
      typeBn: 'সর্ববিধ শুভ কর্ম',
      timing: `অমৃতযোগ কাল (${muhurats[0]?.startTime} - ${muhurats[0]?.endTime})`,
    });
  }

  // Fasting checks
  let fastingDetails: { nameBn: string; rulesBn: string; paranaTime?: string } | undefined;
  if (panchang.tithi.nameBn === 'একাদশী') {
    fastingDetails = {
      nameBn: 'পবিত্র একাদশী ব্রত ও নির্জলা উপবাস',
      rulesBn: 'অন্ন, পঞ্চরবি ও তামসিক আহার বর্জনীয়। শ্রীহরির নাম সংকীর্তন ও গীতা পাঠ প্রশস্ত।',
      paranaTime: `পরদিন প্রাতঃ ${sunTimes.sunrise} হইতে সকাল ০৯:৩০ ঘটিকার মধ্যে`,
    };
  } else if (panchang.tithi.nameBn === 'পূর্ণিমা') {
    fastingDetails = {
      nameBn: 'শ্রী শ্রী সত্যনারায়ণ পূজা ও পূর্ণিমা ব্রত',
      rulesBn: 'সন্ধ্যায় চন্দ্র দর্শনের পর সিন্নি ভোগ ও ফলমূল গ্রহণ বিধেয়।',
    };
  } else if (panchang.tithi.nameBn === 'অমাবস্যা') {
    fastingDetails = {
      nameBn: 'অমাবস্যা পিতৃ তর্পণ ও মা কালীর বিশেষ পূজা',
      rulesBn: 'পূর্বপুরুষগণের উদ্দেশ্যে জলদান ও তর্পণ কর্ম সমাপন করুন।',
    };
  }

  return {
    gregorianDate: date,
    dateStr,
    bengaliDate,
    tithi: panchang.tithi,
    nakshatra: panchang.nakshatra,
    yoga: panchang.yoga,
    karana: panchang.karana,
    paksha: panchang.paksha,
    sunrise: sunTimes.sunrise,
    sunset: sunTimes.sunset,
    moonrise: '০৭:৪৫ PM',
    moonset: '০৬:১২ AM',
    sunSign: panchang.sunSign,
    moonSign: panchang.moonSign,
    muhurats,
    festivals,
    auspiciousCeremonies,
    fastingDetails,
    dishaShool,
    chandraSuddhiBn: `চন্দ্র আজ ${panchang.moonSign.nameBn} রাশিতে অবস্থান করায় ${panchang.moonSign.nameBn}, কর্কট ও বৃশ্চিক রাশির জন্য অনুকূল।`,
    taraSuddhiBn: `${panchang.nakshatra.nameBn} নক্ষত্রের জন্য সাধক ও মিত্র তারা শুভফলদায়ী।`,
  };
}

/**
 * Generates Gregorian Month Calendar Days
 */
export function getMonthCalendarDays(
  year: number,
  monthIndex: number, // 0-11
  location: LocationConfig = LOCATIONS[0],
  method: CalculationMethod = 'surya_siddhanta'
): DayPanjika[] {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const list: DayPanjika[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const curDate = new Date(year, monthIndex, d, 12, 0, 0);
    list.push(getDayPanjika(curDate, location, method));
  }

  return list;
}

/**
 * Generates authentic Bengali Month Calendar Days (e.g. 1st Boishakh to 31st Boishakh)
 */
export function getBengaliMonthCalendarDays(
  bengaliYear: number,
  bengaliMonthIndex: number, // 0 = Boishakh ... 11 = Choitro
  location: LocationConfig = LOCATIONS[0],
  method: CalculationMethod = 'surya_siddhanta'
): { days: DayPanjika[]; firstDayWeekday: number } {
  const startDate = bengaliToGregorianDate(bengaliYear, bengaliMonthIndex, 1, method);
  const days: DayPanjika[] = [];
  let cur = new Date(startDate);

  while (true) {
    const panjika = getDayPanjika(cur, location, method);
    if (panjika.bengaliDate.year === bengaliYear && panjika.bengaliDate.monthIndex === bengaliMonthIndex) {
      days.push(panjika);
      // Advance by 1 day
      cur = new Date(cur.getTime() + 24 * 60 * 60 * 1000);
    } else {
      break;
    }
  }

  const firstDayWeekday = days.length > 0 ? days[0].gregorianDate.getDay() : 0;
  return { days, firstDayWeekday };
}

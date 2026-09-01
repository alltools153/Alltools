export type Language = 'bn' | 'en';
export type Numerals = 'bn' | 'en';
export type CalculationMethod = 'surya_siddhanta' | 'drik_siddhanta' | 'bangladesh_academy';
export type ThemeMode = 'parchment' | 'crimson' | 'dark';

export interface LocationConfig {
  id: string;
  name: string;
  bengaliName: string;
  country: string;
  countryBengali: string;
  lat: number;
  lng: number;
  timezone: string;
  utcOffset: number;
}

export interface BengaliRitu {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionBn: string;
  descriptionEn: string;
  monthsBn: string;
}

export interface BengaliMonthInfo {
  index: number;
  nameEn: string;
  nameBn: string;
  days: number;
  seasonEn: string;
  seasonBn: string;
  deity: string;
  historicalSignificance: string;
}

export interface BengaliDate {
  day: number;
  monthIndex: number;
  monthNameEn: string;
  monthNameBn: string;
  year: number; // e.g. 1431, 1432, 1433
  yearBn: string;
  ritu: BengaliRitu;
  barEn: string;
  barBn: string;
  barShortBn: string;
  planetLordBn: string;
  sakabdo: number;
  tripurabdo: number;
  formattedBn: string;
  formattedEn: string;
  dayBn?: string;
  sakabdoBn?: string;
  seasonBn?: string;
  periodBn?: string;
  tithiBn?: string;
  pakshaBn?: string;
  nakshatraBn?: string;
}

export interface TithiInfo {
  index: number; // 1 to 30
  nameEn: string;
  nameBn: string;
  paksha: 'shukla' | 'krishna';
  pakshaBn: string;
  numberInPaksha: number; // 1 to 15
  deityBn: string;
  natureBn: string;
  endTime?: string;
  percentage?: number;
}

export interface NakshatraInfo {
  index: number; // 1 to 27
  nameEn: string;
  nameBn: string;
  lordBn: string;
  gana: 'দেব' | 'নর' | 'রাক্ষস';
  ganaEn: 'Deva' | 'Manushya' | 'Rakshasa';
  yoniBn: string;
  nadiBn: string;
  symbolBn: string;
  endTime?: string;
}

export interface YogaInfo {
  index: number; // 1 to 27
  nameEn: string;
  nameBn: string;
  natureBn: 'শুভ' | 'অশুভ' | 'মিশ্র';
  isAuspicious: boolean;
  endTime?: string;
}

export interface KaranaInfo {
  index: number; // 1 to 11
  nameEn: string;
  nameBn: string;
  typeBn: 'চর' | 'স্থির';
  deityBn: string;
  endTime?: string;
}

export type MuhuratType = 
  | 'amrita' 
  | 'mahendra' 
  | 'abhijit' 
  | 'brahma' 
  | 'godhuli' 
  | 'rahu' 
  | 'yama' 
  | 'gulika' 
  | 'barabela' 
  | 'kalabela' 
  | 'kalaratri';

export interface MuhuratSlot {
  id: string;
  nameEn: string;
  nameBn: string;
  type: MuhuratType;
  isAuspicious: boolean;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  descriptionBn: string;
  descriptionEn: string;
}

export interface Festival {
  id: string;
  nameEn: string;
  nameBn: string;
  category: 'puja' | 'fasting' | 'cultural' | 'holiday' | 'ekadashi' | 'sankranti';
  dateStr: string; // YYYY-MM-DD
  bengaliDateStr: string;
  descriptionBn: string;
  descriptionEn: string;
  isPublicHoliday?: boolean;
  tithiRequirementBn?: string;
  pujaTimings?: { labelBn: string; labelEn: string; time: string }[];
  ritualsBn?: string[];
}

export interface DayPanjika {
  gregorianDate: Date;
  dateStr: string; // YYYY-MM-DD
  bengaliDate: BengaliDate;
  tithi: TithiInfo;
  nakshatra: NakshatraInfo;
  yoga: YogaInfo;
  karana: KaranaInfo;
  paksha: 'shukla' | 'krishna';
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  sunSign: { nameEn: string; nameBn: string; degrees: number };
  moonSign: { nameEn: string; nameBn: string; degrees: number };
  muhurats: MuhuratSlot[];
  activeMuhurat?: MuhuratSlot;
  festivals: Festival[];
  auspiciousCeremonies: { type: string; typeBn: string; timing: string }[];
  fastingDetails?: { nameBn: string; rulesBn: string; paranaTime?: string };
  dishaShool: { directionEn: string; directionBn: string; remedyBn: string };
  chandraSuddhiBn: string;
  taraSuddhiBn: string;
}

export interface RashiDetails {
  id: number;
  nameEn: string;
  nameBn: string;
  symbol: string;
  elementBn: string;
  elementEn: string;
  rulerBn: string;
  rulerEn: string;
  luckyColorBn: string;
  luckyColorEn: string;
  luckyNumber: number;
  luckyGemsBn: string;
  dailyPredictionBn: {
    general: string;
    career: string;
    finance: string;
    love: string;
    health: string;
    advice: string;
  };
  dailyPredictionEn: {
    general: string;
    career: string;
    finance: string;
    love: string;
    health: string;
    advice: string;
  };
}

export interface KundaliKutaResult {
  nameBn: string;
  nameEn: string;
  maxPoints: number;
  obtainedPoints: number;
  descriptionBn: string;
  descriptionEn: string;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

export interface KundaliMilanReport {
  groomRashi: RashiDetails;
  groomNakshatra: NakshatraInfo;
  brideRashi: RashiDetails;
  brideNakshatra: NakshatraInfo;
  kutas: KundaliKutaResult[];
  totalScore: number;
  maxScore: 36;
  percentage: number;
  verdictBn: string;
  verdictEn: string;
  manglikGroom: boolean;
  manglikBride: boolean;
  manglikAnalysisBn: string;
  nadiDosha: boolean;
  bhakootDosha: boolean;
  ganaDosha: boolean;
  remediesBn: string[];
}

export interface BabyNameRecord {
  id: string;
  nameBn: string;
  nameEn: string;
  gender: 'boy' | 'girl' | 'unisex';
  rashiBn: string;
  rashiEn: string;
  nakshatraBn: string;
  startingLetterBn: string;
  meaningBn: string;
  meaningEn: string;
  popularityTag?: 'Traditional' | 'Modern' | 'Royal' | 'Vedic';
}

export interface PersonalNote {
  id: string;
  dateStr: string; // YYYY-MM-DD
  bengaliDateStr: string;
  title: string;
  category: 'brata' | 'tarpan' | 'shraddho' | 'birthday' | 'anniversary' | 'event' | 'other';
  notes: string;
  reminderTime?: string;
  createdAt: number;
}

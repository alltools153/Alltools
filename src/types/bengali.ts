export interface BengaliDateInfo {
  day: number;
  dayBn: string;
  monthIndex: number;
  monthNameEn: string;
  monthNameBn: string;
  seasonBn: string;
  year: number;
  yearBn: string;
  barEn: string;
  barBn: string;
  planetLordBn: string;
  periodBn: string;
  tithiBn: string;
  pakshaBn: string;
  nakshatraBn: string;
  formattedBn: string;
  formattedEn: string;
  sakabdo: number;
  sakabdoBn: string;
}

export interface MuhuratSlot {
  nameEn: string;
  nameBn: string;
  isAuspicious: boolean;
  timeRange: string;
  descriptionBn: string;
}

export interface FestivalItem {
  id: string;
  nameEn: string;
  nameBn: string;
  monthIndex?: number;
  day?: number;
  category: 'puja' | 'cultural' | 'fasting' | 'sankranti';
  isPublicHoliday: boolean;
  descriptionBn: string;
  dateStr?: string;
}

export interface CalendarDayRecord {
  bengaliDay: number;
  bengaliDayBn: string;
  gregorianDateStr: string;
  gregorianDay: number;
  weekdayBn: string;
  tithiBn: string;
  nakshatraBn: string;
  isSunday: boolean;
}

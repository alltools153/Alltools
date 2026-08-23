import { BengaliMonthInfo, BengaliRitu, LocationConfig, NakshatraInfo, RashiDetails, TithiInfo, YogaInfo, KaranaInfo } from '@/types/panjika';

export const LOCATIONS: LocationConfig[] = [
  {
    id: 'kolkata',
    name: 'Kolkata, India',
    bengaliName: 'কলকাতা, ভারত',
    country: 'India',
    countryBengali: 'ভারত',
    lat: 22.5726,
    lng: 88.3639,
    timezone: 'Asia/Kolkata',
    utcOffset: 5.5,
  },
  {
    id: 'dhaka',
    name: 'Dhaka, Bangladesh',
    bengaliName: 'ঢাকা, বাংলাদেশ',
    country: 'Bangladesh',
    countryBengali: 'বাংলাদেশ',
    lat: 23.8103,
    lng: 90.4125,
    timezone: 'Asia/Dhaka',
    utcOffset: 6.0,
  },
  {
    id: 'siliguri',
    name: 'Siliguri / North Bengal',
    bengaliName: 'শিলিগুড়ি, উত্তরবঙ্গ',
    country: 'India',
    countryBengali: 'ভারত',
    lat: 26.7271,
    lng: 88.3953,
    timezone: 'Asia/Kolkata',
    utcOffset: 5.5,
  },
  {
    id: 'agartala',
    name: 'Agartala, Tripura',
    bengaliName: 'আগরতলা, ত্রিপুরা',
    country: 'India',
    countryBengali: 'ভারত',
    lat: 23.8315,
    lng: 91.2868,
    timezone: 'Asia/Kolkata',
    utcOffset: 5.5,
  },
  {
    id: 'chattogram',
    name: 'Chattogram, Bangladesh',
    bengaliName: 'চট্টগ্রাম, বাংলাদেশ',
    country: 'Bangladesh',
    countryBengali: 'বাংলাদেশ',
    lat: 22.3569,
    lng: 91.7832,
    timezone: 'Asia/Dhaka',
    utcOffset: 6.0,
  },
  {
    id: 'delhi',
    name: 'New Delhi, India',
    bengaliName: 'নয়াদিল্লি, ভারত',
    country: 'India',
    countryBengali: 'ভারত',
    lat: 28.6139,
    lng: 77.2090,
    timezone: 'Asia/Kolkata',
    utcOffset: 5.5,
  },
  {
    id: 'mumbai',
    name: 'Mumbai, India',
    bengaliName: 'মুম্বাই, ভারত',
    country: 'India',
    countryBengali: 'ভারত',
    lat: 19.0760,
    lng: 72.8777,
    timezone: 'Asia/Kolkata',
    utcOffset: 5.5,
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru, India',
    bengaliName: 'বেঙ্গালুরু, ভারত',
    country: 'India',
    countryBengali: 'ভারত',
    lat: 12.9716,
    lng: 77.5946,
    timezone: 'Asia/Kolkata',
    utcOffset: 5.5,
  },
  {
    id: 'london',
    name: 'London, UK',
    bengaliName: 'লন্ডন, যুক্তরাজ্য',
    country: 'United Kingdom',
    countryBengali: 'যুক্তরাজ্য',
    lat: 51.5074,
    lng: -0.1278,
    timezone: 'Europe/London',
    utcOffset: 0.0,
  },
  {
    id: 'newyork',
    name: 'New York, USA',
    bengaliName: 'নিউইয়র্ক, যুক্তরাষ্ট্র',
    country: 'USA',
    countryBengali: 'যুক্তরাষ্ট্র',
    lat: 40.7128,
    lng: -74.0060,
    timezone: 'America/New_York',
    utcOffset: -5.0,
  },
  {
    id: 'sanfrancisco',
    name: 'San Francisco, USA',
    bengaliName: 'সান ফ্রান্সিসকো, যুক্তরাষ্ট্র',
    country: 'USA',
    countryBengali: 'যুক্তরাষ্ট্র',
    lat: 37.7749,
    lng: -122.4194,
    timezone: 'America/Los_Angeles',
    utcOffset: -8.0,
  },
  {
    id: 'dubai',
    name: 'Dubai, UAE',
    bengaliName: 'দুবাই, সংযুক্ত আরব আমিরাত',
    country: 'UAE',
    countryBengali: 'ইউএই',
    lat: 25.2048,
    lng: 55.2708,
    timezone: 'Asia/Dubai',
    utcOffset: 4.0,
  },
  {
    id: 'singapore',
    name: 'Singapore',
    bengaliName: 'সিঙ্গাপুর',
    country: 'Singapore',
    countryBengali: 'সিঙ্গাপুর',
    lat: 1.3521,
    lng: 103.8198,
    timezone: 'Asia/Singapore',
    utcOffset: 8.0,
  },
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    bengaliName: 'সিডনি, অস্ট্রেলিয়া',
    country: 'Australia',
    countryBengali: 'অস্ট্রেলিয়া',
    lat: -33.8688,
    lng: 151.2093,
    timezone: 'Australia/Sydney',
    utcOffset: 10.0,
  }
];

export const BENGALI_MONTHS: BengaliMonthInfo[] = [
  { index: 0, nameEn: 'Boishakh', nameBn: 'বৈশাখ', days: 31, seasonEn: 'Summer', seasonBn: 'গ্রীষ্মকাল', deity: 'ইন্দ্র', historicalSignificance: 'নববর্ষ ও হালখাতা উৎসবের সূচনা মাস' },
  { index: 1, nameEn: 'Jyoishtho', nameBn: 'জ্যৈষ্ঠ', days: 31, seasonEn: 'Summer', seasonBn: 'গ্রীষ্মকাল', deity: 'অগ্নি', historicalSignificance: 'জামাই ষষ্ঠী ও মধুর ফলের মাস' },
  { index: 2, nameEn: 'Asharh', nameBn: 'আষাঢ়', days: 31, seasonEn: 'Monsoon', seasonBn: 'বর্ষাকাল', deity: 'বরুণ', historicalSignificance: 'রথযাত্রা ও নববর্ষার আগমন' },
  { index: 3, nameEn: 'Srabon', nameBn: 'শ্রাবণ', days: 31, seasonEn: 'Monsoon', seasonBn: 'বর্ষাকাল', deity: 'শিব', historicalSignificance: 'ঝুলনযাত্রা ও শিব আরাধনার পুণ্য মাস' },
  { index: 4, nameEn: 'Bhadro', nameBn: 'ভাদ্র', days: 31, seasonEn: 'Autumn', seasonBn: 'শরৎকাল', deity: 'ভগ', historicalSignificance: 'জন্মাষ্টমী ও মনসা পূজার মাস' },
  { index: 5, nameEn: 'Ashwin', nameBn: 'আশ্বিন', days: 30, seasonEn: 'Autumn', seasonBn: 'শরৎকাল', deity: 'দুর্গা', historicalSignificance: 'মহালয়া, শারদীয়া দুর্গাপূজা ও লক্ষ্মীপূজা' },
  { index: 6, nameEn: 'Kartik', nameBn: 'কার্তিক', days: 30, seasonEn: 'Late Autumn', seasonBn: 'হেমন্তকাল', deity: 'কার্তিক', historicalSignificance: 'কালীপূজা, দীপাবলি ও ভাইফোঁটা' },
  { index: 7, nameEn: 'Agrahayan', nameBn: 'অগ্রহায়ণ', days: 30, seasonEn: 'Late Autumn', seasonBn: 'হেমন্তকাল', deity: 'লক্ষ্মী', historicalSignificance: 'নবান্ন উৎসব ও নূতন ধানের আনন্দ' },
  { index: 8, nameEn: 'Poush', nameBn: 'পৌষ', days: 30, seasonEn: 'Winter', seasonBn: 'শীতকাল', deity: 'সূর্য', historicalSignificance: 'পৌষ সংক্রান্তি ও পিঠেপুলি পার্বণ' },
  { index: 9, nameEn: 'Magh', nameBn: 'মাঘ', days: 30, seasonEn: 'Winter', seasonBn: 'শীতকাল', deity: 'সরস্বতী', historicalSignificance: 'সরস্বতী পূজা ও গঙ্গাসাগর স্নান' },
  { index: 10, nameEn: 'Falgun', nameBn: 'ফাল্গুন', days: 30, seasonEn: 'Spring', seasonBn: 'বসন্তকাল', deity: 'মদন / কামদেব', historicalSignificance: 'দোলযাত্রা ও শিবরাত্রি উৎসব' },
  { index: 11, nameEn: 'Choitro', nameBn: 'চৈত্র', days: 30, seasonEn: 'Spring', seasonBn: 'বসন্তকাল', deity: 'রুদ্র / শিব', historicalSignificance: 'চড়ক পূজা, গাজন ও বর্ষশেষের নীলপূজা' },
];

export const BENGALI_RITUS: BengaliRitu[] = [
  { id: 'grishma', nameEn: 'Grishma (Summer)', nameBn: 'গ্রীষ্ম ঋতু', descriptionBn: 'প্রখর রৌদ্র, কালবৈশাখী ও সুমিষ্ট আম-কাঁঠালের ঋতু', descriptionEn: 'The fiery warmth and bounty of tropical fruits', monthsBn: 'বৈশাখ - জ্যৈষ্ঠ' },
  { id: 'barsha', nameEn: 'Barsha (Monsoon)', nameBn: 'বর্ষা ঋতু', descriptionBn: 'মেঘের গর্জন, কদম ফুলের সুবাস ও রিমঝিম বৃষ্টির ঋতু', descriptionEn: 'Lush green landscapes, rain showers and blooming Kadamba', monthsBn: 'আষাঢ় - শ্রাবণ' },
  { id: 'sharat', nameEn: 'Sharat (Autumn)', nameBn: 'শরৎ ঋতু', descriptionBn: 'শুভ্র কাশফুল, নীল আকাশ, শিউলি ঝরা সকাল ও মায়ের আগমন', descriptionEn: 'Azure skies, white Kash flowers, and the arrival of Ma Durga', monthsBn: 'ভাদ্র - আশ্বিন' },
  { id: 'hemanta', nameEn: 'Hemanta (Late Autumn)', nameBn: 'হেমন্ত ঋতু', descriptionBn: 'সোনার ধানের মাঠ, হালকা কুয়াশা ও নবান্নের আগমন', descriptionEn: 'Golden harvest, early morning mist and Nabanno feast', monthsBn: 'কার্তিক - অগ্রহায়ণ' },
  { id: 'sheet', nameEn: 'Sheet (Winter)', nameBn: 'শীত ঋতু', descriptionBn: 'খেজুরের নতুন গুড়, পিঠেপুলির স্বাদ ও শান্ত রোদের দিন', descriptionEn: 'Sweet date palm jaggery, warm pithe and cozy mornings', monthsBn: 'পৌষ - মাঘ' },
  { id: 'basanta', nameEn: 'Basanta (Spring)', nameBn: 'বসন্ত ঋতু', descriptionBn: 'পলাশ ও শিমুলের রক্তিম আভা, কোকিলের ডাক ও রঙের মেলা', descriptionEn: 'Fiery Palash blooms, songbirds and colorful Dol Jatra', monthsBn: 'ফাল্গুন - চৈত্র' },
];

export const WEEKDAYS = [
  { index: 0, nameEn: 'Sunday', nameBn: 'রবিবার', shortBn: 'রবি', shortEn: 'Sun', planetLordBn: 'সূর্য (রবি)' },
  { index: 1, nameEn: 'Monday', nameBn: 'সোমবার', shortBn: 'সোম', shortEn: 'Mon', planetLordBn: 'চন্দ্র (সোম)' },
  { index: 2, nameEn: 'Tuesday', nameBn: 'মঙ্গলবার', shortBn: 'মঙ্গল', shortEn: 'Tue', planetLordBn: 'মঙ্গল' },
  { index: 3, nameEn: 'Wednesday', nameBn: 'বুধবার', shortBn: 'বুধ', shortEn: 'Wed', planetLordBn: 'বুধ' },
  { index: 4, nameEn: 'Thursday', nameBn: 'বৃহস্পতিবার', shortBn: 'বৃহস্পতি', shortEn: 'Thu', planetLordBn: 'বৃহস্পতি' },
  { index: 5, nameEn: 'Friday', nameBn: 'শুক্রবার', shortBn: 'শুক্র', shortEn: 'Fri', planetLordBn: 'শুক্র' },
  { index: 6, nameEn: 'Saturday', nameBn: 'শনিবার', shortBn: 'শনি', shortEn: 'Sat', planetLordBn: 'শনি' },
];

export const TITHI_LIST: { nameEn: string; nameBn: string; deityBn: string; natureBn: string }[] = [
  { nameEn: 'Pratipada', nameBn: 'প্রতিপদ', deityBn: 'অগ্নি', natureBn: 'নন্দা (শুভ আরম্ভের জন্য প্রশস্ত)' },
  { nameEn: 'Dwitiya', nameBn: 'দ্বিতীয়া', deityBn: 'ব্রহ্মা', natureBn: 'ভদ্রা (স্থায়ী কাজের জন্য শুভ)' },
  { nameEn: 'Tritiya', nameBn: 'তৃতীয়া', deityBn: 'গৌরী', natureBn: 'জয়া (জয়লাভ ও শুভ কাজের জন্য)' },
  { nameEn: 'Chaturthi', nameBn: 'চতুর্থী', deityBn: 'গণেশ', natureBn: 'রিক্তা (বর্জ্য তিথি, বিঘ্নহারী পূজা শ্রেয়)' },
  { nameEn: 'Panchami', nameBn: 'পঞ্চমী', deityBn: 'সর্প / নাগ', natureBn: 'পূর্ণা (বিদ্যা ও শিল্পকার্যের শুভ)' },
  { nameEn: 'Shashthi', nameBn: 'ষষ্ঠী', deityBn: 'কার্তিকেয়', natureBn: 'নন্দা (সন্তান ও গৃহশান্তির জন্য)' },
  { nameEn: 'Saptami', nameBn: 'সপ্তমী', deityBn: 'সূর্য', natureBn: 'ভদ্রা (ভ্রমণ ও আরোগ্য কামনায়)' },
  { nameEn: 'Ashtami', nameBn: 'অষ্টমী', deityBn: 'মহাদেব / দুর্গা', natureBn: 'জয়া (শক্তিপূজা ও উপবাসের দিন)' },
  { nameEn: 'Navami', nameBn: 'নবমী', deityBn: 'দুর্গা', natureBn: 'রিক্তা (শত্রুদমন ও বিশেষ আরাধনা)' },
  { nameEn: 'Dashami', nameBn: 'দশমী', deityBn: 'যম / দশদিগপাল', natureBn: 'পূর্ণা (বিজয়া ও শুভ যাত্রা)' },
  { nameEn: 'Ekadashi', nameBn: 'একাদশী', deityBn: 'শ্রীহরি বিষ্ণু', natureBn: 'নন্দা (মহাপুণ্যদায়ক ব্রতোপবাস)' },
  { nameEn: 'Dwadashi', nameBn: 'দ্বাদশী', deityBn: 'বিষ্ণু', natureBn: 'ভদ্রা (ব্রত পারণ ও দানকর্ম)' },
  { nameEn: 'Trayodashi', nameBn: 'ত্রয়োদশী', deityBn: 'কামদেব / শিব', natureBn: 'জয়া (প্রদোষব্রত ও আরোগ্য)' },
  { nameEn: 'Chaturdashi', nameBn: 'চতুর্দশী', deityBn: 'শিব / কালী', natureBn: 'রিক্তা (শিবরাত্রি ও নিশীথ পূজা)' },
  { nameEn: 'Purnima', nameBn: 'পূর্ণিমা', deityBn: 'চন্দ্র / সত্যনারায়ণ', natureBn: 'পূর্ণা (সর্বসিদ্ধিদায়িনী পূর্ণ তিথি)' },
];

export const NAKSHATRAS: {
  index: number;
  nameEn: string;
  nameBn: string;
  lordBn: string;
  gana: 'দেব' | 'নর' | 'রাক্ষস';
  ganaEn: 'Deva' | 'Manushya' | 'Rakshasa';
  yoniBn: string;
  nadiBn: string;
  symbolBn: string;
  syllablesBn: string[];
}[] = [
  { index: 1, nameEn: 'Ashwini', nameBn: 'অশ্বিনী', lordBn: 'কেতু', gana: 'দেব', ganaEn: 'Deva', yoniBn: 'অশ্ব', nadiBn: 'আদ্য', symbolBn: 'অশ্বের মস্তক', syllablesBn: ['চু', 'চে', 'চো', 'লা'] },
  { index: 2, nameEn: 'Bharani', nameBn: 'ভরণী', lordBn: 'শুক্র', gana: 'নর', ganaEn: 'Manushya', yoniBn: 'গজ', nadiBn: 'মধ্য', symbolBn: 'যোনি', syllablesBn: ['লী', 'লু', 'লে', 'লো'] },
  { index: 3, nameEn: 'Krittika', nameBn: 'কৃত্তিকা', lordBn: 'সূর্য', gana: 'রাক্ষস', ganaEn: 'Rakshasa', yoniBn: 'মেষ', nadiBn: 'অন্ত্য', symbolBn: 'অগ্নিশিখা / ক্ষুর', syllablesBn: ['অ', 'ই', 'উ', 'এ'] },
  { index: 4, nameEn: 'Rohini', nameBn: 'রোহিণী', lordBn: 'চন্দ্র', gana: 'নর', ganaEn: 'Manushya', yoniBn: 'সর্প', nadiBn: 'অন্ত্য', symbolBn: 'রথ / শকট', syllablesBn: ['ও', 'বা', 'বী', 'বু'] },
  { index: 5, nameEn: 'Mrigashira', nameBn: 'মৃগশিরা', lordBn: 'মঙ্গল', gana: 'দেব', ganaEn: 'Deva', yoniBn: 'সর্প', nadiBn: 'মধ্য', symbolBn: 'হরিণ মস্তক', syllablesBn: ['বে', 'বো', 'কা', 'কী'] },
  { index: 6, nameEn: 'Ardra', nameBn: 'আর্দ্রা', lordBn: 'রাহু', gana: 'নর', ganaEn: 'Manushya', yoniBn: 'শ্বান', nadiBn: 'আদ্য', symbolBn: 'অশ্রুবিন্দু / মণি', syllablesBn: ['কু', 'ঘ', 'ঙ', 'ছ'] },
  { index: 7, nameEn: 'Punarvasu', nameBn: 'পুনর্বসু', lordBn: 'বৃহস্পতি', gana: 'দেব', ganaEn: 'Deva', yoniBn: 'মার্জার', nadiBn: 'আদ্য', symbolBn: 'ধনু ও তূণীর', syllablesBn: ['কে', 'কো', 'হা', 'হী'] },
  { index: 8, nameEn: 'Pushya', nameBn: 'পুষ্যা', lordBn: 'শনি', gana: 'দেব', ganaEn: 'Deva', yoniBn: 'মেষ', nadiBn: 'মধ্য', symbolBn: 'পদ্ম / গোস্তনাগ্র', syllablesBn: ['হু', 'হে', 'হো', 'ডা'] },
  { index: 9, nameEn: 'Ashlesha', nameBn: 'অশ্লেষা', lordBn: 'বুধ', gana: 'রাক্ষস', ganaEn: 'Rakshasa', yoniBn: 'মার্জার', nadiBn: 'অন্ত্য', symbolBn: 'কুণ্ডলীকৃত সর্প', syllablesBn: ['ডী', 'ডু', 'ডে', 'ডো'] },
  { index: 10, nameEn: 'Magha', nameBn: 'মঘা', lordBn: 'কেতু', gana: 'রাক্ষস', ganaEn: 'Rakshasa', yoniBn: 'মূষিক', nadiBn: 'অন্ত্য', symbolBn: 'রাজসিংহাসন', syllablesBn: ['মা', 'মী', 'মু', 'মে'] },
  { index: 11, nameEn: 'Purva Phalguni', nameBn: 'পূর্বফল্গুনী', lordBn: 'শুক্র', gana: 'নর', ganaEn: 'Manushya', yoniBn: 'মূষিক', nadiBn: 'মধ্য', symbolBn: 'খাট / দোলনা', syllablesBn: ['মো', 'টা', 'টী', 'টু'] },
  { index: 12, nameEn: 'Uttara Phalguni', nameBn: 'উত্তরফল্গুনী', lordBn: 'সূর্য', gana: 'নর', ganaEn: 'Manushya', yoniBn: 'গো', nadiBn: 'আদ্য', symbolBn: 'শয্যা', syllablesBn: ['টে', 'টো', 'পা', 'পী'] },
  { index: 13, nameEn: 'Hasta', nameBn: 'হস্তা', lordBn: 'চন্দ্র', gana: 'দেব', ganaEn: 'Deva', yoniBn: 'মহিষ', nadiBn: 'আদ্য', symbolBn: 'হাতের তালু', syllablesBn: ['পূ', 'ষ', 'ণ', 'ঠ'] },
  { index: 14, nameEn: 'Chitra', nameBn: 'চিত্রা', lordBn: 'মঙ্গল', gana: 'রাক্ষস', ganaEn: 'Rakshasa', yoniBn: 'ব্যাঘ্র', nadiBn: 'মধ্য', symbolBn: 'উজ্জ্বল মুক্তা', syllablesBn: ['পে', 'পো', 'রা', 'রী'] },
  { index: 15, nameEn: 'Swati', nameBn: 'স্বাতী', lordBn: 'রাহু', gana: 'দেব', ganaEn: 'Deva', yoniBn: 'মহিষ', nadiBn: 'অন্ত্য', symbolBn: 'কচি প্রবাল / অঙ্কুর', syllablesBn: ['রু', 'রে', 'রো', 'তা'] },
  { index: 16, nameEn: 'Vishakha', nameBn: 'বিশাখা', lordBn: 'বৃহস্পতি', gana: 'রাক্ষস', ganaEn: 'Rakshasa', yoniBn: 'ব্যাঘ্র', nadiBn: 'অন্ত্য', symbolBn: 'তোরণ / কুম্ভকার চক্র', syllablesBn: ['তী', 'তু', 'তে', 'তো'] },
  { index: 17, nameEn: 'Anuradha', nameBn: 'অনুরাধা', lordBn: 'শনি', gana: 'দেব', ganaEn: 'Deva', yoniBn: 'হরিণ', nadiBn: 'মধ্য', symbolBn: 'পদ্মফুল', syllablesBn: ['না', 'নী', 'নু', 'নে'] },
  { index: 18, nameEn: 'Jyeshtha', nameBn: 'জ্যেষ্ঠা', lordBn: 'বুধ', gana: 'রাক্ষস', ganaEn: 'Rakshasa', yoniBn: 'হরিণ', nadiBn: 'আদ্য', symbolBn: 'কুণ্ডল / ছাতা', syllablesBn: ['নো', 'যা', 'যী', 'যু'] },
  { index: 19, nameEn: 'Mula', nameBn: 'মূল', lordBn: 'কেতু', gana: 'রাক্ষস', ganaEn: 'Rakshasa', yoniBn: 'শ্বান', nadiBn: 'আদ্য', symbolBn: 'বৃক্ষমূল / অঙ্কুশ', syllablesBn: ['য়ে', 'যো', 'ভা', 'ভী'] },
  { index: 20, nameEn: 'Purva Ashadha', nameBn: 'পূর্বাষাঢ়া', lordBn: 'শুক্র', gana: 'নর', ganaEn: 'Manushya', yoniBn: 'বানর', nadiBn: 'মধ্য', symbolBn: 'কুলো / হাতপাখা', syllablesBn: ['ভূ', 'ধা', 'ফা', 'ঢা'] },
  { index: 21, nameEn: 'Uttara Ashadha', nameBn: 'উত্তরাষাঢ়া', lordBn: 'সূর্য', gana: 'নর', ganaEn: 'Manushya', yoniBn: 'নকুল', nadiBn: 'অন্ত্য', symbolBn: 'হস্তীদন্ত', syllablesBn: ['ভে', 'ভো', 'জা', 'জী'] },
  { index: 22, nameEn: 'Shravana', nameBn: 'শ্রবণা', lordBn: 'চন্দ্র', gana: 'দেব', ganaEn: 'Deva', yoniBn: 'বানর', nadiBn: 'অন্ত্য', symbolBn: 'কর্ণ / ত্রিশূল', syllablesBn: ['ক্ষী', 'ক্ষু', 'ক্ষে', 'ক্ষো'] },
  { index: 23, nameEn: 'Dhanishta', nameBn: 'ধনিষ্ঠা', lordBn: 'মঙ্গল', gana: 'রাক্ষস', ganaEn: 'Rakshasa', yoniBn: 'সিংহ', nadiBn: 'মধ্য', symbolBn: 'মৃদঙ্গ / ডমরু', syllablesBn: ['গা', 'গী', 'গু', 'গে'] },
  { index: 24, nameEn: 'Shatabhisha', nameBn: 'শতভিষা', lordBn: 'রাহু', gana: 'রাক্ষস', ganaEn: 'Rakshasa', yoniBn: 'অশ্ব', nadiBn: 'আদ্য', symbolBn: 'শত তারকা / বৃত্ত', syllablesBn: ['গো', 'সা', 'সী', 'সু'] },
  { index: 25, nameEn: 'Purva Bhadrapada', nameBn: 'পূর্বভাদ্রপদ', lordBn: 'বৃহস্পতি', gana: 'নর', ganaEn: 'Manushya', yoniBn: 'সিংহ', nadiBn: 'আদ্য', symbolBn: 'দ্বিমুখী তরবারি', syllablesBn: ['সে', 'সো', 'দা', 'দী'] },
  { index: 26, nameEn: 'Uttara Bhadrapada', nameBn: 'উত্তরভাদ্রপদ', lordBn: 'শনি', gana: 'নর', ganaEn: 'Manushya', yoniBn: 'গাভী', nadiBn: 'মধ্য', symbolBn: 'যমজ ব্যক্তি / সর্প', syllablesBn: ['দু', 'থ', 'ঝ', 'ঞ'] },
  { index: 27, nameEn: 'Revati', nameBn: 'রেবতী', lordBn: 'বুধ', gana: 'দেব', ganaEn: 'Deva', yoniBn: 'হস্তিনী', nadiBn: 'অন্ত্য', symbolBn: 'মৎস্য যুগল', syllablesBn: ['দে', 'দো', 'চা', 'চী'] },
];

export const YOGAS: { nameEn: string; nameBn: string; isAuspicious: boolean; natureBn: 'শুভ' | 'অশুভ' | 'মিশ্র' }[] = [
  { nameEn: 'Vishkambha', nameBn: 'বিষ্কুম্ভ', isAuspicious: false, natureBn: 'অশুভ' },
  { nameEn: 'Priti', nameBn: 'প্রীতি', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Ayushman', nameBn: 'আয়ুষ্মান', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Saubhagya', nameBn: 'সৌভাগ্য', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Shobhana', nameBn: 'শোভন', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Atiganda', nameBn: 'অতিগণ্ড', isAuspicious: false, natureBn: 'অশুভ' },
  { nameEn: 'Sukarma', nameBn: 'সুকর্মা', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Dhriti', nameBn: 'ধৃতি', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Shula', nameBn: 'শূল', isAuspicious: false, natureBn: 'অশুভ' },
  { nameEn: 'Ganda', nameBn: 'গণ্ড', isAuspicious: false, natureBn: 'অশুভ' },
  { nameEn: 'Vriddhi', nameBn: 'বৃদ্ধি', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Dhruva', nameBn: 'ধ্রুব', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Vyaghata', nameBn: 'ব্যাঘাত', isAuspicious: false, natureBn: 'অশুভ' },
  { nameEn: 'Harshana', nameBn: 'হর্ষণ', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Vajra', nameBn: 'বজ্র', isAuspicious: false, natureBn: 'অশুভ' },
  { nameEn: 'Siddhi', nameBn: 'সিদ্ধি', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Vyatipata', nameBn: 'ব্যতীপাত', isAuspicious: false, natureBn: 'অশুভ' },
  { nameEn: 'Variyana', nameBn: 'বরীযান', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Parigha', nameBn: 'পরিঘ', isAuspicious: false, natureBn: 'অশুভ' },
  { nameEn: 'Shiva', nameBn: 'শিব', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Siddha', nameBn: 'সিদ্ধ', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Sadhya', nameBn: 'সাধ্য', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Shubha', nameBn: 'শুভ', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Shukla', nameBn: 'শুক্ল', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Brahma', nameBn: 'ব্রহ্ম', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Indra', nameBn: 'ইন্দ্র', isAuspicious: true, natureBn: 'শুভ' },
  { nameEn: 'Vaidhriti', nameBn: 'বৈধৃতি', isAuspicious: false, natureBn: 'অশুভ' },
];

export const KARANAS: { nameEn: string; nameBn: string; typeBn: 'চর' | 'স্থির'; deityBn: string }[] = [
  { nameEn: 'Bava', nameBn: 'বব', typeBn: 'চর', deityBn: 'ইন্দ্র' },
  { nameEn: 'Balava', nameBn: 'বালব', typeBn: 'চর', deityBn: 'ব্রহ্মা' },
  { nameEn: 'Kaulava', nameBn: 'কৌলব', typeBn: 'চর', deityBn: 'সূর্য' },
  { nameEn: 'Taitila', nameBn: 'তৈতিল', typeBn: 'চর', deityBn: 'অর্যমা' },
  { nameEn: 'Gara', nameBn: 'গর', typeBn: 'চর', deityBn: 'ভূমি' },
  { nameEn: 'Vanija', nameBn: 'বণিজ', typeBn: 'চর', deityBn: 'লক্ষ্মী' },
  { nameEn: 'Vishti (Bhadra)', nameBn: 'বিষ্টি (ভদ্রা)', typeBn: 'চর', deityBn: 'যমরাজ' },
  { nameEn: 'Shakuni', nameBn: 'শকুনি', typeBn: 'স্থির', deityBn: 'কলি' },
  { nameEn: 'Chatushpada', nameBn: 'চতুষ্পদ', typeBn: 'স্থির', deityBn: 'রুদ্র' },
  { nameEn: 'Naga', nameBn: 'নাগ', typeBn: 'স্থির', deityBn: 'সর্প' },
  { nameEn: 'Kinstughna', nameBn: 'কিংস্তুঘ্ন', typeBn: 'স্থির', deityBn: 'বায়ু' },
];

export const RASHIS: RashiDetails[] = [
  {
    id: 1,
    nameEn: 'Aries',
    nameBn: 'মেষ',
    symbol: '♈',
    elementBn: 'অগ্নি',
    elementEn: 'Fire',
    rulerBn: 'মঙ্গল',
    rulerEn: 'Mars',
    luckyColorBn: 'রক্তলাল ও উজ্জ্বল সিঁদুর',
    luckyColorEn: 'Crimson Red & Coral',
    luckyNumber: 9,
    luckyGemsBn: 'রক্ত প্রবাল (Coral)',
    dailyPredictionBn: {
      general: 'আজ আপনার কর্মোদ্যম ও তেজ বৃদ্ধি পাবে। নতুন কোনো পরিকল্পনা শুরু করার জন্য বিশেষ শুভ দিন।',
      career: 'কর্মক্ষেত্রে আপনার নেতৃত্বের প্রশংসা হবে। ঊর্ধ্বতন কর্মকর্তাদের সহযোগিতা পাবেন।',
      finance: 'আর্থিক লেনদেনে লাভবান হবেন, তবে আবেগতাড়িত হয়ে বড় ব্যয় করবেন না।',
      love: 'জীবনসঙ্গীর সাথে আনন্দঘন মুহূর্ত কাটবে। পরিবারে শুভ বার্তা আসতে পারে।',
      health: 'রক্তচাপ ও মাথা ব্যথার দিকে খেয়াল রাখুন। পর্যাপ্ত জল পান করুন।',
      advice: 'শ্রী হনুমান চালিসা পাঠ করুন ও সকালে তামার পাত্রে সূর্য প্রণাম করুন।'
    },
    dailyPredictionEn: {
      general: 'Your vitality and enthusiasm will shine today. A great day to embark on ambitious projects.',
      career: 'Your leadership will be commended by senior colleagues. High productivity expected.',
      finance: 'Financial gains are foreseen; avoid impulsive purchases.',
      love: 'Pleasant harmony with your partner; warmth in family relations.',
      health: 'Keep an eye on hydration and mild headaches.',
      advice: 'Chant Hanuman Chalisa and offer water to the rising sun.'
    }
  },
  {
    id: 2,
    nameEn: 'Taurus',
    nameBn: 'বৃষ',
    symbol: '♉',
    elementBn: 'পৃথ্বী',
    elementEn: 'Earth',
    rulerBn: 'শুক্র',
    rulerEn: 'Venus',
    luckyColorBn: 'দুধসাদা ও হালকা গোলাপী',
    luckyColorEn: 'Milky White & Soft Pink',
    luckyNumber: 6,
    luckyGemsBn: 'হীরা বা সাদা জারকন (Diamond / Zircon)',
    dailyPredictionBn: {
      general: 'মানসিক স্থৈর্য ও বৈষয়িক স্বাচ্ছন্দ্য অনুভব করবেন। শিল্প ও নান্দনিক কাজে আগ্রহ বাড়বে।',
      career: 'ব্যবসায়ীদের জন্য নতুন চুক্তির শুভ যোগ। চাকরিতে সুনাম বৃদ্ধি।',
      finance: 'স্থাবর সম্পত্তিতে বিনিয়োগের অনুকূল সময়। সঞ্চয় বৃদ্ধি পাবে।',
      love: 'রোমান্টিক ক্ষেত্রে মধুর সম্পর্ক বজায় থাকবে। উপহার পেতে পারেন।',
      health: 'গলা বা কণ্ঠনালীর হালকা সমস্যা হতে পারে, ঠান্ডা খাবার এড়িয়ে চলুন।',
      advice: 'মা লক্ষ্মীর চরণে সাদা ফুল নিবেদন করুন।'
    },
    dailyPredictionEn: {
      general: 'Mental peace and aesthetic pleasures define your day.',
      career: 'Favorable winds for business partnerships and creative proposals.',
      finance: 'Good opportunities for real estate and stable savings.',
      love: 'Romance flourishes with mutual affection and thoughtful surprises.',
      health: 'Guard against throat irritation; stay warm.',
      advice: 'Offer white flowers to Goddess Lakshmi.'
    }
  },
  {
    id: 3,
    nameEn: 'Gemini',
    nameBn: 'মিথুন',
    symbol: '♊',
    elementBn: 'বায়ু',
    elementEn: 'Air',
    rulerBn: 'বুধ',
    rulerEn: 'Mercury',
    luckyColorBn: 'টিয়াপাখি সবুজ ও ফিরোজা',
    luckyColorEn: 'Parrot Green & Turquoise',
    luckyNumber: 5,
    luckyGemsBn: 'পান্না (Emerald)',
    dailyPredictionBn: {
      general: 'বুদ্ধিমত্তা ও বাগ্মিতা দিয়ে জটিল সমস্যার সমাধান করবেন। যোগাযোগ ক্ষেত্র শুভ।',
      career: 'মিডিয়া, আইটি ও বিপণন ক্ষেত্রে দারুণ সাফল্য। পদোন্নতির বার্তা।',
      finance: 'শেয়ার ও স্বল্পমেয়াদী বিনিয়োগে সতর্কতা অবলম্বন করুন।',
      love: 'বন্ধুদের সহযোগিতায় মনের মানুষের সাথে বোঝাপড়া দৃঢ় হবে।',
      health: 'স্নায়ুবিক চাপ কমাতে ধ্যান ও প্রাণায়াম করুন।',
      advice: 'শ্রী বিষ্ণু সহস্রনাম শ্রবণ করুন ও সবুজ ফল দান করুন।'
    },
    dailyPredictionEn: {
      general: 'Sharp wit and communication skills will help you overcome hurdles.',
      career: 'Breakthroughs in tech, media, and marketing discussions.',
      finance: 'Exercise caution in volatile short-term investments.',
      love: 'Meaningful conversations bring deep harmony in love.',
      health: 'Practice mindfulness to soothe nervous exhaustion.',
      advice: 'Donate green fruits and meditate on Lord Vishnu.'
    }
  },
  {
    id: 4,
    nameEn: 'Cancer',
    nameBn: 'কর্কট',
    symbol: '♋',
    elementBn: 'জল',
    elementEn: 'Water',
    rulerBn: 'চন্দ্র',
    rulerEn: 'Moon',
    luckyColorBn: 'মুক্তা রূপালী ও হালকা নীল',
    luckyColorEn: 'Pearl Silver & Sea Blue',
    luckyNumber: 2,
    luckyGemsBn: 'মুক্তা বা চন্দ্রকান্ত মণি (Pearl / Moonstone)',
    dailyPredictionBn: {
      general: 'আজ আধ্যাত্মিক চিন্তা ও গৃহকল্যাণে মন নিবিষ্ট থাকবে। মাতৃসুলভ স্নেহ পাবেন।',
      career: 'কাজে একাগ্রতা বজায় থাকবে। পারিবারিক ব্যবসায় লাভের মুখ দেখবেন।',
      finance: 'গৃহসজ্জা ও শুভ অনুষ্ঠানে অর্থ ব্যয় হতে পারে।',
      love: 'পারিবারিক জীবনে গভীর সান্ত্বনা ও আনন্দ লাভ।',
      health: 'পেটের গোলযোগ এড়াতে হালকা ও পুষ্টিকর আহার করুন।',
      advice: 'শিবলিঙ্গে কাঁচা দুধ ও জল ঢেলে পূজা করুন।'
    },
    dailyPredictionEn: {
      general: 'Spiritual focus and warmth at home bring deep emotional calm.',
      career: 'High concentration leads to progress in collaborative tasks.',
      finance: 'Expenses towards home improvement or spiritual gatherings.',
      love: 'Heartwarming affection from family and close companions.',
      health: 'Maintain a wholesome diet to avoid digestive sluggishness.',
      advice: 'Offer raw milk and water to Lord Shiva.'
    }
  },
  {
    id: 5,
    nameEn: 'Leo',
    nameBn: 'সিংহ',
    symbol: '♌',
    elementBn: 'অগ্নি',
    elementEn: 'Fire',
    rulerBn: 'সূর্য',
    rulerEn: 'Sun',
    luckyColorBn: 'কাঁচা সোনা ও গৈরিক কমলা',
    luckyColorEn: 'Royal Gold & Saffron',
    luckyNumber: 1,
    luckyGemsBn: 'চুনি বা রুবি (Ruby)',
    dailyPredictionBn: {
      general: 'আপনার তেজ ও ব্যক্তিত্বে চারপাশ আলোকিত হবে। প্রভাবশালী ব্যক্তির সাহায্য পাবেন।',
      career: 'উচ্চপদস্থ মহলে প্রতিপত্তি বাড়বে। প্রশাসনিক কাজে শুভ ফল।',
      finance: 'পূর্বের আটকে থাকা অর্থ ফেরত পাওয়ার প্রবল সম্ভাবনা।',
      love: 'অহংকার পরিহার করে প্রিয়জনের অনুভূতিকে প্রাধান্য দিন।',
      health: 'চোখ ও মেরুদণ্ডের যত্ন নিন। সকালে সূর্যরশ্মি গ্রহণ করুন।',
      advice: 'গায়ত্রী মন্ত্র ১০৮ বার জপ করুন ও পিতার আশীর্বাদ নিন।'
    },
    dailyPredictionEn: {
      general: 'Commanding presence and magnetic charm attract fruitful opportunities.',
      career: 'Significant headway in administrative and leadership initiatives.',
      finance: 'Strong likelihood of recovering pending dues.',
      love: 'Kindness and humility will strengthen your romantic bond.',
      health: 'Take care of your posture and eye health.',
      advice: 'Chant the Gayatri Mantra 108 times and seek elders blessings.'
    }
  },
  {
    id: 6,
    nameEn: 'Virgo',
    nameBn: 'কন্যা',
    symbol: '♍',
    elementBn: 'পৃথ্বী',
    elementEn: 'Earth',
    rulerBn: 'বুধ',
    rulerEn: 'Mercury',
    luckyColorBn: 'গাঢ় সবুজ ও মেটে রঙ',
    luckyColorEn: 'Forest Green & Olive',
    luckyNumber: 5,
    luckyGemsBn: 'পান্না (Emerald)',
    dailyPredictionBn: {
      general: 'সূক্ষ্ম বিশ্লেষণ ও শৃঙ্খলা আপনাকে প্রতিটি কাজে সফলতা এনে দেবে।',
      career: 'হিসাবরক্ষণ, গবেষণা ও লেখালেখির কাজে বিশেষ স্বীকৃতি।',
      finance: 'বাজেট মাফিক চললে আর্থিক সঞ্চয় যথেষ্ট বৃদ্ধি পাবে।',
      love: 'অপ্রয়োজনীয় খুঁতখুঁতে স্বভাব এড়িয়ে চলুন, সম্পর্কে মিষ্টতা বাড়বে।',
      health: 'হজমশক্তির দিকে নজর দিন। সুষম খাদ্য গ্রহণ করুন।',
      advice: 'শ্রী গণপতির চরণে দূর্বা ঘাস নিবেদন করুন।'
    },
    dailyPredictionEn: {
      general: 'Meticulous planning and attention to detail bring spotless execution.',
      career: 'Accolades in analytical, audit, or research endeavors.',
      finance: 'Prudent budgeting solidifies your emergency fund.',
      love: 'Embrace flexibility; warmth replaces critical introspection.',
      health: 'Support gut health with fiber and herbal teas.',
      advice: 'Offer Durva grass to Lord Ganesha.'
    }
  },
  {
    id: 7,
    nameEn: 'Libra',
    nameBn: 'তুলা',
    symbol: '♎',
    elementBn: 'বায়ু',
    elementEn: 'Air',
    rulerBn: 'শুক্র',
    rulerEn: 'Venus',
    luckyColorBn: 'আকাশি নীল ও ক্রিম',
    luckyColorEn: 'Sky Blue & Cream',
    luckyNumber: 6,
    luckyGemsBn: 'হীরা বা ওপাল (Opal / Diamond)',
    dailyPredictionBn: {
      general: 'সামাজিক মেলবন্ধন ও ন্যায়বিচারে আপনার সুনাম বৃদ্ধি পাবে। চারুকলার প্রতি টান বাড়বে।',
      career: 'যৌথ অংশীদারিত্বে নতুন দিগন্ত উন্মোচিত হবে। আইনি বিষয়ে স্বস্তি।',
      finance: 'বিলাসবহুল দ্রব্যে ব্যয় হলেও আয়ের প্রবাহ বজায় থাকবে।',
      love: 'দাম্পত্য জীবন আনন্দময় ও রোমাঞ্চকর কাটবে।',
      health: 'কিডনি ও ত্বকের যত্ন নিন। প্রচুর বিশুদ্ধ জল পান করুন।',
      advice: 'কাউকে সুগন্ধি উপহার দিন এবং মা সরস্বতীর ধ্যান করুন।'
    },
    dailyPredictionEn: {
      general: 'Diplomatic finesse and a sense of harmony bring admiration.',
      career: 'Fruitful outcomes in legal, artistic, and collaborative projects.',
      finance: 'Balanced cash flow despite indulgence in pleasant comforts.',
      love: 'Blissful connection and shared joy with your significant other.',
      health: 'Stay well hydrated and care for your skin.',
      advice: 'Gift perfume or sandalwood to a dear one.'
    }
  },
  {
    id: 8,
    nameEn: 'Scorpio',
    nameBn: 'বৃশ্চিক',
    symbol: '♏',
    elementBn: 'জল',
    elementEn: 'Water',
    rulerBn: 'মঙ্গল ও কেতু',
    rulerEn: 'Mars & Ketu',
    luckyColorBn: 'গাঢ় মেরুন ও খয়েরি',
    luckyColorEn: 'Deep Maroon & Rust',
    luckyNumber: 9,
    luckyGemsBn: 'রক্ত প্রবাল (Red Coral)',
    dailyPredictionBn: {
      general: 'গূঢ় বিষয় ও গবেষণায় অদ্ভুত সাফল্য আসবে। শত্রু পক্ষ পরাভূত হবে।',
      career: 'গোপন পরিকল্পনা সফল হবে। প্রতিদ্বন্দ্বিতায় এগিয়ে থাকবেন।',
      finance: 'গুপ্তধন বা অপ্রত্যাশিত সূত্র থেকে অর্থপ্রাপ্তির সম্ভাবনা।',
      love: 'গভীর আবেগের আদানপ্রদান হবে। বিশ্বাস অক্ষুণ্ণ রাখুন।',
      health: 'উত্তেজনা পরিহার করুন ও পর্যাপ্ত বিশ্রাম নিন।',
      advice: 'মা কালীর নাম স্মরণ করুন ও দুস্থ মানুষকে ভোজন করান।'
    },
    dailyPredictionEn: {
      general: 'Profound intuition and transformative power guide your decisions.',
      career: 'Strategic discreet planning pays handsome dividends.',
      finance: 'Possibility of windfall or unexpected financial turnaround.',
      love: 'Intense emotional bond; cultivate transparent communication.',
      health: 'Avoid stress overload through sound sleep.',
      advice: 'Meditate on Maa Kali and offer food to the needy.'
    }
  },
  {
    id: 9,
    nameEn: 'Sagittarius',
    nameBn: 'ধনু',
    symbol: '♐',
    elementBn: 'অগ্নি',
    elementEn: 'Fire',
    rulerBn: 'বৃহস্পতি',
    rulerEn: 'Jupiter',
    luckyColorBn: 'হলুদ ও বাসন্তী',
    luckyColorEn: 'Yellow & Saffron Gold',
    luckyNumber: 3,
    luckyGemsBn: 'পোখরাজ (Yellow Sapphire)',
    dailyPredictionBn: {
      general: 'উচ্চশিক্ষা ও ধর্মকর্মে আগ্রহ তুঙ্গে থাকবে। দূর ভ্রমণের যোগ রয়েছে।',
      career: 'পরামর্শদাতা ও শিক্ষকগণের জন্য অত্যন্ত শুভ দিন। নতুন দিশা পাবেন।',
      finance: 'ভাগ্যোন্নতি হবে এবং দীর্ঘমেয়াদী বিনিয়োগ লাভবান হবে।',
      love: 'গুরুজনদের আশীর্বাদে শুভ পরিণয় আলোচনা সফল হতে পারে।',
      health: 'যকৃৎ বা থাইরয়েডের যত্ন নিন, অতিরিক্ত তৈলাক্ত খাবার বাদ দিন।',
      advice: 'বৃহস্পতিবার কলার গাছে জল দিন ও শ্রী বৃহস্পতির জপ করুন।'
    },
    dailyPredictionEn: {
      general: 'Optimism, philosophical wisdom, and wanderlust illuminate your day.',
      career: 'Academicians, advisors, and mentors will achieve high acclaim.',
      finance: 'Fortunate gains from long-horizon investments.',
      love: 'Family support strengthens wedding or relationship discussions.',
      health: 'Support liver health; avoid rich, fatty foods.',
      advice: 'Offer water to sacred banana tree on Thursdays.'
    }
  },
  {
    id: 10,
    nameEn: 'Capricorn',
    nameBn: 'মকর',
    symbol: '♑',
    elementBn: 'পৃথ্বী',
    elementEn: 'Earth',
    rulerBn: 'শনি',
    rulerEn: 'Saturn',
    luckyColorBn: 'নীল ও গাঢ় ধূসর',
    luckyColorEn: 'Royal Blue & Charcoal',
    luckyNumber: 8,
    luckyGemsBn: 'নীলা বা অ্যামেথিস্ট (Blue Sapphire / Amethyst)',
    dailyPredictionBn: {
      general: 'কঠোর পরিশ্রমের উপযুক্ত প্রতিদান পাবেন। ধীরস্থিরভাবে কাজ সম্পন্ন করুন।',
      career: 'দায়িত্বপূর্ণ পদে উন্নীত হওয়ার সুযোগ আসবে। ঊর্ধ্বতনদের সন্তুষ্টি।',
      finance: 'আর্থিক ভিত্তি সুদৃঢ় হবে। অপব্যয় রোধ করতে পারবেন।',
      love: 'সম্পর্কে দায়িত্বশীলতা ও পরিপক্কতা বজায় থাকবে।',
      health: 'হাড়ের জোড় ও হাঁটুর ব্যথায় সচেতন থাকুন। হালকা ব্যায়াম করুন।',
      advice: 'শনিবার তিল তেলের প্রদীপ প্রজ্বলন করুন ও দরিদ্রকে সাহায্য করুন।'
    },
    dailyPredictionEn: {
      general: 'Tenacious perseverance yields respected and enduring accomplishments.',
      career: 'Major leadership responsibilities or elevation in status.',
      finance: 'Prudent monetary control fortifies wealth accumulation.',
      love: 'Loyalty and maturity enrich long-term partnerships.',
      health: 'Gentle mobility exercises keep knees and joints supple.',
      advice: 'Light a sesame oil lamp on Saturdays and help workers.'
    }
  },
  {
    id: 11,
    nameEn: 'Aquarius',
    nameBn: 'কুম্ভ',
    symbol: '♒',
    elementBn: 'বায়ু',
    elementEn: 'Air',
    rulerBn: 'শনি ও রাহু',
    rulerEn: 'Saturn & Rahu',
    luckyColorBn: 'বৈদ্যুতিক নীল ও বেগুনী',
    luckyColorEn: 'Electric Blue & Violet',
    luckyNumber: 8,
    luckyGemsBn: 'নীলা বা গোমেদ (Blue Sapphire / Hessonite)',
    dailyPredictionBn: {
      general: 'অভিনব ভাবনা ও সমাজকল্যাণমূলক কাজে আপনার নেতৃত্ব সমাদৃত হবে।',
      career: 'প্রযুক্তি ও গবেষণায় বড় সাফল্য। দলের সাথে সমন্বয় চমৎকার হবে।',
      finance: 'বন্ধুবান্ধব ও শুভানুধ্যায়ীদের সহযোগিতায় আর্থিক সমৃদ্ধি।',
      love: 'খোলামেলা ভাব প্রকাশ করুন, প্রিয়জন আপনার দৃষ্টিভঙ্গি বুঝবেন।',
      health: 'পায়ের গোড়ালি ও রক্ত সঞ্চালনের দিকে লক্ষ্য রাখুন।',
      advice: 'অসহায় পাখিদের শস্যদানা ও জল পরিবেশন করুন।'
    },
    dailyPredictionEn: {
      general: 'Visionary thinking and humanitarian zeal inspire those around you.',
      career: 'Breakthrough in digital, tech, or group ventures.',
      finance: 'Lucrative outcomes via networking and forward-looking ideas.',
      love: 'Sincere friendship forms the backbone of romantic bliss.',
      health: 'Ensure good circulation in calves and ankles.',
      advice: 'Feed grains and clean water to birds.'
    }
  },
  {
    id: 12,
    nameEn: 'Pisces',
    nameBn: 'মীন',
    symbol: '♓',
    elementBn: 'জল',
    elementEn: 'Water',
    rulerBn: 'বৃহস্পতি ও কেতু',
    rulerEn: 'Jupiter & Ketu',
    luckyColorBn: 'সোনালী হলুদ ও সামুদ্রিক সবুজ',
    luckyColorEn: 'Golden Yellow & Sea Green',
    luckyNumber: 3,
    luckyGemsBn: 'পোখরাজ বা মুক্তা (Yellow Sapphire / Pearl)',
    dailyPredictionBn: {
      general: 'আধ্যাত্মিক অনুভূতি, পরোপকার ও সৃজনশীলতায় হৃদয় ভরে উঠবে।',
      career: 'চিকিৎসা, সমাজসেবা ও শিল্পমাধ্যমে বিশেষ প্রশংসা পাবেন।',
      finance: 'দান-ধ্যানে ব্যয় হলেও ঈশ্বরকৃপায় অর্থাভাব হবে না।',
      love: 'নিঃস্বার্থ ভালোবাসা ও মানসিক গভীরতায় সম্পর্ক উজ্জ্বল হবে।',
      health: 'পায়ের পাতা ও ঘুমের ছন্দ ঠিক রাখুন। ধ্যানে বসুন।',
      advice: 'ভগবান শ্রী সত্যনারায়ণের কথা শ্রবণ করুন ও মিষ্টি ভোগ দিন।'
    },
    dailyPredictionEn: {
      general: 'Intuitive grace, artistic compassion, and spiritual elevation.',
      career: 'Fulfillment in healing, artistic, and advisory domains.',
      finance: 'Benevolent donations accompanied by divine providence.',
      love: 'Soulful tenderness and deep spiritual camaraderie.',
      health: 'Prioritize restful sleep and relaxing foot baths.',
      advice: 'Listen to Satyanarayan Katha and distribute sweet prasad.'
    }
  }
];

// Helper Functions
export {
  BENGALI_DIGITS,
  ENGLISH_DIGITS,
  BENGALI_ORDINALS,
  toBengaliNumeral as toBengaliDigits,
  toBengaliNumber,
  toEnglishNumeral as toEnglishDigits,
  formatBengaliTime as formatTimeBengali,
  formatBengaliOrdinal,
  formatBengaliCounter,
  formatBengaliCurrency,
  padBengaliZero,
} from '../bengaliNumerals';

export function normalizeBengali(str: string | null | undefined): string {
  if (!str) return '';
  return String(str).normalize('NFC');
}

import { BengaliDate, Festival, TithiInfo } from '@/types/panjika';

export interface AuspiciousDateRecord {
  id: string;
  category: 'bibaho' | 'griha_pravesh' | 'annaprashan' | 'upanayan' | 'sadhbhakhon' | 'kray_bikray' | 'byabsa_arambha';
  categoryBn: string;
  gregorianDateStr: string;
  bengaliDateStr: string;
  tithiBn: string;
  nakshatraBn: string;
  lagnaTimingsBn: string[];
  notesBn: string;
}

export interface EkadashiRecord {
  id: string;
  nameBn: string;
  nameEn: string;
  pakshaBn: string;
  bengaliMonthBn: string;
  gregorianDateStr: string;
  fastingRuleBn: string;
  paranaTimeBn: string;
  significanceBn: string;
}

export const FESTIVALS_DATABASE: Festival[] = [
  // 1. Poila Boishakh (Bengali New Year)
  {
    id: 'poila-boishakh',
    nameEn: 'Poila Boishakh (Nababarsho)',
    nameBn: 'পয়লা বৈশাখ (শুভ নববর্ষ ও শুভ হালখাতা)',
    category: 'cultural',
    dateStr: '2026-04-15',
    bengaliDateStr: '১ বৈশাখ',
    descriptionBn: 'শুভ নববর্ষ! ব্যবসায়ীদের শুভ হালখাতা ও শ্রী গণেশ-লক্ষ্মী পূজা। নতুন বস্ত্র ও মিষ্টিমুখের আনন্দময় মিলনমেলা।',
    descriptionEn: 'Bengali New Year day with opening of new financial ledgers (Haal Khata) and joyous family gatherings.',
    tithiRequirementBn: 'মেষ সংক্রান্তি পরবর্তী প্রথম দিবস',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'হালখাতা ও গণেশ পূজা লগ্ন', labelEn: 'Haal Khata Puja Time', time: 'সকাল ০৭:০০ - ১১:৩০' },
    ],
    ritualsBn: ['নূতন বস্ত্র পরিধান', 'মন্দিরে গিয়ে ঠাকুরের চরণস্পর্শ', 'হালখাতায় মিষ্টি ও স্বস্তিক চিহ্ন অঙ্কন'],
  },

  // 2. Akshaya Tritiya
  {
    id: 'akshaya-tritiya',
    nameEn: 'Akshaya Tritiya & Haal Khata',
    nameBn: 'অক্ষয় তৃতীয়া ও শুভ মহালগ্ন',
    category: 'puja',
    dateStr: '2026-04-19',
    bengaliDateStr: '৫ বৈশাখ',
    descriptionBn: 'সর্বশুভ কাজে অক্ষয় ফলদায়ী মহাপুণ্য তিথি। স্বর্ণ-রৌপ্য ক্রয়, গৃহ আরম্ভ ও জগন্নাথ দেবের রথ নির্মাণ সূচনা।',
    descriptionEn: 'Day of eternal prosperity and auspicious beginnings for investments and business.',
    tithiRequirementBn: 'বৈশাখী শুক্লা তৃতীয়া',
    isPublicHoliday: false,
    pujaTimings: [
      { labelBn: 'শুভ মুহূর্ত', labelEn: 'Auspicious Window', time: 'সকাল ০৬:০০ - দুপুর ১২:১৫' },
    ],
  },

  // 3. Rabindra Jayanti
  {
    id: 'rabindra-jayanti',
    nameEn: 'Rabindra Jayanti (25 Boishakh)',
    nameBn: 'কবিগুরু রবীন্দ্রনাথ ঠাকুরের জন্মজয়ন্তী (২৫ বৈশাখ)',
    category: 'cultural',
    dateStr: '2026-05-09',
    bengaliDateStr: '২৫ বৈশাখ',
    descriptionBn: 'বিশ্বকবি রবীন্দ্রনাথ ঠাকুরের শুভ জন্মবার্ষিকী। শান্তিনিকেতন ও সমগ্র বাংলায় প্রভাতফেরি, রবীন্দ্রসঙ্গীত ও সাংস্কৃতিক অনুষ্ঠান।',
    descriptionEn: 'Birth anniversary of Nobel Laureate Rabindranath Tagore celebrated with music and literature.',
    isPublicHoliday: true,
  },

  // 4. Buddha Purnima
  {
    id: 'buddha-purnima',
    nameEn: 'Buddha Purnima & Boishakhi Purnima',
    nameBn: 'বুদ্ধ পূর্ণিমা ও বৈশাখী পূর্ণিমা স্নান',
    category: 'cultural',
    dateStr: '2026-05-31',
    bengaliDateStr: '১৬ জ্যৈষ্ঠ',
    descriptionBn: 'ভগবান গৌতম বুদ্ধের শুভ জন্ম, বোধিলাভ ও মহাপরিনির্বাণ পুণ্যতিথি।',
    descriptionEn: 'Triple-blessed full moon celebrating the birth, enlightenment, and parinirvana of Gautama Buddha.',
    tithiRequirementBn: 'বৈশাখী পূর্ণিমা',
    isPublicHoliday: true,
  },

  // 5. Nazrul Jayanti
  {
    id: 'nazrul-jayanti',
    nameEn: 'Kazi Nazrul Islam Jayanti',
    nameBn: 'বিদ্রোহী কবি কাজী নজরুল ইসলামের জন্মজয়ন্তী',
    category: 'cultural',
    dateStr: '2026-05-25',
    bengaliDateStr: '১০ জ্যৈষ্ঠ',
    descriptionBn: 'জাতীয় কবি ও সাম্যবাদের অমর কণ্ঠস্বর কাজী নজরুল ইসলামের জন্মবার্ষিকী।',
    descriptionEn: 'Birth anniversary of the legendary rebel poet Kazi Nazrul Islam.',
    isPublicHoliday: false,
  },

  // 6. Jamai Shashthi
  {
    id: 'jamai-shashthi',
    nameEn: 'Jamai Shashthi',
    nameBn: 'জামাই ষষ্ঠী ব্রত ও পারিবারিক উৎসব',
    category: 'cultural',
    dateStr: '2026-06-20',
    bengaliDateStr: '৫ আষাঢ়',
    descriptionBn: 'জামাতাকে আপ্যায়ন, ধান-দূর্বায় আশীর্বাদ ও সুমিষ্ট আম-কাঁঠাল-ইলিশের পারিবারিক প্রীতিভোজ।',
    descriptionEn: 'Traditional Bengali festival honoring sons-in-law with festive meals and family blessings.',
    tithiRequirementBn: 'জ্যৈষ্ঠ শুক্লা ষষ্ঠী',
    isPublicHoliday: false,
  },

  // 7. Sri Jagannath Snan Yatra
  {
    id: 'snan-yatra',
    nameEn: 'Snan Yatra (Sri Jagannath)',
    nameBn: 'শ্রী শ্রী জগন্নাথ দেবের স্নানযাত্রা',
    category: 'puja',
    dateStr: '2026-06-29',
    bengaliDateStr: '১৪ আষাঢ়',
    descriptionBn: '১০৮ সুগন্ধি বারিঘটে জগন্নাথ, বলভদ্র ও সুভদ্রা দেবীর মহাস্নান ও গজানন বেশ ধারণ।',
    descriptionEn: 'The grand ceremonial bathing of Lord Jagannath with 108 fragrant holy water vessels.',
    tithiRequirementBn: 'জ্যৈষ্ঠ পূর্ণিমা',
    isPublicHoliday: false,
  },

  // 8. Rath Yatra
  {
    id: 'rath-yatra',
    nameEn: 'Rath Yatra (Sri Jagannath)',
    nameBn: 'শ্রী শ্রী জগন্নাথ দেবের রথযাত্রা (মাহেশ ও পুরী)',
    category: 'puja',
    dateStr: '2026-07-16',
    bengaliDateStr: '৩১ আষাঢ়',
    descriptionBn: 'জগন্নাথ, বলভদ্র ও সুভদ্রা দেবীর গুণ্ডিচা মন্দিরে রথারোহণ। হুগলির মাহেশ ও পুরীর বিশ্বখ্যাত রথযাত্রা।',
    descriptionEn: 'Grand chariot festival of Lord Jagannath, Balabhadra, and Subhadra with sacred ropes pulling.',
    tithiRequirementBn: 'আষাঢ় শুক্লা দ্বিতীয়া',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'রথারোহণ ও রশিতে টান', labelEn: 'Chariot Pulling', time: 'বিকাল ০৩:৩০ হইতে' },
    ],
    ritualsBn: ['রথের দড়িতে হাত ছোঁয়ানো', 'জিলিপি ও খাজা ভোগ আস্বাদন'],
  },

  // 9. Ulto Rath Yatra
  {
    id: 'ulto-rath',
    nameEn: 'Ulto Rath Yatra (Bahuda Yatra)',
    nameBn: 'শ্রী জগন্নাথ দেবের উল্টো রথযাত্রা (পুনর্যাত্রা)',
    category: 'puja',
    dateStr: '2026-07-24',
    bengaliDateStr: '৭ শ্রাবণ',
    descriptionBn: 'গুণ্ডিচা মন্দির হইতে শ্রীমন্দিরে শ্রী জগন্নাথ দেবের সগৌরবে প্রত্যাবর্তন।',
    descriptionEn: 'The return chariot journey of Lord Jagannath back to the main sanctum.',
    tithiRequirementBn: 'আষাঢ় শুক্লা দশমী',
    isPublicHoliday: false,
  },

  // 10. Guru Purnima
  {
    id: 'guru-purnima',
    nameEn: 'Guru Purnima & Vyasa Puja',
    nameBn: 'গুরু পূর্ণিমা ও মহর্ষি বেদব্যাস পূজা',
    category: 'cultural',
    dateStr: '2026-07-29',
    bengaliDateStr: '১২ শ্রাবণ',
    descriptionBn: 'মহর্ষি বেদব্যাসের শুভ জন্মতিথি ও আধ্যাত্মিক গুরুদেবের চরণে শ্রদ্ধাভক্তি নিবেদনের পুণ্য দিবস।',
    descriptionEn: 'Sacred day honoring spiritual mentors, teachers, and sage Veda Vyasa.',
    tithiRequirementBn: 'আষাঢ়ী পূর্ণিমা',
    isPublicHoliday: false,
  },

  // 11. Independence Day
  {
    id: 'independence-day',
    nameEn: 'Independence Day',
    nameBn: 'ভারতের স্বাধীনতা দিবস (জাতীয় ছুটির দিন)',
    category: 'cultural',
    dateStr: '2026-08-15',
    bengaliDateStr: '২৯ শ্রাবণ',
    descriptionBn: 'ভারতের স্বাধীনতা অর্জনের ঐতিহাসিক জাতীয় গৌরবময় দিবস। জাতীয় পতাকা উত্তোলন ও দেশপ্রেমের উৎসব।',
    descriptionEn: 'National holiday commemorating India Independence on 15th August 1947.',
    isPublicHoliday: true,
  },

  // 12. Raksha Bandhan / Rakhi Purnima
  {
    id: 'rakhi-purnima',
    nameEn: 'Raksha Bandhan & Rakhi Purnima',
    nameBn: 'রাখিপূর্ণিমা ও শুভ রাখিবন্ধন উৎসব',
    category: 'cultural',
    dateStr: '2026-08-28',
    bengaliDateStr: '১১ ভাদ্র',
    descriptionBn: 'ভাই-বোনের অটুট প্রীতি ও সুরক্ষার পবিত্র প্রতীক রাখি বন্ধন। রবীন্দ্রনাথ ঠাকুরের সম্প্রীতির রাখিবন্ধন আহ্বান।',
    descriptionEn: 'Celebration of protective fraternal love and universal brotherhood across Bengal.',
    tithiRequirementBn: 'শ্রাবণী পূর্ণিমা',
    isPublicHoliday: true,
  },

  // 13. Sri Krishna Janmashtami
  {
    id: 'janmashtami',
    nameEn: 'Sri Krishna Janmashtami',
    nameBn: 'শ্রীকৃষ্ণের জন্মাষ্টমী ও নিশীথ পূজা',
    category: 'fasting',
    dateStr: '2026-09-04',
    bengaliDateStr: '১৮ ভাদ্র',
    descriptionBn: 'ভগবান শ্রীকৃষ্ণের শুভ আবির্ভাব তিথি। নিশীথে বালগোপাল পূজা, তালের বড়া ভোগ, উপবাস ও ভক্তিগীতি সংকীর্তন।',
    descriptionEn: 'Midnight nativity of Lord Krishna with laddu gopal abhishek, fasting, and devotional songs.',
    tithiRequirementBn: 'ভাদ্র কৃষ্ণা অষ্টমী (রোহিণী নক্ষত্র)',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'জন্মাষ্টমী নিশীথ পূজা লগ্ন', labelEn: 'Midnight Nativity Window', time: 'রাত ১১:৪৫ - ১২:৩০' },
    ],
    ritualsBn: ['তালের ক্ষীর, লুচি ও তালের বড়া নিবেদন', 'ভগবদ্গীতা পাঠ ও সংকীর্তন'],
  },

  // 14. Nandotsav
  {
    id: 'nandotsav',
    nameEn: 'Nandotsav',
    nameBn: 'নন্দোৎসব ও আনন্দমেলা',
    category: 'cultural',
    dateStr: '2026-09-05',
    bengaliDateStr: '১৯ ভাদ্র',
    descriptionBn: 'নন্দালয়ে শ্রীকৃষ্ণের শুভ জন্ম উপলক্ষে গোপ-গোপীগণের আনন্দোল্লাস ও মিষ্টান্ন বিতরণ।',
    descriptionEn: 'Post-Janmashtami joy celebration across temples and homes with sweets distribution.',
    tithiRequirementBn: 'ভাদ্র কৃষ্ণা নবমী',
    isPublicHoliday: false,
  },

  // 15. Radhashtami
  {
    id: 'radhashtami',
    nameEn: 'Sri Radhashtami',
    nameBn: 'শ্রী রাধাষ্টমী ব্রত ও মহোৎসব',
    category: 'fasting',
    dateStr: '2026-09-19',
    bengaliDateStr: '২ আশ্বিন',
    descriptionBn: 'পরমাপ্রকৃতি শ্রী রাধারাণীর শুভ আবির্ভাব তিথি। মধ্যাহ্নকালে দেবীর বিশেষ স্নান ও পুষ্পাঞ্জলি।',
    descriptionEn: 'Divine appearance day of Srimati Radharani with noon puja and devotional songs.',
    tithiRequirementBn: 'ভাদ্র শুক্লা অষ্টমী',
    isPublicHoliday: false,
  },

  // 16. Vishwakarma Puja (Bhadro Sankranti)
  {
    id: 'vishwakarma-puja',
    nameEn: 'Vishwakarma Puja & Kite Festival',
    nameBn: 'শ্রী শ্রী বিশ্বকর্মা পূজা ও ঘুড়ি ওড়ানো উৎসব',
    category: 'puja',
    dateStr: '2026-09-17',
    bengaliDateStr: '৩১ ভাদ্র (ভাদ্র সংক্রান্তি)',
    descriptionBn: 'দেবশিল্পী মহাত্মা বিশ্বকর্মার আরাধনা। কল-কারখানা, যানবাহন ও প্রকৌশল যন্ত্রপাতির বিশেষ পূজা এবং বাংলার আকাশে রঙিন ঘুড়ি ওড়ানোর মহোৎসব।',
    descriptionEn: 'Worship of the divine architect Lord Vishwakarma with tools blessings and vibrant kite flying all over Bengal.',
    tithiRequirementBn: 'কন্যা সংক্রান্তি / ভাদ্র সংক্রান্তি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'বিশ্বকর্মা পূজা শুভ লগ্ন', labelEn: 'Auspicious Window', time: 'সকাল ০৭:১৫ - ১১:৪৫' },
      { labelBn: 'ঘুড়ি ওড়ানো আনন্দ লগ্ন', labelEn: 'Kite Flying Festival', time: 'বেলা ০১:০০ হইতে সন্ধ্যা' },
    ],
    ritualsBn: ['যন্ত্রপাতি ও যানবাহনে রক্তচন্দন ও ফুল প্রদান', 'বিশ্বকর্মার চরণে ভোগ নিবেদন', 'ছাদে ছাদে ঘুড়ির লড়াই'],
  },

  // 17. Gandhi Jayanti
  {
    id: 'gandhi-jayanti',
    nameEn: 'Gandhi Jayanti',
    nameBn: 'মহাত্মা গান্ধী জয়ন্তী ও আন্তর্জাতিক অহিংসা দিবস',
    category: 'cultural',
    dateStr: '2026-10-02',
    bengaliDateStr: '১৫ আশ্বিন',
    descriptionBn: 'জাতির জনক মহাত্মা গান্ধীর শুভ জন্মজয়ন্তী ও আন্তর্জাতিক অহিংসা দিবস। রাষ্ট্রীয় ছুটির দিন।',
    descriptionEn: 'Birth anniversary of Mahatma Gandhi and International Day of Non-Violence (National Holiday).',
    isPublicHoliday: true,
  },

  // 18. Mahalaya & Pitru Tarpan (Amavasya)
  {
    id: 'mahalaya',
    nameEn: 'Mahalaya & Tarpan',
    nameBn: 'মহালয়া ও পিতৃ তর্পণ (দেবীপক্ষ প্রারম্ভ)',
    category: 'puja',
    dateStr: '2026-10-09',
    bengaliDateStr: '২২ আশ্বিন',
    descriptionBn: 'পিতৃপক্ষের অবসান ও দেবীপক্ষের শুভ সূচনা। গঙ্গাস্নানে পূর্বপুরুষের তর্পণ এবং বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ শ্রবণ।',
    descriptionEn: 'The auspicious onset of Devipaksha with ancestral Tarpan and resonant Chandi hymns.',
    tithiRequirementBn: 'আশ্বিন অমাবস্যা তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'তর্পণ শুভ সময়', labelEn: 'Tarpan Auspicious Time', time: 'ভোর ০৫:৩০ - সকাল ০৯:১৫' },
      { labelBn: 'মহালয়া অমাবস্যা সমাপ্তি', labelEn: 'Amavasya Tithi End', time: 'বিকাল ০৪:৪০' },
    ],
    ritualsBn: ['গঙ্গাবক্ষে পূর্বপুরুষগণের উদ্দেশ্যে তিলতর্পণ', 'প্রাতঃকালে মহিষাসুরমর্দিনী শ্রবণ', 'মা দুর্গাকে মর্তে আহ্বান'],
  },

  // 19. Durga Shashthi
  {
    id: 'durga-shashthi',
    nameEn: 'Maha Shashthi (Bodhan)',
    nameBn: 'মহা ষষ্ঠী (দেবী বোধন ও আমন্ত্রণ)',
    category: 'puja',
    dateStr: '2026-10-16',
    bengaliDateStr: '২৯ আশ্বিন',
    descriptionBn: 'বিল্ববৃক্ষমূলে মা দুর্গার সান্ধ্য বোধন, আমন্ত্রণ ও অধিবাস। ঢাকের বাদ্যে দুর্গাপূজার আনুষ্ঠানিক সূচনা।',
    descriptionEn: 'The formal awakening (Bodhan) and invocation of Mother Durga under the sacred Bel tree.',
    tithiRequirementBn: 'শুক্লা ষষ্ঠী তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'সায়ংকালে দেবীর আমন্ত্রণ ও অধিবাস', labelEn: 'Devi Bodhan & Adhibas', time: 'সন্ধ্যা ০৫:৪৫ - ০৭:১৫' },
    ],
    ritualsBn: ['বিল্বশাখা স্থাপন ও পত্রবিন্যাস', 'দেবী প্রতিমার চক্ষুদান ও প্রাণ প্রতিষ্ঠা', 'বোধন অঞ্জলি'],
  },

  // 20. Durga Saptami
  {
    id: 'durga-saptami',
    nameEn: 'Maha Saptami (Nabapatrika)',
    nameBn: 'মহা সপ্তমী (নবপত্রিকা প্রবেশ ও স্নান)',
    category: 'puja',
    dateStr: '2026-10-17',
    bengaliDateStr: '৩০ আশ্বিন',
    descriptionBn: 'নবপত্রিকা বা কলাবউ স্নান ও দেবীর সপ্তমী পূজা আরম্ভ। পুষ্পাঞ্জলি ও ভোগ নিবেদন।',
    descriptionEn: 'The bathing of Nabapatrika (nine sacred plants) and invocation of divine nature aspects.',
    tithiRequirementBn: 'শুক্লা সপ্তমী তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'নবপত্রিকা প্রবেশ ও স্থাপন', labelEn: 'Nabapatrika Pravesh', time: 'সকাল ০৬:১৫ - ০৮:৩০' },
      { labelBn: 'সপ্তমী পুষ্পাঞ্জলি', labelEn: 'Saptami Pushpanjali', time: 'সকাল ০৯:৪৫' },
    ],
    ritualsBn: ['নয়টি বৃক্ষের সমন্বয়ে নবপত্রিকা স্নান', 'মহাপূজা ও মহাস্নান', 'সন্ধ্যায় আরতি ও ধুনুচি নৃত্য'],
  },

  // 21. Durga Ashtami & Sandhi Puja
  {
    id: 'durga-ashtami',
    nameEn: 'Maha Ashtami & Sandhi Puja',
    nameBn: 'মহা অষ্টমী ও সন্ধিপূজা (১০৮ পদ্ম ও দীপ)',
    category: 'puja',
    dateStr: '2026-10-18',
    bengaliDateStr: '১ কার্তিক',
    descriptionBn: 'দুর্গাপূজার সর্বপ্রধান দিবস। কুমারী পূজা ও অষ্টমী-নবমীর মিলনক্ষণে ১০৮ পদ্ম ও প্রদীপে মহিষাসুরমর্দিনী চণ্ডী পূজা।',
    descriptionEn: 'The pinnacle day of Durga Puja featuring Kumari Puja and the dramatic 48-minute Sandhi Puja.',
    tithiRequirementBn: 'শুক্লা অষ্টমী তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'মহাষ্টমী পূজা ও অঞ্জলি', labelEn: 'Ashtami Pushpanjali', time: 'সকাল ০৯:১৫ - ১১:০০' },
      { labelBn: 'কুমারী পূজা', labelEn: 'Kumari Puja', time: 'বেলা ১১:৩০' },
      { labelBn: 'মহাপুণ্য সন্ধিপূজা সূচনা', labelEn: 'Sandhi Puja Window', time: 'সন্ধ্যা ০৬:৪৫ - ০৭:৩৩' },
      { labelBn: 'সন্ধি বলিদান ও ১০৮ প্রদীপ প্রজ্বলন', labelEn: 'Balidan & 108 Lamps', time: 'সন্ধ্যা ০৭:০৯' },
    ],
    ritualsBn: ['১০৮টি অপরাজিতা ও নীলপদ্ম নিবেদন', '১০৮টি ঘৃতপ্রদীপ প্রজ্বলন', 'কুমারীর মধ্যে জগজ্জননীর আরাধনা'],
  },

  // 22. Durga Navami
  {
    id: 'durga-navami',
    nameEn: 'Maha Navami',
    nameBn: 'মহা নবমী ও মহাহোম যজ্ঞ',
    category: 'puja',
    dateStr: '2026-10-19',
    bengaliDateStr: '২ কার্তিক',
    descriptionBn: 'দেবী দুর্গার মহিষাসুর বধের আনন্দোৎসব। মহাহোম, চণ্ডীপাঠ ও নবমী মহাভোগ নিবেদন।',
    descriptionEn: 'Celebration of the victory over demon Mahishasura with sacred fire rituals and grand bhog.',
    tithiRequirementBn: 'শুক্লা নবমী তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'মহানবমী পূজা ও অঞ্জলি', labelEn: 'Navami Pushpanjali', time: 'সকাল ০৯:৩০ - ১১:৩০' },
      { labelBn: 'মহাহোম ও যজ্ঞ পূর্ণাহুতি', labelEn: 'Maha Homa & Purnahuti', time: 'দুপুর ১২:১৫' },
    ],
    ritualsBn: ['চণ্ডী যজ্ঞ ও বিশ্বশান্তি কামনায় পূর্ণাহুতি', 'নবমী ভোগ ও কুমারী ভোজন'],
  },

  // 23. Vijaya Dashami
  {
    id: 'durga-dashami',
    nameEn: 'Vijaya Dashami & Sindoor Khela',
    nameBn: 'বিজয়া দশমী ও সিঁদুর খেলা (শুভ বিজয়া)',
    category: 'puja',
    dateStr: '2026-10-20',
    bengaliDateStr: '৩ কার্তিক',
    descriptionBn: 'মা দুর্গার কৈলাসে প্রত্যাবর্তন। দেবী বরণ, সিঁদুর খেলা, অপরাজিতা পূজা, প্রতিমা নিরঞ্জন ও মিষ্টিমুখের মিলনমেলা।',
    descriptionEn: 'Farewell to Ma Durga marked by vermilion play (Sindoor Khela) and Shubho Bijoya greetings.',
    tithiRequirementBn: 'শুক্লা দশমী তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'দর্পণ বিসর্জন ও দেবী বরণ', labelEn: 'Darpan Visarjan & Baran', time: 'সকাল ০৮:৩০ - ১০:১৫' },
      { labelBn: 'সিঁদুর খেলা', labelEn: 'Sindoor Khela', time: 'সকাল ১০:৩০ হইতে' },
      { labelBn: 'প্রতিমা নিরঞ্জন', labelEn: 'Ganga Immersion', time: 'বিকাল ০৪:০০ হইতে রাত্রি' },
    ],
    ritualsBn: ['দর্পণে দেবীর চরণ দর্শন ও বিসর্জন মন্ত্র', 'সধবা নারীগণের মিষ্টি ও সিঁদুরে দেবী বরণ', 'গুরুজনদের প্রণাম ও বিজয়ার আলিঙ্গন'],
  },

  // 24. Kojagari Lakshmi Puja
  {
    id: 'lakshmi-puja',
    nameEn: 'Kojagari Lakshmi Puja',
    nameBn: 'কোজাগরী লক্ষ্মীপূজা ও পূর্ণিমা ব্রত',
    category: 'puja',
    dateStr: '2026-10-24',
    bengaliDateStr: '৭ কার্তিক',
    descriptionBn: 'নিশীথকালে ধনদেবী মা লক্ষ্মীর ঘরে ঘরে শুভাগমন। চালের গুঁড়োর নিখুঁত আলপনা, নারকেল নাড়ু, মোয়া, পায়েস ভোগ ও লক্ষ্মীর পাঁচালী পাঠ।',
    descriptionEn: 'Auspicious full-moon worship of Goddess Lakshmi with rice-paste Alpona, coconut sweets, and night vigil.',
    tithiRequirementBn: 'আশ্বিনী পূর্ণিমা তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'কোজাগরী লক্ষ্মীপূজা নিশীথ কাল', labelEn: 'Nishitha Puja Time', time: 'রাত ১০:১৫ - ১২:৩০' },
    ],
    ritualsBn: ['ধানের শীষ ও মঙ্গলঘট দিয়ে আলপনা অঙ্কন', 'নারকেল নাড়ু, তিলের খাজা ও পায়েস ভোগ', 'লক্ষ্মীর পাঁচালী পাঠ'],
  },

  // 25. Bhoot Chaturdashi
  {
    id: 'bhoot-chaturdashi',
    nameEn: 'Bhoot Chaturdashi & 14 Lamps',
    nameBn: 'ভূত চতুর্দশী ও চৌদ্দ প্রদীপ প্রজ্বলন',
    category: 'puja',
    dateStr: '2026-11-07',
    bengaliDateStr: '২১ কার্তিক',
    descriptionBn: 'চোদ্দ শাক ভক্ষণ ও অশুভ শক্তি বিনাশে এবং পূর্বপুরুষদের স্মরণে গৃহদ্বারে চৌদ্দটি মাটির প্রদীপ প্রজ্বলন।',
    descriptionEn: 'Ancient ritual of eating 14 leafy greens and lighting 14 lamps to welcome ancestral spirits.',
    tithiRequirementBn: 'কার্তিক কৃষ্ণা চতুর্দশী',
    isPublicHoliday: false,
    pujaTimings: [
      { labelBn: 'চৌদ্দ প্রদীপ প্রজ্বলন', labelEn: '14 Lamps Lighting', time: 'সন্ধ্যা ০৫:৪৫ হইতে' },
    ],
  },

  // 26. Shyama Kali Puja & Diwali
  {
    id: 'kali-puja',
    nameEn: 'Shyama Kali Puja & Diwali',
    nameBn: 'শ্যামাপূজা (কালীপূজা) ও দীপাবলি মহোৎসব',
    category: 'puja',
    dateStr: '2026-11-08',
    bengaliDateStr: '২২ কার্তিক',
    descriptionBn: 'কার্তিক অমাবস্যার অন্ধকার নিশীথে মহাকালী আরাধনা। ঘরে ঘরে প্রদীপ ও মোমবাতির আলোয় দীপান্বিতা উৎসব ও মা কালীর পূজা।',
    descriptionEn: 'The midnight worship of Goddess Kali during Kartik Amavasya alongside illuminating earthen lamps.',
    tithiRequirementBn: 'কার্তিকী অমাবস্যা',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'কালীপূজা নিশীথ কাল', labelEn: 'Nishitha Puja Window', time: 'রাত ১১:৩০ - ০১:১৫' },
    ],
    ritualsBn: ['জবা ফুল ও রক্তচন্দনে মা কালীর আরাধনা', 'আতশবাজি ও প্রদীপ প্রজ্বলন', 'নিশীথ যজ্ঞ'],
  },

  // 27. Bhai Phota / Bhratri Dwitiya
  {
    id: 'bhai-phota',
    nameEn: 'Bhai Phota (Bhratri Dwitiya)',
    nameBn: 'শুভ ভাইফোঁটা (ভ্রাতৃদ্বিতীয়া)',
    category: 'cultural',
    dateStr: '2026-11-10',
    bengaliDateStr: '২৪ কার্তিক',
    descriptionBn: 'ভাইয়ের কপালে দিলাম ফোঁটা, যমের দুয়ারে পড়ল কাঁটা। চন্দন ও কাজলে ভাইয়ের দীর্ঘায়ু কামনায় বোনের আশীর্বাদ।',
    descriptionEn: 'Traditional celebration of sibling love where sisters apply sacred sandalwood tilak for brother’s longevity.',
    tithiRequirementBn: 'শুক্লা দ্বিতীয়া তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'ভাইফোঁটা শুভ মুহূর্ত', labelEn: 'Auspicious Phota Timings', time: 'সকাল ০৯:১৫ - দুপুর ০১:০০' },
    ],
    ritualsBn: ['বাঁহাতের অনামিকায় চন্দন-কাজল ফোঁটা', 'ধান-দূর্বা দিয়ে আশীর্বাদ', 'মিষ্টিমুখ ও উপহার আদানপ্রদান'],
  },

  // 28. Chhath Puja
  {
    id: 'chhath-puja',
    nameEn: 'Chhath Puja (Surya Shashthi)',
    nameBn: 'ছট পূজা ও সূর্য ষষ্ঠী ব্রত',
    category: 'fasting',
    dateStr: '2026-11-14',
    bengaliDateStr: '২৮ কার্তিক',
    descriptionBn: 'ভগবান সূর্যদেব ও ষষ্ঠী মাতার উদ্দেশ্যে নদী ও সরোবর ঘাটে সান্ধ্য ও প্রাতঃ পুণ্য অর্ঘ্য নিবেদন।',
    descriptionEn: 'Vedic sun worship at water bodies at dusk and dawn for health, vitality, and family bliss.',
    tithiRequirementBn: 'কার্তিক শুক্লা ষষ্ঠী',
    isPublicHoliday: true,
  },

  // 29. Jagaddhatri Puja
  {
    id: 'jagaddhatri-puja',
    nameEn: 'Jagaddhatri Puja (Chandannagar)',
    nameBn: 'জগদ্ধাত্রী পূজা (চন্দননগর ও কৃষ্ণনগর)',
    category: 'puja',
    dateStr: '2026-11-17',
    bengaliDateStr: '১ অগ্রহায়ণ',
    descriptionBn: 'জগৎ ধারিণী মা দুর্গার চতুর্ভুজা সিংহবাহিনী রূপ। চন্দননগরের বিখ্যাত আলোকসজ্জা ও শোভাযাত্রা।',
    descriptionEn: 'Four-armed incarnation of Durga celebrated grandly in Chandannagar with magnificent light artistry.',
    tithiRequirementBn: 'কার্তিক শুক্লা নবমী তিথি',
    isPublicHoliday: false,
    pujaTimings: [
      { labelBn: 'মহা নবমী পূজা (ত্রিকাল পূজা)', labelEn: 'Navami Tri-Kal Puja', time: 'সকাল ০৮:০০ হইতে সারা দিন' },
    ],
  },

  // 30. Kartik Puja
  {
    id: 'kartik-puja',
    nameEn: 'Kartik Puja',
    nameBn: 'শ্রী কার্তিক পূজা (কার্তিক সংক্রান্তি)',
    category: 'puja',
    dateStr: '2026-11-16',
    bengaliDateStr: '৩০ কার্তিক',
    descriptionBn: 'দেবসেনাপতি শ্রী কার্তিকের পূজা। সুসন্তান ও বীরত্ব কামনায় ঘরে ঘরে পূজা অর্পণ।',
    descriptionEn: 'Worship of celestial general Lord Kartikeya on Kartik Sankranti.',
    tithiRequirementBn: 'কার্তিক সংক্রান্তি',
    isPublicHoliday: false,
  },

  // 31. Ras Purnima
  {
    id: 'ras-purnima',
    nameEn: 'Ras Purnima & Rasotsav',
    nameBn: 'রাস পূর্ণিমা ও শ্রীকৃষ্ণের রাসযাত্রা (নবদ্বীপ)',
    category: 'cultural',
    dateStr: '2026-11-24',
    bengaliDateStr: '৮ অগ্রহায়ণ',
    descriptionBn: 'শ্রীরাধাকৃষ্ণের অপ্রাকৃত রাসলীলা মহোৎসব। নবদ্বীপ ও শান্তিপুরে ঐতিহ্যবাহী রাসমেলা ও শোভাযাত্রা।',
    descriptionEn: 'Celebration of the divine Rasa dance of Radha and Krishna, grandly observed in Nabadwip.',
    tithiRequirementBn: 'কার্তিকী পূর্ণিমা',
    isPublicHoliday: true,
  },

  // 32. Gita Jayanti
  {
    id: 'gita-jayanti',
    nameEn: 'Gita Jayanti & Mokshada Ekadashi',
    nameBn: 'শ্রীমদ্ভগবদ্গীতা জয়ন্তী ও মোক্ষদা একাদশী',
    category: 'fasting',
    dateStr: '2026-12-20',
    bengaliDateStr: '৪ পৌষ',
    descriptionBn: 'কুরুক্ষেত্রের সমরাঙ্গনে শ্রীকৃষ্ণের শ্রীমুখ হইতে পবিত্র গীতার প্রাদুর্ভাব দিবস।',
    descriptionEn: 'The advent day of the Srimad Bhagavad Gita spoken by Lord Krishna to Arjuna.',
    tithiRequirementBn: 'অগ্রহায়ণ শুক্লা একাদশী',
    isPublicHoliday: false,
  },

  // 33. Christmas Day
  {
    id: 'christmas',
    nameEn: 'Christmas Day (Bada Din)',
    nameBn: 'শুভ বড়দিন (যিশু খ্রিস্টের জন্মোৎসব)',
    category: 'cultural',
    dateStr: '2026-12-25',
    bengaliDateStr: '৯ পৌষ',
    descriptionBn: 'প্রভু যিশু খ্রিস্টের শুভ জন্মদিবস। পার্ক স্ট্রিটের আলোকসজ্জা, কেক উৎসব ও আনন্দমেলা।',
    descriptionEn: 'Christmas celebration honoring the nativity of Jesus Christ, marked with joy across Kolkata.',
    isPublicHoliday: true,
  },

  // 34. Kalpataru Utsav & New Year
  {
    id: 'kalpataru-utsav',
    nameEn: 'Kalpataru Utsav & New Year',
    nameBn: 'কল্পতরু উৎসব ও ইংরেজি নববর্ষ',
    category: 'cultural',
    dateStr: '2027-01-01',
    bengaliDateStr: '১৬ পৌষ',
    descriptionBn: 'কাশীপুর উদ্যানবাটীতে শ্রী রামকৃষ্ণ পরমহংসদেবের কল্পতরু রূপ প্রকাশ দিবস ও ইংরেজি নববর্ষের আগমন।',
    descriptionEn: 'Commemoration of Sri Ramakrishna turning into the wish-fulfilling tree (Kalpataru) at Cossipore.',
    isPublicHoliday: true,
  },

  // 35. Poush Sankranti & Ganga Sagar Snan
  {
    id: 'poush-sankranti',
    nameEn: 'Poush Sankranti & Ganga Sagar',
    nameBn: 'পৌষ সংক্রান্তি (পিঠেপুলি ও গঙ্গাসাগর মেলা)',
    category: 'sankranti',
    dateStr: '2027-01-15',
    bengaliDateStr: '৩০ পৌষ',
    descriptionBn: 'সূর্যের মকর রাশিতে উত্তরায়ণ প্রবেশ। পাটিসাপটা, পুলিপিঠে, নতুন গুড়ের পায়েস ও গঙ্গাসাগরে পুণ্যস্নান।',
    descriptionEn: 'Makar Sankranti harvest festival celebrating traditional Pithe-Puli delicacies and holy dip at Ganga Sagar.',
    tithiRequirementBn: 'মকর সংক্রান্তি মুহূর্ত',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'পুণ্যকাল স্নান ও সূর্য প্রণাম', labelEn: 'Punya Kaal Holy Bath', time: 'সকাল ০৭:১৫ - দুপুর ১২:০০' },
    ],
    ritualsBn: ['দুধে ভেজানো পিঠে ও পাটিসাপটা তৈরি', 'সূর্যদেবের উদ্দেশ্যে নতুন চাল ও গুড়ের ভোগ দান'],
  },

  // 36. Netaji Jayanti
  {
    id: 'netaji-jayanti',
    nameEn: 'Netaji Subhas Chandra Bose Jayanti',
    nameBn: 'নেতাজি সুভাষচন্দ্র বসুর জন্মজয়ন্তী (পরাক্রম দিবস)',
    category: 'cultural',
    dateStr: '2027-01-23',
    bengaliDateStr: '৮ মাঘ',
    descriptionBn: 'দেশনায়ক নেতাজি সুভাষচন্দ্র বসুর শুভ জন্মবার্ষিকী। জাতীয় পরাক্রম দিবস রূপে উদযাপিত।',
    descriptionEn: 'Birth anniversary of iconic Indian freedom fighter Netaji Subhas Chandra Bose (Parakram Diwas).',
    isPublicHoliday: true,
  },

  // 37. Republic Day
  {
    id: 'republic-day',
    nameEn: 'Republic Day',
    nameBn: 'ভারতের প্রজাতন্ত্র দিবস (জাতীয় ছুটির দিন)',
    category: 'cultural',
    dateStr: '2027-01-26',
    bengaliDateStr: '১১ মাঘ',
    descriptionBn: 'ভারতের সংবিধান কার্যকর হওয়ার ঐতিহাসিক জাতীয় গৌরবময় দিবস।',
    descriptionEn: 'India Republic Day commemorating the adoption of the Constitution on 26th January 1950.',
    isPublicHoliday: true,
  },

  // 38. Saraswati Puja & Basant Panchami
  {
    id: 'saraswati-puja',
    nameEn: 'Saraswati Puja & Basant Panchami',
    nameBn: 'সরস্বতী পূজা ও বসন্ত পঞ্চমী (হাতেখড়ি)',
    category: 'puja',
    dateStr: '2027-02-11',
    bengaliDateStr: '২৭ মাঘ',
    descriptionBn: 'বাগদেবী মা সরস্বতীর আরাধনা। বাসন্তী বসনে পুষ্পাঞ্জলি, শিশুদের হাতেখড়ি ও ঋতুরাজ বসন্তের আগমন।',
    descriptionEn: 'Worship of Goddess Saraswati, marking spring arrival, book blessings, and children first writing (Hatekhori).',
    tithiRequirementBn: 'মাঘী শুক্লা পঞ্চমী',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'সরস্বতী পুষ্পাঞ্জলি', labelEn: 'Pushpanjali Window', time: 'সকাল ০৭:১৫ - ১০:৪৫' },
      { labelBn: 'শিশুদের হাতেখড়ি শুভ লগ্ন', labelEn: 'Hatekhori Ceremony', time: 'সকাল ০৯:৩০' },
    ],
    ritualsBn: ['বাসন্তী বা হলুদ পোশাক পরিধান', 'বই-খাতা ও কলম দেবীর চরণে সমর্পণ', 'কুল ও পলাশ ফুল নিবেদন'],
  },

  // 39. International Mother Language Day
  {
    id: 'mother-language-day',
    nameEn: 'International Mother Language Day',
    nameBn: 'আন্তর্জাতিক মাতৃভাষা দিবস (২১ ফেব্রুয়ারি)',
    category: 'cultural',
    dateStr: '2027-02-21',
    bengaliDateStr: '৭ ফাল্গুন',
    descriptionBn: 'অমর একুশে ও ভাষা শহীদগণের স্মরণে বিশ্বজুড়ে পালিত আন্তর্জাতিক মাতৃভাষা দিবস।',
    descriptionEn: 'Global observance to promote linguistic diversity, mother tongue heritage, and remembrance of language martyrs.',
    isPublicHoliday: false,
  },

  // 40. Maha Shivaratri
  {
    id: 'shivaratri',
    nameEn: 'Maha Shivaratri',
    nameBn: 'মহা শিবরাত্রি ব্রত ও চার প্রহর পূজা',
    category: 'fasting',
    dateStr: '2027-03-06',
    bengaliDateStr: '২০ ফাল্গুন',
    descriptionBn: 'দেবাদিদেব মহাদেবের পরম পুণ্যময় ব্রতোপবাস। দুধ, গঙ্গাজল, বেলপাতা ও আকন্দ মালায় চার প্রহরে শিবলিঙ্গে অভিষেক।',
    descriptionEn: 'Great night of Lord Shiva with nightlong vigil, sacred chanting, and four-quarter bathing of Shivlinga.',
    tithiRequirementBn: 'ফাল্গুনী কৃষ্ণা চতুর্দশী',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'প্রথম প্রহর পূজা (দুগ্ধ অভিষেক)', labelEn: '1st Quarter (Milk)', time: 'সন্ধ্যা ০৬:১৫ - ০৯:১৫' },
      { labelBn: 'দ্বিতীয় প্রহর পূজা (দধি অভিষেক)', labelEn: '2nd Quarter (Curd)', time: 'রাত ০৯:১৫ - ১২:১৫' },
      { labelBn: 'তৃতীয় প্রহর পূজা (ঘৃত অভিষেক)', labelEn: '3rd Quarter (Ghee)', time: 'রাত ১২:১৫ - ০৩:১৫' },
      { labelBn: 'চতুর্থ প্রহর পূজা (মধু ও জল)', labelEn: '4th Quarter (Honey & Water)', time: 'রাত ০৩:১৫ - ভোর ০৬:০০' },
    ],
    ritualsBn: ['নির্জলা বা ফলাহারী উপবাস', '১০৮টি অক্ষত বিল্বপত্র নিবেদন', 'ওঁ নমঃ শিবায় জপ'],
  },

  // 41. Dol Jatra / Holi
  {
    id: 'dol-jatra',
    nameEn: 'Dol Jatra & Gaura Purnima',
    nameBn: 'দোলযাত্রা ও শ্রীচৈতন্য মহাপ্রভুর আবির্ভাব তিথি',
    category: 'cultural',
    dateStr: '2027-03-22',
    bengaliDateStr: '৬ চৈত্র',
    descriptionBn: 'শ্রীকৃষ্ণ ও শ্রীরাধিকার আবির খেলা। শান্তিনিকেতনে বসন্তোৎসব ও শ্রী শ্রী চৈতন্য মহাপ্রভুর আবির্ভাব তিথি।',
    descriptionEn: 'The festival of vibrant herbal colors, musical spring celebration in Santiniketan, and Chaitanya Mahaprabhu birth anniversary.',
    tithiRequirementBn: 'ফাল্গুনী পূর্ণিমা',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'দোল পূর্ণিমা সূচনা ও আবির দান', labelEn: 'Dol Purnima Start', time: 'সকাল ০৬:০০ হইতে' },
    ],
    ritualsBn: ['শ্রীরাধাগোবিন্দের চরণে আবির নিবেদন', 'গুরুজনদের পায়ে লাল আবির দিয়ে প্রণাম', 'মালপোয়া ও পায়েস আস্বাদন'],
  },

  // 42. Chaitra Sankranti / Charak Puja / Neel Puja
  {
    id: 'chaitra-sankranti',
    nameEn: 'Chaitra Sankranti & Charak Puja',
    nameBn: 'চৈত্র সংক্রান্তি, নীলপূজা ও চড়ক পার্বণ',
    category: 'sankranti',
    dateStr: '2027-04-14',
    bengaliDateStr: '৩০ চৈত্র',
    descriptionBn: 'বর্ষশেষের পুণ্যদিন। মহাদেবের নীলপূজা, শিবের গাজন, ব্রত ও চড়ক মেলার মহোৎসব।',
    descriptionEn: 'Traditional end of Bengali year with Shiva Neel Puja, Gajan fasting, and rural Charak fairs.',
    tithiRequirementBn: 'মীন সংক্রান্তি / চৈত্র সংক্রান্তি',
    isPublicHoliday: true,
    ritualsBn: ['নীলকণ্ঠ শিবের মাথায় জল ঢালা', 'গাজনের সন্ন্যাসীদের শিব বন্দনা'],
  },
];

export const EKADASHI_LIST: EkadashiRecord[] = [
  {
    id: 'utpanna-ekadashi',
    nameBn: 'উৎপন্না একাদশী',
    nameEn: 'Utpanna Ekadashi',
    pakshaBn: 'কৃষ্ণপক্ষ',
    bengaliMonthBn: 'অগ্রহায়ণ',
    gregorianDateStr: '২০২৬-১১-২৪',
    fastingRuleBn: 'একাদশী ব্রতের উৎপত্তি দিবস। সর্বপাপ মোচনের জন্য শ্রেষ্ঠ।',
    paranaTimeBn: 'পরদিন প্রাতঃ ০৬:১৫ হইতে ০৯:৪৫ পর্যন্ত',
    significanceBn: 'দেবী একাদশীর প্রাদুর্ভাব ও মুর দানব বধের পুণ্যতিথি।',
  },
  {
    id: 'mokshada-ekadashi',
    nameBn: 'মোক্ষদা একাদশী ও গীতা জয়ন্তী',
    nameEn: 'Mokshada Ekadashi & Gita Jayanti',
    pakshaBn: 'শুক্লপক্ষ',
    bengaliMonthBn: 'অগ্রহায়ণ / পৌষ',
    gregorianDateStr: '২০২৬-১২-০৯',
    fastingRuleBn: 'পিতৃপুরুষের মোক্ষলাভ ও শ্রীমদ্ভগবদ্গীতা পাঠের মহাফলদায়ী তিথি।',
    paranaTimeBn: 'পরদিন প্রাতঃ ০৬:২২ হইতে ০৯:৫০ পর্যন্ত',
    significanceBn: 'কুরুক্ষেত্রের রণাঙ্গনে শ্রীকৃষ্ণের শ্রীমুখ হইতে গীতার প্রাদুর্ভাব।',
  },
  {
    id: 'shaphala-ekadashi',
    nameBn: 'সফলা একাদশী',
    nameEn: 'Saphala Ekadashi',
    pakshaBn: 'কৃষ্ণপক্ষ',
    bengaliMonthBn: 'পৌষ',
    gregorianDateStr: '২০২৬-১২-২৩',
    fastingRuleBn: 'সর্ববিধ অসফলতা দূর করে জীবনে মনোবাঞ্ছা পূর্ণ করে।',
    paranaTimeBn: 'পরদিন প্রাতঃ ০৬:২৮ হইতে ১০:০৫ পর্যন্ত',
    significanceBn: 'ভগবান নারায়ণের চরণে ঋতুফল ও তুলসীপত্র নিবেদন।',
  },
  {
    id: 'putrada-ekadashi',
    nameBn: 'পৌষ পুত্রদা একাদশী',
    nameEn: 'Pausha Putrada Ekadashi',
    pakshaBn: 'শুক্লপক্ষ',
    bengaliMonthBn: 'পৌষ / মাঘ',
    gregorianDateStr: '২০২৬-০১-০৮',
    fastingRuleBn: 'সৎ সন্তান লাভ ও সন্তানের দীর্ঘায়ু কামনায় এই ব্রত পালিত হয়।',
    paranaTimeBn: 'পরদিন প্রাতঃ ০৬:৩১ হইতে ০৯:৫৮ পর্যন্ত',
    significanceBn: 'সন্তানহীন দম্পতিগণের জন্য মহাশুভ ব্রত।',
  },
  {
    id: 'nirjala-ekadashi',
    nameBn: 'ভীম একাদশী (নির্জলা একাদশী)',
    nameEn: 'Nirjala Ekadashi (Bhim Ekadashi)',
    pakshaBn: 'শুক্লপক্ষ',
    bengaliMonthBn: 'জ্যৈষ্ঠ',
    gregorianDateStr: '২০২৬-০৬-১০',
    fastingRuleBn: 'জলপান বর্জন করে কঠোর উপবাস। ২৪টি একাদশীর ফল একত্রে লাভ হয়।',
    paranaTimeBn: 'পরদিন প্রাতঃ ০৫:০৫ হইতে ০৮:৩০ পর্যন্ত',
    significanceBn: 'পাণ্ডব মধ্যম ভীমসেনের একমাত্র পালনীয় মহাব্রত।',
  },
  {
    id: 'shayani-ekadashi',
    nameBn: 'দেবশয়নী একাদশী (চাতুর্মাস্য আরম্ভ)',
    nameEn: 'Devshayani Ekadashi',
    pakshaBn: 'শুক্লপক্ষ',
    bengaliMonthBn: 'আষাঢ়',
    gregorianDateStr: '২০২৬-০৭-১০',
    fastingRuleBn: 'শ্রীহরি ক্ষীরসমুদ্রে শেষনাগে চার মাসের যোগনিদ্রায় শয়ন করেন।',
    paranaTimeBn: 'পরদিন প্রাতঃ ০৫:১৬ হইতে ০৯:১৫ পর্যন্ত',
    significanceBn: 'চাতুর্মাস্য ব্রতের সূচনা ও সাধকগণের আত্মসংযম কাল।',
  },
];

export const AUSPICIOUS_CEREMONY_DATES: AuspiciousDateRecord[] = [
  {
    id: 'bibaho-1',
    category: 'bibaho',
    categoryBn: 'শুভ বিবাহ লগ্ন',
    gregorianDateStr: '২০২৬-১১-২০',
    bengaliDateStr: '৪ অগ্রহায়ণ',
    tithiBn: 'শুক্লা একাদশী / দ্বাদশী',
    nakshatraBn: 'উত্তরফল্গুনী ও হস্তা',
    lagnaTimingsBn: ['গোধূলি লগ্ন (সন্ধ্যা ০৫:১৫ - ০৬:৪৫)', 'বৃষ লগ্ন (রাত ০৯:৩০ - ১১:১৫)'],
    notesBn: 'উভয় কূলের জন্য অতীব শুভ রাজযোগ। অকাল ও মলমাস মুক্ত লগ্ন।',
  },
  {
    id: 'bibaho-2',
    category: 'bibaho',
    categoryBn: 'শুভ বিবাহ লগ্ন',
    gregorianDateStr: '২০২৬-১১-২৫',
    bengaliDateStr: '৯ অগ্রহায়ণ',
    tithiBn: 'শুক্লা পূর্ণিমা',
    nakshatraBn: 'রোহিণী নক্ষত্র',
    lagnaTimingsBn: ['মিথুন লগ্ন (রাত ১১:৩০ - ০১:১৫)', 'কর্কট লগ্ন (রাত ০১:২০ - ০৩:০০)'],
    notesBn: 'অমৃতযোগযুক্ত পরম শুভ লগ্ন।',
  },
  {
    id: 'bibaho-3',
    category: 'bibaho',
    categoryBn: 'শুভ বিবাহ লগ্ন',
    gregorianDateStr: '২০২৬-১২-০২',
    bengaliDateStr: '১৬ অগ্রহায়ণ',
    tithiBn: 'কৃষ্ণা সপ্তমী',
    nakshatraBn: 'উত্তরভাদ্রপদ',
    lagnaTimingsBn: ['গোধূলি লগ্ন (সন্ধ্যা ০৫:১০ - ০৬:৩০)', 'সিংহ লগ্ন (রাত ০২:০০ - ০৩:৪৫)'],
    notesBn: 'সর্বতোমুখী সিদ্ধিদায়ক দিন।',
  },
  {
    id: 'griha-1',
    category: 'griha_pravesh',
    categoryBn: 'নূতন গৃহপ্রবেশ',
    gregorianDateStr: '২০২৬-১১-২১',
    bengaliDateStr: '৫ অগ্রহায়ণ',
    tithiBn: 'শুক্লা দ্বাদশী',
    nakshatraBn: 'হস্তা নক্ষত্র',
    lagnaTimingsBn: ['প্রাতঃ লগ্ন (সকাল ০৮:১৫ - ১০:৩০)', 'অভিজিৎ মুহূর্ত (বেলা ১১:৪৫)'],
    notesBn: 'বাস্তু শান্তিপূজা ও সত্যনারায়ণ পূজাপূর্বক গৃহপ্রবেশ প্রশস্ত।',
  },
  {
    id: 'annaprashan-1',
    category: 'annaprashan',
    categoryBn: 'অন্নপ্রাশন (মুখেভাত)',
    gregorianDateStr: '২০২৬-১১-২২',
    bengaliDateStr: '৬ অগ্রহায়ণ',
    tithiBn: 'শুক্লা ত্রয়োদশী',
    nakshatraBn: 'চিত্রা নক্ষত্র',
    lagnaTimingsBn: ['সকাল ০৯:০০ - ১১:১৫'],
    notesBn: 'পুত্র সন্তানের বিজোড় মাস (৬ষ্ঠ বা ৮ম) ও কন্যার জোড় মাসে প্রশস্ত।',
  },
  {
    id: 'upanayan-1',
    category: 'upanayan',
    categoryBn: 'উপনয়ন (পৈতে সংস্কার)',
    gregorianDateStr: '২০২৬-০৩-০২',
    bengaliDateStr: '১৬ ফাল্গুন',
    tithiBn: 'শুক্লা চতুর্দশী',
    nakshatraBn: 'পুষ্যা নক্ষত্র',
    lagnaTimingsBn: ['সূর্যোদয় পরবর্তী প্রাতঃকাল (সকাল ০৬:৪৫ - ০৯:৩০)'],
    notesBn: 'ব্রহ্মতেজ প্রাপ্তির জন্য পুষ্যা নক্ষত্রে উপনয়ন অতীব পুণ্যদায়ক।',
  },
  {
    id: 'sadh-1',
    category: 'sadhbhakhon',
    categoryBn: 'সাধভক্ষণ (পঞ্চামৃত / গর্ভসংস্কার)',
    gregorianDateStr: '২০২৬-১২-০৫',
    bengaliDateStr: '১৯ অগ্রহায়ণ',
    tithiBn: 'শুক্লা দশমী',
    nakshatraBn: 'অশ্বিনী',
    lagnaTimingsBn: ['দুপুর ১২:০০ - ০২:০০'],
    notesBn: 'সপ্তম বা নবম মাসে শুভ নক্ষত্রে পঞ্চামৃত ভক্ষণ বিধেয়।',
  },
];

/**
 * Enhanced Festival lookup with dynamic detection for:
 * - Vishwakarma Puja (Sep 17 / 31 Bhadro)
 * - Gandhi Jayanti (Oct 2)
 * - Amavasya (Every month Amavasya Tithi)
 * - Kojagari Lakshmi Puja (Ashwin Purnima)
 * - Shyama Kali Puja (Kartik Amavasya)
 * - Poila Boishakh (1 Boishakh)
 * - All other lunar, solar, national & regional festivals!
 */
export function getFestivalsForDate(
  date: Date,
  bengaliDate: BengaliDate,
  tithiInfo?: TithiInfo,
  paksha?: 'shukla' | 'krishna'
): Festival[] {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;
  const gMonth = date.getMonth(); // 0-indexed
  const gDay = date.getDate();

  const results: Festival[] = [];
  const addedIds = new Set<string>();

  const addFest = (f: Festival) => {
    if (!addedIds.has(f.id)) {
      addedIds.add(f.id);
      results.push(f);
    }
  };

  // 1. Direct match from static database by dateStr
  for (const fest of FESTIVALS_DATABASE) {
    if (fest.dateStr === dateStr) {
      addFest(fest);
    }
  }

  // 2. Fixed Annual Gregorian Dates & Solar Observances
  // Vishwakarma Puja (September 17 / 31 Bhadro Sankranti)
  if ((gMonth === 8 && gDay === 17) || (bengaliDate.monthIndex === 4 && bengaliDate.day === 31)) {
    const vishwa = FESTIVALS_DATABASE.find((f) => f.id === 'vishwakarma-puja');
    if (vishwa) {
      addFest({ ...vishwa, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    }
  }

  // Gandhi Jayanti (October 2)
  if (gMonth === 9 && gDay === 2) {
    const gandhi = FESTIVALS_DATABASE.find((f) => f.id === 'gandhi-jayanti');
    if (gandhi) {
      addFest({ ...gandhi, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    }
  }

  // Netaji Jayanti (January 23)
  if (gMonth === 0 && gDay === 23) {
    const netaji = FESTIVALS_DATABASE.find((f) => f.id === 'netaji-jayanti');
    if (netaji) {
      addFest({ ...netaji, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    }
  }

  // Republic Day (January 26)
  if (gMonth === 0 && gDay === 26) {
    const rep = FESTIVALS_DATABASE.find((f) => f.id === 'republic-day');
    if (rep) {
      addFest({ ...rep, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    }
  }

  // International Mother Language Day (February 21)
  if (gMonth === 1 && gDay === 21) {
    const imld = FESTIVALS_DATABASE.find((f) => f.id === 'mother-language-day');
    if (imld) {
      addFest({ ...imld, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    }
  }

  // Independence Day (August 15)
  if (gMonth === 7 && gDay === 15) {
    const ind = FESTIVALS_DATABASE.find((f) => f.id === 'independence-day');
    if (ind) {
      addFest({ ...ind, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    }
  }

  // Christmas Day (December 25)
  if (gMonth === 11 && gDay === 25) {
    const xmas = FESTIVALS_DATABASE.find((f) => f.id === 'christmas');
    if (xmas) {
      addFest({ ...xmas, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    }
  }

  // New Year & Kalpataru (January 1)
  if (gMonth === 0 && gDay === 1) {
    const kalp = FESTIVALS_DATABASE.find((f) => f.id === 'kalpataru-utsav');
    if (kalp) {
      addFest({ ...kalp, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    }
  }

  // Poila Boishakh (1 Boishakh)
  if (bengaliDate.monthIndex === 0 && bengaliDate.day === 1) {
    const pb = FESTIVALS_DATABASE.find((f) => f.id === 'poila-boishakh');
    if (pb) {
      addFest({ ...pb, dateStr, bengaliDateStr: '১ বৈশাখ' });
    }
  }

  // Rabindra Jayanti (25 Boishakh / May 8 or 9)
  if (bengaliDate.monthIndex === 0 && (bengaliDate.day === 25 || (gMonth === 4 && gDay === 9))) {
    const rj = FESTIVALS_DATABASE.find((f) => f.id === 'rabindra-jayanti');
    if (rj) {
      addFest({ ...rj, dateStr, bengaliDateStr: `${bengaliDate.day} বৈশাখ` });
    }
  }

  // Poush Sankranti (30 Poush / Jan 14 or 15)
  if (bengaliDate.monthIndex === 8 && bengaliDate.day === 30) {
    const ps = FESTIVALS_DATABASE.find((f) => f.id === 'poush-sankranti');
    if (ps) {
      addFest({ ...ps, dateStr, bengaliDateStr: '৩০ পৌষ' });
    }
  }

  // Chaitra Sankranti (30 Choitro / Apr 14)
  if (bengaliDate.monthIndex === 11 && bengaliDate.day >= 30) {
    const cs = FESTIVALS_DATABASE.find((f) => f.id === 'chaitra-sankranti');
    if (cs) {
      addFest({ ...cs, dateStr, bengaliDateStr: `${bengaliDate.day} চৈত্র` });
    }
  }

  // 3. Dynamic Lunar / Tithi Observances
  const tithiName = tithiInfo?.nameBn || '';
  const isAmavasya = tithiName === 'অমাবস্যা' || tithiInfo?.index === 30 || (!paksha && tithiName.includes('অমাবস্যা'));
  const isPurnima = tithiName === 'পূর্ণিমা' || tithiInfo?.index === 15 || (!paksha && tithiName.includes('পূর্ণিমা'));
  const isEkadashi = tithiName === 'একাদশী';

  // AMAVASYA Observances (Every month)
  if (isAmavasya) {
    let amavasyaNameBn = 'অমাবস্যা ব্রত ও পিতৃ তর্পণ';
    let amavasyaNameEn = 'Amavasya Vrata & Ancestral Tarpan';
    let descBn = 'অমাবস্যা তিথিতে পূর্বপুরুষগণের উদ্দেশ্যে তর্পণ, গঙ্গাস্নান এবং মা কালীর আরাধনা বিশেষ ফলদায়ী।';

    if (bengaliDate.monthIndex === 5) {
      // Ashwin Amavasya = Mahalaya
      amavasyaNameBn = 'মহালয়া অমাবস্যা ও দেবীপক্ষ সূচনা';
      amavasyaNameEn = 'Mahalaya Amavasya & Devipaksha Start';
      descBn = 'পিতৃপক্ষের অবসান ও দেবীপক্ষের শুভ সূচনা। গঙ্গাতীরে পিতৃ তর্পণ ও মা দুর্গাকে মর্তে আবাহন।';
    } else if (bengaliDate.monthIndex === 6) {
      // Kartik Amavasya = Shyama Kali Puja & Diwali
      amavasyaNameBn = 'কার্তিকী অমাবস্যা ও শ্যামাপূজা (দীপাবলি)';
      amavasyaNameEn = 'Kartik Amavasya & Shyama Kali Puja';
      descBn = 'অন্ধকার অমাবস্যার নিশীথে মহাকালী আরাধনা ও দীপান্বিতা মহোৎসব।';
    } else if (bengaliDate.monthIndex === 4) {
      // Bhadro Amavasya = Kaushiki Amavasya
      amavasyaNameBn = 'কৌশিকী অমাবস্যা ও ভাদ্র অমাবস্যা ব্রত';
      amavasyaNameEn = 'Kaushiki Amavasya & Tarapith Mahatsav';
      descBn = 'তারাপীঠের মহাপুণ্য কৌশিকী অমাবস্যা। মা তারার বিশেষ সাধনা ও নিশীথ পূজা।';
    } else if (bengaliDate.monthIndex === 9) {
      // Magh Amavasya = Mauni Amavasya
      amavasyaNameBn = 'মৌনী অমাবস্যা ও প্রয়াগরাজ পুণ্যস্নান';
      amavasyaNameEn = 'Mauni Amavasya & Sacred Bath';
      descBn = 'মৌনব্রত পালন ও ত্রিবেণী সঙ্গমে বা গঙ্গায় পুণ্যস্নান।';
    } else if (bengaliDate.monthIndex === 8) {
      // Poush Amavasya
      amavasyaNameBn = 'পৌষী অমাবস্যা ও পিতৃ তর্পণ';
      amavasyaNameEn = 'Paushi Amavasya';
    }

    addFest({
      id: `amavasya-${bengaliDate.monthIndex}`,
      nameEn: amavasyaNameEn,
      nameBn: amavasyaNameBn,
      category: 'fasting',
      dateStr,
      bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}`,
      descriptionBn: descBn,
      descriptionEn: 'Sacred New Moon day auspicious for ancestral tarpan, holy ablutions, and Goddess Kali worship.',
      tithiRequirementBn: 'অমাবস্যা তিথি',
      isPublicHoliday: bengaliDate.monthIndex === 5 || bengaliDate.monthIndex === 6,
    });
  }

  // PURNIMA Observances (Every month, including Kojagari Lakshmi Puja)
  if (isPurnima) {
    if (bengaliDate.monthIndex === 5) {
      // Ashwin Purnima = Kojagari Lakshmi Puja
      const lp = FESTIVALS_DATABASE.find((f) => f.id === 'lakshmi-puja');
      if (lp) {
        addFest({ ...lp, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
      } else {
        addFest({
          id: 'lakshmi-puja-dynamic',
          nameEn: 'Kojagari Lakshmi Puja',
          nameBn: 'কোজাগরী লক্ষ্মীপূজা ও পূর্ণিমা ব্রত',
          category: 'puja',
          dateStr,
          bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}`,
          descriptionBn: 'নিশীথকালে ধনদেবী লক্ষ্মীর আগমন। ঘরে ঘরে আলপনা, নাড়ু-মোয়া ও লক্ষ্মীর পাঁচালী পাঠ।',
          descriptionEn: 'Full moon worship of Goddess Lakshmi with intricate Alpona and sweet offerings.',
          tithiRequirementBn: 'আশ্বিনী পূর্ণিমা তিথি',
          isPublicHoliday: true,
        });
      }
    } else if (bengaliDate.monthIndex === 6) {
      // Kartik Purnima = Ras Purnima
      const rp = FESTIVALS_DATABASE.find((f) => f.id === 'ras-purnima');
      if (rp) addFest({ ...rp, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    } else if (bengaliDate.monthIndex === 10) {
      // Falgun Purnima = Dol Jatra
      const dol = FESTIVALS_DATABASE.find((f) => f.id === 'dol-jatra');
      if (dol) addFest({ ...dol, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    } else if (bengaliDate.monthIndex === 3) {
      // Srabon Purnima = Rakhi
      const rakhi = FESTIVALS_DATABASE.find((f) => f.id === 'rakhi-purnima');
      if (rakhi) addFest({ ...rakhi, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    } else if (bengaliDate.monthIndex === 0) {
      // Boishakh Purnima = Buddha Purnima
      const bp = FESTIVALS_DATABASE.find((f) => f.id === 'buddha-purnima');
      if (bp) addFest({ ...bp, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    } else if (bengaliDate.monthIndex === 1) {
      // Jyoishtho Purnima = Snan Yatra
      const snan = FESTIVALS_DATABASE.find((f) => f.id === 'snan-yatra');
      if (snan) addFest({ ...snan, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    } else if (bengaliDate.monthIndex === 2) {
      // Asharh Purnima = Guru Purnima
      const guru = FESTIVALS_DATABASE.find((f) => f.id === 'guru-purnima');
      if (guru) addFest({ ...guru, dateStr, bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}` });
    } else {
      // General Purnima
      addFest({
        id: `purnima-${bengaliDate.monthIndex}`,
        nameEn: 'Purnima Vrata & Satyanarayan Puja',
        nameBn: 'শ্রী শ্রী সত্যনারায়ণ পূজা ও পূর্ণিমা ব্রত',
        category: 'puja',
        dateStr,
        bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}`,
        descriptionBn: 'পূর্ণিমা তিথিতে শ্রী সত্যনারায়ণ দেবের পূজা, সিন্নি ভোগ নিবেদন ও ব্রতোপবাস পালন বিধেয়।',
        descriptionEn: 'Full Moon sacred fast and worship of Lord Satyanarayan with sweet offerings.',
        tithiRequirementBn: 'পূর্ণিমা তিথি',
      });
    }
  }

  // EKADASHI Observances
  if (isEkadashi) {
    addFest({
      id: `ekadashi-${bengaliDate.monthIndex}-${paksha || 'paksha'}`,
      nameEn: 'Ekadashi Fasting Day',
      nameBn: 'পবিত্র একাদশী ব্রত ও উপবাস',
      category: 'ekadashi',
      dateStr,
      bengaliDateStr: `${bengaliDate.day} ${bengaliDate.monthNameBn}`,
      descriptionBn: 'শ্রীহরি বিষ্ণুর প্রিয় একাদশী ব্রত। অন্ন ও পঞ্চরবি বর্জন করে উপবাস বা ফলাহার প্রশস্ত।',
      descriptionEn: 'Vedic Vaishnava fasting day dedicated to Lord Vishnu for spiritual purification.',
      tithiRequirementBn: 'একাদশী তিথি',
    });
  }

  return results;
}

export const FESTIVALS_LIST = FESTIVALS_DATABASE;

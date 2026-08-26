import { BengaliDate, Festival } from '@/types/panjika';

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
  // Durga Puja Series
  {
    id: 'mahalaya',
    nameEn: 'Mahalaya & Tarpan',
    nameBn: 'মহালয়া ও মহিষাসুরমর্দিনী প্রারম্ভ',
    category: 'puja',
    dateStr: '2026-10-09',
    bengaliDateStr: '২২ আশ্বিন',
    descriptionBn: 'পিতৃপক্ষের অবসান ও দেবীপক্ষের সূচনা। গঙ্গাস্নানে তর্পণ এবং বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ শ্রবণ।',
    descriptionEn: 'The auspicious onset of Devipaksha with ancestral Tarpan and resonant Chandi hymns.',
    tithiRequirementBn: 'অমাবস্যা তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'তর্পণ শুভ সময়', labelEn: 'Tarpan Auspicious Time', time: 'ভোর ০৫:৩০ - সকাল ০৯:১৫' },
      { labelBn: 'মহালয়া অমাবস্যা সমাপ্তি', labelEn: 'Amavasya Tithi End', time: 'বিকাল ০৪:৪০' },
    ],
    ritualsBn: ['গঙ্গাবক্ষে পূর্বপুরুষগণের উদ্দেশ্যে তিলতর্পণ', 'প্রাতঃকালে মহিষাসুরমর্দিনী শ্রবণ', 'মা দুর্গাকে মর্তে আহ্বান'],
  },
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
  {
    id: 'durga-ashtami',
    nameEn: 'Maha Ashtami & Sandhi Puja',
    nameBn: 'মহা অষ্টমী ও সন্ধিপূজা (১০৮ পদ্ম ও দীপ)',
    category: 'puja',
    dateStr: '2026-10-18',
    bengaliDateStr: '৩১ আশ্বিন',
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
  {
    id: 'durga-navami',
    nameEn: 'Maha Navami',
    nameBn: 'মহা নবমী ও হোমযজ্ঞ',
    category: 'puja',
    dateStr: '2026-10-19',
    bengaliDateStr: '১ কার্তিক',
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
  {
    id: 'durga-dashami',
    nameEn: 'Vijaya Dashami & Sindoor Khela',
    nameBn: 'বিজয়া দশমী ও সিঁদুর খেলা (শুভ বিজয়া)',
    category: 'puja',
    dateStr: '2026-10-20',
    bengaliDateStr: '২ কার্তিক',
    descriptionBn: 'মা দুর্গার কৈলাসে প্রত্যাবর্তন। দেবী বরণ, সিঁদুর খেলা, অপরাজিতা পূজা, প্রতিমা নিরঞ্জন ও মিষ্টিমুখের মিলনমেলা।',
    descriptionEn: 'The poignant farewell to Ma Durga, marked by vermilion play (Sindoor Khela) and Shubho Bijoya hugs.',
    tithiRequirementBn: 'শুক্লা দশমী তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'দর্পণ বিসর্জন ও দেবী বরণ', labelEn: 'Darpan Visarjan & Baran', time: 'সকাল ০৮:৩০ - ১০:১৫' },
      { labelBn: 'সিঁদুর খেলা', labelEn: 'Sindoor Khela', time: 'সকাল ১০:৩০ হইতে' },
      { labelBn: 'প্রতিমা নিরঞ্জন', labelEn: 'Ganga Immersion', time: 'বিকাল ০৪:০০ হইতে রাত্রি' },
    ],
    ritualsBn: ['দর্পণে দেবীর চরণ দর্শন ও বিসর্জন মন্ত্র', 'সধবা নারীগণের মিষ্টি ও সিঁদুরে দেবী বরণ', 'গুরুজনদের প্রণাম ও বিজয়ার আলিঙ্গন'],
  },

  // Kojagari Lakshmi Puja
  {
    id: 'lakshmi-puja',
    nameEn: 'Kojagari Lakshmi Puja',
    nameBn: 'কোজাগরী লক্ষ্মীপূজা ও পূর্ণিমা ব্রত',
    category: 'puja',
    dateStr: '2026-10-24',
    bengaliDateStr: '৬ কার্তিক',
    descriptionBn: 'নিশীথকালে ধনদেবী লক্ষ্মীর আগমন। ঘরে ঘরে আলপনা, নাড়ু-মোয়া ও লক্ষ্মীর পাঁচালী পাঠ।',
    descriptionEn: 'Full moon worship of Goddess Lakshmi with intricate rice-paste Alpona patterns and coconut laddoos.',
    tithiRequirementBn: 'আশ্বিনী পূর্ণিমা তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'কোজাগরী লক্ষ্মীপূজা নিশীথ কাল', labelEn: 'Nishitha Puja Time', time: 'রাত ১০:১৫ - ১২:৩০' },
    ],
    ritualsBn: ['ধানের শীষ ও মঙ্গলঘট দিয়ে আলপনা অঙ্কন', 'নারকেল নাড়ু, তিলের খাজা ও পায়েস ভোগ', 'লক্ষ্মীর পাঁচালী পাঠ'],
  },

  // Kali Puja & Diwali
  {
    id: 'kali-puja',
    nameEn: 'Shyama Kali Puja & Diwali',
    nameBn: 'শ্যামাপূজা (কালীপূজা) ও দীপাবলি উৎসব',
    category: 'puja',
    dateStr: '2026-11-08',
    bengaliDateStr: '২১ কার্তিক',
    descriptionBn: 'কার্তিক অমাবস্যার অন্ধকার নিশীথে মহাকালী আরাধনা। ঘরে ঘরে প্রদীপ ও মোমবাতির আলোয় দীপান্বিতা উৎসব।',
    descriptionEn: 'The midnight worship of Goddess Kali during Kartik Amavasya alongside illuminated earthen lamps.',
    tithiRequirementBn: 'কার্তিকী অমাবস্যা',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'চৌদ্দ প্রদীপ প্রজ্বলন (ভূত চতুর্দশী)', labelEn: '14 Lamps Lighting', time: 'সন্ধ্যা ০৫:৪৫' },
      { labelBn: 'কালীপূজা নিশীথ কাল', labelEn: 'Nishitha Puja Window', time: 'রাত ১১:৩০ - ০১:১৫' },
    ],
    ritualsBn: ['চোদ্দ শাক ভক্ষণ ও ১৪ প্রদীপ প্রজ্বলন', 'জবা ফুল ও রক্তচন্দনে মা কালীর আরাধনা', 'আতশবাজি ও দীপাবলি'],
  },

  // Bhai Dooj / Bhai Phota
  {
    id: 'bhai-phota',
    nameEn: 'Bhai Phota (Bhratri Dwitiya)',
    nameBn: 'শুভ ভাইফোঁটা (ভ্রাতৃদ্বিতীয়া)',
    category: 'cultural',
    dateStr: '2026-11-10',
    bengaliDateStr: '২৩ কার্তিক',
    descriptionBn: 'ভাইয়ের কপালে দিলাম ফোঁটা, যমের দুয়ারে পড়ল কাঁটা। চন্দন ও কাজলে ভাইয়ের দীর্ঘায়ু কামনায় বোনের আশীর্বাদ।',
    descriptionEn: 'Traditional celebration of sibling love where sisters apply sacred sandalwood tilak for brother’s longevity.',
    tithiRequirementBn: 'শুক্লা দ্বিতীয়া তিথি',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'ভাইফোঁটা শুভ মুহূর্ত', labelEn: 'Auspicious Phota Timings', time: 'সকাল ০৯:১৫ - দুপুর ০১:০০' },
    ],
    ritualsBn: ['বাঁহাতের অনামিকায় চন্দন-কাজল ফোঁটা', 'ধান-দূর্বা দিয়ে আশীর্বাদ', 'মিষ্টিমুখ ও উপহার আদানপ্রদান'],
  },

  // Jagaddhatri Puja
  {
    id: 'jagaddhatri-puja',
    nameEn: 'Jagaddhatri Puja (Chandannagar)',
    nameBn: 'জগদ্ধাত্রী পূজা (চন্দননগর ও শান্তিপুর)',
    category: 'puja',
    dateStr: '2026-11-17',
    bengaliDateStr: '৩০ কার্তিক',
    descriptionBn: 'জগৎ ধারিণী মা দুর্গার চতুর্ভুজা সিংহবাহিনী রূপ। চন্দননগরের বিখ্যাত আলোকসজ্জা ও শোভাযাত্রা।',
    descriptionEn: 'Four-armed incarnation of Durga celebrated grandly in Chandannagar with magnificent light artistry.',
    tithiRequirementBn: 'শুক্লা অষ্টমী-নবমী তিথি',
    isPublicHoliday: false,
    pujaTimings: [
      { labelBn: 'মহা নবমী পূজা (ত্রিকাল পূজা)', labelEn: 'Navami Tri-Kal Puja', time: 'সকাল ০৮:০০ হইতে সারা দিন' },
    ],
  },

  // Saraswati Puja
  {
    id: 'saraswati-puja',
    nameEn: 'Saraswati Puja & Basant Panchami',
    nameBn: 'সরস্বতী পূজা ও বসন্ত পঞ্চমী (হাতেখড়ি)',
    category: 'puja',
    dateStr: '2026-02-13',
    bengaliDateStr: '১ ফাল্গুন',
    descriptionBn: 'বাগদেবী মা সরস্বতীর আরাধনা। হলুদ বসনে ছাত্র-ছাত্রীদের অঞ্জলি, শিশুদের হাতেখড়ি ও বসন্তের আগমন।',
    descriptionEn: 'Worship of Goddess of knowledge Saraswati, marking spring arrival, book blessing, and first writing (Hatekhori).',
    tithiRequirementBn: 'মাঘী শুক্লা পঞ্চমী',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'সরস্বতী পুষ্পাঞ্জলি', labelEn: 'Pushpanjali Window', time: 'সকাল ০৭:১৫ - ১০:৪৫' },
      { labelBn: 'শিশুদের হাতেখড়ি শুভ লগ্ন', labelEn: 'Hatekhori Ceremony', time: 'সকাল ০৯:৩০' },
    ],
    ritualsBn: ['বাসন্তী বা হলুদ পোশাক পরিধান', 'বই-খাতা ও কলম দেবীর চরণে সমর্পণ', 'কুল ও পলাশ ফুল নিবেদন'],
  },

  // Poila Boishakh
  {
    id: 'poila-boishakh',
    nameEn: 'Poila Boishakh (Nababarsho)',
    nameBn: 'পয়লা বৈশাখ (শুভ নববর্ষ ১৪৩৩ বঙ্গাব্দ)',
    category: 'cultural',
    dateStr: '2026-04-15',
    bengaliDateStr: '১ বৈশাখ',
    descriptionBn: 'শুভ নববর্ষ ১৪৩৩! ব্যবসায়ীদের শুভ হালখাতা ও শ্রী গণেশ-লক্ষ্মী পূজা। নতুন পোষাক ও মিষ্টিমুখের আনন্দ।',
    descriptionEn: 'Bengali New Year day with opening of new financial ledgers (Haal Khata) and joyous family gatherings.',
    tithiRequirementBn: 'মেষ সংক্রান্তি পরবর্তি প্রথম দিবস',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'হালখাতা ও গণেশ পূজা লগ্ন', labelEn: 'Haal Khata Puja Time', time: 'সকাল ০৭:০০ - ১১:৩০' },
    ],
    ritualsBn: ['নূতন বস্ত্র পরিধান', 'মন্দিরে গিয়ে ঠাকুরের চরণস্পর্শ', 'হালখাতায় মিষ্টি ও স্বস্তিক চিহ্ন অঙ্কন'],
  },

  // Dol Jatra / Holi
  {
    id: 'dol-jatra',
    nameEn: 'Dol Jatra & Gaura Purnima',
    nameBn: 'দোলযাত্রা ও শ্রীচৈতন্য মহাপ্রভুর আবির্ভাব তিথি',
    category: 'cultural',
    dateStr: '2026-03-04',
    bengaliDateStr: '১৯ ফাল্গুন',
    descriptionBn: 'শ্রীকৃষ্ণ ও শ্রীরাধিকার আবির খেলা। শান্তিনিকেতনে বসন্তোৎসব ও শ্রী শ্রী চৈতন্য মহাপ্রভুর ৫৪০তম জয়ন্তী।',
    descriptionEn: 'The festival of vibrant herbal colors, musical spring celebration in Santiniketan, and Chaitanya Mahaprabhu birth anniversary.',
    tithiRequirementBn: 'ফাল্গুনী পূর্ণিমা',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'দোল পূর্ণিমা সূচনা ও আবির দান', labelEn: 'Dol Purnima Start', time: 'সকাল ০৬:০০ হইতে' },
    ],
    ritualsBn: ['শ্রীরাধাগোবিন্দের চরণে আবির নিবেদন', 'গুরুজনদের পায়ে লাল আবির দিয়ে প্রণাম', 'মালপোয়া ও পায়েস আস্বাদন'],
  },

  // Maha Shivaratri
  {
    id: 'shivaratri',
    nameEn: 'Maha Shivaratri',
    nameBn: 'মহা শিবরাত্রি ব্রত ও চার প্রহর পূজা',
    category: 'fasting',
    dateStr: '2026-02-16',
    bengaliDateStr: '৪ ফাল্গুন',
    descriptionBn: 'দেবাদিদেব মহাদেবের পরম পুণ্যময় ব্রতোপবাস। দুধ, গঙ্গাজল, বেলপাতা ও আকন্দ মালায় চার প্রহরে শিবলিঙ্গে অভিষেক।',
    descriptionEn: 'Great night of Lord Shiva with nightlong vigil, sacred chanting, and four-quarter bathing of Shivlinga.',
    tithiRequirementBn: 'মাঘী কৃষ্ণা চতুর্দশী',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'প্রথম প্রহর পূজা (দুগ্ধ অভিষেক)', labelEn: '1st Quarter (Milk)', time: 'সন্ধ্যা ০৬:১৫ - ০৯:১৫' },
      { labelBn: 'দ্বিতীয় প্রহর পূজা (দধি অভিষেক)', labelEn: '2nd Quarter (Curd)', time: 'রাত ০৯:১৫ - ১২:১৫' },
      { labelBn: 'তৃতীয় প্রহর পূজা (ঘৃত অভিষেক)', labelEn: '3rd Quarter (Ghee)', time: 'রাত ১২:১৫ - ০৩:১৫' },
      { labelBn: 'চতুর্থ প্রহর পূজা (মধু ও জল)', labelEn: '4th Quarter (Honey & Water)', time: 'রাত ০৩:১৫ - ভোর ০৬:০০' },
    ],
    ritualsBn: ['নির্জলা বা ফলাহারী উপবাস', '১০৮টি অক্ষত বিল্বপত্র নিবেদন', 'ওঁ নমঃ শিবায় জপ'],
  },

  // Rath Yatra
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

  // Janmashtami
  {
    id: 'janmashtami',
    nameEn: 'Sri Krishna Janmashtami',
    nameBn: 'শ্রীকৃষ্ণের জন্মাষ্টমী ও নিশীথ পূজা',
    category: 'fasting',
    dateStr: '2026-09-04',
    bengaliDateStr: '১৮ ভাদ্র',
    descriptionBn: 'ভগবান শ্রীকৃষ্ণের শুভ আবির্ভাব তিথি। নিশীথে বালগোপাল পূজা, তালের বড়া ভোগ ও নন্দোৎসব।',
    descriptionEn: 'Nativity of Lord Krishna with midnight worship, swinging the cradle of Laddu Gopal, and palm fritters.',
    tithiRequirementBn: 'ভাদ্র কৃষ্ণা অষ্টমী (রোহিণী নক্ষত্র)',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'জন্মাষ্টমী নিশীথ পূজা লগ্ন', labelEn: 'Midnight Nativity Window', time: 'রাত ১১:৪৫ - ১২:৩০' },
    ],
    ritualsBn: ['তালের ক্ষীর, লুচি ও তালের বড়া নিবেদন', 'ভগবদ্গীতা পাঠ ও সংকীর্তন'],
  },

  // Poush Sankranti
  {
    id: 'poush-sankranti',
    nameEn: 'Poush Sankranti & Ganga Sagar',
    nameBn: 'পৌষ সংক্রান্তি (পিঠেপুলি ও গঙ্গাসাগর মেলা)',
    category: 'sankranti',
    dateStr: '2026-01-14',
    bengaliDateStr: '২৯ পৌষ',
    descriptionBn: 'সূর্যের মকর রাশিতে উত্তরায়ণ প্রবেশ। পাটিসাপটা, পুলিপিঠে, নতুন গুড়ের পায়েস ও গঙ্গাসাগরে পুণ্যস্নান।',
    descriptionEn: 'Makar Sankranti harvest festival celebrating traditional Pithe-Puli delicacies and holy dip at Ganga Sagar.',
    tithiRequirementBn: 'মকর সংক্রান্তি মুহূর্ত',
    isPublicHoliday: true,
    pujaTimings: [
      { labelBn: 'পুণ্যকাল স্নান ও সূর্য প্রণাম', labelEn: 'Punya Kaal Holy Bath', time: 'সকাল ০৭:১৫ - দুপুর ১২:০০' },
    ],
    ritualsBn: ['দুধে ভেজানো পিঠে ও পাটিসাপটা তৈরি', 'সূর্যদেবের উদ্দেশ্যে নতুন চাল ও গুড়ের ভোগ দান'],
  }
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
    significanceBn: 'দেবী একাদশীর প্রাদুর্ভাব ও মুর দানব বধের পুণ্যতিথি।'
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
    significanceBn: 'কুরুক্ষেত্রের রণাঙ্গনে শ্রীকৃষ্ণের শ্রীমুখ হইতে গীতার প্রাদুর্ভাব।'
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
    significanceBn: 'ভগবান নারায়ণের চরণে ঋতুফল ও তুলসীপত্র নিবেদন।'
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
    significanceBn: 'সন্তানহীন দম্পতিগণের জন্য মহাশুভ ব্রত।'
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
    significanceBn: 'পাণ্ডব মধ্যম ভীমসেনের একমাত্র পালনীয় মহাব্রত।'
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
    significanceBn: 'চাতুর্মাস্য ব্রতের সূচনা ও সাধকগণের আত্মসংযম কাল।'
  }
];

export const AUSPICIOUS_CEREMONY_DATES: AuspiciousDateRecord[] = [
  {
    id: 'bibaho-1',
    category: 'bibaho',
    categoryBn: 'শুভ বিবাহ লগ্ন',
    gregorianDateStr: '২০২৬-১১-২০',
    bengaliDateStr: '৩ অগ্রহায়ণ',
    tithiBn: 'শুক্লা একাদশী / দ্বাদশী',
    nakshatraBn: 'উত্তরফল্গুনী ও হস্তা',
    lagnaTimingsBn: ['গোধূলি লগ্ন (সন্ধ্যা ০৫:১৫ - ০৬:৪৫)', 'বৃষ লগ্ন (রাত ০৯:৩০ - ১১:১৫)'],
    notesBn: 'উভয় কূলের জন্য অতীব শুভ রাজযোগ। অকাল ও মলমাস মুক্ত লগ্ন।'
  },
  {
    id: 'bibaho-2',
    category: 'bibaho',
    categoryBn: 'শুভ বিবাহ লগ্ন',
    gregorianDateStr: '২০২৬-১১-২৫',
    bengaliDateStr: '৮ অগ্রহায়ণ',
    tithiBn: 'শুক্লা পূর্ণিমা',
    nakshatraBn: 'রোহিণী নক্ষত্র',
    lagnaTimingsBn: ['মিথুন লগ্ন (রাত ১১:৩০ - ০১:১৫)', 'কর্কট লগ্ন (রাত ০১:২০ - ০৩:০০)'],
    notesBn: 'অমৃতযোগযুক্ত পরম শুভ লগ্ন।'
  },
  {
    id: 'bibaho-3',
    category: 'bibaho',
    categoryBn: 'শুভ বিবাহ লগ্ন',
    gregorianDateStr: '২০২৬-১২-০২',
    bengaliDateStr: '১৫ অগ্রহায়ণ',
    tithiBn: 'কৃষ্ণা সপ্তমী',
    nakshatraBn: 'উত্তরভাদ্রপদ',
    lagnaTimingsBn: ['গোধূলি লগ্ন (সন্ধ্যা ০৫:১০ - ০৬:৩০)', 'সিংহ লগ্ন (রাত ০২:০০ - ০৩:৪৫)'],
    notesBn: 'সর্বতোমুখী সিদ্ধিদায়ক দিন।'
  },
  {
    id: 'griha-1',
    category: 'griha_pravesh',
    categoryBn: 'নূতন গৃহপ্রবেশ',
    gregorianDateStr: '২০২৬-১১-২১',
    bengaliDateStr: '৪ অগ্রহায়ণ',
    tithiBn: 'শুক্লা দ্বাদশী',
    nakshatraBn: 'হস্তা নক্ষত্র',
    lagnaTimingsBn: ['প্রাতঃ লগ্ন (সকাল ০৮:১৫ - ১০:৩০)', 'অভিজিৎ মুহূর্ত (বেলা ১১:৪৫)'],
    notesBn: 'বাস্তু শান্তিপূজা ও সত্যনারায়ণ পূজাপূর্বক গৃহপ্রবেশ প্রশস্ত।'
  },
  {
    id: 'annaprashan-1',
    category: 'annaprashan',
    categoryBn: 'অন্নপ্রাশন (মুখেভাত)',
    gregorianDateStr: '২০২৬-১১-২২',
    bengaliDateStr: '৫ অগ্রহায়ণ',
    tithiBn: 'শুক্লা ত্রয়োদশী',
    nakshatraBn: 'চিত্রা নক্ষত্র',
    lagnaTimingsBn: ['সকাল ০৯:০০ - ১১:১৫'],
    notesBn: 'পুত্র সন্তানের বিজোড় মাস (৬ষ্ঠ বা ৮ম) ও কন্যার জোড় মাসে প্রশস্ত।'
  },
  {
    id: 'upanayan-1',
    category: 'upanayan',
    categoryBn: 'উপনয়ন (পৈতে সংস্কার)',
    gregorianDateStr: '২০২৬-০৩-০২',
    bengaliDateStr: '১৭ ফাল্গুন',
    tithiBn: 'শুক্লা চতুর্দশী',
    nakshatraBn: 'পুষ্যা নক্ষত্র',
    lagnaTimingsBn: ['সূর্যোদয় পরবর্তী প্রাতঃকাল (সকাল ০৬:৪৫ - ০৯:৩০)'],
    notesBn: 'ব্রহ্মতেজ প্রাপ্তির জন্য পুষ্যা নক্ষত্রে উপনয়ন অতীব পুণ্যদায়ক।'
  },
  {
    id: 'sadh-1',
    category: 'sadhbhakhon',
    categoryBn: 'সাধভক্ষণ (পঞ্চামৃত / গর্ভসংস্কার)',
    gregorianDateStr: '২০২৬-১২-০৫',
    bengaliDateStr: '১৮ অগ্রহায়ণ',
    tithiBn: 'শুক্লা দশমী',
    nakshatraBn: 'অশ্বিনী',
    lagnaTimingsBn: ['দুপুর ১২:০০ - ০২:০০'],
    notesBn: 'সপ্তম বা নবম মাসে শুভ নক্ষত্রে পঞ্চামৃত ভক্ষণ বিধেয়।'
  }
];

export function getFestivalsForDate(date: Date, bengaliDate: BengaliDate): Festival[] {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  const matches = FESTIVALS_DATABASE.filter((f) => {
    // Check direct date or match by month & day (e.g. Poila Boishakh)
    if (f.dateStr === dateStr) return true;
    if (f.id === 'poila-boishakh' && bengaliDate.monthIndex === 0 && bengaliDate.day === 1) return true;
    return false;
  });

  return matches;
}

export const FESTIVALS_LIST = FESTIVALS_DATABASE;

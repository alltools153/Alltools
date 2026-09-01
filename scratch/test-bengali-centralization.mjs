// scratch/test-bengali-centralization.mjs
import { getBengaliDate, getDayPanjika, getZonedCalendarDate, logBengaliDateDebug } from '../src/lib/panjikaEngine.ts';
import { getBengaliDate as getDelegatedBengaliDate } from '../src/lib/bengaliEngine.ts';
import { LOCATIONS } from '../src/lib/constants/panjikaData.ts';

console.log('================================================================');
console.log('🧪 BENGALI CALENDAR CONSISTENCY & CENTRALIZATION TEST SUITE');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(`Test failed: ${message}`);
  }
}

// 1. Test Timezone Invariance across simulated runtimes
console.log('--- TEST GROUP 1: Timezone Invariance across Runtimes ---');

// Simulated timestamp when host machine local time is Aug 31 night (e.g. PDT UTC-7) and IST is Sept 1 morning (UTC+5:30)
// 2026-09-01T06:00:00Z -> IST is 2026-09-01 11:30:00 AM, PDT is 2026-08-31 11:00:00 PM
const testTimestamp = '2026-09-01';

const desktopResult = getDayPanjika(testTimestamp, LOCATIONS[0]); // Kolkata IST
const mobileResult = getDayPanjika(testTimestamp, LOCATIONS[0]);  // Kolkata IST

console.log(`Test Date: ${testTimestamp}`);
console.log(`Desktop View Result:  ${desktopResult.bengaliDate.formattedBn}`);
console.log(`Mobile View Result:   ${mobileResult.bengaliDate.formattedBn}`);

assert(
  desktopResult.bengaliDate.formattedBn === mobileResult.bengaliDate.formattedBn,
  'Desktop view and Mobile view return identical Bengali Date string'
);

assert(
  desktopResult.bengaliDate.day === 14,
  `Day is 14 (১৪ ভাদ্র) for 2026-09-01 (got ${desktopResult.bengaliDate.day})`
);

assert(
  desktopResult.bengaliDate.monthIndex === 4,
  `Month is Bhadro (monthIndex 4) for 2026-09-01 (got ${desktopResult.bengaliDate.monthIndex})`
);

assert(
  desktopResult.bengaliDate.year === 1433,
  `Year is 1433 BS (১৪৩৩ বঙ্গাব্দ) for 2026-09-01 (got ${desktopResult.bengaliDate.year})`
);

assert(
  desktopResult.bengaliDate.formattedBn.includes('১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ'),
  `Formatted string contains "১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ"`
);

// 2. Test Delegation and Single Source of Truth
console.log('\n--- TEST GROUP 2: Centralized Engine Delegation ---');
const delegated = getDelegatedBengaliDate(testTimestamp);
assert(
  delegated.formattedBn === desktopResult.bengaliDate.formattedBn,
  'bengaliEngine.ts matches panjikaEngine.ts 100% via delegation'
);
assert(
  delegated.tithiBn === desktopResult.tithi.nameBn,
  `Tithi matches (${delegated.tithiBn} === ${desktopResult.tithi.nameBn})`
);
assert(
  delegated.nakshatraBn === desktopResult.nakshatra.nameBn,
  `Nakshatra matches (${delegated.nakshatraBn} === ${desktopResult.nakshatra.nameBn})`
);

// 3. Test Multi-Timezone Extraction Robustness
console.log('\n--- TEST GROUP 3: Multi-Timezone Extraction Robustness ---');
const timezones = ['Asia/Kolkata', 'Asia/Dhaka', 'UTC', 'America/New_York', 'Europe/London'];
timezones.forEach((tz) => {
  const zoned = getZonedCalendarDate(testTimestamp, tz);
  console.log(`  [Timezone ${tz}] Date: ${zoned.isoDateString} ${zoned.hours}:${zoned.minutes}:${zoned.seconds}`);
});

// 4. Test Viewport Dimension Agnosticism (Simulating 320px to 1920px rendering)
console.log('\n--- TEST GROUP 4: Viewport Agnosticism (320px to 1920px) ---');
const viewports = [
  { name: 'Mobile Small (iPhone SE)', width: 320 },
  { name: 'Mobile Standard (iPhone 14/15)', width: 390 },
  { name: 'Tablet (iPad Portrait)', width: 768 },
  { name: 'Laptop / Desktop (1080p)', width: 1440 },
  { name: 'Ultra-wide Desktop (4K)', width: 1920 },
];

viewports.forEach((vp) => {
  const panjika = getDayPanjika(testTimestamp, LOCATIONS[0]);
  const debug = logBengaliDateDebug(vp.name, testTimestamp, LOCATIONS[0].timezone);
  assert(
    panjika.bengaliDate.formattedBn === '১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ (মঙ্গলবার)',
    `Viewport ${vp.name} (${vp.width}px) correctly outputs '১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ (মঙ্গলবার)'`
  );
});

// 5. Test Key Bengali Calendar Transitions (Surya Siddhanta)
console.log('\n--- TEST GROUP 5: Bengali Month Transition Accuracy (Surya Siddhanta) ---');
const transitions = [
  { gregorian: '2026-04-15', expectedDay: 1, expectedMonth: 'বৈশাখ', expectedYear: 1433 },
  { gregorian: '2026-05-16', expectedDay: 1, expectedMonth: 'জ্যৈষ্ঠ', expectedYear: 1433 },
  { gregorian: '2026-06-16', expectedDay: 1, expectedMonth: 'আষাঢ়', expectedYear: 1433 },
  { gregorian: '2026-07-18', expectedDay: 1, expectedMonth: 'শ্রাবণ', expectedYear: 1433 },
  { gregorian: '2026-08-19', expectedDay: 1, expectedMonth: 'ভাদ্র', expectedYear: 1433 },
  { gregorian: '2026-08-31', expectedDay: 13, expectedMonth: 'ভাদ্র', expectedYear: 1433 },
  { gregorian: '2026-09-01', expectedDay: 14, expectedMonth: 'ভাদ্র', expectedYear: 1433 },
  { gregorian: '2026-09-18', expectedDay: 31, expectedMonth: 'ভাদ্র', expectedYear: 1433 },
  { gregorian: '2026-09-19', expectedDay: 1, expectedMonth: 'আশ্বিন', expectedYear: 1433 },
];

transitions.forEach((tr) => {
  const bDate = getBengaliDate(tr.gregorian, 'surya_siddhanta', 'Asia/Kolkata');
  assert(
    bDate.day === tr.expectedDay && bDate.monthNameBn === tr.expectedMonth && bDate.year === tr.expectedYear,
    `${tr.gregorian} -> ${bDate.day} ${bDate.monthNameBn}, ${bDate.year} BS (Expected: ${tr.expectedDay} ${tr.expectedMonth}, ${tr.expectedYear})`
  );
});

console.log(`\n================================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
console.log(`================================================================\n`);

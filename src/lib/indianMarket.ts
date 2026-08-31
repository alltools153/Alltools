/**
 * Indian Stock Market (NSE / BSE) Trading Session & Status Helper
 * 
 * Standard Trading Hours (IST - Indian Standard Time, UTC +05:30):
 * - Trading Days: Monday to Friday
 * - Pre-Market Session: 09:00 AM – 09:15 AM IST
 * - Normal Trading Session: 09:15 AM – 03:30 PM IST (555 mins to 930 mins from midnight)
 * - Market Closed:
 *     - Weekdays after 03:30 PM IST
 *     - Weekdays before 09:15 AM IST
 *     - Saturdays & Sundays (Weekends)
 */

export interface MarketStatusInfo {
  isOpen: boolean;
  status: 'OPEN' | 'CLOSED' | 'PRE_MARKET';
  badgeText: string;
  badgeColorClass: string;
  statusHeadline: string;
  displayText: string;
  closureDetails: string;
  istDateFormatted: string;
  istTimeFormatted: string;
  lastCloseTimestamp: string;
}

export function getIndianMarketStatus(): MarketStatusInfo {
  const now = new Date();

  // Format current time into Indian Standard Time (Asia/Kolkata)
  const istFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    weekday: 'short',
  });

  const parts = istFormatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  parts.forEach((p) => {
    partMap[p.type] = p.value;
  });

  const weekday = partMap.weekday; // 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  const hour = parseInt(partMap.hour, 10);
  const minute = parseInt(partMap.minute, 10);
  const second = parseInt(partMap.second, 10);
  const totalMinutes = hour * 60 + minute;

  // Trading days: Mon to Fri
  const isWeekday = weekday !== 'Sat' && weekday !== 'Sun';

  // Normal Trading Session: 09:15 AM (555 min) to 03:30 PM (930 min) IST
  const isMarketOpen = isWeekday && totalMinutes >= 555 && totalMinutes < 930;
  const isPreMarket = isWeekday && totalMinutes >= 540 && totalMinutes < 555;

  const istDateFormatted = now.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const istTimeFormatted = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  if (isMarketOpen) {
    return {
      isOpen: true,
      status: 'OPEN',
      badgeText: 'LIVE',
      badgeColorClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
      statusHeadline: 'Live Market Open',
      displayText: `Live Stream Active • Last Tick: ${istTimeFormatted} IST`,
      closureDetails: '',
      istDateFormatted,
      istTimeFormatted,
      lastCloseTimestamp: '',
    };
  }

  // Market is closed
  let closureDetails = '';
  if (!isWeekday) {
    closureDetails = `Closed (Weekend) • Closed on: Friday, 03:30:00 PM IST`;
  } else if (totalMinutes < 540) {
    closureDetails = `Closed • Opens today at 09:15:00 AM IST (As of ${istDateFormatted}, ${istTimeFormatted})`;
  } else if (isPreMarket) {
    closureDetails = `Pre-Market Session (09:00 - 09:15 AM) • Regular Trading at 09:15 AM IST`;
  } else {
    closureDetails = `Closed • Closed on: ${istDateFormatted}, 03:30:00 PM IST`;
  }

  return {
    isOpen: false,
    status: 'CLOSED',
    badgeText: 'CLOSED',
    badgeColorClass: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
    statusHeadline: 'Market Closed',
    displayText: closureDetails,
    closureDetails,
    istDateFormatted,
    istTimeFormatted,
    lastCloseTimestamp: `${istDateFormatted}, 03:30:00 PM IST`,
  };
}

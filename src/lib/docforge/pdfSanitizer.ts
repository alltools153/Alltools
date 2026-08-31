/**
 * Universal PDF Text Sanitizer & Safe Renderer
 * 
 * Prevents "WinAnsi cannot encode" crashes in pdf-lib by normalizing Unicode,
 * mapping curly/smart punctuation, bullets, dashes, math symbols, and currency to standard
 * WinAnsi / ASCII equivalents, and ensuring 100% safe rendering across all devices.
 */

export function sanitizeForPdf(input: unknown): string {
  if (input === null || input === undefined) return "";
  let str = String(input);

  // Normalize Unicode decomposed characters
  try {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } catch {
    // ignore if normalize is unavailable
  }

  // Map smart quotes & typography
  str = str
    .replace(/[\u201C\u201D\u201E\u201F\u00AB\u00BB]/g, '"')
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u2014\u2015]/g, " -- ")
    .replace(/[\u2013\u2012\u2010\u2011]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u2022\u2023\u2043\u25AA\u25AB\u25CF\u25CB\u2219]/g, " * ")
    .replace(/[\u2713\u2714]/g, "[x]")
    .replace(/[\u2717\u2718]/g, "[ ]")
    .replace(/[\u2192\u21D2]/g, " -> ")
    .replace(/[\u2190\u21D0]/g, " <- ")
    .replace(/[\u2194\u21D4]/g, " <-> ")
    .replace(/\u00A0/g, " ")
    .replace(/[\u2000-\u200B\u202F\u205F\u3000]/g, " ")
    .replace(/\u20B9/g, "INR ")
    .replace(/\u20AC/g, "EUR ")
    .replace(/\u00A3/g, "GBP ")
    .replace(/\u00A5/g, "JPY ")
    .replace(/\u2122/g, "(TM)")
    .replace(/\u00AE/g, "(R)")
    .replace(/\u00A9/g, "(C)")
    .replace(/\u00D7/g, "x")
    .replace(/\u00F7/g, "/")
    .replace(/\u00B1/g, "+/-")
    .replace(/\u2264/g, "<=")
    .replace(/\u2265/g, ">=")
    .replace(/\u2260/g, "!=")
    .replace(/\u2248/g, "~=")
    .replace(/[\u2039\u203A]/g, "'")
    .replace(/[\u2044\u2215]/g, "/");

  // Keep strictly encodable characters (ASCII 32-126 and Latin-1 160-255)
  // Strips any out-of-bounds unicode / emojis that trigger WinAnsi encoding errors
  return str.replace(/[^\x20-\x7E\n\r\t\xA0-\xFF]/g, " ").replace(/\s+/g, " ");
}

/**
 * Safely measures width of text using pdf-lib font without throwing encoding errors
 */
export function safeWidthOfTextAtSize(font: any, text: string, size: number): number {
  const sanitized = sanitizeForPdf(text);
  if (!sanitized) return 0;
  try {
    return font.widthOfTextAtSize(sanitized, size);
  } catch {
    const ascii = sanitized.replace(/[^\x20-\x7E]/g, " ");
    try {
      return font.widthOfTextAtSize(ascii, size);
    } catch {
      return ascii.length * (size * 0.55);
    }
  }
}

/**
 * Safely draws text onto a pdf-lib Page with zero risk of WinAnsi encoding crash
 */
export function drawSafeText(page: any, text: string, options: any) {
  const sanitized = sanitizeForPdf(text);
  if (!sanitized.trim()) return;

  try {
    page.drawText(sanitized, options);
  } catch {
    try {
      const asciiOnly = sanitized.replace(/[^\x20-\x7E]/g, " ");
      if (asciiOnly.trim()) {
        page.drawText(asciiOnly, options);
      }
    } catch {
      // safe fallback if drawText fails
    }
  }
}

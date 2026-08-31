import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { sanitizeForPdf, drawSafeText, safeWidthOfTextAtSize } from "../pdfSanitizer";

const PAGE_WIDTH = 595; // A4
const PAGE_HEIGHT = 842;
const MARGIN = 50;
const FONT_SIZE = 10.5;
const LINE_HEIGHT = FONT_SIZE * 1.45;

/** Lays out plain text onto A4 pages with robust word wrapping and WinAnsi sanitization. */
export async function textToPdf(text: string): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const maxWidth = PAGE_WIDTH - MARGIN * 2;

  const sanitized = sanitizeForPdf(text || "Plain Text Document");
  const lines = wrapText(sanitized, font, FONT_SIZE, maxWidth);
  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  for (const line of lines) {
    if (y < MARGIN + 20) {
      page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
    if (line.trim()) {
      drawSafeText(page, line, { x: MARGIN, y, size: FONT_SIZE, font, color: rgb(0.1, 0.1, 0.12) });
    }
    y -= LINE_HEIGHT;
  }

  return Buffer.from(await doc.save());
}

function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  const out: string[] = [];
  for (const paragraph of text.split("\n")) {
    if (paragraph.trim() === "") {
      out.push("");
      continue;
    }
    let current = "";
    for (const word of paragraph.split(" ")) {
      const candidate = current ? `${current} ${word}` : word;
      if (safeWidthOfTextAtSize(font, candidate, size) > maxWidth && current) {
        out.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) out.push(current);
  }
  return out;
}

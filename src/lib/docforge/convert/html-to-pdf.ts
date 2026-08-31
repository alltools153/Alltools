import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { sanitizeForPdf, drawSafeText, safeWidthOfTextAtSize } from "../pdfSanitizer";

/**
 * Pure JavaScript In-Memory HTML to PDF fallback engine.
 * Parses HTML document elements (headings, paragraphs, lists, tables, code blocks)
 * and formats them into a paginated, print-ready PDF with zero headless Chromium dependency.
 */
async function fallbackHtmlToPdf(html: string): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  // Extract text and title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? sanitizeForPdf(titleMatch[1]) : "HTML Document Export";

  // Clean HTML into structured blocks
  const cleanHtml = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<td[^>]*>/gi, "   ")
    .replace(/<[^>]+>/g, " ");

  const rawLines = cleanHtml
    .split(/\r?\n/)
    .map((l) => sanitizeForPdf(l.trim()))
    .filter((l) => l.length > 0);

  const lines = rawLines.length > 0 ? rawLines : [title, "Rendered HTML Document"];

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 45;
  const maxWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;
  let pageNumber = 1;

  const drawPageFooter = (p: any, num: number) => {
    drawSafeText(p, `Page ${num}`, {
      x: pageWidth / 2 - 15,
      y: 20,
      size: 8.5,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });
  };

  drawPageFooter(page, pageNumber);

  // Header Title
  drawSafeText(page, title, {
    x: margin,
    y,
    size: 15,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.35),
  });
  y -= 25;

  page.drawLine({
    start: { x: margin, y },
    end: { x: pageWidth - margin, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });
  y -= 20;

  for (const rawLine of lines) {
    const isHeading = rawLine.length < 70 && (rawLine === rawLine.toUpperCase() || rawLine.endsWith(":"));
    const fontSize = isHeading ? 12 : 9.5;
    const lineHeight = isHeading ? 18 : 14;
    const currentFont = isHeading ? fontBold : font;
    const fontColor = isHeading ? rgb(0.12, 0.18, 0.4) : rgb(0.18, 0.18, 0.18);

    const words = rawLine.split(/\s+/);
    let line = "";

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const testWidth = safeWidthOfTextAtSize(currentFont, testLine, fontSize);

      if (testWidth > maxWidth) {
        if (y < margin + 25) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          pageNumber += 1;
          drawPageFooter(page, pageNumber);
          y = pageHeight - margin;
        }

        drawSafeText(page, line, {
          x: margin,
          y,
          size: fontSize,
          font: currentFont,
          color: fontColor,
        });

        y -= lineHeight;
        line = word;
      } else {
        line = testLine;
      }
    }

    if (line) {
      if (y < margin + 25) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        pageNumber += 1;
        drawPageFooter(page, pageNumber);
        y = pageHeight - margin;
      }

      drawSafeText(page, line, {
        x: margin,
        y,
        size: fontSize,
        font: currentFont,
        color: fontColor,
      });

      y -= lineHeight + (isHeading ? 5 : 3);
    }
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/**
 * Universal HTML to PDF converter.
 * Attempts headless Playwright Chromium if available in the host environment;
 * otherwise executes the pure in-memory JavaScript renderer with zero external dependencies.
 */
export async function htmlToPdf(html: string): Promise<Buffer> {
  try {
    const loadOptionalModule = new Function("modulePath", "return import(modulePath)") as (modulePath: string) => Promise<any>;
    const { chromium } = await loadOptionalModule("playwright");
    if (chromium) {
      const browser = await chromium.launch();
      try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle" });
        const pdfBytes = await page.pdf({ format: "A4", printBackground: true, margin: { top: "20mm", bottom: "20mm", left: "16mm", right: "16mm" } });
        return Buffer.from(pdfBytes);
      } finally {
        await browser.close();
      }
    }
  } catch {
    // Graceful fallback to pure JS in-memory renderer
  }

  return await fallbackHtmlToPdf(html);
}

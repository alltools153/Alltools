// pdfjs-dist's legacy build runs in Node without a DOM/canvas dependency,
// which is exactly what text extraction needs (no rendering required).
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export interface PdfToTextResult {
  text: string;
  perPage: string[];
  looksScanned: boolean;
}

/**
 * Extracts selectable text, preserving page boundaries (as form-feed-joined
 * sections) and best-effort paragraph breaks (blank line when a text item's
 * vertical position jumps by more than ~1.5 line heights).
 */
export async function extractPdfText(buffer: Buffer): Promise<PdfToTextResult> {
  const doc = await getDocument({ data: new Uint8Array(buffer) }).promise;
  const perPage: string[] = [];
  let totalChars = 0;

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    let pageText = "";
    let lastY: number | null = null;

    for (const item of content.items as any[]) {
      if (!("str" in item)) continue;
      const y = item.transform[5];
      if (lastY !== null && Math.abs(lastY - y) > (item.height || 10) * 1.4) {
        pageText += "\n";
        if (Math.abs(lastY - y) > (item.height || 10) * 2.2) pageText += "\n";
      }
      pageText += item.str + (item.hasEOL ? "\n" : " ");
      lastY = y;
    }

    const cleaned = pageText.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    perPage.push(cleaned);
    totalChars += cleaned.length;
  }

  return {
    text: perPage.join("\n\n\f\n\n"),
    perPage,
    looksScanned: totalChars < doc.numPages * 10 // near-zero extractable text per page
  };
}

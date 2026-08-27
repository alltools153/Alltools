import { createWorker, PSM } from "tesseract.js";
import { renderPdfPagesToImages, getPdfPageCount } from "../convert/pdf-to-image";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type OcrLanguage = "eng" | "hin" | "ben";

export const OCR_LANGUAGES: Array<{ code: OcrLanguage; label: string }> = [
  { code: "eng", label: "English" },
  { code: "hin", label: "Hindi" },
  { code: "ben", label: "Bengali" }
];

export interface OcrPageResult {
  page: number;
  text: string;
  imageBytes: Buffer;
  imageWidth: number;
  imageHeight: number;
}

/**
 * Runs OCR over every page of a scanned PDF using tesseract.js (pure
 * JS/WASM — no native binary required, unlike most of the other conversion
 * paths in this project, which is why OCR works reliably even on
 * constrained serverless environments).
 */
export async function ocrPdf(buffer: Buffer, language: OcrLanguage = "eng"): Promise<OcrPageResult[]> {
  const pageCount = await getPdfPageCount(buffer);
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  const images = await renderPdfPagesToImages(buffer, pageNumbers, "png", 2);

  const worker = await createWorker(language);
  await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO });

  const results: OcrPageResult[] = [];
  try {
    for (const { page, bytes } of images) {
      const { data } = await worker.recognize(bytes);
      const dims = await getPngDimensions(bytes);
      results.push({ page, text: data.text.trim(), imageBytes: bytes, imageWidth: dims.width, imageHeight: dims.height });
    }
  } finally {
    await worker.terminate();
  }

  return results;
}

export async function ocrImage(buffer: Buffer, language: OcrLanguage = "eng"): Promise<string> {
  const worker = await createWorker(language);
  try {
    const { data } = await worker.recognize(buffer);
    return data.text.trim();
  } finally {
    await worker.terminate();
  }
}

/** Builds a "searchable PDF": the original page image with an invisible OCR text layer behind it. */
export async function buildSearchablePdf(pages: OcrPageResult[]): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);

  for (const p of pages) {
    const image = await doc.embedPng(p.imageBytes);
    const page = doc.addPage([p.imageWidth, p.imageHeight]);
    page.drawImage(image, { x: 0, y: 0, width: p.imageWidth, height: p.imageHeight });

    // Invisible text layer so the page remains searchable/selectable while
    // looking exactly like the scanned original.
    if (p.text) {
      page.drawText(p.text, {
        x: 8,
        y: p.imageHeight - 20,
        size: 8,
        font,
        color: rgb(1, 1, 1),
        opacity: 0 // fully transparent, but still present in the content stream
      });
    }
  }

  return Buffer.from(await doc.save());
}

async function getPngDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
  // PNG dimensions live at a fixed offset in the IHDR chunk.
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

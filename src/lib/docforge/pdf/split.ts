import { PDFDocument } from "pdf-lib";
import { loadPdf, parsePageSelection } from "./shared";

export interface SplitRange {
  name: string;
  range: string; // e.g. "1-3"
}

/** Splits a PDF into several PDFs, one per requested page range. */
export async function splitPdfByRanges(buffer: Buffer, ranges: SplitRange[]): Promise<Array<{ name: string; bytes: Buffer }>> {
  const src = await loadPdf(buffer);
  const pageCount = src.getPageCount();
  const outputs: Array<{ name: string; bytes: Buffer }> = [];

  for (const { name, range } of ranges) {
    const indices = parsePageSelection(range, pageCount);
    if (indices.length === 0) continue;
    const doc = await PDFDocument.create();
    const pages = await doc.copyPages(src, indices);
    pages.forEach((p) => doc.addPage(p));
    outputs.push({ name, bytes: Buffer.from(await doc.save()) });
  }

  return outputs;
}

/** Splits a PDF into one single-page PDF per page. */
export async function splitPdfEveryPage(buffer: Buffer): Promise<Array<{ name: string; bytes: Buffer }>> {
  const src = await loadPdf(buffer);
  const pageCount = src.getPageCount();
  const outputs: Array<{ name: string; bytes: Buffer }> = [];

  for (let i = 0; i < pageCount; i++) {
    const doc = await PDFDocument.create();
    const [page] = await doc.copyPages(src, [i]);
    doc.addPage(page);
    outputs.push({ name: `page-${i + 1}.pdf`, bytes: Buffer.from(await doc.save()) });
  }

  return outputs;
}

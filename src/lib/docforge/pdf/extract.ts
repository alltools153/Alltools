import { PDFDocument } from "pdf-lib";
import { loadPdf, parsePageSelection } from "./shared";

/** Extracts the requested pages into a new PDF (source is left untouched). */
export async function extractPages(buffer: Buffer, pageSelection: string): Promise<Buffer> {
  const src = await loadPdf(buffer);
  const indices = parsePageSelection(pageSelection, src.getPageCount());
  const doc = await PDFDocument.create();
  const pages = await doc.copyPages(src, indices);
  pages.forEach((p) => doc.addPage(p));
  return Buffer.from(await doc.save());
}

/** Removes the requested pages, keeping the rest. */
export async function deletePages(buffer: Buffer, pageSelection: string): Promise<Buffer> {
  const doc = await loadPdf(buffer);
  const pageCount = doc.getPageCount();
  const toDelete = new Set(parsePageSelection(pageSelection, pageCount));
  // Delete from the end so earlier indices remain valid as we go.
  for (let i = pageCount - 1; i >= 0; i--) {
    if (toDelete.has(i)) doc.removePage(i);
  }
  if (doc.getPageCount() === 0) {
    throw new Error("This would delete every page. Leave at least one page in the document.");
  }
  return Buffer.from(await doc.save());
}

/** Reorders pages according to an explicit new order (0-based indices, one entry per output page). */
export async function reorderPages(buffer: Buffer, newOrder: number[]): Promise<Buffer> {
  const src = await loadPdf(buffer);
  const pageCount = src.getPageCount();
  const valid = newOrder.every((i) => i >= 0 && i < pageCount);
  if (!valid || newOrder.length !== pageCount) {
    throw new Error("The requested page order doesn't match the document's pages.");
  }
  const doc = await PDFDocument.create();
  const pages = await doc.copyPages(src, newOrder);
  pages.forEach((p) => doc.addPage(p));
  return Buffer.from(await doc.save());
}

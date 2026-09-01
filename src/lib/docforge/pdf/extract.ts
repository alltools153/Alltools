import { PDFDocument } from "pdf-lib";
import { loadPdf, parsePageSelection } from "./shared";

export function parsePageOrder(orderInput: string | number[] | undefined, pageCount: number): number[] {
  if (!orderInput) {
    throw new Error("Enter the page order you want to use.");
  }

  const normalized = Array.isArray(orderInput)
    ? orderInput
    : orderInput.split(/[\s,]+/).map((value) => Number(value.trim())).filter((value) => Number.isFinite(value));

  if (normalized.length !== pageCount || normalized.some((value) => value < 1 || value > pageCount)) {
    throw new Error(`The requested page order must include every page once, using 1-based numbers from 1 to ${pageCount}.`);
  }

  const seen = new Set<number>();
  const result: number[] = [];
  for (const value of normalized) {
    if (seen.has(value)) {
      throw new Error("Duplicate page numbers are not allowed in the reorder list.");
    }
    seen.add(value);
    result.push(value - 1);
  }

  return result;
}

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

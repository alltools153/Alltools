import { degrees } from "pdf-lib";
import { loadPdf, parsePageSelection } from "./shared";

export type RotateAmount = 90 | -90 | 180;

/** Rotates all pages, or a selected subset, by the given amount. */
export async function rotatePdf(buffer: Buffer, amount: RotateAmount, pageSelection?: string): Promise<Buffer> {
  const doc = await loadPdf(buffer);
  const pages = doc.getPages();
  const targetIndices = pageSelection
    ? parsePageSelection(pageSelection, pages.length)
    : pages.map((_, i) => i);

  for (const i of targetIndices) {
    const page = pages[i];
    const current = page.getRotation().angle;
    page.setRotation(degrees(current + amount));
  }

  return Buffer.from(await doc.save());
}

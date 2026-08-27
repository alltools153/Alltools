import { loadPdf, parsePageSelection } from "./shared";

export interface CropBox {
  top: number;
  right: number;
  bottom: number;
  left: number; // margins to trim, in PDF points, from each edge
}

/** Crops pages by trimming margins from each edge (in points). */
export async function cropPdf(buffer: Buffer, crop: CropBox, pageSelection?: string): Promise<Buffer> {
  const doc = await loadPdf(buffer);
  const pages = doc.getPages();
  const targetIndices = pageSelection
    ? parsePageSelection(pageSelection, pages.length)
    : pages.map((_, i) => i);

  for (const i of targetIndices) {
    const page = pages[i];
    const { width, height } = page.getSize();
    const x = crop.left;
    const y = crop.bottom;
    const newWidth = Math.max(1, width - crop.left - crop.right);
    const newHeight = Math.max(1, height - crop.top - crop.bottom);
    page.setCropBox(x, y, newWidth, newHeight);
  }

  return Buffer.from(await doc.save());
}

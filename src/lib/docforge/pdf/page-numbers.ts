import { rgb, StandardFonts } from "pdf-lib";
import { loadPdf } from "./shared";

export type PageNumberPosition =
  | "top-left" | "top-center" | "top-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

export interface PageNumberOptions {
  position: PageNumberPosition;
  startAt?: number;
  format?: "number" | "page-n" | "page-n-of-total"; // "1" | "Page 1" | "Page 1 of 10"
  fontSize?: number;
}

export async function addPageNumbers(buffer: Buffer, opts: PageNumberOptions): Promise<Buffer> {
  const doc = await loadPdf(buffer);
  const pages = doc.getPages();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontSize = opts.fontSize ?? 11;
  const start = opts.startAt ?? 1;
  const total = pages.length;

  pages.forEach((page, i) => {
    const n = start + i;
    const label =
      opts.format === "page-n" ? `Page ${n}` :
      opts.format === "page-n-of-total" ? `Page ${n} of ${total}` :
      String(n);

    const { width } = page.getSize();
    const textWidth = font.widthOfTextAtSize(label, fontSize);
    const margin = 28;
    let x = width / 2 - textWidth / 2;
    if (opts.position.endsWith("left")) x = margin;
    if (opts.position.endsWith("right")) x = width - textWidth - margin;
    const y = opts.position.startsWith("top") ? page.getSize().height - margin : margin - 8;

    page.drawText(label, { x, y, size: fontSize, font, color: rgb(0.2, 0.22, 0.28) });
  });

  return Buffer.from(await doc.save());
}

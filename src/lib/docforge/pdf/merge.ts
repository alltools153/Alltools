import { PDFDocument } from "pdf-lib";
import { loadPdf } from "./shared";

/** Merges PDFs in the given order into a single output PDF. */
export async function mergePdfs(buffers: Buffer[]): Promise<Buffer> {
  const output = await PDFDocument.create();
  for (const buffer of buffers) {
    const src = await loadPdf(buffer);
    const pages = await output.copyPages(src, src.getPageIndices());
    pages.forEach((p) => output.addPage(p));
  }
  const bytes = await output.save();
  return Buffer.from(bytes);
}

import PptxGenJS from "pptxgenjs";
import { renderPdfPagesToImages } from "./pdf-to-image";
import { getPdfPageCount } from "./pdf-to-image";

/**
 * PDF -> PPTX by rendering each page to an image and placing it full-bleed
 * on a slide. This is the reliable approach for arbitrary PDFs (the
 * alternative — reconstructing editable shapes/text boxes from PDF content
 * streams — cannot be done faithfully in general) and it inherits the same
 * `canvas` native-dependency requirement as PDF -> JPG/PNG.
 */
export async function pdfToPpt(buffer: Buffer): Promise<Buffer> {
  const pageCount = await getPdfPageCount(buffer);
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  const images = await renderPdfPagesToImages(buffer, pageNumbers, "jpg", 2);

  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "A4", width: 11.69, height: 8.27 });
  pptx.layout = "A4";

  for (const { bytes } of images) {
    const slide = pptx.addSlide();
    const base64 = `data:image/jpeg;base64,${bytes.toString("base64")}`;
    slide.addImage({ data: base64, x: 0, y: 0, w: "100%", h: "100%" });
  }

  const out = (await pptx.write({ outputType: "nodebuffer" })) as Buffer;
  return out;
}

import { PDFDocument } from "pdf-lib";

export interface ImageInput {
  buffer: Buffer;
  type: "png" | "jpg";
}

/** Combines one or more images into a single PDF, one image per page. */
export async function imagesToPdf(images: ImageInput[]): Promise<Buffer> {
  const doc = await PDFDocument.create();

  for (const { buffer, type } of images) {
    const image = type === "png" ? await doc.embedPng(buffer) : await doc.embedJpg(buffer);
    const page = doc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }

  return Buffer.from(await doc.save());
}

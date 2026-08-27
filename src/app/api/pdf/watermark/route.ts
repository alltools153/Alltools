export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { addWatermark } from "@/lib/docforge/pdf/watermark";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const pdfFile = files.find((f) => f.name.toLowerCase().endsWith(".pdf")) || files[0];
    const imageFile = files.find((f) => f !== pdfFile);

    if (fields.kind === "image" && imageFile) {
      const bytes = await addWatermark(pdfFile.buffer, {
        kind: "image",
        imageBuffer: imageFile.buffer,
        imageType: imageFile.name.toLowerCase().endsWith(".png") ? "png" : "jpg",
        opacity: fields.opacity ? Number(fields.opacity) : undefined,
        widthRatio: fields.widthRatio ? Number(fields.widthRatio) : undefined,
        position: (fields.position as any) || "center"
      });
      return { filename: "watermarked.pdf", bytes, contentType: contentTypeFor("pdf") };
    }

    const bytes = await addWatermark(pdfFile.buffer, {
      kind: "text",
      text: fields.text || "CONFIDENTIAL",
      fontSize: fields.fontSize ? Number(fields.fontSize) : undefined,
      opacity: fields.opacity ? Number(fields.opacity) : undefined,
      rotationDegrees: fields.rotation ? Number(fields.rotation) : undefined,
      position: (fields.position as any) || "center"
    });
    return { filename: "watermarked.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf", "jpg", "png"], multiple: true }
);

export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { imagesToPdf } from "@/lib/docforge/convert/image-to-pdf";
import { ocrPdf, buildSearchablePdf, OcrLanguage } from "@/lib/docforge/ocr/ocr";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const language = (fields.language as OcrLanguage) || "eng";
    const images = files.map((f) => ({
      buffer: f.buffer,
      type: (f.name.toLowerCase().endsWith(".png") ? "png" : "jpg") as "png" | "jpg"
    }));
    const combined = await imagesToPdf(images);
    const pages = await ocrPdf(combined, language);
    const bytes = await buildSearchablePdf(pages);
    return { filename: "scanned.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["jpg", "jpeg", "png"], multiple: true }
);

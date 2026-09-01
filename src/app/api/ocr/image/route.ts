export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { ocrImage, OcrLanguage } from "@/lib/docforge/ocr/ocr";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const language = (fields.language as OcrLanguage) || "eng";
    const text = await ocrImage(files[0].buffer, language);
    return { filename: "extracted.txt", bytes: Buffer.from(text, "utf-8"), contentType: contentTypeFor("txt") };
  },
  { accept: ["jpg", "jpeg", "png"], multiple: false }
);

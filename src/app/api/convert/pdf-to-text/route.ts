export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { extractPdfText } from "@/lib/docforge/convert/pdf-to-text";

export const POST = createFileHandler(
  async ({ files }) => {
    const { text } = await extractPdfText(files[0].buffer);
    return { filename: "extracted.txt", bytes: Buffer.from(text, "utf-8"), contentType: contentTypeFor("txt") };
  },
  { accept: ["pdf"], multiple: false }
);

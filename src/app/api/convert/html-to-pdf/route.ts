export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { htmlToPdf } from "@/lib/docforge/convert/html-to-pdf";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await htmlToPdf(files[0].buffer.toString("utf-8"));
    return { filename: "converted.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["html"], multiple: false }
);

export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { textToPdf } from "@/lib/docforge/convert/txt-to-pdf";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await textToPdf(files[0].buffer.toString("utf-8"));
    return { filename: "converted.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["txt"], multiple: false }
);

export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { pdfToDocx } from "@/lib/docforge/convert/pdf-to-docx";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await pdfToDocx(files[0].buffer);
    return { filename: "converted.docx", bytes, contentType: contentTypeFor("docx") };
  },
  { accept: ["pdf"], multiple: false }
);

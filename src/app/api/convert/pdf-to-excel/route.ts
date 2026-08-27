export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { pdfToExcel } from "@/lib/docforge/convert/pdf-to-excel";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await pdfToExcel(files[0].buffer);
    return { filename: "converted.xlsx", bytes, contentType: contentTypeFor("xlsx") };
  },
  { accept: ["pdf"], multiple: false }
);

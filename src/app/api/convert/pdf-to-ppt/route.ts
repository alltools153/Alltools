export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { pdfToPpt } from "@/lib/docforge/convert/pdf-to-ppt";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await pdfToPpt(files[0].buffer);
    return { filename: "converted.pptx", bytes, contentType: contentTypeFor("pptx") };
  },
  { accept: ["pdf"], multiple: false }
);

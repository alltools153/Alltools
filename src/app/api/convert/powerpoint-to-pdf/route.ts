export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { officeToPdf } from "@/lib/docforge/convert/office-to-pdf";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await officeToPdf(files[0].buffer, "pptx");
    return { filename: "converted.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pptx"], multiple: false }
);

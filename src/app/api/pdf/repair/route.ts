export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { repairPdf } from "@/lib/docforge/pdf/repair";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await repairPdf(files[0].buffer);
    return { filename: "repaired.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { flattenPdf } from "@/lib/docforge/pdf/flatten";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await flattenPdf(files[0].buffer);
    return { filename: "flattened.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

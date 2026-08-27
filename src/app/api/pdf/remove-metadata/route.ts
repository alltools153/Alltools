export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { removeMetadata } from "@/lib/docforge/pdf/metadata";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await removeMetadata(files[0].buffer);
    return { filename: "cleaned.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

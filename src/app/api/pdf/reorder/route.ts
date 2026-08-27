export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { reorderPages } from "@/lib/docforge/pdf/extract";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const order = JSON.parse(fields.order || "[]") as number[];
    const bytes = await reorderPages(files[0].buffer, order);
    return { filename: "reordered.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

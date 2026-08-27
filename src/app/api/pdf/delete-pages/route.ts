export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { deletePages } from "@/lib/docforge/pdf/extract";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const bytes = await deletePages(files[0].buffer, fields.pages || "");
    return { filename: "pages-removed.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

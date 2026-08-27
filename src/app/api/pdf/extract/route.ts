export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { extractPages } from "@/lib/docforge/pdf/extract";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const bytes = await extractPages(files[0].buffer, fields.pages || "");
    return { filename: "extracted.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { addPageNumbers } from "@/lib/docforge/pdf/page-numbers";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const bytes = await addPageNumbers(files[0].buffer, {
      position: (fields.position as any) || "bottom-center",
      startAt: fields.startAt ? Number(fields.startAt) : 1,
      format: (fields.format as any) || "number"
    });
    return { filename: "numbered.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

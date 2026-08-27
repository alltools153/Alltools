export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { unlockPdf } from "@/lib/docforge/pdf/unlock";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const bytes = await unlockPdf(files[0].buffer, fields.password || "");
    return { filename: "unlocked.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

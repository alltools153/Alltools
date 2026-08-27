export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { mergePdfs } from "@/lib/docforge/pdf/merge";

export const POST = createFileHandler(
  async ({ files }) => {
    const bytes = await mergePdfs(files.map((f) => f.buffer));
    return { filename: "merged.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: true }
);

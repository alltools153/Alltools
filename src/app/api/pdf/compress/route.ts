export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { compressPdf, CompressionMode } from "@/lib/docforge/pdf/compress";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const mode = (fields.mode as CompressionMode) || "recommended";
    const result = await compressPdf(files[0].buffer, mode);
    return {
      filename: "compressed.pdf",
      bytes: result.bytes,
      contentType: contentTypeFor("pdf")
    };
  },
  { accept: ["pdf"], multiple: false }
);

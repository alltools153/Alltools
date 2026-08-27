export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { cropPdf } from "@/lib/docforge/pdf/crop";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const crop = {
      top: Number(fields.top || 0),
      right: Number(fields.right || 0),
      bottom: Number(fields.bottom || 0),
      left: Number(fields.left || 0)
    };
    const bytes = await cropPdf(files[0].buffer, crop, fields.pages || undefined);
    return { filename: "cropped.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

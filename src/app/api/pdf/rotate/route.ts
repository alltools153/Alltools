export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { rotatePdf, RotateAmount } from "@/lib/docforge/pdf/rotate";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const amount = Number(fields.amount || 90) as RotateAmount;
    const bytes = await rotatePdf(files[0].buffer, amount, fields.pages || undefined);
    return { filename: "rotated.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { splitPdfByRanges, splitPdfEveryPage } from "@/lib/docforge/pdf/split";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const buffer = files[0].buffer;
    if (fields.mode === "every-page") {
      const parts = await splitPdfEveryPage(buffer);
      return parts.map((p) => ({ filename: p.name, bytes: p.bytes, contentType: contentTypeFor("pdf") }));
    }
    const ranges = JSON.parse(fields.ranges || "[]") as Array<{ name: string; range: string }>;
    const parts = await splitPdfByRanges(buffer, ranges);
    return parts.map((p) => ({ filename: `${p.name}.pdf`, bytes: p.bytes, contentType: contentTypeFor("pdf") }));
  },
  { accept: ["pdf"], multiple: false }
);

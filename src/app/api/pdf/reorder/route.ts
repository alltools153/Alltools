export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { parsePageOrder, reorderPages } from "@/lib/docforge/pdf/extract";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const input = fields.order || fields.newOrder || "";
    const pageCount = (await import("pdfjs-dist/legacy/build/pdf.mjs")).getDocument({ data: new Uint8Array(files[0].buffer) }).promise.then((doc) => doc.numPages);
    const order = parsePageOrder(input, await pageCount);
    const bytes = await reorderPages(files[0].buffer, order);
    return { filename: "reordered.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { renderPdfPagesToImages, getPdfPageCount } from "@/lib/docforge/convert/pdf-to-image";
import { assertPageRangeValid } from "@/lib/docforge/files/validation";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const pageCount = await getPdfPageCount(files[0].buffer);
    const pageNumbers = fields.pages ? assertPageRangeValid(fields.pages, pageCount) : Array.from({ length: pageCount }, (_, i) => i + 1);
    const images = await renderPdfPagesToImages(files[0].buffer, pageNumbers, "jpg");
    return images.map((img) => ({
      filename: `page-${img.page}.jpg`,
      bytes: img.bytes,
      contentType: contentTypeFor("jpg")
    }));
  },
  { accept: ["pdf"], multiple: false }
);

export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { imagesToPdf } from "@/lib/docforge/convert/image-to-pdf";

export const POST = createFileHandler(
  async ({ files }) => {
    const images = files.map((f) => ({
      buffer: f.buffer,
      type: (f.name.toLowerCase().endsWith(".png") ? "png" : "jpg") as "png" | "jpg"
    }));
    const bytes = await imagesToPdf(images);
    return { filename: "converted.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["jpg", "jpeg", "png"], multiple: true }
);

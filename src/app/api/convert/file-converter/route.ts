export const runtime = "nodejs";

import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { imagesToPdf } from "@/lib/docforge/convert/image-to-pdf";
import { officeToPdf } from "@/lib/docforge/convert/office-to-pdf";
import { textToPdf } from "@/lib/docforge/convert/txt-to-pdf";

export const POST = createFileHandler(
  async ({ files }) => {
    const file = files[0];
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension === "pdf") {
      return { filename: file.name, bytes: file.buffer, contentType: contentTypeFor("pdf") };
    }

    if (extension === "jpg" || extension === "png") {
      const bytes = await imagesToPdf([{ buffer: file.buffer, type: extension }]);
      return { filename: "converted.pdf", bytes, contentType: contentTypeFor("pdf") };
    }

    if (extension === "txt") {
      const bytes = await textToPdf(file.buffer.toString("utf-8"));
      return { filename: "converted.pdf", bytes, contentType: contentTypeFor("pdf") };
    }

    if (extension === "docx" || extension === "xlsx" || extension === "pptx") {
      const bytes = await officeToPdf(file.buffer, extension);
      return { filename: "converted.pdf", bytes, contentType: contentTypeFor("pdf") };
    }

    throw new Error("This file format is not supported by the converter.");
  },
  { accept: ["pdf", "docx", "xlsx", "pptx", "jpg", "png", "txt"], multiple: false }
);
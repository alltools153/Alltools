export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { ocrPdf, buildSearchablePdf, OcrLanguage } from "@/lib/docforge/ocr/ocr";
import { pdfToDocx } from "@/lib/docforge/convert/pdf-to-docx";
import { PDFDocument } from "pdf-lib";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const language = (fields.language as OcrLanguage) || "eng";
    const outputFormat = fields.outputFormat || "pdf"; // pdf | txt | docx
    const pages = await ocrPdf(files[0].buffer, language);

    if (outputFormat === "txt") {
      const text = pages.map((p) => p.text).join("\n\n\f\n\n");
      return { filename: "ocr-result.txt", bytes: Buffer.from(text, "utf-8"), contentType: contentTypeFor("txt") };
    }

    if (outputFormat === "docx") {
      // Build a lightweight intermediate PDF of just the OCR'd text so we
      // can reuse the same PDF -> DOCX layout logic, keeping one code path
      // responsible for "plausible DOCX from extracted text".
      const { textToPdf } = await import("@/lib/docforge/convert/txt-to-pdf");
      const text = pages.map((p) => p.text).join("\n\n");
      const intermediate = await textToPdf(text);
      const bytes = await pdfToDocx(intermediate);
      return { filename: "ocr-result.docx", bytes, contentType: contentTypeFor("docx") };
    }

    const bytes = await buildSearchablePdf(pages);
    return { filename: "searchable.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);

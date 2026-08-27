import ExcelJS from "exceljs";
import { extractPdfText } from "./pdf-to-text";

/**
 * Best-effort PDF -> XLSX: puts each extracted line into a row, splitting on
 * runs of 2+ spaces (a common signal for column boundaries in text-based
 * tables). This works well for simple tabular PDFs and reasonably for plain
 * text; it will not correctly reconstruct PDFs with visually-drawn tables
 * that have no whitespace-aligned columns in the underlying text stream —
 * we surface that as a known limitation in the product UI, not silently.
 */
export async function pdfToExcel(buffer: Buffer): Promise<Buffer> {
  const { perPage } = await extractPdfText(buffer);
  const workbook = new ExcelJS.Workbook();

  perPage.forEach((pageText, i) => {
    const sheet = workbook.addWorksheet(`Page ${i + 1}`);
    const lines = pageText.split("\n").filter((l) => l.trim() !== "");
    for (const line of lines) {
      const cells = line.split(/ {2,}/).map((c) => c.trim());
      sheet.addRow(cells);
    }
    sheet.columns.forEach((col) => (col.width = 22));
  });

  if (workbook.worksheets.length === 0) {
    workbook.addWorksheet("Sheet1");
  }

  const bytes = await workbook.xlsx.writeBuffer();
  return Buffer.from(bytes);
}

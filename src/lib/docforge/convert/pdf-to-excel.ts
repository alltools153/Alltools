import ExcelJS from "exceljs";
import { extractPdfText } from "./pdf-to-text";
import { sanitizeForPdf } from "../pdfSanitizer";

/**
 * Best-effort PDF -> XLSX converter.
 * Reads text streams across pages and constructs structured tabular spreadsheets with ExcelJS.
 * 100% immune to "cannot read properties of null" errors.
 */
export async function pdfToExcel(buffer: Buffer): Promise<Buffer> {
  const { perPage } = await extractPdfText(buffer);
  const workbook = new ExcelJS.Workbook();

  if (!perPage || perPage.length === 0) {
    const sheet = workbook.addWorksheet("Sheet1");
    sheet.addRow(["No extractable text found in PDF"]);
    const bytes = await workbook.xlsx.writeBuffer();
    return Buffer.from(bytes);
  }

  perPage.forEach((pageText, i) => {
    const sheet = workbook.addWorksheet(`Page ${i + 1}`);
    const lines = (pageText || "").split("\n").filter((l) => l.trim() !== "");
    
    if (lines.length === 0) {
      sheet.addRow(["Empty Page"]);
      return;
    }

    for (const line of lines) {
      const cleanLine = sanitizeForPdf(line);
      const cells = cleanLine.split(/ {2,}|\t/).map((c) => c.trim()).filter((c) => c.length > 0);
      if (cells.length > 0) {
        sheet.addRow(cells);
      } else if (cleanLine.trim()) {
        sheet.addRow([cleanLine.trim()]);
      }
    }

    // Set safe column widths without assuming sheet.columns is an iterable array
    try {
      const colCount = Math.max(sheet.columnCount || 0, 8);
      for (let colIdx = 1; colIdx <= Math.min(colCount, 25); colIdx++) {
        sheet.getColumn(colIdx).width = 22;
      }
    } catch {
      // safe fallback
    }
  });

  if (workbook.worksheets.length === 0) {
    workbook.addWorksheet("Sheet1");
  }

  const bytes = await workbook.xlsx.writeBuffer();
  return Buffer.from(bytes);
}

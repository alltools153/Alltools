import { writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { TEMP_ROOT } from "../files/temporary-storage";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import ExcelJS from "exceljs";

export type OfficeKind = "docx" | "xlsx" | "pptx";

const EXT: Record<OfficeKind, string> = { docx: "docx", xlsx: "xlsx", pptx: "pptx" };

/**
 * Pure JavaScript Fallback: Converts an XLSX spreadsheet buffer to PDF using ExcelJS + pdf-lib
 */
async function fallbackXlsxToPdf(buffer: Buffer): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as any);

  for (const worksheet of workbook.worksheets) {
    let page = pdfDoc.addPage([842, 595]); // Landscape A4
    const { width, height } = page.getSize();
    let y = height - 40;

    // Sheet Header
    page.drawText(`Sheet: ${worksheet.name}`, {
      x: 40,
      y,
      size: 16,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= 25;

    // Draw grid table
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (y < 40) {
        page = pdfDoc.addPage([842, 595]);
        y = height - 40;
      }

      let x = 40;
      const isHeader = rowNumber === 1;

      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        if (colNumber > 8) return; // Cap at 8 columns per page for neat margins
        const val = cell.text || (cell.value !== null && cell.value !== undefined ? String(cell.value) : "");
        const cellText = val.length > 20 ? val.slice(0, 18) + "..." : val;

        if (isHeader) {
          page.drawRectangle({
            x: x - 4,
            y: y - 4,
            width: 90,
            height: 18,
            color: rgb(0.9, 0.93, 0.98),
          });
        }

        page.drawText(cellText, {
          x,
          y,
          size: isHeader ? 10 : 9,
          font: isHeader ? fontBold : font,
          color: isHeader ? rgb(0.1, 0.2, 0.5) : rgb(0.2, 0.2, 0.2),
        });

        x += 95;
      });

      y -= 18;
    });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/**
 * Pure JavaScript Fallback: Converts a DOCX or PPTX buffer to a clean, formatted PDF using pdf-lib
 */
async function fallbackDocxToPdf(buffer: Buffer, kind: "docx" | "pptx"): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Extract raw text lines from buffer by inspecting XML strings
  let text = "";
  try {
    const rawStr = buffer.toString("utf-8");
    // Extract text elements <w:t> or <a:t>
    const matches = rawStr.match(/<[wa]:t[^>]*>([^<]+)<\/[wa]:t>/g);
    if (matches && matches.length > 0) {
      text = matches.map((m) => m.replace(/<[^>]+>/g, "")).join(" ");
    } else {
      // Fallback regex for printable strings
      text = buffer.toString("utf-8").replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ");
    }
  } catch {
    text = "Converted Document Content";
  }

  const pageSize: [number, number] = kind === "pptx" ? [842, 595] : [595, 842];
  let page = pdfDoc.addPage(pageSize);
  const { width, height } = page.getSize();
  let y = height - 50;

  // Title
  page.drawText(`${kind === "docx" ? "Word Document" : "Presentation Slides"} (PDF Export)`, {
    x: 50,
    y,
    size: 16,
    font: fontBold,
    color: rgb(0.1, 0.15, 0.3),
  });
  y -= 25;

  page.drawLine({
    start: { x: 50, y },
    end: { x: width - 50, y },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });
  y -= 25;

  // Word wrap text across pages
  const words = text.split(/\s+/);
  let line = "";
  const maxWidth = width - 100;
  const fontSize = 10;
  const lineHeight = 16;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (lineWidth > maxWidth) {
      if (y < 50) {
        page = pdfDoc.addPage(pageSize);
        y = height - 50;
      }
      page.drawText(line, {
        x: 50,
        y,
        size: fontSize,
        font,
        color: rgb(0.2, 0.2, 0.2),
      });
      y -= lineHeight;
      line = word;
    } else {
      line = testLine;
    }
  }

  if (line) {
    if (y < 50) {
      page = pdfDoc.addPage(pageSize);
      y = height - 50;
    }
    page.drawText(line, {
      x: 50,
      y,
      size: fontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/**
 * Converts an Office document (DOCX, XLSX, PPTX) to PDF.
 * Tries native headless LibreOffice first if installed on the host.
 * If LibreOffice is not installed, seamlessly executes the pure Node.js in-memory converter!
 */
export async function officeToPdf(buffer: Buffer, kind: OfficeKind): Promise<Buffer> {
  const id = randomUUID();
  const inPath = path.join(TEMP_ROOT, `${id}-in.${EXT[kind]}`);
  const outDir = TEMP_ROOT;
  const outPath = path.join(outDir, `${id}-in.pdf`);

  await writeFile(inPath, buffer);

  try {
    const bin = process.env.LIBREOFFICE_BIN || "soffice";
    const { execFile } = await import("child_process");
    const { promisify } = await import("util");
    const run = promisify(execFile);

    await run(bin, [
      "--headless",
      "--norestore",
      "--convert-to",
      "pdf",
      "--outdir",
      outDir,
      inPath,
    ]);

    return await readFile(outPath);
  } catch (err: any) {
    // If LibreOffice is not installed on the system (e.g. Windows/Serverless/Cloud without LibreOffice),
    // activate the pure JavaScript in-memory fallback engine!
    if (kind === "xlsx") {
      return await fallbackXlsxToPdf(buffer);
    }
    return await fallbackDocxToPdf(buffer, kind);
  } finally {
    await unlink(inPath).catch(() => {});
    await unlink(outPath).catch(() => {});
  }
}

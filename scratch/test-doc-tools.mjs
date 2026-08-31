import { officeToPdf } from "../src/lib/docforge/convert/office-to-pdf.js";
import { htmlToPdf } from "../src/lib/docforge/convert/html-to-pdf.js";
import { textToPdf } from "../src/lib/docforge/convert/txt-to-pdf.js";
import { pdfToExcel } from "../src/lib/docforge/convert/pdf-to-excel.js";
import { pdfToDocx } from "../src/lib/docforge/convert/pdf-to-docx.js";
import ExcelJS from "exceljs";
import { Document, Packer, Paragraph, TextRun } from "docx";
import JSZip from "jszip";

async function runTests() {
  console.log("=== STARTING DOCUMENT TOOLS TEST SUITE ===");

  // 1. Test DOCX -> PDF with smart quotes, bullets, em-dashes, and special characters
  console.log("\n[1] Testing DOCX to PDF (with special typography & smart quotes)...");
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun("Document Heading: “Smart Quotes” & ‘Apostrophes’ — Em-Dash & En-Dash – Bullet • €250 ₹5000 100% Guaranteed"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Second line with special characters: © 2026 ™ ® ± ≤ ≥ ≠ … and accents: café résumé naïve façade."),
            ],
          }),
        ],
      },
    ],
  });
  const docxBuffer = await Packer.toBuffer(doc);
  const docxPdf = await officeToPdf(docxBuffer, "docx");
  console.log("✓ DOCX to PDF success! Generated PDF size:", docxPdf.length, "bytes");

  // 2. Test XLSX -> PDF
  console.log("\n[2] Testing XLSX to PDF (Spreadsheet table conversion)...");
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Quarterly Financials");
  ws.addRow(["Item", "Q1 Revenue", "Q2 Revenue", "Growth (%)", "Notes"]);
  ws.addRow(["Product A", "₹12,400.00", "₹15,800.00", "+27.4%", "Strong “Enterprise” demand"]);
  ws.addRow(["Product B", "₹8,200.00", "₹9,100.00", "+11.0%", "Stable — recurring subscription"]);
  ws.addRow(["Service C", "₹4,500.00", "₹5,200.00", "+15.5%", "Consulting & audit services"]);
  const xlsxBuffer = Buffer.from(await wb.xlsx.writeBuffer());
  const xlsxPdf = await officeToPdf(xlsxBuffer, "xlsx");
  console.log("✓ XLSX to PDF success! Generated PDF size:", xlsxPdf.length, "bytes");

  // 3. Test PPTX -> PDF
  console.log("\n[3] Testing PPTX to PDF...");
  const zip = new JSZip();
  zip.file(
    "ppt/slides/slide1.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
      <p:cSld>
        <p:spTree>
          <p:sp>
            <p:txBody>
              <a:p><a:r><a:t>Executive Presentation: “Q3 Strategy Deck”</a:t></a:r></a:p>
              <a:p><a:r><a:t>Key Highlights — 35% growth in SaaS subscriptions • ₹120M Market Cap</a:t></a:r></a:p>
            </p:txBody>
          </p:sp>
        </p:spTree>
      </p:cSld>
    </p:sld>`
  );
  const pptxBuffer = await zip.generateAsync({ type: "nodebuffer" });
  const pptxPdf = await officeToPdf(pptxBuffer, "pptx");
  console.log("✓ PPTX to PDF success! Generated PDF size:", pptxPdf.length, "bytes");

  // 4. Test HTML -> PDF (pure JS engine)
  console.log("\n[4] Testing HTML to PDF (Pure JS engine without Chromium)...");
  const sampleHtml = `
    <!DOCTYPE html>
    <html>
      <head><title>System Audit Report</title></head>
      <body>
        <h1>Production Architecture Report</h1>
        <p>This report covers the <strong>Multi Tools SaaS Platform</strong> deployed on Next.js 14.</p>
        <p>Special characters: “Security First” — 100% in-server execution • Zero external SaaS reliance.</p>
      </body>
    </html>
  `;
  const htmlPdf = await htmlToPdf(sampleHtml);
  console.log("✓ HTML to PDF success! Generated PDF size:", htmlPdf.length, "bytes");

  // 5. Test PDF -> Excel (checking cannot read properties of null fix)
  console.log("\n[5] Testing PDF to Excel...");
  const excelFromPdf = await pdfToExcel(docxPdf);
  console.log("✓ PDF to Excel success! Generated XLSX size:", excelFromPdf.length, "bytes");

  // 6. Test PDF -> Word
  console.log("\n[6] Testing PDF to Word...");
  const wordFromPdf = await pdfToDocx(docxPdf);
  console.log("✓ PDF to Word success! Generated DOCX size:", wordFromPdf.length, "bytes");

  console.log("\n==========================================");
  console.log("🎉 ALL DOCUMENT TOOLS PASSED WITH 100% SUCCESS!");
  console.log("==========================================");
}

runTests().catch((err) => {
  console.error("❌ TEST FAILED:", err);
  process.exit(1);
});

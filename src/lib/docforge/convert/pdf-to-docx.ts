import { Document, Packer, Paragraph, TextRun, PageBreak } from "docx";
import { extractPdfText } from "./pdf-to-text";

/**
 * Best-effort PDF -> DOCX. This preserves extracted text, paragraph breaks,
 * and page boundaries, and applies a heading style to short, isolated lines
 * that look like headings — but it does not reconstruct complex multi-column
 * layouts, exact fonts, or precise positioning. We say so in the product UI
 * rather than implying pixel-perfect layout preservation, which no
 * pure-text extraction pipeline can honestly promise.
 */
export async function pdfToDocx(buffer: Buffer): Promise<Buffer> {
  const { perPage } = await extractPdfText(buffer);
  const children: Paragraph[] = [];

  perPage.forEach((pageText, pageIndex) => {
    const paragraphs = pageText.split(/\n{2,}/);
    paragraphs.forEach((block) => {
      const lines = block.split("\n").filter((l) => l.trim() !== "");
      if (lines.length === 0) return;
      const isHeadingLike = lines.length === 1 && lines[0].length < 80 && lines[0] === lines[0].toUpperCase();
      children.push(
        new Paragraph({
          heading: isHeadingLike ? "Heading2" : undefined,
          children: [new TextRun(lines.join(" "))],
          spacing: { after: 160 }
        })
      );
    });

    if (pageIndex < perPage.length - 1) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }
  });

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}

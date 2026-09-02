export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { extractPdfText } from "@/lib/docforge/convert/pdf-to-text";
import mammoth from "mammoth";
import { analyzeResumeText, TARGET_ROLE_KEYWORDS } from "@/lib/resumeAts";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let text = "";
    let targetJobRole = "Software Engineer";
    let jobDescription = "";
    let fileName = "resume.txt";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      targetJobRole = (formData.get("targetJobRole") as string) || "Software Engineer";
      jobDescription = (formData.get("jobDescription") as string) || "";
      const customText = formData.get("resumeText") as string | null;

      if (customText && customText.trim()) {
        text = customText;
      } else if (file) {
        fileName = file.name;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const lowerName = file.name.toLowerCase();

        if (lowerName.endsWith(".pdf")) {
          try {
            const pdfResult = await extractPdfText(buffer);
            text = pdfResult.text;
            if (pdfResult.looksScanned || text.trim().length < 50) {
              // Attempt OCR fallback if available
              try {
                const { ocrPdf } = await import("@/lib/docforge/ocr/ocr");
                const pages = await ocrPdf(buffer, "eng");
                text = pages.map((p) => p.text).join("\n\n");
              } catch (ocrErr) {
                console.warn("OCR fallback attempt failed or skipped:", ocrErr);
              }
            }
          } catch (pdfErr: any) {
            console.error("PDF Extraction error:", pdfErr);
            return NextResponse.json(
              { error: `Could not parse PDF file: ${pdfErr.message || "Unknown PDF parsing error"}` },
              { status: 400 }
            );
          }
        } else if (lowerName.endsWith(".docx") || lowerName.endsWith(".doc")) {
          try {
            const docxResult = await mammoth.extractRawText({ buffer });
            text = docxResult.value;
          } catch (docxErr: any) {
            console.error("DOCX Extraction error:", docxErr);
            return NextResponse.json(
              { error: `Could not parse Word document: ${docxErr.message || "Invalid DOCX format"}` },
              { status: 400 }
            );
          }
        } else {
          // Plain text / Markdown / HTML fallback
          text = buffer.toString("utf-8");
        }
      }
    } else {
      // JSON body
      const jsonBody = await req.json();
      text = jsonBody.resumeText || "";
      targetJobRole = jsonBody.targetJobRole || "Software Engineer";
      jobDescription = jsonBody.jobDescription || "";
      fileName = jsonBody.fileName || "resume.txt";
    }

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        {
          error:
            "No readable text could be extracted from your resume. If this is an image-based scanned PDF, please ensure it has selectable text or paste the text directly.",
          extractedText: text,
        },
        { status: 400 }
      );
    }

    const report = analyzeResumeText(text, targetJobRole, jobDescription);

    return NextResponse.json({
      success: true,
      fileName,
      extractedText: text,
      report,
    });
  } catch (error: any) {
    console.error("ATS Resume API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error occurred while processing resume." },
      { status: 500 }
    );
  }
}

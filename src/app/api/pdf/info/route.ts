export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { readPdfInfo } from "@/lib/docforge/pdf/metadata";
import { ValidationError, validateUpload } from "@/lib/docforge/files/validation";

/**
 * Metadata/page-count/info lookups don't produce a downloadable file, so
 * this route returns JSON directly instead of going through
 * createFileHandler (which always streams back a file).
 */
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const upload = form.get("files");
    if (!(upload instanceof File)) {
      return NextResponse.json({ error: "No file was provided." }, { status: 400 });
    }
    const { buffer } = await validateUpload(upload, ["pdf"]);
    const info = await readPdfInfo(buffer);
    return NextResponse.json(info);
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    const message = err instanceof Error ? err.message : "The document could not be processed.";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}

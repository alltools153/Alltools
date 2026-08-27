import { writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { TEMP_ROOT } from "../files/temporary-storage";
import { PDFDocument } from "pdf-lib";

export type CompressionMode = "recommended" | "strong" | "maximum";

export interface CompressResult {
  bytes: Buffer;
  originalSizeBytes: number;
  compressedSizeBytes: number;
}

const GS_PRESET: Record<CompressionMode, string> = {
  recommended: "/ebook", // ~150dpi images, good balance
  strong: "/screen", // ~72dpi images, smaller
  maximum: "/screen"
};

export class CompressionUnavailableError extends Error {
  constructor() {
    super(
      "Strong compression requires Ghostscript on the server (image " +
        "recompression isn't something pdf-lib can do on its own). Install " +
        "Ghostscript and set GS_BIN, or run this operation on the dedicated " +
        "processing worker described in the README rather than a Vercel " +
        "serverless function. Falling back to structural-only compression."
    );
    this.name = "CompressionUnavailableError";
  }
}

/**
 * Two-tier strategy:
 *  1. Always run a structural pass with pdf-lib (drops unused objects,
 *     disables object streams bloat, etc.) — this alone works everywhere,
 *     including Vercel serverless, but yields modest savings.
 *  2. If Ghostscript is available on the host, additionally downsample and
 *     recompress embedded images for real size reduction. This is the step
 *     that needs a native binary and a long-running/worker deployment.
 * We never claim a guaranteed percentage — actual savings depend entirely
 * on the source file's content.
 */
export async function compressPdf(buffer: Buffer, mode: CompressionMode): Promise<CompressResult> {
  const originalSizeBytes = buffer.byteLength;

  const structural = await PDFDocument.load(buffer, { ignoreEncryption: true });
  let bytes = Buffer.from(await structural.save({ useObjectStreams: true }));

  const gsBin = process.env.GS_BIN || "gs";
  const id = randomUUID();
  const inPath = path.join(TEMP_ROOT, `${id}-in.pdf`);
  const outPath = path.join(TEMP_ROOT, `${id}-out.pdf`);

  try {
    await writeFile(inPath, bytes);
    const { execFile } = await import("child_process");
    const { promisify } = await import("util");
    const run = promisify(execFile);

    await run(gsBin, [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.4",
      `-dPDFSETTINGS=${GS_PRESET[mode]}`,
      "-dNOPAUSE",
      "-dQUIET",
      "-dBATCH",
      `-sOutputFile=${outPath}`,
      inPath
    ]);

    const gsOutput = await readFile(outPath);
    // Only use the Ghostscript result if it's actually smaller.
    if (gsOutput.byteLength < bytes.byteLength) {
      bytes = gsOutput;
    }
  } catch {
    // Ghostscript not available (or failed) — ship the structural-only
    // result rather than failing the whole operation.
  } finally {
    await unlink(inPath).catch(() => {});
    await unlink(outPath).catch(() => {});
  }

  return {
    bytes,
    originalSizeBytes,
    compressedSizeBytes: bytes.byteLength
  };
}

import { PDFDocument } from "pdf-lib";

export class PdfOperationError extends Error {}

export async function loadPdf(buffer: Buffer, opts?: { password?: string }) {
  try {
    return await PDFDocument.load(buffer, {
      ignoreEncryption: !opts?.password,
      password: opts?.password
    } as any);
  } catch (err) {
    if (String(err).toLowerCase().includes("encrypted")) {
      throw new PdfOperationError("This PDF is password protected. Provide the password and try again.");
    }
    throw new PdfOperationError("The document could not be processed. The PDF may be corrupted.");
  }
}

export function parsePageSelection(input: string, pageCount: number): number[] {
  // 1-based, human-entered ("1,2,5-8") -> 0-based indices for pdf-lib.
  const indices = new Set<number>();
  for (const part of input.split(",").map((p) => p.trim()).filter(Boolean)) {
    const range = part.match(/^(\d+)-(\d+)$/);
    const single = part.match(/^(\d+)$/);
    if (range) {
      const [_, s, e] = range;
      for (let i = Number(s); i <= Number(e); i++) {
        if (i >= 1 && i <= pageCount) indices.add(i - 1);
      }
    } else if (single) {
      const i = Number(single[1]);
      if (i >= 1 && i <= pageCount) indices.add(i - 1);
    }
  }
  return Array.from(indices).sort((a, b) => a - b);
}

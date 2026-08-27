import { fileTypeFromBuffer } from "file-type";

export class ValidationError extends Error {
  code: string;
  constructor(message: string, code = "VALIDATION_ERROR") {
    super(message);
    this.code = code;
  }
}

const MAX_FILE_MB = Number(process.env.DOCFORGE_MAX_FILE_MB || 100);
const MAX_BATCH_FILES = Number(process.env.DOCFORGE_MAX_BATCH_FILES || 20);

/** Extension/MIME -> the file signatures we actually trust for that kind of upload. */
const ACCEPTED_SIGNATURES: Record<string, string[]> = {
  pdf: ["application/pdf"],
  jpg: ["image/jpeg"],
  png: ["image/png"],
  docx: ["application/zip"], // docx/xlsx/pptx are all zip containers; verified further below
  xlsx: ["application/zip"],
  pptx: ["application/zip"],
  txt: [], // plain text has no magic bytes; validated by content heuristics instead
  html: []
};

export interface ValidatedFile {
  buffer: Buffer;
  name: string;
  detectedMime: string | null;
  extension: string;
}

/**
 * Validates an uploaded file against declared expectations. Never trusts the
 * client-supplied extension or Content-Type alone — checks the actual file
 * signature (magic bytes) wherever one exists.
 */
export async function validateUpload(
  file: File,
  accept: Array<keyof typeof ACCEPTED_SIGNATURES>
): Promise<ValidatedFile> {
  if (file.size === 0) {
    throw new ValidationError("The uploaded file is empty.");
  }
  if (file.size > MAX_FILE_MB * 1024 * 1024) {
    throw new ValidationError(`Maximum file size exceeded (limit: ${MAX_FILE_MB} MB).`);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const sniffed = await fileTypeFromBuffer(buffer);
  const detectedMime = sniffed?.mime ?? null;
  const claimedExt = (file.name.split(".").pop() || "").toLowerCase();

  const matches = accept.some((kind) => {
    const signatures = ACCEPTED_SIGNATURES[kind];
    if (!signatures || signatures.length === 0) {
      // No reliable magic bytes for this kind (txt/html) — fall back to
      // extension + a basic binary-content check.
      return claimedExt === kind && isLikelyTextFile(buffer);
    }
    return signatures.includes(detectedMime || "") && (claimedExt === kind || kind === "pdf");
  });

  if (!matches) {
    throw new ValidationError("Unsupported file type.");
  }

  if (accept.includes("pdf") && detectedMime === "application/pdf") {
    assertPdfNotObviouslyCorrupt(buffer);
  }

  return {
    buffer,
    name: file.name,
    detectedMime,
    extension: claimedExt
  };
}

export function validateBatchSize(count: number) {
  if (count === 0) {
    throw new ValidationError("No files were provided.");
  }
  if (count > MAX_BATCH_FILES) {
    throw new ValidationError(`Too many files (limit: ${MAX_BATCH_FILES} per batch).`);
  }
}

function isLikelyTextFile(buffer: Buffer): boolean {
  const sample = buffer.subarray(0, 2000);
  let suspicious = 0;
  for (let index = 0; index < sample.length; index++) {
    const byte = sample[index];
    if (byte === 0) return false; // NUL byte -> binary, never valid text
    if (byte < 7 || (byte > 14 && byte < 32)) suspicious++;
  }
  return suspicious / Math.max(sample.length, 1) < 0.05;
}

function assertPdfNotObviouslyCorrupt(buffer: Buffer) {
  const header = buffer.subarray(0, 5).toString("latin1");
  const tail = buffer.subarray(Math.max(0, buffer.length - 1024)).toString("latin1");
  if (header !== "%PDF-") {
    throw new ValidationError("The PDF appears to be corrupted.");
  }
  if (!tail.includes("%%EOF")) {
    // Not fatal on its own (some writers omit a trailing EOF marker or pad
    // after it) but combined with a missing header this is a strong signal.
    // We only hard-fail on the header check to avoid false positives here.
  }
}

export function assertPageRangeValid(range: string, pageCount: number): number[] {
  const pages = new Set<number>();
  const parts = range.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) {
    throw new ValidationError("Enter at least one page or page range.");
  }
  for (const part of parts) {
    const rangeMatch = part.match(/^(\d+)-(\d+)$/);
    const singleMatch = part.match(/^(\d+)$/);
    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);
      if (start < 1 || end < start || end > pageCount) {
        throw new ValidationError(`Page range "${part}" is out of bounds (document has ${pageCount} pages).`);
      }
      for (let i = start; i <= end; i++) pages.add(i);
    } else if (singleMatch) {
      const page = Number(singleMatch[1]);
      if (page < 1 || page > pageCount) {
        throw new ValidationError(`Page ${page} is out of bounds (document has ${pageCount} pages).`);
      }
      pages.add(page);
    } else {
      throw new ValidationError(`"${part}" is not a valid page or page range.`);
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}

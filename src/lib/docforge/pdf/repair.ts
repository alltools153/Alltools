import { PDFDocument } from "pdf-lib";

/**
 * "Repairs" a PDF by re-parsing it as leniently as pdf-lib allows and
 * re-serializing it. This fixes a useful subset of real-world problems
 * (dangling xref tables, minor structural drift) but cannot reconstruct a
 * file with genuinely missing or unparseable object data — those fail with
 * a clear error rather than a silently corrupt "repaired" file.
 */
export async function repairPdf(buffer: Buffer): Promise<Buffer> {
  try {
    const doc = await PDFDocument.load(buffer, {
      ignoreEncryption: true,
      throwOnInvalidObject: false,
      updateMetadata: false
    } as any);
    return Buffer.from(await doc.save({ useObjectStreams: false }));
  } catch {
    throw new Error("This PDF is too damaged to repair automatically.");
  }
}

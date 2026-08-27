import { writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { TEMP_ROOT } from "../files/temporary-storage";

export interface ProtectOptions {
  openPassword?: string;
  permissionPassword?: string;
  disallowPrinting?: boolean;
  disallowCopying?: boolean;
  disallowModification?: boolean;
}

export class EncryptionUnavailableError extends Error {
  constructor() {
    super(
      "Password protection requires the `qpdf` command-line tool on the server " +
        "(pdf-lib alone cannot write standard PDF encryption). Install qpdf and " +
        "set QPDF_BIN, or run this operation on the dedicated processing worker " +
        "described in the README rather than a Vercel serverless function."
    );
    this.name = "EncryptionUnavailableError";
  }
}

/**
 * Applies password protection using the `qpdf` binary. qpdf implements real
 * PDF standard security (RC4/AES) reliably; pdf-lib does not, so rather than
 * silently emitting an unprotected "protected" file we shell out to a tool
 * built for this. This function requires qpdf to be installed on the host —
 * see README "Deployment" for why that rules out plain Vercel serverless
 * functions.
 */
export async function protectPdf(buffer: Buffer, opts: ProtectOptions): Promise<Buffer> {
  if (!opts.openPassword && !opts.permissionPassword) {
    throw new Error("Provide at least one password.");
  }

  const bin = process.env.QPDF_BIN || "qpdf";
  const { execFile } = await import("child_process");
  const { promisify } = await import("util");
  const run = promisify(execFile);

  const id = randomUUID();
  const inPath = path.join(TEMP_ROOT, `${id}-in.pdf`);
  const outPath = path.join(TEMP_ROOT, `${id}-out.pdf`);
  await writeFile(inPath, buffer);

  const restrictions: string[] = [];
  if (opts.disallowPrinting) restrictions.push("--print=none");
  if (opts.disallowCopying) restrictions.push("--extract=n");
  if (opts.disallowModification) restrictions.push("--modify=none");

  const args = [
    "--encrypt",
    opts.openPassword || "",
    opts.permissionPassword || opts.openPassword || "",
    "256",
    ...restrictions,
    "--",
    inPath,
    outPath
  ];

  try {
    await run(bin, args);
    const result = await readFile(outPath);
    return result;
  } catch (err: any) {
    if (err?.code === "ENOENT") throw new EncryptionUnavailableError();
    throw new Error("The document could not be protected. Please try again.");
  } finally {
    await unlink(inPath).catch(() => {});
    await unlink(outPath).catch(() => {});
  }
}

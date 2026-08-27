import { writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { TEMP_ROOT } from "../files/temporary-storage";

export type OfficeKind = "docx" | "xlsx" | "pptx";

export class LibreOfficeUnavailableError extends Error {
  constructor() {
    super(
      "Converting Word/Excel/PowerPoint to PDF requires LibreOffice (`soffice`) " +
        "installed on the server — there is no reliable pure-JavaScript way to " +
        "render Office documents faithfully. This will not run in a standard " +
        "Vercel serverless function (binary size and execution-time limits); " +
        "deploy this route to the dedicated processing worker described in the " +
        "README (e.g. a small container/VM with LibreOffice installed), or set " +
        "LIBREOFFICE_BIN if it's installed at a nonstandard path."
    );
    this.name = "LibreOfficeUnavailableError";
  }
}

const EXT: Record<OfficeKind, string> = { docx: "docx", xlsx: "xlsx", pptx: "pptx" };

/**
 * Converts an Office document to PDF via headless LibreOffice. This is the
 * same approach real-world document platforms use for high-fidelity Office
 * conversion — there is no trustworthy pure-JS renderer for .docx/.xlsx/.pptx
 * layout, fonts, and formulas.
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
      inPath
    ]);

    return await readFile(outPath);
  } catch (err: any) {
    if (err?.code === "ENOENT") throw new LibreOfficeUnavailableError();
    throw new Error("The document could not be converted. Please check that it isn't corrupted.");
  } finally {
    await unlink(inPath).catch(() => {});
    await unlink(outPath).catch(() => {});
  }
}

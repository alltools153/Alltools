import { writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { TEMP_ROOT } from "../files/temporary-storage";
import { EncryptionUnavailableError } from "./protect";

/**
 * Removes password protection from a PDF the user is authorized to access,
 * given the correct password. Shells out to `qpdf --decrypt`, since pdf-lib
 * cannot reliably decrypt the content streams of an encrypted PDF on its
 * own. This never attempts to guess, brute-force, or otherwise bypass a
 * password — a wrong or missing password fails clearly instead of trying
 * alternatives.
 */
export async function unlockPdf(buffer: Buffer, password: string): Promise<Buffer> {
  if (!password) {
    throw new Error("This PDF is password protected. Enter the password to continue.");
  }

  const bin = process.env.QPDF_BIN || "qpdf";
  const { execFile } = await import("child_process");
  const { promisify } = await import("util");
  const run = promisify(execFile);

  const id = randomUUID();
  const inPath = path.join(TEMP_ROOT, `${id}-in.pdf`);
  const outPath = path.join(TEMP_ROOT, `${id}-out.pdf`);
  await writeFile(inPath, buffer);

  try {
    await run(bin, [`--password=${password}`, "--decrypt", inPath, outPath]);
    return await readFile(outPath);
  } catch (err: any) {
    if (err?.code === "ENOENT") throw new EncryptionUnavailableError();
    throw new Error("Incorrect password, or the file isn't a supported encrypted PDF.");
  } finally {
    await unlink(inPath).catch(() => {});
    await unlink(outPath).catch(() => {});
  }
}

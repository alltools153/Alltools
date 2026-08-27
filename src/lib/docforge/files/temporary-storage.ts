import { mkdir, writeFile, readFile, rm, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/**
 * All processing happens against a job-scoped folder under the OS temp
 * directory (or DOCFORGE_TMP_DIR). Nothing here is written to a database or
 * kept beyond the lifetime of a single request + its cleanup sweep.
 */

const ROOT = path.resolve(process.cwd(), process.env.DOCFORGE_TMP_DIR || ".tmp/docforge");
const TTL_MINUTES = Number(process.env.DOCFORGE_TMP_TTL_MINUTES || 30);

export interface TempJob {
  id: string;
  dir: string;
}

async function ensureRoot() {
  if (!existsSync(ROOT)) {
    await mkdir(ROOT, { recursive: true });
  }
}

/** Creates a fresh, isolated directory for one processing job. */
export async function createJob(): Promise<TempJob> {
  await ensureRoot();
  const id = randomUUID();
  const dir = path.join(ROOT, id);
  await mkdir(dir, { recursive: true });
  return { id, dir };
}

/**
 * Resolves a safe path inside a job directory. Rejects any filename that
 * would escape the job folder (path traversal) or that isn't a plain file
 * name.
 */
export function safeJobPath(job: TempJob, filename: string): string {
  const base = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, "_");
  if (!base || base === "." || base === "..") {
    throw new Error("Invalid filename.");
  }
  const resolved = path.resolve(job.dir, base);
  if (!resolved.startsWith(path.resolve(job.dir) + path.sep) && resolved !== path.resolve(job.dir)) {
    throw new Error("Invalid path.");
  }
  return resolved;
}

export async function writeJobFile(job: TempJob, filename: string, data: Buffer | Uint8Array): Promise<string> {
  const p = safeJobPath(job, filename);
  await writeFile(p, data);
  return p;
}

export async function readJobFile(job: TempJob, filename: string): Promise<Buffer> {
  return readFile(safeJobPath(job, filename));
}

/** Deletes a single job's directory and everything in it. */
export async function destroyJob(job: TempJob): Promise<void> {
  await rm(job.dir, { recursive: true, force: true });
}

/**
 * Sweeps the temp root for job directories older than the configured TTL
 * and removes them. Called from the cleanup cron/script and opportunistically
 * from long-running routes so abandoned uploads never accumulate.
 */
export async function sweepAbandonedJobs(): Promise<{ removed: number }> {
  await ensureRoot();
  const { readdir } = await import("fs/promises");
  const entries = await readdir(ROOT, { withFileTypes: true });
  const cutoff = Date.now() - TTL_MINUTES * 60_000;
  let removed = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(ROOT, entry.name);
    try {
      const info = await stat(dir);
      if (info.mtimeMs < cutoff) {
        await rm(dir, { recursive: true, force: true });
        removed++;
      }
    } catch {
      // Directory may have already been removed by a concurrent sweep.
    }
  }

  return { removed };
}

export const TEMP_ROOT = ROOT;
export const TEMP_TTL_MINUTES = TTL_MINUTES;

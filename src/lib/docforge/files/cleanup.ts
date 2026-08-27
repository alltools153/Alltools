import { destroyJob, sweepAbandonedJobs, TempJob } from "./temporary-storage";

/**
 * Guarantees a job's temp directory is removed once a handler is done with
 * it, whether the handler succeeded, threw, or returned early. Also kicks
 * off a lightweight, non-blocking sweep for any older abandoned jobs (e.g.
 * from requests that were interrupted mid-upload and never reached this
 * `finally`).
 */
export async function withJobCleanup<T>(job: TempJob, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } finally {
    await destroyJob(job);
    // Fire-and-forget: don't make this request wait on sweeping others' jobs.
    void sweepAbandonedJobs().catch(() => {});
  }
}

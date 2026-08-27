"use client";

export type Stage = "idle" | "uploading" | "processing" | "done" | "error";

const STEPS = ["Uploading", "Processing", "Preparing download"];

export function ProcessingStatus({ stage, errorMessage }: { stage: Stage; errorMessage?: string | null }) {
  if (stage === "idle") return null;

  if (stage === "error") {
    return (
      <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
        <p className="font-medium">We couldn't process this file.</p>
        <p className="mt-1">{errorMessage || "Please check that the document is valid and try again."}</p>
      </div>
    );
  }

  const activeIndex = stage === "uploading" ? 0 : stage === "processing" ? 1 : 2;

  return (
    <div role="status" aria-live="polite" className="rounded-2xl border border-paper-200 bg-white p-5 dark:border-ink-700 dark:bg-ink-800">
      <ul className="space-y-2">
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-3 text-sm">
            <span
              className={
                i < activeIndex
                  ? "grid h-5 w-5 place-items-center rounded-full bg-ember-500 text-white"
                  : i === activeIndex
                  ? "h-5 w-5 animate-pulse rounded-full bg-forge-500"
                  : "h-5 w-5 rounded-full border border-ink-900/15 dark:border-paper-100/20"
              }
              aria-hidden="true"
            >
              {i < activeIndex ? "✓" : null}
            </span>
            <span className={i <= activeIndex ? "text-ink-900 dark:text-paper-50" : "text-ink-600/60 dark:text-paper-200/40"}>
              {step}…
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

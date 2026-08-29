"use client";

export function DownloadCard({
  filename,
  downloadUrl,
  onReset,
  note
}: {
  filename: string;
  downloadUrl: string;
  onReset: () => void;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-ember-500/30 bg-ember-500/5 p-6 text-center dark:border-ember-500/20">
      <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-ember-500 text-white">✓</span>
      <p className="mt-3 font-medium text-ink-900 dark:text-paper-50">Conversion complete</p>
      <p className="mt-1 font-mono text-sm text-ink-700 dark:text-paper-200/70">{filename}</p>
      {note && <p className="mt-2 text-xs text-ink-600 dark:text-paper-200/50">{note}</p>}

      <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={downloadUrl}
          download={filename}
          className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-6 py-2.5 text-sm font-medium text-paper-50 hover:bg-ink-800 focus-ring dark:bg-forge-500 dark:hover:bg-forge-400"
        >
          Download {filename.split(".").pop()?.toUpperCase()}
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-6 py-2.5 text-sm font-medium text-paper-50 hover:bg-ink-800 focus-ring dark:bg-forge-500 dark:hover:bg-forge-400"
        >
          Convert another file
        </button>
      </div>
    </div>
  );
}

"use client";

export interface SplitRangeRow {
  name: string;
  range: string;
}

export function SplitRangeBuilder({
  mode,
  onModeChange,
  ranges,
  onRangesChange
}: {
  mode: "ranges" | "every-page";
  onModeChange: (mode: "ranges" | "every-page") => void;
  ranges: SplitRangeRow[];
  onRangesChange: (ranges: SplitRangeRow[]) => void;
}) {
  function update(i: number, patch: Partial<SplitRangeRow>) {
    const next = [...ranges];
    next[i] = { ...next[i], ...patch };
    onRangesChange(next);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-paper-200 bg-white p-5 dark:border-ink-700 dark:bg-ink-800">
      <div className="flex gap-2">
        <button type="button" onClick={() => onModeChange("ranges")} className={`rounded-full px-4 py-1.5 text-sm ${mode === "ranges" ? "bg-ink-950 text-paper-50 dark:bg-forge-500" : "border border-ink-900/15 text-ink-700 dark:border-paper-100/15 dark:text-paper-200"}`}>
          Split by page ranges
        </button>
        <button type="button" onClick={() => onModeChange("every-page")} className={`rounded-full px-4 py-1.5 text-sm ${mode === "every-page" ? "bg-ink-950 text-paper-50 dark:bg-forge-500" : "border border-ink-900/15 text-ink-700 dark:border-paper-100/15 dark:text-paper-200"}`}>
          Extract every page
        </button>
      </div>

      {mode === "ranges" && (
        <div className="space-y-2">
          {ranges.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={r.range}
                placeholder="e.g. 1-3"
                onChange={(e) => update(i, { range: e.target.value })}
                className="w-28 rounded-lg border border-ink-900/15 bg-white px-3 py-2 font-mono text-sm dark:border-paper-100/15 dark:bg-ink-900 dark:text-paper-50"
              />
              <input
                type="text"
                value={r.name}
                placeholder="File name"
                onChange={(e) => update(i, { name: e.target.value })}
                className="flex-1 rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm dark:border-paper-100/15 dark:bg-ink-900 dark:text-paper-50"
              />
              <button type="button" onClick={() => onRangesChange(ranges.filter((_, idx) => idx !== i))} aria-label="Remove range" className="rounded p-1.5 text-ink-600 hover:bg-paper-100 focus-ring dark:hover:bg-ink-700">✕</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onRangesChange([...ranges, { name: `part-${ranges.length + 1}`, range: "" }])}
            className="text-sm font-medium text-forge-600 hover:underline dark:text-forge-400"
          >
            + Add another range
          </button>
        </div>
      )}
    </div>
  );
}

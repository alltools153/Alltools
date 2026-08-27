"use client";

import { useState } from "react";
import type { PickedFile } from "./file-dropzone";
import { formatBytes } from "@/lib/docforge/utils";

/** Drag-to-reorder list used by Merge PDF, with keyboard-accessible up/down fallback. */
export function ReorderFileList({ files, onChange }: { files: PickedFile[]; onChange: (files: PickedFile[]) => void }) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function move(from: number, to: number) {
    if (to < 0 || to >= files.length) return;
    const next = [...files];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  if (files.length < 2) return null;

  return (
    <div>
      <p className="mb-2 text-sm text-ink-600 dark:text-paper-200/60">Drag to reorder — files will be merged in this order.</p>
      <ul className="space-y-2">
        {files.map((f, i) => (
          <li
            key={f.id}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => { if (dragIndex !== null) move(dragIndex, i); setDragIndex(null); }}
            className="flex items-center gap-3 rounded-xl border border-paper-200 bg-white px-4 py-3 text-sm dark:border-ink-700 dark:bg-ink-800"
          >
            <span className="cursor-grab text-ink-600/50" aria-hidden="true">⠿</span>
            <span className="font-mono text-xs text-ink-600/60 dark:text-paper-200/40">{i + 1}</span>
            <span className="flex-1 truncate font-medium text-ink-900 dark:text-paper-50">{f.file.name}</span>
            <span className="font-mono text-xs text-ink-600 dark:text-paper-200/50">{formatBytes(f.file.size)}</span>
            <div className="flex gap-1">
              <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label={`Move ${f.file.name} up`} className="rounded p-1 text-ink-600 hover:bg-paper-100 disabled:opacity-30 focus-ring dark:hover:bg-ink-700">↑</button>
              <button type="button" onClick={() => move(i, i + 1)} disabled={i === files.length - 1} aria-label={`Move ${f.file.name} down`} className="rounded p-1 text-ink-600 hover:bg-paper-100 disabled:opacity-30 focus-ring dark:hover:bg-ink-700">↓</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

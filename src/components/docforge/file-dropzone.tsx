"use client";

import { useCallback, useRef, useState } from "react";
import { cx, formatBytes } from "@/lib/docforge/utils";

export interface PickedFile {
  file: File;
  id: string;
}

interface Props {
  accept: string[];
  multiple: boolean;
  files: PickedFile[];
  onChange: (files: PickedFile[]) => void;
  label?: string;
}

export function FileDropzone({ accept, multiple, files, onChange, label }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (list: FileList | null) => {
      if (!list || list.length === 0) return;
      setError(null);
      const incoming = Array.from(list);

      if (!multiple && incoming.length > 1) {
        setError("This tool accepts a single file.");
        return;
      }

      const picked = incoming.map((file) => {
        const safeId = (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function")
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        return { file, id: `${file.name}-${file.size}-${safeId}` };
      });
      onChange(multiple ? [...files, ...picked] : picked);
    },
    [files, multiple, onChange]
  );

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={label || "Upload files"}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          addFiles(e.dataTransfer.files);
        }}
        className={cx(
          "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition focus-ring",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border bg-card hover:border-primary/60"
        )}
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 16V4M12 4l-4 4M12 4l4 4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="font-medium text-foreground">Drag &amp; drop {multiple ? "files" : "your file"} here</p>
        <p className="text-sm text-muted-foreground">
          Accepts {accept.join(", ")}
        </p>
        <span className="mt-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Choose {multiple ? "Files" : "File"}
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept.join(",")}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f, i) => (
            <li
              key={f.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{f.file.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{formatBytes(f.file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => onChange(files.filter((x) => x.id !== f.id))}
                className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label={`Remove ${f.file.name}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

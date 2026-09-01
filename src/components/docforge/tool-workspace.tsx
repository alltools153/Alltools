"use client";

import { useMemo, useState } from "react";
import type { ToolConfig } from "@/lib/docforge/tools-config";
import { optionsForTool } from "@/lib/docforge/tool-options";
import { FileDropzone, PickedFile } from "./file-dropzone";
import { SettingsPanel } from "./settings-panel";
import { ProcessingStatus, Stage } from "./processing-status";
import { DownloadCard } from "./download-card";
import { ReorderFileList } from "./reorder-file-list";
import { SplitRangeBuilder, SplitRangeRow } from "./split-range-builder";
import { formatBytes } from "@/lib/docforge/utils";

export function ToolWorkspace({ tool }: { tool: ToolConfig }) {
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; filename: string } | null>(null);

  const [splitMode, setSplitMode] = useState<"ranges" | "every-page">("ranges");
  const [splitRanges, setSplitRanges] = useState<SplitRangeRow[]>([{ name: "part-1", range: "" }]);

  const fields = useMemo(() => optionsForTool(tool.slug), [tool.slug]);

  function reset() {
    setFiles([]);
    setValues({});
    setStage("idle");
    setError(null);
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
  }

  async function submit() {
    if (files.length === 0) return;
    setStage("uploading");
    setError(null);

    const formData = new FormData();
    for (const f of files) formData.append("files", f.file, f.file.name);
    for (const [key, value] of Object.entries(values)) formData.append(key, value);

    if (tool.slug === "split-pdf") {
      formData.set("mode", splitMode);
      if (splitMode === "ranges") {
        formData.set("ranges", JSON.stringify(splitRanges.filter((r) => r.range.trim())));
      }
    }

    if (tool.slug === "reorder-pages") {
      const orderValue = values.order?.trim();
      if (orderValue) formData.set("order", orderValue);
    }

    try {
      setStage("processing");
      const res = await fetch(tool.apiPath, { method: "POST", body: formData });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "The document could not be processed." }));
        throw new Error(body.error || "The document could not be processed.");
      }

      const disposition = res.headers.get("Content-Disposition") || "";
      const match = disposition.match(/filename="?([^"]+)"?/);
      const filename = match ? decodeURIComponent(match[1]) : `output.${tool.outputExt}`;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResult({ url, filename });
      setStage("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The document could not be processed.");
      setStage("error");
    }
  }

  if (stage === "done" && result) {
    return <DownloadCard filename={result.filename} downloadUrl={result.url} onReset={reset} note="Temporary files for this job have already been deleted from the server." />;
  }

  return (
    <div className="space-y-5">
      <FileDropzone accept={tool.accept} multiple={tool.multiple} files={files} onChange={setFiles} label={`Upload for ${tool.name}`} />

      {tool.slug === "merge-pdf" && <ReorderFileList files={files} onChange={setFiles} />}

      {tool.slug === "split-pdf" && (
        <SplitRangeBuilder mode={splitMode} onModeChange={setSplitMode} ranges={splitRanges} onRangesChange={setSplitRanges} />
      )}

      {files.length > 0 && files[0] && stage === "idle" && (
        <p className="text-sm text-ink-600 dark:text-paper-200/60">
          {files.length === 1 ? files[0].file.name : `${files.length} files selected`} · {formatBytes(files.reduce((s, f) => s + f.file.size, 0))}
        </p>
      )}

      <SettingsPanel fields={fields} values={values} onChange={(name, v) => setValues((prev) => ({ ...prev, [name]: v }))} />

      <ProcessingStatus stage={stage} errorMessage={error} />

      {stage !== "processing" && stage !== "uploading" && (
        <button
          type="button"
          onClick={submit}
          disabled={files.length === 0}
          className="w-full rounded-2xl bg-primary py-3.5 px-8 text-sm font-bold text-primary-foreground shadow-glow-primary transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 focus-ring sm:w-auto cursor-pointer"
        >
          Convert / Process {tool.name}
        </button>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Download, RotateCcw, Check, ExternalLink, Sparkles } from "lucide-react";

export function DownloadCard({
  filename,
  downloadUrl,
  onReset,
  note,
}: {
  filename: string;
  downloadUrl: string;
  onReset: () => void;
  note?: string;
}) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    try {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      a.target = "_blank"; // Ensures iPhone / Android allows the download or preview stream
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
      }, 1000);
      setDownloaded(true);
    } catch {
      window.open(downloadUrl, "_blank");
    }
  };

  return (
    <div className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 text-center shadow-lg space-y-4" style={{ backgroundColor: 'var(--card)' }}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner">
        <Check className="w-7 h-7" />
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-extrabold text-foreground">Document Ready!</h3>
        <p className="mt-1 font-mono text-xs sm:text-sm text-muted-foreground truncate max-w-md mx-auto">{filename}</p>
        {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow-primary hover:opacity-90 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{downloaded ? "Download Again" : `Download ${filename.split(".").pop()?.toUpperCase()}`}</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-muted/60 px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Process Another File</span>
        </button>
      </div>
    </div>
  );
}

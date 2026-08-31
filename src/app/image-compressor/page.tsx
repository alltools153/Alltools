'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  UploadCloud,
  Download,
  Trash2,
  Sliders,
  CheckCircle2,
  Lock,
  Sparkles,
  RefreshCw,
  Eye,
  FileImage,
  ArrowRight,
  Zap,
  Info,
  Archive,
} from 'lucide-react';

interface ProcessedImage {
  id: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  originalDimensions: { width: number; height: number };
  compressedDimensions: { width: number; height: number };
  originalUrl: string;
  compressedUrl: string;
  savingsPercent: number;
  format: string;
  status: 'processing' | 'done' | 'error';
}

export default function ImageCompressorPage() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [quality, setQuality] = useState<number>(80);
  const [outputFormat, setOutputFormat] = useState<'original' | 'image/jpeg' | 'image/webp' | 'image/png'>('original');
  const [maxDimension, setMaxDimension] = useState<number | 'original'>('original');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<ProcessedImage | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format file size nicely
  const formatBytes = (bytes: number, decimals = 1) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Process a single image file via HTML5 Canvas
  const compressSingleFile = useCallback(
    (file: File, targetQuality: number, targetFormat: string, targetMaxDim: number | 'original'): Promise<ProcessedImage> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let width = img.width;
            let height = img.height;
            const originalWidth = width;
            const originalHeight = height;

            // Resize dimensions if maxDimension is set
            if (targetMaxDim !== 'original' && typeof targetMaxDim === 'number') {
              if (width > targetMaxDim || height > targetMaxDim) {
                if (width > height) {
                  height = Math.round((height * targetMaxDim) / width);
                  width = targetMaxDim;
                } else {
                  width = Math.round((width * targetMaxDim) / height);
                  height = targetMaxDim;
                }
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              reject(new Error('Canvas context unavailable'));
              return;
            }

            // Fill background with white for transparent PNG to JPEG conversion
            let mimeType = file.type;
            if (targetFormat !== 'original') {
              mimeType = targetFormat;
            }
            if (mimeType === 'image/jpeg') {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, width, height);
            }

            ctx.drawImage(img, 0, 0, width, height);

            // Compress to blob
            const qualityRatio = targetQuality / 100;
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  reject(new Error('Compression blob creation failed'));
                  return;
                }

                const compressedUrl = URL.createObjectURL(blob);
                const originalUrl = URL.createObjectURL(file);
                const compressedSize = blob.size;
                const savings = Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100));

                let ext = file.name.split('.').pop() || 'jpg';
                if (targetFormat === 'image/jpeg') ext = 'jpg';
                if (targetFormat === 'image/webp') ext = 'webp';
                if (targetFormat === 'image/png') ext = 'png';

                const outputName = file.name.replace(/\.[^/.]+$/, '') + `_compressed.${ext}`;

                resolve({
                  id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                  name: outputName,
                  originalSize: file.size,
                  compressedSize: compressedSize,
                  originalDimensions: { width: originalWidth, height: originalHeight },
                  compressedDimensions: { width, height },
                  originalUrl,
                  compressedUrl,
                  savingsPercent: savings,
                  format: ext.toUpperCase(),
                  status: 'done',
                });
              },
              mimeType,
              qualityRatio
            );
          };
          img.onerror = () => reject(new Error('Invalid image file'));
          img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error('File reading error'));
        reader.readAsDataURL(file);
      });
    },
    []
  );

  // Handle incoming files
  const handleFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    setIsProcessing(true);

    try {
      const results: ProcessedImage[] = [];
      for (const file of validFiles) {
        const item = await compressSingleFile(file, quality, outputFormat, maxDimension);
        results.push(item);
      }
      setImages((prev) => [...results, ...prev]);
      if (results.length > 0 && !selectedPreview) {
        setSelectedPreview(results[0]);
      }
    } catch (err) {
      console.error('Batch processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Drag & drop handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Re-compress existing items with new settings
  const recompressAll = async (newQuality: number, newFormat: string, newMaxDim: number | 'original') => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const updated: ProcessedImage[] = [];
      for (const item of images) {
        const res = await fetch(item.originalUrl);
        const blob = await res.blob();
        const file = new File([blob], item.name, { type: blob.type });
        const newItem = await compressSingleFile(file, newQuality, newFormat, newMaxDim);
        updated.push(newItem);
      }
      setImages(updated);
      if (updated.length > 0) {
        setSelectedPreview(updated[0]);
      }
    } catch (err) {
      console.error('Recompression error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Download a single compressed image
  const downloadSingle = (img: ProcessedImage) => {
    const a = document.createElement('a');
    a.href = img.compressedUrl;
    a.download = img.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download all compressed images
  const downloadAll = () => {
    images.forEach((img, idx) => {
      setTimeout(() => {
        downloadSingle(img);
      }, idx * 250);
    });
  };

  // Remove an image from list
  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (selectedPreview?.id === id) {
      setSelectedPreview(images.find((img) => img.id !== id) || null);
    }
  };

  // Clear all
  const clearAll = () => {
    setImages([]);
    setSelectedPreview(null);
  };

  // Aggregate stats
  const totalOriginal = images.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressed = images.reduce((acc, curr) => acc + curr.compressedSize, 0);
  const totalSavings = totalOriginal > 0 ? Math.max(0, Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Utility Tools</span>
              <span>/</span>
              <span className="text-primary font-bold">Image Compressor</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <ImageIcon className="w-7 h-7" />
              </span>
              <span>Image Compressor Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Compress JPG, PNG, WEBP and AVIF images directly in browser memory with zero upload delays, custom quality control, dimensions scaling, and batch processing.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> 100% Client-Side Privacy
            </span>
          </div>
        </div>

        {/* Compression Controls Bar */}
        <div className="p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-5" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Global Compression Settings</h3>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Applied on upload &amp; live tweaks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* 1. Quality Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-muted-foreground uppercase tracking-wider">Compression Quality</span>
                <span className="px-2 py-0.5 rounded-md bg-primary/15 text-primary font-mono font-black text-xs">
                  {quality}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={quality}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuality(val);
                  recompressAll(val, outputFormat, maxDimension);
                }}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Smallest File (10%)</span>
                <span>Balanced (80%)</span>
                <span>Best Quality (100%)</span>
              </div>
            </div>

            {/* 2. Format Conversion */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setOutputFormat(val);
                  recompressAll(quality, val, maxDimension);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="original">Preserve Original Format</option>
                <option value="image/webp">Convert to WEBP (Recommended - Smallest)</option>
                <option value="image/jpeg">Convert to JPG / JPEG</option>
                <option value="image/png">Convert to PNG (Lossless)</option>
              </select>
              <p className="text-[10px] text-muted-foreground">
                WEBP offers up to 40% higher compression with high fidelity.
              </p>
            </div>

            {/* 3. Max Resolution / Resizing */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Max Dimension / Scaling
              </label>
              <select
                value={maxDimension}
                onChange={(e) => {
                  const val = e.target.value === 'original' ? 'original' : Number(e.target.value);
                  setMaxDimension(val);
                  recompressAll(quality, outputFormat, val);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="original">Preserve Original Dimensions</option>
                <option value={3840}>Scale to 4K Ultra HD (Max 3840px)</option>
                <option value={1920}>Scale to Full HD (Max 1920px)</option>
                <option value={1280}>Scale to 720p HD (Max 1280px)</option>
                <option value={800}>Scale to Web Thumbnail (Max 800px)</option>
              </select>
              <p className="text-[10px] text-muted-foreground">
                Maintains aspect ratio automatically without distortion.
              </p>
            </div>

          </div>
        </div>

        {/* Drag & Drop Upload Dropzone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="p-8 sm:p-12 rounded-3xl border-2 border-dashed border-border hover:border-primary/60 bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-4 shadow-inner group"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp, image/avif, image/bmp"
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-primary">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Drop your images here, or <span className="text-primary underline">browse files</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Supports batch uploading of JPG, PNG, WEBP, AVIF, and BMP files. No file size limits!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-muted-foreground font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">⚡ Batch Processing</span>
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">🔒 Zero Server Uploads</span>
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">🎯 Instant Canvas Rendering</span>
          </div>
        </div>

        {/* Active Files & Processing Queue */}
        {images.length > 0 && (
          <div className="space-y-6">
            
            {/* Batch Header Stats Bar */}
            <div className="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: 'var(--card)' }}>
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Total Files</div>
                  <div className="text-base font-black text-foreground font-mono">{images.length} images</div>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Original Total</div>
                  <div className="text-base font-black text-muted-foreground font-mono">{formatBytes(totalOriginal)}</div>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Compressed Total</div>
                  <div className="text-base font-black text-primary font-mono">{formatBytes(totalCompressed)}</div>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Net Savings</div>
                  <div className="text-base font-black text-emerald-400 font-mono">-{totalSavings}% Saved</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={downloadAll}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                >
                  <Archive className="w-4 h-4" />
                  <span>Download All ({images.length})</span>
                </button>

                <button
                  type="button"
                  onClick={clearAll}
                  className="py-2.5 px-3 rounded-xl border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-red-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Clear all images"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              </div>
            </div>

            {/* Images List & Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Image Cards List */}
              <div className="lg:col-span-7 space-y-3">
                {images.map((img) => {
                  const isSelected = selectedPreview?.id === img.id;
                  return (
                    <div
                      key={img.id}
                      onClick={() => setSelectedPreview(img)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 sm:gap-4 cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-md ring-1 ring-primary/40'
                          : 'border-border bg-card hover:border-border hover:bg-muted/40'
                      }`}
                      style={{ backgroundColor: isSelected ? undefined : 'var(--card)' }}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-black/20 border border-border flex-shrink-0 flex items-center justify-center">
                        <img
                          src={img.compressedUrl}
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 text-[8px] font-mono font-bold text-white">
                          {img.format}
                        </span>
                      </div>

                      {/* File Details */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="text-xs sm:text-sm font-semibold text-foreground truncate">{img.name}</div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                          <span className="text-muted-foreground line-through text-[11px]">
                            {formatBytes(img.originalSize)}
                          </span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          <span className="font-bold text-foreground">
                            {formatBytes(img.compressedSize)}
                          </span>
                          <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">
                            -{img.savingsPercent}%
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          {img.compressedDimensions.width} × {img.compressedDimensions.height} px
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => downloadSingle(img)}
                          className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                          title="Download compressed image"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Comparison & Live Preview */}
              <div className="lg:col-span-5 space-y-4">
                {selectedPreview ? (
                  <div className="p-5 rounded-3xl border border-border bg-card shadow-xl space-y-4 sticky top-20" style={{ backgroundColor: 'var(--card)' }}>
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <Eye className="w-4 h-4 text-primary flex-shrink-0" />
                        <h4 className="text-xs sm:text-sm font-bold text-foreground truncate">
                          {selectedPreview.name}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-bold">
                        -{selectedPreview.savingsPercent}% Saved
                      </span>
                    </div>

                    {/* Preview Box */}
                    <div className="relative rounded-2xl overflow-hidden border border-border bg-black/40 flex items-center justify-center min-h-[220px] max-h-[300px]">
                      <img
                        src={selectedPreview.compressedUrl}
                        alt={selectedPreview.name}
                        className="max-h-[280px] w-auto object-contain"
                      />
                    </div>

                    {/* Side-by-side stats breakdown */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                        <div className="text-[10px] font-bold uppercase text-muted-foreground">Original</div>
                        <div className="font-bold text-foreground mt-0.5">{formatBytes(selectedPreview.originalSize)}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          {selectedPreview.originalDimensions.width} × {selectedPreview.originalDimensions.height} px
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                        <div className="text-[10px] font-bold uppercase text-primary">Compressed</div>
                        <div className="font-bold text-primary mt-0.5">{formatBytes(selectedPreview.compressedSize)}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          {selectedPreview.compressedDimensions.width} × {selectedPreview.compressedDimensions.height} px
                        </div>
                      </div>
                    </div>

                    {/* Single Download button */}
                    <button
                      type="button"
                      onClick={() => downloadSingle(selectedPreview)}
                      className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Compressed Image</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-8 rounded-3xl border border-border bg-card text-center text-muted-foreground text-xs space-y-2">
                    <FileImage className="w-8 h-8 mx-auto text-muted-foreground/50" />
                    <p>Select any image from the left list to view side-by-side comparison details.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-foreground">Zero Latency HTML5 Canvas</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Images are compressed concurrently inside your local browser thread using hardware-accelerated Canvas. No waiting for server uploads.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-foreground">100% Private &amp; Secure</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Your photos, documents, and sensitive assets never leave your computer or touch any external cloud servers.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
              <Archive className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-foreground">Multi-Format Batch Converter</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Upload dozens of heavy JPGs or PNGs at once and convert them to lightweight Next-Gen WebP with a single click.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

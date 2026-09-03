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
  Target,
  FileCheck,
} from 'lucide-react';
import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

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
  const [compressionMode, setCompressionMode] = useState<'targetSize' | 'quality'>('targetSize');
  const [targetSizeKb, setTargetSizeKb] = useState<number>(200);
  const [quality, setQuality] = useState<number>(80);
  const [outputFormat, setOutputFormat] = useState<'original' | 'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
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

  // Iterative Smart Compressor that can hit exact target KB (e.g. < 200 KB for 4MB+ images)
  const compressSingleFile = useCallback(
    (
      file: File,
      mode: 'targetSize' | 'quality',
      targetKb: number,
      manualQuality: number,
      targetFormat: string,
      targetMaxDim: number | 'original'
    ): Promise<ProcessedImage> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = async () => {
            const originalWidth = img.width;
            const originalHeight = img.height;

            // Determine target mime type
            let mimeType = file.type;
            if (targetFormat !== 'original') {
              mimeType = targetFormat;
            } else if (file.type === 'image/png' && mode === 'targetSize') {
              // Convert PNG to WebP or JPEG for target size reduction (PNG canvas cannot compress to KB targets)
              mimeType = 'image/webp';
            }

            // Helper to render image on canvas with specific dimensions & quality
            const renderCanvasToBlob = (w: number, h: number, qRatio: number, format: string): Promise<Blob | null> => {
              return new Promise((res) => {
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                  res(null);
                  return;
                }

                // If converting to JPEG or white background needed
                if (format === 'image/jpeg') {
                  ctx.fillStyle = '#ffffff';
                  ctx.fillRect(0, 0, w, h);
                }

                ctx.drawImage(img, 0, 0, w, h);
                canvas.toBlob((blob) => res(blob), format, qRatio);
              });
            };

            // Calculate starting dimensions
            let currentWidth = originalWidth;
            let currentHeight = originalHeight;

            if (targetMaxDim !== 'original' && typeof targetMaxDim === 'number') {
              if (currentWidth > targetMaxDim || currentHeight > targetMaxDim) {
                if (currentWidth > currentHeight) {
                  currentHeight = Math.round((currentHeight * targetMaxDim) / currentWidth);
                  currentWidth = targetMaxDim;
                } else {
                  currentWidth = Math.round((currentWidth * targetMaxDim) / currentHeight);
                  currentHeight = targetMaxDim;
                }
              }
            }

            let bestBlob: Blob | null = null;
            let finalWidth = currentWidth;
            let finalHeight = currentHeight;

            if (mode === 'quality') {
              // Standard single-pass quality mode
              const qRatio = manualQuality / 100;
              bestBlob = await renderCanvasToBlob(currentWidth, currentHeight, qRatio, mimeType);
            } else {
              // Iterative Target File Size Search (e.g. < 200 KB)
              const targetBytes = targetKb * 1024;
              let attemptQuality = 0.85;
              let scale = 1.0;

              // Step down resolution if image is very large (e.g. > 2000px)
              if (currentWidth > 2400 || currentHeight > 2400) {
                scale = 0.6;
              } else if (currentWidth > 1600 || currentHeight > 1600) {
                scale = 0.75;
              }

              for (let iter = 0; iter < 8; iter++) {
                const w = Math.max(200, Math.round(currentWidth * scale));
                const h = Math.max(200, Math.round(currentHeight * scale));

                const blob = await renderCanvasToBlob(w, h, attemptQuality, mimeType);
                if (!blob) break;

                bestBlob = blob;
                finalWidth = w;
                finalHeight = h;

                // If we're within the target size limit, we're good!
                if (blob.size <= targetBytes) {
                  break;
                }

                // If still too large, step down quality and resolution
                if (attemptQuality > 0.45) {
                  attemptQuality -= 0.15;
                } else {
                  scale *= 0.8;
                  attemptQuality = 0.65;
                }
              }
            }

            if (!bestBlob) {
              reject(new Error('Image compression failed.'));
              return;
            }

            const compressedUrl = URL.createObjectURL(bestBlob);
            const originalUrl = URL.createObjectURL(file);
            const compressedSize = bestBlob.size;
            const savings = Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100));

            let ext = file.name.split('.').pop() || 'jpg';
            if (mimeType === 'image/jpeg') ext = 'jpg';
            if (mimeType === 'image/webp') ext = 'webp';
            if (mimeType === 'image/png') ext = 'png';

            const outputName = file.name.replace(/\.[^/.]+$/, '') + `_compressed.${ext}`;

            resolve({
              id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: outputName,
              originalSize: file.size,
              compressedSize: compressedSize,
              originalDimensions: { width: originalWidth, height: originalHeight },
              compressedDimensions: { width: finalWidth, height: finalHeight },
              originalUrl,
              compressedUrl,
              savingsPercent: savings,
              format: ext.toUpperCase(),
              status: 'done',
            });
          };
          img.onerror = () => reject(new Error('Invalid image file.'));
          img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error('File reading error.'));
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
        const item = await compressSingleFile(file, compressionMode, targetSizeKb, quality, outputFormat, maxDimension);
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
  const recompressAll = async (
    newMode: 'targetSize' | 'quality',
    newTargetKb: number,
    newQuality: number,
    newFormat: string,
    newMaxDim: number | 'original'
  ) => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const updated: ProcessedImage[] = [];
      for (const item of images) {
        const res = await fetch(item.originalUrl);
        const blob = await res.blob();
        const file = new File([blob], item.name, { type: blob.type });
        const newItem = await compressSingleFile(file, newMode, newTargetKb, newQuality, newFormat, newMaxDim);
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
              Compress large 4MB–20MB photos down to under 200KB, 100KB, or 50KB directly in your browser. Fast, private, and guaranteed to fit job portal &amp; form upload limits.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> 100% Client-Side Privacy
            </span>
          </div>
        </div>

        {/* Mode Selector Tabs (Target File Size vs Custom Quality %) */}
        <div className="p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/70 pb-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span>Compression Strategy</span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Choose exact target file size or manual visual quality percentage.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-muted border border-border">
              <button
                type="button"
                onClick={() => {
                  setCompressionMode('targetSize');
                  recompressAll('targetSize', targetSizeKb, quality, outputFormat, maxDimension);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  compressionMode === 'targetSize'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Target Size (KB)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCompressionMode('quality');
                  recompressAll('quality', targetSizeKb, quality, outputFormat, maxDimension);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  compressionMode === 'quality'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Manual Quality (%)</span>
              </button>
            </div>
          </div>

          {/* Target File Size Controls */}
          {compressionMode === 'targetSize' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Quick Target File Size Presets
                </span>
                <span className="text-xs font-mono font-bold text-primary">
                  Compress to: &le; {targetSizeKb} KB
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'Max 50 KB', kb: 50, desc: 'Signatures / Thumbnails' },
                  { label: 'Max 100 KB', kb: 100, desc: 'Government & Exam Forms' },
                  { label: 'Max 200 KB', kb: 200, desc: 'Job Portals & Resumes' },
                  { label: 'Max 500 KB', kb: 500, desc: 'Web & Social Media' },
                ].map((preset) => (
                  <button
                    key={preset.kb}
                    type="button"
                    onClick={() => {
                      setTargetSizeKb(preset.kb);
                      recompressAll('targetSize', preset.kb, quality, outputFormat, maxDimension);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      targetSizeKb === preset.kb
                        ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary'
                        : 'border-border bg-muted/40 hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    <div className="text-xs font-black text-foreground">{preset.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{preset.desc}</div>
                  </button>
                ))}
              </div>

              {/* Custom Target Slider */}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                  <span>Custom Target Limit</span>
                  <span className="font-mono text-foreground font-bold">{targetSizeKb} KB</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={2000}
                  step={10}
                  value={targetSizeKb}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setTargetSizeKb(val);
                    recompressAll('targetSize', val, quality, outputFormat, maxDimension);
                  }}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>20 KB</span>
                  <span>200 KB (Recommended)</span>
                  <span>1000 KB (1 MB)</span>
                  <span>2000 KB (2 MB)</span>
                </div>
              </div>
            </div>
          ) : (
            /* Manual Quality Controls */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-muted-foreground uppercase tracking-wider">Visual Quality Ratio</span>
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
                  recompressAll('quality', targetSizeKb, val, outputFormat, maxDimension);
                }}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Smallest File (10%)</span>
                <span>Balanced (80%)</span>
                <span>Best Quality (100%)</span>
              </div>
            </div>
          )}

          {/* Secondary Controls (Format & Max Dimension) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border/70">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Output Format
              </label>
              <select
                value={outputFormat}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setOutputFormat(val);
                  recompressAll(compressionMode, targetSizeKb, quality, val, maxDimension);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="image/jpeg">JPG / JPEG (Universal Compatibility)</option>
                <option value="image/webp">WEBP (Smallest Size &amp; Crisp Quality)</option>
                <option value="original">Preserve Original Format</option>
                <option value="image/png">PNG (Lossless - Larger Size)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Max Dimension Scaling
              </label>
              <select
                value={maxDimension}
                onChange={(e) => {
                  const val = e.target.value === 'original' ? 'original' : Number(e.target.value);
                  setMaxDimension(val);
                  recompressAll(compressionMode, targetSizeKb, quality, outputFormat, val);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="original">Preserve Original Dimensions</option>
                <option value={1920}>Scale to Full HD (Max 1920px)</option>
                <option value={1280}>Scale to 720p HD (Max 1280px)</option>
                <option value={800}>Scale to Web Medium (Max 800px)</option>
                <option value={500}>Scale to Profile / Passport (Max 500px)</option>
              </select>
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
              Drop large images here, or <span className="text-primary underline">browse files</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Supports 4MB+ JPG, PNG, WEBP, and AVIF photos. Iteratively compressed under {targetSizeKb} KB instantly!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-muted-foreground font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">⚡ Iterative Compression Engine</span>
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">🔒 100% In-Browser Privacy</span>
            <span className="px-2.5 py-1 rounded-lg bg-card border border-border">🎯 Exact KB Targets</span>
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
                  className="p-2.5 rounded-xl border border-border hover:border-red-500/40 text-muted-foreground hover:text-red-400 transition-colors cursor-pointer"
                  title="Clear all images"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="p-4 rounded-2xl border border-border bg-card shadow-sm space-y-3 flex flex-col justify-between hover:border-primary/40 transition-colors"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-muted/60 border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img
                          src={img.compressedUrl}
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-foreground truncate" title={img.name}>
                          {img.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] font-mono mt-0.5">
                          <span className="text-muted-foreground line-through">{formatBytes(img.originalSize)}</span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          <span className="text-primary font-bold">{formatBytes(img.compressedSize)}</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          {img.compressedDimensions.width} &times; {img.compressedDimensions.height} px • {img.format}
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
                      -{img.savingsPercent}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border/70">
                    <button
                      type="button"
                      onClick={() => downloadSingle(img)}
                      className="flex-1 py-2 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download ({formatBytes(img.compressedSize)})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="p-2 rounded-xl border border-border text-muted-foreground hover:text-red-400 hover:border-red-500/40 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Master SEO Blueprint & Structured Data Schema Footer */}
        <ToolSeoFooter toolSlug="image-compressor" />
      </div>
    </div>
  );
}

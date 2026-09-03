'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Binary,
  ArrowRightLeft,
  Copy,
  Check,
  Download,
  UploadCloud,
  FileCode,
  FileText,
  AlertCircle,
  Sparkles,
  Info,
  HelpCircle,
  ChevronDown,
  Trash2,
  Lock,
  Eye,
  Layers,
} from 'lucide-react';
import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

export default function Base64EncoderDecoderPage() {
  const [mode, setMode] = useState<'text_encode' | 'text_decode' | 'file_encode' | 'file_decode'>('text_encode');
  
  // Text Mode States
  const [inputText, setInputText] = useState('Hello, World! Welcome to AllToolss Base64 Studio.');
  const [outputText, setOutputText] = useState('');
  const [isUrlSafe, setIsUrlSafe] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // File Mode States
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; type: string } | null>(null);
  const [fileBase64Output, setFileBase64Output] = useState<string>('');
  const [fileDecodeInput, setFileDecodeInput] = useState<string>('');
  const [decodeFileName, setDecodeFileName] = useState<string>('decoded_file.bin');
  const [decodeFileType, setDecodeFileType] = useState<string>('application/octet-stream');
  
  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Process Text Encoding / Decoding
  const handleTextTransform = () => {
    setErrorMsg(null);
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'text_encode') {
        // UTF-8 safe encode
        const utf8Bytes = new TextEncoder().encode(inputText);
        let binaryStr = '';
        utf8Bytes.forEach((b) => (binaryStr += String.fromCharCode(b)));
        let encoded = btoa(binaryStr);
        if (isUrlSafe) {
          encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        setOutputText(encoded);
      } else if (mode === 'text_decode') {
        let cleanInput = inputText.trim();
        if (isUrlSafe) {
          cleanInput = cleanInput.replace(/-/g, '+').replace(/_/g, '/');
          while (cleanInput.length % 4) {
            cleanInput += '=';
          }
        }
        // Validate Base64 regex
        const b64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        if (!b64Regex.test(cleanInput.replace(/\s+/g, ''))) {
          throw new Error('Invalid Base64 character sequence or padding. Please check your input.');
        }

        const binaryStr = atob(cleanInput.replace(/\s+/g, ''));
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const decoded = new TextDecoder().decode(bytes);
        setOutputText(decoded);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Malformed Base64 string. Unable to decode.');
      setOutputText('');
    }
  };

  // Run on mount or mode change
  React.useEffect(() => {
    handleTextTransform();
  }, [mode, inputText, isUrlSafe]);

  // Handle File Upload for Encoding
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile({ name: file.name, size: file.size, type: file.type || 'application/octet-stream' });
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFileBase64Output(result);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read local file. Please try another file.');
    };
    reader.readAsDataURL(file);
  };

  // Handle File Decoding to Blob Download
  const handleFileDownload = () => {
    setErrorMsg(null);
    let base64String = fileDecodeInput.trim();
    if (!base64String) {
      setErrorMsg('Please enter or paste a valid Base64 string to decode into a file.');
      return;
    }

    try {
      let mime = decodeFileType;
      let pureB64 = base64String;

      // Extract data URI header if present (e.g. data:image/png;base64,iVBORw...)
      if (base64String.startsWith('data:')) {
        const matches = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.*)$/);
        if (matches) {
          mime = matches[1];
          pureB64 = matches[2];
        }
      }

      const byteCharacters = atob(pureB64.replace(/\s+/g, ''));
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mime });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = decodeFileName || 'decoded_download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setErrorMsg('Invalid Base64 string. Unable to reconstruct binary file.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTextFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'What is Base64 encoding and why is it used?',
      a: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format using 64 printable characters (A-Z, a-z, 0-9, +, /). It is commonly used in email (MIME), Data URLs, JWTs, and API payloads to safely transmit binary data across text-based protocols without corruption.',
    },
    {
      q: 'Is Base64 considered encryption or security?',
      a: 'No! Base64 is merely a public encoding format and NOT encryption. Anyone can decode a Base64 string back to its original contents instantly. Never rely on Base64 alone to protect sensitive passwords or private keys.',
    },
    {
      q: 'What is URL-Safe Base64?',
      a: 'Standard Base64 contains "+" and "/" characters, which have special meanings in URL query parameters and paths. URL-safe Base64 substitutes "+" with "-" and "/" with "_", and omits padding "=" to prevent HTTP parameter collision.',
    },
    {
      q: 'Are files or text uploaded to external servers?',
      a: 'No. All encoding and decoding operations run 100% locally inside your browser memory using hardware-accelerated JavaScript (Uint8Array, FileReader, TextEncoder). Your files and text never leave your machine.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Developer Tools</span>
              <span>/</span>
              <span className="text-primary font-bold">Base64 Encoder &amp; Decoder</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Binary className="w-7 h-7" />
              </span>
              <span>Base64 Encoder / Decoder Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Convert strings, JSON payloads, images, and binary files to Base64 format or decode Base64 strings back to original plain text and files with URL-safe compatibility.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> 100% Client-Side Privacy
            </span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-card border border-border" style={{ backgroundColor: 'var(--card)' }}>
          {[
            { id: 'text_encode', label: 'Encode Text', icon: FileText },
            { id: 'text_decode', label: 'Decode Text', icon: Binary },
            { id: 'file_encode', label: 'Encode File to Base64', icon: UploadCloud },
            { id: 'file_decode', label: 'Decode Base64 to File', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMode(tab.id as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-glow-primary font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. TEXT ENCODE / DECODE STUDIO */}
        {(mode === 'text_encode' || mode === 'text_decode') && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Input Panel */}
              <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {mode === 'text_encode' ? 'Plain Text Input' : 'Base64 Input String'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setInputText('')}
                    className="text-[11px] text-muted-foreground hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                </div>

                <textarea
                  rows={8}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={mode === 'text_encode' ? 'Type or paste text to encode...' : 'Paste Base64 string to decode...'}
                  className="w-full p-4 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-xs focus:outline-none focus:border-primary resize-y"
                />

                <div className="flex items-center justify-between pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-muted-foreground hover:text-foreground">
                    <input
                      type="checkbox"
                      checked={isUrlSafe}
                      onChange={(e) => setIsUrlSafe(e.target.checked)}
                      className="rounded border-border accent-primary cursor-pointer"
                    />
                    <span className="text-[11px] font-medium">URL-Safe Mode (Replace + / with - _)</span>
                  </label>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {inputText.length} characters
                  </span>
                </div>
              </div>

              {/* Output Panel */}
              <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {mode === 'text_encode' ? 'Base64 Encoded Result' : 'Plain Text Decoded Result'}
                  </label>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(outputText)}
                      disabled={!outputText}
                      className="px-2.5 py-1 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadTextFile(outputText, mode === 'text_encode' ? 'encoded.b64.txt' : 'decoded.txt')}
                      disabled={!outputText}
                      className="p-1.5 rounded-xl border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground text-xs transition-colors cursor-pointer disabled:opacity-40"
                      title="Download as text file"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <textarea
                  readOnly
                  rows={8}
                  value={outputText}
                  placeholder="Processed output will appear here automatically..."
                  className="w-full p-4 rounded-2xl border border-border bg-black/80 text-emerald-400 font-mono text-xs focus:outline-none resize-y select-all"
                />

                <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-muted-foreground">
                  <span>{outputText.length} characters</span>
                  <span>{new Blob([outputText]).size} bytes</span>
                </div>
              </div>

            </div>

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* 2. FILE ENCODE STUDIO */}
        {mode === 'file_encode' && (
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6" style={{ backgroundColor: 'var(--card)' }}>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 sm:p-10 rounded-2xl border-2 border-dashed border-border hover:border-primary/60 bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Click to browse or drop any file to encode
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports Images (PNG, JPG, SVG), PDFs, Audio, Videos, Documents, and Binary archives.
                </p>
              </div>
            </div>

            {uploadedFile && (
              <div className="p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 truncate">
                  <FileCode className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-bold text-foreground truncate">{uploadedFile.name}</span>
                  <span className="text-muted-foreground">({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
                </div>
                <span className="text-emerald-400 font-semibold">{uploadedFile.type}</span>
              </div>
            )}

            {fileBase64Output && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Base64 Data URL Representation
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(fileBase64Output)}
                      className="py-1.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Base64'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadTextFile(fileBase64Output, `${uploadedFile?.name || 'file'}.b64.txt`)}
                      className="py-1.5 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .txt</span>
                    </button>
                  </div>
                </div>

                <textarea
                  readOnly
                  rows={6}
                  value={fileBase64Output}
                  className="w-full p-4 rounded-2xl border border-border bg-black/80 text-cyan-300 font-mono text-xs select-all"
                />
              </div>
            )}
          </div>
        )}

        {/* 3. FILE DECODE STUDIO */}
        {mode === 'file_decode' && (
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-5" style={{ backgroundColor: 'var(--card)' }}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Paste Base64 or Data URI String
              </label>
              <textarea
                rows={6}
                value={fileDecodeInput}
                onChange={(e) => {
                  setFileDecodeInput(e.target.value);
                  if (e.target.value.startsWith('data:image/png')) {
                    setDecodeFileName('decoded_image.png');
                    setDecodeFileType('image/png');
                  } else if (e.target.value.startsWith('data:image/jpeg')) {
                    setDecodeFileName('decoded_image.jpg');
                    setDecodeFileType('image/jpeg');
                  } else if (e.target.value.startsWith('data:application/pdf')) {
                    setDecodeFileName('decoded_document.pdf');
                    setDecodeFileType('application/pdf');
                  }
                }}
                placeholder="Paste raw Base64 string or data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA... here"
                className="w-full p-4 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-xs focus:outline-none focus:border-primary resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Target File Name
                </label>
                <input
                  type="text"
                  value={decodeFileName}
                  onChange={(e) => setDecodeFileName(e.target.value)}
                  placeholder="e.g. sample.png, document.pdf"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  MIME Content Type
                </label>
                <select
                  value={decodeFileType}
                  onChange={(e) => setDecodeFileType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="application/octet-stream">Auto / Generic Binary (Octet-stream)</option>
                  <option value="image/png">PNG Image (image/png)</option>
                  <option value="image/jpeg">JPEG Image (image/jpeg)</option>
                  <option value="image/webp">WEBP Image (image/webp)</option>
                  <option value="image/svg+xml">SVG Vector (image/svg+xml)</option>
                  <option value="application/pdf">PDF Document (application/pdf)</option>
                  <option value="application/zip">ZIP Archive (application/zip)</option>
                  <option value="application/json">JSON Document (application/json)</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFileDownload}
              className="w-full py-3 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Decode &amp; Download Original File</span>
            </button>

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Use Base64 Encoder &amp; Decoder</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Choose Mode</span>
              <p>Select whether you want to encode plain text, decode an existing Base64 string, or convert raw binary files.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Paste or Upload</span>
              <p>Enter your text or upload any local file. Toggle URL-safe mode if you intend to pass Base64 in HTTP query strings.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Copy or Download</span>
              <p>Instantly copy the result to your clipboard or download it as a dedicated text/binary file with 1-click.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Developer Tools */}
        <div className="pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Related Developer Tools:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/jwt-decoder"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <FileCode className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">JWT Decoder</div>
                <div className="text-[11px] text-muted-foreground truncate">Decode Base64 token claims</div>
              </div>
            </Link>

            <Link
              href="/json-formatter"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">JSON Formatter</div>
                <div className="text-[11px] text-muted-foreground truncate">Beautify &amp; minify JSON</div>
              </div>
            </Link>

            <Link
              href="/qr-generator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">QR Code Generator</div>
                <div className="text-[11px] text-muted-foreground truncate">Export Base64 Data URLs</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Master SEO Blueprint & Structured Data Schema Footer */}
        <ToolSeoFooter toolSlug="base64-encoder-decoder" />
      </div>
    </div>
  );
}

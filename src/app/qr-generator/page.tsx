'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Copy,
  Check,
  Globe,
  Mail,
  Phone,
  Wifi,
  FileText,
  Sparkles,
  Sliders,
  Palette,
  Eye,
  RefreshCw,
  Share2,
  Lock,
  Smartphone,
  Layers,
} from 'lucide-react';

type QRType = 'text' | 'url' | 'email' | 'phone' | 'wifi';

export default function QRCodeGeneratorPage() {
  const [qrType, setQrType] = useState<QRType>('url');
  
  // Inputs
  const [textContent, setTextContent] = useState('https://alltoolss.com');
  const [urlContent, setUrlContent] = useState('https://alltoolss.com');
  
  const [emailTo, setEmailTo] = useState('support@example.com');
  const [emailSubject, setEmailSubject] = useState('Inquiry from AllToolss');
  const [emailBody, setEmailBody] = useState('Hello, I would like to get in touch.');
  
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210');
  
  const [wifiSsid, setWifiSsid] = useState('Home_5G_Network');
  const [wifiPassword, setWifiPassword] = useState('SuperSecretPassword123');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // Styling & Options
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [resolution, setResolution] = useState(384);
  const [margin, setMargin] = useState(2);

  // Outputs
  const [dataUrl, setDataUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Compute Raw String based on active type
  const getRawContent = (): string => {
    switch (qrType) {
      case 'url':
        if (!urlContent.trim()) return 'https://alltoolss.com';
        if (!urlContent.startsWith('http://') && !urlContent.startsWith('https://')) {
          return `https://${urlContent.trim()}`;
        }
        return urlContent.trim();

      case 'text':
        return textContent || 'AllToolss QR Engine';

      case 'email': {
        const queryParams = [];
        if (emailSubject) queryParams.push(`subject=${encodeURIComponent(emailSubject)}`);
        if (emailBody) queryParams.push(`body=${encodeURIComponent(emailBody)}`);
        const query = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        return `mailto:${emailTo.trim()}${query}`;
      }

      case 'phone': {
        const cleanPhone = phoneNumber.replace(/\s+/g, '');
        return `tel:${cleanPhone}`;
      }

      case 'wifi': {
        const enc = wifiEncryption;
        const pass = enc !== 'nopass' ? wifiPassword : '';
        return `WIFI:T:${enc};S:${wifiSsid};P:${pass};H:${wifiHidden};;`;
      }

      default:
        return 'AllTools Multi-Tool Suite';
    }
  };

  const rawString = getRawContent();

  // Generate QR Code
  useEffect(() => {
    let isCurrent = true;
    setIsGenerating(true);

    const generateQR = async () => {
      try {
        const opts = {
          errorCorrectionLevel: errorCorrection,
          margin: margin,
          width: resolution,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        };

        const pngUrl = await QRCode.toDataURL(rawString, opts);
        const svg = await QRCode.toString(rawString, { ...opts, type: 'svg' });

        if (isCurrent) {
          setDataUrl(pngUrl);
          setSvgString(svg);
        }
      } catch (err) {
        console.error('Error generating QR:', err);
      } finally {
        if (isCurrent) setIsGenerating(false);
      }
    };

    generateQR();

    return () => {
      isCurrent = false;
    };
  }, [rawString, fgColor, bgColor, errorCorrection, resolution, margin]);

  // Download PNG
  const downloadPng = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `qrcode_${qrType}_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download SVG
  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode_${qrType}_${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy Image to Clipboard
  const copyImage = async () => {
    if (!dataUrl) return;
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback to text copy
      navigator.clipboard.writeText(rawString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Copy SVG Code
  const copySvgCode = () => {
    if (!svgString) return;
    navigator.clipboard.writeText(svgString);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

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
              <span className="text-primary font-bold">QR Code Generator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <QrCode className="w-7 h-7" />
              </span>
              <span>QR Code Generator Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Create high-resolution, custom-styled QR codes for URLs, plain text, email messages, phone numbers, and WiFi networks with instant PNG and vector SVG export.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> 100% In-Browser Privacy
            </span>
          </div>
        </div>

        {/* Main Grid: Inputs Left, Preview & Download Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Data Types & Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* QR Type Selector Tabs */}
            <div className="p-1.5 rounded-2xl border border-border bg-card shadow-sm grid grid-cols-5 gap-1">
              {[
                { id: 'url', label: 'URL / Link', icon: Globe },
                { id: 'text', label: 'Plain Text', icon: FileText },
                { id: 'email', label: 'Email', icon: Mail },
                { id: 'phone', label: 'Phone', icon: Phone },
                { id: 'wifi', label: 'WiFi Access', icon: Wifi },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = qrType === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setQrType(tab.id as QRType)}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-primary text-primary-foreground shadow-glow-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Forms */}
            <div className="p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
              
              {/* 1. URL Mode */}
              {qrType === 'url' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Target Website / URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={urlContent}
                      onChange={(e) => setUrlContent(e.target.value)}
                      placeholder="https://example.com/mypage"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/40 text-foreground text-sm font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['https://alltools.local', 'https://google.com', 'https://wikipedia.org'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setUrlContent(s)}
                        className="px-2.5 py-1 rounded-lg bg-muted/70 hover:bg-muted text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Text Mode */}
              {qrType === 'text' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Plain Text / Notes
                  </label>
                  <textarea
                    rows={4}
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter any text, instructions, serial number, or raw data..."
                    className="w-full p-3.5 rounded-xl border border-border bg-muted/40 text-foreground text-sm font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-y"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{textContent.length} characters</span>
                    <span>Max recommended: ~1,500 chars</span>
                  </div>
                </div>
              )}

              {/* 3. Email Mode */}
              {qrType === 'email' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Recipient Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={emailTo}
                        onChange={(e) => setEmailTo(e.target.value)}
                        placeholder="contact@company.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/40 text-foreground text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Subject Line (Optional)
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Project Inquiry"
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-muted/40 text-foreground text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Message Body (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      placeholder="Write your default email message..."
                      className="w-full p-3 rounded-xl border border-border bg-muted/40 text-foreground text-sm focus:outline-none focus:border-primary resize-y"
                    />
                  </div>
                </div>
              )}

              {/* 4. Phone Mode */}
              {qrType === 'phone' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Phone Number (with Country Code)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 555 123 4567"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/40 text-foreground text-sm font-mono focus:outline-none focus:border-primary"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    When scanned on a smartphone, this will open the dialer with this phone number pre-filled.
                  </p>
                </div>
              )}

              {/* 5. WiFi Mode */}
              {qrType === 'wifi' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Network Name (SSID)
                    </label>
                    <div className="relative">
                      <Wifi className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={wifiSsid}
                        onChange={(e) => setWifiSsid(e.target.value)}
                        placeholder="MyHomeWifi_5G"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/40 text-foreground text-sm font-mono focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      WiFi Password / Security Key
                    </label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder="Enter network password"
                      disabled={wifiEncryption === 'nopass'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 text-foreground text-sm font-mono focus:outline-none focus:border-primary disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Encryption Type
                      </label>
                      <select
                        value={wifiEncryption}
                        onChange={(e) => setWifiEncryption(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-muted text-foreground text-xs font-semibold focus:outline-none focus:border-primary cursor-pointer"
                      >
                        <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                        <option value="WEP">WEP (Legacy)</option>
                        <option value="nopass">None (Open Network)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="hiddenNetwork"
                        checked={wifiHidden}
                        onChange={(e) => setWifiHidden(e.target.checked)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                      />
                      <label htmlFor="hiddenNetwork" className="text-xs font-medium text-foreground cursor-pointer">
                        Hidden Network (SSID broadcast disabled)
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customization & Appearance Panel */}
            <div className="p-5 sm:p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Customization &amp; Colors</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFgColor('#000000');
                    setBgColor('#ffffff');
                    setErrorCorrection('M');
                    setResolution(384);
                    setMargin(2);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Foreground Color */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground flex items-center justify-between">
                    <span>QR Color (Dark)</span>
                    <span className="font-mono text-[10px] uppercase">{fgColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-9 h-9 rounded-xl border border-border cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-muted/40 font-mono text-xs text-foreground"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground flex items-center justify-between">
                    <span>Background (Light)</span>
                    <span className="font-mono text-[10px] uppercase">{bgColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-9 h-9 rounded-xl border border-border cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-muted/40 font-mono text-xs text-foreground"
                    />
                  </div>
                </div>

                {/* Error Correction Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Error Correction</label>
                  <select
                    value={errorCorrection}
                    onChange={(e) => setErrorCorrection(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl border border-border bg-muted text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="L">Level L (7% recovery)</option>
                    <option value="M">Level M (15% recovery)</option>
                    <option value="Q">Level Q (25% recovery)</option>
                    <option value="H">Level H (30% High)</option>
                  </select>
                </div>

                {/* Margin */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground flex items-center justify-between">
                    <span>Quiet Zone</span>
                    <span className="font-mono text-[10px]">{margin} modules</span>
                  </label>
                  <select
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full px-2.5 py-2 rounded-xl border border-border bg-muted text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value={0}>0 (No Border)</option>
                    <option value={1}>1 (Compact)</option>
                    <option value={2}>2 (Standard)</option>
                    <option value={4}>4 (Recommended)</option>
                    <option value={6}>6 (Wide)</option>
                  </select>
                </div>
              </div>

              {/* Color Presets */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Theme Quick Palettes:
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Classic Black/White', fg: '#000000', bg: '#ffffff' },
                    { label: 'Cyber Neon', fg: '#00ffff', bg: '#0b0f19' },
                    { label: 'Matrix Emerald', fg: '#00ff66', bg: '#05140a' },
                    { label: 'Sunset Amber', fg: '#f59e0b', bg: '#1c1917' },
                    { label: 'Royal Violet', fg: '#8b5cf6', bg: '#ffffff' },
                    { label: 'Deep Blue', fg: '#1e40af', bg: '#f8fafc' },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setFgColor(p.fg);
                        setBgColor(p.bg);
                      }}
                      className="px-2.5 py-1 rounded-lg border border-border bg-muted/30 hover:bg-muted text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: p.fg }} />
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Mobile Viewfinder & Download Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Preview Card */}
            <div className="p-6 rounded-3xl border border-border bg-card shadow-xl space-y-5" style={{ backgroundColor: 'var(--card)' }}>
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Live QR Preview</h3>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground uppercase">
                  {errorCorrection}-Grade
                </span>
              </div>

              {/* Viewfinder Display Box */}
              <div className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border border-border/80 bg-muted/20 overflow-hidden min-h-[300px]">
                {dataUrl ? (
                  <div
                    className="p-3 rounded-2xl shadow-lg transition-transform duration-200 hover:scale-105"
                    style={{ backgroundColor: bgColor }}
                  >
                    <img
                      src={dataUrl}
                      alt="Generated QR Code"
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                    <span className="text-xs font-mono">Generating matrix...</span>
                  </div>
                )}

                {/* Simulated scan viewfinder corner brackets */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/60 rounded-tl pointer-events-none" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/60 rounded-tr pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/60 rounded-bl pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/60 rounded-br pointer-events-none" />
              </div>

              {/* Encoded Content Raw Readout */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border text-xs space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Encoded Payload ({rawString.length} B)
                </div>
                <div className="font-mono text-[11px] text-foreground break-all line-clamp-2 select-all">
                  {rawString}
                </div>
              </div>

              {/* Download Buttons */}
              <div className="space-y-2.5 pt-2">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={downloadPng}
                    disabled={!dataUrl}
                    className="w-full py-3 px-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={downloadSvg}
                    disabled={!svgString}
                    className="w-full py-3 px-3 rounded-xl border border-primary/40 bg-primary/10 text-primary font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download SVG</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={copyImage}
                    className="w-full py-2.5 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Image'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={copySvgCode}
                    className="w-full py-2.5 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedSvg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSvg ? 'SVG Copied!' : 'Copy SVG'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Tips & Device Compatibility */}
            <div className="p-5 rounded-2xl border border-border bg-card/60 text-xs space-y-2.5">
              <h4 className="font-bold text-foreground flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Mobile Scan Compatibility Guide</span>
              </h4>
              <ul className="space-y-1.5 text-muted-foreground list-disc pl-4 leading-relaxed">
                <li><strong>iOS Camera &amp; Android:</strong> Native camera apps decode URLs, WiFi credentials, and phone numbers directly.</li>
                <li><strong>WiFi QR:</strong> Allows instant 1-tap connection without typing long passwords.</li>
                <li><strong>Contrast:</strong> Always ensure high contrast between dark modules and light background for reliable distance scanning.</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

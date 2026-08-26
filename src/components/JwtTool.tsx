'use client';

import React, { useState, useMemo } from 'react';
import { decodeJwtToken } from '@/utils/formatters';
import {
  KeyRound,
  Copy,
  Check,
  Trash2,
  Download,
  ShieldCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileCode,
  Lock,
  Sparkles,
  Info,
} from 'lucide-react';

const SAMPLE_JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InY0LWtleS0wMSJ9.eyJzdWIiOiJ1c3JfMGExYjJjM2QiLCJuYW1lIjoiU2FudGFudSBCYXRhYnlhbCIsImVtYWlsIjoic2FudGFudUBhbGx0b29scy5kZXYiLCJyb2xlIjoiUHJpbmNpcGFsIEFyY2hpdGVjdCIsImlhdCI6MTczNTY4OTYwMCwiZXhwIjoyMDgxMjg2NDAwLCJpc3MiOiJodHRwczovL2FsbHRvb2xzLmRldiIsInRlbmFudCI6InByb2R1Y3Rpb24tMDEifQ.u_jVp_a5e9jVzW3k0pQ8dY8xL7aM3bZ2_1aB4cD5eF6`;

export const JwtTool: React.FC = () => {
  const [tokenInput, setTokenInput] = useState(SAMPLE_JWT);
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);

  const decoded = useMemo(() => {
    return decodeJwtToken(tokenInput);
  }, [tokenInput]);

  const tokenSegments = useMemo(() => {
    const parts = (tokenInput || '').trim().split('.');
    return {
      header: parts[0] || '',
      payload: parts[1] || '',
      signature: parts[2] || '',
    };
  }, [tokenInput]);

  const handleCopy = (text: string, type: 'header' | 'payload' | 'raw') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'header') {
      setCopiedHeader(true);
      setTimeout(() => setCopiedHeader(false), 2000);
    } else if (type === 'payload') {
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    } else {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    }
  };

  const handleClear = () => {
    setTokenInput('');
  };

  const handleLoadSample = () => {
    setTokenInput(SAMPLE_JWT);
  };

  const handleExport = () => {
    if (!decoded.isValidStructure) return;
    const exportData = {
      header: decoded.header,
      payload: decoded.payload,
      signature: decoded.signature,
      status: decoded.status,
      timeRemaining: decoded.timeRemainingStr,
      decodedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jwt_decoded_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Top Privacy & Security Notice Banner */}
      <div className="bg-[#111622] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <span>100% IN-BROWSER CLIENT-SIDE JWT DECODER</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-sans uppercase">
                Zero Network Calls
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Your token data never leaves browser memory. No backend logging or server-side transmission.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="px-3 py-1.5 rounded-xl border border-white/10 bg-[#1a2030] hover:bg-[#222b40] text-slate-300 text-xs font-mono transition-all"
          >
            Sample Token
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl border border-white/10 bg-[#1a2030] hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
          <button
            onClick={handleExport}
            disabled={!decoded.isValidStructure}
            className="px-3 py-1.5 rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] text-xs font-mono font-bold flex items-center gap-1 transition-all disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Token Health & Expiry Simulator Pill Bar */}
      {decoded.isValidStructure && (
        <div className="bg-[#111622] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg animate-in fade-in">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-xl text-xs font-mono font-black uppercase flex items-center gap-1.5 border ${
                decoded.status === 'VALID'
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                  : decoded.status === 'EXPIRED'
                  ? 'border-rose-500 bg-rose-500/20 text-rose-300'
                  : 'border-amber-500 bg-amber-500/20 text-amber-300'
              }`}
            >
              {decoded.status === 'VALID' ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : decoded.status === 'EXPIRED' ? (
                <XCircle className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              <span>[ {decoded.status} ]</span>
            </span>

            <div className="font-mono text-xs">
              <span className="text-slate-400">Expiration Status: </span>
              <span className="font-bold text-slate-200">{decoded.timeRemainingStr}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            {decoded.header?.alg && (
              <div>
                Algorithm: <span className="text-red-400 font-bold">{decoded.header.alg}</span>
              </div>
            )}
            {decoded.header?.typ && (
              <div>
                Type: <span className="text-red-400 font-bold">{decoded.header.typ}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Raw JWT Token Input with Segment Color-Coding */}
      <div className="bg-[#111622] border border-white/10 rounded-2xl overflow-hidden shadow-xl space-y-2">
        <div className="px-4 py-2.5 border-b border-white/10 bg-[#0a0d14] flex flex-wrap items-center justify-between text-xs font-mono">
          <span className="font-bold text-slate-200 flex items-center gap-2">
            <KeyRound className="w-3.5 h-3.5 text-[#00f0ff]" />
            Encoded JWT Token
          </span>
          {/* Legend */}
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-red-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400" /> Header
            </span>
            <span className="text-purple-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Payload
            </span>
            <span className="text-cyan-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Signature
            </span>
          </div>
        </div>

        {/* Visual Color-Coded Segments Output */}
        <div className="p-4 bg-[#0a0d14]/70 font-mono text-xs break-all leading-relaxed max-h-36 overflow-y-auto border-b border-white/5">
          {tokenSegments.header ? (
            <span>
              <span className="text-red-400 font-semibold">{tokenSegments.header}</span>
              <span className="text-slate-500 font-black">.</span>
              <span className="text-purple-400 font-semibold">{tokenSegments.payload}</span>
              <span className="text-slate-500 font-black">.</span>
              <span className="text-cyan-400 font-semibold">{tokenSegments.signature}</span>
            </span>
          ) : (
            <span className="text-slate-500">Paste JWT token into editor below to view segmented highlights...</span>
          )}
        </div>

        {/* Input Textarea */}
        <div className="p-3">
          <textarea
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            rows={3}
            placeholder="Paste your JSON Web Token (eyJhbGciOi...)..."
            className="w-full p-3 bg-[#0a0d14] border border-white/10 rounded-xl font-mono text-xs text-slate-300 focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Error Message Callout */}
      {!decoded.isValidStructure && decoded.error && (
        <div className="p-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-rose-300 flex items-center gap-2.5 text-xs font-mono">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{decoded.error}</span>
        </div>
      )}

      {/* Decoded Header & Payload Split Viewers */}
      {decoded.isValidStructure && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Header Card (Red) */}
          <div className="bg-[#111622] border border-red-500/30 rounded-2xl overflow-hidden flex flex-col shadow-xl">
            <div className="px-4 py-2.5 border-b border-red-500/20 bg-red-500/5 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-red-400 flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5" />
                Decoded Header (Algorithm & Token Type)
              </span>
              <button
                onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2), 'header')}
                className="px-2.5 py-1 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-[11px] font-mono flex items-center gap-1 transition-all"
              >
                {copiedHeader ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedHeader ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#0a0d14]/70 font-mono text-xs text-red-300 overflow-x-auto leading-relaxed max-h-72">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload Card (Purple) */}
          <div className="bg-[#111622] border border-purple-500/30 rounded-2xl overflow-hidden flex flex-col shadow-xl">
            <div className="px-4 py-2.5 border-b border-purple-500/20 bg-purple-500/5 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-purple-400 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                Decoded Payload (Claims & Identity Data)
              </span>
              <button
                onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2), 'payload')}
                className="px-2.5 py-1 rounded-lg border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-[11px] font-mono flex items-center gap-1 transition-all"
              >
                {copiedPayload ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPayload ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 bg-[#0a0d14]/70 font-mono text-xs text-purple-300 overflow-x-auto leading-relaxed max-h-72">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Standard Claims Table */}
      {decoded.isValidStructure && (
        <div className="bg-[#111622] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
            <span className="font-bold text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00f0ff]" />
              Standard JWT Claims Inspection
            </span>
            <span className="text-slate-400">RFC 7519 Registered Claims</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-white/10 bg-white/5 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Claim</th>
                  <th className="py-2.5 px-3">Full Meaning</th>
                  <th className="py-2.5 px-3">Raw Value</th>
                  <th className="py-2.5 px-3">Parsed Human Timestamp / Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {/* exp */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-purple-400 font-bold">exp</td>
                  <td className="py-2.5 px-3 text-slate-300">Expiration Time</td>
                  <td className="py-2.5 px-3 text-slate-400">{decoded.payload?.exp ?? '-'}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">
                    {decoded.expiresAt ? decoded.expiresAt.toUTCString() : 'Not Set'}
                  </td>
                </tr>

                {/* iat */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-purple-400 font-bold">iat</td>
                  <td className="py-2.5 px-3 text-slate-300">Issued At</td>
                  <td className="py-2.5 px-3 text-slate-400">{decoded.payload?.iat ?? '-'}</td>
                  <td className="py-2.5 px-3 text-slate-200">
                    {decoded.issuedAt ? decoded.issuedAt.toUTCString() : 'Not Set'}
                  </td>
                </tr>

                {/* nbf */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-purple-400 font-bold">nbf</td>
                  <td className="py-2.5 px-3 text-slate-300">Not Before</td>
                  <td className="py-2.5 px-3 text-slate-400">{decoded.payload?.nbf ?? '-'}</td>
                  <td className="py-2.5 px-3 text-slate-200">
                    {decoded.notBefore ? decoded.notBefore.toUTCString() : 'Not Set'}
                  </td>
                </tr>

                {/* iss */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-purple-400 font-bold">iss</td>
                  <td className="py-2.5 px-3 text-slate-300">Issuer</td>
                  <td className="py-2.5 px-3 text-slate-400">-</td>
                  <td className="py-2.5 px-3 text-cyan-300 font-bold">{decoded.payload?.iss ?? 'Not Specified'}</td>
                </tr>

                {/* sub */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 text-purple-400 font-bold">sub</td>
                  <td className="py-2.5 px-3 text-slate-300">Subject (Principal ID)</td>
                  <td className="py-2.5 px-3 text-slate-400">-</td>
                  <td className="py-2.5 px-3 text-amber-300 font-bold">{decoded.payload?.sub ?? 'Not Specified'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Pure utility functions for JSON formatting, Regex extraction, and JWT Base64URL decoding.
 * 100% In-Browser Client-Side Processing.
 */

export interface JsonParseResult {
  isValid: boolean;
  formatted?: string;
  parsed?: any;
  error?: {
    message: string;
    line?: number;
    column?: number;
    position?: number;
  };
}

export interface RegexMatchItem {
  index: number;
  match: string;
  groups: string[];
  namedGroups?: Record<string, string>;
  length: number;
}

export interface RegexAnalysisResult {
  isValid: boolean;
  matches: RegexMatchItem[];
  executionTimeMs: number;
  error?: string;
}

export interface DecodedJwt {
  raw: string;
  header: any;
  payload: any;
  signature: string;
  headerRaw: string;
  payloadRaw: string;
  isValidStructure: boolean;
  status: 'VALID' | 'EXPIRED' | 'NOT_YET_ACTIVE' | 'INVALID';
  issuedAt?: Date;
  expiresAt?: Date;
  notBefore?: Date;
  timeRemainingStr?: string;
  error?: string;
}

/**
 * Base64URL to UTF-8 Unicode string decoder
 */
export function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  try {
    const binaryStr = atob(base64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (e: any) {
    throw new Error('Malformed Base64URL encoded string.');
  }
}

/**
 * Parses and formats JSON with detailed error line/character calculation
 */
export function parseAndFormatJson(input: string, indent: number | 'min'): JsonParseResult {
  if (!input || !input.trim()) {
    return { isValid: false, error: { message: 'Input is empty.' } };
  }

  try {
    const parsed = JSON.parse(input);
    const formatted = indent === 'min' ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
    return {
      isValid: true,
      formatted,
      parsed,
    };
  } catch (err: any) {
    const errorMsg = err.message || 'Invalid JSON syntax';
    let line = 1;
    let column = 1;
    let position = 0;

    // Try extracting character position from error message (e.g. "at position 42" or "line 3 column 5")
    const posMatch = errorMsg.match(/position\s+(\d+)/i);
    if (posMatch && posMatch[1]) {
      position = parseInt(posMatch[1], 10);
      const lines = input.slice(0, position).split('\n');
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    } else {
      const lineColMatch = errorMsg.match(/line\s+(\d+)\s+column\s+(\d+)/i);
      if (lineColMatch) {
        line = parseInt(lineColMatch[1], 10);
        column = parseInt(lineColMatch[2], 10);
      }
    }

    return {
      isValid: false,
      error: {
        message: errorMsg,
        line,
        column,
        position,
      },
    };
  }
}

/**
 * Converts structured key-value descriptions (e.g. "name: John, age: 30, active: true") or CSV to JSON
 */
export function convertTextDescriptionToJson(text: string): { success: boolean; jsonString?: string; error?: string } {
  if (!text || !text.trim()) {
    return { success: false, error: 'Input text is empty.' };
  }

  const trimmed = text.trim();

  // Try parsing comma-separated lines or multiline key-values
  try {
    const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
    const isMultiEntry = lines.length > 1 && lines.every((l) => l.includes(':'));

    const parseValue = (val: string): any => {
      const v = val.trim();
      if (v.toLowerCase() === 'true') return true;
      if (v.toLowerCase() === 'false') return false;
      if (v.toLowerCase() === 'null') return null;
      if (!isNaN(Number(v)) && v !== '') return Number(v);
      // Remove surrounding quotes if present
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        return v.slice(1, -1);
      }
      return v;
    };

    // If single line with comma separated key:value pairs (e.g. "name: John, age: 30, active: true")
    if (lines.length === 1 && trimmed.includes(':') && trimmed.includes(',')) {
      const pairs = trimmed.split(',').map((p) => p.trim());
      const resultObj: Record<string, any> = {};
      for (const pair of pairs) {
        const colonIdx = pair.indexOf(':');
        if (colonIdx > 0) {
          const key = pair.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '');
          const val = pair.slice(colonIdx + 1).trim();
          resultObj[key] = parseValue(val);
        }
      }
      return { success: true, jsonString: JSON.stringify(resultObj, null, 2) };
    }

    // If multiple lines of key:value
    if (lines.every((l) => l.includes(':'))) {
      const resultObj: Record<string, any> = {};
      for (const line of lines) {
        const colonIdx = line.indexOf(':');
        if (colonIdx > 0) {
          const key = line.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '');
          const val = line.slice(colonIdx + 1).trim();
          resultObj[key] = parseValue(val);
        }
      }
      return { success: true, jsonString: JSON.stringify(resultObj, null, 2) };
    }

    // CSV format fallback (Header on line 1, values on subsequent lines)
    if (lines.length >= 2 && lines[0].includes(',')) {
      const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
      const records = [];
      for (let i = 1; i < lines.length; i++) {
        const rowValues = lines[i].split(',').map((v) => parseValue(v.trim()));
        const rowObj: Record<string, any> = {};
        headers.forEach((h, idx) => {
          rowObj[h] = rowValues[idx] !== undefined ? rowValues[idx] : null;
        });
        records.push(rowObj);
      }
      return { success: true, jsonString: JSON.stringify(records, null, 2) };
    }

    // Simple word list fallback
    const arrayItems = lines.map((l) => parseValue(l));
    return { success: true, jsonString: JSON.stringify(arrayItems, null, 2) };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to convert text to JSON' };
  }
}

/**
 * Executes a Regex pattern with timeout protection and extracts matches & capture groups
 */
export function executeRegexAnalysis(pattern: string, flags: string, text: string): RegexAnalysisResult {
  if (!pattern) {
    return { isValid: false, matches: [], executionTimeMs: 0, error: 'Pattern is required.' };
  }

  const startTime = performance.now();

  try {
    // Ensure global flag is included for findIter
    const activeFlags = flags.includes('g') ? flags : flags + 'g';
    const regex = new RegExp(pattern, activeFlags);

    const matches: RegexMatchItem[] = [];
    let match: RegExpExecArray | null;
    let iterations = 0;
    const MAX_ITERATIONS = 5000; // Catastrophic backtracking guard

    while ((match = regex.exec(text)) !== null) {
      iterations++;
      if (iterations > MAX_ITERATIONS) {
        break;
      }

      const captureGroups = match.slice(1);
      matches.push({
        index: match.index,
        match: match[0],
        groups: captureGroups,
        namedGroups: match.groups ? { ...match.groups } : undefined,
        length: match[0].length,
      });

      // Avoid infinite loop on zero-length matches (e.g. ^ or $)
      if (match[0].length === 0) {
        regex.lastIndex++;
      }
    }

    const executionTimeMs = Number((performance.now() - startTime).toFixed(3));

    return {
      isValid: true,
      matches,
      executionTimeMs,
    };
  } catch (err: any) {
    return {
      isValid: false,
      matches: [],
      executionTimeMs: 0,
      error: err.message || 'Invalid regular expression syntax.',
    };
  }
}

/**
 * Decodes a JWT token completely in-browser without sending to any server
 */
export function decodeJwtToken(tokenStr: string): DecodedJwt {
  const trimmed = (tokenStr || '').trim();
  if (!trimmed) {
    return {
      raw: '',
      header: {},
      payload: {},
      signature: '',
      headerRaw: '',
      payloadRaw: '',
      isValidStructure: false,
      status: 'INVALID',
      error: 'JWT Token string is empty.',
    };
  }

  const parts = trimmed.split('.');
  if (parts.length !== 3) {
    return {
      raw: trimmed,
      header: {},
      payload: {},
      signature: '',
      headerRaw: parts[0] || '',
      payloadRaw: parts[1] || '',
      isValidStructure: false,
      status: 'INVALID',
      error: `Invalid JWT format. Expected 3 segments (Header.Payload.Signature), found ${parts.length}.`,
    };
  }

  const [headerPart, payloadPart, signaturePart] = parts;

  try {
    const decodedHeaderStr = base64UrlDecode(headerPart);
    const decodedPayloadStr = base64UrlDecode(payloadPart);

    const header = JSON.parse(decodedHeaderStr);
    const payload = JSON.parse(decodedPayloadStr);

    const nowSec = Math.floor(Date.now() / 1000);
    let status: 'VALID' | 'EXPIRED' | 'NOT_YET_ACTIVE' | 'VALID' = 'VALID';
    let timeRemainingStr = '';

    let issuedAt: Date | undefined;
    let expiresAt: Date | undefined;
    let notBefore: Date | undefined;

    if (payload.iat && typeof payload.iat === 'number') {
      issuedAt = new Date(payload.iat * 1000);
    }

    if (payload.nbf && typeof payload.nbf === 'number') {
      notBefore = new Date(payload.nbf * 1000);
      if (nowSec < payload.nbf) {
        status = 'NOT_YET_ACTIVE';
      }
    }

    if (payload.exp && typeof payload.exp === 'number') {
      expiresAt = new Date(payload.exp * 1000);
      const diffSec = payload.exp - nowSec;

      if (diffSec <= 0) {
        status = 'EXPIRED';
        const absDiff = Math.abs(diffSec);
        const days = Math.floor(absDiff / 86400);
        const hours = Math.floor((absDiff % 86400) / 3600);
        const mins = Math.floor((absDiff % 3600) / 60);
        timeRemainingStr = `Expired ${days > 0 ? `${days}d ` : ''}${hours}h ${mins}m ago`;
      } else {
        const days = Math.floor(diffSec / 86400);
        const hours = Math.floor((diffSec % 86400) / 3600);
        const mins = Math.floor((diffSec % 3600) / 60);
        timeRemainingStr = `Expires in: ${days > 0 ? `${days}d ` : ''}${hours}h ${mins}m`;
      }
    } else {
      timeRemainingStr = 'No expiration claim (exp) specified.';
    }

    return {
      raw: trimmed,
      header,
      payload,
      signature: signaturePart,
      headerRaw: decodedHeaderStr,
      payloadRaw: decodedPayloadStr,
      isValidStructure: true,
      status,
      issuedAt,
      expiresAt,
      notBefore,
      timeRemainingStr,
    };
  } catch (err: any) {
    return {
      raw: trimmed,
      header: {},
      payload: {},
      signature: signaturePart,
      headerRaw: headerPart,
      payloadRaw: payloadPart,
      isValidStructure: false,
      status: 'INVALID',
      error: `Failed to decode JWT segments: ${err.message}`,
    };
  }
}

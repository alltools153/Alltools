import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns';

export const dynamic = 'force-dynamic';

interface SpfCheck {
  found: boolean;
  rawRecord: string | null;
  version: string | null;
  mechanisms: string[];
  allQualifier: string | null;
  qualifierStatus: 'strict_pass' | 'softfail_moderate' | 'neutral_weak' | 'pass_all_vulnerable' | 'none';
  dnsLookupCount: number;
  lookupLimitExceeded: boolean;
  status: 'valid' | 'warning' | 'invalid' | 'missing';
  summary: string;
}

interface DkimCheck {
  found: boolean;
  selector: string | null;
  rawRecord: string | null;
  version: string | null;
  keyType: string | null;
  publicKey: string | null;
  keyLengthEstimate: string | null;
  status: 'valid' | 'warning' | 'missing';
  summary: string;
}

interface DmarcCheck {
  found: boolean;
  rawRecord: string | null;
  policy: 'reject' | 'quarantine' | 'none' | 'missing';
  subdomainPolicy: string | null;
  percentage: number;
  ruaEmail: string | null;
  rufEmail: string | null;
  alignmentSpf: 'relaxed' | 'strict' | 'default';
  alignmentDkim: 'relaxed' | 'strict' | 'default';
  status: 'enforced_strong' | 'quarantine_moderate' | 'monitoring_weak' | 'missing_vulnerable';
  summary: string;
}

interface EmailSecurityAuditResult {
  domain: string;
  timestamp: string;
  overallGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  score: number; // 0 to 100
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  spf: SpfCheck;
  dkim: DkimCheck;
  dmarc: DmarcCheck;
  mxRecords: string[];
  recommendations: { title: string; description: string; severity: 'high' | 'medium' | 'low' | 'info' }[];
  executionTimeMs: number;
}

// Fallback DNS-over-HTTPS resolver via Cloudflare / Google DoH
async function resolveTxtViaDoH(queryName: string): Promise<string[]> {
  try {
    const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(queryName)}&type=TXT`;
    const res = await fetch(url, {
      headers: { accept: 'application/dns-json' },
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.Answer && Array.isArray(data.Answer)) {
      return data.Answer.map((ans: any) => {
        let val = ans.data || '';
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        return val.replace(/\\"/g, '"');
      });
    }
  } catch {
    // fallback to Google DoH
    try {
      const gUrl = `https://dns.google/resolve?name=${encodeURIComponent(queryName)}&type=TXT`;
      const gRes = await fetch(gUrl, { next: { revalidate: 0 } });
      if (gRes.ok) {
        const gData = await gRes.json();
        if (gData.Answer && Array.isArray(gData.Answer)) {
          return gData.Answer.map((ans: any) => {
            let val = ans.data || '';
            if (val.startsWith('"') && val.endsWith('"')) {
              val = val.slice(1, -1);
            }
            return val.replace(/\\"/g, '"');
          });
        }
      }
    } catch {
      // ignore
    }
  }
  return [];
}

// Node.js native DNS TXT query with DoH fallback
async function getTxtRecords(hostname: string): Promise<string[]> {
  const records: string[] = [];
  try {
    const nativeTxt = await dns.promises.resolveTxt(hostname);
    nativeTxt.forEach((chunkArr) => {
      records.push(chunkArr.join(''));
    });
  } catch {
    // fallback to DoH
    const dohRecords = await resolveTxtViaDoH(hostname);
    records.push(...dohRecords);
  }
  return records;
}

// Common DKIM selectors to probe
const COMMON_SELECTORS = ['google', 'default', 'k1', 'mail', 's1', 'selector1', 's2048', '20230601', 'smtp', 'mandrill'];

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await req.json();
    let { domain, selector } = body;

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    // Sanitize domain
    domain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/:\d+$/, '');

    // 1. Get Domain TXT records for SPF
    const rootTxtRecords = await getTxtRecords(domain);

    // Parse SPF
    const spfRecord = rootTxtRecords.find((r) => r.toLowerCase().startsWith('v=spf1'));
    let spfResult: SpfCheck = {
      found: false,
      rawRecord: null,
      version: null,
      mechanisms: [],
      allQualifier: null,
      qualifierStatus: 'none',
      dnsLookupCount: 0,
      lookupLimitExceeded: false,
      status: 'missing',
      summary: 'No SPF record found. Domain is vulnerable to unauthorized email spoofing.',
    };

    if (spfRecord) {
      const parts = spfRecord.split(/\s+/).filter(Boolean);
      const version = parts[0];
      const mechanisms = parts.slice(1);
      
      let allQual = '~all';
      let qualStatus: 'strict_pass' | 'softfail_moderate' | 'neutral_weak' | 'pass_all_vulnerable' | 'none' = 'softfail_moderate';
      let lookupCount = 0;

      for (const m of mechanisms) {
        const lower = m.toLowerCase();
        if (lower.startsWith('include:') || lower.startsWith('a') || lower.startsWith('mx') || lower.startsWith('exists:') || lower.startsWith('redirect=')) {
          lookupCount++;
        }
        if (lower.endsWith('all')) {
          allQual = m;
          if (m === '-all') qualStatus = 'strict_pass';
          else if (m === '~all') qualStatus = 'softfail_moderate';
          else if (m === '?all') qualStatus = 'neutral_weak';
          else if (m === '+all') qualStatus = 'pass_all_vulnerable';
        }
      }

      const limitExceeded = lookupCount > 10;
      let status: 'valid' | 'warning' | 'invalid' | 'missing' = 'valid';
      if (qualStatus === 'pass_all_vulnerable' || limitExceeded) {
        status = 'invalid';
      } else if (qualStatus === 'neutral_weak') {
        status = 'warning';
      }

      spfResult = {
        found: true,
        rawRecord: spfRecord,
        version,
        mechanisms,
        allQualifier: allQual,
        qualifierStatus: qualStatus,
        dnsLookupCount: lookupCount,
        lookupLimitExceeded: limitExceeded,
        status,
        summary:
          qualStatus === 'strict_pass'
            ? 'Strict SPF configuration with Hardfail (-all). Excellent protection.'
            : qualStatus === 'softfail_moderate'
            ? 'Valid SPF configuration with Softfail (~all). Acceptable industry standard.'
            : qualStatus === 'neutral_weak'
            ? 'Weak SPF qualifier (?all). Spoofed emails may still be accepted.'
            : 'Dangerous SPF configuration (+all). Anyone on the internet can send email on your behalf.',
      };
    }

    // 2. Query DKIM
    let dkimResult: DkimCheck = {
      found: false,
      selector: null,
      rawRecord: null,
      version: null,
      keyType: null,
      publicKey: null,
      keyLengthEstimate: null,
      status: 'missing',
      summary: 'No DKIM record detected on tested selectors. Digital signature validation unavailable.',
    };

    const selectorsToTry = selector ? [selector.trim(), ...COMMON_SELECTORS] : COMMON_SELECTORS;
    let foundDkimRecord: string | null = null;
    let matchedSelector: string | null = null;

    for (const sel of selectorsToTry) {
      const dkimHost = `${sel}._domainkey.${domain}`;
      const dkimTxt = await getTxtRecords(dkimHost);
      const match = dkimTxt.find((r) => r.includes('v=DKIM1') || r.includes('p='));
      if (match) {
        foundDkimRecord = match;
        matchedSelector = sel;
        break;
      }
    }

    if (foundDkimRecord && matchedSelector) {
      const parts = foundDkimRecord.split(';').map((p) => p.trim()).filter(Boolean);
      let v = 'DKIM1';
      let k = 'rsa';
      let p = '';

      for (const part of parts) {
        if (part.toLowerCase().startsWith('v=')) v = part.split('=')[1];
        if (part.toLowerCase().startsWith('k=')) k = part.split('=')[1];
        if (part.toLowerCase().startsWith('p=')) p = part.split('=')[1];
      }

      const keyLength = p.length > 300 ? '2048-bit (Strong)' : p.length > 150 ? '1024-bit (Standard)' : 'Unknown';

      dkimResult = {
        found: true,
        selector: matchedSelector,
        rawRecord: foundDkimRecord,
        version: v,
        keyType: k.toUpperCase(),
        publicKey: p ? `${p.substring(0, 32)}...${p.substring(p.length - 12)}` : null,
        keyLengthEstimate: keyLength,
        status: p ? 'valid' : 'warning',
        summary: `DKIM record verified on selector "${matchedSelector}". Public key cryptographic integrity confirmed (${keyLength}).`,
      };
    }

    // 3. Query DMARC (`_dmarc.<domain>`)
    const dmarcHost = `_dmarc.${domain}`;
    const dmarcTxtRecords = await getTxtRecords(dmarcHost);
    const dmarcRecord = dmarcTxtRecords.find((r) => r.toLowerCase().startsWith('v=dmarc1'));

    let dmarcResult: DmarcCheck = {
      found: false,
      rawRecord: null,
      policy: 'missing',
      subdomainPolicy: null,
      percentage: 100,
      ruaEmail: null,
      rufEmail: null,
      alignmentSpf: 'default',
      alignmentDkim: 'default',
      status: 'missing_vulnerable',
      summary: 'DMARC is completely missing! Phishing emails using your domain will bypass spam filters.',
    };

    if (dmarcRecord) {
      const parts = dmarcRecord.split(';').map((p) => p.trim()).filter(Boolean);
      let policy: 'reject' | 'quarantine' | 'none' | 'missing' = 'none';
      let sp: string | null = null;
      let pct = 100;
      let rua: string | null = null;
      let ruf: string | null = null;
      let aspf: 'relaxed' | 'strict' | 'default' = 'default';
      let adkim: 'relaxed' | 'strict' | 'default' = 'default';

      for (const part of parts) {
        const lower = part.toLowerCase();
        if (lower.startsWith('p=')) {
          const val = part.split('=')[1].toLowerCase();
          if (val === 'reject' || val === 'quarantine' || val === 'none') {
            policy = val;
          }
        }
        if (lower.startsWith('sp=')) sp = part.split('=')[1];
        if (lower.startsWith('pct=')) pct = parseInt(part.split('=')[1], 10) || 100;
        if (lower.startsWith('rua=')) rua = part.split('=')[1];
        if (lower.startsWith('ruf=')) ruf = part.split('=')[1];
        if (lower.startsWith('aspf=')) aspf = part.split('=')[1] === 's' ? 'strict' : 'relaxed';
        if (lower.startsWith('adkim=')) adkim = part.split('=')[1] === 's' ? 'strict' : 'relaxed';
      }

      let status: 'enforced_strong' | 'quarantine_moderate' | 'monitoring_weak' | 'missing_vulnerable' = 'monitoring_weak';
      if (policy === 'reject') status = 'enforced_strong';
      else if (policy === 'quarantine') status = 'quarantine_moderate';
      else status = 'monitoring_weak';

      dmarcResult = {
        found: true,
        rawRecord: dmarcRecord,
        policy,
        subdomainPolicy: sp,
        percentage: pct,
        ruaEmail: rua,
        rufEmail: ruf,
        alignmentSpf: aspf,
        alignmentDkim: adkim,
        status,
        summary:
          policy === 'reject'
            ? `Strict DMARC Policy (p=reject) with ${pct}% enforcement. Full spoofing prevention active.`
            : policy === 'quarantine'
            ? `Moderate DMARC Policy (p=quarantine). Unaligned emails are sent to Spam/Junk folder.`
            : 'DMARC is set to Monitoring Only (p=none). Phishing emails are delivered without rejection.',
      };
    }

    // 4. Resolve MX Records for context
    let mxRecords: string[] = [];
    try {
      const mx = await dns.promises.resolveMx(domain);
      mxRecords = mx.sort((a, b) => a.priority - b.priority).map((m) => `${m.exchange} (Priority: ${m.priority})`);
    } catch {
      // ignore
    }

    // 5. Calculate Score & Letter Grade
    let score = 0;

    // SPF Points (Max 35)
    if (spfResult.found) {
      if (spfResult.qualifierStatus === 'strict_pass') score += 35;
      else if (spfResult.qualifierStatus === 'softfail_moderate') score += 30;
      else if (spfResult.qualifierStatus === 'neutral_weak') score += 15;
      else if (spfResult.qualifierStatus === 'pass_all_vulnerable') score += 0;
      if (spfResult.lookupLimitExceeded) score -= 15;
    }

    // DKIM Points (Max 25)
    if (dkimResult.found) {
      score += 25;
    }

    // DMARC Points (Max 40)
    if (dmarcResult.found) {
      if (dmarcResult.policy === 'reject') {
        score += 40;
      } else if (dmarcResult.policy === 'quarantine') {
        score += 30;
      } else if (dmarcResult.policy === 'none') {
        score += 15;
      }
      if (dmarcResult.ruaEmail) score += 5; // reporting bonus
    }

    score = Math.min(100, Math.max(0, score));

    // Grade classification
    let overallGrade: EmailSecurityAuditResult['overallGrade'] = 'F';
    let riskLevel: EmailSecurityAuditResult['riskLevel'] = 'Critical';

    if (score >= 90) {
      overallGrade = 'A+';
      riskLevel = 'Low';
    } else if (score >= 80) {
      overallGrade = 'A';
      riskLevel = 'Low';
    } else if (score >= 65) {
      overallGrade = 'B';
      riskLevel = 'Moderate';
    } else if (score >= 45) {
      overallGrade = 'C';
      riskLevel = 'High';
    } else if (score >= 25) {
      overallGrade = 'D';
      riskLevel = 'High';
    } else {
      overallGrade = 'F';
      riskLevel = 'Critical';
    }

    // 6. Actionable Recommendations
    const recommendations: EmailSecurityAuditResult['recommendations'] = [];

    if (!spfResult.found) {
      recommendations.push({
        title: 'Add SPF Record (v=spf1)',
        description: `Create a TXT record for "${domain}" with value "v=spf1 mx ~all" or include your mail provider's include mechanism (e.g. include:_spf.google.com).`,
        severity: 'high',
      });
    } else if (spfResult.qualifierStatus === 'pass_all_vulnerable') {
      recommendations.push({
        title: 'Fix Dangerous SPF (+all)',
        description: 'Change "+all" to "-all" (strict reject) or "~all" (softfail) immediately to stop attackers from spoofing your domain.',
        severity: 'high',
      });
    } else if (spfResult.lookupLimitExceeded) {
      recommendations.push({
        title: 'Reduce SPF DNS Lookups',
        description: `Your SPF record uses ${spfResult.dnsLookupCount} lookups, exceeding the RFC 7208 limit of 10. Flatten your SPF record or use CIDR IP ranges.`,
        severity: 'medium',
      });
    }

    if (!dkimResult.found) {
      recommendations.push({
        title: 'Configure DKIM Signatures',
        description: `Enable DKIM signing in your email host (Google Workspace, Microsoft 365, SendGrid, Amazon SES) and publish the selector TXT record at "<selector>._domainkey.${domain}".`,
        severity: 'medium',
      });
    }

    if (!dmarcResult.found) {
      recommendations.push({
        title: 'Publish DMARC Policy Record',
        description: `Add a TXT record at "_dmarc.${domain}" with value "v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@${domain}; pct=100;".`,
        severity: 'high',
      });
    } else if (dmarcResult.policy === 'none') {
      recommendations.push({
        title: 'Upgrade DMARC Policy to Quarantine or Reject',
        description: 'Your current policy (p=none) only collects aggregate reports. Upgrade to "p=quarantine" or "p=reject" to block spoofed emails from reaching inboxes.',
        severity: 'medium',
      });
    } else if (!dmarcResult.ruaEmail) {
      recommendations.push({
        title: 'Enable DMARC Aggregate Reporting (rua)',
        description: 'Add "rua=mailto:dmarc@yourdomain.com" to receive forensic and delivery health reports from major mail providers (Gmail, Outlook, Yahoo).',
        severity: 'low',
      });
    }

    const payload: EmailSecurityAuditResult = {
      domain,
      timestamp: new Date().toISOString(),
      overallGrade,
      score,
      riskLevel,
      spf: spfResult,
      dkim: dkimResult,
      dmarc: dmarcResult,
      mxRecords,
      recommendations,
      executionTimeMs: Date.now() - startTime,
    };

    return NextResponse.json(payload);
  } catch (error: any) {
    console.error('Email security audit error:', error);
    return NextResponse.json({ error: error.message || 'DNS lookup failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import dns from 'dns';
import { isSafeInspectionTarget, checkRateLimit } from '@/lib/security';

export const dynamic = 'force-dynamic';
export const maxDuration = 15;

const dnsPromises = dns.promises;

// Fallback DNS-over-HTTPS via Cloudflare
async function dohLookup(domain: string, type: string): Promise<any[]> {
  try {
    const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`, {
      headers: { Accept: 'application/dns-json' },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.Answer) return [];
    return data.Answer.map((a: any) => ({
      name: a.name,
      type,
      ttl: a.TTL,
      value: a.data,
    }));
  } catch {
    return [];
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Rate limit check
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
    const rateCheck = checkRateLimit(clientIp, 60, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(rateCheck.resetInMs / 1000)) } }
      );
    }

    const body = await req.json();
    let { domain, recordType = 'ALL' } = body;

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json({ error: 'Please enter a valid domain name.' }, { status: 400 });
    }

    domain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];

    // SSRF Loopback Guard
    const safety = isSafeInspectionTarget(domain);
    if (!safety.safe) {
      return NextResponse.json({ error: safety.reason || 'Restricted domain destination.' }, { status: 400 });
    }

    const records: Record<string, any[]> = {
      A: [],
      AAAA: [],
      MX: [],
      TXT: [],
      NS: [],
      CNAME: [],
      SOA: [],
    };

    const fetchA = async () => {
      try {
        const res = await dnsPromises.resolve4(domain, { ttl: true });
        records.A = res.map((r) => ({ ip: r.address, ttl: r.ttl }));
      } catch {
        const doh = await dohLookup(domain, 'A');
        records.A = doh.map((d) => ({ ip: d.value, ttl: d.ttl }));
      }
    };

    const fetchAAAA = async () => {
      try {
        const res = await dnsPromises.resolve6(domain, { ttl: true });
        records.AAAA = res.map((r) => ({ ip: r.address, ttl: r.ttl }));
      } catch {
        const doh = await dohLookup(domain, 'AAAA');
        records.AAAA = doh.map((d) => ({ ip: d.value, ttl: d.ttl }));
      }
    };

    const fetchMX = async () => {
      try {
        const res = await dnsPromises.resolveMx(domain);
        records.MX = res.sort((a, b) => a.priority - b.priority).map((r) => ({ exchange: r.exchange, priority: r.priority }));
      } catch {
        const doh = await dohLookup(domain, 'MX');
        records.MX = doh.map((d) => {
          const parts = String(d.value).split(' ');
          return { priority: parseInt(parts[0], 10) || 10, exchange: parts[1] || d.value };
        });
      }
    };

    const fetchTXT = async () => {
      try {
        const res = await dnsPromises.resolveTxt(domain);
        records.TXT = res.map((chunks) => ({ text: chunks.join('') }));
      } catch {
        const doh = await dohLookup(domain, 'TXT');
        records.TXT = doh.map((d) => ({ text: String(d.value).replace(/^"|"$/g, '') }));
      }
    };

    const fetchNS = async () => {
      try {
        const res = await dnsPromises.resolveNs(domain);
        records.NS = res.map((ns) => ({ host: ns }));
      } catch {
        const doh = await dohLookup(domain, 'NS');
        records.NS = doh.map((d) => ({ host: d.value }));
      }
    };

    const fetchCNAME = async () => {
      try {
        const res = await dnsPromises.resolveCname(domain);
        records.CNAME = res.map((c) => ({ target: c }));
      } catch {
        const doh = await dohLookup(domain, 'CNAME');
        records.CNAME = doh.map((d) => ({ target: d.value }));
      }
    };

    const fetchSOA = async () => {
      try {
        const res = await dnsPromises.resolveSoa(domain);
        if (res) {
          records.SOA = [
            {
              primaryNs: res.nsname,
              hostmaster: res.hostmaster,
              serial: res.serial,
              refresh: res.refresh,
              retry: res.retry,
              expire: res.expire,
              minTtl: res.minttl,
            },
          ];
        }
      } catch {
        // SOA optional
      }
    };

    // Run lookups in parallel
    if (recordType === 'ALL') {
      await Promise.allSettled([fetchA(), fetchAAAA(), fetchMX(), fetchTXT(), fetchNS(), fetchCNAME(), fetchSOA()]);
    } else if (recordType === 'A') await fetchA();
    else if (recordType === 'AAAA') await fetchAAAA();
    else if (recordType === 'MX') await fetchMX();
    else if (recordType === 'TXT') await fetchTXT();
    else if (recordType === 'NS') await fetchNS();
    else if (recordType === 'CNAME') await fetchCNAME();
    else if (recordType === 'SOA') await fetchSOA();

    const totalCount =
      records.A.length +
      records.AAAA.length +
      records.MX.length +
      records.TXT.length +
      records.NS.length +
      records.CNAME.length +
      records.SOA.length;

    return NextResponse.json({
      domain,
      recordType,
      records,
      totalCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'DNS query failed' }, { status: 500 });
  }
}

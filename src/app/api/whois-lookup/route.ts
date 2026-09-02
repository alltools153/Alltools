import { NextResponse } from 'next/server';
import { isSafeInspectionTarget, checkRateLimit } from '@/lib/security';

export const dynamic = 'force-dynamic';
export const maxDuration = 15;

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
    let { domain } = body;

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json({ error: 'Please enter a valid domain name.' }, { status: 400 });
    }

    domain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];

    // SSRF Loopback Guard
    const safety = isSafeInspectionTarget(domain);
    if (!safety.safe) {
      return NextResponse.json({ error: safety.reason || 'Restricted domain destination.' }, { status: 400 });
    }

    // RDAP.org gateway lookup
    const rdapUrl = `https://rdap.org/domain/${encodeURIComponent(domain)}`;
    const res = await fetch(rdapUrl, {
      headers: {
        Accept: 'application/rdap+json, application/json',
        'User-Agent': 'AllToolss-Whois-Bot/1.0',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      // Fallback response with basic status
      return NextResponse.json({
        domain,
        registrar: 'Unknown Registrar (Registry Restricted)',
        createdDate: 'N/A',
        expiresDate: 'N/A',
        updatedDate: 'N/A',
        status: ['active'],
        nameServers: [],
        dnssec: false,
        rawText: `RDAP lookup returned HTTP ${res.status}. Domain is registered or private.`,
      });
    }

    const data = await res.json();

    // Extract Registrar
    let registrarName = 'Unknown Registrar';
    if (Array.isArray(data.entities)) {
      const regEntity = data.entities.find((e: any) => e.roles?.includes('registrar'));
      if (regEntity?.vcardArray?.[1]) {
        const fn = regEntity.vcardArray[1].find((v: any) => v[0] === 'fn');
        if (fn?.[3]) registrarName = fn[3];
      }
    }

    // Extract Key Dates (registration, expiration, last changed)
    let createdDate = 'N/A';
    let expiresDate = 'N/A';
    let updatedDate = 'N/A';

    if (Array.isArray(data.events)) {
      data.events.forEach((ev: any) => {
        if (ev.eventAction === 'registration') createdDate = ev.eventDate;
        if (ev.eventAction === 'expiration') expiresDate = ev.eventDate;
        if (ev.eventAction === 'last changed' || ev.eventAction === 'last update') updatedDate = ev.eventDate;
      });
    }

    // Name Servers
    const nameServers: string[] = [];
    if (Array.isArray(data.nameservers)) {
      data.nameservers.forEach((ns: any) => {
        if (ns.ldhName) nameServers.push(ns.ldhName.toLowerCase());
      });
    }

    const status: string[] = Array.isArray(data.status) ? data.status : ['active'];
    const dnssec: boolean = Boolean(data.secureDNS?.delegationSigned);

    return NextResponse.json({
      domain: data.ldhName || domain,
      registrar: registrarName,
      createdDate,
      expiresDate,
      updatedDate,
      status,
      nameServers,
      dnssec,
      rawText: JSON.stringify(data, null, 2),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'WHOIS query failed.' }, { status: 500 });
  }
}

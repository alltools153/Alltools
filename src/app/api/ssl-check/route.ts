import { NextResponse } from 'next/server';
import tls from 'tls';
import { URL } from 'url';
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
      return NextResponse.json({ error: 'Please provide a valid domain name.' }, { status: 400 });
    }

    // Clean domain (strip http://, https://, paths, ports)
    domain = domain.trim().toLowerCase();
    if (domain.startsWith('http://') || domain.startsWith('https://')) {
      try {
        const parsed = new URL(domain);
        domain = parsed.hostname;
      } catch {
        domain = domain.replace(/^https?:\/\//, '').split('/')[0];
      }
    } else {
      domain = domain.split('/')[0].split(':')[0];
    }

    // SSRF Loopback Guard
    const safety = isSafeInspectionTarget(domain);
    if (!safety.safe) {
      return NextResponse.json({ error: safety.reason || 'Restricted domain destination.' }, { status: 400 });
    }

    return new Promise<NextResponse>((resolve) => {
      const port = 443;
      const socket = tls.connect(
        {
          host: domain,
          port,
          servername: domain,
          rejectUnauthorized: false, // passive inspection so we can report self-signed/expired certs
          timeout: 8000,
        },
        () => {
          try {
            const cert = socket.getPeerCertificate(true);
            const cipher = socket.getCipher();
            const protocol = socket.getProtocol();
            const authorized = socket.authorized;
            const authError = socket.authorizationError;

            socket.destroy();

            if (!cert || Object.keys(cert).length === 0) {
              return resolve(
                NextResponse.json({ error: `No SSL certificate could be retrieved for ${domain}.` }, { status: 404 })
              );
            }

            const validFrom = cert.valid_from ? new Date(cert.valid_from).toISOString() : '';
            const validTo = cert.valid_to ? new Date(cert.valid_to).toISOString() : '';

            const now = Date.now();
            const expiryTime = new Date(cert.valid_to).getTime();
            const daysRemaining = Math.ceil((expiryTime - now) / (1000 * 60 * 60 * 24));
            const isExpired = daysRemaining <= 0;
            const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 30;

            const sanList = cert.subjectaltname
              ? cert.subjectaltname.split(', ').map((s: string) => s.replace(/^DNS:/, ''))
              : [];

            let grade = 'A';
            if (isExpired) grade = 'F';
            else if (!authorized) grade = 'B';
            else if (isExpiringSoon) grade = 'B+';
            else if (protocol === 'TLSv1.3') grade = 'A+';

            return resolve(
              NextResponse.json({
                domain,
                isValid: authorized && !isExpired,
                isExpired,
                isExpiringSoon,
                daysRemaining,
                grade,
                subject: {
                  commonName: cert.subject?.CN || domain,
                  organization: cert.subject?.O || 'N/A',
                  country: cert.subject?.C || 'N/A',
                },
                issuer: {
                  commonName: cert.issuer?.CN || 'Unknown CA',
                  organization: cert.issuer?.O || 'Unknown Authority',
                  country: cert.issuer?.C || 'N/A',
                },
                validFrom,
                validTo,
                sans: sanList.slice(0, 20),
                sanCount: sanList.length,
                serialNumber: cert.serialNumber || 'N/A',
                fingerprint256: cert.fingerprint256 || cert.fingerprint || 'N/A',
                protocol: protocol || 'TLSv1.3',
                cipherName: cipher?.name || 'N/A',
                cipherVersion: cipher?.version || 'N/A',
                authorizationError: authError ? String(authError) : null,
              })
            );
          } catch (err: any) {
            socket.destroy();
            return resolve(
              NextResponse.json({ error: `Failed to analyze certificate: ${err.message}` }, { status: 500 })
            );
          }
        }
      );

      socket.on('error', (err) => {
        socket.destroy();
        return resolve(
          NextResponse.json(
            { error: `SSL connection to ${domain}:443 failed: ${err.message}` },
            { status: 502 }
          )
        );
      });

      socket.on('timeout', () => {
        socket.destroy();
        return resolve(
          NextResponse.json(
            { error: `Connection to ${domain}:443 timed out after 8 seconds.` },
            { status: 504 }
          )
        );
      });
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

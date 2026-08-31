import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'AllTools';
    const description = searchParams.get('desc') || 'Enterprise Developer, Security, PDF, Finance & AI Utilities';
    const category = searchParams.get('cat') || 'Multi-Tool Platform';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#090d16',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #1e293b 0%, #090d16 100%)',
            padding: '60px 70px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Ambient Glows */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-5%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0,0,0,0) 70%)',
            }}
          />

          {/* Top Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #38bdf8 0%, #10b981 100%)',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '26px',
                  boxShadow: '0 8px 24px rgba(56, 189, 248, 0.3)',
                }}
              >
                🛠
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '28px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.03em' }}>
                  AllTools
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Unified SaaS Suite
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 20px',
                borderRadius: '9999px',
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                fontSize: '14px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {category}
            </div>
          </div>

          {/* Middle Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '950px' }}>
            <h1
              style={{
                fontSize: title.length > 32 ? '48px' : '56px',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                margin: 0,
                textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '22px',
                color: '#cbd5e1',
                lineHeight: 1.45,
                margin: 0,
                fontWeight: 400,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </p>
          </div>

          {/* Bottom Footer Tags */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ fontSize: '15px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✓ 100% In-Server Processing
              </span>
              <span style={{ fontSize: '15px', color: '#38bdf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✓ Zero Cloud SaaS Dependency
              </span>
              <span style={{ fontSize: '15px', color: '#a855f7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                ✓ Mobile &amp; Desktop Optimized
              </span>
            </div>

            <div style={{ fontSize: '16px', color: '#64748b', fontWeight: 600 }}>
              alltools.dev
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}

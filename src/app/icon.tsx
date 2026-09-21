import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #38bdf8 0%, #10b981 100%)',
          color: '#041018',
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: '-0.06em',
        }}
      >
        A
      </div>
    ),
    { ...size }
  );
}

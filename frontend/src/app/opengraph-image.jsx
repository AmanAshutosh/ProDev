import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ProDev — Developer Career Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #2d1b8a 0%, #4834d4 40%, #6c63ff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 360, height: 360, borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 260, height: 260, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', top: 40, left: 40,
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          display: 'flex',
        }} />

        {/* Logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
          <div style={{ fontSize: 64 }}>💼</div>
          <div style={{
            fontSize: 68, fontWeight: 800, color: 'white',
            letterSpacing: '-2px', lineHeight: 1,
          }}>ProDev</div>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 30, color: 'rgba(255,255,255,0.85)',
          fontWeight: 600, marginBottom: 48, textAlign: 'center',
          maxWidth: 700,
        }}>
          Developer Career Platform
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['150+ Coding Topics', 'Interview Prep', 'AI Resume Optimizer', 'Free Forever'].map(tag => (
            <div key={tag} style={{
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 100,
              padding: '12px 28px',
              color: 'white',
              fontSize: 22,
              fontWeight: 600,
              display: 'flex',
            }}>{tag}</div>
          ))}
        </div>

        {/* Bottom stat row */}
        <div style={{
          position: 'absolute', bottom: 40,
          display: 'flex', gap: 48, color: 'rgba(255,255,255,0.6)',
          fontSize: 18,
        }}>
          <span>Frontend · Backend · DSA · DevOps · System Design</span>
        </div>
      </div>
    ),
    { ...size }
  )
}

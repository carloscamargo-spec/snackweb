import { useState, useEffect } from 'react';

interface Props {
  src: string;
  className: string;
  fallbackBg: string;
  fallbackLabel: string;
  posterGradient?: string;
}

export default function MediaWithFallback({ src, className, fallbackBg, fallbackLabel, posterGradient }: Props) {
  const [status, setStatus] = useState<'probing' | 'ok' | 'missing'>('probing');

  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: 'HEAD' })
      .then((r) => { if (!cancelled) setStatus(r.ok ? 'ok' : 'missing'); })
      .catch(() => { if (!cancelled) setStatus('missing'); });
    return () => { cancelled = true; };
  }, [src]);

  if (status !== 'ok') {
    return (
      <div
        className={className}
        style={{
          background: fallbackBg,
          backgroundImage: posterGradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: 24,
        }}
      >
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return <video className={className} src={src} autoPlay muted loop playsInline />;
}

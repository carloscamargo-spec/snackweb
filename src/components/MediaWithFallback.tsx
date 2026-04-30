import { useState, useEffect, useRef } from 'react';

interface Props {
  src: string;
  className: string;
  fallbackBg: string;
  fallbackLabel: string;
  posterGradient?: string;
  loopFade?: boolean;
}

export default function MediaWithFallback({ src, className, fallbackBg, fallbackLabel, posterGradient, loopFade = false }: Props) {
  const [status, setStatus] = useState<'probing' | 'ok' | 'missing'>('probing');
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: 'HEAD' })
      .then((r) => { if (!cancelled) setStatus(r.ok ? 'ok' : 'missing'); })
      .catch(() => { if (!cancelled) setStatus('missing'); });
    return () => { cancelled = true; };
  }, [src]);

  useEffect(() => {
    if (!loopFade) return;
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      // fade in during last 0.9s, fade out during first 0.4s
      if (remaining < 0.9) {
        setFading(true);
      } else if (video.currentTime < 0.4) {
        setFading(false);
      }
    };
    video.addEventListener('timeupdate', onTime);
    return () => video.removeEventListener('timeupdate', onTime);
  }, [loopFade, status]);

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

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      <video ref={videoRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src={src} autoPlay muted loop playsInline />
      {loopFade && (
        <div style={{
          position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none',
          opacity: fading ? 1 : 0,
          transition: fading ? 'opacity 0.7s ease-in' : 'opacity 0.4s ease-out',
        }} />
      )}
    </div>
  );
}

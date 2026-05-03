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
  const [loaded, setLoaded] = useState(false);
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
      if (remaining < 0.9) setFading(true);
      else if (video.currentTime < 0.4) setFading(false);
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
    <div className={className} style={{ overflow: 'hidden' }}>
      <video
        ref={videoRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setLoaded(true)}
      />

      {/* subtle loader — fades out once video can play */}
      <div style={{
        position: 'absolute', inset: 0, background: '#080808', pointerEvents: 'none',
        opacity: loaded ? 0 : 1,
        transition: 'opacity 1.1s ease',
        zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end',
        padding: '0 0 20px 0',
      }}>
        {/* scanning bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '45%', background: 'linear-gradient(90deg, transparent, #e6fd31, transparent)', animation: 'heroScan 1.6s ease-in-out infinite' }} />
        </div>
        {/* label */}
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', paddingRight: 20 }}>
          cargando
        </span>
      </div>

      {loopFade && (
        <div style={{
          position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none',
          opacity: fading ? 1 : 0,
          transition: fading ? 'opacity 0.7s ease-in' : 'opacity 0.4s ease-out',
          zIndex: 1,
        }} />
      )}
    </div>
  );
}


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
  const [playing, setPlaying] = useState(false);
  const [bufPct, setBufPct] = useState(0);
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
      <div className={className} style={{ background: fallbackBg, backgroundImage: posterGradient, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 24 }}>
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
        onPlaying={() => setPlaying(true)}
        onProgress={() => {
          const v = videoRef.current;
          if (v?.duration && v.buffered.length)
            setBufPct(Math.round((v.buffered.end(v.buffered.length - 1) / v.duration) * 100));
        }}
      />

      {/* loader — covers native play button, disappears on first frame playing */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: '#090909',
        pointerEvents: 'none',
        opacity: playing ? 0 : 1,
        transition: playing ? 'opacity 1.2s ease' : 'none',
        overflow: 'hidden',
      }}>
        {/* moving shimmer sweep */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(108deg, transparent 38%, rgba(255,255,255,0.022) 50%, transparent 62%)',
          animation: 'heroShimmer 2.4s ease-in-out infinite',
        }} />

        {/* progress bar — determinate when buffering, scan when waiting */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.05)' }}>
          {bufPct > 0
            ? <div style={{ height: '100%', width: `${bufPct}%`, background: 'linear-gradient(90deg, rgba(230,253,49,0.35), #e6fd31)', transition: 'width 0.4s ease' }} />
            : <div style={{ position: 'absolute', height: '100%', width: '40%', background: 'linear-gradient(90deg, transparent, rgba(230,253,49,0.55), transparent)', animation: 'heroScan 1.7s ease-in-out infinite' }} />
          }
        </div>
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


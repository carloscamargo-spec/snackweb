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
  const [pct, setPct] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [errored, setErrored] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const blobRef = useRef('');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted on the DOM element — iOS reads the HTML attribute
    video.muted = true;
    video.setAttribute('muted', '');

    // Dismiss preloader as soon as first frame plays
    const onPlaying = () => setOverlayVisible(false);
    video.addEventListener('playing', onPlaying, { once: true });

    let cancelled = false;

    (async () => {
      try {
        // Fetch the video with real download progress
        const res = await fetch(src);
        if (!res.ok || !res.body) throw new Error('bad response');

        const total = parseInt(res.headers.get('content-length') ?? '0', 10);
        const reader = res.body.getReader();
        const chunks: Uint8Array<ArrayBuffer>[] = [];
        let loaded = 0;

        if (!cancelled) setPct(2);

        while (true) {
          const { done, value } = await reader.read();
          if (cancelled) { reader.cancel(); return; }
          if (done) break;
          if (value) {
            chunks.push(value);
            loaded += value.length;
            // Show real % when Content-Length is available
            if (total > 0 && !cancelled) {
              setPct(Math.max(2, Math.min(96, Math.round((loaded / total) * 100))));
            }
          }
        }

        if (cancelled) return;

        // Build blob URL — data already in RAM, no streaming latency on play()
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        blobRef.current = url;
        setPct(100);

        // Set src and force attributes again after src change
        video.src = url;
        video.muted = true;
        video.setAttribute('muted', '');
        video.load();

        // Small yield so browser can set up the decoder before play()
        await new Promise(r => setTimeout(r, 80));
        if (!cancelled) await video.play().catch(() => {});

      } catch {
        if (cancelled) return;
        // Network error or no body — fall back to direct streaming src
        setPct(100);
        video.src = src;
        video.muted = true;
        video.setAttribute('muted', '');
        video.load();
        await video.play().catch(() => {});
      }
    })();

    // Hard fallback: hide overlay after 8s even if playing never fires
    const t = setTimeout(() => { if (!cancelled) setOverlayVisible(false); }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(t);
      video.removeEventListener('playing', onPlaying);
      if (blobRef.current) { URL.revokeObjectURL(blobRef.current); blobRef.current = ''; }
    };
  }, [src]);

  // Loop crossfade
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
  }, [loopFade]);

  if (errored) {
    return (
      <div className={className} style={{ background: fallbackBg, backgroundImage: posterGradient, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 24 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <div className={className} style={{ overflow: 'hidden', background: '#090909' }}>

      {/* Video — always visible, no opacity tricks that confuse iOS autoplay */}
      <video
        ref={videoRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', zIndex: 1 }}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        x-webkit-airplay="deny"
        onError={() => setErrored(true)}
      />

      {/* Preloader — pointerEvents ALWAYS none, never interferes with iOS */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: '#000',
        pointerEvents: 'none',
        opacity: overlayVisible ? 1 : 0,
        transition: overlayVisible ? 'none' : 'opacity 1s ease',
      }}>
        {/* Logo top-left */}
        <div style={{ position: 'absolute', top: 28, left: 28 }}>
          <img
            src="/logo-snack-and-soda-white.png"
            alt=""
            style={{ height: 34, width: 'auto', display: 'block' }}
          />
        </div>

        {/* Bottom: percentage + bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 28px 36px',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {/* Counter row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}>
              Cargando
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em',
              color: pct === 100 ? '#e6fd31' : '#fff',
              transition: 'color 0.4s ease',
              lineHeight: 1,
            }}>
              {pct}<span style={{ fontSize: 12, opacity: 0.5, marginLeft: 2 }}>%</span>
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: 'linear-gradient(90deg, rgba(230,253,49,0.6), #e6fd31)',
              borderRadius: 1,
              transition: pct > 0 ? 'width 0.35s ease' : 'none',
            }} />
          </div>
        </div>
      </div>

      {loopFade && (
        <div style={{
          position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none',
          opacity: fading ? 1 : 0,
          transition: fading ? 'opacity 0.7s ease-in' : 'opacity 0.4s ease-out',
          zIndex: 2,
        }} />
      )}
    </div>
  );
}

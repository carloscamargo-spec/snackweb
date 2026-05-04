import { useState, useEffect, useRef } from 'react';

interface Props {
  src: string;
  className: string;
  fallbackBg: string;
  fallbackLabel: string;
  posterGradient?: string;
  loopFade?: boolean;
}

export default function MediaWithFallback({
  src, className, fallbackBg, fallbackLabel, posterGradient, loopFade = false,
}: Props) {
  const [pct, setPct]                   = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [fading, setFading]             = useState(false);
  const [errored, setErrored]           = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted is set both as DOM property and HTML attribute.
    // iOS Safari reads the attribute; React sometimes only sets the property.
    video.muted = true;
    video.setAttribute('muted', '');

    // ── Overlay dismissal ──────────────────────────────────────────────
    const dismiss = () => setOverlayVisible(false);
    video.addEventListener('playing', dismiss, { once: true });

    // ── Progress via native buffered API (no fetch, no double download) ─
    const onProgress = () => {
      if (!video.duration || !video.buffered.length) return;
      const end = video.buffered.end(video.buffered.length - 1);
      setPct(Math.min(95, Math.round((end / video.duration) * 100)));
    };
    video.addEventListener('progress', onProgress);
    video.addEventListener('loadedmetadata', onProgress);

    // ── Belt-and-suspenders play() once first frame decoded ────────────
    const onLoaded = () => {
      video.muted = true;
      video.play().catch(() => {});
    };
    video.addEventListener('loadeddata', onLoaded, { once: true });

    // ── Hard timeout: show video after 6s regardless ───────────────────
    const t = setTimeout(dismiss, 6000);

    return () => {
      clearTimeout(t);
      video.removeEventListener('playing', dismiss);
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('loadedmetadata', onProgress);
      video.removeEventListener('loadeddata', onLoaded);
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
      <div className={className} style={{
        background: fallbackBg, backgroundImage: posterGradient,
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 24,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <div className={className} style={{ overflow: 'hidden', background: '#090909' }}>

      {/* Native video — autoPlay + muted + playsInline is the correct
          autoplay path on all browsers. No fetch() wrapper, no blob URL. */}
      <video
        ref={videoRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', zIndex: 1 }}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        x-webkit-airplay="deny"
        onError={() => setErrored(true)}
      />

      {/* Preloader overlay ─────────────────────────────────────────────
          pointerEvents is ALWAYS 'none'. An overlay with pointerEvents:'auto'
          causes iOS to treat the video as "not directly reachable" and block
          autoplay even for muted+playsInline videos.              */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: '#000',
        pointerEvents: 'none',
        opacity: overlayVisible ? 1 : 0,
        transition: overlayVisible ? 'none' : 'opacity 1.1s ease',
      }}>
        {/* Logo */}
        <div style={{ position: 'absolute', top: 28, left: 28 }}>
          <img src="/logo-snack-and-soda-white.png" alt="" style={{ height: 34, width: 'auto', display: 'block' }} />
        </div>

        {/* Bottom: label + % + bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 28px 36px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              Cargando
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: pct >= 95 ? '#e6fd31' : '#fff', transition: 'color 0.4s ease', lineHeight: 1 }}>
              {pct}<span style={{ fontSize: 12, opacity: 0.5, marginLeft: 2 }}>%</span>
            </span>
          </div>

          {/* Determinate bar when buffered data is available,
              scanning animation while waiting for duration */}
          <div style={{ width: '100%', height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
            {pct > 0
              ? <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, rgba(230,253,49,0.5), #e6fd31)', borderRadius: 1, transition: 'width 0.4s ease' }} />
              : <div style={{ position: 'absolute', height: '100%', width: '40%', background: 'linear-gradient(90deg, transparent, rgba(230,253,49,0.55), transparent)', animation: 'heroScan 1.7s ease-in-out infinite' }} />
            }
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

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
  const [overlayGone, setOverlayGone] = useState(false);
  const [errored, setErrored] = useState(false);
  const [bufPct, setBufPct] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const dismiss = () => setOverlayGone(true);

    // When playing: remove overlay immediately
    video.addEventListener('playing', dismiss, { once: true });

    // Attempt autoplay as soon as metadata is ready
    const tryPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          // Autoplay blocked (iOS Low Power Mode, etc.)
          // Wait for first user touch anywhere on the page, then play silently
          const playOnTouch = () => {
            video.play().catch(() => {});
            document.removeEventListener('touchstart', playOnTouch);
            document.removeEventListener('click', playOnTouch);
          };
          document.addEventListener('touchstart', playOnTouch, { once: true, passive: true });
          document.addEventListener('click', playOnTouch, { once: true });
        });
      }
    };

    video.addEventListener('loadedmetadata', tryPlay, { once: true });

    // Hard timeout: reveal video after 6s regardless (avoids permanent black screen)
    const t = setTimeout(dismiss, 6000);

    return () => {
      video.removeEventListener('playing', dismiss);
      video.removeEventListener('loadedmetadata', tryPlay);
      clearTimeout(t);
    };
  }, []);

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
    <div className={className} style={{ overflow: 'hidden' }}>
      <video
        ref={videoRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
        onProgress={() => {
          const v = videoRef.current;
          if (v?.duration && v.buffered.length)
            setBufPct(Math.round((v.buffered.end(v.buffered.length - 1) / v.duration) * 100));
        }}
      />

      {/* Covers ALL native browser chrome (play button, controls) until video plays */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: '#090909',
          // Capture touches while visible so iOS can't show its native button;
          // once overlay is gone, let touches through to page below
          pointerEvents: overlayGone ? 'none' : 'auto',
          opacity: overlayGone ? 0 : 1,
          transition: overlayGone ? 'opacity 1.2s ease' : 'none',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(108deg, transparent 38%, rgba(255,255,255,0.022) 50%, transparent 62%)',
          animation: 'heroShimmer 2.4s ease-in-out infinite',
        }} />
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

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
  const [ready, setReady] = useState(false);
  const [fading, setFading] = useState(false);
  const [errored, setErrored] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set every muted/autoplay/playsinline flag both as property and attribute.
    // iOS Safari requires the HTML attributes to be present in the DOM,
    // not just the JS properties that React sets.
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');

    const show = () => setReady(true);
    video.addEventListener('playing', show, { once: true });

    // Attempt play on every data-available event
    const tryPlay = () => { video.muted = true; video.play().catch(() => {}); };
    video.addEventListener('canplay',    tryPlay, { once: true });
    video.addEventListener('loadeddata', tryPlay, { once: true });

    // Absolute fallback — reveal after 5s no matter what
    const t = setTimeout(show, 5000);

    return () => {
      clearTimeout(t);
      video.removeEventListener('playing',    show);
      video.removeEventListener('canplay',    tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
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
    <div className={className} style={{ overflow: 'hidden', background: '#000' }}>

      {/* Video — always rendered, autoPlay + muted + playsInline */}
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

      {/* Loader overlay — pointerEvents NEVER 'auto' (breaks iOS autoplay) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        background: '#000',
        pointerEvents: 'none',
        opacity: ready ? 0 : 1,
        transition: ready ? 'opacity 0.9s ease' : 'none',
      }}>
        {/* Thin line centred on screen */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '12%', right: '12%',
          height: 1,
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 1,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: '#e6fd31',
            borderRadius: 2,
            animation: 'loaderGrow 2.8s cubic-bezier(0.4,0,0.2,1) forwards',
          }} />
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

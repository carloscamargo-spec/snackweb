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
  const [visible, setVisible] = useState(false);
  const [bufPct, setBufPct] = useState(0);
  const [fading, setFading] = useState(false);
  const [errored, setErrored] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React doesn't always flush `muted` as an HTML attribute — set it on the
    // DOM element directly so iOS Safari sees it and permits autoplay.
    video.muted = true;

    const show = () => setVisible(true);
    video.addEventListener('playing', show, { once: true });

    // Reinforce play() on loadeddata (first frame decoded).
    // We do NOT call play() immediately to avoid AbortError on iOS,
    // and we do NOT add touchstart listeners — that was causing the
    // "only plays on scroll" problem.
    const onLoaded = () => video.play().catch(() => {});
    video.addEventListener('loadeddata', onLoaded, { once: true });

    // Hard fallback: reveal after 3s even if playing never fires
    const t = setTimeout(show, 3000);

    return () => {
      video.removeEventListener('playing', show);
      video.removeEventListener('loadeddata', onLoaded);
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
    // Dark background acts as loading state — visible through the transparent video
    <div className={className} style={{ overflow: 'hidden', background: '#090909' }}>

      {/* Shimmer sits behind the video, covered naturally when video fades in */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        opacity: visible ? 0 : 1,
        transition: 'opacity 1s ease',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
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

      {/*
        Video starts at opacity:0 — this hides ALL native browser chrome
        (play button, controls) without blocking iOS autoplay.
        An overlay div with pointerEvents:auto WAS the root cause: iOS
        treats a covered video as non-interactable and requires a gesture
        even for muted+playsInline videos.
      */}
      <video
        ref={videoRef}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', display: 'block', zIndex: 1,
          opacity: visible ? 1 : 0,
          transition: visible ? 'opacity 1.2s ease' : 'none',
        }}
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

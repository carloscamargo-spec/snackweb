import { useEffect, useRef } from 'react';

export default function VideoEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const send = (func: string) =>
      iframe.contentWindow?.postMessage(`{"event":"command","func":"${func}","args":""}`, '*');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          setTimeout(() => send('playVideo'), 500);
        } else if (!entry.isIntersecting) {
          send('pauseVideo');
          hasPlayed.current = false;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="manifiesto" className="section embed">
      <div className="section-head">
        <div className="label reveal">
          <span className="num">02</span>
          <span>El manifiesto</span>
        </div>
        <h2 className="title reveal delay-1">
          lo decimos en <em>voz alta.</em>
        </h2>
      </div>
      <div className="embed-meta reveal">
        <span>· Manifesto / 02 · Snack &amp; Soda</span>
        <span>04:21 · YouTube</span>
      </div>
      <div className="embed-frame reveal" style={{ marginTop: 18 }}>
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/Ncrsi9qwafE?rel=0&enablejsapi=1&autoplay=0"
          title="Snack & Soda Manifesto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
}

import { useState, useCallback, useEffect, useRef } from 'react';
import { CASES } from '../data/cases';

export default function Cases() {
  const [idx, setIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const goTo = useCallback((i: number) => { setAutoplay(true); setIdx(i); }, []);
  const next = useCallback(() => goTo((idx + 1) % CASES.length), [idx, goTo]);
  const prev = useCallback(() => goTo((idx - 1 + CASES.length) % CASES.length), [idx, goTo]);
  const cur = CASES[idx];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          iframeRef.current?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="casos" className="section cases">
      <div className="section-head">
        <div className="label reveal">
          <span className="num">06</span>
          <span>Casos</span>
        </div>
        <h2 className="title reveal delay-1">
          contenido que la audiencia <em>elige ver.</em>
        </h2>
      </div>

      <div className="cases-track-wrap reveal">
        <div className="cases-stage" key={cur.id}>
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${cur.id}?rel=0&enablejsapi=1&modestbranding=1${autoplay ? '&autoplay=1' : ''}`}
            title={cur.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <div className="cases-controls">
        <div className="cases-progress">
          <span>
            <span className="now">{String(idx + 1).padStart(2, '0')}</span>
            <span style={{ color: 'var(--neutral-500)' }}> / {String(CASES.length).padStart(2, '0')}</span>
          </span>
          <span className="cases-bar">
            <span className="fill" style={{ width: `${((idx + 1) / CASES.length) * 100}%` }} />
          </span>
        </div>
        <div className="cases-dots">
          {CASES.map((_, i) => (
            <button
              key={i}
              className={i === idx ? 'active' : ''}
              onClick={() => goTo(i)}
              aria-label={`Ir al caso ${i + 1}`}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
        <div className="cases-arrows">
          <button onClick={prev} aria-label="Anterior">←</button>
          <button onClick={next} aria-label="Siguiente">→</button>
        </div>
      </div>

      <div className="cases-list">
        {CASES.map((c, i) => (
          <div
            key={c.id}
            className={`item ${i === idx ? 'active' : ''}`}
            onClick={() => goTo(i)}
          >
            <div className="thumb">
              <img
                src={`https://i.ytimg.com/vi/${c.id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="play" aria-hidden="true">▶</span>
              <span className="case-num">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="num">CASE / {String(i + 1).padStart(2, '0')}</div>
            <div className="ttl">{c.title}</div>
            <div className="meta">{c.client}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

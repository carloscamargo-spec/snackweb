import { useEffect, useRef } from 'react';
import { FRAMEWORK_ITEMS } from '../data/framework';

const INF_PATH = "M 200,100 C 200,40 130,0 90,0 C 10,0 10,200 90,200 C 130,200 200,160 200,100 C 200,40 270,0 310,0 C 390,0 390,200 310,200 C 270,200 200,160 200,100 Z";

export default function Framework() {
  const lightRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = lightRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    const seg = len * 0.1;
    [lightRef, glowRef].forEach((r) => {
      if (!r.current) return;
      r.current.style.strokeDasharray = `${seg} ${len - seg}`;
      r.current.style.animation = `fw-travel ${len / 280}s linear infinite`;
    });
  }, []);

  return (
    <section id="framework" className="section framework">
      <div className="section-head">
        <div className="label reveal">
          <span className="num">05</span>
          <span>El framework</span>
        </div>
        <h2 className="title reveal delay-1">
          tres sistemas.<br />
          una sola <em>tesis.</em>
        </h2>
      </div>

      <div className="fw-infinity reveal delay-2">
        <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <filter id="fw-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* dim base path */}
          <path d={INF_PATH} stroke="rgba(230,253,49,0.12)" strokeWidth="5" strokeLinecap="round" />
          {/* glow layer */}
          <path ref={glowRef} d={INF_PATH} stroke="#e6fd31" strokeWidth="12"
            strokeLinecap="round" filter="url(#fw-glow)" opacity="0.5" />
          {/* sharp light */}
          <path ref={lightRef} d={INF_PATH} stroke="#e6fd31" strokeWidth="5"
            strokeLinecap="round" />
        </svg>
      </div>

      <div className="framework-grid">
        {FRAMEWORK_ITEMS.map((it, i) => (
          <article key={it.acr} className={`framework-card reveal delay-${i + 1}`}>
            <div className="fw-card-num">{it.num}</div>
            <div className="acronym">{it.acr}</div>
            <div className="body">
              <div className="name">{it.name}</div>
              <p className="desc">{it.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

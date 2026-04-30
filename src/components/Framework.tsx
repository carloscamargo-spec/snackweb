import { useEffect, useRef } from 'react';
import { FRAMEWORK_ITEMS } from '../data/framework';

const D = "M 300,175 C 300,90 210,40 155,40 C 55,40 15,115 15,175 C 15,235 55,310 155,310 C 210,310 300,260 300,175 C 300,90 390,40 445,40 C 545,40 585,115 585,175 C 585,235 545,310 445,310 C 390,310 300,260 300,175 Z";

const LABELS = [
  { x: 110, y: 34, name: 'Sistema de\nApuesta Narrativa' },
  { x: 300, y: 346, name: 'Modelo de\nEntretenimiento Progresivo' },
  { x: 490, y: 34, name: 'Arquitectura de\nExperiencias Apostables' },
];

export default function Framework() {
  const baseRef  = useRef<SVGPathElement>(null);
  const seg0Ref  = useRef<SVGPathElement>(null);
  const glow0Ref = useRef<SVGPathElement>(null);
  const seg1Ref  = useRef<SVGPathElement>(null);
  const glow1Ref = useRef<SVGPathElement>(null);
  const seg2Ref  = useRef<SVGPathElement>(null);
  const glow2Ref = useRef<SVGPathElement>(null);
  const trvRef   = useRef<SVGPathElement>(null);

  useEffect(() => {
    const base = baseRef.current;
    if (!base) return;
    const len = base.getTotalLength();
    const third = len / 3;
    const CYCLE = '9s';

    const segs = [
      [seg0Ref, glow0Ref, 0],
      [seg1Ref, glow1Ref, 1],
      [seg2Ref, glow2Ref, 2],
    ] as const;

    segs.forEach(([sRef, gRef, i]) => {
      const offset = `${-(third * i)}`;
      const da = `${third} ${len - third}`;
      for (const r of [sRef, gRef]) {
        if (!r.current) continue;
        r.current.style.strokeDasharray = da;
        r.current.style.strokeDashoffset = offset;
        r.current.style.animationDuration = CYCLE;
        r.current.style.animationDelay = `${-3 * i}s`;
      }
    });

    if (trvRef.current) {
      const seg = len * 0.055;
      trvRef.current.style.strokeDasharray = `${seg} ${len - seg}`;
      trvRef.current.style.animationDuration = CYCLE;
    }
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
        <svg viewBox="0 0 600 370" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <filter id="fw-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="fw-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* dim base */}
          <path ref={baseRef} d={D} stroke="rgba(230,253,49,0.1)" strokeWidth="4" strokeLinecap="round" />

          {/* segment 0 — SAN */}
          <path ref={glow0Ref} d={D} stroke="#e6fd31" strokeWidth="14" strokeLinecap="round" filter="url(#fw-glow)" className="fw-seg" />
          <path ref={seg0Ref}  d={D} stroke="#e6fd31" strokeWidth="4"  strokeLinecap="round" className="fw-seg" />

          {/* segment 1 — MEP */}
          <path ref={glow1Ref} d={D} stroke="#e6fd31" strokeWidth="14" strokeLinecap="round" filter="url(#fw-glow)" className="fw-seg" style={{ animationDelay: '-3s' }} />
          <path ref={seg1Ref}  d={D} stroke="#e6fd31" strokeWidth="4"  strokeLinecap="round" className="fw-seg" style={{ animationDelay: '-3s' }} />

          {/* segment 2 — AEA */}
          <path ref={glow2Ref} d={D} stroke="#e6fd31" strokeWidth="14" strokeLinecap="round" filter="url(#fw-glow)" className="fw-seg" style={{ animationDelay: '-6s' }} />
          <path ref={seg2Ref}  d={D} stroke="#e6fd31" strokeWidth="4"  strokeLinecap="round" className="fw-seg" style={{ animationDelay: '-6s' }} />

          {/* traveling light */}
          <path ref={trvRef} d={D} stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" filter="url(#fw-glow-sm)" className="fw-travel" />

          {/* labels */}
          {FRAMEWORK_ITEMS.map((it, i) => {
            const lb = LABELS[i];
            const lines = lb.name.split('\n');
            const isBottom = i === 1;
            return (
              <g key={it.acr} className="fw-label" style={{ animationDelay: `${-3 * i}s`, animationDuration: '9s' }}>
                <text x={lb.x} y={isBottom ? lb.y + 6 : lb.y - 22} textAnchor="middle" className="fw-acr">{it.acr}</text>
                {lines.map((l, li) => (
                  <text key={li} x={lb.x} y={isBottom ? lb.y + 22 + li * 15 : lb.y - 6 + li * 15} textAnchor="middle" className="fw-name">{l}</text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

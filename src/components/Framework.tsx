import { FRAMEWORK_ITEMS } from '../data/framework';

// Symmetric lemniscate: two circles r=110, centers at (150,175) and (450,175)
// Bezier circle approximation: k = r * 0.5523 ≈ 61
const D = [
  "M 300,175",
  "C 300,114 389,65 450,65",
  "C 511,65 560,114 560,175",
  "C 560,236 511,285 450,285",
  "C 389,285 300,236 300,175",
  "C 300,114 211,65 150,65",
  "C 89,65 40,114 40,175",
  "C 40,236 89,285 150,285",
  "C 211,285 300,236 300,175 Z",
].join(" ");

// Labels at the 3 natural sections of the path (each ~1/3)
// Sec 0: top of right loop (0–333), Sec 1: full left loop (333–666), Sec 2: bottom right arc (666–1000)
const LABEL_POS = [
  { x: 455, y: 36, align: 'middle' as const },  // top of right loop
  { x: 145, y: 36, align: 'middle' as const },  // top of left loop
  { x: 300, y: 320, align: 'middle' as const }, // below crossing
];

const SEGS = [
  { offset: '0',    delay: '0s' },
  { offset: '-334', delay: '-3s' },
  { offset: '-667', delay: '-6s' },
];

export default function Framework() {
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

      <div className="fw-wrap reveal delay-2">
        <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="fw-svg">
          <defs>
            <filter id="fw-blur-xl" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
            <filter id="fw-blur-md" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id="fw-blur-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>

          {/* ── dim base ── */}
          <path d={D} pathLength="1000" stroke="rgba(230,253,49,0.09)" strokeWidth="3" strokeLinecap="round" />

          {/* ── section segments (3 × third of path) ── */}
          {SEGS.map((s, i) => (
            <g key={i} className="fw-seg-group" style={{ animationDelay: s.delay }}>
              {/* wide glow */}
              <path d={D} pathLength="1000"
                stroke="#e6fd31" strokeWidth="22" strokeLinecap="round"
                strokeDasharray="333 667" strokeDashoffset={s.offset}
                filter="url(#fw-blur-xl)" className="fw-seg-glow" style={{ animationDelay: s.delay }} />
              {/* sharp stroke */}
              <path d={D} pathLength="1000"
                stroke="#e6fd31" strokeWidth="4" strokeLinecap="round"
                strokeDasharray="333 667" strokeDashoffset={s.offset}
                className="fw-seg-line" style={{ animationDelay: s.delay }} />
            </g>
          ))}

          {/* ── traveling comet ── */}
          {/* outer trail — ultra-soft halo */}
          <path d={D} pathLength="1000"
            stroke="#e6fd31" strokeWidth="28" strokeLinecap="round"
            strokeDasharray="110 890"
            filter="url(#fw-blur-xl)" className="fw-comet-trail" opacity="0.35" />
          {/* mid glow */}
          <path d={D} pathLength="1000"
            stroke="#e6fd31" strokeWidth="14" strokeLinecap="round"
            strokeDasharray="70 930"
            filter="url(#fw-blur-md)" className="fw-comet-trail" opacity="0.6" />
          {/* core bright dot */}
          <path d={D} pathLength="1000"
            stroke="white" strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray="38 962"
            filter="url(#fw-blur-sm)" className="fw-comet-trail" opacity="0.95" />

          {/* ── labels ── */}
          {FRAMEWORK_ITEMS.map((it, i) => {
            const p = LABEL_POS[i];
            return (
              <g key={it.acr} className="fw-label" style={{ animationDelay: SEGS[i].delay }}>
                <text x={p.x} y={p.y} textAnchor={p.align} className="fw-acr">{it.acr}</text>
                <text x={p.x} y={p.y + 16} textAnchor={p.align} className="fw-name">{it.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

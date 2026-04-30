import { useEffect, useRef } from 'react';
import { FRAMEWORK_ITEMS } from '../data/framework';

export default function Framework() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref0 = useRef<HTMLElement>(null);
  const ref1 = useRef<HTMLElement>(null);
  const ref2 = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = [ref0.current, ref1.current, ref2.current];
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 → 1 as section scrolls from entering bottom to exiting top
      const progress = (vh - rect.top) / (rect.height + vh);
      // each pillar lights at 0.18, 0.38, 0.56 — spread across the reading zone
      const thresholds = [0.18, 0.38, 0.56];
      cards.forEach((card, i) => {
        card?.classList.toggle('lit', progress >= thresholds[i]);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const refs = [ref0, ref1, ref2];

  return (
    <section ref={sectionRef} id="framework" className="section framework">
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

      <div className="framework-grid">
        {FRAMEWORK_ITEMS.map((it, i) => (
          <article ref={refs[i]} key={it.acr} className="framework-card">
            <div className="fw-num">{it.num}</div>
            <div className="fw-acr">{it.acr}</div>
            <div className="fw-name">{it.name}</div>
            <p className="fw-desc">{it.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

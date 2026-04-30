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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        cards.forEach((card, i) => {
          setTimeout(() => card?.classList.add('lit'), i * 560);
        });
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
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

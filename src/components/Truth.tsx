import { TRUTH_DATA } from '../data/truth';

export default function Truth() {
  return (
    <section id="verdad" className="section truth">
      <div className="section-head">
        <div className="label reveal">
          <span className="num">03</span>
          <span>La verdad</span>
        </div>
        <h2 className="title reveal delay-1">
          el problema no es el producto.<br />
          es la <em>conversación.</em>
        </h2>
      </div>
      <div className="truth-grid">
        {TRUTH_DATA.map((d, i) => (
          <div key={i} className={`truth-card reveal delay-${i + 1}`}>
            <div className="idx">{d.idx}</div>
            <div className="stat">
              {d.stat}
              {d.unit && <span className="unit">{d.unit}</span>}
            </div>
            <p className="desc">{d.desc}</p>
            <div className="src">— {d.src}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

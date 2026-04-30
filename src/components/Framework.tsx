import { FRAMEWORK_ITEMS } from '../data/framework';

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
      <div className="framework-grid">
        {FRAMEWORK_ITEMS.map((it, i) => (
          <article key={it.acr} className={`framework-card reveal delay-${i + 1}`}>
            <div className="acronym">{it.acr}</div>
            <div className="body">
              <div className="name">{it.name}</div>
              <p className="desc">{it.desc}</p>
            </div>
            <div className="num">{it.num}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

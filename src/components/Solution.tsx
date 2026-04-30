export default function Solution() {
  return (
    <section className="section solution">
      <div className="section-head">
        <div className="label reveal">
          <span className="num">04</span>
          <span>La solución</span>
        </div>
        <h2 className="title reveal delay-1">
          el orden importa.<br />
          y casi todos lo invierten.
        </h2>
      </div>
      <div className="solution-stack">
        <h3 className="solution-headline reveal">
          <span className="step">
            <span className="ord">Step / 01</span>
            primero <em>entretenimiento.</em>
          </span>
          <span className="step">
            <span className="ord">Step / 02</span>
            luego marketing.
          </span>
          <span className="step">
            <span className="ord">Step / 03</span>
            al final, conversión.
          </span>
        </h3>
        <div className="solution-foot">
          <p className="quote reveal delay-1">
            El futuro de las apuestas está en darle al usuario un espectáculo sin precedentes donde
            él también juega. La marca no interrumpe la historia —{' '}
            <strong style={{ color: 'var(--white)' }}>es la historia.</strong>
          </p>
          <div className="meta reveal delay-2">— Tesis 04 / Vol. IV</div>
        </div>
      </div>
    </section>
  );
}

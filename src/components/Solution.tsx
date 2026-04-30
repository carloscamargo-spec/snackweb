export default function Solution() {
  return (
    <section className="section solution">
      <div className="solution-inner">
        <div className="sol-eyebrow reveal">
          <span className="sol-num">04</span>
          <span>La solución</span>
        </div>

        <h2 className="sol-title reveal delay-1">
          el <em>orden</em><br />
          importa.
        </h2>

        <p className="sol-sub reveal delay-2">
          y casi todos lo invierten.
        </p>

        <div className="sol-steps">
          <div className="sol-step reveal delay-2">
            <span className="sol-step-num">01</span>
            <span className="sol-step-label">primero <em>entretenimiento.</em></span>
          </div>
          <div className="sol-step reveal delay-3">
            <span className="sol-step-num">02</span>
            <span className="sol-step-label">luego <em>marketing.</em></span>
          </div>
          <div className="sol-step reveal sol-delay-4">
            <span className="sol-step-num">03</span>
            <span className="sol-step-label">al final, <em>conversión.</em></span>
          </div>
        </div>

        <div className="sol-quote reveal sol-delay-5">
          <p>
            La marca no interrumpe la historia —{' '}
            <strong>es la historia.</strong>
          </p>
          <span className="sol-quote-meta">— Tesis 04 / Vol. IV</span>
        </div>
      </div>
    </section>
  );
}

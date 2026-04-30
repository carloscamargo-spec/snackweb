import MediaWithFallback from './MediaWithFallback';

export default function Problem() {
  return (
    <section id="problema" className="problem">
      <MediaWithFallback
        className="problem-video"
        src="/bear-speaks.mp4"
        fallbackBg="#e6fd31"
        fallbackLabel="bear-speaks.mp4 · placeholder"
      />
      <div className="problem-overlay" />
      <div className="problem-content">
        <div className="problem-tag reveal">
          <span className="dot" />
          En vivo desde la rotación de usuarios
        </div>
        <div className="problem-bottom">
          <div className="problem-num reveal">01 — El Problema</div>
          <h2 className="problem-headline reveal delay-1">
            las casas de apuestas no tienen <em>clientes fieles.</em>
          </h2>
          <p className="problem-body reveal delay-2">
            Tienen usuarios en rotación. Las cuotas y los bonos ya no diferencian: son commodity.
            Cuando todos ofrecen lo mismo, la única ventaja sostenible es el contenido que tu marca crea.
          </p>
        </div>
      </div>
    </section>
  );
}

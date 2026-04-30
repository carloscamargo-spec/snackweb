import { useState, useEffect } from 'react';
import MediaWithFallback from './MediaWithFallback';

function useLiveCount(base: number, interval = 2400) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((n) => n + Math.floor(Math.random() * 14) - 6);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);
  return count.toLocaleString('es-CO');
}

export default function Problem() {
  const count = useLiveCount(148_432);

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
          <span className="problem-count">{count}</span>
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

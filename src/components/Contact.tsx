import { useState } from 'react';

export default function Contact() {
  const [toast, setToast] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    setSending(true);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams([
          ['form-name', 'contact'],
          ...Array.from(data.entries()).map(([k, v]) => [k, v as string]),
        ]).toString(),
      });
    } catch (_) {
      // submit best-effort; show toast regardless
    }
    setSending(false);
    setToast(true);
    form.reset();
    setTimeout(() => setToast(false), 3200);
  };

  return (
    <section id="contacto" className="section contact">
      <div className="contact-bear" aria-hidden="true">
        <img src="/bear-mascot.jpeg" alt="" />
        <span className="contact-bear-tag">
          <span className="dot" />
          dile hola al oso
        </span>
      </div>

      <div className="contact-grid">
        <div className="contact-left reveal">
          <div className="contact-eyebrow">07 — Hablemos</div>
          <h2 className="contact-headline">
            conoce el <em>modelo.</em>
          </h2>
          <p className="contact-body">
            Cuéntanos sobre tu operación. Mercado, vertical, tamaño, objetivos. En 48h te
            respondemos con un primer diagnóstico y un sí o un no honesto.
          </p>
          <div className="contact-meta">
            <div>
              <div className="key">Email directo</div>
              <div className="val">carlos.camargo@snackandsoda.co</div>
              <div className="val">andres.rodriguez@snackandsoda.co</div>
            </div>
            <div>
              <div className="key">Sitio</div>
              <div className="val">snackandsoda.co</div>
            </div>
            <div>
              <div className="key">WhatsApp</div>
              <div className="val">
                <a href="https://wa.me/573214919005" target="_blank" rel="noopener" style={{ color: 'inherit', textDecoration: 'underline' }}>
                  +57 321 491 9005
                </a>
              </div>
            </div>
            <div>
              <div className="key">Tiempo de respuesta</div>
              <div className="val">≤ 48 horas</div>
            </div>
            <div>
              <div className="key">Mercados</div>
              <div className="val">MX · CO · PE · CL · BR · AR</div>
            </div>
          </div>
        </div>

        <form className="contact-right reveal delay-1" name="contact" data-netlify="true" onSubmit={onSubmit}>
          <input type="hidden" name="form-name" value="contact" />
          <div className="form-stack">
            <div className="form-row">
              <label htmlFor="name"><span>Nombre</span><span className="num">01</span></label>
              <input id="name" name="name" type="text" required placeholder="Cómo te llamas" />
            </div>
            <div className="form-row">
              <label htmlFor="email"><span>Email</span><span className="num">02</span></label>
              <input id="email" name="email" type="email" required placeholder="tu@email.com" />
            </div>
            <div className="form-row">
              <label htmlFor="company"><span>Empresa / Operador</span><span className="num">03</span></label>
              <input id="company" name="company" type="text" required placeholder="Nombre del operador" />
            </div>
            <div className="form-row">
              <label htmlFor="message"><span>Mensaje</span><span className="num">04</span></label>
              <textarea id="message" name="message" rows={3} placeholder="Mercado, vertical, lo que necesitas resolver" />
            </div>
          </div>
          <div className="form-actions">
            <p className="form-foot">
              Al enviar aceptas nuestra política de privacidad. Sin spam, sin newsletters automáticos.
            </p>
            <button className="form-submit" type="submit" disabled={sending}>
              {sending ? 'Enviando…' : <> Enviar <span className="arrow">→</span></>}
            </button>
          </div>
        </form>
      </div>

      <div className="contact-close" aria-hidden="true">
        <img src="/logo-snack-and-soda-black.png" alt="" />
      </div>

      <div className={`toast ${toast ? 'show' : ''}`}>
        <span style={{ color: 'var(--brand)' }}>●</span>
        Recibido. Respondemos en menos de 48h.
      </div>
    </section>
  );
}

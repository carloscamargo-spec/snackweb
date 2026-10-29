import { useState } from 'react';
import { MARKETS } from '../data/markets';
import { marketPath } from '../routes';

type SubmitStatus = 'idle' | 'sent' | 'error';

const TOAST_MS: Record<Exclude<SubmitStatus, 'idle'>, number> = { sent: 3200, error: 6000 };

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    setSending(true);
    let result: SubmitStatus = 'error';
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams([
          ['form-name', 'contact'],
          ...Array.from(data.entries()).map(([k, v]) => [k, v as string]),
        ]).toString(),
      });
      if (res.ok) result = 'sent';
    } catch (_) {
      // network failure: fall through to the error toast
    }
    setSending(false);
    setStatus(result);
    // Keep what the visitor typed when the submission failed, so they can retry or copy it.
    if (result === 'sent') form.reset();
    setTimeout(() => setStatus('idle'), TOAST_MS[result]);
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
            respondemos con una visión clara y el primer paso para hacerlo realidad.
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
              <div className="val contact-markets">
                {MARKETS.map((m, i) => (
                  <span key={m.slug}>
                    {i > 0 && ' · '}
                    <a href={marketPath(m.slug)} title={`Publicidad para casas de apuestas en ${m.country}`}>{m.countryCode}</a>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form className="contact-right reveal delay-1" name="contact" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={onSubmit}>
          <input type="hidden" name="form-name" value="contact" />
          <input type="text" name="bot-field" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
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

      <div className={`toast ${status !== 'idle' ? 'show' : ''} ${status === 'error' ? 'error' : ''}`} role="status" aria-live="polite">
        <span className="toast-dot">●</span>
        {status === 'error'
          ? 'No pudimos enviarlo. Escríbenos a carlos.camargo@snackandsoda.co o por WhatsApp.'
          : 'Recibido. Respondemos en menos de 48h.'}
      </div>
    </section>
  );
}

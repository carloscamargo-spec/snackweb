import { useRef, useState, useEffect, useCallback } from 'react';

const BUBBLE_MSGS = ['HEY hablemos', 'Dale click aquí', 'Vamos por todo.!!!'];

type Cta = { label: string; href: string };
type Msg = { role: 'user' | 'assistant'; content: string; cta?: Cta[] };

const GREETINGS: Msg[] = [
  { role: 'assistant', content: 'Grrrr... 👋 Soy GRIZZ. El oso que sabe cómo romper el mercado del entretenimiento y las apuestas en LATAM. ¿Qué tienes en mente?' },
];

// Turn 1 — qualify: ask about their market / operation
const QUALIFY_RESPONSES = [
  'Grr, bien. Antes de que este oso opine, necesito saber con quién hablo. ¿En qué mercado están operando — Colombia, México, otro país de LATAM? ¿Y qué tipo de operación: betting, gaming, entretenimiento?',
  'Escúchame. Cada caso es distinto y este oso odia las respuestas genéricas. ¿Me cuentas en qué vertical están — apuestas, casino, esports, entretenimiento? ¿Y cuál es el mercado principal?',
  'Grrr, me interesa. Pero primero dime: ¿son operadores, una marca de entretenimiento o una agencia buscando alianza? Eso cambia todo lo que te voy a decir.',
  'Bien, bien. ¿Están arrancando o ya tienen operación corriendo? Porque el diagnóstico para alguien que empieza es muy diferente al de alguien que ya tiene usuarios y los está perdiendo. ¿Cuál es tu caso?',
  'Grr. Antes de hablar de soluciones, necesito entender el problema real. ¿Qué es lo que más les está costando ahorita — adquisición, retención, o simplemente que nadie los conoce todavía?',
];

// Turn 2 — deepen: acknowledge + probe further
const DEEPEN_RESPONSES = [
  'Ajá, eso ya me dice mucho. Grr. ¿Y qué han intentado hasta ahora? Porque si me dices "pauta en Meta y post en Instagram" ya sé exactamente cuál es el problema — y tiene solución.',
  'Interesante. Entonces el reto no es solo visibilidad, es relevancia. Grrr. ¿Tienen ya algún activo de contenido — canal, personaje, formato — o están empezando desde cero?',
  'Grr, eso tiene más capas de las que parece. ¿Están midiendo retención de usuarios o solo están mirando el CAC? Porque a veces el problema que se ve no es el problema real.',
  'Eso que describes lo he visto mil veces. Grrr. ¿Tienen equipo interno de contenido o están tercerizando todo? Eso define mucho qué tipo de estrategia tiene sentido para ustedes.',
  'Buena respuesta. Ahora la pregunta que incomoda: ¿cuál es el presupuesto real para contenido — no el que les gustaría tener, sino el que existe hoy? No para cotizarte, sino para saber qué es realista.',
];

// Turn 3+ — push to meeting (proactive, no keywords needed)
const PUSH_MEETING_REPLIES: Omit<Msg, 'role'>[] = [
  {
    content: `Grrrr. Mira, llevamos ya un rato hablando y esto ya da para más que un chat con un oso. Lo que me describes tiene solución concreta — pero necesita 30 minutos con los humanos detrás de mí.\n\nCarlos y Andrés han hecho esto en Colombia, México y más. Sin humo, sin pitch aburrido. Solo estrategia real. ¿Lo agendamos?`,
    cta: [
      { label: '📅 Agendar con Carlos', href: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reuni%C3%B3n+con+Snack+%26+Soda&add=carlos.camargo%40snackandsoda.co&details=Estrategia+de+contenido+para+betting+y+entretenimiento+LATAM&duration=3000' },
      { label: '📅 Agendar con Andrés', href: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reuni%C3%B3n+con+Snack+%26+Soda&add=andres.rodriguez%40snackandsoda.co&details=Estrategia+de+contenido+para+betting+y+entretenimiento+LATAM&duration=3000' },
    ],
  },
  {
    content: `Grr. Este oso puede darte más insights todo el día — pero la conversación que de verdad cambia las cosas pasa con las personas. 30 minutos, sin venta forzada, puro diagnóstico.\n\nElige con quién prefieres hablar primero:`,
    cta: [
      { label: '📅 Agendar con Carlos', href: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reuni%C3%B3n+con+Snack+%26+Soda&add=carlos.camargo%40snackandsoda.co&details=Estrategia+de+contenido+para+betting+y+entretenimiento+LATAM&duration=3000' },
      { label: '📅 Agendar con Andrés', href: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reuni%C3%B3n+con+Snack+%26+Soda&add=andres.rodriguez%40snackandsoda.co&details=Estrategia+de+contenido+para+betting+y+entretenimiento+LATAM&duration=3000' },
    ],
  },
];

// Fallback random responses
const RESPONSES = [
  'Escúchame bien: el usuario de apuestas no es fiel a la plataforma, es fiel a la emoción. Si tu marca no genera esa emoción antes del partido... ya perdiste. Grrr. ¿Qué están haciendo hoy para generar esa conexión?',
  'Mira, este oso ha visto mil "estrategias de contenido" que son básicamente un calendario de posts con el logo. Eso no es estrategia, eso es decoración. Necesitas narrativa, personajes, arcos. ¿Tienen algo de eso o están empezando desde cero?',
  '¿Sabes por qué Bet365 sigue ganando en LATAM? No es por las cuotas. Es porque la gente los conoce. El awareness lo construye el entretenimiento, no el descuento del 20%. ¿En qué están invirtiendo más ahora?',
  'Grrrr. El mercado colombiano está subvalorado. Hay audiencia en TikTok viendo fútbol 4 horas al día y ninguna casa les habla en su idioma. Ahí está el dinero. ¿Están activos en TikTok o todavía explorando?',
  'Lo que describes suena a marketing de performance disfrazado de contenido. Y eso se nota — la audiencia huele el oportunismo a kilómetros. ¿Cuándo fue la última vez que hicieron algo que la gente compartió sin que les pagaran por eso?',
  'Grr, dato clave: el contenido de entretenimiento tiene ROI 3x mayor que paid media en retención de usuarios gaming. No lo digo yo, lo dicen los números. ¿Están midiendo retención o solo adquisición?',
  'Brasil, México, Colombia... cada mercado es un animal diferente. El que llega con copy-paste de España se estrella. ¿Ya tienen claro cómo adaptar el tono a cada plaza o están usando el mismo contenido para todo?',
  'Grrrr. El futuro del betting no es la cuota mejorada, es la experiencia. Imagínate una transmisión donde el contenido y la apuesta son lo mismo. ¿Tienen algo así en el roadmap o están todavía en modo banner?',
  'Este oso tiene una regla: si tu contenido puede existir sin tu marca, está mal hecho. Tiene que ser tan tuyo que sin el logo igual se sabe. ¿Eso aplica a lo que están produciendo ahora?',
  'Grr. El problema de los operadores chicos no es el presupuesto, es la cobardía creativa. Tienen miedo de hacer lo que la competencia no ha hecho. Pero precisamente ahí está la oportunidad. ¿Cuál es la jugada más arriesgada que han considerado y no han ejecutado?',
];

const CONTACT_KEYWORDS = ['contacto', 'contactar', 'correo', 'email', 'mail', 'teléfono', 'telefono', 'whatsapp', 'whats', 'llamar', 'escribir', 'número', 'numero', 'cel', 'celular', 'comunicar'];

const MEETING_KEYWORDS = ['especialista', 'profesional', 'experto', 'equipo', 'precio', 'precios', 'costo', 'costos', 'cotizar', 'cotización', 'cotizacion', 'presupuesto', 'cuanto cuesta', 'cuánto cuesta', 'cuanto vale', 'cuánto vale', 'servicios', 'contratar', 'reunión', 'reunion', 'agendar', 'agenda', 'cita', 'llamada', 'hablar con alguien', 'quiero hablar', 'hablar con'];

const CONTACT_REPLY = `Grr, claro que sí. Así nos encuentras:\n\n📧 carlos.camargo@snackandsoda.co\n📧 andres.rodriguez@snackandsoda.co\n\n📱 WhatsApp Colombia: +57 321 491 9005\n\nEscríbenos, respondemos en menos de 48h. O llena el formulario aquí en la página. Este oso no deja mensajes sin responder. Grrr.`;

const MEETING_REPLY: Omit<Msg, 'role'> = {
  content: `Grrrr, ahora hablamos en serio. 🐻 Los humanos detrás de este oso son Carlos y Andrés — llevan años rompiendo el mercado del betting en LATAM y no van a venderte humo.\n\nSolo 30 minutos. Sin filtros, sin pitch, sin formularios eternos. Diagnóstico real y opciones concretas.`,
  cta: [
    { label: '📅 Agendar con Carlos', href: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reuni%C3%B3n+con+Snack+%26+Soda&add=carlos.camargo%40snackandsoda.co&details=Estrategia+de+contenido+para+betting+y+entretenimiento+LATAM&duration=3000' },
    { label: '📅 Agendar con Andrés', href: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reuni%C3%B3n+con+Snack+%26+Soda&add=andres.rodriguez%40snackandsoda.co&details=Estrategia+de+contenido+para+betting+y+entretenimiento+LATAM&duration=3000' },
  ],
};

function getBearReply(userText: string, userMsgCount: number, meetingOffered: boolean): Omit<Msg, 'role'> {
  const lower = userText.toLowerCase();

  // keyword overrides always fire first
  if (MEETING_KEYWORDS.some((k) => lower.includes(k))) return MEETING_REPLY;
  if (CONTACT_KEYWORDS.some((k) => lower.includes(k))) return { content: CONTACT_REPLY };

  // funnel: first msg → qualify, second → deepen, third+ → push meeting
  if (userMsgCount === 1) {
    return { content: QUALIFY_RESPONSES[Math.floor(Math.random() * QUALIFY_RESPONSES.length)] };
  }
  if (userMsgCount === 2) {
    return { content: DEEPEN_RESPONSES[Math.floor(Math.random() * DEEPEN_RESPONSES.length)] };
  }
  if (userMsgCount >= 3 && !meetingOffered) {
    return PUSH_MEETING_REPLIES[Math.floor(Math.random() * PUSH_MEETING_REPLIES.length)];
  }

  return { content: RESPONSES[Math.floor(Math.random() * RESPONSES.length)] };
}

export default function BearMascot() {
  const railRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [hidden, setHidden] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(GREETINGS);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [meetingOffered, setMeetingOffered] = useState(false);

  // scroll position → rail movement + hide near contact
  useEffect(() => {
    const onScroll = () => {
      const el = railRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, max)));
      el.style.top = `${18 + p * 60}vh`;
      const contact = document.getElementById('contacto');
      if (contact) {
        const r = contact.getBoundingClientRect();
        setHidden(r.top < window.innerHeight * 0.85 && r.bottom > 80);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  // rotate bubble messages
  useEffect(() => {
    const id = setInterval(() => setMsgIdx((i) => (i + 1) % BUBBLE_MSGS.length), 3200);
    return () => clearInterval(id);
  }, []);

  // scroll chat to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    const nextCount = userMsgCount + 1;
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setUserMsgCount(nextCount);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const reply = getBearReply(text, nextCount, meetingOffered);
      if (reply.cta) setMeetingOffered(true);
      setMessages((m) => [...m, { role: 'assistant', ...reply }]);
      setLoading(false);
    }, 900 + Math.random() * 700);
  }, [input, loading, userMsgCount, meetingOffered]);

  const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* ── floating trigger ── */}
      <div ref={railRef} className={`bear-chat ${hidden || open ? 'is-hidden' : ''}`}>
        <button className="bear-chat-inner" onClick={() => setOpen(true)} aria-label="Habla con GRIZZ">
          <span className="bear-chat-bubble" key={msgIdx}>
            <span className="bear-chat-text">{BUBBLE_MSGS[msgIdx]}</span>
            <span className="bear-chat-tail" aria-hidden="true" />
          </span>
          <span className="bear-chat-avatar">
            <img src="/bear-mascot.jpeg" alt="" />
            <span className="bear-chat-presence" aria-hidden="true" />
          </span>
        </button>
      </div>

      {/* ── chat modal ── */}
      {open && (
        <div className="bear-modal-overlay" onClick={() => setOpen(false)}>
          <div className="bear-modal" onClick={(e) => e.stopPropagation()}>
            {/* header */}
            <div className="bear-modal-hd">
              <div className="bear-modal-id">
                <img src="/bear-mascot.jpeg" alt="" className="bear-modal-avatar" />
                <div>
                  <div className="bear-modal-name">GRIZZ</div>
                  <div className="bear-modal-status"><span className="bear-modal-dot" />En línea</div>
                </div>
              </div>
              <button className="bear-modal-close" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
            </div>

            {/* messages */}
            <div className="bear-modal-body">
              {messages.map((m, i) => (
                <div key={i} className={`bear-msg bear-msg--${m.role}`}>
                  {m.role === 'assistant' && <img src="/bear-mascot.jpeg" alt="" className="bear-msg-avatar" />}
                  <div className="bear-msg-bubble">
                    {m.content}
                    {m.cta && (
                      <div className="bear-msg-cta">
                        {m.cta.map((btn) => (
                          <a key={btn.href} href={btn.href} target="_blank" rel="noopener" className="bear-cta-btn">
                            {btn.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="bear-msg bear-msg--assistant">
                  <img src="/bear-mascot.jpeg" alt="" className="bear-msg-avatar" />
                  <div className="bear-msg-bubble bear-msg-typing"><span /><span /><span /></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* input */}
            <div className="bear-modal-ft">
              <input
                ref={inputRef}
                className="bear-modal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Escríbele al oso..."
                disabled={loading}
              />
              <button className="bear-modal-send" onClick={send} disabled={loading || !input.trim()} aria-label="Enviar">
                ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

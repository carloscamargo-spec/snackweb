import { useRef, useState, useEffect, useCallback } from 'react';

const BUBBLE_MSGS = ['HEY hablemos', 'Dale click aquí', 'Vamos por todo.!!!'];

type Msg = { role: 'user' | 'assistant'; content: string };

const GREETINGS: Msg[] = [
  { role: 'assistant', content: 'Grrrr... 👋 Soy GRIZZ. El oso que sabe cómo romper el mercado del entretenimiento y las apuestas en LATAM. ¿Qué tienes en mente?' },
];

const RESPONSES = [
  'Grr. Eso que me dices lo escucho todo el día de marcas que siguen poniendo banners en 2025. El problema no es el presupuesto, es que siguen pensando en interrumpir y no en entretener. Hay que cambiar el chip.',
  'Escúchame bien: el usuario de apuestas no es fiel a la plataforma, es fiel a la emoción. Si tu marca no genera esa emoción antes del partido... ya perdiste. Grrr.',
  'Mira, este oso ha visto mil "estrategias de contenido" que son básicamente un calendario de posts con el logo. Eso no es estrategia, eso es decoración. Necesitas narrativa, personajes, arcos. Como Netflix pero para apuestas.',
  '¿Sabes por qué Bet365 sigue ganando en LATAM? No es por las cuotas. Es porque la gente los conoce. El awareness lo construye el entretenimiento, no el descuento del 20% en el primer depósito.',
  'Grrrr. Me alegra que lo preguntes. El mercado colombiano está subvalorado. Hay una audiencia que ya está en TikTok viendo contenido de fútbol 4 horas al día y ninguna casa de apuestas les está hablando en su idioma. Ahí está el dinero.',
  'Lo que me describes suena a que están intentando hacer marketing de performance disfrazado de contenido. Y eso se nota. La audiencia huele el oportunismo a kilómetros. Hay que ser genuino o no hacer nada.',
  'Grr, dato que pocos saben: el contenido de entretenimiento tiene un ROI 3x mayor que el paid media en retención de usuarios de gaming. No lo digo yo, lo dicen los números. Y los números no mienten, solo las marcas aburridas.',
  '¿Influencers? Grrr. Depende. Un nano-influencer que genuinamente ama el fútbol y las apuestas vale más que un macro que publica todo lo que le pagan. La autenticidad en este mercado es escasa y carísima.',
  'Brasil, México, Colombia, Perú... cada mercado es un animal diferente. El que llega con una estrategia copy-paste de España se estrella. Hay que entender la cultura local, los equipos, los rituales del partido. Eso es lo que hacemos nosotros.',
  'Grrrr. Me encanta esa pregunta. El futuro del betting no es la cuota mejorada, es la experiencia. Imagínate una transmisión donde el contenido y la apuesta son lo mismo. Eso es lo que viene y pocas marcas están listos para eso.',
  'Este oso tiene una regla: si tu contenido puede existir sin tu marca, está mal hecho. El contenido tiene que ser tan tuyo que sin el logo igual se sabe que es tuyo. Eso es construcción de marca de verdad.',
  'Grr. El problema de los operadores chicos no es el presupuesto, es la cobardía creativa. Tienen miedo de hacer algo que no haya hecho la competencia. Pero precisamente ahí está la oportunidad — hacer lo que los grandes no se atreven.',
  '¿Temporada de fútbol? Para nosotros es temporada alta todo el año. Champions, eliminatorias, ligas locales, básquet, eSports... el calendario siempre está lleno. El que solo activa en el Mundial está perdiendo el 80% del año.',
  'Grrrr, sí. La retención es el nuevo adquisición. Todos gastan millones trayendo usuarios y luego los abandonan con un email genérico. Si invirtieras el 30% de tu presupuesto de adquisición en contenido de retención, los números cambiarían completamente.',
  '¿Quieres saber el secreto? No hay secreto. Es trabajar, entender a la audiencia, crear contenido que valga la pena ver y repetir hasta que la marca sea parte de la cultura. Simple de decir, difícil de ejecutar. Para eso estamos nosotros. Grrr.',
  'Mira, este oso no vende humo. Si tu producto es malo, el contenido no lo salva. Pero si tu producto es bueno y nadie lo conoce, el contenido es la diferencia entre existir y dominar. ¿En cuál de los dos estás?',
  'Grr. TikTok cambió todo en LATAM. El usuario promedio de apuestas en Colombia tiene 24 años y consume más TikTok que TV. ¿Tu marca está ahí con contenido nativo o todavía están haciendo comerciales de 30 segundos?',
];

function getBearReply(): string {
  return RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
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
    const next: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: getBearReply() }]);
      setLoading(false);
    }, 900 + Math.random() * 700);
  }, [input, loading, messages]);

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
                  <div className="bear-msg-bubble">{m.content}</div>
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

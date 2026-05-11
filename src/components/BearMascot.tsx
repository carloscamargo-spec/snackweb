import { useRef, useState, useEffect, useCallback } from 'react';

const BUBBLE_MSGS = ['HEY hablemos', 'Dale click aquí', 'Vamos por todo.!!!'];

type Cta = { label: string; href?: string; trigger?: 'calendar' };
type Msg = { role: 'user' | 'assistant'; content: string; cta?: Cta[]; calendar?: boolean };

// ── Mini inline calendar ───────────────────────────────────────────────────
const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAY_NAMES = ['L','M','M','J','V','S','D'];
const TIME_SLOTS = ['9:00','10:00','11:00','14:00','15:00','16:00'];

function MiniCalendar() {
  const base = new Date(); base.setHours(0,0,0,0);
  const [year, setYear] = useState(base.getFullYear());
  const [month, setMonth] = useState(base.getMonth());
  const [selDate, setSelDate] = useState<Date | null>(null);
  const [selTime, setSelTime] = useState<string | null>(null);

  const firstDow = new Date(year, month, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({length: days}, (_,i) => i+1)];

  const disabled = (d: number) => { const dt = new Date(year,month,d); return dt < base || dt.getDay()===0 || dt.getDay()===6; };
  const selected = (d: number) => !!selDate && selDate.getFullYear()===year && selDate.getMonth()===month && selDate.getDate()===d;

  const prev = () => { if (month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1); setSelDate(null);setSelTime(null); };
  const next = () => { if (month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1); setSelDate(null);setSelTime(null); };

  const fmt = (d: Date) => { const p=(n:number)=>n.toString().padStart(2,'0'); return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`; };
  const fmtEs = (d: Date) => { const ds=['dom','lun','mar','mié','jue','vie','sáb'],ms=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']; return `${ds[d.getDay()]} ${d.getDate()} de ${ms[d.getMonth()]}`; };

  const gCalLink = () => {
    if (!selDate || !selTime) return '#';
    const h = parseInt(selTime);
    const s = new Date(selDate); s.setHours(h,0,0,0);
    const e = new Date(s); e.setHours(h+1);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reuni%C3%B3n+con+Snack+%26+Soda&details=Estrategia+de+contenido+para+betting+y+entretenimiento+en+LATAM&dates=${fmt(s)}/${fmt(e)}&add=carlos.camargo%40snackandsoda.co`;
  };
  const waLink = () => {
    if (!selDate || !selTime) return '#';
    return `https://wa.me/573214919005?text=${encodeURIComponent(`Hola Snack & Soda 👋 Quiero agendar una reunión el ${fmtEs(selDate)} a las ${selTime}h. ¡Gracias!`)}`;
  };

  return (
    <div className="bear-calendar">
      <div className="bear-cal-nav">
        <button className="bear-cal-arrow" onClick={prev}>‹</button>
        <span>{MONTH_NAMES[month]} {year}</span>
        <button className="bear-cal-arrow" onClick={next}>›</button>
      </div>
      <div className="bear-cal-grid">
        {DAY_NAMES.map((d,i) => <div key={i} className="bear-cal-dow">{d}</div>)}
        {cells.map((day,i) => day === null
          ? <div key={`g${i}`} />
          : <button key={day} className={`bear-cal-day${disabled(day)?' disabled':''}${selected(day)?' selected':''}`} disabled={disabled(day)} onClick={()=>{setSelDate(new Date(year,month,day));setSelTime(null);}}>
              {day}
            </button>
        )}
      </div>
      {selDate && (
        <div className="bear-cal-times">
          {TIME_SLOTS.map(t => (
            <button key={t} className={`bear-cal-time${selTime===t?' selected':''}`} onClick={()=>setSelTime(t)}>{t}</button>
          ))}
        </div>
      )}
      {selDate && selTime && (
        <div className="bear-cal-actions">
          <a href={gCalLink()} target="_blank" rel="noopener" className="bear-cta-btn">📅 Confirmar en Google Calendar</a>
          <a href={waLink()} target="_blank" rel="noopener" className="bear-cta-btn bear-cta-btn--wa">💬 WhatsApp · +57 321 491 9005</a>
        </div>
      )}
    </div>
  );
}

// ── Chat data ──────────────────────────────────────────────────────────────
const GREETINGS: Msg[] = [
  {
    role: 'assistant',
    content: 'Grrrr... 👋 Soy GRIZZ. El oso que sabe cómo romper el mercado del entretenimiento y las apuestas en LATAM. ¿Qué tienes en mente?',
    cta: [{ label: '🚀 Quiero agendar una reunión que me vuele la cabeza', trigger: 'calendar' }],
  },
];

const QUALIFY_RESPONSES = [
  'Grr, bien. Antes de que este oso opine, necesito saber con quién hablo. ¿En qué mercado están operando — Colombia, México, otro país de LATAM? ¿Y qué tipo de operación: betting, gaming, entretenimiento?',
  'Escúchame. Cada caso es distinto y este oso odia las respuestas genéricas. ¿Me cuentas en qué vertical están — apuestas, casino, esports, entretenimiento? ¿Y cuál es el mercado principal?',
  'Grrr, me interesa. Pero primero dime: ¿son operadores, una marca de entretenimiento o una agencia buscando alianza? Eso cambia todo lo que te voy a decir.',
  'Bien, bien. ¿Están arrancando o ya tienen operación corriendo? Porque el arranque y la retención son juegos completamente distintos. ¿Cuál es tu caso?',
  'Grr. Antes de hablar de soluciones, necesito entender el panorama. ¿Qué es lo que más quieren potenciar ahorita — adquisición, retención, o construir marca desde cero?',
];

const DEEPEN_RESPONSES = [
  'Ajá, eso ya me dice mucho. Grr. ¿Y qué han probado hasta ahora? Porque si me dices "pauta en Meta y posts en Instagram" ya sé exactamente cuál es la oportunidad — y es grande.',
  'Interesante. Entonces el reto no es solo visibilidad, es relevancia. Grrr. ¿Tienen ya algún activo de contenido — canal, personaje, formato — o están construyendo desde cero?',
  'Grr, eso tiene más capas de las que parece. ¿Están midiendo retención de usuarios o solo están enfocados en adquisición? Porque ahí suele estar la mayor oportunidad sin explotar.',
  'Eso que describes lo conozco bien. Grrr. ¿Tienen equipo interno de contenido o están tercerizando todo? Eso define la estrategia que tiene más sentido para ustedes.',
  'Buena respuesta. Ahora la pregunta que define todo: ¿qué quieren que la audiencia sienta cuando ve su marca? Eso es el norte de todo lo demás.',
];

const PUSH_MEETING_REPLIES: Omit<Msg, 'role'>[] = [
  {
    content: `Grrrr. Llevamos un rato hablando y esto ya da para más que un chat con un oso. Lo que me describes tiene solución concreta — pero necesita 30 minutos con el equipo.\n\nElige el día y la hora que mejor te quede:`,
    calendar: true,
  },
  {
    content: `Grr. Este oso puede darte insights todo el día — pero la conversación que de verdad mueve la aguja pasa en persona. 30 minutos, sin pitch, puro valor.\n\nAgenda cuando quieras:`,
    calendar: true,
  },
];

const RESPONSES = [
  'Escúchame bien: el usuario de apuestas no es fiel a la plataforma, es fiel a la emoción. Si tu marca no genera esa emoción antes del partido... ya ganaste terreno. Grrr. ¿Qué están haciendo hoy para generar esa conexión?',
  'Mira, este oso ha visto mil "estrategias de contenido" que son básicamente un calendario de posts con el logo. La oportunidad está en la narrativa, los personajes, los arcos. Como Netflix pero para apuestas. ¿Tienen algo de eso?',
  '¿Sabes por qué los grandes del betting siguen ganando en LATAM? No es por las cuotas. Es porque la gente los conoce. El awareness lo construye el entretenimiento. ¿En qué están invirtiendo más ahora?',
  'Grrrr. El mercado colombiano está lleno de oportunidades. Hay audiencia en TikTok viendo fútbol 4 horas al día y pocas marcas les hablan en su idioma. Ahí está la ventana. ¿Están activos en TikTok?',
  'Grr, dato clave: el contenido de entretenimiento tiene ROI 3x mayor que paid media en retención de usuarios gaming. Los números no mienten. ¿Están midiendo retención o solo adquisición?',
  'Brasil, México, Colombia... cada mercado es un animal diferente. El que llega con copy-paste se estrella. ¿Ya tienen claro cómo adaptar el tono a cada plaza o están usando el mismo contenido para todo?',
  'Grrrr. El futuro del betting no es la cuota mejorada, es la experiencia. Imagínate una transmisión donde el contenido y la apuesta son lo mismo. ¿Tienen algo así en el roadmap?',
  'Este oso tiene una regla: si tu contenido puede existir sin tu marca, está mal hecho. Tiene que ser tan tuyo que sin el logo igual se sabe. ¿Eso aplica a lo que están produciendo ahora?',
  'Grr. Los operadores que crecen más rápido son los que se atreven a hacer lo que la competencia no ha hecho. Precisamente ahí está la oportunidad. ¿Cuál es la jugada más ambiciosa que han considerado?',
  'Grrrr, sí. La retención es la nueva adquisición. Todos invierten en traer usuarios y luego los descuidan. Si el 30% del presupuesto de adquisición fuera a contenido de retención, los números cambiarían completamente.',
];

const CONTACT_KEYWORDS = ['contacto', 'contactar', 'correo', 'email', 'mail', 'teléfono', 'telefono', 'whatsapp', 'whats', 'llamar', 'escribir', 'número', 'numero', 'cel', 'celular', 'comunicar'];
const MEETING_KEYWORDS = ['especialista', 'profesional', 'experto', 'equipo', 'precio', 'precios', 'costo', 'costos', 'cotizar', 'cotización', 'cotizacion', 'presupuesto', 'cuanto cuesta', 'cuánto cuesta', 'cuanto vale', 'cuánto vale', 'servicios', 'contratar', 'reunión', 'reunion', 'agendar', 'agenda', 'cita', 'llamada', 'hablar con alguien', 'quiero hablar', 'hablar con'];

const CONTACT_REPLY = `Grr, claro que sí. Así nos encuentras:\n\n📧 snackandsoda.co\n📱 WhatsApp: +57 321 491 9005\n\nEscríbenos, respondemos en menos de 48h. O llena el formulario aquí en la página. Este oso no deja mensajes sin responder. Grrr.`;

const CALENDAR_REPLY: Omit<Msg, 'role'> = {
  content: `Grrrr, perfecto. 🐻 El equipo tiene 30 minutos para ti — sin humo, puro valor.\n\nElige el día y la hora que mejor te quede:`,
  calendar: true,
};

function getBearReply(userText: string, userMsgCount: number, meetingOffered: boolean): Omit<Msg, 'role'> {
  const lower = userText.toLowerCase();
  if (MEETING_KEYWORDS.some(k => lower.includes(k))) return CALENDAR_REPLY;
  if (CONTACT_KEYWORDS.some(k => lower.includes(k))) return { content: CONTACT_REPLY };
  if (userMsgCount === 1) return { content: QUALIFY_RESPONSES[Math.floor(Math.random() * QUALIFY_RESPONSES.length)] };
  if (userMsgCount === 2) return { content: DEEPEN_RESPONSES[Math.floor(Math.random() * DEEPEN_RESPONSES.length)] };
  if (userMsgCount >= 3 && !meetingOffered) return PUSH_MEETING_REPLIES[Math.floor(Math.random() * PUSH_MEETING_REPLIES.length)];
  return { content: RESPONSES[Math.floor(Math.random() * RESPONSES.length)] };
}

// ── Component ──────────────────────────────────────────────────────────────
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

  useEffect(() => {
    const id = setInterval(() => setMsgIdx(i => (i + 1) % BUBBLE_MSGS.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 120); }, [open]);

  useEffect(() => {
    if (open) {
      const y = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${y}px`;
      document.body.style.width = '100%';
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (top) window.scrollTo(0, -parseInt(top));
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (top) window.scrollTo(0, -parseInt(top));
    };
  }, [open]);

  const showCalendar = useCallback(() => {
    if (meetingOffered) return;
    setMeetingOffered(true);
    setLoading(true);
    setTimeout(() => {
      setMessages(m => [...m, { role: 'assistant', ...CALENDAR_REPLY }]);
      setLoading(false);
    }, 600);
  }, [meetingOffered]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    const nextCount = userMsgCount + 1;
    setMessages(m => [...m, { role: 'user', content: text }]);
    setUserMsgCount(nextCount);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const reply = getBearReply(text, nextCount, meetingOffered);
      if (reply.calendar) setMeetingOffered(true);
      setMessages(m => [...m, { role: 'assistant', ...reply }]);
      setLoading(false);
    }, 900 + Math.random() * 700);
  }, [input, loading, userMsgCount, meetingOffered]);

  const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* floating trigger */}
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

      {/* chat modal */}
      {open && (
        <div className="bear-modal-overlay" onClick={() => setOpen(false)}>
          <div className="bear-modal" onClick={e => e.stopPropagation()}>
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

            <div className="bear-modal-body">
              {messages.map((m, i) => (
                <div key={i} className={`bear-msg bear-msg--${m.role}`}>
                  {m.role === 'assistant' && <img src="/bear-mascot.jpeg" alt="" className="bear-msg-avatar" />}
                  <div className="bear-msg-bubble">
                    {m.content}
                    {m.calendar && <MiniCalendar />}
                    {m.cta && (
                      <div className="bear-msg-cta">
                        {m.cta.map(btn => btn.href
                          ? <a key={btn.label} href={btn.href} target="_blank" rel="noopener" className="bear-cta-btn">{btn.label}</a>
                          : <button key={btn.label} className="bear-cta-btn" onClick={showCalendar}>{btn.label}</button>
                        )}
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

            <div className="bear-modal-ft">
              <input
                ref={inputRef}
                className="bear-modal-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Escríbele al oso..."
                disabled={loading}
              />
              <button className="bear-modal-send" onClick={send} disabled={loading || !input.trim()} aria-label="Enviar">↑</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

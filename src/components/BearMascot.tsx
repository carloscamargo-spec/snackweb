import { useRef, useState, useEffect, useCallback } from 'react';

const BUBBLE_MSGS = ['HEY hablemos', 'Dale click aquí', 'Vamos por todo.!!!'];

type Msg = { role: 'user' | 'assistant'; content: string };

const GREETINGS: Msg[] = [
  { role: 'assistant', content: 'Grrrr... 👋 Soy GRIZZ. El oso que sabe cómo romper el mercado del entretenimiento y las apuestas en LATAM. ¿Qué tienes en mente?' },
];

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
    try {
      const res = await fetch('/.netlify/functions/bear-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || data.error }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Grr... algo falló. Intenta de nuevo.' }]);
    } finally {
      setLoading(false);
    }
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

import { useRef, useState, useEffect } from 'react';

export default function BearMascot() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
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
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <a
      ref={ref}
      href="#contacto"
      className={`bear-chat ${hidden ? 'is-hidden' : ''}`}
      aria-label="Hablemos con el oso"
    >
      <span className="bear-chat-bubble">
        <span className="bear-chat-text">hey, hablemos</span>
        <span className="bear-chat-tail" aria-hidden="true" />
      </span>
      <span className="bear-chat-avatar">
        <img src="/bear-mascot.jpeg" alt="" />
        <span className="bear-chat-presence" aria-hidden="true" />
      </span>
    </a>
  );
}

import { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      setTime(`BOG ${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label="Snack and Soda">
          <img src="/logo-snack-and-soda-white.png" alt="Snack and Soda" />
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="#problema">01 — Problema</a>
          <a href="#manifiesto">02 — Manifiesto</a>
          <a href="#verdad">03 — Datos</a>
          <a href="#framework">05 — Framework</a>
          <a href="#casos">06 — Casos</a>
        </nav>
        <div className="nav-cta">
          <span className="nav-clock">{time} · COLOMBIA</span>
          <div className="nav-social" aria-label="Redes sociales">
            <a href="https://instagram.com/" target="_blank" rel="noopener" className="nav-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://tiktok.com/" target="_blank" rel="noopener" className="nav-social-link" aria-label="TikTok">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M16.5 3h-2.7v12.2a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12v-2.78a5.4 5.4 0 1 0 4.62 5.34V8.43a6.7 6.7 0 0 0 4 1.32V7a4 4 0 0 1-4-4z" />
              </svg>
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener" className="nav-social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

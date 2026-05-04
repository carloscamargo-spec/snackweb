import { useState, useEffect } from 'react';

const LINKS = [
  { href: '#problema',   num: '01', label: 'Problema' },
  { href: '#manifiesto', num: '02', label: 'Manifiesto' },
  { href: '#verdad',     num: '03', label: 'Datos' },
  { href: '#framework',  num: '05', label: 'Framework' },
  { href: '#casos',      num: '06', label: 'Casos' },
  { href: '#contacto',   num: '07', label: 'Hablemos' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`BOG ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (menuOpen) {
      const y = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${y}px`;
      document.body.style.width = '100%';
    } else {
      const y = Math.abs(parseInt(document.body.style.top || '0'));
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (y) window.scrollTo(0, y);
    }
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="Snack and Soda" onClick={close}>
            <img src="/logo-snack-and-soda-white.png" alt="Snack and Soda" />
          </a>
          <nav className="nav-links" aria-label="Main">
            {LINKS.map(l => <a key={l.href} href={l.href}>{l.num} — {l.label}</a>)}
          </nav>
          <div className="nav-cta">
            <span className="nav-clock">{time} · COLOMBIA</span>
            <div className="nav-social" aria-label="Redes sociales">
              <a href="https://www.instagram.com/snackandsoda/" target="_blank" rel="noopener" className="nav-social-link" aria-label="Instagram">
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
              <a href="https://www.youtube.com/@SnackAndSoda" target="_blank" rel="noopener" className="nav-social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
                </svg>
              </a>
            </div>
            {/* Hamburger — mobile only */}
            <button
              className={`nav-burger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <button className="mobile-menu-close" onClick={close} aria-label="Cerrar menú">✕</button>
        <nav className="mobile-menu-links">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              style={{ transitionDelay: menuOpen ? `${i * 55}ms` : '0ms' }}
            >
              <span className="mobile-menu-num">{l.num}</span>
              <span className="mobile-menu-label">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <span>{time} · COLOMBIA</span>
          <div className="nav-social">
            <a href="https://www.instagram.com/snackandsoda/" target="_blank" rel="noopener" className="nav-social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://tiktok.com/" target="_blank" rel="noopener" className="nav-social-link" aria-label="TikTok">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M16.5 3h-2.7v12.2a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12v-2.78a5.4 5.4 0 1 0 4.62 5.34V8.43a6.7 6.7 0 0 0 4 1.32V7a4 4 0 0 1-4-4z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@SnackAndSoda" target="_blank" rel="noopener" className="nav-social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col col-1">
          <div className="key">Manifiesto</div>
          <div className="val" style={{ maxWidth: '32ch', lineHeight: 1.5 }}>
            Entretenimiento, betting &amp; gaming agency para LATAM. Hacemos contenido para
            audiencias que odian los anuncios.
          </div>
        </div>
        <div className="footer-col col-2">
          <div className="key">Contacto</div>
          <a className="val" href="mailto:carlos.camargo@snackandsoda.co">carlos.camargo@snackandsoda.co</a>
          <a className="val" href="mailto:andres.rodriguez@snackandsoda.co">andres.rodriguez@snackandsoda.co</a>
          <a className="val" href="https://snackandsoda.co">snackandsoda.co</a>
        </div>
        <div className="footer-col col-3">
          <div className="key">Navegación</div>
          <a className="val" href="#problema">El problema</a>
          <a className="val" href="#framework">Framework</a>
          <a className="val" href="#casos">Casos</a>
          <a className="val" href="#contacto">Hablemos</a>
        </div>
        <div className="footer-col col-4">
          <div className="key">Social</div>
          <a className="val" href="https://instagram.com/" target="_blank" rel="noopener">Instagram ↗</a>
          <a className="val" href="https://youtube.com/" target="_blank" rel="noopener">YouTube ↗</a>
          <a className="val" href="https://tiktok.com/" target="_blank" rel="noopener">TikTok ↗</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Snack &amp; Soda. Hecho en LATAM.</div>
        <div className="right">
          <span>Privacidad</span>
          <span>Términos</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}

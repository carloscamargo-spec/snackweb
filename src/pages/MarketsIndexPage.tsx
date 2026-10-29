import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import BearMascot from '../components/BearMascot';
import PageHero from '../components/PageHero';
import { MARKETS } from '../data/markets';
import { marketPath } from '../routes';

export default function MarketsIndexPage() {
  useReveal();

  return (
    <>
      <Nav />
      <main>
        <PageHero
          image="/bear-parachute.webp"
          imagePosition="center 30%"
          crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Mercados' }]}
          label={<><span className="num">LATAM</span><span>Mercados</span></>}
          title={<>publicidad para casas de apuestas en <em>latam.</em></>}
          tagline={<>
            <strong>Aterrizamos donde está tu audiencia.</strong> Contenido y publicidad para operadores de
            apuestas e iGaming en Colombia, México, Perú, Argentina, Ecuador y Centroamérica.
          </>}
          meta={MARKETS.map((m) => m.countryCode)}
        />

        <section className="section page-more">
          <div className="section-head">
            <div className="label reveal"><span className="num">{String(MARKETS.length).padStart(2, '0')}</span><span>Países</span></div>
            <h2 className="title reveal delay-1">un idioma, <em>muchas hinchadas.</em></h2>
          </div>
          <ul className="page-more-list">
            {MARKETS.map((m) => (
              <li key={m.slug} className="reveal">
                <a href={marketPath(m.slug)}>
                  <span className="page-more-client">{m.countryCode}</span>
                  <span className="page-more-title">{m.country.toLowerCase()}<em>.</em></span>
                  <span className="page-more-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="page-cta">
          <div className="page-cta-label">07 — Hablemos</div>
          <p className="page-cta-title">¿en qué país <em>juegas?</em></p>
          <a className="form-submit" href="/#contacto">Hablemos <span className="arrow">→</span></a>
        </section>
      </main>
      <Footer />
      <BearMascot />
    </>
  );
}

import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { CASE_STUDIES } from '../data/caseStudies';
import { MARKETS, MARKETS_REVIEWED } from '../data/markets';
import { casePath, marketPath, MARKETS_PATH } from '../routes';
import type { Market } from '../types';

interface MarketPageProps {
  market: Market;
}

const pad = (n: number): string => String(n).padStart(2, '0');

export default function MarketPage({ market }: MarketPageProps) {
  useReveal();
  const cases = CASE_STUDIES.filter((c) => market.caseSlugs.includes(c.slug));
  const others = MARKETS.filter((m) => m.slug !== market.slug);

  return (
    <>
      <Nav />
      <main>
        <PageHero
          image="/bear-parachute.webp"
          imagePosition="center 30%"
          crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Mercados', href: MARKETS_PATH }, { label: market.country }]}
          label={<><span className="num">{market.countryCode}</span><span>Agencia de contenido y publicidad</span></>}
          title={<>{market.displayTitle[0]} <em>{market.displayTitle[1]}</em></>}
          tagline={market.summary}
          meta={['Casas de apuestas', 'iGaming', 'Entretenimiento']}
        />

        <section className="section page-case-section">
          <div className="section-head">
            <div className="label reveal"><span className="num">01</span><span>La audiencia</span></div>
            <h2 className="title page-case-title reveal delay-1">quién <em>mira.</em></h2>
          </div>
          <div className="page-case-text reveal delay-2"><p>{market.audience}</p></div>
        </section>

        <section className="section page-case-section">
          <div className="section-head">
            <div className="label reveal"><span className="num">02</span><span>El marco</span></div>
            <h2 className="title page-case-title reveal delay-1">las reglas del <em>juego.</em></h2>
          </div>
          <div className="page-case-text reveal delay-2">
            <p>{market.regulation}</p>
            <p className="page-note">
              Resumen de fuentes públicas a {MARKETS_REVIEWED}. No es asesoría legal: revisamos cada campaña con el
              área legal del operador.
            </p>
          </div>
        </section>

        <section className="section page-case-section">
          <div className="section-head">
            <div className="label reveal"><span className="num">03</span><span>Cómo trabajamos</span></div>
            <h2 className="title page-case-title reveal delay-1">nuestro <em>enfoque.</em></h2>
          </div>
          <div className="page-case-text reveal delay-2">
            <ul>{market.approach.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </section>

        <section className="section cases">
          <div className="section-head">
            <div className="label reveal"><span className="num">04</span><span>Casos</span></div>
            <h2 className="title reveal delay-1">lo que ya <em>hicimos.</em></h2>
          </div>
          <ul className="cases-list page-case-grid">
            {cases.map((c, i) => (
              <li key={c.slug} className="item reveal">
                <a href={casePath(c.slug)}>
                  <div className="thumb">
                    <img src={`https://i.ytimg.com/vi/${c.videos[0].id}/hqdefault.jpg`} alt="" loading="lazy" />
                    <span className="play" aria-hidden="true">▶</span>
                    <span className="case-num">{pad(i + 1)}</span>
                  </div>
                  <div className="num">CASE · {c.client.toUpperCase()} · {c.market.toUpperCase()}</div>
                  <h3 className="ttl">{c.displayTitle[0]} <em>{c.displayTitle[1]}</em></h3>
                  <span className="case-link">Ver caso <span aria-hidden="true">→</span></span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="page-cta">
          <div className="page-cta-label">07 — Hablemos</div>
          <p className="page-cta-title">¿operas en <em>{market.country.toLowerCase()}?</em></p>
          <a className="form-submit" href="/#contacto">Hablemos <span className="arrow">→</span></a>
        </section>

        <section className="section page-more" aria-label="Otros mercados">
          <div className="section-head">
            <div className="label"><span className="num">+</span><span>Otros mercados</span></div>
          </div>
          <ul className="page-more-list">
            {others.map((m) => (
              <li key={m.slug}>
                <a href={marketPath(m.slug)}>
                  <span className="page-more-client">{m.countryCode}</span>
                  <span className="page-more-title">{m.country.toLowerCase()}<em>.</em></span>
                  <span className="page-more-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { CASE_STUDIES } from '../data/caseStudies';
import { casePath } from '../routes';

const pad = (n: number): string => String(n).padStart(2, '0');

export default function CasesIndexPage() {
  useReveal();

  return (
    <>
      <Nav />
      <main>
        <PageHero
          image="/bear-parachute.webp"
          imagePosition="center 30%"
          crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Casos' }]}
          label={<><span className="num">06</span><span>Casos de éxito</span></>}
          title={<>casos de éxito en <em>betting &amp; gaming.</em></>}
          tagline={<>
            <strong>Aterrizamos donde la audiencia está.</strong> Campañas y productos para operadores
            de apuestas en Colombia y LATAM: del fútbol con René Higuita y Óscar Córdoba a la retención
            con inteligencia artificial.
          </>}
          meta={['Wplay', 'YaJuego', 'LUKA']}
        />

        <section className="section cases">
          <div className="section-head">
            <div className="label reveal">
              <span className="num">{pad(CASE_STUDIES.length)}</span>
              <span>Clientes</span>
            </div>
            <h2 className="title reveal delay-1">
              contenido que la audiencia <em>eligió ver.</em>
            </h2>
          </div>

          <ul className="cases-list page-case-grid">
            {CASE_STUDIES.map((c, i) => (
              <li key={c.slug} className="item reveal">
                <a href={casePath(c.slug)}>
                  <div className="thumb">
                    <img src={`https://i.ytimg.com/vi/${c.videos[0].id}/hqdefault.jpg`} alt="" loading="lazy" />
                    <span className="play" aria-hidden="true">▶</span>
                    <span className="case-num">{pad(i + 1)}</span>
                  </div>
                  <div className="num">CASE / {pad(i + 1)} · {c.market.toUpperCase()} · {c.years}</div>
                  <h3 className="ttl">{c.displayTitle[0]} <em>{c.displayTitle[1]}</em></h3>
                  <p className="page-case-summary">{c.summary}</p>
                  <span className="case-link">Ver caso <span aria-hidden="true">→</span></span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="page-cta">
          <div className="page-cta-label">07 — Hablemos</div>
          <p className="page-cta-title">¿tu marca es el <em>próximo caso?</em></p>
          <a className="form-submit" href="/#contacto">Hablemos <span className="arrow">→</span></a>
        </section>
      </main>
      <Footer />
    </>
  );
}

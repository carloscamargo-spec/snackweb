import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { CASE_STUDIES } from '../data/caseStudies';
import { casePath } from '../routes';

export default function CasesIndexPage() {
  useReveal();

  return (
    <>
      <Nav />
      <main className="case-page">
        <header className="case-hero">
          <nav className="case-crumbs" aria-label="Migas de pan">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <span>Casos</span>
          </nav>
          <div className="case-eyebrow">Casos de éxito</div>
          <h1 className="case-title">Contenido para casas de apuestas que la audiencia elige ver</h1>
          <p className="case-summary">
            Campañas y productos que hicimos para operadores de betting y gaming en Colombia y LATAM:
            del fútbol con René Higuita y Óscar Córdoba a la retención con inteligencia artificial.
          </p>
        </header>

        <ul className="case-grid">
          {CASE_STUDIES.map((c) => (
            <li key={c.slug} className="reveal">
              <a href={casePath(c.slug)}>
                <img src={`https://i.ytimg.com/vi/${c.videos[0].id}/hqdefault.jpg`} alt="" loading="lazy" />
                <span className="case-grid-meta">{c.client} · {c.market} · {c.years}</span>
                <h2>{c.title}</h2>
                <p>{c.summary}</p>
                <span className="case-grid-link">Ver caso <span aria-hidden="true">→</span></span>
              </a>
            </li>
          ))}
        </ul>

        <section className="case-cta">
          <p>¿Quieres que tu marca sea el próximo caso?</p>
          <a className="case-cta-btn" href="/#contacto">Hablemos <span aria-hidden="true">→</span></a>
        </section>
      </main>
      <Footer />
    </>
  );
}

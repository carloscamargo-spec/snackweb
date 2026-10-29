import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { CASE_STUDIES } from '../data/caseStudies';
import { casePath } from '../routes';
import type { CaseStudy } from '../types';

interface CaseStudyPageProps {
  study: CaseStudy;
}

export default function CaseStudyPage({ study }: CaseStudyPageProps) {
  useReveal();
  const [videoIdx, setVideoIdx] = useState(0);
  const video = study.videos[videoIdx];
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug);

  return (
    <>
      <Nav />
      <main className="case-page">
        <header className="case-hero">
          <nav className="case-crumbs" aria-label="Migas de pan">
            <a href="/">Inicio</a>
            <span aria-hidden="true">/</span>
            <a href="/casos/">Casos</a>
            <span aria-hidden="true">/</span>
            <span>{study.shortTitle}</span>
          </nav>
          <div className="case-eyebrow">Caso de éxito · {study.client}</div>
          <h1 className="case-title">{study.title}</h1>
          <p className="case-summary">{study.summary}</p>
          <dl className="case-facts">
            <div><dt>Cliente</dt><dd>{study.client}</dd></div>
            <div><dt>Categoría</dt><dd>{study.category}</dd></div>
            <div><dt>Mercado</dt><dd>{study.market}</dd></div>
            <div><dt>Años</dt><dd>{study.years}</dd></div>
          </dl>
        </header>

        <section className="case-video" aria-label="Videos de la campaña">
          <div className="case-video-frame">
            <iframe
              key={video.id}
              src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
              title={video.name}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {study.videos.length > 1 && (
            <ol className="case-video-list">
              {study.videos.map((v, i) => (
                <li key={v.id}>
                  <button
                    type="button"
                    className={i === videoIdx ? 'active' : ''}
                    onClick={() => setVideoIdx(i)}
                    aria-current={i === videoIdx}
                  >
                    <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt="" loading="lazy" />
                    <span>{v.name}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="case-body">
          <div className="case-block reveal">
            <h2>El reto</h2>
            <p>{study.challenge}</p>
          </div>
          <div className="case-block reveal">
            <h2>La idea</h2>
            <p>{study.idea}</p>
          </div>
          <div className="case-block reveal">
            <h2>La ejecución</h2>
            <ul>
              {study.execution.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          {study.results.length > 0 && (
            <div className="case-block reveal">
              <h2>Resultados</h2>
              <dl className="case-results">
                {study.results.map((r) => (
                  <div key={r.label}><dt>{r.value}</dt><dd>{r.label}</dd></div>
                ))}
              </dl>
            </div>
          )}
          {study.awards && study.awards.length > 0 && (
            <div className="case-block reveal">
              <h2>Reconocimientos</h2>
              <ul>
                {study.awards.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          )}
        </section>

        <section className="case-cta">
          <p>¿Tu marca de apuestas también quiere contenido que la audiencia elija ver?</p>
          <a className="case-cta-btn" href="/#contacto">Hablemos <span aria-hidden="true">→</span></a>
        </section>

        <section className="case-more" aria-label="Más casos">
          <h2>Más casos</h2>
          <ul>
            {others.map((c) => (
              <li key={c.slug}>
                <a href={casePath(c.slug)}>
                  <span className="case-more-client">{c.client}</span>
                  <span className="case-more-title">{c.title}</span>
                  <span aria-hidden="true">→</span>
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

import { useState } from 'react';
import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { CASE_STUDIES } from '../data/caseStudies';
import { casePath, CASES_PATH } from '../routes';
import type { CaseStudy } from '../types';

interface CaseStudyPageProps {
  study: CaseStudy;
}

const pad = (n: number): string => String(n).padStart(2, '0');

interface CaseSectionProps {
  num: number;
  label: string;
  title: [string, string];
  children: ReactNode;
}

function CaseSection({ num, label, title, children }: CaseSectionProps) {
  return (
    <section className="section page-case-section">
      <div className="section-head">
        <div className="label reveal">
          <span className="num">{pad(num)}</span>
          <span>{label}</span>
        </div>
        <h2 className="title page-case-title reveal delay-1">
          {title[0]} <em>{title[1]}</em>
        </h2>
      </div>
      <div className="page-case-text reveal delay-2">{children}</div>
    </section>
  );
}

export default function CaseStudyPage({ study }: CaseStudyPageProps) {
  useReveal();
  const [videoIdx, setVideoIdx] = useState(0);
  const video = study.videos[videoIdx];
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug);
  let n = 0;

  return (
    <>
      <Nav />
      <main>
        <PageHero
          image="/bear-beach.webp"
          imagePosition="center 35%"
          crumbs={[{ label: 'Inicio', href: '/' }, { label: 'Casos', href: CASES_PATH }, { label: study.shortTitle }]}
          label={<><span className="num">CASE</span><span>{study.client}</span></>}
          title={<>{study.displayTitle[0]} <em>{study.displayTitle[1]}</em></>}
          tagline={study.summary}
          meta={[study.market, study.years, study.category]}
        />

        <CaseSection num={++n} label="El reto" title={['el', 'reto.']}>
          <p>{study.challenge}</p>
        </CaseSection>

        <CaseSection num={++n} label="La idea" title={['la', 'idea.']}>
          <p>{study.idea}</p>
        </CaseSection>

        <CaseSection num={++n} label="La ejecución" title={['la', 'ejecución.']}>
          <ul>
            {study.execution.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </CaseSection>

        {study.results.length > 0 && (
          <CaseSection num={++n} label="Resultados" title={['los', 'resultados.']}>
            <dl className="page-case-results">
              {study.results.map((r) => (
                <div key={r.label}><dt>{r.value}</dt><dd>{r.label}</dd></div>
              ))}
            </dl>
          </CaseSection>
        )}

        {study.awards && study.awards.length > 0 && (
          <CaseSection num={++n} label="Reconocimientos" title={['en la', 'vitrina.']}>
            <ul>
              {study.awards.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </CaseSection>
        )}

        <section className="section cases" aria-label="Videos de la campaña">
          <div className="section-head">
            <div className="label reveal">
              <span className="num">{pad(++n)}</span>
              <span>Videos</span>
            </div>
            <h2 className="title reveal delay-1">
              la campaña <em>en video.</em>
            </h2>
          </div>

          <div className="cases-track-wrap">
            <div className="cases-stage" key={video.id}>
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                title={video.name}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {study.videos.length > 1 && (
            <div className="cases-list">
              {study.videos.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  className={`item ${i === videoIdx ? 'active' : ''}`}
                  onClick={() => setVideoIdx(i)}
                  aria-pressed={i === videoIdx}
                >
                  <div className="thumb">
                    <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
                    <span className="play" aria-hidden="true">▶</span>
                    <span className="case-num">{pad(i + 1)}</span>
                  </div>
                  <div className="num">VIDEO / {pad(i + 1)}</div>
                  <div className="ttl">{v.name}</div>
                  <div className="meta">{v.uploadDate.slice(0, 4)}</div>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="page-cta">
          <div className="page-cta-label">07 — Hablemos</div>
          <p className="page-cta-title">¿tu marca es el <em>próximo caso?</em></p>
          <a className="form-submit" href="/#contacto">Hablemos <span className="arrow">→</span></a>
        </section>

        <section className="section page-more" aria-label="Más casos">
          <div className="section-head">
            <div className="label">
              <span className="num">+</span>
              <span>Más casos</span>
            </div>
          </div>
          <ul className="page-more-list">
            {others.map((c) => (
              <li key={c.slug}>
                <a href={casePath(c.slug)}>
                  <span className="page-more-client">{c.client}</span>
                  <span className="page-more-title">{c.displayTitle[0]} <em>{c.displayTitle[1]}</em></span>
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

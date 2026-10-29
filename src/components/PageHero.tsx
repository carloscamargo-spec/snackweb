import type { ReactNode } from 'react';

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image: string;
  imagePosition?: string;
  crumbs: Crumb[];
  label: ReactNode;
  title: ReactNode;
  tagline: ReactNode;
  meta?: string[];
}

// Subpage version of the home hero: same vignette, display type and meta row,
// with a still image instead of the looping video.
export default function PageHero({ image, imagePosition = 'center', crumbs, label, title, tagline, meta = [] }: PageHeroProps) {
  return (
    <section id="top" className="hero page-hero">
      <img className="hero-video" src={image} alt="" style={{ objectPosition: imagePosition }}/>
      <div className="hero-vignette" />

      <div className="hero-content">
        <nav className="page-crumbs" aria-label="Migas de pan">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span className="sep" aria-hidden="true">/</span>}
              {c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>

        <div className="hero-bottom">
          <div className="page-hero-label reveal">{label}</div>
          <h1 className="page-hero-title reveal delay-1">{title}</h1>
          <div className="hero-sub">
            <p className="hero-tagline reveal delay-2">{tagline}</p>
            {meta.length > 0 && (
              <div className="hero-index page-hero-meta reveal delay-2">
                {meta.map((m, i) => (
                  <span key={m}>{i > 0 && <span className="sep">·</span>}{m}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

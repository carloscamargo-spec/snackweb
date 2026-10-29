import { CASE_STUDIES, findCaseStudy } from './data/caseStudies';
import type { CaseStudy, CaseVideo } from './types';

export const SITE_URL = 'https://snackandsoda.co';
const ORG_ID = `${SITE_URL}/#organization`;

export type Route =
  | { kind: 'home'; path: '/' }
  | { kind: 'cases'; path: '/casos/' }
  | { kind: 'case'; path: string; study: CaseStudy }
  | { kind: 'not-found'; path: string };

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType: 'website' | 'article';
  jsonLd: object[];
}

// Netlify serves folder pages at their trailing-slash URL (and 301s the bare one),
// so every internal link, canonical and sitemap entry uses the trailing slash.
export const CASES_PATH = '/casos/';
export const casePath = (slug: string): string => `/casos/${slug}/`;

// Every URL the build prerenders, in sitemap order.
export const PRERENDER_PATHS: string[] = ['/', CASES_PATH, ...CASE_STUDIES.map((c) => casePath(c.slug))];

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { kind: 'home', path: '/' };
  if (path === '/casos') return { kind: 'cases', path: CASES_PATH };
  const match = path.match(/^\/casos\/([a-z0-9-]+)$/);
  const study = match ? findCaseStudy(match[1]) : undefined;
  return study ? { kind: 'case', path, study } : { kind: 'not-found', path };
}

const isoDuration = (sec: number): string => `PT${Math.floor(sec / 60)}M${sec % 60}S`;

const videoObject = (v: CaseVideo, study: CaseStudy) => ({
  '@type': 'VideoObject',
  name: v.name,
  description: `${study.shortTitle}: ${study.summary}`,
  thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
  uploadDate: v.uploadDate,
  duration: isoDuration(v.durationSec),
  embedUrl: `https://www.youtube.com/embed/${v.id}`,
  contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
});

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

// Home keeps the head written in index.html; other pages get their own.
export function metaFor(route: Route): PageMeta | null {
  if (route.kind === 'home' || route.kind === 'not-found') return null;

  if (route.kind === 'cases') {
    return {
      title: 'Casos de éxito en betting y gaming | Snack & Soda',
      description:
        'Campañas para Wplay, YaJuego y LUKA: contenido de entretenimiento para casas de apuestas en Colombia y LATAM. Mira los casos de Snack & Soda.',
      canonical: `${SITE_URL}${CASES_PATH}`,
      ogType: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Casos de éxito de Snack & Soda',
          url: `${SITE_URL}${CASES_PATH}`,
          inLanguage: 'es',
          publisher: { '@id': ORG_ID },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: CASE_STUDIES.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE_URL}${casePath(c.slug)}`,
              name: c.title,
            })),
          },
        },
        breadcrumbs([
          { name: 'Inicio', path: '/' },
          { name: 'Casos', path: CASES_PATH },
        ]),
      ],
    };
  }

  const { study } = route;
  const url = `${SITE_URL}${casePath(study.slug)}`;
  return {
    title: `${study.shortTitle} | Caso de éxito · Snack & Soda`,
    description: study.summary.length > 155 ? `${study.summary.slice(0, 152).trimEnd()}…` : study.summary,
    canonical: url,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${url}#case`,
        name: study.title,
        headline: study.title,
        description: study.summary,
        url,
        inLanguage: 'es',
        genre: 'Caso de éxito',
        creator: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
        sourceOrganization: { '@type': 'Organization', name: study.client },
        about: study.category,
        spatialCoverage: study.market,
        ...(study.awards?.length ? { award: study.awards } : {}),
        video: study.videos.map((v) => videoObject(v, study)),
      },
      breadcrumbs([
        { name: 'Inicio', path: '/' },
        { name: 'Casos', path: CASES_PATH },
        { name: study.shortTitle, path: casePath(study.slug) },
      ]),
    ],
  };
}

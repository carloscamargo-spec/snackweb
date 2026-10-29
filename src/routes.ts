import { CASE_STUDIES, findCaseStudy } from './data/caseStudies';
import { MARKETS, findMarket } from './data/markets';
import type { CaseStudy, CaseVideo, Market } from './types';

export const SITE_URL = 'https://snackandsoda.co';
const ORG_ID = `${SITE_URL}/#organization`;

export type Route =
  | { kind: 'home'; path: '/' }
  | { kind: 'cases'; path: '/casos/' }
  | { kind: 'case'; path: string; study: CaseStudy }
  | { kind: 'markets'; path: '/mercados/' }
  | { kind: 'market'; path: string; market: Market }
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
export const MARKETS_PATH = '/mercados/';
export const marketPath = (slug: string): string => `/mercados/${slug}/`;

// Every URL the build prerenders, in sitemap order.
export const PRERENDER_PATHS: string[] = [
  '/',
  CASES_PATH,
  ...CASE_STUDIES.map((c) => casePath(c.slug)),
  MARKETS_PATH,
  ...MARKETS.map((m) => marketPath(m.slug)),
];

export function resolveRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { kind: 'home', path: '/' };
  if (path === '/casos') return { kind: 'cases', path: CASES_PATH };
  if (path === '/mercados') return { kind: 'markets', path: MARKETS_PATH };
  const caseMatch = path.match(/^\/casos\/([a-z0-9-]+)$/);
  const study = caseMatch ? findCaseStudy(caseMatch[1]) : undefined;
  if (study) return { kind: 'case', path, study };
  const marketMatch = path.match(/^\/mercados\/([a-z0-9-]+)$/);
  const market = marketMatch ? findMarket(marketMatch[1]) : undefined;
  if (market) return { kind: 'market', path, market };
  return { kind: 'not-found', path };
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
      title: 'Casos de éxito: publicidad para casas de apuestas | Snack & Soda',
      description:
        'Campañas de publicidad y contenido para Wplay, YaJuego y LUKA: casos de nuestra agencia para casas de apuestas e iGaming en Colombia y LATAM.',
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

  if (route.kind === 'markets') {
    return {
      title: 'Agencia de publicidad para casas de apuestas en LATAM | Snack & Soda',
      description:
        'Publicidad y contenido para casas de apuestas e iGaming en Colombia, México, Perú, Argentina, Ecuador, El Salvador y Honduras.',
      canonical: `${SITE_URL}${MARKETS_PATH}`,
      ogType: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Mercados de Snack & Soda en LATAM',
          url: `${SITE_URL}${MARKETS_PATH}`,
          inLanguage: 'es',
          publisher: { '@id': ORG_ID },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: MARKETS.map((m, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE_URL}${marketPath(m.slug)}`,
              name: `Publicidad para casas de apuestas en ${m.country}`,
            })),
          },
        },
        breadcrumbs([
          { name: 'Inicio', path: '/' },
          { name: 'Mercados', path: MARKETS_PATH },
        ]),
      ],
    };
  }

  if (route.kind === 'market') {
    const { market } = route;
    const url = `${SITE_URL}${marketPath(market.slug)}`;
    return {
      title: `Agencia de publicidad para casas de apuestas en ${market.country} | Snack & Soda`,
      description: market.summary.length > 155 ? `${market.summary.slice(0, 152).trimEnd()}…` : market.summary,
      canonical: url,
      ogType: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${url}#service`,
          name: `Publicidad y contenido para casas de apuestas e iGaming en ${market.country}`,
          serviceType: 'Agencia de contenido y publicidad para casas de apuestas e iGaming',
          description: market.summary,
          url,
          provider: { '@id': ORG_ID },
          areaServed: { '@type': 'Country', name: market.country, identifier: market.countryCode },
          audience: {
            '@type': 'BusinessAudience',
            audienceType: `Operadores de apuestas deportivas, casinos online y marcas de iGaming en ${market.country}`,
          },
        },
        breadcrumbs([
          { name: 'Inicio', path: '/' },
          { name: 'Mercados', path: MARKETS_PATH },
          { name: market.country, path: marketPath(market.slug) },
        ]),
      ],
    };
  }

  const { study } = route;
  const url = `${SITE_URL}${casePath(study.slug)}`;
  return {
    title: `${study.shortTitle} | Caso de publicidad · Snack & Soda`,
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

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import Root from './Root';
import { metaFor, resolveRoute, PRERENDER_PATHS, SITE_URL } from './routes';

export { PRERENDER_PATHS, SITE_URL };

// Used only at build time by scripts/prerender.mjs to bake each page's HTML
// into dist/, so crawlers that don't run JS still see the content.
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <Root path={path} />
    </StrictMode>
  );
}

export function headFor(path: string) {
  return metaFor(resolveRoute(path));
}

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Used only at build time by scripts/prerender.mjs to bake the page's HTML
// into dist/index.html, so crawlers that don't run JS still see the content.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import Root from './Root';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <Root path={window.location.pathname} />
  </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs); dev serves an empty root.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

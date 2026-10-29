// After `vite build`: renders every route to dist/<path>/index.html with its
// own <head> SEO tags, and writes dist/sitemap.xml from the same route list.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const ROOT_MARKER = '<div id="root"></div>';

const { render, headFor, PRERENDER_PATHS, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

if (!template.includes(ROOT_MARKER)) {
  throw new Error(`prerender: ${ROOT_MARKER} not found in dist/index.html`);
}

const escapeAttr = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Replaces the content="" of one tag; fails loudly if the tag disappeared from index.html.
function setTag(html, pattern, value, label) {
  if (!pattern.test(html)) throw new Error(`prerender: ${label} not found in index.html`);
  return html.replace(pattern, (_, before, after) => `${before}${escapeAttr(value)}${after}`);
}

function applyHead(html, meta) {
  let out = html;
  out = setTag(out, /(<title>)[^<]*(<\/title>)/, meta.title, '<title>');
  out = setTag(out, /(<meta name="description" content=")[^"]*(")/, meta.description, 'meta description');
  out = setTag(out, /(<link rel="canonical" href=")[^"]*(")/, meta.canonical, 'canonical');
  out = setTag(out, /(<meta property="og:url" content=")[^"]*(")/, meta.canonical, 'og:url');
  out = setTag(out, /(<meta property="og:type" content=")[^"]*(")/, meta.ogType, 'og:type');
  out = setTag(out, /(<meta property="og:title" content=")[^"]*(")/, meta.title, 'og:title');
  out = setTag(out, /(<meta property="og:description" content=")[^"]*(")/, meta.description, 'og:description');
  out = setTag(out, /(<meta name="twitter:title" content=")[^"]*(")/, meta.title, 'twitter:title');
  out = setTag(out, /(<meta name="twitter:description" content=")[^"]*(")/, meta.description, 'twitter:description');
  const scripts = meta.jsonLd
    .map((data) => `    <script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  return out.replace('</head>', `${scripts}\n  </head>`);
}

for (const route of PRERENDER_PATHS) {
  const meta = headFor(route);
  const head = meta ? applyHead(template, meta) : template;
  const html = head.replace(ROOT_MARKER, `<div id="root">${render(route)}</div>`);
  const outDir = route === '/' ? distDir : path.join(distDir, route);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  console.log(`prerender: ${route}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PRERENDER_PATHS.map((p) => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap);
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: ${PRERENDER_PATHS.length} pages + sitemap.xml`);

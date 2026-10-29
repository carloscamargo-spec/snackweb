// Injects the server-rendered App into dist/index.html after `vite build`.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(root, 'dist/index.html');
const ssrDir = path.join(root, 'dist-ssr');
const ROOT_MARKER = '<div id="root"></div>';

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = await readFile(indexPath, 'utf8');

if (!template.includes(ROOT_MARKER)) {
  throw new Error(`prerender: ${ROOT_MARKER} not found in dist/index.html`);
}

const appHtml = render();
await writeFile(indexPath, template.replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`));
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: wrote ${appHtml.length} chars of HTML into dist/index.html`);

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dist = path.join(__dirname, '..', 'dist');
const projectRoot = path.join(__dirname, '..');
const servicePages = JSON.parse(fs.readFileSync(path.join(projectRoot, 'src', 'data', 'service-pages.json'), 'utf8'));
const serverEntry = path.join(projectRoot, 'dist-server', 'entry-server.js');
const staticRoutes = [
  {
    path: '/privacy',
    title: 'Datenschutzerklärung | eBogdan',
    description: 'Informationen zur Verarbeitung personenbezogener Daten bei der Nutzung der Website und bei Kontaktaufnahme mit eBogdan.'
  },
  {
    path: '/impressum',
    title: 'Impressum | eBogdan',
    description: 'Impressum und Kontaktinformationen von eBogdan, unabhängigem Digitalstudio in Essen.'
  }
];
let render;
const indexableRoutes = [
  {
    path: '/',
    title: 'Webdesign, Social Media & Fotografie in Essen | eBogdan',
    description: 'eBogdan ist Ihr unabhängiges Digitalstudio in Essen für Webdesign, Social-Media-Betreuung, Fotoshootings und Printdesign. Persönliche Beratung für Unternehmen.'
  },
  ...servicePages.map(({ slug, title, description }) => ({
    path: `/${slug}`,
    title,
    description
  }))
];

function copyIndexForRoute(route, metadata) {
  const targetDir = path.join(dist, route.replace(/^\//, ''));
  const indexSrc = path.join(dist, 'index.html');
  if (!fs.existsSync(indexSrc)) {
    console.error('index.html not found in dist. Did the build succeed?');
    process.exit(1);
  }

  // ensure target directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  const targetPath = path.join(targetDir, 'index.html');
  let html = fs.readFileSync(indexSrc, 'utf8');
  if (metadata) {
    const canonicalUrl = `https://ebogdan.com${route === '/' ? '/' : route}`;
    html = html
      .replace(/<html lang="[^"]*">/, '<html lang="de">')
      .replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${metadata.description}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${metadata.title}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${metadata.description}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${canonicalUrl}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${metadata.title}$2`)
      .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${metadata.description}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${canonicalUrl}$2`);
    if (servicePages.some(({ slug }) => route === `/${slug}`)) {
      const renderedPage = render(route);
      html = html.replace('<div id="root"></div>', `<div id="root" data-ssr="true">${renderedPage}</div>`);
    }
  }
  fs.writeFileSync(targetPath, html);
  console.log(`Wrote ${targetPath}`);
}

(function writeSitemap() {
  const urls = indexableRoutes.map(({ path: routePath }) => {
    const location = `https://ebogdan.com${routePath === '/' ? '/' : routePath}`;
    return `  <url>\n    <loc>${location}</loc>\n  </url>`;
  });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
})();

async function main() {
  if (!fs.existsSync(dist)) {
    console.error('dist directory not found. Run the build first.');
    process.exit(1);
  }

  if (!fs.existsSync(serverEntry)) {
    console.error('Server-rendered entry not found. Run the SSR build first.');
    process.exit(1);
  }
  ({ render } = await import(pathToFileURL(serverEntry).href));

  staticRoutes.forEach(({ path: route, ...metadata }) => copyIndexForRoute(route, metadata));
  servicePages.forEach(({ slug, title, description }) => {
    copyIndexForRoute(`/${slug}`, { title, description });
  });
  copyIndexForRoute('/', indexableRoutes[0]);
  console.log('Static route files generated.');
}

await main();

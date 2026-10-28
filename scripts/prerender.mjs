import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// Собирает HTML всех страниц: главная — dist/app.html (на сервере станет index.html),
// кейсы — dist/cases/<id>/index.html. Заодно пишет sitemap.xml со всеми адресами.
const root = resolve(process.cwd())
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')
const siteUrl = 'https://itssteps.site'

const { render, routes } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const template = await readFile(resolve(dist, 'app.html'), 'utf8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error(`${marker} не найден в dist/app.html`)

const escape = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function withMeta(html, route) {
  if (!route.title) return html
  const url = `${siteUrl}${route.path}`
  const title = escape(route.title)
  const description = escape(route.description)
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${description}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${title}"`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${description}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${title}"`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${description}"`)
    .replace(/(<meta property="og:image" content=")[^"]*"/, `$1${route.image}"`)
    .replace(/(<meta name="twitter:image" content=")[^"]*"/, `$1${route.image}"`)
    .replace(/\s*<meta property="og:image:(width|height)" content="[^"]*" \/>/g, '')
    .replace(/(<meta property="og:image:alt" content=")[^"]*"/, `$1${title}"`)
}

for (const route of routes) {
  const html = withMeta(template, route).replace(marker, `<div id="root">${render(route.path)}</div>`)
  const file = route.path === '/' ? resolve(dist, 'app.html') : resolve(dist, `.${route.path}index.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html, 'utf8')
}

const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .map((route) => `  <url>\n    <loc>${siteUrl}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')
await writeFile(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  'utf8',
)

await rm(ssrDir, { recursive: true, force: true })
console.log(`prerender: ${routes.length} страниц + sitemap.xml`)

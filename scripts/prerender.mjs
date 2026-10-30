import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// Собирает HTML всех страниц: главная — dist/app.html (на сервере станет index.html),
// остальные — dist/<путь>/index.html (кейсы, услуги, /en/...), ошибка — dist/404.html.
// Заодно пишет sitemap.xml со всеми адресами, кроме 404.
const root = resolve(process.cwd())
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')
const siteUrl = 'https://itssteps.site'

const { render, routes } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const template = await readFile(resolve(dist, 'app.html'), 'utf8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error(`${marker} не найден в dist/app.html`)

const escape = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// пара страниц на двух языках: поисковики показывают каждому его версию,
// а всем остальным языкам (x-default) — английскую
function hreflang(route) {
  if (!route.alternate) return []
  const ru = route.lang === 'ru' ? route.path : route.alternate
  const en = route.lang === 'en' ? route.path : route.alternate
  return [
    `    <link rel="alternate" hreflang="ru" href="${siteUrl}${ru}" />`,
    `    <link rel="alternate" hreflang="en" href="${siteUrl}${en}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${siteUrl}${en}" />`,
  ]
}

function withMeta(html, route) {
  const extra = [
    ...hreflang(route),
    route.noindex && '    <meta name="robots" content="noindex" />',
    route.jsonLd && `    <script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`,
  ].filter(Boolean)
  if (extra.length) html = html.replace('  </head>', () => `${extra.join('\n')}\n  </head>`)
  if (route.lang === 'en') {
    html = html
      .replace('<html lang="ru">', '<html lang="en">')
      .replace('content="ru_RU"', 'content="en_US"')
  }
  if (!route.title) return html
  const url = `${siteUrl}${route.path}`
  const title = escape(route.title)
  const description = escape(route.description)
  // подстановка через функцию: в тексте замены «$1» значит «группа 1», а в описаниях бывают цены вроде $1,000
  const set = (pattern, value) => (text) => text.replace(pattern, (_, start) => `${start}${value}"`)
  return [
    (text) => text.replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`),
    set(/(<meta\s+name="description"\s+content=")[^"]*"/, description),
    set(/(<link rel="canonical" href=")[^"]*"/, url),
    set(/(<meta property="og:url" content=")[^"]*"/, url),
    set(/(<meta property="og:title" content=")[^"]*"/, title),
    set(/(<meta\s+property="og:description"\s+content=")[^"]*"/, description),
    set(/(<meta name="twitter:title" content=")[^"]*"/, title),
    set(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, description),
    set(/(<meta property="og:image" content=")[^"]*"/, route.image),
    set(/(<meta name="twitter:image" content=")[^"]*"/, route.image),
    (text) => text.replace(/\s*<meta property="og:image:(width|height)" content="[^"]*" \/>/g, ''),
    set(/(<meta property="og:image:alt" content=")[^"]*"/, title),
  ].reduce((text, apply) => apply(text), html)
}

for (const route of routes) {
  const root = `<div id="root" data-path="${route.path}">${render(route.path)}</div>`
  const html = withMeta(template, route).replace(marker, () => root)
  const file = route.file
    ? resolve(dist, route.file)
    : route.path === '/'
      ? resolve(dist, 'app.html')
      : resolve(dist, `.${route.path}index.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html, 'utf8')
}

const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .filter((route) => !route.noindex)
  .map((route) => `  <url>\n    <loc>${siteUrl}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join('\n')
await writeFile(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  'utf8',
)

await rm(ssrDir, { recursive: true, force: true })
console.log(`prerender: ${routes.length} страниц (включая 404) + sitemap.xml`)

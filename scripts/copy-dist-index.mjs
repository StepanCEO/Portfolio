import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

// Сайт переехал на itssteps.site. На github.io dist/index.html теперь только
// отправляет посетителя на новый домен; настоящая страница собирается в
// dist/app.html и выкладывается на VPS как index.html (см. scripts/deploy-vps.sh).
const root = resolve(process.cwd())
const target = resolve(root, 'dist', 'index.html')
const newSite = 'https://itssteps.site/'

const redirect = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="canonical" href="${newSite}" />
    <meta http-equiv="refresh" content="0; url=${newSite}" />
    <title>Its Step — сайт переехал</title>
    <script>location.replace('${newSite}' + location.hash)</script>
  </head>
  <body>
    <p>Сайт переехал: <a href="${newSite}">itssteps.site</a></p>
  </body>
</html>
`

await mkdir(dirname(target), { recursive: true })
await writeFile(target, redirect, 'utf8')

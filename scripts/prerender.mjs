import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// Вставляет HTML, отрисованный React на сервере, в dist/app.html
const root = resolve(process.cwd())
const page = resolve(root, 'dist', 'app.html')
const ssrDir = resolve(root, 'dist-ssr')

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const html = await readFile(page, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error(`${marker} не найден в dist/app.html`)

await writeFile(page, html.replace(marker, `<div id="root">${render()}</div>`), 'utf8')
await rm(ssrDir, { recursive: true, force: true })
console.log('prerender: dist/app.html')

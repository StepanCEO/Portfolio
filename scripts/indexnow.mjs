import { readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Сообщает Яндексу (и другим участникам IndexNow) об адресах из sitemap.xml,
// чтобы новые и изменённые страницы переобходились сразу, а не по расписанию.
// Ключ — файл <ключ>.txt в public/, он же лежит в корне сайта.
const root = resolve(process.cwd())
const host = 'itssteps.site'
const keyFile = readdirSync(resolve(root, 'public')).find((name) => /^[0-9a-f]{32}\.txt$/.test(name))
if (!keyFile) throw new Error('нет файла ключа IndexNow в public/')
const key = readFileSync(resolve(root, 'public', keyFile), 'utf8').trim()

const sitemap = readFileSync(resolve(root, 'dist', 'sitemap.xml'), 'utf8')
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

const response = await fetch('https://yandex.com/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${keyFile}`, urlList }),
})
console.log(`IndexNow: ${response.status} ${response.statusText}, адресов: ${urlList.length}`)

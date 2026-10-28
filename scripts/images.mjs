import { execFileSync } from 'node:child_process'
import { readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Делает WebP-версии картинок (800 px и полная ширина, но не больше 1600 px)
// и манифест src/image-sizes.json: размеры и варианты для srcset.
// Запускать после добавления или замены картинки: npm run images (нужен cwebp).
const root = resolve(process.cwd())
const dirs = ['projects', 'reviews']
const maxWidth = 1600
const manifest = {}

const size = (file) => {
  const out = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], { encoding: 'utf8' })
  const [width, height] = [...out.matchAll(/pixel(?:Width|Height): (\d+)/g)].map((m) => Number(m[1]))
  return { width, height }
}

for (const dir of dirs) {
  for (const name of readdirSync(resolve(root, 'public', dir))) {
    if (!/\.(jpe?g|png)$/i.test(name)) continue
    const file = resolve(root, 'public', dir, name)
    const { width, height } = size(file)
    const widths = [...new Set([800, Math.min(width, maxWidth)])].filter((w) => w <= width)
    const variants = widths.map((w) => {
      const out = `${name.replace(/\.(jpe?g|png)$/i, '')}-${w}.webp`
      execFileSync('cwebp', ['-quiet', '-q', '80', '-resize', String(w), '0', file, '-o', resolve(root, 'public', dir, out)])
      return [w, `/${dir}/${out}`]
    })
    const top = widths.at(-1)
    manifest[`/${dir}/${name}`] = { width: top, height: Math.round((height * top) / width), variants }
  }
}

writeFileSync(resolve(root, 'src', 'image-sizes.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`images: ${Object.keys(manifest).length} картинок`)

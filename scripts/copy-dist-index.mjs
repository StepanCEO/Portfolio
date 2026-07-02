import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const root = resolve(process.cwd())
const source = resolve(root, 'dist', 'app.html')
const target = resolve(root, 'dist', 'index.html')

await mkdir(dirname(target), { recursive: true })
await copyFile(source, target)

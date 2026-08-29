// Runs after `vite build`. Renders the homepage to a real HTML string with
// react-dom/server and bakes it into dist/index.html, so a crawler that
// never executes JavaScript (many AI crawlers included) still sees the
// actual page content instead of an empty <div id="root">. Real visitors
// still get the interactive app: main.jsx hydrates on top of this markup.
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ssrOutDir = 'ssr-tmp'

await build({
  root,
  logLevel: 'warn',
  plugins: [react()],
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: ssrOutDir,
    write: true,
    minify: false,
    rollupOptions: { output: { format: 'es' } },
  },
})

const entryPath = path.resolve(root, ssrOutDir, 'entry-server.js')
const { render } = await import(`file://${entryPath}`)
const appHtml = render()

const indexPath = path.resolve(root, 'dist/index.html')
const shell = readFileSync(indexPath, 'utf-8')
const withContent = shell.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
writeFileSync(indexPath, withContent)

rmSync(path.resolve(root, ssrOutDir), { recursive: true, force: true })

console.log(`Prerendered homepage HTML injected into dist/index.html (${appHtml.length} chars)`)

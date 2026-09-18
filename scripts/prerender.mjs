// Runs after `vite build`. Renders every route to a real HTML string with
// react-dom/server and writes it into dist, so a crawler that never executes
// JavaScript (many AI crawlers included) still sees the actual page content
// instead of an empty <div id="root">. Real visitors still get the
// interactive app: main.jsx hydrates on top of this markup.
//
// Each route past the homepage is written as dist/<route>/index.html, which
// Vercel serves at /<route> without any rewrite config. Before this, the
// legal pages existed only as React state and /privacy returned a 404.
// The `view` values here must match VIEW_PATH in src/App.jsx.
import { build } from 'vite'
import { PAGES } from '../src/pages.js'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const SITE = 'https://www.sondarlogic.com'

const ROUTES = [
  {
    view: 'home',
    out: 'index.html',
    url: `${SITE}/`,
  },
  {
    view: 'privacy',
    out: 'privacy/index.html',
    url: `${SITE}/privacy`,
    title: 'Privacy Policy — SondarLogic Rebate Processing',
    description:
      'How SondarLogic collects, uses and safeguards claimant information when processing consumer rebate claims, under PIPEDA. Data is stored in Canada and belongs to the brand.',
  },
  {
    view: 'terms',
    out: 'terms/index.html',
    url: `${SITE}/terms`,
    title: 'Terms of Service — SondarLogic Rebate Processing',
    description:
      'The terms covering use of the SondarLogic rebate validation platform, API and dashboard, including manual review, payout funding and data ownership.',
  },
]

// The explainer and vertical pages. Titles and descriptions live with the
// copy in src/pages.js so a new page needs one edit, not two.
for (const [key, page] of Object.entries(PAGES)) {
  ROUTES.push({
    view: key,
    out: `${key}/index.html`,
    url: `${SITE}${page.path}`,
    title: page.title,
    description: page.description,
  })
}

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

const indexPath = path.resolve(root, 'dist/index.html')
const shell = readFileSync(indexPath, 'utf-8')

// Swap the head tags that must differ per route. Anything not listed is
// shared on purpose, including the Organization and Service JSON-LD, which
// belongs on every page. The FAQ schema is rendered by the FAQ component, so
// it only ever appears on the homepage.
function retitle(html, route) {
  if (!route.title) return html
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?" \/>/,
      `<meta name="description" content="${route.description}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${route.url}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${route.url}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${route.title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${route.description}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${route.title}" />`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${route.description}" />`
    )
}

for (const route of ROUTES) {
  const appHtml = render(route.view)
  const html = retitle(shell, route).replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )
  const outPath = path.resolve(root, 'dist', route.out)
  mkdirSync(path.dirname(outPath), { recursive: true })
  writeFileSync(outPath, html)
  console.log(`Prerendered ${route.url} -> dist/${route.out} (${appHtml.length} chars)`)
}

rmSync(path.resolve(root, ssrOutDir), { recursive: true, force: true })

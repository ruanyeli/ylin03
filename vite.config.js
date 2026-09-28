import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sharedData } from './src/shared/index.js'
import { checkV2Numbers } from './scripts/check-v2-numbers.mjs'

// Page versions are the src/v<N>/ folders that contain an App.jsx. BLOG_VERSION picks the one
// served by default; without it the newest version is used.
const SRC = fileURLToPath(new URL('./src', import.meta.url))
const versions = readdirSync(SRC)
  .filter(name => /^v\d+$/.test(name) && existsSync(join(SRC, name, 'App.jsx')))
  .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))
const blogVersion = process.env.BLOG_VERSION || versions[versions.length - 1]
if (!versions.includes(blogVersion)) {
  throw new Error(`BLOG_VERSION=${blogVersion} is not one of: ${versions.join(', ')}`)
}

// Share-card crawlers need an absolute og:image URL. Set SITE_URL (with a trailing slash)
// when building for a public host; without it the image path stays relative.
const siteUrl = () => ({
  name: 'site-url',
  transformIndexHtml: html => html.replaceAll('__SITE_URL__', process.env.SITE_URL || './'),
})

// Publishes the shared numbers, tables, recordings, and demo list as data/iquest-q1.json,
// so other material (slides, posts) can reuse exactly what the page shows.
const sharedJson = () => ({
  name: 'shared-json',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'data/iquest-q1.json', source: `${JSON.stringify(sharedData(), null, 2)}\n` })
  },
})

// Fails the build when a shared number is typed by hand in v2 (see scripts/check-v2-numbers.mjs).
const v2Guard = () => ({
  name: 'v2-number-guard',
  apply: 'build',
  async buildStart() {
    const errors = await checkV2Numbers()
    if (errors.length) this.error(`v2 number guard:\n${errors.join('\n')}`)
  },
})

export default defineConfig({
  base: './',
  // Scan the app entry only; public demos load their own CDN dependencies via import maps.
  optimizeDeps: { entries: ['index.html'] },
  plugins: [react(), siteUrl(), sharedJson(), v2Guard()],
  define: { __BLOG_VERSION__: JSON.stringify(blogVersion) },
  // Workspace filesystem changes can miss native watch events; poll to keep dev modules current.
  server: { watch: { usePolling: true, interval: 500 } },
  // `vite preview` rejects unknown Host headers; allow the siflow proxy domain (and its subdomains).
  preview: { allowedHosts: ['.siflow.cn'] },
})

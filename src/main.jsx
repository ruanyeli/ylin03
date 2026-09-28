import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Every page version lives in src/<version>/App.jsx and is loaded on demand, so only the
// chosen version's code and styles reach the browser. The default is picked at build time
// (BLOG_VERSION, else the newest version); `?v=v1` switches versions without a rebuild.
const versions = import.meta.glob('./v*/App.jsx')
const requested = new URLSearchParams(window.location.search).get('v')
const version = versions[`./${requested}/App.jsx`] ? requested : __BLOG_VERSION__

document.documentElement.dataset.blogVersion = version
const RELOAD_KEY = 'iquest.chunkReload'
versions[`./${version}/App.jsx`]().then(({ default: App }) => {
  try { sessionStorage.removeItem(RELOAD_KEY) } catch { /* optional */ }
  createRoot(document.getElementById('root')).render(
    <StrictMode><App /></StrictMode>,
  )
}).catch(error => {
  // A cached index.html can point at chunks removed by a redeploy: reload once, then explain.
  console.error(error)
  let retried = false
  try { retried = sessionStorage.getItem(RELOAD_KEY) === '1'; sessionStorage.setItem(RELOAD_KEY, '1') } catch { /* optional */ }
  if (!retried) { window.location.reload(); return }
  document.getElementById('root').innerHTML = '<p style="font:16px/1.6 sans-serif;margin:40px auto;max-width:560px;padding:0 16px">The page could not be loaded. <a href="">Reload</a> · 页面加载失败，请<a href="">刷新</a>。</p>'
})

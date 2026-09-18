import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// `view` is read by initialView() in App.jsx through globalThis, so the
// prerendered markup for /privacy and /terms is the legal page itself
// rather than the homepage. Defaults to home when nothing is passed.
export function render(view = 'home') {
  globalThis.__SL_VIEW__ = view
  const html = renderToString(<App />)
  globalThis.__SL_VIEW__ = undefined
  return html
}

// Deploy-time options for the v2 layout.

// Evaluation views, in switch order. VITE_EVAL_VIEWS picks a subset at build time, e.g.
// VITE_EVAL_VIEWS=bars,table; the first one is the default on desktop.
const ALL_VIEWS = ['bars', 'dots', 'table']
const requested = (import.meta.env.VITE_EVAL_VIEWS || '').split(',').map(v => v.trim()).filter(v => ALL_VIEWS.includes(v))
export const EVAL_VIEWS = requested.length ? [...new Set(requested)] : ALL_VIEWS

// Phones open the compact table when it is offered.
export const EVAL_PHONE_DEFAULT = EVAL_VIEWS.includes('table') ? 'table' : EVAL_VIEWS[0]

// Export links under the evaluation figure, off unless listed: VITE_EVAL_EXPORTS=markdown,json.
const exportsWanted = (import.meta.env.VITE_EVAL_EXPORTS || '').split(',').map(v => v.trim())
export const EVAL_EXPORTS = { markdown: exportsWanted.includes('markdown'), json: exportsWanted.includes('json') }

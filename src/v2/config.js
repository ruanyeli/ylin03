// Deploy-time options for the v2 layout.

// Evaluation views, in switch order. The bar chart alone by default (no switcher); VITE_EVAL_VIEWS
// adds others at build time, e.g. VITE_EVAL_VIEWS=bars,dots,table; the first is the desktop default.
const ALL_VIEWS = ['bars', 'dots', 'table']
const requested = (import.meta.env.VITE_EVAL_VIEWS || '').split(',').map(v => v.trim()).filter(v => ALL_VIEWS.includes(v))
export const EVAL_VIEWS = requested.length ? [...new Set(requested)] : ['bars']

// Phones open the compact table when it is offered.
export const EVAL_PHONE_DEFAULT = EVAL_VIEWS.includes('table') ? 'table' : EVAL_VIEWS[0]

// Export links under the evaluation figure, off unless listed: VITE_EVAL_EXPORTS=markdown,json.
const exportsWanted = (import.meta.env.VITE_EVAL_EXPORTS || '').split(',').map(v => v.trim())
export const EVAL_EXPORTS = { markdown: exportsWanted.includes('markdown'), json: exportsWanted.includes('json') }

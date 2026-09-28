// Shared resources used by every page version: numbers, tables, recordings, and demos.
// Change a value here and all versions (and the exported data/iquest-q1.json) stay in sync.
import { benchmarks } from './benchmarks.js'
import { caseFacts, larkScenarios, rdRecordings } from './cases.js'
import { bibtex, citationMeta, reportRefs } from './citation.js'
import { demoCategories, frontendDemos } from './demos.js'
import { downloads, links } from './links.js'
import { cyber, model, rsiOutcomes } from './model.js'
import { serveSnippets } from './quickstart.js'
import { rsiLoop } from './rsiLoop.js'
import { rsiProgress } from './rsiProgress.js'

export * from './benchmarks.js'
export * from './cases.js'
export * from './citation.js'
export * from './demos.js'
export * from './format.js'
export * from './i18n.js'
export * from './links.js'
export * from './media.js'
export * from './model.js'
export * from './quickstart.js'
export * from './rsiLoop.js'
export * from './rsiProgress.js'

// A JSON-serialisable snapshot, published with the site as data/iquest-q1.json.
export const sharedData = () => ({
  model, rsiOutcomes, cyber, benchmarks, caseFacts, rdRecordings, larkScenarios,
  demoCategories, frontendDemos, links, downloads, serveSnippets, rsiLoop, rsiProgress,
  citation: { ...citationMeta, bibtex }, reportRefs,
})

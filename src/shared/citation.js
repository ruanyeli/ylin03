// Report metadata. `bibtex` stays literal so it can be copied as is; the build checks that it
// agrees with citationMeta.
export const citationMeta = {
  org: 'IQuest Research',
  year: 2026,
  title: 'IQuest-Q1: Advancing Agentic CLI Systems Towards Human-on-the-Loop RSI',
  note: 'Technical Report',
}

// Figure / table numbers in the technical report that the pages refer to.
export const reportRefs = { rsiFigure: '6', resultsTable: '2', resultsFigure: '1' }

export const bibtex = `@misc{iquest2026q1,
  title  = {IQuest-Q1: Advancing Agentic CLI Systems Towards Human-on-the-Loop RSI},
  author = {{IQuest Research}},
  year   = {2026},
  note   = {Technical Report}
}`

import { t } from './i18n.js'
import { rsiProgress } from './rsiProgress.js'

// Model facts from the technical report. Every page version reads these values, so a
// number only ever needs to change here.
export const model = {
  name: 'IQuest-Q1',
  totalParams: '320B',
  activeParams: '15B',
  context: '512K',
  contextTokens: 524288,
  contextStart: '32K',
  trainingTokens: '29T',
  scalingEfficiency: '1.93×',
  scalingBaseline: 'Qwen3-30B-A3B',
  scalingBaselineArch: 'Qwen3', // "the standard Qwen3 architecture" in the report text
  stabilityCrossover: '572B',
  layers: '88',
  hiddenDim: '3,072',
  heads: { q: '48', kv: '8' },
  experts: { routed: '256', active: '8' },
  attentionPattern: '2 × GQA + 21 × (3 × SWA + GQA) + 2 × GQA',
  attentionRatio: '3 : 1',
  slidingWindow: '4,096',
  mtpLayers: '2',
  muP: { proxyLayers: '18', proxyWidth: '896', range: '4×' },
  trainingScaffolds: ['Codex', 'Claude Code', 'Terminus'],
  mopdScaffolds: ['Claude Code', 'Codex', 'OpenCode', 'OpenHands', 'pi'],
  agentScaffolds: ['Claude Code', 'Codex', 'OpenCode', 'OpenHands', 'Terminus'],
}

// Relative change over the recorded RSI run, from its starting checkpoint to its last iteration.
const runGain = id => {
  const { iterations } = rsiProgress
  const change = Math.round((iterations[iterations.length - 1][id] / iterations[0][id] - 1) * 100)
  return `${change >= 0 ? '+' : '−'}${Math.abs(change)}%`
}

// Changes across RSI iterations. The score gains are computed from the recorded run
// (rsiProgress). The human-refinement change (−79%, §2.2) came from an earlier report draft and
// is not in the current one: v2 shows only the 'run' items; v1 (frozen) still reads all three.
export const rsiOutcomes = {
  section: '2.2',
  items: [
    { id: 'paperbench', value: runGain('paperbench'), source: 'run', label: t('PaperBench score, relative to its initial value', 'PaperBench 得分，相对初始值') },
    { id: 'deepswe', value: runGain('deepswe'), source: 'run', label: t('DeepSWE score, relative to its initial value', 'DeepSWE 得分，相对初始值') },
    { id: 'refinements', value: '−79%', source: 'report', label: t('Human refinements per iteration', '每轮迭代所需的人工修正次数') },
  ],
}

export const cyber = { reports: 30, days: 3, validated: 13 }

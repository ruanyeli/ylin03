import { t } from './i18n.js'

// Evaluation results, from the team's score sheet (rsi-report/benchmark_scores_editable.csv, 2026-09-28 14:01).
// Each benchmark compares its own set of models; column order of every `scores` array follows `models`,
// null = not compared. Scores keep the sheet's one decimal.
const models = ['IQuest-Q1', 'Claude Opus 5', 'GPT-5.6 Sol', 'Kimi K3', 'GLM-5.3', 'GLM-5.3-Flash', 'DeepSeek-V4-Pro', 'DeepSeek-V4-Flash-0731', 'Hy4-preview', 'Hy3', 'Minimax-M3']
const row = (name, group, by) => {
  const unknown = Object.keys(by).filter(m => !models.includes(m))
  if (unknown.length) throw new Error(`benchmarks: unknown model ${unknown.join(', ')} in ${name}`)
  return { name, group, scores: models.map(m => by[m] ?? null) }
}

export const benchmarks = {
  models,
  shortModels: models.map(m => m.replace(/^DeepSeek-/, 'DS-').replace(/-0731$/, '')),
  highlight: 0,
  groups: [t('Coding agent', '编程智能体'), t('General agent', '通用智能体')],
  rows: [
    row('DeepSWE v1.1', 0, { 'IQuest-Q1': 69.0, 'Kimi K3': 68.5, 'GLM-5.3': 66.9, 'Hy4-preview': 64.3, 'Claude Opus 5': 73.6 }),
    row('NL2Repo', 0, { 'IQuest-Q1': 63.0, 'Kimi K3': 58.0, 'Hy4-preview': 58.9, 'GLM-5.3': 58.0, 'DeepSeek-V4-Pro': 61.5 }),
    row('CyberGym', 0, { 'IQuest-Q1': 84.5, 'GLM-5.3': 84.5, 'Hy4-preview': 78.4, 'DeepSeek-V4-Pro': 83.3, 'GPT-5.6 Sol': 83.6 }),
    row('SWE-bench Pro', 0, { 'Hy4-preview': 65.7, 'IQuest-Q1': 63.5, 'GLM-5.3-Flash': 59.4, 'Minimax-M3': 59.0, 'DeepSeek-V4-Pro': 60.3 }),
    row('ProgramBench', 0, { 'Hy3': 47.4, 'DeepSeek-V4-Flash-0731': 62.1, 'GLM-5.3-Flash': 58.5, 'IQuest-Q1': 61.5, 'Minimax-M3': 33.8 }),
    row('Terminal-Bench 2.1', 0, { 'Hy3': 70.8, 'GLM-5.3-Flash': 84.3, 'IQuest-Q1': 84.3, 'DeepSeek-V4-Flash-0731': 82.7, 'Minimax-M3': 65.2 }),
    row('JobBench', 1, { 'IQuest-Q1': 55.7, 'GLM-5.3-Flash': 49.7, 'DeepSeek-V4-Flash-0731': 50.0, 'Claude Opus 5': 65.7, 'GLM-5.3': 61.4 }),
    row('Agents’ Last Exam', 1, { 'IQuest-Q1': 30.6, 'GLM-5.3-Flash': 26.3, 'DeepSeek-V4-Flash-0731': 25.2, 'Hy4-preview': 22.8, 'Claude Opus 5': 32.2 }),
    row('Humanity’s Last Exam', 1, { 'Hy4-preview': 43.4, 'GLM-5.3-Flash': 39.9, 'IQuest-Q1': 39.2, 'DeepSeek-V4-Flash-0731': 38.6, 'Minimax-M3': 39.0 }),
    row('RealCLI-Exec', 0, { 'IQuest-Q1': 53.7, 'DeepSeek-V4-Flash-0731': 51.5, 'Claude Opus 5': 58.2, 'GLM-5.3-Flash': 49.5, 'GPT-5.6 Sol': 58.5 }),
  ],
  sourceLabel: { figure: t('Fig. 1', '图 1'), report: t('Report Fig. 1', '报告图 1') },
  note: t(
    'Scores from Figure 1 of the technical report, at the highest available reasoning effort for each model. Each benchmark compares the models reported for it; “—” means not compared. The orange dashed line marks the average of the compared models. All numbers will be updated with the final report.',
    '分数取自技术报告图 1，各模型均取其可用的最高推理强度。每个基准只比较报告中对应的模型，“—”表示未参与比较。橙色虚线为参与比较模型的平均分。所有数字将随正式报告更新。',
  ),
  // The same note split for layouts that show the average line only in chart views.
  sourceNote: t(
    'Each benchmark compares the models reported for it. All numbers will be updated with the final report.',
    '每个基准只比较报告中对应的模型。所有数字将随正式报告更新。',
  ),
  // Evaluation settings for the benchmarks on the page (from the team's evaluation notes).
  settingsNote: t(
    'Unless noted, we sample with temperature 1.0, top-p 0.95, and top-k 20, using Claude Code v2.1.140 or Codex v0.142 as the harness.',
    '如无特别说明，采样参数为 temperature 1.0、top-p 0.95、top-k 20，脚手架使用 Claude Code v2.1.140 或 Codex v0.142。',
  ),
  harness: [
    ['DeepSWE v1.1', t('Claude Code and mini-SWE-agent', 'Claude Code 与 mini-SWE-agent')],
    ['SWE-bench Pro', t('Claude Code; 731-task public set, 1,000 turns; web access disabled; single-run pass@1', 'Claude Code；731 题公开集，1,000 轮；禁用网络访问；单次运行 pass@1')],
    ['NL2Repo', t('Claude Code; temperature 0.6, top-p 0.95; 2,000 turns per task', 'Claude Code；temperature 0.6、top-p 0.95；每题 2,000 轮')],
    ['ProgramBench', t('Claude Code; up to 2,000 turns and 6 hours per trial', 'Claude Code；每次最多 2,000 轮、6 小时')],
    ['CyberGym', t('Claude Code; full 1,507-task set (level 1); up to 500 turns and 6 hours per task', 'Claude Code；完整 1,507 题（level 1）；每题最多 500 轮、6 小时')],
    ['Terminal-Bench 2.1', t('Claude Code; up to 500 turns and 8 hours per trial', 'Claude Code；每次最多 500 轮、8 小时')],
  ],
  // In the evaluation suite, results not yet released.
  pending: ['SWE-bench Verified', 'SWE-bench Multilingual', 'KernelBench', 'CADBench', 'Code Arena WebDev', 'τ³-Banking', 'BrowseComp', 'WideSearch', 'HealthBench Professional'],
}

export const reportedScores = scores => scores.filter(v => v != null)
export const scoreOf = (name, model = 'IQuest-Q1') => {
  const row = benchmarks.rows.find(r => r.name === name)
  return row ? row.scores[benchmarks.models.indexOf(model)] : null
}

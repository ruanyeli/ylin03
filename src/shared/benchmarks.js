import { t } from './i18n.js'

// Evaluation results, from the team's score sheet (rsi-report/benchmark_scores_editable.csv, 2026-09-28 23:32).
// Each benchmark compares its own set of models; column order of every `scores` array follows `models`,
// null = not compared. Scores keep the sheet's one decimal.
const models = ['IQuest-Q1', 'Claude Opus 5', 'GPT-5.6 Sol', 'GLM-5.3', 'GLM-5.3-Flash', 'DeepSeek-V4-Pro', 'DeepSeek-V4.1-Flash', 'DeepSeek-V4-Flash', 'Hy4-preview', 'Minimax-M3']
const row = (name, group, by) => {
  const unknown = Object.keys(by).filter(m => !models.includes(m))
  if (unknown.length) throw new Error(`benchmarks: unknown model ${unknown.join(', ')} in ${name}`)
  // `listed` keeps the sheet's model order, which breaks ties as in the report figure.
  return { name, group, scores: models.map(m => by[m] ?? null), listed: Object.keys(by).map(m => models.indexOf(m)) }
}

export const benchmarks = {
  models,
  shortModels: models.map(m => m.replace(/^DeepSeek-/, 'DS-')),
  // Model icons in public/images/logos, as in the report figure.
  logos: {
    'IQuest-Q1': 'iquest', 'Claude Opus 5': 'claude', 'GPT-5.6 Sol': 'openai', 'GLM-5.3': 'zai', 'GLM-5.3-Flash': 'zai',
    'DeepSeek-V4-Pro': 'deepseek', 'DeepSeek-V4.1-Flash': 'deepseek', 'DeepSeek-V4-Flash': 'deepseek',
    'Hy4-preview': 'hunyuan', 'Minimax-M3': 'minimax',
  },
  highlight: 0,
  groups: [t('Coding agent', '编程智能体'), t('General agent', '通用智能体')],
  rows: [
    row('DeepSWE v1.1', 0, { 'IQuest-Q1': 64.6, 'Hy4-preview': 64.3, 'GLM-5.3': 66.9, 'DeepSeek-V4.1-Flash': 74.2, 'Claude Opus 5': 73.7 }),
    row('NL2Repo', 0, { 'IQuest-Q1': 63.0, 'Claude Opus 5': 75.3, 'Hy4-preview': 58.9, 'GLM-5.3': 58.0, 'DeepSeek-V4-Pro': 61.5 }),
    row('CyberGym', 0, { 'IQuest-Q1': 84.5, 'GLM-5.3': 84.5, 'Hy4-preview': 78.4, 'DeepSeek-V4-Pro': 83.3, 'DeepSeek-V4.1-Flash': 88.1 }),
    row('Terminal-Bench 2.1', 0, { 'Hy4-preview': 85.4, 'GLM-5.3-Flash': 84.3, 'IQuest-Q1': 83.2, 'DeepSeek-V4-Flash': 82.7, 'Claude Opus 5': 85.4 }),
    row('JobBench', 1, { 'IQuest-Q1': 55.7, 'GLM-5.3-Flash': 49.7, 'DeepSeek-V4-Flash': 50.0, 'Claude Opus 5': 65.7, 'GLM-5.3': 61.4 }),
    row('Agents’ Last Exam', 1, { 'IQuest-Q1': 29.6, 'GLM-5.3-Flash': 26.3, 'DeepSeek-V4-Flash': 25.2, 'Claude Opus 5': 32.2, 'DeepSeek-V4.1-Flash': 31.8 }),
    row('Humanity’s Last Exam', 1, { 'Hy4-preview': 43.4, 'GLM-5.3-Flash': 39.9, 'IQuest-Q1': 39.2, 'DeepSeek-V4-Flash': 38.6, 'Minimax-M3': 39.0 }),
    row('IQuest-CLIBench', 0, { 'IQuest-Q1': 53.7, 'DeepSeek-V4-Flash': 51.5, 'Claude Opus 5': 58.2, 'GLM-5.3-Flash': 49.5, 'GPT-5.6 Sol': 58.5 }),
  ],
  sourceLabel: { figure: t('Fig. 1', '图 1'), report: t('Report Fig. 1', '报告图 1') },
  note: t(
    'Scores from Figure 1 of the technical report, at the highest available reasoning effort for each model. Each benchmark compares the models reported for it; “—” means not compared. The orange dashed line marks the average of the compared models. All numbers will be updated with the final report.',
    '分数取自技术报告图 1，各模型均取其可用的最高推理强度。每个基准只比较报告中对应的模型，“—”表示未参与比较。橙色虚线为参与比较模型的平均分。所有数字将随正式报告更新。',
  ),
  // Footnote under the v2 evaluation figure, one entry per line.
  sourceNote: [
    t('For each model, we report the publicly reported score; otherwise, we evaluate the model using the corresponding benchmark setup:',
      '对于每个模型，我们采用其公开报告的分数；若无公开分数，则按相应基准的设置进行评测：'),
    t('(1) Harness: For agentic coding tasks, we use mini-SWE-agent for DeepSWE v1.1, BasicAgent for PaperBench, and Claude Code for other tasks. For general agentic tasks, we use our internal harness for search agent tasks and Humanity’s Last Exam, and the benchmark-provided harnesses for other tasks.',
      '（1）脚手架：智能体编程任务中，DeepSWE v1.1 使用 mini-SWE-agent，PaperBench 使用 BasicAgent，其余任务使用 Claude Code；通用智能体任务中，搜索智能体任务与 Humanity’s Last Exam 使用我们的内部脚手架，其余任务使用基准自带的脚手架。'),
    t('(2) Runtime: We set six-hour limits for CyberGym and ProgramBench, eight hours for Terminal-Bench 2.1, ten hours for Terminal-Bench 3.0 and 4.0, and 12 hours for PaperBench.',
      '（2）运行时长：CyberGym 与 ProgramBench 限时 6 小时，Terminal-Bench 2.1 限时 8 小时，Terminal-Bench 3.0 与 4.0 限时 10 小时，PaperBench 限时 12 小时。'),
  ],
  // Per-benchmark settings (from the model card's benchmark notes), listed by the v1 layout.
  harness: [
    ['DeepSWE v1.1', t('mini-SWE-agent; 1,000 turns per task', 'mini-SWE-agent；每题 1,000 轮')],
    ['NL2Repo', t('Claude Code; temperature 0.6, top-p 0.95, 64K-token generation limit; 2,000 turns per task; anti-hacking prompts and network restrictions', 'Claude Code；temperature 0.6、top-p 0.95，生成上限 64K token；每题 2,000 轮；使用防作弊提示并限制网络')],
    ['CyberGym', t('Claude Code; full 1,507-task set (level 1); up to 500 turns and 6 hours per task', 'Claude Code；完整 1,507 题（level 1）；每题最多 500 轮、6 小时')],
    ['Terminal-Bench 2.1', t('Claude Code; up to 500 turns and 8 hours per trial', 'Claude Code；每次最多 500 轮、8 小时')],
    ['JobBench', t('65-task main split; OpenCode v1.14.18, 64K per-turn limit; Grok 4.3 as the rubric judge; 2 hours per task', '65 题主集；OpenCode v1.14.18，每轮上限 64K；Grok 4.3 作为评分裁判；每题 2 小时')],
    ['Agents’ Last Exam', t('Claude Code v2.1.258; the model is text-only, so multimodal inputs are replaced with placeholders', 'Claude Code v2.1.258；模型暂不支持多模态，多模态输入以占位符替代')],
    ['Humanity’s Last Exam', t('Without tools; GPT-5.6 Luna as the judge', '不使用工具；GPT-5.6 Luna 作为裁判')],
    ['IQuest-CLIBench', t('Claude Code; up to 600 turns and 6 hours per trial; GPT-5.6 Sol runs in Codex', 'Claude Code；每次最多 600 轮、6 小时；GPT-5.6 Sol 使用 Codex')],
  ],
  // In the evaluation suite, results not yet released.
  pending: ['SWE-bench Verified', 'SWE-bench Multilingual', 'KernelBench', 'CADBench', 'Code Arena WebDev', 'τ³-Banking', 'BrowseComp', 'WideSearch', 'HealthBench Professional'],
}

export const reportedScores = scores => scores.filter(v => v != null)
export const scoreOf = (name, model = 'IQuest-Q1') => {
  const row = benchmarks.rows.find(r => r.name === name)
  return row ? row.scores[benchmarks.models.indexOf(model)] : null
}

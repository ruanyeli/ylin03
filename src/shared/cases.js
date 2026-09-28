import { t } from './i18n.js'
import { poster, video } from './media.js'
import { rsiProgress } from './rsiProgress.js'

// Model R&D recordings. Titles and numbers are shared; each page version writes its own prose
// around them.
export const rdRecordings = [
  {
    id: 'rsi-run', video: video('rd/rsi-run'), poster: poster('rd/rsi-run'), duration: '1:35', size: [1920, 1270],
    tag: t('Case 4', '案例 4'),
    title: t('A human-on-the-loop RSI run', '一次人类监督下的 RSI 运行'),
    short: t('RSI run', 'RSI 运行'),
  },
  {
    id: 'case-1', video: video('rd/case-1'), poster: poster('rd/case-1'), duration: '3:00', size: [1920, 1080], scaffold: 'Claude Code',
    tag: t('Case 1 · Claude Code', '案例 1 · Claude Code'),
    title: t('An extra space that broke multi-turn training', '一个空格，让多轮训练只剩最后一轮'),
    short: t('Extra space', '多出的空格'),
  },
  {
    id: 'case-2', video: video('rd/case-2'), poster: poster('rd/case-2'), duration: '3:00', size: [1920, 1080], scaffold: 'Claude Code',
    tag: t('Case 2 · Claude Code', '案例 2 · Claude Code'),
    title: t('When an environment fault looks like model failure', '模型发现任务执行环境问题，并且修复'),
    short: t('Environment fault', '环境故障'),
  },
  {
    id: 'case-3', video: video('rd/case-3'), poster: poster('rd/case-3'), duration: '3:00', size: [1920, 1080], scaffold: 'Claude Code',
    tag: t('Case 3 · Claude Code', '案例 3 · Claude Code'),
    title: t('A research workbench, then a fix from inside it', '先搭研发工作台，再在台上修复失败任务'),
    short: t('Research workbench', '研发工作台'),
  },
]

// Numbers quoted in the case write-ups.
export const caseFacts = {
  // Tool-schema iteration (iter_0002 -> iter_0003) highlighted in the RSI run (rsi_demo.md, 09-27).
  schemaIteration: {
    benchmark: 'PaperBench-CodeDev', tasks: 20, before: '61.04%', after: '68.28%', gain: '+7.24 pp',
    consecutiveErrors: 35, callsAudited: '6,054', trajectories: '44,464', gpuHours: '938.7',
    heldOut: 'DeepSWE',
    heldOutGain: `+${(rsiProgress.iterations[rsiProgress.illustrated].deepswe - rsiProgress.iterations[rsiProgress.illustrated - 1].deepswe).toFixed(2)} pp`,
  },
  // Case 1: reward mean before / after the fix / later in training.
  extraSpace: { before: '0.704', after: '0.769', later: '0.799' },
  // Lark scenarios.
  // from/to belong to the earlier (10·15) recording and are read only by the v1 backup.
  apiIncident: {
    date: '10·22', dateEn: 'October 22', dateZh: '10 月 22 日', level: 1, records: '37,214', customers: 6, deliverables: 12,
    tasks: 7, receipts: 11, slides: 6, from: '10/13', to: '10/15',
  },
  residency: { question: 27, questions: 32, deadline: '9/18' },
  dataIncident: { date: '09·11', deliverables: 11, groups: 3 },
  roster: { names: 16, deliverables: 9 },
}

// Lark (Feishu) scenarios. Only the API incident has a recording (the sped-up cut of the 10·22 run).
export const larkScenarios = [
  {
    id: 'api-incident',
    tab: t('10·22 API incident', '10·22 接口越权'),
    title: t('10·22 API incident: determining who needs to be notified', '10·22 接口越权：查清影响范围，及时同步进展'),
    recordings: [
      { id: 'fast', minutes: 2, label: t('Sped up · 2 min', '加速版 · 2 分钟'), video: video('office/api-incident-fast'), poster: poster('office/api-incident'), size: [2560, 818] },
    ],
  },
  { id: 'residency', tab: t('Data residency', '数据出境'), title: t('A customer question about cross-border data transfers', '客户问：数据会不会出境？') },
  { id: 'data-incident', tab: t('09·11 data incident', '09·11 数据事件'), title: t('09·11 data incident: from investigation to follow-up', '09·11 数据事件：从事实核查到后续处置') },
  { id: 'roster', tab: t('Training roster', '认证班名单'), title: t('Certification course: roster, seats, and make-up exam', '数据治理认证班：名单、席位和补考安排') },
]

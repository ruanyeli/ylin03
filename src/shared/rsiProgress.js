import { t } from './i18n.js'

// Best scores after each iteration of one recorded RSI run (the "rsi-run" recording), as shown in
// the run's replay and its recording (rsi_demo_v3_0927). Iteration 0 is the starting checkpoint. PaperBench
// guides the agent inside the loop; DeepSWE is held out from its diagnosis. These scores are
// the source of truth for the RSI gains on the page (rsiOutcomes derives them).
export const rsiProgress = {
  series: [
    { id: 'paperbench', name: 'PaperBench', role: t('used in the loop', '循环内使用') },
    { id: 'deepswe', name: 'DeepSWE', role: t('held out', '留出评测') },
  ],
  iterations: [
    { paperbench: 52.63, deepswe: 52.21, change: t('The checkpoint the run starts from', '运行开始时的检查点') },
    { paperbench: 52.63, deepswe: 52.21, adopted: false, change: t('Evaluation incomplete; starting checkpoint kept', '评测不完整，保留起始检查点') },
    { paperbench: 61.04, deepswe: 53.98, change: t('Repaired tool-call data', '修复工具调用数据') },
    { paperbench: 68.28, deepswe: 55.75, change: t('Tool-schema mixture', '混合多种工具格式') },
    { paperbench: 73.28, deepswe: 56.63, change: t('Cleaned chain-of-thought data', '清洗思维链数据') },
    { paperbench: 80.99, deepswe: 57.52, change: t('Synthetic-task expansion', '扩充合成任务') },
  ],
  // The iteration the loop's dialogue walks through: tool-call schema mixing, iter_0002 -> iter_0003,
  // PaperBench-CodeDev 61.04 -> 68.28 (rsi_demo.md, 09-27). Report §6.1.2 still quotes 52.63 -> 61.04.
  illustrated: 3,
}

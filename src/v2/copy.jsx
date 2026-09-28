// All v2 prose, as { en, zh } pairs. Numbers are interpolated from src/shared only (the build
// fails if a shared value is typed here by hand), so v1 and v2 always show the same figures.
import {
  benchmarks, caseFacts as F, citationMeta, cyber, enCountCap, enList, enWord, frontendDemos, larkScenarios,
  model as M, rdRecordings, reportRefs, rsiOutcomes, rsiProgress, t, zhList, zhWord,
} from '../shared'

// Section order: the CLI agentic model first (what it is, how it was built, how it does, what it
// does in practice), then human-on-the-loop RSI as the outlook.
export const SECTION_ORDER = ['overview', 'training', 'results', 'frontend', 'office', 'rd-cases', 'rsi', 'quickstart', 'citation']

export const tocLabels = {
  overview: t('Overview', '概览'),
  rsi: t('Human-on-the-loop RSI', '人类监督下的 RSI'),
  training: t('Agentic training', '智能体训练'),
  results: t('Evaluation', '评测结果'),
  'rd-cases': t('Model development', '模型研发'),
  office: t('Office work', '办公任务'),
  frontend: t('Frontend demos', '前端生成'),
  quickstart: t('How to use', '快速开始'),
  citation: t('Citation', '引用'),
}

// Chinese rendering of the report title for the zh page; citations keep the English title.
const reportTitleZh = '推进智能体 CLI 系统，迈向人类监督下的递归自我改进'
const demoCount = frontendDemos.filter(d => d.demo).length
const recordedDemoCount = frontendDemos.filter(d => d.video).length
const rsiIterations = rsiProgress.iterations.length - 1
const keptIteration = rsiProgress.iterations.findIndex(it => it.adopted === false)

export const ui = {
  contents: t('Contents', '目录'),
  hideContents: t('Hide contents', '收起目录'),
  showContents: t('Show contents', '展开目录'),
  languageGroup: t('Language', '语言'),
  comingSoon: t('Link available at release', '发布后开放'),
  copy: t('Copy', '复制'),
  copied: t('Copied', '已复制'),
  copyLink: t('Copy link', '复制链接'),
  linkCopied: t('Link copied', '链接已复制'),
  details: t('Details', '展开详情'),
  todo: 'TODO',
  previousLayout: t('Previous layout (v1)', '旧版页面（v1）'),
  footer: t(`© ${citationMeta.year} IQuest Research. All rights reserved.`, `© ${citationMeta.year} IQuest Research 保留所有权利。`),
  // Language-aware joiners for text assembled in components.
  gap: t(' ', ''),
  stop: t('. ', '。'),
  docTitle: t(`${citationMeta.title} · ${citationMeta.org}`, `IQuest-Q1：${reportTitleZh} · ${citationMeta.org}`),
  reportLink: t('Technical report', '技术报告'),
  resources: t('Resources', '资源链接'),
}

export const header = {
  kicker: t(`${citationMeta.org} · Technical report · ${citationMeta.year}`, `${citationMeta.org} · 技术报告 · ${citationMeta.year}`),
  // The page headline is the report title (citationMeta), after the model name.
  tagline: t(citationMeta.title.replace(/^IQuest-Q1: /, ''), reportTitleZh),
  separator: t(': ', '：'),
  dek: t(
    `IQuest-Q1 is an open-source agentic foundation model for CLI systems. A sparse Mixture-of-Experts model with ${M.totalParams} total parameters and ${M.activeParams} activated, it combines general and coding agent capabilities with efficient compute for medium- and long-horizon tasks. During development, it also takes part in its own improvement under human supervision.`,
    `IQuest-Q1 是一款面向 CLI 系统的开源智能体基座模型。它采用稀疏混合专家（MoE）架构，总参数量达 ${M.totalParams}，每个 token 激活 ${M.activeParams}。在保证计算效率的前提下，它同时具备通用与编程智能体能力，能够胜任中长程任务。此外，在研发过程中，它也在人类的监督下参与了对自身的迭代与改进。`,
  ),
  report: t('Read the report ↗', '阅读技术报告 ↗'),
  watchDemos: t('Watch the demos ↓', '观看演示 ↓'),
}

export const rsiFigureCopy = {
  lead: t(`Redrawn from Figure ${reportRefs.rsiFigure} of the technical report.`, `据技术报告图 ${reportRefs.rsiFigure} 重绘。`),
  caption: t(
    'The RSI agent drives two nested flywheels: one updates the model, the other its development harness (tools, workflows, and reusable procedures). Researchers agree on the plan, talk through any change of direction, and review each update before it is adopted.',
    'RSI 智能体推动两个嵌套的飞轮：一个更新模型，一个更新研发脚手架（工具、工作流与可复用步骤）。研究人员会在计划执行前达成共识，在调整方向前共同商议，并在采纳任何一次更新前进行严格审核。',
  ),
  // How to use the figure; the Play sentence is left out where there is no Play button.
  hint: {
    play: t('Select a step or press Play: when a checkpoint is adopted, the figure cuts to the scores it reached. Scores shows the whole run.', '点击任一步骤或按播放；检查点被采纳时，图会切换到它达到的分数。点“分数”可查看整次运行。'),
    still: t('Select a step, or open Scores to see the scores after each iteration.', '点击任一步骤，或点“分数”查看每轮迭代后的分数。'),
  },
  researchersBand: t('Researchers · human-on-the-loop supervision', '研究人员 · 人类监督'),
  ringSub: [t('updates the model', '更新模型'), t('updates the harness', '更新脚手架')],
  legend: [t('Capability flywheel', '能力飞轮'), t('Development flywheel', '研发飞轮')],
  // Step names in sentence case; steps 2 and 5 break onto two lines beside the rings.
  stepNames: [
    [t('Observe & propose', '观察与提出')],
    [t('Execute &', '执行与'), t('evaluate', '评测')],
    [t('Select model', '选定模型')],
    [t('Revise harness', '修订脚手架')],
    [t('Validate', '验证'), t('changes', '改动')],
    [t('Update harness', '更新脚手架')],
  ],
  stepOf: (n, total) => t(`Step ${n} of ${total}: `, `第 ${n} 步（共 ${total} 步）：`),
  // The score scene: what the loop achieved over successive iterations.
  scores: {
    button: t('Scores', '分数'),
    title: t('Best scores after each RSI iteration', '每轮 RSI 迭代后的最佳分数'),
    axis: t('RSI iteration', 'RSI 迭代轮次'),
    start: t('Start', '起点'),
    iteration: n => t(`Iteration ${n}`, `第 ${n} 轮`),
    walkthrough: t('the iteration walked through in the loop', '即循环中演示的一轮'),
    note: t(
      `PaperBench guides the agent inside the loop; DeepSWE is held out from its diagnosis, so it shows whether a gain carries over. Not every iteration moves the curve: in iteration ${keptIteration}, the candidate’s evaluation was incomplete, and the starting checkpoint was kept.`,
      `PaperBench 在循环内为智能体提供反馈；DeepSWE 不参与智能体的诊断，用来检验提升能否迁移。并非每轮迭代都会推高曲线：第 ${keptIteration} 轮候选模型的评测不完整，因此保留了起始检查点。`,
    ),
    source: t(`Scores are the best reached after each iteration of a recorded ${enWord(rsiIterations)}-iteration RSI run.`, `分数为一次${zhWord(rsiIterations)}轮 RSI 运行中，每轮迭代后达到的最佳成绩。`),
    prev: t('Previous iteration', '上一轮'),
    next: t('Next iteration', '下一轮'),
  },
}

export const keyNumbers = [
  { value: M.totalParams, unit: t(`/ ${M.activeParams} active`, `/ ${M.activeParams} 激活`), label: t('Sparse MoE, total / activated per token', '稀疏 MoE，总参数 / 每 token 激活') },
  { value: M.scalingEfficiency, unit: t('scaling efficiency', '扩展效率'), label: t(`Same training loss as the standard ${M.scalingBaselineArch} architecture with 1/${M.scalingEfficiency.replace('×', '')} of the compute`, `在达到与标准 ${M.scalingBaselineArch} 架构相同训练损失的情况下，仅需消耗其约 ${Math.round(100 / parseFloat(M.scalingEfficiency))}%（即 1/${M.scalingEfficiency.replace('×', '')}）的算力`) },
]

export const overview = {
  title: t('Overview', '概览'),
  intro: t(
    'IQuest-Q1 is built to work through tasks in the command line: gather context, use tools, check results, and recover from errors.',
    'IQuest-Q1 围绕命令行中的完整任务流程进行构建：它能够自动收集上下文、调用工具、检查结果，并在遇到错误时自行恢复。',
  ),
  items: [
    {
      title: t('A competitive open model for CLI agents', '有竞争力的开源 CLI 智能体模型'),
      body: t(
        `It is competitive with leading frontier models on coding benchmarks such as DeepSWE, NL2Repo, and CyberGym, and on general-agent benchmarks such as JobBench, Agents’ Last Exam, and Humanity’s Last Exam.`,
        `在 DeepSWE、NL2Repo、CyberGym 等编程基准，以及 JobBench、Agents’ Last Exam、Humanity’s Last Exam 等通用智能体基准上，与领先的前沿模型表现相当。`,
      ),
      link: { id: 'results', label: t('Evaluation', '评测结果') },
    },
    {
      title: t('Training to build agentic systems', '面向智能体系统的训练'),
      body: t(
        'Synthetic environments, multi-harness reinforcement learning, and multi-teacher on-policy distillation (MOPD) train the skills agentic work depends on over medium- and long-horizon tasks.',
        '我们通过合成环境、多脚手架强化学习以及多教师在线策略蒸馏（MOPD）等技术，共同培养了智能体执行中长程任务所需的核心能力。',
      ),
      link: { id: 'training', label: t('Agentic training', '智能体训练') },
    },
    {
      title: t('Looking ahead: human-on-the-loop RSI', '展望人类监督下的 RSI'),
      body: t(
        'Under human supervision, IQuest-Q1 also helps develop its successor, diagnosing gaps, proposing improvements, and running training—a practical step toward recursive self-improvement (RSI).',
        '在研究人员监督下，IQuest-Q1 也参与研发下一代模型，诊断能力短板、提出改进并执行训练，这是迈向递归自我改进（RSI）的切实一步。',
      ),
      link: { id: 'rsi', label: t('Human-on-the-loop RSI', '人类监督下的 RSI') },
    },
  ],
}

export const rsi = {
  title: t('Looking ahead: human-on-the-loop RSI', '展望：人类监督下的 RSI'),
  intro: t(
    'Beyond single development tasks, IQuest-Q1 can take part in developing its successor. In human-on-the-loop recursive self-improvement (RSI), an RSI agent built from the latest accepted model and a development harness diagnoses gaps, proposes changes, and runs experiments, while researchers step in at key decision points. The model is both the object of improvement and the development executor.',
    '除了完成单项研发任务，IQuest-Q1 还能参与研发下一代模型。在人类监督下的递归自我改进（RSI）循环中，由最新采纳的模型和研发脚手架组成的 RSI 智能体会主动诊断能力短板、提出改进方案并执行实验，而研究人员只需在关键的决策点介入。模型既是被改进的对象，也是研发的执行者。',
  ),
  quote: t(
    '“If a man keeps cherishing his old knowledge, so as continually to be acquiring new, he may be a teacher of others.”',
    '“温故而知新，可以为师矣。”',
  ),
  quoteSource: t('Confucius, Analects 2.11 (trans. Legge)', '孔子，《论语·为政》'),
  iterationTitle: t('One iteration in practice', '一次具体迭代'),
  iteration: t(
    'The model handled familiar tool definitions well but failed on unfamiliar schemas. The agent traced this to training data biased toward one schema; with human agreement, it rewrote part of the data into other schemas and trained on the mix. After review, the checkpoint became the next model, and the schema augmentation entered the harness.',
    '模型对熟悉的工具定义表现良好，面对陌生格式却频繁出错。智能体追查发现，训练数据偏向单一格式；经研究人员同意，它把部分数据改写为其他格式，与原格式数据混合训练。评审通过后，新的模型检查点成为下一轮迭代的基座模型，本次数据格式增强的逻辑也被固化到脚手架中。',
  ),
  // Only the gains measured on the run; the report no longer quotes a human-effort figure.
  outcomes: rsiOutcomes.items.filter(item => item.source === 'run').map(item => ({ value: `≈ ${item.value}`, label: item.label })),
  outcomesNote: t('Over the whole run under Scores above, from the start to the last iteration.', '为上图“分数”中整次运行从起点到最后一轮的变化。'),
  watchRun: t('Watch the RSI run ↑', '观看 RSI 运行录屏 ↑'),
}

export const training = {
  title: t('Training to build agentic systems', '面向智能体系统的训练'),
  intro: t(
    'An agentic system has to carry a task through: gather information, call tools, read feedback, and recover from errors over many steps. Pre-training and mid-training lay the groundwork, shifting the data toward code and STEM and adding agentic trajectories with a longer context; three further stages build the agentic behavior itself.',
    '一个成熟的智能体系统必须能够端到端地完成任务：不仅要收集信息、调用工具，还要理解反馈，并在多步执行出错时自我纠正。为了打好基础，预训练与中期训练的数据逐渐向代码和 STEM 领域倾斜，同时引入智能体轨迹、扩展上下文窗口。在此基础上，我们再通过三个阶段进一步塑造其行为模式。',
  ),
  notes: [
    [
      t('Synthetic environments', '合成环境'),
      t(
        'We synthesize tasks together with their environments: general-agent tasks on real APIs, MCP servers, and workspace files, and coding tasks in executable environments built from GitHub repositories, largely by our own model. Each task is verified before use—a coding task is kept only if its reference solution passes and a no-op fails.',
        '我们把任务与环境一并合成：通用智能体任务基于真实的 API、MCP 服务与工作区文件，编程任务运行在由我们自己的模型主导、基于 GitHub 仓库搭建的可执行环境中。所有任务在投入使用前都会经过严格验证：例如，编程任务只有在参考解运行通过，且什么都不做（即空操作）会失败的情况下，才会被采用。',
      ),
      'Synthetic environments',
    ],
    [
      t('Reinforcement learning', '强化学习'),
      t(
        'One policy trains across multiple harnesses, keeping each harness’s own tools and context management, so working inside a real agentic system is learned along with solving the task. Failures are attributed before optimization: only the policy’s own errors become learning signals.',
        '同一策略在多种脚手架中训练，并保留各脚手架原生的工具与上下文管理，让模型在学会解题的同时，也学会在真实的智能体系统中工作。优化前先对失败归因，只有策略自身的错误才作为学习信号。',
      ),
      'Reinforcement learning (RL)',
    ],
    [
      t('MOPD and model merging', 'MOPD 与模型融合'),
      t(
        'RL yields four experts: agentic user experience, multi-harness work, long-horizon tasks, and general agentic work. Multi-teacher on-policy distillation (MOPD) consolidates them into one student, initialized from the SFT checkpoint, which learns on its own trajectories while the matching expert scores each token. Stabilized model merging across stages and expert branches then folds the checkpoints into IQuest-Q1.',
        '强化学习得到四个专家模型：智能体用户体验、多脚手架协作、长程任务与通用智能体任务。多教师在线策略蒸馏（MOPD）把它们整合进同一个从 SFT 检查点初始化的学生模型：学生模型在自己生成的轨迹上进行学习，并由匹配的专家模型对它的每一个 token 进行打分。稳定化模型融合贯穿各阶段与各专家分支，最终合并为 IQuest-Q1。',
      ),
      'Multi-teacher on-policy distillation (MOPD) and stabilized model merging',
    ],
    [
      t('Efficient at scale', '高效扩展'),
      t(
        `IQuest-Q1 is a sparse MoE model with ${M.totalParams} total and ${M.activeParams} activated parameters. Against the standard ${M.scalingBaselineArch} architecture under identical training data, it reaches the same training loss with 1/${M.scalingEfficiency.replace('×', '')} of the compute.`,
        `IQuest-Q1 是总参数 ${M.totalParams}、激活 ${M.activeParams} 的稀疏 MoE 模型。与标准 ${M.scalingBaselineArch} 架构在相同训练数据下对比，它只需 1/${M.scalingEfficiency.replace('×', '')} 的训练算力即可达到相同的训练损失。`,
      ),
      'Scaling efficiency',
    ],
  ],
}

export const results = {
  title: t('Evaluation', '评测结果'),
  intro: t(
    'Agentic scores depend on the harness and execution policy as well as the model, so each result is attributed to a complete model–harness–protocol configuration.',
    '智能体得分同时取决于模型、脚手架与执行策略，因此每项结果都对应完整的“模型–脚手架–协议”配置。',
  ),
  figureTitle: t('IQuest-Q1 across coding and general-agent benchmarks', 'IQuest-Q1 在编程与通用智能体基准上的表现'),
  views: {
    bars: t('Bar chart', '条形图'),
    dots: t('Dot plot', '点图'),
    table: t('Table', '表格'),
  },
  viewsLabel: t('View', '视图'),
  otherModels: t('Other models', '其他模型'),
  benchmark: t('Benchmark', '基准'),
  legendHint: t('Select a model to highlight it', '点选模型以突出显示'),
  copyMarkdown: t('Copy as Markdown', '复制为 Markdown'),
  downloadJson: t('Download data (JSON)', '下载数据（JSON）'),
  modelKey: t('Short names:', '简称：'),
  cyberTitle: t('Defensive cybersecurity', '防御性网络安全'),
  cyber: t(
    <>During a {enWord(cyber.days)}-day deployment, IQuest-Q1, equipped with Codex agents and expert-designed cybersecurity skills, produced <strong>{cyber.reports} responsibly submitted vulnerability reports</strong>, all reviewed by human cybersecurity experts. Of these, {cyber.validated} findings were independently validated, with records subsequently published by established security organizations and databases, including GitHub Security Advisories (GHSA) and the NVD.</>,
    <>在一次为期{zhWord(cyber.days)}天的部署中，IQuest-Q1 配合 Codex 智能体与专家设计的网络安全技能，共产出了 <strong>{cyber.reports} 份遵循“负责任披露”原则提交的漏洞报告</strong>，所有报告均由网络安全专家人工审核。其中 {cyber.validated} 项漏洞获得了独立验证，相关记录也随后被 GitHub 安全公告（GHSA）与 NVD 等权威安全数据库收录和发布。</>,
  ),
  notesSummary: t(
    `Evaluation notes: settings and metrics · ${benchmarks.pending.length} pending benchmarks`,
    `评测说明：评测设置与指标 · ${benchmarks.pending.length} 项待发布基准`,
  ),
  harnessTitle: t('Evaluation settings and metrics', '评测设置与指标'),
  // Metric notes, as extra rows of the settings table (after the harness rows from shared data).
  metrics: [
    ['RealCLI-Exec', t(<>Composite Overall Score and pass<sup>k</sup>, stating k and the number of trials</>, <>综合得分 Overall Score 与 pass<sup>k</sup>，并注明 k 与试验次数</>)],
  ],
  pending: t(
    `Also in the evaluation suite, with results in the final report: ${enList(benchmarks.pending)}.`,
    `评测集中的其他基准，结果将随正式报告发布：${zhList(benchmarks.pending)}。`,
  ),
}

const recording = id => rdRecordings.find(r => r.id === id)
const S = F.schemaIteration

export const rdCases = {
  title: t('IQuest-Q1 in model development', 'IQuest-Q1 参与模型研发'),
  intro: t(
    `${enCountCap(rdRecordings.length)} recordings from everyday research work. Choose one to watch.`,
    `${zhWord(rdRecordings.length)}段来自日常研发的录屏，选择一段观看。`,
  ),
  items: [
    {
      id: 'case-1',
      lead: t('Working in Claude Code, IQuest-Q1 traced an unusual reward curve to an extra space in decoded text that left only the final turn in the training loss.', 'IQuest-Q1 在 Claude Code 中排查奖励异常，发现是解码时多出的空格导致训练只计算了最后一轮对话的损失。'),
      notes: [
        [t('Cause', '原因'), t('Extra spaces inserted during decoding broke prefix matching. Earlier turns remained in context but dropped out of the training loss.', '额外插入的空格破坏了文本的前缀匹配，使得前几轮对话虽然还在上下文中，却被排除在了训练损失计算之外。')],
        [t('Fix', '修复'), t('Disable injected separator spaces while preserving generated whitespace, and keep streamed and stored text consistent.', '关闭额外分隔空格，保留模型生成的空白字符，并确保流式文本与存储轨迹一致。')],
        [t('Result', '结果'), t('Multi-turn training was restored and the mean reward recovered.', '多轮训练恢复，奖励均值随之回升。')],
      ],
      statsTitle: 'reward',
      stats: [
        { value: [F.extraSpace.before], label: t('Reward mean, before', '修复前均值') },
        { value: [F.extraSpace.after], label: t('After the fix', '修复后均值') },
        { value: [F.extraSpace.later], label: t('Later in training', '训练后段') },
      ],
    },
    {
      id: 'case-2',
      lead: t('After an environment update, previously solvable tasks began receiving low rewards. IQuest-Q1 investigated the execution and grading pipeline in Claude Code.', '环境更新后，原本能完成的任务开始大量得低分。IQuest-Q1 在 Claude Code 中排查任务执行与评分流程。'),
      notes: [
        [t('Cause', '原因'), t('Dependency, test-startup, and service-access faults caused some tasks to fail before the model’s patch ran. The grader counted these as model failures.', '依赖、测试启动与服务访问故障，使部分任务在补丁执行前就失败，并被计入模型的负奖励。')],
        [t('Fix', '修复'), t('Repair the environment, add health checks, and exclude confirmed infrastructure faults from policy updates. Genuine model failures still receive negative reward.', '修复环境并增加健康检查，将确认的基础设施故障排除出策略更新；模型自身的失败仍保留负奖励。')],
        [t('Validation', '验证'), t('Re-run the same tasks and patches to check scoring recovery. Restored scoring is judged separately from improved model capability.', '用同一批任务与补丁复验评分恢复情况；评分恢复与模型能力提升分别判断。')],
      ],
    },
    {
      id: 'case-3',
      lead: t('A researcher asked IQuest-Q1 to build a workbench for inspecting research sessions—failed commands, logs, diffs, tests, and reports tied to the right code version—and then to repair a failed export from within that page.', '研究人员请 IQuest-Q1 搭建一个研发工作台，用来查看研发会话中的失败命令、日志、代码改动、测试和报告，并与对应代码版本绑定；随后在工作台上发起修复一个失败的导出任务。'),
      notes: [
        [t('Cause', '原因'), t(<>The review-bundle export failed because some source files carried a modification time of 0 (1970), and Python’s <code>zipfile</code> rejects timestamps before 1980.</>, <>部分源文件的修改时间为 0（1970 年），而 Python 的 <code>zipfile</code> 不接受 1980 年之前的时间戳，导致评审包导出失败。</>)],
        [t('Fix', '修复'), t(<>A minimal change—<code>strict_timestamps=False</code> on the archive—plus a regression test with mixed modern and pre-1980 timestamps. Project data was left untouched.</>, <>只做最小改动——为归档设置 <code>strict_timestamps=False</code>，并补充一条混合新旧时间戳的回归测试；项目数据保持不变。</>)],
        [t('Verification', '验证'), t('Workbench and project tests pass. An integrity report confirms every file in the archive is present and byte-identical to its source.', '工作台与项目测试全部通过；完整性报告确认归档中的所有文件齐全，且与源文件逐字节一致。')],
      ],
    },
    {
      id: 'rsi-run',
      lead: t(
        'Intermediate RSI iterations, centred on one: the model traces failed tool calls to a single-schema bias in its training data, rewrites part of the data into other schemas, retrains, and evaluates, while researchers authorize the key steps.',
        '这段录屏展示了多轮 RSI 的中间迭代过程，并重点呈现其中一轮：模型发现工具调用失败的原因是训练数据偏向单一格式，于是主动编写代码，将部分数据改写为其他格式；随后用新数据重新训练并完成评测。所有关键操作均由研究人员授权执行。',
      ),
      notes: [
        [t('Diagnosis', '问题'), t(`After ${S.consecutiveErrors} consecutive tool-call errors, the model audited ${S.callsAudited} calls and found the training data biased toward one argument format.`, `连续 ${S.consecutiveErrors} 次工具调用错误后，模型抽查了 ${S.callsAudited} 次调用，发现训练数据偏向单一参数格式。`)],
        [t('Repair', '修复'), t(`It wrote augmentation code that rewrites the tool-call schema of part of the trajectories, then fine-tuned on them mixed with native-format data: ${S.trajectories} trajectories, ${S.gpuHours} GPU hours.`, `模型编写数据增强代码，改写部分轨迹的工具调用格式，再与保留原生格式的数据混合进行监督微调：共 ${S.trajectories} 条轨迹，消耗 ${S.gpuHours} GPU 小时。`)],
        [t('Human role', '人工参与'), t('The model carried out diagnosis, repair, training, and evaluation. Key decisions and operations, including formal training, required human authorization.', '模型执行诊断、修复、训练与评测；正式训练等关键决策与操作均须经研究人员授权。')],
      ],
      stats: [
        { value: [`${S.before} →`, S.after], label: t(`${S.benchmark}, ${S.tasks} tasks`, `${S.benchmark}，${S.tasks} 题均分`) },
        { value: [S.gain], label: t(`${S.benchmark.split('-')[0]} gain`, `${S.benchmark.split('-')[0]} 提升`) },
        { value: [S.heldOutGain], label: t(`${S.heldOut} gain, held out`, `${S.heldOut} 提升（留出评测）`) },
      ],
    },
  ].map(item => ({ ...recording(item.id), ...item })),
}

const A = F.apiIncident
export const office = {
  title: t('Office work, end to end', '处理完整的办公任务'),
  intro: t(
    <>In a sandboxed Feishu workspace, IQuest-Q1 uses <code>lark-cli</code> to check chats and documents, make evidence-based judgments, and deliver the follow-up—documents, decks, tasks, meetings, and notices.</>,
    <>在飞书沙盘环境中，IQuest-Q1 通过 <code>lark-cli</code> 核对聊天记录与文档，做出基于事实的判断，再完成文档、幻灯片、任务、会议与通报等后续交付。</>,
  ),
  cutsLabel: t('Recording', '录屏版本'),
  recorded: {
    id: 'api-incident',
    tag: t(`${A.deliverables} deliverables · report as you go`, `${A.deliverables} 项交付 · 边做边报`),
    lead: t(`On ${A.dateEn}, Lanchuan Securities reported that the API returned another customer’s data. As Qin Wang, head of the data platform at Hangzhou TideData, the model reconstructs the incident from three group chats, policy documents, and Drive drafts, where accounts conflict and the business team wants to handle Lanchuan alone.`, `${A.dateZh}，澜川证券反馈接口返回了其他客户的数据。模型扮演杭州潮汐数据平台负责人秦望，需要从技术、合规、业务三个飞书群以及制度知识库和云盘草稿中还原事件；各方说法存在冲突，业务方还希望只处理澜川一家。`),
    notes: [
      [t('Judgment', '判断'), t(`Cross-checking the chats, policies, and drafts, it graded the incident Level ${A.level} (${A.records} cross-customer reads) and determined that notification must cover all ${enWord(A.customers)} affected customers, not Lanchuan alone.`, `它交叉核对三个群、制度文档与云盘草稿，依据制度将事件定为 ${A.level} 级（${A.records} 次跨客户读取），并判定通知范围须覆盖全部${zhWord(A.customers)}家受影响客户，而不只是澜川一家。`)],
      [t('Delivery', '交付'), t(`It updated the exposure list, booked the review in a free calendar slot, produced the report and a ${enWord(A.slides)}-page management deck that passed layout checks, assigned ${enWord(A.tasks)} remediation tasks with named owners, and logged progress through ${A.receipts} receipts and a progress board.`, `随后更新影响清单，在日历空档安排复盘会，完成报告和${zhWord(A.slides)}页管理层幻灯片（通过版式与结构检查），创建${zhWord(A.tasks)}项具名负责的整改任务，并通过 ${A.receipts} 条进度回执和进度看板记录执行过程。`)],
      [t('Recovery', '排障'), t('When task assignment failed on an invalid assignee ID and the member API did not expose app_id, it read the command help, mapped names to app_id from message sender fields, then assigned the tasks and read them back to verify.', '分派任务时遇到负责人 ID 无效、群成员接口不直接提供 app_id，它查阅命令帮助，从群消息的发送者字段建立姓名与 app_id 的对应关系，随后完成分派并回读确认。')],
    ],
  },
}

export const frontend = {
  title: t('From a brief to a browser', '从一纸需求，到浏览器里的交互体验'),
  intro: t(
    `IQuest-Q1 turns written briefs into browser-based experiences—games, personal tools, design studies, and scientific visualizations. ${demoCount} of them run right here in your browser; ${enWord(recordedDemoCount)} also have a recording.`,
    `IQuest-Q1 把文字需求写成可在浏览器中运行的作品：游戏、个人工具、设计习作和科学可视化。其中 ${demoCount} 个可以直接在页面上运行，${recordedDemoCount} 个附有操作录屏。`,
  ),
  interactive: t('Interactive', '可交互'),
  recording: t('Recording', '录屏'),
  showAs: t('Show as', '展示方式'),
  load: t('Load interactive demo', '加载可交互演示'),
  openNewTab: t('Open in a new tab ↗', '在新标签页打开 ↗'),
  openShort: t('Open in new tab ↗', '新标签页打开 ↗'),
  openInteractive: t('Open interactive demo ↗', '打开可交互演示 ↗'),
  loadHere: t('Load here', '在此加载'),
  playRecording: t('Play recording', '播放录屏'),
  pending: t('Demo to be added', '演示待补充'),
  note: t('Runs in your browser. Some demos use WebGL, audio, or the camera.', '在浏览器中直接运行；部分演示会用到 WebGL、声音或摄像头。'),
}

export const quickstart = {
  title: t('How to use', '快速开始'),
  intro: t(
    'IQuest-Q1 is released as an open-source model. Download the weights, serve them with an OpenAI-compatible engine, and call the model directly or from an agent framework.',
    'IQuest-Q1 以开源模型形式发布。下载权重，用兼容 OpenAI 接口的推理引擎部署，即可直接调用，或接入智能体框架使用。',
  ),
  getTitle: t('Get the model', '获取模型'),
  serveTitle: t('Serve and call the model', '部署与调用'),
  todoNote: t('Commands follow the draft model card; the vLLM recipe and SGLang cookbook links are still to come.', '命令取自模型卡草稿；vLLM recipe 与 SGLang cookbook 链接待补充。'),
  agentsTitle: t('Use it in an agent framework', '在智能体框架中使用'),
  agents: t(
    `IQuest-Q1 works with agent frameworks including ${enList(M.agentScaffolds)}. Point the framework’s OpenAI-compatible endpoint at your server.`,
    `IQuest-Q1 可用于 ${zhList(M.agentScaffolds)} 等多种智能体框架。将框架的 OpenAI 兼容接口指向你的部署地址即可使用。`,
  ),
  agentsTodo: t('Step-by-step setup guides for each framework', '各框架的逐步配置指南'),
}

export const citation = {
  title: t('Citation', '引用'),
  intro: t('If you find IQuest-Q1 useful in your research, please cite the technical report.', '如果 IQuest-Q1 对您的研究有帮助，欢迎引用我们的技术报告。'),
  plain: `${citationMeta.org} (${citationMeta.year}). ${citationMeta.title}. ${citationMeta.note}.`,
  copyBibtex: t('Copy BibTeX', '复制 BibTeX'),
}

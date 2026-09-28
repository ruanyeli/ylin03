// Bilingual page copy for v1. Every user-facing string is a { en, zh } pair; `t()` keeps them
// compact. Numbers, tables, links, and the citation come from the shared data layer (src/shared)
// so every page version shows the same values.
import { benchmarks, bibtex, cyber, downloads, enCountCap, enList, enWord, isPlaceholder, links, model as M, rsiLoop, rsiOutcomes, serveSnippets, t, zhCount, zhList, zhWord } from '../../shared'

export { links, t }

export const nav = [
  { id: 'overview', label: t('Overview', '概览') },
  { id: 'rsi', label: t('Recursive Self-Improvement', '递归自我改进') },
  { id: 'architecture', label: t('Architecture & Scaling', '架构与扩展') },
  { id: 'training', label: t('Training', '训练流程') },
  { id: 'results', label: t('Evaluation', '评测结果') },
  { id: 'rd-cases', label: t('Model R&D Cases', '模型研发案例') },
  { id: 'office', label: t('Office Agent', '办公智能体') },
  { id: 'frontend', label: t('Frontend Generation', '前端生成') },
  { id: 'quickstart', label: t('How to Use', '快速开始') },
  { id: 'citation', label: t('Citation', '引用') },
]

export const ui = {
  report: t('Technical Report', '技术报告'),
  contents: t('Contents', '目录'),
  hideContents: t('Hide contents', '收起目录'),
  showContents: t('Show contents', '展开目录'),
  switchLanguage: t('中文', 'EN'),
  switchLanguageLabel: t('Switch to Chinese', '切换到英文'),
  copy: t('Copy', '复制'),
  copied: t('Copied', '已复制'),
  backToTop: t('Back to top', '回到顶部'),
  nowPlaying: t('Now playing', '正在播放'),
  watch: t('Watch', '观看'),
  watchDemos: t('Watch the demos', '观看演示'),
  comingSoon: t('Link available at release', '发布后开放'),
  menu: t('Menu', '菜单'),
  play: t('Play', '播放'),
  openDemo: t('Open live demo', '打开在线演示'),
  openInNewTab: t('Open in a new tab', '在新标签页打开'),
  close: t('Close', '关闭'),
  liveDemo: t('Live demo', '在线演示'),
  video: t('Video', '视频'),
  noVideo: t('Written case', '文字案例'),
  speed: t('Playback', '版本'),
  fast: t('Sped up · 2 min', '加速版 · 2 分钟'),
  full: t('Full session · 28 min', '完整版 · 28 分钟'),
  loadDemo: t('Load the interactive demo', '加载可交互演示'),
  interactive: t('Interactive', '可交互演示'),
  showAs: t('Show as', '展示方式'),
  demoPending: t('Demo to be added', '演示待补充'),
  copyLink: t('Copy link', '复制链接'),
  linkCopied: t('Link copied', '链接已复制'),
  todo: 'TODO',
  demoNote: t('Runs in your browser. Some demos use WebGL, audio, or the camera.', '在浏览器中直接运行；部分演示会用到 WebGL、声音或摄像头。'),
}

export const hero = {
  kicker: t('IQuest Research · Technical Report · 2026', 'IQuest Research · 技术报告 · 2026'),
  name: 'IQuest-Q1',
  tagline: t('Learning to build the next model', '让模型参与自身的改进'),
  lead: t(
    `IQuest-Q1 is an open-source sparse Mixture-of-Experts model with ${M.totalParams} total parameters, ${M.activeParams} activated, and a ${M.context}-token context window. During development it takes part in its own improvement: under human supervision, it evaluates its capabilities, proposes improvements, and runs training.`,
    `IQuest-Q1 是开源的稀疏混合专家（MoE）模型，总参数 ${M.totalParams}、激活 ${M.activeParams}，上下文窗口 ${M.context}。研发过程中，它在人类监督下评估自身能力、提出改进并执行训练，参与到自身的改进之中。`,
  ),
  figureLabel: t('Redrawn from Figure 3 of the technical report', '据技术报告图 3 重绘'),
  figureCaption: t(
    'Human-on-the-loop RSI. The RSI agent—the latest accepted model working through a development harness—drives two nested flywheels: the capability flywheel updates the model, the development flywheel updates the harness. At every stage researchers discuss with the agent: they agree on the plan before execution, talk through any change of direction, and review each update before it is adopted. Select a step, or press play to follow an illustrative iteration.',
    '人类监督下的递归自我改进（RSI）。RSI 智能体由最新采纳的模型与研发脚手架组成，推动两个嵌套的飞轮：能力飞轮更新模型，研发飞轮更新脚手架。每个阶段，研究人员都与智能体讨论：执行前达成共识，方向调整前共同商议，采纳前审核每一次更新。点击任一步骤，或播放整段示意迭代。',
  ),
}

export const rsiFigure = rsiLoop

export const metrics = [
  { value: M.totalParams, unit: t(`/ ${M.activeParams} active`, `/ ${M.activeParams} 激活`), label: t('Sparse MoE parameters, total / activated per token', '稀疏 MoE 参数量，总量 / 每 token 激活') },
  { value: M.context, unit: t('tokens', 'tokens'), label: t(`Context window, extended ${M.contextStart} → ${M.context} in mid-training`, `上下文窗口，中期训练中由 ${M.contextStart} 逐步扩展至 ${M.context}`) },
  { value: M.scalingEfficiency, unit: t('efficiency', '效率'), label: t(`Scaling efficiency over the ${M.scalingBaseline} architecture, matched data`, `相对 ${M.scalingBaseline} 架构的扩展效率（相同数据与配方）`) },
  { value: `≈${M.trainingTokens}`, unit: t('tokens', 'tokens'), label: t('Training tokens across pre-training and mid-training', '预训练与中期训练的总训练 token 数') },
]

export const overview = {
  title: t('Overview', '概览'),
  intro: t(
    'IQuest-Q1 is trained to work through tasks: gather context, use tools, check results, and recover from errors. The technical report describes three contributions.',
    'IQuest-Q1 围绕完整的任务过程训练：理解上下文、调用工具、验证结果，并在出错后调整。技术报告总结了三方面的工作。',
  ),
  cards: [
    {
      title: t('An open agentic model at the frontier', '接近前沿水平的开源智能体模型'),
      body: t(`A ${M.totalParams}-parameter sparse MoE model, ${M.activeParams} activated per token, with a ${M.context} context window. It is competitive with leading frontier models on coding benchmarks such as DeepSWE, NL2Repo, and CyberGym, and on general agent benchmarks such as AutomationBench, ALE, and HLE.`, `总参数 ${M.totalParams}、每 token 激活 ${M.activeParams} 的稀疏 MoE 模型，上下文窗口 ${M.context}。在 DeepSWE、NL2Repo、CyberGym 等编程基准，以及 AutomationBench、ALE、HLE 等通用智能体基准上，与领先的前沿模型表现相当。`),
    },
    {
      title: t('Three-stage training for agentic work', '面向智能体能力的三阶段训练'),
      body: t(`Stable, efficient pre-training with Stable AsymNorm, Muon, and μP; fine-grained mid-training guided by atomic-ability PPL ranking; and multi-scaffold post-training with domain-specialized RL across ${enList(M.trainingScaffolds)}.`, `以 Stable AsymNorm、Muon 与 μP 实现稳定高效的预训练；以原子能力 PPL 排序指导精细的中期训练；并在 ${zhList(M.trainingScaffolds)} 等多种脚手架中进行领域强化学习的后训练。`),
    },
    {
      title: t('Model development with human-on-the-loop RSI', '人类监督下的递归自我改进研发'),
      body: t('IQuest-Q1 evaluates its own capabilities, proposes improvements, and runs training through a unified infrastructure interface under human supervision—aiming to keep improving the model while shortening the development cycle.', 'IQuest-Q1 在人类监督下评估自身能力、提出改进方案，并通过统一的基础设施接口执行训练，目标是在持续提升能力的同时缩短研发周期。'),
    },
  ],
}

export const rsi = {
  title: t('Recursive Self-Improvement, Guided by Researchers', '研究人员指导下的递归自我改进'),
  intro: t(
    'Human-on-the-loop RSI uses the current model to develop its successor under human supervision. An RSI agent works from the latest accepted model and a development harness; the model is both the object of improvement and the research executor.',
    '人类监督下的 RSI，用当前模型在人类监督下研发下一代模型。RSI 智能体以最新采纳的模型和研发脚手架为基础开展工作；模型既是被改进的对象，也是研究的执行者。',
  ),
  quote: t(
    '“If a man keeps cherishing his old knowledge, so as continually to be acquiring new, he may be a teacher of others.”',
    '“温故而知新，可以为师矣。”',
  ),
  quoteSource: t('Confucius, Analects 2.11 (trans. James Legge)', '孔子，《论语·为政》'),
  flywheelsTitle: t('Two nested flywheels', '两个嵌套的飞轮'),
  flywheels: [
    {
      tag: t('Model updates', '更新模型'),
      title: t('Capability flywheel', '能力飞轮'),
      steps: [t('Observe & propose', '观察与提出'), t('Train & evaluate', '训练与评测'), t('Select model', '选定模型')],
      body: t(<>Improves capability by updating <strong>the model and its training assets</strong>. The agent identifies gaps and develops data or training interventions that raise performance or cut inference cost at comparable performance. Once adopted under a fixed evaluation protocol, the checkpoint and its training assets become the basis of the next iteration.</>, <>通过更新<strong>模型及其训练资产</strong>提升能力。智能体发现能力短板，设计数据或训练干预，提高任务表现，或在表现相当时降低推理成本。在固定评测协议下通过并被采纳后，该检查点与训练资产成为下一轮迭代的基础。</>),
    },
    {
      tag: t('Harness updates', '更新脚手架'),
      title: t('Development flywheel', '研发飞轮'),
      steps: [t('Revise harness', '修订脚手架'), t('Validate changes', '验证改动'), t('Update harness', '更新脚手架')],
      body: t(<>Improves the research process by updating <strong>the harness the agent works through</strong>—its workflows, research skills, and reusable procedures. Validated changes become callable tools or automated steps; an interface check added to the data pipeline, for example, can catch recurring tool-call errors before training.</>, <>通过更新<strong>智能体所用的研发脚手架</strong>改进研发流程，包括工作流、研究技能和可复用步骤。验证有效的改动会成为可调用的工具或自动化步骤；例如在数据流水线中加入接口检查，可以在训练前拦截反复出现的工具调用错误。</>),
    },
  ],
  gatesTitle: t('Human-on-the-loop supervision', '人类监督的三条规则'),
  gatesIntro: t('Humans keep judgment over direction; the agent carries out the agreed work. Three rules govern the collaboration, for model and harness updates alike.', '研究人员把握方向，智能体执行商定的工作。三条规则同时约束模型与脚手架两个层面的更新。'),
  gates: [
    { title: t('Agree before execution', '先达成共识，再执行'), body: t('The agent presents its diagnosis, approach, and evidence; humans challenge it and settle the objective, comparison, and resource budget.', '智能体给出诊断、方案与依据；研究人员提出质疑，共同确定目标、对照实验与资源投入。') },
    { title: t('Discuss before redirection', '先讨论，再调整方向'), body: t('Findings that challenge the plan return to discussion: is it an implementation issue or a flawed hypothesis—continue, revise, or stop?', '动摇原计划的新发现回到讨论：是实现问题还是假设有误？继续、调整还是停止？') },
    { title: t('Review before adoption', '先评审，再采纳'), body: t('Humans check gains, regressions, and open questions against the agreed baseline, then adopt, retain the current version, or ask for more investigation.', '研究人员对照基线审查收益、退化与未决问题，再决定采纳、保留当前版本或要求进一步调查。') },
  ],
  stats: rsiOutcomes.items.map(item => ({ value: `≈ ${item.value}`, label: item.label })),
  statsNote: t(`Score changes over a recorded RSI run, from its starting checkpoint to its last iteration; the change in human refinements is from §${rsiOutcomes.section} of the technical report.`, `分数变化为一次 RSI 运行从起始检查点到最后一轮的结果；人工修正次数的变化引自技术报告第 ${rsiOutcomes.section} 节。`),
  iterationTitle: t('An iteration in practice: following unfamiliar tool schemas', '一次具体迭代：适应陌生的工具格式'),
  iteration: t(
    'The model handled familiar tool definitions well but struggled with unfamiliar schemas. Humans and the agent agreed to diversify tool schemas in training; the agent implemented it through data synthesis and scaffold mixing, checking that tool definitions and calls stay consistent. After review, the accepted checkpoint became the next model, while the validated instance builders and schema checks entered the harness.',
    '模型对熟悉的工具定义表现良好，面对陌生格式却容易出错。研究人员与智能体商定在训练中引入多样的工具格式；智能体通过数据合成与脚手架混合实现，并检查工具定义与调用保持一致。评审通过后，新检查点成为下一轮的模型，验证过的实例构建器与格式检查则进入脚手架。',
  ),
  watchRun: t('Watch the RSI run', '观看 RSI 运行录屏'),
}

export const architecture = {
  title: t('Architecture & Scaling', '架构与扩展'),
  intro: t(
    'A decoder-only Transformer with sparse MoE layers and hybrid sliding-window attention. The design choices target training stability at scale and compute efficiency.',
    '在仅解码器 Transformer 的基础上，引入稀疏 MoE 层与混合滑动窗口注意力。设计上着眼于大规模训练的稳定性与计算效率。',
  ),
  specs: [
    [t('Parameters', '参数量'), t(`${M.totalParams} total, ${M.activeParams} activated`, `总量 ${M.totalParams}，激活 ${M.activeParams}`)],
    [t('Transformer layers', 'Transformer 层数'), M.layers],
    [t('Experts', '专家'), t(`${M.experts.routed} routed, ${M.experts.active} activated per token`, `${M.experts.routed} 个路由专家，每 token 激活 ${M.experts.active} 个`)],
    [t('Attention', '注意力'), t(M.attentionPattern, M.attentionPattern)],
    [t('Sliding window', '滑动窗口'), M.slidingWindow],
    [t('Heads (Q / KV)', '注意力头（Q / KV）'), `${M.heads.q} / ${M.heads.kv}`],
    [t('Context', '上下文'), M.context],
    [t('MTP layers', 'MTP 层'), M.mtpLayers],
  ],
  cards: [
    { value: M.scalingEfficiency, title: t('Scaling efficiency', '扩展效率'), body: t(`Against the ${M.scalingBaseline} architecture with the same data and recipe, IQuest-Q1 reaches the same training loss with 1/${M.scalingEfficiency.replace('×', '')} of the compute.`, `与 ${M.scalingBaseline} 架构在相同数据与配方下对比，IQuest-Q1 只需 1/${M.scalingEfficiency.replace('×', '')} 的训练算力即可达到相同的训练损失。`) },
    { value: `≈${M.stabilityCrossover}`, title: t('Stability margin', '稳定性余量'), body: t(`The largest stable learning rate stays well above the optimal one; the two curves meet only at about ${M.stabilityCrossover} activated parameters.`, `最大稳定学习率始终明显高于最优学习率，两条曲线直到约 ${M.stabilityCrossover} 激活参数才相交。`) },
    { value: 'SAN', title: t('Stable AsymNorm', 'Stable AsymNorm'), body: t('Asymmetric normalization across Transformer blocks, adopted with Muon and μP to keep training stable as the model grows.', '在 Transformer 各模块采用非对称的归一化策略，并与 Muon、μP 配合，保证模型规模增长时训练依然稳定。') },
    { value: `${M.muP.range} · ${M.muP.range}`, title: t('μP transfer', 'μP 超参迁移'), body: t(`Learning rates tuned on an ${M.muP.proxyLayers}-layer, ${M.muP.proxyWidth}-wide proxy transfer zero-shot across a ${M.muP.range} range in width and depth.`, `在 ${M.muP.proxyLayers} 层、宽度 ${M.muP.proxyWidth} 的小代理模型上调好的学习率，可零样本迁移到宽度和深度各 ${M.muP.range.replace('×', '')} 倍范围内的模型。`) },
    { value: M.attentionRatio, title: t('Hybrid attention', '混合注意力'), body: t('Three sliding-window layers for every global GQA layer, with the first and last two layers global; a query-aware sink token is enabled in every attention layer.', '每三层滑动窗口注意力搭配一层全局 GQA，首尾各两层为全局注意力；所有注意力层均启用查询感知的 sink token。') },
    { value: 'MTP', title: t('Multi-token prediction', '多 token 预测'), body: t(`${enCountCap(Number(M.mtpLayers))} MTP layers train from the start of pre-training; the first is later adapted into a recursive drafter for speculative decoding.`, `${zhCount(Number(M.mtpLayers))}个 MTP 层从预训练开始参与训练；训练完成后，第一层被改造为用于投机解码的递归草稿模型。`) },
  ],
}

export const training = {
  title: t('Training Pipeline', '训练流程'),
  intro: t(
    `IQuest-Q1 is developed in three stages, over roughly ${M.trainingTokens} training tokens across pre-training and mid-training.`,
    `IQuest-Q1 的训练分为三个阶段，预训练与中期训练共使用约 ${M.trainingTokens} 训练 token。`,
  ),
  stages: [
    { name: t('Pre-training', '预训练'), note: t('Stage 1 · Stage 2', '阶段 1 · 阶段 2'), body: t('Stage 1 builds language ability and general knowledge from diverse corpora; Stage 2 shifts the mix toward code and STEM data. Stable AsymNorm, Muon, and μP keep training stable and efficient.', '阶段 1 以多样化语料建立语言能力与通用知识；阶段 2 提高代码与 STEM 数据比重。Stable AsymNorm、Muon 与 μP 保证训练稳定高效。') },
    { name: t('Mid-training', '中期训练'), note: t(`${M.contextStart} → ${M.context} context`, `上下文 ${M.contextStart} → ${M.context}`), body: t('Broadens domains and formats with synthetic reasoning data and agent trajectories, while extending the context window step by step. Atomic-ability PPL ranking guides data and curriculum decisions.', '加入合成推理数据与智能体交互轨迹，拓展领域与数据形式，并逐步扩展上下文窗口。原子能力 PPL 排序为数据与课程设计提供依据。') },
    { name: t('Post-training', '后训练'), note: t('multi-scaffold', '多脚手架'), body: t('Supervised fine-tuning, domain-specialized RL, and multi-teacher on-policy distillation across scaffolds bring complementary skills into one model.', '在多种脚手架中进行监督微调、领域强化学习与多教师在线策略蒸馏，将互补的能力整合到同一模型。') },
  ],
  postTitle: t('Inside post-training', '后训练细节'),
  post: [
    { title: t('Large-scale, diverse task synthesis', '大规模多样化任务合成'), body: t('General-agent tasks run against mocked real API and MCP servers so every call replays deterministically; working-agent tasks are accepted only after a solver agent completes them; search tasks require reconciling deliberately scattered evidence.', '通用智能体任务基于模拟真实 API 与 MCP 定义的服务端，每次调用都可确定性复现；办公类任务须经求解智能体完成后才被采用；搜索类任务要求整合被刻意分散的证据。') },
    { title: t('Environment-centered RL', '以环境为中心的强化学习'), body: t('A shared policy trains across harnesses, domains, and evaluators. Failures are attributed before optimization: policy errors become learning signals, environment faults are masked, and evaluator faults block the sample.', '同一策略在多种脚手架、领域与评估器中训练。优化前先归因失败：策略错误作为学习信号，环境故障被屏蔽，评估器故障的样本不参与训练。') },
    { title: t('Multi-teacher on-policy distillation', '多教师在线策略蒸馏（MOPD）'), body: t(`Four experts are distilled into one student: agentic user experience, multi-harness (${M.mopdScaffolds.join(', ')}), long-horizon agentic work, and general-purpose tool use.`, `将四类专家蒸馏到同一学生模型：智能体用户体验、多脚手架（${zhList(M.mopdScaffolds)}）、长程智能体任务，以及通用工具使用。`) },
    { title: t('Post-training infrastructure', '后训练基础设施'), body: t('A shared runtime collects trajectories across frameworks, keeps tokens consistent between rollout and training, and prefetches teacher weights so distillation can use many teachers without keeping them all on GPU.', '统一运行环境汇集不同框架的轨迹，保证采样与训练的 token 一致，并异步预取教师权重，使蒸馏可以使用多个教师而无需全部常驻 GPU。') },
  ],
}

export const results = {
  title: t('Evaluation', '评测结果'),
  intro: t(
    'Agentic scores depend on the harness and execution policy as well as the model, so each result is attributed to a complete model–harness–protocol configuration.',
    '智能体得分同时取决于模型、脚手架与执行策略，因此每项结果都对应完整的“模型–脚手架–协议”配置。',
  ),
  chartTitle: t('IQuest-Q1 across coding and general-agent benchmarks', 'IQuest-Q1 在编程与通用智能体基准上的表现'),
  chartNote: benchmarks.note,
  fromFigure: benchmarks.sourceLabel.figure,
  viewChart: t('Chart', '图表'),
  viewTable: t('Table', '表格'),
  models: benchmarks.models,
  shortModels: benchmarks.shortModels,
  groups: benchmarks.groups,
  benchmarks: benchmarks.rows,
  benchmark: t('Benchmark', '基准'),
  harnessTitle: t('Harness assignments', '脚手架配置'),
  harness: benchmarks.harness,
  metricsTitle: t('Benchmark-specific metrics', '特定基准的指标'),
  metrics: [
    t('PaperBench: average Replication Score across papers.', 'PaperBench：各论文的平均复现得分（Replication Score）。'),
    t(<>CLI-Bench: composite Overall Score and pass<sup>k</sup>, stating k and the number of trials.</>, <>CLI-Bench：综合得分 Overall Score 与 pass<sup>k</sup>，并注明 k 与试验次数。</>),
    t('CADBench: Valid Shape Rate, volumetric and surface IoU, Chamfer Distance, and program compactness, reported separately.', 'CADBench：分别报告有效形状率、体积与表面 IoU、Chamfer 距离和程序紧凑度。'),
    t('LiveCodeBench v6: code-generation pass@1 on the official release_v6 split.', 'LiveCodeBench v6：官方 release_v6 划分上的代码生成 pass@1。'),
    t('Code Arena WebDev: official Arena Score with confidence interval, snapshot date, and vote count.', 'Code Arena WebDev：官方 Arena Score 及其置信区间、榜单快照日期和投票数。'),
  ],
  moreTitle: t('Also in the evaluation suite', '评测集中的其他基准'),
  pending: t('Results to be released with the final report', '结果将随正式报告发布'),
  more: benchmarks.pending,
  safetyTitle: t('Safety', '安全性'),
  safety: t('Safety evaluation uses the Tulu 3 suite to measure both refusal of harmful requests and over-refusal of benign ones. Results are pending.', '安全性评测采用 Tulu 3 套件，同时考察有害请求的拒答与正常请求的误拒。结果待发布。'),
  cyberTitle: t('Defensive cybersecurity', '防御性网络安全'),
  cyber: t(<>Beyond software engineering, IQuest-Q1 shows defensive (blue-team) cybersecurity capability. In a {enWord(cyber.days)}-day deployment, its agents produced <strong>{cyber.reports} vulnerability reports</strong> submitted through responsible disclosure.</>, <>在软件工程之外，IQuest-Q1 也具备防御性（蓝队）网络安全能力。在一次{zhWord(cyber.days)}天的部署中，模型智能体产出了 <strong>{cyber.reports} 份通过负责任披露流程提交的漏洞报告</strong>。</>),
}

// Items marked todo: true render a visible TODO badge until the real link or value is filled in.
export const quickstart = {
  title: t('How to Use', '快速开始'),
  intro: t(
    'IQuest-Q1 is released as an open-source model. Download the weights, serve them with an OpenAI-compatible engine, and call the model directly or from an agent framework.',
    'IQuest-Q1 以开源模型形式发布。下载权重，用兼容 OpenAI 接口的推理引擎部署，即可直接调用，或接入智能体框架使用。',
  ),
  getTitle: t('Get the model', '获取模型'),
  get: downloads.map(d => ({ ...d, href: links[d.id], todo: isPlaceholder(links[d.id]) })),
  serveTitle: t('Serve and call the model', '部署与调用'),
  todoNote: t('Model ID, parallelism, and recommended sampling parameters are placeholders until release.', '模型 ID、并行度与推荐采样参数为占位内容，发布前补充。'),
  tabs: serveSnippets,
  agentsTitle: t('Use it in an agent framework', '在智能体框架中使用'),
  agents: t(
    `IQuest-Q1 is trained across agent scaffolds including ${enList(M.agentScaffolds)}. Point the framework’s OpenAI-compatible endpoint at your server.`,
    `IQuest-Q1 在 ${zhList(M.agentScaffolds)} 等多种智能体框架中训练。将框架的 OpenAI 兼容接口指向你的部署地址即可使用。`,
  ),
  agentsTodo: t('Step-by-step setup guides for each framework', '各框架的逐步配置指南'),
}

export const citation = {
  title: t('Citation', '引用'),
  intro: t('If you find IQuest-Q1 useful in your research, please cite the technical report.', '如果 IQuest-Q1 对您的研究有帮助，欢迎引用我们的技术报告。'),
  bibtex,
}

export const footer = t('© 2026 IQuest Research. All rights reserved.', '© 2026 IQuest Research 保留所有权利。')

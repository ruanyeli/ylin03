# IQuest-Q1 博客中文内容 Review 指南

> 对应代码版本：main `3366177`（2026-09-27）。中文页面预览：https://siflow-auriga.siflow.cn/siflow/auriga/49fc99c539/q1-blog/v1/8080/?lang=zh

本文列出博客（v2）页面上的全部中文文案，按页面顺序排列，并附英文原文作对照。请重点检查中文是否准确、通顺、术语统一；数字和名称不需要改。

## 一、怎么审

1. **看哪里**：打开上面的预览链接（右上角可切换 EN / 中文对照阅读）。只审 v2；`?v=v1` 的旧版是备份，不用看。
2. **怎么反馈**：在本文对应条目后写批注，或直接改“中文”一栏，并注明条目编号（如 `B-3`）。熟悉代码的同事也可以直接改源码：每条都注明了文件和字段，文案写成 `t('英文', '中文')`，改第二个参数即可。
3. **不要改的内容**：数字（参数量、分数、百分比、轮数等）、模型名、基准名和产品名都来自共享数据（`src/shared/`），改了文案也不会生效。发现数字有误，请在批注里写明正确值和出处。代码命令不需要审。
4. **改完如何上线**：维护者在仓库目录运行 `VITE_EVAL_VIEWS=bars,dots npm run build`，刷新页面即可，不用重启服务。

**建议重点看**（本轮新写或改动较大的部分）：
- 页面标题的中文译法：`A-2`（“推进智能体 CLI 系统，迈向人类监督下的递归自我改进”）
- 导语：`A-3`；概览三条要点：A 部分后半
- “面向智能体系统的训练”整节：B 部分
- 网络安全一段（按报告 6.2 节新措辞翻译）：`C-12`
- RSI 展望一节与交互图对话：G 部分

## 二、写法约定

### 术语对照

| 英文 | 中文 | 说明 |
| --- | --- | --- |
| agentic foundation model | 智能体基座模型 |  |
| agent / agentic | 智能体 / 智能体的 |  |
| command line / CLI | 命令行 / CLI | 标题与导语用 CLI，正文可用“命令行” |
| harness / scaffold | 脚手架 | “agent framework”在“快速开始”里译作“智能体框架” |
| human-on-the-loop | 人类监督（下的） | 不译作“人在环上” |
| recursive self-improvement (RSI) | 递归自我改进（RSI） | 首次出现写全称，之后可只写 RSI |
| RSI agent | RSI 智能体 |  |
| capability / development flywheel | 能力飞轮 / 研发飞轮 |  |
| checkpoint | 检查点 |  |
| trajectory | 轨迹 |  |
| reinforcement learning (RL) | 强化学习 |  |
| supervised fine-tuning (SFT) | 监督微调（SFT） |  |
| multi-teacher on-policy distillation (MOPD) | 多教师在线策略蒸馏（MOPD） |  |
| stabilized model merging | 稳定化模型融合 |  |
| benchmark / evaluation | 基准 / 评测 |  |
| held out | 留出评测 | 指不参与智能体诊断、只用于检验的基准 |
| recording | 录屏 |  |
| Lark / Feishu | 飞书 | 只在正文中出现，标题不强调 |

### 标点与格式

- 中文正文用全角标点，引号用“”，作品名用书名号（《凛冬督学局》《论语·为政》）。
- 中文与英文、数字之间加一个空格（“总参数 320B”“在 Claude Code 中”）；全角标点前后不加空格。
- 数字、百分比、单位保持半角（61.04%、1,000 轮、938.7 GPU 小时）。
- 模型名、基准名、产品名保留英文原名，不翻译（IQuest-Q1、PaperBench、Claude Code）。
- 加粗的段首小标题后接“：”，同一段里尽量不再出现第二个冒号。
- 语气简洁、陈述，不用营销腔；句子尽量短，一段不超过三四句。

## 三、逐段文案

编号按页面顺序排列；“位置”列为源码文件、行号和字段名（行号为定位参考，个别由数据拼接生成的条目没有行号）。只列出当前线上页面实际显示的文字。

### A. 标题、导语与概览

| 编号 | 位置 | 中文 | 英文（参考） |
| --- | --- | --- | --- |
| A-1 | `v2/copy.jsx:51` header.kicker | IQuest Research · 技术报告 · 2026 | IQuest Research · Technical report · 2026 |
| A-2 | `v2/copy.jsx:25` header.tagline | 推进智能体 CLI 系统，迈向人类监督下的递归自我改进 | Advancing Agentic CLI Systems Towards Human-on-the-Loop RSI |
| A-3 | `v2/copy.jsx:62` header.dek | IQuest-Q1 是面向 CLI 系统的开源智能体基座模型：采用稀疏混合专家（MoE）架构，总参数 320B、激活 15B，以较高的计算效率兼具通用与编程智能体能力，支持中长程任务。研发过程中，它也在人类监督下参与自身的改进。 | IQuest-Q1 is an open-source agentic foundation model for CLI systems. A sparse Mixture-of-Experts model with 320B total parameters and 15B activated, it combines general and coding agent capabilities with efficient compute for medium- and long-horizon tasks. During development, it also takes part in its own improvement under human supervision. |
| A-4 | `v2/copy.jsx:64` header.report | 阅读技术报告 ↗ | Read the report ↗ |
| A-5 | `v2/copy.jsx` header.watchDemos | 观看演示 ↓ | Watch the demos ↓ |
| A-6 | `v2/copy.jsx` keyNumbers[0].unit | / 15B 激活 | / 15B active |
| A-7 | `v2/copy.jsx:62` keyNumbers[0].label | 稀疏 MoE，总参数 / 每 token 激活 | Sparse MoE, total / activated per token |
| A-8 | `v2/copy.jsx` keyNumbers[1].unit | 扩展效率 | scaling efficiency |
| A-9 | `v2/copy.jsx:112` keyNumbers[1].label | 与 Qwen3-30B-A3B 架构达到相同训练损失，只需 1/1.93 的算力 | Same training loss as the Qwen3-30B-A3B architecture with 1/1.93 of the compute |
| A-10 | `v2/copy.jsx` overview.title | 概览 | Overview |
| A-11 | `v2/copy.jsx:119` overview.intro | IQuest-Q1 围绕命令行中的完整任务过程构建：理解上下文、调用工具、验证结果，并在出错后调整。 | IQuest-Q1 is built to work through tasks in the command line: gather context, use tools, check results, and recover from errors. |
| A-12 | `v2/copy.jsx:123` overview.items[0].title | 有竞争力的开源 CLI 智能体模型 | A competitive open model for CLI agents |
| A-13 | `v2/copy.jsx:126` overview.items[0].body | 在 DeepSWE、NL2Repo、CyberGym 等编程基准，以及 AutomationBench、ALE-Bench、HLE w/ Tools 等通用智能体基准上，与领先的前沿模型表现相当。 | It is competitive with leading frontier models on coding benchmarks such as DeepSWE, NL2Repo, and CyberGym, and on general-agent benchmarks such as AutomationBench, ALE-Bench, and HLE w/ Tools. |
| A-14 | `v2/copy.jsx` overview.items[0].link.label | 评测结果 | Evaluation |
| A-15 | `v2/copy.jsx:131` overview.items[1].title | 面向智能体系统的训练 | Training to build agentic systems |
| A-16 | `v2/copy.jsx:134` overview.items[1].body | 合成环境、多脚手架强化学习与多教师在线策略蒸馏（MOPD），共同训练智能体在中长程任务中所依赖的能力。 | Synthetic environments, multi-harness reinforcement learning, and multi-teacher on-policy distillation (MOPD) train the skills agentic work depends on over medium- and long-horizon tasks. |
| A-17 | `v2/copy.jsx` overview.items[1].link.label | 智能体训练 | Agentic training |
| A-18 | `v2/copy.jsx:139` overview.items[2].title | 展望人类监督下的 RSI | Looking ahead: human-on-the-loop RSI |
| A-19 | `v2/copy.jsx:142` overview.items[2].body | 在研究人员监督下，IQuest-Q1 也参与研发下一代模型，诊断能力短板、提出改进并执行训练，这是迈向递归自我改进（RSI）的切实一步。 | Under human supervision, IQuest-Q1 also helps develop its successor, diagnosing gaps, proposing improvements, and running training—a practical step toward recursive self-improvement (RSI). |
| A-20 | `v2/copy.jsx:14` overview.items[2].link.label | 人类监督下的 RSI | Human-on-the-loop RSI |

### B. 面向智能体系统的训练

| 编号 | 位置 | 中文 | 英文（参考） |
| --- | --- | --- | --- |
| B-1 | `v2/copy.jsx:175` training.intro | 智能体系统要把任务完整做完：收集信息、调用工具、读懂反馈，并在多步执行中从错误里恢复。预训练与中期训练打下基础，数据逐步偏向代码与 STEM，并引入智能体轨迹、扩展上下文；在此之上，再通过三个阶段塑造智能体行为。 | An agentic system has to carry a task through: gather information, call tools, read feedback, and recover from errors over many steps. Pre-training and mid-training lay the groundwork, shifting the data toward code and STEM and adding agentic trajectories with a longer context; three further stages build the agentic behavior itself. |
| B-2 | `v2/copy.jsx` training.notes[0][0] | 合成环境 | Synthetic environments |
| B-3 | `v2/copy.jsx:182` training.notes[0][1] | 我们把任务与环境一并合成：通用智能体任务基于真实的 API、MCP 服务与工作区文件，编程任务运行在由我们自己的模型主导、基于 GitHub 仓库搭建的可执行环境中。任务使用前都要验证，例如编程任务须参考解通过、空操作失败才会被采用。 | We synthesize tasks together with their environments: general-agent tasks on real APIs, MCP servers, and workspace files, and coding tasks in executable environments built from GitHub repositories, largely by our own model. Each task is verified before use—a coding task is kept only if its reference solution passes and a no-op fails. |
| B-4 | `v2/copy.jsx` training.notes[1][0] | 强化学习 | Reinforcement learning |
| B-5 | `v2/copy.jsx:189` training.notes[1][1] | 同一策略在多种脚手架中训练，并保留各脚手架原生的工具与上下文管理，让模型在学会解题的同时，也学会在真实的智能体系统中工作。优化前先对失败归因，只有策略自身的错误才作为学习信号。 | One policy trains across multiple harnesses, keeping each harness’s own tools and context management, so working inside a real agentic system is learned along with solving the task. Failures are attributed before optimization: only the policy’s own errors become learning signals. |
| B-6 | `v2/copy.jsx:193` training.notes[2][0] | MOPD 与模型融合 | MOPD and model merging |
| B-7 | `v2/copy.jsx:196` training.notes[2][1] | 强化学习得到四个专家模型：智能体用户体验、多脚手架协作、长程任务与通用智能体任务。多教师在线策略蒸馏（MOPD）把它们整合进同一个从 SFT 检查点初始化的学生模型：学生在自己生成的轨迹上学习，由对应领域的专家逐 token 打分。稳定化模型融合贯穿各阶段与各专家分支，最终合并为 IQuest-Q1。 | RL yields four experts: agentic user experience, multi-harness work, long-horizon tasks, and general agentic work. Multi-teacher on-policy distillation (MOPD) consolidates them into one student, initialized from the SFT checkpoint, which learns on its own trajectories while the matching expert scores each token. Stabilized model merging across stages and expert branches then folds the checkpoints into IQuest-Q1. |
| B-8 | `v2/copy.jsx` training.notes[3][0] | 高效扩展 | Efficient at scale |
| B-9 | `v2/copy.jsx:203` training.notes[3][1] | IQuest-Q1 是总参数 320B、激活 15B 的稀疏 MoE 模型。与 Qwen3-30B-A3B 架构在相同数据与配方下对比，它只需 1/1.93 的训练算力即可达到相同的训练损失。 | IQuest-Q1 is a sparse MoE model with 320B total and 15B activated parameters. Against the Qwen3-30B-A3B architecture on the same data and recipe, it reaches the same training loss with 1/1.93 of the compute. |

### C. 评测结果（含评测说明、网络安全）

| 编号 | 位置 | 中文 | 英文（参考） |
| --- | --- | --- | --- |
| C-1 | `v2/copy.jsx:213` results.intro | 智能体得分同时取决于模型、脚手架与执行策略，因此每项结果都对应完整的“模型–脚手架–协议”配置。 | Agentic scores depend on the harness and execution policy as well as the model, so each result is attributed to a complete model–harness–protocol configuration. |
| C-2 | `v2/copy.jsx:215` results.figureTitle | IQuest-Q1 在编程与通用智能体基准上的表现 | IQuest-Q1 across coding and general-agent benchmarks |
| C-3 | `v2/copy.jsx` results.views.bars | 条形图 | Bar chart |
| C-4 | `v2/copy.jsx` results.views.dots | 点图 | Dot plot |
| C-5 | `v2/copy.jsx` results.viewsLabel | 视图 | View |
| C-6 | `v2/copy.jsx` results.averageShort | 均值 | avg |
| C-7 | `v2/copy.jsx` results.vsAverage | 相对均值 | vs. average |
| C-8 | `v2/copy.jsx` results.otherModels | 其他模型 | Other models |
| C-9 | `v2/copy.jsx:226` results.average | 已报告模型的平均分 | Average of reported models |
| C-10 | `v2/copy.jsx:227` results.legendHint | 点选模型以突出显示 | Select a model to highlight it |
| C-11 | `v2/copy.jsx` results.cyberTitle | 防御性网络安全 | Defensive cybersecurity |
| C-12 | `v2/copy.jsx:234` results.cyber | 在一次为期三天的部署中，IQuest-Q1 配合 Codex 智能体与专家设计的网络安全技能，产出了 30 份经负责任披露提交的漏洞报告，全部由人类网络安全专家审核。其中 13 项发现获得独立验证，相关记录随后由知名安全机构与数据库发布，包括 GitHub 安全公告（GHSA）与 NVD。 | During a three-day deployment, IQuest-Q1, equipped with Codex agents and expert-designed cybersecurity skills, produced 30 responsibly submitted vulnerability reports, all reviewed by human cybersecurity experts. Of these, 13 findings were independently validated, with records subsequently published by established security organizations and databases, including GitHub Security Advisories (GHSA) and the NVD. |
| C-13 | `v2/copy.jsx:238` results.notesSummary | 评测说明：评测设置 · 指标 · 9 项待发布基准 · 安全性 | Evaluation notes: settings · metrics · 9 pending benchmarks · safety |
| C-14 | `v2/copy.jsx` results.harnessTitle | 评测设置 | Evaluation settings |
| C-15 | `v2/copy.jsx` results.metricsTitle | 特定基准的指标 | Benchmark-specific metrics |
| C-16 | `v2/copy.jsx:243` results.metrics[0] | CLI-Bench：综合得分 Overall Score 与 pass^k，并注明 k 与试验次数。 | CLI-Bench: composite Overall Score and pass^k, stating k and the number of trials. |
| C-17 | `v2/copy.jsx` results.safetyTitle | 安全性 | Safety |
| C-18 | `v2/copy.jsx:246` results.safety | 安全性同样在评测范围内。 | Safety is also part of the evaluation suite. |
| C-19 | `v2/copy.jsx:249` results.pending | 评测集中的其他基准，结果将随正式报告发布：SWE-bench Verified、SWE-bench Multilingual、KernelBench、CADBench、Code Arena WebDev、τ³-Banking、BrowseComp、WideSearch、HealthBench Professional。 | Also in the evaluation suite, with results in the final report: SWE-bench Verified, SWE-bench Multilingual, KernelBench, CADBench, Code Arena WebDev, τ³-Banking, BrowseComp, WideSearch, and HealthBench Professional. |
| C-20 | `shared/benchmarks.js` benchmarks.groups[0] | 编程智能体 | Coding agent |
| C-21 | `shared/benchmarks.js` benchmarks.groups[1] | 通用智能体 | General agent |
| C-22 | `shared/benchmarks.js:25` benchmarks.sourceNote | 分数取自技术报告图 1，各模型均取其可用的最高推理强度。每个基准只比较报告中对应的模型。所有数字将随正式报告更新。 | Scores from Figure 1 of the technical report, at the highest available reasoning effort for each model. Each benchmark compares the models reported for it. All numbers will be updated with the final report. |
| C-23 | `shared/benchmarks.js:25` benchmarks.averageNote | 橙色虚线为参与比较模型的平均分。 | The orange dashed line marks the average of the compared models. |
| C-24 | `shared/benchmarks.js:36` benchmarks.settingsNote | 如无特别说明，采样参数为 temperature 1.0、top-p 0.95、top-k 20，脚手架使用 Claude Code v2.1.140 或 Codex v0.142。 | Unless noted, we sample with temperature 1.0, top-p 0.95, and top-k 20, using Claude Code v2.1.140 or Codex v0.142 as the harness. |
| C-25 | `shared/benchmarks.js` benchmarks.harness[0][1] | Claude Code 与 mini-SWE-agent | Claude Code and mini-SWE-agent |
| C-26 | `shared/benchmarks.js:40` benchmarks.harness[1][1] | Claude Code；731 题公开集，1,000 轮；禁用网络访问；单次运行 pass@1 | Claude Code; 731-task public set, 1,000 turns; web access disabled; single-run pass@1 |
| C-27 | `shared/benchmarks.js` benchmarks.harness[2][1] | Claude Code；temperature 0.6、top-p 0.95；每题 2,000 轮 | Claude Code; temperature 0.6, top-p 0.95; 2,000 turns per task |
| C-28 | `shared/benchmarks.js:42` benchmarks.harness[3][1] | Claude Code；每次最多 2,000 轮、6 小时 | Claude Code; up to 2,000 turns and 6 hours per trial |
| C-29 | `shared/benchmarks.js:43` benchmarks.harness[4][1] | Claude Code；完整 1,507 题（level 1）；每题最多 500 轮、6 小时 | Claude Code; full 1,507-task set (level 1); up to 500 turns and 6 hours per task |
| C-30 | `shared/benchmarks.js:42` benchmarks.harness[5][1] | Claude Code；每次最多 500 轮、8 小时 | Claude Code; up to 500 turns and 8 hours per trial |

### D. 前端生成（含 14 个演示的介绍）

| 编号 | 位置 | 中文 | 英文（参考） |
| --- | --- | --- | --- |
| D-1 | `v2/copy.jsx:364` frontend.title | 从一段需求，到可交互的网页 | From a brief to a browser |
| D-2 | `v2/copy.jsx:367` frontend.intro | IQuest-Q1 把文字需求写成可在浏览器中运行的作品：游戏、个人工具、设计习作和科学可视化。其中 14 个可以直接在页面上运行，4 个附有操作录屏。 | IQuest-Q1 turns written briefs into browser-based experiences—games, personal tools, design studies, and scientific visualizations. 14 of them run right here in your browser; four also have a recording. |
| D-3 | `v2/copy.jsx` frontend.interactive | 可交互 | Interactive |
| D-4 | `v2/copy.jsx` frontend.recording | 录屏 | Recording |
| D-5 | `v2/copy.jsx` frontend.showAs | 展示方式 | Show as |
| D-6 | `v2/copy.jsx` frontend.load | 加载可交互演示 | Load interactive demo |
| D-7 | `v2/copy.jsx:373` frontend.openNewTab | 在新标签页打开 ↗ | Open in a new tab ↗ |
| D-8 | `v2/copy.jsx:373` frontend.openShort | 新标签页打开 ↗ | Open in new tab ↗ |
| D-9 | `v2/copy.jsx:375` frontend.openInteractive | 打开可交互演示 ↗ | Open interactive demo ↗ |
| D-10 | `v2/copy.jsx` frontend.loadHere | 在此加载 | Load here |
| D-11 | `v2/copy.jsx` frontend.playRecording | 播放录屏 | Play recording |
| D-12 | `v2/copy.jsx:379` frontend.note | 在浏览器中直接运行；部分演示会用到 WebGL、声音或摄像头。 | Runs in your browser. Some demos use WebGL, audio, or the camera. |
| D-13 | `shared/demos.js` demoCategories[0].label | 全部 | All |
| D-14 | `shared/demos.js` demoCategories[1].label | 游戏 | Games |
| D-15 | `shared/demos.js` demoCategories[2].label | 个人工具 | Personal tools |
| D-16 | `shared/demos.js` demoCategories[3].label | 设计与布局 | Design & layout |
| D-17 | `shared/demos.js` demoCategories[4].label | 科学可视化 | Scientific visualization |
| D-18 | `shared/demos.js:17` frontendDemos[0].title | 我的世界 · 海洋版 | Underwater Voxel City |
| D-19 | `shared/demos.js:18` frontendDemos[0].body | 把方块世界搬到海底：海藻林、农场和深海生物围绕着可呼吸的穹顶。玩家可以挖矿、与村民交易，建造自己的水下栖息地。 | A voxel city beneath the sea, with kelp forests, farms, and deep-sea creatures. Players mine, trade with villagers, and build habitats under breathable domes. |
| D-20 | `shared/demos.js:22` frontendDemos[1].title | 玩具兵大战 · 多人 FPS | Toy Soldiers: Multiplayer FPS |
| D-21 | `shared/demos.js:23` frontendDemos[1].body | 儿童房成了玩具兵的微缩战场。玩家在家具之间与 AI 对手交战，从大厅的角色预览进入第一人称视角，随时查看血量、武器和弹药。 | A child’s bedroom becomes a miniature battlefield. Players face AI opponents among oversized furniture, with a character-preview lobby and an in-game display for health, weapons, and ammunition. |
| D-22 | `shared/demos.js` frontendDemos[2].title | 落日飙车 | Sunset Coast Racer |
| D-23 | `shared/demos.js:28` frontendDemos[2].body | 沿着落日下的海岸赛道，与 AI 车手竞速。紫橙色天空和棕榈剪影铺开背景，跟随镜头随弯道倾斜，碰撞震动带来直观的驾驶反馈。 | Race along a sunset coast against AI drivers. Palm silhouettes and a purple-orange sky set the scene; a banking chase camera and collision shake give each turn a sense of motion. |
| D-24 | `shared/demos.js` frontendDemos[3].title | 凛冬督学局 | Winter Study Bureau |
| D-25 | `shared/demos.js:33` frontendDemos[3].body | 《凛冬督学局》原本是 B 站 AI 创造公开赛的热门作品，IQuest-Q1 也可以做一个个人版的督学局：督学官通过摄像头巡查，记录分心行为；学习时长换成军工币，用来布置自己的营房。支持番茄钟和不限时学习。 | *Winter Study Bureau* was a popular entry in Bilibili’s AI Creation Open Contest, and IQuest-Q1 can build a personal version of it: a study timer with a military-camp theme. Webcam inspections flag distractions, while study time earns coins for furnishing your own barracks. Pomodoro and open-ended sessions support different routines. |
| D-26 | `shared/demos.js:37` frontendDemos[4].title | 爱琴海花园 · 花卉种植模拟器 | Aegean Garden Planner |
| D-27 | `shared/demos.js:38` frontendDemos[4].body | 在白墙、赤陶与爱琴海蓝之间规划一座 3D 花园。九重葛的洋红点缀其中，浅浅的投影和舒展的留白，让植物与造景成为画面的中心。 | A 3D garden planner in the colors of the Aegean: white walls, blue accents, terracotta, and bougainvillea. Soft shadows and open spacing keep the planting scene in focus. |
| D-28 | `shared/demos.js:42` frontendDemos[5].title | 致命召唤 · FPS 小游戏 | Tactical Outpost FPS |
| D-29 | `shared/demos.js:43` frontendDemos[5].body | 在低多边形军事据点中展开第一人称对战。切枪、抛壳、爆头提示与受击时的红色晕影，让每次操作都有清晰反馈。 | A browser FPS set in a low-poly military outpost. Weapon swaps, shell casings, headshot indicators, and a red damage vignette provide immediate feedback during combat. |
| D-30 | `shared/demos.js` frontendDemos[6].title | 反重力竞速 | Anti-Gravity Racing |
| D-31 | `shared/demos.js:48` frontendDemos[6].body | 白橙相间的悬浮赛车沿深空轨道疾驰，过弯时车身向一侧倾斜。淡蓝推进光带与白色速度线拖在身后，勾出行驶的轨迹。 | A hovercraft races along a suspended track in deep space. The white-and-orange vehicle banks into turns, leaving blue thruster trails and white speed lines behind it. |
| D-32 | `shared/demos.js` frontendDemos[7].title | 月海探测器 | Lunar Rover Console |
| D-33 | `shared/demos.js:53` frontendDemos[7].body | 驾驶巡视车穿过灰沙、陨石坑与岩石，在跟随、侧视、俯视和正面镜头间切换。东方神话风格的控制台同步显示任务、电量、温度、车轮载荷与告警。 | Explore a lunar landscape from follow, side, overhead, and front cameras. A mythology-inspired console tracks mission goals, power, temperature, wheel load, and alerts. |
| D-34 | `shared/demos.js:57` frontendDemos[8].title | 钢铁防线 FPS | Steel Line FPS |
| D-35 | `shared/demos.js:58` frontendDemos[8].body | 在工业军事场景中移动、瞄准和射击，支持双武器切换、开镜、换弹与爆头反馈。低多边形场景配合紧凑的战术界面，构成可在浏览器中游玩的 FPS。 | A browser FPS with two weapons, aim-down-sights, reloading, and headshot feedback. A low-poly industrial setting and compact tactical display frame the action. |
| D-36 | `shared/demos.js:62` frontendDemos[9].title | 太阳系复古探索仪 | Retro Solar System Explorer |
| D-37 | `shared/demos.js:63` frontendDemos[9].body | 像走进一座旧时科技馆，依次浏览太阳与八大行星。复古电子星图界面中，3D 星球模型、天体资料和探测历史随选择切换。 | Browse the Sun and eight planets in an interface inspired by early electronic star charts. Rotating 3D planets, data cards, and exploration histories sit inside retro display frames. |
| D-38 | `shared/demos.js:67` frontendDemos[10].title | 粗野主义 3D 音乐播放器 | Brutalist 3D Music Player |
| D-39 | `shared/demos.js:68` frontendDemos[10].body | 将专辑放在线框几何体上，拖动旋转即可浏览。纯黑背景、等宽字体和硬线边框贯穿曲库、详情与视频视图，形成克制的粗野主义风格。 | A music player built around a draggable 3D wireframe with album labels on its faces. Black backgrounds, monospaced type, and hard borders carry through the library, track details, and video views. |
| D-40 | `shared/demos.js` frontendDemos[11].title | 四缸发动机 | Four-Cylinder Engine |
| D-41 | `shared/demos.js:73` frontendDemos[11].body | 用《蜘蛛侠：平行宇宙》式的漫画风格呈现四缸发动机运转。鲜明的原色与强烈对比，让机械运动成为画面的主角。 | A four-cylinder engine simulation rendered in the comic-book style of *Spider-Man: Into the Spider-Verse*. Bold primary colors and sharp contrasts make the mechanical motion the focus. |
| D-42 | `shared/demos.js` frontendDemos[12].title | 金色三体轨道 | Three-Body Orbits in Gold |
| D-43 | `shared/demos.js:78` frontendDemos[12].body | 模型在 10 万步以内数值求解三体运动方程，再用 Three.js 把三条轨道渲染成发光的金丝线，整体取法克里姆特《吻》的金色装饰风格。 | The model integrates the three-body equations of motion numerically in under 100,000 steps, then renders the orbits in Three.js as glowing gold threads in the decorative style of Klimt’s *The Kiss*. |
| D-44 | `shared/demos.js:82` frontendDemos[13].title | 螺线上的孪生素数 | Twin Primes on a Spiral |
| D-45 | `shared/demos.js:83` frontendDemos[13].body | 1000 万以内的全部孪生素数（相差 2 的素数对），沿阿基米德螺线排成一片 3D 星空，配色取自莫奈《睡莲》的低对比绿、薰衣草与水粉色，可缩放、筛选，也可以在星空中漫游。 | Every twin-prime pair below 10 million, placed along an Archimedean spiral as a 3D star field in the soft greens, lavenders, and pinks of Monet’s *Water Lilies*. Viewers can zoom, filter, or fly through the field. |

### E. 办公任务

| 编号 | 位置 | 中文 | 英文（参考） |
| --- | --- | --- | --- |
| E-1 | `v2/copy.jsx:316` office.title | 处理完整的办公任务 | Office work, end to end |
| E-2 | `v2/copy.jsx:319` office.intro | 在飞书沙盘环境中，IQuest-Q1 通过 lark-cli 核对消息与文档，形成有依据的判断，再完成文档、幻灯片、任务、会议与通报等后续交付。 | In a sandboxed Feishu workspace, IQuest-Q1 uses lark-cli to check chats and documents, make evidence-based judgments, and deliver the follow-up—documents, decks, tasks, meetings, and notices. |
| E-3 | `v2/copy.jsx` office.cutsLabel | 录屏版本 | Recording |
| E-4 | `v2/copy.jsx:324` office.recorded.tag | 12 项交付 · 边做边报 | 12 deliverables · report as you go |
| E-5 | `v2/copy.jsx:325` office.recorded.lead | 客户通过 v1 接口读到了其他客户的记录。模型需要查清影响范围，并及时同步处置进展。 | A customer received another customer’s record from the v1 API. The model must determine the scope and keep the response team informed. |
| E-6 | `v2/copy.jsx` office.recorded.notes[0][0] | 判断 | Judgment |
| E-7 | `v2/copy.jsx:327` office.recorded.notes[0][1] | 模型根据事件记录与制度原文，将事件定为 1 级。10/13 至 10/15 期间，v1 接口共 37,214 次返回了不属于请求方的记录，涉及 6 家客户。 | Using incident records and policy text, the model graded the incident Level 1: between 10/13 and 10/15 the v1 endpoint returned other customers’ records 37,214 times, affecting six customers. |
| E-8 | `v2/copy.jsx` office.recorded.notes[1][0] | 交付 | Delivery |
| E-9 | `v2/copy.jsx:328` office.recorded.notes[1][1] | 完成事件报告与整改记录，安排事后复盘会议，每一步完成后同步处置群和进度看板。 | It prepared the incident report and remediation records, scheduled the post-incident review, and updated the response group and progress board after each step. |
| E-10 | `v2/copy.jsx` office.writtenLabel | 另外三个场景（文字说明） | Three more scenarios, described in text |
| E-11 | `v2/copy.jsx` office.written[0].title | 客户问：数据会不会出境？ | A customer question about cross-border data transfers |
| E-12 | `v2/copy.jsx:335` office.written[0].tag | 依据事实作出判断 | Evidence-based decisions |
| E-13 | `v2/copy.jsx:336` office.written[0].lead | 32 题安全合规问卷的第 27 题：客户的数据能否保证不出中国大陆境内？售前无法拍板，而客户 9/18 就要最终答复。 | Question 27 of a 32-item security questionnaire: can the customer’s data be guaranteed to stay in mainland China? Pre-sales cannot commit, and the customer needs a final answer by 9/18. |
| E-14 | `v2/copy.jsx` office.written[0].notes[0][0] | 背景 | Situation |
| E-15 | `v2/copy.jsx:338` office.written[0].notes[0][1] | 客户需要确认数据能否留在中国大陆境内，以及相应的技术方案与 SLA 承诺。 | A customer needs to know whether its data can stay in mainland China, with technical measures and an SLA to support the commitment. |
| E-16 | `v2/copy.jsx` office.written[0].notes[1][0] | 任务 | Task |
| E-17 | `v2/copy.jsx:339` office.written[0].notes[1][1] | 查阅 POC 历史与公司制度，评估可行性、周期和成本，形成方案供商务与法务审核。 | Check the POC history and company policies; assess feasibility, timing, and cost; prepare options for sales and legal review. |
| E-18 | `v2/copy.jsx` office.written[1].title | 09·11 数据事件：从事实核查到后续处置 | 09·11 data incident: from investigation to follow-up |
| E-19 | `v2/copy.jsx` office.written[1].tag | 11 项交付 · 3 个群 | 11 deliverables · 3 groups |
| E-20 | `v2/copy.jsx:345` office.written[1].lead | 测试表中出现了生产数据。模型以数据平台负责人的身份核实事实，协调后续处置。 | Production data appeared in a test table. The model acts as the data-platform lead to establish the facts and coordinate the response. |
| E-21 | `v2/copy.jsx:347` office.written[1].notes[0][1] | 交叉核对技术、合规与商务记录，确定事件级别、发现时间和告知义务。 | Reconcile engineering, compliance, and sales records to establish incident severity, discovery time, and notification duties. |
| E-22 | `v2/copy.jsx:348` office.written[1].notes[1][1] | 形成复盘报告、影响清单和整改任务，安排复盘会议，并向各方发送相应通报。 | Prepare the review report, impact list, and remediation tasks; arrange a review meeting and send audience-specific notices. |
| E-23 | `v2/copy.jsx` office.written[2].title | 数据治理认证班：名单、席位和补考安排 | Certification course: roster, seats, and make-up exam |
| E-24 | `v2/copy.jsx:353` office.written[2].tag | 9 项交付 · 多机器人协同 | 9 deliverables · multi-bot group |
| E-25 | `v2/copy.jsx:354` office.written[2].lead | 认证班报名表上的 16 人与场地、考试系统记录不符。模型需要在截止前核实名单。 | The 16 names on a course sign-up sheet do not match classroom and exam-system records. The model must verify the roster before registration closes. |
| E-26 | `v2/copy.jsx:356` office.written[2].notes[0][1] | 将报名表与注册记录逐项核对，区分已确认、待审批与重复记录。 | Reconcile sign-ups with registration records, separating confirmed, pending, and duplicate entries. |
| E-27 | `v2/copy.jsx:357` office.written[2].notes[1][1] | 回写底表、整理正式名单，安排跟进任务与补考。未确认事项保留待办，个人隐私不对外公开。 | Update the source worksheet, publish a verified roster, and arrange follow-up tasks and make-up exams. Keep unconfirmed items open and personal details private. |
| E-28 | `shared/cases.js:54` larkScenarios[0].title | 10·15 接口越权：查清影响范围，及时同步进展 | 10·15 API incident: determining who needs to be notified |
| E-29 | `shared/cases.js` larkScenarios[0].recordings[0].label | 加速版 · 2 分钟 | Sped up · 2 min |
| E-30 | `shared/cases.js` larkScenarios[0].recordings[1].label | 完整版 · 28 分钟 | Full session · 28 min |

### F. 模型研发（录屏说明）

| 编号 | 位置 | 中文 | 英文（参考） |
| --- | --- | --- | --- |
| F-1 | `v2/copy.jsx:257` rdCases.title | IQuest-Q1 参与模型研发 | IQuest-Q1 in model development |
| F-2 | `v2/copy.jsx` rdCases.intro | 四段来自日常研发的录屏，选择一段观看。 | Four recordings from everyday research work. Choose one to watch. |
| F-3 | `v2/copy.jsx` rdCases.items[0].tag | 案例 1 · Claude Code | Case 1 · Claude Code |
| F-4 | `v2/copy.jsx` rdCases.items[0].title | 一个空格，让多轮训练只剩最后一轮 | An extra space that broke multi-turn training |
| F-5 | `v2/copy.jsx:265` rdCases.items[0].lead | IQuest-Q1 在 Claude Code 中排查奖励异常，发现解码时多出的空格导致训练只覆盖最后一轮回答。 | Working in Claude Code, IQuest-Q1 traced an unusual reward curve to an extra space in decoded text that left only the final turn in the training loss. |
| F-6 | `v2/copy.jsx` rdCases.items[0].notes[0][0] | 原因 | Cause |
| F-7 | `v2/copy.jsx:267` rdCases.items[0].notes[0][1] | 解码器额外插入的空格破坏了前缀匹配。前几轮回答仍在上下文中，却不再参与损失计算。 | Extra spaces inserted during decoding broke prefix matching. Earlier turns remained in context but dropped out of the training loss. |
| F-8 | `v2/copy.jsx` rdCases.items[0].notes[1][0] | 修复 | Fix |
| F-9 | `v2/copy.jsx:268` rdCases.items[0].notes[1][1] | 关闭额外分隔空格，保留模型生成的空白字符，并确保流式文本与存储轨迹一致。 | Disable injected separator spaces while preserving generated whitespace, and keep streamed and stored text consistent. |
| F-10 | `v2/copy.jsx` rdCases.items[0].notes[2][0] | 结果 | Result |
| F-11 | `v2/copy.jsx:269` rdCases.items[0].notes[2][1] | 多轮训练恢复，奖励均值随之回升。 | Multi-turn training was restored and the mean reward recovered. |
| F-12 | `v2/copy.jsx` rdCases.items[0].stats[0].label | 修复前均值 | Reward mean, before |
| F-13 | `v2/copy.jsx` rdCases.items[0].stats[1].label | 修复后均值 | After the fix |
| F-14 | `v2/copy.jsx` rdCases.items[0].stats[2].label | 训练后段 | Later in training |
| F-15 | `v2/copy.jsx` rdCases.items[1].tag | 案例 2 · Claude Code | Case 2 · Claude Code |
| F-16 | `v2/copy.jsx` rdCases.items[1].title | 环境出了故障，模型却被判为失败 | When an environment fault looks like model failure |
| F-17 | `v2/copy.jsx:279` rdCases.items[1].lead | 环境更新后，原本能完成的任务开始大量得低分。IQuest-Q1 在 Claude Code 中排查任务执行与评分流程。 | After an environment update, previously solvable tasks began receiving low rewards. IQuest-Q1 investigated the execution and grading pipeline in Claude Code. |
| F-18 | `v2/copy.jsx:281` rdCases.items[1].notes[0][1] | 依赖、测试启动与服务访问故障，使部分任务在补丁执行前就失败，并被计入模型的负奖励。 | Dependency, test-startup, and service-access faults caused some tasks to fail before the model’s patch ran. The grader counted these as model failures. |
| F-19 | `v2/copy.jsx:282` rdCases.items[1].notes[1][1] | 修复环境并增加健康检查，将确认的基础设施故障排除出策略更新；模型自身的失败仍保留负奖励。 | Repair the environment, add health checks, and exclude confirmed infrastructure faults from policy updates. Genuine model failures still receive negative reward. |
| F-20 | `v2/copy.jsx` rdCases.items[1].notes[2][0] | 验证 | Validation |
| F-21 | `v2/copy.jsx:283` rdCases.items[1].notes[2][1] | 用同一批任务与补丁复验评分恢复情况；评分恢复与模型能力提升分别判断。 | Re-run the same tasks and patches to check scoring recovery. Restored scoring is judged separately from improved model capability. |
| F-22 | `v2/copy.jsx` rdCases.items[2].tag | 案例 3 · Claude Code | Case 3 · Claude Code |
| F-23 | `v2/copy.jsx` rdCases.items[2].title | 先搭研发工作台，再在台上修复失败任务 | A research workbench, then a fix from inside it |
| F-24 | `v2/copy.jsx:288` rdCases.items[2].lead | 研究人员请 IQuest-Q1 搭建一个研发工作台，用来查看研发会话中的失败命令、日志、代码改动、测试和报告，并与对应代码版本绑定；随后在工作台上发起修复一个失败的导出任务。 | A researcher asked IQuest-Q1 to build a workbench for inspecting research sessions—failed commands, logs, diffs, tests, and reports tied to the right code version—and then to repair a failed export from within that page. |
| F-25 | `v2/copy.jsx:290` rdCases.items[2].notes[0][1] | 部分源文件的修改时间为 0（1970 年），而 Python 的 zipfile 不接受 1980 年之前的时间戳，导致评审包导出失败。 | The review-bundle export failed because some source files carried a modification time of 0 (1970), and Python’s zipfile rejects timestamps before 1980. |
| F-26 | `v2/copy.jsx:291` rdCases.items[2].notes[1][1] | 只做最小改动——为归档设置 strict_timestamps=False，并补充一条混合新旧时间戳的回归测试；项目数据保持不变。 | A minimal change—strict_timestamps=False on the archive—plus a regression test with mixed modern and pre-1980 timestamps. Project data was left untouched. |
| F-27 | `v2/copy.jsx` rdCases.items[2].notes[2][0] | 验证 | Verification |
| F-28 | `v2/copy.jsx:292` rdCases.items[2].notes[2][1] | 工作台与项目测试全部通过；完整性报告确认归档中的所有文件齐全，且与源文件逐字节一致。 | Workbench and project tests pass. An integrity report confirms every file in the archive is present and byte-identical to its source. |
| F-29 | `v2/copy.jsx` rdCases.items[3].tag | RSI 循环 | RSI loop |
| F-30 | `v2/copy.jsx` rdCases.items[3].title | 一次人类监督下的 RSI 运行 | A human-on-the-loop RSI run |
| F-31 | `v2/copy.jsx:299` rdCases.items[3].lead | 多轮 RSI 中间迭代的过程，重点展示其中一轮：模型把工具调用失败追溯到训练数据偏向单一格式，将部分数据改写为其他格式，重新训练并评测；关键步骤由研究人员授权。 | Intermediate RSI iterations, centred on one: the model traces failed tool calls to a single-schema bias in its training data, rewrites part of the data into other schemas, retrains, and evaluates, while researchers authorize the key steps. |
| F-32 | `v2/copy.jsx` rdCases.items[3].notes[0][0] | 问题 | Diagnosis |
| F-33 | `v2/copy.jsx:302` rdCases.items[3].notes[0][1] | 连续 35 次工具调用错误后，模型抽查了 6,054 次调用，发现训练数据偏向单一参数格式。 | After 35 consecutive tool-call errors, the model audited 6,054 calls and found the training data biased toward one argument format. |
| F-34 | `v2/copy.jsx` rdCases.items[3].notes[1][0] | 修复 | Repair |
| F-35 | `v2/copy.jsx:303` rdCases.items[3].notes[1][1] | 模型编写数据增强代码，改写部分轨迹的工具调用格式，再与保留原生格式的数据混合进行监督微调：共 44,464 条轨迹，消耗 938.7 GPU 小时。 | It wrote augmentation code that rewrites the tool-call schema of part of the trajectories, then fine-tuned on them mixed with native-format data: 44,464 trajectories, 938.7 GPU hours. |
| F-36 | `v2/copy.jsx` rdCases.items[3].notes[2][0] | 人工参与 | Human role |
| F-37 | `v2/copy.jsx:304` rdCases.items[3].notes[2][1] | 模型执行诊断、修复、训练与评测；正式训练等关键操作经研究人员授权后启动。 | The model carried out diagnosis, repair, training, and evaluation. Key operations, including formal training, required human authorization. |
| F-38 | `v2/copy.jsx` rdCases.items[3].stats[0].label | PaperBench-CodeDev，20 题均分 | PaperBench-CodeDev, 20 tasks |
| F-39 | `v2/copy.jsx` rdCases.items[3].stats[1].label | 修复后提升 | Gain after the fix |

### G. 展望：人类监督下的 RSI（含交互图、对话、分数曲线）

| 编号 | 位置 | 中文 | 英文（参考） |
| --- | --- | --- | --- |
| G-1 | `v2/copy.jsx:150` rsi.title | 展望：人类监督下的 RSI | Looking ahead: human-on-the-loop RSI |
| G-2 | `v2/copy.jsx:153` rsi.intro | 除了完成单项研发任务，IQuest-Q1 还能参与研发下一代模型。在人类监督下的递归自我改进（RSI）中，由最新采纳的模型与研发脚手架组成的 RSI 智能体诊断能力短板、提出改进并执行实验，研究人员在关键决策点介入。模型既是被改进的对象，也是研发的执行者。 | Beyond single development tasks, IQuest-Q1 can take part in developing its successor. In human-on-the-loop recursive self-improvement (RSI), an RSI agent built from the latest accepted model and a development harness diagnoses gaps, proposes changes, and runs experiments, while researchers step in at key decision points. The model is both the object of improvement and the development executor. |
| G-3 | `v2/copy.jsx:157` rsi.quote | “温故而知新，可以为师矣。” | “If a man keeps cherishing his old knowledge, so as continually to be acquiring new, he may be a teacher of others.” |
| G-4 | `v2/copy.jsx:159` rsi.quoteSource | 孔子，《论语·为政》 | Confucius, Analects 2.11 (trans. Legge) |
| G-5 | `v2/copy.jsx` rsi.iterationTitle | 一次具体迭代 | One iteration in practice |
| G-6 | `v2/copy.jsx:163` rsi.iteration | 模型对熟悉的工具定义表现良好，面对陌生格式却频繁出错。智能体追查发现，训练数据偏向单一格式；经研究人员同意，它把部分数据改写为其他格式，与原格式数据混合训练。评审通过后，新检查点成为下一轮的模型，格式增强则进入脚手架。 | The model handled familiar tool definitions well but failed on unfamiliar schemas. The agent traced this to training data biased toward one schema; with human agreement, it rewrote part of the data into other schemas and trained on the mix. After review, the checkpoint became the next model, and the schema augmentation entered the harness. |
| G-7 | `v2/copy.jsx` rsi.outcomes[0].label | PaperBench 得分，相对初始值 | PaperBench score, relative to its initial value |
| G-8 | `v2/copy.jsx` rsi.outcomes[1].label | DeepSWE 得分，相对初始值 | DeepSWE score, relative to its initial value |
| G-9 | `v2/copy.jsx:167` rsi.outcomesNote | 为上图“分数”中整次运行从起点到最后一轮的变化。 | Over the whole run under Scores above, from the start to the last iteration. |
| G-10 | `v2/copy.jsx:168` rsi.watchRun | 观看 RSI 运行录屏 ↑ | Watch the RSI run ↑ |
| G-11 | `v2/copy.jsx:69` rsiFigureCopy.lead | 据技术报告图 6 重绘。 | Redrawn from Figure 6 of the technical report. |
| G-12 | `v2/copy.jsx:72` rsiFigureCopy.caption | RSI 智能体推动两个嵌套的飞轮：一个更新模型，一个更新研发脚手架（工具、工作流与可复用步骤）。研究人员执行前达成共识，调整方向前共同商议，采纳前审核每一次更新。 | The RSI agent drives two nested flywheels: one updates the model, the other its development harness (tools, workflows, and reusable procedures). Researchers agree on the plan, talk through any change of direction, and review each update before it is adopted. |
| G-13 | `v2/copy.jsx:76` rsiFigureCopy.hint.play | 点击任一步骤或按播放；检查点被采纳时，图会切换到它达到的分数。点“分数”可查看整次运行。 | Select a step or press Play: when a checkpoint is adopted, the figure cuts to the scores it reached. Scores shows the whole run. |
| G-14 | `v2/copy.jsx:77` rsiFigureCopy.hint.still | 点击任一步骤，或点“分数”查看每轮迭代后的分数。 | Select a step, or open Scores to see the scores after each iteration. |
| G-15 | `v2/copy.jsx:72` rsiFigureCopy.researchersBand | 研究人员 · 人类监督 | Researchers · human-on-the-loop supervision |
| G-16 | `v2/copy.jsx` rsiFigureCopy.ringSub[0] | 更新模型 | updates the model |
| G-17 | `v2/copy.jsx` rsiFigureCopy.ringSub[1] | 更新脚手架 | updates the harness |
| G-18 | `v2/copy.jsx` rsiFigureCopy.legend[0] | 能力飞轮 | Capability flywheel |
| G-19 | `v2/copy.jsx` rsiFigureCopy.legend[1] | 研发飞轮 | Development flywheel |
| G-20 | `v2/copy.jsx` rsiFigureCopy.stepNames[0][0] | 观察与提出 | Observe & propose |
| G-21 | `v2/copy.jsx` rsiFigureCopy.stepNames[1][0] | 训练与 | Train & |
| G-22 | `v2/copy.jsx` rsiFigureCopy.stepNames[1][1] | 评测 | evaluate |
| G-23 | `v2/copy.jsx` rsiFigureCopy.stepNames[2][0] | 选定模型 | Select model |
| G-24 | `v2/copy.jsx` rsiFigureCopy.stepNames[3][0] | 修订脚手架 | Revise harness |
| G-25 | `v2/copy.jsx` rsiFigureCopy.stepNames[4][0] | 验证 | Validate |
| G-26 | `v2/copy.jsx` rsiFigureCopy.stepNames[4][1] | 改动 | changes |
| G-27 | `v2/copy.jsx` rsiFigureCopy.stepNames[5][0] | 更新脚手架 | Update harness |
| G-28 | `v2/copy.jsx` rsiFigureCopy.stepOf(…) | 第 3 步（共 6 步）： | Step 3 of 6: |
| G-29 | `v2/copy.jsx` rsiFigureCopy.scores.button | 分数 | Scores |
| G-30 | `v2/copy.jsx:95` rsiFigureCopy.scores.title | 每轮 RSI 迭代后的最佳分数 | Best scores after each RSI iteration |
| G-31 | `v2/copy.jsx:96` rsiFigureCopy.scores.axis | RSI 迭代轮次 | RSI iteration |
| G-32 | `v2/copy.jsx` rsiFigureCopy.scores.start | 起点 | Start |
| G-33 | `v2/copy.jsx` rsiFigureCopy.scores.iteration(…) | 第 3 轮 | Iteration 3 |
| G-34 | `v2/copy.jsx:99` rsiFigureCopy.scores.walkthrough | 即循环中演示的一轮 | the iteration walked through in the loop |
| G-35 | `v2/copy.jsx:102` rsiFigureCopy.scores.note | PaperBench 在循环内为智能体提供反馈；DeepSWE 不参与智能体的诊断，用来检验提升能否迁移。并非每轮迭代都会推高曲线：第 1 轮候选模型的评测不完整，因此保留了起始检查点。 | PaperBench guides the agent inside the loop; DeepSWE is held out from its diagnosis, so it shows whether a gain carries over. Not every iteration moves the curve: in iteration 1, the candidate’s evaluation was incomplete, and the starting checkpoint was kept. |
| G-36 | `v2/copy.jsx:104` rsiFigureCopy.scores.source | 分数为一次五轮 RSI 运行中，每轮迭代后达到的最佳成绩。 | Scores are the best reached after each iteration of a recorded five-iteration RSI run. |
| G-37 | `v2/copy.jsx` rsiFigureCopy.scores.prev | 上一轮 | Previous iteration |
| G-38 | `v2/copy.jsx` rsiFigureCopy.scores.next | 下一轮 | Next iteration |
| G-39 | `shared/rsiLoop.js` rsiLoop.researchers | 研究人员 | Researchers |
| G-40 | `shared/rsiLoop.js:7` rsiLoop.supervision | 人类监督（human-on-the-loop） | Human-on-the-loop supervision |
| G-41 | `shared/rsiLoop.js` rsiLoop.discuss | 讨论 | discuss |
| G-42 | `shared/rsiLoop.js` rsiLoop.agent | RSI 智能体 | RSI Agent |
| G-43 | `shared/rsiLoop.js` rsiLoop.model | 模型 | Model |
| G-44 | `shared/rsiLoop.js` rsiLoop.harness | 脚手架 | Harness |
| G-45 | `shared/rsiLoop.js` rsiLoop.agentName | IQuest-Q1 · RSI 智能体 | IQuest-Q1 · RSI agent |
| G-46 | `shared/rsiLoop.js` rsiLoop.humanName | 研究人员 | Researcher |
| G-47 | `shared/rsiLoop.js` rsiLoop.lobes[0].short[0] | 能力 | Capability |
| G-48 | `shared/rsiLoop.js` rsiLoop.lobes[0].short[1] | 飞轮 | flywheel |
| G-49 | `shared/rsiLoop.js` rsiLoop.lobes[1].short[0] | 研发 | Development |
| G-50 | `shared/rsiLoop.js` rsiLoop.rules[0].title | 先共识 | Agree |
| G-51 | `shared/rsiLoop.js` rsiLoop.rules[0].sub | 再执行 | before execution |
| G-52 | `shared/rsiLoop.js:19` rsiLoop.rules[0].full | 先达成共识，再执行 | Agree before execution |
| G-53 | `shared/rsiLoop.js` rsiLoop.rules[1].title | 先讨论 | Discuss |
| G-54 | `shared/rsiLoop.js` rsiLoop.rules[1].sub | 再调整方向 | before redirection |
| G-55 | `shared/rsiLoop.js:20` rsiLoop.rules[1].full | 先讨论，再调整方向 | Discuss before redirection |
| G-56 | `shared/rsiLoop.js` rsiLoop.rules[2].title | 先评审 | Review |
| G-57 | `shared/rsiLoop.js` rsiLoop.rules[2].sub | 再采纳 | before adoption |
| G-58 | `shared/rsiLoop.js` rsiLoop.rules[2].full | 先评审，再采纳 | Review before adoption |
| G-59 | `shared/rsiLoop.js:27` rsiLoop.steps[0].messages[0][1] | 当脚手架使用陌生的工具格式时，工具调用频繁出错，而训练数据偏向单一格式。我建议混入多种工具格式来扩充训练数据。 | Tool calls keep failing on unfamiliar tool schemas, and our training data leans toward one schema. I propose augmenting it with mixed schemas. |
| G-60 | `shared/rsiLoop.js:28` rsiLoop.steps[0].messages[1][1] | 留出一部分陌生格式不进训练数据，用来检验泛化效果。同意，开始吧。 | Keep some unfamiliar schemas out of the training data so we can check that it generalizes. Agreed—go ahead. |
| G-61 | `shared/rsiLoop.js:34` rsiLoop.steps[1].messages[0][1] | 如果全部改写，原生格式下的调用可能变弱。是把改写数据与原生数据混合，还是全部转换？ | Rewriting every trajectory could weaken calls in the native format. Mix rewritten and native trajectories, or convert them all? |
| G-62 | `shared/rsiLoop.js:35` rsiLoop.steps[1].messages[1][1] | 保留原生格式的数据一起训练，保证调用一致；只改写一部分，继续。 | Keep the native trajectories in the mix so calls stay consistent. Rewrite only part, and continue. |
| G-63 | `shared/rsiLoop.js:41` rsiLoop.steps[2].messages[0][1] | 候选模型在留出的陌生格式上有提升，熟悉格式与原有能力保持稳定。是否采纳？ | The candidate improves on held-out schemas, while familiar schemas and retained capabilities hold steady. Adopt it? |
| G-64 | `shared/rsiLoop.js:42` rsiLoop.steps[2].messages[1][1] | 证据支持这一提升，采纳该检查点。 | The evidence supports the gain. Adopt the checkpoint. |
| G-65 | `shared/rsiLoop.js` rsiLoop.steps[2].event | 检查点已采纳 | Checkpoint adopted |
| G-66 | `shared/rsiLoop.js:49` rsiLoop.steps[3].messages[0][1] | 这类接口错误在后续迭代中可能反复出现。我把格式检查做成数据流水线中可复用的一步。 | These interface errors could recur in later iterations. I will turn the schema check into a reusable step in the data pipeline. |
| G-67 | `shared/rsiLoop.js:50` rsiLoop.steps[3].messages[1][1] | 同意，做成后续智能体可以直接调用的工具。 | Agreed—make it callable by later agents. |
| G-68 | `shared/rsiLoop.js:56` rsiLoop.steps[4].messages[0][1] | 回放以往的运行记录，确认新检查能在训练开始前拦截反复出现的工具调用错误。 | Replaying earlier runs to confirm the new check catches the recurring tool-call errors before training starts. |
| G-69 | `shared/rsiLoop.js:62` rsiLoop.steps[5].messages[0][1] | 格式检查与数据增强已通过验证。是否加入下一版脚手架？ | The schema check and the data augmentation passed validation. Add them to the next harness? |
| G-70 | `shared/rsiLoop.js:63` rsiLoop.steps[5].messages[1][1] | 批准，采纳这次脚手架更新。 | Approved. Adopt the harness update. |
| G-71 | `shared/rsiLoop.js:65` rsiLoop.steps[5].event | 脚手架更新已采纳 | Harness update adopted |
| G-72 | `shared/rsiLoop.js:68` rsiLoop.note | 示意对话，改编自技术报告第 6.1.2 节描述的 RSI 迭代。 | Illustrative dialogue, adapted from the RSI iteration described in §6.1.2 of the technical report. |
| G-73 | `shared/rsiLoop.js` rsiLoop.play | 播放 | Play |
| G-74 | `shared/rsiLoop.js` rsiLoop.pause | 暂停 | Pause |
| G-75 | `shared/rsiLoop.js` rsiLoop.prev | 上一步 | Previous step |
| G-76 | `shared/rsiLoop.js` rsiLoop.next | 下一步 | Next step |
| G-77 | `shared/rsiLoop.js` rsiLoop.stepLabel | 步骤 | Step |
| G-78 | `shared/rsiProgress.js` rsiProgress.series[0].role | 循环内使用 | used in the loop |
| G-79 | `shared/rsiProgress.js` rsiProgress.series[1].role | 留出评测 | held out |
| G-80 | `shared/rsiProgress.js:13` rsiProgress.iterations[0].change | 运行开始时的检查点 | The checkpoint the run starts from |
| G-81 | `shared/rsiProgress.js:14` rsiProgress.iterations[1].change | 评测不完整，保留起始检查点 | Evaluation incomplete; starting checkpoint kept |
| G-82 | `shared/rsiProgress.js:15` rsiProgress.iterations[2].change | 修复工具调用数据 | Repaired tool-call data |
| G-83 | `shared/rsiProgress.js:16` rsiProgress.iterations[3].change | 混合多种工具格式 | Tool-schema mixture |
| G-84 | `shared/rsiProgress.js` rsiProgress.iterations[4].change | 清洗思维链数据 | Cleaned chain-of-thought data |
| G-85 | `shared/rsiProgress.js` rsiProgress.iterations[5].change | 扩充合成任务 | Synthetic-task expansion |

### H. 快速开始与引用

| 编号 | 位置 | 中文 | 英文（参考） |
| --- | --- | --- | --- |
| H-1 | `v2/copy.jsx` quickstart.title | 快速开始 | How to use |
| H-2 | `v2/copy.jsx:386` quickstart.intro | IQuest-Q1 以开源模型形式发布。下载权重，用兼容 OpenAI 接口的推理引擎部署，即可直接调用，或接入智能体框架使用。 | IQuest-Q1 is released as an open-source model. Download the weights, serve them with an OpenAI-compatible engine, and call the model directly or from an agent framework. |
| H-3 | `v2/copy.jsx` quickstart.getTitle | 获取模型 | Get the model |
| H-4 | `v2/copy.jsx` quickstart.serveTitle | 部署与调用 | Serve and call the model |
| H-5 | `v2/copy.jsx:390` quickstart.todoNote | 命令取自模型卡草稿；vLLM recipe 与 SGLang cookbook 链接待补充。 | Commands follow the draft model card; the vLLM recipe and SGLang cookbook links are still to come. |
| H-6 | `v2/copy.jsx:391` quickstart.agentsTitle | 在智能体框架中使用 | Use it in an agent framework |
| H-7 | `v2/copy.jsx:394` quickstart.agents | IQuest-Q1 可用于 Claude Code、Codex、OpenCode、OpenHands、Terminus 等多种智能体框架。将框架的 OpenAI 兼容接口指向你的部署地址即可使用。 | IQuest-Q1 works with agent frameworks including Claude Code, Codex, OpenCode, OpenHands, and Terminus. Point the framework’s OpenAI-compatible endpoint at your server. |
| H-8 | `v2/copy.jsx:396` quickstart.agentsTodo | 各框架的逐步配置指南 | Step-by-step setup guides for each framework |
| H-9 | `shared/links.js:13` downloads[0].body | 模型权重与模型卡 | Model weights and model card |
| H-10 | `shared/links.js:14` downloads[1].body | 面向中国大陆用户的镜像 | Mirror for users in mainland China |
| H-11 | `shared/links.js:15` downloads[2].body | 推理代码、示例与问题反馈 | Inference code, examples, and issues |
| H-12 | `shared/links.js` downloads[3].name | 许可证 | License |
| H-13 | `shared/links.js:16` downloads[3].body | 许可证条款待确认 | License terms to be confirmed |
| H-14 | `shared/quickstart.js` serveSnippets[2].label | Python 调用 | Python API |
| H-15 | `v2/copy.jsx` citation.title | 引用 | Citation |
| H-16 | `v2/copy.jsx:401` citation.intro | 如果 IQuest-Q1 对您的研究有帮助，欢迎引用我们的技术报告。 | If you find IQuest-Q1 useful in your research, please cite the technical report. |
| H-17 | `v2/copy.jsx` citation.copyBibtex | 复制 BibTeX | Copy BibTeX |

### I. 目录与界面文字

| 编号 | 位置 | 中文 | 英文（参考） |
| --- | --- | --- | --- |
| I-1 | `v2/copy.jsx` tocLabels.rd-cases | 模型研发 | Model development |
| I-2 | `v2/copy.jsx` tocLabels.office | 办公任务 | Office work |
| I-3 | `v2/copy.jsx` tocLabels.frontend | 前端生成 | Frontend demos |
| I-4 | `v2/copy.jsx` ui.contents | 目录 | Contents |
| I-5 | `v2/copy.jsx` ui.hideContents | 收起目录 | Hide contents |
| I-6 | `v2/copy.jsx` ui.showContents | 展开目录 | Show contents |
| I-7 | `v2/copy.jsx` ui.languageGroup | 语言 | Language |
| I-8 | `v2/copy.jsx` ui.comingSoon | 发布后开放 | Link available at release |
| I-9 | `v2/copy.jsx` ui.copy | 复制 | Copy |
| I-10 | `v2/copy.jsx` ui.copied | 已复制 | Copied |
| I-11 | `v2/copy.jsx` ui.copyLink | 复制链接 | Copy link |
| I-12 | `v2/copy.jsx` ui.linkCopied | 链接已复制 | Link copied |
| I-13 | `v2/copy.jsx` ui.details | 展开详情 | Details |
| I-14 | `v2/copy.jsx` ui.resultsPending | 结果待发布 | Results pending |
| I-15 | `v2/copy.jsx:45` ui.previousLayout | 旧版页面（v1） | Previous layout (v1) |
| I-16 | `v2/copy.jsx:46` ui.footer | © 2026 IQuest Research 保留所有权利。 | © 2026 IQuest Research. All rights reserved. |
| I-17 | `v2/copy.jsx:25` ui.docTitle | IQuest-Q1：推进智能体 CLI 系统，迈向人类监督下的递归自我改进 · IQuest Research | IQuest-Q1: Advancing Agentic CLI Systems Towards Human-on-the-Loop RSI · IQuest Research |
| I-18 | `v2/copy.jsx` ui.reportLink | 技术报告 | Technical report |
| I-19 | `v2/copy.jsx` ui.resources | 资源链接 | Resources |

